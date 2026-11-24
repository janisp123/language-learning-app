# TD list — active approved tasks for the language-learning app

**Repository:** `janisp123/language-learning-app` • **Branch of record:** `main` • **Canonical path:** `docs/TD_LIST.md`  
**Current handoff (2026-11-23):** **L-016 DELIVERED/LIVE0.5.4** — correct answers play fully, then wait2000ms; replaces the former500ms cutoff. [Receipt](delivery/2026-11-23-correct-delay-live.json) · [History](history/L-016-completed-2026-11-23.md). Mistake correction, three-course setup, dark default/content/seven directions/ZERO saves preserved. **Current task:L-017 — copy-only translation report panel.** Standing checked merge/publication authorization remains; do not repeat routine approval questions.

**Historical browser baseline (verified 2026-11-17):** Browser review build 0.4.11 is integrated through PR #18 and publicly deployed. Main CI 44168243818 and Pages 44168243948 succeeded; hosted HTML equals the committed download. Android, fluent human review, physical-device/full-accessibility checks and final release remain unfinished. No license has been selected. [Current checkpoint](WORK_CHECKPOINT.md) records the latest evidence. Task presence alone never authorizes work or publication.

**Reading older task notes:** The slice-by-slice statuses below preserve earlier branch handoffs, including statements that integration or Pages setup was pending. They are historical at those points, not the current deployment status. Browser source PRs #7–#18 have since merged; PR #19 holds the latest detailed publication receipts. Do not repeat delivered work or treat a historical “pending” note as an unimplemented feature. Remaining human/platform/release gates and original task attribution are retained.

For each task: fetch current remote `main:docs/TD_LIST.md` first; then check `AGENTS.md` and `WORK_CHECKPOINT.md`, verify whether already delivered, identify dependencies, use a short-lived branch and checked PR, and update changelog + checkpoint after completing verified work. Preserve `Added by` attribution.

## Ordered implementation backlog (Codex)

### L-001 — Choose and document the simplest maintainable dual-platform implementation
- **Status:** PARTIAL — dependency-free browser runtime decision implemented for this test build; broader Android decision PR #3 remains separate
- **Browser test-build code/content authored by:** Codex · [implementation and verification](BROWSER_TEST_BUILD.md)
- **Added by:** ChatGPT
- **Implemented by:** Not yet
- **Goal:** Inspect the empty repository and decide how the GitHub Pages browser experience and Android app will reuse **one canonical vocabulary/content source and one testable definition of learning behavior**. Compare a shared runtime implementation with small platform wrappers against alternatives; favor reliability/minimalism and Google Play compliance over architectural sophistication.
- **Acceptance:** Short architecture decision describing build system, directory structure, source format/IDs, web/Android distribution, how learning rules remain identical, audio approach, zero learner-state saves on every platform, and basic testing strategy. Flag any trade-off requiring owner approval **before** generating large application code. No future language packs or age paths implemented. PR #3's old storage/backup assumptions are superseded by the owner's 2026-11-17 decision.

### L-002 — Define the learning state machine and deterministic tests
- **Status:** IN REVIEW — pure engine and deterministic tests implemented on the browser test-build branch
- **Browser test-build code/content authored by:** Codex · [implementation and verification](BROWSER_TEST_BUILD.md)
- **Added by:** ChatGPT
- **Implemented by:** Not yet
- **Goal:** Translate the rules in `ARCHITECTURE.md` into a small, explicit engine and executable conformance tests. Confirm edge cases: wrong at first/last prompt, revisiting items, how a 10-item lesson cycles to achieve 10 consecutive successes, switching among all six LV/RU/EN directions, shuffling, and first launch.
- **Acceptance:** No off-by-one or soft-skip: correct moves forward; wrong moves back one prompt and breaks the consecutive run; the third cumulative mistake in a ten-question block restarts at lesson 1/question 1 with cleared counters; correct answers do not clear block mistakes, but completing a block does; only 10 in a row completes; every fresh session starts at lesson 1 with no saved record or record-based notification. Tests document exact boundaries, not just happy paths.

