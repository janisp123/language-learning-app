// Executes the real UI in a minimal DOM fixture. This checks event wiring, not browser layout.
const test=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
const E=require('../core/engine.js');
const {course,locales,html:builtHtml}=require('./runtime.cjs');
// Bundle mounts exercise real audio sequencing; app-only mounts intentionally exercise audio-unavailable fallback.
function mount(data=course,bundle=null,initialDirection='lv-ru',preset=null){
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
  elements.get('direction').options=[...html.matchAll(/<option id="(direction-[^"]+)" value="([^"]+)"[^>]*>/g)].map(match=>{const option=elements.get(match[1]);option.value=match[2];return option;});
  elements.get('course-data').textContent=bundle ? html.match(/id="course-data">([\s\S]*?)<\/script>/)[1] : JSON.stringify(data);
  if(elements.has('ui-data'))elements.get('ui-data').textContent=bundle ? html.match(/id="ui-data">([\s\S]*?)<\/script>/)[1] : JSON.stringify(Object.fromEntries(['lv','ru','en'].map(lang=>[lang,require('../content/languages/'+lang+'.json').ui])));
  if(preset!==null) {
    elements.get('focused-data').textContent=html.match(/id="focused-data">([\s\S]*?)<\/script>/)[1];
    elements.get('course-selection').value=preset;
  }
  if(elements.has('audio-data'))elements.get('audio-data').textContent=html.match(/id="audio-data">([\s\S]*?)<\/script>/)[1];
  document={documentElement:{lang:'en',dataset:{theme:'light'}},title:'',getElementById:id=>elements.get(id),createElement:()=>new Element(),createTextNode:text=>String(text),activeElement:null};
  const context=vm.createContext({document,LanguageEngine:E,LanguageCourseSelection:require('../core/course-selection.js'),
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
  $.theme=()=>document.documentElement.dataset.theme;
  $.language=()=>document.documentElement.lang;
  $.title=()=>document.title;
  return $;
}
function answerButtons($){return $('choices').children.map(row=>row.children[0]);}
function choose($,id){const button=answerButtons($).find(b=>b.dataset.optionId===id);assert.ok(button);button.click();}
async function finishCorrect($){
 assert.equal(typeof $('audio-media').onended,'function');$('audio-media').onended();
 for(let i=0;i<8;i++)await Promise.resolve();$.tick(1000);
}
test('standalone prompt speaker and wrong-answer correction preserve grading and exact source/target binding',async()=>{
  const pack=JSON.parse(builtHtml.match(/id="audio-data">([\s\S]*?)<\/script>/)[1]);
  for(const direction of course.directions){
    const [source,target]=direction.split('-');const $=mount(undefined,builtHtml,direction);$('start').click();
    const first=course.lessons[0].prompts[0].phraseId;const second=course.lessons[0].prompts[1].phraseId;
    assert.ok($('question-replay'),'speaker control missing beside the prompt');
    assert.equal($('question-replay').hidden,false);assert.ok($('question-replay')['aria-label'].includes(course.phrases[0][source]));
    assert.equal($('audio-replay'),undefined,'previous-answer replay must not be present');
    assert.equal($('audio-panel'),undefined,'previous-answer section must not be present');
    const choices=answerButtons($).map(b=>b.dataset.optionId);
    $('question-replay').click();$('question-replay').click();
    assert.equal($('audio-media').src,pack.clips[source][first].src);assert.equal($('audio-media').playCount,3);
    $.tick(1000);assert.equal($('progress').value,0);assert.equal($('feedback').textContent,'');
    assert.ok(answerButtons($).every(b=>!b.disabled));assert.deepEqual(answerButtons($).map(b=>b.dataset.optionId),choices);
    choose($,first);assert.equal($('audio-media').playCount,4,'correct selection plays its target recording immediately');assert.equal($('audio-media').src,pack.clips[target][first].src);$.tick(499);assert.equal($('progress').value,0);await finishCorrect($);
    assert.equal($('audio-media').playCount,5,'advancing autoplays the new prompt');
    $('question-replay').click();assert.equal($('audio-media').src,pack.clips[source][second].src);assert.equal($('progress').value,1);
    const wrong=answerButtons($).find(b=>b.dataset.optionId!==second);wrong.click();
    assert.equal($('audio-media').playCount,7,'wrong answer begins by repeating the current question');
    $.tick(500);assert.equal($('audio-media').playCount,7);assert.equal($('question').textContent,course.phrases.find(p=>p.id===second)[source]);
    for(let n=0;n<6;n++){
      assert.equal($('audio-media').src,pack.clips[n%2?target:source][second].src);
      assert.equal(answerButtons($).every(b=>b.disabled),true);
      $('audio-media').onended();for(let flush=0;flush<8;flush++)await Promise.resolve();
    }
    assert.equal($('audio-media').playCount,13);assert.equal($('audio-media').src,pack.clips[source][first].src);assert.equal($('progress').value,0);
    $('restart').click();assert.equal($('audio-media').playCount,14);assert.equal($('progress').value,0);

    $('change').click();assert.equal($('audio-media').paused,true);assert.equal($('question-replay').hidden,true);
  }
});
test('standalone speaker covers every question in all allowed directions with correct source binding',async()=>{
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
      choose($,prompt.phraseId);assert.equal($('audio-media').src,pack.clips[target][prompt.phraseId].src);assert.equal($('audio-media').playCount,count*2);await finishCorrect($);
    }
    assert.equal($('audio-media').playCount,course.phrases.length*2);
    assert.equal(count,course.phrases.length);assert.equal($('finished').hidden,false);assert.equal($('audio-media').paused,true);
    $('again').click();assert.equal($('audio-media').paused,false);
    const prompt=course.lessons[0].prompts[0];
    choose($,answerButtons($).find(b=>b.dataset.optionId!==prompt.phraseId).dataset.optionId);
    assert.equal($('audio-media').playCount,course.phrases.length*2+2,'wrong answer starts correction by replaying its source prompt');
    assert.equal($('audio-media').src,pack.clips[source][prompt.phraseId].src);$('change').click();
  }
});
test('without audio modules, correct answers pause one second and wrong answers keep the 500ms fallback',()=>{
  const $=mount();assert.equal($('setup').hidden,false);assert.equal($('error').hidden,true);
  assert.equal($('lesson-list').children.length,course.lessons.length);
  $('start').click();assert.equal($('practice').hidden,false);assert.equal(answerButtons($).length,4);
  assert.equal($('question').lang,'lv');
  choose($,course.lessons[0].prompts[0].phraseId);
  assert.match($('feedback').textContent,/Pareizi/);assert.ok(answerButtons($).every(b=>b.disabled));
  choose($,course.lessons[0].prompts[0].phraseId);
  $.tick(999);assert.equal($('progress').value,0);assert.equal($('question').textContent,course.phrases[0].lv);
  $.tick(1);assert.equal($('progress').value,1);assert.equal($('next'),undefined);
  const wrong=answerButtons($).find(b=>b.dataset.optionId!==course.lessons[0].prompts[1].phraseId);
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
  assert.equal($('question').lang,'ru');assert.ok(answerButtons($).every(b=>b.lang==='lv'));
  const wrong=answerButtons($).find(b=>b.dataset.optionId!==course.lessons[0].prompts[0].phraseId);wrong.click();
  assert.match($('feedback').textContent,/Неверно/);assert.equal($('feedback').children[0].lang,'lv');$.tick(500);
  $('restart').click();
  for(const lesson of course.lessons)for(const prompt of lesson.prompts){choose($,prompt.phraseId);$.tick(1000);}
  assert.equal($('finished').hidden,false);assert.equal($('finished-title').textContent,'Поздравляем!');
  assert.equal($('again').textContent,'Снова начать с урока 1');
  $('choose').click();$('direction').value='lv-ru';$('direction').handlers.change();
  assert.equal($.language(),'lv');assert.equal($('start').textContent,'Sākt mācīties');
  $('start').click();assert.equal($('instruction').textContent,'Izvēlies tulkojumu krievu valodā');
});
test('real UI retains dark mode through every block, completion and restart',()=>{
  const $=mount();$('learning-theme-toggle').click();assert.equal($.theme(),'dark');$('start').click();
  for(const lesson of course.lessons)for(const prompt of lesson.prompts){choose($,prompt.phraseId);$.tick(1000);}
  assert.equal($('finished').hidden,false);assert.equal($('practice').hidden,true);assert.equal($.theme(),'dark');
  $('again').click();assert.equal($.theme(),'dark');assert.equal($('practice').hidden,false);assert.equal($('progress').value,0);assert.match($('lesson-label').textContent,new RegExp(`Nodarbība 1 no ${course.lessons.length}`));
});
test('invalid embedded content produces a visible error and disables start',()=>{
  const $=mount({});assert.equal($('error').hidden,false);assert.equal($('start').disabled,true);assert.equal($('practice').hidden,true);
  assert.match($('error').textContent,/Neizdevās/);
  $('direction').value='ru-lv';assert.equal(typeof $('direction').handlers.change,'function');$('direction').handlers.change();
  assert.equal($.language(),'ru');assert.match($('error').textContent,/Не удалось/);assert.equal($('start').disabled,true);
  const ru=mount({},null,'ru-lv');assert.equal(ru.language(),'ru');assert.match(ru('error').textContent,/Не удалось/);
  const en=mount({},null,'en-lv');assert.equal(en.language(),'en');assert.match(en('error').textContent,/could not be loaded/);
});
test('committed standalone HTML executes its embedded data, engine and UI',async()=>{
  const html=fs.readFileSync(path.join(root,'downloads/language-learning-test.html'),'utf8');
  const $=mount(undefined,html);assert.equal($('error').hidden,true);
  $('start').click();assert.equal($('question').textContent,course.phrases[0].lv);
  choose($,course.lessons[0].prompts[0].phraseId);$.tick(499);assert.equal($('progress').value,0);await finishCorrect($);
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
  choose($,course.lessons[0].prompts[0].phraseId);$.tick(1000);assert.equal($('progress').value,1);
});
test('third wrong answer shows restart feedback and returns to lesson one after 500ms',()=>{
  const $=mount();$('start').click();
  for(const prompt of course.lessons[0].prompts){choose($,prompt.phraseId);$.tick(1000);}
  assert.match($('lesson-label').textContent,new RegExp(`Nodarbība 2 no ${course.lessons.length}`));
  for(let miss=1;miss<=3;miss++){
    const wrong=answerButtons($).find(b=>b.dataset.optionId!==course.lessons[1].prompts[0].phraseId);
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
  for(const prompt of course.lessons[0].prompts){choose($,prompt.phraseId);$.tick(1000);}
  for(const prompt of course.lessons[1].prompts.slice(0,6)){choose($,prompt.phraseId);$.tick(1000);}
  const phrase=id=>course.phrases.find(p=>p.id===id).lv;
  const middle=course.lessons[1].prompts[6];
  assert.equal($('question').textContent,phrase(middle.phraseId));
  const wrong=answerButtons($).find(b=>b.dataset.optionId!==middle.phraseId);wrong.click();
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
    assert.ok(answerButtons($).every(b=>b.lang===target));
    const correct=answerButtons($).find(b=>b.dataset.optionId===course.phrases[0].id);
    assert.equal(correct.textContent,course.phrases[0][target]);
    if(source==='en'){assert.equal($('restart').textContent,'Restart from lesson 1');assert.equal($('lesson-title').textContent,locales.en.lessons[course.lessons[0].id]);}
    const wrong=answerButtons($).find(b=>b.dataset.optionId!==course.phrases[0].id);wrong.click();$.tick(500);
    assert.equal($('progress').value,0);
  }
});

