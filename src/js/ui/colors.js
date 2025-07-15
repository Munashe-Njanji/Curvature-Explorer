/**
 * Gradient Color System
 * Dynamic coloring based on slope
 */

// ── UI Updates ───────────────────────────────────────────────────────
         function getGradientColor(g){
           // Map atan(g) in [-pi/2,pi/2] to hue 0..120 (red to yellow to green)
           const t=(Math.atan(g/2)/Math.PI+0.5);
           const hue=t*120;
           const lightness=S.currentTheme==='light'?45:58;
           return {
             hue:hue,
             hsl:`hsl(${hue},88%,${lightness}%)`,
             hslBright:`hsl(${hue},88%,${lightness+10}%)`,
             hslDim:`hsl(${hue},88%,${lightness-10}%)`,
             hslBg:`hsl(${hue},88%,${lightness}%,0.1)`,
             hslBorder:`hsl(${hue},88%,${lightness}%,0.3)`,
           };
         }

         function updateUI(x0,y0,g,g2){
           // Get gradient-based color
           const color=getGradientColor(g);

           // Apply color to point indicator
           document.documentElement.style.setProperty('--point-dynamic',color.hsl);

           // Equations
           const tInt=y0-g*x0;
           const eqTEl=document.getElementById('eqT');
           const eqNEl=document.getElementById('eqN');
           const eqGEl=document.getElementById('eqG');

           eqTEl.textContent=linEq(g,tInt);
           eqTEl.style.color=color.hsl;

           if(Math.abs(g)<1e-9){
             eqNEl.textContent=`x = ${fmtN(x0,4)}`;
           } else {
             const ns=-1/g;
             eqNEl.textContent=linEq(ns,y0-ns*x0);
           }
           eqNEl.style.color=color.hsl;

           eqGEl.textContent=fmtN(g,5);
           eqGEl.style.color=color.hsl;

           // Apply background colors to equation cards
           document.querySelector('.eq-card.t').style.background=color.hslBg;
           document.querySelector('.eq-card.t').style.borderColor=color.hslBorder;
           document.querySelector('.eq-card.n').style.background=color.hslBg;
           document.querySelector('.eq-card.n').style.borderColor=color.hslBorder;
           document.querySelector('.eq-card.g').style.background=color.hslBg;
           document.querySelector('.eq-card.g').style.borderColor=color.hslBorder;

           // Stats
           const stXEl=document.getElementById('stX');
           const stYEl=document.getElementById('stY');
           const stGEl=document.getElementById('stG');
           const stG2El=document.getElementById('stG2');
           const stCEl=document.getElementById('stC');

           stXEl.textContent=fmtN(x0,4);
           stYEl.textContent=fmtN(y0,4);
           stGEl.textContent=fmtN(g,4);
           stG2El.textContent=fmtN(g2,4);
           stCEl.textContent=fmtN(kappa(g,g2),4);

           // Color the gradient stat
           stGEl.style.color=color.hsl;
           stGEl.parentElement.style.background=color.hslBg;
           stGEl.parentElement.style.borderColor=color.hslBorder;

           // Status
           const sEl=document.getElementById('stS');
           const sSt=document.getElementById('statStatus');
           sSt.classList.remove('rising','falling','critical');
           sSt.style.background=color.hslBg;
           sSt.style.borderColor=color.hslBorder;

           if(Math.abs(g)<0.08){
             sEl.innerHTML = '';
             sEl.appendChild(createIcon('target'));
             sEl.appendChild(document.createTextNode(' Critical'));
             sEl.style.color=color.hsl;
             sSt.classList.add('critical');
           } else if(g>0){
             sEl.innerHTML = '';
             sEl.appendChild(createIcon('arrowUp'));
             sEl.appendChild(document.createTextNode(' Rising'));
             sEl.style.color=color.hsl;
             sSt.classList.add('rising');
           } else {
             sEl.innerHTML = '';
             sEl.appendChild(createIcon('arrowDown'));
             sEl.appendChild(document.createTextNode(' Falling'));
             sEl.style.color=color.hsl;
             sSt.classList.add('falling');
           }

           // Slider readout with gradient color
           const xReadEl=document.getElementById('xRead');
           xReadEl.textContent=`x₀ = ${fmtN(x0,4)}`;
           xReadEl.style.color=color.hsl;

           // Color the slider thumb
           const style=document.getElementById('dynamic-slider-style')||document.createElement('style');
           style.id='dynamic-slider-style';
           style.textContent=`
             input[type=range]::-webkit-slider-thumb {
               background: ${color.hsl} !important;
               box-shadow: 0 0 0 2px ${color.hsl}, 0 2px 8px rgba(0,0,0,0.3) !important;
             }
             input[type=range]::-moz-range-thumb {
               background: ${color.hsl} !important;
               box-shadow: 0 0 0 2px ${color.hsl} !important;
             }
           `;
           if(!style.parentElement) document.head.appendChild(style);

           // Check challenge
           if(S.challengeActive) checkChallenge(x0);
         }
