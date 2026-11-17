# First-block Russian–Latvian audio test

Scope: add pronunciation for the first ten questions (basic-01, vocab-0001 through vocab-0010) in Russian and Latvian only. Existing vocabulary, grading, navigation and other blocks remain unchanged. English receives no audio in this slice.

Approach: bundle twenty pronunciation clips, one per meaning per language. This makes playback independent of installed device voices and suitable for offline testing. Device speech synthesis is an alternative, but language availability and pronunciation vary by device. Bundled clips are the recommended approach; the recording source and pronunciation still require verification.

Modules:
- audio/ru/ and audio/lv/: individually replaceable clips named by permanent vocabulary ID.
- content/audio/manifest.json: language and vocabulary ID mapped to clip path, spoken text, content revision and provenance. Missing entries mean audio is unavailable, never a guessed-language fallback.
- web/audio-player.js: isolated playback, replay, cancellation and error reporting; no learning-state logic.
- Localized UI: replay control and clear unavailable/playback-error text.
- Build tooling: validate manifest bindings and embed the twenty clips in the portable HTML. Authors edit modules; generated HTML remains build output.

Proposed interaction: automatically speak the correct target-language translation after each answer and allow replay of that translation. Keep the existing 500 ms question transition; playback may continue across it. Restart/direction changes stop playback and invalidate stale callbacks. Replay identifies the last answered translation so it cannot be confused with the new question. Never play overlapping clips.

Validation: first-block coverage in both languages; no audio beyond the ten IDs; correct target-language binding; cancellation, replay and missing-asset behavior; unchanged engine regression suite; build/download parity. Actual sound and controls require browser testing; fluent pronunciation review remains separate.

Delivery: update the existing review work without merging or publishing, then replace the test HTML in the default Drive folder Git_dump/language-learning-app (folder ID 1U6ewdAD-HsthuchnzVOeWOSs4hmM-EAX). Preserve the Drive file ID when updating it.
