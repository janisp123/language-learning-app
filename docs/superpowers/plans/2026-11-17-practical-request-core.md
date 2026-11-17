# Practical Request Core Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this single content slice. Steps use checkbox syntax for tracking. Owner requested immediate implementation; continue inline in the isolated checkout.

**Goal:** Make a compact practical request core available earlier while retaining all old content.
**Architecture:** Add one data-only block, reorder catalog references, and extend registered audio. Existing runtime/engine/media player remain unchanged.
**Tech Stack:** JSON content, JavaScript tests, standard-library Python packagers, optional gTTS/Flite audio authoring.
**Spec:** `docs/superpowers/specs/2026-11-17-practical-request-core.md`.

## Global Constraints

Preserve existing IDs/text/bindings and all old clips. Ten prompts per block; no learner-state saves. Maximum four displayed words per item. All six directions retain complete source audio. New full phrases start in block 11. Original lock files stay unchanged.

## Review Focus

- Old content identity survives catalog reordering; lock comparison uses the recorded snapshot order.
- New request/negative/restriction meanings remain distinct in all displayed choices.
- Every new source-language phrase has an actual decodable registered clip.
- Counts, localized version labels, generated download and site artifact agree.
- Refresh/restart still starts lesson 1 and audio still plays only the current prompt.

### Task 1: Revise content, preserve identity and deliver the review build

**Files:** content catalog/concepts/three language modules/new block/audio manifest and assets; tests/test_practical_core.py, tests/test_basic_vocabulary.py, tests/ui.test.cjs; package/version and relevant documentation/delivery record.
**Interfaces:** Consume existing `load_content`, `load_audio` and builders; produce 510-item/51-block course in the spec's order and 1,530 clips without runtime interface changes.

- [x] Add tests for exact prioritized block order, ten new translated meanings and complete audio; run them and observe missing-feature failures.
- [x] Author the spec's data; verify the old vocabulary digest in its original recorded order and test current order separately. Register/generate only thirty new clips.
- [x] Build/copy generated HTML; remove hardcoded 500-item traversal assertions in favor of the validated active count. Run full Node/Python suites, decode new clips and verify old content/asset identity.
- [x] Verify the new phrase block and current-prompt playback in mobile-sized Chromium across six directions; check zero saves and source/site/download parity.
- [x] Commit/push, obtain focused review, update stable Drive HTML and verify byte equality; record exact source, hash, checks and remaining review limitations.
