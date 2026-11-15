# L-001 — Shared learning runtime with a thin Android wrapper

**Status:** Proposed for owner review; no app implementation or release authorization.
**Author:** Codex · **Date:** 2026-11-15
**Starting main:** `ae1be9361eb26dba0cdbe08eeb154172880a441d`
**Task:** L-001 in [TD.learn](../TD.learn.md). Existing [architecture](../ARCHITECTURE.md), [content rules](../CONTENT_RULES.md) and [AGENTS](../../AGENTS.md) remain authoritative.

## Decision and alternatives

Use a single TypeScript learning engine and small HTML/CSS/TypeScript UI, built with Vite for GitHub Pages and packaged with Capacitor 8 for Android. Add a narrow Kotlin bridge for native progress and document-picker operations. No React, Ionic UI framework, backend, database, service worker or account system is needed for v1.

| Approach | Benefit | Cost / reason |
| --- | --- | --- |
| Shared web runtime + Capacitor — selected technical recommendation | One engine, content source and UI; static browser output; Android bundles lessons offline | WebView accessibility/lifecycle and native file access require device tests; packaging alone does not establish Play compliance |
| Kotlin Android + separate browser implementation | Native Android controls and lifecycle | Duplicates UI and engine implementation; common fixtures must prevent divergence |
| Flutter for both platforms | Shared UI and runtime | Adds a different language/toolchain and web delivery overhead for a small static learning experience |

This selects a maintainable technical direction for review, not a new product design. Native integration is a real implementation task, not assumed functionality of a generic web wrapper. If Android packaging or accessibility cannot meet the release checklist, document the evidence and revisit this decision before expanding the app.

## Toolchain and build boundaries

- One npm package and committed lockfile, TypeScript strict checking, Vite static builds, Vitest unit/conformance tests, and Playwright browser tests. No workspace monorepo tooling is necessary.
- Use Capacitor 8 stable, with core/CLI/Android versions aligned. Do not use `/next` documentation or unreleased Capacitor 9. Official v8 documentation currently requires Node 22+, Android Studio Otter 2025.2.1+, min SDK 24, compile/target SDK 36, AGP 8.13.0 and Gradle 8.14.3; it specifies Kotlin 2.2.20 when Kotlin is used. These are documented baselines, not a verified local build.
- Select and pin exact supported Node/package/JDK versions in the first code PR after checking their mutual requirements. Node must satisfy the selected Vite/test tooling as well as Capacitor; “22+” alone is not a complete engine pin. Retain the supported Capacitor template's Java/Gradle configuration rather than inventing a combination. No dependencies are installed by this documentation task.
- Planned commands: `npm ci`, `npm run typecheck`, `npm test -- --run`, `npm run build:web`, `npm run build:android-web`, `npx cap sync android`, then the checked-in Gradle wrapper for debug APK and release AAB. These are future interfaces; none exists or has run yet.
- Web output: `dist/web/`, Vite base `/language-learning-app/` for repository Pages. Android web output: `dist/android/`, base `./`, Capacitor `webDir` set to that directory; no remote `server.url` in release configuration.
- Use a single document with a Learn section/hash rather than server-dependent history routes. All fonts, scripts, lessons and available audio are bundled; no CDN imports or third-party tracking. Distinct output directories prevent copying a Pages-path build into Android.
- Ordinary PR CI validates/builds without publishing. Pages deployment is a separately authorized operation; Play release/signing credentials stay outside source and ordinary PR jobs.

## Files and responsibilities — create only when needed

```text
content/lv-ru-10-17/course.json   canonical course/phrase/lesson data
content/schema/course.schema.json
content/audio/                  reviewed, licensed local pronunciation assets
core/content.ts                 validate/resolve content into runtime types
core/session.ts                 pure session transitions; no platform APIs
core/question.ts                resolve direction and shuffle four options
core/progress.ts                validate versioned highest-record data
web/index.html                  landing page and learning entry point
web/src/learning.ts              shared accessible learning UI
web/src/browser.ts               memory-only browser composition
web/src/android.ts               native-adapter composition
web/src/audio.ts                 optional local-asset playback
android/                        Capacitor project and Kotlin progress/file bridge
tests/conformance/              canonical input/state/event examples
tests/content/                  source and bidirectional option validation
tests/web/                      browser behavior and storage/network checks
.github/workflows/              checks; separately authorized delivery
```

Browser and Android entry points consume the same engine/UI/content, with injected capabilities. Browser entry must not import native persistence or a fallback storage implementation. Prefer a custom narrow Android bridge over exposing general filesystem or preference access to the UI. Build-generated content copies are disposable outputs, never independently maintained sources.

## Canonical source format and stable identity

