import hashlib
import json
from pathlib import Path
import sys
import unittest
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'tools'))
from content_loader import load_content
from audio_loader import load_audio

# Explicit owner-approved exclusions. Replacement distractors remain ordinary
# same-block vocabulary, while correct IDs and the original meaning stay fixed.
PAIRS={'vocab-0091':'vocab-0092','vocab-0134':'vocab-0135',
       'vocab-0148':'vocab-0149','vocab-0209':'vocab-0210',
       'vocab-0402':'vocab-0403','vocab-0403':'vocab-0404'}

class UsageCorrectionTests(unittest.TestCase):
 def test_daytime_hello_matches_existing_pronunciation_without_changing_afternoon(self):
  course,_=load_content(ROOT);bank={p['id']:p for p in course['phrases']}
  self.assertEqual(bank['vocab-0001']['ja'],'こんにちは')
  self.assertEqual(bank['vocab-0269']['ja'],'こんにちは')
  pack=load_audio(ROOT,course)
  self.assertEqual(pack['clips']['ja']['vocab-0001']['src'],pack['clips']['ja']['vocab-0269']['src'])
 def test_proven_overlapping_alternatives_are_not_marked_wrong(self):
  course,_=load_content(ROOT)
  prompts={p['phraseId']:p for b in course['lessons'] for p in b['prompts']}
  for correct,overlap in PAIRS.items():
   with self.subTest(correct=correct):
    self.assertNotIn(overlap,prompts[correct]['distractorIds'])
    self.assertEqual(prompts[correct]['correctAnswerId'],correct)
 def test_all_other_translation_and_recording_bytes_preserved(self):
  baseline=json.loads((ROOT/'tests/fixtures/usage-correction-baseline.json').read_text())
  def digest(value):
   return hashlib.sha256(json.dumps(value,ensure_ascii=False,sort_keys=True,separators=(',',':')).encode()).hexdigest()
  for language,expected in baseline['translationSha256'].items():
   actual=json.loads((ROOT/f'content/languages/{language}.json').read_text())['translations']
   actual={k:v for k,v in actual.items() if (language,k)!=('ja','vocab-0001')}
   self.assertEqual(digest(actual),expected,language)
  for language,expected in baseline['audioSha256'].items():
   actual={p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted((ROOT/f'audio/{language}').glob('*.mp3')) if (language,p.stem)!=('ja','vocab-0001')}
   self.assertEqual(digest(actual),expected,language)
