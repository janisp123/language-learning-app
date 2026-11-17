import copy
import json
from pathlib import Path
import shutil
import sys
import tempfile
import unittest
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'tools'))
from content_loader import load_content
from audio_loader import load_audio
from build_browser import build
DIRECTIONS=['lv-ru','lv-en','ru-lv','ru-en','en-lv','en-ru','en-ja']
class JapaneseTests(unittest.TestCase):
 def test_exact_seven_directions_script_only_translations_and_source_interfaces(self):
  course,ui=load_content(ROOT)
  self.assertEqual(course.get('directions'),DIRECTIONS)
  self.assertEqual(set(ui),{'lv','ru','en'})
  self.assertEqual(len(course['phrases']),510)
  for phrase in course['phrases']:
   self.assertRegex(phrase.get('ja',''),r'[\u3040-\u30ff\u3400-\u9fff]')
   self.assertNotRegex(phrase['ja'],r'[A-Za-z]')
  pack=load_audio(ROOT,course)
  self.assertEqual(pack['directions'],DIRECTIONS)
  self.assertEqual(set(pack['clips']),{'lv','ru','en'})
  for phrase in course['phrases']:self.assertEqual(pack['clips']['en'][phrase['id']]['text'],phrase['en'])
  with tempfile.TemporaryDirectory() as tmp:
   html=build(ROOT,Path(tmp)/'app.html').read_text()
   self.assertEqual(html.count('<option id="direction-'),7)
   for d in DIRECTIONS:self.assertIn(f'value="{d}"',html)
   for d in ['ja-en','ja-lv','ja-ru','lv-ja','ru-ja','ja-ja']:self.assertNotIn(f'value="{d}"',html)
 def test_catalog_rejects_missing_duplicate_unknown_or_malformed_allowlists(self):
  for directions in [None,[],['en-ja','en-ja'],['ja-ja'],['en-xx'],['en-ja-extra'],['en-ja']]:
   with self.subTest(directions=directions),tempfile.TemporaryDirectory() as tmp:
    root=Path(tmp);shutil.copytree(ROOT/'content',root/'content')
    p=root/'content/catalog.json';catalog=json.loads(p.read_text())
    if directions is None:catalog.pop('directions',None)
    else:catalog['directions']=directions
    p.write_text(json.dumps(catalog))
    with self.assertRaisesRegex(ValueError,'direction'):load_content(root)
 def test_target_only_language_can_be_first_in_the_catalog(self):
  with tempfile.TemporaryDirectory() as tmp:
   root=Path(tmp);shutil.copytree(ROOT/'content',root/'content')
   path=root/'content/catalog.json';catalog=json.loads(path.read_text())
   catalog['languages'].sort(key=lambda ref:ref['id']!='ja');path.write_text(json.dumps(catalog))
   course,ui=load_content(root)
   self.assertEqual(course['directions'],DIRECTIONS)
   self.assertEqual(set(ui),{'lv','ru','en'})
 def test_japanese_family_and_glass_choices_keep_meanings_distinct(self):
  course,_=load_content(ROOT);bank={p['id']:p for p in course['phrases']}
  self.assertEqual(bank['vocab-0019'].get('ja'),'姉か妹')
  self.assertEqual(bank['vocab-0020'].get('ja'),'兄か弟')
  self.assertEqual(bank['vocab-0203'].get('ja'),'ガラスのコップ')
 def test_audio_rejects_a_direction_the_course_does_not_offer(self):
  course,_=load_content(ROOT);manifest=json.loads((ROOT/'content/audio/manifest.json').read_text())
  manifest['directions'].append('ja-en')
  with self.assertRaisesRegex(ValueError,'direction'):load_audio(ROOT,course,manifest)
if __name__=='__main__':unittest.main()
