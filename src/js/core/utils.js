/**
 * Utility Functions
 * Number formatting, ticks, equations
 */

// ── Utilities ────────────────────────────────────────────────────────
const clamp = (v,a,b) => Math.max(a,Math.min(b,v));

function niceTicks(lo,hi,n){
  const r = hi - lo;
  if(r===0) return [lo];
  const raw = r/n;
  const mag = Math.pow(10,Math.floor(Math.log10(raw)));
  const norm = raw/mag;
  const step = norm<1.5?1:norm<3?2:norm<7?5:10;
  const s = step*mag;
  const first = Math.ceil(lo/s)*s;
  const ticks = [];
  for(let t=first;t<=hi+1e-9;t+=s) ticks.push(parseFloat(t.toFixed(10)));
  return ticks;
}

function fmtN(v,dp=4){
  if(!isFinite(v)) return '—';
  const a = Math.abs(v);
  if(a>1e6 || (a<0.001 && a!==0)) return v.toExponential(2);
  return v.toFixed(dp).replace(/\.?0+$/,'');
}

function fmtAxis(v){
  if(v===0) return '0';
  const a=Math.abs(v);
  if(a>=1000) return v.toExponential(1);
  if(a<0.01) return v.toExponential(1);
  return v%1===0?v.toString():v.toFixed(2).replace(/\.?0+$/,'');
}

function linEq(m,b){
  if(!isFinite(m)||!isFinite(b)) return '—';
  const ms = Math.abs(m)<1e-9?'':
    Math.abs(m-1)<1e-9?'x':
    Math.abs(m+1)<1e-9?'−x':
    fmtN(m,3)+'x';
  const bs = Math.abs(b)<1e-9?'':
    b>0?(ms?` + ${fmtN(b,3)}`:fmtN(b,3)):
    ` − ${fmtN(Math.abs(b),3)}`;
  if(!ms&&!bs) return 'y = 0';
  return `y = ${ms}${bs}`;
}

function kappa(dy,d2y){
  // κ = |f″| / (1 + f′²)^(3/2)
  return Math.abs(d2y) / Math.pow(1+dy*dy, 1.5);
}
