# Current working checkpoint

As of 2026-11-17. **DONE: build 0.4.7 is implemented, pushed, merged, delivered through Drive and publicly hosted on GitHub Pages.** The owner explicitly approved merging PRs #7, #8, #9 and #10 and publishing the current app. All four PRs are merged. Main after integration: d0d38e70dd344f9f612210a70b76bb2bac29a619.

## Direct access and verified publication

- App: https://janisp123.github.io/language-learning-app/learn/
- Project website: https://janisp123.github.io/language-learning-app/
- Portable HTML: https://janisp123.github.io/language-learning-app/language-learning-test.html
- README on main prominently links all three; the landing Learn action opens the app directly without a download.

Pages workflow 44111718449 succeeded for deployment source 9fc4fed6ee25f4a9533b6eb7282906e22125b9cb. Its deploy log returned the project website URL. The subsequent README-only integration has identical public files. Main CI 44111768967 passed at d0d38e7. HTTPS landing, app and download return 200 with default TLS verification. Hosted landing matches canonical source; hosted app/download match source and the exact verified Drive 0.4.7 artifact: 15,811,471 bytes, SHA-256 bbd877c5e9757453872d2fcacd752103731a3aa51d29e2e51460e1fe7234e6bf. Receipt: delivery/2026-11-17-pages-deployment.json; hosted Chromium evidence: delivery/2026-11-17-pages-browser.json.

## Current product

510 meanings in 51 blocks. All original IDs, LV/RU/EN translations, answer/distractor bindings and 1,530 recordings preserved. Exactly seven directions: lv-ru, lv-en, ru-lv, ru-en, en-lv, en-ru, en-ja. Japanese answers use script only, English UI and existing English source audio. No Japanese reverse/LV/RU pairings.

The current source prompt attempts pronunciation once on every appearance; replay remains usable after autoplay rejection. Old sound stops on prompt change, restart, direction change and completion. Scoring and 500 ms transitions are unchanged. Footer: Made by Janis Paegle 2026 with owner profile and preserved project source links.

Zero learner-state saves on every platform: session memory only, no records/history/preferences or backup/import/export; each reload/process starts lesson 1. Android remains unimplemented. Fluent human Japanese/language/pronunciation review, physical devices and full screen-reader audit remain pending; this is a public draft browser build, not a final Android/Play release.

## Verification and delivery history

41 Node / 28 Python tests pass locally and main CI. All seven directions complete in the UI/engine tests. Local Chromium traversed all 510 en-ja items and verified English audio, script answers, 499/500 ms transitions and session resets; hosted checks independently verify the public app. The headless environment lacks the Pages certificate trust chain, so its browser check bypasses that environment trust issue; independent HTTPS downloads use default TLS verification and verify full byte equality.

Both review slices were delivered in order before integration: 0.4.6 autoplay/footer on PR #8 (delivery/2026-11-17-autoplay-footer-drive-sync.json), then 0.4.7 Japanese on PR #9 (delivery/2026-11-17-english-japanese-drive-sync.json). Stable Drive file 1594pGCAm3E7hOq0-oSwLFh8z4WtRI3vd remains 0.4.7, exactly matching the hosted app. This publication does not alter the verified Drive file.

Next: collect fluent human language/pronunciation and physical-device/accessibility review. No unrelated backlog work is automatically authorized. Future website edits reuse the existing main-only Pages workflow and require hosted readback evidence.
