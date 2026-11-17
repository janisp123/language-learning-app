import json
from pathlib import Path
import sys
import unittest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT/'tools'))
from content_loader import load_content
from audio_loader import load_audio

REQUESTS = [
    ('I need help', 'man vajag palīdzību', 'мне нужна помощь'),
    ('I need water', 'man vajag ūdeni', 'мне нужна вода'),
    ('I need a doctor', 'man vajag ārstu', 'мне нужен врач'),
    ("I don't understand", 'es nesaprotu', 'я не понимаю'),
    ('please call an ambulance', 'lūdzu izsauciet neatliekamo palīdzību', 'пожалуйста вызовите скорую помощь'),
    ('please call the police', 'lūdzu izsauciet policiju', 'пожалуйста вызовите полицию'),
    ('allergy', 'alerģija', 'аллергия'),
    ('without milk', 'bez piena', 'без молока'),
    ('without sugar', 'bez cukura', 'без сахара'),
    ('I need medicine', 'man vajag zāles', 'мне нужно лекарство'),
]
PRIORITY = [f'basic-{n:02}' for n in [1, 50, 4, 27, 10, 5, 6, 8, 9, 3, 51, 43, 42, 44, 45]]

class PracticalCoreTests(unittest.TestCase):
    def test_requests_follow_the_introductory_core_and_familiar_tools_come_early(self):
        course, _ = load_content(ROOT)
        lock = json.loads((ROOT/'tests/fixtures/vocabulary-0.4-lock.json').read_text())
        expected = PRIORITY + [ident for ident in lock['blockIds'] if ident not in PRIORITY]
        self.assertEqual([block['id'] for block in course['lessons']], expected)
        self.assertEqual(len(course['phrases']), 510)
        self.assertEqual(len(course['lessons']), 51)

    def test_new_requests_bind_the_exact_reviewed_meanings_in_three_languages(self):
        course, _ = load_content(ROOT)
        bank = {p['id']:p for p in course['phrases']}
        ids = [f'vocab-{n:04}' for n in range(501, 511)]
        for ident, expected in zip(ids, REQUESTS):
            self.assertTrue(ident in bank, f'new practical meaning is missing: {ident}')
            self.assertEqual(tuple(bank[ident][code] for code in ['en','lv','ru']), expected)
        block = next(b for b in course['lessons'] if b['id'] == 'basic-51')
        self.assertEqual([p['phraseId'] for p in block['prompts']], ids)
        self.assertTrue(all(p['correctAnswerId'] == p['phraseId'] for p in block['prompts']))

    def test_every_new_request_has_a_recording_in_each_source_language(self):
        course, _ = load_content(ROOT)
        pack = load_audio(ROOT, course)
        for number in range(501, 511):
            ident = f'vocab-{number:04}'
            for code in ['lv','ru','en']:
                self.assertTrue(ident in pack['clips'][code], f'new pronunciation is missing: {code}/{ident}')
                self.assertTrue(pack['clips'][code][ident]['src'].startswith('data:audio/mpeg;base64,'))

if __name__ == '__main__':
    unittest.main()
