## 2026-11-17 — Source-language reading guides, review build 0.4.12 (Codex)

Owner-approved L-010: only lv-ru/ru-en/en-ja get target-answer reading aids in the reader's script (Latvian/Cyrillic/romaji). 153 independent ten-item data modules cover all510 per selected direction; other four directions remain plain. Japanese kana are separately aligned; visible combinations/doubling/long marks and contextual kanji groups avoid false one-character sound assumptions. Strict new module loader, text-node-only renderer, preserved accessible answer identity, source-language notices and offline embedding. No engine, audio, translations, question/answer bindings, scoring, 500ms timing or zero-saves changes. UI version badges only updated to0.4.12.

Verification: observed missing-feature failures before implementation;52Node/32Python pass. Chromium all510/all7, 2040 option/replay bindings each, 499/500ms timing, narrow/dark/keyboard/all-guide layout sweeps and storage/reset passed. Original translation/recording/lock preservation documented in delivery/2026-11-17-reading-guides-preservation.json; browser receipt alongside it. Independent review prompted visible small-kana roles, improved contextual kanji alignment and explicit bundled feature assertions. Readings remain drafts for fluent human review; physical-device/full-screen-reader review not run. Source push, Drive delivery, merge and public deployment are tracked separately in the current checkpoint and PR; no release claim follows from local checks.

## 2026-11-17 — GitHub presentation polish (Codex; PR pending)

Owner-authorized documentation-only slice from main `a159c6618be40e7acdd53966e3fca60264abad7e`. README foregrounds the real browser app, hobby motivation, ChatGPT/Codex assistance, seven directions, zero saves and outstanding review limits. Added a genuine live-app screenshot and contribution guidance. Corrected current checkpoint/TD/Pages-handoff summaries while retaining old handoffs and preserving the previous checkpoint. Existing homepage/topics/description already present; no license or repository setting changed. Pending receipts PR #19 and older overlapping documentation PRs remain separate. App, content, audio, generated HTML and workflow bytes unchanged; no release/Drive update. Link/render and verification results are recorded in the presentation PR; runtime results must be taken from actual CI, not inferred from this prose.

## 2026-11-17 — Practical request core and earlier communication tools, 0.4.5

Delivery verified: source 67eef5721f0ba3a61bb23009095d0dae5976131c is pushed, CI 44082103872 succeeded and independent whole-change review found no actionable findings. Stable Drive HTML replaced and downloaded back exactly: SHA-256 7320a60100a762fc948173eabcea23e070dd23596a08567190457dbca467cbf7, 15,802,419 bytes. Current receipt: delivery/2026-11-17-practical-core-drive-sync.json. Integration remains pending PR #7; no public deployment.

Owner authorized implementation of the situation-audit recommendations. Codex preserved every original meaning/translation/prompt/binding and added ten practical items: needs for help/water/doctor/medicine, not understanding, calling ambulance/police, allergy and without milk/sugar. New total: 510 items in 51 blocks. Pronouns/help move earlier; the new request block is lesson 11 after 100 introductory words/short phrases, followed by the main action blocks. Thirty new LV/RU/EN recordings extend the current-prompt-only speaker; all original 1,500 MP3 hashes remain unchanged. Engine, player, grading, 500 ms timing and zero saves are unchanged. Original lock files/digests are preserved; snapshot verification uses recorded order and new regressions pin the approved live order/ten translations. Local checks: 37 Node and 23 Python tests pass after observed RED failures; all thirty new clips decode. Chromium traverses the introductory core and plays all ten new phrases in every direction; long LV text fits at 320 px and reload starts lesson 1 with empty storage. No concrete issue from independent meaning review; fluent review/physical Android remain pending. See the specification, current checkpoint and delivery receipts for final source/upload state. No merge/publication performed.

## 2026-11-17 — Zero learner-state saves on every platform

Owner decision recorded by Codex: progress exists only in current session memory on browser, Android and any future wrapper. Removed the planned highest-lesson record, record-based congratulation and backup/export/import requirements from active instructions, architecture, release checklist and L-005 while preserving task IDs/attribution. Updated website copy and marked the former backup playbook advice superseded. Headless Chromium reached lesson 2 in all six directions; reload and same-profile browser restart started at lesson 1 with zero localStorage/sessionStorage/IndexedDB/cookies. See delivery/2026-11-17-zero-saves-verification.json. Website staging and app-byte parity verified; no runtime change, new version or repeated Drive upload is needed. Android is not implemented and native checks remain pending. Older architecture PR #3 requires reconciliation before use; this update remains in PR #7 pending integration.

## 2026-11-17 — Current-prompt speaker, review build 0.4.4

