import importlib.util
import json
import sys
import tempfile
import unittest
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BUILDER = ROOT / 'tools/build_browser.py'

class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.ids=[]; self.remote=[]; self.scripts=[]
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if 'id' in a: self.ids.append(a['id'])
        if tag in ('script','img','link','iframe') and ('src' in a or 'href' in a): self.remote.append(a)
        if tag == 'script': self.scripts.append(a)

class BuildTests(unittest.TestCase):
    def test_builder_exists(self):
        self.assertTrue(BUILDER.exists(), 'standalone browser build is not implemented')

    @unittest.skipUnless(BUILDER.exists(), 'implementation absent')
    def test_portable_build_is_deterministic_and_contains_course_engine_and_ui(self):
        spec=importlib.util.spec_from_file_location('builder', BUILDER)
        module=importlib.util.module_from_spec(spec); spec.loader.exec_module(module)
        with tempfile.TemporaryDirectory() as tmp:
            a=Path(tmp)/'a.html'; b=Path(tmp)/'b.html'
            module.build(ROOT, a); module.build(ROOT,b)
            self.assertEqual(a.read_bytes(),b.read_bytes())
            html=a.read_text(); page=Page(); page.feed(html)
            self.assertEqual(len(page.ids),len(set(page.ids)))
            self.assertEqual(page.remote,[])
            self.assertTrue('LanguageEngine' in html, 'engine missing from build')
            self.assertTrue('draft-human-review-pending' in html, 'draft content status missing')
            for name in ['setup','practice','finished','start','choices','next','restart','direction','course-data','feedback','progress']:
                self.assertIn(name,page.ids)
            self.assertNotIn('<!--ENGINE-->',html)
            self.assertNotIn('<!--APP-->',html)
            for forbidden in ['localStorage','sessionStorage','indexedDB','document.cookie','fetch(','XMLHttpRequest','<iframe','<form']:
                self.assertNotIn(forbidden,html)
            self.assertTrue('lang="lv"' in html, 'Latvian language label missing')
            self.assertTrue('lang="ru"' in html, 'Russian language label missing')

    def test_site_contains_only_public_files_with_identical_app_download(self):
        sys.path.insert(0, str(ROOT / 'tools'))
        from build_site import build_site
        with tempfile.TemporaryDirectory() as tmp:
            output=Path(tmp)/'site'; build_site(ROOT, output)
            files={str(p.relative_to(output)) for p in output.rglob('*') if p.is_file()}
            self.assertEqual(files,{'index.html','learn/index.html','language-learning-test.html'})
            self.assertEqual((output/'learn/index.html').read_bytes(),(output/'language-learning-test.html').read_bytes())
            self.assertTrue('href="learn/"' in (output/'index.html').read_text())
            with self.assertRaises(FileExistsError): build_site(ROOT, output)

if __name__=='__main__': unittest.main()
