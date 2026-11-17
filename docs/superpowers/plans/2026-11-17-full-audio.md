# Complete pronunciation coverage

Approved scope: extend the accepted audio behavior to every existing vocabulary item in Latvian, Russian and English and all six directions. Preserve vocabulary, learning engine, player and view APIs. Keep generation outside normal builds; retain valid clips and resume missing work by ID/hash.

- [x] Extend coverage and real-UI integration tests to all 500 items/all six directions; observe failures on the partial pack.
- [x] Generate missing clips from canonical text, preserve the existing twenty, and register every clip in the manifest. Add a declarative all-phrases coverage contract so builds reject missing clips.
- [x] Bump browser build to 0.4.2, update scope wording, rebuild and verify canonical/download parity.
- [x] Run JS/Python tests, decode all 1,500 clips and verify English plus existing-language browser playback.
- [ ] Push to existing PR #6 when connectivity recovers.
- [ ] Replace stable Drive HTML, verify readback, record final checkpoint.

Review focus: incomplete coverage, wrong-language/text binding, generation failures on resume, oversized portable HTML, and unchanged timing/cancellation. No content expansion or public release.

## Resumable batch checkpoint

Batch 1 (RU/LV all 500) is tested and delivered to Drive with byte readback. Local source commit 99016d3; GitHub push is blocked by shared environment proxy HTTP 503. English generation stopped after 111 registered cached clips. Resume from content/audio/pending/english.json; do not treat the full English/all-six-direction scope as complete.

## English completion

Online service continued failing. All 500 English clips were authored offline with the installed Flite SLT voice, ten commits of fifty. Full 1,500-clip pack enabled; 36 Node/20 Python tests and decoder/browser checks pass. RU/LV recordings and learning engine remain unchanged. Source push remains a connectivity blocker; Drive delivery is independent.
