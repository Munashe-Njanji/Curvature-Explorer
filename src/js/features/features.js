/**
 * Features Module
 * Achievements, challenges, tooltips, share, and other features
 */

// ── Achievement System ────────────────────────────────────────────────
function unlock(id){
  if(S.achUnlocked.has(id)) return;
  S.achUnlocked.add(id);
  try{localStorage.setItem('cepro_ach',JSON.stringify([...S.achUnlocked]));}catch{}
  const def=ACHIEVEMENT_DEFS[id];
  if(def){
    const toastMsg = document.createElement('span');
    toastMsg.appendChild(createIcon(def.icon));
    toastMsg.appendChild(document.createTextNode(` ${def.name}: ${def.desc}`));
    showToast(toastMsg.innerHTML,'success');
  }
  renderAch();
}

function renderAch(){
  const el=document.getElementById('achEl');
  el.innerHTML='';
  Object.entries(ACHIEVEMENT_DEFS).forEach(([id,def])=>{
    const d=document.createElement('div');
    d.className='ach'+(S.achUnlocked.has(id)?' done':'');
    d.title=def.desc;
    d.appendChild(createIcon(def.icon, 'icon-xs'));
    el.appendChild(d);
  });
}

// ── Tooltip System ────────────────────────────────────────────────────
function initTooltips(){
  const tip=document.getElementById('tooltip');
  document.querySelectorAll('.info-btn').forEach(btn=>{
    btn.addEventListener('mouseenter',e=>{
      const data=TIPS[btn.dataset.tip];
      if(!data) return;
      document.getElementById('ttTitle').textContent=data.title;
      document.getElementById('ttBody').textContent=data.body;
      document.getElementById('ttFormula').textContent=data.formula;
      const x=e.pageX+14, y=e.pageY-8;
      tip.style.left=x+'px'; tip.style.top=y+'px';
      tip.classList.add('vis');
    });
    btn.addEventListener('mouseleave',()=>tip.classList.remove('vis'));
  });
}

// ── Share ─────────────────────────────────────────────────────────────
function initShare(){
  document.getElementById('shareBtn').addEventListener('click',()=>{
    const fn=S.fn;
    if(!fn) return;
    const p=new URLSearchParams({
      expr:fn.expr||fn.label,
      xmin:fn.xmin,xmax:fn.xmax,x0:S.x0.toFixed(5),view:S.view
    });
    const url=`${location.origin}${location.pathname}?${p}`;
    navigator.clipboard.writeText(url).then(()=>{
      const btn=document.getElementById('shareBtn');
      btn.classList.add('success');
      btn.innerHTML = '';
      btn.appendChild(createIcon('check'));
      btn.appendChild(document.createTextNode(' Copied!'));
      unlock('share');
      const toastMsg = document.createElement('span');
      toastMsg.appendChild(createIcon('link'));
      toastMsg.appendChild(document.createTextNode(' Link copied!'));
      showToast(toastMsg.innerHTML,'success');
      setTimeout(()=>{
        btn.classList.remove('success');
        btn.innerHTML = '';
        btn.appendChild(createIcon('link'));
        btn.appendChild(document.createTextNode(' Share'));
      },2200);
    }).catch(()=>{
      const toastMsg = document.createElement('span');
      toastMsg.appendChild(createIcon('x'));
      toastMsg.appendChild(document.createTextNode(' Copy failed'));
      showToast(toastMsg.innerHTML,'error');
    });
  });
}

// ── URL Params ────────────────────────────────────────────────────────
function loadURL(){
  const p=new URLSearchParams(location.search);
  const expr=p.get('expr');
  if(!expr) return;
  const parsed=PARSER.parse(expr);
  if(!parsed) return;
  const fn={
    key:'url',label:expr,expr:parsed.expr,
    f:parsed.f,
    df:x=>PARSER.df(parsed.f,x),
    d2f:x=>PARSER.d2f(parsed.f,x),
    xmin:parseFloat(p.get('xmin'))||(-6),
    xmax:parseFloat(p.get('xmax'))||6,
  };
  setFn(fn);
  const x0=parseFloat(p.get('x0'));
  if(isFinite(x0)) S.x0=x0;
  if(p.get('view')==='dual'){
    S.view='dual';
    document.getElementById('deriv-panel').style.display='block';
    document.querySelector('.vbtn[data-view="dual"]').classList.add('active');
    document.querySelector('.vbtn[data-view="main"]').classList.remove('active');
  }
}

