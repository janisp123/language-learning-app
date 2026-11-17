# Current-prompt autoplay and footer implementation plan

> Execute inline using the existing dependency-free runtime. Owner supplied exact behavior and explicitly ordered implementation and review delivery before Japanese.

**Goal:** Automatically pronounce each displayed prompt once and add the requested author credit.
**Architecture:** Call the existing guarded replay path from `LanguageAudioView.question(shown)` after binding a valid source clip. Existing reset/generation handling cancels old media and stale errors. No engine, course, recording or storage changes.
**Spec:** Owner request, 2026-11-17; source baseline PR #7 head 51878efa1b53c6437230f471867a0db469c51c88, main inspected at 85e4dc400fe58075df806cf5d03d3c757a9f49bf.

## Constraints and review focus
- First question, advance, wrong-answer return and restart each trigger one current-source playback attempt. No answer audio.
- Rejected autoplay leaves replay enabled; stale rejections must not affect the next prompt.
- Preserve 500 ms answer timing, scoring, six directions, all content/audio bytes and zero saved state.
- Footer reads exactly “Made by Janis Paegle 2026”, linking the name to https://github.com/janisp123 and preserving source links.
- Review delivery only; no merge/public deployment.

## Tasks
- [ ] Add failing autoplay, blocked-playback/replay and stale-error regressions in tests/audio-view.test.cjs; adjust standalone UI expectations and exercise wrong returns/restarts.
- [ ] Observe missing-autoplay failures, then minimally update web/audio-view.js. Update web/index.html and docs/discovery-preview/index.html footer; bump package.json review version to 0.4.6.
- [ ] Rebuild canonical download; run full Node/Python suites and Chromium flow/media checks where available. Verify original locks/audio unchanged and source/site/download parity.
- [ ] Update TD/checkpoint/changelog, commit and push isolated branch, open checked PR. Replace stable Drive review file only after verified source push; download back and compare exact bytes. Record delivery evidence and push receipt.
- [ ] Only then start a separate English→Japanese slice, resolving reading preference and explicitly allowing seven directions.
