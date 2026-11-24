# L-011 — current-source reconciliation and next correction proposal

**Subsequent implementation:** The owner approved the ten-cell batch with “Make the change already.” Its implementation is tracked in [0.5.7 notes](../2026-11-24-implementation-02.md) and the current checkpoint. This document/tables remain the historical0.5.6 research snapshot; proposal/approval-pending labels below describe that snapshot. F004 Japanese remains deferred.

Research/preparation by codex, 2026-11-24. **Application remains 0.5.6. No vocabulary, recordings, guides, scoring or deployment changed.** Owner approval is required before applying this batch.

## What is already done

Source main: `a5a40869c7af31d63e1230e5260030a6c61516d9`, legacy revision `0.6.2-test`, focused revision `focused-0.1.1`. PR #44 released F001 (shared canonical goodbye), F014 (lunch/dinner choice) and F015 (how-many/price choice). Their exact current bindings have been rechecked. Retain these fixes and the existing inactive `focus-s02` record/audio.

This reconciliation preserves the original research in [held PR #43](https://github.com/janisp123/language-learning-app/pull/43), head `b04732fea576b8c7e65536913ce6b75c98bcb3be`. Its older source snapshot is not current. Of its 94 findings, **3 are implemented, 11 remain confirmed editorial problems, 58 need review, and 22 are preserve recommendations**. “Confirmed” is the inherited research classification, not owner approval or native-speaker certification.

## Exact coverage and limits

| Measure | Current count |
| --- | ---: |
| Stored source concept records | 577 |
| Active correct concept IDs | 576 |
| Distinct Basic correct concepts | 125 |
| Stable question IDs | 630 |
| Course appearances | 710 |
| Unique question × direction pairs | 4,410 |
| Course × question × direction presentations | 4,970 |
| Presented answer bindings | 19,880 |
| Stored audio bindings | 2,308 |

Phase A:80 shared questions/160 course appearances; B:20 Kids-only; C:20 Adults-only; D:510 Full. Phase E runtime binding reconciliation covers every presentation in exactly the six LV/RU/EN directions plus en-ja. Shared meanings and cross-course references are indexed by concept ID rather than counted as independent vocabulary.

Compared with PR #43, **70 presentations (42 grouped table rows, six question IDs) changed**, entirely explained by the three released corrections; the other 4,900 match. [Changes](changed-presentations.csv) retain exact before/after questions and all choices. Seven direction CSVs contain current prompts, correct answers and all three distractors with stable IDs. `courses` expands shared Kids/Adults rows into separate presentations; order in these tables is for inspection, while the actual app shuffles choices.

This is complete **inventory reconciliation**, not a new fluent-human audit of every phrase. Prior editorial assessments are explicitly retained, including uncertain cases. Neither “Keep” nor zero identical choices proves optimal everyday usage, child/adult appropriateness, pronunciation quality or exactly one defensible translation. No recordings were auditioned. Do not describe the whole vocabulary as optimal or the remaining research as resolved.

## Next proposed batch — F002–F007

| Finding / concept | Language | Current → proposed |
| --- | --- | --- |
| F002 / vocab-0004 | JA | ありがとう → ありがとうございます |
| F003 / vocab-0005 | LV | piedod → piedodiet |
| F003 / vocab-0005 | RU | извини → извините |
| F004 / focus-s08 | LV | Kā tevi sauc? → Kā jūs sauc? |
| F004 / focus-s08 | RU | Как тебя зовут? → Как вас зовут? |
| F005 / focus-s09 | LV | No kurienes tu esi? → No kurienes jūs esat? |
| F005 / focus-s09 | RU | Откуда ты? → Откуда вы? |
| F006 / focus-s11 | LV | Kā tev iet? → Kā jums iet? |
| F007 / focus-s28 | LV | Vai tu vari man palīdzēt? → Vai jūs varat man palīdzēt? |
| F007 / focus-s28 | RU | Можешь мне помочь? → Вы можете мне помочь? |

These are shared-default register choices under the owner's polite-safe policy, not claims that familiar forms are incorrect. Exact spellings/case above are the proposed implementation cells. The [machine-readable plan](F002-F007-plan.json) records source keys, current clip hashes, every affected course/question/direction/role and guide dependencies. [Compact CSV](F002-F007-wording.csv) supports wording review. **142 distinct presentations**, nine newly authored recordings and one exact existing reuse; 14 other-language bindings remain byte-identical. All 4,970 hypothetical answer sets have four distinct normalized texts, which checks exact collisions only.

**Separate decision:** F004 Japanese `名前は何ですか` remains unchanged in this batch. The prior proposal was `お名前は何ですか`; the retrieved Japan Foundation source directly teaches **`お名前は？`**, not that expanded sentence. Select an exact Japanese form separately with owner/fluent review. This does not block independent LV/RU proposals, and F004 is not wholly resolved by this batch.

## Evidence and safe implementation

See [source scope](SOURCES.md), [Japanese evidence](japanese-evidence.json) and [bounded implementation handoff](IMPLEMENTATION_HANDOFF.md). Existing references are reused; no invented frequency rankings or native-speaker endorsements. Sources establish expressions or register conventions; selecting the best shared default remains an editorial recommendation.

After this batch, confirmed findings **F008 schoolbag, F009 payment card, F010 stopping an action, F011 current injury and F013 emergency fire** still require precise meaning/wording decisions. The remaining 58 review findings include context and choice ambiguities: use `findings.csv` and each direction table rather than assuming they are already approved. `concepts.csv` lists current forms, reused concepts, inactive records and existing Keep recommendations. `dependencies.csv` maps every text/audio binding and pinned held-guide status, including the stale hello guide; it does not integrate PR #21.

## Reproduce and verify

For this historical0.5.6 snapshot, use an isolated checkout of PR46 merge `e6dd9205103d03419f6a0978e4bb81e9042d8476`, with Python3 and Node installed. These snapshot checks intentionally fail against later changed vocabulary; current0.5.7 tests are separate:

```sh
python -B research/common-usage/2026-11-24-reconciled/reconcile.py
python -B research/common-usage/2026-11-24-reconciled/check_plan.py
python -B tools/check_project_protocol.py
git diff --check
```

The first command checks all current runtime bindings, current concept forms and audio hashes; the second independently simulates the proposal without writing application data. This package has no product-code changes, so local full application suites/browser checks were not rerun. Existing CI checks run on the research PR; prior 0.5.6 test results remain historical release evidence.

To regenerate snapshot tables, first fetch the pinned Git objects (PR #43 and #21), then use `reconcile.py --write`. It writes only this directory. Review source drift before using it on later content versions; it deliberately asserts this snapshot's inventory. Example fetches:

```sh
git fetch origin pull/43/head:refs/remotes/origin/pr43-audit-readonly
git fetch origin pull/21/head:refs/remotes/origin/pr21-dependency-readonly
python -B research/common-usage/2026-11-24-reconciled/reconcile.py --write
```

If either PR advances, obtain the exact immutable heads listed above instead of substituting a new audit. `provenance.json` records source and coverage; old research and historical lock hashes are preserved. Canonical task remains L-011 in `docs/TD_LIST.md`, with the current handoff in `docs/WORK_CHECKPOINT.md`.
