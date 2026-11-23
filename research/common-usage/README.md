# Common-usage audit — 2026-11-23

**L-011: editorial audit completed; owner decisions and fluent-human review pending. No active translation, recording, binding or application change.**

## Scope and method

Reviewed all 510 concept rows in LV/RU/EN against their actual three distractors and cross-language forms. Reused the earlier full [Japanese review](../../docs/review/2026-11-18-japanese-usage-audit.md), rebinding its findings to current forms and choices. Baseline: `066ce2be6c0e2664604d864e7a051a40a70d75cb`. All seven allowed directions were considered through the existing source/target forms and choice bindings. No reverse Japanese direction is assumed.

“Common” means natural, practical beginner language for a stated situation. It does not mean a measured top-frequency ranking. Dictionaries establish senses/register; learner materials establish useful teaching contexts. Neither certifies every editorial preference. Every unflagged cell is **keep-working**, not fluent-human approval. No wholesale rewrite is supported.

## Coverage

| Language | Reviewed | Keep-working | Replace proposal | Clarify | Ambiguous |
|---|---:|---:|---:|---:|---:|
| [lv](lv-review.json) | 510 | 495 | 0 | 13 | 2 |
| [ru](ru-review.json) | 510 | 487 | 2 | 18 | 3 |
| [en](en-review.json) | 510 | 490 | 4 | 10 | 6 |
| [ja](ja-review.json) | 510 | 489 | 3 | 16 | 2 |

The [coverage matrix](coverage.json) records all 2,040 language decisions and hashes the canonical input files. Language JSON files contain exact current wording, priority, proposals, reasons, URLs and evidence levels. Counts are language findings, not distinct faulty concepts; cross-language findings can repeat the same issue.

## Smallest proposed correction slice — requires owner approval

1. **0001 Japanese hello:** propose neutral daytime こんにちは rather than casual やあ. Russian здравствуйте is already the desired neutral/polite greeting. こんにちは also appears at 0269; legitimate shared meanings must not be “fixed” with an uncommon synonym.
2. **Actual overlapping answer sets:** inspect 0091 who/which-person (LV kas/kurš), 0134 leg/foot (LV/RU source and Japanese choices), 0148 plaster/bandage (English varieties), 0209 pot/pan, 0402 word/phrase (JA), and 0403 phrase/sentence (RU). Prefer an unrelated distractor or clear sense before changing a useful word.
3. **Short everyday wording candidates:** English 0098 what price → how much; 0210 pan → frying pan; 0398 brush → paintbrush. Russian 0158 thirsty → хочу пить requires agreement on adjective versus personal-need phrase; 0413 гулять needs leisure versus general walking context.
4. **Separate context decisions:** familiar versus polite thanks/apology/you; older/younger and own-family terms; cooked rice; hot/cold objects versus weather; bathroom/toilet; school pupil; vegetable pepper; meal times. These are not blanket mistranslations.

Optional stylistic changes, such as chicken meat → chicken or search → look for, have lower priority. Do not add synonyms or complexity just to sound polished. Medium model-editorial ambiguity candidates (look/watch and lunch/dinner varieties) need adjudication rather than being presented as proven defects.

## Evidence and limitations

- LV: MLVV/Tezaurs dictionary entries linked per finding; RU: retrieved Gramota definitions for key sense overlaps. EN: retrieved Cambridge definitions and learner framework. JA: Japan Foundation full lesson text plus explicitly labelled dictionary search excerpts from the saved audit.
- `source-supported` means evidence supports the relevant sense or register. The proposed pedagogical choice may still be editorial; it is not a claim that every word of the recommendation appears in that source.
- Source-needed/model-editorial findings remain labelled. No native reviewer, corpus ranking, audio recertification or physical-device validation is claimed.
- Existing tests verify technical behavior, not linguistic correctness. Existing public app 0.4.11 and held reading-guide PR #21 remain separate from these reference artifacts.

## Reusable expansion library

See [the common-core library](../../library/README.md). It stores a focused reusable starter set outside active course modules, with meanings, situations, register and review status. Consult its source register and resolve relevant pending checks before importing anything. No app loader reads these files.

## Recheck procedure

When canonical content changes, compare its SHA-256 hashes to coverage.json, rerun ID/current-form checks, and revisit affected senses and all actual choice sets. Add new research only for changed/new meanings or unresolved source-needed entries; do not treat this snapshot as permanent language certification.
