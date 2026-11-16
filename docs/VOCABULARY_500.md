# Basic vocabulary curriculum — 500 items

**Owner decision:** The first ten blocks teach single words and short phrases, not full sentences; provide enough ten-question blocks to cover 500 basic words/phrases.

**Implemented:** 50 blocks × 10 distinct learning items, with English, Latvian and Russian translations and all six learning directions. The first 100 items are especially simple. The remaining blocks also use words or short phrases, with no prose/full-sentence exercises. Every translation is at most four whitespace-separated words in this draft.

## Structure

Blocks 1–10: greetings, people, numbers 1–10, useful words, essential places, basic food/drinks, classroom items, directions, safety and question words.

Blocks 11–20: relatives, people around us, head/face, body, health, feelings, clothing, devices, rooms/buildings and furniture.

Blocks 21–30: kitchen items, hygiene, fruit, vegetables, ingredients, meals, useful short phrases, shopping and more numbers.

Blocks 31–40: time, weekdays, months, seasons, weather, nature, animals, transport, town vocabulary and school materials.

Blocks 41–50: study vocabulary, everyday infinitives, communication/learning actions, finding/exchanging, helping actions, size/weight, qualities/temperature, colours, linking phrases and pronouns.

This is a practical authored starter list, not a scientifically ranked frequency list or a claim of 500 distinct dictionary lemmas. Words, plural forms and short useful expressions count as learning items. Exact English/Latvian/Russian entries are unique within each current language; synonyms should not be added merely to fill the target.

## Identity and history

The owner changed the original curriculum, so new meanings received new identities. The active course ID is `basic-vocabulary-10-17`, blocks are `basic-01`–`basic-50`, concepts are `vocab-0001`–`vocab-0500`, and question IDs combine the block and prompt number. These IDs remain attached to these meanings; future insertions must not renumber/reuse them.

The original sentence-heavy 100-prompt course is preserved unchanged under `archive/course-0.3/content/`, with its original course and concept/question IDs. It is not included in the current runtime/site artifact. The original baseline digest is unchanged and now verifies the archive. `tests/fixtures/vocabulary-0.4-lock.json` separately protects the new 500-item draft's IDs, translations and answer bindings. This is an explicit owner-authorized replacement, not a silent mutation of old IDs.

## Authoring checks

The catalog declares a basic-vocabulary policy: target 500 items, first ten introductory blocks, maximum four words per entry. The loader checks the target and distinct IDs/English meanings, source `form` tags (`word` or `phrase`), length and absence of sentence punctuation. Tests also require distinct entries in each current language. These mechanical checks do not parse grammar or certify translation quality.

Independent text review corrected an emergency-number wording mismatch, a footwear/shoes meaning mismatch, and synonymous “again”/“once again” entries. The duplicated meaning was replaced with “a little more”. Existing tests cover unique four-option choices in every direction and full 500-prompt traversal. Fluent human language/context review is still pending; all content is labelled draft.

## Learning and privacy unchanged

Ten consecutive correct answers complete a block. A wrong answer steps back one question; the third cumulative mistake in that block restarts lesson 1/question 1. Answer transitions remain automatic after 500 ms. UI language follows the source language. Browser progress is never saved.

The current UI uses “lesson” and “block” for the same ten-question unit. It reports the catalog's block total dynamically. No Android, audio, saved progress or public release is introduced by this content expansion.
