const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const http=require('node:http');
let chromium;try{({chromium}=require('playwright'));}catch{}
test('unit completion banner stays in the phone viewport before and after advancing, then clears on next answer or restart',{
 skip:!chromium&&!process.env.REQUIRE_COMPLETION_BROWSER?'Optional Chromium unavailable':false
},async()=>{
 assert.ok(chromium,'Required Playwright browser missing');
 const html=fs.readFileSync('dist/language-learning-test.html');
 const server=http.createServer((_req,res)=>{res.setHeader('Content-Type','text/html; charset=utf-8');res.end(html);});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 let browser;
 try{
  browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  for(const {width,height,direction,preset,remaining,light} of [
   {width:320,height:568,direction:'lv-ru',preset:'kids',remaining:9,light:false},
   {width:390,height:720,direction:'ru-en',preset:'adults',remaining:9,light:true},
   {width:390,height:660,direction:'en-ja',preset:'full',remaining:50,light:false}
  ]){
   const page=await browser.newPage({viewport:{width,height}});const errors=[];page.on('pageerror',e=>errors.push(String(e)));
   await page.addInitScript(()=>{HTMLMediaElement.prototype.play=function(){return Promise.reject(new Error('Test: blocked audio'));};});
   await page.goto('http://127.0.0.1:'+server.address().port);
   if(light)await page.click('#learning-theme-toggle');
   await page.selectOption('#direction',direction);await page.selectOption('#course-selection',preset);await page.click('#start');
   const ids=await page.evaluate(({direction,preset})=>{
    const c=JSON.parse(document.getElementById('course-data').textContent);
    const f=JSON.parse(document.getElementById('focused-data').textContent);
    const active=LanguageEngine.validateCourse(preset==='full'?c:LanguageCourseSelection.select(c,f,preset,direction));
    return active.lessons.slice(0,2).map(l=>l.prompts.map(p=>p.correctAnswerId));
   },{direction,preset});
   const banner=page.locator('#unit-completion');
   const visible=async()=>{
    assert.ok(await banner.isVisible());
    const box=await banner.boundingBox();assert.ok(box&&box.y>=-1&&box.y+box.height<=height+1,JSON.stringify(box)+' not entirely in viewport');
    assert.ok(await page.evaluate(()=>{const e=document.getElementById('unit-completion'),r=e.getBoundingClientRect(),hit=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return e.contains(hit);}));
    assert.ok((await banner.textContent()).includes(String(remaining)));
   };
   for(let i=0;i<10;i++){
    await page.locator('.choice[data-option-id="'+ids[0][i]+'"]').click();
    if(i===9)await visible();
    await page.waitForFunction(i=>document.getElementById('progress').value===(i===9?0:i+1),i);
   }
   await visible();
   await page.evaluate(()=>window.scrollTo(0,document.getElementById('choices').getBoundingClientRect().bottom+scrollY-innerHeight+30));
   await visible();
   await page.locator('.choice[data-option-id="'+ids[1][0]+'"]').click();
   assert.equal(await banner.isVisible(),false);
   await page.waitForFunction(()=>document.getElementById('progress').value===1);
   await page.click('#restart');assert.equal(await banner.isVisible(),false);
   assert.equal(await page.locator('#unit-completion-text').textContent(),'');
   assert.deepEqual(errors,[]);
   assert.deepEqual(await page.evaluate(()=>[localStorage.length,sessionStorage.length,document.cookie]),[0,0,'']);
   await page.close();
  }
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
});
