# Current working checkpoint

As of 2026-11-17. **DONE: answer speakers 0.4.8 implemented, verified, pushed, merged, delivered through Drive and publicly deployed.** Owner explicitly requested merging PR #12; merged at a419251338b9b8c4ea28a84e4813c1130f5730ec. Existing Pages workflow 44115906044 succeeded; main CI 44115906188 passed. No unrelated PRs were merged.

App: https://janisp123.github.io/language-learning-app/learn/
Website: https://janisp123.github.io/language-learning-app/
README already links direct app, website and portable HTML. Hosted app and downloadable HTML return 200 under default HTTPS verification and match the canonical/Drive 0.4.8 bytes exactly: 15,813,863 bytes; SHA-256 ddd53f9dbd775640548cab28641f4374e553208fe45ff23655b565251c44a2a2. Publication receipt: delivery/2026-11-17-answer-speakers-deployment.json; hosted browser evidence: delivery/2026-11-17-answer-speakers-hosted-browser.json.

## Current behavior

Every answer has a separate speaker button. LV/RU/EN answer speakers play the exact target-language choice without selecting, grading, reshuffling or advancing. Learners can listen repeatedly to all four choices, including keyboard Enter/Space activation. Clicking answer text submits as before. Both controls lock during the answer transition; stale controls cannot replay old choices. One shared player cancels overlapping sound. Current-prompt autoplay, scoring and 500 ms transition are unchanged.

Japanese answer recordings are not bundled: its answer speakers are clearly labeled unavailable/disabled, while answer selection stays active. English→Japanese retains English prompt audio and UI. Exactly seven directions remain allowed; no Japanese reverse/LV/RU pairings.

All original content IDs, translations, question/correct-answer/distractor bindings and 1,530 recordings are unchanged. 510 meanings in 51 blocks. Zero learner-state saves on all platforms: session memory only; each reload/process begins lesson 1. No saved record/history/preferences or progress export/import.

## Verification and delivery

43 Node / 28 Python tests pass. Independent code review found no actionable issue. Local Chromium decoded all four choices in all six original directions and verified exact target clips, keyboard playback without grading, 499/500 ms navigation, cancellation, empty storage/reload reset and 320/1200 px layout. Hosted browser checks independently verify public behavior. Headless browser trust bypass is recorded; independent full-byte HTTPS reads use default TLS verification. Physical devices, full screen-reader and fluent human pronunciation review remain pending.

Source 00aa316 was pushed before Drive upload; complete downloaded bytes compared exactly. PR #12 final source 079dc7b passed CI 44115485325 before merge. Stable Drive file 1594pGCAm3E7hOq0-oSwLFh8z4WtRI3vd remains the same verified 0.4.8 app; delivery receipt: delivery/2026-11-17-answer-speakers-drive-sync.json. Earlier PRs #7–#10 are merged and 0.4.7 was previously hosted; historical publication docs in PR #11 remain separate and should not overwrite this later state.

Next: collect fluent human pronunciation, physical-device and accessibility review. No additional Japanese recordings or unrelated backlog work is automatically authorized. Android/Play is unimplemented/unpublished.
