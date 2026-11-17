# Architecture and behavioral contract — planning specification

**Status:** Proposed architecture and owner-decided behaviors, **not implemented**. Codex must complete L-001 before choosing platform frameworks. Keep two delivery surfaces compatible without introducing a remote backend.

## Product goals and boundaries

- **First audience:** 10–17-year-old learners; early focus is a child living in Latvia who needs practical spoken Russian in day-to-day encounters.
- **First course (owner-expanded):** Latvian, Russian and English; all six directed pairs use the same canonical content. The owner expanded the draft curriculum to **50 ten-question blocks / 500 basic words and short phrases**, with no sentences in the first ten blocks.
- **Long term:** Separate age paths (5–9, 10–17, 18+) and more language pairs/lessons can be added **as content**, without changing the central learning rules. Do not build selection UIs or extra packs in v1.
- **Reason for being:** Learning by mandatory cumulative repetition from lesson 1, not by collecting finished-lesson badges.

## Shared conceptual data model

```text
Course: stable id, source/target language, age-path id, content version
  Lesson: stable id, course id, order, situation
    Prompt: stable id, meaning, source phrase, target phrase,
            pronunciation/audio reference if available, distractor options
```

Canonical content lives in validated, versioned structured data independent of the presentation code (JSON is a reasonable starting point). Prefer **one source of truth** and content generation/build steps as needed; do not hand-edit duplicate copies. Do not assume native and browser code share the exact same runtime until proven. Shared behavior can be enforced with a single core implementation **or** a common conformance suite, depending on the smallest supportable architecture.

Keep reusable phrases/words referenced by stable IDs. Avoid accidental distinct entries for the same meaning. Languages and age paths are content labels, not hardcoded user-interface assumptions.

## Learning algorithm — accepted behavior

1. Every **fresh learning session** begins at **lesson 1**, irrespective of yesterday's or earlier performance.
2. Present one translation question with **four meaningful choices**, only one of which is correct. Randomize answer button positions every time a question is presented, including after a wrong answer.
3. Correct choice → advance to the **next prompt** in that lesson; increase an **internal** consecutive-correct counter.
4. Wrong choice → show concise correction, move **one prompt backward** (clamp at the first prompt), and **break the consecutive-correct run**; do not skip a failed question forever.
5. Complete a lesson only after **10 correct selections in a row**. With a ten-prompt lesson, cycle through prompts as necessary until ten consecutive answers occur. The exact prompt-order/wrap behavior must be pinned by L-002 tests, not inferred from a UI screen.
6. On completion, move to the following lesson. **No points, XP, lives, daily streak bonuses, or scoreboards.**
7. Persist **no learner state on any platform**. Current lesson, answers, consecutive/mistake counters, highest lesson and learning preferences exist only in session memory. There is no saved record or record-based congratulation.
8. Every fresh session, browser reload or app process restart begins at lesson 1, with fresh counters and no restore/skip shortcut.

**Owner zero-saves decision (2026-11-17):** This supersedes the earlier Android highest-record and backup/import proposal. Browser, Android and future wrappers save no learner state: no preferences, storage APIs, database/file writes, exported progress, cloud sync or OS state restoration/backup for progress. In-memory state supports the current learning session only. Static course/audio assets and installed application files are not learner state. There is no daily-reset scheduler or last-practiced-date tracking.

**Owner block-rule update (2026-11-16):** Each lesson is a block of exactly ten questions. The first two wrong answers in that block move back one prompt (clamped at the first prompt) and clear the consecutive-correct count. The third mistake in that same block, even with correct answers between mistakes, restarts at lesson 1/prompt 1 and clears both mistake and consecutive counters. Correct answers within the block retain the mistake count; completing a block, manual restart or a new session resets it. Automatic restart preserves translation direction within the current session. All counters and direction remain volatile; nothing is saved for a later session.

**Owner interaction update (2026-11-16):** In the browser test build, selecting an answer locks choices and shows feedback immediately. After 500 ms, apply the answer transition automatically; there is no Continue button. Preserve the last correction after transition until the next answer so it remains readable. Restarting or changing direction cancels the timer and invalidates stale callbacks. This timing changes UI interaction only, not the correct/incorrect navigation or ten-consecutive rule above.

