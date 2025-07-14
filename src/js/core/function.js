/**
 * Function Management
 * Set and configure functions
 */

// ── Set Function ─────────────────────────────────────────────────────
         function setFn(fnDef){
           let f,expr;
           if(fnDef.f){
             f=fnDef.f; expr=fnDef.expr||fnDef.label;
           } else {
             const p=PARSER.parse(fnDef.expr||fnDef.label);
             if(!p){showToast('x Parse error','error');return false;}
             f=p.f; expr=p.expr;
           }
           S.fn={
             ...fnDef,
             f, expr,
             df:x=>PARSER.df(f,x),
             d2f:x=>PARSER.d2f(f,x),
           };
           // Update slider range
           const sl=document.getElementById('xSlider');
           sl.min=fnDef.xmin; sl.max=fnDef.xmax;
           sl.step=Math.max(0.001,(fnDef.xmax-fnDef.xmin)/2000).toFixed(6);
           S.x0=clamp(S.x0,fnDef.xmin,fnDef.xmax);
           if(S.x0===fnDef.xmin||S.x0===fnDef.xmax)
             S.x0=(fnDef.xmin+fnDef.xmax)/2;
           sl.value=S.x0;
           document.getElementById('rMin').textContent=fmtAxis(fnDef.xmin);
           document.getElementById('rMax').textContent=fmtAxis(fnDef.xmax);
           document.getElementById('fnLabel').textContent=`f(x) = ${fnDef.label||fnDef.expr}`;

           S.staticDirty=true;
           scheduleRedraw();
           return true;
         }