Implemented by Codex at the owner's request: a 48 px speaker beside the current word/phrase plays its existing recording in the displayed source language. The owner explicitly removed previous-answer sound: its replay section and automatic target-answer audio are removed. Current sound stops on question changes, reset/direction changes and completion. Localized accessible names and playback errors cover LV/RU/EN. Learning engine, vocabulary, recorded assets and grading are unchanged. Version labels and generated HTML agree on 0.4.4. Validation: 37 Node and 20 Python tests pass; new regressions observed failing first; all 500 questions/six directions traversed with source-clip binding and no sound from answering. Headless Chromium at mobile size verifies real playback, keyboard replay, cancellation, grading isolation and layout in all six directions. Source 02d1da8 is pushed; CI 44069083521 succeeded; independent review found no actionable issues. Stable Drive HTML replaced and downloaded back with exact byte equality, SHA-256 3c55f24a42fd119fba8bccac5c51e8dbcc57cc79a2be49b109f61a486e2aceb7; see delivery/2026-11-17-current-prompt-drive-sync.json. Physical Android/full accessibility remain pending. Included with the website handoff in PR #7; no merge or public deployment performed.

## 2026-11-17 — Website setup and durable editing handoff

Recorded by Codex at the owner's request: the webpage is already built; the remaining owner action is repository Settings → Pages → Source: GitHub Actions. Expanded discovery-preview/LAUNCH.md with the exact setup, editable sources, existing main-only publication workflow, failed-job retry and hosted-byte verification. Corrected the active checkpoint and relevant TD status: PR #6 is merged at 85e4dc4, version 0.4.3 is synchronized, and main browser CI 44053240358 succeeded. Publication run 44053240327 failed at Pages configuration with “Get Pages site failed / Not Found”; deploy was skipped. Checked the source, workflow/job logs, merged history and existing delivery pointers. Documentation only; no app/source behavior, settings, Drive files or publication changed. No new runtime tests claimed. This handoff update is pending its own PR integration.

## 2026-11-17 — GitHub Pages publication preparation

Owner requested online availability like the mental-health test. Codex updated the existing landing copy to about 500 survival essentials and complete LV/RU/EN audio, linked the stable Drive folder for downloads, and enabled main-only publication triggers in the existing Pages workflow. Source synchronization recovered; completed audio commits are now on PR #6. Build/site/download bytes match the verified Drive artifact. Pages Source selection, checked integration and live URL verification remain pending until delivery evidence is recorded.

## 2026-11-17 — English complete, full audio build 0.4.3

Codex completed all 500 English recordings offline with Flite cmu_us_slt after online synthesis failures, saving ten batches of fifty. Enabled all six directions through the existing manifest; consolidated pending records. No changes to vocabulary, player/view or engine; RU/LV clips retained. Added optional network-free authoring helper and regression. 36 Node/20 Python checks pass locally; all 1,500 MP3 clips decode; Chrome English playback/replay/cancellation and English-source UI verified. Human pronunciation/device review pending. Drive HTML replaced in place and downloaded back with exact byte equality; build source d8ab062, full evidence in delivery/2026-11-17-english-complete-drive-sync.json. GitHub push remains blocked by proxy HTTP 503; local commits preserve progress. No merge/publication.

## 2026-11-17 — Full Russian–Latvian audio, batch 1

Codex extended the accepted audio modules to all 500 questions in both RU↔LV directions, preserving the first twenty clips, vocabulary, player/view and engine. Manifest completeness is validated at build time. Build 0.4.2 has 1,000 bundled clips; 36 Node/17 Python checks pass. English is PARTIAL and disabled: 111 cached clips before synthesis HTTP 503, retained in the pending audio manifest. No merge/public release. All 1,000 clips decode. Drive batch replaced and downloaded back byte-for-byte; see delivery/2026-11-17-audio-batch1-drive-sync.json. Local source commit 99016d3 is retained; GitHub push and English synthesis are blocked by shared environment network/proxy 503.

## 2026-11-17 — Communication efficiency over formal grammar

Recorded by Codex: maximize reuse of familiar words/patterns, minimize competing word choices, accept understandable fragments and imperfect grammar for survival communication. Updated CONTENT_RULES.md and AGENTS.md to supersede the earlier grammatical-correctness requirement while preserving intended meaning and unambiguous answer bindings. Documentation only; current translations, engine, recordings and Drive build are unchanged. No content audit is claimed.

## 2026-11-17 — Survival-basics scope clarification

Recorded by Codex in CONTENT_RULES.md, AGENTS.md and WORK_CHECKPOINT.md: approximately 500 crucial words/phrases for survival and everyday communication; current work focuses on Russian ↔ Latvian. Practical usefulness takes priority over breadth or hitting an arbitrary count. A broad curriculum and Duolingo-style feature expansion are out of scope. Documentation only; the current 500-entry bank, build and Drive package are unchanged. No new implementation task or content-review claim.

## 2026-11-17 — Modular first-block audio (PR #6 review branch)

