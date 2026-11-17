const test=require('node:test');const assert=require('node:assert/strict');
test('audio view limits directions, labels the prior translation and cancels on reset',async()=>{
 const V=require('../web/audio-view.js');const nodes={};
 const doc={getElementById:id=>nodes[id]??=( {hidden:true,disabled:false,textContent:'',handlers:{},addEventListener(n,h){this.handlers[n]=h}} )};
 const calls=[];let stopped=0;
 const player={play:async(...args)=>{calls.push(args);return true},stop:()=>stopped++};
 const pack={directions:['lv-ru','ru-lv'],clips:{ru:{x:{text:'да'}}},ui:{lv:{replay:'Atkārtot',label:'Iepriekšējā atbilde',error:'Kļūda'},en:{replay:'Replay',label:'Previous answer',error:'Error'}}};
 const view=V.create(doc,pack,player);view.localize('lv');
 await view.answer({source:'lv',target:'ru',correctId:'x'},{correctText:'да'});
 assert.deepEqual(calls[0].slice(0,3),['x','ru','да']);assert.equal(nodes['audio-panel'].hidden,false);assert.match(nodes['audio-label'].textContent,/да/);assert.equal(nodes['audio-label'].lang,'ru');
 nodes['audio-replay'].handlers.click();assert.equal(calls.length,2);
 await view.answer({source:'en',target:'ru',correctId:'x'},{correctText:'да'});assert.equal(calls.length,2);assert.equal(nodes['audio-panel'].hidden,true);
 view.reset();assert.ok(stopped>0);
});
test('reset suppresses a stale playback rejection',async()=>{
 const V=require('../web/audio-view.js');const nodes={};const doc={getElementById:id=>nodes[id]??={hidden:true,textContent:'',addEventListener(){}}};let finish;
 const view=V.create(doc,{directions:['lv-ru'],clips:{ru:{x:{text:'да'}}},ui:{lv:{replay:'R',label:'L',error:'E'}}},{play:()=>new Promise(r=>finish=r),stop(){}});
 view.localize('lv');const pending=view.answer({source:'lv',target:'ru',correctId:'x'},{correctText:'да'});view.reset();finish(false);await pending;assert.equal(nodes['audio-error'].textContent,'');
});
