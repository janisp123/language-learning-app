# Answer pronunciation

Owner approved the described interaction: independent speaker beside each answer; clicks replay target-language pronunciation without selecting, scoring, shuffling or navigating. Keep current prompt autoplay and 500 ms transitions. Use sibling buttons in each answer row, never nested buttons. Reuse existing bundled LV/RU/EN clips; Japanese has no clips and must show unavailable audio honestly. No content, audio asset or saved-state changes.

- Add failing UI regressions for all four answer speakers, repeated target-language replay without grading, keyboard/button separation, stale controls, cancellation and missing audio.
- Implement row layout in web/app.js and styles.css; audio-view binds each option ID/text/target and guards against stale presentations. Share the existing single player so clips never overlap. Lock both controls during answer transitions.
- Rebuild 0.4.8; run full Node/Python suites, real Chromium playback/navigation/mobile checks, unchanged content/audio and package parity checks. Review, push, PR and Drive readback; publication remains separately authorized through checked integration.
