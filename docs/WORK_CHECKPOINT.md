# Current working checkpoint

As of 2026-11-17. Repository: janisp123/language-learning-app. Current review build **0.4.5** is pushed to PR #7 and delivered through the stable Drive file. Integration is PENDING PR; GitHub Pages publication remains BLOCKED on owner setup. Main still contains 0.4.3 at 85e4dc400fe58075df806cf5d03d3c757a9f49bf.

## Current source and behavior

Build source: `67eef5721f0ba3a61bb23009095d0dae5976131c`, content revision `0.5.0-test`. There are 510 survival words/short phrases in 51 ten-question blocks, all six LV/RU/EN directions and 1,530 embedded recordings. The owner authorized implementing the [situation audit](review/2026-11-17-vocabulary-situation-audit.md): all original 500 meanings/translations/prompts/answer bindings and all 1,500 old recordings are retained. Ten needs/repair/help-call/allergy/exclusion items use new IDs vocab-0501–vocab-0510 and basic-51. Pronouns/help are earlier; practical requests follow the introductory 100 items at lesson 11, with the four main action blocks next. Other old blocks retain their former relative order. IDs are independent of display position.

Only the speaker beside the current prompt plays sound on request. Previous-answer replay and automatic answer audio remain removed. The engine/media player, 500 ms transitions, wrong-answer step back, third-block-mistake reset and ten-consecutive completion rules are unchanged.

**Zero learner-state saves on every platform:** current session memory only; no highest record, saved answers/preferences, backups/import/export or OS progress restoration. Every fresh session/reload/process restart starts at lesson 1. Android is not implemented; its future wrapper must follow this rule. PR #3's old persistence assumptions are explicitly superseded. License adoption and Play release also remain unfinished.

## Verification

37 Node and 23 Python tests pass locally after observed missing-feature failures. Both baseline lock files/digests are unchanged: snapshot verification uses recorded order to protect all old meanings/bindings, while dedicated tests pin the approved live order and ten new translations. All original 1,500 MP3 hashes match; thirty new LV/RU/EN clips decode. Independent meaning review and whole-change review found no actionable issue; fluent human review remains pending.

Headless Chromium at 390×844 traversed the first 100 items and played every new phrase in every direction. The request block is lesson 11; current-source binding, cancellation, empty storage and reload-to-lesson-1 pass. Long Latvian request text fits at 320×720. Browser checks use a virtual clock for unchanged 500 ms navigation and actual decoded media for playback. No page errors. See [browser evidence](delivery/2026-11-17-practical-core-browser.json). Prior same-profile browser restart evidence is in the zero-saves receipt. Physical Android and full screen-reader/fluent pronunciation checks remain pending.

GitHub [CI 44082103872](https://github.com/janisp123/language-learning-app/actions/runs/44082103872) succeeded for the build source. CI may skip the two optional local-voice authoring tests where those tools are absent. Source/site/download bytes match. Ordinary builds require no online synthesis or added dependencies.

## Verified review delivery

Default Drive folder: `Git_dump/language-learning-app`, ID `1U6ewdAD-HsthuchnzVOeWOSs4hmM-EAX`. Stable HTML ID: `1594pGCAm3E7hOq0-oSwLFh8z4WtRI3vd`. Version 0.4.5 was replaced in place, downloaded back and compared byte-for-byte: 15,802,419 bytes; SHA-256 `7320a60100a762fc948173eabcea23e070dd23596a08567190457dbca467cbf7`. Source was pushed and CI/review checked before replacement. See [current receipt](delivery/2026-11-17-practical-core-drive-sync.json). Earlier 0.4.3/0.4.4 receipts and the old source bundle remain historical recovery evidence, not current delivery pointers.

## Website setup and one next action

Review/integrate PR #7 through the authorized workflow. The webpage source is built; the owner must enable **Settings → Pages → Build and deployment → Source: GitHub Actions** and report completion. The connected GitHub tools do not expose that setting. Earlier publication run 44053240327 failed at Pages configuration with Get Pages site failed / Not Found; no public URL has been verified.

Then inspect the relevant current publication run and verify the returned URL and hosted hash against the current delivery receipt. Do not retry an old run containing a different build. [The website handoff](discovery-preview/LAUNCH.md) records editable sources, account setup and verification. Preserve the existing merge/publication authorization rules. PR #3 (older architecture) and PR #4 (workflow lessons) remain separate; do not overwrite current product decisions with those stale assumptions.
