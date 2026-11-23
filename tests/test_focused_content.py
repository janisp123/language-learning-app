import json,sys,unittest,tempfile,shutil
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'tools'))
from content_loader import load_content
class FocusedContentTests(unittest.TestCase):
 def test_two_hundred_slots_reuse_eighty_and_preserve_legacy(self):
  self.assertTrue((ROOT/'tools/focused_loader.py').exists(),'focused loader not implemented')
  from focused_loader import load_focused_content
  legacy,_=load_content(ROOT);pack=load_focused_content(ROOT,legacy)
  self.assertEqual(len(legacy['phrases']),510)
  sets=[]
  for audience in ['kids','adults']:
   blocks=pack['courses'][audience]['blocks'];self.assertEqual(len(blocks),10)
   slots=[p['slotId'] for b in blocks for p in b['prompts']]
   self.assertEqual(len(slots),100);self.assertEqual(len(set(slots)),100);sets.append(set(slots))
  self.assertEqual(sets[0]&sets[1],{f'S{i:02}' for i in range(1,81)})
 def test_missing_translation_and_slot_variants_fail_closed(self):
  self.assertTrue((ROOT/'tools/focused_loader.py').exists(),'focused loader not implemented')
  from focused_loader import load_focused_content
  legacy,_=load_content(ROOT)
  with tempfile.TemporaryDirectory() as tmp:
   root=Path(tmp);shutil.copytree(ROOT/'content',root/'content')
   path=root/'content/focused/languages/ja.json';d=json.loads(path.read_text());d.pop(next(iter(d)));path.write_text(json.dumps(d))
   with self.assertRaises(ValueError):load_focused_content(root,legacy)
 def test_browser_exposes_audience_controls_and_bundled_focused_data(self):
  from build_browser import build
  with tempfile.TemporaryDirectory() as tmp:
   html=build(ROOT,Path(tmp)/'app.html').read_text()
   self.assertIn('id="course-selection"',html)
   self.assertIn('id="focused-data"',html)
   self.assertNotIn('id="original-course"',html)
   self.assertNotIn('id="learner-audience"',html)
 def test_focused_pronunciation_covers_every_extension_and_rejects_missing_clip(self):
  import audio_loader
  self.assertTrue(hasattr(audio_loader,'load_all_course_audio'),'focused audio composition missing')
  from focused_loader import load_focused_content
  legacy,_=load_content(ROOT);focused=load_focused_content(ROOT,legacy)
  audio=audio_loader.load_all_course_audio(ROOT,legacy,focused)
  for p in focused['extensions']:
   for l in legacy['languages']:self.assertEqual(audio['clips'][l][p['id']]['text'],p[l])
  from audio_loader import load_all_course_audio
  with tempfile.TemporaryDirectory() as tmp:
   root=Path(tmp);shutil.copytree(ROOT/'content',root/'content')
   path=root/'content/focused/audio.json';data=json.loads(path.read_text());data['clips']['ja'].pop(next(iter(data['clips']['ja'])));path.write_text(json.dumps(data))
   with self.assertRaisesRegex(ValueError,'coverage'):load_all_course_audio(root,legacy,focused)
 def test_sentence_choices_are_not_three_repeated_noun_decoys(self):
  from focused_loader import load_focused_content
  legacy,_=load_content(ROOT);data=load_focused_content(ROOT,legacy)
  bank={p['id']:p for p in legacy['phrases']+data['extensions']}
  prompt=data['courses']['kids']['blocks'][0]['prompts'][6]
  for ident in prompt['distractorIdsByDirection']['en-ja']:
   self.assertGreater(len(bank[ident]['en'].split()),1,'a sentence must compete with other utterances, not isolated nouns')
  choices={i for block in data['courses']['kids']['blocks'] for q in block['prompts'] for i in q['distractorIdsByDirection']['en-ja']}
  self.assertGreaterEqual(len(choices),60,'repeated fixed decoys permit guessing without learning')
 def test_stale_original_audio_revision_is_rejected(self):
  from audio_loader import load_all_course_audio
  from focused_loader import load_focused_content
  legacy,_=load_content(ROOT);data=load_focused_content(ROOT,legacy)
  with tempfile.TemporaryDirectory() as tmp:
   root=Path(tmp);shutil.copytree(ROOT/'content',root/'content')
   path=root/'content/audio/manifest.json';d=json.loads(path.read_text());d['contentVersion']='stale';path.write_text(json.dumps(d))
   with self.assertRaisesRegex(ValueError,'stale legacy'):load_all_course_audio(root,legacy,data)
