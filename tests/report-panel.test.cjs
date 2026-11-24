const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');
function api(){assert.ok(fs.existsSync('web/report-panel.js'),'report module must exist');return require('../web/report-panel.js');}
const context=()=>({appVersion:'0.5.5',contentVersion:'test-bank',preset:'kids',direction:'lv-ru',directionLabel:'Latviešu → Krievu',courseId:'focused-kids-lv-ru',lessonId:'lesson-1',promptId:'question-1',conceptId:'hello',source:'lv',target:'ru',text:'labdien',options:[{id:'hello',text:'здравствуйте'},{id:'bye',text:'до свидания'},{id:'yes',text:'да'},{id:'no',text:'нет'}]});
test('report snapshot keeps exact original IDs and wording after live question changes',()=>{
 const r=api(),live=context(),snapshot=r.createSnapshot(live);live.text='different';live.options[0].text='changed';
 assert.equal(snapshot.text,'labdien');assert.equal(snapshot.options[0].text,'здравствуйте');assert.equal(snapshot.promptId,'question-1');assert.ok(Object.isFrozen(snapshot));
});
test('question report and any answer option include source/preset/version/IDs and proposed Unicode text',()=>{
 const r=api(),snapshot=r.createSnapshot(context());
 const q=r.formatReport(snapshot,'question','', 'Sveiki!');assert.match(q,/Direction: Latviešu → Krievu \(lv-ru\)/);assert.match(q,/Preset: Basic Kids \(kids\)/);assert.match(q,/App version: 0.5.5/);assert.match(q,/Question ID: question-1/);assert.match(q,/Question \(lv\): labdien/);assert.match(q,/Proposed correction \(lv\): Sveiki!/);
 for(const option of snapshot.options){const report=r.formatReport(snapshot,'answer',option.id,'<script>š 日本語</script>');assert.ok(report.includes('Answer ID: '+option.id));assert.ok(report.includes('Original text (ru): '+option.text));assert.ok(report.includes('Proposed correction (ru): <script>š 日本語</script>'));}
 assert.throws(()=>r.formatReport(snapshot,'answer','invented','yes'));assert.throws(()=>r.formatReport(snapshot,'other','','yes'));
});