The JSON envelope has `schemaVersion`, stable `courseId`, `contentVersion`, `languages: ["lv", "ru"]`, `agePath: "10-17"`, a phrase bank, and ordered lessons. IDs are opaque stable strings, independent of ordinal or translated wording. `contentVersion` identifies the authored pack; schema version governs data interpretation.

- A phrase has `id`, a context/meaning label for reviewers, `text.lv`, `text.ru`, and optional local audio references for each language. Reuse one phrase identity where context and meaning truly match; context-dependent meanings may require distinct IDs.
- A lesson has stable `id`, explicit `order`, situation, and ordered prompts. A prompt has stable `id`, `phraseId`, and exactly three `distractorPhraseIds` for each direction (`lv-ru` and `ru-lv`). Direction-specific distractors prevent reversal from silently creating ambiguous answers.
- Correct text comes from the question phrase's target language. The three distractors resolve through the same bank. Four normalized displayed options must be distinct, and exactly one is correct. Automated checks cannot prove that a distractor is semantically wrong; fluent review remains required.
- Validate schema version, exactly ten ordered lessons, nonempty prompt lists, ID uniqueness, reference resolution, language completeness, option distinctness in both directions, and local asset paths. Reject absolute URLs/path traversal in content assets. The exact prompt count is an owner choice below, not an invented validation rule.
- Do not renumber or reuse retired IDs. Backups identify the highest lesson by stable ID; ordinal is derived from compatible course content. An incompatible lesson reordering/removal requires an explicit compatibility change, not automatic ordinal reinterpretation.

## Learning-engine contract

The engine owns course ID, direction, lesson index, prompt index, consecutive-correct count and active/finished status in memory. UI feedback, audio and native I/O are effects outside the reducer. Inject RNG into question construction for reproducible tests; assign a new question-instance token on each presentation so double taps/stale events cannot count twice.

Planned public interfaces (final TypeScript types are implemented under L-002):

- `startSession(course, direction)` creates lesson 1 / prompt 1 / zero consecutive answers, independent of any record.
- `presentQuestion(course, state, rng)` returns one question instance with four shuffled choices and stable option IDs.
- `answerQuestion(course, state, question, selectedOptionId)` validates that question against the active session and returns next state plus correction/lesson-entered/course-finished events. Pure logic has no storage, clock, audio or DOM access.
- A platform coordinator handles record comparison and native writes when a real new lesson is entered. A saved record never changes session entry or creates a skip action.

Existing rules are binding: correct advances, wrong steps backward with a clamp at the first prompt and resets the consecutive counter, ten consecutive correct completes the lesson, and each presentation reshuffles. Correct wrapping is modulo the current lesson's prompt count until the completion threshold is reached; check the threshold before wrapping. No cross-lesson backward jump is introduced. L-002 must turn these statements into executable boundary fixtures before UI work.

Examples L-002 must prove:

| Starting state / event | Required result |
| --- | --- |
| Lesson 1, prompt 1, wrong | Stay at prompt 1; run becomes 0; new shuffled presentation |
| Prompt index 4, run 6, wrong | Prompt index 3; run 0; failed prompt remains in the cycle |
| Final prompt, run 3, correct | First prompt of same lesson; run 4 |
| Any prompt, run 9, correct | Complete lesson; enter next lesson at prompt 1/run 0, unless final lesson |
| Saved highest is lesson 7, fresh session | Lesson 1/prompt 1/run 0; no resume or skip |
| Enter lesson at/below saved highest | No new-record congratulation |
| Enter lesson above saved highest | One record-update event and short functional notification |
| Question reappears / user taps an old choice | New shuffle; stale/double answer cannot advance twice |

Earlier lessons are repeated through fresh-session restart. Do not add an earlier-lesson mixed question pool; the accepted specification does not define one. Browser sessions have no cross-session record; do not pretend to know a previous record there.

## Pronunciation decision

Use optional replayable **bundled, reviewed audio clips**, keyed by phrase and language. Both platforms use the same local assets. Do not depend on a network speech API, installed TTS voice availability, microphone permission, pronunciation scoring or autoplay. Missing/unreviewed clips produce no active replay control and do not prevent text learning.

Audio is functional comprehension support. No reward sounds, music or noisy celebration effects. Acquire licensed recordings or generated audio with explicit redistribution rights; record provenance and fluent pronunciation review before shipping a clip. This task creates no clips and does not claim that audio review has occurred. The owner must approve whether optional pronunciation coverage is sufficient for first release or complete coverage is required; no paid audio service is authorized here.

## Storage and manual transfer boundary

Browser progress lives only in memory. No localStorage, cookies, IndexedDB, sessionStorage, URL-encoded progress, service worker or remote progress API. Browser refresh/reopen starts at lesson 1. Ordinary static asset delivery is not a progress database; no answers or child information are sent in requests.

