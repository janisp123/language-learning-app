# Three correction pairs — implementation record

Owner explicitly approved the exact behavior on2026-11-23: CURRENT source question→CORRECT target answer three times before automatic previous-question navigation, no Try again button. The third mistake restarts lesson1 after listening. Correct answers keep500ms. This is L-013 and has standing authorization for checked live publication.

- [x] Add failing-first completion/order/cancel/rejection/stall tests; implement `LanguageAudio.playToEnd` with ended/error/timeout/cancel outcomes, preserving ordinary replay API.
- [x] Add six-clip sequence to audio view, guarded by current presentation/generation/exact correct-answer binding. Lock replay controls during correction; reset/direction/course cancels stale work.
- [x] Gate only incorrect-result application in UI; preserve the original pure engine/counters/content/audio. Successful listening steps back immediately after final ended; blocked/error playback displays correction/error and recovers after500ms.
- [x] Verify54Node/41Python, same-element late rejection, all seven directions/third mistake, real six-clip playback, completion-event conformance in Kids/Adults×seven, cancellation/error recovery/layout/zero saves. Independent review cleared sequencing and binding.
- [ ] Push/verify source CI, merge/publish under owner authorization, compare live app/landing bytes and record receipt. No separate approval needed for this bounded change.

No new recordings, translations, IDs, retry control, grading event, account, saved state or new language direction. A30-second per-clip watchdog avoids a stuck session if media never completes. Reading-guide task L-010 remains pending after this slice.
