# Japanese vocabulary suitability audit and resume handoff — 2026-11-18

**Status: review findings saved; no vocabulary correction or publication performed.** Written by Codex at the owner's request to finish the check and preserve the next step.

## What was checked

The 510 existing English→Japanese items, their canonical meanings, Japanese forms, current romaji guides and actual distractors were divided into three 170-item review batches. Model reviewers reported reading every row. Findings below were consolidated against the actual modules and selected external references. This is an editorial/model audit, not fluent-human certification or a measured corpus-frequency study. No claim that all 510 are now verified correct should be made.

Baseline reviewed: PR #21 head `03c8474a03fa5a836f2db35c38d4980369718b64`. PR #21 is OPEN and UNMERGED. The Japanese translations are unchanged from public main; the new reading guides are in the PR. Public website remains 0.4.11; Drive review build is 0.4.12. Do not merge/publish merely because technical CI passed.

## Priority findings

| ID / English | Current Japanese | Assessment / proposed next action |
|---|---|---|
| vocab-0001 hello | やあ | Valid casual “hi,” but not the best neutral daytime beginner default. Recommend こんにちは; update its reading guide and recording together after authorization. |
| vocab-0002 goodbye | さようなら | Correct, but not a universal everyday farewell. Japan Foundation explains じゃあ、また is common with people one meets regularly; formal departures use other expressions. Add context or select an appropriate departure scenario rather than claim さようなら is wrong. |
| vocab-0004 thank you | ありがとう | Correct familiar form. ありがとうございます is a safer polite default when thanking strangers. This is a register decision, not a mistranslation. |
| vocab-0134 leg / vocab-0135 foot | 脚 / 足 | Actual “leg” question offers 足 as a wrong answer. 足 can also mean leg; both are read ashi. This risks marking a defensible answer wrong. Prefer removing overlapping distractors or providing precise context, rather than inventing a different word. |
| vocab-0402 word / vocab-0403 phrase | 単語 / 語句 | Actual “word” question offers 語句 as wrong. Dictionaries give 語句 as “words and phrases/words.” Prefer an unrelated distractor or a clearly separated phrase sense. |
| vocab-0019 sister / vocab-0020 brother | 姉か妹 / 兄か弟 | Literal “older or younger sister/brother” preserves an underspecified English meaning, but is an explanatory gloss, not one normal reusable family word. Japanese needs older/younger and often own/other-family context. Decide that context before any rewrite; do not silently repurpose concept IDs. |
| vocab-0241 rice | 米 | Correct for uncooked rice. Cooked rice is ご飯. The English prompt needs a sense decision or teaching context; neither should be called universally wrong. |
| vocab-0467 hot / vocab-0468 cold | 熱い / 冷たい | Appropriate for hot/cold objects or liquids; weather usually uses 暑い / 寒い. Clarify the intended sense before changing the translation. |

## Other context-sensitive items worth retaining for later editorial review

- vocab-0492 あなた (“you”): valid dictionary equivalent, but Japanese often omits it or uses the person's name; not a universal polite way of addressing strangers.
- Own-family 母/父/祖母/祖父 are normal when describing one's family; addressing a parent/grandparent or referring to another person's family may use different forms. Do not blanket-replace all family words.
- vocab-0238 ピーマン is a green/bell pepper, not pepper seasoning; vegetable-block context supports it, but the bare English “pepper” is underspecified.
- vocab-0169 マフラー means a warm neck scarf; not every decorative scarf.
- vocab-0190 浴室 means a bathing room; English “bathroom” can also mean toilet/restroom.
- vocab-0425 耳を傾ける (“listen”) and vocab-0432 目を向ける (“look at”) are valid but more elaborate than common beginner 聞く / 見る. Those simpler verbs overlap with neighbouring hear/see/watch items, so review sense/distractor design together.
- vocab-0437 与える (“give”) is valid but often less natural in everyday interpersonal beginner examples than あげる. Japanese giving/receiving depends on participants; do not substitute blindly.
- Do not label ordinary alternatives incorrect merely because another course uses different words. 列車 is a valid general “train”; 電車 specifically denotes an electric train. Zero 零 and ゼロ are both valid in appropriate contexts.

