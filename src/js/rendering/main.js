/**
 * Main Rendering Loop
 * Draw and redraw management
 */

// ── Main Draw ────────────────────────────────────────────────────────
         const cvs=document.getElementById('cvs');
         const ctx=cvs.getContext('2d');
         const dcvs=document.getElementById('dcvs');
         const dctx=dcvs.getContext('2d');

         function draw(){
           if(!S.fn) return;
           const dpr=window.devicePixelRatio||1;
           const wrap=document.getElementById('mainWrap');
           const W=wrap.clientWidth;
           const H=Math.min(Math.round(W*0.58),480);

           const pw=Math.round(W*dpr), ph=Math.round(H*dpr);

           // Rebuild static if needed or if size changed
           if(S.staticDirty||cvs.width!==pw||cvs.height!==ph){
             cvs.style.height=H+'px';
             cvs.width=pw; cvs.height=ph;
             ctx.setTransform(dpr,0,0,dpr,0,0);
             buildStatic(W,H,dpr);
             S.staticDirty=false;
           }

           // Blit static layer
           ctx.clearRect(0,0,W,H);
           ctx.drawImage(S.offscreen,0,0,W,H);

           // Dynamic elements on top
           drawDynamic(ctx,W,H);

           // Derivative panel if visible
           if(S.view==='dual') drawDerivPanel();
         }

         function scheduleRedraw(){
  if(S.redrawRaf) return;
  S.redrawRaf=requestAnimationFrame(()=>{
    S.redrawRaf=null;
    draw();
    updateSliderRange();
  });
}
