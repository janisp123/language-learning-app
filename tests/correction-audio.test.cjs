const {test}=require('node:test');const assert=require('node:assert/strict');
const A=require('../web/audio-player.js');const V=require('../web/audio-view.js');
const pack={directions:['en-ja'],ui:{en:{prompt:'Listen',error:'Playback failed',answer:'Answer'}},clips:{en:{x:{text:'hello',src:'EN'}},ja:{x:{text:'こんにちは',src:'JA'}}}};
const shown={conceptId:'x',correctId:'x',source:'en',target:'ja',text:'hello',options:[{id:'x',text:'こんにちは'}]};
function fixture(){const nodes=new Map();const document={getElementById(id){if(!nodes.has(id))nodes.set(id,{textContent:'',hidden:false,disabled:false,setAttribute(){},addEventListener(n,fn){this[n]=fn;}});return nodes.get(id);}};return {document,nodes};}
const flush=async()=>{for(let n=0;n<8;n++)await Promise.resolve();};
test('correction plays source then correct target exactly three times and waits for all ends',async()=>{
 const f=fixture(),media=[];const player=A.create(pack,src=>{const m={src,play(){return Promise.resolve();},pause(){},currentTime:0};media.push(m);return m;});const view=V.create(f.document,pack,player);view.localize('en');view.question(shown);await flush();media.length=0;
 assert.equal(typeof view.correct,'function','three-round correction method missing');
 let completed=false;const promise=view.correct(shown,'こんにちは').then(r=>{completed=true;return r;});await flush();
 for(let n=0;n<6;n++){assert.equal(media.length,n+1);assert.equal(media[n].src,n%2?'JA':'EN');assert.equal(completed,false);media[n].onended();await flush();}
 assert.equal(await promise,true);assert.equal(media.length,6);
});
test('reset cancels correction and stale ended events cannot continue it',async()=>{
 const f=fixture(),media=[];const player=A.create(pack,src=>{const m={src,play(){return Promise.resolve();},pause(){},currentTime:0};media.push(m);return m;});const view=V.create(f.document,pack,player);view.localize('en');view.question(shown);await flush();
 assert.equal(typeof view.correct,'function');const result=view.correct(shown,'こんにちは');await flush();const ended=media.at(-1).onended;view.reset();ended();await flush();assert.equal(await result,null);assert.equal(media.length,2);
});
test('rejected playback reports failure without a stuck correction',async()=>{
 const f=fixture();const player=A.create(pack,()=>({play(){return Promise.reject(new Error('blocked'));},pause(){},currentTime:0}));const view=V.create(f.document,pack,player);view.localize('en');view.question(shown);await flush();
 assert.equal(typeof view.correct,'function');assert.equal(await view.correct(shown,'こんにちは'),false);assert.equal(f.document.getElementById('question-audio-error').textContent,'Playback failed');
});
test('a stalled correction clip times out and stops sound',async t=>{
 t.mock.timers.enable({apis:['setTimeout']});let paused=false;const player=A.create(pack,()=>({play(){return new Promise(()=>{});},pause(){paused=true;},currentTime:0}));
 assert.equal(typeof player.playToEnd,'function','completion-aware playback missing');const result=player.playToEnd('x','en','hello');t.mock.timers.tick(30000);assert.equal(await result,false);assert.equal(paused,true);
});
test('late rejected play promise cannot cancel the next clip on a reused media element',async()=>{
 const rejects=[];const media={pause(){},currentTime:0,play(){return new Promise((_r,reject)=>rejects.push(reject));}};
 const player=A.create(pack,src=>{media.src=src;return media;});
 const first=player.playToEnd('x','en','hello');media.onended();assert.equal(await first,true);
 const second=player.playToEnd('x','ja','こんにちは');const ended=media.onended;
 rejects[0](new Error('old abort'));await flush();assert.equal(media.onended,ended);assert.equal(media.src,'JA');media.onended();assert.equal(await second,true);
});