test('each answer speaker replays target pronunciation without grading, shuffling or navigating',async()=>{
 const pack=JSON.parse(builtHtml.match(/id="audio-data">([\s\S]*?)<\/script>/)[1]);
 for(const direction of ['lv-ru','lv-en','ru-lv','ru-en','en-lv','en-ru']){
  const $=mount(undefined,builtHtml,direction);$('start').click();
  const rows=$('choices').children;assert.equal(rows.length,4);
  const ids=answerButtons($).map(b=>b.dataset.optionId);const [source,target]=direction.split('-');
  for(const row of rows){
   assert.equal(row.children.length,2,'answer text and speaker must be separate buttons');
   const [answer,speaker]=row.children;assert.equal(speaker.className,'answer-replay');assert.equal(speaker.disabled,false);
   for(let repeat=0;repeat<2;repeat++)speaker.click();
   assert.equal($('audio-media').src,pack.clips[target][answer.dataset.optionId].src);
   assert.ok(speaker['aria-label'].includes(answer.textContent));
   assert.equal($('feedback').textContent,'');assert.equal($('progress').value,0);
   assert.deepEqual(answerButtons($).map(b=>b.dataset.optionId),ids);
  }
  const before=$('audio-media').playCount;$.tick(1000);assert.equal($('audio-media').playCount,before);
  choose($,course.lessons[0].prompts[0].phraseId);assert.ok(rows.every(row=>row.children.every(b=>b.disabled)));
  $.tick(499);assert.equal($('progress').value,0);await finishCorrect($);assert.equal($('progress').value,1);
  assert.equal($('audio-media').src,pack.clips[source][course.lessons[0].prompts[1].phraseId].src);
  rows[0].children[1].handlers.click();assert.equal($('audio-media').src,pack.clips[source][course.lessons[0].prompts[1].phraseId].src,'stale speakers cannot play old answers');
  const current=$('choices').children[0].children[1];$('change').click();current.handlers.click();assert.equal($('audio-media').paused,true);
 }
});
test('every Japanese answer speaker plays its exact Japanese clip without grading',async()=>{
 const pack=JSON.parse(builtHtml.match(/id="audio-data">([\s\S]*?)<\/script>/)[1]);
 const $=mount(undefined,builtHtml,'en-ja');$('start').click();let appearances=0;
 for(const lesson of course.lessons)for(const prompt of lesson.prompts){
  for(const row of $('choices').children){
   const [answer,speaker]=row.children;assert.equal(speaker.disabled,false,'Japanese pronunciation must be available');
   const progress=$('progress').value;speaker.click();
   assert.equal($('audio-media').src,pack.clips.ja[answer.dataset.optionId].src);assert.equal($('progress').value,progress);assert.equal(answer.disabled,false);
  }
  choose($,prompt.phraseId);$.tick(499);assert.equal(answerButtons($)[0].disabled,true);await finishCorrect($);appearances++;
 }
 assert.equal(appearances,510);assert.equal($('finished').hidden,false);assert.equal($('audio-media').paused,true);
});

