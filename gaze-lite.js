// Minimal Tobii 4C WebUSB gaze client for local browser games.

const TOBII_VID = 0x2104;
const TOBII_PIDS = [0x0313, 0x0127];
const INTERFACE = 0;
const EP_IN = 3;
const EP_OUT = 5;
const IN_CHUNK_SIZE = 16384;

const OFF_PRESENT = 0;
const OFF_GAZE_2D = 40;
const BIT_GAZE_2D = 1 << 6;

/** Mensaje claro para errores habituales de WebUSB (p. ej. otra pestaña conectada). */
export function formatGazeConnectError(err) {
  const msg = err instanceof Error ? err.message : String(err);
  if (/claimInterface|Unable to claim interface/i.test(msg)) {
    return (
      'El eye tracker ya está en uso por otra pestaña o aplicación. ' +
      'Cierra la demo u otra pestaña que lo tenga conectado y pulsa Conectar de nuevo.'
    );
  }
  if (/Access denied|SecurityError/i.test(msg)) {
    return 'Chrome no tiene permiso para usar el USB. Concede acceso cuando lo pida o revisa chrome://settings/content/usb.';
  }
  if (/NotFoundError|No device selected/i.test(msg)) {
    return 'No se seleccionó ningún dispositivo. Elige "EyeChip" en el diálogo de Chrome.';
  }
  return msg || 'No se pudo conectar al eye tracker.';
}

function toGazeConnectError(err) {
  return new Error(formatGazeConnectError(err));
}

function readGaze2D(buffer, ptr) {
  const dv = new DataView(buffer, ptr, 392);
  if ((dv.getUint32(OFF_PRESENT, true) & BIT_GAZE_2D) === 0) return null;
  return {
    x: dv.getFloat64(OFF_GAZE_2D, true),
    y: dv.getFloat64(OFF_GAZE_2D + 8, true),
  };
}

class WebUsbTransport {
  constructor(device) {
    this.device = device;
  }

  static async request() {
    if (!navigator.usb) throw new Error('WebUSB no disponible. Usa Google Chrome en escritorio.');
    const device = await navigator.usb.requestDevice({
      filters: TOBII_PIDS.map((productId) => ({ vendorId: TOBII_VID, productId })),
    });
    return WebUsbTransport.fromDevice(device);
  }

  static async fromDevice(device) {
    let opened = false;
    try {
      await device.open();
      opened = true;
      if (device.configuration === null) await device.selectConfiguration(1);
      await device.claimInterface(INTERFACE);
      const r = await device.controlTransferOut({
        requestType: 'vendor',
        recipient: 'interface',
        request: 0x41,
        value: 0,
        index: 0,
      });
      if (r.status !== 'ok') throw new Error(`session-open failed: ${r.status}`);
      return new WebUsbTransport(device);
    } catch (err) {
      if (opened) {
        try {
          await device.close();
        } catch {}
      }
      throw toGazeConnectError(err);
    }
  }

  async send(bytes) {
    const buf = new ArrayBuffer(bytes.byteLength);
    new Uint8Array(buf).set(bytes);
    const r = await this.device.transferOut(EP_OUT, buf);
    if (r.status !== 'ok' || r.bytesWritten !== bytes.byteLength) {
      throw new Error(`bulk OUT: ${r.status}`);
    }
  }

  async recv(signal, onChunk) {
    while (!signal.aborted) {
      let r;
      try {
        r = await this.device.transferIn(EP_IN, IN_CHUNK_SIZE);
      } catch (e) {
        if (signal.aborted) return;
        throw e;
      }
      if (signal.aborted) return;
      if (r.status !== 'ok' || !r.data) throw new Error(`bulk IN: ${r.status}`);
      onChunk(new Uint8Array(r.data.buffer, r.data.byteOffset, r.data.byteLength));
    }
  }

  async close() {
    try {
      await this.device.controlTransferOut({
        requestType: 'vendor',
        recipient: 'interface',
        request: 0x42,
        value: 0,
        index: 0,
      });
    } catch {}
    try {
      await this.device.releaseInterface(INTERFACE);
    } catch {}
    try {
      await this.device.close();
    } catch {}
  }
}

