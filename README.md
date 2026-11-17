# Language Learning App

A free language-learning project for practical Latvian, Russian and English communication, initially for ages 10–17.

## Try the browser test build

**[Download the test HTML file](downloads/language-learning-test.html)** using GitHub's Download raw file control, save it with the `.html` extension, and open it in a browser. GitHub's source/raw viewer does not run the app. No installation, server, account or network is needed after download.

This test build contains 50 draft blocks of ten questions, covering 500 basic words and short phrases with translations in all three languages. Choose any of the six directions between Latvian, Russian and English, then Start practice. Tap one of four reshuffled choices: feedback appears immediately, then the next prompt opens automatically after 0.5 seconds. No Continue button is needed. Ten correct answers in a row complete a lesson; a mistake steps back one prompt and resets the run. Each lesson is a ten-question block. The third mistake in the same block restarts at lesson one, question one, even when correct answers came between mistakes. The mistake count resets on entering a new block or restarting. Fresh sessions start at lesson one. There is no saved browser progress, tracking, ads, XP, lives or daily streaks.

**Draft, not a finished release:** fluent human language review, physical-device/full-accessibility verification and hosted deployment remain pending. The interface follows the source language: Latvian when starting from Latvian, Russian when starting from Russian, and English when starting from English. Changing direction switches the UI immediately. Pronunciation audio covers all 500 vocabulary items in Latvian, Russian and English across all six directions. A speaker button beside the current word or phrase plays its pronunciation in the displayed source language. Only the current prompt is spoken on request; previous-answer replay and automatic answer audio are removed. No Android download or Google Play listing exists yet. Do not describe the test build as publicly deployed without actual deployment evidence.

[Testing guide, architecture and verification limits](docs/BROWSER_TEST_BUILD.md). [Audio editing and module boundaries](docs/AUDIO_MODULES.md).

## Source and checks

```sh
npm test
python -m unittest discover -s tests -p 'test_*.py' -v
python tools/build_browser.py
```

Requires Node 24+ and Python 3.12+. No dependency installation is needed. The generated file is `dist/language-learning-test.html`; the committed download is generated from the same canonical sources and checked for parity in CI.

- `content/`: catalog, permanent concepts, separate ten-question block files and per-language translation/UI modules.
- `core/`: platform-independent learning behavior.
- `web/`: generic accessible browser template, CSS and UI event handling; directions are generated from the catalog.
- `tools/`: deterministic standalone/browser-site packaging.
- `tests/`: engine/content/UI-wiring and build checks.

## Add blocks or languages later

See [the content module guide](docs/CONTENT_MODULES.md). New blocks/languages are registered through data files, not engine edits. Explicit question/concept/correct-answer IDs, meaning checks, strict UI contracts and a digest of the original questions/answers prevent silent binding changes. The owner-requested vocabulary revision has a new course ID and permanent IDs; the earlier 100-item draft is preserved under `archive/course-0.3/`. The first ten blocks contain simple words and short phrases, without sentences. See [the 500-item curriculum](docs/VOCABULARY_500.md).

## Collaboration and delivery

[AGENTS.md](AGENTS.md) defines the operating rules. [docs/TD.learn.md](docs/TD.learn.md) is the only active backlog; [checkpoint](docs/WORK_CHECKPOINT.md) records current evidence and one next action. The owner develops broad ideas with GPT and explicitly requests Codex implementation. Tasks never launch automatically.

The landing-page source is `docs/discovery-preview/index.html`. The manual GitHub Pages workflow stages only the landing page and generated test app. It does not enable Pages or deploy on merge. [Publication instructions](docs/discovery-preview/LAUNCH.md).

The broader Android/platform proposal in PR #3 remains separate. Browser code sharing does not establish Android compatibility. Android's planned record-only persistence and manual backup/restore are not implemented.

No final app/brand name or source-code/content license has been selected. Public visibility does not grant a reuse license. The mental-health questionnaire is a separate repository; its code, content and workflow are unchanged.
