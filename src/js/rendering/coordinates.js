/**
 * Coordinate System
 * Screen-to-math coordinate transformations
 */

// ── Coordinate System ────────────────────────────────────────────────
function makeCoord(fn, W, H){
  const pad={l:54,r:16,t:18,b:40};
  let xmin=fn.xmin, xmax=fn.xmax;

  const N=400, ys=[];
  for(let i=0;i<=N;i++){
    const y=fn.f(xmin+(xmax-xmin)*i/N);
    if(isFinite(y)&&!isNaN(y)) ys.push(y);
  }
  let ymin,ymax;
  if(ys.length<2){ymin=-5;ymax=5;}
  else{
    const rmin=Math.min(...ys), rmax=Math.max(...ys);
    const yp=Math.max(0.5,(rmax-rmin)*0.16);
    ymin=rmin-yp; ymax=rmax+yp;
  }

  // Apply zoom
  const xRange = (xmax - xmin) / S.zoom;
  const yRange = (ymax - ymin) / S.zoom;
  const xCenter = (xmin + xmax) / 2 + S.panX;
  const yCenter = (ymin + ymax) / 2 + S.panY;
  xmin = xCenter - xRange / 2;
  xmax = xCenter + xRange / 2;
  ymin = yCenter - yRange / 2;
  ymax = yCenter + yRange / 2;

  const sx=(W-pad.l-pad.r)/(xmax-xmin);
  const sy=(H-pad.t-pad.b)/(ymax-ymin);

  return {
    pad,xmin,xmax,ymin,ymax,W,H,sx,sy,
    toS(mx,my){
      return [
        pad.l+(mx-xmin)/(xmax-xmin)*(W-pad.l-pad.r),
        pad.t+(ymax-my)/(ymax-ymin)*(H-pad.t-pad.b)
      ];
    },
    toM(px,py){
      return [
        xmin+(px-pad.l)/(W-pad.l-pad.r)*(xmax-xmin),
        ymax-(py-pad.t)/(H-pad.t-pad.b)*(ymax-ymin)
      ];
    }
  };
}
