#!/usr/bin/env python3
"""Rebuild/check research-only current-source audit tables. Never writes app data."""
import argparse,csv,hashlib,io,json,subprocess,sys
from collections import Counter,defaultdict
from pathlib import Path
ROOT=Path(__file__).resolve().parents[3]
HERE=Path(__file__).resolve().parent
PRIOR='b04732fea576b8c7e65536913ce6b75c98bcb3be'
GUIDE='72e6ab4c106c6ee7c48703af025919c81d5c3b55'
SOURCE='a5a40869c7af31d63e1230e5260030a6c61516d9'
OLD='research/common-usage/2026-11-24-directed/'
IMPLEMENTED={'F001','F014','F015'}
sys.path.insert(0,str(ROOT/'tools'))
from content_loader import load_content
from focused_loader import load_focused_content

def git(path,ref=PRIOR):
 return subprocess.check_output(['git','show',ref+':'+path],cwd=ROOT,text=True)
def prior_csv(name):return list(csv.DictReader(io.StringIO(git(OLD+name))))
def read_csv(path):
 with path.open(encoding='utf-8',newline='') as f:return list(csv.DictReader(f))
def write_csv(name,rows):
 with (HERE/name).open('w',encoding='utf-8',newline='') as f:
  w=csv.DictWriter(f,fieldnames=list(rows[0]),lineterminator="\n");w.writeheader();w.writerows(rows)
def dump(name,data):(HERE/name).write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def current():
 legacy,_=load_content(ROOT);focused=load_focused_content(ROOT,legacy)
 js=r'''const fs=require('fs'),E=require('./core/engine.js'),S=require('./core/course-selection.js');const [legacy,focused]=JSON.parse(fs.readFileSync(0,'utf8'));const out=[];for(const preset of ['kids','adults','full'])for(const direction of legacy.directions){const c=E.validateCourse(preset==='full'?legacy:S.select(legacy,focused,preset,direction));const start=E.start(c,direction);for(let i=0;i<c.lessons.length;i++)for(let j=0;j<c.lessons[i].prompts.length;j++){const q=E.question(c,{...start,lessonIndex:i,promptIndex:j},()=>0);out.push({...q,preset,options:q.options.sort((a,b)=>a.id.localeCompare(b.id))});}}process.stdout.write(JSON.stringify(out));'''
 result=subprocess.run(['node','-e',js],cwd=ROOT,input=json.dumps([legacy,focused]),text=True,capture_output=True,check=True)
 return legacy,focused,json.loads(result.stdout)
def signature(q):
 return {'lesson':q['lessonId'],'concept':q['conceptId'],'prompt':q['text'],'correctID':q['correctId'],'correct':next(o['text'] for o in q['options'] if o['id']==q['correctId']),'options':sorted(q['options'],key=lambda o:o['id'])}
def old_signature(row):
 return {**{k:row[k] for k in ['lesson','concept','prompt','correctID','correct']},'options':sorted([{'id':row['correctID'],'text':row['correct']}]+[{'id':row[f'wrong{i}ID'],'text':row[f'wrong{i}']} for i in range(1,4)],key=lambda o:o['id'])}
