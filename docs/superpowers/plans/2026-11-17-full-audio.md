# Complete pronunciation coverage

Approved scope: extend the accepted audio behavior to every existing vocabulary item in Latvian, Russian and English and all six directions. Preserve vocabulary, learning engine, player and view APIs. Keep generation outside normal builds; retain valid clips and resume missing work by ID/hash.

- [ ] Extend coverage and real-UI integration tests to all 500 items/all six directions; observe failures on the partial pack.
- [ ] Generate missing clips from canonical text, preserve the existing twenty, and register every clip in the manifest. Add a declarative all-phrases coverage contract so builds reject missing clips.
- [ ] Bump browser build to 0.4.2, update scope wording, rebuild and verify canonical/download parity.
- [ ] Run JS/Python tests, decode all 1,500 clips and verify English plus existing-language browser playback.
- [ ] Push to existing PR #6, replace the stable Drive file, verify downloaded readback, and record the exact delivery checkpoint.

Review focus: incomplete coverage, wrong-language/text binding, generation failures on resume, oversized portable HTML, and unchanged timing/cancellation. No content expansion or public release.

## Resumable batch checkpoint

Batch 1 (RU/LV all 500) is tested and delivered to Drive with byte readback. Local source commit 99016d3; GitHub push is blocked by shared environment proxy HTTP 503. English generation stopped after 111 registered cached clips. Resume from content/audio/pending/english.json; do not treat the full English/all-six-direction scope as complete.
