# Current working checkpoint

Current task: L-013

## Current authorized slice — 2026-11-23

Owner requested implementation of three CURRENT-question→CORRECT-answer listening pairs after a mistake, followed automatically by the existing one-question-back navigation. Explicitly no Try again option. Third cumulative block mistake restarts lesson1 after those pairs; correct answers keep500ms. Standing owner authorization permits efficient checked merging/live publication without another routine approval request.

Branch feat/mistake-listening, isolated checkout /workspace/work/mistake-listening, baseline fce95d95f63e3313809a94e7af5ff5ada5d55e8f. Kids/Adults0.5.0 is already live; L-010 reading-guide integration remains pending and is not part of this slice.

## Implemented locally

Completion-aware media playback waits for ended, handles rejection/error/30-second stall timeout, cancels on stop and rejects stale events/promises. Audio view binds source/current concept and correct target text, plays exactly six clips, locks replays/options while listening and reports round1–3. UI applies the pending engine result only after completion; media failure shows correct text/error then recovers after500ms. Reset/course/direction cancels playback and pending navigation. No engine/scoring/content/recording change, no retry button, no storage.

New failing-first audio tests verify six ordered completions, cancellation, rejection, stall recovery and same-element late promise safety. Real UI tests verify three pairs in every allowed direction and third-mistake/reset cancellation; correct-answer500ms and original course checks retained. PASS54Node/41Python; real Chromium six completeEN/JA clips before automatic step-back; completion-event conformance Kids/Adults×seven directions; third-mistake timing, restart/stale-ended cancellation, blocked media recovery,320/390/1280 light/dark overflow and reload/zero storage. [Browser receipt](review/2026-11-23-mistake-listening-browser.json). Source/CI/live status is recorded after actual execution, not assumed. Independent review found no blocker in sequencing/cancellation/binding.

## Exact next step

Finish real-browser all-course/all-direction correction checks and actual complete playback, full Node/Python/protocol/build parity checks, push source, check CI, merge/publish and compare hosted bytes. Then save a durable live receipt and return the current pointer to pending L-010. Do not claim all phrases fluent-human reviewed; reading guides remain unmerged #21. Original510 plus focused100-item courses, seven directions, recordings and ZERO saves remain preserved.

Prior checkpoint preserved [verbatim](history/WORK_CHECKPOINT-before-mistake-listening-2026-11-23.md). Canonical tasks:docs/TD_LIST.md.
