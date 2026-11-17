const test=require('node:test');const assert=require('node:assert/strict');
const E=require('../core/engine.js');const {course}=require('./runtime.cjs');
const expected=['lv-ru','lv-en','ru-lv','ru-en','en-lv','en-ru','en-ja'];
test('the runtime permits exactly the six original directions plus English to Japanese',()=>{
 assert.deepEqual(course.directions,expected);
 for(const from of course.languages)for(const to of course.languages){
  const direction=from+'-'+to;
  if(expected.includes(direction))assert.equal(E.start(course,direction).direction,direction);
  else assert.throws(()=>E.start(course,direction),/direction/);
 }
});
test('missing or malformed runtime allowlists fail closed and forged Japanese directions cannot grade',()=>{
 for(const value of [undefined,null,[],['en-ja','en-ja'],['en-ja-extra'],['en-xx'],['ja-ja']]){
  const bad=structuredClone(course);bad.directions=value;
  assert.throws(()=>E.validateCourse(bad),/direction/i);
 }
 const state=E.start(course,'en-lv');const shown=E.question(course,state);
 for(const direction of ['ja-en','ja-lv','ja-ru','lv-ja','ru-ja']){
  const forged={...state,direction};
  assert.throws(()=>E.question(course,forged));assert.throws(()=>E.answer(course,forged,shown,shown.correctId));
 }
});
test('all 510 English to Japanese prompts bind script answers and complete with unchanged rules',()=>{
 let state=E.start(course,'en-ja');const bank=new Map(course.phrases.map(x=>[x.id,x]));
 for(const lesson of course.lessons)for(const prompt of lesson.prompts){
  const q=E.question(course,state);assert.equal(q.text,bank.get(prompt.phraseId).en);
  assert.equal(q.options.find(x=>x.id===q.correctId).text,bank.get(q.correctId).ja);
  assert.equal(new Set(q.options.map(x=>x.text)).size,4);
  for(const o of q.options){assert.match(o.text,/[\u3040-\u30ff\u3400-\u9fff]/);assert.doesNotMatch(o.text,/[A-Za-z]/);}
  state=E.answer(course,state,q,q.correctId).state;
 }
 assert.equal(state.phase,'complete');assert.equal(E.start(course,'en-ja').lessonIndex,0);
});
