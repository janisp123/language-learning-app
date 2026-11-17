# Current working checkpoint

As of 2026-11-17. **DONE: Japanese answer audio repair (0.4.9), landing-page EN/RU/LV controls and dark mode are implemented, tested, pushed, merged and publicly deployed.** Owner explicitly approved merging PRs #14 and #15 and publishing. PR #14 merged at 94a6da2219b67574b63351733b5dea53c91db697; PR #15 at 782f69185efb925c708f4eda7c97d6842171c646. No unrelated PRs merged.

## Public website and delivery evidence

- Website: https://janisp123.github.io/language-learning-app/
- Direct app: https://janisp123.github.io/language-learning-app/learn/
- Portable HTML: https://janisp123.github.io/language-learning-app/language-learning-test.html

Pages workflow 44119527089 succeeded for final main 782f691; main CI 44119527070 passed. HTTPS public landing/app/download returned 200 with default TLS verification. Public landing matches canonical source (SHA-256 12e45b5199675d4118918e9857a0c527d09e0cf525a9361580d5d409d635d3d0). Hosted app/download match canonical source and the verified Drive file exactly: 21,384,026 bytes, SHA-256 341e5c54a5c127bbc36a2217ebe8b26d21030fa2a954316122d5f0f059e68d68. Receipt: delivery/2026-11-17-japanese-audio-landing-deployment.json. Stable Drive file 1594pGCAm3E7hOq0-oSwLFh8z4WtRI3vd remains this exact 0.4.9 artifact, pushed before upload and downloaded back for comparison (delivery/2026-11-17-japanese-audio-drive-sync.json).

## Current behavior

Every answer speaker plays its exact target-language option without selecting, grading, reshuffling or navigating. The missing Japanese recordings are fixed: all 510 Japanese translations have bundled MP3s, with all 1,530 original clip bytes/manifest records unchanged; total 2,040. Audio coverage validation now requires source and target languages, preventing absent Japanese clips from passing builds. Existing player/UI, current-prompt autoplay, 500 ms transitions and scoring are unchanged.

Landing header EN/RU/LV buttons translate the entire page, accessible labels and metadata, including illustrative glosses while preserving original example language tags. Dark toggle switches the page theme. Default English/light returns on reload; neither choice is saved. Learn/Drive/source links and exact Made by Janis Paegle 2026 credit remain intact.

All 510 meanings/51 blocks and question/correct-answer/distractor/translation IDs remain unchanged. Exactly seven directions: lv-ru, lv-en, ru-lv, ru-en, en-lv, en-ru, en-ja. English→Japanese retains English UI/source audio and now Japanese answer audio; no reverse Japanese or LV/RU Japanese pairings. Zero learner-state saves on every platform: session memory only, every reload/process starts lesson 1. No saved preferences, records/history, export/import, accounts or tracking. Android/Play remains unimplemented/unpublished.

## Verification

Combined local 45 Node / 29 Python tests pass; CI passes (optional browser test explicitly skips where tools are absent). Independent code/asset review verified all new clips and original-byte preservation. Independent landing review found untranslated glosses, fixed after direct failing regression.

Hosted Chromium independently decoded all 510 Japanese clips with non-silent waveforms and exact bindings, traversed 510 en-ja prompts and 2,040 answer bindings without grading; actual playback/keyboard/timing/cancellation/storage/reload checks passed. Hosted landing checks exercised all 3 languages and both themes at 320/1280 px with keyboard, metadata, translated glosses, no horizontal overflow, unchanged links/credit and English/light reload reset. Browser receipts: delivery/2026-11-17-japanese-audio-hosted-browser.json and delivery/2026-11-17-landing-controls-hosted-browser.json. Headless environment certificate trust was bypassed for browser checks; independent full-byte HTTPS readback uses default TLS validation.

Fluent human translation/pronunciation, physical-device and full-screen-reader review remain pending. Earlier publication docs-only PRs #11/#13 preserve historical evidence; their stale checkpoint text must not overwrite later state.

Next: collect human/device/accessibility review. No unrelated backlog work is automatically authorized. Future requested edits reuse existing canonical sources and checked PR/main-only Pages workflow, then verify hosted bytes and browser behavior.