// ── Toast ─────────────────────────────────────────────────────────────
let toastTimer=null;
function showToast(msg,type=''){
  const el=document.getElementById('toast');
  const msgEl = document.getElementById('toastMsg');
  // Check if msg is HTML string or plain text
  if(typeof msg === 'string' && msg.includes('<')) {
    msgEl.innerHTML = msg;
  } else {
    msgEl.textContent = msg;
  }
  el.className='toast '+(type||'')+' show';
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>el.classList.remove('show'),3200);
}

// ── Challenge System ──────────────────────────────────────────────────
function initChallenges(){
  // Challenge button in navbar toggles visibility
  document.getElementById('challengeBtn').addEventListener('click',()=>{
    S.challengeActive = !S.challengeActive;
    const box = document.getElementById('challengeBox');
    const btn = document.getElementById('challengeBtn');
    
    if(S.challengeActive){
      box.style.display = 'block';
      btn.classList.add('active');
      loadChallenge(S.currChallenge);
    } else {
      box.style.display = 'none';
      btn.classList.remove('active');
      S.challengeSolved = false;
      S.challengeProgress = 0;
      scheduleRedraw(); // Remove visual hints
    }
  });
  
  document.getElementById('hintBtn').addEventListener('click',()=>{
    const h=document.getElementById('chHint');
    h.classList.toggle('vis');
  });
  
  document.getElementById('nextChBtn').addEventListener('click',()=>{
    S.currChallenge=(S.currChallenge+1)%CHALLENGES.length;
    loadChallenge(S.currChallenge);
  });
}

function loadChallenge(i){
  // Check if challenge is applicable to current function
  const ch = CHALLENGES[i];
  if(S.fn && ch.isApplicable && !ch.isApplicable(S.fn)){
    // Skip to next applicable challenge
    const startIdx = i;
    let attempts = 0;
    while(attempts < CHALLENGES.length){
      i = (i + 1) % CHALLENGES.length;
      attempts++;
      const nextCh = CHALLENGES[i];
      if(!nextCh.isApplicable || nextCh.isApplicable(S.fn)){
        S.currChallenge = i;
        loadChallenge(i);
        return;
      }
    }
    // If no applicable challenge found, show message
    const toastMsg = document.createElement('span');
    toastMsg.appendChild(createIcon('info'));
    toastMsg.appendChild(document.createTextNode(' No applicable challenges for this function. Try a different curve!'));
    showToast(toastMsg.innerHTML,'');
    return;
  }
  
  document.getElementById('chPrompt').textContent=ch.prompt;
  document.getElementById('chHint').textContent=ch.hint;
  document.getElementById('chHint').classList.remove('vis');
  
  // Update challenge number
  document.getElementById('chNumber').textContent = `${i+1}/${CHALLENGES.length}`;
  
  // Reset challenge state
  S.challengeSolved = false;
  S.challengeProgress = 0;
  
  const statusEl = document.getElementById('chStatus');
  statusEl.className = 'ch-status pend';
  statusEl.innerHTML = '';
  statusEl.appendChild(createIcon('circle', 'icon-xs'));
  statusEl.appendChild(document.createTextNode(' In Progress'));
  
  // Update next button
  const nextBtn = document.getElementById('nextChBtn');
  nextBtn.innerHTML = 'Next ';
  nextBtn.appendChild(createIcon('arrowRight', 'icon-xs'));
  
  // Update progress bar
  updateChallengeProgress(0);
  
  // Show helpful toast
  const toastMsg = document.createElement('span');
  toastMsg.appendChild(createIcon('target'));
  toastMsg.appendChild(document.createTextNode(` Challenge ${i+1}/${CHALLENGES.length}: Move the slider to explore.`));
  showToast(toastMsg.innerHTML,'');
  
  // Redraw to show visual hints
  scheduleRedraw();
}

