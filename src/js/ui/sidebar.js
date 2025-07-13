/**
 * Sidebar Management
 * Function selection UI
 */

// ── Build Sidebar ────────────────────────────────────────────────────
         function buildSidebar(){
           const acc=document.getElementById('fnAccordion');
           CATEGORIES.forEach((cat,ci)=>{
             const wrap=document.createElement('div');
             wrap.className='fn-category';

             const hdr=document.createElement('button');
             hdr.className='cat-header'+(ci===0?' open':'');
             const iconSpan = document.createElement('span');
             iconSpan.className = 'cat-icon';
             iconSpan.appendChild(createIcon(cat.icon));
             const nameSpan = document.createElement('span');
             nameSpan.textContent = cat.name;
             const leftSpan = document.createElement('span');
             leftSpan.appendChild(iconSpan);
             leftSpan.appendChild(document.createTextNode(' '));
             leftSpan.appendChild(nameSpan);
             const chevron = document.createElement('span');
             chevron.className = 'cat-chevron';
             chevron.textContent = '▼';
             hdr.appendChild(leftSpan);
             hdr.appendChild(chevron);
             hdr.onclick=()=>{
               const isOpen=hdr.classList.contains('open');
               // Close all
               acc.querySelectorAll('.cat-header.open').forEach(h=>{
                 h.classList.remove('open');
                 h.nextElementSibling.classList.remove('open');
               });
               if(!isOpen){hdr.classList.add('open');body2.classList.add('open');}
             };

             const body2=document.createElement('div');
             body2.className='cat-body'+(ci===0?' open':'');

             cat.fns.forEach(fn=>{
               const btn=document.createElement('button');
               btn.className='fn-btn'+(ci===0&&cat.fns.indexOf(fn)===0?' active':'');
               btn.textContent='f(x) = '+fn.label;
               btn.onclick=()=>{
                 document.querySelectorAll('.fn-btn.active').forEach(b=>b.classList.remove('active'));
                 btn.classList.add('active');
                 if(setFn(fn)){
                   S.fnCount++;
                   if(!S.achUnlocked.has('first')) unlock('first');
                   if(S.fnCount>=10) unlock('cat10');
                 }
               };
               body2.appendChild(btn);
             });

             wrap.appendChild(hdr); wrap.appendChild(body2);
             acc.appendChild(wrap);
           });

           // Set default function
           setFn(CATEGORIES[0].fns[1]); // x² - 2x - 1 as default
           S.fnCount=1;
           unlock('first');
         }
