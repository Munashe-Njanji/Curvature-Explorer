/**
 * Derivative Panel Rendering
 * Dual view f'(x) graph
 */
// ── Derivative Panel ─────────────────────────────────────────────────
function drawDerivPanel() {
    const fn = S.fn;
    const mc = S.coord;
    if (!fn || !mc) return;
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
    const pad = {
        l: 54,
        r: 16,
        t: 10,
        b: 32
    };
    const xmin = mc.xmin,
        xmax = mc.xmax;
    // Sample f' to get y range
    const N = 300,
        gys = [];
    for (let i = 0; i <= N; i++) {
        const g = fn.df(xmin + (xmax - xmin) * i / N);
        if (isFinite(g)) gys.push(g);
    }
    let gymin = -3,
        gymax = 3;
    if (gys.length > 1) {
        const gr = Math.max(...gys) - Math.min(...gys);
        gymin = Math.min(...gys) - gr * .12;
        gymax = Math.max(...gys) + gr * .12;
    }
    const sx2 = (W - pad.l - pad.r) / (xmax - xmin);
    const sy2 = (H - pad.t - pad.b) / (gymax - gymin);
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
    dctx.lineWidth = .5;
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
    // Fill positive/negative areas
    dctx.save();
    const clip = new Path2D();
    clip.rect(pad.l, pad.t, W - pad.l - pad.r, H - pad.t - pad.b);
    dctx.clip(clip);
    dctx.beginPath();
    for (let i = 0; i <= N; i++) {
        const x = xmin + (xmax - xmin) * i / N;
        const [px, py] = toS2(x, fn.df(x));
        i === 0 ? dctx.moveTo(px, py) : dctx.lineTo(px, py);
    }
    dctx.lineTo(pad.l + (xmax - xmin) / (xmax - xmin) * (W - pad.l - pad.r), zyc);
    dctx.lineTo(pad.l, zyc);
    dctx.closePath();
    const fillGrd = dctx.createLinearGradient(0, pad.t, 0, H - pad.b);
    fillGrd.addColorStop(0, 'rgba(74,255,158,0.12)');
    fillGrd.addColorStop(0.5, 'rgba(255,209,102,0.05)');
    fillGrd.addColorStop(1, 'rgba(255,107,74,0.12)');
    dctx.fillStyle = fillGrd;
    dctx.fill();
    // Curve f'(x)
    dctx.beginPath();
    dctx.lineWidth = 2;
    for (let i = 0; i <= N; i++) {
        const x = xmin + (xmax - xmin) * i / N;
        const g = fn.df(x);
        if (!isFinite(g)) {
            dctx.beginPath();
            continue;
        }
        const [px, py] = toS2(x, g);
        i === 0 ? dctx.moveTo(px, py) : dctx.lineTo(px, py);
    }
    dctx.strokeStyle = '#a78bfa';
    dctx.stroke();
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
    // Dot on curve
    const gv = fn.df(x0);
    const [, pgy] = toS2(x0, gv);
    dctx.beginPath();
    dctx.arc(px0, pgy, 5, 0, Math.PI * 2);
    dctx.fillStyle = '#ffd166';
    dctx.fill();
    dctx.strokeStyle = '#0c0d10';
    dctx.lineWidth = 1.5;
    dctx.stroke();
    dctx.restore();
    // Readout
    document.getElementById('derivReadout').textContent = `f′(${fmtN(x0,4)}) = ${fmtN(gv,5)}`;
}