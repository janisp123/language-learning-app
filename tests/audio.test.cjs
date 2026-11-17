const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
test('independent audio player exists',()=>assert.ok(fs.existsSync('web/audio-player.js'),'audio player missing'));
test('late decoder errors are reported and stale errors are ignored',async()=>{
 const A=require('../web/audio-player.js');let media;let errors=0;
 const p=A.create({clips:{ru:{x:{text:'да',src:'data:audio/mpeg;base64,abc'}}}},()=>media={play:async()=>{},pause(){},currentTime:0});
 await p.play('x','ru','да',()=>errors++);assert.equal(typeof media.onerror,'function');media.onerror();assert.equal(errors,1);
 const stale=media.onerror;p.stop();stale();assert.equal(errors,1);
});
test('player binds identity/text, cancels overlap, ignores stale failures and reports rejection',async()=>{
 const A=require('../web/audio-player.js'); const sounds=[];
 const pack={clips:{ru:{'vocab-0001':{text:'привет',src:'data:audio/mpeg;base64,abc'}}}};
 const player=A.create(pack,src=>{let reject;const a={src,paused:false,currentTime:0,play:()=>new Promise((_,r)=>{reject=r}),pause(){this.paused=true},fail:()=>reject(Error('blocked'))};sounds.push(a);return a});
 assert.equal(await player.play('vocab-0001','lv','привет'),false);
 assert.equal(await player.play('vocab-0001','ru','wrong'),false);
 const first=player.play('vocab-0001','ru','привет');
 const second=player.play('vocab-0001','ru','привет');
 assert.equal(sounds[0].paused,true); sounds[0].fail();assert.equal(await first,null);
 sounds[1].fail();assert.equal(await second,false);
 const third=player.play('vocab-0001','ru','привет');player.stop();sounds[2].fail();assert.equal(await third,null);
});
