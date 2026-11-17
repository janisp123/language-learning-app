# English to Japanese implementation plan

> Execute inline after verified 0.4.6 Drive delivery; owner explicitly authorized this separate slice and selected Japanese script only.

**Goal:** Add English→Japanese as the seventh and only new direction, using the existing 510 meanings and learning rules.
**Architecture:** Catalog schema 2 requires an explicit directed allowlist; legacy archive schema 1 is compiled with its original combinations. Compiled runtime directions are always explicit and engine validation fails closed if missing/malformed. UI packs are required for source languages only; Japanese is target-only and reuses the English interface. Existing source-only English audio covers en-ja, so no Japanese recordings or runtime synthesis are needed.
**Tech stack:** Existing JSON, JavaScript and Python; no dependencies.
**Spec:** Owner request 2026-11-17; seven exact directions, script only, no saved learner state. Base is delivered autoplay/footer PR #8.

## Constraints/review focus
- Preserve all existing IDs, translations, question/answer bindings, original locks, 1,530 clips and all six existing directions.
- Exactly lv-ru, lv-en, ru-lv, ru-en, en-lv, en-ru, en-ja are offered/accepted. Missing, duplicate, malformed and undeclared runtime directions fail closed, including forged session state.
- All 510 Japanese translations bind canonical meanings; choices must remain distinct. No romaji/readings UI. Fluent human review remains pending.
- English interface, current English prompt audio, 500 ms answer transitions, mistakes/completion and fresh-session reset remain intact.
- No accounts, tracking, preferences or storage. No merge/public deployment.

## Tasks
- [ ] Add failing source/runtime tests for exact allowlist, absent/malformed directions, forbidden Japanese directions/forged state, full Japanese translations, English interface/audio and completion.
- [ ] Implement validated directions through catalog/content_loader/core/build_browser/app/audio_loader. Keep legacy archive compilation and explicit synthetic modular-extension tests.
- [ ] Add target-only Japanese translation module, Japanese language names in three source UI packs and en-ja manifest direction. No new audio files; coverage checks follow source language.
- [ ] Build 0.4.7; run full Node/Python checks, all seven directions through completion, Chromium en-ja wrong/restart/audio/English UI/session reset, original hashes and public package parity. Obtain independent change/content review.
- [ ] Update TD/checkpoint/changelog; push verified source/open separate PR, upload stable Drive only afterward, download and compare exact equality, record/push delivery receipt.
