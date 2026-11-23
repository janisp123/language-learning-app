import json
from pathlib import Path
import re
import sys
import unittest
import unicodedata
import tempfile
import shutil
import hashlib

ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'tools'))
from content_loader import load_content

class BasicVocabularyTests(unittest.TestCase):
    def test_vocabulary_ids_text_and_answer_bindings_match_the_reviewed_baseline(self):
        course,_=load_content(ROOT)
        lock=json.loads((ROOT/'tests/fixtures/vocabulary-0.4-lock.json').read_text())
        # The owner intentionally reordered catalog blocks. Keep the old snapshot's
        # own order so its unchanged digest still protects every existing binding.
        phrases={p['id']:p for p in course['phrases']}
        blocks={b['id']:b for b in course['lessons']}
        payload={'id':course['id'],'languages':lock['languages'],
                 'phrases':[{k:phrases[ident][k] for k in ['id',*lock['languages']]} for ident in lock['phraseIds']],
                 'lessons':[blocks[ident] for ident in lock['blockIds']]}
        edits=json.loads((ROOT/'tests/fixtures/usage-correction-baseline.json').read_text())['distractorEdits']
        import copy
        payload=copy.deepcopy(payload)
        for block in payload['lessons']:
            for prompt in block['prompts']:
                if prompt['id'] in edits:
                    change=edits[prompt['id']]
                    self.assertEqual(prompt['distractorIds'],change['after'])
                    prompt['distractorIds']=change['before']
        digest=hashlib.sha256(json.dumps(payload,ensure_ascii=False,sort_keys=True,separators=(',',':')).encode()).hexdigest()
        self.assertEqual(digest,lock['digest'],'vocabulary IDs/text/answer bindings changed')

    def test_active_blocks_contain_distinct_learning_items(self):
        course,_=load_content(ROOT)
        catalog=json.loads((ROOT/'content/catalog.json').read_text())
        target=catalog['curriculum']['targetItems'];self.assertGreaterEqual(target,500)
        self.assertEqual(len(course['lessons']),target//10)
        prompts=[p for block in course['lessons'] for p in block['prompts']]
        self.assertEqual(len(prompts),target)
        self.assertEqual(len({p['id'] for p in prompts}),target)
        self.assertEqual(len({p['phraseId'] for p in prompts}),target)
        bank={p['id']:p for p in course['phrases']}
        english=[unicodedata.normalize('NFC',bank[p['phraseId']]['en']).casefold().strip() for p in prompts]
        self.assertEqual(len(set(english)),target,'duplicate English entries must not inflate the item count')
        for language in course['languages']:
            values=[unicodedata.normalize('NFC',bank[p['phraseId']][language]).casefold().strip() for p in prompts]
            if language=='ja':
                # Distinct meanings may legitimately share a translation. Pin the
                # only approved duplicate; per-question uniqueness stays strict.
                from collections import defaultdict
                groups=defaultdict(list)
                for prompt,value in zip(prompts,values):groups[value].append(prompt['phraseId'])
                self.assertEqual({v:sorted(ids) for v,ids in groups.items() if len(ids)>1},
                                 {'こんにちは':['vocab-0001','vocab-0269']})
            else:
                self.assertEqual(len(set(values)),target,f'duplicate {language} entries must not inflate the count')

    def test_first_ten_blocks_are_simple_words_or_short_phrases_not_sentences(self):
        course,_=load_content(ROOT)
        definitions=json.loads((ROOT/'content/concepts.json').read_text())['concepts']
        forms={c['id']:c.get('form') for c in definitions}
        bank={p['id']:p for p in course['phrases']}
        for block in course['lessons']:
            for prompt in block['prompts']:
                self.assertIn(forms[prompt['phraseId']],['word','phrase'])
                for language in course['languages']:
                    value=bank[prompt['phraseId']][language]
                    self.assertNotRegex(value,r'[.!?]','sentence punctuation is not appropriate for this vocabulary pack')
                    self.assertLessEqual(len(value.split()),4,'keep the whole vocabulary pack short and memorable')
        self.assertEqual(sum(len(b['prompts']) for b in course['lessons'][:10]),100)

    def test_builder_rejects_long_sentence_like_entries_in_vocabulary_policy(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp);shutil.copytree(ROOT/'content',root/'content')
            path=root/'content/languages/en.json';pack=json.loads(path.read_text());key=next(iter(pack['translations']))
            pack['translations'][key]['text']='This is a long example sentence.';path.write_text(json.dumps(pack))
            with self.assertRaisesRegex(ValueError,'must stay short'):load_content(root)

if __name__=='__main__':unittest.main()
