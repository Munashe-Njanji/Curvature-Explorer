/**
 * Challenge System Configuration
 * 5 calculus challenges for learning
 */

// ── Challenges ──────────────────────────────────────────────────────
         const CHALLENGES = [
           {
             prompt:'Find where the tangent is horizontal: f′(x) = 0',
             hint:'💡 Look for peaks or valleys — local extrema!',
             check:(fn,x0) => Math.abs(fn.df(x0)) < 0.06,
             ach:{id:'crit',icon:'🎯',name:'Critical Finder'}
           },
           {
             prompt:'Find where the tangent slope equals exactly 1',
             hint:'💡 The tangent rises 1 unit for every 1 unit right',
             check:(fn,x0) => Math.abs(fn.df(x0) - 1) < 0.1,
             ach:{id:'slope1',icon:'⚡',name:'Slope Ninja'}
           },
           {
             prompt:'Find an inflection point where f″(x) ≈ 0',
             hint:'💡 Where the curve changes from concave ∪ to ∩',
             check:(fn,x0) => Math.abs(fn.d2f(x0)) < 0.12,
             ach:{id:'infl',icon:'🌀',name:'Inflection Hunter'}
           },
           {
             prompt:'Find where the curve is steepest (max |f′(x)|)',
             hint:'💡 Look for the point where gradient is largest',
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
             ach:{id:'steep',icon:'🏔️',name:'Peak Gradient'}
           },
           {
             prompt:'Find a point where curvature κ is at maximum',
             hint:'💡 Where the curve bends the most sharply',
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
             ach:{id:'curv',icon:'🔮',name:'Curvature Master'}
           }
         ];
