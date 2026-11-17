const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const http=require('node:http');
let chromium;try{({chromium}=require('playwright'));}catch{}
test('dark mode carries into learning without saving a preference and survives learning actions',{skip:!chromium||!fs.existsSync('/usr/bin/chromium')?'Optional Chromium verification unavailable':false},async()=>{
 const server=http.createServer((req,res)=>{res.setHeader('Content-Type','text/html; charset=utf-8');res.end(fs.readFileSync(req.url.startsWith('/learn/')?'downloads/language-learning-test.html':'docs/discovery-preview/index.html'));});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 try{
 const page=await browser.newPage({viewport:{width:320,height:900}});const errors=[];page.on('pageerror',e=>errors.push(String(e)));
 await page.goto(base);await page.locator('#theme-toggle').click();await page.locator('a[href^="learn/"]').first().click();await page.waitForLoadState('load');
 assert.equal(await page.locator('html').getAttribute('data-theme'),'dark','landing dark mode must reach learning');
 assert.equal(new URL(page.url()).hash,'','one-use theme handoff must be removed');assert.equal(await page.evaluate(()=>history.state),null);
 assert.equal(await page.locator('#learning-theme-toggle').count(),1);
 for(const [direction,label]of[['en-ja','Dark mode'],['ru-lv','Тёмная тема'],['lv-ru','Tumšais motīvs']]){
  await page.selectOption('#direction',direction);assert.equal(await page.locator('#learning-theme-toggle').getAttribute('aria-label'),label);assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
 }
 await page.selectOption('#direction','en-ja');await page.locator('#start').click();
 assert.equal(await page.locator('.question-card').evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(29, 52, 41)');
 await page.locator('.answer-replay').first().click();assert.equal(await page.locator('#progress').getAttribute('value'),'0');
 const first=await page.evaluate(()=>JSON.parse(document.querySelector('#course-data').textContent).lessons[0].prompts[0].phraseId);
 await page.locator(`[data-option-id="${first}"]`).click();await page.locator('#learning-theme-toggle').click();await page.waitForTimeout(600);assert.equal(await page.locator('#progress').getAttribute('value'),'1');assert.equal(await page.locator('html').getAttribute('data-theme'),'light');
 await page.locator('#learning-theme-toggle').focus();await page.keyboard.press('Space');assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');assert.equal(await page.locator('#progress').getAttribute('value'),'1');
 await page.locator('#restart').click();assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');assert.equal(await page.locator('#progress').getAttribute('value'),'0');
 await page.locator('#change').click();await page.selectOption('#direction','ru-lv');assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
 for(const width of[320,1280]){await page.setViewportSize({width,height:900});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
 assert.deepEqual(await page.evaluate(()=>[localStorage.length,sessionStorage.length,document.cookie]),[0,0,'']);await page.reload();assert.equal(await page.locator('html').getAttribute('data-theme'),'light');assert.ok(await page.locator('#setup').isVisible());assert.equal(new URL(page.url()).hash,'');assert.deepEqual(errors,[]);
 }finally{await browser.close();server.close();}
});
