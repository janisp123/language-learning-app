const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs'),http=require('node:http');let chromium;try{({chromium}=require('playwright'));}catch{}
test('Basic goodbye uses canonical Latvian/Russian text, existing audio and stable report IDs',{
 skip:!chromium||!fs.existsSync('/usr/bin/chromium')?'Optional Chromium unavailable':false
},async()=>{
 const server=http.createServer((_q,res)=>{res.setHeader('Content-Type','text/html; charset=utf-8');res.end(fs.readFileSync('dist/language-learning-test.html'));});await new Promise(r=>server.listen(0,'127.0.0.1',r));const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:390,height:900}});await page.goto('http://127.0.0.1:'+server.address().port);await page.click('#start');await page.locator('[data-option-id="vocab-0001"]').click();await page.waitForFunction(()=>document.getElementById('progress').value===1);
  assert.equal(await page.locator('#question').innerText(),'uz redzēšanos');assert.equal(await page.locator('[data-option-id="vocab-0002"]').innerText(),'до свидания');assert.ok(!(await page.locator('.choice').allTextContents()).includes('До встречи'));
  assert.ok(await page.evaluate(()=>document.getElementById('audio-media').src===JSON.parse(document.getElementById('audio-data').textContent).clips.lv['vocab-0002'].src));
  await page.locator('[data-option-id="vocab-0002"]').locator('..').locator('.answer-replay').click();assert.equal(await page.locator('#progress').getAttribute('value'),'1');
  assert.ok(await page.evaluate(()=>document.getElementById('audio-media').src===JSON.parse(document.getElementById('audio-data').textContent).clips.ru['vocab-0002'].src));
  await page.evaluate(()=>{Object.defineProperty(navigator,'clipboard',{value:{writeText:async text=>{window.copiedFarewell=text;}}});});await page.click('#report-open');await page.selectOption('#report-type','answer');await page.selectOption('#report-answer','vocab-0002');await page.fill('#report-proposal','до свидания');await page.click('#report-copy');await page.waitForFunction(()=>!!window.copiedFarewell);
  const report=await page.evaluate(()=>window.copiedFarewell);for(const text of ['Question ID: focused-s02','Question concept ID: vocab-0002','Answer ID: vocab-0002','Question (lv): uz redzēšanos','Original text (ru): до свидания','Content version: '+require('../content/focused/catalog.json').contentVersion])assert.ok(report.includes(text),text);
  await page.keyboard.press('Escape');await page.locator('[data-option-id="vocab-0002"]').click();assert.ok(await page.evaluate(()=>document.getElementById('audio-media').src===JSON.parse(document.getElementById('audio-data').textContent).clips.ru['vocab-0002'].src));await page.waitForFunction(()=>document.getElementById('progress').value===2);
  assert.deepEqual(await page.evaluate(()=>[localStorage.length,sessionStorage.length,document.cookie]),[0,0,'']);
 }finally{await browser.close();server.close();}
});
