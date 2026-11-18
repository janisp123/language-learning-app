# Reading-guide modules

Owner requested aids only for lv-ru (Latvian letters), ru-en (Cyrillic) and en-ja (romaji). The source language defines what script the learner can already read. All seven learning directions remain available; the other four have no guides. Main translations, bindings, engine and recordings are unchanged. All readings are explicitly draft-human-review-pending, manually authored with AI assistance; no fluent human validation is claimed.

## Batches

`content/readings/<direction>/<block-id>.json` contains ten concept-ID entries for one existing block. There are 51 modules and 510 entries per direction. Each entry repeats the exact canonical target text and lists text/reading segments. A whole Russian/English phrase may have one segment. Japanese kana each have a separate segment; contextual kanji readings may divide per character, with grouped exceptions for irregular whole-word readings or cross-character consonant doubling. Optional notes explain special readings. `combinedReading` on a small kana gives the visible combined sound while preserving its own symbol/reading below it.

The loader rejects missing/unknown IDs, missing/extra blocks or directions, duplicate JSON keys, mismatched target text, non-reconstructing segments, grouped kana, missing small-kana notes, wrong guide script and unsupported statuses. Approximate sound accuracy still needs human review: checks cannot establish that a guide is linguistically correct.

## Review one batch

1. Choose one direction/block file. Read the exact target spelling and listen to its existing audio.
2. Review pronunciation in the source reader's script. Russian/English aids approximate sounds unavailable in that script; avoid blindly substituting letters. Stress, vowel reduction, softness and English consonants need particular care.
3. Japanese romaji vowels are sounds, not English letter names. Preserve separate kana, including long-vowel う and small kana; check combinations and particles. Never invent a fixed universal reading for kanji. Notes on grouped terms explain exceptions.
4. Change only the reading data for the affected IDs. Do not alter the target text, canonical translation, original locks or audio merely to make a guide match.
5. Run the README checks and rebuild the portable HTML from source. Inspect phones/desktop and both themes; keep answer/speaker controls independent. A data batch requires normal PR review and delivery rules.

## Presentation and accessibility

`web/reading-view.js` appends plain text nodes inside the existing answer button, keeping the separate speaker untouched. Japanese symbols/readings stack vertically, wrapping units at narrow widths. Small-kana combination, doubling and vowel-length roles are visible without hover. Additional notes are included in accessible descriptions. Button names retain the original target answer; guide descriptions carry their reading-script language tags. Full screen-reader and physical-phone checks remain pending until actually performed.

No reading settings or learner data are saved. No pronunciation API, network requests or runtime dependencies are added. Browser build embeds validated guide data; future Android work must preserve the same zero-saves rule.

Reproduce the full real-browser sweep with `python tools/verify_reading_guides_browser.py` after installing Playwright and Chromium (the script uses `/usr/bin/chromium`). It tests actual browser rendering at 320/390/1280 px, all 510 questions/seven directions with a paused virtual clock, target replay/answer identity/timing, empty storage and reload reset. Screenshots go to ignored `dist/reading-guide-screenshots/`; it writes the browser receipt in `docs/delivery/`. This is desktop touch emulation, not physical-device or full screen-reader validation.
