/**
 * Zoom Controls
 * Zoom in/out/reset functionality
 */

// ── Zoom Controls ────────────────────────────────────────────────────
         function updateZoomDisplay(){
           document.getElementById('zoomLevel').textContent=Math.round(S.zoom*100)+'%';
         }

         document.getElementById('zoomIn').addEventListener('click',()=>{
           S.zoom=clamp(S.zoom*1.2,0.1,10);
           updateZoomDisplay();
           S.staticDirty=true;
           scheduleRedraw();
         });

         document.getElementById('zoomOut').addEventListener('click',()=>{
           S.zoom=clamp(S.zoom/1.2,0.1,10);
           updateZoomDisplay();
           S.staticDirty=true;
           scheduleRedraw();
         });

         document.getElementById('zoomReset').addEventListener('click',()=>{
           S.zoom=1.0;
           S.panX=0;
           S.panY=0;
           updateZoomDisplay();
           S.staticDirty=true;
           scheduleRedraw();
         });
