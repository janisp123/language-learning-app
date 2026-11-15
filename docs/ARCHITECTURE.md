# Architecture and behavioral contract — planning specification

**Status:** Proposed architecture and owner-decided behaviors, **not implemented**. Codex must complete L-001 before choosing platform frameworks. Keep two delivery surfaces compatible without introducing a remote backend.

## Product goals and boundaries

- **First audience:** 10–17-year-old learners; early focus is a child living in Latvia who needs practical spoken Russian in day-to-day encounters.
- **First course:** Latvian ↔ Russian; both directions tested with the same curated content. **Ten lessons only** for the first public release.
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
7. Persist the **highest lesson ever reached** only in the Android app; show a short **“Congratulations! You've reached a new lesson!”** notification **only when the learner first enters a lesson above the prior record**. For existing lessons, simply continue.
8. The highest lesson record never creates a skip shortcut. The next session always starts at lesson 1.

**Storage nuance:** Current owner rule is **only save the highest lesson**. Therefore the in-lesson cursor, consecutive counter, and current session are **volatile**. Closing/restarting the Android app starts again from lesson 1 even on the same day. There is no daily-reset scheduler or last-practiced-date tracking. If a different same-day resume rule is ever wanted, it requires explicit product approval.

**Question display:** A compact progress cue is optional; never turn internal consecutive-correct logic into an XP/score feature. Avoid noisy animations/celebrations. Audio should support functional comprehension rather than rewards; L-001 should choose reliable Android/browser playback without requiring user accounts or network services.

## Two delivery surfaces

**Browser / GitHub Pages:**
- Static landing page with a clear purpose and a **Learn** link to the running browser app.
- **No saved progress or account**; no localStorage, IndexedDB, cookies or remote sync for learning state.
- Browser refresh or reopening begins at lesson 1; no form submissions storing answers remotely.
- Only show a Google Play link once an actual listing has been verified.

**Android / Google Play:**
- Same course content/algorithm and visual simplicity.
- On-device small key/value storage: course ID and highest reached lesson ID/ordinal, plus format/schema metadata as necessary; no per-word or daily performance record.
- Manual export/import of a small versioned JSON file via system file picker. Validate schema, course identity, range, integrity and supported version before changing stored progress; confirm any replacement.
- No backend, sign-in, analytics/tracking or advertising in v1. Base lessons must work without network access if their required assets are bundled.

## Proposed repository boundaries (not yet created)

```text
android/         Android-specific app/persistence/package
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
- Define backup file versions; don't assume every future release can import every later format. Reject unsupported input safely and leave current data intact.
- One course initially, but future records must not conflate language pairs or age paths. A record from another course must not silently set the current course's highest lesson.
- Content and UI use explicit translation direction, not assumptions such as “all prompts are Russian”.
- Defer features beyond the first ten lessons until **both** public web learning and Play download work reliably.

## Still requiring a deliberate technical decision

The smallest appropriate cross-platform runtime (e.g. common core with wrappers vs portable web implementation with Android integration) and pronunciation delivery must be chosen in L-001. Do not assume a feature/hosting technique is approved merely because it appeared in an earlier brainstorming reply.
