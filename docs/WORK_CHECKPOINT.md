# Current working checkpoint

As of 2026-11-17. **PARTIAL: learning dark-mode repair0.4.10 implemented and locally verified; source push/review delivery/integration/publication pending.** Branch fix/learning-dark-mode starts at main782f69185efb925c708f4eda7c97d6842171c646. PRs #14/#15 are merged and0.4.9 Japanese audio plus landing language/theme controls are verified live. Their final publication evidence is on pending docs-only PR #16; do not overwrite newer state with earlier checkpoint text.

## New bug and fix

Landing theme lived only in its document; the separate learning page had no handoff, dark styles or toggle. The dark landing Learn link now includes a one-use theme fragment. Learning consumes/removes it in its head before styling, with null history state. Theme then exists only in DOM memory. No browser/native storage, cookies or saved learner preferences; reloading the cleaned URL starts light and lesson1.

Learning header has a localized Dark mode toggle (LV/RU/EN) with aria-pressed. Setup/practice/question/answer/speaker/feedback/completion colors support dark mode. Toggling theme does not grade, alter progress, stop playback, reset lessons or cancel500ms transitions. Restart/direction/completion preserve the current in-memory theme. All510 meanings/51blocks,2040 audio clips, seven allowed directions, original bindings and zero saved learner state remain intact. No app/content rebuild or new accounts/tracking.

46 Node /29 Python tests pass, including an actual landing→learning browser regression that failed on baseline, one-use URL cleanup/history state, source-localized toggle, keyboard, audio, pending-answer theme changes, completion/restart/direction behavior, empty storage/cookies and reload light/lesson1. Visual Chromium checks at320/1280px fit without horizontal overflow. Independent review found no actionable issue. Receipt: delivery/2026-11-17-learning-theme-browser.json. Physical-device/full-screen-reader checks remain pending.

Next: push verified source/open PR, then replace stable Drive HTML1594pGCAm3E7hOq0-oSwLFh8z4WtRI3vd and download back for exact equality. Integrate/publish checked change within explicit authorization; verify actual hosted dark landing→learning flow and source/Drive byte parity. Do not claim public0.4.10 before verification.
