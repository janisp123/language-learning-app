# GitHub Pages setup and editing handoff

The language-app website is already built. The owner does not need to create or design another webpage. GitHub Pages will host the existing repository sources, using the same delivery pattern as the mental-health project: a landing page, an online Learn action and a stable Drive-folder download action. Keep the projects and their task lists separate.

## One-time owner setup

1. Open [this repository's Pages settings](https://github.com/janisp123/language-learning-app/settings/pages) while signed into an account with repository administration access.
2. Under **Build and deployment**, select **Source: GitHub Actions**. Complete any account confirmation GitHub requires.
3. Return to the working chat and report that the setting is enabled. Saving the setting does not itself resume a stopped ChatGPT/Codex session.

The connected GitHub tools can edit repository files and retry workflow jobs, but do not expose this Pages administration setting. The workflow intentionally uses `configure-pages` with `enablement: false`; it reads the owner-enabled configuration.

## Verified state and blocker

PR #6 is merged. Version 0.4.3 and its full audio source are on main at `85e4dc400fe58075df806cf5d03d3c757a9f49bf`. Browser checks [44053240358](https://github.com/janisp123/language-learning-app/actions/runs/44053240358) succeeded.

Publication [44053240327](https://github.com/janisp123/language-learning-app/actions/runs/44053240327) failed at **Read owner-enabled Pages configuration**, after the tests succeeded. The job log reports: **Get Pages site failed** / **Not Found**, and asks for Pages to be enabled with GitHub Actions. Deployment was skipped. No live website URL has been verified.

This is a hosting-configuration blocker, not a missing webpage or unsynchronized app source. Recheck the latest remote state before acting; this record is a dated handoff.

## Resume publication after setup

Codex should refresh main and inspect the existing publication run, then rerun only its failed jobs if it is still the relevant run. Avoid duplicate deployments. If GitHub requires an environment approval or reports another configuration error, identify that exact requirement.

Read the actual `page_url`/deployment result before reporting a live address. Verify the landing page, Learn action, language/direction selection and pronunciation. Download the hosted `learn/index.html` and compare its SHA-256 with the current verified Drive delivery record linked from [WORK_CHECKPOINT.md](../WORK_CHECKPOINT.md). Record the successful run, public URL, exact source and readback evidence there. Physical-phone and fluent pronunciation checks remain separate.

## Where future edits belong

| Change | Canonical source |
| --- | --- |
| Landing-page copy, layout and links | `docs/discovery-preview/index.html` |
| Learning interface and behavior | `web/` and `core/` |
| Vocabulary, translations and audio metadata | `content/`, following the content/audio module contracts |
| Recorded pronunciation assets | `audio/` |
| Browser artifact generation | `tools/build_browser.py` |
| Website staging | `tools/build_site.py` |
| Publication | `.github/workflows/landing-pages.yml` |

ChatGPT/Codex can maintain these repository sources when the owner requests changes. Read AGENTS.md, the current checkpoint and the canonical `docs/TD.learn.md`; work through an isolated branch and checked PR. Respect the repository's merge/publication authorization rules. Rebuild generated app copies from canonical sources; preserve stable content IDs and avoid editing generated HTML as an independent application.

The **Publish language app website** workflow runs after relevant approved changes reach main, or by manual dispatch on main. Feature branches cannot deploy. Once hosting is enabled, ordinary site edits use this existing workflow; the owner need not rebuild the webpage manually or repeat initial setup for each edit. Changes to this handoff file also match the existing publication path filter.

## Published artifact and delivery boundaries

- `index.html`: landing page.
- `learn/index.html`: complete self-contained browser app with 1,530 pronunciation clips for 510 items.
- `language-learning-test.html`: identical app bytes retained for technical parity checks.

The public download action points to the default Drive folder. Only staged public files enter the artifact. Learning state remains in browser memory. Preserve the established Drive delivery/readback process when a requested app change also updates the review download; a website deployment does not by itself prove Drive was refreshed.