Implemented by Codex: twenty bundled RU/LV clips for the first ten vocabulary IDs, automatic correct-target pronunciation and replay, isolated manifest/loader/player/view modules. Engine and vocabulary bindings unchanged. Build 0.4.1 is self-contained; scope excludes other questions and English audio. Applied prior questionnaire lessons through explicit contracts, deterministic assembly, stable IDs and default Drive pointers. 36 Node and 16 Python tests pass; all twenty MP3 files decode; Chrome preview verified played ranges and replay/cancellation in both directions. Local-file navigation is blocked by Cloud browser policy; physical devices and fluent pronunciation review remain pending. No merge/public release. Build source 851fdea pushed to PR #6; CI run 44025844650 passed. Stable Drive HTML replaced and downloaded back with exact byte equality (see delivery/2026-11-17-audio-drive-sync.json). See AUDIO_MODULES.md and current checkpoint.


## 2026-11-16 — 500-item basic vocabulary draft (PR #6, not merged)

Owner requested 500 basic words/short phrases and no sentences in the first ten blocks. Implemented by Codex: 50 ten-question blocks, 500 distinct concepts, 1,500 LV/RU/EN translations and 150 localized block titles; all six directions use the existing engine. New course/concept/block/question IDs avoid overwriting old meanings; original 0.3 content archived with unchanged identity lock, plus a new active 500-item lock. Loader validates curriculum counts, form tags, short translations and no sentence punctuation. Independent review corrected a duplicate meaning and wording mismatches. Thirty Node and thirteen Python checks pass, including full-course traversal in all six directions and generated artifact parity. Fluent human review, actual browser/device checks, deployment and Android remain NOT RUN. Authored source and generated portable HTML are prepared for PR #6; no merge/publication performed.


## 2026-11-17 — 0.4.6 current-prompt autoplay and author footer (Codex)

L-004, owner-requested slice on feat/current-prompt-autoplay-footer, based on PR #7 head 51878ef. Audio-view binding now attempts playback once per appearance through the existing cancellation/error path; no answer audio. Manual replay, scoring and 500 ms timing remain intact. Both public page footers include the exact author credit/profile link and retain project source links. No content IDs, translations, answer bindings, recordings or storage behavior changed. Verification: 38 Node and 23 Python tests; actual Chromium playback, advance/wrong return/restart/replay/cancellation and empty storage/reload reset in all six directions. See delivery/2026-11-17-autoplay-footer-browser.json. Physical devices, fluent pronunciation and full screen-reader review not run. No merge/public deployment.

0.4.6 delivery verified: source d59fabe pushed on PR #8 before stable Drive upload; full downloaded bytes compare equal. GitHub CI 44108161630 passed. Receipt: delivery/2026-11-17-autoplay-footer-drive-sync.json.


## 2026-11-17 — 0.4.7 English → Japanese only (Codex)

L-009: owner-authorized Japanese script-only translations for all existing 510 meanings, English UI, seven explicitly allowed directions. Catalog schema 2 and runtime allowlists replace automatic combinations; engine rejects forbidden or forged Japanese direction state. Target-only languages need translations, not source interface packs; English source audio reuses existing recordings. No accounts, tracking or saved state. Core scoring, 500 ms transition, question IDs/bindings and all six old directions preserved.

Verification: 41 Node / 28 Python tests pass after missing-feature failures; Chromium completed all 510 en-ja items and verified English media bindings, source UI/target tags, once-per-appearance autoplay, wrong/restart/reload/completion behavior, 499/500 ms timing, empty storage/cookies and 320 px request layout. Original archived/vocabulary locks unchanged; direct comparison preserved every old translation and all 1,530 audio manifest records/hashes. Independent reviews identified target-first locale anchoring and sister/brother/glass ambiguity; fixes have regressions. Fluent human language review, physical devices and full screen-reader audit remain pending. Receipt: delivery/2026-11-17-english-japanese-browser.json. Source d9044cd pushed on PR #9; GitHub CI 44109924376 passed before stable Drive replacement. Downloaded bytes compare exactly; receipt delivery/2026-11-17-english-japanese-drive-sync.json. No merge/public deployment.


## 2026-11-17 — Direct website access and README links (Codex)

Owner requested the current app directly on the existing GitHub Pages site and a README page link. Added prominent direct app, project website and hosted portable HTML links to README; corrected outdated manual-only workflow wording. Before integration, HTTPS landing and /learn/ returned 200 but hosted app hash matched 0.4.3. Existing checked PRs #7 → #8 → #9 contain the 0.4.7 app; integration/publication and hosted hash/browser readback are authorized by this request. No app/content/audio changes in this documentation slice. Publication evidence will be recorded after deployment.


## 2026-11-17 — 0.4.8 answer pronunciation speakers (Codex)

