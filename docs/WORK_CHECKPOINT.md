# Current working checkpoint

Current task: L-011

## Resume summary — 2026-11-23

**Phase: IN_REVIEW — audit and reference-library artifacts prepared, pending checked PR integration.** The owner explicitly requested the common-usage audit and a reusable library of practical common words/phrases. This authorizes research/reference work, not active vocabulary corrections, PR #21 integration or app publication.

**Branch/baseline:** `research/common-usage-library`, isolated checkout `/workspace/work/common-usage-library`, based on main `066ce2be6c0e2664604d864e7a051a40a70d75cb`. Source `59d22d1a095954435f902cda2059f92fe120e863` is pushed in [PR #26](https://github.com/janisp123/language-learning-app/pull/26), OPEN and unmerged. Final handoff metadata is on the same branch; read the actual PR head/checks on resume.

## Completed reference work

- [Common-usage audit](../research/common-usage/README.md): all 510 IDs per language, 2,040 decisions. LV/RU/EN full editorial passes considered actual distractors; Japanese reuses the [saved full review](review/2026-11-18-japanese-usage-audit.md), rebound to current forms/choices. Per-language JSON records current text, proposals, priorities, reasons, source URLs and evidence levels; coverage.json pins input hashes. Unflagged means working keep, not native certification.
- [Reusable common-core library](../library/README.md): 60 practical words/short phrases in four languages, stable library IDs, situation/register notes, source register and pending-review labels. It is separate from active `content/`; no loader imports it. This is a focused starter library for expansion, not a new course or a measured frequency ranking.
- Main application remains 0.4.11; no translation, ID, binding, recording, reading guide, algorithm, storage, generated download, Drive review file or website source change.

## Pending product work

- [PR #21](https://github.com/janisp123/language-learning-app/pull/21) remains OPEN/UNMERGED/ON HOLD at last checked head `72e6ab4c106c6ee7c48703af025919c81d5c3b55`: reading-guide review build0.4.12, only lv-ru / ru-en / en-ja. Before later integration reconcile its old task-path/instruction edits against current main. All seven directions and ZERO learner-state saves remain mandatory.
- The stable Drive review file remains the previously verified0.4.12: file1594pGCAm3E7hOq0-oSwLFh8z4WtRI3vd; 21,558,493 bytes; SHA256 `d3f3b5cab491f997647844fe69f34b9a72fb625087f67e75b74da7fefcc0f5c6`. No new upload/readback is claimed for this reference-only work.
- Owner decisions and fluent-human language review are pending. Prioritize neutral Japanese hello; overlapping who/leg/foot/plaster/pan/word/phrase/sentence choices; then short wording improvements. Register/family/rice/weather cases require agreed context, not blanket substitutions. Russian здравствуйте is already the desired greeting.
- Technical tests do not certify language quality. No native review, new audio verification or physical-device test is claimed by this research slice.

## Exact next action

Review the checked reference PR and proposed small correction slice. Obtain explicit owner approval for any vocabulary/binding/audio correction or held-feature merge/publication; then implement only approved IDs, synchronizing recordings and any reading guides. Do not choose old L-001, merge #21, or run backlog work automatically. Bare “continue” still means read-only preflight under AGENTS.md.

The canonical active task list is [docs/TD_LIST.md](TD_LIST.md); chat, cw and codex must fetch latest remote main and this checkpoint. The previous checkpoint is preserved [verbatim](history/WORK_CHECKPOINT-before-common-library-2026-11-23.md).

## Verification and source status

- PASS: 46 Node / 32 Python tests; protocol checker; 2,040-decision ID/current-form/hash checks; 60-entry/240-form library structure and source-reference integrity; local Markdown links; diff whitespace.
- PASS: generated app equals the committed download exactly: 21,388,029 bytes, SHA256 `e5bb8fee28d2d3f781de41f0e59f9592e27163bdf73ef7e4323039db6ab07c40`.
- [Verification receipt](review/2026-11-23-common-usage-verification.json) records commands and limits. Independent review passed with two minor notes resolved (verification section and cc-p032 location context). Source pushed in PR #26; GitHub protocol run45195968796 passed and browser test run45195968596 was running at metadata update. Final PR-head CI is checked separately after this metadata commit. No merge or publication. No fresh physical-device or native-language certification is claimed.
