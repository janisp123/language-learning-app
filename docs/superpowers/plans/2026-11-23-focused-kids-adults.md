# Focused Kids / Adults Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Proposed execution: inline, one independent whole-branch review; owner implementation authorization remains pending.

**Goal:** Add focused100-item Kids and Adults starting courses across the existing seven directions, preserving the510-item bank and zero saved learner state.

**Architecture:** Keep the current canonical bank and learning engine. Store newly needed meanings once in extension modules, and select course manifests referencing existing/new permanent IDs. Compile a selected100-item view before starting the unchanged scoring state machine; preserve a separate original510-item view.

**Tech Stack:** Existing plain JavaScript/HTML/CSS, JSON modules, Python3.12+ packaging, Node24+ tests and Chromium verification. No new runtime package/service.

**Spec:** [Owner-approved course lists/design](../../proposals/2026-11-23-focused-kids-adults.md), approved2026-11-23. This plan's technical choices and remaining presentation choices are the author's proposal, not previously approved implementation.

## Global constraints

- 100 items per course:80 shared +20 audience-specific; ten blocks of exactly ten. Shared means the same communicative intents, not literal English grammar in every language.
- Exactly seven selectable directions:lv-ru,lv-en,ru-lv,ru-en,en-lv,en-ru,en-ja. No Japanese-source or LV/RU→Japanese options. Source language controls the UI.
- Preserve all510 existing meanings, IDs and recordings, except separately approved and verified correction slices. Do not import every audit suggestion or duplicate the dictionary per audience.
- ZERO saved learner progress/preferences on every platform. Every reload/fresh session starts at lesson1. No cookies/localStorage/sessionStorage/IndexedDB/native/URL progress or audience restoration, accounts, age entry, tracking or export/import.
- Preserve ten-consecutive-correct completion, wrong-answer one-prompt-back, third cumulative block mistake reset, reshuffle each appearance,500ms answer transition and current-prompt/answer speaker behavior. Selection changes cancel old timers/audio and start clean.
- Practical phrases from lesson1 and language-appropriate phrase limits are scoped to the new focused courses; preserve the original510 course rules and historical locks.
- Short, commonly understandable wording; familiar-word reuse over breadth and stylistic polish. No synonym padding or claim of measured frequency/native certification. No microphone/chatbot/new exercise mode.
- Planning approval is not permission to merge/publish PR #21/#27/#28, replace Drive artifacts or deploy. Push verified source before review upload; download it back and compare exact bytes. Owner release approval remains separate.

## Pending integration and author choices

- PR #26 is merged. PR #27 corrections and PR #21 reading guides are separate/unmerged. Recheck actual state first. Prefer a checked main baseline with approved correction source; if #27 is still unmerged, do not silently adopt it. Keep focused implementation off public main until its dependency decision is explicit.
- Preserve approved source-language reading aids for lv-ru,ru-en,en-ja. Reconcile/test the relevant #21 modules and greeting patch in a separate reviewable integration slice; do not drag its obsolete protocol/task edits into the new branch. Other four directions remain unannotated.
- Propose Kids as the fresh-session default. Adults is the second audience option. Expose the original bank under a separate collapsed “Original510-item course” setup control, so the audience selector still contains exactly Kids/Adults and the larger bank never silently expands a starter. This presentation choice needs owner approval with the plan.
- A new audience/direction/course-size selection on setup starts at lesson1; restart stays in the current course for that visit. Reload resets to Kids/standard source default and no remembered choice. The existing consumed one-use dark-theme handoff is unchanged.
- Ellipsis labels in the spec are editorial intents. Ship one complete example per item, not literal ellipses, arbitrary input or an automatic grammar generator. Use taught words (water,help,milk,phone,pen,schoolbag). For name/place examples use fictional names/public places; no personal learner data.
- “I speak a little…” selects the target-language name; “Do you speak…?” selects the source-language name. Author complete variants as distinct stable meanings with four translations/audio; choose the appropriate variant in the course manifest before grading. Do not mislabel different literal meanings under one concept ID. Each direction still contains exactly100 learning items. Other pattern realizations keep the approved intent; semantic changes go back to the owner.

## Review focus