def fieldset(keys):return ' '.join(sorted(set(keys)))
def generate():
 legacy,focused,records=current();bank={p['id']:p for p in legacy['phrases']+focused['extensions']}
 meanings={}
 for rel in ['content/concepts.json','content/focused/concepts.json']:
  for item in json.loads((ROOT/rel).read_text())['concepts']:meanings[item['id']]=item['meaning']
 groups=defaultdict(list);teach=defaultdict(set);wrong=defaultdict(set);courses=defaultdict(set);roles=defaultdict(set);guide_use=set()
 for q in records:
  groups[q['direction'],q['promptId']].append(q);teach[q['conceptId']].add(q['promptId']);courses[q['conceptId']].add(q['preset']);roles[q['conceptId'],q['source']].add('question')
  for o in q['options']:
   roles[o['id'],q['target']].add('correct' if o['id']==q['correctId'] else 'distractor')
   if q['direction'] in ['lv-ru','ru-en','en-ja']:guide_use.add((o['id'],q['target']))
   if o['id']!=q['correctId']:wrong[o['id']].add(q['promptId'])
 old_tables={};changed=[];updated_rows=[]
 for direction in legacy['directions']:
  output=[]
  for old in prior_csv(direction+'.csv'):
   qs=groups[direction,old['question']];q=qs[0];sig=signature(q)
   assert all(signature(x)==sig for x in qs),'Shared question differs between presets'
   assert {x['preset'] for x in qs}==set(old['courses'].split())
   oldsig=old_signature(old);fields=[k for k in sig if sig[k]!=oldsig[k]]
   applied=('F001' if q['promptId'] in ['focused-s01','focused-s02','focused-s05','focused-s06'] else 'F014' if q['promptId']=='basic-26-prompt-01' else 'F015' if q['promptId']=='basic-10-prompt-07' else '') if fields else ''
   if fields:
    assert applied,'Unexplained source drift'
    for x in qs:changed.append({'preset':x['preset'],'direction':direction,'question':q['promptId'],'implementedFinding':applied,'changedFields':fieldset(fields),'before':json.dumps(oldsig,ensure_ascii=False,sort_keys=True),'after':json.dumps(sig,ensure_ascii=False,sort_keys=True)})
   row=dict(old);row.update({k:sig[k] for k in ['lesson','concept','prompt','correctID','correct']});row['meaning']=meanings[q['conceptId']]
   distractors=sorted((o for o in q['options'] if o['id']!=q['correctId']),key=lambda o:o['id'])
   for i,o in enumerate(distractors,1):row[f'wrong{i}ID']=o['id'];row[f'wrong{i}']=o['text']
   if row['findings'] and set(row['findings'].split())<=IMPLEMENTED:row['decision']='Keep'
   row['courseIDs']=fieldset(x['courseId'] for x in qs);row['implementedFindings']=applied;row['assessmentProvenance']='released correction rechecked' if fields else 'prior editorial assessment retained;runtime binding rechecked';output.append(row)
   old_tables[direction,q['promptId']]=old
  write_csv(direction+'.csv',output);updated_rows+=output
 findings=prior_csv('findings.csv')
 for f in findings:
  f['priorStatus']=f['status'];f['priorRecommendation']=f['recommendation'];f['currentSource']='0.5.6 / '+SOURCE
  f['implementedVersion']='0.5.6' if f['key'] in IMPLEMENTED else ''
  f['preparedDisposition']='Ten-cell proposal requires owner approval;see F002-F007-wording.csv. F004 Japanese remains deferred.' if f['key'] in {'F002','F003','F004','F005','F006','F007'} else ''
  if f['key'] in IMPLEMENTED:
   f['status']='implemented';f['approval']='Owner approved and released in PR44'
   f['recommendation']={'F001':'Retain canonical vocab-0002 in all courses/all seven directions;Japanese choice explicitly approved;old focus-s02 remains inactive.','F014':'Retain replacement distractor vocab-0250;correct lunch vocab-0251 and all words/recordings unchanged.','F015':'Retain replacement distractor vocab-0093;correct how-many vocab-0097 unchanged. Broader price-question wording stays separately under F017.'}[f['key']]
 write_csv('findings.csv',findings)
 concepts=[]
 for old in prior_csv('concepts.csv'):
  ident=old['id'];p=bank[ident];row=dict(old);row.update({l:p[l] for l in legacy['languages']});row['meaning']=meanings[ident];row['coursesTeaching']=fieldset(courses[ident]);row['questionsTeaching']=fieldset(teach[ident]);row['questionsUsingAsDistractor']=fieldset(wrong[ident]);row['activeCorrect']=str(bool(teach[ident])).lower();row['activeOption']=str(any((ident,l) in roles for l in legacy['languages'])).lower();row['sourceStatus']='active' if teach[ident] else 'retained inactive'
  if ident=='focus-s02':row['decision']='Retained inactive';row['findings']='F001'
  if ident in ['vocab-0002','vocab-0251','vocab-0097']:row['decision']='Keep'
  if ident=='vocab-0002':row['findings']=fieldset(row['findings'].split()+['F001'])
  concepts.append(row)
 write_csv('concepts.csv',concepts)
 manifests={}
 for path in ['content/audio/manifest.json','content/focused/audio.json']:
  m=json.loads((ROOT/path).read_text())
  for language,entries in m['clips'].items():
   for ident,clip in entries.items():manifests[ident,language]=(path,clip)
 deps=[];modules={}
 for old in prior_csv('dependencies.csv'):
  ident,language=old['id'],old['language'];manifest,clip=manifests[ident,language];assert clip['text']==bank[ident][language];raw=(ROOT/clip['file']).read_bytes();assert hashlib.sha256(raw).hexdigest()==clip['sha256']
  row=dict(old);row['current']=bank[ident][language];row['manifestClip']=clip['file'];row['manifest']=manifest;row['sha256']=clip['sha256'];row['activeAudioRoles']=fieldset(roles[ident,language]);row['activeTargetGuideNeeded']=str((ident,language) in guide_use).lower();row['priorGuideNote']=row['heldGuideModule'] if not row['heldGuideModule'].startswith('content/readings/') else '';row['heldGuideModule']=row['heldGuideModule'] if row['heldGuideModule'].startswith('content/readings/') else '';row['heldGuideRef']=GUIDE if row['heldGuideModule'] else '';row['heldGuideText']='';row['heldGuideBlob']=''
  if row['heldGuideModule']:
   path=row['heldGuideModule']
   if path not in modules:modules[path]=(json.loads(git(path,GUIDE)),subprocess.check_output(['git','rev-parse',GUIDE+':'+path],cwd=ROOT,text=True).strip())
   data,blob=modules[path];row['heldGuideText']=data['entries'][ident]['text'];row['heldGuideBlob']=blob;row['guideBindingStatus']='matches stored target' if row['heldGuideText']==row['current'] else 'STALE target text'
  else:row['guideBindingStatus']='not planned for this language' if not row['guideDirection'] else 'missing focused entry' if (ident,language) in guide_use else 'inactive/not required for current annotated directions'
  deps.append(row)
 write_csv('dependencies.csv',deps);write_csv('changed-presentations.csv',changed)
 phases={}
 for phase in ['A','B','C','D']:
  rr=[q for q in records if old_tables[q['direction'],q['promptId']]['phase']==phase]
  phases[phase]={'questionIDs':len({q['promptId'] for q in rr}),'courseAppearances':len({(q['preset'],q['promptId']) for q in rr}),'questionDirections':len({(q['promptId'],q['direction']) for q in rr}),'presentations':len(rr)}
 provenance={'schemaVersion':1,'checkedOn':'2026-11-24','appVersion':json.loads((ROOT/'package.json').read_text())['version'],'sourceMain':SOURCE,'priorAuditPR':43,'priorAuditHead':PRIOR,'heldReadingGuidePR':21,'heldGuideHead':GUIDE,'scope':'Current runtime inventory and dependencies reconciled;prior linguistic judgments retained except released F001/F014/F015. No new fluent-human assessment.','legacyContentVersion':legacy['contentVersion'],'focusedContentVersion':focused['contentVersion'],'counts':{'sourceConceptRecords':len(bank),'activeCorrectConceptIDs':sum(bool(v) for v in teach.values()),'basicCorrectConceptIDs':len({q['conceptId'] for q in records if q['preset']!='full'}),'questionIDs':len({q['promptId'] for q in records}),'courseAppearances':len({(q['preset'],q['promptId']) for q in records}),'questionDirections':len(groups),'presentations':len(records),'optionBindings':len(records)*4,'storedAudioBindings':len(deps),'activeAudioBindings':sum(bool(d['activeAudioRoles']) for d in deps),'changedPresentations':len(changed),'changedTableRows':sum(bool(r['implementedFindings']) for r in updated_rows),'findingStatuses':dict(Counter(f['status'] for f in findings)),'staleHeldGuideBindings':sum(d['guideBindingStatus']=='STALE target text' for d in deps)},'phases':phases}
 assert len(records)==4970 and len(changed)==70 and len(groups)==4410 and len(bank)==577 and sum(bool(v) for v in teach.values())==576
 dump('provenance.json',provenance)
 print(json.dumps(provenance['counts'],indent=2))