function checkChallenge(x0){
  if(!S.fn||!S.challengeActive) return;
  const ch=CHALLENGES[S.currChallenge];
  
  // Calculate progress
  const prevProgress = S.challengeProgress;
  if(ch.progress){
    S.challengeProgress = Math.max(0, Math.min(1, ch.progress(S.fn, x0)));
    updateChallengeProgress(S.challengeProgress);
    
    // Provide feedback when crossing thresholds
    if(!S.challengeSolved){
      if(prevProgress < 0.5 && S.challengeProgress >= 0.5){
        const toastMsg = document.createElement('span');
        toastMsg.appendChild(createIcon('arrowUp'));
        toastMsg.appendChild(document.createTextNode(' Getting warmer...'));
        showToast(toastMsg.innerHTML,'');
      } else if(prevProgress < 0.8 && S.challengeProgress >= 0.8){
        const toastMsg = document.createElement('span');
        toastMsg.appendChild(createIcon('zap'));
        toastMsg.appendChild(document.createTextNode(' Very close!'));
        showToast(toastMsg.innerHTML,'');
      }
    }
  }
  
  // Check if solved
  if(ch.check(S.fn,x0)){
    if(!S.challengeSolved){
      S.challengeSolved = true;
      S.challengeProgress = 1;
      
      const statusEl = document.getElementById('chStatus');
      statusEl.className = 'ch-status done';
      statusEl.innerHTML = '';
      statusEl.appendChild(createIcon('check', 'icon-xs'));
      statusEl.appendChild(document.createTextNode(' Solved!'));
      
      updateChallengeProgress(1);
      
      if(ch.ach) unlock(ch.ach.id);
      
      // Celebration toast
      const toastMsg = document.createElement('span');
      toastMsg.appendChild(createIcon('star'));
      toastMsg.appendChild(document.createTextNode(' Challenge completed!'));
      showToast(toastMsg.innerHTML,'success');
    }
  } else {
    if(S.challengeSolved){
      S.challengeSolved = false;
      const statusEl = document.getElementById('chStatus');
      statusEl.className = 'ch-status pend';
      statusEl.innerHTML = '';
      statusEl.appendChild(createIcon('circle', 'icon-xs'));
      statusEl.appendChild(document.createTextNode(' In Progress'));
    }
  }
}

function updateChallengeProgress(progress){
  const progressBar = document.getElementById('chProgressBar');
  if(!progressBar) return;
  
  const fill = progressBar.querySelector('.ch-progress-fill');
  const percent = progressBar.querySelector('.ch-progress-percent');
  
  if(fill){
    fill.style.width = (progress * 100) + '%';
    fill.style.background = progress > 0.8 ? 
      'linear-gradient(90deg, rgba(74, 255, 158, 0.8), rgba(74, 255, 158, 1))' :
      'linear-gradient(90deg, rgba(167, 139, 250, 0.6), rgba(167, 139, 250, 0.9))';
  }
  
  if(percent){
    percent.textContent = Math.round(progress * 100) + '%';
    percent.style.color = progress > 0.8 ? 'var(--success)' : 'var(--accent)';
  }
}

function setChStatus(cls,txt){
  const el=document.getElementById('chStatus');
  el.className='ch-status '+cls;
  el.textContent=txt;
}

