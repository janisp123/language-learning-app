# Current working checkpoint

As of 2026-11-17. Branch: feat/testable-browser-app, open PR #6; no merge/public release.

## Product and current batch

Approximately 500 survival words/phrases; reuse familiar words and understandable phrasing before formal grammar/style. Current bank and grading are unchanged.

Build 0.4.2 batch 1 enables pronunciation for all 500 questions in Russian ↔ Latvian: 1,000 bundled clips. Automatic correct-target pronunciation and replay keep the accepted 500 ms navigation. Player/view/engine unchanged. Manifest all-phrases policy rejects incomplete enabled-language coverage.

English expansion is PARTIAL, NOT DELIVERED: 111 clips generated before the synthesis service returned HTTP 503. Cached files and content/audio/pending/english.json preserve that progress; English audio is not enabled in this batch. Full expansion plan: superpowers/plans/2026-11-17-full-audio.md. Do not regenerate valid existing RU/LV recordings.

## Verification and delivery

36 Node and 17 Python tests pass, including full 500-item audio traversal in both enabled directions, exact embedded bytes, text/hash/path integrity and missing-coverage rejection. All 1,000 RU/LV MP3 clips decode successfully. Drive HTML 0.4.2 batch 1 was replaced in place and downloaded back with exact byte equality; SHA-256 16d82b3e08f9090bd1a865e23641c252f9e1938774ff42c70683d82a73a79d1d. See delivery/2026-11-17-audio-batch1-drive-sync.json. Source implementation is local commit 99016d3; GitHub push is BLOCKED by the same shared network/proxy HTTP 503 affecting speech synthesis. Remote branch remains at 1debafd. Human pronunciation and physical-phone checks remain pending.

Default Drive folder: Git_dump/language-learning-app, ID 1U6ewdAD-HsthuchnzVOeWOSs4hmM-EAX. Preserve HTML ID 1594pGCAm3E7hOq0-oSwLFh8z4WtRI3vd. See delivery evidence for the exact distributed source/hash.

## Next action

User can test the completed RU/LV batch from Drive now. When connectivity recovers: push the local batch/checkpoint commits, then resume English from content/audio/pending/english.json without regenerating valid clips, enable all six directions only after full coverage passes, and deliver the next verified batch. Earlier checkpoint: history/WORK_CHECKPOINT-before-full-audio.md.
