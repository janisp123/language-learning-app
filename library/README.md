# Common-use starter library

`common-core.json` is a **reference-only editorial draft** of 60 practical beginner candidates: 40 short expressions and 20 everyday words, each in Latvian (`lv`), Russian (`ru`), English (`en`) and Japanese (`ja`). It is not imported into the app and changes no active course content.

Selection favors asking for help, essential needs, simple transactions and reusable wording. It is model-editorial work, **not a corpus frequency ranking, native-speaker certification or completed human language review**. The [source register](sources.json) records retrieved learner/dictionary references. Per-entry evidence links distinguish attested forms from editorial adaptations; they do not automatically verify other language forms. All entries retain pending fluent-human review status.

## Reuse

- Read `meaning` and `situation` before using `forms`; these are contextual equivalents, not interchangeable dictionary strings. Read register and any form notes, especially for Japanese greetings, refusal, emergency help and transport terms.
- `cc-p001`–`cc-p040` identify expressions; `cc-w001`–`cc-w020` identify reusable words. Retain an ID for its meaning; assign a new ID if that meaning changes. Numbering is not a frequency rank or a lesson sequence.
- All `reviewStatus` values are `human-review-pending`. Review meaning, naturalness, politeness, safety and the actual learner situation in all four languages before adoption. Duplicate surface forms can serve different meanings (for example Japanese understanding/knowledge); they must not become competing answer choices.
- No course IDs are mapped or implied. This library is separate from the 510-item course and its short-text policy. Importing any entry requires explicit owner approval, verified concept/answer mapping, distractor review and synchronized reading guides/audio where applicable. This draft grants no release approval or additional language direction.
- Word forms are labels rather than ready-made utterances. Inflection, counters, articles and request forms may change in a phrase. The library contains no learner data or persistence mechanism.

## Category index

| Topic | Expression IDs | Word IDs |
| --- | --- | --- |
| Greetings | cc-p001–002 | — |
| Courtesy | cc-p003–005 | — |
| Communication | cc-p006–009, 034–039 | — |
| Help | cc-p010–011 | — |
| Directions | cc-p012–013, 028–033 | cc-w018 |
| Food and drink | cc-p014–015, 019 | cc-w001–006 |
| Shopping | cc-p016–018, 020 | cc-w014 |
| Health | cc-p021–023 | cc-w011–012 |
| Emergency | cc-p024–025 | — |
| Boundaries and refusal | cc-p026–027, 040 | — |
| Places | — | cc-w007–010, 019–020 |
| Travel | — | cc-w013, 016–017 |
| Everyday objects | — | cc-w015 |

Neutral greeting defaults are **Labdien! / Здравствуйте! / Hello! / こんにちは**; Japanese is daytime-specific. Familiar greetings are not presented as universal stranger-facing defaults. Coverage is intentionally a starter set, not a complete survival syllabus or the full L-011 audit.

## Research already available

- Japan Foundation Irodori Starter lessons 1–2: everyday Japanese greetings, polite thanks, familiar farewells and communication repair.
- Latvia.eu practical phrase guide: Latvian greetings and stranger/familiar register.
- Gramota and Cambridge: dictionary/request-usage references; individual current-course findings link additional sense-specific pages in the [full audit](../research/common-usage/README.md).

Reuse these sources and context notes when expanding. Research new or unresolved meanings when necessary; do not assume every future expression is covered. Keep exact-form evidence separate from a general usage principle. A familiar farewell here uses じゃあ、また, while the existing course’s さようなら remains unchanged pending its own context decision.

### Example

| Meaning / situation | Latvian | Russian | English | Japanese |
| --- | --- | --- | --- | --- |
| Neutral daytime greeting | Labdien! | Здравствуйте! | Hello! | こんにちは |
| Familiar farewell, expect to meet again | Uz tikšanos! | До встречи! | See you later! | じゃあ、また |
| Polite thanks | Paldies! | Спасибо! | Thank you! | ありがとうございます |
| Ask someone to repeat | Lūdzu, atkārtojiet | Повторите, пожалуйста | Please repeat that | もう一度お願いします |

These examples are contextual reference candidates, not new app lessons. The structured file is the canonical library data; this page is its index.
