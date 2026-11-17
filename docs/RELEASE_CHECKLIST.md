# Release checklist — not a release announcement

**A public draft browser build 0.4.7 is hosted on GitHub Pages (2026-11-17); Android/Play remains unpublished.** Use this checklist only when the relevant implementation task reaches verification.

## Before publishing the browser version
- [ ] Real `Learn` button opens a functioning lesson from the actual GitHub Pages public URL.
- [ ] All six directions between Latvian, Russian and English tested with human-readable, checked content. Entire UI follows the source language (LV, RU or EN), including load-error direction changes, completion and accessible labels; prompt/answer language tags remain correct.
- [ ] Correct goes forward, incorrect one prompt back, **ten consecutive correct** completes a lesson; answer locations reshuffle. Each block has ten questions; the third cumulative mistake in one block restarts at lesson 1/question 1. Check nonconsecutive mistakes and count reset on block completion.
- [ ] Close/reload starts at lesson 1; no saved browser progress, analytics, cookies, IndexedDB or server calls.
- [ ] Mobile layouts, large touch targets, readable language/audio, keyboard behavior and screen-reader basics checked.
- [ ] No fake Google Play link; landing page accurately says what is currently available.
- [ ] Deployed site readback matches verified source/version; direct navigation and HTTPS verified.

## Before building/publishing Android
- [ ] Android and browser agree on the same test cases and canonical lesson IDs/translations.
- [ ] Actual Android release build installed and used on a physical device; required content available offline.
- [ ] Zero learner-state writes: no lesson record, position, answers, counters, history or preferences in files, databases, native preferences or cloud storage.
- [ ] No progress export/import or OS backup/state-restoration. Fresh session/process, activity recreation after process death, update and device restoration begin at lesson 1 with no recovered progress or record-based congratulation.
- [ ] No Save/Restore controls. Privacy text accurately states that learner progress exists only in current session memory; no unnecessary permissions or tracking.
- [ ] Age-targeting, Families policy (if applicable), and current Play content/policy disclosures reviewed **using current Google requirements**.
- [ ] Signing, package name, versioning, store artwork, screenshots, support contacts and listing claims reviewed; avoid exposing personal/family data.
- [ ] Current Play Console closed-testing and account eligibility requirements checked. The owner performs identity/account actions.
- [ ] Owner explicitly approves public release; live listing URL independently confirmed before enabling Play download button.

## Before marking a task DONE
- [ ] Modular content loader, independent UI contract, runtime answer-binding checks and active/archive content identity digests pass; authored modules are the only editable content source.
- [ ] Relevant TD item references a PR/commit and the tests that were actually run.
- [ ] Changelog records implementation/verification attribution accurately.
- [ ] Work checkpoint reflects the exact tested or published state and one next action.
- [ ] Unverified items remain clearly marked TODO/BLOCKED, not quietly passed.

**Approved curriculum:** 51 blocks of ten questions / 510 basic words and short phrases; first ten blocks remain introductory words/short phrases and full practical requests start at block 11. Check every block in all six directions, including source audio for the ten new items. Original 500 meanings/bindings and 1,500 old clips must remain unchanged. Payments, ads, accounts, cloud data and additional languages/ages remain out of scope.


Public draft evidence: delivery/2026-11-17-pages-deployment.json and delivery/2026-11-17-pages-browser.json. Owner approved integration/publication; final fluent human, physical-device and full screen-reader checks above remain pending.
