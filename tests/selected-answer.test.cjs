const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const http=require('node:http');
let chromium;try{({chromium}=require('playwright'));}catch{}

test('correct submissions reuse ordinary answer-speaker audio in every course/direction without a completion gate',{
 skip:!chromium||!fs.existsSync('/usr/bin/chromium')?'Optional Chromium unavailable':false
},async()=>{
 const server=http.createServer((_req,res)=>{res.setHeader('Content-Type','text/html; charset=utf-8');res.end(fs.readFileSync('downloads/language-learning-test.html'));});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:390,height:900}});
  const errors=[];page.on('pageerror',e=>errors.push(String(e)));
  await page.addInitScript(()=>{
   const original=HTMLMediaElement.prototype.play;window.audioCalls=[];
   HTMLMediaElement.prototype.play=function(){window.audioCalls.push(this.src);return original.call(this);};
  });
  await page.goto('http://127.0.0.1:'+server.address().port);
  const directions=await page.locator('#direction option').evaluateAll(es=>es.map(e=>e.value));
  assert.equal(directions.length,7);
  for(const direction of directions)for(const selection of ['kids','adults','full']){
   await page.selectOption('#direction',direction);await page.selectOption('#course-selection',selection);await page.click('#start');
   const result=await page.evaluate(({direction,selection})=>{
    const legacy=JSON.parse(document.getElementById('course-data').textContent);
    const focused=JSON.parse(document.getElementById('focused-data').textContent);
    const course=LanguageEngine.validateCourse(selection==='full'?legacy:LanguageCourseSelection.select(legacy,focused,selection,direction));
    const shown=LanguageEngine.question(course,LanguageEngine.start(course,direction));
    const button=[...document.querySelectorAll('.choice')].find(e=>e.dataset.optionId===shown.correctId);
    const speaker=button.parentElement.querySelector('.answer-replay');
    speaker.click();const expected=document.getElementById('audio-media').src;const before=window.audioCalls.length;
    const ungraded=document.getElementById('progress').value===0&&!button.disabled;
    button.click();button.click();
    return {sameClip:document.getElementById('audio-media').src===expected,calls:window.audioCalls.length-before,ungraded,locked:button.disabled,progress:document.getElementById('progress').value};
   },{direction,selection});
   assert.deepEqual(result,{sameClip:true,calls:1,ungraded:true,locked:true,progress:0},direction+'/'+selection);
   await page.waitForFunction(()=>document.getElementById('progress').value===1);
   assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
   await page.click('#change');
  }
  // A rejected ordinary play promise must not create a new waiting gate.
  await page.evaluate(()=>{HTMLMediaElement.prototype.play=function(){return Promise.reject(new Error('Blocked'));};});
  await page.selectOption('#direction','en-ja');await page.selectOption('#course-selection','full');await page.click('#start');
  await page.evaluate(()=>{
   const c=JSON.parse(document.getElementById('course-data').textContent);const id=c.lessons[0].prompts[0].phraseId;
   [...document.querySelectorAll('.choice')].find(b=>b.dataset.optionId===id).click();
  });
  await page.waitForFunction(()=>document.getElementById('progress').value===1);
  await page.click('#restart');assert.equal(await page.locator('#progress').getAttribute('value'),'0');
  assert.deepEqual(await page.evaluate(()=>[localStorage.length,sessionStorage.length,document.cookie]),[0,0,'']);
  assert.deepEqual(errors,[]);
 }finally{await browser.close();server.close();}
});
