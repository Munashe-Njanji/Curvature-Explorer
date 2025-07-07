/**
 * Canvas Interaction Handlers
 * Mouse and touch events
 */

// ── Canvas Interaction: Pan, Zoom, Point Drag ────────────────────────
function setupInteraction(){
           let dragging=false;
           let dragStartX=0, dragStartY=0;
           let dragMode='none'; // 'none', 'point', 'pan'

           function getCanvasCoords(e){
             const rect=cvs.getBoundingClientRect();
             const cx=e.touches?e.touches[0].clientX:e.clientX;
             const cy=e.touches?e.touches[0].clientY:e.clientY;
             return {x:cx-rect.left, y:cy-rect.top};
           }

           function isNearPoint(canvasX){
             if(!S.coord||!S.fn) return false;
             const [ppx]=S.coord.toS(S.x0,S.fn.f(S.x0));
             return Math.abs(canvasX-ppx)<20;
           }

           function applyPointDrag(logX){
             if(!S.coord) return;
             const c=S.coord;
             // Convert canvas pixel to math coordinate
             const mx=c.xmin+(logX-c.pad.l)/(c.W-c.pad.l-c.pad.r)*(c.xmax-c.xmin);
             // Don't clamp - allow point to go anywhere in viewport
             S.x0=mx;
             // Update slider value immediately (will be within current viewport range)
             const sl=document.getElementById('xSlider');
             sl.value=mx.toFixed(6);

             // Don't auto-pan during drag - wait until drag ends
             // This prevents coordinate system from changing while dragging

             scheduleRedraw();
             if(S.challengeActive) checkChallenge(S.x0);
           }

           function applyPan(dx,dy){
             if(!S.coord) return;
             const c=S.coord;
             const xScale=(c.xmax-c.xmin)/(c.W-c.pad.l-c.pad.r);
             const yScale=(c.ymax-c.ymin)/(c.H-c.pad.t-c.pad.b);
             S.panX-=dx*xScale;
             S.panY+=dy*yScale;
             S.staticDirty=true;
             scheduleRedraw();
           }

           cvs.addEventListener('mousedown',e=>{
             const coords=getCanvasCoords(e);
             dragging=true;
             dragStartX=coords.x;
             dragStartY=coords.y;

             if(e.shiftKey||e.ctrlKey||e.metaKey){
               // Force pan mode with modifier keys
               dragMode='pan';
               cvs.classList.add('grabbing');
             }else{
               // Default: move point to clicked location
               dragMode='point';
               S.isDraggingPoint=true;
               cvs.classList.add('dragging-point');
               applyPointDrag(coords.x);
             }
           });

           window.addEventListener('mousemove',e=>{
             if(!dragging){
               if(S.coord&&S.fn){
                 const coords=getCanvasCoords(e);
                 // Show grab cursor when holding modifier, otherwise show crosshair for point placement
                 if(e.shiftKey||e.ctrlKey||e.metaKey){
                   cvs.style.cursor='grab';
                 }else{
                   cvs.style.cursor='crosshair';
                 }
               }
               return;
             }

             const coords=getCanvasCoords(e);
             if(dragMode==='point'){
               applyPointDrag(coords.x);
             }else if(dragMode==='pan'){
               const dx=coords.x-dragStartX;
               const dy=coords.y-dragStartY;
               applyPan(dx,dy);
               dragStartX=coords.x;
               dragStartY=coords.y;
             }
           });

           window.addEventListener('mouseup',()=>{
             dragging=false;
             S.isDraggingPoint=false;

             // Auto-pan after drag ends to center point if needed
             if(dragMode==='point'){
               autoPanToKeepPointVisible();
             }

             dragMode='none';
             cvs.classList.remove('grabbing','dragging-point');
             cvs.style.cursor='crosshair';
           });

           // Mouse wheel zoom
           cvs.addEventListener('wheel',e=>{
             e.preventDefault();
             const coords=getCanvasCoords(e);
             const zoomFactor=e.deltaY<0?1.1:0.9;

             // Zoom toward mouse position
             if(S.coord){
               const [mx,my]=S.coord.toM(coords.x,coords.y);
               const oldZoom=S.zoom;
               S.zoom=clamp(S.zoom*zoomFactor,0.1,10);

               // Adjust pan to zoom toward mouse
               const zoomRatio=S.zoom/oldZoom;
               const xCenter=(S.fn.xmin+S.fn.xmax)/2+S.panX;
               const yCenter=(S.coord.ymin+S.coord.ymax)/2+S.panY;
               S.panX+=(mx-xCenter)*(1-1/zoomRatio);
               S.panY+=(my-yCenter)*(1-1/zoomRatio);
             }

             updateZoomDisplay();
             S.staticDirty=true;
             scheduleRedraw();
           },{passive:false});

           // Double-click to reset zoom
           cvs.addEventListener('dblclick',()=>{
             S.zoom=1.0;
             S.panX=0;
             S.panY=0;
             updateZoomDisplay();
             S.staticDirty=true;
             scheduleRedraw();
           });

           // Touch support with pinch-to-zoom
           cvs.addEventListener('touchstart',e=>{
             e.preventDefault();
             if(e.touches.length===1){
               const coords=getCanvasCoords(e);
               dragging=true;
               dragStartX=coords.x;
               dragStartY=coords.y;
               // Single touch: move point to location (like mouse click)
               dragMode='point';
               S.isDraggingPoint=true;
               applyPointDrag(coords.x);
             }else if(e.touches.length===2){
               const dx=e.touches[1].clientX-e.touches[0].clientX;
               const dy=e.touches[1].clientY-e.touches[0].clientY;
               S.lastPinchDist=Math.sqrt(dx*dx+dy*dy);
               dragMode='pinch';
             }
           },{passive:false});

           cvs.addEventListener('touchmove',e=>{
             e.preventDefault();
             if(e.touches.length===1&&dragMode==='point'){
               const coords=getCanvasCoords(e);
               applyPointDrag(coords.x);
             }else if(e.touches.length===1&&dragMode==='pan'){
               const coords=getCanvasCoords(e);
               const dx=coords.x-dragStartX;
               const dy=coords.y-dragStartY;
               applyPan(dx,dy);
               dragStartX=coords.x;
               dragStartY=coords.y;
             }else if(e.touches.length===2&&dragMode==='pinch'){
               const dx=e.touches[1].clientX-e.touches[0].clientX;
               const dy=e.touches[1].clientY-e.touches[0].clientY;
               const dist=Math.sqrt(dx*dx+dy*dy);
               if(S.lastPinchDist){
                 const zoomFactor=dist/S.lastPinchDist;
                 S.zoom=clamp(S.zoom*zoomFactor,0.1,10);
                 updateZoomDisplay();
                 S.staticDirty=true;
                 scheduleRedraw();
               }
               S.lastPinchDist=dist;
             }
           },{passive:false});

           cvs.addEventListener('touchend',e=>{
             if(e.touches.length===0){
               dragging=false;
               S.isDraggingPoint=false;

               // Auto-pan after touch drag ends
               if(dragMode==='point'){
                 autoPanToKeepPointVisible();
               }

               dragMode='none';
               S.lastPinchDist=null;
             }
           });
         }