async function endCorrection($){for(let n=0;n<6;n++){assert.equal(typeof $('audio-media').onended,'function');$('audio-media').onended();for(let i=0;i<8;i++)await Promise.resolve();}}
test('third wrong answer waits for three complete pairs before lesson-one restart; reset cancels stale correction',async()=>{
 const $=mount(undefined,builtHtml,'en-ja');$('start').click();
 for(let mistake=1;mistake<=3;mistake++){
  const first=course.lessons[0].prompts[0].phraseId;choose($,first);await finishCorrect($);
  const current=course.lessons[0].prompts[1].phraseId;
  choose($,answerButtons($).find(b=>b.dataset.optionId!==current).dataset.optionId);
  const text=$('question').textContent;$.tick(500);assert.equal($('question').textContent,text);
  await endCorrection($);
  assert.equal($('question').textContent,course.phrases.find(p=>p.id===first).en);
  assert.equal($('progress').value,0);assert.equal($('mistakes').textContent,`Mistakes in this block: ${mistake===3?0:mistake} of 3`);
 }
 const first=course.lessons[0].prompts[0].phraseId;
 choose($,answerButtons($).find(b=>b.dataset.optionId!==first).dataset.optionId);
 const stale=$('audio-media').onended;$('restart').click();stale();for(let i=0;i<8;i++)await Promise.resolve();$.tick(500);
 assert.equal($('progress').value,0);assert.equal($('mistakes').textContent,'Mistakes in this block: 0 of 3');
 assert.equal($('correction-status').textContent,'');
});

