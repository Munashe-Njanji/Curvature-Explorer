/**
 * Slider Controls
 * Point position slider
 */

// ── Update Slider Range ──────────────────────────────────────────────
         function updateSliderRange(){
           if(!S.coord||!S.fn) return;
           const c=S.coord;
           const sl=document.getElementById('xSlider');

           // Set slider range to current viewport
           sl.min=c.xmin.toFixed(6);
           sl.max=c.xmax.toFixed(6);
           sl.step=Math.max(0.0001,(c.xmax-c.xmin)/2000).toFixed(6);

           // Update range labels
           document.getElementById('rMin').textContent=fmtAxis(c.xmin);
           document.getElementById('rMax').textContent=fmtAxis(c.xmax);

           // Always set slider value to current x0 (clamped to viewport for display)
           // The actual S.x0 can be anywhere
           const displayValue=clamp(S.x0,c.xmin,c.xmax);
           sl.value=displayValue.toFixed(6);
         }

// ── Slider Event Handler ──────────────────────────────────────────────
let sliderPanTimeout=null;
function initSlider(){
  document.getElementById('xSlider').addEventListener('input',e=>{
    S.x0=parseFloat(e.target.value);
    scheduleRedraw();
    
    // Debounce auto-pan - only pan after slider stops moving for 150ms
    clearTimeout(sliderPanTimeout);
    sliderPanTimeout=setTimeout(()=>{
      if(S.coord&&S.fn){
        autoPanToKeepPointVisible();
      }
    },150);
  });
}
