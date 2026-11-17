# Current working checkpoint

As of 2026-11-17. Repository: janisp123/language-learning-app.

## Current source and behavior

- Main remains 0eca173; implementation continues in open PR #6, feat/testable-browser-app, from a811593. No merge or public publication.
- Browser build 0.4.1 retains 500 vocabulary items/50 blocks and all existing text directions. Audio scope is only first ten questions (vocab-0001…vocab-0010), Russian ↔ Latvian.
- Twenty embedded synthetic pronunciation clips; correct-target audio after either answer outcome, plus labeled previous-answer replay. Existing 500 ms transitions/three-mistake rules unchanged. Restart/direction changes stop audio.
- Independent manifest, loader, player and view modules: see AUDIO_MODULES.md. Changing one clip requires one asset/manifest update, not engine changes. Content/archived identity locks remain intact.

## Verification

36 Node and 16 Python tests pass. All twenty MP3 files decode. Chrome preview verified embedded playback, played ranges, replay and restart cancellation in both target languages. Cloud Chrome rejects file://, so actual downloaded-file opening, physical phones and fluent pronunciation review remain NOT RUN. Android/release/licensing remain unfinished.

## Distribution

Default Drive folder: Git_dump/language-learning-app, ID 1U6ewdAD-HsthuchnzVOeWOSs4hmM-EAX. Stable HTML ID 1594pGCAm3E7hOq0-oSwLFh8z4WtRI3vd. Source commit and Drive checksum readback will be recorded after delivery; do not infer remote synchronization from local files.

## One next action

Finish source push and verified Drive replacement, then owner tests sound on their device. Earlier implementation history: history/WORK_CHECKPOINT-before-first-block-audio.md. Broader architecture PR #3 and workflow PR #4 remain separate.