// ── Custom Function ───────────────────────────────────────────────────
function initCustomFunction(){
  document.getElementById('applyFn').addEventListener('click',()=>{
    const expr=document.getElementById('userFn').value.trim();
    if(!expr) return;
    const p=PARSER.parse(expr);
    if(!p){
      const toastMsg = document.createElement('span');
      toastMsg.appendChild(createIcon('x'));
      toastMsg.appendChild(document.createTextNode(' Invalid expression. Try: x^2, sin(x), exp(-x^2)'));
      showToast(toastMsg.innerHTML,'error');
      return;
    }
    const fn={
      key:'custom',label:expr,expr:p.expr,
      f:p.f,
      df:x=>PARSER.df(p.f,x),
      d2f:x=>PARSER.d2f(p.f,x),
      xmin:-6,xmax:6
    };
    document.querySelectorAll('.fn-btn.active').forEach(b=>b.classList.remove('active'));
    if(setFn(fn)){
      unlock('custom');
      S.fnCount++;
      if(S.fnCount>=10) unlock('cat10');
      const toastMsg = document.createElement('span');
      toastMsg.appendChild(createIcon('sparkle'));
      toastMsg.appendChild(document.createTextNode(' Custom function loaded!'));
      showToast(toastMsg.innerHTML,'success');
    }
  });
  document.getElementById('userFn').addEventListener('keydown',e=>{
    if(e.key==='Enter') document.getElementById('applyFn').click();
  });
}

// ── View Toggle ───────────────────────────────────────────────────────
function initViewToggle(){
  document.querySelectorAll('.vbtn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const v=btn.dataset.view;
      document.querySelectorAll('.vbtn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      S.view=v;
      const dp=document.getElementById('deriv-panel');
      
      // Hide derivative panel for main view
      dp.style.display='none';
      
      // Show derivative panel for dual view
      if(v==='dual') {
        dp.style.display='block';
        drawDerivPanel();
      }
      
      S.staticDirty=true;
      scheduleRedraw();
    });
  });
}

