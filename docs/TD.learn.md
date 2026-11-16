# TD.learn — active approved tasks for the language-learning app

**Repository:** `janisp123/language-learning-app` • **Branch of record:** `main`  
**State:** The owner explicitly requested a runnable browser test build. Engine, draft course, browser UI and portable build are prepared on the review branch; Android, language review, hosted verification and final releases remain unfinished. Task presence alone never authorizes work or publication.

For each task: check `AGENTS.md` and `WORK_CHECKPOINT.md`, verify whether already delivered, identify dependencies, use a short-lived branch and checked PR, and update changelog + checkpoint after completing verified work. Preserve `Added by` attribution.

## Ordered implementation backlog (Codex)

### L-001 — Choose and document the simplest maintainable dual-platform implementation
- **Status:** PARTIAL — dependency-free browser runtime decision implemented for this test build; broader Android decision PR #3 remains separate
- **Browser test-build code/content authored by:** Codex · [implementation and verification](BROWSER_TEST_BUILD.md)
- **Added by:** ChatGPT
- **Implemented by:** Not yet
- **Goal:** Inspect the empty repository and decide how the GitHub Pages browser experience and Android app will reuse **one canonical vocabulary/content source and one testable definition of learning behavior**. Compare a shared runtime implementation with small platform wrappers against alternatives; favor reliability/minimalism and Google Play compliance over architectural sophistication.
- **Acceptance:** Short architecture decision describing build system, directory structure, source format/IDs, web/Android distribution, how learning rules remain identical, audio approach, storage boundary, and basic testing strategy. Flag any trade-off requiring owner approval **before** generating large application code. No future language packs or age paths implemented.

### L-002 — Define the learning state machine and deterministic tests
- **Status:** IN REVIEW — pure engine and deterministic tests implemented on the browser test-build branch
- **Browser test-build code/content authored by:** Codex · [implementation and verification](BROWSER_TEST_BUILD.md)
- **Added by:** ChatGPT
- **Implemented by:** Not yet
- **Goal:** Translate the rules in `ARCHITECTURE.md` into a small, explicit engine and executable conformance tests. Confirm edge cases: wrong at first/last prompt, revisiting items, how a 10-item lesson cycles to achieve 10 consecutive successes, switching among all six LV/RU/EN directions, shuffling, and first launch.
- **Acceptance:** No off-by-one or soft-skip: correct moves forward; wrong moves back one prompt and breaks the consecutive run; the third cumulative mistake in a ten-question block restarts at lesson 1/question 1 with cleared counters; correct answers do not clear block mistakes, but completing a block does; only 10 in a row completes; returning to lesson 1 in every fresh session; new-highest notification only when exceeding previous record. Tests document exact boundaries, not just happy paths.

### L-003 — Author and validate 500 basic words and short phrases
- **Status:** PARTIAL — 50 draft blocks / 500 vocabulary items authored; fluent human review pending
- **Browser test-build code/content authored by:** Codex · [implementation and verification](BROWSER_TEST_BUILD.md)
- **Added by:** ChatGPT
- **Implemented by:** Not yet
- **Goal:** Create only the **10–17** Latvian/Russian/English content pack, using the owner-approved words/short-phrases curriculum in `CONTENT_RULES.md` and `VOCABULARY_500.md`. Reuse words, phrasing and patterns; teach concrete everyday communication, including what a child might *hear* as well as say. Keep stable IDs and distinct, plausible wrong answers.
- **Acceptance:** Fifty usable ten-question blocks, 500 distinct learning items, no sentences in the first ten blocks, all six translation directions, no duplicate or ambiguous correct choices, simple grammar/pronunciation review, no workplace/adult material, content validation tests. Mark human-language review as pending unless actually performed.

