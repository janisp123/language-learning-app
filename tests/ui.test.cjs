// Executes the real UI in a minimal DOM fixture. This checks event wiring, not browser layout.
const test=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
const E=require('../core/engine.js');
const course=JSON.parse(fs.readFileSync(path.join(root,'content/lv-ru-10-17.json'),'utf8'));
function mount(data=course,bundle=null){
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
    click(){if(!this.disabled)this.handlers.click?.();}
    focus(){document.activeElement=this;}
  }
  const html=bundle || fs.readFileSync(path.join(root,'web/index.html'),'utf8');
  for(const match of html.matchAll(/<[^>]+\bid="([^"]+)"[^>]*>/g)){
    const e=new Element();e.hidden=/\shidden[\s>]/.test(match[0]);elements.set(match[1],e);
  }
  elements.get('direction').value='lv-ru';
  elements.get('course-data').textContent=bundle ? html.match(/id="course-data">([\s\S]*?)<\/script>/)[1] : JSON.stringify(data);
  document={getElementById:id=>elements.get(id),createElement:()=>new Element(),createTextNode:text=>String(text),activeElement:null};
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
  return $;
}
function choose($,id){const button=$('choices').children.find(b=>b.dataset.optionId===id);assert.ok(button);button.click();}
test('answer locks immediately, advances only at 500ms, then wrong steps back automatically',()=>{
  const $=mount();assert.equal($('setup').hidden,false);assert.equal($('error').hidden,true);
  assert.equal($('lesson-list').children.length,10);
  $('start').click();assert.equal($('practice').hidden,false);assert.equal($('choices').children.length,4);
  assert.equal($('question').lang,'lv');
  choose($,course.lessons[0].prompts[0].phraseId);
  assert.match($('feedback').textContent,/Correct/);assert.ok($('choices').children.every(b=>b.disabled));
  choose($,course.lessons[0].prompts[0].phraseId);
  $.tick(499);assert.equal($('progress').value,0);assert.equal($('question').textContent,course.phrases[0].lv);
  $.tick(1);assert.equal($('progress').value,1);assert.equal($('next'),undefined);
  const wrong=$('choices').children.find(b=>b.dataset.optionId!==course.lessons[0].prompts[1].phraseId);
  wrong.click();wrong.click();assert.match($('feedback').textContent,/Not quite/);
  $.tick(500);assert.equal($('progress').value,0);assert.equal($('question').textContent,course.phrases[0].lv);
  assert.match($('feedback').textContent,/Not quite/);
  $('restart').click();assert.equal($('progress').value,0);
  $('change').click();assert.equal($('setup').hidden,false);assert.equal($('practice').hidden,true);
  $('direction').value='ru-lv';$('start').click();assert.equal($('question').lang,'ru');assert.equal($('question').textContent,course.phrases[0].ru);
});
test('real UI traverses 100 answers to completion and starts a fresh session',()=>{
  const $=mount();$('start').click();
  for(const lesson of course.lessons)for(const prompt of lesson.prompts){choose($,prompt.phraseId);$.tick(500);}
  assert.equal($('finished').hidden,false);assert.equal($('practice').hidden,true);
  $('again').click();assert.equal($('practice').hidden,false);assert.equal($('progress').value,0);assert.match($('lesson-label').textContent,/Lesson 1 of 10/);
});
test('invalid embedded content produces a visible error and disables start',()=>{
  const $=mount({});assert.equal($('error').hidden,false);assert.equal($('start').disabled,true);assert.equal($('practice').hidden,true);
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
