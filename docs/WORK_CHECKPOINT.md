# Current working checkpoint

**As of:** 2026-11-16  
**Repository:** `janisp123/language-learning-app`  
**Scope:** `feat/testable-browser-app`, based on main `0eca17305e695e53e72f2bf1ab6f72fa3e04ddb6`.

## Verified state

- Landing-page PR #5 merged as the baseline above; its HTML was read back from main.
- Owner explicitly requested a testable app, not more brainstorming. Codex implemented a portable browser test build: pure JavaScript engine, canonical LV ↔ RU draft course (ten lessons / 100 prompts), real choice/feedback/Continue UI, direction selection, reset and completion.
- `downloads/language-learning-test.html` is generated from canonical sources and can be opened offline. No account, network request or progress storage is used by the lessons. UI language is English; phrase and answer languages follow the chosen direction.
- **L-002–L-004: PARTIAL / code prepared for review**, not a verified public release. Sixteen Node tests and three Python packaging tests passed locally; actual GitHub integration, CI and publication require their own evidence.
- Engine rules: correct advances; wrong backs up one prompt with a clamp at the first and resets the run; ten consecutive correct completes a lesson. Wrap within a lesson, start every fresh session at lesson one, no skip controls. Direction change starts a new session. Completing lesson ten ends quietly without lesson eleven.
- No audio, Android app, native persistence/backup, Play listing or license adoption. Architecture proposal PR #3 and lessons PR #4 remain separate; no unrequested merge of them.

## Verification limits

- Automated engine/content and minimal DOM-fixture event-wiring tests pass. Packager is deterministic; generated download and hosted lesson use the same bytes.
- Real browser rendering, physical devices, keyboard/screen-reader/zoom, fluent-language review, public Pages URL and Android: **NOT RUN**. Managed browser control is unavailable; DOM fixtures are not a real browser.
- Ordinary CI checks and downloadable artifacts are prepared. Pages remains manual-only, main-only, owner-enabled; no publication has been performed by this branch.

## One next action

Owner opens the generated HTML file and tests the lesson flow, then reviews the browser-app PR. Record wording/layout issues using lesson/phrase details and no private information. After authorized integration/deployment, verify the actual public Pages URL before claiming hosted availability. Keep TD tasks active until their full acceptance is verified.