// ── Multi-Function Controls ──────────────────────────────────────────
function initMultiFunction(){
  console.log('=== initMultiFunction START ===');
  
  const multiFnBtn = document.getElementById('multiFnBtn');
  const integralBtn = document.getElementById('integralBtn');
  const addBtn = document.getElementById('addFnBtn');
  const clearBtn = document.getElementById('clearMultiBtn');
  const mp = document.getElementById('multi-panel');
  const dp = document.getElementById('deriv-panel');
  
  console.log('Elements found:', {
    multiFnBtn: !!multiFnBtn,
    integralBtn: !!integralBtn,
    addBtn: !!addBtn,
    clearBtn: !!clearBtn,
    mp: !!mp,
    dp: !!dp
  });
  
  if(!multiFnBtn) {
    console.error('CRITICAL: multiFnBtn not found!');
    return;
  }
  
  // Multi-function mode toggle
  function toggleMulti() {
    try {
      console.log('toggleMulti called, current multiMode:', S.multiMode);
      S.multiMode = !S.multiMode;
      
      console.log('Setting active class, multiMode now:', S.multiMode);
      if(S.multiMode) {
        multiFnBtn.classList.add('active');
      } else {
        multiFnBtn.classList.remove('active');
      }
      
      if(S.multiMode) {
        // Enter multi-function mode
        console.log('Entering multi mode');
        S.view = 'multi';
        if(mp) {
          mp.style.display = 'block';
          console.log('Multi-panel shown');
        }
        if(dp) {
          dp.style.display = 'block';
          console.log('Deriv-panel shown');
        }
        
        // Deactivate view buttons
        document.querySelectorAll('.vbtn').forEach(b => b.classList.remove('active'));
        
        // Add current function if none added yet
        if(S.multiFns.length === 0 && S.fn) {
          console.log('Auto-adding current function:', S.fn.label);
          S.multiFns.push(S.fn);
          updateMultiFunctionList();
        }
        
        showToast('Multi-function mode enabled', 'success');
        
        if(S.multiFns.length > 0 && typeof drawMultiDerivPanel === 'function') {
          drawMultiDerivPanel();
        }
      } else {
        // Exit multi-function mode
        console.log('Exiting multi mode');
        S.view = 'main';
        if(mp) {
          mp.style.display = 'none';
          console.log('Multi-panel hidden');
        }
        if(dp) {
          dp.style.display = 'none';
          console.log('Deriv-panel hidden');
        }
        
        // Reactivate main view button
        const mainBtn = document.querySelector('.vbtn[data-view="main"]');
        if(mainBtn) mainBtn.classList.add('active');
        
        showToast('Multi-function mode disabled', '');
      }
      
      S.staticDirty = true;
      scheduleRedraw();
      console.log('toggleMulti complete');
    } catch(err) {
      console.error('Error in toggleMulti:', err);
    }
  }
  
  // Integral visualization toggle
  function toggleIntegral() {
    try {
      console.log('toggleIntegral called, current showIntegral:', S.showIntegral);
      S.showIntegral = !S.showIntegral;
      if(integralBtn) {
        if(S.showIntegral) {
          integralBtn.classList.add('active');
        } else {
          integralBtn.classList.remove('active');
        }
      }
      S.staticDirty = true;
      scheduleRedraw();
      
      showToast(S.showIntegral ? 'Integral visualization shown' : 'Integral visualization hidden', S.showIntegral ? 'success' : '');
    } catch(err) {
      console.error('Error in toggleIntegral:', err);
    }
  }
  
  // Attach event listeners
  multiFnBtn.addEventListener('click', function(e) {
    console.log('Multi button clicked!', e);
    toggleMulti();
  });
  console.log('✓ Multi button listener attached');
  
  if(integralBtn) {
    integralBtn.addEventListener('click', toggleIntegral);
    console.log('✓ Integral button listener attached');
  }
  
  // Make functions globally accessible for fallback
  window.toggleMulti = toggleMulti;
  window.toggleIntegral = toggleIntegral;
  console.log('✓ Global functions set');
  
  // Add function button
  if(addBtn) {
    addBtn.addEventListener('click', () => {
      console.log('Add function button clicked');
      if(!S.fn) {
        showToast('Select a function first', '');
        return;
      }
      
      if(S.multiFns.length >= 3) {
        showToast('Maximum 3 functions', '');
        return;
      }
      
      // Check if function already added
      if(S.multiFns.some(f => f.key === S.fn.key && f.label === S.fn.label)) {
        showToast('Function already added', '');
        return;
      }
      
      S.multiFns.push(S.fn);
      updateMultiFunctionList();
      S.staticDirty = true;
      scheduleRedraw();
      
      showToast(`Added ${S.fn.label}`, 'success');
      
      // Show derivative panel if functions added
      if(S.multiFns.length > 0 && S.multiMode && typeof drawMultiDerivPanel === 'function') {
        drawMultiDerivPanel();
      }
    });
    console.log('✓ Add button listener attached');
  } else {
    console.warn('addFnBtn not found');
  }
  
  // Clear all button
  if(clearBtn) {
    clearBtn.addEventListener('click', () => {
      console.log('Clear all button clicked');
      if(S.multiFns.length === 0) return;
      
      S.multiFns = [];
      updateMultiFunctionList();
      S.staticDirty = true;
      scheduleRedraw();
      
      showToast('Cleared all functions', '');
    });
    console.log('✓ Clear button listener attached');
  } else {
    console.warn('clearMultiBtn not found');
  }
  
  console.log('=== initMultiFunction COMPLETE ===');
}

function updateMultiFunctionList(){
  const list = document.getElementById('multiFnList');
  if(!list) return;
  
  list.innerHTML = '';
  
  if(S.multiFns.length === 0) {
    list.innerHTML = '<div class="multi-empty">Click "+ Add Function" to compare multiple curves</div>';
    return;
  }
  
  S.multiFns.forEach((fn, idx) => {
    // Check if getMultiColor is available
    let color;
    if(typeof getMultiColor === 'function') {
      color = getMultiColor(idx, S.currentTheme);
    } else {
      // Fallback colors
      const colors = ['hsl(210,88%,58%)', 'hsl(330,88%,58%)', 'hsl(150,88%,58%)'];
      color = { hsl: colors[idx % 3] };
    }
    
    const item = document.createElement('div');
    item.className = 'multi-fn-item';
    item.style.borderLeft = `4px solid ${color.hsl}`;
    
    const label = document.createElement('span');
    label.className = 'multi-fn-label';
    label.textContent = fn.label;
    label.style.color = color.hsl;
    
    const removeBtn = document.createElement('button');
    removeBtn.className = 'multi-fn-remove';
    removeBtn.innerHTML = '×';
    removeBtn.title = 'Remove function';
    removeBtn.addEventListener('click', () => {
      S.multiFns.splice(idx, 1);
      updateMultiFunctionList();
      S.staticDirty = true;
      scheduleRedraw();
      
      // Update derivative panel
      if(S.multiFns.length > 0 && S.multiMode && typeof drawMultiDerivPanel === 'function') {
        drawMultiDerivPanel();
      }
    });
    
    item.appendChild(label);
    item.appendChild(removeBtn);
    list.appendChild(item);
  });
}

