# Reading guides implementation plan

Goal: implement the approved design in ../specs/2026-11-17-reading-guides-design.md without changing learning behavior.

- [x] Add failing loader/renderer tests: only three guide directions, exact translation binding, 510 records each, Japanese symbol alignment, malformed/missing data rejected, plain other directions.
- [x] Author 51 independent ten-item files per direction with draft review status; preserve original data byte-for-byte.
- [x] Implement tools/reading_loader.py, web/reading-view.js, builder embedding and minimal app/CSS integration. Keep guide DOM out of answer identity/audio/player logic.
- [x] Run complete Node/Python suites and canonical build parity; Chromium all seven directions, speaker/scoring/timing, Japanese alignment/small kana, mobile/dark/keyboard and zero storage checks. Inspect screenshots; review guide coverage and known pronunciation limitations.
- [ ] Update docs/checkpoint/TD attribution; independent review. Push source through a PR; CI; only then synchronize Drive with exact downloaded readback. Keep merged and published states separate.
