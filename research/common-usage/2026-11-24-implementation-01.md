# First bounded common-usage implementation

Owner requested starting implementation after the audit. Baseline mainf7bed6c; audit[PR #43](https://github.com/janisp123/language-learning-app/pull/43) headb04732fea576b8c7e65536913ce6b75c98bcb3be is referenced,not merged. Existing reference library/research remain preserved.

| Finding | Question | Removed competing choice | Replacement | Unchanged taught target |
|---|---|---|---|---|
| F014 | basic-26-prompt-01 | vocab-0252 dinner | vocab-0250 sugar | vocab-0251 lunch / pusdienas / обед / 昼食 |
| F015 | basic-10-prompt-07 | vocab-0098 what price | vocab-0093 where | vocab-0097 how many / cik / сколько / いくつ |

Shared Full-course choice lists affect14 question/direction presentations (two questions×seven directions). The audit demonstrated four English-target grading risks. No taught words, meanings, question/correct-answer IDs or recording bytes change. The explicit before/after fixture exceptions preserve historical lock digests. Legacy course/audio metadata advance0.6.1-test→0.6.2-test so copied reports can identify the revised bank.

## Evidence and limits

The audit’s[shortlist](https://github.com/janisp123/language-learning-app/blob/b04732fea576b8c7e65536913ce6b75c98bcb3be/research/common-usage/2026-11-24-directed/README.md) links[MLVV cik](https://mlvv.tezaurs.lv/cik%3A1),[Gramota сколько](https://gramota.ru/meta/skolko) and the relevant meal entries. We remove competing alternatives rather than assert that dinner/what price are universally wrong translations. No frequency ranking or fluent-human certification is claimed.

F001 farewell is a different semantic/context decision: Owner settled genericuz redzēšanos/до свидания/goodbye across courses, but Japanese departure context is gated in the audit. Reusing canonicalvocab-0002 and existing audio is ready once the Japanese choice is explicit; no silent six-direction split is made. Other register, safety/object meanings and fluent-review decisions remain pending. This document does not mark the full audit implemented or merge held research.
