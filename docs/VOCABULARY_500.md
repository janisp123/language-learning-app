# Basic vocabulary curriculum — 510 items

**Owner decision:** Keep approximately 500 survival basics, preserve the existing bank and implement the situation audit's compact request core. The first ten blocks remain words/short phrases; full request phrases begin at block 11. This filename is retained so existing links remain stable.

**Current Full course:**51 blocks×10 stable learning items,with LV/RU/EN in all six directions plus English→Japanese only. Original meaning/question/correct-answer IDs remain;approved wording and distractor corrections are recorded in the [changelog](CHANGELOG.md) and explicit regression exceptions. Unrelated translations/audio stay unchanged. Ten practical additions use IDs `vocab-0501`–`vocab-0510`. Basic Kids and Basic Adults are separate100-item selections;see [focused modules](CONTENT_MODULES.md). All translations remain at most four whitespace-separated words. There are no prose exercises or grammar lessons.

## Structure

Blocks 1–10, in display order: Greetings; Pronouns and basics; Useful words; Useful short phrases; Question words; Essential places; Basic food and drinks; Directions; Safety; Numbers one to ten.

Block 11 is the new Practical requests block (`basic-51`): I need help/water/a doctor/medicine; I don't understand; please call an ambulance/the police; allergy; without milk/sugar. These phrases deliberately reuse familiar words and one needs/exclusion pattern. Exclusion phrases do not claim a diagnosed allergy; the allergy entry is a disclosure noun.

Blocks 12–15 are Communication and learning actions; Everyday actions; Finding and exchanging; Doing and helping. The remaining original blocks follow in their former relative order. `content/catalog.json` is authoritative; stable block IDs do not equal display positions.

This is an authored practical starter list, not a scientifically ranked frequency list or a count of distinct dictionary lemmas. Words, useful forms and expressions count as learning items. Exact English/Latvian/Russian entries remain unique within each language; synonyms are not added merely to fill a target.

## Identity and history

The active course ID remains `basic-vocabulary-10-17`; content revision is `0.5.0-test`. Blocks are `basic-01`–`basic-51`, concepts are `vocab-0001`–`vocab-0510`, and question IDs combine stable block ID and prompt number. IDs remain attached to their meanings when catalog references move. No saved-progress migration exists because no learner state is saved.

The original sentence-heavy 100-prompt course remains unchanged under `archive/course-0.3/content/` and is not shipped. Both original lock files are unchanged. The 0.4 vocabulary snapshot is compared in its recorded order to protect all original 500 texts/IDs/bindings; separate regressions pin the new order and exact ten new translations. See [the approved content specification](superpowers/specs/2026-11-17-practical-request-core.md).

## Authoring checks

The catalog policy requires 510 distinct items, ten introductory blocks and at most four words per entry. The loader checks distinct IDs/English meanings, source `form` tags, length and absence of sentence punctuation. Tests require distinct entries in each language and all six translation directions. Mechanical checks do not certify meaning/pronunciation or learning effectiveness.

An independent meaning review found no concrete blocker in the ten new entries; fluent human review remains pending. All thirty new recordings are generated from the registered exact texts. The original 1,500 MP3 files are preserved unchanged; the full pack now contains 1,530 clips. Tests cover every item/direction and the complete current-prompt speaker flow.

## Learning and privacy unchanged

Ten consecutive correct answers complete a block. A wrong answer steps back one question; the third cumulative mistake restarts lesson 1/question 1. Answer transitions remain automatic after 500 ms. UI follows the source language. The speaker plays only the current prompt. No platform saves learner progress.

The UI uses “lesson” and “block” for the same ten-question unit and reports totals from the catalog. Android and public publication remain separate tasks; this is a review-build content revision.
