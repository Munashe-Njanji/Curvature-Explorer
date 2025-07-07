/**
 * Dynamic Canvas Rendering
 * Real-time: tangent, normal, point
 */

// ── Dynamic Drawing ──────────────────────────────────────────────────
         function drawDynamic(ctx, W, H){
           const fn=S.fn, c=S.coord;
           if(!fn||!c) return;

           // Don't clamp x0 - let it be anywhere in the function's domain
           const x0=S.x0;
           const y0=fn.f(x0);
           if(!isFinite(y0)) return;

           const g=fn.df(x0);
           const g2=fn.d2f(x0);

           // Screen-space tangent direction (unit vector)
           const tpx=c.sx, tpy=-g*c.sy;
           const tlen=Math.sqrt(tpx*tpx+tpy*tpy)||1;
           const tux=tpx/tlen, tuy=tpy/tlen;
           const nux=tuy, nuy=-tux; // 90° rotation = normal

           // Helper: draw infinite line in screen direction from screen origin
           function drawInfLine(ox,oy,ux,uy,color,lw,dash){
             const {l,r,t,b}=c.pad;
             function tEdge(dx,dy){
               let tm=1e9;
               if(Math.abs(dx)>1e-9){
                 tm=Math.min(tm,dx>0?(W-r-ox)/dx:(l-ox)/dx);
               }
               if(Math.abs(dy)>1e-9){
                 tm=Math.min(tm,dy>0?(H-b-oy)/dy:(t-oy)/dy);
               }
               return Math.max(0,tm);
             }
             const tf=tEdge(ux,uy), tb=tEdge(-ux,-uy);
             ctx.save();
             if(dash) ctx.setLineDash(dash);
             ctx.strokeStyle=color; ctx.lineWidth=lw; ctx.lineCap='round';
             ctx.beginPath();
             ctx.moveTo(ox+ux*tf,oy+uy*tf);
             ctx.lineTo(ox-ux*tb,oy-uy*tb);
             ctx.stroke();
             ctx.setLineDash([]);
             ctx.restore();
           }

           const [ox,oy]=c.toS(x0,y0);

           // Get gradient-based color
           const color=getGradientColor(g);
           const colorRgba=color.hsl.replace('hsl','hsla').replace(')',',0.75)');
           const colorRgbaDim=color.hsl.replace('hsl','hsla').replace(')',',0.5)');
           const colorRgbaGlow=color.hsl.replace('hsl','hsla').replace(')',',0.25)');

           // Normal line (dashed, behind) - complementary color
           const normalHue=(color.hue+90)%360;
           const normalColor=`hsl(${normalHue},88%,${S.currentTheme==='light'?45:58}%)`;
           drawInfLine(ox,oy,nux,nuy,normalColor,1.7,[6,5]);

           // Tangent line - gradient color
           drawInfLine(ox,oy,tux,tuy,color.hsl,2.2,null);

           // Curvature circle and center
           if(Math.abs(g2)>0.008&&isFinite(g2)){
             const R=Math.pow(1+g*g,1.5)/Math.max(Math.abs(g2),1e-8);
             const cx2=x0-g*(1+g*g)/g2;
             const cy2=y0+(1+g*g)/g2;
             const [cpx,cpy]=c.toS(cx2,cy2);
             const rpx=R*Math.min(c.sx,Math.abs(c.sy));
             if(rpx>8&&rpx<350){
               ctx.save();
               // Draw circle
               ctx.beginPath(); ctx.arc(cpx,cpy,rpx,0,Math.PI*2);
               ctx.strokeStyle=colorRgbaDim;
               ctx.lineWidth=1.3; ctx.setLineDash([4,4]); ctx.stroke();
               ctx.setLineDash([]);

               // Draw center point
               ctx.beginPath(); ctx.arc(cpx,cpy,4,0,Math.PI*2);
               ctx.fillStyle=color.hsl;
               ctx.fill();
               ctx.strokeStyle=S.currentTheme==='light'?'#ffffff':'#0c0d10';
               ctx.lineWidth=1.5;
               ctx.stroke();

               // Draw line from P to center
               ctx.beginPath();
               ctx.moveTo(ox,oy);
               ctx.lineTo(cpx,cpy);
               ctx.strokeStyle=colorRgbaDim;
               ctx.lineWidth=1;
               ctx.setLineDash([2,3]);
               ctx.stroke();
               ctx.setLineDash([]);

               // Labels
               if(rpx<200){
                 ctx.font='8px "JetBrains Mono"';
                 ctx.fillStyle=colorRgba;
                 ctx.textAlign='center';
                 ctx.fillText(`R≈${R.toFixed(2)}`,cpx,cpy-rpx-5);
                 ctx.fillText('C',cpx,cpy-8);
               }
               ctx.restore();
             }
           }

           // Vertical drop line
           const [,ayc]=c.toS(0,0);
           ctx.save();
           ctx.setLineDash([3,4]); ctx.strokeStyle=colorRgbaDim; ctx.lineWidth=1;
           ctx.beginPath(); ctx.moveTo(ox,oy); ctx.lineTo(ox,clamp(ayc,c.pad.t,H-c.pad.b)); ctx.stroke();
           ctx.setLineDash([]); ctx.restore();

           // Right-angle symbol
           const SZ=10;
           ctx.save(); ctx.strokeStyle=colorRgbaDim; ctx.lineWidth=1;
           const ax=ox+tux*SZ, ay=oy+tuy*SZ;
           const bx=ax+nux*SZ, by=ay+nuy*SZ;
           const dcx=ox+nux*SZ, dcy=oy+nuy*SZ;
           ctx.beginPath(); ctx.moveTo(ax,ay); ctx.lineTo(bx,by); ctx.lineTo(dcx,dcy); ctx.stroke();
           ctx.restore();

           // Angle arc
           const screenAngle=Math.atan2(tuy,tux);
           const R2=30;
           ctx.save(); ctx.strokeStyle=colorRgba; ctx.lineWidth=1.3;
           ctx.beginPath();
           if(screenAngle>=0) ctx.arc(ox,oy,R2,0,screenAngle,false);
           else ctx.arc(ox,oy,R2,screenAngle,0,false);
           ctx.stroke();
           const midA=screenAngle/2;
           const deg=Math.abs(screenAngle*180/Math.PI).toFixed(0);
           ctx.font='500 8px "JetBrains Mono"'; ctx.fillStyle=color.hsl;
           ctx.textAlign='center'; ctx.textBaseline='middle';
           ctx.fillText(deg+'°', ox+(R2+13)*Math.cos(midA), oy+(R2+13)*Math.sin(midA));
           ctx.restore();

           // Point glow
           ctx.save();
           const grd=ctx.createRadialGradient(ox,oy,0,ox,oy,16);
           grd.addColorStop(0,colorRgbaGlow);
           grd.addColorStop(1,color.hsl.replace('hsl','hsla').replace(')',',0)'));
           ctx.beginPath(); ctx.arc(ox,oy,16,0,Math.PI*2);
           ctx.fillStyle=grd; ctx.fill();
           ctx.restore();

           // Point P
           ctx.save();
           ctx.beginPath(); ctx.arc(ox,oy,7,0,Math.PI*2);
           ctx.fillStyle=color.hsl; ctx.fill();
           const bgColor=S.currentTheme==='light'?'#ffffff':'#0c0d10';
           ctx.strokeStyle=bgColor; ctx.lineWidth=2.5; ctx.stroke();
           ctx.restore();

           // Point label
           const lblX=g>=0?ox+13:ox-13;
           ctx.save(); ctx.font='500 9px "JetBrains Mono"';
           ctx.fillStyle=color.hsl;
           ctx.textAlign=g>=0?'left':'right'; ctx.textBaseline='bottom';
           ctx.fillText(`P(${fmtN(x0,3)}, ${fmtN(y0,3)})`,lblX,oy-10);
           ctx.restore();

           // Update UI panels
           updateUI(x0,y0,g,g2);
         }
