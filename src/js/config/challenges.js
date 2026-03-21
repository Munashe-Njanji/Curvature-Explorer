/**
 * Challenge System Configuration
 * 25 calculus challenges for learning
 */

// Helper function to check if a value exists in the function's range
function hasValueInRange(fn, targetCheck, threshold = 0.1) {
  const N = 100;
  for(let i=0; i<=N; i++){
    const x = fn.xmin + (fn.xmax-fn.xmin)*i/N;
    if(targetCheck(x)) return true;
  }
  return false;
}

// ── Challenges ──────────────────────────────────────────────────────
         const CHALLENGES = [
           // Basic Challenges (1-5)
           {
             prompt:'Find where the tangent is horizontal: f′(x) = 0',
             hint:'Look for peaks or valleys — local extrema!',
             isApplicable:(fn) => {
               // Check if there's a point where derivative is near zero
               return hasValueInRange(fn, x => Math.abs(fn.df(x)) < 0.1);
             },
             check:(fn,x0) => Math.abs(fn.df(x0)) < 0.06,
             progress:(fn,x0) => {
               const g = Math.abs(fn.df(x0));
               return Math.max(0, 1 - g / 0.5);
             },
             visualHint:(fn,c,ctx) => {
               const N = 100;
               const criticals = [];
               for(let i=1;i<N;i++){
                 const x1 = fn.xmin + (fn.xmax-fn.xmin)*(i-1)/N;
                 const x2 = fn.xmin + (fn.xmax-fn.xmin)*i/N;
                 const g1 = fn.df(x1);
                 const g2 = fn.df(x2);
                 if(g1*g2 < 0 || Math.abs(g2) < 0.05){
                   criticals.push(x2);
                 }
               }
               criticals.forEach(x => {
                 const y = fn.f(x);
                 if(!isFinite(y)) return;
                 const [sx,sy] = c.toS(x,y);
                 ctx.save();
                 ctx.beginPath();
                 ctx.arc(sx,sy,8,0,Math.PI*2);
                 ctx.strokeStyle = 'rgba(167, 139, 250, 0.3)';
                 ctx.lineWidth = 2;
                 ctx.stroke();
                 ctx.restore();
               });
             },
             ach:{id:'crit',icon:'target',name:'Critical Finder'}
           },
           {
             prompt:'Find where the tangent slope equals exactly 1',
             hint:'The tangent rises 1 unit for every 1 unit right',
             isApplicable:(fn) => {
               // Check if slope 1 exists in range
               return hasValueInRange(fn, x => Math.abs(fn.df(x) - 1) < 0.3);
             },
             check:(fn,x0) => Math.abs(fn.df(x0) - 1) < 0.1,
             progress:(fn,x0) => {
               const g = fn.df(x0);
               const diff = Math.abs(g - 1);
               return Math.max(0, 1 - diff / 2);
             },
             visualHint:(fn,c,ctx) => {
               const [ox,oy] = c.toS(0,0);
               ctx.save();
               ctx.strokeStyle = 'rgba(167, 139, 250, 0.25)';
               ctx.lineWidth = 1.5;
               ctx.setLineDash([5,5]);
               ctx.beginPath();
               ctx.moveTo(c.pad.l, oy - c.sy * 0);
               ctx.lineTo(c.pad.l + 100, oy - c.sy * 100/c.sx);
               ctx.stroke();
               ctx.setLineDash([]);
               ctx.restore();
             },
             ach:{id:'slope1',icon:'zap',name:'Slope Ninja'}
           },
           {
             prompt:'Find an inflection point where f″(x) ≈ 0',
             hint:'Where the curve changes from concave up to concave down',
             check:(fn,x0) => Math.abs(fn.d2f(x0)) < 0.12,
             progress:(fn,x0) => {
               const g2 = Math.abs(fn.d2f(x0));
               return Math.max(0, 1 - g2 / 1);
             },
             visualHint:(fn,c,ctx) => {
               const N = 100;
               for(let i=1;i<N;i++){
                 const x1 = fn.xmin + (fn.xmax-fn.xmin)*(i-1)/N;
                 const x2 = fn.xmin + (fn.xmax-fn.xmin)*i/N;
                 const g21 = fn.d2f(x1);
                 const g22 = fn.d2f(x2);
                 if(g21*g22 < 0 || Math.abs(g22) < 0.1){
                   const y = fn.f(x2);
                   if(!isFinite(y)) continue;
                   const [sx,sy] = c.toS(x2,y);
                   ctx.save();
                   ctx.beginPath();
                   ctx.arc(sx,sy,8,0,Math.PI*2);
                   ctx.strokeStyle = 'rgba(167, 139, 250, 0.3)';
                   ctx.lineWidth = 2;
                   ctx.stroke();
                   ctx.restore();
                 }
               }
             },
             ach:{id:'infl',icon:'spiral',name:'Inflection Hunter'}
           },
           {
             prompt:'Find where the curve is steepest (max |f′(x)|)',
             hint:'Look for the point where gradient is largest',
             check:(fn,x0) => {
               const g0 = Math.abs(fn.df(x0));
               let max = 0;
               const N = 80;
               for(let i=0;i<=N;i++){
                 const x = fn.xmin + (fn.xmax-fn.xmin)*i/N;
                 const g = Math.abs(fn.df(x));
                 if(g > max) max = g;
               }
               return g0 >= max * 0.92;
             },
             progress:(fn,x0) => {
               const g0 = Math.abs(fn.df(x0));
               let max = 0;
               const N = 80;
               for(let i=0;i<=N;i++){
                 const x = fn.xmin + (fn.xmax-fn.xmin)*i/N;
                 const g = Math.abs(fn.df(x));
                 if(g > max) max = g;
               }
               return max > 0 ? g0 / max : 0;
             },
             visualHint:(fn,c,ctx) => {
               const N = 100;
               let max = 0;
               for(let i=0;i<=N;i++){
                 const x = fn.xmin + (fn.xmax-fn.xmin)*i/N;
                 const g = Math.abs(fn.df(x));
                 if(g > max) max = g;
               }
               for(let i=0;i<N;i++){
                 const x = fn.xmin + (fn.xmax-fn.xmin)*i/N;
                 const g = Math.abs(fn.df(x));
                 if(g >= max * 0.85){
                   const y = fn.f(x);
                   if(!isFinite(y)) continue;
                   const [sx,sy] = c.toS(x,y);
                   ctx.save();
                   ctx.beginPath();
                   ctx.arc(sx,sy,6,0,Math.PI*2);
                   ctx.fillStyle = 'rgba(167, 139, 250, 0.2)';
                   ctx.fill();
                   ctx.restore();
                 }
               }
             },
             ach:{id:'steep',icon:'mountain',name:'Peak Gradient'}
           },
           {
             prompt:'Find a point where curvature κ is at maximum',
             hint:'Where the curve bends the most sharply',
             check:(fn,x0) => {
               const k0 = kappa(fn.df(x0), fn.d2f(x0));
               let max = 0;
               const N = 80;
               for(let i=0;i<=N;i++){
                 const x = fn.xmin + (fn.xmax-fn.xmin)*i/N;
                 const k = kappa(fn.df(x), fn.d2f(x));
                 if(k > max) max = k;
               }
               return k0 >= max * 0.88;
             },
             progress:(fn,x0) => {
               const k0 = kappa(fn.df(x0), fn.d2f(x0));
               let max = 0;
               const N = 80;
               for(let i=0;i<=N;i++){
                 const x = fn.xmin + (fn.xmax-fn.xmin)*i/N;
                 const k = kappa(fn.df(x), fn.d2f(x));
                 if(k > max) max = k;
               }
               return max > 0 ? k0 / max : 0;
             },
             visualHint:(fn,c,ctx) => {
               const N = 100;
               let max = 0;
               for(let i=0;i<=N;i++){
                 const x = fn.xmin + (fn.xmax-fn.xmin)*i/N;
                 const k = kappa(fn.df(x), fn.d2f(x));
                 if(k > max) max = k;
               }
               for(let i=0;i<N;i++){
                 const x = fn.xmin + (fn.xmax-fn.xmin)*i/N;
                 const k = kappa(fn.df(x), fn.d2f(x));
                 if(k >= max * 0.8){
                   const y = fn.f(x);
                   if(!isFinite(y)) continue;
                   const [sx,sy] = c.toS(x,y);
                   ctx.save();
                   ctx.beginPath();
                   ctx.arc(sx,sy,6,0,Math.PI*2);
                   ctx.fillStyle = 'rgba(167, 139, 250, 0.2)';
                   ctx.fill();
                   ctx.restore();
                 }
               }
             },
             ach:{id:'curv',icon:'crystal',name:'Curvature Master'}
           },
           
           // Slope Challenges (6-10)
           {
             prompt:'Find where the slope equals -1',
             hint:'The tangent falls 1 unit for every 1 unit right',
             isApplicable:(fn) => {
               return hasValueInRange(fn, x => Math.abs(fn.df(x) + 1) < 0.3);
             },
             check:(fn,x0) => Math.abs(fn.df(x0) + 1) < 0.1,
             progress:(fn,x0) => {
               const diff = Math.abs(fn.df(x0) + 1);
               return Math.max(0, 1 - diff / 2);
             },
             visualHint:(fn,c,ctx) => {},
             ach:{id:'slopeNeg1',icon:'arrowDown',name:'Downhill Expert'}
           },
           {
             prompt:'Find where the slope equals 2',
             hint:'A steep upward tangent line',
             isApplicable:(fn) => {
               return hasValueInRange(fn, x => Math.abs(fn.df(x) - 2) < 0.4);
             },
             check:(fn,x0) => Math.abs(fn.df(x0) - 2) < 0.15,
             progress:(fn,x0) => {
               const diff = Math.abs(fn.df(x0) - 2);
               return Math.max(0, 1 - diff / 3);
             },
             visualHint:(fn,c,ctx) => {},
             ach:{id:'slope2',icon:'chartUp',name:'Steep Climber'}
           },
           {
             prompt:'Find where the slope is negative (f′(x) < 0)',
             hint:'Any point where the function is decreasing',
             isApplicable:(fn) => {
               return hasValueInRange(fn, x => fn.df(x) < -0.05);
             },
             check:(fn,x0) => fn.df(x0) < -0.1,
             progress:(fn,x0) => {
               const g = fn.df(x0);
               return g < 0 ? Math.min(1, Math.abs(g) / 2) : 0;
             },
             visualHint:(fn,c,ctx) => {},
             ach:{id:'negative',icon:'arrowDown',name:'Descender'}
           },
           {
             prompt:'Find where the slope is positive (f′(x) > 0)',
             hint:'Any point where the function is increasing',
             isApplicable:(fn) => {
               return hasValueInRange(fn, x => fn.df(x) > 0.05);
             },
             check:(fn,x0) => fn.df(x0) > 0.1,
             progress:(fn,x0) => {
               const g = fn.df(x0);
               return g > 0 ? Math.min(1, g / 2) : 0;
             },
             visualHint:(fn,c,ctx) => {},
             ach:{id:'positive',icon:'arrowUp',name:'Ascender'}
           },
           {
             prompt:'Find where |f′(x)| < 0.2 (nearly flat)',
             hint:'Look for gentle slopes, almost horizontal',
             check:(fn,x0) => Math.abs(fn.df(x0)) < 0.2,
             progress:(fn,x0) => {
               const g = Math.abs(fn.df(x0));
               return Math.max(0, 1 - g / 0.5);
             },
             visualHint:(fn,c,ctx) => {},
             ach:{id:'gentle',icon:'target',name:'Gentle Touch'}
           },
           
           // Concavity Challenges (11-15)
           {
             prompt:'Find where f″(x) > 0 (concave up)',
             hint:'The curve looks like a smile ∪',
             isApplicable:(fn) => {
               return hasValueInRange(fn, x => fn.d2f(x) > 0.1);
             },
             check:(fn,x0) => fn.d2f(x0) > 0.15,
             progress:(fn,x0) => {
               const g2 = fn.d2f(x0);
               return g2 > 0 ? Math.min(1, g2 / 2) : 0;
             },
             visualHint:(fn,c,ctx) => {},
             ach:{id:'concaveUp',icon:'smile',name:'Smile Finder'}
           },
           {
             prompt:'Find where f″(x) < 0 (concave down)',
             hint:'The curve looks like a frown ∩',
             isApplicable:(fn) => {
               return hasValueInRange(fn, x => fn.d2f(x) < -0.1);
             },
             check:(fn,x0) => fn.d2f(x0) < -0.15,
             progress:(fn,x0) => {
               const g2 = fn.d2f(x0);
               return g2 < 0 ? Math.min(1, Math.abs(g2) / 2) : 0;
             },
             visualHint:(fn,c,ctx) => {},
             ach:{id:'concaveDown',icon:'frown',name:'Frown Finder'}
           },
           {
             prompt:'Find a local maximum (f′(x)=0 and f″(x)<0)',
             hint:'A peak where the slope is zero and curve bends down',
             check:(fn,x0) => Math.abs(fn.df(x0)) < 0.08 && fn.d2f(x0) < -0.1,
             progress:(fn,x0) => {
               const g = Math.abs(fn.df(x0));
               const g2 = fn.d2f(x0);
               const p1 = Math.max(0, 1 - g / 0.3);
               const p2 = g2 < 0 ? 1 : 0;
               return (p1 + p2) / 2;
             },
             visualHint:(fn,c,ctx) => {},
             ach:{id:'localMax',icon:'mountain',name:'Peak Finder'}
           },
           {
             prompt:'Find a local minimum (f′(x)=0 and f″(x)>0)',
             hint:'A valley where the slope is zero and curve bends up',
             check:(fn,x0) => Math.abs(fn.df(x0)) < 0.08 && fn.d2f(x0) > 0.1,
             progress:(fn,x0) => {
               const g = Math.abs(fn.df(x0));
               const g2 = fn.d2f(x0);
               const p1 = Math.max(0, 1 - g / 0.3);
               const p2 = g2 > 0 ? 1 : 0;
               return (p1 + p2) / 2;
             },
             visualHint:(fn,c,ctx) => {},
             ach:{id:'localMin',icon:'valley',name:'Valley Finder'}
           },
           {
             prompt:'Find where |f″(x)| is maximum (sharpest bend)',
             hint:'The point of most dramatic curvature change',
             check:(fn,x0) => {
               const g20 = Math.abs(fn.d2f(x0));
               let max = 0;
               const N = 80;
               for(let i=0;i<=N;i++){
                 const x = fn.xmin + (fn.xmax-fn.xmin)*i/N;
                 const g2 = Math.abs(fn.d2f(x));
                 if(g2 > max) max = g2;
               }
               return g20 >= max * 0.9;
             },
             progress:(fn,x0) => {
               const g20 = Math.abs(fn.d2f(x0));
               let max = 0;
               const N = 80;
               for(let i=0;i<=N;i++){
                 const x = fn.xmin + (fn.xmax-fn.xmin)*i/N;
                 const g2 = Math.abs(fn.d2f(x));
                 if(g2 > max) max = g2;
               }
               return max > 0 ? g20 / max : 0;
             },
             visualHint:(fn,c,ctx) => {},
             ach:{id:'maxBend',icon:'spiral',name:'Bend Master'}
           },
           
           // Value Challenges (16-20)
           {
             prompt:'Find where f(x) = 0 (x-intercept)',
             hint:'Where the curve crosses the x-axis',
             isApplicable:(fn) => {
               return hasValueInRange(fn, x => Math.abs(fn.f(x)) < 0.3);
             },
             check:(fn,x0) => Math.abs(fn.f(x0)) < 0.1,
             progress:(fn,x0) => {
               const y = Math.abs(fn.f(x0));
               return Math.max(0, 1 - y / 2);
             },
             visualHint:(fn,c,ctx) => {
               const [,oy] = c.toS(0,0);
               ctx.save();
               ctx.strokeStyle = 'rgba(167, 139, 250, 0.3)';
               ctx.lineWidth = 2;
               ctx.setLineDash([5,5]);
               ctx.beginPath();
               ctx.moveTo(c.pad.l, oy);
               ctx.lineTo(ctx.canvas.width - c.pad.r, oy);
               ctx.stroke();
               ctx.setLineDash([]);
               ctx.restore();
             },
             ach:{id:'xIntercept',icon:'target',name:'Zero Hunter'}
           },
           {
             prompt:'Find where f(x) is at its maximum value',
             hint:'The highest point on the visible curve',
             check:(fn,x0) => {
               const y0 = fn.f(x0);
               let max = -Infinity;
               const N = 80;
               for(let i=0;i<=N;i++){
                 const x = fn.xmin + (fn.xmax-fn.xmin)*i/N;
                 const y = fn.f(x);
                 if(isFinite(y) && y > max) max = y;
               }
               return isFinite(y0) && y0 >= max * 0.95;
             },
             progress:(fn,x0) => {
               const y0 = fn.f(x0);
               let max = -Infinity;
               const N = 80;
               for(let i=0;i<=N;i++){
                 const x = fn.xmin + (fn.xmax-fn.xmin)*i/N;
                 const y = fn.f(x);
                 if(isFinite(y) && y > max) max = y;
               }
               if(!isFinite(y0) || max === -Infinity) return 0;
               return Math.max(0, y0 / max);
             },
             visualHint:(fn,c,ctx) => {},
             ach:{id:'maxValue',icon:'star',name:'Summit Seeker'}
           },
           {
             prompt:'Find where f(x) is at its minimum value',
             hint:'The lowest point on the visible curve',
             check:(fn,x0) => {
               const y0 = fn.f(x0);
               let min = Infinity;
               const N = 80;
               for(let i=0;i<=N;i++){
                 const x = fn.xmin + (fn.xmax-fn.xmin)*i/N;
                 const y = fn.f(x);
                 if(isFinite(y) && y < min) min = y;
               }
               return isFinite(y0) && y0 <= min * 1.05;
             },
             progress:(fn,x0) => {
               const y0 = fn.f(x0);
               let min = Infinity;
               const N = 80;
               for(let i=0;i<=N;i++){
                 const x = fn.xmin + (fn.xmax-fn.xmin)*i/N;
                 const y = fn.f(x);
                 if(isFinite(y) && y < min) min = y;
               }
               if(!isFinite(y0) || min === Infinity) return 0;
               return Math.max(0, 1 - (y0 - min) / Math.abs(min));
             },
             visualHint:(fn,c,ctx) => {},
             ach:{id:'minValue',icon:'valley',name:'Depth Finder'}
           },
           {
             prompt:'Find where f(x) = 1',
             hint:'Where the curve crosses y = 1',
             isApplicable:(fn) => {
               return hasValueInRange(fn, x => Math.abs(fn.f(x) - 1) < 0.3);
             },
             check:(fn,x0) => Math.abs(fn.f(x0) - 1) < 0.12,
             progress:(fn,x0) => {
               const diff = Math.abs(fn.f(x0) - 1);
               return Math.max(0, 1 - diff / 2);
             },
             visualHint:(fn,c,ctx) => {
               const [,oy] = c.toS(0,1);
               ctx.save();
               ctx.strokeStyle = 'rgba(167, 139, 250, 0.3)';
               ctx.lineWidth = 2;
               ctx.setLineDash([5,5]);
               ctx.beginPath();
               ctx.moveTo(c.pad.l, oy);
               ctx.lineTo(ctx.canvas.width - c.pad.r, oy);
               ctx.stroke();
               ctx.setLineDash([]);
               ctx.restore();
             },
             ach:{id:'yEquals1',icon:'target',name:'One Finder'}
           },
           {
             prompt:'Find where f(x) > 2',
             hint:'Any point where the function value exceeds 2',
             isApplicable:(fn) => {
               return hasValueInRange(fn, x => fn.f(x) > 1.8);
             },
             check:(fn,x0) => fn.f(x0) > 2,
             progress:(fn,x0) => {
               const y = fn.f(x0);
               return y > 2 ? 1 : Math.max(0, y / 2);
             },
             visualHint:(fn,c,ctx) => {},
             ach:{id:'above2',icon:'arrowUp',name:'High Flyer'}
           },
           
           // Advanced Challenges (21-25)
           {
             prompt:'Find where the tangent angle is 45° (slope = 1)',
             hint:'Perfect diagonal - rises as much as it runs',
             check:(fn,x0) => Math.abs(fn.df(x0) - 1) < 0.08,
             progress:(fn,x0) => {
               const diff = Math.abs(fn.df(x0) - 1);
               return Math.max(0, 1 - diff / 2);
             },
             visualHint:(fn,c,ctx) => {},
             ach:{id:'angle45',icon:'zap',name:'45° Master'}
           },
           {
             prompt:'Find where curvature κ < 0.1 (nearly straight)',
             hint:'A section where the curve is almost a straight line',
             check:(fn,x0) => {
               const k = kappa(fn.df(x0), fn.d2f(x0));
               return k < 0.1;
             },
             progress:(fn,x0) => {
               const k = kappa(fn.df(x0), fn.d2f(x0));
               return Math.max(0, 1 - k / 0.5);
             },
             visualHint:(fn,c,ctx) => {},
             ach:{id:'straight',icon:'line',name:'Straightener'}
           },
           {
             prompt:'Find where f′(x) and f″(x) have opposite signs',
             hint:'Increasing but concave down, or decreasing but concave up',
             check:(fn,x0) => {
               const g = fn.df(x0);
               const g2 = fn.d2f(x0);
               return Math.abs(g) > 0.1 && Math.abs(g2) > 0.1 && g * g2 < 0;
             },
             progress:(fn,x0) => {
               const g = fn.df(x0);
               const g2 = fn.d2f(x0);
               if(g * g2 < 0) return 1;
               return 0;
             },
             visualHint:(fn,c,ctx) => {},
             ach:{id:'opposite',icon:'spiral',name:'Contradiction Finder'}
           },
           {
             prompt:'Find where the rate of change is fastest (max |f′(x)|)',
             hint:'The steepest point - maximum absolute slope',
             check:(fn,x0) => {
               const g0 = Math.abs(fn.df(x0));
               let max = 0;
               const N = 80;
               for(let i=0;i<=N;i++){
                 const x = fn.xmin + (fn.xmax-fn.xmin)*i/N;
                 const g = Math.abs(fn.df(x));
                 if(g > max) max = g;
               }
               return g0 >= max * 0.93;
             },
             progress:(fn,x0) => {
               const g0 = Math.abs(fn.df(x0));
               let max = 0;
               const N = 80;
               for(let i=0;i<=N;i++){
                 const x = fn.xmin + (fn.xmax-fn.xmin)*i/N;
                 const g = Math.abs(fn.df(x));
                 if(g > max) max = g;
               }
               return max > 0 ? g0 / max : 0;
             },
             visualHint:(fn,c,ctx) => {},
             ach:{id:'fastest',icon:'zap',name:'Speed Demon'}
           },
           {
             prompt:'Find a saddle point (f′(x)=0 and f″(x)=0)',
             hint:'A critical point that is also an inflection point',
             check:(fn,x0) => Math.abs(fn.df(x0)) < 0.08 && Math.abs(fn.d2f(x0)) < 0.12,
             progress:(fn,x0) => {
               const g = Math.abs(fn.df(x0));
               const g2 = Math.abs(fn.d2f(x0));
               const p1 = Math.max(0, 1 - g / 0.3);
               const p2 = Math.max(0, 1 - g2 / 0.5);
               return (p1 + p2) / 2;
             },
             visualHint:(fn,c,ctx) => {},
             ach:{id:'saddle',icon:'crystal',name:'Saddle Master'}
           }
         ];
