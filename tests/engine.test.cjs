const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const enginePath = path.join(__dirname, '../core/engine.js');
// A missing implementation is an explicit failed assertion, not an import error.
test('learning engine implementation exists', () => assert.ok(fs.existsSync(enginePath), 'engine is not implemented'));
const E = fs.existsSync(enginePath) ? require(enginePath) : null;
const fixture = {
  schemaVersion: 2, contentVersion: 'test', id: 'test-course', languages: ['lv','ru'], agePath: '10-17',
  phrases: Array.from({length: 10}, (_, i) => ({id:`p${i}`, lv:`LV ${i}`, ru:`RU ${i}`})),
  lessons: Array.from({length: 10}, (_, l) => ({id:`lesson-${l}`, title:`Lesson ${l}`, prompts:Array.from({length:10},(_, i)=>({id:`l${l}-q${i}`,phraseId:`p${i}`,correctAnswerId:`p${i}`,distractorIds:[`p${(i+1)%10}`,`p${(i+3)%10}`,`p${(i+5)%10}`]}))}))
};
if (E) {
  const advance = (s, correct=true) => {
    const q=E.question(fixture,s,()=>0.2);
    return E.answer(fixture,s,q,correct?q.correctId:q.options.find(x=>x.id!==q.correctId).id);
  };
  test('fresh sessions always begin at lesson one, with no persistence input',()=>{
    assert.deepEqual(E.start(fixture,'lv-ru'),{courseId:'test-course',direction:'lv-ru',lessonIndex:0,promptIndex:0,consecutive:0,mistakes:0,revision:0,phase:'learning'});
    assert.equal(E.start(fixture,'ru-lv').direction,'ru-lv');
    assert.throws(()=>E.start(fixture,'en-ru'));
  });
  test('correct advances; wrong moves backward and clears the run; wrong at first clamps',()=>{
    let s=E.start(fixture,'lv-ru');
    s=advance(s,false).state; assert.equal(s.promptIndex,0); assert.equal(s.consecutive,0);
    s=advance(s).state; s=advance(s).state; assert.equal(s.promptIndex,2);
    const r=advance(s,false); assert.equal(r.state.promptIndex,1); assert.equal(r.state.consecutive,0); assert.equal(r.feedback.correct,false);
    s=r.state; for(let i=0;i<20;i++)s=advance(s,false).state;
    assert.equal(s.promptIndex,0); assert.equal(s.lessonIndex,0);
  });
  test('only ten consecutive successes complete a lesson, even after earlier successes',()=>{
    let s=E.start(fixture,'lv-ru');
    for(let i=0;i<9;i++)s=advance(s).state;
    assert.equal(s.lessonIndex,0); assert.equal(s.consecutive,9);
    s=advance(s,false).state;
    for(let i=0;i<9;i++)s=advance(s).state;
    assert.equal(s.lessonIndex,0); assert.equal(s.consecutive,9);
    s=advance(s).state; assert.equal(s.lessonIndex,1); assert.equal(s.promptIndex,0); assert.equal(s.consecutive,0);
  });
  test('correct wraps forward within lesson; wrong at its end steps back without wrapping',()=>{
    let s={...E.start(fixture,'lv-ru'),promptIndex:9,consecutive:3};
    let r=advance(s); assert.equal(r.state.promptIndex,0); assert.equal(r.state.consecutive,4); assert.equal(r.state.lessonIndex,0);
    r=advance(s,false); assert.equal(r.state.promptIndex,8); assert.equal(r.state.consecutive,0);
  });
  test('all ten lessons complete without a lesson eleven; restart is a clean session',()=>{
    let s=E.start(fixture,'ru-lv');
    for(let i=0;i<100;i++)s=advance(s).state;
    assert.equal(s.phase,'complete'); assert.equal(s.lessonIndex,9);
    assert.throws(()=>E.question(fixture,s));
    assert.equal(E.start(fixture,'ru-lv').lessonIndex,0);
  });
  test('question direction resolves source and target; shuffle is fresh and non-mutating',()=>{
    const s=E.start(fixture,'lv-ru');
    const before=JSON.stringify(fixture);
    const a=E.question(fixture,s,()=>0);
    const b=E.question(fixture,s,()=>0.999);
    assert.equal(a.text,'LV 0'); assert.equal(a.options.find(x=>x.id==='p0').text,'RU 0');
    assert.notDeepEqual(a.options.map(x=>x.id),b.options.map(x=>x.id));
    const reverse=E.question(fixture,E.start(fixture,'ru-lv'),()=>0.5);
    assert.equal(reverse.text,'RU 0'); assert.equal(reverse.options.find(x=>x.id==='p0').text,'LV 0');
    assert.equal(JSON.stringify(fixture),before);
  });
  test('stale/double, foreign-direction and invalid answer events cannot advance state',()=>{
    const s=E.start(fixture,'lv-ru'); const q=E.question(fixture,s,()=>0);
    const next=E.answer(fixture,s,q,q.correctId).state;
    assert.throws(()=>E.answer(fixture,next,q,q.correctId));
    assert.throws(()=>E.answer(fixture,s,q,'missing'));
    assert.throws(()=>E.answer(fixture,E.start(fixture,'ru-lv'),q,q.correctId));
  });
  test('invalid course data is rejected before a learner starts',()=>{
    assert.equal(E.validateCourse(fixture),fixture);
    for(const mutate of [c=>c.lessons=[],c=>c.phrases[1].id='p0',c=>c.lessons[0].prompts[0].distractorIds[0]='p0',c=>c.phrases[1].ru='RU 0',c=>c.lessons[0].prompts[0].phraseId='missing',c=>c.schemaVersion=99,c=>c.lessons[0].prompts=[]]){
      const c=structuredClone(fixture);mutate(c);assert.throws(()=>E.validateCourse(c));
    }
  });
  test('third mistake in a ten-question block restarts at lesson one, including nonconsecutive mistakes in either direction',()=>{
    for(const direction of ['lv-ru','ru-lv']){
      let s={...E.start(fixture,direction),lessonIndex:4,promptIndex:6};
      let r=advance(s,false);s=r.state;
      assert.equal(s.promptIndex,5);assert.equal(s.mistakes,1);assert.equal(s.lessonIndex,4);assert.equal(r.restarted,false);
      s=advance(s).state;assert.equal(s.mistakes,1);
      r=advance(s,false);s=r.state;
      assert.equal(s.promptIndex,5);assert.equal(s.mistakes,2);assert.equal(s.lessonIndex,4);assert.equal(r.restarted,false);
      s=advance(s).state;
      const old=E.question(fixture,s,()=>0);
      r=E.answer(fixture,s,old,old.options.find(o=>o.id!==old.correctId).id);
      assert.equal(r.restarted,true);assert.equal(r.feedback.correct,false);
      assert.equal(r.state.lessonIndex,0);assert.equal(r.state.promptIndex,0);assert.equal(r.state.consecutive,0);assert.equal(r.state.mistakes,0);
      assert.equal(r.state.direction,direction);assert.equal(r.state.revision,s.revision+1);assert.equal(r.state.phase,'learning');
      assert.throws(()=>E.answer(fixture,r.state,old,old.correctId));
    }
  });
  test('mistake count resets on completing a block and cannot leak to the next lesson',()=>{
    let s={...E.start(fixture,'lv-ru'),lessonIndex:3,promptIndex:9,consecutive:9,mistakes:2};
    s=advance(s).state;assert.equal(s.lessonIndex,4);assert.equal(s.mistakes,0);
    let r=advance(s,false);assert.equal(r.state.lessonIndex,4);assert.equal(r.state.mistakes,1);assert.equal(r.restarted,false);
    r=advance(r.state,false);assert.equal(r.state.lessonIndex,4);assert.equal(r.state.mistakes,2);
    r=advance(r.state,false);assert.equal(r.state.lessonIndex,0);assert.equal(r.state.promptIndex,0);assert.equal(r.state.mistakes,0);
    assert.equal(E.start(fixture,'lv-ru').mistakes,0);
  });
  test('lesson-one third miss also restarts the block cleanly; invalid counters and block sizes are rejected',()=>{
    let s=E.start(fixture,'lv-ru');
    s=advance(s,false).state;s=advance(s,false).state;const r=advance(s,false);
    assert.equal(r.restarted,true);assert.equal(r.state.promptIndex,0);assert.equal(r.state.mistakes,0);
    for(const mistakes of [-1,3,1.5,undefined])assert.throws(()=>E.question(fixture,{...s,mistakes}));
    const c=structuredClone(fixture);c.lessons[0].prompts.pop();assert.throws(()=>E.validateCourse(c));
  });
  test('additional blocks and languages work without engine changes',()=>{
    const c=structuredClone(fixture);c.languages.push('zz');for(const p of c.phrases)p.zz='ZZ '+p.lv;
    const extra=structuredClone(c.lessons[0]);extra.id='extra';extra.prompts.forEach((p,i)=>p.id=`extra-q${i}`);c.lessons.push(extra);
    let s=E.start(c,'zz-lv');for(let i=0;i<110;i++){const q=E.question(c,s,()=>0.3);s=E.answer(c,s,q,q.correctId).state;}
    assert.equal(s.phase,'complete');assert.equal(s.lessonIndex,10);
  });
  test('explicit correct-answer identity and question/option bindings cannot be mixed up',()=>{
    const bad=structuredClone(fixture);bad.lessons[0].prompts[0].correctAnswerId='p1';assert.throws(()=>E.validateCourse(bad));
    const s=E.start(fixture,'lv-ru');const q=E.question(fixture,s,()=>0);
    for(const mutate of [q=>q.correctId='p1',q=>q.text='another question',q=>q.lessonId='lesson-1',q=>q.options[0].text='wrong displayed translation']){
      const changed=structuredClone(q);mutate(changed);assert.throws(()=>E.answer(fixture,s,changed,changed.options[0].id));
    }
  });
}
