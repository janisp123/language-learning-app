const {test}=require('node:test');
const assert=require('node:assert/strict');
let chromium;
try { ({chromium}=require('playwright')); } catch {}
const fs=require('node:fs');
const http=require('node:http');
test('landing stays self-contained with no preference persistence APIs',()=>{
 const source=fs.readFileSync('docs/discovery-preview/index.html','utf8');
 assert.doesNotMatch(source,/localStorage|sessionStorage|indexedDB|document\.cookie|fetch\(|XMLHttpRequest|<script[^>]+src=/);
 for(const language of ['en','ru','lv'])assert.ok(source.includes('data-language="'+language+'"'));
});
test('landing language and theme controls translate, support keyboard, and reset without storage', {skip:!chromium || !fs.existsSync('/usr/bin/chromium') ? 'Optional browser verification needs Playwright and /usr/bin/chromium' : false}, async()=>{
 const server=http.createServer((req,res)=>{res.setHeader('Content-Type','text/html; charset=utf-8');res.end(fs.readFileSync('docs/discovery-preview/index.html'));});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 try {
 const page=await browser.newPage({viewport:{width:320,height:900}});
 await page.goto('http://127.0.0.1:'+server.address().port);
 assert.equal(await page.locator('html').getAttribute('lang'),'en');
 const descriptions=new Set(),titles=new Set(),themeLabels=new Set();
 const original=await page.locator('[data-copy]').allTextContents();
 assert.ok(original.length>70,'all landing copy has explicit translation keys');
 for(const lang of ['ru','lv','en']){
 await page.locator(`[data-language="${lang}"]`).focus();await page.keyboard.press('Enter');
 assert.equal(await page.locator('html').getAttribute('lang'),lang);
 assert.deepEqual(await page.locator('.phrase small').allTextContents(),Array(2).fill({en:'Thank you.',ru:'Спасибо.',lv:'Paldies.'}[lang]));
 assert.equal(await page.locator('.phrase.lv strong').getAttribute('lang'),'lv');
 assert.equal(await page.locator('.phrase.ru strong').getAttribute('lang'),'ru');
 assert.equal(await page.locator('.phrase.lv strong').textContent(),'Paldies!');
 assert.equal(await page.locator('.phrase.ru strong').textContent(),'Спасибо!');
 assert.equal(await page.locator(`[data-language="${lang}"]`).getAttribute('aria-pressed'),'true');
 titles.add(await page.title());descriptions.add(await page.locator('meta[name=description]').getAttribute('content'));themeLabels.add(await page.locator('#theme-toggle').getAttribute('aria-label'));
 assert.equal(await page.locator('[data-copy]').count(),original.length);
 if(lang==='en')assert.deepEqual(await page.locator('[data-copy]').allTextContents(),original);
 if(lang!=='en')assert.ok((await page.locator('[data-copy]').allTextContents()).every((text,i)=>text!==original[i] || (/^\d+$/.test(text) && text===original[i])),'every translatable keyed text changes; numeric counts remain stable');
 await page.locator('#theme-toggle').focus();await page.keyboard.press('Space');
 assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
 assert.equal(await page.locator('#theme-toggle').getAttribute('aria-pressed'),'true');
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'320px has no horizontal overflow');
 await page.keyboard.press('Space');
 }
 assert.equal(titles.size,3);assert.equal(descriptions.size,3);assert.equal(themeLabels.size,3);
 assert.equal(await page.locator('footer p').first().innerText(),'Made by Janis Paegle 2026');
 assert.equal(await page.locator('a[href="learn/"]').count(),2);
 assert.equal(await page.locator('a[href="language-learning-test.html"]').count(),1);
 await page.locator('[data-language="ru"]').click();await page.locator('#theme-toggle').click();
 assert.deepEqual(await page.evaluate(()=>[localStorage.length,sessionStorage.length,document.cookie]),[0,0,'']);
 await page.reload();assert.equal(await page.locator('html').getAttribute('lang'),'en');assert.equal(await page.locator('html').getAttribute('data-theme'),'light');
 } finally {await browser.close();server.close();}
});
