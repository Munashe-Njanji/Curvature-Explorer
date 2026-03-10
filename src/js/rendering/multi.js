/**
 * Multi-Function Rendering
 * Plot 2-3 functions simultaneously with different colors
 */

// Function colors for multi-plot
const MULTI_COLORS = [
  { hue: 210, name: 'blue' },
  { hue: 330, name: 'pink' },
  { hue: 150, name: 'green' }
];

function getMultiColor(index, theme) {
  const color = MULTI_COLORS[index % MULTI_COLORS.length];
  const lightness = theme === 'light' ? 45 : 58;
  return {
    hue: color.hue,
    hsl: `hsl(${color.hue},88%,${lightness}%)`,
    hslBright: `hsl(${color.hue},88%,${lightness + 10}%)`,
    hslDim: `hsl(${color.hue},88%,${lightness - 10}%)`,
    hslBg: `hsl(${color.hue},88%,${lightness}%,0.1)`,
    hslBorder: `hsl(${color.hue},88%,${lightness}%,0.3)`,
    name: color.name
  };
}

// Build static layer for multi-function view
function buildStaticMulti(W, H, dpr) {
  const oc = document.createElement('canvas');
  oc.width = Math.round(W * dpr);
  oc.height = Math.round(H * dpr);
  const oct = oc.getContext('2d');
  oct.setTransform(dpr, 0, 0, dpr, 0, 0);

  // Use first function's domain for coordinate system
  const fn = S.multiFns[0] || S.fn;
  S.coord = makeCoord(fn, W, H);
  const c = S.coord;

  // Get theme colors
  const styles = getComputedStyle(document.documentElement);
  const bgColor = styles.getPropertyValue('--surface').trim();
  const gridColor = S.currentTheme === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.035)';
  const axisColor = S.currentTheme === 'light' ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.18)';
  const textColor = S.currentTheme === 'light' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.28)';
  const textMuted = S.currentTheme === 'light' ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.18)';

  // Background
  oct.fillStyle = bgColor;
  oct.fillRect(0, 0, W, H);

  // Grid
  oct.save();
  oct.strokeStyle = gridColor;
  oct.lineWidth = 0.6;
  for (const x of niceTicks(c.xmin, c.xmax, 8)) {
    const [px] = c.toS(x, 0);
    oct.beginPath();
    oct.moveTo(px, c.pad.t);
    oct.lineTo(px, H - c.pad.b);
    oct.stroke();
  }
  for (const y of niceTicks(c.ymin, c.ymax, 6)) {
    const [, py] = c.toS(0, y);
    oct.beginPath();
    oct.moveTo(c.pad.l, py);
    oct.lineTo(W - c.pad.r, py);
    oct.stroke();
  }
  oct.restore();

  // Axes
  oct.save();
  const [, axY] = c.toS(0, 0);
  const [axX] = c.toS(0, 0);
  const ayc = clamp(axY, c.pad.t, H - c.pad.b);
  const axc = clamp(axX, c.pad.l, W - c.pad.r);
  oct.strokeStyle = axisColor;
  oct.lineWidth = 1;
  oct.beginPath();
  oct.moveTo(c.pad.l, ayc);
  oct.lineTo(W - c.pad.r, ayc);
  oct.stroke();
  oct.beginPath();
  oct.moveTo(axc, c.pad.t);
  oct.lineTo(axc, H - c.pad.b);
  oct.stroke();

  // Tick labels
  oct.fillStyle = textColor;
  oct.font = '9px "JetBrains Mono"';
  oct.textAlign = 'center';
  oct.textBaseline = 'top';
  for (const x of niceTicks(c.xmin, c.xmax, 8)) {
    const [px] = c.toS(x, 0);
    if (px < c.pad.l + 4 || px > W - c.pad.r - 4) continue;
    oct.fillText(fmtAxis(x), px, ayc + 5);
  }
  oct.textAlign = 'right';
  oct.textBaseline = 'middle';
  for (const y of niceTicks(c.ymin, c.ymax, 6)) {
    const [, py] = c.toS(0, y);
    if (py < c.pad.t + 4 || py > H - c.pad.b - 4) continue;
    oct.fillText(fmtAxis(y), c.pad.l - 5, py);
  }
  // Axis labels
  oct.fillStyle = textMuted;
  oct.font = '10px "JetBrains Mono"';
  oct.textAlign = 'center';
  oct.fillText('x', W - c.pad.r, ayc + 6);
  oct.textAlign = 'left';
  oct.textBaseline = 'bottom';
  oct.fillText('y', axc + 4, c.pad.t);
  oct.restore();

  // Clip to drawing area
  oct.save();
  oct.beginPath();
  oct.rect(c.pad.l, c.pad.t, W - c.pad.l - c.pad.r, H - c.pad.t - c.pad.b);
  oct.clip();

  // Draw integral areas if enabled
  if (S.showIntegral) {
    S.multiFns.forEach((fn, idx) => {
      const color = getMultiColor(idx, S.currentTheme);
      oct.beginPath();
      const N = 400;
      for (let i = 0; i <= N; i++) {
        const xi = c.xmin + (c.xmax - c.xmin) * i / N;
        const yi = fn.f(xi);
        if (!isFinite(yi)) continue;
        const [px, py] = c.toS(xi, yi);
        i === 0 ? oct.moveTo(px, py) : oct.lineTo(px, py);
      }
      const [xlS] = c.toS(c.xmin, 0);
      const [xrS] = c.toS(c.xmax, 0);
      oct.lineTo(xrS, ayc);
      oct.lineTo(xlS, ayc);
      oct.closePath();
      oct.fillStyle = color.hslBg;
      oct.fill();
    });
  }

  // Draw each function curve
  S.multiFns.forEach((fn, idx) => {
    const color = getMultiColor(idx, S.currentTheme);
    oct.lineWidth = 2.4;
    oct.lineJoin = 'round';
    oct.lineCap = 'round';
    oct.strokeStyle = color.hsl;

    oct.beginPath();
    const N = 500;
    let started = false;
    for (let i = 0; i <= N; i++) {
      const x = c.xmin + (c.xmax - c.xmin) * i / N;
      const y = fn.f(x);
      if (!isFinite(y)) {
        started = false;
        continue;
      }
      const [px, py] = c.toS(x, y);
      if (!started) {
        oct.moveTo(px, py);
        started = true;
      } else {
        oct.lineTo(px, py);
      }
    }
    oct.stroke();
  });

  oct.restore();
  S.offscreen = oc;
}