### L-003 — Author and validate the survival vocabulary and practical core
- **Status:** PARTIAL — 51 draft blocks / 510 items authored; original 500 preserved, new request core and priority order implemented for review; fluent human review pending
- **Owner-authorized revision (Codex, 2026-11-17):** ten reusable needs/repair/help-call/restriction entries added; pronouns/help brought earlier; new request block at display position 11. See the practical-core specification and tests. Stable task ID and original authorship are retained.
- **Browser test-build code/content authored by:** Codex · [implementation and verification](BROWSER_TEST_BUILD.md)
- **Added by:** ChatGPT
- **Implemented by:** Not yet
- **Goal:** Create only the **10–17** Latvian/Russian/English content pack, using the owner-approved words/short-phrases curriculum in `CONTENT_RULES.md` and `VOCABULARY_500.md`. Reuse words, phrasing and patterns; teach concrete everyday communication, including what a child might *hear* as well as say. Keep stable IDs and distinct, plausible wrong answers.
- **Acceptance:** Fifty-one usable ten-question blocks, 510 distinct items, introductory words/short phrases in the first ten blocks, practical requests from block 11, all six directions and complete source audio. Original meanings/IDs/bindings/recordings remain unchanged. No ambiguous choices or adult/workplace material; human language/pronunciation review remains pending until actually performed.

### L-004 — Build browser learning and the GitHub Pages landing page
- **Speaker-only green feedback (Codex, explicit owner request, 2026-11-17):** 0.4.11 implemented and locally verified on fix/answer-speaker-highlight. Only the speaker cell changes on touch/focus; no whole-answer outline or grading. 46 Node /29 Python tests plus light/dark320/390/1280px Chromium checks and independent review pass. Source b3cd10f on PR #18 passed CI44167704597; stable Drive upload/download compare exactly (delivery/2026-11-17-speaker-highlight-drive-sync.json). Integration/publication pending.
- **Learning dark-mode repair (Codex, explicit owner report, 2026-11-17):** 0.4.10 implemented locally on fix/learning-dark-mode. Landing dark mode carries into learning through a consumed one-use fragment; learning header has a localized toggle. No saved preferences; reload starts light/lesson1. 46 Node / 29 Python tests and Chromium layout checks pass; Source23f6d37 on PR #17 passed CI44123339528; stable Drive upload/download compare exactly (delivery/2026-11-17-learning-theme-drive-sync.json). Integration/publication pending.
- **Japanese answer audio repair (Codex, explicit owner report, 2026-11-17):** 0.4.9 in progress on fix/japanese-answer-audio; add all 510 missing Japanese target clips and enforce source+target coverage. Existing content, seven directions and 1,530 old recordings preserved. 43 Node / 29 Python tests, full Japanese browser decode/binding checks and independent review pass. Source 6913c37 on PR #14 passed CI 44118339756; stable Drive download exactly matches (delivery/2026-11-17-japanese-audio-drive-sync.json). Integration/publication pending.
- **Answer speakers (Codex, explicit owner request, 2026-11-17):** implemented locally in 0.4.8 on feat/answer-pronunciation; separate target-language speakers for all four options never grade, reshuffle or navigate. Existing LV/RU/EN recordings reused; Japanese audio unavailable and clearly disabled. 43 Node / 28 Python tests pass; Chromium target-audio/keyboard/mobile checks pass; source 00aa316 on PR #12, CI 44115225318 passed, stable Drive readback exactly matches (delivery/2026-11-17-answer-speakers-drive-sync.json). Integration/publication pending.
- **Autoplay/footer slice (Codex, 2026-11-17):** implemented on feat/current-prompt-autoplay-footer, review build 0.4.6. Current prompt automatically plays once on each appearance; replay survives blocked autoplay; source/footer links preserved. 38 Node and 23 Python tests pass; Chromium flow/playback verified in all six directions. Pushed on PR #8 (d59fabe); GitHub CI 44108161630 passed; stable Drive file uploaded and downloaded with exact byte equality (delivery/2026-11-17-autoplay-footer-drive-sync.json). Integration pending.
- **Practical-core revision (Codex, owner request, 2026-11-17):** review build 0.4.5 covers 510 items/51 blocks and 1,530 recordings; current-prompt-only speaker, zero saves and learning rules remain unchanged. Integration/device review pending.
- **Current-prompt speaker update (Codex, owner request, 2026-11-17):** 0.4.4 adds a localized speaker beside the current word/phrase; only that source-language prompt plays on request. Previous-answer replay and automatic answer sound are removed. Prepared in PR #7; integration/device review pending.
- **Audio slice (Codex, 2026-11-17):** all 500 questions have bundled LV/RU/EN pronunciation and replay in all six directions (0.4.3); English is generated locally with Flite SLT, avoiding the online synthesis blocker; see AUDIO_MODULES.md. Human pronunciation/device review remains pending.
- **Status:** PARTIAL — landing page and complete browser build integrated through PR #6; publication run 44053240327 blocked on owner enabling Settings → Pages → Source: GitHub Actions; hosted/device verification pending
- **Depends on:** L-001–L-003 for browser learning; owner explicitly requested the isolated static landing page ahead of those dependencies
- **Answer timing update authored by:** Codex at owner request — immediate feedback/answer lock, automatic transition after 500 ms, cancelled on restart/direction change; included in PR #6 test build
- **Landing-page slice authored by:** Codex · [source](discovery-preview/index.html) · [publication/verification notes](discovery-preview/LAUNCH.md)
- **Added by:** ChatGPT
- **Implemented by:** Not yet
- **Source-language UI update authored by:** Codex at owner request — LV interface for LV→RU/EN; RU interface for RU→LV/EN; EN interface for EN→LV/RU, including all controls, feedback/errors and lesson titles; review and device checks pending
- **Modularity update authored by:** Codex at owner request — catalog, concept/question/correct-answer IDs, per-block and per-language modules, source/runtime validators and unchanged-original-content regression; data-only extension is tested
- **Goal:** Minimal child-friendly learning screen, four reshuffled choices, clear feedback, optional re-playable pronunciation if supported, direct **Learn** action from a professional landing page; public GitHub Pages hosting.
- **Acceptance:** Both translation directions work; same tested lesson/engine behavior; browser stores **no** progress (including localStorage/cookies); refresh starts from lesson 1; no account, tracking or dead buttons. Test on mobile and desktop, including actual published URL. Do not display an invented Google Play link.