test('correct answer waits for full playback and exactly one extra second; restart cancels playback and pause',async()=>{
 const $=mount(undefined,builtHtml,'en-ja');$('start').click();
 const first=course.lessons[0].prompts[0].phraseId;
 choose($,first);assert.equal(typeof $('audio-media').onended,'function','selected answer must wait for real completion');
 const ended=$('audio-media').onended;
 $.tick(12000);assert.equal($('progress').value,0,'long clips must not be cut short');
 assert.equal($('question-replay').disabled,true);
 ended();for(let i=0;i<8;i++)await Promise.resolve();
 $.tick(999);assert.equal($('progress').value,0);
 $.tick(1);assert.equal($('progress').value,1);
 $('restart').click();choose($,first);const stale=$('audio-media').onended;
 $('restart').click();stale();for(let i=0;i<8;i++)await Promise.resolve();$.tick(4000);assert.equal($('progress').value,0);
 choose($,first);$('audio-media').onended();for(let i=0;i<8;i++)await Promise.resolve();
 const pause=$.queuedCallback();$('change').click();pause();$.tick(4000);assert.equal($('setup').hidden,false);assert.equal($('progress').value,0);
});

test('correct-answer playback error and stall recover after one second without changing grading',async()=>{
 for(const failure of ['error','stall']){
  const $=mount(undefined,builtHtml,'en-ja');$('start').click();choose($,course.lessons[0].prompts[0].phraseId);
  if(failure==='error')$('audio-media').onerror();else $.tick(30000);
  for(let i=0;i<8;i++)await Promise.resolve();assert.ok($('question-audio-error').textContent);
  $.tick(999);assert.equal($('progress').value,0);$.tick(1);assert.equal($('progress').value,1);
 }
});

