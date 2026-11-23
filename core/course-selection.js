(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.LanguageCourseSelection=api;})(globalThis,function(){
 'use strict';
 function select(legacy,pack,audience,direction){
  if(!['kids','adults'].includes(audience)||!legacy.directions.includes(direction))throw new Error('Unsupported focused selection.');
  if(pack?.schemaVersion!==1||!pack.courses?.[audience])throw new Error('Missing focused course.');
  const bank=new Map(legacy.phrases.map(p=>[p.id,p]));
  for(const p of pack.extensions){if(bank.has(p.id))throw new Error('Focused concept collision.');bank.set(p.id,p);}
  const used=new Set();
  const lessons=pack.courses[audience].blocks.map(b=>({id:b.id,title:b.id,prompts:b.prompts.map(q=>{
   const id=q.conceptId??q.conceptByDirection?.[direction];
   const distractors=q.distractorIdsByDirection?.[direction]??q.distractorIds;
   if(!Array.isArray(distractors)||distractors.length!==3)throw new Error('Missing focused choices.');
   for(const key of [id,...distractors]){if(!bank.has(key))throw new Error('Unknown focused concept.');used.add(key);}
   return {id:q.id,phraseId:id,correctAnswerId:id,distractorIds:[...distractors]};
  })}));
  return {schemaVersion:2,id:`focused-${audience}-${direction}`,audience,agePath:audience,contentVersion:pack.contentVersion,reviewStatus:'editorial-human-review-pending',languages:[...legacy.languages],directions:[direction],defaultDirection:direction,phrases:[...used].map(id=>bank.get(id)),lessons};
 }
 return Object.freeze({select});
});
