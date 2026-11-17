# Content rules — basic words and short phrases

## Product scope — survival basics

The product focuses on **roughly 500 crucial words and short phrases** for everyday survival and basic communication. Practical usefulness is the selection criterion; 500 is an approximate scope, not a reason to pad the bank or continually expand it. Prioritize understanding essential speech, asking for help, expressing basic needs and handling common situations. Current development focuses on Russian ↔ Latvian.

Keep the experience small and focused. A broad language curriculum, advanced proficiency path and Duolingo-style feature expansion are outside this product's scope. Improve the usefulness, clarity, pronunciation and reuse of the essential bank before adding breadth. The current owner-authorized revision contains 510 entries: all original 500 plus ten practical requests/restrictions, following the situation audit. Fluent human review and actual learner outcomes remain pending.

The current curriculum is **510 basic words and short phrases in 51 blocks of ten questions**, in Latvian, Russian and English, all six directed pairs, initially for ages 10–17. This retains the earlier 500-item vocabulary bank and adds the compact practical core approved on 2026-11-17. The older ten-situation, sentence-heavy course remains archived, not active.

## Communication efficiency and reuse take priority over style and grammar

Owner priority: reuse already-taught words, short phrases and phrase patterns as much as possible across blocks and future sentence lessons, even when the result sounds repetitive or less elegant. Before introducing a synonym or alternative expression, prefer a familiar expression that communicates the same meaning. Introduce new vocabulary only when it adds a crucial meaning or is needed to be understood, rather than to make a phrase more elegant or grammatically complete. Recombine familiar component words into new phrases rather than introducing unnecessary alternatives. Understandable fragments and grammatically imperfect phrasing are acceptable when they help a learner communicate with fewer words. The learner should be able to say something useful instead of hesitating between too many word choices.

Repeated words within different useful phrases are encouraged; they do not require duplicate concept IDs for the same meaning or reduce answer-choice clarity. Keep existing permanent bindings intact. The practical core repeats one needs frame and reuses help, water, doctor, medicine, services, milk and sugar. The situation audit is a content assessment, not a claim of human-reviewed translations or measured learning effectiveness.

## Current curriculum

- The first ten blocks contain only simple words and short phrases. Full practical request phrases begin at block 11. All 510 items have at most four whitespace-separated words in each translation and no sentence-ending punctuation; there are no prose/full-sentence exercises.
- Teach reusable everyday meanings, including greetings, people, numbers, places, food, school, directions, safety and question words first. Later blocks expand household, health, shopping, time, nature, actions and descriptive vocabulary.
- First ten blocks, in order: Greetings; Pronouns and basics; Useful words; Useful short phrases; Question words; Essential places; Basic food and drinks; Directions; Safety; Numbers one to ten. Block 11 is Practical requests, followed by the four main action blocks. Other existing blocks retain their former relative order.
- Do not confuse learning-item counts with distinct dictionary lemmas or a verified frequency ranking. Short phrases and useful forms are included. See [VOCABULARY_500.md](VOCABULARY_500.md) for scope and review limits.
- Prefer one common, understandable translation for a precise meaning. Avoid padding the list with synonyms, duplicate meanings or multiple superficially different versions of the same item.
- Judge phrases by whether another person can understand the intended message. Formal grammar and stylistic naturalness are secondary to efficient use of familiar words; understandable imperfect phrasing is acceptable. Preserve the intended meaning and clear answer choices. Grammar review should identify misunderstandings, not require extra vocabulary solely for correctness.
- Keep material safe and appropriate for young learners. No private information, adult/workplace topics or prompts encouraging unsafe compliance.
- Distractors must be distinct and unambiguously wrong in all six directions. ID checks and distinct strings cannot establish semantic correctness; fluent human review of meanings and distractors remains pending before public release.

## Canonical modular authoring

Use `content/catalog.json`, `concepts.json`, `blocks/<id>.json` and `languages/<code>.json` as described in [CONTENT_MODULES.md](CONTENT_MODULES.md). Each question declares a permanent concept ID and explicit matching correct-answer ID; never align languages by array position or grade by visible text. Translation records repeat their concept ID and meaning. Do not repurpose old IDs when changing a meaning.

The active course uses `vocab-0001` through `vocab-0510` and `basic-01` through `basic-51`; stable IDs are independent of display position. The original course remains under `archive/course-0.3/content/`, protected by its unchanged baseline. The unchanged 0.4 vocabulary snapshot protects the original 500 meanings, translations and answer bindings in its recorded order. Separate practical-core regressions pin the approved catalog order and new translations. Canonical authored modules are the source; generated HTML is never hand-edited.

The catalog curriculum policy enforces the target item count, distinct concept coverage, form tags and short text limits. Increase the approved target when adding more vocabulary blocks; do not disable the policy to conceal incomplete coverage. New blocks/languages require data and translations, not engine edits. Every block still has ten questions, and the existing repetition/mistake rules remain unchanged.

## Review every new item

1. Is the meaning useful, concrete and distinct from existing items?
2. Can this meaning be expressed with already-taught words or phrase patterns? Prefer their reuse over stylistic variety; add new words only for a useful meaning or necessary clarity.
3. Is each translation short and understandable, conveying the same intended meaning with familiar words even if its grammar or style is imperfect?
4. Is only one of the four choices defensibly correct in every direction?
5. Is it appropriate and understandable for the intended age group?

Other age paths and languages remain future possibilities requiring an owner decision.
