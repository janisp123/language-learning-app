# Current working checkpoint

As of 2026-11-17. Repository: janisp123/language-learning-app. Publication is BLOCKED on GitHub Pages setup; application source synchronization is DONE.

## Current integrated source

PR #6 is merged as `85e4dc400fe58075df806cf5d03d3c757a9f49bf` on main. It contains version 0.4.3, the complete audio source and the recovery history through `24aa6d47eae39853c1496bf05b2f0f4f11030d48`. Refresh actual main and open PRs before resuming; do not recover or push an older backup over newer work.

Approximately 500 survival words/phrases, prioritizing reuse and understandable communication. The build contains 500 questions in 50 blocks, Latvian/Russian/English in all six directions, and 1,500 embedded pronunciation clips. Existing 500 ms transitions, wrong-answer step back, third-block-mistake reset, ten-consecutive-correct completion and playback cancellation are retained.

English uses locally authored Flite cmu_us_slt recordings; optional authoring tools are not runtime dependencies. Android, progress backup/restore, license adoption and Play release remain unfinished.

## Verification and delivery

Main browser-check run [44053240358](https://github.com/janisp123/language-learning-app/actions/runs/44053240358) succeeded. The publication job also completed 36 Node tests and 20 Python test cases, with two optional local-voice tests skipped, before encountering the Pages configuration error. Earlier local evidence records all 1,500 clips decoding and Chrome playback/replay/cancellation checks. Those runtime checks were not rerun during this documentation update. Physical phones, local-file opening and fluent pronunciation review remain pending.

Default Drive folder: `Git_dump/language-learning-app`, ID `1U6ewdAD-HsthuchnzVOeWOSs4hmM-EAX`. Stable HTML ID: `1594pGCAm3E7hOq0-oSwLFh8z4WtRI3vd`. Recorded 0.4.3 readback SHA-256: `c83f9e14d25127c9f4855b2e33bf9147ff8de0933a63ae2b9d6766242375312d`; build source `d8ab062c6334c393b93acab7d4b14df605c2e95b`. See [delivery evidence](delivery/2026-11-17-english-complete-drive-sync.json). The Drive source-history bundle remains a backup; it is no longer the only location of the completed source.

## Website setup and future editing

The webpage is already built. The owner only needs to open repository **Settings → Pages → Build and deployment → Source: GitHub Actions**, completing any required account confirmation. The connected GitHub tools do not expose that administration setting.

Publication run [44053240327](https://github.com/janisp123/language-learning-app/actions/runs/44053240327) failed at **Read owner-enabled Pages configuration** with **Get Pages site failed / Not Found**. Deploy was skipped. No public URL has been verified.

[The durable website handoff](discovery-preview/LAUNCH.md) records the exact setup, canonical editable files, publication workflow, source/hash verification and future ChatGPT/Codex editing process. Use the same GitHub-source workflow as the mental-health website while keeping this repository separate.

## One next action

Owner enables **Source: GitHub Actions** and reports completion. Then Codex rechecks current main/run state, retries the relevant failed publication jobs and verifies the returned URL and hosted app hash. Preserve existing authorization and release rules; do not claim publication from a merge or passing build alone.

PR #3 (older architecture proposal) and PR #4 (workflow lessons) remain separate. Earlier implementation history is in [the archived checkpoint](history/WORK_CHECKPOINT-before-english-completion.md).
