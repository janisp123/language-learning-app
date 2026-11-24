# L-011 · Vocabulary and four-choice audit

Research by ChatGPT Work for owner review, 24 November 2026. Source: [main at f7bed6c](https://github.com/janisp123/language-learning-app/tree/f7bed6c0a7ab5908613dfe3719c90e700ea24a36). Development handoff: L-010. All IDs below refer to that source. No implementation or release is authorized by this report.

**Decision:** The two Basic courses already share all 80 common questions exactly, down to their direction-dependent options. Full and Basic still teach different defaults for some shared situations, including goodbye. Fourteen findings identify a specific conflict with the teaching rule or a defensible competing answer. The rest include context decisions, potential ambiguity and expressions worth preserving. There are zero unexamined question IDs in this snapshot. Fluent review and owner decisions remain open.

## Where to look

| File | How to use it |
|---|---|
| [Concept index](concepts.csv) | All 577 canonical IDs, exact four-language forms, lessons' question IDs, courses teaching each ID, and every question using it as a distractor. Filter decision = Keep for 515 concepts to preserve. |
| [Findings](findings.csv) | 94 decisions or observations keyed F001–F094. Filter status = confirmed for 14 issues on 14 concepts, or priority = P1 for the first decisions. Each entry gives direction scope, proposed disposition, evidence scope, reason, uncertainty and authorization. |
| [LV→RU](lv-ru.csv) · [LV→EN](lv-en.csv) · [RU→LV](ru-lv.csv) · [RU→EN](ru-en.csv) · [EN→LV](en-lv.csv) · [EN→RU](en-ru.csv) · [EN→JA](en-ja.csv) | Each has 630 rows. Search a question ID for the exact prompt, its intended meaning, correct answer and three distractors. Search an answer ID across all four option columns for every affected presentation. Shared Basic rows name both courses. Correct is printed first only for review; the learner sees shuffled positions. |
| [Audio and guide bindings](dependencies.csv) | Join on ID and edited language. All 2,308 canonical text/clip bindings, with the corresponding guide direction and module on held PR #21 where one exists. |
| [Previous findings reconciled](previous-findings.csv) | All 79 previously flagged Full language cells compared with the current form and options. Historical reports remain intact. |

A question-row decision concerns the cue, correct expression and fairness of its four choices in this direction. A poor expression used as an unrelated distractor need not invalidate the question. Its own concept decision and all appearances remain searchable. A single finding about wording can apply both when that language is the cue and when it is the answer. A context decision can require coordinated changes beyond the language that first revealed it. Priority and confidence describe the reported issue, not the readiness of an unapproved translation for recording.

## Coverage

| Phase | Distinct question IDs | Course appearances | Distinct question × direction | Course × question × direction |
|---|---:|---:|---:|---:|
| A · shared Basic | 80 | 160 | 560 | 1,120 |
| B · Kids only | 20 | 20 | 140 | 140 |
| C · Adults only | 20 | 20 | 140 | 140 |
| D · Full, including reused meanings | 510 | 510 | 3,570 | 3,570 |
| Total | **630** | **710** | **4,410** | **4,970** |

**Phase E** rechecked the bindings for all 4,970 presentations, or 19,880 displayed option bindings. Seven directions only; Japanese is target-only. Basic teaches 125 correct concept IDs across directions, including 58 Full IDs and 67 extensions. Thus 452 of the 510 Full IDs are new to the audit after the Basic passes. The 577 IDs count source records; they do not assert 577 distinct real-world meanings. The two language-name slots select complete utterances by direction. Their actual variants appear in the seven tables, including when used as distractors.

The editorial pass read the four forms and three authored distractor IDs together, grouping identical bindings and reopening variants when either the concept or distractor set changed. Prior Full reviews were used for lexical evidence. Every row was independently reconstructed from the checked loaders and compared against the output of the actual JavaScript question engine and focused course selector, including ID and text for each option. This tests the data learners receive. Equal strings can be detected mechanically; semantic overlap and the appropriateness of an expression are editorial judgments. No native speaker signed off, no audio listening test was performed, and no frequency rank is claimed.

## Owner shortlist

| Priority | Exact IDs | Smallest useful decision |
|---|---|---|
| Grading | basic-26-prompt-01 · vocab-0251 | For pusdienas / обед, both **lunch** and **dinner** are defensible in English when the main meal is at midday. Replace distractor 0252 with 0250 (sugar). Keep both meal words. [Cambridge](https://dictionary.cambridge.org/dictionary/english/dinner) explicitly documents this British sense. |
| Grading | basic-10-prompt-07 · vocab-0097 | **cik / сколько** can ask for a number or a price. The English choices include both **how many** and **what price**. Replace 0098 with 0093 (where); keep the countable-quantity objective. Use focused-a11 for the separate price question if Full adopts a complete phrase. [MLVV](https://mlvv.tezaurs.lv/cik%3A1) lists price and quantity; [Gramota](https://gramota.ru/meta/skolko) illustrates quantity questions. |
| Cross-course | focused-s02 ↔ basic-01-prompt-02 | Apply the owner's settled LV/RU/EN rule using vocab-0002. Japanese needs a departure context. Irodori identifies さようなら in student–teacher farewells and distinguishes polite departures from casual じゃあ、また for regular contacts. Keep a single Japanese answer per specified situation. [Irodori, lesson 1, p. 17](https://www.irodori.jpf.go.jp/assets/data/starter/pdf/X_L01.pdf) |
| Speaking to an adult | vocab-0004, vocab-0005, focus-s08, focus-s09, focus-s11, focus-s28 | Adopt polite Japanese thanks, polite LV/RU apology, and neutral adult-safe forms for asking a name, origin, wellbeing and help. For example, use **Как вас зовут?** and **Вы можете мне помочь?** for both Basic courses. RU Как дела? already avoids the pronoun. See F002–F007 for exactly which languages change. |
| Safety meaning | vocab-0083, focus-s72, focus-s75 | Decide fire incident versus flame, stopping an action versus movement, and current injury versus pain. Japanese 火事, やめてください and けがをしました help reveal three separate sense decisions. The proposed emergency fire pair is **ugunsgrēks / пожар**. Each unchanged counterpart is recorded in its direction table. |
| Object meaning | focus-k20 ↔ vocab-0391 · focus-a03 ↔ vocab-0280 | Align the lost schoolbag with the taught noun. A schoolbag need not be a backpack. For a generic checkout card, consider reusing カード; クレジットカード excludes debit. |
| Fluent review | vocab-0432 ↔ vocab-0433 · focus-s74 · vocab-0158 | Check look versus watch against the actual alternatives. Decide if “cannot find my way” serves the intended lost-person request. For thirst, prefer Basic's ordinary **Я хочу пить** if Full teaches a personal need. An adjective-identification lesson requires a separate decision. |

The first two rows identify two confirmed grading risks, spanning **four English-target presentations**. The look/watch entry is a third *potential* competing-answer case. A more precise cue or a safer distractor is cheaper than re-recording multiple valid words. Default choices should remain ordinary words even when they admit other senses outside that question.

## Shared meanings and forms to retain

| IDs | Editorial judgment |
|---|---|
| vocab-0001 / vocab-0269 | Keep general daytime こんにちは and Russian здравствуйте. Normal Japanese can use こんにちは for both hello and good afternoon. These IDs do not compete. The old Japanese hello correction has already shipped. |
| vocab-0006, 0007, 0051–0055, 0021–0030 | Keep yes, no, water, bread, milk, tea, apple and one through ten. Kids and Adults reuse the Full IDs directly. Nothing is gained by separate age-specific words. |
| focus-s38 / vocab-0158 and focus-s37 / vocab-0157 | Preserve the Basic expressions for thirst and hunger. Decide separately whether Full is teaching a state adjective or an immediately usable sentence. |
| focus-s71 / vocab-0031 / vocab-0261 / vocab-0501 / focus-s28 | A cry for rescue, a noun, a request, a statement of need and asking for help with a task have different uses. Keep urgent language short. |
| focus-s21 / vocab-0502 | Wanting water and needing it can motivate the same action. Keep the statements distinct; their reusable sentence patterns teach different intentions. |
| focus-k02/k03 / vocab-0017/0018 | Mum/Dad used to address someone and mother/father used to refer to one's parents merit context. Japanese お母さん and 母 are not interchangeable in every role. Decide the situation before consolidating IDs. |
| focus-s17 / vocab-0504 · focus-s29 / vocab-0497 | わかりません and 分かりません sound alike for different English cues. Pointing at “this one” and a demonstrative can likewise converge on これ. Preserve the meanings, keep the pairs out of the same Japanese option set. |
| focus-s23/s24 / vocab-0171 | Basic phone statements use telefons; the standalone Full noun reused by Basic is tālrunis. Consider one teaching noun. Both work; the case for change is vocabulary reuse. |
| vocab-0091/0092, 0134/0135, 0148/0149, 0209/0210, 0402/0403, 0403/0404 | The six previously corrected bindings no longer contain their reported competitor. Preserve the repairs. Some standalone meanings still need context. |

For other IDs consult the concept index. The reference [common-core library](../../../library/README.md) supplies scenarios, not live answers. In particular cc-p002 deliberately teaches a familiar farewell; it does not override the generic-goodbye decision. Peer play can use peer language. A weather temperature, an anatomical label or an infinitive is judged as vocabulary in its actual lesson, rather than as a standalone request to an adult.

## Handoff after owner approval

1. Approve specific finding keys, intended meaning, languages and wording. **Confirmed** means the conflict was identified; it does not authorize editing. Resolve any human-review field first. For a pure distractor change, approve the old/new answer IDs. The Full module stores one shared list, so that swap changes all seven directions even where only two are ambiguous.
2. Filter the seven presentation files on the question or any of its four answer IDs. Preserve question and slot IDs. If rebinding focus-s02, replace every use of the old ID as an option too. Do not delete an ID/clip until all references and direction-specific variants are accounted for. A Full-to-focused rebind may require architecture work because Full loads first; approve that design separately or reuse identical wording under the locked Full ID.
3. For each changed ID/language, open the exact row of dependencies.csv. Pure distractor swaps, or rebinding to an unchanged existing clip, require **zero new recordings**. Text changes require matching clip/manifest text, hash and generated build for that language. Compare source and answer playback, incorrect-answer correction and report IDs. For unchanged-language clips, retain the existing bytes.
4. Held [PR #21](https://github.com/janisp123/language-learning-app/pull/21) uses target guides only in lv-ru, ru-en and en-ja. Update the identified target-text binding if its spelling or pronunciation changes. There is no LV-target guide. Focused extensions need their own coverage on integration. For example, the held en-ja guide still binds vocab-0001 to やあ; main says こんにちは. Never restore the old greeting to satisfy the guide. Recheck all four options, including when the changed word is only a distractor.
5. Validate original-content and active vocabulary locks, direction allowlists, the two Basic presets, Full, stable IDs, four distinct answers, audio manifests, held guides and the generated offline app. Preserve historical lock evidence. Ask a fluent reviewer to assess role/register and colliding meanings in context. Keep L-010 as current development work. The review PR ends before implementation, merging or publication.
