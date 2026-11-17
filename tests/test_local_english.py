import ctypes.util
import shutil
import subprocess
import sys
import tempfile
import unittest
from unittest.mock import patch
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'tools'))

class LocalEnglishTests(unittest.TestCase):
    @unittest.skipUnless(ctypes.util.find_library('flite_cmu_us_slt') and shutil.which('ffmpeg'), 'optional local voice tooling not installed')
    def test_renders_decodable_english_without_network(self):
        from local_english import EnglishVoice
        with tempfile.TemporaryDirectory() as tmp:
            path=Path(tmp)/'hello.mp3'
            EnglishVoice().render('hello',path)
            self.assertGreater(path.stat().st_size,100)
            subprocess.run(['ffmpeg','-v','error','-i',str(path),'-f','null','-'],check=True,capture_output=True)

    def test_generator_module_exists(self):
        self.assertTrue((ROOT/'tools/local_english.py').exists(),'local English generator missing')

    @unittest.skipUnless(ctypes.util.find_library('flite_cmu_us_slt') and shutil.which('ffmpeg'), 'optional local voice tooling not installed')
    def test_registered_english_clip_regenerates_without_online_provider(self):
        from generate_audio import generate
        import json
        import hashlib
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp)
            shutil.copytree(ROOT/'content',root/'content')
            manifest_path=root/'content/audio/manifest.json'
            authored=json.loads(manifest_path.read_text())
            authored['clips']['en']['vocab-0001']['provider']='flite-slt'
            authored['clips']['en']['vocab-0001']['source']='Editable pronunciation provenance note'
            manifest_path.write_text(json.dumps(authored))
            with patch.dict(sys.modules, {'gtts':None}):
                generate(root,'en','vocab-0001')
            manifest=json.loads((root/'content/audio/manifest.json').read_text())
            entry=manifest['clips']['en']['vocab-0001']
            self.assertEqual(entry['text'],'hello')
            self.assertEqual(entry['sha256'],hashlib.sha256((root/entry['file']).read_bytes()).hexdigest())

if __name__=='__main__':unittest.main()
