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
  document.getElementById('challengeBtn').addEventListener('click',()=>{
    S.challengeActive=!S.challengeActive;
    const box=document.getElementById('challengeBox');
    box.classList.toggle('active',S.challengeActive);
    if(S.challengeActive) loadChallenge(S.currChallenge);
    document.getElementById('challengeBtn').textContent=
      S.challengeActive?'close Close':'target Challenge';
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
  const ch=CHALLENGES[i];
  document.getElementById('chPrompt').textContent=ch.prompt;
  document.getElementById('chHint').textContent=ch.hint;
  document.getElementById('chHint').classList.remove('vis');
  const statusEl = document.getElementById('chStatus');
  statusEl.className = 'ch-status pend';
  statusEl.innerHTML = '';
  statusEl.appendChild(createIcon('circle', 'icon-xs'));
  statusEl.appendChild(document.createTextNode(' In Progress'));
}

function checkChallenge(x0){
  if(!S.fn||!S.challengeActive) return;
  const ch=CHALLENGES[S.currChallenge];
  if(ch.check(S.fn,x0)){
    const statusEl = document.getElementById('chStatus');
    statusEl.className = 'ch-status done';
    statusEl.innerHTML = '';
    statusEl.appendChild(createIcon('check', 'icon-xs'));
    statusEl.appendChild(document.createTextNode(' Solved!'));
    if(ch.ach) unlock(ch.ach.id);
  } else {
    const statusEl = document.getElementById('chStatus');
    statusEl.className = 'ch-status pend';
    statusEl.innerHTML = '';
    statusEl.appendChild(createIcon('circle', 'icon-xs'));
    statusEl.appendChild(document.createTextNode(' In Progress'));
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
      dp.style.display=v==='dual'?'block':'none';
      if(v==='dual') drawDerivPanel();
    });
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
  // Load saved achievements
  try{
    const saved=JSON.parse(localStorage.getItem('cepro_ach')||'[]');
    saved.forEach(id=>S.achUnlocked.add(id));
  }catch{}
  
  renderAch();
  initTooltips();
  initShare();
  initChallenges();
  initCustomFunction();
  initViewToggle();
  initAnimation();
  initSlider();
  initResizeObserver();
  initThemeButton();
  loadURL();
}
