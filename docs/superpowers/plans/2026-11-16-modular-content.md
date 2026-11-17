# Modular Content Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans for any remaining implementation steps. Completed boxes record the work implemented inline at the owner's explicit request.

**Goal:** Add blocks/languages through data modules while preserving every existing question, answer and translation binding.

**Architecture:** A catalog references a permanent concept registry, ten-question blocks, and per-language translation/UI modules. A strict compiler assembles runtime schema 2; the pure engine validates explicit answer and presentation identity. The browser remains a portable generated HTML file.

**Tech Stack:** Plain JavaScript, Python standard library and JSON. No new dependencies.

**Spec:** [Content module contract](../../CONTENT_MODULES.md) and [accepted learning rules](../../ARCHITECTURE.md).

## Global constraints

- Preserve all existing course/block/question/concept IDs, text and answer choices.
- Each block remains ten questions; one-question step-back, third-mistake restart and 500 ms transition remain unchanged.
- No saved browser progress, external translation services, Android implementation or automatic publication.
- Keep one canonical authored source and generate all downloadable/hosted copies.

## Review focus

- Questions bound to another concept or correct-answer ID must fail source/runtime validation.
- Translation records copied under the wrong key/meaning must fail assembly.
- All language packs missing the same required UI key or using wrong placeholders must fail the independent UI contract.
- More than ten blocks or three languages must work through data rather than engine/UI edits.
- Existing content must retain exact semantic bindings; the original digest cannot be silently regenerated to conceal changes.

## Task 1: Capture identities and split authored data

- [x] Record original IDs and a canonical content digest in `tests/fixtures/original-content-lock.json`.
- [x] Add `content/catalog.json`, `concepts.json`, `blocks/` and `languages/` modules.
- [x] Remove the competing combined content/UI files.

## Task 2: Validate and assemble modules

- [x] Implement `load_content(root: Path) -> (course, locales)` in `tools/content_loader.py`.
- [x] Validate duplicate keys/IDs, typed references, explicit correct answers, translated meanings, complete UI and option uniqueness.
- [x] Add a fixed `content/ui-contract.json` after independent review exposed the shared-missing-key gap; verify both omission/placeholder cases RED→GREEN.

## Task 3: Consume generic runtime data

- [x] Remove fixed language/block caps and enforce schema-2 answer identity in `core/engine.js`.
- [x] Generate directions/default UI/no-script guidance in the builder; use per-language names and target forms in the UI.
- [x] Verify the current six-direction user flows without changing learning behavior.

## Task 4: Prove parity and extensibility

- [x] Verify original content digest, mixed-ID rejection, eleventh-block and synthetic fourth-language extension (twelve generated directions).
- [x] Run `npm test` and `python -m unittest discover -s tests -p 'test_*.py' -v`.
- [x] Rebuild the portable download and verify parity; document remaining real-browser/fluent-review limits.
- [x] Prepare the commit/readback scope and existing PR update; exact remote evidence is recorded in the PR rather than inferred from local files. Merge/publication remain separate authorized actions.
