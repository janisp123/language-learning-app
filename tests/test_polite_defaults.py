"""Approved defaults must reach the real content/audio loaders; all other bytes stay fixed."""
import hashlib,json,sys,unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'tools'))
from content_loader import load_content
from focused_loader import load_focused_content
from audio_loader import load_all_course_audio

def digest(value):return hashlib.sha256(json.dumps(value,ensure_ascii=False,sort_keys=True,separators=(',',':')).encode()).hexdigest()

class PoliteDefaultTests(unittest.TestCase):
 def test_approved_shared_defaults_reach_audio_and_preserve_unapproved_words_and_bytes(self):
  approved=json.loads((ROOT/'tests/fixtures/polite-defaults-approved.json').read_text())
  legacy,_=load_content(ROOT);focused=load_focused_content(ROOT,legacy)
  bank={p['id']:p for p in legacy['phrases']+focused['extensions']}
  audio=load_all_course_audio(ROOT,legacy,focused)
  original_bytes={str(p.relative_to(ROOT)):hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted((ROOT/'audio').rglob('*.mp3'))}
  for e in approved['edits']:
   with self.subTest(id=e['id'],language=e['language']):
    self.assertEqual(bank[e['id']][e['language']],e['proposed'])
    clip=audio['clips'][e['language']][e['id']]
    self.assertEqual(clip['text'],e['proposed'])
    data=(ROOT/e['clip']).read_bytes()
    self.assertNotEqual(hashlib.sha256(data).hexdigest(),e['sha256'])
    original_bytes[e['clip']]=e['sha256']
  self.assertEqual(digest(original_bytes),approved['allAudioBytesSha256'])
  self.assertEqual((ROOT/'audio/ru/vocab-0005.mp3').read_bytes(),(ROOT/'audio/ru/vocab-0266.mp3').read_bytes())
  for language,expected in approved['focusedTranslationsSha256'].items():
   actual=json.loads((ROOT/f'content/focused/languages/{language}.json').read_text())
   for e in approved['edits']:
    if e['language']==language and e['id'].startswith('focus-'):actual[e['id']]['text']=e['current']
   self.assertEqual(digest(actual),expected,language)
  self.assertEqual(bank['focus-s08']['ja'],'名前は何ですか')
  self.assertEqual(bank['vocab-0005']['en'],'sorry')
  self.assertEqual(bank['vocab-0266']['en'],'excuse me')
