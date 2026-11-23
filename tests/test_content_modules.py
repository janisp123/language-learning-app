import copy
import hashlib
import importlib.util
import json
from pathlib import Path
import shutil
import sys
import tempfile
import unittest

ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'tools'))
MODULE=ROOT/'tools/content_loader.py'

class ContentModuleTests(unittest.TestCase):
    def test_modular_loader_exists(self):
        self.assertTrue(MODULE.exists(),'modular content loader is not implemented')

    @unittest.skipUnless(MODULE.exists(),'implementation absent')
    def test_migration_preserves_original_question_answer_and_translation_bindings(self):
        from content_loader import load_content
        course,locales=load_content(ROOT/'archive/course-0.3')
        lock=json.loads((ROOT/'tests/fixtures/original-content-lock.json').read_text())
        payload={'id':course['id'],'languages':lock['languages'],
                 'phrases':[{k:p[k] for k in ['id',*lock['languages']]} for p in course['phrases'] if p['id'] in lock['phraseIds']],
                 'lessons':[{**l,'prompts':[{k:p[k] for k in ['id','phraseId','distractorIds']} for p in l['prompts']]} for l in course['lessons'] if l['id'] in lock['blockIds']]}
        digest=hashlib.sha256(json.dumps(payload,ensure_ascii=False,sort_keys=True,separators=(',',':')).encode()).hexdigest()
        self.assertEqual(digest,lock['digest'],'existing content identity or answer binding changed')
        for lesson in course['lessons']:
            for prompt in lesson['prompts']:self.assertEqual(prompt['correctAnswerId'],prompt['phraseId'])
        self.assertEqual(set(locales),set(course['languages']))

    @unittest.skipUnless(MODULE.exists(),'implementation absent')
    def test_misbound_answers_and_translations_unknown_ids_and_duplicate_keys_fail(self):
        from content_loader import load_content
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp);shutil.copytree(ROOT/'content',root/'content')
            catalog=json.loads((root/'content/catalog.json').read_text())
            block=root/'content'/catalog['blocks'][0]['file'];original=block.read_text();b=json.loads(original)
            b['prompts'][0]['correctAnswerId']=b['prompts'][0]['distractorIds'][0];block.write_text(json.dumps(b))
            with self.assertRaisesRegex(ValueError,'correctAnswerId'):load_content(root)
            block.write_text(original)
            language=root/'content'/catalog['languages'][0]['file'];original_language=language.read_text();pack=json.loads(original_language)
            ids=list(pack['translations']);pack['translations'][ids[0]],pack['translations'][ids[1]]=pack['translations'][ids[1]],pack['translations'][ids[0]]
            language.write_text(json.dumps(pack))
            with self.assertRaisesRegex(ValueError,'conceptId'):load_content(root)
            language.write_text(original_language)
            pack=json.loads(original_language);pack['translations'][ids[0]]['meaning']='A different meaning';language.write_text(json.dumps(pack))
            with self.assertRaisesRegex(ValueError,'meaning'):load_content(root)
            language.write_text(original_language)
            b=json.loads(original);b['prompts'][0]['distractorIds'][0]='unknown-concept';block.write_text(json.dumps(b))
            with self.assertRaisesRegex(ValueError,'unknown'):load_content(root)
            block.write_text(original)
            bad_catalog=copy.deepcopy(catalog);bad_catalog['languages'][0]['file']='../outside.json';(root/'content/catalog.json').write_text(json.dumps(bad_catalog))
            with self.assertRaisesRegex(ValueError,'outside content'):load_content(root)
            (root/'content/catalog.json').write_text(json.dumps(catalog))
            language.write_text('{"id":"lv","id":"ru"}')
            with self.assertRaisesRegex(ValueError,'duplicate JSON key'):load_content(root)

    @unittest.skipUnless(MODULE.exists(),'implementation absent')
    def test_an_additional_block_is_added_through_content_only(self):
        from content_loader import load_content
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp);shutil.copytree(ROOT/'content',root/'content')
            catalog_path=root/'content/catalog.json';catalog=json.loads(catalog_path.read_text())
            block=json.loads((root/'content'/catalog['blocks'][0]['file']).read_text());block['id']='extra-block';block['title']='Extra block'
            for i,prompt in enumerate(block['prompts']):prompt['id']=f'extra-prompt-{i+1:02}'
            (root/'content/blocks/extra-block.json').write_text(json.dumps(block));catalog['blocks'].append({'id':'extra-block','file':'blocks/extra-block.json'})
            # Synthetic modularity fixture reuses concepts; it is not an expanded vocabulary curriculum.
            catalog.pop('curriculum',None)
            for language in catalog['languages']:
                path=root/'content'/language['file'];pack=json.loads(path.read_text());
                if 'ui' in pack:pack['ui']['lessons']['extra-block']='Extra block'
                path.write_text(json.dumps(pack))
            catalog_path.write_text(json.dumps(catalog));course,_=load_content(root)
            self.assertEqual(len(course['lessons']),len(catalog['blocks']));self.assertEqual(course['lessons'][-1]['id'],'extra-block')

    @unittest.skipUnless(MODULE.exists(),'implementation absent')
    def test_all_language_packs_cannot_share_a_missing_ui_key_or_wrong_placeholder(self):
        from content_loader import load_content
        for mode in ['missing', 'placeholder']:
            with self.subTest(mode=mode), tempfile.TemporaryDirectory() as tmp:
                root=Path(tmp);shutil.copytree(ROOT/'content',root/'content')
                catalog=json.loads((root/'content/catalog.json').read_text())
                for ref in catalog['languages']:
                    path=root/'content'/ref['file'];pack=json.loads(path.read_text())
                    if 'ui' not in pack:continue
                    if mode=='missing':del pack['ui']['messages']['instruction']
                    else:pack['ui']['messages']['instruction']='Choose {wrongPlaceholder}'
                    path.write_text(json.dumps(pack))
                with self.assertRaisesRegex(ValueError,'UI.*(keys|placeholder)'):load_content(root)

    @unittest.skipUnless(MODULE.exists(),'implementation absent')
    def test_an_additional_language_and_explicit_directions_are_added_through_data_only(self):
        from content_loader import load_content
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp);shutil.copytree(ROOT/'content',root/'content')
            path=root/'content/catalog.json';catalog=json.loads(path.read_text())
            pack=json.loads((root/'content'/catalog['languages'][0]['file']).read_text());pack['id']='zz'
            for item in pack['translations'].values():item['text']='ZZ-'+item['text']
            pack['ui']['names']['zz']={'label':'Test language','target':'test'}
            for language in catalog['languages']:
                module=root/'content'/language['file'];existing=json.loads(module.read_text());
                if 'ui' in existing:existing['ui']['names']['zz']={'label':'Test language','target':'test'}
                module.write_text(json.dumps(existing))
            (root/'content/languages/zz.json').write_text(json.dumps(pack));catalog['languages'].append({'id':'zz','file':'languages/zz.json'});catalog['directions'] += ['zz-'+c for c in ['lv','ru','en','ja']]+[c+'-zz' for c in ['lv','ru','en']];path.write_text(json.dumps(catalog))
            course,locales=load_content(root);self.assertEqual(course['languages'],['lv','ru','en','ja','zz']);self.assertIn('zz',locales)
            shutil.copytree(ROOT/'web',root/'web');shutil.copytree(ROOT/'core',root/'core')
            shutil.copytree(ROOT/'audio',root/'audio')
            from build_browser import build
            # This fixture exercises the independent legacy catalog, not focused courses.
            shutil.rmtree(root/'content/focused')
            output=build(root,root/'test.html').read_text()
            self.assertEqual(output.count('<option id="direction-'),14)
            self.assertIn('value="zz-lv"',output);self.assertIn('value="en-zz"',output)

if __name__=='__main__':unittest.main()
