/**
 * Static Canvas Rendering
 * Cached layer: grid, axes, curve
 */

// ── Static Drawing (offscreen canvas) ───────────────────────────────
         function buildStatic(W, H, dpr){
           const fn=S.fn;
           const oc=document.createElement('canvas');
           oc.width=Math.round(W*dpr); oc.height=Math.round(H*dpr);
           const oct=oc.getContext('2d');
           oct.setTransform(dpr,0,0,dpr,0,0);
           S.coord=makeCoord(fn,W,H);
           const c=S.coord;

           // Get theme colors from CSS
           const styles=getComputedStyle(document.documentElement);
           const bgColor=styles.getPropertyValue('--surface').trim();
           const gridColor=S.currentTheme==='light'?'rgba(0,0,0,0.06)':'rgba(255,255,255,0.035)';
           const axisColor=S.currentTheme==='light'?'rgba(0,0,0,0.25)':'rgba(255,255,255,0.18)';
           const textColor=S.currentTheme==='light'?'rgba(0,0,0,0.4)':'rgba(255,255,255,0.28)';
           const textMuted=S.currentTheme==='light'?'rgba(0,0,0,0.25)':'rgba(255,255,255,0.18)';
           const curveShade=S.currentTheme==='light'?'rgba(0,102,204,0.08)':'rgba(74,158,255,0.06)';

           // Background
           oct.fillStyle=bgColor; oct.fillRect(0,0,W,H);

           // Grid
           oct.save();
           oct.strokeStyle=gridColor; oct.lineWidth=.6;
           for(const x of niceTicks(c.xmin,c.xmax,8)){
             const [px]=c.toS(x,0);
             oct.beginPath(); oct.moveTo(px,c.pad.t); oct.lineTo(px,H-c.pad.b); oct.stroke();
           }
           for(const y of niceTicks(c.ymin,c.ymax,6)){
             const [,py]=c.toS(0,y);
             oct.beginPath(); oct.moveTo(c.pad.l,py); oct.lineTo(W-c.pad.r,py); oct.stroke();
           }
           oct.restore();

           // Axes
           oct.save();
           const [,axY]=c.toS(0,0); const [axX]=c.toS(0,0);
           const ayc=clamp(axY,c.pad.t,H-c.pad.b);
           const axc=clamp(axX,c.pad.l,W-c.pad.r);
           oct.strokeStyle=axisColor; oct.lineWidth=1;
           oct.beginPath(); oct.moveTo(c.pad.l,ayc); oct.lineTo(W-c.pad.r,ayc); oct.stroke();
           oct.beginPath(); oct.moveTo(axc,c.pad.t); oct.lineTo(axc,H-c.pad.b); oct.stroke();

           // Tick labels
           oct.fillStyle=textColor; oct.font='9px "JetBrains Mono"';
           oct.textAlign='center'; oct.textBaseline='top';
           for(const x of niceTicks(c.xmin,c.xmax,8)){
             const [px]=c.toS(x,0);
             if(px<c.pad.l+4||px>W-c.pad.r-4) continue;
             oct.fillText(fmtAxis(x),px,ayc+5);
           }
           oct.textAlign='right'; oct.textBaseline='middle';
           for(const y of niceTicks(c.ymin,c.ymax,6)){
             const [,py]=c.toS(0,y);
             if(py<c.pad.t+4||py>H-c.pad.b-4) continue;
             oct.fillText(fmtAxis(y),c.pad.l-5,py);
           }
           // Axis labels
           oct.fillStyle=textMuted; oct.font='10px "JetBrains Mono"';
           oct.textAlign='center'; oct.fillText('x',W-c.pad.r,ayc+6);
           oct.textAlign='left'; oct.textBaseline='bottom'; oct.fillText('y',axc+4,c.pad.t);
           oct.restore();

           // Shaded area under curve
           oct.save();
           // Clip to drawing area
           oct.beginPath();
           oct.rect(c.pad.l, c.pad.t, W-c.pad.l-c.pad.r, H-c.pad.t-c.pad.b);
           oct.clip();

           oct.beginPath();
           const N=400;
           for(let i=0;i<=N;i++){
             const xi=c.xmin+(c.xmax-c.xmin)*i/N;
             const yi=fn.f(xi);
             if(!isFinite(yi)) continue;
             const [px,py]=c.toS(xi,yi);
             i===0?oct.moveTo(px,py):oct.lineTo(px,py);
           }
           const [,pyZ]=c.toS(0,0);
           const [xlS]=c.toS(c.xmin,0); const [xrS]=c.toS(c.xmax,0);
           oct.lineTo(xrS,ayc); oct.lineTo(xlS,ayc); oct.closePath();
           oct.fillStyle=curveShade; oct.fill();
           oct.restore();

           // Colored curve (gradient-mapped)
           oct.save();
           // Clip to drawing area
           oct.beginPath();
           oct.rect(c.pad.l, c.pad.t, W-c.pad.l-c.pad.r, H-c.pad.t-c.pad.b);
           oct.clip();

           oct.lineWidth=2.4; oct.lineJoin='round'; oct.lineCap='round';
           const SEG=500;
           for(let i=0;i<SEG;i++){
             const x1=c.xmin+(c.xmax-c.xmin)*i/SEG;
             const x2=c.xmin+(c.xmax-c.xmin)*(i+1)/SEG;
             const y1=fn.f(x1), y2=fn.f(x2);
             if(!isFinite(y1)||!isFinite(y2)) continue;
             const gmid=fn.df((x1+x2)/2);
             // Map atan(g) in [-π/2,π/2] to hue 0..120 (red→yellow→green)
             const t=(Math.atan(gmid/2)/Math.PI+0.5);
             const hue=t*120;
             const lightness=S.currentTheme==='light'?45:58;
             oct.strokeStyle=`hsl(${hue},88%,${lightness}%)`;
             const [px1,py1]=c.toS(x1,y1), [px2,py2]=c.toS(x2,y2);
             oct.beginPath(); oct.moveTo(px1,py1); oct.lineTo(px2,py2); oct.stroke();
           }
           oct.restore();

           S.offscreen=oc;
         }
