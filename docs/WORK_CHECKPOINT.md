# Current working checkpoint

As of 2026-11-17. Repository: janisp123/language-learning-app. Main contains 0.4.3; current review build 0.4.4 is pushed to PR #7 and delivered through the stable Drive file. Integration is PENDING PR; publication remains BLOCKED on GitHub Pages setup.

## Current integrated source

PR #6 is merged as `85e4dc400fe58075df806cf5d03d3c757a9f49bf` on main. It contains version 0.4.3, the complete audio source and the recovery history through `24aa6d47eae39853c1496bf05b2f0f4f11030d48`. Refresh actual main and open PRs before resuming; do not recover or push an older backup over newer work.

Approximately 500 survival words/phrases, prioritizing reuse and understandable communication. The build contains 500 questions in 50 blocks, Latvian/Russian/English in all six directions, and 1,500 embedded pronunciation clips. Existing 500 ms transitions, wrong-answer step back, third-block-mistake reset, ten-consecutive-correct completion and playback cancellation are retained.

English uses locally authored Flite cmu_us_slt recordings; optional authoring tools are not runtime dependencies. Android, license adoption and Play release remain unfinished.

**Owner decision, 2026-11-17: zero learner-state saves on every platform.** Browser, Android and future wrappers keep only current session memory; no highest record, saved answers/preferences, progress files, backup/import or OS progress restoration. Each fresh session/reload/process restart starts at lesson 1. The browser already follows this behavior; the earlier Android persistence requirements are removed from AGENTS, architecture, L-005 and release gates. PR #3's old storage assumptions are superseded. No change to the 0.4.4 portable app bytes is needed for this policy update.

Zero-saves verification: headless Chromium reached lesson 2 in each of the six directions, then reload started at lesson 1 with fresh counters. localStorage/sessionStorage/IndexedDB/cookies were empty after practice and reload. Closing and reopening the same persistent browser profile again started at lesson 1 with empty storage. See [the verification record](delivery/2026-11-17-zero-saves-verification.json). Android remains unimplemented, so its native lifecycle/storage checks remain pending. Website staging succeeds with the new policy copy; embedded app bytes still match the delivered 0.4.4 hash.

## Verification and delivery

Current 0.4.4 review behavior: the speaker beside the current word/phrase plays only that source-language prompt on request. Previous-answer replay and automatic answer sound are removed at the owner's request. Advancing, restart, direction change and completion stop sound; scoring, answer choices and the existing 500 ms delay are unchanged. See [audio contracts](AUDIO_MODULES.md).

Current verification: 37 Node and 20 Python tests pass locally. The new regressions were first observed failing before implementation; standalone tests cover all 500 questions in all six directions. Headless Chromium at 390×844 verified real decoded playback, 48 px speaker, keyboard replay, no horizontal overflow, scoring isolation and navigation cancellation in all six directions. Browser console has no page errors. Physical Android and full accessibility/fluent-language review remain pending.

Integrated-main browser-check run [44053240358](https://github.com/janisp123/language-learning-app/actions/runs/44053240358) succeeded for 0.4.3. The earlier publication job completed its tests before encountering the Pages configuration error. These existing remote checks do not establish integration or publication of the new review build.

Default Drive folder: `Git_dump/language-learning-app`, ID `1U6ewdAD-HsthuchnzVOeWOSs4hmM-EAX`. Stable HTML ID: `1594pGCAm3E7hOq0-oSwLFh8z4WtRI3vd`. Current 0.4.4 HTML was replaced in place, downloaded back and compared byte-for-byte: SHA-256 `3c55f24a42fd119fba8bccac5c51e8dbcc57cc79a2be49b109f61a486e2aceb7`, 15,323,078 bytes. Build source `02d1da877d20382a3eb6e13a83c4c0fe54fc7461` is verified on PR #7; CI [44069083521](https://github.com/janisp123/language-learning-app/actions/runs/44069083521) succeeded and independent review found no actionable issues. See [current delivery evidence](delivery/2026-11-17-current-prompt-drive-sync.json). The earlier 0.4.3 delivery record and source-history bundle remain historical recovery evidence.

## Website setup and future editing

The webpage is already built. The owner only needs to open repository **Settings → Pages → Build and deployment → Source: GitHub Actions**, completing any required account confirmation. The connected GitHub tools do not expose that administration setting.

Publication run [44053240327](https://github.com/janisp123/language-learning-app/actions/runs/44053240327) failed at **Read owner-enabled Pages configuration** with **Get Pages site failed / Not Found**. Deploy was skipped. No public URL has been verified.

[The durable website handoff](discovery-preview/LAUNCH.md) records the exact setup, canonical editable files, publication workflow, source/hash verification and future ChatGPT/Codex editing process. Use the same GitHub-source workflow as the mental-health website while keeping this repository separate.

## One next action

Content evaluation: [the 500-item situation audit](review/2026-11-17-vocabulary-situation-audit.md) maps supported everyday exchanges, gaps, ordering and bounded meaning-review candidates. This is an assessment only; no vocabulary, translations, IDs, order or new implementation tasks were changed/approved.

Review and integrate the updated PR #7 through the authorized workflow. Owner enables **Source: GitHub Actions** and reports completion. Codex then rechecks current main/run state and follows the appropriate publication run, verifying the returned URL and hosted app hash. Preserve existing authorization and release rules; do not claim publication from a merge or passing build alone.

PR #3 (older architecture proposal) and PR #4 (workflow lessons) remain separate. Earlier implementation history is in [the archived checkpoint](history/WORK_CHECKPOINT-before-english-completion.md).
