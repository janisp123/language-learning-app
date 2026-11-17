# Editing pronunciation without rebuilding the app's logic

Current scope: all 510 vocabulary items in Latvian, Russian and English across all six directions, with 1,530 bundled MP3 clips. Version 0.4.5 adds thirty recordings for the ten practical-core entries and preserves all original 1,500 clips. The current prompt automatically attempts playback once each time it appears; the speaker replays only that prompt in its source language; previous-answer replay and automatic answer audio remain removed. The media player and learning engine are unchanged. Russian/Latvian speech uses Google Translate TTS via gTTS; English uses Flite cmu_us_slt offline. Fluent pronunciation review is pending. The learner's browser makes no synthesis/network request.

| Change | Edit | What stays independent |
| --- | --- | --- |
| Replace one pronunciation | `audio/<language>/<vocabulary-id>.mp3`, update its checksum in `content/audio/manifest.json` | Questions, engine, player |
| Add pronunciation coverage | Register IDs/languages and paths in the manifest, add corresponding clips | Player and grading engine |
| Change replay wording | `content/audio/ui.json` | Vocabulary and recordings |
| Change playback/cancellation | `web/audio-player.js` | Rendering and engine |
| Change replay presentation | `web/audio-view.js`, audio controls in `web/index.html` | Player and engine |
| Change offline assembly/validation | `tools/audio_loader.py` | Content and learning rules |

The manifest uses stable vocabulary IDs, exact spoken text, content revision and SHA-256 hashes. The loader checks identity/text, local asset paths, revision and checksums, and embeds bytes. It fails on mismatches rather than guessing a language. `directions` explicitly enables each translation pair. The `coverage: "all-phrases"` policy requires a recording for every canonical phrase in each enabled source language; a missing clip or missing language fails the build. Optional audio labels are required for enabled source directions; a new content language need not supply sound to remain usable.

## One-clip editing workflow

1. Keep meaning and stable ID aligned with canonical translations. A vocabulary change still follows `CONTENT_MODULES.md` and the existing content-lock review; audio is not a bypass.
2. Replace the MP3 and update its `text`/`sha256` manifest entry, or regenerate just that registered clip:
   `python tools/generate_audio.py --language ru --id vocab-0001`
   Online generator dependencies for Russian/Latvian are pinned in `tools/audio-requirements.txt`. Registered Flite English clips use `tools/local_english.py` instead, requiring installed libflite1 (cmu_us_slt) and ffmpeg only on the authoring machine. The same one-clip command chooses the stable registered `provider` ID (`flite-slt` or `gtts`); descriptive `source` notes can change without changing that choice. English authoring and all ordinary builds work without network access. The generator never changes other clips. Human recordings may replace synthetic clips through the same manifest.
3. Run `npm test` and `python -m unittest discover -s tests -p 'test_*.py'`.
4. Build with `python tools/build_browser.py`; copy the resulting HTML to `downloads/language-learning-test.html` and verify equality. Hosted and downloadable output use the same builder.

## Interfaces and behavior

`LanguageAudio.create(pack, audioFactory)` returns `play(id, language, exactText, onError)` and `stop()`. The Audio factory is the only media boundary. The browser supplies a dedicated audio element; tests inject a media boundary without mocking the engine. `play` returns true after playback starts, false on failure, or null for a cancelled stale attempt. Decoder errors after startup use the guarded error callback. New playback cancels the previous clip.

`LanguageAudioView.create(document, pack, player)` returns `localize(source)`, `question(shown)`, `reset()`. It binds the speaker to the displayed concept ID, source language and exact source text; a missing/mismatched recording hides the unavailable control. Its localized accessible name includes the current word/phrase; visible errors appear beside the prompt. Clicking the speaker never selects an answer, reshuffles choices or changes scoring. Each new prompt, restart, direction change or completion stops current audio and invalidates stale callbacks. The original 500 ms answer navigation remains. The 48 px speaker is a normal keyboard-operable button. `core/engine.js` and the media player remain unchanged.

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

2026-11-17 practical core, 0.4.5: 37 Node and 23 Python tests pass, including the exact approved order/new translations, full traversal and source audio for all 510 prompts/six directions. The original vocabulary digest and old MP3 checksums remain unchanged. Thirty new clips are decoded independently; current browser/Drive delivery evidence is recorded in WORK_CHECKPOINT.md. Earlier version results below are historical.

2026-11-17 current-prompt update, 0.4.4: 37 Node/20 Python tests pass locally. Regressions cover source-language binding for all 500 prompts in six directions, repeat taps without grading changes, no answer-triggered playback, missing/mismatched recordings and cancelled errors. Headless Chromium at 390×844 verifies real playback, keyboard activation, navigation cancellation, a 48 px speaker and no horizontal overflow in each direction. Physical Android remains NOT RUN. This supersedes the old previous-answer interaction; recording coverage is unchanged.

2026-11-17 full pack: 36 Node tests and 20 Python tests pass locally, including all 500 questions in every direction and an actual offline English-authoring regression with gTTS unavailable. The optional authoring tests skip on machines without the local voice/ffmpeg. All 1,500 clips decode. Chrome preview verified English media duration, played ranges, embedded playback, replay/reset cancellation, and English-source UI with Russian-target playback. Human pronunciation and physical-phone review remain pending. English was saved in ten batches of fifty clips; pending records were consolidated into the single active manifest after validation.

Cloud Chrome blocks `file://` navigation, so actual downloaded-file opening and physical phone tests remain NOT RUN. The self-contained HTML and embedded MP3 bytes are verified by the builder/tests; no network dependency is introduced at runtime. No merge or public release performed.

Default Drive distribution: `Git_dump/language-learning-app`, folder ID `1U6ewdAD-HsthuchnzVOeWOSs4hmM-EAX`. Stable test HTML file ID: `1594pGCAm3E7hOq0-oSwLFh8z4WtRI3vd`. Preserve this ID during future updates. Repository source remains authoritative.


English → Japanese uses the existing 510 English prompt recordings. Japanese is a target-only answer language; no Japanese recordings or network synthesis are required for current-prompt playback. Audio directions must be allowed by the course. All 1,530 existing clip records and bytes are preserved.


## Answer speakers (0.4.8)

Each choice is a row containing separate answer and speaker buttons. The speaker binds the option ID, exact target text and target language to an existing bundled clip; it never calls the grading engine. `LanguageAudioView.option(shown, answer, button)` guards stale presentation references and locked controls. Prompt and answer replay use one player, canceling any prior clip. New prompts/reset/completion invalidate old controls and errors. Current-prompt autoplay and 500 ms answer timing remain intact. All four answer speakers work for existing LV/RU/EN audio; Japanese has no bundled clips, so its answer speakers are explicitly labeled unavailable/disabled while answer selection remains available.
