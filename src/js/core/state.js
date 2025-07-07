/**
 * Application State
 * Centralized state management
 */

// ── State ───────────────────────────────────────────────────────────
         const S = {
           fn:null,           // current function object
           x0:1.0,           // current x
           view:'main',      // 'main' | 'dual'
           isDrag:false,     // dragging on canvas
           isAnim:false,     // animating
           animRaf:null,     // animation RAF id
           redrawRaf:null,   // pending redraw RAF
           staticDirty:true, // static canvas needs rebuild
           offscreen:null,   // HTMLCanvasElement for static layer
           coord:null,       // coordinate system object
           achUnlocked:new Set(),
           fnCount:0,
           currChallenge:0,
           challengeActive:false,
           zoom:1.0,
           panX:0,
           panY:0,
           isPanning:false,
           panStartX:0,
           panStartY:0,
           isDraggingPoint:false,
           lastPinchDist:null,
         };
