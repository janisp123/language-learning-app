import copy,json,tempfile,unittest,shutil,sys
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'tools'))
from content_loader import load_content
ROOT=Path(__file__).resolve().parents[1]
class ReadingTests(unittest.TestCase):
 def loader(self):
  try:
   import reading_loader
  except ImportError:
   self.fail("Reading guide loader is not implemented")
  return reading_loader.load_readings
 def test_three_directions_and_original_target_binding(self):
  course,_=load_content(ROOT);pack=self.loader()(ROOT,course)
  self.assertEqual(set(pack['directions']),{'lv-ru','ru-en','en-ja'})
  for direction,entries in pack['directions'].items():
   self.assertEqual(set(entries),{p['id'] for p in course['phrases']})
   for p in course['phrases']:
    e=entries[p['id']];self.assertEqual(e['text'],p[direction.split('-')[1]])
    self.assertEqual(''.join(s['text'] for s in e['segments']),e['text'])
 def test_japanese_individual_kana(self):
  course,_=load_content(ROOT);e=self.loader()(ROOT,course)['directions']['en-ja']['vocab-0004']
  self.assertEqual([(s['text'],s['reading']) for s in e['segments']],list(zip('ありがとう',['a','ri','ga','to','u'])))
 def test_reject_misbound_missing_forbidden_and_grouped_kana(self):
  course,_=load_content(ROOT);loader=self.loader()
  for fault in ['text','missing','direction','kana']:
   with self.subTest(fault=fault),tempfile.TemporaryDirectory() as td:
    root=Path(td);shutil.copytree(ROOT/'content',root/'content')
    path=root/'content/readings/en-ja/basic-01.json';d=json.loads(path.read_text())
    if fault=='text':d['entries']['vocab-0004']['text']='wrong'
    if fault=='missing':del d['entries']['vocab-0004']
    if fault=='direction':d['direction']='ja-en'
    if fault=='kana':d['entries']['vocab-0004']['segments']=[{'text':'ありがとう','reading':'arigatou'}]
    path.write_text(json.dumps(d,ensure_ascii=False))
    with self.assertRaises(ValueError):loader(root,course)
if __name__=='__main__':unittest.main()
