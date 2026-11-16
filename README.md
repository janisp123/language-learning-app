# Language Learning App

A free language-learning project for practical Latvian ↔ Russian communication, initially for ages 10–17.

## Try the browser test build

**[Download the test HTML file](downloads/language-learning-test.html)** using GitHub's Download raw file control, save it with the `.html` extension, and open it in a browser. GitHub's source/raw viewer does not run the app. No installation, server, account or network is needed after download.

This test build contains ten draft lessons and 100 prompt pairs. Choose Latvian → Russian or Russian → Latvian, then Start practice. Tap one of four reshuffled choices: feedback appears immediately, then the next prompt opens automatically after 0.5 seconds. No Continue button is needed. Ten correct answers in a row complete a lesson; a mistake steps back one prompt and resets the run. Fresh sessions start at lesson one. There is no saved browser progress, tracking, ads, XP, lives or daily streaks.

**Draft, not a finished release:** fluent human language review, real browser/device/accessibility verification and hosted deployment remain pending. The interface is in English. No pronunciation audio, Android download or Google Play listing exists yet. Do not describe the test build as publicly deployed without actual deployment evidence.

[Testing guide, architecture and verification limits](docs/BROWSER_TEST_BUILD.md).

## Source and checks

```sh
npm test
python -m unittest discover -s tests -p 'test_*.py' -v
python tools/build_browser.py
```

Requires Node 24+ and Python 3.12+. No dependency installation is needed. The generated file is `dist/language-learning-test.html`; the committed download is generated from the same canonical sources and checked for parity in CI.

- `content/`: canonical phrase/lesson data and stable IDs.
- `core/`: platform-independent learning behavior.
- `web/`: accessible browser template, CSS and UI event handling.
- `tools/`: deterministic standalone/browser-site packaging.
- `tests/`: engine/content/UI-wiring and build checks.

## Collaboration and delivery

[AGENTS.md](AGENTS.md) defines the operating rules. [docs/TD.learn.md](docs/TD.learn.md) is the only active backlog; [checkpoint](docs/WORK_CHECKPOINT.md) records current evidence and one next action. The owner develops broad ideas with GPT and explicitly requests Codex implementation. Tasks never launch automatically.

The landing-page source is `docs/discovery-preview/index.html`. The manual GitHub Pages workflow stages only the landing page and generated test app. It does not enable Pages or deploy on merge. [Publication instructions](docs/discovery-preview/LAUNCH.md).

The broader Android/platform proposal in PR #3 remains separate. Browser code sharing does not establish Android compatibility. Android's planned record-only persistence and manual backup/restore are not implemented.

No final app/brand name or source-code/content license has been selected. Public visibility does not grant a reuse license. The mental-health questionnaire is a separate repository; its code, content and workflow are unchanged.
