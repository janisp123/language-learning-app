# Browser test build 0.1

Implemented by Codex on 2026-11-16 at the owner's explicit request for a testable app. Based on main `0eca17305e695e53e72f2bf1ab6f72fa3e04ddb6`. This is a review/test build, not a verified public release or Android app.

## Start testing

Download `downloads/language-learning-test.html` and open that file in a browser. No server, network, account or installation is needed. GitHub's source viewer and raw HTML view do not run the app; save/download the actual `.html` file first. On phones that do not open local HTML, use a desktop browser or the hosted route after authorized Pages deployment.

Choose Latvian → Russian or Russian → Latvian, then Start practice. Tap one of four choices. Choices lock and feedback appears immediately; after 500 ms the app automatically registers the transition and displays the next prompt, lesson or completion screen. No Continue button is used. Restart returns to lesson one. Change direction opens the direction selector and discards the current session. Reopening/refreshing the file starts over; nothing is saved. Ten consecutive correct selections complete a lesson; the first two mistakes in a block move one prompt backward (clamped at the first prompt) and reset the run. A block is exactly ten questions. The third cumulative mistake in that block restarts at lesson one, question one and clears both counters, even if correct answers came between mistakes. Correct answers do not clear the mistake count; completing a block or restarting does. Direction is preserved on automatic restart, and revision tokens still reject stale answers. Correct answers wrap within a lesson until ten in a row. Completing lesson ten ends the session with an explicit restart action, not lesson eleven.

The build contains ten themes and 100 draft prompt pairs. Lessons unlock sequentially through practice; the theme list cannot skip ahead. Questions, choices and corrections have explicit language attributes. Feedback uses text as well as color; choices lock after an answer and keyboard focus moves to the new prompt after the 500 ms transition. Correction text remains readable until the next answer. Restart and direction changes cancel pending timers; generation tokens reject stale callbacks so a previous session cannot advance a fresh one. There are no answer time limits, autoplay, microphone, audio, reward effects, XP, ads or tracking.

**Review pending:** fluent Latvian/Russian review, distractor ambiguity/context review, actual browser/physical-device interaction, keyboard/screen-reader/zoom/layout and public HTTPS deployment. Do not call the translations human-reviewed or the UI browser-verified. Automated checks establish structure and transitions, not pedagogical effectiveness or semantic correctness.

## Interface language

Latvian → Russian uses Latvian interface text; Russian → Latvian uses Russian interface text. The selector changes the interface immediately, before Start. This includes all controls, rules, lesson titles, counters, feedback, completion, errors, accessible choice labels, document title and root language tag. Questions and options keep their actual source/target language tags. The default direction is Latvian → Russian, so the packaged fallback UI is Latvian; disabled-JavaScript instructions are bilingual. Interface translations are drafts pending fluent review.

`web/locales.json` is the separate canonical UI source, embedded alongside the course. No third-party translation request, saved preference or independent UI-language selector is added. Direction changes still create a fresh learning session. Error UI can switch language even after invalid course data prevents startup.

## Source and technical decision for this test build

- `content/lv-ru-10-17.json`: canonical stable course/lesson/phrase/prompt IDs, translations and explicit distractor references; marked draft.
- `core/engine.js`: dependency-free pure JavaScript engine shared by unit tests and the browser. No DOM or persistence. It handles validation, direction, shuffle, cursor, consecutive count and stale answer rejection.
- `web/`: semantic HTML template, CSS and DOM event handling. No framework, network requests or storage.
- `tools/build_browser.py`: standard-library build that embeds the canonical data, engine and UI into one HTML file. Inline JSON escapes HTML-sensitive characters; interface text uses `textContent`.
- `downloads/language-learning-test.html`: generated copy for immediate download. Never edit it directly; CI compares it with a fresh canonical build.
- `tests/`: deterministic engine/content tests, a minimal DOM event fixture for UI wiring, and packaging/privacy checks. The DOM fixture is not a real browser and cannot establish rendering/accessibility behavior.

Use plain JavaScript and a standard-library Python packager for the immediately testable browser slice: no dependency install or framework approval is needed. The unmerged L-001 TypeScript/Capacitor proposal in PR #3 remains a broader platform recommendation; Android reuse/build/backup behavior is not claimed or selected by this browser implementation. No native persistence or pronunciation source is implemented.

```sh
npm test
python -m unittest discover -s tests -p 'test_*.py' -v
python tools/build_browser.py
```

Tooling: Node 24+, Python 3.12+. Tests use Node's built-in runner with process isolation disabled for this execution environment; no downloaded test framework. Build output is deterministic and has no external runtime assets. To refresh the committed download after source changes, copy the built file to `downloads/language-learning-test.html` and verify equality.

## GitHub delivery

The ordinary checks workflow validates the app, rebuilds it, compares the download and uploads a test artifact without deploying. The manual Pages workflow separately packages the landing page, `learn/index.html` and `language-learning-test.html`, then publishes only after authorized dispatch on main with Pages already owner-enabled. A merged source file is not proof of a running site. Read the actual deployment URL and verify it before claiming a test URL is live.

## Suggested first test

1. Start in each direction and confirm the entire interface uses the source language, prompts use the source language, and answer choices use the target language. Switch directions before Start and after returning to setup.
2. Answer correctly twice, make a mistake, and confirm the correction and automatic backward step after 0.5 seconds.
3. Reach ten correct in a row and check the next lesson begins at its first prompt.
4. Restart, change direction, refresh and reopen; each fresh session should begin at lesson one.
5. Note unclear translations/distractors or layout problems with lesson title and phrase. Use no private child/family information in public issues.

For the new three-mistake rule, test from a later lesson: make two mistakes separated by correct answers, then a third. Confirm the 500 ms transition returns to lesson one, question one with zero mistakes and zero consecutive correct.

## Verification performed

Twenty-five Node tests pass, including traversing all ten lessons in both engine directions, UI event flow through all 100 prompts, execution of the committed HTML's embedded scripts/data in the DOM fixture, exact 499/500 ms timing, and cancellation of pending/stale transitions on restart or direction changes. Three Python build tests pass, checking deterministic self-contained output, required controls, language labels, absence of external assets/storage and isolated site/download parity. An independent review found one emergency-number wording correction; the corrected LV/RU phrases are pinned by a regression test observed failing before the correction and passing afterward. Localization coverage includes matching pack keys/placeholders, all ten lesson titles, source-language rules/feedback/counters/completion and switching error language after a load failure. Independent localization review found that failed bootstrap initially missed direction changes; a regression was observed failing and passed after registering failure-safe language switching. JavaScript syntax checks pass. Browser rendering, real keyboard/screen-reader behavior, physical devices, GitHub Actions execution, Pages hosting and Android checks remain NOT RUN in this environment.

The owner asked for a runnable app rather than further brainstorming; this record documents the implemented browser defaults. It does not remove unfinished release, language-review, Android or licensing tasks from TD.
