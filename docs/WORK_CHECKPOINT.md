# Current working checkpoint

Current task: L-010

## Latest verified delivery — L-017

**LIVE0.5.5:** flag on every question opens a localized copy-only correction panel. Choose Question or any displayed Answer,enter a proposal,and copy exact original text plus language direction,preset,app/content version and stable course/lesson/question/concept/answer IDs. Snapshot stays pinned across normal advancement. Nothing auto-submits or saves; denied clipboard offers selectable text. Close/Escape/reset/reload discard drafts and stale clipboard callbacks cannot revive them. UI/details LV/RU/EN,keyboard/mobile/light-dark verified. No scoring/audio/content changes.

Source94dca338b6d1a42d523676624ccaaf95fad4d00a, [PR #39](https://github.com/janisp123/language-learning-app/pull/39) merged3b921b648eb51289be68c93f0ab7a4169d753334. Source CI45300516830/main CI45300715228 and Pages45300715317 succeeded. Actual app/landing/offline downloaded via verified HTTPS and byte-identical to tested source. App26,184,254 bytes,SHA256e040f1ea0ed930f17d30ab5dff52678db96be3224d5d0c1c393b651173be3306. [Open app](https://janisp123.github.io/language-learning-app/learn/?v=0.5.5) · [Receipt](delivery/2026-11-24-translation-report-live.json).

61Node/41Python;21 report direction/preset cases with actual clipboard,fall back/late-copy,snapshot,plain-text injection,cleanup/reload/no storage and320/390/1280 dark-light passed. Existing21 native audio+2sec cases passed. Independent review approved after localizing visible details and accommodating native Chromium focus boundary while checking background remains inert. Physical phone/full screen reader not run;known direct hosted Chromium trust limitation remains;HTTPS readback matches local real-browser source. Drive review unchanged;website offline updated. L-017 archived in docs/history.

## Latest verified delivery — L-016

**LIVE0.5.4:** correct answers play the whole target recording, then wait2000ms before advancing. Actual ended event controls timing; no guessed duration or500ms cutoff. Reset/course/direction cancels sound and pause. Missing/blocked/error audio recovers after2000ms; existing30s stall watchdog remains. Incorrect-answer three-pair correction, engine/content/2308 clips/seven directions/dark default/ZERO saves preserved.

Source39c79c6, [PR #37](https://github.com/janisp123/language-learning-app/pull/37) merged4e0c1681098d9c7d867be55538d42b0506befc9d. Source CI45291615204/main CI45291767609 and Pages45291767575 succeeded. Actual app, landing and offline downloaded through verified HTTPS and byte-identical to tested source. App26,171,008 bytes, SHA2563ae875053577cbc3b303518e31a155760cec580cd11e9b7c10372a63b6ceb2bf. [Open app](https://janisp123.github.io/language-learning-app/learn/?v=0.5.4) · [Receipt](delivery/2026-11-23-correct-delay-live.json).

58Node/41Python;21 real-browser native playback+2sec cases, long playback,1999/2000ms boundary, audio errors/stalls, duplicate submissions and cancellation in both phases passed. Independent review approved and19 audio/UI tests independently rerun. Physical phone/full screen reader not run; known direct hosted Chromium trust limitation remains; HTTPS byte equality links published source to locally tested real browser. Drive review unchanged; website offline updated. L-016 completion archived.

## Latest verified delivery — L-015

**LIVE0.5.3:** selecting a correct answer invokes its ordinary target-language speaker action, then advances at500ms with no extra wait. Next prompt stops old sound; longer recordings can be interrupted, as explicitly chosen instead of a full-recording gate. Wrong submissions retain three current-question/correct-answer pairs; speaker-only taps never grade. Engine/content/2308 recordings/seven directions/dark default/ZERO saves preserved.

Source3caf3a7, [PR #35](https://github.com/janisp123/language-learning-app/pull/35) merged6179fb19d7eb2646adb84113c27039cf245f7b78. Source CI45263876957/main CI45264057705 and Pages45264057689 succeeded. Actual app/landing/offline downloaded through verified HTTPS and exactly equal tested source. App26,169,966 bytes, SHA2569b51fb3d9241f90198ac650af274f3635b1d169aedb48c22fbd50605bfcc7485. [Open app](https://janisp123.github.io/language-learning-app/learn/?v=0.5.3) · [Receipt](delivery/2026-11-23-selected-answer-live.json).

56Node/41Python; every original prompt across all seven directions,499/500ms and cancellation/correction tests,21 real-browser course/direction combinations, duplicate and blocked playback passed. Independent review approved and independently ran21 browser combinations. Physical phone/full screen reader not run; known direct hosted Chromium trust limitation remains, verified HTTPS bytes match locally tested real browser. Drive unchanged; website offline file updated. Completed L-015 history archived.

## Latest verified delivery — L-014

**LIVE0.5.2:** direction first, then exactly Basic Kids100 / Basic Adults100 / Full510. Website/app start dark on every fresh load; manual light stays current-visit only, and any landing theme fragment is immediately consumed. Seven directions/content/recordings/engine/scoring/500ms correct transition/three-pair correction and ZERO saves preserved.

Source dd6e09f, [PR #33](https://github.com/janisp123/language-learning-app/pull/33) merged964fc25f30a367b2e1650986d48e09aa9c3586aa. Source CI45260854746/main CI45260975725 and Pages45260975524 succeeded. Actual hosted app, landing and offline HTML downloaded through verified HTTPS and match tested source byte-for-byte. App26,169,877 bytes, SHA2561100e0e67df8ac5c2fe5e26bdb70cbcebe30dbc15ffbdd4d0c88e1c8a689490d. [Open app](https://janisp123.github.io/language-learning-app/learn/?v=0.5.2) · [Delivery receipt](delivery/2026-11-23-simple-course-dark-live.json).

55Node/41Python; all21 direction/course starts, reload dark/default lesson1, consumed light handoff, zero storage,320/390/1280 dark/light layout checks pass. Independent review approved. Physical phone/full screen reader not run. Known direct hosted Chromium trust limitation remains; verified HTTPS byte equality connects local real-browser tests to deployed source. Drive review unchanged; website offline file updated. Completed L-014 archived in docs/history/L-014-completed-2026-11-23.md.

## Last completed slice — 2026-11-23

**L-013 correction listening is LIVE at0.5.1.** [Open the app](https://janisp123.github.io/language-learning-app/learn/?v=0.5.1). After a wrong answer the CURRENT source question and CORRECT target answer play three times, waiting for all six ended events, then automatically step back. No Try again control. Third cumulative block mistake restarts lesson1 after listening; correct answers keep500ms. Reset/course/direction cancels stale sound/navigation; rejected/errored/stalled playback shows correction/error and recovers automatically. Engine/counters/vocabulary/IDs/all2308 recordings, seven directions and ZERO saves unchanged.

Sourcebb313e5, [PR #31](https://github.com/janisp123/language-learning-app/pull/31) MERGED at4605a86bbd46db69bfda11e5f94685a230f8d353. Source CI45254413472/main CI45254638977 passed. Pages45254639189 attempt1 failed with a Connect Timeout Error creating deployment; failed-job-only retry succeeded on attempt2. Actual app and landing downloaded through verified HTTPS and byte-identical to checked source. App26,170,224 bytes, SHA256275430397ffdcb95e1ac0d660615a3023f4f1025dc7b543e4d399aa24e2813d2. [Live receipt](delivery/2026-11-23-mistake-listening-live.json).

Verification:54Node/41Python; actual six fullEN/JA clips then automatic previous prompt, Kids/Adults×seven completion-event cases, third mistake, restart/stale-ended/reused-media late promise, blocked/stall recovery,499/500ms correct-answer gate,320/390/1280 light-dark and zero storage/reload. Independent review cleared. Physical phone/full screen reader not run. Direct hosted headless navigation has a known environment certificate-trust limitation; no TLS bypass, verified HTTPS readback matches the real locally tested app.

## Delivered baseline

Kids/Adults100 each (80 shared+20 specific), source UI and separate original510 course are already live since0.5.0 (PR #29). Website descriptions/README/offline download match actual functionality. First usage corrections PR #27 and design PR #28 are merged; audit/library PR #26 merged. Do not repeat those features or ask again for ordinary checked live-publication approval:Owner explicitly requested efficient merging/publishing for website testing. GitHub About description update previously returned403; website/README updates did succeed.

## Exact next bounded work — L-010

Reading-guide PR #21 remains OPEN/UNMERGED; the live app still has no source-letter/per-symbol reading aids. Reconcile its loader/view/data against latest main without overwriting focused courses,the translation-report module/IDs,correction audio,task/protocol, current translations/recordings or zero saves. Applyこんにちは ko/n/ni/chi/wa patch (finalは contextualwa), add complete guide coverage for focused expressions/language-name variants, preserve reading directions lv-ru / ru-en / en-ja only. Other four directions stay unannotated.

Use existing reading modules, test exact text/ID/audio/guide bindings, all-course switching, new correction playback compatibility, mobile/dark/keyboard, scoring/full correct playback+2000ms and zero saves. Publish a verified checked slice under standing owner authorization; do not blindly merge old #21. Save/read back actual hosted bytes and a live receipt. Keep existing held Drive reviews until an appropriate replacement; website offline file is current0.5.5.

Other L-011 context/commonness proposals and fluent-human/device review remain pending. Technical tests do not establish every phrase optimal or conversational fluency. Canonical active tasks:docs/TD_LIST.md; completed L-013 history preserved in docs/history/L-013-completed-2026-11-23.md. Current delivery receipt branch docs/translation-report-live is in /workspace/work/translation-report-panel,based on L-017 merged main; inspect latest actual main/PRs on resume.
