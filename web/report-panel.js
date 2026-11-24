(function(root){
 'use strict';
 const presets={kids:'Basic Kids',adults:'Basic Adults',full:'Full'};
 function createSnapshot(context){
  return Object.freeze({appVersion:context.appVersion,contentVersion:context.contentVersion,preset:context.preset,presetLabel:context.presetLabel||presets[context.preset],direction:context.direction,directionLabel:context.directionLabel,courseId:context.courseId,lessonId:context.lessonId,promptId:context.promptId,conceptId:context.conceptId,source:context.source,target:context.target,text:context.text,options:Object.freeze(context.options.map(o=>Object.freeze({id:o.id,text:o.text})))});
 }
 function formatReport(snapshot,type,answerId,proposal){
  if(!['question','answer'].includes(type))throw new Error('Unknown correction target.');
  const answer=type==='answer'?snapshot.options.find(o=>o.id===answerId):null;
  if(type==='answer'&&!answer)throw new Error('Answer does not belong to the captured question.');
  const language=answer?snapshot.target:snapshot.source;
  return ['Language learning correction',`App version: ${snapshot.appVersion}`,`Content version: ${snapshot.contentVersion}`,`Direction: ${snapshot.directionLabel} (${snapshot.direction})`,`Preset: ${presets[snapshot.preset]} (${snapshot.preset})`,`Course ID: ${snapshot.courseId}`,`Lesson ID: ${snapshot.lessonId}`,`Question ID: ${snapshot.promptId}`,`Question concept ID: ${snapshot.conceptId}`,`Question (${snapshot.source}): ${snapshot.text}`,`Correction target: ${type==='question'?'Question':'Answer'}`,...(answer?[`Answer ID: ${answer.id}`]:[]),`Original text (${language}): ${answer?answer.text:snapshot.text}`,`Proposed correction (${language}): ${proposal}`,'Options shown:',...snapshot.options.map(o=>`- [${o.id}] ${o.text}`)].join('\n');
 }
 function create(document,{getContext,message,afterClose}){
  const $=id=>document.getElementById(id),dialog=$('report-dialog');
  let snapshot=null,generation=0;
  function clear(){
   generation++;snapshot=null;$('report-type').value='question';$('report-proposal').value='';$('report-original').value='';$('report-output').value='';$('report-context').textContent='';$('report-status').textContent='';$('report-manual').hidden=true;$('report-answer-field').hidden=true;$('report-answer').replaceChildren();$('report-copy').disabled=true;
  }
  function reset(){if(dialog.open)dialog.close();clear();}
  function update(){
   if(!snapshot)return;
   generation++;$('report-status').textContent='';$('report-output').value='';$('report-manual').hidden=true;
   const answer=$('report-type').value==='answer'?snapshot.options.find(o=>o.id===$('report-answer').value):null;
   $('report-answer-field').hidden=$('report-type').value!=='answer';
   $('report-original').value=answer?answer.text:snapshot.text;$('report-original').lang=answer?snapshot.target:snapshot.source;
   $('report-proposal').lang=answer?snapshot.target:snapshot.source;
   $('report-copy').disabled=!$('report-proposal').value.trim();
  }
  $('report-open').addEventListener('click',()=>{
   if(dialog.open)return;
   const context=getContext();if(!context)return;
   clear();snapshot=createSnapshot(context);dialog.lang=snapshot.source;
   for(const option of snapshot.options){const node=document.createElement('option');node.value=option.id;node.textContent=option.text;node.lang=snapshot.target;$('report-answer').append(node);}
   $('report-answer').value=snapshot.options[0].id;
   $('report-context').textContent=message('reportDetails',{version:snapshot.appVersion,contentVersion:snapshot.contentVersion,direction:snapshot.directionLabel,preset:snapshot.presetLabel,course:snapshot.courseId,lesson:snapshot.lessonId,question:snapshot.promptId,concept:snapshot.conceptId,source:snapshot.source,original:snapshot.text,options:snapshot.options.map(o=>`[${o.id}] ${o.text}`).join('\n')});
   update();dialog.showModal();$('report-type').focus();
  });
  for(const id of ['report-type','report-answer'])$(id).addEventListener('change',update);
  $('report-proposal').addEventListener('input',update);
  $('report-close').addEventListener('click',reset);
  dialog.addEventListener('cancel',clear);
  dialog.addEventListener('close',()=>{if(!dialog.open){clear();afterClose?.();}});
  $('report-copy').addEventListener('click',async()=>{
   if(!snapshot||!$('report-proposal').value.trim())return;
   const report=formatReport(snapshot,$('report-type').value,$('report-answer').value,$('report-proposal').value);
   const ticket=++generation;
   try{
    if(!root.navigator?.clipboard?.writeText)throw new Error('Clipboard unavailable.');
    await root.navigator.clipboard.writeText(report);
    if(ticket===generation)$('report-status').textContent=message('reportCopied');
   }catch(_){
    if(ticket!==generation)return;
    $('report-output').value=report;$('report-manual').hidden=false;$('report-status').textContent=message('reportCopyFailed');$('report-output').focus();$('report-output').select();
   }
  });
  clear();return {reset};
 }
 const api={createSnapshot,formatReport,create};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.LanguageReport=api;
})(globalThis);
