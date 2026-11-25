const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const file=path.join(__dirname,'../dist/language-learning-test.html');
test('modular course has a compiled downloadable runtime',()=>assert.ok(fs.existsSync(file),'course is not built'));
if(fs.existsSync(file)){
  const {course}=require('./runtime.cjs');
  test('emergency number vocabulary uses number wording rather than telephone hardware',()=>{
    const phrase=course.phrases.find(p=>p.en==='emergency number');
    assert.equal(phrase.lv,'ārkārtas palīdzības izsaukuma numurs');
    assert.equal(phrase.ru,'экстренный номер');
  });
  test('all registered blocks and language directions compile and complete',()=>{
    const E=require('../core/engine.js'); E.validateCourse(course);
    assert.equal(course.reviewStatus,'draft-human-review-pending');
    assert.ok(course.lessons.length>=10);
    assert.equal(course.lessons.reduce((n,l)=>n+l.prompts.length,0),course.lessons.length*10);
    assert.ok(['lv','ru','en'].every(language=>course.languages.includes(language)));
    for(const phrase of course.phrases)assert.ok(typeof phrase.en==='string'&&phrase.en.trim(),phrase.id);
    for(const direction of course.directions){
      let s=E.start(course,direction);
      for(let i=0;i<course.lessons.length*10;i++){
        const q=E.question(course,s,()=>0.4);
        assert.equal(q.options.length,4); assert.equal(new Set(q.options.map(x=>x.text)).size,4);
        const [source,target]=direction.split('-');
        assert.equal(q.source,source);assert.equal(q.target,target);
        const expected=course.phrases.find(p=>p.id===q.correctId);
        assert.equal(q.text,expected[source]);assert.equal(q.options.find(o=>o.id===q.correctId).text,expected[target]);
        s=E.answer(course,s,q,q.correctId).state;
      }
      assert.equal(s.phase,'complete');
    }
  });
  test('missing English or ambiguous English choices are rejected before practice',()=>{
    const E=require('../core/engine.js');
    const missing=structuredClone(course);delete missing.phrases[0].en;assert.throws(()=>E.validateCourse(missing));
    const ambiguous=structuredClone(course);ambiguous.phrases[1].en=ambiguous.phrases[0].en;assert.throws(()=>E.validateCourse(ambiguous));
    const duplicate=structuredClone(course);duplicate.languages.push('en');assert.throws(()=>E.validateCourse(duplicate));
    for(const direction of ['en-en','en-123','lv-lv','en-ru-extra'])assert.throws(()=>E.start(course,direction));
  });
  test('step-back and third-mistake reset stay identical in every allowed direction',()=>{
    const E=require('../core/engine.js');
    for(const direction of course.directions){
      let s=E.start(course,direction);
      function answer(correct){const q=E.question(course,s,()=>0.4);const id=correct?q.correctId:q.options.find(o=>o.id!==q.correctId).id;const result=E.answer(course,s,q,id);s=result.state;return result;}
      for(let i=0;i<16;i++)answer(true);
      assert.equal(s.lessonIndex,1);assert.equal(s.promptIndex,6);
      answer(false);assert.equal(s.promptIndex,5);assert.equal(s.mistakes,1);assert.equal(s.consecutive,0);
      answer(true);assert.equal(s.mistakes,1);
      answer(false);assert.equal(s.promptIndex,5);assert.equal(s.mistakes,2);
      const last=answer(false);assert.equal(last.restarted,true);assert.equal(s.lessonIndex,0);assert.equal(s.promptIndex,0);assert.equal(s.mistakes,0);assert.equal(s.direction,direction);
    }
  });
}
