# Common-usage first correction slice

Owner approved the proposed small correction batch on 2026-11-23. Implement inline with existing JSON modules, then independently review. No engine/UI rewrite, added vocabulary or held-feature merge.

## Scope and approach

- Japanese vocab-0001: やあ → こんにちは (neutral daytime hello). Reuse the exact existing 0269 pronunciation bytes under 0001's permanent asset path; preserve all other recordings.
- Six proven overlapping choice pairs: 0091/0092, 0134/0135, 0148/0149, 0209/0210, 0402/0403, 0403/0404. Replace only the listed distractor in each question with an unrelated same-block concept; preserve question/meaning/correct-answer IDs and other choices.
- Keep legitimate shared Japanese こんにちは at 0001/0269; require four distinct choices per actual question, not artificial global uniqueness. Preserve original vocabulary digest by reversing only explicitly authorized distractor changes for historical comparison; do not regenerate locks.
- Main has no reading-guide feature. Record the matching per-symbol こ/ko ん/n に/ni ち/chi は/wa patch for later PR #21 reconciliation without importing/merging that feature. Final は is pronounced wa in this greeting.
- Review version0.4.13/content0.6.1-test distinguishes this slice from held0.4.12. ZERO saves, seven directions and500ms unchanged. No merge/publication.

## Execution

- [x] Add regressions for greeting/audio, excluded ambiguous pairs, precise historical preservation and legitimate shared Japanese text. Observe failures.
- [x] Apply one translation/audio replacement and six distractor substitutions; update precise preservation evidence, no baseline digest rewrite.
- [x] Build generated download, run full Node/Python suites/protocol and real Chromium affected-row/audio/layout/reload checks.
- [x] Independent review; update canonical TD/checkpoint/changelog and durable evidence, correcting PR #26's merged status.
- [x] Push source and checked PR, then deliver review build through stable Drive with exact download-back equality if connector supports it. Report any actual blocker; no automatic release.
