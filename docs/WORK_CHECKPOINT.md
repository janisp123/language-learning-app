# Current working checkpoint

As of 2026-11-17. Branch feat/testable-browser-app, open PR #6; no merge/public release.

## Product and current build

Approximately 500 survival words/phrases, with vocabulary reuse and understandable communication before style/formal grammar. The bank, player/view and learning engine are unchanged.

Build 0.4.3 completes sound for all 500 questions in Latvian/Russian/English across all six directions: 1,500 embedded MP3 clips. Correct-target pronunciation follows either answer outcome, with previous-answer replay. Existing 500 ms navigation and cancellation remain unchanged. All-phrases coverage validation rejects missing recordings.

English online synthesis remained unreliable. All 500 English clips were generated offline using the installed Flite cmu_us_slt voice and saved in ten commits of fifty clips. The active manifest records provider per English clip; pending metadata was consolidated. tools/local_english.py is optional authoring tooling, never a runtime dependency. tools/generate_audio.py regenerates a registered English clip without gTTS/network. Russian/Latvian recordings remain byte-identical.

## Verification

36 Node and 20 Python tests pass locally, including all 500 questions in every direction, embedded bytes, content locks, full coverage and offline English generation without the online provider. All 1,500 MP3 clips decode. Chrome preview verified English playback duration/played ranges, replay/reset cancellation and English-source UI with Russian audio. File:// checks remain blocked by Cloud Chrome policy; physical phones and fluent pronunciation review remain pending.

## Delivery and synchronization

Default Drive folder Git_dump/language-learning-app, ID 1U6ewdAD-HsthuchnzVOeWOSs4hmM-EAX; stable HTML ID 1594pGCAm3E7hOq0-oSwLFh8z4WtRI3vd. Final 0.4.3 HTML is uploaded and downloaded back with exact byte equality: c83f9e14d25127c9f4855b2e33bf9147ff8de0933a63ae2b9d6766242375312d. Build source commit d8ab062c6334c393b93acab7d4b14df605c2e95b. See delivery/2026-11-17-english-complete-drive-sync.json. GitHub push is still returning a shared proxy/upstream HTTP 503; local source/asset commits are retained. Remote branch was last verified at 1debafd; no CI success is claimed for unpushed changes.

## Next action

User downloads the updated 0.4.3 HTML from Drive and tests English sound. Retry source synchronization when GitHub connectivity recovers. Earlier checkpoint: history/WORK_CHECKPOINT-before-english-completion.md.
