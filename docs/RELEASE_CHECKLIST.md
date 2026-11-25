# Release checklist — not a release announcement

**Browser0.5.7 is publicly deployed;Android/Google Play are not implemented.** See the [current checkpoint](WORK_CHECKPOINT.md) and [verified live receipt](delivery/2026-11-24-polite-defaults-live.json). Use this checklist for subsequent authorized releases;dated planning rules are superseded by current owner decisions.

## Before publishing the browser version
- [ ] Real `Learn` button opens a functioning lesson from the actual GitHub Pages public URL.
- [ ] All six directions between Latvian, Russian and English plus English→Japanese tested with human-readable, checked content. Entire UI follows the source language (LV, RU or EN), including load-error direction changes, completion and accessible labels; prompt/answer language tags remain correct.
- [ ] Correct goes forward, incorrect one prompt back, **ten consecutive correct** completes a lesson; answer locations reshuffle. Each block has ten questions; the third cumulative mistake in one block restarts at lesson 1/question 1. Check nonconsecutive mistakes and count reset on block completion.
- [ ] Close/reload starts at lesson 1; no saved browser progress, analytics, cookies, IndexedDB or server calls.
- [ ] Mobile layouts, large touch targets, readable language/audio, keyboard behavior and screen-reader basics checked.
- [ ] No fake Google Play link; landing page accurately says what is currently available.
- [ ] CI generates the canonical offline HTML before tests, verifies deterministic output and stages identical tested bytes for online/offline Pages routes. Deployed site readback matches verified CI artifact/source/version; direct navigation and HTTPS verified. Do not commit generated HTML.

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
- [ ] README, visible build badges in all source languages, current testing/audio guidance, screenshot and latest checkpoint agree with actual version, course selector, playback and allowed directions. Put the newest verified delivery before historical notes; do not erase old evidence.
- [ ] Work checkpoint reflects the exact tested or published state and one next action.
- [ ] Unverified items remain clearly marked TODO/BLOCKED, not quietly passed.

**Approved Full curriculum:** 51 blocks of ten questions / 510 basic words and short phrases; first ten blocks remain introductory words/short phrases and full practical requests start at block 11. Check every block in all six directions, including source audio for the ten new items. Preserve stable meanings/IDs and unrelated bindings/recordings; owner-approved corrections need exact regression exceptions and synchronized assets. Basic Kids/Adults100 each and en-ja are authorized additions;do not treat older blanket exclusions as overriding them. Payments, ads, accounts and cloud learner state remain out of scope.
