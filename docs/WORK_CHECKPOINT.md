# Current working checkpoint

As of 2026-11-17. **PARTIAL: learning dark-mode repair0.4.10 implemented and locally verified; source pushed on PR #17 and Drive review delivery verified; integration/publication pending.** Branch fix/learning-dark-mode starts at main782f69185efb925c708f4eda7c97d6842171c646. PRs #14/#15 are merged and0.4.9 Japanese audio plus landing language/theme controls are verified live. Their final publication evidence is on pending docs-only PR #16; do not overwrite newer state with earlier checkpoint text.

## New bug and fix

Landing theme lived only in its document; the separate learning page had no handoff, dark styles or toggle. The dark landing Learn link now includes a one-use theme fragment. Learning consumes/removes it in its head before styling, with null history state. Theme then exists only in DOM memory. No browser/native storage, cookies or saved learner preferences; reloading the cleaned URL starts light and lesson1.

Learning header has a localized Dark mode toggle (LV/RU/EN) with aria-pressed. Setup/practice/question/answer/speaker/feedback/completion colors support dark mode. Toggling theme does not grade, alter progress, stop playback, reset lessons or cancel500ms transitions. Restart/direction/completion preserve the current in-memory theme. All510 meanings/51blocks,2040 audio clips, seven allowed directions, original bindings and zero saved learner state remain intact. No app/content rewrite or new accounts/tracking.

46 Node /29 Python tests pass, including an actual landing→learning browser regression that failed on baseline, one-use URL cleanup/history state, source-localized toggle, keyboard, audio, pending-answer theme changes, completion/restart/direction behavior, empty storage/cookies and reload light/lesson1. Visual Chromium checks at320/1280px fit without horizontal overflow. Independent review found no actionable issue. Receipt: delivery/2026-11-17-learning-theme-browser.json. Physical-device/full-screen-reader checks remain pending.

Source23f6d37 is pushed on PR #17; CI44123339528 passed. Stable Drive file was uploaded afterward and downloaded back with exact equality: 21387711 bytes, SHA-256 58dd376dad8eb6b93490704b4003962c81d71285bb391e86dfbc48aa5dfc9e2b. Receipt: delivery/2026-11-17-learning-theme-drive-sync.json.

Next: integrate/publish checked PR #17 within explicit authorization, then verify actual hosted dark landing→learning flow and source/Drive byte parity. Public site remains0.4.9 until that verification.