L-004, owner-requested independent speakers beside each answer. Speaker clicks play the exact target-language option from existing bundled LV/RU/EN recordings and do not select, grade, shuffle or navigate. Sibling buttons preserve separate keyboard actions. Shared playback cancels older audio; old/locked controls cannot play stale answers. Existing prompt autoplay, scoring, seven directions and 500 ms transitions preserved. Japanese answer recordings remain unavailable and those speakers are labeled/disabled; Japanese selection remains usable. No stored state, course/answer IDs, translations or recordings changed. 43 Node / 28 Python tests pass after observed failures; independent review found no actionable issues. Chromium verified four decoded target clips per direction, keyboard replay without grading, unchanged timing/cancellation and mobile/desktop layout. Source 00aa316 on PR #12 passed CI 44115225318; stable Drive file uploaded after source push and downloaded back with exact equality. Evidence: delivery/2026-11-17-answer-speakers-browser.json and delivery/2026-11-17-answer-speakers-drive-sync.json. No merge/public deployment at review delivery.


## 2026-11-17 — 0.4.9 Japanese answer audio repair (Codex)

L-004, explicit owner bug report: Japanese answer speaker controls in 0.4.8 were disabled because target clips were absent. Added all 510 exact Japanese translation recordings with gTTS 2.5.4; total 2,040 clips. No old recording, translation, ID, answer/distractor binding, player/engine or direction changes. All-phrases coverage now includes source and target languages, rejecting missing Japanese clips. Existing buttons become playable through data; source-English prompt autoplay, 500 ms transitions and zero saves remain intact.

43 Node / 29 Python tests pass after observed missing-feature failures. Independent asset review verified all 510 JA bindings/hashes and all 1,530 original records/hashes unchanged. Browser decode/UI evidence and delivery receipts are recorded separately. Fluent human pronunciation, physical-device and full-screen-reader review remain pending. No merge/publication at implementation checkpoint.

0.4.9 Japanese audio review delivery: source 6913c37 on PR #14 passed CI 44118339756 before stable Drive upload. Complete downloaded bytes compare exactly; receipt delivery/2026-11-17-japanese-audio-drive-sync.json.


## 2026-11-17 — 0.4.10 keep dark mode while learning (Codex)

L-004, owner bug report: landing dark mode was not passed to the separate learning document, which had no dark styles or theme control. Added one-use Learn-link theme handoff, consumed and removed before rendering with null history state; no preferences stored. Added localized learning-header theme toggle and dark colors for setup/practice/answers/audio/feedback/completion. Theme changes do not grade, reset, cancel audio or alter 500 ms transitions. Restart, direction changes and completion retain the in-memory theme; cleaned-URL reload starts light/lesson 1.

Baseline real-browser regression reproduced the missing theme. 46 Node / 29 Python tests pass, including keyboard/source-language toggle, URL cleanup, null history state, dark answer audio, toggle during pending answer, full course completion, restart/direction/theme reset, empty storage/cookies and320/1280px layout. Independent review found no actionable issue. All content/audio/directions/scoring preserved. Browser evidence: delivery/2026-11-17-learning-theme-browser.json. Source push/review delivery/integration pending; physical-device/full-screen-reader checks not run.

0.4.10 review delivery: source23f6d37 pushed on PR #17, CI44123339528 passed before stable Drive upload. Downloaded full file matches exactly; receipt delivery/2026-11-17-learning-theme-drive-sync.json. No merge/publication at this checkpoint.


## 2026-11-17 — 0.4.11 speaker-only green feedback (Codex)

L-004, explicit owner request after a phone screenshot: activating an answer speaker highlighted the full answer row through answer-option:focus-within. Removed that shared row outline and confined green focus/active styling to the speaker button. Keyboard focus remains visible on both independent buttons. Answer text, grading, audio, 500 ms transitions, source/theme behavior and all content/recordings are unchanged.

The touch-browser regression reproduced the original full-row outline and now passes, checking unchanged answer text styling, green speaker cell, previous highlight clearing and keyboard focus. 46 Node /29 Python tests pass; independent review found no actionable issue. Chromium touch checks at320/390/1280px in light/dark verify actual replay without progress/feedback changes and no overflow. Receipt: delivery/2026-11-17-speaker-highlight-browser.json. Physical-phone/full-screen-reader checks remain pending. Source/review delivery/integration pending.

Prior-task completion: PR #17 dark learning mode is merged ataae5147, deployed by44127976379 and passed main CI44127976406. Actual hosted phone-layout checks passed; prior evidence preserved in delivery/2026-11-17-learning-theme-deployment.json and learning-theme-hosted-browser.json.

0.4.11 review delivery: source b3cd10f pushed on PR #18; CI44167704597 passed. Stable Drive upload followed source push and downloaded full bytes compare exactly; receipt delivery/2026-11-17-speaker-highlight-drive-sync.json. No merge/publication at delivery.
