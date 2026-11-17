# Current working checkpoint

As of 2026-11-17. **DONE: speaker-only green feedback 0.4.11 is implemented, verified, pushed, merged, delivered through Drive and publicly deployed.** PR #18 merged at a159c6618be40e7acdd53966e3fca60264abad7e. Pages 44168243948 and main CI 44168243818 succeeded. Prior PR #17 dark-mode continuity is also merged/deployed and its verified evidence is preserved in delivery/2026-11-17-learning-theme-deployment.json.

## Current public behavior

App: https://janisp123.github.io/language-learning-app/learn/
Website: https://janisp123.github.io/language-learning-app/

Tapping an answer speaker highlights only its speaker cell green. No full-row outline or answer-text highlight from replay. Keyboard focus remains visible on speaker and answer buttons; moving to another speaker clears the previous highlight. Speaker replay never grades, changes progress, reshuffles choices or navigates. Correct/incorrect answer styling, 500 ms timing and scoring remain unchanged.

Landing EN/RU/LV and dark-mode controls work on phone layouts. Dark mode carries into learning through a one-use marker consumed/removed before rendering; the learning header has its own localized toggle. Theme stays in DOM memory across learning, restarts, direction changes and completion. Clean-URL reload starts light and lesson 1; nothing is saved.

All 510 meanings/51 blocks, permanent IDs/translations/answer bindings, seven allowed directions and 2,040 bundled pronunciation clips (including 510 Japanese) are preserved. English→Japanese retains English UI/source audio with Japanese answer replay. No reverse Japanese or LV/RU Japanese pairings. Zero saved learner state/preferences on every platform; no highest record/history/export/import/accounts/tracking. Android/Play remains unimplemented/unpublished.

## Verified deployment and delivery

Default-TLS HTTPS public app/download return 200 and match canonical source/Drive exactly: 21,388,029 bytes; SHA-256 e5bb8fee28d2d3f781de41f0e59f9592e27163bdf73ef7e4323039db6ab07c40. Stable Drive file 1594pGCAm3E7hOq0-oSwLFh8z4WtRI3vd was uploaded after verified source push, then downloaded back and compared. Review receipt: delivery/2026-11-17-speaker-highlight-drive-sync.json. Deployment: delivery/2026-11-17-speaker-highlight-deployment.json.

46 Node / 29 Python tests pass locally, CI passes; independent code/touch-browser review found no actionable issue. Hosted Chromium with touch emulation checked 320/390/1280px in light/dark: only speaker green, row outline none, answer background unchanged, actual playback with unchanged progress/feedback, no page errors/overflow. Keyboard focus/previous highlight clearing are covered by regression. Hosted receipt: delivery/2026-11-17-speaker-highlight-hosted-browser.json. Headless browser certificate trust bypass is documented; independent HTTPS exact-byte readback uses default TLS verification. Physical-phone/full-screen-reader and fluent human language/pronunciation review remain pending.

Next: collect human/device/accessibility review. No unrelated work is automatically authorized. Earlier documentation-only PRs #11/#13/#16 are historical evidence and must not overwrite newer checkpoint state. Source changes continue through isolated checked PRs and verified main-only Pages publication.
