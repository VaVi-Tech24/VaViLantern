const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..'),out=path.join(root,'dist');
fs.mkdirSync(out,{recursive:true});
const files=['index.html','style.css','campaign.css','engine.js','sound.js','characters.js','game.js','online.js','cosmic-lantern.png','vavi-tech-logo.png','jonah-run.png','logo.svg'];
for(const file of files)fs.copyFileSync(path.join(root,'web/public',file),path.join(out,file));
const html=fs.readFileSync(path.join(out,'index.html'),'utf8');
for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)){
 if(!/^(?:https?:|data:)/.test(match[1])&&!fs.existsSync(path.join(out,match[1])))throw Error('Missing website asset: '+match[1]);
}
console.log('Website ready: '+files.length+' public files.');