1. Switching audience/direction while a500ms transition/audio decode is pending must not leak the old course; test in Task2/3.
2. Language-dependent pattern slots must resolve to complete utterances with exact source/target/audio/reading bindings; test in Task1/3.
3. New focused content must not alter the original510 order, translations, IDs, audio or validators; compare exact baseline in Task1/2.
4. Mobile setup must expose both audience options and all seven directions in light/dark mode, with source-language labels and keyboard access; test in Task2/3.
5. Completion/reload and repeated mistakes must remain course-local and storage-free; test Kids and Adults in all seven directions in Task2/3.

---

## Task1: Map and author the focused content without duplicating the dictionary

**Files**
- Create `content/focused/catalog.json`: version,defaultAudience,course references and scoped phrase policy.
- Create `content/focused/courses/kids.json` and `adults.json`: ordered ten-block selections; reuse the same eight shared block references.
- Create `content/focused/blocks/shared-01.json` through `shared-08.json`, `kids-09.json`,`kids-10.json`,`adults-09.json`,`adults-10.json`.
- Create `content/focused/concepts.json` and `content/focused/languages/{lv,ru,en,ja}.json`: only new canonical meanings/forms, source UI lesson/selection labels where appropriate. Existing concepts remain referenced by vocab IDs.
- Create `tools/focused_loader.py`, `tests/test_focused_content.py` and `docs/review/focused-content-map.json` (final stable draft-ID→concept/variant mapping).
- Modify `tools/content_loader.py` only for narrowly shared helper reuse if necessary; keep `load_content(root)` behavior and return contract for the original bank.

**Interfaces**
- `load_focused_content(root: Path, legacy_course: dict) -> dict` returns `{schemaVersion:1,contentVersion,defaultAudience:"kids",extensions:[{id,lv,ru,en,ja}],courses:{kids,adults}}`.
- Each course has `{id,audience,blocks:[...]}`; each block has stableid,title and ten prompts. A prompt has `{id,slotId,conceptId,distractorIds}` or `{id,slotId,conceptByDirection,distractorIdsByDirection}` for reviewed language-name variants. Resolve the latter before producing normal engine prompts; no ellipses in final runtime text.
- Draft S/K/A IDs remain review references; reuse existing concept IDs only after sense equivalence is established. Allocate new permanent IDs without reusing or renumbering old IDs. Shared block/prompt IDs may appear in both course views because the selected course ID distinguishes their sessions.

- [ ] **1. Write `test_focused_counts_shared_core_and_preservation`.** Assert each audience has100 distinct slot IDs/ten blocks, intersection is exactly S01–S80, and K/A tails contain exactly20 each. Every reference resolves in each of seven directions; same semantic slots shared across audience views. Compare the original510 canonical outputs/audio hashes against the verified starting baseline.
- [ ] **2. Run `python -m unittest discover -s tests -p 'test_focused_content.py' -v`.** Observe failure for missing loader/data, not an unrelated import/dependency error.
- [ ] **3. Author the complete meaning map and four-language forms.** Reuse the approved list's62 exact course-label/10 library-wording candidates only after resolving their existing sense findings. The48 unmatched labels may reuse related meanings after adjudication; they are not automatically48 new IDs. Reuse source evidence; research new/unresolved meanings. Pin source URLs, context, editorial/human status and complete pattern realizations in the review map. A language-name variant has its own permanent concept ID.
- [ ] **4. Implement strict `load_focused_content`.** Reject unknown/mismatched concept IDs, missing direction variants, duplicate slots, unauthorized audiences, blocks not ten, wrong slot order or ambiguous actual choices in any language/direction. New phrase policy: at most12 whitespace-delimited words per form, no newline/control characters; permit question punctuation/complete short sentences. This is a structural ceiling, not a target: editorial review keeps expressions compact. Do not relax the legacy four-word/no-sentence policy.
- [ ] **5. Add negative tests** for each rejection above, overlapping source-target senses (not only duplicate strings), copied translations bound to the wrong ID, and variant/missing-language errors. Semantic checks use explicitly reviewed exclusion pairs and human/editorial adjudication; do not pretend a generic validator understands all synonyms.
- [ ] **6. Run the focused suite plus `python -m unittest discover -s tests -p 'test_*.py' -v`.** Preserve legacy tests/digests; no blanket baseline refresh. Commit a coherent authored-data/loader slice only after checks and a source-language meaning review.

## Task2: Select the course and keep all session behavior isolated

