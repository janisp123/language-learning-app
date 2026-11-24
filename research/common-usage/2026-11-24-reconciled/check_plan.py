#!/usr/bin/env python3
"""Read-only simulation of the proposed batch against actual engine presentations."""
import hashlib,json,unicodedata
from reconcile import HERE,ROOT,current

def norm(text):
 return ' '.join(unicodedata.normalize('NFKC',text).casefold().split())

def main():
 plan=json.loads((HERE/'F002-F007-plan.json').read_text())
 legacy,focused,questions=current()
 bank={p['id']:p for p in legacy['phrases']+focused['extensions']}
 replacements={(e['id'],e['language']):e for e in plan['entries']}
 assert len(replacements)==10
 affected=set();new=0;reuse=0
 for key,e in replacements.items():
  assert bank[key[0]][key[1]]==e['current']
  assert hashlib.sha256((ROOT/e['clip']).read_bytes()).hexdigest()==e['sha256']
  actual={role:[] for role in ['source','correct','wrong']}
  for q in questions:
   occurrence=(q['preset'],q['direction'],q['promptId'])
   role='source' if (q['conceptId'],q['source'])==key else None
   if role:actual[role].append(occurrence)
   for option in q['options']:
    if (option['id'],q['target'])==key:actual['correct' if option['id']==q['correctId'] else 'wrong'].append(occurrence)
  for role,occurrences in actual.items():
   expected={(q['preset'],q['direction'],q['promptId']) for q in e['affected'][role]}
   assert set(occurrences)==expected,(key,role)
   affected.update(occurrences)
  if e['exactReuseCandidates']:
   reuse+=1
   # Verify the proposed existing recording by text, manifest and actual bytes.
   manifest=json.loads((ROOT/'content/audio/manifest.json').read_text())
   clip=manifest['clips']['ru']['vocab-0266']
   assert key==('vocab-0005','ru') and clip['text']==e['proposed']
   assert hashlib.sha256((ROOT/clip['file']).read_bytes()).hexdigest()==clip['sha256']=='e26d883020a7db420919821c4ec575c2a1dfa39991b73432fe7155d4da5ad27a'
  else:new+=1
 for q in questions:
  options=[replacements.get((o['id'],q['target']),{}).get('proposed',o['text']) for o in q['options']]
  assert len({norm(x) for x in options})==4,(q['preset'],q['direction'],q['promptId'])
 assert len(questions)==4970 and len(affected)==plan['unionChangedPresentations']==142
 assert (new,reuse)==(9,1)
 retained={(x['language'],x['file']) for x in plan['unchangedClipsForAffectedConcepts']}
 assert len(retained)==14
 for x in plan['unchangedClipsForAffectedConcepts']:
  assert hashlib.sha256((ROOT/x['file']).read_bytes()).hexdigest()==x['sha256']
 print('PASS:10 proposed edits;142 affected presentations;9 new recordings/1 verified reuse;14 retained bindings;0 normalized exact-choice collisions. Semantic uniqueness is not certified.')
if __name__=='__main__':main()
