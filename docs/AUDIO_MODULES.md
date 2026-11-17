# Editing pronunciation without rebuilding the app's logic

Current test slice: first ten vocabulary items, Russian ↔ Latvian only. Twenty MP3 clips are bundled; other questions and directions have no audio. Speech is synthetic (Google Translate TTS via gTTS 2.5.4), generated from the canonical text; fluent pronunciation review is pending. The learner's browser makes no synthesis/network request.

| Change | Edit | What stays independent |
| --- | --- | --- |
| Replace one pronunciation | `audio/<language>/<vocabulary-id>.mp3`, update its checksum in `content/audio/manifest.json` | Questions, engine, player |
| Add pronunciation coverage | Register IDs/languages and paths in the manifest, add corresponding clips | Player and grading engine |
| Change replay wording | `content/audio/ui.json` | Vocabulary and recordings |
| Change playback/cancellation | `web/audio-player.js` | Rendering and engine |
| Change replay presentation | `web/audio-view.js`, audio controls in `web/index.html` | Player and engine |
| Change offline assembly/validation | `tools/audio_loader.py` | Content and learning rules |

The manifest uses stable vocabulary IDs, exact spoken text, content revision and SHA-256 hashes. The loader checks identity/text, local asset paths, revision and checksums, and embeds bytes. It fails on mismatches rather than guessing a language. `directions` is explicit: clips for Russian alone do not accidentally enable English→Russian. Optional audio labels are required for enabled source directions; a new content language need not supply sound to remain usable.

## One-clip editing workflow

1. Keep meaning and stable ID aligned with canonical translations. A vocabulary change still follows `CONTENT_MODULES.md` and the existing content-lock review; audio is not a bypass.
2. Replace the MP3 and update its `text`/`sha256` manifest entry, or regenerate just that registered clip:
   `python tools/generate_audio.py --language ru --id vocab-0001`
   Optional generator dependencies are pinned in `tools/audio-requirements.txt`. Generation needs network access; ordinary tests/builds do not. The generator never changes other clips. Human recordings may replace synthetic clips through the same manifest.
3. Run `npm test` and `python -m unittest discover -s tests -p 'test_*.py'`.
4. Build with `python tools/build_browser.py`; copy the resulting HTML to `downloads/language-learning-test.html` and verify equality. Hosted and downloadable output use the same builder.

## Interfaces and behavior

`LanguageAudio.create(pack, audioFactory)` returns `play(id, language, exactText, onError)` and `stop()`. The Audio factory is the only media boundary. The browser supplies a dedicated audio element; tests inject a media boundary without mocking the engine. `play` returns true after playback starts, false on failure, or null for a cancelled stale attempt. Decoder errors after startup use the guarded error callback. New playback cancels the previous clip.

`LanguageAudioView.create(document, pack, player)` returns `localize(source)`, `answer(shown, feedback)`, `reset()`. It owns the previous-answer label, replay and visible errors. The app coordinator has four small integration calls; `core/engine.js` remains unchanged. Correct translations are spoken after both correct and incorrect answers. The original 500 ms navigation remains; replay always labels the prior translation. Restart/direction changes invalidate pending audio callbacks and stop sound.

## Lessons carried forward from the questionnaire app

Read-only references: its `docs/FEATURE_DEVELOPMENT.md` and `AGENTS.md`, plus this app's `PROJECT_PLAYBOOK.md`.

- One canonical source and deterministic distribution output; never hand-edit distributed HTML.
- Small modules with explicit input/output contracts; no generic plugin framework or speculative rewrite.
- Permanent content IDs and validated bindings; wording never selects a grading answer.
- A new language/block is data, not another application engine.
- Focused regressions at real module boundaries, then full-suite checks.
- Exact checkpoints and stable Drive file IDs; distinguish source, review branch, uploaded build and public release.
- User-facing notes describe behavior; technical coordination belongs here.

## Verification and delivery

2026-11-17: 36 Node tests and 16 Python tests pass, including existing active/archive content locks and data-only block/language extensions. All twenty clips decode through ffmpeg. Chrome preview verified Russian and Latvian media duration, played ranges, readyState 4, embedded data URLs, replay and restart cancellation. These are playback checks, not fluent pronunciation certification.

Cloud Chrome blocks `file://` navigation, so actual downloaded-file opening and physical phone tests remain NOT RUN. The self-contained HTML and embedded MP3 bytes are verified by the builder/tests; no network dependency is introduced at runtime. No merge or public release performed.

Default Drive distribution: `Git_dump/language-learning-app`, folder ID `1U6ewdAD-HsthuchnzVOeWOSs4hmM-EAX`. Stable test HTML file ID: `1594pGCAm3E7hOq0-oSwLFh8z4WtRI3vd`. Preserve this ID during future updates. Repository source remains authoritative.
