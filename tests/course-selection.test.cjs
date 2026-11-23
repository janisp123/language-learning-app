const test=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const cp=require('node:child_process');
test('focused selector is implemented',()=>assert.ok(fs.existsSync('core/course-selection.js')));
test('both audiences resolve one hundred slots for each allowed direction and isolate course identity',()=>{
 assert.ok(fs.existsSync('core/course-selection.js'),'focused selector missing');
 const E=require('../core/engine.js');const S=require('../core/course-selection.js');
 const data=JSON.parse(cp.execFileSync('python',['-c',"import sys,json;from pathlib import Path;sys.path.insert(0,'tools');from content_loader import load_content;from focused_loader import load_focused_content;c,_=load_content(Path('.'));print(json.dumps([c,load_focused_content(Path('.'),c)]))"],{encoding:'utf8'}));
 for(const a of ['kids','adults'])for(const d of data[0].directions){
  const c=E.validateCourse(S.select(...data,a,d));assert.equal(c.lessons.length,10);assert.equal(c.lessons.flatMap(b=>b.prompts).length,100);assert.deepEqual(c.directions,[d]);
  let state=E.start(c,d);const q=E.question(c,state);const other=S.select(...data,a==='kids'?'adults':'kids',d);assert.throws(()=>E.answer(other,state,q,q.correctId));
  for(let i=0;i<100;i++){const shown=E.question(c,state);state=E.answer(c,state,shown,shown.correctId).state;}assert.equal(state.phase,'complete');
  state=E.start(c,d);
  const answer=(correct)=>{const q=E.question(c,state);state=E.answer(c,state,q,correct?q.correctId:q.options.find(o=>o.id!==q.correctId).id).state;};
  answer(true);answer(true);answer(false);assert.equal(state.promptIndex,1);assert.equal(state.mistakes,1);assert.equal(state.consecutive,0);
  answer(true);answer(true);answer(false);assert.equal(state.mistakes,2);
  answer(true);answer(false);assert.equal(state.lessonIndex,0);assert.equal(state.promptIndex,0);assert.equal(state.mistakes,0);assert.equal(state.consecutive,0);

 }
 assert.throws(()=>S.select(...data,'kids','ja-en'));assert.throws(()=>S.select(...data,'anything','en-ja'));
});
