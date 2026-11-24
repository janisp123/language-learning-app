# First bounded common-usage implementation

Owner requested starting implementation after the audit. Baseline mainf7bed6c; audit[PR #43](https://github.com/janisp123/language-learning-app/pull/43) headb04732fea576b8c7e65536913ce6b75c98bcb3be is referenced,not merged. Existing reference library/research remain preserved.

| Finding | Question | Removed competing choice | Replacement | Unchanged taught target |
|---|---|---|---|---|
| F014 | basic-26-prompt-01 | vocab-0252 dinner | vocab-0250 sugar | vocab-0251 lunch / pusdienas / обед / 昼食 |
| F015 | basic-10-prompt-07 | vocab-0098 what price | vocab-0093 where | vocab-0097 how many / cik / сколько / いくつ |

Shared Full-course choice lists affect14 question/direction presentations (two questions×seven directions). The audit demonstrated four English-target grading risks. No taught words, meanings, question/correct-answer IDs or recording bytes change. The explicit before/after fixture exceptions preserve historical lock digests. Legacy course/audio metadata advance0.6.1-test→0.6.2-test so copied reports can identify the revised bank.

## Evidence and limits

The audit’s[shortlist](https://github.com/janisp123/language-learning-app/blob/b04732fea576b8c7e65536913ce6b75c98bcb3be/research/common-usage/2026-11-24-directed/README.md) links[MLVV cik](https://mlvv.tezaurs.lv/cik%3A1),[Gramota сколько](https://gramota.ru/meta/skolko) and the relevant meal entries. We remove competing alternatives rather than assert that dinner/what price are universally wrong translations. No frequency ranking or fluent-human certification is claimed.

## F001 — Owner-approved shared goodbye

After the explicit Japanese-context question,Owner chose the existing Full-course goodbye in every course:LV **uz redzēšanos**,RU **до свидания**,EN **goodbye**,JA **さようなら**. Basic Kids/Adults now referencecanonicalvocab-0002 for focused-s02/slotS02 and the three shared questions that offered the old alternative as a distractor. Exactly22 source references change (one correct concept +21 per-direction option refs),affecting56 Basic presentations across two presets/seven directions. Combined withF014/F015,this slice changes70 presentations.

No translation or MP3 is rewritten. Full remains unchanged except the two documented distractor lists. Existingfocus-s02 definitions/recordings remain preserved but are no longer selected by active courses. Focused catalog/audio metadata advancefocused-0.1.0→focused-0.1.1. The approved default is not a claim that all Japanese departures useさようなら;the remaining fluent-human review status stays explicit. Existing heldvocab-0002 guide data can be reused later only through verifiedL-010 integration.

Other register,safety/object meanings and fluent-review decisions remain pending. This document does not mark the full audit implemented or merge held research.

## Delivery

Implemented and publicly deployed in0.5.6,PR #44. [Verified live receipt](../../docs/delivery/2026-11-24-first-audit-pause-live.json).63Node/42Python and independent review passed;actual published files match tested source. Remaining findings stay under review.