// ── Animation ────────────────────────────────────────────────────────
function initAnimation(){
  document.getElementById('animBtn').addEventListener('click',()=>{
    if(S.isAnim){
      S.isAnim=false;
      cancelAnimationFrame(S.animRaf);
      const btn = document.getElementById('animBtn');
      btn.innerHTML = '';
      btn.appendChild(createIcon('play'));
      btn.appendChild(document.createTextNode(' Animate'));
      return;
    }
    S.isAnim=true;
    const btn = document.getElementById('animBtn');
    btn.innerHTML = '';
    btn.appendChild(createIcon('pause'));
    btn.appendChild(document.createTextNode(' Pause'));
    const fn=S.fn;
    const start=S.x0;
    let t0=null;
    function step(ts){
      if(!S.isAnim) return;
      if(!t0) t0=ts;
      const prog=(ts-t0)/3000;
      const ease=0.5-0.5*Math.cos(prog*Math.PI*2);
      S.x0=fn.xmin+(fn.xmax-fn.xmin)*ease;
      document.getElementById('xSlider').value=S.x0;
      draw();
      if(S.challengeActive) checkChallenge(S.x0);
      S.animRaf=requestAnimationFrame(step);
    }
    S.animRaf=requestAnimationFrame(step);
  });
}

// ── Resize Observer ───────────────────────────────────────────────────
function initResizeObserver(){
  const resizeObs=new ResizeObserver(()=>{
    S.staticDirty=true;
    scheduleRedraw();
  });
  resizeObs.observe(document.getElementById('mainWrap'));
}

// ── Initialize All Features ───────────────────────────────────────────
function initFeatures(){
  console.log('=== initFeatures START ===');
  
  // Load saved achievements
  try{
    const saved=JSON.parse(localStorage.getItem('cepro_ach')||'[]');
    saved.forEach(id=>S.achUnlocked.add(id));
    console.log('✓ Achievements loaded');
  }catch(e){
    console.warn('Achievement load failed:', e);
  }
  
  try { renderAch(); console.log('✓ renderAch'); } catch(e) { console.error('renderAch failed:', e); }
  try { initTooltips(); console.log('✓ initTooltips'); } catch(e) { console.error('initTooltips failed:', e); }
  try { initShare(); console.log('✓ initShare'); } catch(e) { console.error('initShare failed:', e); }
  try { initChallenges(); console.log('✓ initChallenges'); } catch(e) { console.error('initChallenges failed:', e); }
  try { initCustomFunction(); console.log('✓ initCustomFunction'); } catch(e) { console.error('initCustomFunction failed:', e); }
  try { initViewToggle(); console.log('✓ initViewToggle'); } catch(e) { console.error('initViewToggle failed:', e); }
  try { initAnimation(); console.log('✓ initAnimation'); } catch(e) { console.error('initAnimation failed:', e); }
  try { initSlider(); console.log('✓ initSlider'); } catch(e) { console.error('initSlider failed:', e); }
  try { initResizeObserver(); console.log('✓ initResizeObserver'); } catch(e) { console.error('initResizeObserver failed:', e); }
  try { initThemeButton(); console.log('✓ initThemeButton'); } catch(e) { console.error('initThemeButton failed:', e); }
  try { initMultiFunction(); console.log('✓ initMultiFunction'); } catch(e) { console.error('initMultiFunction failed:', e); }
  try { loadURL(); console.log('✓ loadURL'); } catch(e) { console.error('loadURL failed:', e); }
  
  console.log('=== initFeatures COMPLETE ===');
}
