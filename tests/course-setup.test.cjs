const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const http=require('node:http');let chromium;try{({chromium}=require('playwright'));}catch{}
test('setup is direction then one three-choice course selector, dark on fresh load with no saved preference',{skip:!chromium||!fs.existsSync('/usr/bin/chromium')?'Optional Chromium unavailable':false},async()=>{
 const server=http.createServer((_req,res)=>{res.setHeader('Content-Type','text/html; charset=utf-8');res.end(fs.readFileSync('downloads/language-learning-test.html'));});await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 try{
 const page=await browser.newPage({viewport:{width:320,height:900}});const errors=[];page.on('pageerror',e=>errors.push(String(e)));await page.goto('http://127.0.0.1:'+server.address().port);
 assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
 assert.equal(await page.locator('#course-selection option').count(),3);
 assert.deepEqual(await page.locator('#course-selection option').evaluateAll(es=>es.map(e=>e.value)),['kids','adults','full']);
 assert.equal(await page.locator('#original-course').count(),0);assert.equal(await page.locator('#learner-audience').count(),0);
 assert.ok(await page.evaluate(()=>!!(document.getElementById('direction').compareDocumentPosition(document.getElementById('course-selection'))&Node.DOCUMENT_POSITION_FOLLOWING)));
 const directions=await page.locator('#direction option').evaluateAll(es=>es.map(e=>e.value));assert.equal(directions.length,7);
 for(const direction of directions)for(const choice of ['kids','adults','full']){
  await page.selectOption('#direction',direction);await page.selectOption('#course-selection',choice);await page.click('#start');
  assert.match(await page.locator('#lesson-label').textContent(),choice==='full'?/51/:/10/);assert.equal(await page.locator('.choice').count(),4);
  assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');await page.click('#change');
 }
 await page.click('#learning-theme-toggle');assert.equal(await page.locator('html').getAttribute('data-theme'),'light');await page.reload();assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
 assert.equal(await page.locator('#course-selection').inputValue(),'kids');
 assert.deepEqual(await page.evaluate(()=>[localStorage.length,sessionStorage.length,document.cookie]),[0,0,'']);
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.deepEqual(errors,[]);
 }finally{await browser.close();server.close();}
});
