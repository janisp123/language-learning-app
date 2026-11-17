# First-block audio implementation plan

Goal: twenty bundled Russian/Latvian pronunciation clips, first ten questions only, with automatic correct-translation playback and replay.
Architecture: validated manifest and independent player/view modules; existing engine is unchanged. The portable build embeds the same canonical assets used for hosted output.
Spec: approved ../specs/2026-11-17-first-block-audio.md.

Global constraints: RU↔LV only; 500 ms navigation retained; no network at runtime or saved progress; stable vocabulary IDs; generated HTML is never edited by hand.

Review focus: stale playback errors after reset, unsupported direction, wrong-language clip, missing/corrupt assets, replay labeling after navigation.

## Task 1 — Audio data and offline assembly
- [x] Add failing Python tests for manifest validation, text/hash drift and embedded coverage.
- [x] Add content/audio/manifest.json and audio/{ru,lv}/vocab-*.mp3; provenance is draft synthetic speech, human review pending.
- [x] Implement tools/audio_loader.py load_audio(root, course) returning a validated embedded pack; reject unsafe paths, wrong text, hash drift and unknown IDs.
- [x] Integrate through tools/build_browser.py; test deterministic build and download parity.

## Task 2 — Independent player and view
- [x] Add failing Node tests for playback, replay, cancellation, errors, scoped directions and stale callbacks.
- [x] Implement web/audio-player.js create(pack, factory) with play(id, language, text), stop(); injected native Audio boundary.
- [x] Implement web/audio-view.js create(document, pack) with answer(shown, feedback), reset(), localize(source); localized strings in content/audio/ui.json.
- [x] Add tiny app integration calls and isolated HTML controls; keep grading/navigation unchanged.
- [x] Run the full existing JS/Python suites, real-browser playback checks when available, and decode all twenty clips.

## Task 3 — Review and delivery
- [x] Document module-editing map and inherited project lessons, source/provenance and verification limits.
- [x] Commit/push the existing review branch without merging; inspect CI.
- [x] Replace the stable Drive test HTML in place and verify uploaded bytes; update testing instructions.
