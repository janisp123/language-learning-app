"""Regenerate one explicitly selected pronunciation clip; never run during normal builds.

Install optional tooling: python -m pip install -r tools/audio-requirements.txt
Run: python tools/generate_audio.py --language ru --id vocab-0001
Online providers receive only canonical vocabulary text. Registered English
Flite clips are authored locally without a network request.
"""
import argparse
import hashlib
import json
from pathlib import Path
from content_loader import load_content, read_module, require

def generate(root, language, ident):
    course, _ = load_content(root)
    manifest = read_module(root/'content', 'audio/manifest.json')
    require(language in course['languages'], 'unknown language')
    phrase = next((p for p in course['phrases'] if p['id'] == ident), None)
    require(phrase is not None, 'unknown vocabulary ID')
    # Explicit manifest registration is the scope boundary. Adding later clips is deliberate.
    require(ident in manifest['clips'].get(language, {}), 'register this clip in the manifest first')
    entry = manifest['clips'][language][ident]
    provider = entry.get('provider', 'gtts')
    require(provider in ('gtts', 'flite-slt'), 'unsupported audio authoring provider')
    path = (root/entry['file']).resolve()
    require(path.is_relative_to((root/'audio').resolve()) and path.suffix == '.mp3', 'unsafe audio path')
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix('.mp3.tmp')
    try:
        if provider == 'flite-slt':
            require(language == 'en', 'the local SLT voice supports English only')
            from local_english import EnglishVoice
            EnglishVoice().render(phrase[language], temporary)
        else:
            from gtts import gTTS
            gTTS(phrase[language], lang=language, timeout=20).save(str(temporary))
        data = temporary.read_bytes()
        require(len(data) > 100, 'empty audio output')
        temporary.replace(path)
    finally:
        temporary.unlink(missing_ok=True)
    entry.update(text=phrase[language], sha256=hashlib.sha256(data).hexdigest())
    manifest['contentVersion'] = course['contentVersion']
    (root/'content/audio/manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--language', required=True)
    parser.add_argument('--id', required=True)
    args = parser.parse_args()
    generate(Path(__file__).resolve().parents[1], args.language, args.id)
