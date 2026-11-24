# L-011 implementation 02 — approved shared polite defaults

Owner authorization: after PR46 preparation and explanation that implementation/audio/publication were next, Owner said **“Make the change already.”** Recorded/implemented by codex,2026-11-24. Base main `e6dd9205103d03419f6a0978e4bb81e9042d8476` (merged research PR46). App revision0.5.7; original bank/audio0.6.3-test; focused bank/audiofocused-0.1.2.

## Exact implemented cells

| Finding | Concept | Language | Before | After |
| --- | --- | --- | --- | --- |
| F002 | vocab-0004 | JA | ありがとう | ありがとうございます |
| F003 | vocab-0005 | LV | piedod | piedodiet |
| F003 | vocab-0005 | RU | извини | извините |
| F004 | focus-s08 | LV | Kā tevi sauc? | Kā jūs sauc? |
| F004 | focus-s08 | RU | Как тебя зовут? | Как вас зовут? |
| F005 | focus-s09 | LV | No kurienes tu esi? | No kurienes jūs esat? |
| F005 | focus-s09 | RU | Откуда ты? | Откуда вы? |
| F006 | focus-s11 | LV | Kā tev iet? | Kā jums iet? |
| F007 | focus-s28 | LV | Vai tu vari man palīdzēt? | Vai jūs varat man palīdzēt? |
| F007 | focus-s28 | RU | Можешь мне помочь? | Вы можете мне помочь? |

The familiar forms are valid; this is the approved shared polite-address teaching default, not a universal frequency claim. Six concept IDs/ten language bindings affect142 existing course/direction presentations, including prompt/correct/distractor uses. IDs/questions/answers/course selections remain fixed. No unrelated findings are applied.

Nine explicitly scoped gTTS recordings replace the changed forms. Russian apology reuses exact existing `audio/ru/vocab-0266.mp3` bytes at `audio/ru/vocab-0005.mp3`; checksum `e26d883020a7db420919821c4ec575c2a1dfa39991b73432fe7155d4da5ad27a`. Apology and attention remain distinct meanings/IDs, with no Russian same-choice collision. Manifest text/hash metadata matches canonical wording. Tests preserve every other translation and all other MP3 bytes, including archived originals and inactive forms.

Japanese F004 `名前は何ですか` remains unchanged; selection between Japanese alternatives is deferred. Other translations of these concepts remain unchanged. Original legacy/usage lock digest values remain unchanged; precise approved reversals restore the old values solely for historical comparisons, with current-cell assertions. Russian global duplicate-form validation now pins exactly the approved0005/0266 pair, retaining per-question four-distinct-choice checks. New approved fixture covers all audio bytes plus focused-language modules, not just the changed cells.

## Verification and release status

- RED: the new real-loader regression failed on each old familiar form before application edits.
- PASS:43 Python tests, full content/audio/version/hash/identity/archive checks; all4970 actual engine presentations checked by the selector integration,142 affected,10 edited bindings seen,seven allowed directions and no exact normalized choice collisions.
- Native Chromium:21 preset×direction prompt/replay checks; ten changed clips reached actual native `ended`; widths320/390/1280, dark default/reload/no storage, no JS errors. Full64 Node suite and independent technical/documentation review passed. A further targeted selector check protects against offering both apology/attention meanings for the shared Russian source form. [Native browser receipt](../../docs/delivery/2026-11-24-polite-defaults-browser.json).
- Initial full-check failures were resolved explicitly: approved Russian duplicate allowance, refreshed generated download, and a goodbye-report test's hardcoded previous focused content version. No product scoring/audio-timing code was modified.
- Physical phone, full screen-reader audit and fluent-human pronunciation assessment NOT RUN. Native decoding does not establish fluent language quality or semantic uniqueness.

Source is pushed/tested before publication. See checkpoint and subsequent delivery receipt for actual source/merge/CI/Pages/readback status; this document alone is not evidence of deployment. Generated standalone download is rebuilt from canonical sources, not manually patched. Drive review remains unchanged unless a separate verified replacement receipt is recorded.

## Reading-guide dependency and remaining work

PR21 remains held/unmerged, with no live reading guides; no guide files are present on main to silently mismatch. Before L-010 integration, update held JA0004 segments forありがとうございます, held LV→RU0005 forизвините (existing0266 guide segments can be reused), author missing focused Russian S08/S09/S28 forms, and reconcile the previously stale Japanese hello. RU→EN apology's English target guide remains `sorry`. Only lv-ru/ru-en/en-ja annotation directions are authorized. Retain all remaining L-011 meaning/safety/fluent decisions separately; do not mark the entire audit or F004 Japanese complete.
