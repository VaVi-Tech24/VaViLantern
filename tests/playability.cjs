const E=require('../app/src/main/assets/engine.js');let failures=[];
for(const char of Object.keys(E.travelers))for(let level=1;level<=25;level++){
 const p=E.player(char,level),stage=E.level(level);
 for(let frame=0;frame<120*(stage.length/40+30)&&p.alive&&!p.completed;frame++){
  const lead=p.x-p.edge,approach=E.obstacles(stage.seed,p.x,p.x+350,level).some(o=>o.jumpsRequired>=4),target=approach?140+(stage.maxJumps-3)*25:115;p.sprint=p.y===0&&(lead<target||p.flame>93)&&p.flame>15;
  for(const o of E.obstacles(stage.seed,p.x-260,p.x+10,level)){
   if(o.type==='gap'){if(p.x>=o.x-5&&p.x<o.x&&p.jumps===0)E.jump(p);if(p.jumps>=1&&p.jumps<o.jumpsRequired&&p.x>=o.x+31+(p.jumps-1)*39&&p.x<o.x+o.width)E.jump(p);}
   if(o.type==='rope'&&p.x>=o.x-5&&p.x<o.x&&p.jumps===0)E.jump(p);
   if((o.type==='beam'||o.type==='crow')&&p.x>=o.x-8&&p.x<o.x+o.width)E.slide(p);
  }
  E.step(p,1/120,stage.seed,frame/120,()=>{});
 }
 if(!p.completed)failures.push({char,level,x:Math.floor(p.x),flame:Math.floor(p.flame),reason:p.reason});
}
if(failures.length){console.log(JSON.stringify(failures));process.exitCode=1;}else console.log('PASS all 25 levels completed by a deterministic input controller with all 6 characters (150 runs).');
