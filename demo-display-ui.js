import {
  buildBigPlaneArea,
  formatAreaSize,
  macbookPro16Area,
} from './display-area-presets.js';

function waitForDemoApi(timeoutMs = 15000) {
  return new Promise((resolve, reject) => {
    if (window.__tobiiDemo) {
      resolve(window.__tobiiDemo);
      return;
    }
    const started = performance.now();
    const timer = setInterval(() => {
      if (window.__tobiiDemo) {
        clearInterval(timer);
        resolve(window.__tobiiDemo);
        return;
      }
      if (performance.now() - started > timeoutMs) {
        clearInterval(timer);
        reject(new Error('Demo Tobii no cargada'));
      }
    }, 50);
  });
}

function setDiag(text) {
  const el = document.getElementById('diag-out');
  if (el) el.textContent = text;
}

async function applyPreset(buildArea, label) {
  try {
    const demo = await waitForDemoApi();
    if (!demo.getConnected()) {
      setDiag('Conecta el Tobii primero (botón Connect).');
      return;
    }
    const area = buildArea();
    await demo.applyDisplayArea(area, `${label} (${formatAreaSize(area)})`);
  } catch (err) {
    setDiag(err instanceof Error ? err.message : String(err));
  }
}

let autoBigPlanePending = false;

document.addEventListener('fullscreenchange', () => {
  if (document.fullscreenElement) autoBigPlanePending = true;
});

document.addEventListener('fullscreenchange', async () => {
  if (!document.fullscreenElement || !autoBigPlanePending) return;
  autoBigPlanePending = false;
  try {
    const demo = await waitForDemoApi();
    if (!demo.getConnected()) return;
    const area = buildBigPlaneArea();
    await demo.applyDisplayArea(
      area,
      `Auto big plane al entrar en fullscreen (${formatAreaSize(area)})`,
    );
  } catch (err) {
    console.warn('Auto big plane:', err);
  }
});

document.getElementById('da-big-plane')?.addEventListener('click', () => {
  applyPreset(buildBigPlaneArea, 'Big plane');
});

document.getElementById('da-mbp16')?.addEventListener('click', () => {
  applyPreset(macbookPro16Area, 'MacBook Pro 16"');
});
