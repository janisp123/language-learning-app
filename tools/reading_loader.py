"""Validate separately authored reading aids without changing canonical course identity."""
import re
from content_loader import read_module, require, text

DIRECTIONS = ('lv-ru', 'ru-en', 'en-ja')
SMALL_KANA = set('ぁぃぅぇぉゃゅょっゎゕゖァィゥェォャュョッヮヵヶー')

def kana(char):
    return '\u3041' <= char <= '\u3096' or '\u30a1' <= char <= '\u30fa' or char == 'ー'

def load_readings(root, course):
    content = root / 'content'
    base = content / 'readings'
    require(base.is_dir(), 'reading modules are required')
    require({p.name for p in base.iterdir() if p.is_dir()} == set(DIRECTIONS), 'reading direction directories differ')
    bank = {p['id']: p for p in course['phrases']}
    result = {}
    for direction in DIRECTIONS:
        require(direction in course['directions'], 'reading direction is unavailable')
        files = {p.name for p in (base / direction).iterdir()}
        require(files == {lesson['id'] + '.json' for lesson in course['lessons']}, f'{direction}: reading block coverage differs')
        entries = {}
        for lesson in course['lessons']:
            module = read_module(content, f'readings/{direction}/{lesson["id"]}.json')
            require(module.get('schemaVersion') == 1 and module.get('direction') == direction and module.get('blockId') == lesson['id'], 'reading module identity differs')
            require(module.get('reviewStatus') == 'draft-human-review-pending', 'reading review status must remain explicit')
            items = module.get('entries')
            expected = {p['phraseId'] for p in lesson['prompts']}
            require(isinstance(items, dict) and set(items) == expected, 'reading concept coverage differs')
            for concept_id, entry in items.items():
                require(concept_id not in entries, 'duplicate reading concept')
                original = bank[concept_id][direction.split('-')[1]]
                require(isinstance(entry, dict) and entry.get('text') == original, 'reading target text mismatch')
                segments = entry.get('segments')
                require(isinstance(segments, list) and segments and len(segments) <= len(original), 'invalid reading segments')
                for segment in segments:
                    require(isinstance(segment, dict) and isinstance(segment.get('text'), str) and segment['text'] and isinstance(segment.get('reading'), str) and segment['reading'], 'empty reading segment')
                    require(set(segment) <= {'text', 'reading', 'note', 'combinedReading'}, 'unknown reading segment field')
                    require('combinedReading' not in segment or (direction == 'en-ja' and text(segment['combinedReading']) and re.fullmatch(r'[a-z]+', segment['combinedReading'])), 'invalid combined reading')
                    require('note' not in segment or text(segment['note']), 'empty reading note')
                    require(not any(ord(c) < 32 for c in segment['reading']), 'control character in reading')
                    if direction == 'en-ja':
                        require(not any(kana(c) for c in segment['text']) or len(segment['text']) == 1, 'Japanese kana must have individual readings')
                        require(re.fullmatch(r"[a-zA-Z ()'—-]+", segment['reading']) is not None, 'Japanese reading must use romaji')
                        require(segment['text'] not in SMALL_KANA or text(segment.get('note')), 'small kana needs a role explanation')
                    elif direction == 'ru-en':
                        require(not re.search(r'[A-Za-z]', segment['reading']) and re.search(r'[А-Яа-яЁё]', segment['reading']), 'English guide must use Cyrillic')
                    else:
                        require(not re.search(r'[А-Яа-яЁё]', segment['reading']) and re.search(r'[A-Za-zāčēģīķļņšūž]', segment['reading']), 'Russian guide must use Latvian letters')
                require(''.join(s['text'] for s in segments) == original, 'reading segments do not reconstruct target')
                entries[concept_id] = entry
        require(set(entries) == set(bank), 'reading course coverage differs')
        result[direction] = entries
    return {'schemaVersion': 1, 'reviewStatus': 'draft-human-review-pending', 'directions': result}
