# Browser test build 0.4.6

Implemented by Codex on 2026-11-16 at the owner's explicit request for a testable app. Based on main `0eca17305e695e53e72f2bf1ab6f72fa3e04ddb6`. This is a review/test build, not a verified public release or Android app.

## Start testing

Download `downloads/language-learning-test.html` and open that file in a browser. No server, network, account or installation is needed. GitHub's source viewer and raw HTML view do not run the app; save/download the actual `.html` file first. On phones that do not open local HTML, use a desktop browser or the hosted route after authorized Pages deployment.

Choose any of the six directions between Latvian, Russian and English, then Start practice. Tap one of four choices. Choices lock and feedback appears immediately; after 500 ms the app automatically registers the transition and displays the next prompt, lesson or completion screen. No Continue button is used. Restart returns to lesson one. Change direction opens the direction selector and discards the current session. Reopening/refreshing starts over; nothing is saved. Ten consecutive correct selections complete a lesson; the first two mistakes in a block move one prompt backward and reset the run. The third cumulative mistake restarts lesson one/question one and clears both counters. Correct answers do not clear mistakes; block completion or restart does. Direction is preserved on automatic restart, and stale answers are rejected. Completing the final block (currently block 51) ends the session with an explicit restart action.

The build contains 51 blocks and 510 draft items: all original 500 plus ten practical requests/restrictions. Pronouns/help come earlier and the request block is lesson 11, after 100 introductory items. Lessons unlock sequentially; the theme list cannot skip ahead. Language attributes, immediate feedback and focus on the next prompt are retained. Correction text remains until the next answer; restart/direction changes cancel stale callbacks. The speaker plays only the current prompt on request. There are no answer time limits, microphone, rewards, tracking or saved progress; see AUDIO_MODULES.md.

**Review pending:** fluent language/pronunciation review, physical-device/full screen-reader/zoom review and public HTTPS deployment. Targeted Chromium checks are documented in the current checkpoint; they do not establish pedagogical effectiveness or replace fluent review.

## Interface language

All six directions are supported. Starting from Latvian uses Latvian UI; starting from Russian uses Russian UI; starting from English uses English UI. The selector changes the interface immediately, before Start. This includes all controls, rules, lesson titles, counters, feedback, completion, errors, accessible choice labels, document title and root language tag. Questions and options keep their actual source/target language tags. The default direction is Latvian → Russian, so the packaged fallback UI is Latvian; disabled-JavaScript instructions are trilingual. Interface translations are drafts pending fluent review.

Each `content/languages/<code>.json` module contains its translations and separate UI pack, assembled and embedded alongside the course. No third-party translation request, saved preference or independent UI-language selector is added. Direction changes still create a fresh learning session. Error UI can switch language even after invalid course data prevents startup.

## Source and technical decision for this test build

- `content/catalog.json`, `concepts.json`, `blocks/` and `languages/`: canonical permanent IDs, explicit question/correct-answer/distractor bindings, meaning definitions, translations and UI packs; marked draft.
- `core/engine.js`: dependency-free pure JavaScript engine shared by unit tests and the browser. No DOM or persistence. It handles validation, direction, shuffle, cursor, consecutive count and stale answer rejection.
- `web/`: semantic HTML template, CSS and DOM event handling. No framework, network requests or storage.
- `tools/build_browser.py`: standard-library build that embeds the canonical data, engine and UI into one HTML file. Inline JSON escapes HTML-sensitive characters; interface text uses `textContent`.
- `downloads/language-learning-test.html`: generated copy for immediate download. Never edit it directly; CI compares it with a fresh canonical build.
- `tests/`: deterministic engine/content tests, a minimal DOM event fixture for UI wiring, and packaging/privacy checks. The DOM fixture is not a real browser and cannot establish rendering/accessibility behavior.

Use plain JavaScript and a standard-library Python packager: ordinary builds require no dependency installation. The unmerged platform proposal in PR #3 requires reconciliation with later decisions. All platforms must save zero learner state; Android is not implemented. Build 0.4.6 bundles 1,530 clips for all 510 items. Only optional audio authoring uses gTTS/Flite; see AUDIO_MODULES.md.

