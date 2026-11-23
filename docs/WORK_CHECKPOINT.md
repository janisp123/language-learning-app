# Current working checkpoint

Current task: L-011

## Resume summary — 2026-11-23

**Phase: first correction slice implemented, verified, pushed and delivered for review; NOT merged/published.** Owner approved the proposed small batch after reviewing the merged audit/library. Current authorization: Japanese neutral daytime hello plus proven overlapping answer choices, tests and a review build. No merge/publication or PR #21 integration approval.

**Baseline:** main `e72e03275cab060bd6c69807e8e0ba0947aa6d9a`, merged [PR #26](https://github.com/janisp123/language-learning-app/pull/26). Audit and 60-entry library are already on main. Branch `fix/common-usage-first-slice`, isolated checkout `/workspace/work/common-usage-fix`.

## This slice

- Review version0.4.13/content0.6.1-test: Japanese vocab-0001 やあ → こんにちは. Its exact existing0269 pronunciation was copied under0001's original asset path; no new external synthesis. The0269 afternoon entry remains valid and unchanged.
- Six distractor substitutions only: who/what0091/0092; leg/foot0134/0135; plaster/bandage0148/0149; pot/pan0209/0210; word/phrase0402/0403; phrase/sentence0403/0404. Replacements are unrelated same-block concepts; all question/meaning/correct-answer IDs preserved. See tests/fixtures/usage-correction-baseline.json for exact before/after choices.
- All other translations and2,039 other recordings remain unchanged. Original digest files remain untouched; historical comparison reverses only the six exact authorized distractor edits. Shared Japaneseこんにちは is allowed at0001/0269, while actual questions still require four distinct options.
- Main does not contain reading guides. [Prepared matching per-symbol patch](review/2026-11-23-hello-reading-guide-patch.json): こ/ko ん/n に/ni ち/chi は/wa, contextual finalは=wa. Apply/validate it when later reconciling held PR #21. No reading-guide feature was imported into main.

## Existing work and remaining decisions

- [Full audit](../research/common-usage/README.md) and [library](../library/README.md) are integrated by PR #26. Their snapshot is historical at066ce2b; do not mistake remaining proposals for implemented changes or their old hashes for current source. Fluent-human review is still pending.
- [PR #21](https://github.com/janisp123/language-learning-app/pull/21) stays OPEN/UNMERGED/ON HOLD; its prior review0.4.12 includes reading guides only for lv-ru / ru-en / en-ja. Reconcile obsolete task-path edits and this greeting patch before later integration. Exactly seven directions and ZERO learner-state saves remain mandatory.
- Stable Drive file1594pGCAm3E7hOq0-oSwLFh8z4WtRI3vd retains prior0.4.12 reading-guide review. Deliver this independent main-based correction review as a separately named file in the same stable folder so the held reading-guide build is preserved.
- Other commonness/register/sense proposals (family, rice, weather, Russian thirsty/walking and optional English wording) remain unimplemented and need separate approval. Public app remains0.4.11 until an explicitly authorized merge/release is verified.

## Verification and exact next step

Initial correction regressions failed on the old greeting/all six pairs, then passed. Full46Node/35Python and protocol checks passed locally. Real Chromium passed all510 prompts in all7 directions, real greeting audio/no grading,499/500ms,completion,reload/zero-storage,320/390/1280 light-dark overflow checks; [browser receipt](review/2026-11-23-usage-corrections-browser.json). Independent review passed with no critical/important issue and independently verified historical baseline hashes/exact six edits. Source cabf68e is pushed in [PR #27](https://github.com/janisp123/language-learning-app/pull/27), OPEN/unmerged; source browser CI45198541573 and protocol45198541506 passed. Review HTML uploaded only after source push, downloaded back and byte-identical; [delivery receipt](delivery/2026-11-23-usage-corrections-drive-sync.json). Final receipt/handoff commit is on the same branch; read current PR head/checks on resume. These technical checks do not certify fluent pronunciation or replace physical-device review.

Review [the separate0.4.13 correction build](https://drive.google.com/file/d/1rVhiL_5fXNwSGwYJE3dMgw0RjyvXY1DZ/view) (21,393,935 bytes; SHA256642cd267a5ac6d7e8b8793f4009bdfb1bb0676b16a521d06a52d280f4fc645c3). Obtain explicit owner merge/publication approval for PR #27 before shipping it. Do not merge #21 or start other corrections automatically. Bare “continue” remains read-only under AGENTS.md. Canonical task list: docs/TD_LIST.md.
