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