Many basic entries—水, 本, 猫, 犬, 学校, トイレ, 食べる, 飲む and the basic number words—are normal useful beginner vocabulary. The review did not justify a wholesale rewrite. Individual kana labels such as ジ/ji + ュ/yu are intentionally separate under the owner's design; the visible combined-sound note must remain, so they are not mistaken for independent spoken syllables.

## Important dependency for the hello correction

こんにちは already appears at vocab-0269 “good afternoon.” It can naturally translate both prompts. Do not invent an uncommon Japanese synonym merely to make every global text different. Recheck actual distractor sets and maintain only-one-defensible-answer questions after any authorized change; do not silently delete either concept or change original LV/RU/EN meanings.

## References actually consulted

- Japan Foundation, Irodori Starter lesson 1: https://www.irodori.jpf.go.jp/assets/data/starter/pdf/X_L01.pdf — full retrieved text supports こんにちは, polite thanks, and context-sensitive farewells. It explicitly explains that さようなら is not the common goodbye in many everyday encounters.
- Kanshudo 足 grammar note (search excerpt): https://www.kanshudo.com/grammar/%E8%B6%B3 — 足 refers to both foot and leg.
- Cambridge Japanese–English 語句 (search excerpt): https://dictionary.cambridge.org/zht/%E8%A9%9E%E5%85%B8/japanese-english/%E8%AA%9E%E5%8F%A5 — words and phrases.
- JapanDict 語句 (search excerpt): https://www.japandict.com/%E8%AA%9E%E5%8F%A5 — words and phrases; words.

## Already completed before this audit

- Public GitHub profile and project presentation are live; presentation PRs #20 and questionnaire #79 merged.
- Reading-guide feature L-010 implemented only for lv-ru / ru-en / en-ja; all 510 items per selected direction in 153 ten-item modules. Other four directions unchanged; all seven remain selectable.
- Review build 0.4.12: 52 Node and 32 Python checks passed, plus real Chromium all510/all7, four-option guide/audio binding, 499/500ms timing, 320/390/1280px light/dark, keyboard and zero-storage/reload checks.
- Source commits `162e2acfb0a7ca98751f8f5ef8a1d35a6f0c7382` and `03c8474a03fa5a836f2db35c38d4980369718b64` pushed in PR #21. Source CI44182744942 and final pre-audit CI44183010492 passed.
- Stable Drive review HTML updated after source push and downloaded byte-identical: 21,558,493 bytes; SHA-256 `d3f3b5cab491f997647844fe69f34b9a72fb625087f67e75b74da7fefcc0f5c6`. Receipt: ../delivery/2026-11-17-reading-guides-drive-sync.json.
- No pronunciation/content corrections from this audit are implemented. Existing translations, recordings and app bytes are unchanged by this documentation handoff. The audit changes only documentation; any new CI for this documentation commit must be checked separately, not assumed green.

## Exact next step on resume

1. Read AGENTS, current checkpoint, this report, latest main and PR #21 head; preserve concurrent work and historical evidence PRs.
2. Review/authorize a small correction set: neutral hello, polite/default greeting context, the two overlapping answer sets, and family/rice/temperature sense decisions. Treat optional simplifications separately.
3. Only after authorization, edit the exact affected IDs without changing their intended meanings. Keep Japanese spelling, per-symbol readings and pronunciation recordings synchronized; update bindings/locks deliberately only when the authorized correction requires it.
4. Run linguistic review plus existing content/engine/UI/audio tests, check every changed distractor set, and verify mobile/touch/audio. Do not describe technical tests as language validation.
5. Push verified source before replacing the stable Drive file; download it back and verify equality. Update receipts/checkpoint/PR description to reflect that new build.
6. Request/obtain explicit merge/publication approval after the corrections are reviewable. Then verify hosted bytes and actual live reading guides. Preserve seven directions, original other-language content and ZERO saved learner state.
