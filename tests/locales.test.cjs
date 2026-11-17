const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const file=path.join(__dirname,'../content/catalog.json');
test('language modules are declared in the catalog',()=>assert.ok(fs.existsSync(file),'content catalog is missing'));
if(fs.existsSync(file)){
  const {locales:packs,course}=require('./runtime.cjs');
  const html=fs.readFileSync(path.join(__dirname,'../web/index.html'),'utf8');
  test('all registered interface packs cover controls, messages, names and block titles',()=>{
    assert.deepEqual(Object.keys(packs).sort(),[...new Set(course.directions.map(d=>d.split('-')[0]))].sort());
    for(const group of ['static','messages','lessons']){
      assert.deepEqual(Object.keys(packs.lv[group]).sort(),Object.keys(packs.ru[group]).sort());
      assert.deepEqual(Object.keys(packs.lv[group]).sort(),Object.keys(packs.en[group]).sort());
      for(const key of Object.keys(packs.lv[group])){
        for(const locale of ['lv','ru','en'])assert.ok(typeof packs[locale][group][key]==='string'&&packs[locale][group][key].trim(),`${locale}.${key}`);
        const placeholders=text=>[...text.matchAll(/\{(\w+)\}/g)].map(x=>x[1]).sort();
        assert.deepEqual(placeholders(packs.lv[group][key]),placeholders(packs.ru[group][key]));
        assert.deepEqual(placeholders(packs.lv[group][key]),placeholders(packs.en[group][key]));
      }
    }
    for(const key of Object.keys(packs.lv.static))assert.ok(html.includes(`id="${key}"`),`control missing: ${key}`);
    assert.deepEqual(Object.keys(packs.lv.lessons).sort(),course.lessons.map(l=>l.id).sort());
    for(const pack of Object.values(packs))assert.deepEqual(Object.keys(pack.names).sort(),[...course.languages].sort());
  });
}
