# Current working checkpoint

**As of:** 2026-11-16  
**Repository:** `janisp123/language-learning-app`  
**Scope:** `feat/testable-browser-app`, based on main `0eca17305e695e53e72f2bf1ab6f72fa3e04ddb6`.

## Verified state

- Landing-page PR #5 merged as the baseline above; its HTML was read back from main.
- Owner explicitly requested a testable app, not more brainstorming. Codex implemented a portable browser test build: pure JavaScript engine, canonical Latvian/Russian/English draft course (now 50 blocks / 500 vocabulary items), real choice/feedback UI with automatic 500 ms answer transitions, direction selection, reset and completion.
- `downloads/language-learning-test.html` is generated from canonical sources and can be opened offline. No account, network request or progress storage is used by the lessons. UI follows the source language: Latvian for LV→RU/EN, Russian for RU→LV/EN, English for EN→LV/RU. All controls, rules, lesson titles, counters, feedback, errors and completion text switch immediately on direction selection. Prompt/answer language tags still follow the actual phrase language.
- **L-002–L-004: PARTIAL / code prepared for review**, not a verified public release. Thirty Node tests and thirteen Python build/module/curriculum tests passed locally; actual GitHub integration, CI and publication require their own evidence.
- Engine rules: correct advances; wrong backs up one prompt with a clamp at the first and resets the run; ten consecutive correct completes a lesson. Each lesson is a ten-question block. The third cumulative mistake in that block restarts at lesson one/question one, clearing mistakes and consecutive count while preserving direction. Completing a block resets its mistake count; correct answers within a block do not. Wrap within a lesson, start every fresh session at lesson one, no skip controls. Direction change starts a new session. Completing the final block (currently 50) ends the course.
- No audio, Android app, native persistence/backup, Play listing or license adoption. Architecture proposal PR #3 and lessons PR #4 remain separate; no unrequested merge of them.

- Owner requested questionnaire-style auto-registration: feedback and answer lock immediately; transition applies after 500 ms, with no Continue button. Restart/direction changes cancel timers and invalidate stale callbacks; corrections stay readable after transition. This update is on the existing PR #6 branch, based on its previous head `4dee9253df2fd6623a89cc5731b8dd7c9aec6dc8`.

- Owner requested the three-mistake block rule; implemented and tested on this branch, including nonconsecutive mistakes, later/first lessons, count reset at lesson boundaries, 500 ms UI restart and stale-answer rejection. Prior branch head: `c780f0b50671d606daa68f9bc398f5c7b8820618`.

- Latest owner clarification restores one-question step-back: question 7 → question 6 on a mistake. The third cumulative mistake in the block still restarts lesson 1/question 1. Covered by an explicit UI regression test; the superseded block-restart behavior is removed. Prior branch head: `9a82512e78aab1de76ec4218ea2e94960a918766`.

- Owner requested source-language UI. Added separate LV/RU interface packs, translated static and dynamic messages, root/document language/title handling and failure-safe direction switching. Updated from PR #6 head `b62683933174af48b101b7351189e491b4e73434`; no learning/navigation rules changed.

- Owner added English: all six directed pairs now work with translations for all 100 stable phrase records and three source-language UI packs. English missing/ambiguous options, all six course traversals and identical step-back/third-mistake behavior are tested. Added from PR #6 head `1d2331b9d911874339adb5bee09921cab80accdf`. All translations still await fluent review.

- Owner requested modularity with unchanged questions/answers. Added a catalog, immutable-meaning IDs, separate ten-question block files and language/UI modules, explicit correct-answer IDs, strict loader/UI contract, runtime presentation-binding validation and an original-content digest. Removed old combined editable sources. Synthetic tests prove an eleventh block and fourth language can be registered without engine/UI edits; this historical modular refactor initially shipped no extra blocks or languages. Prior branch head: `299f62755df21894f94aeea6acd3e914e3226e65`.

## Owner vocabulary expansion — current draft 0.4

Owner requested 500 basic words/short phrases and no sentences in the first ten blocks. Implemented 50 blocks of ten with all three translations and localized titles. New course `basic-vocabulary-10-17` and permanent `vocab-*` / `basic-*` IDs avoid reusing old meanings. Original content is preserved under `archive/course-0.3/`; its identity digest is unchanged. A separate active 500-item lock catches text/answer drift. Catalog curriculum checks enforce target/distinct counts, short forms and sentence punctuation limits. No engine or learning-rule changes. Independent data/module reviews completed; fluent human review remains pending. Delivery continues in PR #6; not merged or published. See VOCABULARY_500.md.

## Owner content priority — reuse before style

Recorded in CONTENT_RULES.md and AGENTS.md: maximize reuse of taught words, phrases and patterns, even when style suffers. Prefer familiar expressions and recombinations over unnecessary synonyms; retain correct grammar, clear meanings and unambiguous answers. Documentation-only clarification; no vocabulary audit or content/runtime change claimed.

## Verification limits

- Automated engine/content and minimal DOM-fixture event-wiring tests pass. Packager is deterministic; generated download and hosted lesson use the same bytes.
- Real browser rendering, physical devices, keyboard/screen-reader/zoom, fluent-language review, public Pages URL and Android: **NOT RUN**. Managed browser control is unavailable; DOM fixtures are not a real browser.
- Ordinary CI checks and downloadable artifacts are prepared. Pages remains manual-only, main-only, owner-enabled; no publication has been performed by this branch.

## One next action

Owner opens the generated HTML file and tests the lesson flow, then reviews the browser-app PR. Record wording/layout issues using lesson/phrase details and no private information. After authorized integration/deployment, verify the actual public Pages URL before claiming hosted availability. Keep TD tasks active until their full acceptance is verified.
