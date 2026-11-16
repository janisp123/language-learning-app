const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const file=path.join(__dirname,'../web/locales.json');
test('Latvian and Russian interface packs exist',()=>assert.ok(fs.existsSync(file),'source-language interface packs are missing'));
if(fs.existsSync(file)){
  const packs=JSON.parse(fs.readFileSync(file,'utf8'));
  const course=require('../content/lv-ru-10-17.json');
  const html=fs.readFileSync(path.join(__dirname,'../web/index.html'),'utf8');
  test('both interface packs cover identical controls, messages, placeholders and all lesson titles',()=>{
    assert.deepEqual(Object.keys(packs).sort(),['lv','ru']);
    for(const group of ['static','messages','lessons']){
      assert.deepEqual(Object.keys(packs.lv[group]).sort(),Object.keys(packs.ru[group]).sort());
      for(const key of Object.keys(packs.lv[group])){
        for(const locale of ['lv','ru'])assert.ok(typeof packs[locale][group][key]==='string'&&packs[locale][group][key].trim(),`${locale}.${key}`);
        const placeholders=text=>[...text.matchAll(/\{(\w+)\}/g)].map(x=>x[1]).sort();
        assert.deepEqual(placeholders(packs.lv[group][key]),placeholders(packs.ru[group][key]));
      }
    }
    for(const key of Object.keys(packs.lv.static))assert.ok(html.includes(`id="${key}"`),`control missing: ${key}`);
    assert.deepEqual(Object.keys(packs.lv.lessons).sort(),course.lessons.map(l=>l.id).sort());
  });
}
