"""Strict focused-course extensions. The original course stays canonical and intact."""
from pathlib import Path
from content_loader import read_module, require, text

AUDIENCES=('kids','adults')

def load_focused_content(root:Path, legacy_course:dict)->dict:
 base=root/'content/focused'
 catalog=read_module(base,'catalog.json')
 require(catalog.get('schemaVersion')==1 and catalog.get('defaultAudience')=='kids','invalid focused catalog')
 require(set(catalog.get('courses',{}))==set(AUDIENCES),'invalid focused audiences')
 definitions=read_module(base,catalog.get('conceptsFile')).get('concepts')
 require(isinstance(definitions,list),'invalid focused concepts')
 meanings={d['id']:d['meaning'] for d in definitions}
 legacy={p['id']:p for p in legacy_course['phrases']}
 require(len(meanings)==len(definitions) and not set(meanings)&set(legacy),'duplicate focused concepts')
 languages=legacy_course['languages']
 require(set(catalog.get('languageFiles',{}))==set(languages),'focused languages differ')
 packs={l:read_module(base,catalog['languageFiles'][l]) for l in languages}
 for l,pack in packs.items():
  require(set(pack)==set(meanings),'focused translation coverage differs')
  for ident,entry in pack.items():
   value=entry.get('text')
   require(entry.get('conceptId')==ident and entry.get('meaning')==meanings[ident] and text(value),'focused translation identity differs')
   require(len(value.split())<=12 and not any(ord(c)<32 for c in value) and '…' not in value,'focused phrase is incomplete or too long')
 extensions=[{'id':ident,**{l:packs[l][ident]['text'] for l in languages}} for ident in meanings]
 bank={**legacy,**{p['id']:p for p in extensions}}
 courses={}
 for audience in AUDIENCES:
  data=read_module(base,catalog['courses'][audience]);require(data.get('id')==audience and data.get('audience')==audience,'focused course identity differs')
  require(len(data.get('blocks',[]))==10 and len(set(data['blocks']))==10,'focused course requires ten blocks')
  blocks=[];slots=[];prompts=set()
  for block_id in data['blocks']:
   block=read_module(base,f'blocks/{block_id}.json')
   require(block.get('id')==block_id and len(block.get('prompts',[]))==10,'focused block identity/size differs')
   for q in block['prompts']:
    require(text(q.get('id')) and q['id'] not in prompts,'duplicate focused prompt');prompts.add(q['id'])
    slot=q.get('slotId');require(text(slot),'missing focused slot');slots.append(slot)
    has_plain='conceptId' in q;has_variants='conceptByDirection' in q
    require(has_plain!=has_variants,'focused prompt needs one identity method')
    if has_variants:require(set(q['conceptByDirection'])==set(legacy_course['directions']),'focused direction variants differ')
    for direction in legacy_course['directions']:
     ident=q['conceptId'] if has_plain else q['conceptByDirection'][direction]
     require(set(q.get('distractorIdsByDirection',{}))==set(legacy_course['directions']),'focused distractor directions differ')
     choices=[ident,*q['distractorIdsByDirection'][direction]]
     require(len(choices)==4 and len(set(choices))==4 and all(i in bank for i in choices),'invalid focused choices')
     for l in languages:
      require(len({bank[i][l].strip().casefold() for i in choices})==4,'ambiguous focused choice text')
   blocks.append(block)
  expected=[f'S{i:02}' for i in range(1,81)]+[f'{"K" if audience=="kids" else "A"}{i:02}' for i in range(1,21)]
  require(slots==expected,'focused slots/order differ')
  courses[audience]={'id':audience,'audience':audience,'blocks':blocks}
 for language in {d.split('-')[0] for d in legacy_course['directions']}:
  ui=read_module(root/'content',f'languages/{language}.json')['ui']
  titles=ui.get('focusedLessons',{})
  expected={b['id'] for c in courses.values() for b in c['blocks']}
  require(set(titles)==expected and all(text(v) for v in titles.values()),'focused lesson titles differ')
 return {'schemaVersion':1,'contentVersion':catalog['contentVersion'],'defaultAudience':'kids','extensions':extensions,'courses':courses}
