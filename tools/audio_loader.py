"""Validate optional pronunciation modules and embed their bytes for offline playback."""
import base64
import hashlib
from pathlib import Path
from content_loader import read_module, require, text

def load_audio(root: Path, course: dict, manifest=None):
    if manifest is None:
        manifest = read_module(root/'content', 'audio/manifest.json')
    require(manifest.get('schemaVersion') == 1, 'unsupported audio schema')
    require(manifest.get('contentVersion') == course['contentVersion'], 'stale audio content revision')
    phrases = {p['id']:p for p in course['phrases']}
    directions = manifest.get('directions')
    require(isinstance(directions, list) and directions, 'audio directions required')
    for direction in directions:
        require(isinstance(direction, str) and direction.count('-') == 1, 'invalid audio direction')
        source, target = direction.split('-')
        require(source != target and source in course['languages'] and target in course['languages'] and direction in course['directions'], 'unknown audio direction')
    ui = read_module(root/'content', 'audio/ui.json')
    for language in {direction.split('-')[0] for direction in directions}:
        require(language in ui and all(text(ui[language].get(k)) for k in ['prompt','error']), 'missing audio UI labels')
    require(isinstance(manifest.get('clips'), dict), 'audio clips required')
    require(manifest.get('coverage') in (None, 'all-phrases'), 'unsupported audio coverage policy')
    if manifest.get('coverage') == 'all-phrases':
        for language in {direction.split('-')[0] for direction in directions}:
            require(isinstance(manifest['clips'].get(language), dict) and set(manifest['clips'][language]) == set(phrases), f'incomplete audio coverage: {language}')
    clips = {}
    for language, entries in manifest['clips'].items():
        require(language in course['languages'] and isinstance(entries, dict), 'unknown audio language')
        clips[language] = {}
        for ident, entry in entries.items():
            require(ident in phrases and isinstance(entry, dict) and entry.get('text') == phrases[ident][language], 'audio translation mismatch')
            require(text(entry.get('file')), 'missing audio path')
            path = (root/entry['file']).resolve()
            require(path.is_relative_to((root/'audio').resolve()) and path.suffix == '.mp3', 'unsafe audio path')
            try:
                data = path.read_bytes()
            except OSError as error:
                raise ValueError('missing audio clip') from error
            require(len(data) > 100 and (data.startswith(b'ID3') or data[0] == 255), 'invalid MP3 clip')
            require(hashlib.sha256(data).hexdigest() == entry.get('sha256'), 'audio checksum mismatch')
            clips[language][ident] = {'text':entry['text'], 'src':'data:audio/mpeg;base64,' + base64.b64encode(data).decode('ascii')}
    return {'directions':directions, 'clips':clips, 'ui':ui}
