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

test('all presets reuse the canonical goodbye in all seven directions with unchanged question identity and recordings',()=>{
 const E=require('../core/engine.js'),S=require('../core/course-selection.js');
 const [legacy,focused]=JSON.parse(cp.execFileSync('python',['-c',"import sys,json;from pathlib import Path;sys.path.insert(0,'tools');from content_loader import load_content;from focused_loader import load_focused_content;c,_=load_content(Path('.'));print(json.dumps([c,load_focused_content(Path('.'),c)]))"],{encoding:'utf8'}));
 const expected={lv:'uz redzēšanos',ru:'до свидания',en:'goodbye',ja:'さようなら'};
 const html=fs.readFileSync('dist/language-learning-test.html','utf8');const clips=JSON.parse(html.match(/id="audio-data">([\s\S]*?)<\/script>/)[1]).clips;
 for(const preset of ['kids','adults','full'])for(const direction of legacy.directions){
  const course=E.validateCourse(preset==='full'?legacy:S.select(legacy,focused,preset,direction));
  const q=E.question(course,{...E.start(course,direction),promptIndex:1});
  assert.equal(q.promptId,preset==='full'?'basic-01-prompt-02':'focused-s02');assert.equal(q.correctId,'vocab-0002');assert.equal(q.conceptId,'vocab-0002');assert.equal(q.text,expected[q.source]);assert.equal(q.options.find(o=>o.id===q.correctId).text,expected[q.target]);
  for(const option of q.options)assert.notEqual(option.id,'focus-s02');
  for(const lesson of course.lessons)for(const p of lesson.prompts)assert.ok(![p.phraseId,...p.distractorIds].includes('focus-s02'),'retired alternative must not compete with canonical goodbye');
  assert.equal(clips[q.source][q.conceptId].text,expected[q.source]);assert.equal(clips[q.target][q.correctId].text,expected[q.target]);
 }
});

test('approved polite defaults reach all question and answer roles without changing identities or directions',()=>{
 const E=require('../core/engine.js'),S=require('../core/course-selection.js');
 const [legacy,focused]=JSON.parse(cp.execFileSync('python',['-B','-c',"import sys,json;from pathlib import Path;sys.path.insert(0,'tools');from content_loader import load_content;from focused_loader import load_focused_content;c,_=load_content(Path('.'));print(json.dumps([c,load_focused_content(Path('.'),c)]))"],{encoding:'utf8'}));
 assert.deepEqual([...legacy.directions].sort(),['en-ja','en-lv','en-ru','lv-en','lv-ru','ru-en','ru-lv']);
 const edits=JSON.parse(fs.readFileSync('tests/fixtures/polite-defaults-approved.json','utf8')).edits;
 let presentations=0,changed=0;const seen=new Set();
 for(const preset of ['kids','adults','full'])for(const direction of legacy.directions){
  const c=E.validateCourse(preset==='full'?legacy:S.select(legacy,focused,preset,direction));const state=E.start(c,direction);
  for(let i=0;i<c.lessons.length;i++)for(let j=0;j<c.lessons[i].prompts.length;j++){
   const q=E.question(c,{...state,lessonIndex:i,promptIndex:j},()=>0);presentations++;let affected=false;
   for(const edit of edits){
    if(q.source===edit.language&&q.conceptId===edit.id){assert.equal(q.text,edit.proposed);seen.add(edit.id+':'+edit.language);affected=true;}
    for(const option of q.options)if(q.target===edit.language&&option.id===edit.id){assert.equal(option.text,edit.proposed);seen.add(edit.id+':'+edit.language);affected=true;}
   }
   assert.equal(new Set(q.options.map(o=>o.text.normalize('NFKC').toLowerCase().trim())).size,4);
   if(q.source==='ru'&&['vocab-0005','vocab-0266'].includes(q.correctId)){const competitor=q.correctId==='vocab-0005'?'vocab-0266':'vocab-0005';assert.ok(!q.options.some(o=>o.id===competitor),'Russian apology/attention source must not offer both defensible meanings');}
   if(affected){changed++;const result=E.answer(c,{...state,lessonIndex:i,promptIndex:j},q,q.correctId);assert.equal(result.feedback.correct,true);}
  }
 }
 assert.equal(presentations,4970);assert.equal(changed,142);assert.equal(seen.size,10);
});