async function loadCore(wasmBytes, events) {
  let instance;
  const { instance: inst } = await WebAssembly.instantiate(wasmBytes, {
    env: {
      on_ttp_frame: (magic, seq, op, pptr, plen) => {
        const exp = instance.exports;
        const view = new Uint8Array(exp.memory.buffer, pptr, plen);
        events.onFrame({ magic, seq, op, payload: view });
        if (events.responseSignal) {
          events.responseSignal();
          events.responseSignal = null;
        }
      },
      on_response: (requestId, pptr, plen) => {
        const exp = instance.exports;
        const view = new Uint8Array(exp.memory.buffer, pptr, plen);
        events.onResponse(requestId, view.slice());
        if (events.responseSignal) {
          events.responseSignal();
          events.responseSignal = null;
        }
      },
      on_gaze: (samplePtr) => {
        const exp = instance.exports;
        const pt = readGaze2D(exp.memory.buffer, samplePtr);
        if (pt) events.onGaze(pt);
      },
      on_raw_columns: () => {},
      on_parse_error: (code) => events.onParseError?.(code),
    },
  });
  instance = inst;
  const exp = instance.exports;
  const currentPages = exp.memory.buffer.byteLength / 65536;
  exp.memory.grow(2);
  const IN_BUF_PTR = currentPages * 65536;
  const IN_BUF_SIZE = 65536;
  const sessionOutPtr = exp.session_out_ptr();

  function takeOutBytes() {
    const n = exp.session_out_len_();
    return new Uint8Array(exp.memory.buffer, sessionOutPtr, n).slice();
  }

  return {
    requestSubscribe(streamId) {
      exp.request_subscribe(streamId);
      return takeOutBytes();
    },
    feedUsbIn(chunk) {
      const dst = new Uint8Array(exp.memory.buffer, IN_BUF_PTR, chunk.byteLength);
      dst.set(chunk);
      exp.feed_usb_in(IN_BUF_PTR, chunk.byteLength);
    },
    handshakeInit(streamId) {
      exp.handshake_init(streamId);
    },
    handshakePoll() {
      return exp.handshake_poll();
    },
    takeSessionOutBytes: takeOutBytes,
  };
}

export class GazeClient {
  constructor() {
    this.listeners = new Set();
    this.closed = false;
    this.abort = new AbortController();
    this.responseSignal = null;
  }

  async connect() {
    const wasmResp = await fetch('./tobiifree_core.wasm');
    const wasmBytes = await wasmResp.arrayBuffer();
    const transport = await WebUsbTransport.request();
    this.transport = transport;

    const events = {
      onFrame: () => {},
      onResponse: () => {},
      onGaze: (pt) => {
        for (const fn of this.listeners) fn(pt);
      },
      onParseError: () => {},
      responseSignal: null,
    };
    this.events = events;

    this.core = await loadCore(wasmBytes, events);
    this.pumpPromise = transport
      .recv(this.abort.signal, (chunk) => this.core.feedUsbIn(chunk))
      .catch(() => {});

    this.core.handshakeInit(0x500);
    await this.driveStateMachine(() => this.core.handshakePoll(), 'handshake');

    const bytes = this.core.requestSubscribe(0x500);
    await transport.send(bytes);
    // Tras elegir el dispositivo USB: fullscreen no debe ir antes de requestDevice().
    await enterFullscreen();
  }

  async driveStateMachine(poll, label) {
    const SEND = 1;
    const RECV = 2;
    const DONE = 3;
    const ERR = 4;
    for (let step = 0; step < 200; step++) {
      const action = poll();
      if (action === DONE) return;
      if (action === ERR) throw new Error(`${label} failed`);
      if (action === SEND) {
        await this.transport.send(this.core.takeSessionOutBytes());
      }
      if (action === RECV) {
        await new Promise((resolve) => {
          this.events.responseSignal = resolve;
          setTimeout(() => {
            if (this.events.responseSignal === resolve) {
              this.events.responseSignal = null;
              resolve();
            }
          }, 2000);
        });
      }
    }
    throw new Error(`${label} timed out`);
  }

  onGaze(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  async disconnect() {
    if (this.closed) return;
    this.closed = true;
    this.abort.abort();
    try {
      await this.pumpPromise;
    } catch {}
    try {
      await this.transport.close();
    } catch {}
    this.listeners.clear();
  }
}

export function gazeToScreen(pt) {
  return {
    x: pt.x * window.innerWidth,
    y: pt.y * window.innerHeight,
  };
}

const FS_PREF_KEY = 'tobii_prefer_fs';

/** Recuerda que el usuario quiere pantalla completa (p. ej. al ir a un juego). */
export function markPreferFullscreen() {
  try {
    sessionStorage.setItem(FS_PREF_KEY, '1');
  } catch {}
}

/** Si estás en pantalla completa ahora, guarda la preferencia para la siguiente página. */
export function markPreferFullscreenIfActive() {
  if (document.fullscreenElement) markPreferFullscreen();
}

function syncFullscreenPreference() {
  if (document.fullscreenElement) markPreferFullscreen();
}

/**
 * Sincroniza la preferencia de pantalla completa al navegar entre páginas.
 * La restauración efectiva ocurre en `GazeClient.connect()` tras elegir el USB.
 */
export function initFullscreenRestore() {
  syncFullscreenPreference();
  document.addEventListener('fullscreenchange', syncFullscreenPreference);
}

/** Entra en pantalla completa si el navegador lo permite (requiere gesto del usuario).
 *  Debe llamarse después de `navigator.usb.requestDevice()` en el mismo flujo de conexión:
 *  si va antes, Chrome consume el gesto y el selector USB falla. */
export async function enterFullscreen() {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    }
    markPreferFullscreen();
  } catch (err) {
    console.warn('No se pudo entrar en pantalla completa:', err);
  }
}
