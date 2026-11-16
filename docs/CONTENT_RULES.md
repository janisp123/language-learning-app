# Content rules — basic words and short phrases

The owner has revised the initial curriculum to **500 basic words and short phrases in 50 blocks of ten questions**, in Latvian, Russian and English, all six directed pairs, initially for ages 10–17. This supersedes the earlier ten-situation, sentence-based draft and its former limit on vocabulary count. The earlier draft remains archived, not active.

## Reuse takes priority over style

Owner priority: reuse already-taught words, short phrases and phrase patterns as much as possible across blocks and future sentence lessons, even when the result sounds repetitive or less elegant. Before introducing a synonym or alternative expression, prefer a familiar expression that communicates the same meaning. Introduce new vocabulary when it adds a useful meaning or is needed for understandable, grammatically correct communication. Recombine familiar component words into new phrases rather than introducing unnecessary alternatives.

Repeated words within different useful phrases are encouraged; they do not require duplicate concept IDs for the same meaning or reduce answer-choice clarity. Keep existing permanent bindings intact. This principle guides content authoring and review; recording it does not claim that all 500 current entries have undergone a reuse audit.

## Current curriculum

- The first ten blocks contain only simple words and short phrases, never sentences. All 500 current items follow the same short-form approach, with at most four whitespace-separated words in each translation and no sentence-ending punctuation.
- Teach reusable everyday meanings, including greetings, people, numbers, places, food, school, directions, safety and question words first. Later blocks expand household, health, shopping, time, nature, actions and descriptive vocabulary.
- First ten blocks, in order: Greetings; People; Numbers one to ten; Useful words; Essential places; Basic food and drinks; In the classroom; Directions; Safety; Question words.
- Do not confuse 500 learning items with 500 distinct dictionary lemmas or a verified frequency ranking. Short phrases and useful forms are included. See [VOCABULARY_500.md](VOCABULARY_500.md) for scope and review limits.
- Prefer one common, understandable translation for a precise meaning. Avoid padding the list with synonyms, duplicate meanings or multiple superficially different versions of the same item.
- Keep translations grammatically defensible and understandable. Never shorten into incorrect language merely to meet a word limit. Use a different short meaning if necessary.
- Keep material safe and appropriate for young learners. No private information, adult/workplace topics or prompts encouraging unsafe compliance.
- Distractors must be distinct and unambiguously wrong in all six directions. ID checks and distinct strings cannot establish semantic correctness; fluent human review of meanings and distractors remains pending before public release.

## Canonical modular authoring

Use `content/catalog.json`, `concepts.json`, `blocks/<id>.json` and `languages/<code>.json` as described in [CONTENT_MODULES.md](CONTENT_MODULES.md). Each question declares a permanent concept ID and explicit matching correct-answer ID; never align languages by array position or grade by visible text. Translation records repeat their concept ID and meaning. Do not repurpose old IDs when changing a meaning.

The active course uses `vocab-0001` through `vocab-0500` and `basic-01` through `basic-50`. The original course remains under `archive/course-0.3/content/`, protected by its unchanged original baseline. A separate 0.4 vocabulary baseline protects all active meanings, translations, question IDs and answer/distractor bindings. Canonical authored modules are the source; generated HTML is never hand-edited.

The catalog curriculum policy enforces the target item count, distinct concept coverage, form tags and short text limits. Increase the approved target when adding more vocabulary blocks; do not disable the policy to conceal incomplete coverage. New blocks/languages require data and translations, not engine edits. Every block still has ten questions, and the existing repetition/mistake rules remain unchanged.

## Review every new item

1. Is the meaning useful, concrete and distinct from existing items?
2. Can this meaning be expressed with already-taught words or phrase patterns? Prefer their reuse over stylistic variety; add new words only for a useful meaning or necessary clarity.
3. Is every translation natural, short and aligned with the same meaning?
4. Is only one of the four choices defensibly correct in every direction?
5. Is it appropriate and understandable for the intended age group?

Other age paths and languages remain future possibilities requiring an owner decision.
