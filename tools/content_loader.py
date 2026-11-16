"""Assemble checked block/language modules into one runtime pack with validated identity bindings."""
import json
from pathlib import Path
import re
import unicodedata

ID = re.compile(r'^[a-z][a-z0-9-]*$')
LANGUAGE = re.compile(r'^[a-z]{2,3}$')

def require(condition, message):
    if not condition:
        raise ValueError(message)

def text(value):
    return isinstance(value, str) and bool(value.strip())

def unique_object(pairs):
    result = {}
    for key, value in pairs:
        require(key not in result, f'duplicate JSON key: {key}')
        result[key] = value
    return result

def read_module(content, filename):
    require(text(filename), 'module filename is required')
    path = (content / filename).resolve()
    require(path.is_relative_to(content.resolve()) and path.suffix == '.json', f'module path is outside content: {filename}')
    try:
        value = json.loads(path.read_text(encoding='utf-8'), object_pairs_hook=unique_object)
    except (OSError, ValueError) as error:
        raise ValueError(f'cannot read {filename}: {error}') from error
    require(isinstance(value, dict), f'{filename}: expected an object')
    return value

def load_content(root: Path):
    content = root / 'content'
    catalog = read_module(content, 'catalog.json')
    contract = read_module(content, 'ui-contract.json')
    require(contract.get('schemaVersion') == 1 and isinstance(contract.get('staticKeys'), list) and contract['staticKeys'] and isinstance(contract.get('messages'), dict) and contract['messages'], 'invalid UI application contract')
    required_static = set(contract['staticKeys'])
    required_messages = set(contract['messages'])
    require(catalog.get('schemaVersion') == 1, 'unsupported catalog schema')
    for key in ['id', 'contentVersion', 'agePath', 'reviewStatus']:
        require(text(catalog.get(key)), f'catalog requires {key}')
    language_refs = catalog.get('languages')
    block_refs = catalog.get('blocks')
    require(isinstance(language_refs, list) and len(language_refs) >= 2, 'at least two language modules are required')
    require(isinstance(block_refs, list) and block_refs, 'at least one block module is required')
    require(all(isinstance(ref, dict) for ref in [*language_refs, *block_refs]), 'catalog module references must be objects')
    languages = [entry.get('id') for entry in language_refs]
    require(all(isinstance(code, str) and LANGUAGE.fullmatch(code) for code in languages), 'language IDs must be two or three lowercase letters')
    require(len(set(languages)) == len(languages), 'duplicate language ID')
    direction = catalog.get('defaultDirection', '')
    pair = direction.split('-') if isinstance(direction, str) else []
    require(len(pair) == 2 and pair[0] != pair[1] and all(code in languages for code in pair), 'invalid default direction')

    definitions = read_module(content, catalog.get('conceptsFile'))
    require(definitions.get('schemaVersion') == 1 and isinstance(definitions.get('concepts'), list) and definitions['concepts'], 'invalid concept registry')
    meanings = {}
    forms = {}
    for concept in definitions['concepts']:
        concept_id = concept.get('id')
        require(text(concept_id) and ID.fullmatch(concept_id) and concept_id not in meanings and text(concept.get('meaning')), f'invalid or duplicate concept: {concept_id}')
        meanings[concept_id] = concept['meaning']
        forms[concept_id] = concept.get('form')

    blocks = []
    used_ids = set(meanings)
    for ref in block_refs:
        block = read_module(content, ref.get('file'))
        block_id = block.get('id')
        require(text(block_id) and ID.fullmatch(block_id) and ref.get('id') == block_id and block_id not in used_ids, f'block identity mismatch or duplicate: {block_id}')
        require(text(block.get('title')) and isinstance(block.get('prompts'), list) and len(block['prompts']) == 10, f'{block_id}: expected ten questions and a review title')
        used_ids.add(block_id)
        prompts = []
        for prompt in block['prompts']:
            prompt_id = prompt.get('id')
            require(text(prompt_id) and ID.fullmatch(prompt_id) and prompt_id not in used_ids, f'duplicate or invalid question: {prompt_id}')
            used_ids.add(prompt_id)
            concept_id = prompt.get('phraseId')
            require(concept_id in meanings, f'{prompt_id}: unknown question concept {concept_id}')
            require(prompt.get('correctAnswerId') == concept_id, f'{prompt_id}: correctAnswerId must identify the same concept as phraseId')
            wrong = prompt.get('distractorIds')
            require(isinstance(wrong, list) and len(wrong) == 3 and all(text(key) for key in wrong), f'{prompt_id}: expected three distractor IDs')
            choices = [concept_id, *wrong]
            require(len(set(choices)) == 4 and all(key in meanings for key in choices), f'{prompt_id}: duplicate or unknown answer concept')
            prompts.append({'id': prompt_id, 'phraseId': concept_id, 'correctAnswerId': concept_id, 'distractorIds': wrong})
        blocks.append({'id': block_id, 'title': block['title'], 'prompts': prompts})

    translations = {}
    locales = {}
    lesson_ids = {block['id'] for block in blocks}
    for ref in language_refs:
        code = ref['id']
        module = read_module(content, ref.get('file'))
        require(module.get('schemaVersion') == 1 and module.get('id') == code, f'{code}: language module identity mismatch')
        entries = module.get('translations')
        require(isinstance(entries, dict) and set(entries) == set(meanings), f'{code}: missing or unknown translation IDs')
        translations[code] = {}
        for concept_id, meaning in meanings.items():
            item = entries[concept_id]
            require(isinstance(item, dict) and item.get('conceptId') == concept_id, f'{code}/{concept_id}: conceptId mismatch')
            require(item.get('meaning') == meaning, f'{code}/{concept_id}: meaning differs from canonical concept; review translation')
            require(text(item.get('text')), f'{code}/{concept_id}: translation is empty')
            translations[code][concept_id] = item['text']
        ui = module.get('ui')
        require(isinstance(ui, dict), f'{code}: missing UI pack')
        for group in ['static', 'messages', 'lessons']:
            require(isinstance(ui.get(group), dict) and ui[group] and all(text(value) for value in ui[group].values()), f'{code}: invalid UI {group}')
        require(set(ui['static']) == required_static, f'{code}: UI static keys differ from application contract')
        require(set(ui['messages']) == required_messages, f'{code}: UI messages keys differ from application contract')
        for key, value in ui['static'].items():
            require(not re.findall(r'\{(\w+)\}', value), f'{code}/{key}: UI static placeholder is not declared')
        for key, expected in contract['messages'].items():
            require(isinstance(expected, list) and sorted(re.findall(r'\{(\w+)\}', ui['messages'][key])) == sorted(expected), f'{code}/{key}: UI placeholder differs from application contract')
        require(set(ui['lessons']) == lesson_ids, f'{code}: missing or unknown block titles')
        require(isinstance(ui.get('names'), dict) and set(ui['names']) == set(languages), f'{code}: language names do not match catalog')
        for language, name in ui['names'].items():
            require(isinstance(name, dict) and text(name.get('label')) and text(name.get('target')), f'{code}/{language}: invalid language names')
        locales[code] = ui

    first_ui = locales[languages[0]]
    for code, ui in locales.items():
        for group in ['static', 'messages', 'lessons']:
            require(set(ui[group]) == set(first_ui[group]), f'{code}: UI {group} keys differ')
            for key, value in ui[group].items():
                require(sorted(re.findall(r'\{(\w+)\}', value)) == sorted(re.findall(r'\{(\w+)\}', first_ui[group][key])), f'{code}/{key}: UI placeholders differ')
    for block in blocks:
        for prompt in block['prompts']:
            for code in languages:
                options = [unicodedata.normalize('NFC', translations[code][key]).strip().casefold() for key in [prompt['correctAnswerId'], *prompt['distractorIds']]]
                require(len(set(options)) == 4, f'{block["id"]}/{prompt["id"]}/{code}: ambiguous answer text')

    curriculum = catalog.get('curriculum')
    if curriculum is not None:
        require(isinstance(curriculum, dict) and curriculum.get('kind') == 'basic-words-and-phrases', 'unsupported curriculum policy')
        target = curriculum.get('targetItems')
        maximum = curriculum.get('maxWordsPerItem')
        introductory = curriculum.get('introductoryBlocks')
        require(type(target) is int and target > 0 and type(maximum) is int and maximum > 0 and type(introductory) is int and 0 < introductory <= len(blocks), 'invalid vocabulary curriculum limits')
        active_ids = [prompt['phraseId'] for block in blocks for prompt in block['prompts']]
        require(len(active_ids) == target and len(set(active_ids)) == target, 'vocabulary target requires distinct learning items')
        require(len({meanings[key].strip().casefold() for key in active_ids}) == target, 'duplicate meanings inflate the vocabulary target')
        for concept_id in active_ids:
            require(forms[concept_id] in ['word', 'phrase'], f'{concept_id}: vocabulary items must be words or phrases')
            for code in languages:
                value = translations[code][concept_id]
                require(len(value.split()) <= maximum and not re.search(r'[.!?]', value), f'{code}/{concept_id}: vocabulary items must stay short, without sentence punctuation')

    course = {**{key: catalog[key] for key in ['id', 'contentVersion', 'agePath', 'reviewStatus']},
              'schemaVersion': 2, 'defaultDirection': direction, 'languages': languages,
              'phrases': [{'id': key, **{code: translations[code][key] for code in languages}} for key in meanings], 'lessons': blocks}
    return course, locales
