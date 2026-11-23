# Selected Answer Audio Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this small slice inline.

**Goal:** Correct submissions invoke the ordinary answer speaker while retaining500ms navigation.
**Architecture:** Reuse the bound speaker click in web/app.js before disabling controls; do not add audio channels, queues or completion gates.
**Tech Stack:** Existing dependency-free JavaScript, Node/Python tests, optional Playwright/Chromium.
**Spec:** Owner clarification and explicit “Yes. Implement it”; recorded in docs/DECISIONS.md, Selected correct-answer playback.

## Global Constraints

ZERO saves. Exactly seven directions. Existing content/recordings/counters/correction sequence untouched. Correct navigation500ms; old sound stops on navigation. Speaker-only actions never grade.

## Review Focus

- Synchronous playback uses selected target ID/text/language.
- Duplicate submission does not replay/regrade.
- Blocked playback never delays navigation.
- Restart and stale play promises cannot affect a new prompt.
- Completion/course/direction changes cancel old sound.

### Task 1: Reuse ordinary speaker playback on correct submissions

Files: web/app.js; tests/ui.test.cjs; tests/learning-theme.test.cjs; new real-browser selected-answer test if needed; package/UI badges/generated download; canonical TD/checkpoint/decisions/changelog/evidence.

- [x] Change target binding/play counts and assert499ms still locked,500ms new source prompt; watch fail on baseline.
- [x] Invoke the correct row’s speaker before disabling it, using the existing validated handler.
- [x] Verify real browser click/keyboard and media events, blocked playback, reset,21 course/direction starts; full suites and build parity.
- [x] Review, commit/push checked PR, merge/publish under standing authorization, verify hosted bytes and archive completed L-015 with receipt.
