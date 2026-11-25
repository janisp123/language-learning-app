const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const http=require('node:http');let chromium;try{({chromium}=require('playwright'));}catch{}
test('flag/copy preserves exact item identity across presets, languages, navigation, clipboard failure and reload',{
 skip:!chromium||!fs.existsSync('/usr/bin/chromium')?'Optional Chromium unavailable':false
},async()=>{
 const server=http.createServer((_q,res)=>{res.setHeader('Content-Type','text/html; charset=utf-8');res.end(fs.readFileSync('dist/language-learning-test.html'));});await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 try{
  const context=await browser.newContext({viewport:{width:390,height:900},permissions:['clipboard-read','clipboard-write']});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(String(e)));
  await page.goto('http://127.0.0.1:'+server.address().port);
  const directions=await page.locator('#direction option').evaluateAll(es=>es.map(o=>o.value));assert.equal(directions.length,7);
  for(const direction of directions)for(const preset of ['kids','adults','full']){
   await page.selectOption('#direction',direction);await page.selectOption('#course-selection',preset);await page.click('#start');
   const question=await page.locator('#question').innerText();const options=await page.locator('.choice').evaluateAll(es=>es.map(e=>({id:e.dataset.optionId,text:e.textContent})));
   await page.evaluate(()=>navigator.clipboard.writeText('report test baseline'));
   await page.click('#report-open');assert.equal(await page.locator('#report-dialog').evaluate(d=>d.open),true);assert.equal(await page.locator('#report-copy').isDisabled(),true);
   if(direction===directions[0]&&preset==='kids'){await page.keyboard.press('Shift+Tab');assert.equal(await page.evaluate(()=>document.activeElement.id),'report-close');await page.keyboard.press('Shift+Tab');if(await page.evaluate(()=>document.activeElement===document.body))await page.keyboard.press('Shift+Tab');assert.equal(await page.locator('#report-dialog').evaluate(d=>d.contains(document.activeElement)),true);assert.equal(await page.evaluate(()=>{document.getElementById('question').focus();return document.getElementById('report-dialog').contains(document.activeElement);}),true,'modal keeps underlying question inert');}
   const source=direction.split('-')[0],target=direction.split('-')[1];
   const expectedTitle=await page.evaluate(source=>JSON.parse(document.getElementById('ui-data').textContent)[source].static['report-title'],source);assert.equal(await page.locator('#report-title').innerText(),expectedTitle);const detailPrefix=await page.evaluate(source=>JSON.parse(document.getElementById('ui-data').textContent)[source].messages.reportDetails.split('{')[0],source);assert.ok((await page.locator('#report-context').textContent()).startsWith(detailPrefix),'visible details follow source language');
   await page.selectOption('#report-type','answer');assert.equal(await page.locator('#report-answer option').count(),4);
   const chosen=options[3];await page.selectOption('#report-answer',chosen.id);assert.equal(await page.locator('#report-original').inputValue(),chosen.text);assert.equal(await page.locator('#report-original').getAttribute('lang'),target);
   const proposal='<script>window.reportInjection=true</script> š 日本語';await page.fill('#report-proposal',proposal);
   assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),'report test baseline','typing never copies automatically');
   await page.click('#report-copy');await page.waitForFunction(()=>document.getElementById('report-status').textContent.length>0);
   const report=await page.evaluate(()=>navigator.clipboard.readText());assert.ok(report.includes('App version: '+require('../package.json').version));assert.ok(report.includes('('+direction+')'));assert.ok(report.includes('('+preset+')'));assert.ok(report.includes('Question ('+source+'): '+question));assert.ok(report.includes('Answer ID: '+chosen.id));assert.ok(report.includes('Original text ('+target+'): '+chosen.text));assert.ok(report.includes('Proposed correction ('+target+'): '+proposal));assert.match(report,/Course ID: .+\nLesson ID: .+\nQuestion ID: .+\nQuestion concept ID: .+/);
   assert.equal(await page.evaluate(()=>!!window.reportInjection),false);
   await page.selectOption('#report-type','question');assert.equal(await page.locator('#report-original').inputValue(),question);await page.fill('#report-proposal','Question correction');await page.click('#report-copy');await page.waitForFunction(()=>document.getElementById('report-status').textContent.length>0);
   const q=await page.evaluate(()=>navigator.clipboard.readText());assert.ok(q.includes('Proposed correction ('+source+'): Question correction'));assert.ok(!q.includes('Answer ID:'));
   await page.keyboard.press('Escape');assert.equal(await page.locator('#report-proposal').inputValue(),'');assert.equal(await page.locator('#report-output').inputValue(),'');assert.equal(await page.locator('#progress').getAttribute('value'),'0');assert.deepEqual(await page.locator('.choice').evaluateAll(es=>es.map(e=>e.dataset.optionId)),options.map(o=>o.id));
   assert.equal(await page.evaluate(()=>document.activeElement.id),'report-open');await page.click('#change');
  }
  // Snapshot stays pinned while the underlying correct-answer transition completes.
  await page.selectOption('#direction','en-ja');await page.selectOption('#course-selection','full');await page.click('#start');
  const original=await page.locator('#question').innerText();const first=await page.evaluate(()=>JSON.parse(document.getElementById('course-data').textContent).lessons[0].prompts[0].phraseId);
  await page.locator(`[data-option-id="${first}"]`).click();await page.click('#report-open');await page.fill('#report-proposal','Pinned correction');await page.waitForFunction(()=>document.getElementById('progress').value===1);assert.equal(await page.locator('#report-original').inputValue(),original);await page.click('#report-copy');await page.waitForFunction(()=>document.getElementById('report-status').textContent.length>0);assert.ok((await page.evaluate(()=>navigator.clipboard.readText())).includes('Question (en): '+original));
  // Denied clipboard exposes the same report as selectable text, never fake success.
  await page.evaluate(()=>{Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:()=>Promise.reject(new Error('denied'))}});});
  await page.fill('#report-proposal','Fallback correction');await page.click('#report-copy');await page.waitForFunction(()=>!document.getElementById('report-manual').hidden);assert.ok((await page.locator('#report-output').inputValue()).includes('Proposed correction (en): Fallback correction'));assert.equal(await page.evaluate(()=>document.activeElement.id),'report-output');
  await page.keyboard.press('Escape');await page.locator('#report-open').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('#report-proposal').inputValue(),'');assert.equal(await page.locator('#report-manual').isVisible(),false);
  // Late clipboard completion cannot resurrect cleared data or overwrite another draft.
  await page.evaluate(()=>{Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:()=>new Promise(resolve=>window.finishOldCopy=resolve)}});});await page.fill('#report-proposal','Old draft');await page.click('#report-copy');await page.keyboard.press('Escape');await page.click('#report-open');await page.fill('#report-proposal','New draft');await page.evaluate(()=>window.finishOldCopy());assert.equal(await page.locator('#report-status').innerText(),'');assert.equal(await page.locator('#report-proposal').inputValue(),'New draft');
  // Reset explicitly discards the open draft.
  await page.evaluate(()=>document.getElementById('restart').click());assert.equal(await page.locator('#report-dialog').evaluate(d=>d.open),false);assert.equal(await page.locator('#report-proposal').inputValue(),'');
  await page.click('#change');await page.selectOption('#direction','ru-en');await page.click('#start');await page.click('#report-open');await page.fill('#report-proposal','Проверка длинного текста '.repeat(12));
  for(const width of [320,390,1280]){await page.setViewportSize({width,height:900});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.ok(await page.locator('#report-dialog').evaluate(d=>d.scrollWidth<=d.clientWidth+1));if(width===320)await page.screenshot({path:'/tmp/report-ru-dark-320.png'});}
  await page.keyboard.press('Escape');await page.click('#learning-theme-toggle');await page.click('#report-open');assert.ok(await page.locator('#report-dialog').evaluate(d=>d.scrollWidth<=d.clientWidth+1));await page.screenshot({path:'/tmp/report-light.png'});
  assert.deepEqual(await page.evaluate(()=>[localStorage.length,sessionStorage.length,document.cookie]),[0,0,'']);await page.reload();assert.equal(await page.locator('#report-proposal').inputValue(),'');assert.equal(await page.locator('#report-dialog').evaluate(d=>d.open),false);assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');assert.deepEqual(errors,[]);
 }finally{await browser.close();server.close();}
});