### L-004 — Build browser learning and the GitHub Pages landing page
- **Status:** PARTIAL — landing page integrated via PR #5; runnable browser test build prepared for review; hosted/device verification pending
- **Depends on:** L-001–L-003 for browser learning; owner explicitly requested the isolated static landing page ahead of those dependencies
- **Answer timing update authored by:** Codex at owner request — immediate feedback/answer lock, automatic transition after 500 ms, cancelled on restart/direction change; included in PR #6 test build
- **Landing-page slice authored by:** Codex · [source](discovery-preview/index.html) · [publication/verification notes](discovery-preview/LAUNCH.md)
- **Added by:** ChatGPT
- **Implemented by:** Not yet
- **Source-language UI update authored by:** Codex at owner request — LV interface for LV→RU/EN; RU interface for RU→LV/EN; EN interface for EN→LV/RU, including all controls, feedback/errors and lesson titles; review and device checks pending
- **Modularity update authored by:** Codex at owner request — catalog, concept/question/correct-answer IDs, per-block and per-language modules, source/runtime validators and unchanged-original-content regression; data-only extension is tested
- **Goal:** Minimal child-friendly learning screen, four reshuffled choices, clear feedback, optional re-playable pronunciation if supported, direct **Learn** action from a professional landing page; public GitHub Pages hosting.
- **Acceptance:** Both translation directions work; same tested lesson/engine behavior; browser stores **no** progress (including localStorage/cookies); refresh starts from lesson 1; no account, tracking or dead buttons. Test on mobile and desktop, including actual published URL. Do not display an invented Google Play link.

### L-005 — Build the Android app and highest-lesson backup/restore
- **Status:** TODO • **Depends on:** L-001–L-003
- **Added by:** ChatGPT
- **Implemented by:** Not yet
- **Goal:** Google Play-appropriate Android application with same course content and behavior. Persist only **highest lesson reached** locally. Provide **Save progress** and **Restore progress** using Android's file picker and a versioned backup; no server.
- **Acceptance:** Export/import works offline on two devices; corrupt/wrong-course/newer-version backups rejected with clear messages and no data loss; restore warns before replacing current highest; closing/reopening starts lesson 1 while preserving only the record. Test install/update/clear-data and document which actions erase progress.

### L-006 — Build verification and safe delivery automation
- **Status:** PARTIAL — automated engine/content/UI-wiring/build checks prepared; GitHub CI execution and cross-platform/release checks pending
- **Browser test-build code/content authored by:** Codex · [implementation and verification](BROWSER_TEST_BUILD.md)
- **Added by:** ChatGPT
- **Implemented by:** Not yet
- **Goal:** CI checks for content IDs, translation-option uniqueness, engine invariants and buildability, with release isolation; evidence logged per PR.
- **Acceptance:** A deliberately failing test blocks a change in a test run; browser and Android tests exercise the same conformance cases; no automatic Play release or unverified Pages publication; real small-screen and offline checks recorded.

### L-007 — Prepare and verify the first public release
- **Status:** TODO • **Depends on:** L-001–L-006, user approval
- **Added by:** ChatGPT
- **Implemented by:** Not yet
- **Goal:** Follow `RELEASE_CHECKLIST.md`: professional landing page, correct GitHub Pages Learn link, Android package and required Play Console assets/policies/testing.
- **Acceptance:** Tested website live; tested release build; actual Play listing is accessible before Play button goes live; privacy/storage claims truthful; version and changelog agree. **Owner handles Play Console account/payment/verification steps requiring their identity and explicitly approves publication.**

### L-008 — Select an explicit source-code/content license before describing this as open-source
- **Status:** TODO • **Depends on:** owner decision; required before license claims
- **Added by:** ChatGPT
- **Implemented by:** Not yet
- **Goal:** Explain suitable license choices for code and learning content; ask owner to select; only then add files and update public descriptions.
- **Acceptance:** Public description accurately matches the adopted license(s); no assumption that a public repository is freely reusable.

## Out of scope for v1 (not backlog tasks)

Languages beyond the approved Latvian/Russian/English set, 5–9 and 18+ paths, user accounts, cloud sync, servers, leaderboards, monetization, AI tutors, advanced pronunciation scoring, Apple App Store. These need an explicit new owner decision, not automatic addition.

## Coordination with the questionnaire project

That project's existing TD is currently `docs/TD_LIST.md` in **another repository**. The separately discussed rename to `TD.question.md` is **not performed here**; when authorized, update that repository's references and preserve tasks/history. Never copy or edit its clinical content from this backlog.