**Files**
- Create `core/course-selection.js` and `tests/course-selection.test.cjs`.
- Modify `core/engine.js` only to validate explicit focused audience metadata in addition to legacy agePath10–17; do not rewrite transitions.
- Modify `tools/build_browser.py` to embed the focused extension/catalog once as `focused-data` and include the selector module before app initialization.
- Modify `web/index.html`,`web/app.js`,`web/styles.css`, `content/ui-contract.json` and source UI language modules for audience labels/original-course control and focused lesson titles.
- Extend `tests/runtime.cjs`,`tests/ui.test.cjs`, `tests/locales.test.cjs`, `tests/engine.test.cjs` and focused-content packaging tests. Do not scatter selectors into unrelated modules.

**Interfaces**
- Export `LanguageCourseSelection.select(legacyCourse, focusedData, audience, direction) -> EngineCourse`; pure function, no storage/DOM/network. Audience is exactly `kids` or `adults`.
- Selected focused EngineCourse retains runtime schema2, has uniqueid `focused-{audience}-{direction}`, explicitaudience,agePath matching audience,contentVersion from focusedData,defaultDirection=direction,directions=[direction],four-language phrase records and ten ten-question lessons with ordinary `{id,phraseId,correctAnswerId,distractorIds}` prompts. Include only concepts used by selected prompts/choices, reusing references rather than authored copies.
- The setup's global direction selector comes from the original seven-direction allowlist, never from a selected course's one-direction view. The focused engine rejects forged direction starts. Original510 mode returns the original full runtime with its existing seven directions/IDs unchanged. No third audience value is needed; its separate original-course control selects the legacy view.
- `web/app.js` resolves the view before `E.start`; all engine events use that same view. Old shown-course IDs cannot grade in a new view. Existing `LanguageAudioView` API stays unchanged.

- [ ] **1. Write selector tests** asserting Kids/Adults each compile100/ten lessons for all seven directions; exactly80 shared slot intents; no unauthorized direction/audience or missing variant accepted; original mode returns the unchanged510 course. Observe failures with `node --test tests/course-selection.test.cjs`.
- [ ] **2. Implement the selector and minimal engine metadata support.** Validate known audience/agePath consistency; reject invented ages/audiences instead of deleting the existing check. Include stable course identity so a Kids presentation cannot grade an Adults state, including when both show a shared word.
- [ ] **3. Add UI regression tests first** for both audience options and original-course access, source-language labels,100 versus510 lesson counts, all seven direction options after selection, selection/reset dark-mode behavior and no preference restoration. Observe failures before adding controls.
- [ ] **4. Integrate selection UI and builder.** Label Kids/Adults in LV/RU/EN, keep English UI for en-ja, localize selected lesson titles, and use large labelled controls that fit320px. Cancel timer/audio and discard pending state before each change. Preserve current-session dark mode; do not persist choices or encode them in URLs.
- [ ] **5. Extend transition/identity tests** to both focused courses/all seven directions: one-step back, ten-consecutive completion, third nonconsecutive mistake reset,499ms locked/500ms advance, stale callbacks, double taps, wrong-course presentations, reset/reload and empty storage. Keep original510 conformance cases. Test the setup global allowlist independently from each compiled view's restricted direction.
- [ ] **6. Run `npm test` and full Python suite, build the standalone app and compare generated output. Existing UI conformance tests explicitly select the original-course control where they require legacy510 behavior; preserve equivalent new defaults tests. New audio coverage is completed in Task3, so this intermediate slice is labelled incomplete and not delivered as a working app.** Commit only a verified session-selection slice; do not publish incomplete/missing-audio content as a working release.

## Task3: Match pronunciation/reading aids and deliver a review build

**Files**
- Create `content/focused/audio.json` for new clips only; new MP3s stay under `audio/{language}/{permanent-concept-id}.mp3`.
- Extend `tools/audio_loader.py`,`tools/generate_audio.py` only as needed to support explicitly selected focused concepts, preserving legacy authoring behavior/provider selection and validation.
- Reconcile `tools/reading_loader.py`,`web/reading-view.js`,`content/readings/`, `tests/test_readings.py`,`tests/readings.test.cjs` from held #21 in an isolated integration commit. New-only readings go in `content/focused/readings/{lv-ru,ru-en,en-ja}.json`, keyed by permanent IDs. No obsolete task/protocol files from that branch.
- Extend `tests/test_audio.py`, focused loader tests, answer audio/reading UI tests, `docs/BROWSER_TEST_BUILD.md`, task/checkpoint/changelog and `docs/delivery/` receipts; regenerate `downloads/language-learning-test.html` from sources only.