**Owner interface-language update:** The complete learning UI follows the selected source language: LV→RU/EN uses Latvian, RU→LV/EN uses Russian, EN→LV/RU uses English. Apply immediately on direction selection, including instructions, controls, lesson titles, progress/mistake labels, feedback, errors, completion, accessible labels and document language/title. Keep prompt/option text and language tags in their actual source/target languages. UI strings live separately from canonical learning content.

**Question display:** A compact progress cue is optional; never turn internal consecutive-correct logic into an XP/score feature. Avoid noisy animations/celebrations. Audio should support functional comprehension rather than rewards; L-001 should choose reliable Android/browser playback without requiring user accounts or network services.

## Two delivery surfaces

**Browser / GitHub Pages:**
- Static landing page with a clear purpose and a **Learn** link to the running browser app.
- **No saved learner state or account**; no localStorage, sessionStorage, IndexedDB, cookies, progress files or remote sync.
- Browser refresh or reopening begins at lesson 1; no form submissions storing answers remotely.
- Only show a Google Play link once an actual listing has been verified.

**Android / Google Play:**
- Same course content/algorithm and visual simplicity.
- Keep the entire learning session in memory; do not write a highest lesson, position, counters, history, answers or preferences to native storage.
- No Save/Restore controls, progress export/import or OS backup/state-restoration of learner state. A new process starts at lesson 1, including after Android restores an activity or app backup.
- No backend, sign-in, analytics/tracking or advertising in v1. Base lessons must work without network access if their required assets are bundled.

## Proposed repository boundaries (not yet created)

```text
android/         Android-specific stateless wrapper/package
web/             Static landing and browser experience
content/         Canonical language and age-path data
core/            Shared rules or conformance fixtures (implementation TBD)
tests/           Automated regressions and content checks
docs/            Project documentation
.github/workflows/  CI checks / safe publishing
```

Only create directories when a small Codex task actually needs them. A lean implementation is better than architectural scaffolding without users.

## State / compatibility contracts

- Keep course/lesson/prompt IDs stable. Don't renumber IDs when inserting new lessons or translating content.
- No learner-progress file/schema or migration is needed: no saves or restores are permitted.
- Keep course/language/age identity explicit for the active in-memory session; never infer it from a saved record.
- Content and UI use explicit translation direction, not assumptions such as “all prompts are Russian”.
- The owner has authorized 50 vocabulary blocks. Other feature expansion still requires a deliberate decision.

## Three-language browser content

The owner added English, then expanded the curriculum to 50 blocks / 500 words and short phrases (see VOCABULARY_500.md). Every phrase has LV/RU/EN text and all six source→target directions are supported. Keep the existing course/lesson/phrase/prompt IDs stable. Canonical sources now live in the catalog, concept registry, per-block files and per-language modules; the old combined file is removed. Use catalog language/block references, not filenames or hardcoded totals, to build the runtime. Direction-specific target instructions and source-language UI come from the three interface packs. Platform wrappers must preserve this identity in memory while saving no learner state.

## Modular content and binding contract

The owner requested data-only extension with existing questions/answers preserved. [Content modules](CONTENT_MODULES.md) define the catalog, concepts, blocks, language/UI modules and fixed UI application contract. Every question explicitly binds `phraseId` to the same `correctAnswerId`; translations repeat their concept ID and canonical meaning. Runtime question/answer ID, text, language, block and revision checks reject mixed presentations. The source loader fails on duplicates, missing/unknown IDs, incomplete translations or UI keys/placeholders, and ambiguous choices. Separate baseline digests protect the unchanged original draft under archive/course-0.3 and all 500 active vocabulary question/answer/translation bindings. More blocks and languages require data and translations, not engine whitelists or handwritten direction controls. Per-block size and learning rules remain fixed at the approved ten-question/three-mistake contract.

## Still requiring a deliberate technical decision

The smallest appropriate cross-platform runtime (e.g. common core with wrappers vs portable web implementation with Android integration) and pronunciation delivery must be chosen in L-001. Do not assume a feature/hosting technique is approved merely because it appeared in an earlier brainstorming reply.
