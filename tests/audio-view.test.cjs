const test=require('node:test');const assert=require('node:assert/strict');
function promptFixture(player){
 const nodes={};const doc={getElementById:id=>nodes[id]??={hidden:true,disabled:false,textContent:'',handlers:{},addEventListener(n,h){this.handlers[n]=h},setAttribute(n,v){this[n]=v}}};
 const pack={directions:['lv-ru','ru-lv','en-ru'],clips:{lv:{x:{text:'jā'},y:{text:'nē'}},ru:{x:{text:'да'}},en:{x:{text:'yes'}}},ui:{lv:{replay:'Atkārtot',prompt:'Atskaņot jautājuma izrunu',label:'Atbilde',error:'Kļūda'},ru:{replay:'Повторить',prompt:'Прослушать вопрос',label:'Ответ',error:'Ошибка'},en:{replay:'Replay',prompt:'Play question pronunciation',label:'Answer',error:'Error'}}};
 return {nodes,view:require('../web/audio-view.js').create(doc,pack,player)};
}
test('prompt speaker plays the displayed source text and rejects missing or mismatched recordings',async()=>{
 const calls=[];const {nodes,view}=promptFixture({play:async(...args)=>{calls.push(args);return true},stop(){}});
 view.localize('lv');view.question({source:'lv',target:'ru',conceptId:'x',text:'jā'});
 assert.equal(nodes['question-replay'].hidden,false);assert.equal(nodes['question-replay'].disabled,false);
 assert.equal(nodes['question-replay']['aria-label'],'Atskaņot jautājuma izrunu: jā');
 await nodes['question-replay'].handlers.click();await nodes['question-replay'].handlers.click();
 assert.deepEqual(calls.map(c=>c.slice(0,3)),[['x','lv','jā'],['x','lv','jā']]);
 for(const shown of [{source:'lv',target:'ru',conceptId:'x',text:'wrong'},{source:'lv',target:'ru',conceptId:'absent',text:'jā'},{source:'lv',target:'en',conceptId:'x',text:'jā'}]){
  view.question(shown);assert.equal(nodes['question-replay'].hidden,true);assert.equal(nodes['question-replay'].disabled,true);
  await nodes['question-replay'].handlers.click();assert.equal(calls.length,2);
 }
 view.localize('ru');view.question({source:'ru',target:'lv',conceptId:'x',text:'да'});
 await nodes['question-replay'].handlers.click();assert.deepEqual(calls[2].slice(0,3),['x','ru','да']);
 assert.equal(nodes['question-replay']['aria-label'],'Прослушать вопрос: да');
});
test('changing the prompt or resetting cancels its sound and suppresses stale playback errors',async()=>{
 let finish,decoderError,stopped=0;
 const {nodes,view}=promptFixture({play:(_id,_language,_text,onError)=>{decoderError=onError;return new Promise(r=>finish=r)},stop(){stopped++}});
 view.localize('lv');view.question({source:'lv',target:'ru',conceptId:'x',text:'jā'});
 const old=nodes['question-replay'].handlers.click();const before=stopped;
 view.question({source:'lv',target:'ru',conceptId:'y',text:'nē'});
 assert.ok(stopped>before);decoderError();finish(false);await old;assert.equal(nodes['question-audio-error'].textContent,'');
 const current=nodes['question-replay'].handlers.click();decoderError();assert.equal(nodes['question-audio-error'].textContent,'Kļūda');
 view.reset();decoderError();finish(false);await current;
 assert.equal(nodes['question-replay'].hidden,true);assert.equal(nodes['question-audio-error'].textContent,'');
});
