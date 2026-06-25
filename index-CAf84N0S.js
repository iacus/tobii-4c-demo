(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const du=0,hu=4,fu=8,pu=12,Yo=16,Au=24,mu=32,qo=40,Jo=56,Ko=72,gu=88,_u=112,xu=136,Eu=160,vu=184,yu=208,Mu=232,Su=256,Cu=280,wu=304,bu=328,Iu=352,$o=376,Tu=1,Ru=2,Bu=4,Du=8,Lu=16,Pu=32,Fu=64,Nu=128,Uu=256,Ou=512,zu=1024,Qu=2048,ku=4096,Gu=8192,Vu=16384,Hu=32768,Wu=65536,Xu=1<<17,Yu=1<<18,qu=1<<19,Ju=1<<20,Ku=1<<21;function dc(i,e){const t=new DataView(i,e,392),n=t.getUint32(du,!0),r={};if(n&Tu){const s=t.getUint32(Yo,!0),a=t.getInt32(Yo+4,!0);r.timestamp_us=a*4294967296+s}return n&Ru&&(r.frame_counter=t.getUint32(hu,!0)),n&Bu&&(r.validity_L=t.getUint32(fu,!0)),n&Du&&(r.validity_R=t.getUint32(pu,!0)),n&Lu&&(r.pupil_diameter_L_mm=t.getFloat64(Au,!0)),n&Pu&&(r.pupil_diameter_R_mm=t.getFloat64(mu,!0)),n&Fu&&(r.gaze_point_2d_norm={x:t.getFloat64(qo,!0),y:t.getFloat64(qo+8,!0)}),n&Nu&&(r.gaze_point_2d_L_norm={x:t.getFloat64(Jo,!0),y:t.getFloat64(Jo+8,!0)}),n&Uu&&(r.gaze_point_2d_R_norm={x:t.getFloat64(Ko,!0),y:t.getFloat64(Ko+8,!0)}),n&Ou&&(r.eye_origin_L_mm=an(t,gu)),n&zu&&(r.eye_origin_R_mm=an(t,_u)),n&Qu&&(r.trackbox_eye_pos_L=an(t,xu)),n&ku&&(r.trackbox_eye_pos_R=an(t,Eu)),n&Gu&&(r.gaze_point_3d_L_mm=an(t,vu)),n&Vu&&(r.gaze_point_3d_R_mm=an(t,yu)),n&Hu&&(r.eye_origin_L_display_mm=an(t,Mu)),n&Wu&&(r.eye_origin_R_display_mm=an(t,Su)),n&Xu&&(r.trackbox_eye_pos_L_display=an(t,Cu)),n&Yu&&(r.trackbox_eye_pos_R_display=an(t,wu)),n&qu&&(r.eye_origin_raw_L_mm=an(t,bu)),n&Ju&&(r.eye_origin_raw_R_mm=an(t,Iu)),n&Ku&&(r.gaze_point_2d_unfiltered={x:t.getFloat64($o,!0),y:t.getFloat64($o+8,!0)}),r}function an(i,e){return{x:i.getFloat64(e,!0),y:i.getFloat64(e+8,!0),z:i.getFloat64(e+16,!0)}}const $u=["s64","u32","point2d","point3d","fixed16x16"];async function Zu(i,e){let t;const{instance:n}=await WebAssembly.instantiate(i,{env:{on_ttp_frame:(p,m,E,f,d)=>{const v=t.exports,M=new Uint8Array(v.memory.buffer,f,d);e.onFrame({magic:p,seq:m,op:E,payload:M})},on_response:(p,m,E)=>{const f=t.exports,d=new Uint8Array(f.memory.buffer,m,E);e.onResponse(p,d.slice())},on_gaze:p=>{const m=t.exports;e.onGaze(dc(m.memory.buffer,p))},on_raw_columns:(p,m)=>{const E=t.exports,f=new DataView(E.memory.buffer,p,m*32),d=[];for(let v=0;v<m;v++){const M=v*32;d.push({colId:f.getUint32(M,!0),kind:$u[f.getUint32(M+4,!0)]??"u32",v0:f.getFloat64(M+8,!0),v1:f.getFloat64(M+16,!0),v2:f.getFloat64(M+24,!0)})}e.onRawColumns(d)},on_parse_error:p=>e.onParseError(p)}});t=n;const r=t.exports,s=r.memory.buffer.byteLength/65536;r.memory.grow(2);const a=s*65536,o=65536,c=a+o,l=32768,h=c+l,A=r.session_out_ptr();function u(){const p=r.session_out_len_();return new Uint8Array(r.memory.buffer,A,p).slice()}return{reset(){r.session_reset()},requestSubscribe(p){return r.request_subscribe(p),u()},requestGetDisplayArea(){return{requestId:r.request_get_display_area(),bytes:u()}},requestSetDisplayArea(p,m,E,f,d){return r.request_set_display_area(p,m,E,f,d),u()},requestSetDisplayAreaCorners(p,m,E){return r.request_set_display_area_corners(p.x,p.y,p.z,m.x,m.y,m.z,E.x,E.y,E.z),u()},feedUsbIn(p){if(p.byteLength>o)throw new Error(`chunk ${p.byteLength} > IN_BUF_SIZE ${o}`);new Uint8Array(r.memory.buffer,a,p.byteLength).set(p),r.feed_usb_in(a,p.byteLength)},setRawColumnsEnabled(p){r.raw_columns_enable(p?1:0)},requestCalAddPoint(p,m,E){return{requestId:r.request_cal_add_point(p,m,E),bytes:u()}},handshakeInit(p){r.handshake_init(p)},handshakePoll(){return r.handshake_poll()},takeSessionOutBytes(){return u()},calStartInit(){r.cal_start_init()},calStartPoll(){return r.cal_start_poll()},calFinishInit(){r.cal_finish_init()},calFinishPoll(){return r.cal_finish_poll()},calFinishBlob(){const p=r.cal_finish_blob_ptr(),m=r.cal_finish_blob_len();return new Uint8Array(r.memory.buffer,p,m).slice()},calApplyInit(p){r.cal_apply_init(p)},calApplyPoll(){return r.cal_apply_poll()},writeScratch(p){const m=r.scratch_ptr();new Uint8Array(r.memory.buffer,m,p.byteLength).set(p)},decodeDisplayArea(p){if(p.byteLength>l||(new Uint8Array(r.memory.buffer,c,p.byteLength).set(p),r.decode_display_area(c,p.byteLength,h)===0))return null;const f=new DataView(r.memory.buffer,h,72);return{tl:{x:f.getFloat64(0,!0),y:f.getFloat64(8,!0),z:f.getFloat64(16,!0)},tr:{x:f.getFloat64(24,!0),y:f.getFloat64(32,!0),z:f.getFloat64(40,!0)},bl:{x:f.getFloat64(48,!0),y:f.getFloat64(56,!0),z:f.getFloat64(64,!0)}}}}}function ju(i,e){return i.decodeDisplayArea(e)}const $t=(...i)=>console.log("[usb-source]",...i),Zo=(...i)=>console.error("[usb-source]",...i);class yo{core;transport;abort=new AbortController;pumpPromise;pending=new Map;gazeListeners=new Set;rawGazeListeners=new Set;frameListeners=new Set;parseErrorListeners=new Set;requestTimeoutMs;closed=!1;_displayArea=null;responseSignal=null;constructor(e,t){this.transport=e,this.requestTimeoutMs=t}static async create(e){const{transport:t,wasmBytes:n,requestTimeoutMs:r=2e3}=e,s=new yo(t,r);$t("loading wasm core"),s.core=await Zu(n,{onFrame:a=>{for(const o of s.frameListeners)o(a);s.responseSignal&&(s.responseSignal(),s.responseSignal=null)},onGaze:a=>{for(const o of s.gazeListeners)o(a)},onRawColumns:a=>{for(const o of s.rawGazeListeners)o(a)},onResponse:(a,o)=>{$t("response",a,o.byteLength,"bytes");const c=s.pending.get(a);c&&(s.pending.delete(a),clearTimeout(c.timer),c.resolve(o)),s.responseSignal&&(s.responseSignal(),s.responseSignal=null)},onParseError:a=>{Zo("parse error","0x"+a.toString(16));for(const o of s.parseErrorListeners)o(a)}}),$t("wasm core loaded"),$t("starting recv pump"),s.pumpPromise=t.recv(s.abort.signal,a=>s.core.feedUsbIn(a)).catch(a=>{s.abort.signal.aborted||Zo("recv pump error",a)}),s.core.handshakeInit(1280),await s.driveStateMachine(()=>s.core.handshakePoll(),"handshake");try{s._displayArea=await s.getDisplayArea(),$t("device display_area",s._displayArea)}catch(a){$t("warning: could not read display_area from device",a)}return s}async driveStateMachine(e,t="state-machine"){for(let o=0;o<200;o++){const c=e();if(c===3){$t(t,"complete in",o,"steps");return}if(c===4)throw new Error(`${t} failed`);if(c===1){const l=this.core.takeSessionOutBytes();$t(t,"step",o,"send",l.byteLength,"bytes"),await this.transport.send(l)}c===2&&($t(t,"step",o,"recv"),await new Promise(l=>{this.responseSignal=l,setTimeout(()=>{this.responseSignal===l&&($t(t,"recv timeout (2s), continuing"),this.responseSignal=null,l())},2e3)}))}throw new Error(`${t} timed out (too many steps)`)}awaitResponse(e,t){const n=t??this.requestTimeoutMs;return new Promise((r,s)=>{const a=setTimeout(()=>{this.pending.delete(e),s(new Error(`TTP request ${e} timed out`))},n);this.pending.set(e,{resolve:r,reject:s,timer:a})})}subscribeToGaze(e){const t=this.gazeListeners.size===0;if(this.gazeListeners.add(e),t){const n=this.core.requestSubscribe(1280);this.transport.send(n)}return()=>{this.gazeListeners.delete(e)}}get displayArea(){return this._displayArea}async getDisplayArea(){const{requestId:e,bytes:t}=this.core.requestGetDisplayArea(),n=this.awaitResponse(e);await this.transport.send(t);const r=await n,s=ju(this.core,r);if(!s)throw new Error(`get_display_area: could not decode (plen=${r.byteLength})`);return this._displayArea=s,s}async setDisplayArea(e){const t=this.core.requestSetDisplayArea(e.w,e.h,e.ox,e.oy,e.z);await this.transport.send(t);try{await this.getDisplayArea()}catch{}}async setDisplayAreaCorners(e){const t=this.core.requestSetDisplayAreaCorners(e.tl,e.tr,e.bl);await this.transport.send(t);try{await this.getDisplayArea()}catch{}}async startCalibration(){$t("startCalibration"),this.core.calStartInit(),await this.driveStateMachine(()=>this.core.calStartPoll(),"cal_start")}async addCalibrationPoint(e,t){const{requestId:n,bytes:r}=this.core.requestCalAddPoint(e,t,0),s=this.awaitResponse(n,1e4);await this.transport.send(r),await s}async finishCalibration(){return $t("finishCalibration"),this.core.calFinishInit(),await this.driveStateMachine(()=>this.core.calFinishPoll(),"cal_finish"),this.core.calFinishBlob()}async calApply(e){$t("calApply",e.byteLength,"bytes"),this.core.writeScratch(e),this.core.calApplyInit(e.byteLength),await this.driveStateMachine(()=>this.core.calApplyPoll(),"cal_apply")}async close(){if(!this.closed){this.closed=!0,this.abort.abort();try{await this.pumpPromise}catch{}try{await this.transport.close()}catch{}for(const[,e]of this.pending)clearTimeout(e.timer),e.reject(new Error("source closed"));this.pending.clear(),this.gazeListeners.clear(),this.rawGazeListeners.clear(),this.frameListeners.clear(),this.parseErrorListeners.clear()}}subscribeToRawGaze(e){const t=this.rawGazeListeners.size===0,n=this.gazeListeners.size===0&&t;if(this.rawGazeListeners.add(e),t&&this.core.setRawColumnsEnabled(!0),n){const r=this.core.requestSubscribe(1280);this.transport.send(r)}return()=>{this.rawGazeListeners.delete(e),this.rawGazeListeners.size===0&&this.core.setRawColumnsEnabled(!1)}}onFrame(e){return this.frameListeners.add(e),()=>{this.frameListeners.delete(e)}}onParseError(e){return this.parseErrorListeners.add(e),()=>{this.parseErrorListeners.delete(e)}}}const di=(...i)=>console.log("[ws-source]",...i),jo=(...i)=>console.error("[ws-source]",...i),dr=5,Or={GAZE:1,RESPONSE:2,DISPLAY_AREA:3,ERR:255},En={SUBSCRIBE:1,GET_DISPLAY_AREA:2,SET_DISPLAY_AREA:3,SET_DISPLAY_AREA_CORNERS:4,START_CALIBRATION:32,ADD_CALIBRATION_POINT:33,FINISH_CALIBRATION:34,CAL_APPLY:35};class Mo{ws;gazeListeners=new Set;pending=new Map;recvBuf=new Uint8Array(0);requestTimeoutMs;closed=!1;_displayArea=null;constructor(e,t){this.ws=e,this.requestTimeoutMs=t,e.onmessage=n=>{n.data instanceof ArrayBuffer&&this.onBinary(new Uint8Array(n.data))},e.onclose=()=>{di("disconnected")},e.onerror=n=>{jo("ws error",n)}}static async connect(e,t=2e3){di("connecting to",e);const n=await new Promise((s,a)=>{const o=new WebSocket(e);o.binaryType="arraybuffer",o.onopen=()=>{o.onerror=null,o.onclose=null,s(o)},o.onclose=c=>a(new Error(`WebSocket closed during connect (${e}, code=${c.code}, reason=${c.reason||"none"})`)),o.onerror=()=>{}});di("connected");const r=new Mo(n,t);try{r._displayArea=await r.getDisplayArea(),di("device display_area",r._displayArea)}catch(s){di("warning: could not read display_area from device",s)}return r}get displayArea(){return this._displayArea}subscribeToGaze(e){const t=this.gazeListeners.size===0;return this.gazeListeners.add(e),t&&(di("subscribing to gaze"),this.sendCmd(En.SUBSCRIBE)),()=>{this.gazeListeners.delete(e)}}async getDisplayArea(){const e=await this.request(En.GET_DISPLAY_AREA);if(e.byteLength<72)throw new Error(`display_area response too short: ${e.byteLength}`);const t=new DataView(e.buffer,e.byteOffset,72),n={tl:{x:t.getFloat64(0,!0),y:t.getFloat64(8,!0),z:t.getFloat64(16,!0)},tr:{x:t.getFloat64(24,!0),y:t.getFloat64(32,!0),z:t.getFloat64(40,!0)},bl:{x:t.getFloat64(48,!0),y:t.getFloat64(56,!0),z:t.getFloat64(64,!0)}};return this._displayArea=n,n}async setDisplayArea(e){this.sendCmd(En.SET_DISPLAY_AREA,el(e.w,e.h,e.ox,e.oy,e.z));try{await this.getDisplayArea()}catch{}}async setDisplayAreaCorners(e){this.sendCmd(En.SET_DISPLAY_AREA_CORNERS,el(e.tl.x,e.tl.y,e.tl.z,e.tr.x,e.tr.y,e.tr.z,e.bl.x,e.bl.y,e.bl.z));try{await this.getDisplayArea()}catch{}}async startCalibration(){await this.request(En.START_CALIBRATION,void 0,1e4)}async addCalibrationPoint(e,t){const n=new ArrayBuffer(16),r=new DataView(n);r.setFloat64(0,e,!0),r.setFloat64(8,t,!0),await this.request(En.ADD_CALIBRATION_POINT,new Uint8Array(n),1e4)}async finishCalibration(){return this.request(En.FINISH_CALIBRATION,void 0,3e4)}async calApply(e){await this.request(En.CAL_APPLY,e,15e3)}async close(){if(!this.closed){this.closed=!0,di("closing"),this.ws.close();for(const[,e]of this.pending)clearTimeout(e.timer),e.reject(new Error("source closed"));this.pending.clear(),this.gazeListeners.clear()}}sendCmd(e,t){const n=t?.byteLength??0,r=new Uint8Array(dr+n);r[0]=e,new DataView(r.buffer).setUint32(1,n,!0),t&&r.set(t,dr),this.ws.send(r)}request(e,t,n){const r=n??this.requestTimeoutMs,s=new Promise((a,o)=>{const c=setTimeout(()=>{this.pending.delete(e),o(new Error(`Daemon cmd 0x${e.toString(16)} timed out`))},r);this.pending.set(e,{resolve:a,reject:o,timer:c})});return this.sendCmd(e,t),s}onBinary(e){const t=new Uint8Array(e);if(this.recvBuf.byteLength===0)this.recvBuf=t;else{const r=new Uint8Array(this.recvBuf.byteLength+t.byteLength);r.set(this.recvBuf),r.set(t,this.recvBuf.byteLength),this.recvBuf=r}let n=0;for(;n+dr<=this.recvBuf.byteLength;){const r=this.recvBuf[n],s=new DataView(this.recvBuf.buffer,this.recvBuf.byteOffset+n+1,4).getUint32(0,!0),a=n+dr+s;if(a>this.recvBuf.byteLength)break;const o=this.recvBuf.slice(n+dr,a);this.dispatch(r,o),n=a}n>0&&(this.recvBuf=this.recvBuf.slice(n))}dispatch(e,t){switch(e){case Or.GAZE:{if(t.byteLength>=232){const n=dc(t.buffer,t.byteOffset);for(const r of this.gazeListeners)r(n)}break}case Or.RESPONSE:{if(t.byteLength>=1){const n=t[0],r=t.slice(1),s=this.pending.get(n);s&&(this.pending.delete(n),clearTimeout(s.timer),s.resolve(r))}break}case Or.DISPLAY_AREA:{const n=this.pending.get(En.GET_DISPLAY_AREA);n&&(this.pending.delete(En.GET_DISPLAY_AREA),clearTimeout(n.timer),n.resolve(t));break}case Or.ERR:{jo("daemon error",t.byteLength>=4?"0x"+new DataView(t.buffer,t.byteOffset,4).getUint32(0,!0).toString(16):"unknown");break}}}}function el(...i){const e=new ArrayBuffer(i.length*8),t=new DataView(e);for(let n=0;n<i.length;n++)t.setFloat64(n*8,i[n],!0);return new Uint8Array(e)}const Zt=(...i)=>console.log("[webusb]",...i),ed=(...i)=>console.error("[webusb]",...i),ps=8452,As=787,ks=0,td=3,nd=5,id=16384;class Cs{device;constructor(e){this.device=e}static async request(){if(typeof navigator>"u"||!("usb"in navigator))throw new Error("WebUSB not available in this environment");const e=await navigator.usb.requestDevice({filters:[{vendorId:ps,productId:As}]});return Cs.fromDevice(e)}static async fromDevice(e){Zt("opening device",e.vendorId.toString(16),e.productId.toString(16)),await e.open(),Zt("device opened"),e.configuration===null&&(Zt("selecting configuration 1"),await e.selectConfiguration(1)),Zt("claiming interface",ks),await e.claimInterface(ks),Zt("interface claimed"),Zt("session-open (ctrl 0x41)");const t=await e.controlTransferOut({requestType:"vendor",recipient:"interface",request:65,value:0,index:0});if(t.status!=="ok")throw new Error(`session-open failed: ${t.status}`);return Zt("session opened"),new Cs(e)}async send(e){Zt("send",e.byteLength,"bytes");const t=new ArrayBuffer(e.byteLength);new Uint8Array(t).set(e);const n=await this.device.transferOut(nd,t);if(n.status!=="ok"||n.bytesWritten!==e.byteLength)throw new Error(`bulk OUT: ${n.status} (${n.bytesWritten}/${e.byteLength})`)}async recv(e,t){Zt("recv pump started");let n=0;for(;!e.aborted;){let r;try{r=await this.device.transferIn(td,id)}catch(s){if(e.aborted)return;throw ed("recv error",s),s}if(e.aborted)return;if(r.status!=="ok"||!r.data)throw new Error(`bulk IN: ${r.status}`);n++,(n<=5||n%100===0)&&Zt("recv chunk",n,r.data.byteLength,"bytes"),t(new Uint8Array(r.data.buffer,r.data.byteOffset,r.data.byteLength))}Zt("recv pump stopped after",n,"chunks")}async close(){Zt("closing");try{await this.device.controlTransferOut({requestType:"vendor",recipient:"interface",request:66,value:0,index:0})}catch{}try{await this.device.releaseInterface(ks)}catch{}try{await this.device.close()}catch{}Zt("closed")}}const rd="AGFzbQEAAAABmAEVYAN/f38AYAV/f39/fwBgAX8AYAJ/fwBgAXwBfmAAAX9gAn9/AX9gBX9/f39/AX9gA39/fwF/YAd/fHx8fHx/AX9gBH98fHwAYAJ/fABgC398fHx8fHx8fHx/AX9gBX98fH9/AX9gBH9/f38Bf2ABfwF/YAAAYAV8fHx8fAF/YAl8fHx8fHx8fHwBf2ADfHx/AX9gAXwBfAJeBQNlbnYMb25fdHRwX2ZyYW1lAAEDZW52C29uX3Jlc3BvbnNlAAADZW52B29uX2dhemUAAgNlbnYOb25fcmF3X2NvbHVtbnMAAwNlbnYOb25fcGFyc2VfZXJyb3IAAgNVVAQFBQYHCAkKAwsMBgMDAwMDAwgLBggHCA0GBg4GAQADAwgDDwMDAwMDAwMOABACBQUFBRAFBQMPBRESBQ8IDwUTBQUPAgAFDwYDEAUFEAUFBQIFFAQFAXABAwMFAwEAMQYJAX8BQYCAwAALB84INwZtZW1vcnkCAApxNDJfZW5jb2RlAAULc2NyYXRjaF9wdHIABgxzY3JhdGNoX3NpemUABwtidWlsZF9oZWxsbwAIFmJ1aWxkX3NldF9kaXNwbGF5X2FyZWEACx5idWlsZF9zZXRfZGlzcGxheV9hcmVhX2Nvcm5lcnMADxZidWlsZF9nZXRfZGlzcGxheV9hcmVhABATZGVjb2RlX2Rpc3BsYXlfYXJlYQAXEWJ1aWxkX3F1ZXJ5X3JlYWxtABkQYnVpbGRfb3Blbl9yZWFsbQAaFGJ1aWxkX3JlYWxtX3Jlc3BvbnNlABsRYnVpbGRfY2xvc2VfcmVhbG0AHBNidWlsZF9jYWxfYWRkX3BvaW50AB0RYnVpbGRfY2FsX2NvbXB1dGUAHhJidWlsZF9jYWxfcmV0cmlldmUAHw9idWlsZF9jYWxfYXBwbHkAIBJidWlsZF9jYWxfc3RpbXVsdXMAIRBjb21wdXRlX2htYWNfbWQ1ACIPYnVpbGRfc3Vic2NyaWJlACYLZmVlZF91c2JfaW4AJxNkZWNvZGVfZ2F6ZV9wYXlsb2FkADAMcmVzZXRfcGFyc2VyADIScmF3X2NvbHVtbnNfZW5hYmxlADMPcmF3X2NvbHVtbnNfcHRyADQPZ2F6ZV9zYW1wbGVfcHRyADUQZ2F6ZV9zYW1wbGVfc2l6ZQA2D3Nlc3Npb25fb3V0X3B0cgA3DXNlc3Npb25fcmVzZXQAOBBzZXNzaW9uX291dF9sZW5fADkNcmVxdWVzdF9oZWxsbwA6EXJlcXVlc3Rfc3Vic2NyaWJlADwYcmVxdWVzdF9nZXRfZGlzcGxheV9hcmVhAD0YcmVxdWVzdF9zZXRfZGlzcGxheV9hcmVhAD4gcmVxdWVzdF9zZXRfZGlzcGxheV9hcmVhX2Nvcm5lcnMAPxNyZXF1ZXN0X3F1ZXJ5X3JlYWxtAEAScmVxdWVzdF9vcGVuX3JlYWxtAEEWcmVxdWVzdF9yZWFsbV9yZXNwb25zZQBCE3JlcXVlc3RfY2xvc2VfcmVhbG0AQxRyZXF1ZXN0X2NhbF9zdGltdWx1cwBEFXJlcXVlc3RfY2FsX2FkZF9wb2ludABFE3JlcXVlc3RfY2FsX2NvbXB1dGUARhRyZXF1ZXN0X2NhbF9yZXRyaWV2ZQBHEXJlcXVlc3RfY2FsX2FwcGx5AEgOaGFuZHNoYWtlX2luaXQASQ5oYW5kc2hha2VfcG9sbABLDmNhbF9zdGFydF9pbml0AE8OY2FsX3N0YXJ0X3BvbGwAUBJjYWxfc3RhcnRfcmVhbG1faWQAUQ9jYWxfZmluaXNoX2luaXQAUg9jYWxfZmluaXNoX3BvbGwAUxNjYWxfZmluaXNoX2Jsb2JfcHRyAFQTY2FsX2ZpbmlzaF9ibG9iX2xlbgBVDmNhbF9hcHBseV9pbml0AFYOY2FsX2FwcGx5X3BvbGwAVwkIAQBBAQsCSjEK0XRUFgAgAEQAAAAAAACQQqIQ2ICAgAD8BgsIAEGIh8CAAAsFAEGAIAtLAQF/I4CAgIAAQdAAayICJICAgIAAIAEgAkEJaiACQQlqIABB6AdBgIDAgABBLxCJgICAABCKgICAACEBIAJB0ABqJICAgIAAIAELzgEBAX9BACEFAkADQCAFQRhGDQEgACAFakEAOgAAIAVBAWohBQwACwsgAEEANgAIIAAgAToAByAAQYCAgIgFNgAAIABBADYAECAAIAI6AA8gACAEOgAXIAAgAUEIdjoABiAAIAFBEHY6AAUgACABQRh2OgAEIABBDGpBADsAACAAIAJBCHY6AA4gAEETakEANgAAIABBGGohACAEIQUCQANAIAVFDQEgACADLQAAOgAAIANBAWohAyAAQQFqIQAgBUF/aiEFDAALCyAEQRhqC1wBAX8gAEEAOgAHIABBADsABSAAIAI6AAQgAEEANgAAIABBCGohAyACIQACQANAIABFDQEgAyABLQAAOgAAIAFBAWohASADQQFqIQMgAEF/aiEADAALCyACQQhqC7gBAQF/I4CAgIAAQaAEayIHJICAgIAAIAdBADsACCAHQQpqIAMgAiAEoCICIAUQjICAgAAgB0E6aiABIAOgIAIgBRCMgICAACAHQeoAaiADIAQgBRCMgICAACAHQbDyADsAqgEgB0KAhICAgIABNwCiASAHQoWAgIDAgMCAATcAmgEgBiAHQYgCaiAHQYgCaiAAQaALIAdBCGpBpAEQiYCAgAAQioCAgAAhBiAHQaAEaiSAgICAACAGCzUAIABBwb4MEI2AgIAAIABBCWogARCOgICAACAAQRZqIAIQjoCAgAAgAEEjaiADEI6AgIAACysAIAAgAToACCAAQQQ7AAQgAEEFNgAAIAAgAUEIdjoAByAAIAFBEHY6AAYLigECAn8BfiOAgICAAEEQayICJICAgIAAIABBCDoABCAAQQQ2AAAgAEEFaiEDIAFEAAAAAAAAkEKiENiAgIAA/AYhBEEAIQACQANAIAIgAEE/cSIAOgAPIABBB0sNASADIABBB3FqIAQgAEF/c0EDdK2IPAAAIABBAWohAAwACwsgAkEQaiSAgICAAAuwAQEBfyOAgICAAEGgBGsiCySAgICAACALQQA7AAggC0EKaiABIAIgAxCMgICAACALQTpqIAQgBSAGEIyAgIAAIAtB6gBqIAcgCCAJEIyAgIAAIAtBsPIAOwCqASALQoCEgICAgAE3AKIBIAtChYCAgMCAwIABNwCaASAKIAtBiAJqIAtBiAJqIABBoAsgC0EIakGkARCJgICAABCKgICAACEKIAtBoARqJICAgIAAIAoLSAEBfyOAgICAAEEgayICJICAgIAAIAEgAkEIaiACQQhqIABBlgsgAkEIakEAEImAgIAAEIqAgIAAIQEgAkEgaiSAgICAACABC0MBAn8CQCABKAIEIAEoAggiAkcNACAAQQE2AQAPCyAAQQA7AQAgASgCACACai0AACEDIAEgAkEBajYCCCAAIAM6AAILaQECfwJAIAEoAgQgASgCCCICa0EETw0AIABCgICAgBA3AgAPCyAAQQA7AQQgASgCACACaigAACEDIAEgAkEEajYCCCAAIANBGHQgA0GA/gNxQQh0ciADQQh2QYD+A3EgA0EYdnJyNgIAC9kBAQN/I4CAgIAAQSBrIgIkgICAgAAgAkEMaiABEJGAgIAAAkACQCACLwEMIgNFDQAgACADOwEEDAELIAItAA4hAyACQRBqIAEQkoCAgAACQCACLwEUIgRFDQAgACAEOwEEDAELAkAgA0H/AXFBBUYNACAAQoCAgIAgNwIADAELAkAgAigCEEEERg0AIABCgICAgDA3AgAMAQsgAkEYaiABEJKAgIAAAkAgAi8BHCIBRQ0AIAAgATsBBAwBCyAAQQA7AQQgACACKAIYNgIACyACQSBqJICAgIAAC7EBAgF/AX4CQCABKAIEIAEoAggiAmtBCE8NACAAQQhqQQApA7iAwIAANwMAIABBACkDsIDAgAA3AwAPCyAAQQA7AQggASgCACACaikAACEDIAEgAkEIajYCCCAAIANCOIYgA0KA/gODQiiGhCADQoCA/AeDQhiGIANCgICA+A+DQgiGhIQgA0IIiEKAgID4D4MgA0IYiEKAgPwHg4QgA0IoiEKA/gODIANCOIiEhIQ3AwALjAIBA38jgICAgABBIGsiAiSAgICAACACQQRqIAEQkYCAgAACQAJAIAIvAQQiA0UNACAAIAM7AQgMAQsgAi0ABiEDIAJBCGogARCSgICAAAJAIAIvAQwiBEUNACAAIAQ7AQgMAQsCQCADQf8BcUEERg0AIABBCGpBACkD2ITAgAA3AwAgAEEAKQPQhMCAADcDAAwBCwJAIAIoAghBCEYNACAAQQhqQQApA+iEwIAANwMAIABBACkD4ITAgAA3AwAMAQsgAkEQaiABEJSAgIAAAkAgAi8BGCIBRQ0AIAAgATsBCAwBCyAAQQA7AQggACACKQMQuUQAAAAAAABQPaI5AwALIAJBIGokgICAgAALqAIBAn8jgICAgABBwABrIgIkgICAgAAgAkEIaiABEJOAgIAAAkACQCACLwEMIgNFDQAgACADOwEYDAELAkAgAigCCEHBvgxGDQAgAEEYakEAKQPYgMCAADcDACAAQRBqQQApA9CAwIAANwMAIABBCGpBACkDyIDAgAA3AwAgAEEAKQPAgMCAADcDAAwBCyAAQQA7ARggAkEQaiABEJWAgIAAAkAgAi8BGCIDRQ0AIAAgAzsBGAwBCyAAIAIrAxA5AwAgAkEgaiABEJWAgIAAAkAgAi8BKCIDRQ0AIAAgAzsBGAwBCyAAIAIrAyA5AwggAkEwaiABEJWAgIAAAkAgAi8BOCIBRQ0AIAAgATsBGAwBCyAAIAIrAzA5AxALIAJBwABqJICAgIAAC6cCAQJ/I4CAgIAAQcABayIDJICAgIAAQQAhBAJAIAFBAU0NACADQQI2AhQgAyABNgIQIAMgADYCDCADQRhqIANBDGoQloCAgAAgAy8BMA0AIANBOGogA0EMahCWgICAACADLwFQDQAgA0HYAGogA0EMahCWgICAACADLwFwDQAgAyADKwNoOQO4ASADIAMrA2A5A7ABIAMgAysDWDkDqAEgAyADKwNIOQOgASADIAMrA0A5A5gBIAMgAysDODkDkAEgAyADKwMoOQOIASADIAMrAyA5A4ABIAMgAysDGDkDeEEAIQEDQAJAIAFByABHDQBBASEEDAILIAIgAWogA0H4AGogAWorAwAQmICAgAAgAUEIaiEBDAALCyADQcABaiSAgICAACAEC2MDAX8BfgF/I4CAgIAAQRBrIgIkgICAgAAgAb0hA0EAIQQCQANAIAIgBEE/cSIEOgAPIARBB0sNASAAIARBB3FqIAMgBEEDdK2IPAAAIARBAWohBAwACwsgAkEQaiSAgICAAAtPAQF/I4CAgIAAQSBrIgIkgICAgAAgAkEAOwEEIAEgAkEGaiACQQZqIABBwAwgAkEEakECEImAgIAAEIqAgIAAIQEgAkEgaiSAgICAACABC48BAQF/I4CAgIAAQaABayIDJICAgIAAIANBADoAEyADQQQ6AA4gA0EAOwAMIANBgIAINgAIIAMgAToAEiADIAFBCHY6ABEgAyABQRB2OgAQIAMgAUEYdjoADyACIANByABqIANByABqIABB7A4gA0EIakEMEImAgIAAEIqAgIAAIQEgA0GgAWokgICAgAAgAQvrAQECfyOAgICAAEGgAWsiBSSAgICAACAFQQQ6ABcgBUECNgATIAVBBDoADkEAIQYgBUEAOwAMIAVBgIAINgAIIAUgAjoAGyAFIAJBCHY6ABogBSACQRB2OgAZIAUgAkEYdjoAGCAFIAE6ABIgBSABQQh2OgARIAUgAUEQdjoAECAFIAFBGHY6AA8CQANAIAZBEEYNASAFQQhqIAZqQRRqIAMgBmotAAA6AAAgBkEBaiEGDAALCyAEIAVByABqIAVByABqIABB9g4gBUEIakEkEImAgIAAEIqAgIAAIQYgBUGgAWokgICAgAAgBguGAQEBfyOAgICAAEHgAGsiAySAgICAACADQQQ6AA4gA0EAOwAMIANBgIAINgAIIAMgAToAEiADIAFBCHY6ABEgAyABQRB2OgAQIAMgAUEYdjoADyACIANBKGogA0EoaiAAQfsOIANBCGpBCxCJgICAABCKgICAACEBIANB4ABqJICAgIAAIAELowEBAX8jgICAgABBoAFrIgUkgICAgAAgBUEAOwAIIAVBCGpBAmogARCOgICAACAFQRdqIAIQjoCAgAAgBUEEOgAoIAVBAjYAJCAFIAM6ACwgBSADQQh2OgArIAUgA0EQdjoAKiAFIANBGHY6ACkgBCAFQcgAaiAFQcgAaiAAQYgIIAVBCGpBJRCJgICAABCKgICAACEDIAVBoAFqJICAgIAAIAMLTwEBfyOAgICAAEEgayICJICAgIAAIAJBADsBBCABIAJBBmogAkEGaiAAQa8IIAJBBGpBAhCJgICAABCKgICAACEBIAJBIGokgICAgAAgAQtPAQF/I4CAgIAAQSBrIgIkgICAgAAgAkEAOwEEIAEgAkEGaiACQQZqIABBzAggAkEEakECEImAgIAAEIqAgIAAIQEgAkEgaiSAgICAACABC9QCAQJ/I4CAgIAAQSBrIgQkgICAgAAgA0EANgAAIAMgAkEaaiIFOgAEIAMgBUEYdjoAByADIAVBEHY6AAYgAyAFQQh2OgAFQQAhBQJAA0AgBUEYRg0BIARBCGogBWpBADoAACAFQQFqIQUMAAsLIARBgICQsAU2ABQgBEGAgICIBTYACCAEIAA6AA8gBCAAQQh2OgAOIAQgAEEQdjoADSAEIABBGHY6AAwgBCACQQJqIgU6AB8gBCAFQQh2OgAeIAQgBUEQdjoAHSAEIAVBGHY6ABwgA0EIaiEAQQAhBQJAA0AgBUEYRg0BIAAgBWogBEEIaiAFai0AADoAACAFQQFqIQUMAAsLIANBADsAICADQSJqIQAgAiEFAkADQCAFRQ0BIAAgAS0AADoAACABQQFqIQEgAEEBaiEAIAVBf2ohBQwACwsgBEEgaiSAgICAACACQSJqC08BAX8jgICAgABBIGsiAiSAgICAACACQQA7AQQgASACQQZqIAJBBmogAEHgCCACQQRqQQIQiYCAgAAQioCAgAAhASACQSBqJICAgIAAIAEL+wMBAn8jgICAgABBkARrIgUkgICAgAACQEHAAEUNACAFQRBqQQBBwAD8CwALAkACQCABQcAASw0AIAVBEGohBgNAIAFFDQIgBiAALQAAOgAAIAFBf2ohASAGQQFqIQYgAEEBaiEADAALCwJAQeAARQ0AIAVB0ABqQeCAwIAAQeAA/AoAAAsgBUHQAGogACABEKOAgIAAIAVB0ABqIAVBsAFqEKSAgIAAQQAhAQNAIAFBEEYNASAFQRBqIAFqIAVBsAFqIAFqLQAAOgAAIAFBAWohAQwACwtBACEBAkADQCABQcAARg0BIAVBwAFqIAFqIAVBEGogAWotAAAiAEE2czoAACAFQYACaiABaiAAQdwAczoAACABQQFqIQEMAAsLAkBB4ABFIgENACAFQcACakHggMCAAEHgAPwKAAALIAVBwAJqIAVBwAFqQcAAEKOAgIAAIAVBwAJqIAIgAxCjgICAACAFQcACaiAFQaADahCkgICAAAJAIAENACAFQbADakHggMCAAEHgAPwKAAALIAVBsANqIAVBgAJqQcAAEKOAgIAAIAVBsANqIAVBoANqQRAQo4CAgAAgBUGwA2ogBRCkgICAAEEAIQECQANAIAFBEEYNASAEIAFqIAUgAWotAAA6AAAgAUEBaiEBDAALCyAFQZAEaiSAgICAAAuFAgEEfyAAIAApAwAgAq18NwMAAkACQCAAKAIYIgMNAEEAIQQMAQsgAkHAACADayIDIAIgA0kbIQQgAEEcaiEFQQAhAwJAA0AgACgCGCEGIAQgA0YNASAAIAMgBmpqQRxqIAEgA2otAAA6AAAgA0EBaiEDDAALCyAAIAYgBGoiAzYCGCADQcAARw0AIAAgBRClgICAACAAQQA2AhgLA0ACQCAEQcAAaiIDIAJNDQAgASAEaiEBIABBHGohBkEAIQMCQANAIAQgA2ogAk8NASAGIANqIAEgA2otAAA6AAAgA0EBaiEDDAALCyAAIAM2AhgPCyAAIAEgBGoQpYCAgAAgAyEEDAALC7sCAgF+A38gACkDACECIABBHGoiAyAAKAIYakGAAToAACAAIAAoAhgiBEEBaiIFNgIYAkAgBEE4SQ0AIARBHWohBQJAA0AgBUFkakE/Sw0BIAAgBWpBADoAACAFQQFqIQUMAAsLIAAgAxClgICAAEEAIQUgAEEANgIYCyACQgOGIQICQANAAkAgBUE4Rw0AQdQAIQUCQANAIAVB3ABGDQEgACAFaiACPAAAIAVBAWohBSACQgiIIQIMAAsLIAAgAxClgICAACAAQQhqIQRBACEDA0AgA0EERg0DIAQgA0ECdGooAgAhAEEAIQUCQANAIAVBBEYNASABIAVqIAA6AAAgBUEBaiEFIABBCHYhAAwACwsgAUEEaiEBIANBAWohAwwACwsgACAFakEcakEAOgAAIAVBAWohBQwACwsLmQMBD38jgICAgABBwABrIgIkgICAgABBACEDAkADQCADQcAARg0BIAIgA2ogASADaigAADYCACADQQRqIQMMAAsLQQAhBEHAgcCAACEFQQUhBkEBIQdBACEDIAAoAhQiCCEJIAAoAhAiCiELIAAoAgwiDCENIAAoAggiDiEPA0AgDyEQIA0hASAJIQ8CQAJAAkAgB0HBAkYNACADQRBPDQEgASALcSAPIAFBf3NxciEJIAMhDQwCCyAAIA8gCGo2AhQgACALIApqNgIQIAAgASAMajYCDCAAIBAgDmo2AgggAkHAAGokgICAgAAPCwJAIANBH0sNACABIA9xIAsgD0F/c3FyIQkgB0EPcSENDAELAkAgA0EvSw0AIAZBD3EhDSALIA9zIAFzIQkMAQsgBEEPcSENIAEgD0F/c3IgC3MhCQsgCSAQaiAFKAIAaiACIA1BAnRqKAIAaiADQcCDwIAAai0AAHcgAWohDSAFQQRqIQUgBkEDaiEGIARBB2ohBCAHQQVqIQcgA0EBaiEDIAshCSABIQsMAAsLhwEBAX8jgICAgABBwABrIgMkgICAgAAgA0EIakEAKQCIhMCAADcDACADQRBqQQAoAJCEwIAANgIAIANBACkAgITAgAA3AwAgAyABQQh0IAFBCHZyOwAJIAIgA0EUaiADQRRqIABBxAkgA0EUEImAgIAAEIqAgIAAIQEgA0HAAGokgICAgAAgAQvOFAEFfyOAgICAAEGwBWsiAiSAgICAAAJAQQAoAoinwIAAIgNBH00NACADQainwIAAEKiAgIAAQSBqTw0AIAFBCEkNACAALQAAQQFHDQAgAC0AAQ0AIAAtAAINACAALQADDQAgAUF4aiEBIABBCGohAAtBAyEEAkACQCABIANqIgVBgICAAUsNACADQYynwIAAaiEDAkADQCABRQ0BIAMgAC0AADoAACAAQQFqIQAgA0EBaiEDIAFBf2ohAQwACwtBACAFNgKIp8CAAEEAIQQDQEEAKAKIp8CAACEAAkAgBEUNACAEQYynwIAAaiEDIAAgBGshAEEAIQEDQAJAIAAgAUcNAEEAIAA2AoinwIAADAILIAFBjKfAgABqIAMgAWotAAA6AAAgAUEBaiEBDAALCyAAQQhJDQJBASEEQQAtAIynwIAAQQFHDQFBAiEEQQAoAJCnwIAAQSBJDQEgAEEgSQ0CQZSnwIAAEKiAgIAAIQFBmKfAgAAQqICAgAAhA0Ggp8CAABCogICAACEGQainwIAAEKiAgIAAIgVB4P//AEsNASAAIAVBIGoiBEkNAiABIAMgBkGsp8CAACAFEICAgIAAAkACQCABQa5/ag4CAAECC0GAfSEBA0AgAUUNAgJAAkAgAUGkvcCBAGoiAC0AAEUNACABQZy9wIEAaigCACADRg0BCyABQQxqIQEMAQsLIABBADoAACABQaC9wIEAaigCACIBQaynwIAAIAVBACgC5IbAgAARgICAgACAgICAACABQaynwIAAIAUQgYCAgAAMAQsgBkGACkcNAAJAIAVBAkkNAAJAQYgDRQ0AQZCnwIEAQQBBiAP8CwALIAJBAjYCDCACIAU2AgggAkGsp8CAADYCBCACQRBqIAJBBGoQqYCAgAAgAi8BFA0AQQAhACACKAIQIQEDQAJAAkACQAJAIAFFDQAgAigCCCACKAIMRg0AIAJBGGogAkEEahCqgICAACACLwEcDQACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIAIoAhgiA0F/ag4nFgABAgMEBQYHCAkKCxUVFRUVFQwVFRESFRUVFBUVFRMVDRUODxUQFQsgAkEwaiACQQRqEJaAgIAAIAIvAUgNFkEAIAIrAzA5A+inwIEAQQAgAisDODkD8KfAgQBBACACKwNAOQP4p8CBAEGABCEDDBgLIAJB0ABqIAJBBGoQloCAgAAgAi8BaA0VQQAgAisDUDkDmKjAgQBBACACKwNYOQOgqMCBAEEAIAIrA2A5A6iowIEAQYAQIQMMFwsgAkHwAGogAkEEahCWgICAACACLwGIAQ0UQQAgAisDcDkDyKjAgQBBACACKwN4OQPQqMCBAEEAIAIrA4ABOQPYqMCBAEGAwAAhAwwWCyACQZABaiACQQRqEKuAgIAAIAIvAaABDRNBACACKwOQATkDyKfAgQBBACACKwOYATkD0KfAgQBBgAEhAwwVCyACQagBaiACQQRqEKyAgIAAIAIvAbABDRJBACACKwOoATkDqKfAgQBBECEDDBQLIAJBuAFqIAJBBGoQrYCAgAAgAi8BvAENEUEAIAIoArgBNgKYp8CBAEEEIQMMEwsgAkHAAWogAkEEahCWgICAACACLwHYAQ0QQQAgAisDwAE5A4CowIEAQQAgAisDyAE5A4iowIEAQQAgAisD0AE5A5CowIEAQYAIIQMMEgsgAkHgAWogAkEEahCWgICAACACLwH4AQ0PQQAgAisD4AE5A7CowIEAQQAgAisD6AE5A7iowIEAQQAgAisD8AE5A8CowIEAQYAgIQMMEQsgAkGAAmogAkEEahCWgICAACACLwGYAg0OQQAgAisDgAI5A+CowIEAQQAgAisDiAI5A+iowIEAQQAgAisDkAI5A/CowIEAQYCAASEDDBALIAJBoAJqIAJBBGoQq4CAgAAgAi8BsAINDUEAIAIrA6ACOQPYp8CBAEEAIAIrA6gCOQPgp8CBAEGAAiEDDA8LIAJBuAJqIAJBBGoQrICAgAAgAi8BwAINDEEAIAIrA7gCOQOwp8CBAEEgIQMMDgsgAkHIAmogAkEEahCtgICAACACLwHMAg0LQQAgAigCyAI2ApynwIEAQQghAwwNCyACQdACaiACQQRqEK2AgIAAIAIvAdQCDQpBACACKALQAjYClKfAgQBBAiEDDAwLIAJB2AJqIAJBBGoQloCAgAAgAi8B8AINCUEAIAIrA9gCOQP4qMCBAEEAIAIrA+ACOQOAqcCBAEEAIAIrA+gCOQOIqcCBAEGAgAIhAwwLCyACQfgCaiACQQRqEJaAgIAAIAIvAZADDQhBACACKwP4AjkDkKnAgQBBACACKwOAAzkDmKnAgQBBACACKwOIAzkDoKnAgQBBgIAEIQMMCgsgAkGYA2ogAkEEahCWgICAACACLwGwAw0HQQAgAisDmAM5A6ipwIEAQQAgAisDoAM5A7CpwIEAQQAgAisDqAM5A7ipwIEAQYCACCEDDAkLIAJBuANqIAJBBGoQloCAgAAgAi8B0AMNBkEAIAIrA7gDOQPAqcCBAEEAIAIrA8ADOQPIqcCBAEEAIAIrA8gDOQPQqcCBAEGAgBAhAwwICyACQdgDaiACQQRqEJaAgIAAIAIvAfADDQVBACACKwPYAzkD2KnAgQBBACACKwPgAzkD4KnAgQBBACACKwPoAzkD6KnAgQBBgIAgIQMMBwsgAkH4A2ogAkEEahCWgICAACACLwGQBA0EQQAgAisD+AM5A/CpwIEAQQAgAisDgAQ5A/ipwIEAQQAgAisDiAQ5A4CqwIEAQYCAwAAhAwwGCyACQZgEaiACQQRqEKuAgIAAIAIvAagEDQNBACACKwOYBDkDiKrAgQBBACACKwOgBDkDkKrAgQBBgICAASEDDAULIAJBsARqIAJBBGoQq4CAgAAgAi8BwAQNAkEAIAIrA7AEOQO4p8CBAEEAIAIrA7gEOQPAp8CBAEHAACEDDAQLIAJByARqIAMQroCAgAAgAi0AzARFDQECQAJAAkACQAJAIAIoAsgEDgUAAQMEAgYLIAJB0ARqIAJBBGoQr4CAgAAgAi8B2ARFDQgMBQsgAkHgBGogAkEEahCtgICAACACLwHkBEUNBwwECyACQegEaiACQQRqEKyAgIAAIAIvAfAERQ0GDAMLIAJB+ARqIAJBBGoQq4CAgAAgAi8BiAVFDQUMAgsgAkGQBWogAkEEahCWgICAACACLwGoBUUNBAwBCyACQSBqIAJBBGoQr4CAgAAgAi8BKEUNAQtBkKfAgQAQgoCAgAAMBAtBACACKQMgNwOgp8CBAEEBIQMLQQAgAyAAciIANgKQp8CBAAsgAUF/aiEBDAALC0EALQCYqsCBAEUNAEGsp8CAACAFQZmqwIEAQYAQELCAgIAAIgFFDQBBmarAgQAgARCDgICAAAwACwsgBBCEgICAAEEAQQA2AoinwIAACyACQbAFaiSAgICAAAsoACAAKAAAIgBBGHQgAEGA/gNxQQh0ciAAQQh2QYD+A3EgAEEYdnJyC34BAX8jgICAgABBEGsiAiSAgICAACACQQhqIAEQk4CAgAACQAJAIAIvAQwiAUUNACAAIAE7AQQMAQsCQCACKAIIIgFB//8DcUG4F0YNACAAQoCAgIDAADcCAAwBCyAAQQA7AQQgACABQRB2Qf8fcTYCAAsgAkEQaiSAgICAAAuUAQECfyOAgICAAEEQayICJICAgIAAIAIgARCTgICAAAJAAkAgAi8BBCIDRQ0AIAAgAzsBBAwBCwJAIAIoAgBBuZcIRg0AIABCgICAgMAANwIADAELIAJBCGogARCtgICAAAJAIAIvAQwiAUUNACAAIAE7AQQMAQsgAEEAOwEEIAAgAigCCDYCAAsgAkEQaiSAgICAAAvoAQECfyOAgICAAEEwayICJICAgIAAIAJBCGogARCTgICAAAJAAkAgAi8BDCIDRQ0AIAAgAzsBEAwBCwJAIAIoAghBwL4IRg0AIABBEGpBACkDyITAgAA3AwAgAEEIakEAKQPAhMCAADcDACAAQQApA7iEwIAANwMADAELIABBADsBECACQRBqIAEQlYCAgAACQCACLwEYIgNFDQAgACADOwEQDAELIAAgAisDEDkDACACQSBqIAEQlYCAgAACQCACLwEoIgFFDQAgACABOwEQDAELIAAgAisDIDkDCAsgAkEwaiSAgICAAAu6AgEDfyOAgICAAEEQayICJICAgIAAIAJBBGogARCRgICAAAJAAkAgAi8BBCIDRQ0AIAAgAzsBCAwBCyACLQAGIQMgAkEIaiABEJKAgIAAAkAgAi8BDCIERQ0AIAAgBDsBCAwBCwJAIANB/wFxQQNGDQAgAEEIakEAKQPYhMCAADcDACAAQQApA9CEwIAANwMADAELAkAgAigCCEEERg0AIABBCGpBACkD6ITAgAA3AwAgAEEAKQPghMCAADcDAAwBCwJAIAEoAgQgASgCCCIEa0EDSw0AIABBATsBCAwBCyAAQQA7AQggASgCACAEaigAACEDIAEgBEEEajYCCCAAIANBGHQgA0GA/gNxQQh0ciADQQh2QYD+A3EgA0EYdnJyt0QAAAAAAADwPqI5AwALIAJBEGokgICAgAAL2QEBA38jgICAgABBIGsiAiSAgICAACACQQxqIAEQkYCAgAACQAJAIAIvAQwiA0UNACAAIAM7AQQMAQsgAi0ADiEDIAJBEGogARCSgICAAAJAIAIvARQiBEUNACAAIAQ7AQQMAQsCQCADQf8BcUECRg0AIABCgICAgCA3AgAMAQsCQCACKAIQQQRGDQAgAEKAgICAMDcCAAwBCyACQRhqIAEQkoCAgAACQCACLwEcIgFFDQAgACABOwEEDAELIABBADsBBCAAIAIoAhg2AgALIAJBIGokgICAgAALNgEBf0GYhcCAACECAkAgAUF/aiIBQStLDQAgAUECdEG0hcCAAGooAgAhAgsgACACKQIANwIAC4ECAQN/I4CAgIAAQSBrIgIkgICAgAAgAkEEaiABEJGAgIAAAkACQCACLwEEIgNFDQAgACADOwEIDAELIAItAAYhAyACQQhqIAEQkoCAgAACQCACLwEMIgRFDQAgACAEOwEIDAELAkAgA0H/AXFBBkYNACAAQQhqQQApA6CEwIAANwMAIABBACkDmITAgAA3AwAMAQsCQCACKAIIQQhGDQAgAEEIakEAKQOwhMCAADcDACAAQQApA6iEwIAANwMADAELIAJBEGogARCUgICAAAJAIAIvARgiAUUNACAAIAE7AQgMAQsgAEEAOwEIIAAgAikDEDcDAAsgAkEgaiSAgICAAAv9BAIFfwN8I4CAgIAAQZABayIEJICAgIAAQQAhBQJAIAFBAU0NACAEQQI2AhQgBCABNgIQIAQgADYCDCAEQRhqIARBDGoQqYCAgAAgBC8BHA0AQQAhBSAEKAIYIQZBICEHA0ACQCAGIAVHDQAgBiEFDAILIAQoAhAgBCgCFEYNASAEQSBqIARBDGoQqoCAgAAgBC8BJA0BIARBKGogBCgCICIAEK6AgIAAIAQtACxFDQECQAJAAkACQAJAAkACQCAEKAIoIggOBQABAwQCCAsgBEEwaiAEQQxqEK+AgIAAIAQvATgNByAEKQMwuSEJDAQLIARBwABqIARBDGoQrYCAgAAgBC8BRA0GIAQoAkC4IQkMAwsgBEHIAGogBEEMahCsgICAACAELwFQDQVEAAAAAAAAAAAhCiAEKwNIIQlEAAAAAAAAAAAhCwwDCyAEQdgAaiAEQQxqEKuAgIAAIAQvAWgNBEQAAAAAAAAAACELIAQrA2AhCiAEKwNYIQkMAgsgBEHwAGogBEEMahCWgICAACAELwGIAQ0DIAQrA4ABIQsgBCsDeCEKIAQrA3AhCQwBC0QAAAAAAAAAACEKRAAAAAAAAAAAIQsLIAcgA0sNASACIAdqIgFBZ2ogCEEYdjoAACABQWZqIAhBEHY6AAAgAUFlaiAIQQh2OgAAIAFBZGogCDoAACABQWNqIABBGHY6AAAgAUFiaiAAQRB2OgAAIAFBYWogAEEIdjoAACABQWBqIAA6AAAgAUFoaiAJEJiAgIAAIAFBcGogChCYgICAACABQXhqIAsQmICAgAAgB0EgaiEHIAVBAWohBQwACwsgBEGQAWokgICAgAAgBQsCAAsNAEEAQQA2AoinwIAACxAAQQAgAEEARzoAmKrAgQALCABBmarAgQALCABBkKfAgQALBQBBiAMLCABBnL3AgQALWQEBf0EAQQE2AuyGwIAAQQBBATYC6IbAgABBCCEAAkADQCAAQYgDRg0BIABBnLrAgQBqQQA6AAAgAEEMaiEADAALC0EAQQA2AoinwIAAQQBBADYCnMHAgQALCwBBACgCnMHAgQALaQEDf0EAQQAoAuyGwIAAIgBBAWoiAUEBIAFBAUsbNgLshsCAAEEAQQAoAuiGwIAAIgFBAWoiAkEBIAJBAUsbNgLohsCAAEEAIAFBnL3AgQAQiICAgAA2ApzBwIEAIAEgABC7gICAACAAC3sBA39B9HwhAgJAA0AgAkEMaiIDRQ0BIAJBsL3AgQBqIQQgAyECIAQtAAANAAsgA0GgvcCBAGogATYCACADQZy9wIEAaiAANgIAIANBpL3AgQBqQQE6AAAPC0EAIAE2AqC6wIEAQQAgADYCnLrAgQBBAEEBOgCkusCBAAtAAQJ/QQBBACgC6IbAgAAiAUEBaiICQQEgAkEBSxs2AuiGwIAAQQAgASAAQZy9wIEAEKaAgIAANgKcwcCBAEEAC2kBA39BAEEAKALshsCAACIAQQFqIgFBASABQQFLGzYC7IbAgABBAEEAKALohsCAACIBQQFqIgJBASACQQFLGzYC6IbAgABBACABQZy9wIEAEJCAgIAANgKcwcCBACABIAAQu4CAgAAgAAtIAQJ/QQBBACgC6IbAgAAiBUEBaiIGQQEgBkEBSxs2AuiGwIAAQQAgBSAAIAEgAiADIARBnL3AgQAQi4CAgAA2ApzBwIEAQQALUAECf0EAQQAoAuiGwIAAIglBAWoiCkEBIApBAUsbNgLohsCAAEEAIAkgACABIAIgAyAEIAUgBiAHIAhBnL3AgQAQj4CAgAA2ApzBwIEAQQALaQEDf0EAQQAoAuyGwIAAIgBBAWoiAUEBIAFBAUsbNgLshsCAAEEAQQAoAuiGwIAAIgFBAWoiAkEBIAJBAUsbNgLohsCAAEEAIAFBnL3AgQAQmYCAgAA2ApzBwIEAIAEgABC7gICAACAAC2sBA39BAEEAKALshsCAACIBQQFqIgJBASACQQFLGzYC7IbAgABBAEEAKALohsCAACICQQFqIgNBASADQQFLGzYC6IbAgABBACACIABBnL3AgQAQmoCAgAA2ApzBwIEAIAIgARC7gICAACABC28BA39BAEEAKALshsCAACIDQQFqIgRBASAEQQFLGzYC7IbAgABBAEEAKALohsCAACIEQQFqIgVBASAFQQFLGzYC6IbAgABBACAEIAAgASACQZy9wIEAEJuAgIAANgKcwcCBACAEIAMQu4CAgAAgAwtrAQN/QQBBACgC7IbAgAAiAUEBaiICQQEgAkEBSxs2AuyGwIAAQQBBACgC6IbAgAAiAkEBaiIDQQEgA0EBSxs2AuiGwIAAQQAgAiAAQZy9wIEAEJyAgIAANgKcwcCBACACIAEQu4CAgAAgAQtpAQN/QQBBACgC7IbAgAAiAEEBaiIBQQEgAUEBSxs2AuyGwIAAQQBBACgC6IbAgAAiAUEBaiICQQEgAkEBSxs2AuiGwIAAQQAgAUGcvcCBABChgICAADYCnMHAgQAgASAAELuAgIAAIAALbwEDf0EAQQAoAuyGwIAAIgNBAWoiBEEBIARBAUsbNgLshsCAAEEAQQAoAuiGwIAAIgRBAWoiBUEBIAVBAUsbNgLohsCAAEEAIAQgACABIAJBnL3AgQAQnYCAgAA2ApzBwIEAIAQgAxC7gICAACADC2kBA39BAEEAKALshsCAACIAQQFqIgFBASABQQFLGzYC7IbAgABBAEEAKALohsCAACIBQQFqIgJBASACQQFLGzYC6IbAgABBACABQZy9wIEAEJ6AgIAANgKcwcCBACABIAAQu4CAgAAgAAtpAQN/QQBBACgC7IbAgAAiAEEBaiIBQQEgAUEBSxs2AuyGwIAAQQBBACgC6IbAgAAiAUEBaiICQQEgAkEBSxs2AuiGwIAAQQAgAUGcvcCBABCfgICAADYCnMHAgQAgASAAELuAgIAAIAALcQEDf0EAQQAoAuyGwIAAIgFBAWoiAkEBIAJBAUsbNgLshsCAAEEAQQAoAuiGwIAAIgJBAWoiA0EBIANBAUsbNgLohsCAAEEAIAJBiIfAgAAgAEGcvcCBABCggICAADYCnMHAgQAgAiABELuAgIAAIAELdgBBAEEBOgCgwcCBAEEAIAA7AfCGwIAAQQBBADoAocHAgQBBAEEANgKkwcCBAEEAQQA2AqjBwIEAQQBBADYCrMHAgQBBAEEANgKwwcCBABC4gICAAEEAQQAoAuSGwIAANgL0hsCAAEEAQYGAgIAANgLkhsCAAAs6AAJAIAJBgCAgAkGAIEkbIgJFDQBBtMHAgQAgASAC/AoAAAtBAEEBOgChwcCBAEEAIAI2AqTBwIEAC4YFAQh/I4CAgIAAQSBrIgAkgICAgABBAC0AocHAgQBBAXEhAUEAKAKkwcCBACICQQVLIQMgAkELSyEEQQAoAqjBwIEAIgUhBgN/QQMhBwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAQQAtAKDBwIEAQQ9xDgwPAAECAwQFDQYICQoPCxC6gICAABpBAEECOgCgwcCBAEEAQQA6AKHBwIEAQQEhBwwOCyABRQ0FQQMhBwwQCxDAgICAABpBAEEEOgCgwcCBAEEAQQA6AKHBwIEAQQEhBwwMCyABRQ0DQQAhBSADDQcMDQsgBRDBgICAABpBAEEGOgCgwcCBAEEAQQA6AKHBwIEAQQEhBwwKCyABRQ0BIAYNBkEAIQYMCgsgAQ0JC0ECIQcMBwtBAC8B8IbAgAAQvICAgAAaQQBBCjoAoMHAgQBBASEHDAYLQQBBACgC9IbAgAA2AuSGwIAADAULQQBBACgC9IbAgAA2AuSGwIAADAMLIAIQzICAgAAhBQwFCwJAIAQNAEEAQQs6AKDBwIEADAILQQAgAkEAEM2AgIAANgKswcCBAEEAIAJBARDNgICAADYCsMHAgQBBByEHDAULIABBCGogAhDOgICAAAJAIAAoAggiB0UNAEGghcCAAEERIAcgACgCDCAAQRBqEKKAgIAAQQAoAqzBwIEAQQAoArDBwIEAIABBEGoQwoCAgAAaQQBBCDoAoMHAgQBBAEEAOgChwcCBAEEBIQcMAgtBAEELOgCgwcCBAAtBBCEHCyAAQSBqJICAgIAAIAcPC0EJIQcMAQtBACAFNgKowcCBAEEFIQcgBSEGC0EAIAc6AKDBwIEADAALC4MBAQN/QQIhAQN/AkAgAUEEaiICIABNDQBBAA8LAkAgAUG2wcCBAGovAAAiA0GACEcNACABQQhqIABLDQAgAkG0wcCBAGooAAAiAUEYdCABQYD+A3FBCHRyIAFBCHZBgP4DcSABQRh2cnIPCyACIANBCHQgA0EIdnJB//8DcWohAQwACwudAQEFf0EAIQJBAiEDQQAhBAN/AkACQAJAIANBBGoiBSAASw0AIANBtsHAgQBqLwAAIgZBgAhHDQIgA0EIaiAASw0CIAQgAUcNASAFQbTBwIEAaigAACIDQRh0IANBgP4DcUEIdHIgA0EIdkGA/gNxIANBGHZyciECCyACDwsgBEEBaiEECyAFIAZBCHQgBkEIdnJB//8DcWohAwwACwtxAQN/QQIhAgJAA0ACQCACQQRqIgMgAU0NAEEAIQJBACEEDAILIAMgAkG2wcCBAGovAAAiAkEIdCACQQh2ckH//wNxIgRqIQIgBEEFSQ0AIAIgAUsNAAsgA0G0wcCBAGohAgsgACACNgIAIAAgBDYCBAtrAQF/QQBBAToAtOHAgQBBACgC5IbAgAAhAEEAQYGAgIAANgLkhsCAAEEAIAA2AviGwIAAQQBBADYCuOHAgQBBAEEANgK84cCBAEEAQQA2AsDhwIEAQQBBADoAocHAgQBBAEEANgKkwcCBAAvPBAEIfyOAgICAAEEgayIAJICAgIAAQQAtAKHBwIEAQQFxIQFBACgCpMHAgQAiAkEFSyEDIAJBDEkhBEEAKAK44cCBACIFIQYCQAJAA0BBAyEHAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQEEALQC04cCBAEEPcQ4JEAABAgcIAwQFEAsQwICAgAAaQQBBAjoAtOHAgQBBAEEAOgChwcCBAEEBIQcMDwsgAQ0EDA0LIAUQwYCAgAAaQQBBBDoAtOHAgQBBAEEAOgChwcCBAEEBIQcMDQtBByEHIAFFDQsMCQtBAEEAKAL4hsCAADYC5IbAgAAMCwtBAEEAKAL4hsCAADYC5IbAgAAMBAtBACEFIANFDQUgAhDMgICAACEFDAULIAFFDQcCQCAGDQBBACEGQQAhByADRQ0EIAIQzICAgAAhBwwECyAEDQFBACACQQAQzYCAgAA2ArzhwIEAQQAgAkEBEM2AgIAANgLA4cCBAEEFIQcMBQsgAEEIaiACEM6AgIAAAkAgACgCCCIHRQ0AQaCFwIAAQREgByAAKAIMIABBEGoQooCAgABBACgCvOHAgQBBACgCwOHAgQAgAEEQahDCgICAABpBAEEGOgC04cCBAEEAQQA6AKHBwIEAQQEhBwwIC0EAQQg6ALThwIEADAELQQBBCDoAtOHAgQALQQQhBwwFC0EAIAc2ArzhwIEAQQchBwwBC0EAIAU2ArjhwIEAQQMhByAFIQYLQQAgBzoAtOHAgQAMAAsLQQIhBwsgAEEgaiSAgICAACAHCwsAQQAoArzhwIEAC1UBAX9BAEEBOgDE4cCBAEEAKALkhsCAACEAQQBBgYCAgAA2AuSGwIAAQQAgADYC/IbAgABBAEEANgLI4cCBAEEAQQA6AKHBwIEAQQBBADYCpMHAgQAL1gIBA39BACgCpMHAgQAiAEGAICAAQYAgSRshAUEALQChwcCBAEEBcSECAkACQAJAA0BBAyEAAkACQAJAAkACQAJAAkACQAJAAkBBAC0AxOHAgQBBD3EOCQ0LAAECAwQGBw0LIAJFDQRBAyEADAgLEMeAgIAAGkEAQQQ6AMThwIEAQQBBADoAocHAgQAMCgsgAkUNAgJAIAFFDQBBiIfAgABBtMHAgQAgAfwKAAALQQAgATYCyOHAgQBBBSEADAYLQQAoArzhwIEAEMOAgIAAGkEAQQY6AMThwIEAQQBBADoAocHAgQAMCAsgAg0DC0ECDwtBAEEAKAL8hsCAADYC5IbAgABBAw8LQQBBACgC/IbAgAA2AuSGwIAAQQQPC0EHIQALQQAgADoAxOHAgQAMAAsLEMaAgIAAGkEAQQI6AMThwIEAQQBBADoAocHAgQALQQEhAAsgAAsIAEGIh8CAAAsLAEEAKALI4cCBAAseAEEAIAA2AtDhwIEAQQBBAToAzOHAgQAQz4CAgAALzwIBAX8CQAJAAkACQANAQQMhAAJAAkACQAJAAkACQAJAAkACQEEALQDM4cCBAEEHcQ4IDAAKAQIDBAUMCxDQgICAACIAQX9qDgQLCwUGCwtBAC0AocHAgQANBgwLC0EAKAK84cCBABDDgICAABpBAEEFOgDM4cCBAEEAQQA6AKHBwIEADAgLQQAtAKHBwIEARQ0JQQBBBjoAzOHAgQAMBQtBAEEAKAKAh8CAADYC5IbAgABBAw8LQQBBACgCgIfAgAA2AuSGwIAAQQQPC0EAQQI6AMzhwIEAQQAoAuSGwIAAIQBBAEGBgICAADYC5IbAgABBACAANgKAh8CAAAwCC0EAQQc6AMzhwIEAQQQPC0EAQQQ6AMzhwIEADAALC0EAKALQ4cCBABDIgICAABpBAEEDOgDM4cCBAEEAQQA6AKHBwIEAC0EBIQALIAAPC0ECC6sBAgJ+AXwCQCAAvSIBQjSIQv8PgyICQrMIWg0AAkAgAkL9B1YNACAARAAAAAAAAAAAog8LAkACQCAAmSIARAAAAAAAADBDoEQAAAAAAAAww6AgAKEiA0QAAAAAAADgP2QNACAAIAOgIQAgA0QAAAAAAADgv2VFDQEgAEQAAAAAAADwP6AhAAwBCyAAIAOgRAAAAAAAAPC/oCEACyAAmiAAIAFCAFMbIQALIAALC5YHAgBBgIDAAAvkBgAAFwAAACgAAAAJAAEAAAABAAEAAQACAAEAAwABAAQAAQAFAAEABgABAAcAAQAIAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAASNFZ4mrze/+3LqYdlQyEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHikatdWt8fo23AgJO7OvcGvD3z1KsaHRxNGMKgBlUb92JiAaa/3RIuxW///vtdciSIRkGuTcZj9jkN5piEItEliJR72QLNAwFFaXiaqx7bpXRAv1lMURAKB5qHYyPvT5+bN4SHWBzfDhw3V9O0UWkUF6eOp+KPv/NkCb2eKTCqNQjn6/4H2cYciYZ1tDDjl/UTqvqSpz95LYEu79nC8v77Gfpso+ieh6oUw79QFHYgEOdDU2eWZ2+b4fKIfZVasxEQiKfSX/ypDpyOUqzmgk/zDWVtlkswMj3307//RXYSFT36ob+DmLP4UQwGjoREIToJ+U/c18jq9u9LXKpHThusHDBEWBwwRFgcMERYHDBEWBQkOFAUJDhQFCQ4UBQkOFAQLEBcECxAXBAsQFwQLEBcGCg8VBgoPFQYKDxUGCg8VAAACAAAABAAAAAAXAAAABAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAABAAAAAwAAAAEAAAACAAAAAQAAAAQAAAABAAAAAQAAAAEAAAAAAAAAAAAAAElTMkxKQzZHSVJCQkVLMksAAAAAcAIQAHgCEAB4AhAAeAIQAIACEACIAhAAkAIQAHgCEAB4AhAAeAIQAIACEACIAhAAkAIQAJACEACYAhAAmAIQAJACEACYAhAAmAIQAJACEACQAhAAkAIQAHgCEAB4AhAAgAIQAIACEACQAhAAgAIQAJACEACQAhAAkAIQAIACEACQAhAAeAIQAJACEAB4AhAAeAIQAJACEAB4AhAAkAIQAIgCEACQAhAAiAIQAJACEAAAQeSGwAALIAIAAAABAAAAAQAAAAAFAAACAAAAAgAAAAIAAAACAAAA";function sd(){const i=atob(rd),e=new ArrayBuffer(i.length),t=new Uint8Array(e);for(let n=0;n<i.length;n++)t[n]=i.charCodeAt(n);return t}async function ad(){if(typeof navigator<"u"&&"usb"in navigator)return navigator.usb.requestDevice({filters:[{vendorId:ps,productId:As}]});const t=(await import("usb").catch(()=>{throw new Error("WebUSB not available and the `usb` package is not installed. In Node, add `usb` as a dependency or pass `device` explicitly.")})).WebUSB,s=(await new t({allowAllDevices:!0}).getDevices()).find(a=>a.vendorId===ps&&a.productId===As);if(!s)throw new Error(`ET5 not found (vid=0x${ps.toString(16)} pid=0x${As.toString(16)})`);return s}const So={async fromUsb(i={}){const e=i.device??await ad(),t=await Cs.fromDevice(e);return yo.create({transport:t,wasmBytes:sd(),requestTimeoutMs:i.requestTimeoutMs})},async fromDaemon(i){return Mo.connect(i.url,i.requestTimeoutMs)},async createSession(i={}){return So.fromUsb(i)}};/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Co="183",od=0,tl=1,ld=2,ms=1,cd=2,vr=3,oi=0,qt=1,wn=2,Vn=0,Ji=1,nl=2,il=3,rl=4,ud=5,vi=100,dd=101,hd=102,fd=103,pd=104,Ad=200,md=201,gd=202,_d=203,ba=204,Ia=205,xd=206,Ed=207,vd=208,yd=209,Md=210,Sd=211,Cd=212,wd=213,bd=214,Ta=0,Ra=1,Ba=2,$i=3,Da=4,La=5,Pa=6,Fa=7,hc=0,Id=1,Td=2,Tn=0,fc=1,pc=2,Ac=3,mc=4,gc=5,_c=6,xc=7,Ec=300,wi=301,Zi=302,Gs=303,Vs=304,Ls=306,Na=1e3,zn=1001,Ua=1002,Pt=1003,Rd=1004,zr=1005,Qt=1006,Hs=1007,Mi=1008,nn=1009,vc=1010,yc=1011,br=1012,wo=1013,Bn=1014,bn=1015,Wn=1016,bo=1017,Io=1018,Ir=1020,Mc=35902,Sc=35899,Cc=1021,wc=1022,gn=1023,Xn=1026,Si=1027,bc=1028,To=1029,ji=1030,Ro=1031,Bo=1033,gs=33776,_s=33777,xs=33778,Es=33779,Oa=35840,za=35841,Qa=35842,ka=35843,Ga=36196,Va=37492,Ha=37496,Wa=37488,Xa=37489,Ya=37490,qa=37491,Ja=37808,Ka=37809,$a=37810,Za=37811,ja=37812,eo=37813,to=37814,no=37815,io=37816,ro=37817,so=37818,ao=37819,oo=37820,lo=37821,co=36492,uo=36494,ho=36495,fo=36283,po=36284,Ao=36285,mo=36286,Bd=3200,Ic=0,Dd=1,ri="",ln="srgb",er="srgb-linear",ws="linear",ct="srgb",Pi=7680,sl=519,Ld=512,Pd=513,Fd=514,Do=515,Nd=516,Ud=517,Lo=518,Od=519,al=35044,ol="300 es",In=2e3,Tr=2001;function zd(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function bs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Qd(){const i=bs("canvas");return i.style.display="block",i}const ll={};function cl(...i){const e="THREE."+i.shift();console.log(e,...i)}function Tc(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Pe(...i){i=Tc(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function it(...i){i=Tc(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Is(...i){const e=i.join(" ");e in ll||(ll[e]=!0,Pe(...i))}function kd(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const Gd={[Ta]:Ra,[Ba]:Pa,[Da]:Fa,[$i]:La,[Ra]:Ta,[Pa]:Ba,[Fa]:Da,[La]:$i};class nr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Ot=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],vs=Math.PI/180,go=180/Math.PI;function Br(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ot[i&255]+Ot[i>>8&255]+Ot[i>>16&255]+Ot[i>>24&255]+"-"+Ot[e&255]+Ot[e>>8&255]+"-"+Ot[e>>16&15|64]+Ot[e>>24&255]+"-"+Ot[t&63|128]+Ot[t>>8&255]+"-"+Ot[t>>16&255]+Ot[t>>24&255]+Ot[n&255]+Ot[n>>8&255]+Ot[n>>16&255]+Ot[n>>24&255]).toLowerCase()}function Xe(i,e,t){return Math.max(e,Math.min(t,i))}function Vd(i,e){return(i%e+e)%e}function Ws(i,e,t){return(1-t)*i+t*e}function hr(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Xt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class rt{constructor(e=0,t=0){rt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Xe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Xe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ir{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let c=n[r+0],l=n[r+1],h=n[r+2],A=n[r+3],u=s[a+0],p=s[a+1],m=s[a+2],E=s[a+3];if(A!==E||c!==u||l!==p||h!==m){let f=c*u+l*p+h*m+A*E;f<0&&(u=-u,p=-p,m=-m,E=-E,f=-f);let d=1-o;if(f<.9995){const v=Math.acos(f),M=Math.sin(v);d=Math.sin(d*v)/M,o=Math.sin(o*v)/M,c=c*d+u*o,l=l*d+p*o,h=h*d+m*o,A=A*d+E*o}else{c=c*d+u*o,l=l*d+p*o,h=h*d+m*o,A=A*d+E*o;const v=1/Math.sqrt(c*c+l*l+h*h+A*A);c*=v,l*=v,h*=v,A*=v}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=A}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],c=n[r+1],l=n[r+2],h=n[r+3],A=s[a],u=s[a+1],p=s[a+2],m=s[a+3];return e[t]=o*m+h*A+c*p-l*u,e[t+1]=c*m+h*u+l*A-o*p,e[t+2]=l*m+h*p+o*u-c*A,e[t+3]=h*m-o*A-c*u-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(r/2),A=o(s/2),u=c(n/2),p=c(r/2),m=c(s/2);switch(a){case"XYZ":this._x=u*h*A+l*p*m,this._y=l*p*A-u*h*m,this._z=l*h*m+u*p*A,this._w=l*h*A-u*p*m;break;case"YXZ":this._x=u*h*A+l*p*m,this._y=l*p*A-u*h*m,this._z=l*h*m-u*p*A,this._w=l*h*A+u*p*m;break;case"ZXY":this._x=u*h*A-l*p*m,this._y=l*p*A+u*h*m,this._z=l*h*m+u*p*A,this._w=l*h*A-u*p*m;break;case"ZYX":this._x=u*h*A-l*p*m,this._y=l*p*A+u*h*m,this._z=l*h*m-u*p*A,this._w=l*h*A+u*p*m;break;case"YZX":this._x=u*h*A+l*p*m,this._y=l*p*A+u*h*m,this._z=l*h*m-u*p*A,this._w=l*h*A-u*p*m;break;case"XZY":this._x=u*h*A-l*p*m,this._y=l*p*A-u*h*m,this._z=l*h*m+u*p*A,this._w=l*h*A+u*p*m;break;default:Pe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],A=t[10],u=n+o+A;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-c)*p,this._y=(s-l)*p,this._z=(a-r)*p}else if(n>o&&n>A){const p=2*Math.sqrt(1+n-o-A);this._w=(h-c)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+l)/p}else if(o>A){const p=2*Math.sqrt(1+o-n-A);this._w=(s-l)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(c+h)/p}else{const p=2*Math.sqrt(1+A-n-o);this._w=(a-r)/p,this._x=(s+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Xe(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+r*l-s*c,this._y=r*h+a*c+s*o-n*l,this._z=s*h+a*l+n*c-r*o,this._w=a*h-n*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(e=0,t=0,n=0){N.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ul.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ul.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*n),h=2*(o*t-s*r),A=2*(s*n-a*t);return this.x=t+c*l+a*A-o*h,this.y=n+c*h+o*l-s*A,this.z=r+c*A+s*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this.z=Xe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this.z=Xe(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Xe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-n*c,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Xs.copy(this).projectOnVector(e),this.sub(Xs)}reflect(e){return this.sub(Xs.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Xe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Xs=new N,ul=new ir;class ze{constructor(e,t,n,r,s,a,o,c,l){ze.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l)}set(e,t,n,r,s,a,o,c,l){const h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],A=n[7],u=n[2],p=n[5],m=n[8],E=r[0],f=r[3],d=r[6],v=r[1],M=r[4],S=r[7],b=r[2],w=r[5],T=r[8];return s[0]=a*E+o*v+c*b,s[3]=a*f+o*M+c*w,s[6]=a*d+o*S+c*T,s[1]=l*E+h*v+A*b,s[4]=l*f+h*M+A*w,s[7]=l*d+h*S+A*T,s[2]=u*E+p*v+m*b,s[5]=u*f+p*M+m*w,s[8]=u*d+p*S+m*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*s*h+n*o*c+r*s*l-r*a*c}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],A=h*a-o*l,u=o*c-h*s,p=l*s-a*c,m=t*A+n*u+r*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const E=1/m;return e[0]=A*E,e[1]=(r*l-h*n)*E,e[2]=(o*n-r*a)*E,e[3]=u*E,e[4]=(h*t-r*c)*E,e[5]=(r*s-o*t)*E,e[6]=p*E,e[7]=(n*c-l*t)*E,e[8]=(a*t-n*s)*E,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Ys.makeScale(e,t)),this}rotate(e){return this.premultiply(Ys.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ys.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ys=new ze,dl=new ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),hl=new ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Hd(){const i={enabled:!0,workingColorSpace:er,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ct&&(r.r=Hn(r.r),r.g=Hn(r.g),r.b=Hn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ct&&(r.r=Ki(r.r),r.g=Ki(r.g),r.b=Ki(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===ri?ws:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Is("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Is("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[er]:{primaries:e,whitePoint:n,transfer:ws,toXYZ:dl,fromXYZ:hl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ln},outputColorSpaceConfig:{drawingBufferColorSpace:ln}},[ln]:{primaries:e,whitePoint:n,transfer:ct,toXYZ:dl,fromXYZ:hl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ln}}}),i}const et=Hd();function Hn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ki(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Fi;class Wd{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Fi===void 0&&(Fi=bs("canvas")),Fi.width=e.width,Fi.height=e.height;const r=Fi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=Fi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=bs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Hn(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Hn(t[n]/255)*255):t[n]=Hn(t[n]);return{data:t,width:e.width,height:e.height}}else return Pe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Xd=0;class Po{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Xd++}),this.uuid=Br(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(qs(r[a].image)):s.push(qs(r[a]))}else s=qs(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function qs(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Wd.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Pe("Texture: Unable to serialize Texture."),{})}let Yd=0;const Js=new N;class Wt extends nr{constructor(e=Wt.DEFAULT_IMAGE,t=Wt.DEFAULT_MAPPING,n=zn,r=zn,s=Qt,a=Mi,o=gn,c=nn,l=Wt.DEFAULT_ANISOTROPY,h=ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Yd++}),this.uuid=Br(),this.name="",this.source=new Po(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new rt(0,0),this.repeat=new rt(1,1),this.center=new rt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Js).x}get height(){return this.source.getSize(Js).y}get depth(){return this.source.getSize(Js).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Pe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Pe(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ec)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Na:e.x=e.x-Math.floor(e.x);break;case zn:e.x=e.x<0?0:1;break;case Ua:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Na:e.y=e.y-Math.floor(e.y);break;case zn:e.y=e.y<0?0:1;break;case Ua:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Wt.DEFAULT_IMAGE=null;Wt.DEFAULT_MAPPING=Ec;Wt.DEFAULT_ANISOTROPY=1;class Et{constructor(e=0,t=0,n=0,r=1){Et.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const c=e.elements,l=c[0],h=c[4],A=c[8],u=c[1],p=c[5],m=c[9],E=c[2],f=c[6],d=c[10];if(Math.abs(h-u)<.01&&Math.abs(A-E)<.01&&Math.abs(m-f)<.01){if(Math.abs(h+u)<.1&&Math.abs(A+E)<.1&&Math.abs(m+f)<.1&&Math.abs(l+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(l+1)/2,S=(p+1)/2,b=(d+1)/2,w=(h+u)/4,T=(A+E)/4,_=(m+f)/4;return M>S&&M>b?M<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(M),r=w/n,s=T/n):S>b?S<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),n=w/r,s=_/r):b<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(b),n=T/s,r=_/s),this.set(n,r,s,t),this}let v=Math.sqrt((f-m)*(f-m)+(A-E)*(A-E)+(u-h)*(u-h));return Math.abs(v)<.001&&(v=1),this.x=(f-m)/v,this.y=(A-E)/v,this.z=(u-h)/v,this.w=Math.acos((l+p+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this.z=Xe(this.z,e.z,t.z),this.w=Xe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this.z=Xe(this.z,e,t),this.w=Xe(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Xe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class qd extends nr{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Et(0,0,e,t),this.scissorTest=!1,this.viewport=new Et(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:n.depth},s=new Wt(r),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Qt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Po(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Rn extends qd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Rc extends Wt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Pt,this.minFilter=Pt,this.wrapR=zn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Jd extends Wt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Pt,this.minFilter=Pt,this.wrapR=zn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class mt{constructor(e,t,n,r,s,a,o,c,l,h,A,u,p,m,E,f){mt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l,h,A,u,p,m,E,f)}set(e,t,n,r,s,a,o,c,l,h,A,u,p,m,E,f){const d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=r,d[1]=s,d[5]=a,d[9]=o,d[13]=c,d[2]=l,d[6]=h,d[10]=A,d[14]=u,d[3]=p,d[7]=m,d[11]=E,d[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new mt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,r=1/Ni.setFromMatrixColumn(e,0).length(),s=1/Ni.setFromMatrixColumn(e,1).length(),a=1/Ni.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(r),l=Math.sin(r),h=Math.cos(s),A=Math.sin(s);if(e.order==="XYZ"){const u=a*h,p=a*A,m=o*h,E=o*A;t[0]=c*h,t[4]=-c*A,t[8]=l,t[1]=p+m*l,t[5]=u-E*l,t[9]=-o*c,t[2]=E-u*l,t[6]=m+p*l,t[10]=a*c}else if(e.order==="YXZ"){const u=c*h,p=c*A,m=l*h,E=l*A;t[0]=u+E*o,t[4]=m*o-p,t[8]=a*l,t[1]=a*A,t[5]=a*h,t[9]=-o,t[2]=p*o-m,t[6]=E+u*o,t[10]=a*c}else if(e.order==="ZXY"){const u=c*h,p=c*A,m=l*h,E=l*A;t[0]=u-E*o,t[4]=-a*A,t[8]=m+p*o,t[1]=p+m*o,t[5]=a*h,t[9]=E-u*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const u=a*h,p=a*A,m=o*h,E=o*A;t[0]=c*h,t[4]=m*l-p,t[8]=u*l+E,t[1]=c*A,t[5]=E*l+u,t[9]=p*l-m,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const u=a*c,p=a*l,m=o*c,E=o*l;t[0]=c*h,t[4]=E-u*A,t[8]=m*A+p,t[1]=A,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=p*A+m,t[10]=u-E*A}else if(e.order==="XZY"){const u=a*c,p=a*l,m=o*c,E=o*l;t[0]=c*h,t[4]=-A,t[8]=l*h,t[1]=u*A+E,t[5]=a*h,t[9]=p*A-m,t[2]=m*A-p,t[6]=o*h,t[10]=E*A+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Kd,e,$d)}lookAt(e,t,n){const r=this.elements;return jt.subVectors(e,t),jt.lengthSq()===0&&(jt.z=1),jt.normalize(),$n.crossVectors(n,jt),$n.lengthSq()===0&&(Math.abs(n.z)===1?jt.x+=1e-4:jt.z+=1e-4,jt.normalize(),$n.crossVectors(n,jt)),$n.normalize(),Qr.crossVectors(jt,$n),r[0]=$n.x,r[4]=Qr.x,r[8]=jt.x,r[1]=$n.y,r[5]=Qr.y,r[9]=jt.y,r[2]=$n.z,r[6]=Qr.z,r[10]=jt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],A=n[5],u=n[9],p=n[13],m=n[2],E=n[6],f=n[10],d=n[14],v=n[3],M=n[7],S=n[11],b=n[15],w=r[0],T=r[4],_=r[8],y=r[12],W=r[1],I=r[5],Q=r[9],G=r[13],H=r[2],z=r[6],k=r[10],U=r[14],j=r[3],Z=r[7],he=r[11],fe=r[15];return s[0]=a*w+o*W+c*H+l*j,s[4]=a*T+o*I+c*z+l*Z,s[8]=a*_+o*Q+c*k+l*he,s[12]=a*y+o*G+c*U+l*fe,s[1]=h*w+A*W+u*H+p*j,s[5]=h*T+A*I+u*z+p*Z,s[9]=h*_+A*Q+u*k+p*he,s[13]=h*y+A*G+u*U+p*fe,s[2]=m*w+E*W+f*H+d*j,s[6]=m*T+E*I+f*z+d*Z,s[10]=m*_+E*Q+f*k+d*he,s[14]=m*y+E*G+f*U+d*fe,s[3]=v*w+M*W+S*H+b*j,s[7]=v*T+M*I+S*z+b*Z,s[11]=v*_+M*Q+S*k+b*he,s[15]=v*y+M*G+S*U+b*fe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],A=e[6],u=e[10],p=e[14],m=e[3],E=e[7],f=e[11],d=e[15],v=c*p-l*u,M=o*p-l*A,S=o*u-c*A,b=a*p-l*h,w=a*u-c*h,T=a*A-o*h;return t*(E*v-f*M+d*S)-n*(m*v-f*b+d*w)+r*(m*M-E*b+d*T)-s*(m*S-E*w+f*T)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],A=e[9],u=e[10],p=e[11],m=e[12],E=e[13],f=e[14],d=e[15],v=t*o-n*a,M=t*c-r*a,S=t*l-s*a,b=n*c-r*o,w=n*l-s*o,T=r*l-s*c,_=h*E-A*m,y=h*f-u*m,W=h*d-p*m,I=A*f-u*E,Q=A*d-p*E,G=u*d-p*f,H=v*G-M*Q+S*I+b*W-w*y+T*_;if(H===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const z=1/H;return e[0]=(o*G-c*Q+l*I)*z,e[1]=(r*Q-n*G-s*I)*z,e[2]=(E*T-f*w+d*b)*z,e[3]=(u*w-A*T-p*b)*z,e[4]=(c*W-a*G-l*y)*z,e[5]=(t*G-r*W+s*y)*z,e[6]=(f*S-m*T-d*M)*z,e[7]=(h*T-u*S+p*M)*z,e[8]=(a*Q-o*W+l*_)*z,e[9]=(n*W-t*Q-s*_)*z,e[10]=(m*w-E*S+d*v)*z,e[11]=(A*S-h*w-p*v)*z,e[12]=(o*y-a*I-c*_)*z,e[13]=(t*I-n*y+r*_)*z,e[14]=(E*M-m*b-f*v)*z,e[15]=(h*b-A*M+u*v)*z,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,h=s*o;return this.set(l*a+n,l*o-r*c,l*c+r*o,0,l*o+r*c,h*o+n,h*c-r*a,0,l*c-r*o,h*c+r*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,h=a+a,A=o+o,u=s*l,p=s*h,m=s*A,E=a*h,f=a*A,d=o*A,v=c*l,M=c*h,S=c*A,b=n.x,w=n.y,T=n.z;return r[0]=(1-(E+d))*b,r[1]=(p+S)*b,r[2]=(m-M)*b,r[3]=0,r[4]=(p-S)*w,r[5]=(1-(u+d))*w,r[6]=(f+v)*w,r[7]=0,r[8]=(m+M)*T,r[9]=(f-v)*T,r[10]=(1-(u+E))*T,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinant();if(s===0)return n.set(1,1,1),t.identity(),this;let a=Ni.set(r[0],r[1],r[2]).length();const o=Ni.set(r[4],r[5],r[6]).length(),c=Ni.set(r[8],r[9],r[10]).length();s<0&&(a=-a),hn.copy(this);const l=1/a,h=1/o,A=1/c;return hn.elements[0]*=l,hn.elements[1]*=l,hn.elements[2]*=l,hn.elements[4]*=h,hn.elements[5]*=h,hn.elements[6]*=h,hn.elements[8]*=A,hn.elements[9]*=A,hn.elements[10]*=A,t.setFromRotationMatrix(hn),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,r,s,a,o=In,c=!1){const l=this.elements,h=2*s/(t-e),A=2*s/(n-r),u=(t+e)/(t-e),p=(n+r)/(n-r);let m,E;if(c)m=s/(a-s),E=a*s/(a-s);else if(o===In)m=-(a+s)/(a-s),E=-2*a*s/(a-s);else if(o===Tr)m=-a/(a-s),E=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=A,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=E,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=In,c=!1){const l=this.elements,h=2/(t-e),A=2/(n-r),u=-(t+e)/(t-e),p=-(n+r)/(n-r);let m,E;if(c)m=1/(a-s),E=a/(a-s);else if(o===In)m=-2/(a-s),E=-(a+s)/(a-s);else if(o===Tr)m=-1/(a-s),E=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=A,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=m,l[14]=E,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ni=new N,hn=new mt,Kd=new N(0,0,0),$d=new N(1,1,1),$n=new N,Qr=new N,jt=new N,fl=new mt,pl=new ir;class Dn{constructor(e=0,t=0,n=0,r=Dn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],h=r[9],A=r[2],u=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Xe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Xe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-A,s),this._z=0);break;case"ZXY":this._x=Math.asin(Xe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-A,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Xe(A,-1,1)),Math.abs(A)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Xe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-A,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Xe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Pe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return fl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(fl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return pl.setFromEuler(this),this.setFromQuaternion(pl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Dn.DEFAULT_ORDER="XYZ";class Bc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Zd=0;const Al=new N,Ui=new ir,Pn=new mt,kr=new N,fr=new N,jd=new N,eh=new ir,ml=new N(1,0,0),gl=new N(0,1,0),_l=new N(0,0,1),xl={type:"added"},th={type:"removed"},Oi={type:"childadded",child:null},Ks={type:"childremoved",child:null};class Ft extends nr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Zd++}),this.uuid=Br(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ft.DEFAULT_UP.clone();const e=new N,t=new Dn,n=new ir,r=new N(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new mt},normalMatrix:{value:new ze}}),this.matrix=new mt,this.matrixWorld=new mt,this.matrixAutoUpdate=Ft.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Bc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ui.setFromAxisAngle(e,t),this.quaternion.multiply(Ui),this}rotateOnWorldAxis(e,t){return Ui.setFromAxisAngle(e,t),this.quaternion.premultiply(Ui),this}rotateX(e){return this.rotateOnAxis(ml,e)}rotateY(e){return this.rotateOnAxis(gl,e)}rotateZ(e){return this.rotateOnAxis(_l,e)}translateOnAxis(e,t){return Al.copy(e).applyQuaternion(this.quaternion),this.position.add(Al.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ml,e)}translateY(e){return this.translateOnAxis(gl,e)}translateZ(e){return this.translateOnAxis(_l,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Pn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?kr.copy(e):kr.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),fr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Pn.lookAt(fr,kr,this.up):Pn.lookAt(kr,fr,this.up),this.quaternion.setFromRotationMatrix(Pn),r&&(Pn.extractRotation(r.matrixWorld),Ui.setFromRotationMatrix(Pn),this.quaternion.premultiply(Ui.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(it("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(xl),Oi.child=e,this.dispatchEvent(Oi),Oi.child=null):it("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(th),Ks.child=e,this.dispatchEvent(Ks),Ks.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Pn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Pn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Pn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(xl),Oi.child=e,this.dispatchEvent(Oi),Oi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fr,e,jd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fr,eh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const A=c[l];s(e.shapes,A)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),A=a(e.shapes),u=a(e.skeletons),p=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),A.length>0&&(n.shapes=A),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),m.length>0&&(n.nodes=m)}return n.object=r,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),e.pivot!==null&&(this.pivot=e.pivot.clone()),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}Ft.DEFAULT_UP=new N(0,1,0);Ft.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class tn extends Ft{constructor(){super(),this.isGroup=!0,this.type="Group"}}const nh={type:"move"};class $s{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new tn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new tn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new tn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const E of e.hand.values()){const f=t.getJointPose(E,n),d=this._getHandJoint(l,E);f!==null&&(d.matrix.fromArray(f.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=f.radius),d.visible=f!==null}const h=l.joints["index-finger-tip"],A=l.joints["thumb-tip"],u=h.position.distanceTo(A.position),p=.02,m=.005;l.inputState.pinching&&u>p+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=p-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(nh)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new tn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Dc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zn={h:0,s:0,l:0},Gr={h:0,s:0,l:0};function Zs(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Je{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ln){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=et.workingColorSpace){return this.r=e,this.g=t,this.b=n,et.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=et.workingColorSpace){if(e=Vd(e,1),t=Xe(t,0,1),n=Xe(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Zs(a,s,e+1/3),this.g=Zs(a,s,e),this.b=Zs(a,s,e-1/3)}return et.colorSpaceToWorking(this,r),this}setStyle(e,t=ln){function n(s){s!==void 0&&parseFloat(s)<1&&Pe("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Pe("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Pe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ln){const n=Dc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Pe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Hn(e.r),this.g=Hn(e.g),this.b=Hn(e.b),this}copyLinearToSRGB(e){return this.r=Ki(e.r),this.g=Ki(e.g),this.b=Ki(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ln){return et.workingToColorSpace(zt.copy(this),e),Math.round(Xe(zt.r*255,0,255))*65536+Math.round(Xe(zt.g*255,0,255))*256+Math.round(Xe(zt.b*255,0,255))}getHexString(e=ln){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.workingToColorSpace(zt.copy(this),t);const n=zt.r,r=zt.g,s=zt.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const A=a-o;switch(l=h<=.5?A/(a+o):A/(2-a-o),a){case n:c=(r-s)/A+(r<s?6:0);break;case r:c=(s-n)/A+2;break;case s:c=(n-r)/A+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=et.workingColorSpace){return et.workingToColorSpace(zt.copy(this),t),e.r=zt.r,e.g=zt.g,e.b=zt.b,e}getStyle(e=ln){et.workingToColorSpace(zt.copy(this),e);const t=zt.r,n=zt.g,r=zt.b;return e!==ln?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Zn),this.setHSL(Zn.h+e,Zn.s+t,Zn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Zn),e.getHSL(Gr);const n=Ws(Zn.h,Gr.h,t),r=Ws(Zn.s,Gr.s,t),s=Ws(Zn.l,Gr.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const zt=new Je;Je.NAMES=Dc;class Fo{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Je(e),this.near=t,this.far=n}clone(){return new Fo(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class ih extends Ft{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Dn,this.environmentIntensity=1,this.environmentRotation=new Dn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const fn=new N,Fn=new N,js=new N,Nn=new N,zi=new N,Qi=new N,El=new N,ea=new N,ta=new N,na=new N,ia=new Et,ra=new Et,sa=new Et;class un{constructor(e=new N,t=new N,n=new N){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),fn.subVectors(e,t),r.cross(fn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){fn.subVectors(r,t),Fn.subVectors(n,t),js.subVectors(e,t);const a=fn.dot(fn),o=fn.dot(Fn),c=fn.dot(js),l=Fn.dot(Fn),h=Fn.dot(js),A=a*l-o*o;if(A===0)return s.set(0,0,0),null;const u=1/A,p=(l*c-o*h)*u,m=(a*h-o*c)*u;return s.set(1-p-m,m,p)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Nn)===null?!1:Nn.x>=0&&Nn.y>=0&&Nn.x+Nn.y<=1}static getInterpolation(e,t,n,r,s,a,o,c){return this.getBarycoord(e,t,n,r,Nn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Nn.x),c.addScaledVector(a,Nn.y),c.addScaledVector(o,Nn.z),c)}static getInterpolatedAttribute(e,t,n,r,s,a){return ia.setScalar(0),ra.setScalar(0),sa.setScalar(0),ia.fromBufferAttribute(e,t),ra.fromBufferAttribute(e,n),sa.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(ia,s.x),a.addScaledVector(ra,s.y),a.addScaledVector(sa,s.z),a}static isFrontFacing(e,t,n,r){return fn.subVectors(n,t),Fn.subVectors(e,t),fn.cross(Fn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return fn.subVectors(this.c,this.b),Fn.subVectors(this.a,this.b),fn.cross(Fn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return un.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return un.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return un.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return un.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return un.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;zi.subVectors(r,n),Qi.subVectors(s,n),ea.subVectors(e,n);const c=zi.dot(ea),l=Qi.dot(ea);if(c<=0&&l<=0)return t.copy(n);ta.subVectors(e,r);const h=zi.dot(ta),A=Qi.dot(ta);if(h>=0&&A<=h)return t.copy(r);const u=c*A-h*l;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(zi,a);na.subVectors(e,s);const p=zi.dot(na),m=Qi.dot(na);if(m>=0&&p<=m)return t.copy(s);const E=p*l-c*m;if(E<=0&&l>=0&&m<=0)return o=l/(l-m),t.copy(n).addScaledVector(Qi,o);const f=h*m-p*A;if(f<=0&&A-h>=0&&p-m>=0)return El.subVectors(s,r),o=(A-h)/(A-h+(p-m)),t.copy(r).addScaledVector(El,o);const d=1/(f+E+u);return a=E*d,o=u*d,t.copy(n).addScaledVector(zi,a).addScaledVector(Qi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Dr{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(pn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(pn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=pn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,pn):pn.fromBufferAttribute(s,a),pn.applyMatrix4(e.matrixWorld),this.expandByPoint(pn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Vr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Vr.copy(n.boundingBox)),Vr.applyMatrix4(e.matrixWorld),this.union(Vr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,pn),pn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(pr),Hr.subVectors(this.max,pr),ki.subVectors(e.a,pr),Gi.subVectors(e.b,pr),Vi.subVectors(e.c,pr),jn.subVectors(Gi,ki),ei.subVectors(Vi,Gi),hi.subVectors(ki,Vi);let t=[0,-jn.z,jn.y,0,-ei.z,ei.y,0,-hi.z,hi.y,jn.z,0,-jn.x,ei.z,0,-ei.x,hi.z,0,-hi.x,-jn.y,jn.x,0,-ei.y,ei.x,0,-hi.y,hi.x,0];return!aa(t,ki,Gi,Vi,Hr)||(t=[1,0,0,0,1,0,0,0,1],!aa(t,ki,Gi,Vi,Hr))?!1:(Wr.crossVectors(jn,ei),t=[Wr.x,Wr.y,Wr.z],aa(t,ki,Gi,Vi,Hr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,pn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(pn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Un[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Un[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Un[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Un[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Un[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Un[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Un[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Un[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Un),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Un=[new N,new N,new N,new N,new N,new N,new N,new N],pn=new N,Vr=new Dr,ki=new N,Gi=new N,Vi=new N,jn=new N,ei=new N,hi=new N,pr=new N,Hr=new N,Wr=new N,fi=new N;function aa(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){fi.fromArray(i,s);const o=r.x*Math.abs(fi.x)+r.y*Math.abs(fi.y)+r.z*Math.abs(fi.z),c=e.dot(fi),l=t.dot(fi),h=n.dot(fi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Mt=new N,Xr=new rt;let rh=0;class Lt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:rh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=al,this.updateRanges=[],this.gpuType=bn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Xr.fromBufferAttribute(this,t),Xr.applyMatrix3(e),this.setXY(t,Xr.x,Xr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix3(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix4(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.applyNormalMatrix(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Mt.fromBufferAttribute(this,t),Mt.transformDirection(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=hr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Xt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=hr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=hr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=hr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=hr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Xt(t,this.array),n=Xt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Xt(t,this.array),n=Xt(n,this.array),r=Xt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=Xt(t,this.array),n=Xt(n,this.array),r=Xt(r,this.array),s=Xt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==al&&(e.usage=this.usage),e}}class Lc extends Lt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Pc extends Lt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Ct extends Lt{constructor(e,t,n){super(new Float32Array(e),t,n)}}const sh=new Dr,Ar=new N,oa=new N;class Ps{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):sh.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ar.subVectors(e,this.center);const t=Ar.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Ar,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(oa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ar.copy(e.center).add(oa)),this.expandByPoint(Ar.copy(e.center).sub(oa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let ah=0;const on=new mt,la=new Ft,Hi=new N,en=new Dr,mr=new Dr,Rt=new N;class yt extends nr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ah++}),this.uuid=Br(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(zd(e)?Pc:Lc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new ze().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return on.makeRotationFromQuaternion(e),this.applyMatrix4(on),this}rotateX(e){return on.makeRotationX(e),this.applyMatrix4(on),this}rotateY(e){return on.makeRotationY(e),this.applyMatrix4(on),this}rotateZ(e){return on.makeRotationZ(e),this.applyMatrix4(on),this}translate(e,t,n){return on.makeTranslation(e,t,n),this.applyMatrix4(on),this}scale(e,t,n){return on.makeScale(e,t,n),this.applyMatrix4(on),this}lookAt(e){return la.lookAt(e),la.updateMatrix(),this.applyMatrix4(la.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hi).negate(),this.translate(Hi.x,Hi.y,Hi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ct(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Pe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Dr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){it("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];en.setFromBufferAttribute(s),this.morphTargetsRelative?(Rt.addVectors(this.boundingBox.min,en.min),this.boundingBox.expandByPoint(Rt),Rt.addVectors(this.boundingBox.max,en.max),this.boundingBox.expandByPoint(Rt)):(this.boundingBox.expandByPoint(en.min),this.boundingBox.expandByPoint(en.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&it('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ps);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){it("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){const n=this.boundingSphere.center;if(en.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];mr.setFromBufferAttribute(o),this.morphTargetsRelative?(Rt.addVectors(en.min,mr.min),en.expandByPoint(Rt),Rt.addVectors(en.max,mr.max),en.expandByPoint(Rt)):(en.expandByPoint(mr.min),en.expandByPoint(mr.max))}en.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Rt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Rt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Rt.fromBufferAttribute(o,l),c&&(Hi.fromBufferAttribute(e,l),Rt.add(Hi)),r=Math.max(r,n.distanceToSquared(Rt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&it('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){it("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Lt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let _=0;_<n.count;_++)o[_]=new N,c[_]=new N;const l=new N,h=new N,A=new N,u=new rt,p=new rt,m=new rt,E=new N,f=new N;function d(_,y,W){l.fromBufferAttribute(n,_),h.fromBufferAttribute(n,y),A.fromBufferAttribute(n,W),u.fromBufferAttribute(s,_),p.fromBufferAttribute(s,y),m.fromBufferAttribute(s,W),h.sub(l),A.sub(l),p.sub(u),m.sub(u);const I=1/(p.x*m.y-m.x*p.y);isFinite(I)&&(E.copy(h).multiplyScalar(m.y).addScaledVector(A,-p.y).multiplyScalar(I),f.copy(A).multiplyScalar(p.x).addScaledVector(h,-m.x).multiplyScalar(I),o[_].add(E),o[y].add(E),o[W].add(E),c[_].add(f),c[y].add(f),c[W].add(f))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let _=0,y=v.length;_<y;++_){const W=v[_],I=W.start,Q=W.count;for(let G=I,H=I+Q;G<H;G+=3)d(e.getX(G+0),e.getX(G+1),e.getX(G+2))}const M=new N,S=new N,b=new N,w=new N;function T(_){b.fromBufferAttribute(r,_),w.copy(b);const y=o[_];M.copy(y),M.sub(b.multiplyScalar(b.dot(y))).normalize(),S.crossVectors(w,y);const I=S.dot(c[_])<0?-1:1;a.setXYZW(_,M.x,M.y,M.z,I)}for(let _=0,y=v.length;_<y;++_){const W=v[_],I=W.start,Q=W.count;for(let G=I,H=I+Q;G<H;G+=3)T(e.getX(G+0)),T(e.getX(G+1)),T(e.getX(G+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Lt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);const r=new N,s=new N,a=new N,o=new N,c=new N,l=new N,h=new N,A=new N;if(e)for(let u=0,p=e.count;u<p;u+=3){const m=e.getX(u+0),E=e.getX(u+1),f=e.getX(u+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,E),a.fromBufferAttribute(t,f),h.subVectors(a,s),A.subVectors(r,s),h.cross(A),o.fromBufferAttribute(n,m),c.fromBufferAttribute(n,E),l.fromBufferAttribute(n,f),o.add(h),c.add(h),l.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(E,c.x,c.y,c.z),n.setXYZ(f,l.x,l.y,l.z)}else for(let u=0,p=t.count;u<p;u+=3)r.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,s),A.subVectors(r,s),h.cross(A),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Rt.fromBufferAttribute(e,t),Rt.normalize(),e.setXYZ(t,Rt.x,Rt.y,Rt.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,A=o.normalized,u=new l.constructor(c.length*h);let p=0,m=0;for(let E=0,f=c.length;E<f;E++){o.isInterleavedBufferAttribute?p=c[E]*o.data.stride+o.offset:p=c[E]*h;for(let d=0;d<h;d++)u[m++]=l[p++]}return new Lt(u,h,A)}if(this.index===null)return Pe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new yt,n=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,n);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let h=0,A=l.length;h<A;h++){const u=l[h],p=e(u,n);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let A=0,u=l.length;A<u;A++){const p=l[A];h.push(p.toJSON(e.data))}h.length>0&&(r[c]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const l in r){const h=r[l];this.setAttribute(l,h.clone(t))}const s=e.morphAttributes;for(const l in s){const h=[],A=s[l];for(let u=0,p=A.length;u<p;u++)h.push(A[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const A=a[l];this.addGroup(A.start,A.count,A.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let oh=0;class rr extends nr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:oh++}),this.uuid=Br(),this.name="",this.type="Material",this.blending=Ji,this.side=oi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ba,this.blendDst=Ia,this.blendEquation=vi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Je(0,0,0),this.blendAlpha=0,this.depthFunc=$i,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=sl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Pi,this.stencilZFail=Pi,this.stencilZPass=Pi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Pe(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Pe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ji&&(n.blending=this.blending),this.side!==oi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ba&&(n.blendSrc=this.blendSrc),this.blendDst!==Ia&&(n.blendDst=this.blendDst),this.blendEquation!==vi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==$i&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==sl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Pi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Pi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Pi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const On=new N,ca=new N,Yr=new N,ti=new N,ua=new N,qr=new N,da=new N;class Fc{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,On)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=On.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(On.copy(this.origin).addScaledVector(this.direction,t),On.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){ca.copy(e).add(t).multiplyScalar(.5),Yr.copy(t).sub(e).normalize(),ti.copy(this.origin).sub(ca);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Yr),o=ti.dot(this.direction),c=-ti.dot(Yr),l=ti.lengthSq(),h=Math.abs(1-a*a);let A,u,p,m;if(h>0)if(A=a*c-o,u=a*o-c,m=s*h,A>=0)if(u>=-m)if(u<=m){const E=1/h;A*=E,u*=E,p=A*(A+a*u+2*o)+u*(a*A+u+2*c)+l}else u=s,A=Math.max(0,-(a*u+o)),p=-A*A+u*(u+2*c)+l;else u=-s,A=Math.max(0,-(a*u+o)),p=-A*A+u*(u+2*c)+l;else u<=-m?(A=Math.max(0,-(-a*s+o)),u=A>0?-s:Math.min(Math.max(-s,-c),s),p=-A*A+u*(u+2*c)+l):u<=m?(A=0,u=Math.min(Math.max(-s,-c),s),p=u*(u+2*c)+l):(A=Math.max(0,-(a*s+o)),u=A>0?s:Math.min(Math.max(-s,-c),s),p=-A*A+u*(u+2*c)+l);else u=a>0?-s:s,A=Math.max(0,-(a*u+o)),p=-A*A+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,A),r&&r.copy(ca).addScaledVector(Yr,u),p}intersectSphere(e,t){On.subVectors(e.center,this.origin);const n=On.dot(this.direction),r=On.dot(On)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,A=1/this.direction.z,u=this.origin;return l>=0?(n=(e.min.x-u.x)*l,r=(e.max.x-u.x)*l):(n=(e.max.x-u.x)*l,r=(e.min.x-u.x)*l),h>=0?(s=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),A>=0?(o=(e.min.z-u.z)*A,c=(e.max.z-u.z)*A):(o=(e.max.z-u.z)*A,c=(e.min.z-u.z)*A),n>c||o>r)||((o>n||n!==n)&&(n=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,On)!==null}intersectTriangle(e,t,n,r,s){ua.subVectors(t,e),qr.subVectors(n,e),da.crossVectors(ua,qr);let a=this.direction.dot(da),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ti.subVectors(this.origin,e);const c=o*this.direction.dot(qr.crossVectors(ti,qr));if(c<0)return null;const l=o*this.direction.dot(ua.cross(ti));if(l<0||c+l>a)return null;const h=-o*ti.dot(da);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class xt extends rr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.combine=hc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const vl=new mt,pi=new Fc,Jr=new Ps,yl=new N,Kr=new N,$r=new N,Zr=new N,ha=new N,jr=new N,Ml=new N,es=new N;class nt extends Ft{constructor(e=new yt,t=new xt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){jr.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=o[c],A=s[c];h!==0&&(ha.fromBufferAttribute(A,e),a?jr.addScaledVector(ha,h):jr.addScaledVector(ha.sub(t),h))}t.add(jr)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Jr.copy(n.boundingSphere),Jr.applyMatrix4(s),pi.copy(e.ray).recast(e.near),!(Jr.containsPoint(pi.origin)===!1&&(pi.intersectSphere(Jr,yl)===null||pi.origin.distanceToSquared(yl)>(e.far-e.near)**2))&&(vl.copy(s).invert(),pi.copy(e.ray).applyMatrix4(vl),!(n.boundingBox!==null&&pi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,pi)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,A=s.attributes.normal,u=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,E=u.length;m<E;m++){const f=u[m],d=a[f.materialIndex],v=Math.max(f.start,p.start),M=Math.min(o.count,Math.min(f.start+f.count,p.start+p.count));for(let S=v,b=M;S<b;S+=3){const w=o.getX(S),T=o.getX(S+1),_=o.getX(S+2);r=ts(this,d,e,n,l,h,A,w,T,_),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=f.materialIndex,t.push(r))}}else{const m=Math.max(0,p.start),E=Math.min(o.count,p.start+p.count);for(let f=m,d=E;f<d;f+=3){const v=o.getX(f),M=o.getX(f+1),S=o.getX(f+2);r=ts(this,a,e,n,l,h,A,v,M,S),r&&(r.faceIndex=Math.floor(f/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let m=0,E=u.length;m<E;m++){const f=u[m],d=a[f.materialIndex],v=Math.max(f.start,p.start),M=Math.min(c.count,Math.min(f.start+f.count,p.start+p.count));for(let S=v,b=M;S<b;S+=3){const w=S,T=S+1,_=S+2;r=ts(this,d,e,n,l,h,A,w,T,_),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=f.materialIndex,t.push(r))}}else{const m=Math.max(0,p.start),E=Math.min(c.count,p.start+p.count);for(let f=m,d=E;f<d;f+=3){const v=f,M=f+1,S=f+2;r=ts(this,a,e,n,l,h,A,v,M,S),r&&(r.faceIndex=Math.floor(f/3),t.push(r))}}}}function lh(i,e,t,n,r,s,a,o){let c;if(e.side===qt?c=n.intersectTriangle(a,s,r,!0,o):c=n.intersectTriangle(r,s,a,e.side===oi,o),c===null)return null;es.copy(o),es.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(es);return l<t.near||l>t.far?null:{distance:l,point:es.clone(),object:i}}function ts(i,e,t,n,r,s,a,o,c,l){i.getVertexPosition(o,Kr),i.getVertexPosition(c,$r),i.getVertexPosition(l,Zr);const h=lh(i,e,t,n,Kr,$r,Zr,Ml);if(h){const A=new N;un.getBarycoord(Ml,Kr,$r,Zr,A),r&&(h.uv=un.getInterpolatedAttribute(r,o,c,l,A,new rt)),s&&(h.uv1=un.getInterpolatedAttribute(s,o,c,l,A,new rt)),a&&(h.normal=un.getInterpolatedAttribute(a,o,c,l,A,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new N,materialIndex:0};un.getNormal(Kr,$r,Zr,u.normal),h.face=u,h.barycoord=A}return h}class ch extends Wt{constructor(e=null,t=1,n=1,r,s,a,o,c,l=Pt,h=Pt,A,u){super(null,a,o,c,l,h,r,s,A,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const fa=new N,uh=new N,dh=new ze;class _i{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=fa.subVectors(n,t).cross(uh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(fa),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||dh.getNormalMatrix(e),r=this.coplanarPoint(fa).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ai=new Ps,hh=new rt(.5,.5),ns=new N;class No{constructor(e=new _i,t=new _i,n=new _i,r=new _i,s=new _i,a=new _i){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=In,n=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],h=s[4],A=s[5],u=s[6],p=s[7],m=s[8],E=s[9],f=s[10],d=s[11],v=s[12],M=s[13],S=s[14],b=s[15];if(r[0].setComponents(l-a,p-h,d-m,b-v).normalize(),r[1].setComponents(l+a,p+h,d+m,b+v).normalize(),r[2].setComponents(l+o,p+A,d+E,b+M).normalize(),r[3].setComponents(l-o,p-A,d-E,b-M).normalize(),n)r[4].setComponents(c,u,f,S).normalize(),r[5].setComponents(l-c,p-u,d-f,b-S).normalize();else if(r[4].setComponents(l-c,p-u,d-f,b-S).normalize(),t===In)r[5].setComponents(l+c,p+u,d+f,b+S).normalize();else if(t===Tr)r[5].setComponents(c,u,f,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ai.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ai.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ai)}intersectsSprite(e){Ai.center.set(0,0,0);const t=hh.distanceTo(e.center);return Ai.radius=.7071067811865476+t,Ai.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ai)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(ns.x=r.normal.x>0?e.max.x:e.min.x,ns.y=r.normal.y>0?e.max.y:e.min.y,ns.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ns)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ii extends rr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Je(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ts=new N,Rs=new N,Sl=new mt,gr=new Fc,is=new Ps,pa=new N,Cl=new N;class xi extends Ft{constructor(e=new yt,t=new ii){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Ts.fromBufferAttribute(t,r-1),Rs.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Ts.distanceTo(Rs);e.setAttribute("lineDistance",new Ct(n,1))}else Pe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),is.copy(n.boundingSphere),is.applyMatrix4(r),is.radius+=s,e.ray.intersectsSphere(is)===!1)return;Sl.copy(r).invert(),gr.copy(e.ray).applyMatrix4(Sl);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const p=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let E=p,f=m-1;E<f;E+=l){const d=h.getX(E),v=h.getX(E+1),M=rs(this,e,gr,c,d,v,E);M&&t.push(M)}if(this.isLineLoop){const E=h.getX(m-1),f=h.getX(p),d=rs(this,e,gr,c,E,f,m-1);d&&t.push(d)}}else{const p=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let E=p,f=m-1;E<f;E+=l){const d=rs(this,e,gr,c,E,E+1,E);d&&t.push(d)}if(this.isLineLoop){const E=rs(this,e,gr,c,m-1,p,m-1);E&&t.push(E)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function rs(i,e,t,n,r,s,a){const o=i.geometry.attributes.position;if(Ts.fromBufferAttribute(o,r),Rs.fromBufferAttribute(o,s),t.distanceSqToSegment(Ts,Rs,pa,Cl)>n)return;pa.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(pa);if(!(l<e.near||l>e.far))return{distance:l,point:Cl.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const wl=new N,bl=new N;class _o extends xi{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)wl.fromBufferAttribute(t,r),bl.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+wl.distanceTo(bl);e.setAttribute("lineDistance",new Ct(n,1))}else Pe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Nc extends Wt{constructor(e=[],t=wi,n,r,s,a,o,c,l,h){super(e,t,n,r,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Rr extends Wt{constructor(e,t,n=Bn,r,s,a,o=Pt,c=Pt,l,h=Xn,A=1){if(h!==Xn&&h!==Si)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:A};super(u,r,s,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Po(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class fh extends Rr{constructor(e,t=Bn,n=wi,r,s,a=Pt,o=Pt,c,l=Xn){const h={width:e,height:e,depth:1},A=[h,h,h,h,h,h];super(e,e,t,n,r,s,a,o,c,l),this.image=A,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Uc extends Wt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Qn extends yt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],h=[],A=[];let u=0,p=0;m("z","y","x",-1,-1,n,t,e,a,s,0),m("z","y","x",1,-1,n,t,-e,a,s,1),m("x","z","y",1,1,e,n,t,r,a,2),m("x","z","y",1,-1,e,n,-t,r,a,3),m("x","y","z",1,-1,e,t,n,r,s,4),m("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new Ct(l,3)),this.setAttribute("normal",new Ct(h,3)),this.setAttribute("uv",new Ct(A,2));function m(E,f,d,v,M,S,b,w,T,_,y){const W=S/T,I=b/_,Q=S/2,G=b/2,H=w/2,z=T+1,k=_+1;let U=0,j=0;const Z=new N;for(let he=0;he<k;he++){const fe=he*I-G;for(let le=0;le<z;le++){const De=le*W-Q;Z[E]=De*v,Z[f]=fe*M,Z[d]=H,l.push(Z.x,Z.y,Z.z),Z[E]=0,Z[f]=0,Z[d]=w>0?1:-1,h.push(Z.x,Z.y,Z.z),A.push(le/T),A.push(1-he/_),U+=1}}for(let he=0;he<_;he++)for(let fe=0;fe<T;fe++){const le=u+fe+z*he,De=u+fe+z*(he+1),at=u+(fe+1)+z*(he+1),st=u+(fe+1)+z*he;c.push(le,De,st),c.push(De,at,st),j+=6}o.addGroup(p,j,y),p+=j,u+=U}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class wr extends yt{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);const s=[],a=[],o=[],c=[],l=new N,h=new rt;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let A=0,u=3;A<=t;A++,u+=3){const p=n+A/t*r;l.x=e*Math.cos(p),l.y=e*Math.sin(p),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[u]/e+1)/2,h.y=(a[u+1]/e+1)/2,c.push(h.x,h.y)}for(let A=1;A<=t;A++)s.push(A,A+1,0);this.setIndex(s),this.setAttribute("position",new Ct(a,3)),this.setAttribute("normal",new Ct(o,3)),this.setAttribute("uv",new Ct(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wr(e.radius,e.segments,e.thetaStart,e.thetaLength)}}const ss=new N,as=new N,Aa=new N,os=new un;class Il extends yt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const r=Math.pow(10,4),s=Math.cos(vs*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],A=new Array(3),u={},p=[];for(let m=0;m<c;m+=3){a?(l[0]=a.getX(m),l[1]=a.getX(m+1),l[2]=a.getX(m+2)):(l[0]=m,l[1]=m+1,l[2]=m+2);const{a:E,b:f,c:d}=os;if(E.fromBufferAttribute(o,l[0]),f.fromBufferAttribute(o,l[1]),d.fromBufferAttribute(o,l[2]),os.getNormal(Aa),A[0]=`${Math.round(E.x*r)},${Math.round(E.y*r)},${Math.round(E.z*r)}`,A[1]=`${Math.round(f.x*r)},${Math.round(f.y*r)},${Math.round(f.z*r)}`,A[2]=`${Math.round(d.x*r)},${Math.round(d.y*r)},${Math.round(d.z*r)}`,!(A[0]===A[1]||A[1]===A[2]||A[2]===A[0]))for(let v=0;v<3;v++){const M=(v+1)%3,S=A[v],b=A[M],w=os[h[v]],T=os[h[M]],_=`${S}_${b}`,y=`${b}_${S}`;y in u&&u[y]?(Aa.dot(u[y].normal)<=s&&(p.push(w.x,w.y,w.z),p.push(T.x,T.y,T.z)),u[y]=null):_ in u||(u[_]={index0:l[v],index1:l[M],normal:Aa.clone()})}}for(const m in u)if(u[m]){const{index0:E,index1:f}=u[m];ss.fromBufferAttribute(o,E),as.fromBufferAttribute(o,f),p.push(ss.x,ss.y,ss.z),p.push(as.x,as.y,as.z)}this.setAttribute("position",new Ct(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Fs extends yt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(r),l=o+1,h=c+1,A=e/o,u=t/c,p=[],m=[],E=[],f=[];for(let d=0;d<h;d++){const v=d*u-a;for(let M=0;M<l;M++){const S=M*A-s;m.push(S,-v,0),E.push(0,0,1),f.push(M/o),f.push(1-d/c)}}for(let d=0;d<c;d++)for(let v=0;v<o;v++){const M=v+l*d,S=v+l*(d+1),b=v+1+l*(d+1),w=v+1+l*d;p.push(M,S,w),p.push(S,b,w)}this.setIndex(p),this.setAttribute("position",new Ct(m,3)),this.setAttribute("normal",new Ct(E,3)),this.setAttribute("uv",new Ct(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fs(e.width,e.height,e.widthSegments,e.heightSegments)}}class wt extends yt{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const h=[],A=new N,u=new N,p=[],m=[],E=[],f=[];for(let d=0;d<=n;d++){const v=[],M=d/n;let S=0;d===0&&a===0?S=.5/t:d===n&&c===Math.PI&&(S=-.5/t);for(let b=0;b<=t;b++){const w=b/t;A.x=-e*Math.cos(r+w*s)*Math.sin(a+M*o),A.y=e*Math.cos(a+M*o),A.z=e*Math.sin(r+w*s)*Math.sin(a+M*o),m.push(A.x,A.y,A.z),u.copy(A).normalize(),E.push(u.x,u.y,u.z),f.push(w+S,1-M),v.push(l++)}h.push(v)}for(let d=0;d<n;d++)for(let v=0;v<t;v++){const M=h[d][v+1],S=h[d][v],b=h[d+1][v],w=h[d+1][v+1];(d!==0||a>0)&&p.push(M,S,w),(d!==n-1||c<Math.PI)&&p.push(S,b,w)}this.setIndex(p),this.setAttribute("position",new Ct(m,3)),this.setAttribute("normal",new Ct(E,3)),this.setAttribute("uv",new Ct(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wt(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function tr(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(Pe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Gt(i){const e={};for(let t=0;t<i.length;t++){const n=tr(i[t]);for(const r in n)e[r]=n[r]}return e}function ph(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Oc(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}const Ah={clone:tr,merge:Gt};var mh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,gh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ln extends rr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=mh,this.fragmentShader=gh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=tr(e.uniforms),this.uniformsGroups=ph(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class _h extends Ln{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ma extends rr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ic,this.normalScale=new rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class xh extends rr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Bd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Eh extends rr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class zc extends Ft{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Je(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const ga=new mt,Tl=new N,Rl=new N;class vh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new rt(512,512),this.mapType=nn,this.map=null,this.mapPass=null,this.matrix=new mt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new No,this._frameExtents=new rt(1,1),this._viewportCount=1,this._viewports=[new Et(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Tl.setFromMatrixPosition(e.matrixWorld),t.position.copy(Tl),Rl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Rl),t.updateMatrixWorld(),ga.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ga,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Tr||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ga)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ls=new N,cs=new ir,vn=new N;class Qc extends Ft{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new mt,this.projectionMatrix=new mt,this.projectionMatrixInverse=new mt,this.coordinateSystem=In,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ls,cs,vn),vn.x===1&&vn.y===1&&vn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ls,cs,vn.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(ls,cs,vn),vn.x===1&&vn.y===1&&vn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ls,cs,vn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ni=new N,Bl=new rt,Dl=new rt;class cn extends Qc{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=go*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(vs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return go*2*Math.atan(Math.tan(vs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ni.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ni.x,ni.y).multiplyScalar(-e/ni.z),ni.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ni.x,ni.y).multiplyScalar(-e/ni.z)}getViewSize(e,t){return this.getViewBounds(e,Bl,Dl),t.subVectors(Dl,Bl)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(vs*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*n/l,r*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Uo extends Qc{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class yh extends vh{constructor(){super(new Uo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ll extends zc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ft.DEFAULT_UP),this.updateMatrix(),this.target=new Ft,this.shadow=new yh}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Mh extends zc{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Wi=-90,Xi=1;class Sh extends Ft{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new cn(Wi,Xi,e,t);r.layers=this.layers,this.add(r);const s=new cn(Wi,Xi,e,t);s.layers=this.layers,this.add(s);const a=new cn(Wi,Xi,e,t);a.layers=this.layers,this.add(a);const o=new cn(Wi,Xi,e,t);o.layers=this.layers,this.add(o);const c=new cn(Wi,Xi,e,t);c.layers=this.layers,this.add(c);const l=new cn(Wi,Xi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===In)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Tr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,h]=this.children,A=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const E=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let f=!1;e.isWebGLRenderer===!0?f=e.state.buffers.depth.getReversed():f=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,r),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=E,e.setRenderTarget(n,5,r),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(A,u,p),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class Ch extends cn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class wh{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Xe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Xe(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class bh extends _o{constructor(e=10,t=10,n=4473924,r=8947848){n=new Je(n),r=new Je(r);const s=t/2,a=e/t,o=e/2,c=[],l=[];for(let u=0,p=0,m=-o;u<=t;u++,m+=a){c.push(-o,0,m,o,0,m),c.push(m,0,-o,m,0,o);const E=u===s?n:r;E.toArray(l,p),p+=3,E.toArray(l,p),p+=3,E.toArray(l,p),p+=3,E.toArray(l,p),p+=3}const h=new yt;h.setAttribute("position",new Ct(c,3)),h.setAttribute("color",new Ct(l,3));const A=new ii({vertexColors:!0,toneMapped:!1});super(h,A),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}function Pl(i,e,t,n){const r=Ih(n);switch(t){case Cc:return i*e;case bc:return i*e/r.components*r.byteLength;case To:return i*e/r.components*r.byteLength;case ji:return i*e*2/r.components*r.byteLength;case Ro:return i*e*2/r.components*r.byteLength;case wc:return i*e*3/r.components*r.byteLength;case gn:return i*e*4/r.components*r.byteLength;case Bo:return i*e*4/r.components*r.byteLength;case gs:case _s:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case xs:case Es:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case za:case ka:return Math.max(i,16)*Math.max(e,8)/4;case Oa:case Qa:return Math.max(i,8)*Math.max(e,8)/2;case Ga:case Va:case Wa:case Xa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ha:case Ya:case qa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ja:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ka:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case $a:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Za:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ja:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case eo:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case to:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case no:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case io:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case ro:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case so:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case ao:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case oo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case lo:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case co:case uo:case ho:return Math.ceil(i/4)*Math.ceil(e/4)*16;case fo:case po:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ao:case mo:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Ih(i){switch(i){case nn:case vc:return{byteLength:1,components:1};case br:case yc:case Wn:return{byteLength:2,components:1};case bo:case Io:return{byteLength:2,components:4};case Bn:case wo:case bn:return{byteLength:4,components:1};case Mc:case Sc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Co}}));typeof window<"u"&&(window.__THREE__?Pe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Co);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function kc(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Th(i){const e=new WeakMap;function t(o,c){const l=o.array,h=o.usage,A=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,h),o.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:A}}function n(o,c,l){const h=c.array,A=c.updateRanges;if(i.bindBuffer(l,o),A.length===0)i.bufferSubData(l,0,h);else{A.sort((p,m)=>p.start-m.start);let u=0;for(let p=1;p<A.length;p++){const m=A[u],E=A[p];E.start<=m.start+m.count+1?m.count=Math.max(m.count,E.start+E.count-m.start):(++u,A[u]=E)}A.length=u+1;for(let p=0,m=A.length;p<m;p++){const E=A[p];i.bufferSubData(l,E.start*h.BYTES_PER_ELEMENT,h,E.start,E.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var Rh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Bh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Dh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Lh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ph=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Fh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Nh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Uh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Oh=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,zh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Qh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,kh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Gh=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Vh=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Hh=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Wh=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Xh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Yh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,qh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Jh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Kh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,$h=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Zh=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,jh=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ef=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,tf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,nf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,rf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,sf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,af=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,of="gl_FragColor = linearToOutputTexel( gl_FragColor );",lf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,cf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,uf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,df=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,hf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ff=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,pf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Af=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,mf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,gf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,_f=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,xf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ef=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,vf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,yf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Mf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Sf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Cf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,wf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,bf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,If=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Tf=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Rf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Bf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Df=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Lf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Pf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ff=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Nf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Uf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Of=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,zf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Qf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,kf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Gf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Vf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Hf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Wf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Yf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Jf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Kf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$f=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,jf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ep=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,tp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,np=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ip=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,rp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,sp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,ap=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,op=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,lp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,cp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,up=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,dp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,hp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,fp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,pp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Ap=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,mp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,gp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,_p=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,xp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Ep=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,vp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,yp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Mp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Sp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Cp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,wp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,bp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ip=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Tp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Rp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Bp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Lp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Np=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Up=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Op=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,zp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Qp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,kp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Vp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Hp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Wp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Jp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,$p=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Zp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,jp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,eA=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,tA=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nA=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,iA=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rA=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,sA=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,aA=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,oA=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lA=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,cA=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Qe={alphahash_fragment:Rh,alphahash_pars_fragment:Bh,alphamap_fragment:Dh,alphamap_pars_fragment:Lh,alphatest_fragment:Ph,alphatest_pars_fragment:Fh,aomap_fragment:Nh,aomap_pars_fragment:Uh,batching_pars_vertex:Oh,batching_vertex:zh,begin_vertex:Qh,beginnormal_vertex:kh,bsdfs:Gh,iridescence_fragment:Vh,bumpmap_pars_fragment:Hh,clipping_planes_fragment:Wh,clipping_planes_pars_fragment:Xh,clipping_planes_pars_vertex:Yh,clipping_planes_vertex:qh,color_fragment:Jh,color_pars_fragment:Kh,color_pars_vertex:$h,color_vertex:Zh,common:jh,cube_uv_reflection_fragment:ef,defaultnormal_vertex:tf,displacementmap_pars_vertex:nf,displacementmap_vertex:rf,emissivemap_fragment:sf,emissivemap_pars_fragment:af,colorspace_fragment:of,colorspace_pars_fragment:lf,envmap_fragment:cf,envmap_common_pars_fragment:uf,envmap_pars_fragment:df,envmap_pars_vertex:hf,envmap_physical_pars_fragment:Mf,envmap_vertex:ff,fog_vertex:pf,fog_pars_vertex:Af,fog_fragment:mf,fog_pars_fragment:gf,gradientmap_pars_fragment:_f,lightmap_pars_fragment:xf,lights_lambert_fragment:Ef,lights_lambert_pars_fragment:vf,lights_pars_begin:yf,lights_toon_fragment:Sf,lights_toon_pars_fragment:Cf,lights_phong_fragment:wf,lights_phong_pars_fragment:bf,lights_physical_fragment:If,lights_physical_pars_fragment:Tf,lights_fragment_begin:Rf,lights_fragment_maps:Bf,lights_fragment_end:Df,logdepthbuf_fragment:Lf,logdepthbuf_pars_fragment:Pf,logdepthbuf_pars_vertex:Ff,logdepthbuf_vertex:Nf,map_fragment:Uf,map_pars_fragment:Of,map_particle_fragment:zf,map_particle_pars_fragment:Qf,metalnessmap_fragment:kf,metalnessmap_pars_fragment:Gf,morphinstance_vertex:Vf,morphcolor_vertex:Hf,morphnormal_vertex:Wf,morphtarget_pars_vertex:Xf,morphtarget_vertex:Yf,normal_fragment_begin:qf,normal_fragment_maps:Jf,normal_pars_fragment:Kf,normal_pars_vertex:$f,normal_vertex:Zf,normalmap_pars_fragment:jf,clearcoat_normal_fragment_begin:ep,clearcoat_normal_fragment_maps:tp,clearcoat_pars_fragment:np,iridescence_pars_fragment:ip,opaque_fragment:rp,packing:sp,premultiplied_alpha_fragment:ap,project_vertex:op,dithering_fragment:lp,dithering_pars_fragment:cp,roughnessmap_fragment:up,roughnessmap_pars_fragment:dp,shadowmap_pars_fragment:hp,shadowmap_pars_vertex:fp,shadowmap_vertex:pp,shadowmask_pars_fragment:Ap,skinbase_vertex:mp,skinning_pars_vertex:gp,skinning_vertex:_p,skinnormal_vertex:xp,specularmap_fragment:Ep,specularmap_pars_fragment:vp,tonemapping_fragment:yp,tonemapping_pars_fragment:Mp,transmission_fragment:Sp,transmission_pars_fragment:Cp,uv_pars_fragment:wp,uv_pars_vertex:bp,uv_vertex:Ip,worldpos_vertex:Tp,background_vert:Rp,background_frag:Bp,backgroundCube_vert:Dp,backgroundCube_frag:Lp,cube_vert:Pp,cube_frag:Fp,depth_vert:Np,depth_frag:Up,distance_vert:Op,distance_frag:zp,equirect_vert:Qp,equirect_frag:kp,linedashed_vert:Gp,linedashed_frag:Vp,meshbasic_vert:Hp,meshbasic_frag:Wp,meshlambert_vert:Xp,meshlambert_frag:Yp,meshmatcap_vert:qp,meshmatcap_frag:Jp,meshnormal_vert:Kp,meshnormal_frag:$p,meshphong_vert:Zp,meshphong_frag:jp,meshphysical_vert:eA,meshphysical_frag:tA,meshtoon_vert:nA,meshtoon_frag:iA,points_vert:rA,points_frag:sA,shadow_vert:aA,shadow_frag:oA,sprite_vert:lA,sprite_frag:cA},ce={common:{diffuse:{value:new Je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new rt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new Je(16777215)},opacity:{value:1},center:{value:new rt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},Sn={basic:{uniforms:Gt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.fog]),vertexShader:Qe.meshbasic_vert,fragmentShader:Qe.meshbasic_frag},lambert:{uniforms:Gt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new Je(0)},envMapIntensity:{value:1}}]),vertexShader:Qe.meshlambert_vert,fragmentShader:Qe.meshlambert_frag},phong:{uniforms:Gt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new Je(0)},specular:{value:new Je(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphong_vert,fragmentShader:Qe.meshphong_frag},standard:{uniforms:Gt([ce.common,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.roughnessmap,ce.metalnessmap,ce.fog,ce.lights,{emissive:{value:new Je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag},toon:{uniforms:Gt([ce.common,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.gradientmap,ce.fog,ce.lights,{emissive:{value:new Je(0)}}]),vertexShader:Qe.meshtoon_vert,fragmentShader:Qe.meshtoon_frag},matcap:{uniforms:Gt([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,{matcap:{value:null}}]),vertexShader:Qe.meshmatcap_vert,fragmentShader:Qe.meshmatcap_frag},points:{uniforms:Gt([ce.points,ce.fog]),vertexShader:Qe.points_vert,fragmentShader:Qe.points_frag},dashed:{uniforms:Gt([ce.common,ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qe.linedashed_vert,fragmentShader:Qe.linedashed_frag},depth:{uniforms:Gt([ce.common,ce.displacementmap]),vertexShader:Qe.depth_vert,fragmentShader:Qe.depth_frag},normal:{uniforms:Gt([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,{opacity:{value:1}}]),vertexShader:Qe.meshnormal_vert,fragmentShader:Qe.meshnormal_frag},sprite:{uniforms:Gt([ce.sprite,ce.fog]),vertexShader:Qe.sprite_vert,fragmentShader:Qe.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qe.background_vert,fragmentShader:Qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:Qe.backgroundCube_vert,fragmentShader:Qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qe.cube_vert,fragmentShader:Qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qe.equirect_vert,fragmentShader:Qe.equirect_frag},distance:{uniforms:Gt([ce.common,ce.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qe.distance_vert,fragmentShader:Qe.distance_frag},shadow:{uniforms:Gt([ce.lights,ce.fog,{color:{value:new Je(0)},opacity:{value:1}}]),vertexShader:Qe.shadow_vert,fragmentShader:Qe.shadow_frag}};Sn.physical={uniforms:Gt([Sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new rt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new Je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new rt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new Je(0)},specularColor:{value:new Je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new rt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag};const us={r:0,b:0,g:0},mi=new Dn,uA=new mt;function dA(i,e,t,n,r,s){const a=new Je(0);let o=r===!0?0:1,c,l,h=null,A=0,u=null;function p(v){let M=v.isScene===!0?v.background:null;if(M&&M.isTexture){const S=v.backgroundBlurriness>0;M=e.get(M,S)}return M}function m(v){let M=!1;const S=p(v);S===null?f(a,o):S&&S.isColor&&(f(S,1),M=!0);const b=i.xr.getEnvironmentBlendMode();b==="additive"?t.buffers.color.setClear(0,0,0,1,s):b==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||M)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function E(v,M){const S=p(M);S&&(S.isCubeTexture||S.mapping===Ls)?(l===void 0&&(l=new nt(new Qn(1,1,1),new Ln({name:"BackgroundCubeMaterial",uniforms:tr(Sn.backgroundCube.uniforms),vertexShader:Sn.backgroundCube.vertexShader,fragmentShader:Sn.backgroundCube.fragmentShader,side:qt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(b,w,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),mi.copy(M.backgroundRotation),mi.x*=-1,mi.y*=-1,mi.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(mi.y*=-1,mi.z*=-1),l.material.uniforms.envMap.value=S,l.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(uA.makeRotationFromEuler(mi)),l.material.toneMapped=et.getTransfer(S.colorSpace)!==ct,(h!==S||A!==S.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=S,A=S.version,u=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new nt(new Fs(2,2),new Ln({name:"BackgroundMaterial",uniforms:tr(Sn.background.uniforms),vertexShader:Sn.background.vertexShader,fragmentShader:Sn.background.fragmentShader,side:oi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=et.getTransfer(S.colorSpace)!==ct,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(h!==S||A!==S.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=S,A=S.version,u=i.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function f(v,M){v.getRGB(us,Oc(i)),t.buffers.color.setClear(us.r,us.g,us.b,M,s)}function d(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,M=1){a.set(v),o=M,f(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,f(a,o)},render:m,addToRenderList:E,dispose:d}}function hA(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=u(null);let s=r,a=!1;function o(I,Q,G,H,z){let k=!1;const U=A(I,H,G,Q);s!==U&&(s=U,l(s.object)),k=p(I,H,G,z),k&&m(I,H,G,z),z!==null&&e.update(z,i.ELEMENT_ARRAY_BUFFER),(k||a)&&(a=!1,S(I,Q,G,H),z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function c(){return i.createVertexArray()}function l(I){return i.bindVertexArray(I)}function h(I){return i.deleteVertexArray(I)}function A(I,Q,G,H){const z=H.wireframe===!0;let k=n[Q.id];k===void 0&&(k={},n[Q.id]=k);const U=I.isInstancedMesh===!0?I.id:0;let j=k[U];j===void 0&&(j={},k[U]=j);let Z=j[G.id];Z===void 0&&(Z={},j[G.id]=Z);let he=Z[z];return he===void 0&&(he=u(c()),Z[z]=he),he}function u(I){const Q=[],G=[],H=[];for(let z=0;z<t;z++)Q[z]=0,G[z]=0,H[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:Q,enabledAttributes:G,attributeDivisors:H,object:I,attributes:{},index:null}}function p(I,Q,G,H){const z=s.attributes,k=Q.attributes;let U=0;const j=G.getAttributes();for(const Z in j)if(j[Z].location>=0){const fe=z[Z];let le=k[Z];if(le===void 0&&(Z==="instanceMatrix"&&I.instanceMatrix&&(le=I.instanceMatrix),Z==="instanceColor"&&I.instanceColor&&(le=I.instanceColor)),fe===void 0||fe.attribute!==le||le&&fe.data!==le.data)return!0;U++}return s.attributesNum!==U||s.index!==H}function m(I,Q,G,H){const z={},k=Q.attributes;let U=0;const j=G.getAttributes();for(const Z in j)if(j[Z].location>=0){let fe=k[Z];fe===void 0&&(Z==="instanceMatrix"&&I.instanceMatrix&&(fe=I.instanceMatrix),Z==="instanceColor"&&I.instanceColor&&(fe=I.instanceColor));const le={};le.attribute=fe,fe&&fe.data&&(le.data=fe.data),z[Z]=le,U++}s.attributes=z,s.attributesNum=U,s.index=H}function E(){const I=s.newAttributes;for(let Q=0,G=I.length;Q<G;Q++)I[Q]=0}function f(I){d(I,0)}function d(I,Q){const G=s.newAttributes,H=s.enabledAttributes,z=s.attributeDivisors;G[I]=1,H[I]===0&&(i.enableVertexAttribArray(I),H[I]=1),z[I]!==Q&&(i.vertexAttribDivisor(I,Q),z[I]=Q)}function v(){const I=s.newAttributes,Q=s.enabledAttributes;for(let G=0,H=Q.length;G<H;G++)Q[G]!==I[G]&&(i.disableVertexAttribArray(G),Q[G]=0)}function M(I,Q,G,H,z,k,U){U===!0?i.vertexAttribIPointer(I,Q,G,z,k):i.vertexAttribPointer(I,Q,G,H,z,k)}function S(I,Q,G,H){E();const z=H.attributes,k=G.getAttributes(),U=Q.defaultAttributeValues;for(const j in k){const Z=k[j];if(Z.location>=0){let he=z[j];if(he===void 0&&(j==="instanceMatrix"&&I.instanceMatrix&&(he=I.instanceMatrix),j==="instanceColor"&&I.instanceColor&&(he=I.instanceColor)),he!==void 0){const fe=he.normalized,le=he.itemSize,De=e.get(he);if(De===void 0)continue;const at=De.buffer,st=De.type,J=De.bytesPerElement,re=st===i.INT||st===i.UNSIGNED_INT||he.gpuType===wo;if(he.isInterleavedBufferAttribute){const se=he.data,Fe=se.stride,be=he.offset;if(se.isInstancedInterleavedBuffer){for(let Ie=0;Ie<Z.locationSize;Ie++)d(Z.location+Ie,se.meshPerAttribute);I.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let Ie=0;Ie<Z.locationSize;Ie++)f(Z.location+Ie);i.bindBuffer(i.ARRAY_BUFFER,at);for(let Ie=0;Ie<Z.locationSize;Ie++)M(Z.location+Ie,le/Z.locationSize,st,fe,Fe*J,(be+le/Z.locationSize*Ie)*J,re)}else{if(he.isInstancedBufferAttribute){for(let se=0;se<Z.locationSize;se++)d(Z.location+se,he.meshPerAttribute);I.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let se=0;se<Z.locationSize;se++)f(Z.location+se);i.bindBuffer(i.ARRAY_BUFFER,at);for(let se=0;se<Z.locationSize;se++)M(Z.location+se,le/Z.locationSize,st,fe,le*J,le/Z.locationSize*se*J,re)}}else if(U!==void 0){const fe=U[j];if(fe!==void 0)switch(fe.length){case 2:i.vertexAttrib2fv(Z.location,fe);break;case 3:i.vertexAttrib3fv(Z.location,fe);break;case 4:i.vertexAttrib4fv(Z.location,fe);break;default:i.vertexAttrib1fv(Z.location,fe)}}}}v()}function b(){y();for(const I in n){const Q=n[I];for(const G in Q){const H=Q[G];for(const z in H){const k=H[z];for(const U in k)h(k[U].object),delete k[U];delete H[z]}}delete n[I]}}function w(I){if(n[I.id]===void 0)return;const Q=n[I.id];for(const G in Q){const H=Q[G];for(const z in H){const k=H[z];for(const U in k)h(k[U].object),delete k[U];delete H[z]}}delete n[I.id]}function T(I){for(const Q in n){const G=n[Q];for(const H in G){const z=G[H];if(z[I.id]===void 0)continue;const k=z[I.id];for(const U in k)h(k[U].object),delete k[U];delete z[I.id]}}}function _(I){for(const Q in n){const G=n[Q],H=I.isInstancedMesh===!0?I.id:0,z=G[H];if(z!==void 0){for(const k in z){const U=z[k];for(const j in U)h(U[j].object),delete U[j];delete z[k]}delete G[H],Object.keys(G).length===0&&delete n[Q]}}}function y(){W(),a=!0,s!==r&&(s=r,l(s.object))}function W(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:y,resetDefaultState:W,dispose:b,releaseStatesOfGeometry:w,releaseStatesOfObject:_,releaseStatesOfProgram:T,initAttributes:E,enableAttribute:f,disableUnusedAttributes:v}}function fA(i,e,t){let n;function r(l){n=l}function s(l,h){i.drawArrays(n,l,h),t.update(h,n,1)}function a(l,h,A){A!==0&&(i.drawArraysInstanced(n,l,h,A),t.update(h,n,A))}function o(l,h,A){if(A===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,A);let p=0;for(let m=0;m<A;m++)p+=h[m];t.update(p,n,1)}function c(l,h,A,u){if(A===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<l.length;m++)a(l[m],h[m],u[m]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,h,0,u,0,A);let m=0;for(let E=0;E<A;E++)m+=h[E]*u[E];t.update(m,n,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function pA(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(T){return!(T!==gn&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const _=T===Wn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==nn&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==bn&&!_)}function c(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(Pe("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const A=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),E=i.getParameter(i.MAX_TEXTURE_SIZE),f=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),b=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:A,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:m,maxTextureSize:E,maxCubemapSize:f,maxAttributes:d,maxVertexUniforms:v,maxVaryings:M,maxFragmentUniforms:S,maxSamples:b,samples:w}}function AA(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new _i,o=new ze,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(A,u){const p=A.length!==0||u||n!==0||r;return r=u,n=A.length,p},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(A,u){t=h(A,u,0)},this.setState=function(A,u,p){const m=A.clippingPlanes,E=A.clipIntersection,f=A.clipShadows,d=i.get(A);if(!r||m===null||m.length===0||s&&!f)s?h(null):l();else{const v=s?0:n,M=v*4;let S=d.clippingState||null;c.value=S,S=h(m,u,M,p);for(let b=0;b!==M;++b)S[b]=t[b];d.clippingState=S,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(A,u,p,m){const E=A!==null?A.length:0;let f=null;if(E!==0){if(f=c.value,m!==!0||f===null){const d=p+E*4,v=u.matrixWorldInverse;o.getNormalMatrix(v),(f===null||f.length<d)&&(f=new Float32Array(d));for(let M=0,S=p;M!==E;++M,S+=4)a.copy(A[M]).applyMatrix4(v,o),a.normal.toArray(f,S),f[S+3]=a.constant}c.value=f,c.needsUpdate=!0}return e.numPlanes=E,e.numIntersection=0,f}}const ai=4,Fl=[.125,.215,.35,.446,.526,.582],yi=20,mA=256,_r=new Uo,Nl=new Je;let _a=null,xa=0,Ea=0,va=!1;const gA=new N;class Ul{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){const{size:a=256,position:o=gA}=s;_a=this._renderer.getRenderTarget(),xa=this._renderer.getActiveCubeFace(),Ea=this._renderer.getActiveMipmapLevel(),va=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ql(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=zl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(_a,xa,Ea),this._renderer.xr.enabled=va,e.scissorTest=!1,Yi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===wi||e.mapping===Zi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),_a=this._renderer.getRenderTarget(),xa=this._renderer.getActiveCubeFace(),Ea=this._renderer.getActiveMipmapLevel(),va=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Qt,minFilter:Qt,generateMipmaps:!1,type:Wn,format:gn,colorSpace:er,depthBuffer:!1},r=Ol(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ol(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=_A(s)),this._blurMaterial=EA(s,e,t),this._ggxMaterial=xA(s,e,t)}return r}_compileMaterial(e){const t=new nt(new yt,e);this._renderer.compile(t,_r)}_sceneToCubeUV(e,t,n,r,s){const c=new cn(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],A=this._renderer,u=A.autoClear,p=A.toneMapping;A.getClearColor(Nl),A.toneMapping=Tn,A.autoClear=!1,A.state.buffers.depth.getReversed()&&(A.setRenderTarget(r),A.clearDepth(),A.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new nt(new Qn,new xt({name:"PMREM.Background",side:qt,depthWrite:!1,depthTest:!1})));const E=this._backgroundBox,f=E.material;let d=!1;const v=e.background;v?v.isColor&&(f.color.copy(v),e.background=null,d=!0):(f.color.copy(Nl),d=!0);for(let M=0;M<6;M++){const S=M%3;S===0?(c.up.set(0,l[M],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+h[M],s.y,s.z)):S===1?(c.up.set(0,0,l[M]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+h[M],s.z)):(c.up.set(0,l[M],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+h[M]));const b=this._cubeSize;Yi(r,S*b,M>2?b:0,b,b),A.setRenderTarget(r),d&&A.render(E,c),A.render(e,c)}A.toneMapping=p,A.autoClear=u,e.background=v}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===wi||e.mapping===Zi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ql()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=zl());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;Yi(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,_r)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const c=a.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),A=Math.sqrt(l*l-h*h),u=0+l*1.25,p=A*u,{_lodMax:m}=this,E=this._sizeLods[n],f=3*E*(n>m-ai?n-m+ai:0),d=4*(this._cubeSize-E);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=m-t,Yi(s,f,d,3*E,2*E),r.setRenderTarget(s),r.render(o,_r),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=m-n,Yi(e,f,d,3*E,2*E),r.setRenderTarget(e),r.render(o,_r)}_blur(e,t,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&it("blur direction must be either latitudinal or longitudinal!");const h=3,A=this._lodMeshes[r];A.material=l;const u=l.uniforms,p=this._sizeLods[n]-1,m=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*yi-1),E=s/m,f=isFinite(s)?1+Math.floor(h*E):yi;f>yi&&Pe(`sigmaRadians, ${s}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${yi}`);const d=[];let v=0;for(let T=0;T<yi;++T){const _=T/E,y=Math.exp(-_*_/2);d.push(y),T===0?v+=y:T<f&&(v+=2*y)}for(let T=0;T<d.length;T++)d[T]=d[T]/v;u.envMap.value=e.texture,u.samples.value=f,u.weights.value=d,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:M}=this;u.dTheta.value=m,u.mipInt.value=M-n;const S=this._sizeLods[r],b=3*S*(r>M-ai?r-M+ai:0),w=4*(this._cubeSize-S);Yi(t,b,w,3*S,2*S),c.setRenderTarget(t),c.render(A,_r)}}function _A(i){const e=[],t=[],n=[];let r=i;const s=i-ai+1+Fl.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let c=1/o;a>i-ai?c=Fl[a-i+ai-1]:a===0&&(c=0),t.push(c);const l=1/(o-2),h=-l,A=1+l,u=[h,h,A,h,A,A,h,h,A,A,h,A],p=6,m=6,E=3,f=2,d=1,v=new Float32Array(E*m*p),M=new Float32Array(f*m*p),S=new Float32Array(d*m*p);for(let w=0;w<p;w++){const T=w%3*2/3-1,_=w>2?0:-1,y=[T,_,0,T+2/3,_,0,T+2/3,_+1,0,T,_,0,T+2/3,_+1,0,T,_+1,0];v.set(y,E*m*w),M.set(u,f*m*w);const W=[w,w,w,w,w,w];S.set(W,d*m*w)}const b=new yt;b.setAttribute("position",new Lt(v,E)),b.setAttribute("uv",new Lt(M,f)),b.setAttribute("faceIndex",new Lt(S,d)),n.push(new nt(b,null)),r>ai&&r--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Ol(i,e,t){const n=new Rn(i,e,t);return n.texture.mapping=Ls,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Yi(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function xA(i,e,t){return new Ln({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:mA,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ns(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function EA(i,e,t){const n=new Float32Array(yi),r=new N(0,1,0);return new Ln({name:"SphericalGaussianBlur",defines:{n:yi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ns(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function zl(){return new Ln({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ns(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Ql(){return new Ln({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ns(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vn,depthTest:!1,depthWrite:!1})}function Ns(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Gc extends Rn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Nc(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Qn(5,5,5),s=new Ln({name:"CubemapFromEquirect",uniforms:tr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:qt,blending:Vn});s.uniforms.tEquirect.value=t;const a=new nt(r,s),o=t.minFilter;return t.minFilter===Mi&&(t.minFilter=Qt),new Sh(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}function vA(i){let e=new WeakMap,t=new WeakMap,n=null;function r(u,p=!1){return u==null?null:p?a(u):s(u)}function s(u){if(u&&u.isTexture){const p=u.mapping;if(p===Gs||p===Vs)if(e.has(u)){const m=e.get(u).texture;return o(m,u.mapping)}else{const m=u.image;if(m&&m.height>0){const E=new Gc(m.height);return E.fromEquirectangularTexture(i,u),e.set(u,E),u.addEventListener("dispose",l),o(E.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const p=u.mapping,m=p===Gs||p===Vs,E=p===wi||p===Zi;if(m||E){let f=t.get(u);const d=f!==void 0?f.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==d)return n===null&&(n=new Ul(i)),f=m?n.fromEquirectangular(u,f):n.fromCubemap(u,f),f.texture.pmremVersion=u.pmremVersion,t.set(u,f),f.texture;if(f!==void 0)return f.texture;{const v=u.image;return m&&v&&v.height>0||E&&v&&c(v)?(n===null&&(n=new Ul(i)),f=m?n.fromEquirectangular(u):n.fromCubemap(u),f.texture.pmremVersion=u.pmremVersion,t.set(u,f),u.addEventListener("dispose",h),f.texture):null}}}return u}function o(u,p){return p===Gs?u.mapping=wi:p===Vs&&(u.mapping=Zi),u}function c(u){let p=0;const m=6;for(let E=0;E<m;E++)u[E]!==void 0&&p++;return p===m}function l(u){const p=u.target;p.removeEventListener("dispose",l);const m=e.get(p);m!==void 0&&(e.delete(p),m.dispose())}function h(u){const p=u.target;p.removeEventListener("dispose",h);const m=t.get(p);m!==void 0&&(t.delete(p),m.dispose())}function A(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:A}}function yA(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&Is("WebGLRenderer: "+n+" extension not supported."),r}}}function MA(i,e,t,n){const r={},s=new WeakMap;function a(A){const u=A.target;u.index!==null&&e.remove(u.index);for(const m in u.attributes)e.remove(u.attributes[m]);u.removeEventListener("dispose",a),delete r[u.id];const p=s.get(u);p&&(e.remove(p),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(A,u){return r[u.id]===!0||(u.addEventListener("dispose",a),r[u.id]=!0,t.memory.geometries++),u}function c(A){const u=A.attributes;for(const p in u)e.update(u[p],i.ARRAY_BUFFER)}function l(A){const u=[],p=A.index,m=A.attributes.position;let E=0;if(m===void 0)return;if(p!==null){const v=p.array;E=p.version;for(let M=0,S=v.length;M<S;M+=3){const b=v[M+0],w=v[M+1],T=v[M+2];u.push(b,w,w,T,T,b)}}else{const v=m.array;E=m.version;for(let M=0,S=v.length/3-1;M<S;M+=3){const b=M+0,w=M+1,T=M+2;u.push(b,w,w,T,T,b)}}const f=new(m.count>=65535?Pc:Lc)(u,1);f.version=E;const d=s.get(A);d&&e.remove(d),s.set(A,f)}function h(A){const u=s.get(A);if(u){const p=A.index;p!==null&&u.version<p.version&&l(A)}else l(A);return s.get(A)}return{get:o,update:c,getWireframeAttribute:h}}function SA(i,e,t){let n;function r(u){n=u}let s,a;function o(u){s=u.type,a=u.bytesPerElement}function c(u,p){i.drawElements(n,p,s,u*a),t.update(p,n,1)}function l(u,p,m){m!==0&&(i.drawElementsInstanced(n,p,s,u*a,m),t.update(p,n,m))}function h(u,p,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,s,u,0,m);let f=0;for(let d=0;d<m;d++)f+=p[d];t.update(f,n,1)}function A(u,p,m,E){if(m===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let d=0;d<u.length;d++)l(u[d]/a,p[d],E[d]);else{f.multiDrawElementsInstancedWEBGL(n,p,0,s,u,0,E,0,m);let d=0;for(let v=0;v<m;v++)d+=p[v]*E[v];t.update(d,n,1)}}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=A}function CA(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:it("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function wA(i,e,t){const n=new WeakMap,r=new Et;function s(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,A=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==A){let W=function(){_.dispose(),n.delete(o),o.removeEventListener("dispose",W)};var p=W;u!==void 0&&u.texture.dispose();const m=o.morphAttributes.position!==void 0,E=o.morphAttributes.normal!==void 0,f=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],v=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let S=0;m===!0&&(S=1),E===!0&&(S=2),f===!0&&(S=3);let b=o.attributes.position.count*S,w=1;b>e.maxTextureSize&&(w=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const T=new Float32Array(b*w*4*A),_=new Rc(T,b,w,A);_.type=bn,_.needsUpdate=!0;const y=S*4;for(let I=0;I<A;I++){const Q=d[I],G=v[I],H=M[I],z=b*w*4*I;for(let k=0;k<Q.count;k++){const U=k*y;m===!0&&(r.fromBufferAttribute(Q,k),T[z+U+0]=r.x,T[z+U+1]=r.y,T[z+U+2]=r.z,T[z+U+3]=0),E===!0&&(r.fromBufferAttribute(G,k),T[z+U+4]=r.x,T[z+U+5]=r.y,T[z+U+6]=r.z,T[z+U+7]=0),f===!0&&(r.fromBufferAttribute(H,k),T[z+U+8]=r.x,T[z+U+9]=r.y,T[z+U+10]=r.z,T[z+U+11]=H.itemSize===4?r.w:1)}}u={count:A,texture:_,size:new rt(b,w)},n.set(o,u),o.addEventListener("dispose",W)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let m=0;for(let f=0;f<l.length;f++)m+=l[f];const E=o.morphTargetsRelative?1:1-m;c.getUniforms().setValue(i,"morphTargetBaseInfluence",E),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:s}}function bA(i,e,t,n,r){let s=new WeakMap;function a(l){const h=r.render.frame,A=l.geometry,u=e.get(l,A);if(s.get(u)!==h&&(e.update(u),s.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==h&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,h))),l.isSkinnedMesh){const p=l.skeleton;s.get(p)!==h&&(p.update(),s.set(p,h))}return u}function o(){s=new WeakMap}function c(l){const h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}const IA={[fc]:"LINEAR_TONE_MAPPING",[pc]:"REINHARD_TONE_MAPPING",[Ac]:"CINEON_TONE_MAPPING",[mc]:"ACES_FILMIC_TONE_MAPPING",[_c]:"AGX_TONE_MAPPING",[xc]:"NEUTRAL_TONE_MAPPING",[gc]:"CUSTOM_TONE_MAPPING"};function TA(i,e,t,n,r){const s=new Rn(e,t,{type:i,depthBuffer:n,stencilBuffer:r}),a=new Rn(e,t,{type:Wn,depthBuffer:!1,stencilBuffer:!1}),o=new yt;o.setAttribute("position",new Ct([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Ct([0,2,0,0,2,0],2));const c=new _h({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),l=new nt(o,c),h=new Uo(-1,1,1,-1,0,1);let A=null,u=null,p=!1,m,E=null,f=[],d=!1;this.setSize=function(v,M){s.setSize(v,M),a.setSize(v,M);for(let S=0;S<f.length;S++){const b=f[S];b.setSize&&b.setSize(v,M)}},this.setEffects=function(v){f=v,d=f.length>0&&f[0].isRenderPass===!0;const M=s.width,S=s.height;for(let b=0;b<f.length;b++){const w=f[b];w.setSize&&w.setSize(M,S)}},this.begin=function(v,M){if(p||v.toneMapping===Tn&&f.length===0)return!1;if(E=M,M!==null){const S=M.width,b=M.height;(s.width!==S||s.height!==b)&&this.setSize(S,b)}return d===!1&&v.setRenderTarget(s),m=v.toneMapping,v.toneMapping=Tn,!0},this.hasRenderPass=function(){return d},this.end=function(v,M){v.toneMapping=m,p=!0;let S=s,b=a;for(let w=0;w<f.length;w++){const T=f[w];if(T.enabled!==!1&&(T.render(v,b,S,M),T.needsSwap!==!1)){const _=S;S=b,b=_}}if(A!==v.outputColorSpace||u!==v.toneMapping){A=v.outputColorSpace,u=v.toneMapping,c.defines={},et.getTransfer(A)===ct&&(c.defines.SRGB_TRANSFER="");const w=IA[u];w&&(c.defines[w]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=S.texture,v.setRenderTarget(E),v.render(l,h),E=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){s.dispose(),a.dispose(),o.dispose(),c.dispose()}}const Vc=new Wt,xo=new Rr(1,1),Hc=new Rc,Wc=new Jd,Xc=new Nc,kl=[],Gl=[],Vl=new Float32Array(16),Hl=new Float32Array(9),Wl=new Float32Array(4);function sr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=kl[r];if(s===void 0&&(s=new Float32Array(r),kl[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function bt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function It(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Us(i,e){let t=Gl[e];t===void 0&&(t=new Int32Array(e),Gl[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function RA(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function BA(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;i.uniform2fv(this.addr,e),It(t,e)}}function DA(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(bt(t,e))return;i.uniform3fv(this.addr,e),It(t,e)}}function LA(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;i.uniform4fv(this.addr,e),It(t,e)}}function PA(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),It(t,e)}else{if(bt(t,n))return;Wl.set(n),i.uniformMatrix2fv(this.addr,!1,Wl),It(t,n)}}function FA(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),It(t,e)}else{if(bt(t,n))return;Hl.set(n),i.uniformMatrix3fv(this.addr,!1,Hl),It(t,n)}}function NA(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(bt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),It(t,e)}else{if(bt(t,n))return;Vl.set(n),i.uniformMatrix4fv(this.addr,!1,Vl),It(t,n)}}function UA(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function OA(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;i.uniform2iv(this.addr,e),It(t,e)}}function zA(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;i.uniform3iv(this.addr,e),It(t,e)}}function QA(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;i.uniform4iv(this.addr,e),It(t,e)}}function kA(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function GA(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;i.uniform2uiv(this.addr,e),It(t,e)}}function VA(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;i.uniform3uiv(this.addr,e),It(t,e)}}function HA(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;i.uniform4uiv(this.addr,e),It(t,e)}}function WA(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(xo.compareFunction=t.isReversedDepthBuffer()?Lo:Do,s=xo):s=Vc,t.setTexture2D(e||s,r)}function XA(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Wc,r)}function YA(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Xc,r)}function qA(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Hc,r)}function JA(i){switch(i){case 5126:return RA;case 35664:return BA;case 35665:return DA;case 35666:return LA;case 35674:return PA;case 35675:return FA;case 35676:return NA;case 5124:case 35670:return UA;case 35667:case 35671:return OA;case 35668:case 35672:return zA;case 35669:case 35673:return QA;case 5125:return kA;case 36294:return GA;case 36295:return VA;case 36296:return HA;case 35678:case 36198:case 36298:case 36306:case 35682:return WA;case 35679:case 36299:case 36307:return XA;case 35680:case 36300:case 36308:case 36293:return YA;case 36289:case 36303:case 36311:case 36292:return qA}}function KA(i,e){i.uniform1fv(this.addr,e)}function $A(i,e){const t=sr(e,this.size,2);i.uniform2fv(this.addr,t)}function ZA(i,e){const t=sr(e,this.size,3);i.uniform3fv(this.addr,t)}function jA(i,e){const t=sr(e,this.size,4);i.uniform4fv(this.addr,t)}function em(i,e){const t=sr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function tm(i,e){const t=sr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function nm(i,e){const t=sr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function im(i,e){i.uniform1iv(this.addr,e)}function rm(i,e){i.uniform2iv(this.addr,e)}function sm(i,e){i.uniform3iv(this.addr,e)}function am(i,e){i.uniform4iv(this.addr,e)}function om(i,e){i.uniform1uiv(this.addr,e)}function lm(i,e){i.uniform2uiv(this.addr,e)}function cm(i,e){i.uniform3uiv(this.addr,e)}function um(i,e){i.uniform4uiv(this.addr,e)}function dm(i,e,t){const n=this.cache,r=e.length,s=Us(t,r);bt(n,s)||(i.uniform1iv(this.addr,s),It(n,s));let a;this.type===i.SAMPLER_2D_SHADOW?a=xo:a=Vc;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function hm(i,e,t){const n=this.cache,r=e.length,s=Us(t,r);bt(n,s)||(i.uniform1iv(this.addr,s),It(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Wc,s[a])}function fm(i,e,t){const n=this.cache,r=e.length,s=Us(t,r);bt(n,s)||(i.uniform1iv(this.addr,s),It(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Xc,s[a])}function pm(i,e,t){const n=this.cache,r=e.length,s=Us(t,r);bt(n,s)||(i.uniform1iv(this.addr,s),It(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Hc,s[a])}function Am(i){switch(i){case 5126:return KA;case 35664:return $A;case 35665:return ZA;case 35666:return jA;case 35674:return em;case 35675:return tm;case 35676:return nm;case 5124:case 35670:return im;case 35667:case 35671:return rm;case 35668:case 35672:return sm;case 35669:case 35673:return am;case 5125:return om;case 36294:return lm;case 36295:return cm;case 36296:return um;case 35678:case 36198:case 36298:case 36306:case 35682:return dm;case 35679:case 36299:case 36307:return hm;case 35680:case 36300:case 36308:case 36293:return fm;case 36289:case 36303:case 36311:case 36292:return pm}}class mm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=JA(t.type)}}class gm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Am(t.type)}}class _m{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const ya=/(\w+)(\])?(\[|\.)?/g;function Xl(i,e){i.seq.push(e),i.map[e.id]=e}function xm(i,e,t){const n=i.name,r=n.length;for(ya.lastIndex=0;;){const s=ya.exec(n),a=ya.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){Xl(t,l===void 0?new mm(o,i,e):new gm(o,i,e));break}else{let A=t.map[o];A===void 0&&(A=new _m(o),Xl(t,A)),t=A}}}class ys{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);xm(o,c,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function Yl(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Em=37297;let vm=0;function ym(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const ql=new ze;function Mm(i){et._getMatrix(ql,et.workingColorSpace,i);const e=`mat3( ${ql.elements.map(t=>t.toFixed(4))} )`;switch(et.getTransfer(i)){case ws:return[e,"LinearTransferOETF"];case ct:return[e,"sRGBTransferOETF"];default:return Pe("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Jl(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+ym(i.getShaderSource(e),o)}else return s}function Sm(i,e){const t=Mm(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Cm={[fc]:"Linear",[pc]:"Reinhard",[Ac]:"Cineon",[mc]:"ACESFilmic",[_c]:"AgX",[xc]:"Neutral",[gc]:"Custom"};function wm(i,e){const t=Cm[e];return t===void 0?(Pe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ds=new N;function bm(){et.getLuminanceCoefficients(ds);const i=ds.x.toFixed(4),e=ds.y.toFixed(4),t=ds.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Im(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(yr).join(`
`)}function Tm(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Rm(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function yr(i){return i!==""}function Kl(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function $l(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Bm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Eo(i){return i.replace(Bm,Lm)}const Dm=new Map;function Lm(i,e){let t=Qe[e];if(t===void 0){const n=Dm.get(e);if(n!==void 0)t=Qe[n],Pe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Eo(t)}const Pm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Zl(i){return i.replace(Pm,Fm)}function Fm(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function jl(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const Nm={[ms]:"SHADOWMAP_TYPE_PCF",[vr]:"SHADOWMAP_TYPE_VSM"};function Um(i){return Nm[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Om={[wi]:"ENVMAP_TYPE_CUBE",[Zi]:"ENVMAP_TYPE_CUBE",[Ls]:"ENVMAP_TYPE_CUBE_UV"};function zm(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Om[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const Qm={[Zi]:"ENVMAP_MODE_REFRACTION"};function km(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Qm[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Gm={[hc]:"ENVMAP_BLENDING_MULTIPLY",[Id]:"ENVMAP_BLENDING_MIX",[Td]:"ENVMAP_BLENDING_ADD"};function Vm(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Gm[i.combine]||"ENVMAP_BLENDING_NONE"}function Hm(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Wm(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=Um(t),l=zm(t),h=km(t),A=Vm(t),u=Hm(t),p=Im(t),m=Tm(s),E=r.createProgram();let f,d,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(yr).join(`
`),f.length>0&&(f+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(yr).join(`
`),d.length>0&&(d+=`
`)):(f=[jl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(yr).join(`
`),d=[jl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+A:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Tn?"#define TONE_MAPPING":"",t.toneMapping!==Tn?Qe.tonemapping_pars_fragment:"",t.toneMapping!==Tn?wm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Qe.colorspace_pars_fragment,Sm("linearToOutputTexel",t.outputColorSpace),bm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(yr).join(`
`)),a=Eo(a),a=Kl(a,t),a=$l(a,t),o=Eo(o),o=Kl(o,t),o=$l(o,t),a=Zl(a),o=Zl(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,f=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,d=["#define varying in",t.glslVersion===ol?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ol?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const M=v+f+a,S=v+d+o,b=Yl(r,r.VERTEX_SHADER,M),w=Yl(r,r.FRAGMENT_SHADER,S);r.attachShader(E,b),r.attachShader(E,w),t.index0AttributeName!==void 0?r.bindAttribLocation(E,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(E,0,"position"),r.linkProgram(E);function T(I){if(i.debug.checkShaderErrors){const Q=r.getProgramInfoLog(E)||"",G=r.getShaderInfoLog(b)||"",H=r.getShaderInfoLog(w)||"",z=Q.trim(),k=G.trim(),U=H.trim();let j=!0,Z=!0;if(r.getProgramParameter(E,r.LINK_STATUS)===!1)if(j=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,E,b,w);else{const he=Jl(r,b,"vertex"),fe=Jl(r,w,"fragment");it("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(E,r.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+z+`
`+he+`
`+fe)}else z!==""?Pe("WebGLProgram: Program Info Log:",z):(k===""||U==="")&&(Z=!1);Z&&(I.diagnostics={runnable:j,programLog:z,vertexShader:{log:k,prefix:f},fragmentShader:{log:U,prefix:d}})}r.deleteShader(b),r.deleteShader(w),_=new ys(r,E),y=Rm(r,E)}let _;this.getUniforms=function(){return _===void 0&&T(this),_};let y;this.getAttributes=function(){return y===void 0&&T(this),y};let W=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return W===!1&&(W=r.getProgramParameter(E,Em)),W},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(E),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=vm++,this.cacheKey=e,this.usedTimes=1,this.program=E,this.vertexShader=b,this.fragmentShader=w,this}let Xm=0;class Ym{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new qm(e),t.set(e,n)),n}}class qm{constructor(e){this.id=Xm++,this.code=e,this.usedTimes=0}}function Jm(i,e,t,n,r,s){const a=new Bc,o=new Ym,c=new Set,l=[],h=new Map,A=n.logarithmicDepthBuffer;let u=n.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(_){return c.add(_),_===0?"uv":`uv${_}`}function E(_,y,W,I,Q){const G=I.fog,H=Q.geometry,z=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?I.environment:null,k=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,U=e.get(_.envMap||z,k),j=U&&U.mapping===Ls?U.image.height:null,Z=p[_.type];_.precision!==null&&(u=n.getMaxPrecision(_.precision),u!==_.precision&&Pe("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));const he=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,fe=he!==void 0?he.length:0;let le=0;H.morphAttributes.position!==void 0&&(le=1),H.morphAttributes.normal!==void 0&&(le=2),H.morphAttributes.color!==void 0&&(le=3);let De,at,st,J;if(Z){const je=Sn[Z];De=je.vertexShader,at=je.fragmentShader}else De=_.vertexShader,at=_.fragmentShader,o.update(_),st=o.getVertexShaderID(_),J=o.getFragmentShaderID(_);const re=i.getRenderTarget(),se=i.state.buffers.depth.getReversed(),Fe=Q.isInstancedMesh===!0,be=Q.isBatchedMesh===!0,Ie=!!_.map,gt=!!_.matcap,We=!!U,Ze=!!_.aoMap,lt=!!_.lightMap,Ne=!!_.bumpMap,At=!!_.normalMap,R=!!_.displacementMap,pt=!!_.emissiveMap,Ye=!!_.metalnessMap,ut=!!_.roughnessMap,Ee=_.anisotropy>0,C=_.clearcoat>0,g=_.dispersion>0,L=_.iridescence>0,q=_.sheen>0,K=_.transmission>0,Y=Ee&&!!_.anisotropyMap,_e=C&&!!_.clearcoatMap,ne=C&&!!_.clearcoatNormalMap,ve=C&&!!_.clearcoatRoughnessMap,Ce=L&&!!_.iridescenceMap,$=L&&!!_.iridescenceThicknessMap,te=q&&!!_.sheenColorMap,me=q&&!!_.sheenRoughnessMap,ge=!!_.specularMap,ue=!!_.specularColorMap,Ue=!!_.specularIntensityMap,D=K&&!!_.transmissionMap,ae=K&&!!_.thicknessMap,ie=!!_.gradientMap,pe=!!_.alphaMap,ee=_.alphaTest>0,X=!!_.alphaHash,xe=!!_.extensions;let Be=Tn;_.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(Be=i.toneMapping);const Ke={shaderID:Z,shaderType:_.type,shaderName:_.name,vertexShader:De,fragmentShader:at,defines:_.defines,customVertexShaderID:st,customFragmentShaderID:J,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:be,batchingColor:be&&Q._colorsTexture!==null,instancing:Fe,instancingColor:Fe&&Q.instanceColor!==null,instancingMorph:Fe&&Q.morphTexture!==null,outputColorSpace:re===null?i.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:er,alphaToCoverage:!!_.alphaToCoverage,map:Ie,matcap:gt,envMap:We,envMapMode:We&&U.mapping,envMapCubeUVHeight:j,aoMap:Ze,lightMap:lt,bumpMap:Ne,normalMap:At,displacementMap:R,emissiveMap:pt,normalMapObjectSpace:At&&_.normalMapType===Dd,normalMapTangentSpace:At&&_.normalMapType===Ic,metalnessMap:Ye,roughnessMap:ut,anisotropy:Ee,anisotropyMap:Y,clearcoat:C,clearcoatMap:_e,clearcoatNormalMap:ne,clearcoatRoughnessMap:ve,dispersion:g,iridescence:L,iridescenceMap:Ce,iridescenceThicknessMap:$,sheen:q,sheenColorMap:te,sheenRoughnessMap:me,specularMap:ge,specularColorMap:ue,specularIntensityMap:Ue,transmission:K,transmissionMap:D,thicknessMap:ae,gradientMap:ie,opaque:_.transparent===!1&&_.blending===Ji&&_.alphaToCoverage===!1,alphaMap:pe,alphaTest:ee,alphaHash:X,combine:_.combine,mapUv:Ie&&m(_.map.channel),aoMapUv:Ze&&m(_.aoMap.channel),lightMapUv:lt&&m(_.lightMap.channel),bumpMapUv:Ne&&m(_.bumpMap.channel),normalMapUv:At&&m(_.normalMap.channel),displacementMapUv:R&&m(_.displacementMap.channel),emissiveMapUv:pt&&m(_.emissiveMap.channel),metalnessMapUv:Ye&&m(_.metalnessMap.channel),roughnessMapUv:ut&&m(_.roughnessMap.channel),anisotropyMapUv:Y&&m(_.anisotropyMap.channel),clearcoatMapUv:_e&&m(_.clearcoatMap.channel),clearcoatNormalMapUv:ne&&m(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ve&&m(_.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&m(_.iridescenceMap.channel),iridescenceThicknessMapUv:$&&m(_.iridescenceThicknessMap.channel),sheenColorMapUv:te&&m(_.sheenColorMap.channel),sheenRoughnessMapUv:me&&m(_.sheenRoughnessMap.channel),specularMapUv:ge&&m(_.specularMap.channel),specularColorMapUv:ue&&m(_.specularColorMap.channel),specularIntensityMapUv:Ue&&m(_.specularIntensityMap.channel),transmissionMapUv:D&&m(_.transmissionMap.channel),thicknessMapUv:ae&&m(_.thicknessMap.channel),alphaMapUv:pe&&m(_.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(At||Ee),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:Q.isPoints===!0&&!!H.attributes.uv&&(Ie||pe),fog:!!G,useFog:_.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||H.attributes.normal===void 0&&At===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:A,reversedDepthBuffer:se,skinning:Q.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:fe,morphTextureStride:le,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&W.length>0,shadowMapType:i.shadowMap.type,toneMapping:Be,decodeVideoTexture:Ie&&_.map.isVideoTexture===!0&&et.getTransfer(_.map.colorSpace)===ct,decodeVideoTextureEmissive:pt&&_.emissiveMap.isVideoTexture===!0&&et.getTransfer(_.emissiveMap.colorSpace)===ct,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===wn,flipSided:_.side===qt,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:xe&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(xe&&_.extensions.multiDraw===!0||be)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Ke.vertexUv1s=c.has(1),Ke.vertexUv2s=c.has(2),Ke.vertexUv3s=c.has(3),c.clear(),Ke}function f(_){const y=[];if(_.shaderID?y.push(_.shaderID):(y.push(_.customVertexShaderID),y.push(_.customFragmentShaderID)),_.defines!==void 0)for(const W in _.defines)y.push(W),y.push(_.defines[W]);return _.isRawShaderMaterial===!1&&(d(y,_),v(y,_),y.push(i.outputColorSpace)),y.push(_.customProgramCacheKey),y.join()}function d(_,y){_.push(y.precision),_.push(y.outputColorSpace),_.push(y.envMapMode),_.push(y.envMapCubeUVHeight),_.push(y.mapUv),_.push(y.alphaMapUv),_.push(y.lightMapUv),_.push(y.aoMapUv),_.push(y.bumpMapUv),_.push(y.normalMapUv),_.push(y.displacementMapUv),_.push(y.emissiveMapUv),_.push(y.metalnessMapUv),_.push(y.roughnessMapUv),_.push(y.anisotropyMapUv),_.push(y.clearcoatMapUv),_.push(y.clearcoatNormalMapUv),_.push(y.clearcoatRoughnessMapUv),_.push(y.iridescenceMapUv),_.push(y.iridescenceThicknessMapUv),_.push(y.sheenColorMapUv),_.push(y.sheenRoughnessMapUv),_.push(y.specularMapUv),_.push(y.specularColorMapUv),_.push(y.specularIntensityMapUv),_.push(y.transmissionMapUv),_.push(y.thicknessMapUv),_.push(y.combine),_.push(y.fogExp2),_.push(y.sizeAttenuation),_.push(y.morphTargetsCount),_.push(y.morphAttributeCount),_.push(y.numDirLights),_.push(y.numPointLights),_.push(y.numSpotLights),_.push(y.numSpotLightMaps),_.push(y.numHemiLights),_.push(y.numRectAreaLights),_.push(y.numDirLightShadows),_.push(y.numPointLightShadows),_.push(y.numSpotLightShadows),_.push(y.numSpotLightShadowsWithMaps),_.push(y.numLightProbes),_.push(y.shadowMapType),_.push(y.toneMapping),_.push(y.numClippingPlanes),_.push(y.numClipIntersection),_.push(y.depthPacking)}function v(_,y){a.disableAll(),y.instancing&&a.enable(0),y.instancingColor&&a.enable(1),y.instancingMorph&&a.enable(2),y.matcap&&a.enable(3),y.envMap&&a.enable(4),y.normalMapObjectSpace&&a.enable(5),y.normalMapTangentSpace&&a.enable(6),y.clearcoat&&a.enable(7),y.iridescence&&a.enable(8),y.alphaTest&&a.enable(9),y.vertexColors&&a.enable(10),y.vertexAlphas&&a.enable(11),y.vertexUv1s&&a.enable(12),y.vertexUv2s&&a.enable(13),y.vertexUv3s&&a.enable(14),y.vertexTangents&&a.enable(15),y.anisotropy&&a.enable(16),y.alphaHash&&a.enable(17),y.batching&&a.enable(18),y.dispersion&&a.enable(19),y.batchingColor&&a.enable(20),y.gradientMap&&a.enable(21),_.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reversedDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),_.push(a.mask)}function M(_){const y=p[_.type];let W;if(y){const I=Sn[y];W=Ah.clone(I.uniforms)}else W=_.uniforms;return W}function S(_,y){let W=h.get(y);return W!==void 0?++W.usedTimes:(W=new Wm(i,y,_,r),l.push(W),h.set(y,W)),W}function b(_){if(--_.usedTimes===0){const y=l.indexOf(_);l[y]=l[l.length-1],l.pop(),h.delete(_.cacheKey),_.destroy()}}function w(_){o.remove(_)}function T(){o.dispose()}return{getParameters:E,getProgramCacheKey:f,getUniforms:M,acquireProgram:S,releaseProgram:b,releaseShaderCache:w,programs:l,dispose:T}}function Km(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,c){i.get(a)[o]=c}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function $m(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function ec(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function tc(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,m,E,f,d){let v=i[e];return v===void 0?(v={id:u.id,object:u,geometry:p,material:m,materialVariant:a(u),groupOrder:E,renderOrder:u.renderOrder,z:f,group:d},i[e]=v):(v.id=u.id,v.object=u,v.geometry=p,v.material=m,v.materialVariant=a(u),v.groupOrder=E,v.renderOrder=u.renderOrder,v.z=f,v.group=d),e++,v}function c(u,p,m,E,f,d){const v=o(u,p,m,E,f,d);m.transmission>0?n.push(v):m.transparent===!0?r.push(v):t.push(v)}function l(u,p,m,E,f,d){const v=o(u,p,m,E,f,d);m.transmission>0?n.unshift(v):m.transparent===!0?r.unshift(v):t.unshift(v)}function h(u,p){t.length>1&&t.sort(u||$m),n.length>1&&n.sort(p||ec),r.length>1&&r.sort(p||ec)}function A(){for(let u=e,p=i.length;u<p;u++){const m=i[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:c,unshift:l,finish:A,sort:h}}function Zm(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new tc,i.set(n,[a])):r>=s.length?(a=new tc,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function jm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new Je};break;case"SpotLight":t={position:new N,direction:new N,color:new Je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new Je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new Je,groundColor:new Je};break;case"RectAreaLight":t={color:new Je,position:new N,halfWidth:new N,halfHeight:new N};break}return i[e.id]=t,t}}}function eg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let tg=0;function ng(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function ig(i){const e=new jm,t=eg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new N);const r=new N,s=new mt,a=new mt;function o(l){let h=0,A=0,u=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let p=0,m=0,E=0,f=0,d=0,v=0,M=0,S=0,b=0,w=0,T=0;l.sort(ng);for(let y=0,W=l.length;y<W;y++){const I=l[y],Q=I.color,G=I.intensity,H=I.distance;let z=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===ji?z=I.shadow.map.texture:z=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)h+=Q.r*G,A+=Q.g*G,u+=Q.b*G;else if(I.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(I.sh.coefficients[k],G);T++}else if(I.isDirectionalLight){const k=e.get(I);if(k.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const U=I.shadow,j=t.get(I);j.shadowIntensity=U.intensity,j.shadowBias=U.bias,j.shadowNormalBias=U.normalBias,j.shadowRadius=U.radius,j.shadowMapSize=U.mapSize,n.directionalShadow[p]=j,n.directionalShadowMap[p]=z,n.directionalShadowMatrix[p]=I.shadow.matrix,v++}n.directional[p]=k,p++}else if(I.isSpotLight){const k=e.get(I);k.position.setFromMatrixPosition(I.matrixWorld),k.color.copy(Q).multiplyScalar(G),k.distance=H,k.coneCos=Math.cos(I.angle),k.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),k.decay=I.decay,n.spot[E]=k;const U=I.shadow;if(I.map&&(n.spotLightMap[b]=I.map,b++,U.updateMatrices(I),I.castShadow&&w++),n.spotLightMatrix[E]=U.matrix,I.castShadow){const j=t.get(I);j.shadowIntensity=U.intensity,j.shadowBias=U.bias,j.shadowNormalBias=U.normalBias,j.shadowRadius=U.radius,j.shadowMapSize=U.mapSize,n.spotShadow[E]=j,n.spotShadowMap[E]=z,S++}E++}else if(I.isRectAreaLight){const k=e.get(I);k.color.copy(Q).multiplyScalar(G),k.halfWidth.set(I.width*.5,0,0),k.halfHeight.set(0,I.height*.5,0),n.rectArea[f]=k,f++}else if(I.isPointLight){const k=e.get(I);if(k.color.copy(I.color).multiplyScalar(I.intensity),k.distance=I.distance,k.decay=I.decay,I.castShadow){const U=I.shadow,j=t.get(I);j.shadowIntensity=U.intensity,j.shadowBias=U.bias,j.shadowNormalBias=U.normalBias,j.shadowRadius=U.radius,j.shadowMapSize=U.mapSize,j.shadowCameraNear=U.camera.near,j.shadowCameraFar=U.camera.far,n.pointShadow[m]=j,n.pointShadowMap[m]=z,n.pointShadowMatrix[m]=I.shadow.matrix,M++}n.point[m]=k,m++}else if(I.isHemisphereLight){const k=e.get(I);k.skyColor.copy(I.color).multiplyScalar(G),k.groundColor.copy(I.groundColor).multiplyScalar(G),n.hemi[d]=k,d++}}f>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ce.LTC_FLOAT_1,n.rectAreaLTC2=ce.LTC_FLOAT_2):(n.rectAreaLTC1=ce.LTC_HALF_1,n.rectAreaLTC2=ce.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=A,n.ambient[2]=u;const _=n.hash;(_.directionalLength!==p||_.pointLength!==m||_.spotLength!==E||_.rectAreaLength!==f||_.hemiLength!==d||_.numDirectionalShadows!==v||_.numPointShadows!==M||_.numSpotShadows!==S||_.numSpotMaps!==b||_.numLightProbes!==T)&&(n.directional.length=p,n.spot.length=E,n.rectArea.length=f,n.point.length=m,n.hemi.length=d,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=S+b-w,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=T,_.directionalLength=p,_.pointLength=m,_.spotLength=E,_.rectAreaLength=f,_.hemiLength=d,_.numDirectionalShadows=v,_.numPointShadows=M,_.numSpotShadows=S,_.numSpotMaps=b,_.numLightProbes=T,n.version=tg++)}function c(l,h){let A=0,u=0,p=0,m=0,E=0;const f=h.matrixWorldInverse;for(let d=0,v=l.length;d<v;d++){const M=l[d];if(M.isDirectionalLight){const S=n.directional[A];S.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(f),A++}else if(M.isSpotLight){const S=n.spot[p];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(f),S.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(f),p++}else if(M.isRectAreaLight){const S=n.rectArea[m];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(f),a.identity(),s.copy(M.matrixWorld),s.premultiply(f),a.extractRotation(s),S.halfWidth.set(M.width*.5,0,0),S.halfHeight.set(0,M.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),m++}else if(M.isPointLight){const S=n.point[u];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(f),u++}else if(M.isHemisphereLight){const S=n.hemi[E];S.direction.setFromMatrixPosition(M.matrixWorld),S.direction.transformDirection(f),E++}}}return{setup:o,setupView:c,state:n}}function nc(i){const e=new ig(i),t=[],n=[];function r(h){l.camera=h,t.length=0,n.length=0}function s(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:o,setupLightsView:c,pushLight:s,pushShadow:a}}function rg(i){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new nc(i),e.set(r,[o])):s>=a.length?(o=new nc(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const sg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ag=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,og=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],lg=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],ic=new mt,xr=new N,Ma=new N;function cg(i,e,t){let n=new No;const r=new rt,s=new rt,a=new Et,o=new xh,c=new Eh,l={},h=t.maxTextureSize,A={[oi]:qt,[qt]:oi,[wn]:wn},u=new Ln({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new rt},radius:{value:4}},vertexShader:sg,fragmentShader:ag}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const m=new yt;m.setAttribute("position",new Lt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const E=new nt(m,u),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ms;let d=this.type;this.render=function(w,T,_){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||w.length===0)return;this.type===cd&&(Pe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=ms);const y=i.getRenderTarget(),W=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),Q=i.state;Q.setBlending(Vn),Q.buffers.depth.getReversed()===!0?Q.buffers.color.setClear(0,0,0,0):Q.buffers.color.setClear(1,1,1,1),Q.buffers.depth.setTest(!0),Q.setScissorTest(!1);const G=d!==this.type;G&&T.traverse(function(H){H.material&&(Array.isArray(H.material)?H.material.forEach(z=>z.needsUpdate=!0):H.material.needsUpdate=!0)});for(let H=0,z=w.length;H<z;H++){const k=w[H],U=k.shadow;if(U===void 0){Pe("WebGLShadowMap:",k,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;r.copy(U.mapSize);const j=U.getFrameExtents();r.multiply(j),s.copy(U.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/j.x),r.x=s.x*j.x,U.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/j.y),r.y=s.y*j.y,U.mapSize.y=s.y));const Z=i.state.buffers.depth.getReversed();if(U.camera._reversedDepth=Z,U.map===null||G===!0){if(U.map!==null&&(U.map.depthTexture!==null&&(U.map.depthTexture.dispose(),U.map.depthTexture=null),U.map.dispose()),this.type===vr){if(k.isPointLight){Pe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}U.map=new Rn(r.x,r.y,{format:ji,type:Wn,minFilter:Qt,magFilter:Qt,generateMipmaps:!1}),U.map.texture.name=k.name+".shadowMap",U.map.depthTexture=new Rr(r.x,r.y,bn),U.map.depthTexture.name=k.name+".shadowMapDepth",U.map.depthTexture.format=Xn,U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=Pt,U.map.depthTexture.magFilter=Pt}else k.isPointLight?(U.map=new Gc(r.x),U.map.depthTexture=new fh(r.x,Bn)):(U.map=new Rn(r.x,r.y),U.map.depthTexture=new Rr(r.x,r.y,Bn)),U.map.depthTexture.name=k.name+".shadowMap",U.map.depthTexture.format=Xn,this.type===ms?(U.map.depthTexture.compareFunction=Z?Lo:Do,U.map.depthTexture.minFilter=Qt,U.map.depthTexture.magFilter=Qt):(U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=Pt,U.map.depthTexture.magFilter=Pt);U.camera.updateProjectionMatrix()}const he=U.map.isWebGLCubeRenderTarget?6:1;for(let fe=0;fe<he;fe++){if(U.map.isWebGLCubeRenderTarget)i.setRenderTarget(U.map,fe),i.clear();else{fe===0&&(i.setRenderTarget(U.map),i.clear());const le=U.getViewport(fe);a.set(s.x*le.x,s.y*le.y,s.x*le.z,s.y*le.w),Q.viewport(a)}if(k.isPointLight){const le=U.camera,De=U.matrix,at=k.distance||le.far;at!==le.far&&(le.far=at,le.updateProjectionMatrix()),xr.setFromMatrixPosition(k.matrixWorld),le.position.copy(xr),Ma.copy(le.position),Ma.add(og[fe]),le.up.copy(lg[fe]),le.lookAt(Ma),le.updateMatrixWorld(),De.makeTranslation(-xr.x,-xr.y,-xr.z),ic.multiplyMatrices(le.projectionMatrix,le.matrixWorldInverse),U._frustum.setFromProjectionMatrix(ic,le.coordinateSystem,le.reversedDepth)}else U.updateMatrices(k);n=U.getFrustum(),S(T,_,U.camera,k,this.type)}U.isPointLightShadow!==!0&&this.type===vr&&v(U,_),U.needsUpdate=!1}d=this.type,f.needsUpdate=!1,i.setRenderTarget(y,W,I)};function v(w,T){const _=e.update(E);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Rn(r.x,r.y,{format:ji,type:Wn})),u.uniforms.shadow_pass.value=w.map.depthTexture,u.uniforms.resolution.value=w.mapSize,u.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(T,null,_,u,E,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(T,null,_,p,E,null)}function M(w,T,_,y){let W=null;const I=_.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(I!==void 0)W=I;else if(W=_.isPointLight===!0?c:o,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){const Q=W.uuid,G=T.uuid;let H=l[Q];H===void 0&&(H={},l[Q]=H);let z=H[G];z===void 0&&(z=W.clone(),H[G]=z,T.addEventListener("dispose",b)),W=z}if(W.visible=T.visible,W.wireframe=T.wireframe,y===vr?W.side=T.shadowSide!==null?T.shadowSide:T.side:W.side=T.shadowSide!==null?T.shadowSide:A[T.side],W.alphaMap=T.alphaMap,W.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,W.map=T.map,W.clipShadows=T.clipShadows,W.clippingPlanes=T.clippingPlanes,W.clipIntersection=T.clipIntersection,W.displacementMap=T.displacementMap,W.displacementScale=T.displacementScale,W.displacementBias=T.displacementBias,W.wireframeLinewidth=T.wireframeLinewidth,W.linewidth=T.linewidth,_.isPointLight===!0&&W.isMeshDistanceMaterial===!0){const Q=i.properties.get(W);Q.light=_}return W}function S(w,T,_,y,W){if(w.visible===!1)return;if(w.layers.test(T.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&W===vr)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,w.matrixWorld);const G=e.update(w),H=w.material;if(Array.isArray(H)){const z=G.groups;for(let k=0,U=z.length;k<U;k++){const j=z[k],Z=H[j.materialIndex];if(Z&&Z.visible){const he=M(w,Z,y,W);w.onBeforeShadow(i,w,T,_,G,he,j),i.renderBufferDirect(_,null,G,he,w,j),w.onAfterShadow(i,w,T,_,G,he,j)}}}else if(H.visible){const z=M(w,H,y,W);w.onBeforeShadow(i,w,T,_,G,z,null),i.renderBufferDirect(_,null,G,z,w,null),w.onAfterShadow(i,w,T,_,G,z,null)}}const Q=w.children;for(let G=0,H=Q.length;G<H;G++)S(Q[G],T,_,y,W)}function b(w){w.target.removeEventListener("dispose",b);for(const _ in l){const y=l[_],W=w.target.uuid;W in y&&(y[W].dispose(),delete y[W])}}}function ug(i,e){function t(){let D=!1;const ae=new Et;let ie=null;const pe=new Et(0,0,0,0);return{setMask:function(ee){ie!==ee&&!D&&(i.colorMask(ee,ee,ee,ee),ie=ee)},setLocked:function(ee){D=ee},setClear:function(ee,X,xe,Be,Ke){Ke===!0&&(ee*=Be,X*=Be,xe*=Be),ae.set(ee,X,xe,Be),pe.equals(ae)===!1&&(i.clearColor(ee,X,xe,Be),pe.copy(ae))},reset:function(){D=!1,ie=null,pe.set(-1,0,0,0)}}}function n(){let D=!1,ae=!1,ie=null,pe=null,ee=null;return{setReversed:function(X){if(ae!==X){const xe=e.get("EXT_clip_control");X?xe.clipControlEXT(xe.LOWER_LEFT_EXT,xe.ZERO_TO_ONE_EXT):xe.clipControlEXT(xe.LOWER_LEFT_EXT,xe.NEGATIVE_ONE_TO_ONE_EXT),ae=X;const Be=ee;ee=null,this.setClear(Be)}},getReversed:function(){return ae},setTest:function(X){X?re(i.DEPTH_TEST):se(i.DEPTH_TEST)},setMask:function(X){ie!==X&&!D&&(i.depthMask(X),ie=X)},setFunc:function(X){if(ae&&(X=Gd[X]),pe!==X){switch(X){case Ta:i.depthFunc(i.NEVER);break;case Ra:i.depthFunc(i.ALWAYS);break;case Ba:i.depthFunc(i.LESS);break;case $i:i.depthFunc(i.LEQUAL);break;case Da:i.depthFunc(i.EQUAL);break;case La:i.depthFunc(i.GEQUAL);break;case Pa:i.depthFunc(i.GREATER);break;case Fa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}pe=X}},setLocked:function(X){D=X},setClear:function(X){ee!==X&&(ee=X,ae&&(X=1-X),i.clearDepth(X))},reset:function(){D=!1,ie=null,pe=null,ee=null,ae=!1}}}function r(){let D=!1,ae=null,ie=null,pe=null,ee=null,X=null,xe=null,Be=null,Ke=null;return{setTest:function(je){D||(je?re(i.STENCIL_TEST):se(i.STENCIL_TEST))},setMask:function(je){ae!==je&&!D&&(i.stencilMask(je),ae=je)},setFunc:function(je,Jt,rn){(ie!==je||pe!==Jt||ee!==rn)&&(i.stencilFunc(je,Jt,rn),ie=je,pe=Jt,ee=rn)},setOp:function(je,Jt,rn){(X!==je||xe!==Jt||Be!==rn)&&(i.stencilOp(je,Jt,rn),X=je,xe=Jt,Be=rn)},setLocked:function(je){D=je},setClear:function(je){Ke!==je&&(i.clearStencil(je),Ke=je)},reset:function(){D=!1,ae=null,ie=null,pe=null,ee=null,X=null,xe=null,Be=null,Ke=null}}}const s=new t,a=new n,o=new r,c=new WeakMap,l=new WeakMap;let h={},A={},u=new WeakMap,p=[],m=null,E=!1,f=null,d=null,v=null,M=null,S=null,b=null,w=null,T=new Je(0,0,0),_=0,y=!1,W=null,I=null,Q=null,G=null,H=null;const z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,U=0;const j=i.getParameter(i.VERSION);j.indexOf("WebGL")!==-1?(U=parseFloat(/^WebGL (\d)/.exec(j)[1]),k=U>=1):j.indexOf("OpenGL ES")!==-1&&(U=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),k=U>=2);let Z=null,he={};const fe=i.getParameter(i.SCISSOR_BOX),le=i.getParameter(i.VIEWPORT),De=new Et().fromArray(fe),at=new Et().fromArray(le);function st(D,ae,ie,pe){const ee=new Uint8Array(4),X=i.createTexture();i.bindTexture(D,X),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let xe=0;xe<ie;xe++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(ae,0,i.RGBA,1,1,pe,0,i.RGBA,i.UNSIGNED_BYTE,ee):i.texImage2D(ae+xe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ee);return X}const J={};J[i.TEXTURE_2D]=st(i.TEXTURE_2D,i.TEXTURE_2D,1),J[i.TEXTURE_CUBE_MAP]=st(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[i.TEXTURE_2D_ARRAY]=st(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),J[i.TEXTURE_3D]=st(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),re(i.DEPTH_TEST),a.setFunc($i),Ne(!1),At(tl),re(i.CULL_FACE),Ze(Vn);function re(D){h[D]!==!0&&(i.enable(D),h[D]=!0)}function se(D){h[D]!==!1&&(i.disable(D),h[D]=!1)}function Fe(D,ae){return A[D]!==ae?(i.bindFramebuffer(D,ae),A[D]=ae,D===i.DRAW_FRAMEBUFFER&&(A[i.FRAMEBUFFER]=ae),D===i.FRAMEBUFFER&&(A[i.DRAW_FRAMEBUFFER]=ae),!0):!1}function be(D,ae){let ie=p,pe=!1;if(D){ie=u.get(ae),ie===void 0&&(ie=[],u.set(ae,ie));const ee=D.textures;if(ie.length!==ee.length||ie[0]!==i.COLOR_ATTACHMENT0){for(let X=0,xe=ee.length;X<xe;X++)ie[X]=i.COLOR_ATTACHMENT0+X;ie.length=ee.length,pe=!0}}else ie[0]!==i.BACK&&(ie[0]=i.BACK,pe=!0);pe&&i.drawBuffers(ie)}function Ie(D){return m!==D?(i.useProgram(D),m=D,!0):!1}const gt={[vi]:i.FUNC_ADD,[dd]:i.FUNC_SUBTRACT,[hd]:i.FUNC_REVERSE_SUBTRACT};gt[fd]=i.MIN,gt[pd]=i.MAX;const We={[Ad]:i.ZERO,[md]:i.ONE,[gd]:i.SRC_COLOR,[ba]:i.SRC_ALPHA,[Md]:i.SRC_ALPHA_SATURATE,[vd]:i.DST_COLOR,[xd]:i.DST_ALPHA,[_d]:i.ONE_MINUS_SRC_COLOR,[Ia]:i.ONE_MINUS_SRC_ALPHA,[yd]:i.ONE_MINUS_DST_COLOR,[Ed]:i.ONE_MINUS_DST_ALPHA,[Sd]:i.CONSTANT_COLOR,[Cd]:i.ONE_MINUS_CONSTANT_COLOR,[wd]:i.CONSTANT_ALPHA,[bd]:i.ONE_MINUS_CONSTANT_ALPHA};function Ze(D,ae,ie,pe,ee,X,xe,Be,Ke,je){if(D===Vn){E===!0&&(se(i.BLEND),E=!1);return}if(E===!1&&(re(i.BLEND),E=!0),D!==ud){if(D!==f||je!==y){if((d!==vi||S!==vi)&&(i.blendEquation(i.FUNC_ADD),d=vi,S=vi),je)switch(D){case Ji:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case nl:i.blendFunc(i.ONE,i.ONE);break;case il:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case rl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:it("WebGLState: Invalid blending: ",D);break}else switch(D){case Ji:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case nl:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case il:it("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case rl:it("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:it("WebGLState: Invalid blending: ",D);break}v=null,M=null,b=null,w=null,T.set(0,0,0),_=0,f=D,y=je}return}ee=ee||ae,X=X||ie,xe=xe||pe,(ae!==d||ee!==S)&&(i.blendEquationSeparate(gt[ae],gt[ee]),d=ae,S=ee),(ie!==v||pe!==M||X!==b||xe!==w)&&(i.blendFuncSeparate(We[ie],We[pe],We[X],We[xe]),v=ie,M=pe,b=X,w=xe),(Be.equals(T)===!1||Ke!==_)&&(i.blendColor(Be.r,Be.g,Be.b,Ke),T.copy(Be),_=Ke),f=D,y=!1}function lt(D,ae){D.side===wn?se(i.CULL_FACE):re(i.CULL_FACE);let ie=D.side===qt;ae&&(ie=!ie),Ne(ie),D.blending===Ji&&D.transparent===!1?Ze(Vn):Ze(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),s.setMask(D.colorWrite);const pe=D.stencilWrite;o.setTest(pe),pe&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),pt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?re(i.SAMPLE_ALPHA_TO_COVERAGE):se(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ne(D){W!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),W=D)}function At(D){D!==od?(re(i.CULL_FACE),D!==I&&(D===tl?i.cullFace(i.BACK):D===ld?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):se(i.CULL_FACE),I=D}function R(D){D!==Q&&(k&&i.lineWidth(D),Q=D)}function pt(D,ae,ie){D?(re(i.POLYGON_OFFSET_FILL),(G!==ae||H!==ie)&&(G=ae,H=ie,a.getReversed()&&(ae=-ae),i.polygonOffset(ae,ie))):se(i.POLYGON_OFFSET_FILL)}function Ye(D){D?re(i.SCISSOR_TEST):se(i.SCISSOR_TEST)}function ut(D){D===void 0&&(D=i.TEXTURE0+z-1),Z!==D&&(i.activeTexture(D),Z=D)}function Ee(D,ae,ie){ie===void 0&&(Z===null?ie=i.TEXTURE0+z-1:ie=Z);let pe=he[ie];pe===void 0&&(pe={type:void 0,texture:void 0},he[ie]=pe),(pe.type!==D||pe.texture!==ae)&&(Z!==ie&&(i.activeTexture(ie),Z=ie),i.bindTexture(D,ae||J[D]),pe.type=D,pe.texture=ae)}function C(){const D=he[Z];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function g(){try{i.compressedTexImage2D(...arguments)}catch(D){it("WebGLState:",D)}}function L(){try{i.compressedTexImage3D(...arguments)}catch(D){it("WebGLState:",D)}}function q(){try{i.texSubImage2D(...arguments)}catch(D){it("WebGLState:",D)}}function K(){try{i.texSubImage3D(...arguments)}catch(D){it("WebGLState:",D)}}function Y(){try{i.compressedTexSubImage2D(...arguments)}catch(D){it("WebGLState:",D)}}function _e(){try{i.compressedTexSubImage3D(...arguments)}catch(D){it("WebGLState:",D)}}function ne(){try{i.texStorage2D(...arguments)}catch(D){it("WebGLState:",D)}}function ve(){try{i.texStorage3D(...arguments)}catch(D){it("WebGLState:",D)}}function Ce(){try{i.texImage2D(...arguments)}catch(D){it("WebGLState:",D)}}function $(){try{i.texImage3D(...arguments)}catch(D){it("WebGLState:",D)}}function te(D){De.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),De.copy(D))}function me(D){at.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),at.copy(D))}function ge(D,ae){let ie=l.get(ae);ie===void 0&&(ie=new WeakMap,l.set(ae,ie));let pe=ie.get(D);pe===void 0&&(pe=i.getUniformBlockIndex(ae,D.name),ie.set(D,pe))}function ue(D,ae){const pe=l.get(ae).get(D);c.get(ae)!==pe&&(i.uniformBlockBinding(ae,pe,D.__bindingPointIndex),c.set(ae,pe))}function Ue(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},Z=null,he={},A={},u=new WeakMap,p=[],m=null,E=!1,f=null,d=null,v=null,M=null,S=null,b=null,w=null,T=new Je(0,0,0),_=0,y=!1,W=null,I=null,Q=null,G=null,H=null,De.set(0,0,i.canvas.width,i.canvas.height),at.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:re,disable:se,bindFramebuffer:Fe,drawBuffers:be,useProgram:Ie,setBlending:Ze,setMaterial:lt,setFlipSided:Ne,setCullFace:At,setLineWidth:R,setPolygonOffset:pt,setScissorTest:Ye,activeTexture:ut,bindTexture:Ee,unbindTexture:C,compressedTexImage2D:g,compressedTexImage3D:L,texImage2D:Ce,texImage3D:$,updateUBOMapping:ge,uniformBlockBinding:ue,texStorage2D:ne,texStorage3D:ve,texSubImage2D:q,texSubImage3D:K,compressedTexSubImage2D:Y,compressedTexSubImage3D:_e,scissor:te,viewport:me,reset:Ue}}function dg(i,e,t,n,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new rt,h=new WeakMap;let A;const u=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(C,g){return p?new OffscreenCanvas(C,g):bs("canvas")}function E(C,g,L){let q=1;const K=Ee(C);if((K.width>L||K.height>L)&&(q=L/Math.max(K.width,K.height)),q<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const Y=Math.floor(q*K.width),_e=Math.floor(q*K.height);A===void 0&&(A=m(Y,_e));const ne=g?m(Y,_e):A;return ne.width=Y,ne.height=_e,ne.getContext("2d").drawImage(C,0,0,Y,_e),Pe("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+Y+"x"+_e+")."),ne}else return"data"in C&&Pe("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),C;return C}function f(C){return C.generateMipmaps}function d(C){i.generateMipmap(C)}function v(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(C,g,L,q,K=!1){if(C!==null){if(i[C]!==void 0)return i[C];Pe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let Y=g;if(g===i.RED&&(L===i.FLOAT&&(Y=i.R32F),L===i.HALF_FLOAT&&(Y=i.R16F),L===i.UNSIGNED_BYTE&&(Y=i.R8)),g===i.RED_INTEGER&&(L===i.UNSIGNED_BYTE&&(Y=i.R8UI),L===i.UNSIGNED_SHORT&&(Y=i.R16UI),L===i.UNSIGNED_INT&&(Y=i.R32UI),L===i.BYTE&&(Y=i.R8I),L===i.SHORT&&(Y=i.R16I),L===i.INT&&(Y=i.R32I)),g===i.RG&&(L===i.FLOAT&&(Y=i.RG32F),L===i.HALF_FLOAT&&(Y=i.RG16F),L===i.UNSIGNED_BYTE&&(Y=i.RG8)),g===i.RG_INTEGER&&(L===i.UNSIGNED_BYTE&&(Y=i.RG8UI),L===i.UNSIGNED_SHORT&&(Y=i.RG16UI),L===i.UNSIGNED_INT&&(Y=i.RG32UI),L===i.BYTE&&(Y=i.RG8I),L===i.SHORT&&(Y=i.RG16I),L===i.INT&&(Y=i.RG32I)),g===i.RGB_INTEGER&&(L===i.UNSIGNED_BYTE&&(Y=i.RGB8UI),L===i.UNSIGNED_SHORT&&(Y=i.RGB16UI),L===i.UNSIGNED_INT&&(Y=i.RGB32UI),L===i.BYTE&&(Y=i.RGB8I),L===i.SHORT&&(Y=i.RGB16I),L===i.INT&&(Y=i.RGB32I)),g===i.RGBA_INTEGER&&(L===i.UNSIGNED_BYTE&&(Y=i.RGBA8UI),L===i.UNSIGNED_SHORT&&(Y=i.RGBA16UI),L===i.UNSIGNED_INT&&(Y=i.RGBA32UI),L===i.BYTE&&(Y=i.RGBA8I),L===i.SHORT&&(Y=i.RGBA16I),L===i.INT&&(Y=i.RGBA32I)),g===i.RGB&&(L===i.UNSIGNED_INT_5_9_9_9_REV&&(Y=i.RGB9_E5),L===i.UNSIGNED_INT_10F_11F_11F_REV&&(Y=i.R11F_G11F_B10F)),g===i.RGBA){const _e=K?ws:et.getTransfer(q);L===i.FLOAT&&(Y=i.RGBA32F),L===i.HALF_FLOAT&&(Y=i.RGBA16F),L===i.UNSIGNED_BYTE&&(Y=_e===ct?i.SRGB8_ALPHA8:i.RGBA8),L===i.UNSIGNED_SHORT_4_4_4_4&&(Y=i.RGBA4),L===i.UNSIGNED_SHORT_5_5_5_1&&(Y=i.RGB5_A1)}return(Y===i.R16F||Y===i.R32F||Y===i.RG16F||Y===i.RG32F||Y===i.RGBA16F||Y===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function S(C,g){let L;return C?g===null||g===Bn||g===Ir?L=i.DEPTH24_STENCIL8:g===bn?L=i.DEPTH32F_STENCIL8:g===br&&(L=i.DEPTH24_STENCIL8,Pe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===Bn||g===Ir?L=i.DEPTH_COMPONENT24:g===bn?L=i.DEPTH_COMPONENT32F:g===br&&(L=i.DEPTH_COMPONENT16),L}function b(C,g){return f(C)===!0||C.isFramebufferTexture&&C.minFilter!==Pt&&C.minFilter!==Qt?Math.log2(Math.max(g.width,g.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?g.mipmaps.length:1}function w(C){const g=C.target;g.removeEventListener("dispose",w),_(g),g.isVideoTexture&&h.delete(g)}function T(C){const g=C.target;g.removeEventListener("dispose",T),W(g)}function _(C){const g=n.get(C);if(g.__webglInit===void 0)return;const L=C.source,q=u.get(L);if(q){const K=q[g.__cacheKey];K.usedTimes--,K.usedTimes===0&&y(C),Object.keys(q).length===0&&u.delete(L)}n.remove(C)}function y(C){const g=n.get(C);i.deleteTexture(g.__webglTexture);const L=C.source,q=u.get(L);delete q[g.__cacheKey],a.memory.textures--}function W(C){const g=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(g.__webglFramebuffer[q]))for(let K=0;K<g.__webglFramebuffer[q].length;K++)i.deleteFramebuffer(g.__webglFramebuffer[q][K]);else i.deleteFramebuffer(g.__webglFramebuffer[q]);g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer[q])}else{if(Array.isArray(g.__webglFramebuffer))for(let q=0;q<g.__webglFramebuffer.length;q++)i.deleteFramebuffer(g.__webglFramebuffer[q]);else i.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&i.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let q=0;q<g.__webglColorRenderbuffer.length;q++)g.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(g.__webglColorRenderbuffer[q]);g.__webglDepthRenderbuffer&&i.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const L=C.textures;for(let q=0,K=L.length;q<K;q++){const Y=n.get(L[q]);Y.__webglTexture&&(i.deleteTexture(Y.__webglTexture),a.memory.textures--),n.remove(L[q])}n.remove(C)}let I=0;function Q(){I=0}function G(){const C=I;return C>=r.maxTextures&&Pe("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+r.maxTextures),I+=1,C}function H(C){const g=[];return g.push(C.wrapS),g.push(C.wrapT),g.push(C.wrapR||0),g.push(C.magFilter),g.push(C.minFilter),g.push(C.anisotropy),g.push(C.internalFormat),g.push(C.format),g.push(C.type),g.push(C.generateMipmaps),g.push(C.premultiplyAlpha),g.push(C.flipY),g.push(C.unpackAlignment),g.push(C.colorSpace),g.join()}function z(C,g){const L=n.get(C);if(C.isVideoTexture&&Ye(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&L.__version!==C.version){const q=C.image;if(q===null)Pe("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Pe("WebGLRenderer: Texture marked for update but image is incomplete");else{J(L,C,g);return}}else C.isExternalTexture&&(L.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,L.__webglTexture,i.TEXTURE0+g)}function k(C,g){const L=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&L.__version!==C.version){J(L,C,g);return}else C.isExternalTexture&&(L.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,L.__webglTexture,i.TEXTURE0+g)}function U(C,g){const L=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&L.__version!==C.version){J(L,C,g);return}t.bindTexture(i.TEXTURE_3D,L.__webglTexture,i.TEXTURE0+g)}function j(C,g){const L=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&L.__version!==C.version){re(L,C,g);return}t.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture,i.TEXTURE0+g)}const Z={[Na]:i.REPEAT,[zn]:i.CLAMP_TO_EDGE,[Ua]:i.MIRRORED_REPEAT},he={[Pt]:i.NEAREST,[Rd]:i.NEAREST_MIPMAP_NEAREST,[zr]:i.NEAREST_MIPMAP_LINEAR,[Qt]:i.LINEAR,[Hs]:i.LINEAR_MIPMAP_NEAREST,[Mi]:i.LINEAR_MIPMAP_LINEAR},fe={[Ld]:i.NEVER,[Od]:i.ALWAYS,[Pd]:i.LESS,[Do]:i.LEQUAL,[Fd]:i.EQUAL,[Lo]:i.GEQUAL,[Nd]:i.GREATER,[Ud]:i.NOTEQUAL};function le(C,g){if(g.type===bn&&e.has("OES_texture_float_linear")===!1&&(g.magFilter===Qt||g.magFilter===Hs||g.magFilter===zr||g.magFilter===Mi||g.minFilter===Qt||g.minFilter===Hs||g.minFilter===zr||g.minFilter===Mi)&&Pe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,Z[g.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,Z[g.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,Z[g.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,he[g.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,he[g.minFilter]),g.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,fe[g.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===Pt||g.minFilter!==zr&&g.minFilter!==Mi||g.type===bn&&e.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||n.get(g).__currentAnisotropy){const L=e.get("EXT_texture_filter_anisotropic");i.texParameterf(C,L.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,r.getMaxAnisotropy())),n.get(g).__currentAnisotropy=g.anisotropy}}}function De(C,g){let L=!1;C.__webglInit===void 0&&(C.__webglInit=!0,g.addEventListener("dispose",w));const q=g.source;let K=u.get(q);K===void 0&&(K={},u.set(q,K));const Y=H(g);if(Y!==C.__cacheKey){K[Y]===void 0&&(K[Y]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,L=!0),K[Y].usedTimes++;const _e=K[C.__cacheKey];_e!==void 0&&(K[C.__cacheKey].usedTimes--,_e.usedTimes===0&&y(g)),C.__cacheKey=Y,C.__webglTexture=K[Y].texture}return L}function at(C,g,L){return Math.floor(Math.floor(C/L)/g)}function st(C,g,L,q){const Y=C.updateRanges;if(Y.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,g.width,g.height,L,q,g.data);else{Y.sort(($,te)=>$.start-te.start);let _e=0;for(let $=1;$<Y.length;$++){const te=Y[_e],me=Y[$],ge=te.start+te.count,ue=at(me.start,g.width,4),Ue=at(te.start,g.width,4);me.start<=ge+1&&ue===Ue&&at(me.start+me.count-1,g.width,4)===ue?te.count=Math.max(te.count,me.start+me.count-te.start):(++_e,Y[_e]=me)}Y.length=_e+1;const ne=i.getParameter(i.UNPACK_ROW_LENGTH),ve=i.getParameter(i.UNPACK_SKIP_PIXELS),Ce=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,g.width);for(let $=0,te=Y.length;$<te;$++){const me=Y[$],ge=Math.floor(me.start/4),ue=Math.ceil(me.count/4),Ue=ge%g.width,D=Math.floor(ge/g.width),ae=ue,ie=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ue),i.pixelStorei(i.UNPACK_SKIP_ROWS,D),t.texSubImage2D(i.TEXTURE_2D,0,Ue,D,ae,ie,L,q,g.data)}C.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ne),i.pixelStorei(i.UNPACK_SKIP_PIXELS,ve),i.pixelStorei(i.UNPACK_SKIP_ROWS,Ce)}}function J(C,g,L){let q=i.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),g.isData3DTexture&&(q=i.TEXTURE_3D);const K=De(C,g),Y=g.source;t.bindTexture(q,C.__webglTexture,i.TEXTURE0+L);const _e=n.get(Y);if(Y.version!==_e.__version||K===!0){t.activeTexture(i.TEXTURE0+L);const ne=et.getPrimaries(et.workingColorSpace),ve=g.colorSpace===ri?null:et.getPrimaries(g.colorSpace),Ce=g.colorSpace===ri||ne===ve?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce);let $=E(g.image,!1,r.maxTextureSize);$=ut(g,$);const te=s.convert(g.format,g.colorSpace),me=s.convert(g.type);let ge=M(g.internalFormat,te,me,g.colorSpace,g.isVideoTexture);le(q,g);let ue;const Ue=g.mipmaps,D=g.isVideoTexture!==!0,ae=_e.__version===void 0||K===!0,ie=Y.dataReady,pe=b(g,$);if(g.isDepthTexture)ge=S(g.format===Si,g.type),ae&&(D?t.texStorage2D(i.TEXTURE_2D,1,ge,$.width,$.height):t.texImage2D(i.TEXTURE_2D,0,ge,$.width,$.height,0,te,me,null));else if(g.isDataTexture)if(Ue.length>0){D&&ae&&t.texStorage2D(i.TEXTURE_2D,pe,ge,Ue[0].width,Ue[0].height);for(let ee=0,X=Ue.length;ee<X;ee++)ue=Ue[ee],D?ie&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,ue.width,ue.height,te,me,ue.data):t.texImage2D(i.TEXTURE_2D,ee,ge,ue.width,ue.height,0,te,me,ue.data);g.generateMipmaps=!1}else D?(ae&&t.texStorage2D(i.TEXTURE_2D,pe,ge,$.width,$.height),ie&&st(g,$,te,me)):t.texImage2D(i.TEXTURE_2D,0,ge,$.width,$.height,0,te,me,$.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){D&&ae&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,ge,Ue[0].width,Ue[0].height,$.depth);for(let ee=0,X=Ue.length;ee<X;ee++)if(ue=Ue[ee],g.format!==gn)if(te!==null)if(D){if(ie)if(g.layerUpdates.size>0){const xe=Pl(ue.width,ue.height,g.format,g.type);for(const Be of g.layerUpdates){const Ke=ue.data.subarray(Be*xe/ue.data.BYTES_PER_ELEMENT,(Be+1)*xe/ue.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,Be,ue.width,ue.height,1,te,Ke)}g.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,ue.width,ue.height,$.depth,te,ue.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ee,ge,ue.width,ue.height,$.depth,0,ue.data,0,0);else Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?ie&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,ue.width,ue.height,$.depth,te,me,ue.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ee,ge,ue.width,ue.height,$.depth,0,te,me,ue.data)}else{D&&ae&&t.texStorage2D(i.TEXTURE_2D,pe,ge,Ue[0].width,Ue[0].height);for(let ee=0,X=Ue.length;ee<X;ee++)ue=Ue[ee],g.format!==gn?te!==null?D?ie&&t.compressedTexSubImage2D(i.TEXTURE_2D,ee,0,0,ue.width,ue.height,te,ue.data):t.compressedTexImage2D(i.TEXTURE_2D,ee,ge,ue.width,ue.height,0,ue.data):Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?ie&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,ue.width,ue.height,te,me,ue.data):t.texImage2D(i.TEXTURE_2D,ee,ge,ue.width,ue.height,0,te,me,ue.data)}else if(g.isDataArrayTexture)if(D){if(ae&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,ge,$.width,$.height,$.depth),ie)if(g.layerUpdates.size>0){const ee=Pl($.width,$.height,g.format,g.type);for(const X of g.layerUpdates){const xe=$.data.subarray(X*ee/$.data.BYTES_PER_ELEMENT,(X+1)*ee/$.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,X,$.width,$.height,1,te,me,xe)}g.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,te,me,$.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ge,$.width,$.height,$.depth,0,te,me,$.data);else if(g.isData3DTexture)D?(ae&&t.texStorage3D(i.TEXTURE_3D,pe,ge,$.width,$.height,$.depth),ie&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,te,me,$.data)):t.texImage3D(i.TEXTURE_3D,0,ge,$.width,$.height,$.depth,0,te,me,$.data);else if(g.isFramebufferTexture){if(ae)if(D)t.texStorage2D(i.TEXTURE_2D,pe,ge,$.width,$.height);else{let ee=$.width,X=$.height;for(let xe=0;xe<pe;xe++)t.texImage2D(i.TEXTURE_2D,xe,ge,ee,X,0,te,me,null),ee>>=1,X>>=1}}else if(Ue.length>0){if(D&&ae){const ee=Ee(Ue[0]);t.texStorage2D(i.TEXTURE_2D,pe,ge,ee.width,ee.height)}for(let ee=0,X=Ue.length;ee<X;ee++)ue=Ue[ee],D?ie&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,te,me,ue):t.texImage2D(i.TEXTURE_2D,ee,ge,te,me,ue);g.generateMipmaps=!1}else if(D){if(ae){const ee=Ee($);t.texStorage2D(i.TEXTURE_2D,pe,ge,ee.width,ee.height)}ie&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,te,me,$)}else t.texImage2D(i.TEXTURE_2D,0,ge,te,me,$);f(g)&&d(q),_e.__version=Y.version,g.onUpdate&&g.onUpdate(g)}C.__version=g.version}function re(C,g,L){if(g.image.length!==6)return;const q=De(C,g),K=g.source;t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+L);const Y=n.get(K);if(K.version!==Y.__version||q===!0){t.activeTexture(i.TEXTURE0+L);const _e=et.getPrimaries(et.workingColorSpace),ne=g.colorSpace===ri?null:et.getPrimaries(g.colorSpace),ve=g.colorSpace===ri||_e===ne?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);const Ce=g.isCompressedTexture||g.image[0].isCompressedTexture,$=g.image[0]&&g.image[0].isDataTexture,te=[];for(let X=0;X<6;X++)!Ce&&!$?te[X]=E(g.image[X],!0,r.maxCubemapSize):te[X]=$?g.image[X].image:g.image[X],te[X]=ut(g,te[X]);const me=te[0],ge=s.convert(g.format,g.colorSpace),ue=s.convert(g.type),Ue=M(g.internalFormat,ge,ue,g.colorSpace),D=g.isVideoTexture!==!0,ae=Y.__version===void 0||q===!0,ie=K.dataReady;let pe=b(g,me);le(i.TEXTURE_CUBE_MAP,g);let ee;if(Ce){D&&ae&&t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,Ue,me.width,me.height);for(let X=0;X<6;X++){ee=te[X].mipmaps;for(let xe=0;xe<ee.length;xe++){const Be=ee[xe];g.format!==gn?ge!==null?D?ie&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,xe,0,0,Be.width,Be.height,ge,Be.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,xe,Ue,Be.width,Be.height,0,Be.data):Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,xe,0,0,Be.width,Be.height,ge,ue,Be.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,xe,Ue,Be.width,Be.height,0,ge,ue,Be.data)}}}else{if(ee=g.mipmaps,D&&ae){ee.length>0&&pe++;const X=Ee(te[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,Ue,X.width,X.height)}for(let X=0;X<6;X++)if($){D?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,te[X].width,te[X].height,ge,ue,te[X].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,Ue,te[X].width,te[X].height,0,ge,ue,te[X].data);for(let xe=0;xe<ee.length;xe++){const Ke=ee[xe].image[X].image;D?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,xe+1,0,0,Ke.width,Ke.height,ge,ue,Ke.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,xe+1,Ue,Ke.width,Ke.height,0,ge,ue,Ke.data)}}else{D?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,ge,ue,te[X]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,Ue,ge,ue,te[X]);for(let xe=0;xe<ee.length;xe++){const Be=ee[xe];D?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,xe+1,0,0,ge,ue,Be.image[X]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,xe+1,Ue,ge,ue,Be.image[X])}}}f(g)&&d(i.TEXTURE_CUBE_MAP),Y.__version=K.version,g.onUpdate&&g.onUpdate(g)}C.__version=g.version}function se(C,g,L,q,K,Y){const _e=s.convert(L.format,L.colorSpace),ne=s.convert(L.type),ve=M(L.internalFormat,_e,ne,L.colorSpace),Ce=n.get(g),$=n.get(L);if($.__renderTarget=g,!Ce.__hasExternalTextures){const te=Math.max(1,g.width>>Y),me=Math.max(1,g.height>>Y);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?t.texImage3D(K,Y,ve,te,me,g.depth,0,_e,ne,null):t.texImage2D(K,Y,ve,te,me,0,_e,ne,null)}t.bindFramebuffer(i.FRAMEBUFFER,C),pt(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,K,$.__webglTexture,0,R(g)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,K,$.__webglTexture,Y),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Fe(C,g,L){if(i.bindRenderbuffer(i.RENDERBUFFER,C),g.depthBuffer){const q=g.depthTexture,K=q&&q.isDepthTexture?q.type:null,Y=S(g.stencilBuffer,K),_e=g.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;pt(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,R(g),Y,g.width,g.height):L?i.renderbufferStorageMultisample(i.RENDERBUFFER,R(g),Y,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,Y,g.width,g.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,_e,i.RENDERBUFFER,C)}else{const q=g.textures;for(let K=0;K<q.length;K++){const Y=q[K],_e=s.convert(Y.format,Y.colorSpace),ne=s.convert(Y.type),ve=M(Y.internalFormat,_e,ne,Y.colorSpace);pt(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,R(g),ve,g.width,g.height):L?i.renderbufferStorageMultisample(i.RENDERBUFFER,R(g),ve,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,ve,g.width,g.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function be(C,g,L){const q=g.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,C),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=n.get(g.depthTexture);if(K.__renderTarget=g,(!K.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),q){if(K.__webglInit===void 0&&(K.__webglInit=!0,g.depthTexture.addEventListener("dispose",w)),K.__webglTexture===void 0){K.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),le(i.TEXTURE_CUBE_MAP,g.depthTexture);const Ce=s.convert(g.depthTexture.format),$=s.convert(g.depthTexture.type);let te;g.depthTexture.format===Xn?te=i.DEPTH_COMPONENT24:g.depthTexture.format===Si&&(te=i.DEPTH24_STENCIL8);for(let me=0;me<6;me++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,te,g.width,g.height,0,Ce,$,null)}}else z(g.depthTexture,0);const Y=K.__webglTexture,_e=R(g),ne=q?i.TEXTURE_CUBE_MAP_POSITIVE_X+L:i.TEXTURE_2D,ve=g.depthTexture.format===Si?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(g.depthTexture.format===Xn)pt(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ve,ne,Y,0,_e):i.framebufferTexture2D(i.FRAMEBUFFER,ve,ne,Y,0);else if(g.depthTexture.format===Si)pt(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ve,ne,Y,0,_e):i.framebufferTexture2D(i.FRAMEBUFFER,ve,ne,Y,0);else throw new Error("Unknown depthTexture format")}function Ie(C){const g=n.get(C),L=C.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==C.depthTexture){const q=C.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),q){const K=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,q.removeEventListener("dispose",K)};q.addEventListener("dispose",K),g.__depthDisposeCallback=K}g.__boundDepthTexture=q}if(C.depthTexture&&!g.__autoAllocateDepthBuffer)if(L)for(let q=0;q<6;q++)be(g.__webglFramebuffer[q],C,q);else{const q=C.texture.mipmaps;q&&q.length>0?be(g.__webglFramebuffer[0],C,0):be(g.__webglFramebuffer,C,0)}else if(L){g.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[q]),g.__webglDepthbuffer[q]===void 0)g.__webglDepthbuffer[q]=i.createRenderbuffer(),Fe(g.__webglDepthbuffer[q],C,!1);else{const K=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=g.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,Y)}}else{const q=C.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=i.createRenderbuffer(),Fe(g.__webglDepthbuffer,C,!1);else{const K=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=g.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,Y)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function gt(C,g,L){const q=n.get(C);g!==void 0&&se(q.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),L!==void 0&&Ie(C)}function We(C){const g=C.texture,L=n.get(C),q=n.get(g);C.addEventListener("dispose",T);const K=C.textures,Y=C.isWebGLCubeRenderTarget===!0,_e=K.length>1;if(_e||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=g.version,a.memory.textures++),Y){L.__webglFramebuffer=[];for(let ne=0;ne<6;ne++)if(g.mipmaps&&g.mipmaps.length>0){L.__webglFramebuffer[ne]=[];for(let ve=0;ve<g.mipmaps.length;ve++)L.__webglFramebuffer[ne][ve]=i.createFramebuffer()}else L.__webglFramebuffer[ne]=i.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){L.__webglFramebuffer=[];for(let ne=0;ne<g.mipmaps.length;ne++)L.__webglFramebuffer[ne]=i.createFramebuffer()}else L.__webglFramebuffer=i.createFramebuffer();if(_e)for(let ne=0,ve=K.length;ne<ve;ne++){const Ce=n.get(K[ne]);Ce.__webglTexture===void 0&&(Ce.__webglTexture=i.createTexture(),a.memory.textures++)}if(C.samples>0&&pt(C)===!1){L.__webglMultisampledFramebuffer=i.createFramebuffer(),L.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,L.__webglMultisampledFramebuffer);for(let ne=0;ne<K.length;ne++){const ve=K[ne];L.__webglColorRenderbuffer[ne]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,L.__webglColorRenderbuffer[ne]);const Ce=s.convert(ve.format,ve.colorSpace),$=s.convert(ve.type),te=M(ve.internalFormat,Ce,$,ve.colorSpace,C.isXRRenderTarget===!0),me=R(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,me,te,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ne,i.RENDERBUFFER,L.__webglColorRenderbuffer[ne])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(L.__webglDepthRenderbuffer=i.createRenderbuffer(),Fe(L.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Y){t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),le(i.TEXTURE_CUBE_MAP,g);for(let ne=0;ne<6;ne++)if(g.mipmaps&&g.mipmaps.length>0)for(let ve=0;ve<g.mipmaps.length;ve++)se(L.__webglFramebuffer[ne][ve],C,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ve);else se(L.__webglFramebuffer[ne],C,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0);f(g)&&d(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(_e){for(let ne=0,ve=K.length;ne<ve;ne++){const Ce=K[ne],$=n.get(Ce);let te=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(te=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(te,$.__webglTexture),le(te,Ce),se(L.__webglFramebuffer,C,Ce,i.COLOR_ATTACHMENT0+ne,te,0),f(Ce)&&d(te)}t.unbindTexture()}else{let ne=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ne=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ne,q.__webglTexture),le(ne,g),g.mipmaps&&g.mipmaps.length>0)for(let ve=0;ve<g.mipmaps.length;ve++)se(L.__webglFramebuffer[ve],C,g,i.COLOR_ATTACHMENT0,ne,ve);else se(L.__webglFramebuffer,C,g,i.COLOR_ATTACHMENT0,ne,0);f(g)&&d(ne),t.unbindTexture()}C.depthBuffer&&Ie(C)}function Ze(C){const g=C.textures;for(let L=0,q=g.length;L<q;L++){const K=g[L];if(f(K)){const Y=v(C),_e=n.get(K).__webglTexture;t.bindTexture(Y,_e),d(Y),t.unbindTexture()}}}const lt=[],Ne=[];function At(C){if(C.samples>0){if(pt(C)===!1){const g=C.textures,L=C.width,q=C.height;let K=i.COLOR_BUFFER_BIT;const Y=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_e=n.get(C),ne=g.length>1;if(ne)for(let Ce=0;Ce<g.length;Ce++)t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ce,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ce,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,_e.__webglMultisampledFramebuffer);const ve=C.texture.mipmaps;ve&&ve.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,_e.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,_e.__webglFramebuffer);for(let Ce=0;Ce<g.length;Ce++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),ne){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,_e.__webglColorRenderbuffer[Ce]);const $=n.get(g[Ce]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,$,0)}i.blitFramebuffer(0,0,L,q,0,0,L,q,K,i.NEAREST),c===!0&&(lt.length=0,Ne.length=0,lt.push(i.COLOR_ATTACHMENT0+Ce),C.depthBuffer&&C.resolveDepthBuffer===!1&&(lt.push(Y),Ne.push(Y),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ne)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,lt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ne)for(let Ce=0;Ce<g.length;Ce++){t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ce,i.RENDERBUFFER,_e.__webglColorRenderbuffer[Ce]);const $=n.get(g[Ce]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ce,i.TEXTURE_2D,$,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,_e.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){const g=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[g])}}}function R(C){return Math.min(r.maxSamples,C.samples)}function pt(C){const g=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function Ye(C){const g=a.render.frame;h.get(C)!==g&&(h.set(C,g),C.update())}function ut(C,g){const L=C.colorSpace,q=C.format,K=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||L!==er&&L!==ri&&(et.getTransfer(L)===ct?(q!==gn||K!==nn)&&Pe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):it("WebGLTextures: Unsupported texture color space:",L)),g}function Ee(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=G,this.resetTextureUnits=Q,this.setTexture2D=z,this.setTexture2DArray=k,this.setTexture3D=U,this.setTextureCube=j,this.rebindTextures=gt,this.setupRenderTarget=We,this.updateRenderTargetMipmap=Ze,this.updateMultisampleRenderTarget=At,this.setupDepthRenderbuffer=Ie,this.setupFrameBufferTexture=se,this.useMultisampledRTT=pt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function hg(i,e){function t(n,r=ri){let s;const a=et.getTransfer(r);if(n===nn)return i.UNSIGNED_BYTE;if(n===bo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Io)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Mc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Sc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===vc)return i.BYTE;if(n===yc)return i.SHORT;if(n===br)return i.UNSIGNED_SHORT;if(n===wo)return i.INT;if(n===Bn)return i.UNSIGNED_INT;if(n===bn)return i.FLOAT;if(n===Wn)return i.HALF_FLOAT;if(n===Cc)return i.ALPHA;if(n===wc)return i.RGB;if(n===gn)return i.RGBA;if(n===Xn)return i.DEPTH_COMPONENT;if(n===Si)return i.DEPTH_STENCIL;if(n===bc)return i.RED;if(n===To)return i.RED_INTEGER;if(n===ji)return i.RG;if(n===Ro)return i.RG_INTEGER;if(n===Bo)return i.RGBA_INTEGER;if(n===gs||n===_s||n===xs||n===Es)if(a===ct)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===gs)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===_s)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===xs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Es)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===gs)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===_s)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===xs)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Es)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Oa||n===za||n===Qa||n===ka)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Oa)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===za)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Qa)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ka)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ga||n===Va||n===Ha||n===Wa||n===Xa||n===Ya||n===qa)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Ga||n===Va)return a===ct?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Ha)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===Wa)return s.COMPRESSED_R11_EAC;if(n===Xa)return s.COMPRESSED_SIGNED_R11_EAC;if(n===Ya)return s.COMPRESSED_RG11_EAC;if(n===qa)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ja||n===Ka||n===$a||n===Za||n===ja||n===eo||n===to||n===no||n===io||n===ro||n===so||n===ao||n===oo||n===lo)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Ja)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ka)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===$a)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Za)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ja)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===eo)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===to)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===no)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===io)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ro)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===so)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ao)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===oo)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===lo)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===co||n===uo||n===ho)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===co)return a===ct?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===uo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ho)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===fo||n===po||n===Ao||n===mo)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===fo)return s.COMPRESSED_RED_RGTC1_EXT;if(n===po)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ao)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===mo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ir?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const fg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,pg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Ag{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Uc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ln({vertexShader:fg,fragmentShader:pg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new nt(new Fs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class mg extends nr{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,A=null,u=null,p=null,m=null;const E=typeof XRWebGLBinding<"u",f=new Ag,d={},v=t.getContextAttributes();let M=null,S=null;const b=[],w=[],T=new rt;let _=null;const y=new cn;y.viewport=new Et;const W=new cn;W.viewport=new Et;const I=[y,W],Q=new Ch;let G=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let re=b[J];return re===void 0&&(re=new $s,b[J]=re),re.getTargetRaySpace()},this.getControllerGrip=function(J){let re=b[J];return re===void 0&&(re=new $s,b[J]=re),re.getGripSpace()},this.getHand=function(J){let re=b[J];return re===void 0&&(re=new $s,b[J]=re),re.getHandSpace()};function z(J){const re=w.indexOf(J.inputSource);if(re===-1)return;const se=b[re];se!==void 0&&(se.update(J.inputSource,J.frame,l||a),se.dispatchEvent({type:J.type,data:J.inputSource}))}function k(){r.removeEventListener("select",z),r.removeEventListener("selectstart",z),r.removeEventListener("selectend",z),r.removeEventListener("squeeze",z),r.removeEventListener("squeezestart",z),r.removeEventListener("squeezeend",z),r.removeEventListener("end",k),r.removeEventListener("inputsourceschange",U);for(let J=0;J<b.length;J++){const re=w[J];re!==null&&(w[J]=null,b[J].disconnect(re))}G=null,H=null,f.reset();for(const J in d)delete d[J];e.setRenderTarget(M),p=null,u=null,A=null,r=null,S=null,st.stop(),n.isPresenting=!1,e.setPixelRatio(_),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){s=J,n.isPresenting===!0&&Pe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,n.isPresenting===!0&&Pe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(J){l=J},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return A===null&&E&&(A=new XRWebGLBinding(r,t)),A},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(J){if(r=J,r!==null){if(M=e.getRenderTarget(),r.addEventListener("select",z),r.addEventListener("selectstart",z),r.addEventListener("selectend",z),r.addEventListener("squeeze",z),r.addEventListener("squeezestart",z),r.addEventListener("squeezeend",z),r.addEventListener("end",k),r.addEventListener("inputsourceschange",U),v.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(T),E&&"createProjectionLayer"in XRWebGLBinding.prototype){let se=null,Fe=null,be=null;v.depth&&(be=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,se=v.stencil?Si:Xn,Fe=v.stencil?Ir:Bn);const Ie={colorFormat:t.RGBA8,depthFormat:be,scaleFactor:s};A=this.getBinding(),u=A.createProjectionLayer(Ie),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),S=new Rn(u.textureWidth,u.textureHeight,{format:gn,type:nn,depthTexture:new Rr(u.textureWidth,u.textureHeight,Fe,void 0,void 0,void 0,void 0,void 0,void 0,se),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const se={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,se),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new Rn(p.framebufferWidth,p.framebufferHeight,{format:gn,type:nn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),st.setContext(r),st.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function U(J){for(let re=0;re<J.removed.length;re++){const se=J.removed[re],Fe=w.indexOf(se);Fe>=0&&(w[Fe]=null,b[Fe].disconnect(se))}for(let re=0;re<J.added.length;re++){const se=J.added[re];let Fe=w.indexOf(se);if(Fe===-1){for(let Ie=0;Ie<b.length;Ie++)if(Ie>=w.length){w.push(se),Fe=Ie;break}else if(w[Ie]===null){w[Ie]=se,Fe=Ie;break}if(Fe===-1)break}const be=b[Fe];be&&be.connect(se)}}const j=new N,Z=new N;function he(J,re,se){j.setFromMatrixPosition(re.matrixWorld),Z.setFromMatrixPosition(se.matrixWorld);const Fe=j.distanceTo(Z),be=re.projectionMatrix.elements,Ie=se.projectionMatrix.elements,gt=be[14]/(be[10]-1),We=be[14]/(be[10]+1),Ze=(be[9]+1)/be[5],lt=(be[9]-1)/be[5],Ne=(be[8]-1)/be[0],At=(Ie[8]+1)/Ie[0],R=gt*Ne,pt=gt*At,Ye=Fe/(-Ne+At),ut=Ye*-Ne;if(re.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(ut),J.translateZ(Ye),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),be[10]===-1)J.projectionMatrix.copy(re.projectionMatrix),J.projectionMatrixInverse.copy(re.projectionMatrixInverse);else{const Ee=gt+Ye,C=We+Ye,g=R-ut,L=pt+(Fe-ut),q=Ze*We/C*Ee,K=lt*We/C*Ee;J.projectionMatrix.makePerspective(g,L,q,K,Ee,C),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function fe(J,re){re===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(re.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(r===null)return;let re=J.near,se=J.far;f.texture!==null&&(f.depthNear>0&&(re=f.depthNear),f.depthFar>0&&(se=f.depthFar)),Q.near=W.near=y.near=re,Q.far=W.far=y.far=se,(G!==Q.near||H!==Q.far)&&(r.updateRenderState({depthNear:Q.near,depthFar:Q.far}),G=Q.near,H=Q.far),Q.layers.mask=J.layers.mask|6,y.layers.mask=Q.layers.mask&-5,W.layers.mask=Q.layers.mask&-3;const Fe=J.parent,be=Q.cameras;fe(Q,Fe);for(let Ie=0;Ie<be.length;Ie++)fe(be[Ie],Fe);be.length===2?he(Q,y,W):Q.projectionMatrix.copy(y.projectionMatrix),le(J,Q,Fe)};function le(J,re,se){se===null?J.matrix.copy(re.matrixWorld):(J.matrix.copy(se.matrixWorld),J.matrix.invert(),J.matrix.multiply(re.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(re.projectionMatrix),J.projectionMatrixInverse.copy(re.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=go*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return Q},this.getFoveation=function(){if(!(u===null&&p===null))return c},this.setFoveation=function(J){c=J,u!==null&&(u.fixedFoveation=J),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=J)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(Q)},this.getCameraTexture=function(J){return d[J]};let De=null;function at(J,re){if(h=re.getViewerPose(l||a),m=re,h!==null){const se=h.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let Fe=!1;se.length!==Q.cameras.length&&(Q.cameras.length=0,Fe=!0);for(let We=0;We<se.length;We++){const Ze=se[We];let lt=null;if(p!==null)lt=p.getViewport(Ze);else{const At=A.getViewSubImage(u,Ze);lt=At.viewport,We===0&&(e.setRenderTargetTextures(S,At.colorTexture,At.depthStencilTexture),e.setRenderTarget(S))}let Ne=I[We];Ne===void 0&&(Ne=new cn,Ne.layers.enable(We),Ne.viewport=new Et,I[We]=Ne),Ne.matrix.fromArray(Ze.transform.matrix),Ne.matrix.decompose(Ne.position,Ne.quaternion,Ne.scale),Ne.projectionMatrix.fromArray(Ze.projectionMatrix),Ne.projectionMatrixInverse.copy(Ne.projectionMatrix).invert(),Ne.viewport.set(lt.x,lt.y,lt.width,lt.height),We===0&&(Q.matrix.copy(Ne.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale)),Fe===!0&&Q.cameras.push(Ne)}const be=r.enabledFeatures;if(be&&be.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&E){A=n.getBinding();const We=A.getDepthInformation(se[0]);We&&We.isValid&&We.texture&&f.init(We,r.renderState)}if(be&&be.includes("camera-access")&&E){e.state.unbindTexture(),A=n.getBinding();for(let We=0;We<se.length;We++){const Ze=se[We].camera;if(Ze){let lt=d[Ze];lt||(lt=new Uc,d[Ze]=lt);const Ne=A.getCameraImage(Ze);lt.sourceTexture=Ne}}}}for(let se=0;se<b.length;se++){const Fe=w[se],be=b[se];Fe!==null&&be!==void 0&&be.update(Fe,re,l||a)}De&&De(J,re),re.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:re}),m=null}const st=new kc;st.setAnimationLoop(at),this.setAnimationLoop=function(J){De=J},this.dispose=function(){}}}const gi=new Dn,gg=new mt;function _g(i,e){function t(f,d){f.matrixAutoUpdate===!0&&f.updateMatrix(),d.value.copy(f.matrix)}function n(f,d){d.color.getRGB(f.fogColor.value,Oc(i)),d.isFog?(f.fogNear.value=d.near,f.fogFar.value=d.far):d.isFogExp2&&(f.fogDensity.value=d.density)}function r(f,d,v,M,S){d.isMeshBasicMaterial?s(f,d):d.isMeshLambertMaterial?(s(f,d),d.envMap&&(f.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(s(f,d),A(f,d)):d.isMeshPhongMaterial?(s(f,d),h(f,d),d.envMap&&(f.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(s(f,d),u(f,d),d.isMeshPhysicalMaterial&&p(f,d,S)):d.isMeshMatcapMaterial?(s(f,d),m(f,d)):d.isMeshDepthMaterial?s(f,d):d.isMeshDistanceMaterial?(s(f,d),E(f,d)):d.isMeshNormalMaterial?s(f,d):d.isLineBasicMaterial?(a(f,d),d.isLineDashedMaterial&&o(f,d)):d.isPointsMaterial?c(f,d,v,M):d.isSpriteMaterial?l(f,d):d.isShadowMaterial?(f.color.value.copy(d.color),f.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(f,d){f.opacity.value=d.opacity,d.color&&f.diffuse.value.copy(d.color),d.emissive&&f.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(f.map.value=d.map,t(d.map,f.mapTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,t(d.alphaMap,f.alphaMapTransform)),d.bumpMap&&(f.bumpMap.value=d.bumpMap,t(d.bumpMap,f.bumpMapTransform),f.bumpScale.value=d.bumpScale,d.side===qt&&(f.bumpScale.value*=-1)),d.normalMap&&(f.normalMap.value=d.normalMap,t(d.normalMap,f.normalMapTransform),f.normalScale.value.copy(d.normalScale),d.side===qt&&f.normalScale.value.negate()),d.displacementMap&&(f.displacementMap.value=d.displacementMap,t(d.displacementMap,f.displacementMapTransform),f.displacementScale.value=d.displacementScale,f.displacementBias.value=d.displacementBias),d.emissiveMap&&(f.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,f.emissiveMapTransform)),d.specularMap&&(f.specularMap.value=d.specularMap,t(d.specularMap,f.specularMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest);const v=e.get(d),M=v.envMap,S=v.envMapRotation;M&&(f.envMap.value=M,gi.copy(S),gi.x*=-1,gi.y*=-1,gi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(gi.y*=-1,gi.z*=-1),f.envMapRotation.value.setFromMatrix4(gg.makeRotationFromEuler(gi)),f.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=d.reflectivity,f.ior.value=d.ior,f.refractionRatio.value=d.refractionRatio),d.lightMap&&(f.lightMap.value=d.lightMap,f.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,f.lightMapTransform)),d.aoMap&&(f.aoMap.value=d.aoMap,f.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,f.aoMapTransform))}function a(f,d){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,d.map&&(f.map.value=d.map,t(d.map,f.mapTransform))}function o(f,d){f.dashSize.value=d.dashSize,f.totalSize.value=d.dashSize+d.gapSize,f.scale.value=d.scale}function c(f,d,v,M){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,f.size.value=d.size*v,f.scale.value=M*.5,d.map&&(f.map.value=d.map,t(d.map,f.uvTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,t(d.alphaMap,f.alphaMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest)}function l(f,d){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,f.rotation.value=d.rotation,d.map&&(f.map.value=d.map,t(d.map,f.mapTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,t(d.alphaMap,f.alphaMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest)}function h(f,d){f.specular.value.copy(d.specular),f.shininess.value=Math.max(d.shininess,1e-4)}function A(f,d){d.gradientMap&&(f.gradientMap.value=d.gradientMap)}function u(f,d){f.metalness.value=d.metalness,d.metalnessMap&&(f.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,f.metalnessMapTransform)),f.roughness.value=d.roughness,d.roughnessMap&&(f.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,f.roughnessMapTransform)),d.envMap&&(f.envMapIntensity.value=d.envMapIntensity)}function p(f,d,v){f.ior.value=d.ior,d.sheen>0&&(f.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),f.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(f.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,f.sheenColorMapTransform)),d.sheenRoughnessMap&&(f.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,f.sheenRoughnessMapTransform))),d.clearcoat>0&&(f.clearcoat.value=d.clearcoat,f.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(f.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,f.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(f.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===qt&&f.clearcoatNormalScale.value.negate())),d.dispersion>0&&(f.dispersion.value=d.dispersion),d.iridescence>0&&(f.iridescence.value=d.iridescence,f.iridescenceIOR.value=d.iridescenceIOR,f.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(f.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,f.iridescenceMapTransform)),d.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),d.transmission>0&&(f.transmission.value=d.transmission,f.transmissionSamplerMap.value=v.texture,f.transmissionSamplerSize.value.set(v.width,v.height),d.transmissionMap&&(f.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,f.transmissionMapTransform)),f.thickness.value=d.thickness,d.thicknessMap&&(f.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=d.attenuationDistance,f.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(f.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(f.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=d.specularIntensity,f.specularColor.value.copy(d.specularColor),d.specularColorMap&&(f.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,f.specularColorMapTransform)),d.specularIntensityMap&&(f.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,f.specularIntensityMapTransform))}function m(f,d){d.matcap&&(f.matcap.value=d.matcap)}function E(f,d){const v=e.get(d).light;f.referencePosition.value.setFromMatrixPosition(v.matrixWorld),f.nearDistance.value=v.shadow.camera.near,f.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function xg(i,e,t,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,M){const S=M.program;n.uniformBlockBinding(v,S)}function l(v,M){let S=r[v.id];S===void 0&&(m(v),S=h(v),r[v.id]=S,v.addEventListener("dispose",f));const b=M.program;n.updateUBOMapping(v,b);const w=e.render.frame;s[v.id]!==w&&(u(v),s[v.id]=w)}function h(v){const M=A();v.__bindingPointIndex=M;const S=i.createBuffer(),b=v.__size,w=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,b,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,S),S}function A(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return it("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){const M=r[v.id],S=v.uniforms,b=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let w=0,T=S.length;w<T;w++){const _=Array.isArray(S[w])?S[w]:[S[w]];for(let y=0,W=_.length;y<W;y++){const I=_[y];if(p(I,w,y,b)===!0){const Q=I.__offset,G=Array.isArray(I.value)?I.value:[I.value];let H=0;for(let z=0;z<G.length;z++){const k=G[z],U=E(k);typeof k=="number"||typeof k=="boolean"?(I.__data[0]=k,i.bufferSubData(i.UNIFORM_BUFFER,Q+H,I.__data)):k.isMatrix3?(I.__data[0]=k.elements[0],I.__data[1]=k.elements[1],I.__data[2]=k.elements[2],I.__data[3]=0,I.__data[4]=k.elements[3],I.__data[5]=k.elements[4],I.__data[6]=k.elements[5],I.__data[7]=0,I.__data[8]=k.elements[6],I.__data[9]=k.elements[7],I.__data[10]=k.elements[8],I.__data[11]=0):(k.toArray(I.__data,H),H+=U.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,Q,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(v,M,S,b){const w=v.value,T=M+"_"+S;if(b[T]===void 0)return typeof w=="number"||typeof w=="boolean"?b[T]=w:b[T]=w.clone(),!0;{const _=b[T];if(typeof w=="number"||typeof w=="boolean"){if(_!==w)return b[T]=w,!0}else if(_.equals(w)===!1)return _.copy(w),!0}return!1}function m(v){const M=v.uniforms;let S=0;const b=16;for(let T=0,_=M.length;T<_;T++){const y=Array.isArray(M[T])?M[T]:[M[T]];for(let W=0,I=y.length;W<I;W++){const Q=y[W],G=Array.isArray(Q.value)?Q.value:[Q.value];for(let H=0,z=G.length;H<z;H++){const k=G[H],U=E(k),j=S%b,Z=j%U.boundary,he=j+Z;S+=Z,he!==0&&b-he<U.storage&&(S+=b-he),Q.__data=new Float32Array(U.storage/Float32Array.BYTES_PER_ELEMENT),Q.__offset=S,S+=U.storage}}}const w=S%b;return w>0&&(S+=b-w),v.__size=S,v.__cache={},this}function E(v){const M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=48,M.storage=48):v.isMatrix4?(M.boundary=64,M.storage=64):v.isTexture?Pe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Pe("WebGLRenderer: Unsupported uniform value type.",v),M}function f(v){const M=v.target;M.removeEventListener("dispose",f);const S=a.indexOf(M.__bindingPointIndex);a.splice(S,1),i.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function d(){for(const v in r)i.deleteBuffer(r[v]);a=[],r={},s={}}return{bind:c,update:l,dispose:d}}const Eg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let yn=null;function vg(){return yn===null&&(yn=new ch(Eg,16,16,ji,Wn),yn.name="DFG_LUT",yn.minFilter=Qt,yn.magFilter=Qt,yn.wrapS=zn,yn.wrapT=zn,yn.generateMipmaps=!1,yn.needsUpdate=!0),yn}class yg{constructor(e={}){const{canvas:t=Qd(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:A=!1,reversedDepthBuffer:u=!1,outputBufferType:p=nn}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;const E=p,f=new Set([Bo,Ro,To]),d=new Set([nn,Bn,br,Ir,bo,Io]),v=new Uint32Array(4),M=new Int32Array(4);let S=null,b=null;const w=[],T=[];let _=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Tn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const y=this;let W=!1;this._outputColorSpace=ln;let I=0,Q=0,G=null,H=-1,z=null;const k=new Et,U=new Et;let j=null;const Z=new Je(0);let he=0,fe=t.width,le=t.height,De=1,at=null,st=null;const J=new Et(0,0,fe,le),re=new Et(0,0,fe,le);let se=!1;const Fe=new No;let be=!1,Ie=!1;const gt=new mt,We=new N,Ze=new Et,lt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ne=!1;function At(){return G===null?De:1}let R=n;function pt(x,B){return t.getContext(x,B)}try{const x={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:A};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Co}`),t.addEventListener("webglcontextlost",xe,!1),t.addEventListener("webglcontextrestored",Be,!1),t.addEventListener("webglcontextcreationerror",Ke,!1),R===null){const B="webgl2";if(R=pt(B,x),R===null)throw pt(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw it("WebGLRenderer: "+x.message),x}let Ye,ut,Ee,C,g,L,q,K,Y,_e,ne,ve,Ce,$,te,me,ge,ue,Ue,D,ae,ie,pe;function ee(){Ye=new yA(R),Ye.init(),ae=new hg(R,Ye),ut=new pA(R,Ye,e,ae),Ee=new ug(R,Ye),ut.reversedDepthBuffer&&u&&Ee.buffers.depth.setReversed(!0),C=new CA(R),g=new Km,L=new dg(R,Ye,Ee,g,ut,ae,C),q=new vA(y),K=new Th(R),ie=new hA(R,K),Y=new MA(R,K,C,ie),_e=new bA(R,Y,K,ie,C),ue=new wA(R,ut,L),te=new AA(g),ne=new Jm(y,q,Ye,ut,ie,te),ve=new _g(y,g),Ce=new Zm,$=new rg(Ye),ge=new dA(y,q,Ee,_e,m,c),me=new cg(y,_e,ut),pe=new xg(R,C,ut,Ee),Ue=new fA(R,Ye,C),D=new SA(R,Ye,C),C.programs=ne.programs,y.capabilities=ut,y.extensions=Ye,y.properties=g,y.renderLists=Ce,y.shadowMap=me,y.state=Ee,y.info=C}ee(),E!==nn&&(_=new TA(E,t.width,t.height,r,s));const X=new mg(y,R);this.xr=X,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const x=Ye.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=Ye.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return De},this.setPixelRatio=function(x){x!==void 0&&(De=x,this.setSize(fe,le,!1))},this.getSize=function(x){return x.set(fe,le)},this.setSize=function(x,B,O=!0){if(X.isPresenting){Pe("WebGLRenderer: Can't change size while VR device is presenting.");return}fe=x,le=B,t.width=Math.floor(x*De),t.height=Math.floor(B*De),O===!0&&(t.style.width=x+"px",t.style.height=B+"px"),_!==null&&_.setSize(t.width,t.height),this.setViewport(0,0,x,B)},this.getDrawingBufferSize=function(x){return x.set(fe*De,le*De).floor()},this.setDrawingBufferSize=function(x,B,O){fe=x,le=B,De=O,t.width=Math.floor(x*O),t.height=Math.floor(B*O),this.setViewport(0,0,x,B)},this.setEffects=function(x){if(E===nn){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(x){for(let B=0;B<x.length;B++)if(x[B].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}_.setEffects(x||[])},this.getCurrentViewport=function(x){return x.copy(k)},this.getViewport=function(x){return x.copy(J)},this.setViewport=function(x,B,O,P){x.isVector4?J.set(x.x,x.y,x.z,x.w):J.set(x,B,O,P),Ee.viewport(k.copy(J).multiplyScalar(De).round())},this.getScissor=function(x){return x.copy(re)},this.setScissor=function(x,B,O,P){x.isVector4?re.set(x.x,x.y,x.z,x.w):re.set(x,B,O,P),Ee.scissor(U.copy(re).multiplyScalar(De).round())},this.getScissorTest=function(){return se},this.setScissorTest=function(x){Ee.setScissorTest(se=x)},this.setOpaqueSort=function(x){at=x},this.setTransparentSort=function(x){st=x},this.getClearColor=function(x){return x.copy(ge.getClearColor())},this.setClearColor=function(){ge.setClearColor(...arguments)},this.getClearAlpha=function(){return ge.getClearAlpha()},this.setClearAlpha=function(){ge.setClearAlpha(...arguments)},this.clear=function(x=!0,B=!0,O=!0){let P=0;if(x){let F=!1;if(G!==null){const oe=G.texture.format;F=f.has(oe)}if(F){const oe=G.texture.type,Ae=d.has(oe),de=ge.getClearColor(),ye=ge.getClearAlpha(),Se=de.r,Oe=de.g,Ge=de.b;Ae?(v[0]=Se,v[1]=Oe,v[2]=Ge,v[3]=ye,R.clearBufferuiv(R.COLOR,0,v)):(M[0]=Se,M[1]=Oe,M[2]=Ge,M[3]=ye,R.clearBufferiv(R.COLOR,0,M))}else P|=R.COLOR_BUFFER_BIT}B&&(P|=R.DEPTH_BUFFER_BIT),O&&(P|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P!==0&&R.clear(P)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",xe,!1),t.removeEventListener("webglcontextrestored",Be,!1),t.removeEventListener("webglcontextcreationerror",Ke,!1),ge.dispose(),Ce.dispose(),$.dispose(),g.dispose(),q.dispose(),_e.dispose(),ie.dispose(),pe.dispose(),ne.dispose(),X.dispose(),X.removeEventListener("sessionstart",li),X.removeEventListener("sessionend",lr),_n.stop()};function xe(x){x.preventDefault(),cl("WebGLRenderer: Context Lost."),W=!0}function Be(){cl("WebGLRenderer: Context Restored."),W=!1;const x=C.autoReset,B=me.enabled,O=me.autoUpdate,P=me.needsUpdate,F=me.type;ee(),C.autoReset=x,me.enabled=B,me.autoUpdate=O,me.needsUpdate=P,me.type=F}function Ke(x){it("WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function je(x){const B=x.target;B.removeEventListener("dispose",je),Jt(B)}function Jt(x){rn(x),g.remove(x)}function rn(x){const B=g.get(x).programs;B!==void 0&&(B.forEach(function(O){ne.releaseProgram(O)}),x.isShaderMaterial&&ne.releaseShaderCache(x))}this.renderBufferDirect=function(x,B,O,P,F,oe){B===null&&(B=lt);const Ae=F.isMesh&&F.matrixWorld.determinant()<0,de=Ve(x,B,O,P,F);Ee.setMaterial(P,Ae);let ye=O.index,Se=1;if(P.wireframe===!0){if(ye=Y.getWireframeAttribute(O),ye===void 0)return;Se=2}const Oe=O.drawRange,Ge=O.attributes.position;let we=Oe.start*Se,dt=(Oe.start+Oe.count)*Se;oe!==null&&(we=Math.max(we,oe.start*Se),dt=Math.min(dt,(oe.start+oe.count)*Se)),ye!==null?(we=Math.max(we,0),dt=Math.min(dt,ye.count)):Ge!=null&&(we=Math.max(we,0),dt=Math.min(dt,Ge.count));const vt=dt-we;if(vt<0||vt===1/0)return;ie.setup(F,P,de,O,ye);let _t,ht=Ue;if(ye!==null&&(_t=K.get(ye),ht=D,ht.setIndex(_t)),F.isMesh)P.wireframe===!0?(Ee.setLineWidth(P.wireframeLinewidth*At()),ht.setMode(R.LINES)):ht.setMode(R.TRIANGLES);else if(F.isLine){let Ut=P.linewidth;Ut===void 0&&(Ut=1),Ee.setLineWidth(Ut*At()),F.isLineSegments?ht.setMode(R.LINES):F.isLineLoop?ht.setMode(R.LINE_LOOP):ht.setMode(R.LINE_STRIP)}else F.isPoints?ht.setMode(R.POINTS):F.isSprite&&ht.setMode(R.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)Is("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ht.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Ye.get("WEBGL_multi_draw"))ht.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Ut=F._multiDrawStarts,Me=F._multiDrawCounts,Kt=F._multiDrawCount,tt=ye?K.get(ye).bytesPerElement:1,dn=g.get(P).currentProgram.getUniforms();for(let xn=0;xn<Kt;xn++)dn.setValue(R,"_gl_DrawID",xn),ht.render(Ut[xn]/tt,Me[xn])}else if(F.isInstancedMesh)ht.renderInstances(we,vt,F.count);else if(O.isInstancedBufferGeometry){const Ut=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,Me=Math.min(O.instanceCount,Ut);ht.renderInstances(we,vt,Me)}else ht.render(we,vt)};function or(x,B,O){x.transparent===!0&&x.side===wn&&x.forceSinglePass===!1?(x.side=qt,x.needsUpdate=!0,V(x,B,O),x.side=oi,x.needsUpdate=!0,V(x,B,O),x.side=wn):V(x,B,O)}this.compile=function(x,B,O=null){O===null&&(O=x),b=$.get(O),b.init(B),T.push(b),O.traverseVisible(function(F){F.isLight&&F.layers.test(B.layers)&&(b.pushLight(F),F.castShadow&&b.pushShadow(F))}),x!==O&&x.traverseVisible(function(F){F.isLight&&F.layers.test(B.layers)&&(b.pushLight(F),F.castShadow&&b.pushShadow(F))}),b.setupLights();const P=new Set;return x.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const oe=F.material;if(oe)if(Array.isArray(oe))for(let Ae=0;Ae<oe.length;Ae++){const de=oe[Ae];or(de,O,F),P.add(de)}else or(oe,O,F),P.add(oe)}),b=T.pop(),P},this.compileAsync=function(x,B,O=null){const P=this.compile(x,B,O);return new Promise(F=>{function oe(){if(P.forEach(function(Ae){g.get(Ae).currentProgram.isReady()&&P.delete(Ae)}),P.size===0){F(x);return}setTimeout(oe,10)}Ye.get("KHR_parallel_shader_compile")!==null?oe():setTimeout(oe,10)})};let Ri=null;function Nr(x){Ri&&Ri(x)}function li(){_n.stop()}function lr(){_n.start()}const _n=new kc;_n.setAnimationLoop(Nr),typeof self<"u"&&_n.setContext(self),this.setAnimationLoop=function(x){Ri=x,X.setAnimationLoop(x),x===null?_n.stop():_n.start()},X.addEventListener("sessionstart",li),X.addEventListener("sessionend",lr),this.render=function(x,B){if(B!==void 0&&B.isCamera!==!0){it("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(W===!0)return;const O=X.enabled===!0&&X.isPresenting===!0,P=_!==null&&(G===null||O)&&_.begin(y,G);if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(_===null||_.isCompositing()===!1)&&(X.cameraAutoUpdate===!0&&X.updateCamera(B),B=X.getCamera()),x.isScene===!0&&x.onBeforeRender(y,x,B,G),b=$.get(x,T.length),b.init(B),T.push(b),gt.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),Fe.setFromProjectionMatrix(gt,In,B.reversedDepth),Ie=this.localClippingEnabled,be=te.init(this.clippingPlanes,Ie),S=Ce.get(x,w.length),S.init(),w.push(S),X.enabled===!0&&X.isPresenting===!0){const Ae=y.xr.getDepthSensingMesh();Ae!==null&&Bi(Ae,B,-1/0,y.sortObjects)}Bi(x,B,0,y.sortObjects),S.finish(),y.sortObjects===!0&&S.sort(at,st),Ne=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,Ne&&ge.addToRenderList(S,x),this.info.render.frame++,be===!0&&te.beginShadows();const F=b.state.shadowsArray;if(me.render(F,x,B),be===!0&&te.endShadows(),this.info.autoReset===!0&&this.info.reset(),(P&&_.hasRenderPass())===!1){const Ae=S.opaque,de=S.transmissive;if(b.setupLights(),B.isArrayCamera){const ye=B.cameras;if(de.length>0)for(let Se=0,Oe=ye.length;Se<Oe;Se++){const Ge=ye[Se];ur(Ae,de,x,Ge)}Ne&&ge.render(x);for(let Se=0,Oe=ye.length;Se<Oe;Se++){const Ge=ye[Se];cr(S,x,Ge,Ge.viewport)}}else de.length>0&&ur(Ae,de,x,B),Ne&&ge.render(x),cr(S,x,B)}G!==null&&Q===0&&(L.updateMultisampleRenderTarget(G),L.updateRenderTargetMipmap(G)),P&&_.end(y),x.isScene===!0&&x.onAfterRender(y,x,B),ie.resetDefaultState(),H=-1,z=null,T.pop(),T.length>0?(b=T[T.length-1],be===!0&&te.setGlobalState(y.clippingPlanes,b.state.camera)):b=null,w.pop(),w.length>0?S=w[w.length-1]:S=null};function Bi(x,B,O,P){if(x.visible===!1)return;if(x.layers.test(B.layers)){if(x.isGroup)O=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(B);else if(x.isLight)b.pushLight(x),x.castShadow&&b.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||Fe.intersectsSprite(x)){P&&Ze.setFromMatrixPosition(x.matrixWorld).applyMatrix4(gt);const Ae=_e.update(x),de=x.material;de.visible&&S.push(x,Ae,de,O,Ze.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||Fe.intersectsObject(x))){const Ae=_e.update(x),de=x.material;if(P&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Ze.copy(x.boundingSphere.center)):(Ae.boundingSphere===null&&Ae.computeBoundingSphere(),Ze.copy(Ae.boundingSphere.center)),Ze.applyMatrix4(x.matrixWorld).applyMatrix4(gt)),Array.isArray(de)){const ye=Ae.groups;for(let Se=0,Oe=ye.length;Se<Oe;Se++){const Ge=ye[Se],we=de[Ge.materialIndex];we&&we.visible&&S.push(x,Ae,we,O,Ze.z,Ge)}}else de.visible&&S.push(x,Ae,de,O,Ze.z,null)}}const oe=x.children;for(let Ae=0,de=oe.length;Ae<de;Ae++)Bi(oe[Ae],B,O,P)}function cr(x,B,O,P){const{opaque:F,transmissive:oe,transparent:Ae}=x;b.setupLightsView(O),be===!0&&te.setGlobalState(y.clippingPlanes,O),P&&Ee.viewport(k.copy(P)),F.length>0&&ci(F,B,O),oe.length>0&&ci(oe,B,O),Ae.length>0&&ci(Ae,B,O),Ee.buffers.depth.setTest(!0),Ee.buffers.depth.setMask(!0),Ee.buffers.color.setMask(!0),Ee.setPolygonOffset(!1)}function ur(x,B,O,P){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[P.id]===void 0){const we=Ye.has("EXT_color_buffer_half_float")||Ye.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[P.id]=new Rn(1,1,{generateMipmaps:!0,type:we?Wn:nn,minFilter:Mi,samples:Math.max(4,ut.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:et.workingColorSpace})}const oe=b.state.transmissionRenderTarget[P.id],Ae=P.viewport||k;oe.setSize(Ae.z*y.transmissionResolutionScale,Ae.w*y.transmissionResolutionScale);const de=y.getRenderTarget(),ye=y.getActiveCubeFace(),Se=y.getActiveMipmapLevel();y.setRenderTarget(oe),y.getClearColor(Z),he=y.getClearAlpha(),he<1&&y.setClearColor(16777215,.5),y.clear(),Ne&&ge.render(O);const Oe=y.toneMapping;y.toneMapping=Tn;const Ge=P.viewport;if(P.viewport!==void 0&&(P.viewport=void 0),b.setupLightsView(P),be===!0&&te.setGlobalState(y.clippingPlanes,P),ci(x,O,P),L.updateMultisampleRenderTarget(oe),L.updateRenderTargetMipmap(oe),Ye.has("WEBGL_multisampled_render_to_texture")===!1){let we=!1;for(let dt=0,vt=B.length;dt<vt;dt++){const _t=B[dt],{object:ht,geometry:Ut,material:Me,group:Kt}=_t;if(Me.side===wn&&ht.layers.test(P.layers)){const tt=Me.side;Me.side=qt,Me.needsUpdate=!0,Ur(ht,O,P,Ut,Me,Kt),Me.side=tt,Me.needsUpdate=!0,we=!0}}we===!0&&(L.updateMultisampleRenderTarget(oe),L.updateRenderTargetMipmap(oe))}y.setRenderTarget(de,ye,Se),y.setClearColor(Z,he),Ge!==void 0&&(P.viewport=Ge),y.toneMapping=Oe}function ci(x,B,O){const P=B.isScene===!0?B.overrideMaterial:null;for(let F=0,oe=x.length;F<oe;F++){const Ae=x[F],{object:de,geometry:ye,group:Se}=Ae;let Oe=Ae.material;Oe.allowOverride===!0&&P!==null&&(Oe=P),de.layers.test(O.layers)&&Ur(de,B,O,ye,Oe,Se)}}function Ur(x,B,O,P,F,oe){x.onBeforeRender(y,B,O,P,F,oe),x.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),F.onBeforeRender(y,B,O,P,x,oe),F.transparent===!0&&F.side===wn&&F.forceSinglePass===!1?(F.side=qt,F.needsUpdate=!0,y.renderBufferDirect(O,B,P,F,x,oe),F.side=oi,F.needsUpdate=!0,y.renderBufferDirect(O,B,P,F,x,oe),F.side=wn):y.renderBufferDirect(O,B,P,F,x,oe),x.onAfterRender(y,B,O,P,F,oe)}function V(x,B,O){B.isScene!==!0&&(B=lt);const P=g.get(x),F=b.state.lights,oe=b.state.shadowsArray,Ae=F.state.version,de=ne.getParameters(x,F.state,oe,B,O),ye=ne.getProgramCacheKey(de);let Se=P.programs;P.environment=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?B.environment:null,P.fog=B.fog;const Oe=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap;P.envMap=q.get(x.envMap||P.environment,Oe),P.envMapRotation=P.environment!==null&&x.envMap===null?B.environmentRotation:x.envMapRotation,Se===void 0&&(x.addEventListener("dispose",je),Se=new Map,P.programs=Se);let Ge=Se.get(ye);if(Ge!==void 0){if(P.currentProgram===Ge&&P.lightsStateVersion===Ae)return ke(x,de),Ge}else de.uniforms=ne.getUniforms(x),x.onBeforeCompile(de,y),Ge=ne.acquireProgram(de,ye),Se.set(ye,Ge),P.uniforms=de.uniforms;const we=P.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(we.clippingPlanes=te.uniform),ke(x,de),P.needsLights=Nt(x),P.lightsStateVersion=Ae,P.needsLights&&(we.ambientLightColor.value=F.state.ambient,we.lightProbe.value=F.state.probe,we.directionalLights.value=F.state.directional,we.directionalLightShadows.value=F.state.directionalShadow,we.spotLights.value=F.state.spot,we.spotLightShadows.value=F.state.spotShadow,we.rectAreaLights.value=F.state.rectArea,we.ltc_1.value=F.state.rectAreaLTC1,we.ltc_2.value=F.state.rectAreaLTC2,we.pointLights.value=F.state.point,we.pointLightShadows.value=F.state.pointShadow,we.hemisphereLights.value=F.state.hemi,we.directionalShadowMatrix.value=F.state.directionalShadowMatrix,we.spotLightMatrix.value=F.state.spotLightMatrix,we.spotLightMap.value=F.state.spotLightMap,we.pointShadowMatrix.value=F.state.pointShadowMatrix),P.currentProgram=Ge,P.uniformsList=null,Ge}function Le(x){if(x.uniformsList===null){const B=x.currentProgram.getUniforms();x.uniformsList=ys.seqWithValue(B.seq,x.uniforms)}return x.uniformsList}function ke(x,B){const O=g.get(x);O.outputColorSpace=B.outputColorSpace,O.batching=B.batching,O.batchingColor=B.batchingColor,O.instancing=B.instancing,O.instancingColor=B.instancingColor,O.instancingMorph=B.instancingMorph,O.skinning=B.skinning,O.morphTargets=B.morphTargets,O.morphNormals=B.morphNormals,O.morphColors=B.morphColors,O.morphTargetsCount=B.morphTargetsCount,O.numClippingPlanes=B.numClippingPlanes,O.numIntersection=B.numClipIntersection,O.vertexAlphas=B.vertexAlphas,O.vertexTangents=B.vertexTangents,O.toneMapping=B.toneMapping}function Ve(x,B,O,P,F){B.isScene!==!0&&(B=lt),L.resetTextureUnits();const oe=B.fog,Ae=P.isMeshStandardMaterial||P.isMeshLambertMaterial||P.isMeshPhongMaterial?B.environment:null,de=G===null?y.outputColorSpace:G.isXRRenderTarget===!0?G.texture.colorSpace:er,ye=P.isMeshStandardMaterial||P.isMeshLambertMaterial&&!P.envMap||P.isMeshPhongMaterial&&!P.envMap,Se=q.get(P.envMap||Ae,ye),Oe=P.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,Ge=!!O.attributes.tangent&&(!!P.normalMap||P.anisotropy>0),we=!!O.morphAttributes.position,dt=!!O.morphAttributes.normal,vt=!!O.morphAttributes.color;let _t=Tn;P.toneMapped&&(G===null||G.isXRRenderTarget===!0)&&(_t=y.toneMapping);const ht=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Ut=ht!==void 0?ht.length:0,Me=g.get(P),Kt=b.state.lights;if(be===!0&&(Ie===!0||x!==z)){const Tt=x===z&&P.id===H;te.setState(P,x,Tt)}let tt=!1;P.version===Me.__version?(Me.needsLights&&Me.lightsStateVersion!==Kt.state.version||Me.outputColorSpace!==de||F.isBatchedMesh&&Me.batching===!1||!F.isBatchedMesh&&Me.batching===!0||F.isBatchedMesh&&Me.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Me.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Me.instancing===!1||!F.isInstancedMesh&&Me.instancing===!0||F.isSkinnedMesh&&Me.skinning===!1||!F.isSkinnedMesh&&Me.skinning===!0||F.isInstancedMesh&&Me.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Me.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Me.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Me.instancingMorph===!1&&F.morphTexture!==null||Me.envMap!==Se||P.fog===!0&&Me.fog!==oe||Me.numClippingPlanes!==void 0&&(Me.numClippingPlanes!==te.numPlanes||Me.numIntersection!==te.numIntersection)||Me.vertexAlphas!==Oe||Me.vertexTangents!==Ge||Me.morphTargets!==we||Me.morphNormals!==dt||Me.morphColors!==vt||Me.toneMapping!==_t||Me.morphTargetsCount!==Ut)&&(tt=!0):(tt=!0,Me.__version=P.version);let dn=Me.currentProgram;tt===!0&&(dn=V(P,B,F));let xn=!1,ui=!1,Di=!1;const ft=dn.getUniforms(),Dt=Me.uniforms;if(Ee.useProgram(dn.program)&&(xn=!0,ui=!0,Di=!0),P.id!==H&&(H=P.id,ui=!0),xn||z!==x){Ee.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),ft.setValue(R,"projectionMatrix",x.projectionMatrix),ft.setValue(R,"viewMatrix",x.matrixWorldInverse);const Kn=ft.map.cameraPosition;Kn!==void 0&&Kn.setValue(R,We.setFromMatrixPosition(x.matrixWorld)),ut.logarithmicDepthBuffer&&ft.setValue(R,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(P.isMeshPhongMaterial||P.isMeshToonMaterial||P.isMeshLambertMaterial||P.isMeshBasicMaterial||P.isMeshStandardMaterial||P.isShaderMaterial)&&ft.setValue(R,"isOrthographic",x.isOrthographicCamera===!0),z!==x&&(z=x,ui=!0,Di=!0)}if(Me.needsLights&&(Kt.state.directionalShadowMap.length>0&&ft.setValue(R,"directionalShadowMap",Kt.state.directionalShadowMap,L),Kt.state.spotShadowMap.length>0&&ft.setValue(R,"spotShadowMap",Kt.state.spotShadowMap,L),Kt.state.pointShadowMap.length>0&&ft.setValue(R,"pointShadowMap",Kt.state.pointShadowMap,L)),F.isSkinnedMesh){ft.setOptional(R,F,"bindMatrix"),ft.setOptional(R,F,"bindMatrixInverse");const Tt=F.skeleton;Tt&&(Tt.boneTexture===null&&Tt.computeBoneTexture(),ft.setValue(R,"boneTexture",Tt.boneTexture,L))}F.isBatchedMesh&&(ft.setOptional(R,F,"batchingTexture"),ft.setValue(R,"batchingTexture",F._matricesTexture,L),ft.setOptional(R,F,"batchingIdTexture"),ft.setValue(R,"batchingIdTexture",F._indirectTexture,L),ft.setOptional(R,F,"batchingColorTexture"),F._colorsTexture!==null&&ft.setValue(R,"batchingColorTexture",F._colorsTexture,L));const Jn=O.morphAttributes;if((Jn.position!==void 0||Jn.normal!==void 0||Jn.color!==void 0)&&ue.update(F,O,dn),(ui||Me.receiveShadow!==F.receiveShadow)&&(Me.receiveShadow=F.receiveShadow,ft.setValue(R,"receiveShadow",F.receiveShadow)),(P.isMeshStandardMaterial||P.isMeshLambertMaterial||P.isMeshPhongMaterial)&&P.envMap===null&&B.environment!==null&&(Dt.envMapIntensity.value=B.environmentIntensity),Dt.dfgLUT!==void 0&&(Dt.dfgLUT.value=vg()),ui&&(ft.setValue(R,"toneMappingExposure",y.toneMappingExposure),Me.needsLights&&ot(Dt,Di),oe&&P.fog===!0&&ve.refreshFogUniforms(Dt,oe),ve.refreshMaterialUniforms(Dt,P,De,le,b.state.transmissionRenderTarget[x.id]),ys.upload(R,Le(Me),Dt,L)),P.isShaderMaterial&&P.uniformsNeedUpdate===!0&&(ys.upload(R,Le(Me),Dt,L),P.uniformsNeedUpdate=!1),P.isSpriteMaterial&&ft.setValue(R,"center",F.center),ft.setValue(R,"modelViewMatrix",F.modelViewMatrix),ft.setValue(R,"normalMatrix",F.normalMatrix),ft.setValue(R,"modelMatrix",F.matrixWorld),P.isShaderMaterial||P.isRawShaderMaterial){const Tt=P.uniformsGroups;for(let Kn=0,Li=Tt.length;Kn<Li;Kn++){const Xo=Tt[Kn];pe.update(Xo,dn),pe.bind(Xo,dn)}}return dn}function ot(x,B){x.ambientLightColor.needsUpdate=B,x.lightProbe.needsUpdate=B,x.directionalLights.needsUpdate=B,x.directionalLightShadows.needsUpdate=B,x.pointLights.needsUpdate=B,x.pointLightShadows.needsUpdate=B,x.spotLights.needsUpdate=B,x.spotLightShadows.needsUpdate=B,x.rectAreaLights.needsUpdate=B,x.hemisphereLights.needsUpdate=B}function Nt(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return Q},this.getRenderTarget=function(){return G},this.setRenderTargetTextures=function(x,B,O){const P=g.get(x);P.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,P.__autoAllocateDepthBuffer===!1&&(P.__useRenderToTexture=!1),g.get(x.texture).__webglTexture=B,g.get(x.depthTexture).__webglTexture=P.__autoAllocateDepthBuffer?void 0:O,P.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,B){const O=g.get(x);O.__webglFramebuffer=B,O.__useDefaultFramebuffer=B===void 0};const qn=R.createFramebuffer();this.setRenderTarget=function(x,B=0,O=0){G=x,I=B,Q=O;let P=null,F=!1,oe=!1;if(x){const de=g.get(x);if(de.__useDefaultFramebuffer!==void 0){Ee.bindFramebuffer(R.FRAMEBUFFER,de.__webglFramebuffer),k.copy(x.viewport),U.copy(x.scissor),j=x.scissorTest,Ee.viewport(k),Ee.scissor(U),Ee.setScissorTest(j),H=-1;return}else if(de.__webglFramebuffer===void 0)L.setupRenderTarget(x);else if(de.__hasExternalTextures)L.rebindTextures(x,g.get(x.texture).__webglTexture,g.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const Oe=x.depthTexture;if(de.__boundDepthTexture!==Oe){if(Oe!==null&&g.has(Oe)&&(x.width!==Oe.image.width||x.height!==Oe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");L.setupDepthRenderbuffer(x)}}const ye=x.texture;(ye.isData3DTexture||ye.isDataArrayTexture||ye.isCompressedArrayTexture)&&(oe=!0);const Se=g.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Se[B])?P=Se[B][O]:P=Se[B],F=!0):x.samples>0&&L.useMultisampledRTT(x)===!1?P=g.get(x).__webglMultisampledFramebuffer:Array.isArray(Se)?P=Se[O]:P=Se,k.copy(x.viewport),U.copy(x.scissor),j=x.scissorTest}else k.copy(J).multiplyScalar(De).floor(),U.copy(re).multiplyScalar(De).floor(),j=se;if(O!==0&&(P=qn),Ee.bindFramebuffer(R.FRAMEBUFFER,P)&&Ee.drawBuffers(x,P),Ee.viewport(k),Ee.scissor(U),Ee.setScissorTest(j),F){const de=g.get(x.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+B,de.__webglTexture,O)}else if(oe){const de=B;for(let ye=0;ye<x.textures.length;ye++){const Se=g.get(x.textures[ye]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+ye,Se.__webglTexture,O,de)}}else if(x!==null&&O!==0){const de=g.get(x.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,de.__webglTexture,O)}H=-1},this.readRenderTargetPixels=function(x,B,O,P,F,oe,Ae,de=0){if(!(x&&x.isWebGLRenderTarget)){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ye=g.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&Ae!==void 0&&(ye=ye[Ae]),ye){Ee.bindFramebuffer(R.FRAMEBUFFER,ye);try{const Se=x.textures[de],Oe=Se.format,Ge=Se.type;if(x.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+de),!ut.textureFormatReadable(Oe)){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ut.textureTypeReadable(Ge)){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=x.width-P&&O>=0&&O<=x.height-F&&R.readPixels(B,O,P,F,ae.convert(Oe),ae.convert(Ge),oe)}finally{const Se=G!==null?g.get(G).__webglFramebuffer:null;Ee.bindFramebuffer(R.FRAMEBUFFER,Se)}}},this.readRenderTargetPixelsAsync=async function(x,B,O,P,F,oe,Ae,de=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ye=g.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&Ae!==void 0&&(ye=ye[Ae]),ye)if(B>=0&&B<=x.width-P&&O>=0&&O<=x.height-F){Ee.bindFramebuffer(R.FRAMEBUFFER,ye);const Se=x.textures[de],Oe=Se.format,Ge=Se.type;if(x.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+de),!ut.textureFormatReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ut.textureTypeReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const we=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,we),R.bufferData(R.PIXEL_PACK_BUFFER,oe.byteLength,R.STREAM_READ),R.readPixels(B,O,P,F,ae.convert(Oe),ae.convert(Ge),0);const dt=G!==null?g.get(G).__webglFramebuffer:null;Ee.bindFramebuffer(R.FRAMEBUFFER,dt);const vt=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await kd(R,vt,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,we),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,oe),R.deleteBuffer(we),R.deleteSync(vt),oe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,B=null,O=0){const P=Math.pow(2,-O),F=Math.floor(x.image.width*P),oe=Math.floor(x.image.height*P),Ae=B!==null?B.x:0,de=B!==null?B.y:0;L.setTexture2D(x,0),R.copyTexSubImage2D(R.TEXTURE_2D,O,0,0,Ae,de,F,oe),Ee.unbindTexture()};const sn=R.createFramebuffer(),Te=R.createFramebuffer();this.copyTextureToTexture=function(x,B,O=null,P=null,F=0,oe=0){let Ae,de,ye,Se,Oe,Ge,we,dt,vt;const _t=x.isCompressedTexture?x.mipmaps[oe]:x.image;if(O!==null)Ae=O.max.x-O.min.x,de=O.max.y-O.min.y,ye=O.isBox3?O.max.z-O.min.z:1,Se=O.min.x,Oe=O.min.y,Ge=O.isBox3?O.min.z:0;else{const Dt=Math.pow(2,-F);Ae=Math.floor(_t.width*Dt),de=Math.floor(_t.height*Dt),x.isDataArrayTexture?ye=_t.depth:x.isData3DTexture?ye=Math.floor(_t.depth*Dt):ye=1,Se=0,Oe=0,Ge=0}P!==null?(we=P.x,dt=P.y,vt=P.z):(we=0,dt=0,vt=0);const ht=ae.convert(B.format),Ut=ae.convert(B.type);let Me;B.isData3DTexture?(L.setTexture3D(B,0),Me=R.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(L.setTexture2DArray(B,0),Me=R.TEXTURE_2D_ARRAY):(L.setTexture2D(B,0),Me=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,B.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,B.unpackAlignment);const Kt=R.getParameter(R.UNPACK_ROW_LENGTH),tt=R.getParameter(R.UNPACK_IMAGE_HEIGHT),dn=R.getParameter(R.UNPACK_SKIP_PIXELS),xn=R.getParameter(R.UNPACK_SKIP_ROWS),ui=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,_t.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,_t.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Se),R.pixelStorei(R.UNPACK_SKIP_ROWS,Oe),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Ge);const Di=x.isDataArrayTexture||x.isData3DTexture,ft=B.isDataArrayTexture||B.isData3DTexture;if(x.isDepthTexture){const Dt=g.get(x),Jn=g.get(B),Tt=g.get(Dt.__renderTarget),Kn=g.get(Jn.__renderTarget);Ee.bindFramebuffer(R.READ_FRAMEBUFFER,Tt.__webglFramebuffer),Ee.bindFramebuffer(R.DRAW_FRAMEBUFFER,Kn.__webglFramebuffer);for(let Li=0;Li<ye;Li++)Di&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,g.get(x).__webglTexture,F,Ge+Li),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,g.get(B).__webglTexture,oe,vt+Li)),R.blitFramebuffer(Se,Oe,Ae,de,we,dt,Ae,de,R.DEPTH_BUFFER_BIT,R.NEAREST);Ee.bindFramebuffer(R.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(F!==0||x.isRenderTargetTexture||g.has(x)){const Dt=g.get(x),Jn=g.get(B);Ee.bindFramebuffer(R.READ_FRAMEBUFFER,sn),Ee.bindFramebuffer(R.DRAW_FRAMEBUFFER,Te);for(let Tt=0;Tt<ye;Tt++)Di?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Dt.__webglTexture,F,Ge+Tt):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Dt.__webglTexture,F),ft?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Jn.__webglTexture,oe,vt+Tt):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Jn.__webglTexture,oe),F!==0?R.blitFramebuffer(Se,Oe,Ae,de,we,dt,Ae,de,R.COLOR_BUFFER_BIT,R.NEAREST):ft?R.copyTexSubImage3D(Me,oe,we,dt,vt+Tt,Se,Oe,Ae,de):R.copyTexSubImage2D(Me,oe,we,dt,Se,Oe,Ae,de);Ee.bindFramebuffer(R.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else ft?x.isDataTexture||x.isData3DTexture?R.texSubImage3D(Me,oe,we,dt,vt,Ae,de,ye,ht,Ut,_t.data):B.isCompressedArrayTexture?R.compressedTexSubImage3D(Me,oe,we,dt,vt,Ae,de,ye,ht,_t.data):R.texSubImage3D(Me,oe,we,dt,vt,Ae,de,ye,ht,Ut,_t):x.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,oe,we,dt,Ae,de,ht,Ut,_t.data):x.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,oe,we,dt,_t.width,_t.height,ht,_t.data):R.texSubImage2D(R.TEXTURE_2D,oe,we,dt,Ae,de,ht,Ut,_t);R.pixelStorei(R.UNPACK_ROW_LENGTH,Kt),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,tt),R.pixelStorei(R.UNPACK_SKIP_PIXELS,dn),R.pixelStorei(R.UNPACK_SKIP_ROWS,xn),R.pixelStorei(R.UNPACK_SKIP_IMAGES,ui),oe===0&&B.generateMipmaps&&R.generateMipmap(Me),Ee.unbindTexture()},this.initRenderTarget=function(x){g.get(x).__webglFramebuffer===void 0&&L.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?L.setTextureCube(x,0):x.isData3DTexture?L.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?L.setTexture2DArray(x,0):L.setTexture2D(x,0),Ee.unbindTexture()},this.resetState=function(){I=0,Q=0,G=null,Ee.reset(),ie.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return In}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=et._getDrawingBufferColorSpace(e),t.unpackColorSpace=et._getUnpackColorSpace()}}function Mg(i){const e=new yg({canvas:i,antialias:!0,alpha:!1});e.setPixelRatio(Math.min(window.devicePixelRatio,2)),e.setClearColor(723727,1);const t=new ih;t.fog=new Fo(723727,800,2400);const n=new cn(45,1,10,5e3),r=new N(0,200,200),s=new wh(900,Math.PI*.38,Math.PI*.5);a();function a(){const V=new N().setFromSpherical(s).add(r);n.position.copy(V),n.lookAt(r)}t.add(new Mh(6975624,.8));const o=new Ll(16777215,.9);o.position.set(300,600,600),t.add(o);const c=new Ll(8956671,.35);c.position.set(-400,200,-200),t.add(c);const l=new bh(2e3,40,2763318,1710628);l.position.y=0,l.material.transparent=!0,l.material.opacity=.6,t.add(l);const h=new tn,A=new tn,u=new tn;h.add(A),A.add(u),t.add(h);const p=new tn,m=new nt(new Qn(285,15,18),new ma({color:1710626,roughness:.4,metalness:.6}));p.add(m);const E=new nt(new Qn(200,3,.5),new xt({color:2780660}));E.position.set(0,0,9.2),p.add(E);for(const V of[-80,80]){const Le=new nt(new wr(4,24),new xt({color:8255912}));Le.position.set(V,0,9.3),p.add(Le)}u.add(p);const f=new tn,d=new yt;d.setAttribute("position",new Lt(new Float32Array(18),3)),d.setIndex([0,1,2,0,2,3]),d.computeVertexNormals();const v=new nt(d,new ma({color:1974320,roughness:.5,metalness:.1,side:wn,transparent:!0,opacity:.7,depthWrite:!1}));f.add(v);const M=new yt;M.setAttribute("position",new Lt(new Float32Array(15),3));const S=new xi(M,new ii({color:8255912}));f.add(S);const b=new nt(new wt(8,16,16),new xt({color:8255912}));b.visible=!1,f.add(b);const w=new nt(new wt(5,12,12),new xt({color:16733525,transparent:!0,opacity:.6,depthWrite:!1}));w.visible=!1,f.add(w);const T=new nt(new wt(7,16,16),new xt({color:16369789}));T.visible=!1,f.add(T);const _=new nt(new wt(4,12,12),new xt({color:16737928,transparent:!0,opacity:.5,depthWrite:!1})),y=new nt(new wt(4,12,12),new xt({color:6728447,transparent:!0,opacity:.5,depthWrite:!1}));_.visible=!1,y.visible=!1,u.add(_),u.add(y);const W=new yt;W.setAttribute("position",new Lt(new Float32Array(15),3));const I=new xi(W,new ii({color:2780660,transparent:!0,opacity:.85,depthWrite:!1}));I.visible=!1,f.add(I);let Q=null;const G=new nt(new wt(5,16,16),new xt({color:16753738}));G.visible=!1,f.add(G);let H=null;t.add(f);let z=null;const k=new tn,U=new ma({color:16052448,roughness:.3,metalness:0,transparent:!0,opacity:.4,depthWrite:!1}),j=new xt({color:2775690}),Z=new xt({color:328968});function he(){const V=new tn,Le=new nt(new wt(12,24,16),U),ke=new nt(new wr(5,24),j);ke.position.z=11.5;const Ve=new nt(new wr(2,24),Z);return Ve.position.z=11.7,V.add(Le),V.add(ke),V.add(Ve),V}const fe=he(),le=he();fe.position.set(-32,300,650),le.position.set(32,300,650),k.add(fe),k.add(le),u.add(k);const De=new nt(new wt(5,12,8),new xt({color:16750916,transparent:!0,opacity:.5,depthWrite:!1})),at=new nt(new wt(5,12,8),new xt({color:16750916,transparent:!0,opacity:.5,depthWrite:!1}));De.visible=!1,at.visible=!1,u.add(De),u.add(at);const st=new nt(new wt(5,12,8),new xt({color:11158783,transparent:!0,opacity:.5,depthWrite:!1})),J=new nt(new wt(5,12,8),new xt({color:11158783,transparent:!0,opacity:.5,depthWrite:!1}));st.visible=!1,J.visible=!1,u.add(st),u.add(J);const re=new ii({color:8255912,transparent:!0,opacity:.5,depthWrite:!1}),se=new yt;se.setAttribute("position",new Lt(new Float32Array(6),3));const Fe=new yt;Fe.setAttribute("position",new Lt(new Float32Array(6),3));const be=new xi(se,re),Ie=new xi(Fe,re);be.visible=!1,Ie.visible=!1;const gt=80,We=50,Ze=40,lt=-40,Ne=new tn;Ne.position.set(0,lt,0);const At=new Qn(gt,We,Ze),R=new _o(new Il(At),new ii({color:5592422,transparent:!0,opacity:.5,depthWrite:!1}));Ne.add(R);const pt=new nt(new wt(3,12,8),new xt({color:16737928})),Ye=new nt(new wt(3,12,8),new xt({color:6728447}));pt.visible=!1,Ye.visible=!1,Ne.add(pt),Ne.add(Ye),u.add(Ne);const ut=436,Ee=454,C=507,g=0,L=-3,q=644,K=new tn;K.position.set(g,L,q);const Y=new Qn(ut,Ee,C),_e=new _o(new Il(Y),new ii({color:4473941,transparent:!0,opacity:.25,depthWrite:!1}));K.add(_e);const ne=new nt(new wt(6,12,8),new xt({color:16737928,transparent:!0,opacity:.5,depthWrite:!1})),ve=new nt(new wt(6,12,8),new xt({color:6728447,transparent:!0,opacity:.5,depthWrite:!1}));ne.visible=!1,ve.visible=!1,K.add(ne),K.add(ve);const Ce=new nt(new wt(5,12,8),new xt({color:16763972,transparent:!0,opacity:.6,depthWrite:!1})),$=new nt(new wt(5,12,8),new xt({color:4513245,transparent:!0,opacity:.6,depthWrite:!1}));Ce.visible=!1,$.visible=!1,K.add(Ce),K.add($),u.add(K);const te=new ii({color:16729343,transparent:!0,opacity:.5,depthWrite:!1}),me=new yt;me.setAttribute("position",new Lt(new Float32Array(6),3));const ge=new yt;ge.setAttribute("position",new Lt(new Float32Array(6),3));const ue=new xi(me,te),Ue=new xi(ge,te);ue.visible=!1,Ue.visible=!1,t.add(be),t.add(Ie),t.add(ue),t.add(Ue);function D(V){const Le=V.tl.y-V.bl.y,ke=V.tl.z-V.bl.z,Ve=Math.atan2(ke,Le);h.position.set(V.bl.x,V.bl.y,V.bl.z),A.rotation.x=-Ve,u.position.set(-V.bl.x,-V.bl.y,-V.bl.z);const ot=Math.hypot(Le,ke)*(Le>=0?1:-1),Nt={x:V.tl.x,y:V.bl.y+ot,z:V.bl.z},qn={x:V.tr.x,y:V.bl.y+ot,z:V.bl.z},sn={x:V.bl.x,y:V.bl.y,z:V.bl.z};z={tl:Nt,tr:qn,bl:sn};const{tl:Te,tr:x,bl:B}=z,O={x:x.x+(B.x-Te.x),y:x.y+(B.y-Te.y),z:x.z+(B.z-Te.z)},P=v.geometry.getAttribute("position");P.setXYZ(0,Te.x,Te.y,Te.z),P.setXYZ(1,x.x,x.y,x.z),P.setXYZ(2,O.x,O.y,O.z),P.setXYZ(3,B.x,B.y,B.z),P.needsUpdate=!0,v.geometry.computeVertexNormals(),v.geometry.computeBoundingSphere();const F=S.geometry.getAttribute("position");F.setXYZ(0,Te.x,Te.y,Te.z),F.setXYZ(1,x.x,x.y,x.z),F.setXYZ(2,O.x,O.y,O.z),F.setXYZ(3,B.x,B.y,B.z),F.setXYZ(4,Te.x,Te.y,Te.z),F.needsUpdate=!0,S.geometry.computeBoundingSphere(),r.set((Te.x+x.x+B.x+O.x)/4,(Te.y+x.y+B.y+O.y)/4,(Te.z+x.z+B.z+O.z)/4),a(),ae(),pe()}function ae(){if(!z||!Q){I.visible=!1;return}const{tl:V,tr:Le,bl:ke}=z,Ve=(F,oe)=>({x:V.x+F*(Le.x-V.x)+oe*(ke.x-V.x),y:V.y+F*(Le.y-V.y)+oe*(ke.y-V.y),z:V.z+F*(Le.z-V.z)+oe*(ke.z-V.z)+.8}),{x0:ot,y0:Nt,x1:qn,y1:sn}=Q,Te=Ve(ot,Nt),x=Ve(qn,Nt),B=Ve(qn,sn),O=Ve(ot,sn),P=W.getAttribute("position");P.setXYZ(0,Te.x,Te.y,Te.z),P.setXYZ(1,x.x,x.y,x.z),P.setXYZ(2,B.x,B.y,B.z),P.setXYZ(3,O.x,O.y,O.z),P.setXYZ(4,Te.x,Te.y,Te.z),P.needsUpdate=!0,W.computeBoundingSphere(),I.visible=!0}function ie(V){Q=V,ae(),pe()}function pe(){if(!z||!H){G.visible=!1;return}const V=Q??{x0:0,y0:0,x1:1,y1:1},Le=V.x0+H.nx*(V.x1-V.x0),ke=V.y0+H.ny*(V.y1-V.y0),{tl:Ve,tr:ot,bl:Nt}=z;G.position.set(Ve.x+Le*(ot.x-Ve.x)+ke*(Nt.x-Ve.x),Ve.y+Le*(ot.y-Ve.y)+ke*(Nt.y-Ve.y),Ve.z+Le*(ot.z-Ve.z)+ke*(Nt.z-Ve.z)+1.6),G.visible=!0}function ee(V){H=V,pe()}function X(V,Le){if(!z)return null;const{tl:ke,tr:Ve,bl:ot}=z;return new N(ke.x+V*(Ve.x-ke.x)+Le*(ot.x-ke.x),ke.y+V*(Ve.y-ke.y)+Le*(ot.y-ke.y),ke.z+V*(Ve.z-ke.z)+Le*(ot.z-ke.z))}function xe(V){if(V.eye_origin_L_mm&&fe.position.set(V.eye_origin_L_mm.x,V.eye_origin_L_mm.y,V.eye_origin_L_mm.z),V.eye_origin_R_mm&&le.position.set(V.eye_origin_R_mm.x,V.eye_origin_R_mm.y,V.eye_origin_R_mm.z),V.pupil_diameter_L_mm&&V.pupil_diameter_L_mm>0){const Te=V.pupil_diameter_L_mm/4;fe.children[1]?.scale.setScalar(Te),fe.children[2]?.scale.setScalar(Te)}if(V.pupil_diameter_R_mm&&V.pupil_diameter_R_mm>0){const Te=V.pupil_diameter_R_mm/4;le.children[1]?.scale.setScalar(Te),le.children[2]?.scale.setScalar(Te)}V.eye_origin_raw_L_mm?(De.position.set(V.eye_origin_raw_L_mm.x,V.eye_origin_raw_L_mm.y,V.eye_origin_raw_L_mm.z),De.visible=!0):De.visible=!1,V.eye_origin_raw_R_mm?(at.position.set(V.eye_origin_raw_R_mm.x,V.eye_origin_raw_R_mm.y,V.eye_origin_raw_R_mm.z),at.visible=!0):at.visible=!1,V.eye_origin_L_display_mm?(st.position.set(V.eye_origin_L_display_mm.x,V.eye_origin_L_display_mm.y,V.eye_origin_L_display_mm.z),st.visible=!0):st.visible=!1,V.eye_origin_R_display_mm?(J.position.set(V.eye_origin_R_display_mm.x,V.eye_origin_R_display_mm.y,V.eye_origin_R_display_mm.z),J.visible=!0):J.visible=!1,V.gaze_point_3d_L_mm&&V.validity_L===0?(_.position.set(V.gaze_point_3d_L_mm.x,V.gaze_point_3d_L_mm.y,V.gaze_point_3d_L_mm.z),_.visible=!0):_.visible=!1,V.gaze_point_3d_R_mm&&V.validity_R===0?(y.position.set(V.gaze_point_3d_R_mm.x,V.gaze_point_3d_R_mm.y,V.gaze_point_3d_R_mm.z),y.visible=!0):y.visible=!1;const Le=V.trackbox_eye_pos_L,ke=V.trackbox_eye_pos_R;Le&&V.validity_L===0?(pt.position.set(-(Le.x-.5)*gt,-(Le.y-.5)*We,(Le.z-.5)*Ze),pt.visible=!0,ne.position.set((Le.x-.4989)/-.002291-g,(Le.y-.4936)/-.002201-L,(Le.z- -.7681)/.00197-q),ne.visible=!0):(pt.visible=!1,ne.visible=!1),ke&&V.validity_R===0?(Ye.position.set(-(ke.x-.5)*gt,-(ke.y-.5)*We,(ke.z-.5)*Ze),Ye.visible=!0,ve.position.set((ke.x-.5002)/-.002297-g,(ke.y-.4934)/-.002187-L,(ke.z- -.7759)/.001976-q),ve.visible=!0):(Ye.visible=!1,ve.visible=!1);const Ve=V.trackbox_eye_pos_L_display,ot=V.trackbox_eye_pos_R_display;Ve&&(Ve.x!==0||Ve.y!==0||Ve.z!==0)?(Ce.position.set((Ve.x-.4989)/-.002291-g,(Ve.y-.4936)/-.002201-L,(Ve.z- -.7681)/.00197-q),Ce.visible=!0):Ce.visible=!1,ot&&(ot.x!==0||ot.y!==0||ot.z!==0)?($.position.set((ot.x-.5002)/-.002297-g,(ot.y-.4934)/-.002187-L,(ot.z- -.7759)/.001976-q),$.visible=!0):$.visible=!1;const Nt=V.gaze_point_2d_norm,qn=V.validity_L===0||V.validity_R===0;if(Nt&&qn){const Te=X(Nt.x,Nt.y);if(Te){b.position.copy(Te),b.visible=!0,fe.lookAt(Te),le.lookAt(Te);const x=new N,B=new N;h.updateMatrixWorld(),fe.getWorldPosition(x),le.getWorldPosition(B);const O=se.getAttribute("position");O.setXYZ(0,x.x,x.y,x.z),O.setXYZ(1,Te.x,Te.y,Te.z),O.needsUpdate=!0;const P=Fe.getAttribute("position");P.setXYZ(0,B.x,B.y,B.z),P.setXYZ(1,Te.x,Te.y,Te.z),P.needsUpdate=!0,be.visible=!0,Ie.visible=!0}}else b.visible=!1,be.visible=!1,Ie.visible=!1;const sn=V.gaze_point_2d_unfiltered;if(sn&&(sn.x!==0||sn.y!==0)){const Te=X(sn.x,sn.y);Te&&(w.position.copy(Te),w.position.z+=.5,w.visible=!0)}else w.visible=!1;{h.updateMatrixWorld();const Te=V.gaze_point_2d_L_norm,x=V.gaze_point_2d_R_norm,B=Te&&(Te.x!==0||Te.y!==0)?X(Te.x,Te.y):null,O=x&&(x.x!==0||x.y!==0)?X(x.x,x.y):null;if(B&&Ce.visible){const P=new N;Ce.getWorldPosition(P);const F=me.getAttribute("position");F.setXYZ(0,P.x,P.y,P.z),F.setXYZ(1,B.x,B.y,B.z),F.needsUpdate=!0,ue.visible=!0}else ue.visible=!1;if(O&&$.visible){const P=new N;$.getWorldPosition(P);const F=ge.getAttribute("position");F.setXYZ(0,P.x,P.y,P.z),F.setXYZ(1,O.x,O.y,O.z),F.needsUpdate=!0,Ue.visible=!0}else Ue.visible=!1}}let Be=!1,Ke=null,je=0,Jt=0;const rn=V=>{V.code==="Space"&&(Be=!0)},or=V=>{V.code==="Space"&&(Be=!1)};window.addEventListener("keydown",rn),window.addEventListener("keyup",or);const Ri=V=>{if(Be)Ke="pan",i.classList.add("panning");else if(V.button===2)Ke="rotate",i.classList.add("rotating");else return;je=V.clientX,Jt=V.clientY,i.setPointerCapture(V.pointerId),V.preventDefault()},Nr=V=>{if(!Ke)return;const Le=V.clientX-je,ke=V.clientY-Jt;if(je=V.clientX,Jt=V.clientY,Ke==="rotate")s.theta-=Le*.005,s.phi-=ke*.005,s.phi=Math.max(.05,Math.min(Math.PI-.05,s.phi)),a();else if(Ke==="pan"){const Ve=s.radius*.0015,ot=new N().setFromMatrixColumn(n.matrix,0),Nt=new N().setFromMatrixColumn(n.matrix,1);r.addScaledVector(ot,-Le*Ve),r.addScaledVector(Nt,ke*Ve),a()}},li=V=>{Ke&&(Ke=null,i.classList.remove("panning","rotating"),i.releasePointerCapture(V.pointerId))},lr=V=>{V.preventDefault();const Le=Math.exp(V.deltaY*.001);s.radius=Math.max(100,Math.min(4e3,s.radius*Le)),a()},_n=V=>V.preventDefault();i.addEventListener("pointerdown",Ri),i.addEventListener("pointermove",Nr),i.addEventListener("pointerup",li),i.addEventListener("pointercancel",li),i.addEventListener("wheel",lr,{passive:!1}),i.addEventListener("contextmenu",_n);function Bi(){const V=i.clientWidth,Le=i.clientHeight;e.setSize(V,Le,!1),n.aspect=V/Le,n.updateProjectionMatrix()}const cr=new ResizeObserver(Bi);cr.observe(i),Bi();let ur=0;const ci=()=>{e.render(t,n),ur=requestAnimationFrame(ci)};ci(),D({tl:{x:-200,y:300,z:0},tr:{x:200,y:300,z:0},bl:{x:-200,y:0,z:0}});function Ur(V){if(!V||!z){T.visible=!1;return}const Le=Q??{x0:0,y0:0,x1:1,y1:1},ke=Le.x0+V.x*(Le.x1-Le.x0),Ve=Le.y0+V.y*(Le.y1-Le.y0),ot=X(ke,Ve);if(!ot){T.visible=!1;return}T.position.set(ot.x,ot.y,ot.z+1),T.visible=!0}return{setDisplayArea:D,setViewportRect:ie,setMouse:ee,setGaze:xe,setCorrectedGaze:Ur,dispose(){cancelAnimationFrame(ur),cr.disconnect(),window.removeEventListener("keydown",rn),window.removeEventListener("keyup",or),i.removeEventListener("pointerdown",Ri),i.removeEventListener("pointermove",Nr),i.removeEventListener("pointerup",li),i.removeEventListener("pointercancel",li),i.removeEventListener("wheel",lr),i.removeEventListener("contextmenu",_n),e.dispose()}}}const $e=i=>{const e=document.getElementById(i);if(!e)throw new Error(`#${i} missing`);return e},bi=$e("transport"),Yc=$e("ws-url"),kt=$e("connect"),Mr=$e("gaze");bi.addEventListener("change",()=>{Yc.style.display=bi.value==="ws"?"":"none"});const qc=$e("stats"),Jc=$e("err"),Kc=$e("hint"),$c=$e("da"),hs=$e("da-grid"),fs=$e("rect-grid"),Sg=$e("da-reload"),Cg=$e("da-reset"),vo=$e("da-diag"),Ht=$e("diag-out"),Ci=$e("da-cal"),Sr=$e("da-collect"),Cr=$e("da-collect2"),wg=$e("da-load"),rc=$e("da-load-model"),bg=$e("da-big-plane"),Er=$e("gaze-corrected"),Ig=$e("da-winperm"),Zc=$e("da-fs"),Ms=$e("da-onboard-cal"),Tg=$e("da-onboard-pts"),He=$e("cal-overlay"),St=$e("cal-target"),Mn=$e("onboard-cal-dot"),Ei=$e("collect-target"),qe=$e("cal-status"),Yn=$e("da-lock"),Ii=$e("da-tilt"),Os=$e("da-tilt-val"),Rg=$e("stage3d"),kn=Mg(Rg);let Oo=null;function Lr(){const i=Kg();Oo?.currentScreen,kn.setViewportRect(i)}Lr();window.addEventListener("resize",Lr);window.addEventListener("pointermove",i=>{kn.setMouse({nx:i.clientX/window.innerWidth,ny:i.clientY/window.innerHeight})});window.addEventListener("pointerout",i=>{i.relatedTarget||kn.setMouse(null)});setInterval(()=>{document.hasFocus()&&Lr()},500);(async()=>{const i=window;try{(await i.permissions?.query({name:"window-management"}))?.state==="granted"&&await lu()}catch{}})();let Ss=null;function Bg(i,e){const t=(r,s)=>r?r[s]:0,n={"gaze_2d.x":()=>i.gaze_point_2d_norm?.x??0,"gaze_2d.y":()=>i.gaze_point_2d_norm?.y??0,"gaze_2d_L.x":()=>i.gaze_point_2d_L_norm?.x??0,"gaze_2d_L.y":()=>i.gaze_point_2d_L_norm?.y??0,"gaze_2d_R.x":()=>i.gaze_point_2d_R_norm?.x??0,"gaze_2d_R.y":()=>i.gaze_point_2d_R_norm?.y??0,"gaze_2d_unfilt.x":()=>i.gaze_point_2d_unfiltered?.x??0,"gaze_2d_unfilt.y":()=>i.gaze_point_2d_unfiltered?.y??0,"eo_L.x":()=>t(i.eye_origin_L_mm,"x"),"eo_L.y":()=>t(i.eye_origin_L_mm,"y"),"eo_L.z":()=>t(i.eye_origin_L_mm,"z"),"eo_R.x":()=>t(i.eye_origin_R_mm,"x"),"eo_R.y":()=>t(i.eye_origin_R_mm,"y"),"eo_R.z":()=>t(i.eye_origin_R_mm,"z"),"er_L.x":()=>t(i.eye_origin_raw_L_mm,"x"),"er_L.y":()=>t(i.eye_origin_raw_L_mm,"y"),"er_L.z":()=>t(i.eye_origin_raw_L_mm,"z"),"er_R.x":()=>t(i.eye_origin_raw_R_mm,"x"),"er_R.y":()=>t(i.eye_origin_raw_R_mm,"y"),"er_R.z":()=>t(i.eye_origin_raw_R_mm,"z"),"tb_L.x":()=>t(i.trackbox_eye_pos_L,"x"),"tb_L.y":()=>t(i.trackbox_eye_pos_L,"y"),"tb_L.z":()=>t(i.trackbox_eye_pos_L,"z"),"tb_R.x":()=>t(i.trackbox_eye_pos_R,"x"),"tb_R.y":()=>t(i.trackbox_eye_pos_R,"y"),"tb_R.z":()=>t(i.trackbox_eye_pos_R,"z"),pupil_L:()=>i.pupil_diameter_L_mm??-1,pupil_R:()=>i.pupil_diameter_R_mm??-1};return e.map(r=>(n[r]??(()=>0))())}function Dg(i,e){if(e===1)return[...i,1];const t=[...i];if(e>=2)for(let n=0;n<i.length;n++)for(let r=n;r<i.length;r++)t.push(i[n]*i[r]);if(e>=3)for(let n=0;n<i.length;n++)for(let r=n;r<i.length;r++)for(let s=r;s<i.length;s++)t.push(i[n]*i[r]*i[s]);return t.push(1),t}function Lg(i,e,t){return{x:i.tl.x+(i.tr.x-i.tl.x)*e+(i.bl.x-i.tl.x)*t,y:i.tl.y+(i.tr.y-i.tl.y)*e+(i.bl.y-i.tl.y)*t,z:i.tl.z+(i.tr.z-i.tl.z)*e+(i.bl.z-i.tl.z)*t}}function Pg(i,e){const t=i.tr.x-i.tl.x,n=i.tr.y-i.tl.y,r=i.tr.z-i.tl.z,s=i.bl.x-i.tl.x,a=i.bl.y-i.tl.y,o=i.bl.z-i.tl.z,c=e.x-i.tl.x,l=e.y-i.tl.y,h=e.z-i.tl.z,A=t*t+n*n+r*r,u=t*s+n*a+r*o,p=s*s+a*a+o*o,m=t*c+n*l+r*h,E=s*c+a*l+o*h,f=A*p-u*u;return Math.abs(f)<1e-12?{x:.5,y:.5}:{x:(p*m-u*E)/f,y:(A*E-u*m)/f}}function Fg(i,e,t){if(e.validity_L!==0&&e.validity_R!==0)return null;const r=Bg(e,i.featureNames).map((c,l)=>(c-i.inputMean[l])/i.inputStd[l]),s=Dg(r,i.polyDegree);let a=0,o=0;for(let c=0;c<i.weights.length;c++)a+=s[c]*i.weights[c][0],o+=s[c]*i.weights[c][1];if(i.trainingDisplayArea){const c=Lg(i.trainingDisplayArea,a,o);return Pg(t,c)}return{x:a,y:o}}let Re=null,Bs=0,sc=performance.now(),jc=null;const eu=new Map;function Pr(i){Jc.textContent=i}function Ng(){Jc.textContent=""}function Ug(i){jc=i,Bs++,kn.setGaze(i);const e=i.gaze_point_2d_norm??i.gaze_point_2d_L_norm??i.gaze_point_2d_R_norm,t=i.validity_L===0||i.validity_R===0;if(mn||Gn)Mr.style.opacity="0",Er.style.opacity="0";else if(e&&t){const n=Math.max(0,Math.min(1,e.x))*window.innerWidth,r=Math.max(0,Math.min(1,e.y))*window.innerHeight;if(Mr.style.transform=`translate(${n}px, ${r}px)`,Mr.style.opacity="1",Ss){const s=Fg(Ss,i,Ti());if(s){Bs%100===0&&console.log("[model-debug]",{prediction:s,hasTrainingDA:!!Ss.trainingDisplayArea,eo_L:i.eye_origin_L_mm,tb_L:i.trackbox_eye_pos_L,gaze_2d:i.gaze_point_2d_norm});const a=Math.max(0,Math.min(1,s.x))*window.innerWidth,o=Math.max(0,Math.min(1,s.y))*window.innerHeight;Er.style.transform=`translate(${a}px, ${o}px)`,Er.style.opacity="1",kn.setCorrectedGaze(s)}else Er.style.opacity="0.25",kn.setCorrectedGaze(null)}else kn.setCorrectedGaze(null)}else Mr.style.opacity="0.25",Er.style.opacity="0"}function tu(){const i=performance.now(),e=i-sc;if(e>=500){const t=(Bs*1e3/e).toFixed(1),n=jc,r=(o,c=3)=>o===void 0?"—":o.toFixed(c),s=n?.gaze_point_2d_norm,a=o=>{const c=eu.get(o);if(!c)return"—";const l=h=>h.toFixed(3);return c.kind==="point3d"?`(${l(c.v0)}, ${l(c.v1)}, ${l(c.v2)})`:c.kind==="point2d"?`(${l(c.v0)}, ${l(c.v1)})`:`${l(c.v0)}`};qc.textContent=[`rate     : ${t} Hz`,`valid L/R: ${n?.validity_L??"—"} / ${n?.validity_R??"—"}`,`gaze 2d  : (${r(s?.x)}, ${r(s?.y)})`,`pupil L/R: ${r(n?.pupil_diameter_L_mm,2)} / ${r(n?.pupil_diameter_R_mm,2)} mm`,`frame #  : ${n?.frame_counter??"—"}`,"--- raw columns ---",`0x03 dirL   : ${a(3)}`,`0x09 dirR   : ${a(9)}`,`0x25 dir25  : ${a(37)}`,`0x27 dir27  : ${a(39)}`,`0x04 gp3L   : ${a(4)}`,`0x0a gp3R   : ${a(10)}`,`0x22 eoL_d  : ${a(34)}`,`0x24 eoR_d  : ${a(36)}`].join(`
`),Bs=0,sc=i}requestAnimationFrame(tu)}async function nu(){Ng();try{if(bi.value==="ws")await Og(Yc.value.trim()||"ws://localhost:7081");else{const i=await navigator.usb.requestDevice({filters:[{vendorId:8452,productId:787},{vendorId:8452,productId:295}]});await zo(i)}}catch(i){const e=i instanceof Error?i.message:String(i);Pr(e)}}async function zo(i){kt.disabled=!0,kt.textContent="Connecting…";try{const e=await So.fromUsb({device:i});e.onParseError(t=>{console.warn("parse error",t.toString(16))}),e.subscribeToRawGaze(t=>{for(const n of t)eu.set(n.colId,n)}),await iu(e)}catch(e){const t=e instanceof Error?e.message:String(e);Pr(t),kt.textContent="Connect",kt.disabled=!1}}async function Og(i){kt.disabled=!0,kt.textContent="Connecting…";try{const e=await So.fromDaemon({url:i});await iu(e)}catch(e){const t=e instanceof Error?e.message:String(e);Pr(t),kt.textContent="Connect",kt.disabled=!1}}async function iu(i){await lu(),Re=i,Kc.textContent="Streaming gaze. Look around.",kt.textContent="Disconnect",kt.disabled=!1,kt.onclick=ru,bi.disabled=!0,Re.subscribeToGaze(Ug),requestAnimationFrame(tu),$c.style.display="block";try{const t=Re.displayArea??await Re.getDisplayArea();if(Qg(t)){const n=kg()??Ds;console.log("[connect] device area reset, applying fallback",n),await Re.setDisplayAreaCorners(n),Vt(n)}else au(t),Vt(t),console.log("[connect] display_area from device",t)}catch(t){console.warn("getDisplayArea failed",t)}const e=localStorage.getItem("tobii_onboard_cal");if(e&&Re)try{const t=atob(e),n=new Uint8Array(t.length);for(let r=0;r<t.length;r++)n[r]=t.charCodeAt(r);await Re.calApply(n),console.log(`[connect] restored onboard calibration (${n.byteLength}B)`)}catch(t){console.warn("restore onboard calibration failed",t)}}async function ru(){kt.disabled=!0;try{await Re?.close()}catch{}Re=null,Mr.style.opacity="0",qc.textContent="",$c.style.display="none",Kc.textContent="Select transport and connect",kt.textContent="Connect",kt.disabled=!1,kt.onclick=nu,bi.disabled=!1}const Qo=["tl","tr","bl"],ko=["x","y","z"],zg={x:{min:-800,max:800,step:.5},y:{min:-800,max:800,step:.5},z:{min:-1e3,max:1e3,step:.5}},Bt={tl:{},tr:{},bl:{}},Go={tl:{},tr:{},bl:{}},Ds={tl:{x:-500,y:500,z:0},tr:{x:500,y:500,z:0},bl:{x:-500,y:0,z:0}},su="tobii_last_good_area";function Qg(i){const e=Math.abs(i.tr.x-i.tl.x),t=Math.abs(i.tl.y-i.bl.y);return e<50||t<50}function au(i){try{localStorage.setItem(su,JSON.stringify(i))}catch{}}function kg(){try{const i=localStorage.getItem(su);return i?JSON.parse(i):null}catch{return null}}const Gg=["bl.x","tr.y","tr.z","tl.z"],Vg=(i,e)=>Gg.includes(`${i}.${e}`);function zs(){const i=Number(Ii.value),e=Number(Bt.bl.z.value);Yt("bl","x",Number(Bt.tl.x.value)),Yt("tr","y",Number(Bt.tl.y.value)),Yt("tl","z",e-i),Yt("tr","z",e-i)}function Yt(i,e,t){Bt[i][e].value=String(t),Go[i][e].textContent=t.toFixed(1)}function Vo(){const i=Yn.checked;for(const e of Qo)for(const t of ko){const n=Vg(e,t);Bt[e][t].disabled=i&&n,Go[e][t].classList.toggle("locked",i&&n)}Ii.disabled=!i,Os.classList.toggle("locked",!i)}function Qs(){const i=Number(Bt.bl.z.value)-Number(Bt.tl.z.value);Ii.value=String(i),Os.textContent=i.toFixed(1)}let Sa=!1,Ca=!1;async function ar(){const i=Ti();if(kn.setDisplayArea(i),!!Re){if(Sa){Ca=!0;return}Sa=!0;try{await Re.setDisplayAreaCorners(i),au(i)}catch(e){Pr(e instanceof Error?e.message:String(e))}finally{Sa=!1,Ca&&(Ca=!1,ar())}}}function Ti(){const i=e=>({x:Number(Bt[e].x.value),y:Number(Bt[e].y.value),z:Number(Bt[e].z.value)});return{tl:i("tl"),tr:i("tr"),bl:i("bl")}}function Vt(i){for(const e of Qo)for(const t of ko)Yt(e,t,i[e][t]);Qs(),Yn.checked&&zs(),Fr(),kn.setDisplayArea(Ti())}function Hg(){for(const i of Qo){const e=document.createElement("div");e.className="group",e.style.gridColumn="1 / -1",e.textContent=i.toUpperCase(),hs.appendChild(e);for(const t of ko){const n=zg[t],r=document.createElement("label");r.textContent=t;const s=document.createElement("input");s.type="range",s.min=String(n.min),s.max=String(n.max),s.step=String(n.step),s.value=String(Ds[i][t]);const a=document.createElement("div");a.className="val",a.textContent=Ds[i][t].toFixed(1),s.addEventListener("input",()=>{a.textContent=Number(s.value).toFixed(1),Yn.checked?zs():Qs(),Fr(),ar()}),hs.appendChild(r),hs.appendChild(s),hs.appendChild(a),Bt[i][t]=s,Go[i][t]=a}}}const ou=[{key:"width",label:"w",min:50,max:1200,step:.5},{key:"height",label:"h",min:50,max:900,step:.5},{key:"cx",label:"cx",min:-500,max:500,step:.5},{key:"cy",label:"cy",min:-200,max:600,step:.5},{key:"cz",label:"cz",min:-200,max:200,step:.5}],si={},Ho={};function Wg(){const i=document.createElement("div");i.className="group",i.style.gridColumn="1 / -1",i.textContent="SCREEN RECT",fs.appendChild(i);for(const e of ou){const t=document.createElement("label");t.textContent=e.label;const n=document.createElement("input");n.type="range",n.min=String(e.min),n.max=String(e.max),n.step=String(e.step);const r=document.createElement("div");r.className="val",n.addEventListener("input",()=>{r.textContent=Number(n.value).toFixed(1),Xg(),ar()}),fs.appendChild(t),fs.appendChild(n),fs.appendChild(r),si[e.key]=n,Ho[e.key]=r}}function Xg(){const i=Number(si.width.value),e=Number(si.height.value),t=Number(si.cx.value),n=Number(si.cy.value),r=Number(si.cz.value),s=Number(Ii.value),a=Math.max(-e,Math.min(e,s));a!==s&&(Ii.value=String(a),Os.textContent=a.toFixed(1));const o=Math.sqrt(Math.max(0,e*e-a*a)),c=i/2;Yt("bl","x",t-c),Yt("bl","y",n),Yt("bl","z",r),Yt("tl","x",t-c),Yt("tl","y",n+o),Yt("tl","z",r-a),Yt("tr","x",t+c),Yt("tr","y",n+o),Yt("tr","z",r-a)}function Fr(){const i=Number(Bt.tl.x.value),e=Number(Bt.tl.y.value),t=Number(Bt.tl.z.value),n=Number(Bt.tr.x.value);Number(Bt.bl.x.value);const r=Number(Bt.bl.y.value),s=Number(Bt.bl.z.value),a=n-i,o=Math.hypot(e-r,t-s),c=(i+n)/2,l=(h,A)=>{si[h].value=String(A),Ho[h].textContent=A.toFixed(1)};l("width",a),l("height",o),l("cx",c),l("cy",r),l("cz",s)}function Wo(){const i=Yn.checked;for(const e of ou)si[e.key].disabled=!i,Ho[e.key].classList.toggle("locked",!i)}Wg();Hg();Qs();Vo();Wo();Fr();Ii.addEventListener("input",()=>{Os.textContent=Number(Ii.value).toFixed(1),Yn.checked&&zs(),Fr(),ar()});Yn.addEventListener("change",()=>{Vo(),Wo(),Yn.checked&&(Qs(),zs(),Fr(),ar())});Sg.addEventListener("click",async()=>{if(Re)try{const i=await Re.getDisplayArea();Vt(i)}catch(i){Pr(i instanceof Error?i.message:String(i))}});Cg.addEventListener("click",()=>{Vt(Ds),ar()});function ac(i){const e=i.length;if(e===0)return{mean:{x:NaN,y:NaN,z:NaN},std:{x:NaN,y:NaN,z:NaN},n:e};const t={x:0,y:0,z:0};for(const r of i)t.x+=r.x,t.y+=r.y,t.z+=r.z;t.x/=e,t.y/=e,t.z/=e;const n={x:0,y:0,z:0};for(const r of i)n.x+=(r.x-t.x)**2,n.y+=(r.y-t.y)**2,n.z+=(r.z-t.z)**2;return{mean:t,std:{x:Math.sqrt(n.x/e),y:Math.sqrt(n.y/e),z:Math.sqrt(n.z/e)},n:e}}function An(i,e=2){return`(${i.x.toFixed(e)}, ${i.y.toFixed(e)}, ${i.z.toFixed(e)})`}function Yg(i,e){return{x:i.x-e.x,y:i.y-e.y,z:i.z-e.z}}function qg(i){return Math.hypot(i.x,i.y,i.z)}async function Jg(){if(!Re){Ht.textContent="Connect the tracker first.";return}vo.disabled=!0;const i=Ti(),e=i,t={tl:{x:e.tl.x*2,y:e.tl.y*2,z:e.tl.z+500},tr:{x:e.tr.x*2,y:e.tr.y*2,z:e.tr.z+500},bl:{x:e.bl.x*2,y:e.bl.y*2,z:e.bl.z+500}},n=()=>({eyeL:[],eyeR:[],dirL:[],dirR:[],gp3L:[],gp3R:[],gp2:[]});async function r(s,a){return new Promise(o=>{const c=performance.now()+s,l=Re.subscribeToGaze(h=>{h.validity_L!==0&&h.validity_R!==0||(h.eye_origin_L_mm&&a.eyeL.push(h.eye_origin_L_mm),h.eye_origin_R_mm&&a.eyeR.push(h.eye_origin_R_mm),h.trackbox_eye_pos_L&&a.dirL.push(h.trackbox_eye_pos_L),h.trackbox_eye_pos_R&&a.dirR.push(h.trackbox_eye_pos_R),h.gaze_point_3d_L_mm&&a.gp3L.push(h.gaze_point_3d_L_mm),h.gaze_point_3d_R_mm&&a.gp3R.push(h.gaze_point_3d_R_mm),h.gaze_point_2d_norm&&a.gp2.push({x:h.gaze_point_2d_norm.x,y:h.gaze_point_2d_norm.y,z:0}),performance.now()>=c&&(l(),o()))})})}try{Ht.textContent="Hold still, look at one point. Phase A (3s)…",await Re.setDisplayAreaCorners(e),await new Promise(l=>setTimeout(l,400));const s=n();await r(3e3,s),Ht.textContent="Keep holding still. Switching plane… Phase B (3s)…",await Re.setDisplayAreaCorners(t),await new Promise(l=>setTimeout(l,400));const a=n();await r(3e3,a),await Re.setDisplayAreaCorners(i);const o=[],c=(l,h,A)=>{const u=ac(h),p=ac(A),m=Yg(p.mean,u.mean);o.push(`${l}`),o.push(`  A mean=${An(u.mean)} std=${An(u.std)} n=${u.n}`),o.push(`  B mean=${An(p.mean)} std=${An(p.std)} n=${p.n}`),o.push(`  Δmean=${An(m)} |Δ|=${qg(m).toFixed(3)}`)};o.push(`A1 corners: tl=${An(e.tl,0)} tr=${An(e.tr,0)} bl=${An(e.bl,0)}`),o.push(`A2 corners: tl=${An(t.tl,0)} tr=${An(t.tr,0)} bl=${An(t.bl,0)}`),o.push(""),c("eye_origin_L_mm (tracker frame?)",s.eyeL,a.eyeL),c("eye_origin_R_mm (tracker frame?)",s.eyeR,a.eyeR),c("trackbox_eye_pos_L",s.dirL,a.dirL),c("trackbox_eye_pos_R",s.dirR,a.dirR),c("gaze_point_3d_L_mm",s.gp3L,a.gp3L),c("gaze_point_3d_R_mm",s.gp3R,a.gp3R),c("gaze_point_2d_norm (CONTROL)",s.gp2,a.gp2),o.push(""),o.push("Interpretation:"),o.push("  |Δ| ~ std → invariant (tracker frame)."),o.push("  |Δ| ≫ std → display-dependent."),Ht.textContent=o.join(`
`)}catch(s){Ht.textContent=`diagnostic failed: ${s instanceof Error?s.message:String(s)}`;try{await Re.setDisplayAreaCorners(i)}catch{}}finally{vo.disabled=!1}}vo.addEventListener("click",()=>{Jg()});const oc=(i,e)=>({x:i.x+e.x,y:i.y+e.y,z:i.z+e.z});function Kg(){if(document.fullscreenElement)return{x0:0,y0:0,x1:1,y1:1};const i=window.outerWidth,e=window.outerHeight,t=window.innerWidth,n=window.innerHeight,r=window.screenLeft??window.screenX,s=window.screenTop??window.screenY,a=Oo?.currentScreen,o=a?.width??window.screen.width,c=a?.height??window.screen.height,l=a?.availLeft??0,h=a?.availTop??0,A=e-n,u=(i-t)/2,p=r-l+u,m=s-h+A;return{x0:p/o,y0:m/c,x1:(p+t)/o,y1:(m+n)/c}}async function lu(){const i=window;if(typeof i.getScreenDetails!="function"){console.warn("Window Management API not available; viewport position will be inaccurate.");return}try{Oo=await i.getScreenDetails(),Lr()}catch(e){console.warn("getScreenDetails() rejected:",e)}}function lc(i,e){const[t,n,r,s,a,o,c,l,h]=i,[A,u,p]=e,m=t*(a*h-o*l)-n*(s*h-o*c)+r*(s*l-a*c);if(Math.abs(m)<1e-9)return null;const E=1/m,f=E*(A*(a*h-o*l)-n*(u*h-o*p)+r*(u*l-a*p)),d=E*(t*(u*h-o*p)-A*(s*h-o*c)+r*(s*p-u*c)),v=E*(t*(a*p-u*l)-n*(s*p-u*c)+A*(s*l-a*c));return[f,d,v]}function $g(i,e){const t=i.length;if(t<5||e.length!==t)return null;const n=9+t,r=new Float64Array(n*n),s=new Float64Array(n),a=(u,p)=>{for(let m=0;m<n;m++){const E=u[m];if(E!==0){s[m]=s[m]+E*p;for(let f=0;f<n;f++){const d=u[f];d!==0&&(r[m*n+f]=r[m*n+f]+E*d)}}}};for(let u=0;u<t;u++){const{nx:p,ny:m}=i[u],{O:E,d:f}=e[u],d=["x","y","z"];for(let v=0;v<3;v++){const M=new Array(n).fill(0);M[v]=1,M[3+v]=p,M[6+v]=m,M[9+u]=-f[d[v]],a(M,E[d[v]])}}const o=new Float64Array(n*(n+1));for(let u=0;u<n;u++){for(let p=0;p<n;p++)o[u*(n+1)+p]=r[u*n+p];o[u*(n+1)+n]=s[u]}for(let u=0;u<n;u++){let p=u,m=Math.abs(o[u*(n+1)+u]);for(let f=u+1;f<n;f++){const d=Math.abs(o[f*(n+1)+u]);d>m&&(m=d,p=f)}if(m<1e-9)return null;if(p!==u)for(let f=0;f<=n;f++){const d=o[u*(n+1)+f];o[u*(n+1)+f]=o[p*(n+1)+f],o[p*(n+1)+f]=d}const E=1/o[u*(n+1)+u];for(let f=0;f<n;f++){if(f===u)continue;const d=o[f*(n+1)+u]*E;if(d!==0)for(let v=u;v<=n;v++)o[f*(n+1)+v]=o[f*(n+1)+v]-d*o[u*(n+1)+v]}}const c=new Array(n);for(let u=0;u<n;u++)c[u]=o[u*(n+1)+n]/o[u*(n+1)+u];const l={x:c[0],y:c[1],z:c[2]},h={x:c[3],y:c[4],z:c[5]},A={x:c[6],y:c[7],z:c[8]};for(let u=0;u<t;u++)if(c[9+u]<=0)return null;return{tl:l,tr:oc(l,h),bl:oc(l,A)}}function cu(i){const e=n=>n&&{x:n.x,y:n.y},t=n=>n&&{x:n.x,y:n.y,z:n.z};return{validity_L:i.validity_L,validity_R:i.validity_R,pupil_diameter_L_mm:i.pupil_diameter_L_mm,pupil_diameter_R_mm:i.pupil_diameter_R_mm,eye_origin_L_mm:t(i.eye_origin_L_mm),eye_origin_R_mm:t(i.eye_origin_R_mm),eye_origin_raw_L_mm:t(i.eye_origin_raw_L_mm),eye_origin_raw_R_mm:t(i.eye_origin_raw_R_mm),eye_origin_L_display_mm:t(i.eye_origin_L_display_mm),eye_origin_R_display_mm:t(i.eye_origin_R_display_mm),trackbox_eye_pos_L:t(i.trackbox_eye_pos_L),trackbox_eye_pos_R:t(i.trackbox_eye_pos_R),trackbox_eye_pos_L_display:t(i.trackbox_eye_pos_L_display),trackbox_eye_pos_R_display:t(i.trackbox_eye_pos_R_display),gaze_point_3d_L_mm:t(i.gaze_point_3d_L_mm),gaze_point_3d_R_mm:t(i.gaze_point_3d_R_mm),gaze_point_2d_norm:e(i.gaze_point_2d_norm),gaze_point_2d_L_norm:e(i.gaze_point_2d_L_norm),gaze_point_2d_R_norm:e(i.gaze_point_2d_R_norm),gaze_point_2d_unfiltered:e(i.gaze_point_2d_unfiltered)}}let mn=!1;async function Zg(){if(!Re||mn)return;mn=!0,Sr.disabled=!0;const i=Ti(),e={tl:{x:-500,y:500,z:0},tr:{x:500,y:500,z:0},bl:{x:-500,y:0,z:0}};try{document.fullscreenElement||await document.documentElement.requestFullscreen()}catch(m){qe.textContent=`Could not enter fullscreen: ${m instanceof Error?m.message:String(m)}`,mn=!1,Sr.disabled=!1;return}try{await Re.setDisplayAreaCorners(e)}catch(m){if(qe.textContent=`Could not set collection plane: ${m instanceof Error?m.message:String(m)}`,document.fullscreenElement)try{await document.exitFullscreen()}catch{}mn=!1,Sr.disabled=!1;return}Vt(e),He.classList.add("active"),He.style.cursor="crosshair",St.style.display="none";const t=performance.now(),n=[];let r=window.innerWidth/2,s=window.innerHeight/2,a=!1,o=null;const c=m=>{r=m.clientX,s=m.clientY},l=m=>{m.button===0&&(a=!0)},h=m=>{m.button===0&&(a=!1)},A=m=>{m.key==="Enter"?o="finish":m.key==="Escape"&&(o="cancel")};He.addEventListener("pointermove",c),He.addEventListener("pointerdown",l),He.addEventListener("pointerup",h),window.addEventListener("keydown",A);const u=Re.subscribeToGaze(m=>{if(!a)return;const E=window.innerWidth,f=window.innerHeight;n.push({t_ms:performance.now()-t,cursor_norm:[r/E,s/f],cursor_px:[r,s],sample:cu(m)})}),p=setInterval(()=>{const m=a?" · HOLDING":"";qe.textContent=`Hold mouse button while looking at cursor · ${n.length} samples${m} · Enter: download · Esc: cancel`},100);await new Promise(m=>{const E=setInterval(()=>{o&&(clearInterval(E),m())},50)}),clearInterval(p),u(),He.removeEventListener("pointermove",c),He.removeEventListener("pointerdown",l),He.removeEventListener("pointerup",h),window.removeEventListener("keydown",A),He.classList.remove("active"),He.style.cursor="",St.style.display="";try{await Re.setDisplayAreaCorners(i)}catch{}if(Vt(i),document.fullscreenElement)try{await document.exitFullscreen()}catch{}if(o==="finish"&&n.length>0){const m={version:1,captured_at:new Date().toISOString(),user_agent:navigator.userAgent,viewport_px:[window.innerWidth,window.innerHeight],display_area_used:e,prior_display_area:i,samples:n},E=new Blob([JSON.stringify(m,null,2)],{type:"application/json"}),f=URL.createObjectURL(E),d=document.createElement("a"),v=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19);d.href=f,d.download=`gaze-samples-${v}.json`,document.body.appendChild(d),d.click(),document.body.removeChild(d),URL.revokeObjectURL(f),qe.textContent=`Downloaded ${n.length} samples`}else o==="cancel"?qe.textContent="Collection cancelled":qe.textContent="No samples collected";mn=!1,Sr.disabled=!1}function cc(i){let e=0,t=0,n=0,r=0,s=0,a=0,o=0,c=0,l=0,h=0,A=0,u=0;for(const d of i)e+=d.cx*d.cx,t+=d.cx*d.cy,n+=d.cx,r+=d.cy*d.cy,s+=d.cy,a+=1,o+=d.cx*d.gx,c+=d.cy*d.gx,l+=d.gx,h+=d.cx*d.gy,A+=d.cy*d.gy,u+=d.gy;const p=[e,t,n,t,r,s,n,s,a],m=lc(p,[o,c,l]),E=lc(p,[h,A,u]);if(!m||!E)return null;let f=0;for(const d of i){const v=m[0]*d.cx+m[1]*d.cy+m[2]-d.gx,M=E[0]*d.cx+E[1]*d.cy+E[2]-d.gy;f+=v*v+M*M}return{ax:m,ay:E,rmse:Math.sqrt(f/i.length)}}function qi(i,e,t,n){const r=i.ax[0]*e+i.ax[1]*t+i.ax[2],s=i.ay[0]*e+i.ay[1]*t+i.ay[2],a=n.tr.x-n.tl.x,o=n.tr.y-n.tl.y,c=n.tr.z-n.tl.z,l=n.bl.x-n.tl.x,h=n.bl.y-n.tl.y,A=n.bl.z-n.tl.z;return{x:n.tl.x+r*a+s*l,y:n.tl.y+r*o+s*h,z:n.tl.z+r*c+s*A}}function uu(i,e,t){const n=i.filter(_=>_.sample.validity_L===0&&_.sample.validity_R===0),r=[];let s=null,a=0;for(const _ of n)_.plane!==s&&(s=_.plane,a=_.t_ms),_.t_ms-a>=150&&r.push(_);const o=_=>_.filter(y=>y.sample.gaze_point_2d_norm!=null).map(y=>({cx:y.cursor_norm[0],cy:y.cursor_norm[1],gx:y.sample.gaze_point_2d_norm.x,gy:y.sample.gaze_point_2d_norm.y})),c=o(r.filter(_=>_.plane==="A")),l=o(r.filter(_=>_.plane==="B"));if(c.length<10||l.length<10)return null;const h=cc(c),A=cc(l);if(!h||!A)return null;const u=.85,p=(_,y)=>({x:_.x+u*(y.x-_.x),y:_.y+u*(y.y-_.y),z:_.z+u*(y.z-_.z)}),m=p(qi(h,0,0,e),qi(A,0,0,t)),E=p(qi(h,1,0,e),qi(A,1,0,t)),f=p(qi(h,0,1,e),qi(A,0,1,t)),d={tl:m,tr:E,bl:f},v={x:E.x-m.x,y:E.y-m.y,z:E.z-m.z},M={x:f.x-m.x,y:f.y-m.y,z:f.z-m.z},S=Math.hypot(v.x,v.y,v.z),b=Math.hypot(M.x,M.y,M.z),w=v.x*M.x+v.y*M.y+v.z*M.z,T=Math.acos(Math.max(-1,Math.min(1,w/(S*b))))*180/Math.PI;return{area:d,nA:c.length,nB:l.length,rmseA:h.rmse,rmseB:A.rmse,width_mm:S,height_mm:b,uv_angle_deg:T}}async function jg(){if(!Re||mn)return;mn=!0,Cr.disabled=!0;const i=Ti(),e={tl:{x:-500,y:500,z:0},tr:{x:500,y:500,z:0},bl:{x:-500,y:0,z:0}},t={tl:{x:-500,y:500,z:300},tr:{x:500,y:500,z:300},bl:{x:-500,y:0,z:300}};try{document.fullscreenElement||await document.documentElement.requestFullscreen()}catch(d){qe.textContent=`Could not enter fullscreen: ${d instanceof Error?d.message:String(d)}`,mn=!1,Cr.disabled=!1;return}try{await Re.setDisplayAreaCorners(e)}catch(d){if(qe.textContent=`Could not set plane A: ${d instanceof Error?d.message:String(d)}`,document.fullscreenElement)try{await document.exitFullscreen()}catch{}mn=!1,Cr.disabled=!1;return}Vt(e),He.classList.add("active"),He.style.cursor="none",St.style.display="none";const n=performance.now(),r=[];let s=window.innerWidth/2,a=window.innerHeight/2,o=!1,c=null,l="A";Ei.style.left=`${s}px`,Ei.style.top=`${a}px`,Ei.style.display="block";const h=d=>{s=d.clientX,a=d.clientY,Ei.style.left=`${s}px`,Ei.style.top=`${a}px`},A=d=>{d.button===0&&(o=!0)},u=d=>{d.button===0&&(o=!1)},p=d=>{d.key==="Enter"?c="finish":d.key==="Escape"&&(c="cancel")};He.addEventListener("pointermove",h),He.addEventListener("pointerdown",A),He.addEventListener("pointerup",u),window.addEventListener("keydown",p);const m=Re.subscribeToGaze(d=>{if(!o)return;const v=window.innerWidth,M=window.innerHeight;r.push({t_ms:performance.now()-n,cursor_norm:[s/v,a/M],cursor_px:[s,a],plane:l,sample:cu(d)})}),E=setInterval(async()=>{l=l==="A"?"B":"A";try{await Re.setDisplayAreaCorners(l==="A"?e:t)}catch{}},1e3),f=setInterval(()=>{const d=r.filter(b=>b.plane==="A"&&b.sample.validity_L===0&&b.sample.validity_R===0).length,v=r.filter(b=>b.plane==="B"&&b.sample.validity_L===0&&b.sample.validity_R===0).length,M=new Set;for(const b of r){if(b.sample.validity_L!==0||b.sample.validity_R!==0)continue;const w=Math.floor(b.cursor_norm[0]*12),T=Math.floor(b.cursor_norm[1]*12);M.add(`${w},${T}`)}const S=o?" · HOLDING":"";qe.textContent=`Hold button + look at cursor · plane ${l} · valid A=${d} B=${v} · cells=${M.size}${S} · Enter: stop · Esc: cancel`},100);if(await new Promise(d=>{const v=setInterval(()=>{c&&(clearInterval(v),d())},50)}),clearInterval(E),clearInterval(f),m(),He.removeEventListener("pointermove",h),He.removeEventListener("pointerdown",A),He.removeEventListener("pointerup",u),window.removeEventListener("keydown",p),He.classList.remove("active"),He.style.cursor="",St.style.display="",Ei.style.display="none",document.fullscreenElement)try{await document.exitFullscreen()}catch{}if(c==="finish"&&r.length>0){const d={version:2,captured_at:new Date().toISOString(),user_agent:navigator.userAgent,viewport_px:[window.innerWidth,window.innerHeight],plane_A:e,plane_B:t,prior_display_area:i,samples:r},v=new Blob([JSON.stringify(d,null,2)],{type:"application/json"}),M=URL.createObjectURL(v),S=document.createElement("a"),b=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19);S.href=M,S.download=`gaze-samples-2plane-${b}.json`,document.body.appendChild(S),S.click(),document.body.removeChild(S),URL.revokeObjectURL(M);const w=uu(r,e,t),T=w&&(w.uv_angle_deg<70||w.uv_angle_deg>110),_=w?`Fit: ${w.width_mm.toFixed(0)}×${w.height_mm.toFixed(0)}mm · angle=${w.uv_angle_deg.toFixed(1)}° · affine RMSE A=${(w.rmseA*1e3).toFixed(0)} B=${(w.rmseB*1e3).toFixed(0)} milli-norm · n=${w.nA}/${w.nB}`+(T?" — SUSPECT":""):`Fit failed (not enough valid samples; got ${r.length})`;if(console.log("[2-plane fit]",w),qe.textContent=`${_} · downloaded samples`,(w?window.confirm(`${_}

${T?`⚠ Fit looks bad — cursor error or plane skew is out of range. Applying will likely make gaze wildly wrong.

`:""}Apply this display_area to the device?

tl=(${w.area.tl.x.toFixed(0)}, ${w.area.tl.y.toFixed(0)}, ${w.area.tl.z.toFixed(0)})
tr=(${w.area.tr.x.toFixed(0)}, ${w.area.tr.y.toFixed(0)}, ${w.area.tr.z.toFixed(0)})
bl=(${w.area.bl.x.toFixed(0)}, ${w.area.bl.y.toFixed(0)}, ${w.area.bl.z.toFixed(0)})

Raw samples already downloaded.
Cancel to restore the prior display_area.`):!1)&&w)try{await Re.setDisplayAreaCorners(w.area),Vt(w.area),qe.textContent=`Applied fit. ${_} · downloaded samples`}catch(W){qe.textContent=`Apply failed: ${W instanceof Error?W.message:String(W)}. Restoring prior.`;try{await Re.setDisplayAreaCorners(i)}catch{}Vt(i)}else{try{await Re.setDisplayAreaCorners(i)}catch{}Vt(i)}}else if(c==="cancel"){try{await Re.setDisplayAreaCorners(i)}catch{}Vt(i),qe.textContent="Collection cancelled"}else{try{await Re.setDisplayAreaCorners(i)}catch{}Vt(i),qe.textContent="No samples collected"}mn=!1,Cr.disabled=!1}let Gn=!1,Cn=null;async function e_(){if(!Re||Gn)return;Gn=!0,Ci.disabled=!0;const i=Ti(),e=[],t=[];try{document.fullscreenElement||await document.documentElement.requestFullscreen()}catch(a){qe.textContent=`Could not enter fullscreen: ${a instanceof Error?a.message:String(a)}`,Gn=!1,Ci.disabled=!1;return}He.classList.add("active"),He.style.cursor="crosshair",St.style.display="none",St.classList.remove("capturing");let n=!1,r=!1;const s=a=>{a.key==="Escape"?(n=!0,Cn?.()):a.key==="Enter"&&(r=!0,Cn?.())};window.addEventListener("keydown",s);try{let a=0;for(;!n;){const h=5,A=t.length>=h;qe.textContent=A?`Look at cursor · click to add (${t.length} captured) · Enter to finish · Esc to cancel`:`Look at cursor · click to add (${t.length}/${h}) · Esc to cancel`;const u=await new Promise(W=>{const I=H=>{G(),W({x:H.clientX,y:H.clientY})},Q=()=>{G(),W(null)},G=()=>{He.removeEventListener("click",I),Cn=null};He.addEventListener("click",I,{once:!0}),Cn=Q});if(n||r||u==null)break;const p=u.x/window.innerWidth,m=u.y/window.innerHeight;a++,St.style.left=`${u.x}px`,St.style.top=`${u.y}px`,St.style.display="",St.offsetWidth,St.classList.add("capturing"),He.classList.add("capturing"),qe.textContent=`Capturing sample ${a} (plane A)…`,await Re.setDisplayAreaCorners(i),await new Promise(W=>setTimeout(W,350));const E=async W=>{qe.textContent=`Capturing sample ${a} (${W})…`;const I={x:0,y:0,z:0};let Q=0;return await new Promise(G=>{const H=performance.now()+900,z=Re.subscribeToGaze(k=>{k.validity_L!==0||k.validity_R!==0||!k.gaze_point_3d_L_mm||!k.gaze_point_3d_R_mm||(I.x+=(k.gaze_point_3d_L_mm.x+k.gaze_point_3d_R_mm.x)*.5,I.y+=(k.gaze_point_3d_L_mm.y+k.gaze_point_3d_R_mm.y)*.5,I.z+=(k.gaze_point_3d_L_mm.z+k.gaze_point_3d_R_mm.z)*.5,Q++,performance.now()>=H&&(z(),G()))});Cn=()=>{z(),G()}}),Q<8?null:{x:I.x/Q,y:I.y/Q,z:I.z/Q}},f=await E("plane A");if(n)break;const d=(()=>{const W=i.tr.x-i.tl.x,I=i.tr.y-i.tl.y,Q=i.tr.z-i.tl.z,G=i.bl.x-i.tl.x,H=i.bl.y-i.tl.y,z=i.bl.z-i.tl.z;let k=I*z-Q*H,U=Q*G-W*z,j=W*H-I*G;j>0&&(k=-k,U=-U,j=-j);const Z=Math.hypot(k,U,j)||1;return{x:k/Z,y:U/Z,z:j/Z}})(),v=120,M={tl:{x:i.tl.x+d.x*v,y:i.tl.y+d.y*v,z:i.tl.z+d.z*v},tr:{x:i.tr.x+d.x*v,y:i.tr.y+d.y*v,z:i.tr.z+d.z*v},bl:{x:i.bl.x+d.x*v,y:i.bl.y+d.y*v,z:i.bl.z+d.z*v}};await Re.setDisplayAreaCorners(M),await new Promise(W=>setTimeout(W,350));const S=await E("plane B");if(n)break;if(await Re.setDisplayAreaCorners(i),!f||!S){qe.textContent="Not enough samples — click again",St.classList.remove("capturing"),St.style.display="none",He.classList.remove("capturing"),a--;continue}const b=S.x-f.x,w=S.y-f.y,T=S.z-f.z,_=Math.hypot(b,w,T);if(_<1){qe.textContent="Plane shift produced no ray — click again",St.classList.remove("capturing"),St.style.display="none",He.classList.remove("capturing"),a--;continue}const y={x:b/_,y:w/_,z:T/_};e.push({O:f,d:y}),t.push({nx:p,ny:m}),St.classList.remove("capturing"),St.style.display="none",He.classList.remove("capturing")}if(n){qe.textContent="Cancelled";return}if(t.length<5){qe.textContent="Not enough samples (need 5)";return}const o=$g(t,e);if(!o){qe.textContent="Fit degenerate";return}console.log("[cal] origArea:",i),console.log("[cal] fit:",o);for(let h=0;h<e.length;h++){const A=e[h],u=t[h];console.log(`[cal] ray ${h} target=(${u.nx},${u.ny})`,`Wa=(${A.O.x.toFixed(1)},${A.O.y.toFixed(1)},${A.O.z.toFixed(1)})`,`d=(${A.d.x.toFixed(3)},${A.d.y.toFixed(3)},${A.d.z.toFixed(3)})`)}let c=0;for(let h=0;h<t.length;h++){const A=t[h],u=e[h],p={x:o.tl.x+A.nx*(o.tr.x-o.tl.x)+A.ny*(o.bl.x-o.tl.x),y:o.tl.y+A.nx*(o.tr.y-o.tl.y)+A.ny*(o.bl.y-o.tl.y),z:o.tl.z+A.nx*(o.tr.z-o.tl.z)+A.ny*(o.bl.z-o.tl.z)},m=p.x-u.O.x,E=p.y-u.O.y,f=p.z-u.O.z,d=E*u.d.z-f*u.d.y,v=f*u.d.x-m*u.d.z,M=m*u.d.y-E*u.d.x;c+=d*d+v*v+M*M}const l=Math.sqrt(c/t.length);qe.textContent=`Calibrated · residual ${l.toFixed(1)} mm · applying…`,Yn.checked&&(Yn.checked=!1,Vo(),Wo()),Vt(o),await Re.setDisplayAreaCorners(o),qe.textContent=`Calibrated · residual ${l.toFixed(1)} mm · done`,await new Promise(h=>setTimeout(h,800))}catch(a){qe.textContent=`Error: ${a instanceof Error?a.message:String(a)}`,await new Promise(o=>setTimeout(o,1500));try{await Re.setDisplayAreaCorners(i)}catch{}}finally{if(window.removeEventListener("keydown",s),He.classList.remove("active","capturing"),He.style.cursor="",St.style.display="",St.classList.remove("capturing"),document.fullscreenElement)try{await document.exitFullscreen()}catch{}Gn=!1,Cn=null,Ci.disabled=!1}}function t_(i){if(i===5)return[[.5,.5],[.04,.04],[1-.04,.04],[.04,1-.04],[1-.04,1-.04]];if(i===9){const r=[[.5,.5]];for(const s of[.04,.5,1-.04])for(const a of[.04,.5,1-.04])(a!==.5||s!==.5)&&r.push([a,s]);return r}const t=[[.5,.5]],n=[.04,.04+(1-2*.04)/3,1-.04-(1-2*.04)/3,1-.04];for(const r of n)for(const s of n)(s!==.5||r!==.5)&&t.push([s,r]);return t}async function n_(){if(!Re||Gn)return;Gn=!0,Ms.disabled=!0,Ci.disabled=!0;try{document.fullscreenElement||await document.documentElement.requestFullscreen()}catch(t){qe.textContent=`Fullscreen failed: ${t instanceof Error?t.message:String(t)}`,Gn=!1,Ms.disabled=!1,Ci.disabled=!1;return}He.classList.add("active"),He.style.cursor="crosshair",St.style.display="none",Ei.style.display="none",Mn.style.display="none";let i=!1;const e=t=>{t.key==="Escape"&&(i=!0,Cn?.())};window.addEventListener("keydown",e);try{qe.textContent="Ajustando área de pantalla…";const r_={tl:{x:-500,y:500,z:0},tr:{x:500,y:500,z:0},bl:{x:-500,y:0,z:0}};await Re.setDisplayAreaCorners(r_),Vt(r_),qe.textContent="Starting calibration…",await Re.startCalibration();const t=t_(Number(Tg.value)),n=t.length;for(let a=0;a<n&&!i;a++){const[o,c]=t[a],l=o*window.innerWidth,h=c*window.innerHeight;Mn.style.left=`${l}px`,Mn.style.top=`${h}px`,Mn.style.display="block",Mn.classList.remove("collecting"),qe.textContent=`Point ${a+1}/${n} — look at the dot, then click to capture · Esc to cancel`;const A=await new Promise(u=>{const p=()=>{E(),u(!0)},m=()=>{E(),u(!1)},E=()=>{He.removeEventListener("click",p),Cn=null};He.addEventListener("click",p,{once:!0}),Cn=m});if(i||!A)break;He.style.cursor="none",Mn.classList.add("collecting"),qe.textContent=`Point ${a+1}/${n} — hold your gaze…`;try{await Re.addCalibrationPoint(o,c)}catch(u){console.warn(`addCalibrationPoint(${o}, ${c}) failed:`,u),qe.textContent=`Point ${a+1} failed — ${u instanceof Error?u.message:String(u)}`,await new Promise(p=>setTimeout(p,1500))}Mn.classList.remove("collecting"),He.style.cursor="crosshair"}if(Mn.style.display="none",i){qe.textContent="Cancelled";return}qe.textContent="Computing calibration…";const r=await Re.finishCalibration(),s=btoa(String.fromCharCode(...r));localStorage.setItem("tobii_onboard_cal",s),console.log(`[onboard-cal] stored ${r.byteLength}B calibration blob`),qe.textContent=`Calibration complete · ${r.byteLength} bytes stored`,await new Promise(a=>setTimeout(a,1500))}catch(t){qe.textContent=`Error: ${t instanceof Error?t.message:String(t)}`,console.error("[onboard-cal]",t),await new Promise(n=>setTimeout(n,2e3))}finally{if(window.removeEventListener("keydown",e),He.classList.remove("active","capturing"),He.style.cursor="",Mn.style.display="none",Mn.classList.remove("collecting"),document.fullscreenElement)try{await document.exitFullscreen()}catch{}Gn=!1,Cn=null,Ms.disabled=!1,Ci.disabled=!1}}Ms.addEventListener("click",()=>{n_()});Ci.addEventListener("click",()=>{e_()});Sr.addEventListener("click",()=>{Zg()});Cr.addEventListener("click",()=>{jg()});function uc(i){if(!i||typeof i!="object")return!1;const e=i,t=n=>!!n&&typeof n=="object"&&"x"in n&&"y"in n&&"z"in n;return t(e.tl)&&t(e.tr)&&t(e.bl)}async function wa(i,e){if(!Re)return;const t=n=>`(${n.x.toFixed(0)}, ${n.y.toFixed(0)}, ${n.z.toFixed(0)})`;try{await Re.setDisplayAreaCorners(i),Vt(i),Ht.textContent=`${e}: tl=${t(i.tl)} tr=${t(i.tr)} bl=${t(i.bl)}`}catch(n){Ht.textContent=`Apply failed: ${n instanceof Error?n.message:String(n)}`}}wg.addEventListener("click",()=>{const i=document.createElement("input");i.type="file",i.accept=".json",i.addEventListener("change",async()=>{const e=i.files?.[0];if(e)try{const t=await e.text(),n=JSON.parse(t);if(uc(n)){await wa(n,"Applied display area");return}const r=n.prior_display_area??n.display_area_used;if(uc(r)){await wa(r,`Applied from ${e.name}`);return}const s=n;if(s.version===2&&Array.isArray(s.samples)){const a=uu(s.samples,s.plane_A,s.plane_B);if(!a){Ht.textContent=`Fit failed from ${e.name} (not enough valid samples).`;return}const o=`${e.name}: ${a.width_mm.toFixed(0)}×${a.height_mm.toFixed(0)}mm · angle=${a.uv_angle_deg.toFixed(1)}° · affine RMSE A=${(a.rmseA*1e3).toFixed(0)} B=${(a.rmseB*1e3).toFixed(0)} · n=${a.nA}/${a.nB}`;console.log("[load fit]",a),window.confirm(`${o}

Apply this display_area?`)&&await wa(a.area,o);return}Ht.textContent="Unrecognized file — expected display area, dataset, or 2-plane samples."}catch(t){Ht.textContent=`Load failed: ${t instanceof Error?t.message:String(t)}`}}),i.click()});rc.addEventListener("click",()=>{const i=document.createElement("input");i.type="file",i.accept=".json",i.addEventListener("change",async()=>{const e=i.files?.[0];if(e)try{const t=await e.text(),n=JSON.parse(t);if(!n.featureNames||!n.weights||!n.inputMean||!n.inputStd){Ht.textContent="Not a valid gaze model file.";return}Ss=n,Ht.textContent=`Model loaded: ${n.featureNames.length} features, poly${n.polyDegree}, ${n.weights.length} weights`,rc.textContent="Model loaded"}catch(t){Ht.textContent=`Model load failed: ${t instanceof Error?t.message:String(t)}`}}),i.click()});bg.addEventListener("click",async()=>{if(!Re)return;const i={tl:{x:-500,y:500,z:0},tr:{x:500,y:500,z:0},bl:{x:-500,y:0,z:0}};try{await Re.setDisplayAreaCorners(i),Vt(i),Ht.textContent="Set big plane (1000x500mm @ z=0) — matches collection mode"}catch(e){Ht.textContent=`Failed: ${e instanceof Error?e.message:String(e)}`}});Ig.addEventListener("click",()=>{lu()});Zc.addEventListener("click",async()=>{try{document.fullscreenElement?await document.exitFullscreen():await document.documentElement.requestFullscreen()}catch(i){console.warn("fullscreen toggle failed:",i)}});document.addEventListener("fullscreenchange",()=>{Zc.textContent=document.fullscreenElement?"Exit fullscreen":"Fullscreen",Lr()});kt.onclick=nu;async function i_(){if(bi.value==="usb"&&!(typeof navigator>"u"||!("usb"in navigator)))try{const e=(await navigator.usb.getDevices()).find(t=>t.vendorId===8452&&t.productId===787);e&&await zo(e)}catch(i){console.warn("auto-connect failed",i)}}typeof navigator<"u"&&"usb"in navigator&&(navigator.usb.addEventListener("connect",i=>{const e=i.device;Re||bi.value!=="usb"||e.vendorId===8452&&e.productId===787&&zo(e)}),navigator.usb.addEventListener("disconnect",i=>{const e=i.device;Re&&e.vendorId===8452&&e.productId===787&&ru()}));i_();