def check():
 legacy,focused,records=current();expected={(q['preset'],q['direction'],q['promptId']):q for q in records};seen=set()
 for direction in legacy['directions']:
  for row in read_csv(HERE/(direction+'.csv')):
   for preset in row['courses'].split():
    key=(preset,direction,row['question']);assert key not in seen;seen.add(key);assert old_signature(row)==signature(expected[key]),key
 assert seen==set(expected) and len(seen)==4970
 bank={p['id']:p for p in legacy['phrases']+focused['extensions']}
 concept_rows=read_csv(HERE/'concepts.csv');assert len(concept_rows)==len(bank)==577 and {r['id'] for r in concept_rows}==set(bank)
 for row in concept_rows:
  assert all(row[l]==bank[row['id']][l] for l in legacy['languages'])
 manifests={}
 for rel in ['content/audio/manifest.json','content/focused/audio.json']:
  for language,clips in json.loads((ROOT/rel).read_text())['clips'].items():
   for ident,clip in clips.items():manifests[ident,language]=(rel,clip)
 deps=read_csv(HERE/'dependencies.csv');assert len(deps)==len(manifests)==2308 and {(r['id'],r['language']) for r in deps}==set(manifests)
 for row in deps:
  manifest,clip=manifests[row['id'],row['language']]
  assert (row['manifest'],row['manifestClip'],row['sha256'])==(manifest,clip['file'],clip['sha256'])
  assert clip['text']==row['current']
  assert row['current']==bank[row['id']][row['language']]
  assert hashlib.sha256((ROOT/row['manifestClip']).read_bytes()).hexdigest()==row['sha256']
 p=json.loads((HERE/'provenance.json').read_text());assert p['counts']['presentations']==len(seen);assert p['counts']['optionBindings']==19880
 findings=read_csv(HERE/'findings.csv');assert {f['key'] for f in findings if f['status']=='implemented'}==IMPLEMENTED
 print('PASS:4970 presentations/19880 choices,577 records,2308 clip hashes and implemented finding statuses match current source.')
if __name__=='__main__':
 parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--write',action='store_true',help='Reconcile from pinned PR43/PR21 git objects;writes only this research directory.');args=parser.parse_args()
 if args.write:generate()
 check()
