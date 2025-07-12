/**
 * Function Categories Configuration
 * 35+ preset functions across 6 categories
 */

// ── Function Categories ─────────────────────────────────────────────
         const CATEGORIES = [
           {
             name:'Polynomial', icon:'numbers',
             fns:[
               {key:'lin',  label:'2x − 1',           expr:'2*x - 1',              xmin:-4,          xmax:4},
               {key:'quad', label:'x² − 2x − 1',      expr:'x^2 - 2*x - 1',       xmin:-1.5,        xmax:3.8},
               {key:'cub',  label:'x³ − 3x² + x + 2', expr:'x^3 - 3*x^2 + x + 2', xmin:-1.0,        xmax:3.2},
               {key:'qrt',  label:'x⁴ − 4x²',         expr:'x^4 - 4*x^2',         xmin:-2.6,        xmax:2.6},
               {key:'qui',  label:'x⁵ − 5x³ + 4x',    expr:'x^5 - 5*x^3 + 4*x',   xmin:-2.4,        xmax:2.4},
               {key:'che',  label:'2x³ − 9x² + 12x',  expr:'2*x^3 - 9*x^2 + 12*x',xmin:-0.5,        xmax:3.5},
             ]
           },
           {
             name:'Trigonometric', icon:'wave',
             fns:[
               {key:'sin',   label:'sin(x)',            expr:'sin(x)',               xmin:-Math.PI*1.2, xmax:Math.PI*1.2},
               {key:'cos',   label:'cos(x)',            expr:'cos(x)',               xmin:-Math.PI*1.2, xmax:Math.PI*1.2},
               {key:'2sin',  label:'2·sin(x)',          expr:'2*sin(x)',             xmin:-Math.PI*1.2, xmax:Math.PI*1.2},
               {key:'sincx', label:'cos(x) + x/2',     expr:'cos(x) + x/2',         xmin:-Math.PI*1.2, xmax:Math.PI*1.2},
               {key:'sin2x', label:'sin(2x)',           expr:'sin(2*x)',             xmin:-Math.PI*1.2, xmax:Math.PI*1.2},
               {key:'sin2',  label:'sin²(x)',           expr:'sin(x)^2',             xmin:-Math.PI,     xmax:Math.PI},
               {key:'sincos',label:'sin(x)·cos(x)',     expr:'sin(x)*cos(x)',        xmin:-Math.PI,     xmax:Math.PI},
               {key:'tan',   label:'tan(x)',            expr:'tan(x)',               xmin:-1.4,         xmax:1.4},
               {key:'absin', label:'|sin(x)|',          expr:'abs(sin(x))',          xmin:-Math.PI,     xmax:Math.PI},
             ]
           },
           {
             name:'Exponential & Log', icon:'chartUp',
             fns:[
               {key:'expx',  label:'eˣ',               expr:'exp(x)',               xmin:-2.5,        xmax:2.5},
               {key:'expm',  label:'e^(−x²)  Gaussian', expr:'exp(-x^2)',            xmin:-3,          xmax:3},
               {key:'expd',  label:'eˣ/3 − x',         expr:'exp(x)/3 - x',        xmin:-1.2,        xmax:2.8},
               {key:'xexp',  label:'x·eˣ',             expr:'x*exp(x)',             xmin:-3,          xmax:2},
               {key:'logx',  label:'ln(x)',             expr:'log(x)',               xmin:0.1,         xmax:5},
               {key:'xlog',  label:'x·ln(x)',           expr:'x*log(x)',             xmin:0.1,         xmax:4},
               {key:'lnm1',  label:'ln(1+x²)',          expr:'log(1+x^2)',           xmin:-4,          xmax:4},
             ]
           },
           {
             name:'Rational', icon:'divide',
             fns:[
               {key:'inv',   label:'1/x',              expr:'1/x',                  xmin:0.2,         xmax:5},
               {key:'rat1',  label:'x/(1+x²)',         expr:'x/(1+x^2)',            xmin:-4,          xmax:4},
               {key:'rat2',  label:'(x²−1)/(x²+1)',   expr:'(x^2-1)/(x^2+1)',     xmin:-5,          xmax:5},
               {key:'inv2',  label:'1/(1+x²)',         expr:'1/(1+x^2)',            xmin:-5,          xmax:5},
               {key:'rat3',  label:'x²/(1+|x|)',       expr:'x^2/(1+abs(x))',       xmin:-4,          xmax:4},
             ]
           },
           {
             name:'Hyperbolic', icon:'infinity',
             fns:[
               {key:'sinh',  label:'sinh(x)',          expr:'sinh(x)',              xmin:-2.5,        xmax:2.5},
               {key:'cosh',  label:'cosh(x)',          expr:'cosh(x)',              xmin:-2.5,        xmax:2.5},
               {key:'tanh',  label:'tanh(x)',          expr:'tanh(x)',              xmin:-3,          xmax:3},
             ]
           },
           {
             name:'Special & Composite', icon:'sparkle',
             fns:[
               {key:'sqrt',  label:'√x',              expr:'sqrt(x)',              xmin:0,           xmax:5},
               {key:'cbrt',  label:'x^(1/3)',         expr:'x^(1/3)',              xmin:-3,          xmax:3},
               {key:'abs',   label:'|x|',             expr:'abs(x)',               xmin:-4,          xmax:4},
               {key:'absc',  label:'|x−1|+|x+1|',    expr:'abs(x-1)+abs(x+1)',    xmin:-4,          xmax:4},
               {key:'bell',  label:'x·e^(−x²/2)',     expr:'x*exp(-x^2/2)',        xmin:-3.5,        xmax:3.5},
               {key:'logis', label:'1/(1+e^(−x))',    expr:'1/(1+exp(-x))',        xmin:-6,          xmax:6},
             ]
           },
         ];
