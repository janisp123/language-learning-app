# Release checklist — not a release announcement

**No website app or Play app has been published yet.** Use this checklist only when the relevant implementation task reaches verification.

## Before publishing the browser version
- [ ] Real `Learn` button opens a functioning lesson from the actual GitHub Pages public URL.
- [ ] LV → RU and RU → LV tested with human-readable, checked content. Entire UI switches to Latvian for LV→RU and Russian for RU→LV, including load-error direction changes, completion and accessible labels; prompt/answer language tags remain correct.
- [ ] Correct goes forward, incorrect one prompt back, **ten consecutive correct** completes a lesson; answer locations reshuffle. Each block has ten questions; the third cumulative mistake in one block restarts at lesson 1/question 1. Check nonconsecutive mistakes and count reset on block completion.
- [ ] Close/reload starts at lesson 1; no saved browser progress, analytics, cookies, IndexedDB or server calls.
- [ ] Mobile layouts, large touch targets, readable language/audio, keyboard behavior and screen-reader basics checked.
- [ ] No fake Google Play link; landing page accurately says what is currently available.
- [ ] Deployed site readback matches verified source/version; direct navigation and HTTPS verified.

## Before building/publishing Android
- [ ] Android and browser agree on the same test cases and canonical lesson IDs/translations.
- [ ] Actual Android release build installed and used on a physical device; required content available offline.
- [ ] Only highest lesson reached is persisted; app restart begins at lesson 1. New-record celebration only when record is exceeded.
- [ ] Save progress / Restore progress creates and validates a versioned file using a system picker; backup migration tested on another device.
- [ ] Import of malformed, foreign-course, unsupported or too-new backup fails safely with current record unchanged.
- [ ] Data loss on uninstall/clear data explained; privacy statement matches actual app behavior; no unnecessary permissions or tracking.
- [ ] Age-targeting, Families policy (if applicable), and current Play content/policy disclosures reviewed **using current Google requirements**.
- [ ] Signing, package name, versioning, store artwork, screenshots, support contacts and listing claims reviewed; avoid exposing personal/family data.
- [ ] Current Play Console closed-testing and account eligibility requirements checked. The owner performs identity/account actions.
- [ ] Owner explicitly approves public release; live listing URL independently confirmed before enabling Play download button.

## Before marking a task DONE
- [ ] Relevant TD item references a PR/commit and the tests that were actually run.
- [ ] Changelog records implementation/verification attribution accurately.
- [ ] Work checkpoint reflects the exact tested or published state and one next action.
- [ ] Unverified items remain clearly marked TODO/BLOCKED, not quietly passed.

**Scope freeze:** no payments, ads, accounts, cloud data, extra languages/ages or lessons until the first ten-lesson app is usable on both surfaces and available on Google Play.
