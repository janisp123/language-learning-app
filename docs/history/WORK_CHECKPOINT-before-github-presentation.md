# Current working checkpoint

As of 2026-11-17. **PARTIAL: speaker-only green interaction feedback0.4.11 implemented and locally verified; source pushed on PR #18 and Drive review delivery verified; integration/publication pending.** Branch fix/answer-speaker-highlight starts from current main aae5147b1e04653901bc687f8e1d99a013ad2104. The prior learning dark-mode fix PR #17 is merged and verified publicly deployed0.4.10; its final evidence is preserved in delivery/2026-11-17-learning-theme-deployment.json and learning-theme-hosted-browser.json.

## Current requested change

Owner phone screenshot showed a gold outline around the whole answer after tapping its speaker. Root cause was the shared answer-option:focus-within style. The fix removes the row outline and confines green focus/active feedback to the independent speaker button. Answer text background remains unchanged; keyboard focus remains visible on speaker and answer buttons. No audio/player/UI-event/engine changes, grading from speakers, content IDs/translations/bindings/recordings changes or saved state. Scoring, theme continuity, seven directions, 2040 clips and500 ms transition remain unchanged.

The mobile/touch browser regression failed on the original row outline, then passed with the fix. 46 Node /29 Python tests pass, including prior dark-mode handoff and full-course behavior. Independent review found no actionable issue. Real Chromium touch checks in light/dark at320/390/1280px verify speaker-only green, no answer-text change, replay with unchanged progress/feedback and no overflow. Receipt: delivery/2026-11-17-speaker-highlight-browser.json. Physical-phone/full-screen-reader checks remain pending.

Source b3cd10f is pushed on PR #18, CI44167704597 passed, and stable Drive file was uploaded after source push and downloaded back with exact byte equality: 21388029 bytes; SHA-256 e5bb8fee28d2d3f781de41f0e59f9592e27163bdf73ef7e4323039db6ab07c40. Receipt: delivery/2026-11-17-speaker-highlight-drive-sync.json.

Next: integrate/publish checked PR #18 within explicit authorization, then verify hosted speaker-only feedback. Public site remains0.4.10 until that publication. Preserve zero saves and keep source/push/merge/Drive/public statuses distinct.
