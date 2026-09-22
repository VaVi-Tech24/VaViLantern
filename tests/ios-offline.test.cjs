'use strict';
// Cross-platform bundle/UI checks. Not a Swift compiler or an iOS device test.
const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert/strict');
const root=path.resolve(__dirname,'..'),game=path.join(root,'ios/Game');
const html=fs.readFileSync(path.join(game,'index.html'),'utf8');
assert(!html.includes('online.js'),'iOS must not load the online module');
for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g))assert(fs.existsSync(path.join(game,match[1])),'Missing bundled resource: '+match[1]);
const shared=['style.css','campaign.css','engine.js','sound.js','characters.js','game.js','cosmic-lantern.png','vavi-tech-logo.png','jonah-run.png','logo.svg'];
for(const file of shared)assert(fs.readFileSync(path.join(game,file)).equals(fs.readFileSync(path.join(root,'web/public',file))),'Stale asset: '+file);
assert(!fs.existsSync(path.join(game,'online.js')));
const icon=fs.readFileSync(path.join(root,'ios/VaViLantern/Assets.xcassets/AppIcon.appiconset/AppIcon.png'));
assert.equal(icon.readUInt32BE(16),1024);assert.equal(icon.readUInt32BE(20),1024);assert.equal(icon[25],2,'Opaque RGB icon');

const elements=new Map(),buttons=[],messages=[],saved=new Map();
function element(){return {hidden:false,open:false,innerHTML:'',textContent:'',dataset:{},style:{},classList:{add(){},remove(){},toggle(){}},addEventListener(){},appendChild(b){buttons.push(b);},setAttribute(){},showModal(){this.open=true;},close(){this.open=false;},getContext:()=>new Proxy({createLinearGradient:()=>({addColorStop(){}}),createRadialGradient:()=>({addColorStop(){}})},{get:(o,k)=>o[k]||(()=>{})})};}
const context={Image:class {constructor(){this.complete=false;this.naturalWidth=0;}},console,innerWidth:390,innerHeight:844,devicePixelRatio:1,localStorage:{getItem:k=>saved.get(k)||null,setItem:(k,v)=>saved.set(k,v)},document:{querySelector:s=>{if(!elements.has(s))elements.set(s,element());return elements.get(s);},querySelectorAll:()=>[],createElement:element,body:element(),addEventListener(){}},webkit:{messageHandlers:{orientation:{postMessage:v=>messages.push(v)}}},addEventListener(){},setTimeout:()=>1,clearTimeout(){},requestAnimationFrame(){},performance:{now:()=>100},URL,Math,JSON,Map};
context.window=context;context.globalThis=context;vm.createContext(context);
for(const match of html.matchAll(/<script src="([^"]+)"><\/script>/g))vm.runInContext(fs.readFileSync(path.join(game,match[1]),'utf8'),context,{filename:match[1]});
assert.equal(context.onlineNet,undefined);
vm.runInContext("draw();start();update(.016);draw();pause();if(state!=='paused')throw Error('pause');resume();home();mode='local';start();if(players.length!==2)throw Error('two-player');update(.016);draw();home();innerWidth=844;innerHeight=390;resize();draw();save();",context);
assert(saved.has('vavi-lantern-levels-v2'));
elements.get('#landscape').onclick();assert.deepEqual(messages,['landscape']);
context.vaviOrientationChanged(true);assert.equal(elements.get('#landscape').textContent,'Auto rotate ↻');
elements.get('#landscape').onclick();assert.deepEqual(messages,['landscape','auto']);
context.vaviOrientationChanged(false);assert.equal(elements.get('#landscape').textContent,'▱ Landscape ↻');
buttons.find(b=>b.textContent==='Privacy policy ↗').onclick();
assert(elements.get('#dialog').open);assert(elements.get('#dialogContent').innerHTML.includes('vavitech24@gmail.com'));
console.log('PASS iOS assets, opaque icon, offline solo/local, pause/resume, local save, portrait/landscape rendering, native orientation messages and privacy dialog');