test('unit completion feedback counts remaining units and congratulates all 21 preset/direction combinations',()=>{
  const S=require('../core/course-selection.js');
  const focused=JSON.parse(builtHtml.match(/id="focused-data">([\s\S]*?)<\/script>/)[1]);
  const expected={
    en:{remaining:'Units remaining: ',total:'Total units completed: ',title:'Congratulations!'},
    lv:{remaining:'Atlikušās nodarbības: ',total:'Pabeigtās nodarbības: ',title:'Apsveicam!'},
    ru:{remaining:'Осталось уроков: ',total:'Пройдено уроков: ',title:'Поздравляем!'}
  };
  for(const direction of course.directions)for(const preset of ['kids','adults','full']){
    const $=mount(course,null,direction,preset);
    $('course-selection').value=preset; $('course-selection').handlers.change();
    $('start').click();
    const active=E.validateCourse(preset==='full'?course:S.select(course,focused,preset,direction));
    const total=active.lessons.length;
    assert.equal(total,preset==='full'?51:10);
    const lang=expected[direction.split('-')[0]];
    for(let i=0;i<total;i++){
      for(let j=0;j<active.lessons[i].prompts.length;j++){
        choose($,active.lessons[i].prompts[j].correctAnswerId);
        if(j===9&&i<total-1)assert.ok($('feedback').textContent.includes(lang.remaining+(total-i-1)+'.'));
        else assert.ok(!$('feedback').textContent.includes(lang.remaining));
        $.tick(1000);
      }
      if(i<total-1)assert.ok($('feedback').textContent.includes(lang.remaining+(total-i-1)+'.'));
    }
    assert.equal($('finished').hidden,false);
    assert.equal($('finished-title').textContent,lang.title);
    assert.ok($('finished-intro').textContent.includes(lang.total+total+'.'));
    $('again').click();
    assert.equal($('finished').hidden,true);
    assert.equal($('feedback').textContent,'');
    assert.equal($('progress').value,0);
    // A wrong answer after restart never inherits a completion message.
    const first=active.lessons[0].prompts[0].correctAnswerId;
    choose($,answerButtons($).find(x=>x.dataset.optionId!==first).dataset.optionId);
    assert.ok(!$('feedback').textContent.includes(lang.remaining));
    $.tick(500);
  }
});
