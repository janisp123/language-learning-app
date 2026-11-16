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
  test('draft course has ten stable lessons and 100 prompts in both languages',()=>{
    const E=require('../core/engine.js'); E.validateCourse(course);
    assert.equal(course.reviewStatus,'draft-human-review-pending');
    assert.equal(course.lessons.length,10);
    assert.equal(course.lessons.reduce((n,l)=>n+l.prompts.length,0),100);
    for(const direction of ['lv-ru','ru-lv']){
      let s=E.start(course,direction);
      for(let i=0;i<100;i++){
        const q=E.question(course,s,()=>0.4);
        assert.equal(q.options.length,4); assert.equal(new Set(q.options.map(x=>x.text)).size,4);
        s=E.answer(course,s,q,q.correctId).state;
      }
      assert.equal(s.phase,'complete');
    }
  });
}