### L-005 — Build the Android app with zero saved learner state
- **Status:** TODO • **Depends on:** L-001–L-003
- **Added by:** ChatGPT
- **Implemented by:** Not yet
- **Owner scope update (2026-11-17, recorded by Codex):** Zero saves on every platform replaces the earlier highest-lesson record and backup/restore requirements. Stable task ID and original Added by attribution are retained.
- **Goal:** Google Play-appropriate Android application with the same course content and behavior; keep all learner state in memory only. No highest-lesson record, saved answers/preferences, Save/Restore controls, progress files or cloud storage.
- **Acceptance:** A new session/process always begins at lesson 1 with fresh counters. Verify no learner state is written to preferences, files, databases, backups or OS state-restoration. Process death/relaunch, activity recreation after process death, install/update and device backup restoration must not resume or recover learning progress. Course/audio assets remain available offline. Physical-device verification is required; Android is not implemented yet.

### L-006 — Build verification and safe delivery automation
- **Status:** PARTIAL — automated browser checks integrated; main CI run 44053240358 succeeded; cross-platform/release checks remain pending
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

### L-009 — English → Japanese only
- **Status:** IN REVIEW — implemented/verified/pushed on PR #9, source d9044cd; GitHub CI 44109924376 passed. Review build 0.4.7 delivered through stable Drive with exact downloaded-byte equality; receipt delivery/2026-11-17-english-japanese-drive-sync.json. Integration pending
- **Added by:** Codex (explicit owner request, 2026-11-17)
- **Implemented by:** Codex (verified locally; integration pending)
- **Goal:** Add English → Japanese for the same 510 meanings, script-only answers (owner choice), English UI and existing English current-prompt audio. Exactly seven directions; preserve all original six directions and content/audio/bindings. No Japanese reverse or LV/RU pairings, accounts, tracking or saved preferences.
- **Verification:** 41 Node / 28 Python tests pass, including explicit allowlists, forbidden/forged session directions, full seven-direction completion, source-only UI/audio and target-first catalog order. Chromium traversed all 510 en-ja prompts at 320 px with English audio bindings, autoplay/cancellation, unchanged 499/500 ms timing, empty storage/cookies and reload reset. All 1,530 old clip hashes and all 510 old translations in each language unchanged. Independent code/content review issues resolved. Fluent human Japanese review, physical devices and full screen-reader audit remain pending.

