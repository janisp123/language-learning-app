# Current working checkpoint

As of 2026-11-17. **PARTIAL: Japanese answer audio fix 0.4.9 implemented and tested locally; source push/review delivery/integration pending.** Branch fix/japanese-answer-audio starts at main a419251338b9b8c4ea28a84e4813c1130f5730ec (merged PR #12, publicly deployed 0.4.8). Pending docs-only PRs #11/#13 hold previous publication evidence; their stale checkpoints must not overwrite later state.

## Japanese sound bug and repair

Owner reported all Japanese answer sounds nonfunctional. Root cause: 0.4.8 had no bundled Japanese target clips and intentionally disabled those speaker controls. Add 510 exact Japanese translation MP3 recordings, language ja, using existing optional gTTS 2.5.4 authoring. Total 2,040 clips; all 1,530 earlier recordings and records remain byte-identical. All-phrases audio coverage now enforces every enabled source and target language; missing Japanese answer clips fail the build. Existing independent answer-speaker/player/UI paths require no code changes.

All510 meanings/51 blocks, existing translations/IDs/bindings, exactly seven directions, English en-ja interface/prompt audio, scoring / 500 ms transitions and zero saved learner state remain unchanged. Japanese answers now use their exact target clips. No runtime synthesis, accounts or tracking. 43 Node / 29 Python tests pass after observed failures; independent code/asset review found no actionable issue and verified all new hashes/bindings plus original-byte preservation. Chromium decoding and all 2,040 answer-binding replay checks are recorded in delivery/2026-11-17-japanese-audio-browser.json. Fluent human pronunciation/device/full-screen-reader review remains pending.

## Additional owner-requested landing controls

EN/RU/LV buttons translating the landing page, plus a dark-mode toggle beside them, are being implemented independently on feat/landing-language-theme in an isolated worktree. English/light default, in-memory choice only; no preference storage. Preserve Learn/Drive links and exact author credit. These changes are separate from Japanese audio; do not lose them when integrating.

Next: finish browser verification, push checked Japanese-audio source/open PR, replace stable Drive HTML only afterward and download back for exact equality. Then integrate/publish checked changes within explicit authorization and verify actual hosted bytes/browser controls. Keep implemented/pushed/merged/delivered/deployed statuses distinct.
