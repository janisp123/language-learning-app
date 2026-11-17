// Executes the real UI in a minimal DOM fixture. This checks event wiring, not browser layout.
const test=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
const E=require('../core/engine.js');
const {course,locales,html:builtHtml}=require('./runtime.cjs');
function mount(data=course,bundle=null,initialDirection='lv-ru'){
  const elements=new Map();
  const timers=new Map();let now=0;let timerId=0;
  let document;
  class Element {
    constructor(){this.children=[];this.dataset={};this.handlers={};this.hidden=false;this.disabled=false;this._text='';this.className='';this.classList={add:name=>{this.className+=' '+name;}};}
    set textContent(text){this._text=String(text);this.children=[];}
    get textContent(){return this._text+this.children.map(x=>typeof x==='string'?x:x.textContent).join('');}
    append(...children){this.children.push(...children);}
    replaceChildren(...children){this._text='';this.children=[...children];}
    addEventListener(name,handler){this.handlers[name]=handler;}
    setAttribute(name,value){this[name]=value;}
    click(){if(!this.disabled)this.handlers.click?.();}
    focus(){document.activeElement=this;}
    play(){this.playCount=(this.playCount||0)+1;this.paused=false;return Promise.resolve();}
    pause(){this.paused=true;}
  }
  const html=bundle || builtHtml;
  for(const match of html.matchAll(/<[^>]+\bid="([^"]+)"[^>]*>/g)){
    const e=new Element();e.hidden=/\shidden[\s>]/.test(match[0]);elements.set(match[1],e);
  }
  elements.get('direction').value=initialDirection;
  elements.get('direction').options=[...html.matchAll(/<option id="([^"]+)" value="([^"]+)"[^>]*>/g)].map(match=>{const option=elements.get(match[1]);option.value=match[2];return option;});
  elements.get('course-data').textContent=bundle ? html.match(/id="course-data">([\s\S]*?)<\/script>/)[1] : JSON.stringify(data);
  if(elements.has('ui-data'))elements.get('ui-data').textContent=bundle ? html.match(/id="ui-data">([\s\S]*?)<\/script>/)[1] : JSON.stringify(locales);
  if(elements.has('audio-data'))elements.get('audio-data').textContent=html.match(/id="audio-data">([\s\S]*?)<\/script>/)[1];
  document={documentElement:{lang:'en'},title:'',getElementById:id=>elements.get(id),createElement:()=>new Element(),createTextNode:text=>String(text),activeElement:null};
  const context=vm.createContext({document,LanguageEngine:E,
    setTimeout:(callback,delay)=>{const id=++timerId;timers.set(id,{callback,at:now+delay});return id;},
    clearTimeout:id=>timers.delete(id)
  });
  if(bundle){
    for(const script of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)){
      if(!script[1].includes('application/json'))vm.runInContext(script[2],context);
    }
  }else vm.runInContext(fs.readFileSync(path.join(root,'web/app.js'),'utf8'),context);
  const $=id=>elements.get(id);
  $.tick=milliseconds=>{const end=now+milliseconds;while(true){const entry=[...timers].sort((a,b)=>a[1].at-b[1].at).find(([,t])=>t.at<=end);if(!entry)break;now=entry[1].at;timers.delete(entry[0]);entry[1].callback();}now=end;};
  $.queuedCallback=()=>[...timers.values()][0]?.callback;
  $.language=()=>document.documentElement.lang;
  $.title=()=>document.title;
  return $;
}
function choose($,id){const button=$('choices').children.find(b=>b.dataset.optionId===id);assert.ok(button);button.click();}
test('standalone prompt speaker uses the current source clip without answering or changing grading',()=>{
  const pack=JSON.parse(builtHtml.match(/id="audio-data">([\s\S]*?)<\/script>/)[1]);
  for(const direction of course.directions){
    const [source,target]=direction.split('-');const $=mount(undefined,builtHtml,direction);$('start').click();
    const first=course.lessons[0].prompts[0].phraseId;const second=course.lessons[0].prompts[1].phraseId;
    assert.ok($('question-replay'),'speaker control missing beside the prompt');
    assert.equal($('question-replay').hidden,false);assert.ok($('question-replay')['aria-label'].includes(course.phrases[0][source]));
    assert.equal($('audio-replay'),undefined,'previous-answer replay must not be present');
    assert.equal($('audio-panel'),undefined,'previous-answer section must not be present');
    const choices=$('choices').children.map(b=>b.dataset.optionId);
    $('question-replay').click();$('question-replay').click();
    assert.equal($('audio-media').src,pack.clips[source][first].src);assert.equal($('audio-media').playCount,3);
    $.tick(1000);assert.equal($('progress').value,0);assert.equal($('feedback').textContent,'');
    assert.ok($('choices').children.every(b=>!b.disabled));assert.deepEqual($('choices').children.map(b=>b.dataset.optionId),choices);
    choose($,first);assert.equal($('audio-media').playCount,3,'answering must not play an answer clip');$.tick(500);
    assert.equal($('audio-media').playCount,4,'advancing autoplays the new prompt');
    $('question-replay').click();assert.equal($('audio-media').src,pack.clips[source][second].src);assert.equal($('progress').value,1);
    const wrong=$('choices').children.find(b=>b.dataset.optionId!==second);wrong.click();
    assert.equal($('audio-media').playCount,5,'answer feedback never starts target audio');
    $.tick(499);assert.equal($('audio-media').playCount,5);
    $.tick(1);assert.equal($('audio-media').playCount,6);assert.equal($('audio-media').src,pack.clips[source][first].src);
    $('restart').click();assert.equal($('audio-media').playCount,7);assert.equal($('progress').value,0);

    $('change').click();assert.equal($('audio-media').paused,true);assert.equal($('question-replay').hidden,true);
  }
});
test('standalone speaker covers every question in all allowed directions with correct source binding',()=>{
  const html=fs.readFileSync(path.join(root,'downloads/language-learning-test.html'),'utf8');
  const pack=JSON.parse(html.match(/id="audio-data">([\s\S]*?)<\/script>/)[1]);
  const bank=new Map(course.phrases.map(p=>[p.id,p]));
  for(const direction of course.directions){
    const [source,target]=direction.split('-');
    const $=mount(undefined,html,source+'-'+target);$('start').click();let count=0;
    for(const lesson of course.lessons)for(const prompt of lesson.prompts){
      assert.equal($('question').textContent,bank.get(prompt.phraseId)[source]);
      count++; // Each appearance automatically plays exactly once.
      assert.equal($('audio-media').src,pack.clips[source][prompt.phraseId].src);
      assert.equal($('question-replay').hidden,false);
      choose($,prompt.phraseId);assert.equal($('audio-media').playCount,count);$.tick(500);
    }
    assert.equal($('audio-media').playCount,course.phrases.length);
    assert.equal(count,course.phrases.length);assert.equal($('finished').hidden,false);assert.equal($('audio-media').paused,true);
    $('again').click();assert.equal($('audio-media').paused,false);
    const prompt=course.lessons[0].prompts[0];
    choose($,$('choices').children.find(b=>b.dataset.optionId!==prompt.phraseId).dataset.optionId);
    assert.equal($('audio-media').playCount,course.phrases.length+1,'wrong answers must not play a target clip');
  }
});
test('answer locks immediately, advances only at 500ms, then wrong steps back automatically',()=>{
  const $=mount();assert.equal($('setup').hidden,false);assert.equal($('error').hidden,true);
  assert.equal($('lesson-list').children.length,course.lessons.length);
  $('start').click();assert.equal($('practice').hidden,false);assert.equal($('choices').children.length,4);
  assert.equal($('question').lang,'lv');
  choose($,course.lessons[0].prompts[0].phraseId);
  assert.match($('feedback').textContent,/Pareizi/);assert.ok($('choices').children.every(b=>b.disabled));
  choose($,course.lessons[0].prompts[0].phraseId);
  $.tick(499);assert.equal($('progress').value,0);assert.equal($('question').textContent,course.phrases[0].lv);
  $.tick(1);assert.equal($('progress').value,1);assert.equal($('next'),undefined);
  const wrong=$('choices').children.find(b=>b.dataset.optionId!==course.lessons[0].prompts[1].phraseId);
  wrong.click();wrong.click();assert.match($('feedback').textContent,/Nav pareizi/);
  $.tick(500);assert.equal($('progress').value,0);assert.equal($('question').textContent,course.phrases[0].lv);
  assert.match($('feedback').textContent,/Nav pareizi/);
  $('restart').click();assert.equal($('progress').value,0);
  $('change').click();assert.equal($('setup').hidden,false);assert.equal($('practice').hidden,true);
  $('direction').value='ru-lv';$('start').click();assert.equal($('question').lang,'ru');assert.equal($('question').textContent,course.phrases[0].ru);
});
test('all interface text follows source language on direction selection, practice, errors and completion',()=>{
  const $=mount();assert.equal($.language(),'lv');assert.equal($('start').textContent,'Sākt mācīties');
  assert.equal($('restart').textContent,'Sākt no 1. nodarbības');
  assert.match($('rule-mistakes').textContent,/Trešā kļūda/);
  $('direction').value='ru-lv';$('direction').handlers.change();
  assert.equal($.language(),'ru');assert.equal($('start').textContent,'Начать обучение');
  assert.equal($.title(),locales.ru.messages.pageTitle);assert.equal($('lesson-list').children[0].textContent,locales.ru.lessons[course.lessons[0].id]);
  $('start').click();assert.equal($('lesson-title').textContent,locales.ru.lessons[course.lessons[0].id]);
  assert.equal($('instruction').textContent,'Выберите перевод на латышский язык');
  assert.equal($('question').lang,'ru');assert.ok($('choices').children.every(b=>b.lang==='lv'));
  const wrong=$('choices').children.find(b=>b.dataset.optionId!==course.lessons[0].prompts[0].phraseId);wrong.click();
  assert.match($('feedback').textContent,/Неверно/);assert.equal($('feedback').children[0].lang,'lv');$.tick(500);
  $('restart').click();
  for(const lesson of course.lessons)for(const prompt of lesson.prompts){choose($,prompt.phraseId);$.tick(500);}
  assert.equal($('finished').hidden,false);assert.equal($('finished-title').textContent,'Вы прошли все уроки.');
  assert.equal($('again').textContent,'Снова начать с урока 1');
  $('choose').click();$('direction').value='lv-ru';$('direction').handlers.change();
  assert.equal($.language(),'lv');assert.equal($('start').textContent,'Sākt mācīties');
  $('start').click();assert.equal($('instruction').textContent,'Izvēlies tulkojumu krievu valodā');
});
test('real UI traverses all registered blocks to completion and starts a fresh session',()=>{
  const $=mount();$('start').click();
  for(const lesson of course.lessons)for(const prompt of lesson.prompts){choose($,prompt.phraseId);$.tick(500);}
  assert.equal($('finished').hidden,false);assert.equal($('practice').hidden,true);
  $('again').click();assert.equal($('practice').hidden,false);assert.equal($('progress').value,0);assert.match($('lesson-label').textContent,new RegExp(`Nodarbība 1 no ${course.lessons.length}`));
});
test('invalid embedded content produces a visible error and disables start',()=>{
  const $=mount({});assert.equal($('error').hidden,false);assert.equal($('start').disabled,true);assert.equal($('practice').hidden,true);
  assert.match($('error').textContent,/Neizdevās/);
  $('direction').value='ru-lv';assert.equal(typeof $('direction').handlers.change,'function');$('direction').handlers.change();
  assert.equal($.language(),'ru');assert.match($('error').textContent,/Не удалось/);assert.equal($('start').disabled,true);
  const ru=mount({},null,'ru-lv');assert.equal(ru.language(),'ru');assert.match(ru('error').textContent,/Не удалось/);
  const en=mount({},null,'en-lv');assert.equal(en.language(),'en');assert.match(en('error').textContent,/could not be loaded/);
});
test('committed standalone HTML executes its embedded data, engine and UI',()=>{
  const html=fs.readFileSync(path.join(root,'downloads/language-learning-test.html'),'utf8');
  const $=mount(undefined,html);assert.equal($('error').hidden,true);
  $('start').click();assert.equal($('question').textContent,course.phrases[0].lv);
  choose($,course.lessons[0].prompts[0].phraseId);$.tick(499);assert.equal($('progress').value,0);$.tick(1);
  assert.equal($('progress').value,1);
});
test('restart and direction change cancel pending transitions, including already-queued stale callbacks',()=>{
  const $=mount();$('start').click();choose($,course.lessons[0].prompts[0].phraseId);
  const old=$.queuedCallback();assert.equal(typeof old,'function');
  $('restart').click();old();$.tick(1000);assert.equal($('progress').value,0);
  choose($,course.lessons[0].prompts[0].phraseId);
  const stale=$.queuedCallback();$('change').click();$.tick(1000);
  assert.equal($('setup').hidden,false);
  $('direction').value='ru-lv';$('start').click();stale();$.tick(1000);
  assert.equal($('question').lang,'ru');assert.equal($('progress').value,0);
  choose($,course.lessons[0].prompts[0].phraseId);$.tick(500);assert.equal($('progress').value,1);
});
test('third wrong answer shows restart feedback and returns to lesson one after 500ms',()=>{
  const $=mount();$('start').click();
  for(const prompt of course.lessons[0].prompts){choose($,prompt.phraseId);$.tick(500);}
  assert.match($('lesson-label').textContent,new RegExp(`Nodarbība 2 no ${course.lessons.length}`));
  for(let miss=1;miss<=3;miss++){
    const wrong=$('choices').children.find(b=>b.dataset.optionId!==course.lessons[1].prompts[0].phraseId);
    wrong.click();$.tick(499);assert.match($('lesson-label').textContent,new RegExp(`Nodarbība 2 no ${course.lessons.length}`));
    if(miss===3)assert.match($('feedback').textContent,/Trešā kļūda/);
    $.tick(1);
    if(miss<3){assert.equal($('mistakes').textContent,`Kļūdas šajā blokā: ${miss} no 3`);assert.match($('lesson-label').textContent,new RegExp(`Nodarbība 2 no ${course.lessons.length}`));}
  }
  assert.match($('lesson-label').textContent,new RegExp(`Nodarbība 1 no ${course.lessons.length}`));assert.equal($('question').textContent,course.phrases[0].lv);
  assert.equal($('mistakes').textContent,'Kļūdas šajā blokā: 0 no 3');assert.equal($('progress').value,0);
});
test('wrong on question seven returns to question six of the same block, retaining its mistake count',()=>{
  const $=mount();$('start').click();
  for(const prompt of course.lessons[0].prompts){choose($,prompt.phraseId);$.tick(500);}
  for(const prompt of course.lessons[1].prompts.slice(0,6)){choose($,prompt.phraseId);$.tick(500);}
  const phrase=id=>course.phrases.find(p=>p.id===id).lv;
  const middle=course.lessons[1].prompts[6];
  assert.equal($('question').textContent,phrase(middle.phraseId));
  const wrong=$('choices').children.find(b=>b.dataset.optionId!==middle.phraseId);wrong.click();
  $.tick(499);assert.equal($('question').textContent,phrase(middle.phraseId));
  $.tick(1);assert.match($('lesson-label').textContent,new RegExp(`Nodarbība 2 no ${course.lessons.length}`));
  assert.equal($('question').textContent,phrase(course.lessons[1].prompts[5].phraseId));
  assert.equal($('progress').value,0);assert.equal($('mistakes').textContent,'Kļūdas šajā blokā: 1 no 3');
  assert.match($('feedback').textContent,/Atgriežamies vienu jautājumu atpakaļ/);
});
test('all allowed learning directions use the right source-language UI and target-language choices',()=>{
  for(const direction of course.directions){
    const $=mount();$('direction').value=direction;$('direction').handlers.change();
    const [source,target]=direction.split('-');
    assert.equal($.language(),source);$('start').click();assert.equal($('error').hidden,true);
    assert.equal($('question').lang,source);assert.equal($('question').textContent,course.phrases[0][source]);
    assert.ok($('choices').children.every(b=>b.lang===target));
    const correct=$('choices').children.find(b=>b.dataset.optionId===course.phrases[0].id);
    assert.equal(correct.textContent,course.phrases[0][target]);
    if(source==='en'){assert.equal($('restart').textContent,'Restart from lesson 1');assert.equal($('lesson-title').textContent,locales.en.lessons[course.lessons[0].id]);}
    const wrong=$('choices').children.find(b=>b.dataset.optionId!==course.phrases[0].id);wrong.click();$.tick(500);
    assert.equal($('progress').value,0);
  }
});
