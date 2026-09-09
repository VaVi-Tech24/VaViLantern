const jonahSheet=new Image();jonahSheet.onload=()=>{paintPortraits();if(typeof paintControlIcons==='function')paintControlIcons();};jonahSheet.src='jonah-run.png';
function drawAvatar(c,x,y,char,phase,sliding=false,fl=100,scale=1,label=true,carryTorch=true){
 c.save();c.translate(x,y);c.scale(scale,scale);c.lineCap='round';c.lineJoin='round';
 let hand=null;const gait=Math.sin(phase),op=Math.sin(phase+Math.PI),bob=Math.cos(phase*2)*1.25,low=sliding?15:0;
 const ell=(x,y,rx,ry,col)=>{c.fillStyle=col;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill();};
 const stroke=(pts,col,w=3)=>{c.strokeStyle=col;c.lineWidth=w;c.beginPath();pts.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.stroke();};
 const path=(pts,col)=>{c.fillStyle=col;c.beginPath();pts.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.closePath();c.fill();};
 if(carryTorch)ell(0,3,18,3,'#17352b22');
 if(char==='jonah'&&jonahSheet.complete&&jonahSheet.naturalWidth){
  const frame=sliding?2:((Math.floor(phase*1.15)%8)+8)%8,sw=jonahSheet.naturalWidth/4,sh=jonahSheet.naturalHeight/2;
  // Preserve each complete painted pose: no torso/leg slices or replacement arms.
  const grips=[[16,-32],[16,-32],[17,-32],[15,-30],[11,-32],[12,-32],[16,-33],[16,-33]];hand=grips[frame].slice();
  // Align the painted boot sole, accounting for transparent frame padding.
  const soleRows=[488,492,492,492,479,479,479,479],soleOffset=sliding?0:70-soleRows[frame]*72/512;hand[1]+=soleOffset;
  c.save();if(sliding){c.rotate(-.4);c.scale(1,.65);}c.drawImage(jonahSheet,(frame%4)*sw,Math.floor(frame/4)*sh,sw,sh,-27,-70+soleOffset,54,72);c.restore();
  if(sliding){const hx=hand[0],hy=hand[1]*.65;hand=[hx*Math.cos(-.4)-hy*Math.sin(-.4),hx*Math.sin(-.4)+hy*Math.cos(-.4)];}
 }else if(char==='cheetah'){
  const by=-27+(sliding?10:bob),gold='#c69b50',dark='#4a3828';
  stroke([[-22,by],[-34,by-5],[-44,by-2+gait*5],[-49,by-9+gait*5]],gold,3);stroke([[-44,by-2+gait*5],[-49,by-9+gait*5]],dark,3);
  for(let i=0;i<4;i++){const k=i%2?gait:op,hx=i<2?-18:16;stroke([[hx,by+3],[hx+k*11,by+15],[hx+k*20-3,-2]],i%2?gold:'#8d693d',3);stroke([[hx+k*20-3,-2],[hx+k*20+3,-2]],dark,2);}
  ell(-1,by,25,8,gold);ell(-15,by-1,10,10,gold);ell(17,by-3,9,10,gold);ell(1,by+4,17,3,'#e5c68d');stroke([[18,by-6],[27,by-13]],gold,9);ell(29,by-14,8,7,gold);ell(26,by-20,2.5,3,dark);ell(27,by-20,1.5,2,gold);ell(35,by-11,5,3,'#e8c891');ell(39,by-12,1.6,1.3,dark);ell(32,by-16,1.5,1.2,dark);stroke([[32,by-14],[34,by-9]],dark,1.3);
  for(let i=0;i<22;i++)ell(-22+(i%8)*6,by-5+Math.floor(i/8)*4,1.1,1.25,dark);
 }else if(['rabbit','tortoise','cheetah','elephant','ant'].includes(char)){
  const colors={rabbit:'#e9e4d0',tortoise:'#728a55',cheetah:'#c69b55',elephant:'#859b99',ant:'#2e4940'},col=colors[char],b=sliding?7:0;
  if(char==='ant'){for(let i=0;i<3;i++){stroke([[-11+i*8,-13],[-15+i*8+gait*6,0]],col,2);stroke([[-11+i*8,-13],[-9+i*8-gait*6,0]],col,2);}ell(-9,-16+b,8,6,col);ell(1,-20+b,6,6,col);ell(10,-27+b,6,6,col);stroke([[10,-31],[8,-38]],col,1.5);stroke([[13,-31],[17,-36]],col,1.5);}
  else{const heavy=char==='elephant',bodyY=-23+b+bob,legLength=heavy?18:14;
   for(let i=0;i<4;i++){const side=i%2?gait:op,px=-12+i*8;stroke([[px,bodyY+7],[px+side*5,bodyY+legLength],[px+side*8+3,0]],i<2?'#476158':col,heavy?7:4);}
   ell(-1,bodyY,heavy?23:19,heavy?16:11,col);ell(19,bodyY-6,heavy?12:9,heavy?13:9,col);
   if(char==='rabbit'){ell(19+gait,bodyY-24,3,15,col);ell(25-gait,bodyY-23,3,13,col);stroke([[20,bodyY-31],[20,bodyY-17]],'#cfb5a4',1.5);ell(-23,bodyY,5,5,'#f6f2df');}
   if(char==='tortoise'){ell(-3,bodyY-3,21,16,'#455e42');ell(-5,bodyY-7,14,10,'#7b935c');stroke([[-17,bodyY-1],[10,bodyY-1]],'#a0af79',1.5);stroke([[-6,bodyY-17],[-3,bodyY+9]],'#a0af79',1.5);}
   if(char==='cheetah'){stroke([[-19,bodyY],[-28,bodyY-6],[-34,bodyY-3]],col,3);for(let i=0;i<8;i++)ell(-13+(i%4)*8,bodyY-6+Math.floor(i/4)*8,1.5,1.5,'#4d4931');path([[15,bodyY-12],[17,bodyY-20],[20,bodyY-12]],col);}
   if(heavy){ell(13,bodyY-5,10,13,'#9bafaa');stroke([[27,bodyY-7],[31,bodyY+4],[29,bodyY+13],[35,bodyY+10]],col,6);stroke([[-24,bodyY-1],[-28,bodyY+7]],col,2);}
   ell(22,bodyY-9,1.5,2,'#253d36');
  }
 }else{
  const shadow=char==='shadow',human=char==='human',jonah=char==='jonah',headY=-43+low+bob,hip=-18+low*.4;
  const skin=shadow?'#111d22':(human||jonah)?'#cda780':'#26483e',clothes=shadow?'#111d22':jonah?'#3b5368':human?'#536f5e':'#26483e';
  // Bent knees and opposing arms interpolate continuously across the stride.
  for(let i=0;i<2;i++){const swing=i?gait:op;stroke([[0,hip],[swing*8,hip/2-3],[swing*12+(i?3:-3),0]],human||jonah?'#39433c':clothes,human||jonah?6:3);if(human||jonah)stroke([[swing*12,0],[swing*12+6,0]],'#685440',5);}
  if(human||jonah||shadow){const g=c.createLinearGradient(-9,-35,9,-20);g.addColorStop(0,clothes);g.addColorStop(1,shadow?'#071217':jonah?'#1e3547':'#294c3c');path([[-8,-36+low],[8,-36+low],[10,hip],[-8,hip]],g);stroke([[-6,-32+low],[-12+op*5,-22+low],[-7+op*7,-16+low]],skin,5);stroke([[6,-32+low],[15,-25+low],[21,-31+low]],skin,5);}
  else{stroke([[0,-35+low],[0,hip]],clothes,3);stroke([[0,-31+low],[-9+op*5,-23+low]],clothes,3);stroke([[0,-31+low],[15,-29+low],[19,-34+low]],clothes,3);}
  ell(2,headY,human||jonah?10:shadow?9:6,human||jonah?12:shadow?10:6,skin);
  if(human||jonah){ell(0,headY-8,11,6,'#29302a');for(let i=0;i<5;i++)ell(-7+i*4,headY-11-(i%2)*2,4,4,'#242b27');ell(8,headY,2.4,2.7,'#f1e9d8');ell(9,headY,1.5,2,'#253832');stroke([[7,headY+6],[11,headY+5]],'#9d765b',1);}
  if(jonah){stroke([[-6,-32+low],[-12+op*5,-24+low]],'#ddd0ad',6);stroke([[6,-32+low],[15,-25+low]],'#ddd0ad',6);ell(-7+op*7,-16+low,3,3,skin);ell(21,-31+low,3,3,skin);path([[-5,-36+low],[0,-30+low],[0,-37+low]],'#e7d8b7');path([[5,-36+low],[0,-30+low],[0,-37+low]],'#e7d8b7');c.fillStyle='#765638';c.fillRect(-9,hip-3,19,4);c.strokeStyle='#b18d50';c.lineWidth=1;c.strokeRect(2,hip-3,4,4);for(let i=0;i<4;i++)stroke([[-10+i*4,headY-8],[-4+i*4,headY-14],[3+i*3,headY-10]],'#403e32',1.1);}
  if(shadow){ell(5,headY-1,2.2,2.2,'#f1f2d4');ell(10,headY-1,1.5,2,'#f1f2d4');}
  path([[-4,-36+low],[-15,-35+low],[-22-gait*3,-39+low]],shadow?'#43525a':'#bdaf72');
 }
 if(!carryTorch){c.restore();return;}
 const tx=hand?hand[0]+5:char==='elephant'?35:24,ty=hand?hand[1]-18:((['elephant','rabbit','tortoise','cheetah','ant'].includes(char)?-42:-49)+low);
 stroke([[tx-5,ty+21],[tx,ty]],'#72543b',3);if(hand)ell(hand[0],hand[1],2.2,1.5,'#cf9a70');
 const strength=Math.max(0,Math.min(100,fl)),size=(2+strength*.13)*(1+Math.sin(phase*1.7)*.05);
 if(strength>0){const glow=c.createRadialGradient(tx,ty,0,tx,ty,size*3);glow.addColorStop(0,'#ffe8a155');glow.addColorStop(1,'#ffe8a100');c.fillStyle=glow;c.fillRect(tx-size*3,ty-size*3,size*6,size*6);path([[tx-size*.6,ty],[tx-size*.8,ty-size*.6],[tx+gait*2,ty-size*2],[tx+size*.7,ty-size*.5],[tx+size*.4,ty]],'#edb85d');path([[tx-size*.25,ty],[tx,ty-size*1.2],[tx+size*.35,ty]],'#fff1b7');}
 if(label){c.fillStyle='#fbf3de';c.fillRect(tx-20,ty-49,42,18);c.fillStyle=strength<25?'#a94e32':'#365749';c.font='12px Arial';c.textAlign='center';c.fillText(Math.ceil(strength)+'%',tx+1,ty-36);}
 c.restore();
}
function paintPortraits(){document.querySelectorAll('[data-portrait]').forEach(el=>{const c=el.getContext('2d');c.clearRect(0,0,el.width,el.height);c.fillStyle='#fff';c.fillRect(0,0,el.width,el.height);drawAvatar(c,45,83,el.dataset.portrait,1.2,false,100,.9,false);});}
