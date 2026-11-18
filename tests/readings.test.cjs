const test=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const path=require('node:path');
const modulePath=path.join(__dirname,'../web/reading-view.js');
function renderer(){assert.ok(fs.existsSync(modulePath),'Reading guide renderer is not implemented');return require(modulePath);}
class El{constructor(){this.children=[];this.attributes={};this.textContent='';this.dataset={};}append(...x){this.children.push(...x);}replaceChildren(...x){this.textContent='';this.children=x;}setAttribute(k,v){this.attributes[k]=v;} }
const doc={createElement:()=>new El()};
const entry={text:'ありがとう',segments:[... 'ありがとう'].map((text,i)=>({text,reading:['a','ri','ga','to','u'][i]}))};
const pack={schemaVersion:1,directions:{'en-ja':{vocab:entry},'lv-ru':{vocab:{text:'спасибо',segments:[{text:'спасибо',reading:'spasibo'}]}},'ru-en':{vocab:{text:'thank you',segments:[{text:'thank you',reading:'сэнк ю'}]}}}};
test('Japanese has a reading under each symbol and preserves accessible answer identity',()=>{
 const button=new El();button.dataset.optionId='vocab';const r=renderer().create(doc,pack);
 assert.equal(r.render(button,'en-ja','vocab','ありがとう'),true);
 assert.equal(button.attributes['aria-label'],'ありがとう');
 assert.equal(button.children[0].children.length,5);
 for(const [i,unit] of button.children[0].children.entries()){
  assert.equal(unit.children[0].textContent,entry.segments[i].text);
  assert.equal(unit.children[1].textContent,entry.segments[i].reading);
  assert.equal(unit.children[1].attributes.lang,'ja-Latn');
 }
 assert.ok(button.attributes['aria-describedby'].split(' ').length===5);
});
test('only the three approved directions have source-script guides; missing or stale guides fail',()=>{
 const r=renderer().create(doc,pack);
 for(const d of ['lv-ru','ru-en']){const b=new El();const e=pack.directions[d].vocab;assert.equal(r.render(b,d,'vocab',e.text),true);assert.equal(b.children[0].children[0].children[1].textContent,e.segments[0].reading);}
 for(const d of ['lv-en','ru-lv','en-lv','en-ru']){const b=new El();b.textContent='original';assert.equal(r.render(b,d,'vocab','original'),false);assert.equal(b.textContent,'original');assert.equal(b.children.length,0);}
 assert.throws(()=>r.render(new El(),'en-ja','missing','ありがとう'));
 assert.throws(()=>r.render(new El(),'en-ja','vocab','wrong'));
});
test('guide text stays literal text and never installs click handlers',()=>{
 const r=renderer().create(doc,{directions:{'lv-ru':{x:{text:'слово',segments:[{text:'слово',reading:'<img onerror=bad>'}]}}}});const b=new El();
 r.render(b,'lv-ru','x','слово');assert.equal(b.children[0].children[0].children[1].textContent,'<img onerror=bad>');assert.equal(b.onclick,undefined);
});

test('small kana roles and combined sounds remain visible without hover',()=>{
 const d={directions:{'en-ja':{x:{text:'しゃっー',segments:[{text:'し',reading:'shi'},{text:'ゃ',reading:'ya',note:'Combines with shi as sha',combinedReading:'sha'},{text:'っ',reading:'(t)',note:'Double next consonant'},{text:'ー',reading:'—',note:'Lengthen preceding vowel'}]}}}};
 const b=new El();renderer().create(doc,d).render(b,'en-ja','x','しゃっー');
 assert.equal(b.children[0].children[1].children[2].textContent,'→ sha');
 assert.equal(b.children[0].children[2].children[2].textContent,'double');
 assert.equal(b.children[0].children[3].children[2].textContent,'long');
});

test('noted single kana never receive a false group label',()=>{
 const b=new El(),e={text:'は',segments:[{text:'は',reading:'wa',note:'は is pronounced wa in this expression.'}]};
 renderer().create(doc,{directions:{'en-ja':{x:e}}}).render(b,'en-ja','x','は');
 assert.equal(b.children[0].children[0].children.length,2);
 assert.equal(b.children[0].children[0].children[1].textContent,'wa');
});
