# Content modules and permanent question/answer identity

Implemented by Codex at the owner's request. The active pack has 51 blocks and 510 vocabulary items with LV/RU/EN translations: the original 500 plus ten practical items. Catalog order brings pronouns/help earlier and places the new request block after the first 100 items. The earlier 100-item draft is preserved in `archive/course-0.3/content/`, with its original identity lock unchanged. See [VOCABULARY_500.md](VOCABULARY_500.md).

## Module boundaries

```text
content/catalog.json             course identity, ordered block/language module references
content/concepts.json            permanent meaning IDs and reviewable English definitions
content/ui-contract.json         required application labels and expected placeholder names
content/blocks/<block-id>.json    ordered ten-question blocks and explicit answer/distractor IDs
content/languages/<code>.json    translations, interface text, names and block titles for one language
tools/content_loader.py          strict module assembly and source validation
core/engine.js                  platform-independent question identity and learning transitions
web/                            generic UI; directions and labels come from registered modules
tests/fixtures/original-content-lock.json  original content identity/translation regression digest
```

There is one canonical authored source per concept, block and language. The former combined `content/lv-ru-10-17.json` and `web/locales.json` are removed, rather than left as competing editable copies. `downloads/language-learning-test.html` is generated and checked against a fresh build.

## What each ID means

- A **concept ID**, such as `vocab-0001`, identifies one meaning. It is not an array position or translated text.
- A **question ID**, such as `basic-01-prompt-01`, identifies a question inside its registered block. Question, block and concept IDs cannot collide.
- `phraseId` names the source concept; `correctAnswerId` must explicitly name that same concept in the target language. Three distinct `distractorIds` name different registered concepts. Correctness uses IDs, never button positions or fuzzy text comparisons.
- Each translation is keyed by concept ID and repeats `conceptId` plus the canonical `meaning`. The loader rejects an object copied under the wrong key or a definition copied from a different meaning. The `text` is the reviewed translation of that meaning in the module's language.
- Every presented runtime question carries course, block, question, concept, direction and revision identity. The engine verifies its displayed source text and all answer ID/text pairs before accepting a choice. A question/answer copied from another block, language or presentation is rejected.

The loader also rejects duplicate JSON keys/IDs, unknown references, mismatched module IDs, incomplete translations/UI, duplicate displayed choices and unsafe module paths. UI labels/placeholders must match `ui-contract.json`, independently of the translation packs; removing or misspelling the same key in every pack still fails. Runtime and source schemas are explicit: module/catalog schema 1 compiles to runtime schema 2. No progress migration is needed: every platform must keep learner state in memory only, with zero saves or restores.

These checks prevent silent identifier/binding mix-ups. They cannot certify that a newly written translation is linguistically correct; fluent review remains required.

## Add a block later — data changes only

1. Allocate a new stable block ID and ten new question IDs. Never renumber or reuse an existing ID.
2. Add any new concepts and their precise English review definitions in `concepts.json`. Reuse an existing concept if its meaning/context is truly the same.
3. Create `blocks/<id>.json` with ten prompts. Each prompt has `id`, `phraseId`, explicit `correctAnswerId` equal to `phraseId`, and exactly three distinct `distractorIds`.
4. Add the needed concept translations and the new block title to every registered language module. Existing question/answer text and bindings remain unchanged.
5. Add the block reference to the ordered `catalog.blocks` list. The engine has no ten-block cap; every block still contains ten questions and uses the existing learning rules.
6. Build, run checks and review. Do not add test-only/synthetic extension examples to the actual catalog.

## Add a language later — data changes only

1. Choose a stable two- or three-letter lowercase ISO-style language ID and create `languages/<id>.json` with that exact `id` and schema version 1. Region/script variants need a deliberately designed identifier contract; do not hide a hyphenated locale inside a direction ID.
2. Supply one translation record for every canonical concept, preserving the concept ID and meaning, and translate the complete UI plus all registered block titles.
3. Add the new language's display name and target-language grammatical form under `ui.names` in every language module; the new module also needs names for all registered languages. UI message placeholders must match across packs.
4. Register the module in `catalog.languages`. All source→target combinations are generated from this list; no engine whitelist, hand-written option list or per-direction JavaScript edits are needed. Interface language follows the source. Block headings, completion text and no-script guidance do not assume a fixed number of blocks/languages.
5. Build and run checks. The new source language needs a complete UI pack; a silent English fallback is not used for missing translations.

## Preserve existing content

`original-content-lock.json` captures the original course ID, original concept/block IDs, and a canonical SHA-256 digest of the original question bindings, distractors and all three existing translations. A regression test reconstructs that subset from the modules and compares the digest. New blocks/languages can be added without changing this lock. Altering an existing answer, translation, ID or original relative ordering fails the test.

Do not regenerate the lock just to silence a failure. An intentional, owner-requested content correction should identify the affected IDs, review the semantic change and update its evidence with the implementation. The lock complements human review rather than replacing it.

## Verification and delivery

```sh
python tools/build_browser.py
cp dist/language-learning-test.html downloads/language-learning-test.html
npm test
python -m unittest discover -s tests -p 'test_*.py' -v
cmp dist/language-learning-test.html downloads/language-learning-test.html
```

Tests prove original-content parity, explicit question/answer binding rejection, duplicate/missing/misbound record rejection, data-only eleventh-block extension, data-only fourth-language extension and twelve generated directions in that synthetic fixture. Existing one-question step-back, third-mistake restart, ten consecutive correct, 500 ms delay, source-language UI and no browser storage remain unchanged.

Synthetic extension fixtures are temporary and not shipped. Actual browser/device/accessibility and fluent-language review remain separate from automated source/DOM-fixture verification. Stateless Android packaging, hosting and release authorization remain separate tasks; no learner-state persistence or progress backup is planned.

## Active vocabulary policy and baseline

The current catalog declares a 510-item vocabulary policy: distinct concepts and meanings, `word`/`phrase` form tags, at most four words per translation, and no sentence punctuation. For approved new blocks, increase `curriculum.targetItems` along with authored coverage. Additional languages must translate every active concept and title. The structural checks do not detect every grammatical sentence or translation ambiguity.

`tests/fixtures/vocabulary-0.4-lock.json` pins the original 500 meanings/texts and question/answer bindings; extra blocks/languages can be added without rewriting those IDs. The owner's approved catalog reorder is checked separately in `test_practical_core.py`; snapshot verification uses its own recorded block/phrase order, preserving the existing digest unchanged. The earlier original lock still verifies `archive/course-0.3/`. Do not refresh either digest merely to silence a drift failure: inspect and document any intentional language correction first.


## Explicit directions and target-only Japanese

The active catalog uses schema 2 and requires a nonempty unique `directions` allowlist of registered distinct-language pairs, including its `defaultDirection`. The builder emits only those options; the engine accepts only those directions, including when validating active session state. Legacy schema 1 is supported for the archive and compiles historical pairs to an explicit runtime list. Runtime schema 2 always requires `directions`.

Current approved list: lv-ru, lv-en, ru-lv, ru-en, en-lv, en-ru, en-ja. Adding a language does not automatically expose pairings. Every language module provides translations for all concept IDs; only languages appearing as a source require UI packs. Japanese is target-only, script-only and has no UI pack. All three source packs provide the Japanese target name. The default source pack, rather than catalog position, anchors UI validation.