// Draw multi-function derivative panel
function drawMultiDerivPanel() {
  const mc = S.coord;
  if (!mc || S.multiFns.length === 0) return;

  const dpr = window.devicePixelRatio || 1;
  const panel = document.getElementById('deriv-panel');
  const W = panel.clientWidth;
  const H = 160;

  if (dcvs.width !== Math.round(W * dpr) || dcvs.height !== Math.round(H * dpr)) {
    dcvs.style.height = H + 'px';
    dcvs.width = Math.round(W * dpr);
    dcvs.height = Math.round(H * dpr);
    dctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  const pad = { l: 54, r: 16, t: 10, b: 32 };
  const xmin = mc.xmin, xmax = mc.xmax;

  // Sample all derivatives to get y range
  const N = 300, gys = [];
  S.multiFns.forEach(fn => {
    for (let i = 0; i <= N; i++) {
      const g = fn.df(xmin + (xmax - xmin) * i / N);
      if (isFinite(g)) gys.push(g);
    }
  });

  let gymin = -3, gymax = 3;
  if (gys.length > 1) {
    const gr = Math.max(...gys) - Math.min(...gys);
    gymin = Math.min(...gys) - gr * 0.12;
    gymax = Math.max(...gys) + gr * 0.12;
  }

  const toS2 = (mx, my) => [
    pad.l + (mx - xmin) / (xmax - xmin) * (W - pad.l - pad.r),
    pad.t + (gymax - my) / (gymax - gymin) * (H - pad.t - pad.b)
  ];

  // Get theme colors
  const styles = getComputedStyle(document.documentElement);
  const bgColor = styles.getPropertyValue('--surface').trim();
  const gridColor = S.currentTheme === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.035)';
  const axisColor = S.currentTheme === 'light' ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.2)';
  const textColor = S.currentTheme === 'light' ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.25)';

  // Clear
  dctx.fillStyle = bgColor;
  dctx.fillRect(0, 0, W, H);

  // Grid
  dctx.save();
  dctx.strokeStyle = gridColor;
  dctx.lineWidth = 0.5;
  for (const x of niceTicks(xmin, xmax, 8)) {
    const [px] = toS2(x, 0);
    dctx.beginPath();
    dctx.moveTo(px, pad.t);
    dctx.lineTo(px, H - pad.b);
    dctx.stroke();
  }
  for (const y of niceTicks(gymin, gymax, 5)) {
    const [, py] = toS2(0, y);
    dctx.beginPath();
    dctx.moveTo(pad.l, py);
    dctx.lineTo(W - pad.r, py);
    dctx.stroke();
  }
  dctx.restore();

  // Zero axis
  const [, zy] = toS2(0, 0);
  const zyc = clamp(zy, pad.t, H - pad.b);
  dctx.save();
  dctx.strokeStyle = axisColor;
  dctx.lineWidth = 1;
  dctx.beginPath();
  dctx.moveTo(pad.l, zyc);
  dctx.lineTo(W - pad.r, zyc);
  dctx.stroke();

  // Tick labels
  dctx.fillStyle = textColor;
  dctx.font = '8px "JetBrains Mono"';
  dctx.textAlign = 'right';
  dctx.textBaseline = 'middle';
  for (const y of niceTicks(gymin, gymax, 5)) {
    const [, py] = toS2(0, y);
    if (py < pad.t + 3 || py > H - pad.b - 3) continue;
    dctx.fillText(fmtAxis(y), pad.l - 4, py);
  }
  dctx.textAlign = 'center';
  dctx.textBaseline = 'top';
  for (const x of niceTicks(xmin, xmax, 8)) {
    const [px] = toS2(x, 0);
    if (px < pad.l + 4 || px > W - pad.r - 4) continue;
    dctx.fillText(fmtAxis(x), px, zyc + 4);
  }
  dctx.restore();

  // Clip to drawing area
  dctx.save();
  const clip = new Path2D();
  clip.rect(pad.l, pad.t, W - pad.l - pad.r, H - pad.t - pad.b);
  dctx.clip(clip);

  // Draw each derivative curve
  S.multiFns.forEach((fn, idx) => {
    const color = getMultiColor(idx, S.currentTheme);
    dctx.beginPath();
    dctx.lineWidth = 2;
    let started = false;
    for (let i = 0; i <= N; i++) {
      const x = xmin + (xmax - xmin) * i / N;
      const g = fn.df(x);
      if (!isFinite(g)) {
        started = false;
        continue;
      }
      const [px, py] = toS2(x, g);
      if (!started) {
        dctx.moveTo(px, py);
        started = true;
      } else {
        dctx.lineTo(px, py);
      }
    }
    dctx.strokeStyle = color.hsl;
    dctx.stroke();
  });

  dctx.restore();

  // x0 marker
  const x0 = clamp(S.x0, xmin, xmax);
  const [px0] = toS2(x0, 0);
  dctx.save();
  dctx.strokeStyle = '#ffd166';
  dctx.lineWidth = 1.5;
  dctx.setLineDash([3, 3]);
  dctx.beginPath();
  dctx.moveTo(px0, pad.t);
  dctx.lineTo(px0, H - pad.b);
  dctx.stroke();
  dctx.setLineDash([]);

  // Dots on each curve
  S.multiFns.forEach((fn, idx) => {
    const color = getMultiColor(idx, S.currentTheme);
    const gv = fn.df(x0);
    const [, pgy] = toS2(x0, gv);
    dctx.beginPath();
    dctx.arc(px0, pgy, 5, 0, Math.PI * 2);
    dctx.fillStyle = color.hsl;
    dctx.fill();
    dctx.strokeStyle = '#0c0d10';
    dctx.lineWidth = 1.5;
    dctx.stroke();
  });

  dctx.restore();

  // Update readout with all derivatives
  const readouts = S.multiFns.map((fn, idx) => {
    const color = getMultiColor(idx, S.currentTheme);
    const gv = fn.df(x0);
    return `<span style="color:${color.hsl}">${fn.label}: ${fmtN(gv, 4)}</span>`;
  }).join(' | ');
  document.getElementById('derivReadout').innerHTML = `f′(${fmtN(x0, 4)}) = ${readouts}`;
}