Android stores one small record per course, containing only schema/compatibility metadata, course ID and highest lesson ID. No cursor, current lesson, consecutive run, per-word results, dates, direction history, names or device identifiers are saved. Use app-private preferences through the Kotlin bridge; do not instantiate Capacitor Preferences in the browser, where its documented fallback is localStorage. Exclude the progress record from automatic cloud backup/device-transfer rules and verify the actual device behavior; manual user-chosen file transfer is the supported app workflow. Disabling Android backup alone is not evidence that all manufacturer transfer behavior is blocked.

Proposed version-1 record/export fields are `formatVersion: 1`, `courseId`, `progressCompatibilityVersion: 1`, `highestLessonId`. The course declares the matching compatibility value. Text-only corrections can change `contentVersion` without invalidating the record; incompatible course ordering/identity changes require a compatibility bump and an explicit migration. No checksum, timestamp or app-version field is needed to interpret this minimal record. Structural/integrity checks do not authenticate learner achievement, which v1 does not require.

Android uses Storage Access Framework create/open document actions with `application/json`, no broad storage permission and no retained file URI/history. Read at most 16 KiB even when provider-reported size is unknown; validate UTF-8 JSON object, exact supported keys/types/versions, course identity and lesson membership before presenting a replacement confirmation. Reject malformed, unsupported, foreign or incompatible data without changing the current record. Cancel, denied access, write/read failure and process interruption must not mutate the existing valid record. Commit a replacement atomically only after validation and confirmation. Ordinary learning updates are monotonic; an explicitly confirmed restore may replace with a lower valid record, as required by the replacement workflow.

Picker providers may offer user-controlled cloud locations; the app has no sync client and must work with local files offline. Never promise that a user-selected external destination itself is private or offline. Import updates only the record; it never resumes a saved lesson. Re-read the current native record before comparing/updating after restore so in-memory state cannot accidentally resurrect a replaced record.

## Owner decisions — proposals, not amended product rules

These points affect learner experience. Review them with this decision before L-002/L-003; no code should silently choose differently.

| Point | Proposed resolution |
| --- | --- |
| Direction changes | Select direction before learning; changing it explicitly starts a fresh session at lesson 1 |
| First-install record baseline | Lesson 1 is already reachable; baseline is its ID and initial launch has no congratulation |
| Completing lesson 10 | Finish the current session with a quiet completion screen and explicit Restart action; never create a lesson 11 record |
| Prompt count | Ten prompts per lesson for v1; engine remains valid for other nonempty counts |
| Android lifecycle | Ordinary background/foreground and picker round trips retain the in-memory session; process/WebView recreation or explicit restart creates lesson 1; never persist the session |
| Pronunciation coverage | Optional reviewed clips; approve whether all prompts need coverage before public release |

Final name/package identity and code/content/audio licenses remain owner decisions under release preparation/L-008. This PR does not alter repository settings, promise Play approval or expand v1 scope.

## Verification and next task

For this documentation task: inspect actual main/open PR state, review official platform documentation, verify local Markdown references and L-001 acceptance coverage, obtain an independent document review, then read back the committed GitHub files/diff. Runtime, browser, Android, CI and deployment tests are **NOT RUN**: no product code exists.

For implementation: start deterministic engine tests and minimal PR CI with L-002; L-006 completes cross-platform/build/release isolation later. Test both directional question construction, repeated misses, threshold/wrap ordering, session resets, record-only notifications and stale answers. L-003 validates both language directions and content/assets; fluent human review is a release requirement. L-004 exercises keyboard/screen reader/mobile/desktop, absence of storage and third-party requests, Pages base paths and the real deployed build. L-005 tests offline assets, lifecycle, backup validation/cancel/lower replacement, install/update/clear-data and transfer between two devices. Compare both packaged platforms against common conformance examples; shared source alone does not prove packaged parity.

**Next action:** owner reviews this L-001 PR and resolves the proposal table. After authorized integration, explicitly request the next small L-002 slice; no automatic app implementation or release follows this document.

## Official sources read on 2026-11-15

- [Capacitor 8 migration/toolchain requirements](https://capacitorjs.com/docs/updating/8-0) — versioned v8 page; search also surfaced unreleased/v9 material, which was not used as the baseline.
- [Capacitor Preferences](https://capacitorjs.com/docs/apis/preferences) — Android private preferences and browser localStorage fallback.
- [Vite static deployment](https://vite.dev/guide/static-deploy.html#github-pages) — repository Pages base and static build output.
- [Android document access](https://developer.android.com/training/data-storage/shared/documents-files) — system create/open document actions, URI grants and provider behavior.