**Interfaces**
- `load_all_course_audio(root: Path, legacy_course: dict, focused_data: dict) -> dict` composes legacy/new manifests, builds a temporary union phrase bank for validation, and delegates to existing `load_audio(root, course, manifest=None)`. Reject conflicting existing keys; verify exact text/hash/coverage and a common declared content revision. Keep legacy loader calls/results unchanged. The returned pack covers every source/target form in any selected view; never pass a one-direction selected view to a loader that expects the full bank.
- Authoring accepts an explicitly selected permanent ID and language; no whole-bank regeneration. Reuse identical already-reviewed audio bytes only when the exact spoken form matches. Every changed/new recording remains bound to exact text.
- `load_focused_readings(root, legacy_course, focused_data, legacy_readings) -> dict` validates all new-only entries against the union phrase bank and merges them into the existing pack shape `{schemaVersion:1,reviewStatus,directions:{direction:{conceptId:entry}}}`. Preserve strict `load_readings(root, legacy_course)` coverage checks for legacy files; do not feed a selected one-direction course into its all-three-directions/block validator. Reused concept guides remain single-source.
- Reading guides remain only lv-ru (Latvian letters),ru-en (Cyrillic),en-ja (per-symbol romaji with contextual/small-kana notes). Variant expressions select matching guide/audio IDs. Keep all other four directions unannotated. Integrating these modules needs owner permission for the held feature; plan approval alone is not release approval.

- [ ] **1. Add failing coverage tests** for a missing new Japanese answer clip, mismatched pattern text/guide, wrong language-name variant recording, and a conflict attempting to overwrite a protected legacy clip.
- [ ] **2. Author/review only missing pronunciations and guides.** Use existing providers/format; label synthetic/editorial status honestly. Reconcileこんにちは and its contextual finalは→wa guide with the first correction slice. Decode every new clip and compare all protected legacy bytes.
- [ ] **3. Run full Node/Python/protocol suites and standalone/site builds.** Verify committed/generated download parity. Review actual course forms and distractors independently; keep linguistic uncertainty distinct from technical PASS.
- [ ] **4. Verify Chromium Kids/Adults ×seven directions ×100 prompts**, plus legacy510 coverage,320/390/1280px light/dark/keyboard, both visible audience controls, source UI, speakers never grading, current prompt only autoplay, completion/reset/selection cancellation/499–500ms, and reload/process fresh lesson1 with zero saved state. Mark actual physical-phone/fullscreen-reader checks NOT RUN unless performed.
- [ ] **5. Check communication examples with a fluent reviewer when available:** introduction and basic response, needs/place, repetition, help; child game/school and adult purchase/transport. Record actual result; no automatic claim that passing multiple-choice tests proves speaking ability.
- [ ] **6. Obtain one independent whole-branch review, fix concrete issues and push verified source into checked PRs.** Update checkpoint with real counts, source SHA, open dependencies and one next action. Do not merge held PRs or publish automatically.
- [ ] **7. Deliver the review HTML to the established Drive folder after source push**, preserving existing held reviews until a replacement is explicitly appropriate. Download the uploaded file and require byte-for-byte equality; record size/SHA256/file ID/source/checks in a receipt. Ask for owner merge/publication approval only when the concrete working review is ready. After authorized publication, verify actual hosted bytes/version and visible selectors before claiming it live.

## Plan self-review

- Spec's120 draft slots accounted for:80 shared and20 per audience; complete phrase/variant mapping precedes UI work.
- Existing510 bank, archive and course behavior preserved through legacy loader contract and explicit compatibility tests; new-only extensions prevent copied dictionaries.
- All five review-focus cases have an owning test step; no new exercise engine or storage introduced.
- `select` emits the same runtime EngineCourse contract; UI uses the global seven-direction list while the compiled view permits only its selected pair.
- Current open-PR dependencies, source/Drive/public stages and native-language/physical-device limits remain explicit. This plan is not implementation or release evidence.
