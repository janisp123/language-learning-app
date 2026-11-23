# Full Correct Playback Plus Two Seconds

Owner specification: “calculate how long it needs to be then add2 second delay on top.” Use native ended event so duration is observed, then2000ms; fixed estimates/cutoffs do not meet this request. Supersedes prior500ms decision. No new UI/content/storage.

- [x] Watch a long-playback/end+1999/2000ms/reset regression fail on0.5.3.
- [x] Add completion-aware selected(shown) in web/audio-view.js; use existing playToEnd cancellation/stall/error handling.
- [x] web/app.js applies correct result only after selected completion+2000ms; no-audio fallback2000ms. Wrong correction unchanged.
- [x] Update deterministic correct navigation and full-course binding tests; test failures and both cancellation phases.
- [x] Verify actual media-ended+2sec in21 browser course/direction combinations, full suites/build/protocol and review.
- [ ] Push checked PR, merge/publish under standing authorization; download actual app/landing/offline and compare exactly; record receipt and archive L-016, restore L-010.
