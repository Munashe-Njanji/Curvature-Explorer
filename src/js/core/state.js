/**
 * Application State
 * Centralized state management
 */

// ── State ───────────────────────────────────────────────────────────
         const S = {
           fn:null,           // current function object
           x0:1.0,           // current x
           view:'main',      // 'main' | 'dual' | 'multi'
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
           challengeActive:false, // Toggle via navbar button
           challengeProgress:0, // 0-1 progress toward current challenge
           challengeSolved:false, // whether current challenge is solved
           zoom:1.0,
           panX:0,
           panY:0,
           isPanning:false,
           panStartX:0,
           panStartY:0,
           isDraggingPoint:false,
           lastPinchDist:null,
           multiFns:[],      // array of functions for multi-plot
           showIntegral:false, // toggle integral visualization
           multiMode:false,  // multi-function mode active
           currentTheme:'dark', // current theme
         };