### L-010 — Source-language reading guides in three directions
- **Current next action after delivered L-016 (2026-11-23):** Reconcile held #21 against live0.5.4, preserve full correct playback+2sec, mistake correction, focused100-item courses/original510/zero saves, apply greeting patch and new focused phrase/variant guide coverage. Read current checkpoint; do not blindly merge obsolete branch protocol/content. Verify then publish under standing owner authorization. Existing notes below are historical feature evidence, not current deployment claims.
- **Added by:** Codex (explicit owner request, 2026-11-17)
- **Implemented by:** Codex (local implementation; integration/review delivery tracked in the feature PR)
- **Status:** Implemented/verified/pushed on PR #21, source162e2ac, source CI44182744942 passed. Review build0.4.12 delivered in stable Drive with exact downloaded byte equality ([pinned Drive delivery receipt](https://github.com/janisp123/language-learning-app/blob/72e6ab4c106c6ee7c48703af025919c81d5c3b55/docs/delivery/2026-11-17-reading-guides-drive-sync.json)). Integration/publication and human pronunciation review remain pending; preserve this task until verified integration.
- **Scope:** lv-ru uses Latvian letters; ru-en uses Cyrillic; en-ja uses romaji below each kana with visible small-kana roles and contextual/grouped kanji readings. Exactly the existing seven selectable directions; other four unannotated. 510 guides per selected direction; separate modules keyed by original IDs.
- **Acceptance:** Full coverage/binding validation, exact original translations/recordings preserved, no grading from speakers, current full correct playback+2000ms and zero-saves unchanged; small/mobile/dark/keyboard checks. See [reading-guide modules in PR #21](https://github.com/janisp123/language-learning-app/blob/72e6ab4c106c6ee7c48703af025919c81d5c3b55/docs/READING_GUIDES.md), feature PR and current checkpoint for actual local/source/Drive/public status. Fluent human review and actual physical devices remain separate checks.

### L-011 — Audit common, natural beginner words and expressions across all languages
- **Resume priority:** Audit follow-up remains in review; current follow-up is L-010; focused courses L-012 are delivered. L-001 is the older architecture backlog item, not this audit.
- **Status:** PARTIAL — audit/reference library integrated by PR #26 at e72e032. First approved correction slice implemented/verified/pushed in PR #27 (head6640e58, merged0e81ad6), separate review0.4.13 delivered/downloaded byte-identical; Pages publication verified in0.4.13 and later0.5.0. Remaining audit proposals and fluent-human review pending; focused courses L-012 are delivered.
- **Added by:** Codex (explicit owner request, 2026-11-18)
- **Implemented by:** codex (editorial audit/library merged; first correction slice integrated by PR #27; remaining decisions/human review pending)
- **Problem:** Some existing translations can be technically correct yet less common, less natural or less suitable for a beginner than an everyday alternative. Dictionary correctness and passing technical tests alone do not establish that an item is a good teaching default.
- **Scope:** Audit all 510 words/expressions in every existing language pack (Latvian, Russian, English, Japanese), considering all seven current learning directions and their actual answer choices. This is broader than the saved Japanese-only editorial review. Reuse that review and verify its findings against current source; do not repeat completed checks without a reason.
- **Owner examples / desired defaults:** Japanese “hello” → こんにちは (konnichiwa); Russian “hello” → здравствуйте for the neutral/polite greeting. Check actual current entries first: an example may already be correct. Distinguish casual/familiar alternatives such as やあ or привет from neutral/polite stranger-facing defaults rather than declaring every alternative universally wrong.
- **Audit method:** Prefer common, practical, natural everyday beginner expressions for the intended meaning and situation. Compare alternatives using trustworthy learner materials/dictionaries and usage evidence where available; do not invent frequency rankings or blindly copy Duolingo. Check politeness/register, own/other-family wording, literal versus idiomatic phrasing, ambiguity and context-specific senses. Avoid replacing a correct common term simply because a synonym is also possible. Preserve meaning and familiar-word reuse.
- **Deliverable:** A reviewable list keyed by stable concept IDs with current wording, suggested alternative (if any), reason/context, supporting evidence and priority. Classify keep / clarify context or register / recommend replacement / ambiguous answer set. Identify questions with more than one defensible answer. Clearly state uncertainty and remaining fluent-human review needs.
- **Owner-requested reusable library (2026-11-23):** [Library](../library/README.md) and structured common-core entries hold practical phrases/words in LV/RU/EN/JA with situations, register, source scope and pending review status. Separate from active course modules; use existing research for expansion, checking only new/unresolved meanings. No automatic import or claim of universal frequency ranking.
- **Current deliverables:** [Full audit](../research/common-usage/README.md), per-language ID-specific findings and a 2,040-cell coverage matrix. Reference work is reviewable; no proposal is an implemented correction.
- **Existing evidence:** [Japanese usage audit and handoff](review/2026-11-18-japanese-usage-audit.md) on PR #21; its findings are model/editorial review, not full language certification. PR #21 remains on hold for language-quality concerns.
- **Boundaries:** Recording this task authorizes no immediate translation, prompt, ID, answer-binding, reading-guide, audio, scoring or publication change. After the audit, present proposed corrections for owner review. Any later authorized correction must synchronize affected text, reading guides and recordings, preserve other meanings/directions and ZERO saved learner state, and follow checked PR/source-before-Drive/readback rules.



## Out of scope for v1 (not backlog tasks)

Languages/directions beyond the approved Latvian/Russian/English set and English → Japanese, additional age-specific paths beyond the delivered Kids/Adults courses, user accounts, cloud sync, servers, leaderboards, monetization, AI tutors, advanced pronunciation scoring, Apple App Store. These need an explicit new owner decision, not automatic addition.

## Coordination with the questionnaire project

That project's existing TD is currently `docs/TD_LIST.md` in **another repository**. The separately discussed rename to `TD.question.md` is **not performed here**; when authorized, update that repository's references and preserve tasks/history. Never copy or edit its clinical content from this backlog.

## Standing execution authorization — 2026-11-23

Owner explicitly requested efficient checked implementation/merging/live publication rather than a separate preview. Kids/Adults0.5.0 and correction listening0.5.1 are delivered. Setup/dark default0.5.2 is delivered. Correct answer playback0.5.3 is delivered. Full correct playback plus2sec0.5.4 is delivered. Current task isL-017 copy-only translation reports, then L-010 reading integration; preserve all delivered behavior and latest protocol. Do not repeat completed features or ask the same routine publication approval again.

### L-017 — Flag and copy an exact translation correction report
- **Added by:** codex (explicit Owner request/approved design,2026-11-24)
- **Implemented by:** codex (verified locally; integration pending)
- **Status:** VERIFIED LOCALLY —61Node/41Python,21 report direction/preset cases and independent review passed; checked PR/publication pending.
- **Scope:** Flag every question; choose Question or any displayed Answer; enter proposed correction; copy exact original text, direction/preset/app+content version and stable course/lesson/question/concept/answer IDs. Snapshot survives normal question advancement. No automatic send or saved draft/history; manual-copy fallback. Localized LV/RU/EN, mobile/dark/keyboard, no grading/audio/scoring changes.
- **Verification:**21 direction/preset report/copy cases, exact IDs and all-option selection, actual clipboard, fallback, late-copy race, Escape/close/reset/reload clearing, injection text, no storage, layout/keyboard; existing full suites, protocol/build/site parity, checked review and hosted readback.
