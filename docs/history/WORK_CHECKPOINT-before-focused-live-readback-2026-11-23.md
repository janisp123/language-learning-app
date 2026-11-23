# Current working checkpoint

Current task: L-012

## Current state — 2026-11-23

**Kids/Adults0.5.0 implemented and browser-verified; publishing authorized and in progress.** Owner explicitly requested live-website testing, efficient checked merging and matching website descriptions, rather than a separate preview. Do not ask again for routine implementation/merge/publication within this scope.

Branch `feat/focused-courses`, isolated checkout `/workspace/work/focused-courses`, baseline main3bc78a9 (merged design PR #28). The first usage corrections PR #27 is merged0e81ad6 and publicly deployed0.4.13, hosted bytes verified. Current0.5.0 source/PR/CI/merge/Pages/hosted readback must be checked separately and recorded below after execution.

## Implemented

-100-item Kids and Adults courses:80 shared teaching intents +20 school/play or everyday transaction/travel items. Complete phrases from lesson1. Source-language audience controls; separate original510 checkbox. Exactly seven global directions; selected engine views allow only their own pair and use unique course identity.
- Canonical new-only extensions add67 meanings/complete examples/language variants, with268 matching bundled clips. Original510 translations/blocks and2,040 clips remain unchanged. No copied dictionary per audience. All course/audio manifests strictly bind IDs/text/hash; stale legacy audio revision/collisions fail closed.
- Existing scoring, reshuffle,500ms, current-prompt autoplay/answer replay and ZERO saved learner state preserved. Changing course/direction cancels old sound/timers and resets current session. Reload resets Kids/default direction/lesson1; no age/account/preferences storage.
- Website EN/RU/LV descriptions/metadata and README updated. Offline button now downloads the matching current website HTML, not an older Drive review. Reviewed distractors vary by speech/word type/direction; no fixed three-noun shortcut.

## Verification

PASS: Python41; focused engine/course counts/identity/full completion tests; real Chromium14 runs×100 prompts, matching new Japanese clip decode/replay without grading, pending-answer audience-switch cancellation,499/500ms, original510 access, reload/default/zero storage,320/390/1280 light/dark overflow. All268 new clips decoded. Independent review cleared corrected choice quality, README links and audio revision checks. Final Node rerun and source CI are recorded on the feature PR before merge. Technical PASS is not fluent-human certification or physical-phone/fullscreen-reader review.

Artifact:26,166,776 bytes; SHA2569ef61fb215c644a2858d95b509af31ba6e6206f6f8f584538a016c91c998325d. Browser receipt: [verification](review/2026-11-23-focused-browser.json). Build/site/download byte parity checked.

## Remaining and next action

Finish checked source integration/live Pages deployment and verify the actual hosted bytes plus both visible audience controls before claiming0.5.0 live. Then report the normal live URLs so the Owner can test immediately. Publication is already authorized.

Reading-guide PR #21 remains unmerged: readings for lv-ru/ru-en/en-ja are not imported in this slice and must not be claimed live. Next bounded implementation is reconciling its current source/protocol conflicts and exact greeting/new-phrase guide coverage, then testing/publishing that authorized learning aid separately. Preserve the existing held0.4.12 Drive file until replacement is appropriate. Remaining L-011 usage context findings and fluent-human/device review stay pending; do not call every phrase optimal.

Canonical active tasks: docs/TD_LIST.md. Prior checkpoint preserved [verbatim](history/WORK_CHECKPOINT-before-focused-publication-2026-11-23.md). User's explicit live-publication authorization persists across interruptions; bare continue should resume the already authorized active work without making the Owner repeat approval.
