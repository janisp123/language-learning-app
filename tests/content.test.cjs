const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const file=path.join(__dirname,'../content/lv-ru-10-17.json');
test('ten-lesson canonical draft course exists',()=>assert.ok(fs.existsSync(file),'course content is not authored'));
if(fs.existsSync(file)){
  const course=JSON.parse(fs.readFileSync(file,'utf8'));
  test('emergency number phrase uses explicit phone-number wording',()=>{
    const phrase=course.phrases.find(p=>p.id==='safety-phrase-05');
    assert.equal(phrase.lv,'Zvaniet uz numuru 112.');
    assert.equal(phrase.ru,'Позвоните по номеру 112.');
  });
  test('draft course has ten stable lessons and 100 prompts in all six directions between three languages',()=>{
    const E=require('../core/engine.js'); E.validateCourse(course);
    assert.equal(course.reviewStatus,'draft-human-review-pending');
    assert.equal(course.lessons.length,10);
    assert.equal(course.lessons.reduce((n,l)=>n+l.prompts.length,0),100);
    assert.deepEqual(course.languages,['lv','ru','en']);
    for(const phrase of course.phrases)assert.ok(typeof phrase.en==='string'&&phrase.en.trim(),phrase.id);
    for(const direction of ['lv-ru','ru-lv','lv-en','en-lv','ru-en','en-ru']){
      let s=E.start(course,direction);
      for(let i=0;i<100;i++){
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
    for(const direction of ['en-en','en-de','lv-lv','en-ru-extra'])assert.throws(()=>E.start(course,direction));
  });
  test('step-back and third-mistake reset stay identical in all six directions',()=>{
    const E=require('../core/engine.js');
    for(const direction of ['lv-ru','ru-lv','lv-en','en-lv','ru-en','en-ru']){
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
