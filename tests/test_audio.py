import base64
import copy
import hashlib
import json
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'tools'))

class AudioTests(unittest.TestCase):
    def test_audio_loader_is_implemented(self):
        self.assertTrue((ROOT/'tools/audio_loader.py').exists(), 'audio loader missing')

    def test_complete_pack_and_embedded_bytes(self):
        from audio_loader import load_audio
        from content_loader import load_content
        course, _ = load_content(ROOT)
        pack = load_audio(ROOT, course)
        self.assertEqual(set(pack['directions']), set(course['directions']))
        self.assertEqual(set(pack['clips']), set(course['languages']))
        for language, clips in pack['clips'].items():
            self.assertEqual(set(clips), {p['id'] for p in course['phrases']})
            for ident, clip in clips.items():
                self.assertEqual(clip['text'], next(p[language] for p in course['phrases'] if p['id']==ident))
                self.assertEqual(base64.b64decode(clip['src'].split(',')[1]), (ROOT/f'audio/{language}/{ident}.mp3').read_bytes())

    def test_all_phrases_contract_rejects_missing_clip_or_language(self):
        from audio_loader import load_audio
        from content_loader import load_content
        course, _ = load_content(ROOT)
        manifest = json.loads((ROOT/'content/audio/manifest.json').read_text())
        manifest['coverage'] = 'all-phrases'
        for mode in ['clip', 'language']:
            changed = copy.deepcopy(manifest)
            if mode == 'clip': del changed['clips']['ru']['vocab-0001']
            else: del changed['clips']['ru']
            with self.assertRaisesRegex(ValueError, 'coverage'):
                load_audio(ROOT, course, manifest=changed)

    def test_missing_japanese_target_audio_fails_the_all_phrases_contract(self):
        from audio_loader import load_audio
        from content_loader import load_content
        course, _ = load_content(ROOT)
        manifest = json.loads((ROOT/'content/audio/manifest.json').read_text())
        self.assertEqual(len(manifest['clips'].get('ja', {})), 510, 'Japanese recordings must cover every answer')
        for mode in ['clip', 'language']:
            changed=copy.deepcopy(manifest)
            if mode=='clip':del changed['clips']['ja']['vocab-0001']
            else:del changed['clips']['ja']
            with self.assertRaisesRegex(ValueError,'coverage'):
                load_audio(ROOT,course,manifest=changed)

    def test_rejects_translation_hash_and_path_drift(self):
        from audio_loader import load_audio
        from content_loader import load_content
        course, _ = load_content(ROOT)
        manifest = json.loads((ROOT/'content/audio/manifest.json').read_text())
        for field, value in [('text','wrong'),('sha256','0'*64),('file','../../outside.mp3')]:
            changed = copy.deepcopy(manifest)
            changed['clips']['ru']['vocab-0001'][field] = value
            with self.assertRaises(ValueError): load_audio(ROOT, course, manifest=changed)

if __name__ == '__main__': unittest.main()