```sh
npm test
python -m unittest discover -s tests -p 'test_*.py' -v
python tools/build_browser.py
```

Tooling: Node 24+, Python 3.12+. Tests use Node's built-in runner with process isolation disabled for this execution environment; no downloaded test framework. Build output is deterministic and has no external runtime assets. To refresh the committed download after source changes, copy the built file to `downloads/language-learning-test.html` and verify equality.

The original combined sources were replaced by validated modules. The earlier 100-item draft remains under `archive/course-0.3/`. Unchanged baseline digests protect it and the original 500 vocabulary items; practical-core tests separately pin the ten new translations and approved catalog order. The catalog enables LV/RU/EN and 51 blocks. See [the curriculum guide](VOCABULARY_500.md) and [module guide](CONTENT_MODULES.md). Runtime schema 2 still requires explicit correct-answer identity.

## GitHub delivery

The ordinary checks workflow validates the app, rebuilds it, compares the download and uploads a test artifact without deploying. The manual Pages workflow separately packages the landing page, `learn/index.html` and `language-learning-test.html`, then publishes only after authorized dispatch on main with Pages already owner-enabled. A merged source file is not proof of a running site. Read the actual deployment URL and verify it before claiming a test URL is live.

## Suggested first test

1. Start in each direction and confirm the entire interface uses the source language, prompts use the source language, and answer choices use the target language. Switch directions before Start and after returning to setup.
2. Answer correctly twice, make a mistake, and confirm the correction and automatic backward step after 0.5 seconds.
3. Reach ten correct in a row and check the next lesson begins at its first prompt.
4. Restart, change direction, refresh and reopen; each fresh session should begin at lesson one.
5. Note unclear translations/distractors or layout problems with lesson title and phrase. Use no private child/family information in public issues.

For the new three-mistake rule, test from a later lesson: make two mistakes separated by correct answers, then a third. Confirm the 500 ms transition returns to lesson one, question one with zero mistakes and zero consecutive correct.

## Current verification

The practical-core revision passes 37 Node and 23 Python tests. Regressions pin the approved order and ten new translated meanings, preserve the original vocabulary digest in its recorded order, and traverse all 510 prompts in all six directions with current-source audio. All original 1,500 MP3 hashes are unchanged; thirty new recordings decode. Current browser and delivery evidence is linked from WORK_CHECKPOINT.md.

## Historical initial implementation verification

Thirty Node tests pass, including traversing all 50 blocks in all six engine directions, UI event flow through all 500 prompts, execution of the committed HTML's embedded scripts/data in the DOM fixture, exact 499/500 ms timing, and cancellation of pending/stale transitions on restart or direction changes. Thirteen Python build/module/curriculum tests pass, checking deterministic self-contained output, required controls, language labels, absence of external assets/storage and isolated site/download parity. An independent review found one emergency-number wording correction; the corrected LV/RU phrases are pinned by a regression test observed failing before the correction and passing afterward. Localization coverage includes matching pack keys/placeholders, all 50 block titles, source-language rules/feedback/counters/completion and switching error language after a load failure. Independent localization review found that failed bootstrap initially missed direction changes; a regression was observed failing and passed after registering failure-safe language switching. Module tests cover original content digest parity, data-only extension, mislabeled translations, explicit answer IDs, duplicate JSON keys, unknown references and an independent UI key/placeholder contract. Review identified that matching packs could all omit a UI key; a RED→GREEN test now rejects common omissions and placeholder errors. JavaScript syntax checks pass. Browser rendering, real keyboard/screen-reader behavior, physical devices, GitHub Actions execution, Pages hosting and Android checks remain NOT RUN in this environment.

The owner asked for a runnable app rather than further brainstorming; this record documents the implemented browser defaults. It does not remove unfinished release, language-review, Android or licensing tasks from TD.


## Current-prompt autoplay and attribution (0.4.6)
Each displayed prompt attempts source pronunciation once, including returns after mistakes. Replay remains available after browser autoplay rejection. Prompt changes, restart, direction change and completion cancel old sound; scoring and 500 ms transitions are unchanged. Landing and learning footers credit Made by Janis Paegle 2026 with the owner profile link and preserve project source links.
