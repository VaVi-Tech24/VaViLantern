(function(root){
 'use strict';
 const travelers={
  stickman:{name:'Pranay',pace:56,sprint:112,burn:16,regen:11,description:'Balanced steps. A steady little flame.'},
  jonah:{name:'Jonah',pace:56,sprint:112,burn:15,regen:11,description:'Blue vest, brave heart. Your little adventurer.'},
  tortoise:{name:'Junnu',pace:47,sprint:95,burn:11,regen:12,description:'Patient steps. An economical flame.'},
  cheetah:{name:'Prem',pace:65,sprint:135,burn:23,regen:11,description:'The fastest sprint, with a thirstier flame.'},
  elephant:{name:'Chinnu',pace:49,sprint:99,burn:12,regen:12,description:'Gentle, weighty steps and a generous heart.'},
  ant:{name:'Joel',pace:52,sprint:99,burn:11,regen:12,description:'Small, careful and kind to its flame.'}
 };
 const names=['The Quiet Heights','Cloud Garden','Willow Crossing','A River of Mist','First Starlight','Moonlit Footsteps','Silver Pines','The Sleeping Valley','Windward Path','Amber Horizon','The Blue Divide','Drifting Islands','The Long Exhale','Twilight Orchard','A Sea of Stars','The Far Bell','Velvet Thunder','The Hollow Moon','Above the Rain','Last Golden Hour','Beyond the Pines','The Silent Summit','A Thousand Clouds','Edge of the Night','The Last Flame'];
 const tiers=[{name:'Easy',burn:.8,regen:1.15},{name:'Medium',burn:.9,regen:1.05},{name:'Hard',burn:1,regen:1},{name:'Very hard',burn:1.02,regen:1}];
 const levels=names.map((name,i)=>({id:i+1,name,length:i<9?2000+i*250:i<19?4000+(i-8)*500:9000+(i-18)*10000,theme:i%2===0?'dawn':'night',maxJumps:i<5?3:i<10?4:i<19?5:6,difficulty:tiers[i<5?0:i<15?1:i<20?2:3].name,tier:i<5?0:i<15?1:i<20?2:3,scale:1+i*.008,pressure:i<5?4+i*.4:i<15?8+(i-5)*.7:i<20?16+(i-15)*.7:19.8+(i-20)*.35,spacing:220-i*3.5,seed:71+i*137}));
 function level(id=1){return levels[Math.max(0,Math.min(24,Math.floor(id)-1))];}
 function noise(n,seed){let x=Math.imul(n+seed,374761393);x=Math.imul(x^(x>>>13),1274126177);return ((x^(x>>>16))>>>0)/4294967296;}
 const routes=new Map();
 function route(seed,levelId=1){const key=seed+':'+levelId;if(routes.has(key))return routes.get(key);const cfg=level(levelId),gaps=[['small','small','double','small','triple'],['small','small','double','small','triple','small','double'],['small','small','double','small','triple','small','double','small','double'],['small','small','double','small','triple','small','double','small','small','triple','small','double']][cfg.tier].slice(),kinds=[];if(cfg.maxJumps>3)gaps[gaps.lastIndexOf('small')]='chain';const otherCount=10+cfg.tier*3+Math.floor((cfg.id-1)/3),total=gaps.length+otherCount;let nextGap=0,h=0;for(let i=0;i<total;i++){if(nextGap<gaps.length&&i===Math.floor(nextGap*total/gaps.length)){kinds.push(gaps[nextGap++]);}else kinds.push((cfg.id===1?['rope','beam','crow']:['beam','rope','crow'])[h++%3]);}const widthOf=kind=>kind==='chain'?100+(cfg.maxJumps-3)*38:kind==='triple'?100:kind==='double'?62:kind==='small'?20:(kind==='beam'||kind==='rope')?14:8;const restOf=kind=>kind==='rope'?45:kind==='small'?27:['double','triple','chain'].includes(kind)?45:12;const used=kinds.reduce((total,kind,i)=>total+widthOf(kind)+(i<kinds.length-1?restOf(kind):0),0),extra=(cfg.length-300-used)/(kinds.length-1);let cursor=180;const hazards=kinds.map((kind,i)=>{const x=cursor;cursor+=widthOf(kind)+restOf(kind)+extra;return {id:i,x,type:['small','double','triple','chain'].includes(kind)?'gap':kind,width:widthOf(kind),jumpsRequired:kind==='chain'?cfg.maxJumps:kind==='triple'?3:kind==='double'?2:kind==='small'?1:0,wide:['double','triple','chain'].includes(kind),triple:kind==='triple'};});const posts=[.25,.5,.75].map((fraction,i)=>{const slot=Math.min(hazards.length-2,Math.floor(hazards.length*fraction)),a=hazards[slot],next=hazards[slot+1];return {id:i,x:(a.x+a.width+next.x)/2};});const result={hazards,posts};routes.set(key,result);return result;}
 function obstacles(seed,from,to,levelId=1){return route(seed,levelId).hazards.filter(o=>o.x+o.width>=from&&o.x<=to);}
 function lights(seed,levelId=1){return route(seed,levelId).posts;}
 function player(character='jonah',levelId=1){if(!travelers[character])character='jonah';return {character,level:level(levelId).id,x:0,edge:level(levelId).tier===0?-72:level(levelId).tier===1?-64:-52,y:0,vy:0,jumps:0,flame:100,alive:true,completed:false,slide:0,sprint:false,score:0,checkpoint:0,near:0,passed:{},reason:'',motion:0};}
 function jump(p){if(!p.alive||p.completed||p.jumps>=level(p.level).maxJumps)return false;p.vy=100;p.jumps++;p.slide=0;return true;}
 function slide(p){if(!p.alive||p.completed||p.y>0||p.vy!==0)return false;p.slide=.65;return true;}
 function step(p,dt,seed,time,onEvent=()=>{}){if(!p.alive||p.completed)return;const cfg=travelers[p.character],stage=level(p.level);const old=p.x;const inAir=p.y>0||p.vy!==0;
  // Longer, higher arcs: ordinary, double and occasional triple crossings.
  const speed=inAir?64:(p.sprint?cfg.sprint:cfg.pace)*stage.scale;
  p.x+=speed*dt;p.motion+=(inAir?2.4:(p.sprint?13:8))*dt;p.flame=Math.max(0,Math.min(100,p.flame+(p.sprint?-cfg.burn*tiers[stage.tier].burn:cfg.regen*tiers[stage.tier].regen)*dt));p.slide=Math.max(0,p.slide-dt);
  if(inAir){p.y+=p.vy*dt;p.vy-=280*dt;if(p.y<=0){p.y=0;p.vy=0;p.jumps=0;}}
  p.edge=Math.max(p.edge+(cfg.pace+stage.pressure)*stage.scale*dt,p.x-(140+(stage.maxJumps-3)*30));
  const hit=reason=>{p.alive=false;p.reason=reason;onEvent('death',p);};
  if(p.edge>=p.x-3){hit('The falling bridge caught up.');return;}
  if(p.flame<=0){hit('The wind took your flame.');return;}
  for(const o of obstacles(seed,old-260,p.x+1,p.level)){const inside=p.x>=o.x&&p.x<o.x+o.width;if(inside){if(o.type==='gap'&&p.y<.15){hit(o.wide?'Use '+o.jumpsRequired+' timed jumps to cross this break.':'Jump over the missing planks.');break;}if(o.type==='beam'&&p.slide<=0){hit('Slide beneath the wooden blocks.');break;}if(o.type==='rope'&&p.y<3){hit('Hop over the anchored rope.');break;}if(o.type==='crow'&&!p.passed['c'+o.id]&&p.y<3&&p.slide===0){p.flame=Math.max(0,p.flame-12);p.passed['c'+o.id]=true;onEvent('crow',p);}}
   if(p.x>=o.x+o.width&&!p.passed[o.id]){p.passed[o.id]=true;p.score+=20;if(o.type==='gap'&&p.y<2){p.near++;onEvent('near',p);}}
  }
  if(p.alive)for(const post of lights(seed,p.level)){const key='light'+post.id;if(old<=post.x&&p.x>=post.x&&!p.passed[key]){p.passed[key]=true;p.flame=100;p.score+=75;onEvent('refill',p);}}
  if(p.alive&&p.x>=stage.length){p.x=stage.length;p.completed=true;p.sprint=false;p.checkpoint=stage.length;p.score+=200;p.reason='The last flame reached its lantern.';onEvent('complete',p);}
 }
 const api={travelers,levels,level,noise,obstacles,lights,player,jump,slide,step};if(typeof module!=='undefined')module.exports=api;root.LanternEngine=api;
})(typeof window!=='undefined'?window:globalThis);
