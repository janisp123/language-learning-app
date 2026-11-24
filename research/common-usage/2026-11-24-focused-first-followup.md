# Practical everyday-usage audit — focused courses first
Date: 24 November 2026 · Research only · Status: PARTIAL, owner decisions pending

**Repository baseline:** remote main commit 0196485781ac83ac4cde0117039f49bd25ede545.
**Existing task:** L-011 vocabulary audit. **Existing current development handoff:** L-010 reading-guide integration. This document does not redirect L-010 or mark any recommended change as implemented.
**Scope boundary:** No application content, source-language modules, recordings, reading guides, code, generated downloads, or deployment were edited. No existing research or task list was replaced. Compare against the earlier [common-usage review](README.md), [coverage matrix](coverage.json), [research library](../../library/README.md), and the held reading-guide PR #21 before implementing anything.

## Method and coverage

Checked the current main task list and agent protocol, project decisions and checkpoint; inspected the focused-course definitions, all 67 focused extension concept records and their LV/RU/EN/JA forms, and the course/question binding structure. Both Basic Kids and Basic Adults have 100 prompts each: 80 shared and 20 specific to each, hence **120 unique focused question IDs**. The seven allowed directions are **lv-ru, lv-en, ru-lv, ru-en, en-lv, en-ru, en-ja**; Japanese is target-only. Across direction-specific slots the focused courses reference **125 unique concept IDs**: 58 existing Full concepts and 67 focused extensions. Each individual direction presents 120 distinct focused concept IDs. The Full course has 510 separate questions and concepts; there are **577 total distinct canonical meaning IDs** across Full and focused extensions, not 710 independent vocabulary definitions.

Reopened exact question and answer-choice contexts for **25 selected focused question IDs** in three representative directions (lv-ru, ru-lv, en-ja) and **25 selected Full question IDs** using all four language-form catalogs. Those 50 questions were selected for likely meaning/register ambiguity and overlap; this is not a random sample. Compared the **79** existing historical flagged form findings (LV 15, RU 23, EN 20, JA 21) against current forms: only JA hello (vocab-0001) changed, appropriately to こんにちは. The earlier [2,040-cell review](README.md) covered all Full concepts and language forms but was model/editorial, **not native-speaker certified**. It cannot be counted as a fresh review of all 3,570 directed Full question instances.

**Remaining for fresh detailed context/choice checks:** 95 of 120 unique focused question IDs and 485 of 510 Full question IDs; cross-direction variants of inspected questions may also need checks. The focused extension text inventory is broader than the exact-context sample. These are not counts of confirmed mistakes. Human fluent review and any corpus-derived frequency conclusions remain outstanding.

Answer sets below reflect the **current authored choices, correct first**, with their stable correct/distractor IDs. The actual app shuffles the position. A dictionary or teaching source may establish a sense or attested teaching situation; it does **not** prove a corpus frequency ranking or independently certify the proposed editorial choice.

## A. Basic Kids and Basic Adults — highest priority findings

### F01 · Generic goodbye versus see you later — CLARIFY CONTEXT / RECOMMEND REPLACEMENT · P1 · High confidence in semantic distinction
- **Courses / direction:** Both Basic; lv-ru, ru-lv, en-ja plus other shared directions.
- **Question / concept:** focused-s02 / focus-s02, in shared lesson 1.
- **Exact current:** LV “Uz tikšanos” → RU “До встречи”; EN “See you later” → JA “じゃあ、また”. The canonical meaning label is “Goodbye”.
- **Current choices lv-ru:** До встречи [focus-s02]; спасибо [vocab-0004]; извини [vocab-0005]; да [vocab-0006]. **en-ja:** じゃあ、また [focus-s02]; ありがとう [vocab-0004]; ごめんなさい [vocab-0005]; はい [vocab-0006].
- **Recommendation:** If this is a generic beginner “Goodbye”, consider reusing existing Full vocab-0002 LV “uz redzēšanos” / RU “до свидания” / EN “goodbye”, while reviewing Japanese farewell context. Alternatively retain focused forms and explicitly relabel the concept “See you later / expecting to meet again”. **До встречи is real, common in the right context**, not an error or “never used”.
- **Evidence:** [Cambridge greetings and farewells](https://dictionary.cambridge.org/uk/grammar/british-grammar/greetings-and-farewells-hello-goodbye) distinguishes contexts; [Japan Foundation Irodori beginner words](https://www.irodori.jpf.go.jp/assets/data/wordlist_X.pdf) gives casual familiar departure forms; [Latvian MLVV farewell entry](https://mlvv.tezaurs.lv/mwe%3A39984) supports “uz redzēšanos”. **Editorial part:** which meaning the shared course should prioritize.
- **Impacted if approved:** Shared prompt/concept, all 7 directions, choice identity, source and target audio, any L-010 reading guide; preserve separate Full vocab-0002 unless its own change is authorized.

### F02 · Schoolbag versus backpack — CLARIFY CONTEXT · P1 · High semantic confidence
- **Course / direction:** Basic Kids; lv-ru, ru-lv, en-ja and other directions.
- **Question / concept:** focused-k20 / focus-k20.
- **Exact current:** LV “Es nevaru atrast savu somu” → RU “Я не могу найти свой рюкзак”; EN “I can’t find my schoolbag” → JA “かばんが見つかりません”.
- **Current choices lv-ru:** Я не могу найти свой рюкзак [focus-k20]; мне нужна помощь [vocab-0501]; У меня есть телефон [focus-s23]; У меня нет телефона [focus-s24]. **en-ja:** かばんが見つかりません [focus-k20]; 助けが必要です [vocab-0501]; 電話を持っています [focus-s23]; 電話を持っていません [focus-s24].
- **Recommendation:** Decide whether the learner lost a *schoolbag generally* or a *backpack specifically*. Align LV, RU, EN and JA to the chosen object. One practical expression is better than adding two competing near-synonyms.
- **Evidence:** [Cambridge schoolbag](https://dictionary.cambridge.org/dictionary/english/schoolbag) and [backpack](https://dictionary.cambridge.org/dictionary/english/backpack) establish category/shape difference; preference for one school scenario is editorial.
- **Impacted:** Kids-only prompt, shared vocabulary references if changed, all language forms, recordings, Japanese guides.

### F03 · Payment card narrowed to credit card — CLARIFY CONTEXT / HUMAN REVIEW · P1 · High semantic confidence
- **Course / direction:** Basic Adults; en-ja primarily, seven-direction shared concept.
- **Question / concept:** focused-a03 / focus-a03.
- **Exact current:** EN “Payment card” → JA “クレジットカード”; LV “Maksājumu karte” → RU “Банковская карта”.
- **Current choices en-ja:** クレジットカード [focus-a03]; 授業 [vocab-0069]; 休み時間 [vocab-0070]; 店 [vocab-0043]. **lv-ru:** Банковская карта [focus-a03]; урок [vocab-0069]; перемена [vocab-0070]; магазин [vocab-0043].
- **Recommendation:** Decide generic *card payment* versus specifically *credit card*. Japanese クレジットカード clearly refers to the latter. In a cashier exchange a generic card expression may be more useful; choose a situation and confirm with a fluent reviewer.
- **Evidence:** [Cambridge payment card](https://dictionary.cambridge.org/dictionary/english/payment-card), [credit card](https://dictionary.cambridge.org/dictionary/english/credit-card); [Japan Foundation Irodori shopping lesson](https://www.irodori.jpf.go.jp/assets/data/starter/pdf/X_L16.pdf) gives practical shopping context. Exact replacement choice is editorial.
- **Impacted:** Adult-only focus concept, 7 directions, JA and other audio/guides if concept scope is changed.

### F04 · “Stop!” has more than one possible action — CLARIFY CONTEXT · P1 · High sense confidence
- **Courses / direction:** Basic Kids and Adults; lv-ru, en-ja, all shared directions.
- **Question / concept:** focused-s72 / focus-s72.
- **Exact current:** LV “Pārtrauciet” → RU “Прекратите”; EN “Stop!” → JA “やめてください”.
- **Current choices lv-ru:** Прекратите [focus-s72]; Подождите, пожалуйста [focus-s50]; Помогите [focus-s71]; пожалуйста вызовите скорую помощь [vocab-0505]. **en-ja:** やめてください; 少し待ってください; 助けて; 救急車を呼んでください (same IDs).
- **Recommendation:** If the intended child-safety scenario is *stop doing that*, retain the core RU/JA senses and label English/context accordingly. If stopping movement is intended, a different Russian expression is needed. Do not automatically make all “Stop” prompts formal.
- **Evidence:** [Cambridge stop](https://dictionary.cambridge.org/dictionary/english/stop) documents stopping activity and movement; exact safety-context selection is editorial.
- **Impacted:** Shared prompt, directions, audio, reading guides, potential safety training clarity.

### F05 · “I am hurt” spans pain, injury and self-injury — CLARIFY / HUMAN REVIEW · P1 · High mismatch confidence; replacement pending
- **Courses / direction:** Basic Kids and Adults; ru-lv and en-ja, all shared directions.
- **Question / concept:** focused-s75 / focus-s75.
- **Exact current:** RU “У меня травма” → LV “Es savainojos”; EN “I am hurt” → JA “けがをしました”.
- **Current choices ru-lv:** Es savainojos [focus-s75]; Man iet labi [focus-s12]; Es mazliet runāju latviski [focus-s18-lv]; Es gribu ūdeni [focus-s21]. **en-ja:** けがをしました; 元気です; 日本語を少し話せます; 水が欲しいです (same IDs).
- **Recommendation:** Choose *I am injured*, *I hurt myself*, or *I am in pain*. Those are not identical statements. For a Russian spoken alternative, avoid silently imposing the speaker-gendered “поранился/поранилась”; decide an accessible scenario and verify.
- **Evidence:** [Cambridge hurt](https://dictionary.cambridge.org/dictionary/english/hurt) for breadth of meanings. The comparison among the current four forms is an editorial semantic observation, **not fluent-human validation**.
- **Impacted:** Shared safety concept across seven directions, recordings, any guides, potential meaning/ID compatibility.

### F06 · Lost versus “can't find the road” — CLARIFY / HUMAN REVIEW · P1 · High semantic confidence
- **Courses / direction:** Basic Kids and Adults; lv-ru, en-ja, all shared directions.
- **Question / concept:** focused-s74 / focus-s74.
- **Exact current:** LV “Es nevaru atrast ceļu” → RU “Я не могу найти дорогу”; EN “I am lost” → JA “道に迷いました”.
- **Current choices lv-ru:** Я не могу найти дорогу [focus-s74]; Я из Латвии [focus-s10]; У меня всё хорошо [focus-s12]; Я немного говорю по-русски [focus-s18-ru]. **en-ja:** 道に迷いました; ラトビアから来ました; 元気です; 日本語を少し話せます (same IDs).
- **Recommendation:** For lost-person help, consider a natural RU “Я заблудился/заблудилась” while accounting for speaker gender; alternatively a gender-neutral simpler sentence may change the literal claim. Choose with fluent review. Avoid teaching a phrase about physically finding a road as the *only* equivalent for being lost.
- **Evidence:** [Japan Foundation Irodori elementary lesson on directions](https://www.irodori.jpf.go.jp/assets/data/elementary01/pdf/Y_L07_au.pdf); proposal is editorial. Do not claim frequency rankings.
- **Impacted:** Shared safety prompt/ID, seven directions, recorded speech and pronunciation guides.

### F07 · Peer-address versus stranger-address — CLARIFY CONTEXT · P2 · High register confidence
- **Courses / direction:** Basic Kids and Adults; lv-ru and ru-lv, shared concepts.
- **Questions / concepts:** focused-s08 / focus-s08 and focused-s28 / focus-s28.
- **Exact current:** LV “Kā tevi sauc?” → RU “Как тебя зовут?”; LV “Vai tu vari man palīdzēt?” → RU “Можешь мне помочь?”.
- **Current choices s08 lv-ru:** Как тебя зовут? [focus-s08]; Который час? [focus-s65]; Во сколько встретимся? [focus-s66]; Можно поиграть? [focus-k11]. **s28 lv-ru:** Можешь мне помочь? [focus-s28]; Можно поиграть? [focus-k11]; Можно с вами? [focus-k15]; Можно взять ручку на время? [focus-k18].
- **Recommendation:** **Keep** “ты/тебя” for asking other children or acquaintances. If prompt specifically teaches speaking to an unfamiliar adult, use a context-specific variant; do not blanket-formalize all everyday course language.
- **Evidence:** [Gramota on ты/вы address](https://gramota.ru/journal/stati/pravila-i-normy/vy-s-propisnoy-bukvy-pravilo-ustarelo); scenario preference is editorial.
- **Impacted:** Shared course meaning contexts, any separately approved source/target audio and reading guides.

### F08 · “Can I try it?” needs an object/situation — CLARIFY CONTEXT · P2 · High context confidence
- **Course / direction:** Basic Adults; lv-ru, en-ja, other approved pairs.
- **Question / concept:** focused-a12 / focus-a12.
- **Exact current:** LV “Vai es varu to izmēģināt?” → RU “Можно попробовать?”; EN “Can I try it?” → JA “試してもいいですか”.
- **Current choices lv-ru:** Можно попробовать? [focus-a12]; Вы говорите по-латышски? [focus-s19-lv]; Можно здесь сесть? [focus-s27]; Можешь мне помочь? [focus-s28]. **en-ja:** 試してもいいですか; 英語を話せますか; ここに座ってもいいですか; 手伝ってもらえますか (same IDs).
- **Recommendation:** Keep when trying food, a product or a feature; **trying clothes on** usually needs a distinct expression. Clarify the object instead of introducing an unneeded general synonym.
- **Evidence:** [Cambridge try on](https://dictionary.cambridge.org/dictionary/english/try-on). Which purchase situation is worth teaching is editorial.
- **Impacted:** Adults-only prompt and possibly revised audio/guides if wording changes.

### F09 · Unspecified “this” in transport — CLARIFY CONTEXT · P2 · Medium confidence
- **Course / direction:** Basic Adults; lv-ru, en-ja and other pairs.
- **Question / concept:** focused-a17 / focus-a17.
- **Exact current:** LV “Vai tas brauc uz centru?” → RU “Это едет до центра?”; EN “Does this go to the centre?” → JA “これは中心部に行きますか”.
- **Current choices lv-ru:** Это едет до центра? [focus-a17]; Во сколько встретимся? [focus-s66]; Можно поиграть? [focus-k11]; Можно с вами? [focus-k15]. **en-ja:** これは中心部に行きますか; 何時に会いましょうか; 遊んでもいいですか; 一緒に遊んでもいいですか.
- **Recommendation:** If displayed alone, specify a bus, or include a clear bus/transport situation cue; when actually pointing at a vehicle “this” may be perfectly natural. An LV/RU phrase mentioning “autobuss/автобус” reuses a word from focused-a15.
- **Evidence:** Current source and [Irodori directions/transport materials](https://www.irodori.jpf.go.jp/assets/data/elementary01/pdf/Y_L07_au.pdf); this is **editorial context advice** rather than a frequency claim.
- **Impacted:** Adults-only prompt and all translation/audio/reading-guide variants if text changes.

### F10 · Practical thirsty request — KEEP · P3 · High communicative confidence
- **Courses / direction:** Basic Kids and Adults; lv-ru, en-ja, both plus other directions.
- **Question / concept:** focused-s38 / focus-s38.
- **Exact current:** LV “Es gribu dzert” → RU “Я хочу пить”; EN “I am thirsty” → JA “喉が渇きました”.
- **Current choices lv-ru:** Я хочу пить [focus-s38]; Я из Латвии [focus-s10]; У меня всё хорошо [focus-s12]; Я немного говорю по-русски [focus-s18-ru]. **en-ja:** 喉が渇きました; ラトビアから来ました; 元気です; 日本語を少し話せます.
- **Recommendation:** Keep: direct everyday need and aligned communicative meaning outweigh matching grammatical structures. Reuse this idea when considering the stilted Full “thirsty” item.
- **Evidence:** [Cambridge thirsty](https://dictionary.cambridge.org/dictionary/english/thirsty) describes desire for a drink. Editorial decision is to favor a direct usable request.
- **Impacted:** None now; reference for V02.

### F11 · General hello already corrected — KEEP · P3 · High contextual confidence
- **Courses / direction:** Basic Kids and Adults and Full; en-ja, lv-ru.
- **Question / concept:** focused-s01, reuses vocab-0001.
- **Exact current:** EN “hello” → JA “こんにちは”; LV “sveiki” → RU “здравствуйте”.
- **Current choices en-ja:** こんにちは [vocab-0001]; じゃあ、また [focus-s02]; ありがとう [vocab-0004]; ごめんなさい [vocab-0005]. **lv-ru:** здравствуйте; До встречи; спасибо; извини (same IDs).
- **Recommendation:** Keep. The specified Japanese greeting improvement is already live; no duplicate change.
- **Evidence:** [Japan Foundation Irodori Starter Lesson 1](https://www.irodori.jpf.go.jp/assets/data/starter/pdf/X_L01.pdf); [Gramota greeting reference](https://gramota.ru/poisk?mode=slovari&query=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%21&simple=0).
- **Impacted:** None.

## B. Full (510) — remaining current-source findings

### V01 · Asking the price: “what price” — RECOMMEND REPLACEMENT · P1 · High EN-confidence
- **Course / directions:** Full; lv-en, en-ru and other allowed pairings.
- **Question / concept:** basic-10-prompt-08 / vocab-0098.
- **Exact current:** EN “what price”; LV “kāda cena”; RU “какая цена”; JA “いくら”.
- **Current choices lv-en:** what price [vocab-0098]; which way [vocab-0099]; who [vocab-0091]; where [vocab-0093]. **en-ru:** какая цена; в какую сторону; кто; где (same IDs).
- **Recommendation:** Everyday price inquiry: EN “How much?” or “How much is this?”, RU “Сколько это стоит?”, LV “Cik tas maksā?”. Keep JA “いくら” if the price sense is explicit. Need owner decision whether Full can teach a short sentence rather than a standalone fragment.
- **Evidence:** [Cambridge cost and price](https://dictionary.cambridge.org/dictionary/english/cost) and [Cambridge everyday money wording](https://dictionary.cambridge.org/uk/thesaurus/articles/to-have-a-certain-monetary-value). Direct English usage support; exact cross-language rewrites are editorial.
- **Impacted:** Original content locks, seven directions, recordings, held reading-guide PR and any linked forms.

### V02 · “Thirsty” rendered as stilted RU participle — RECOMMEND REPLACEMENT / HUMAN REVIEW · P1 · High practical-confidence
- **Course / directions:** Full; en-ru, ru-en and others.
- **Question / concept:** basic-16-prompt-08 / vocab-0158.
- **Exact current:** EN “thirsty” → RU “испытывающий жажду”; LV “izslāpis”; JA “喉が渇いた”.
- **Current choices en-ru:** испытывающий жажду [vocab-0158]; скучающий [vocab-0159]; радостный [vocab-0151]; сердитый [vocab-0153]. **ru-en:** thirsty; bored; happy; angry (same IDs).
- **Recommendation:** For actual beginner communication, prefer the already used focused “Я хочу пить” (or equivalent concise phrase) over the descriptive current Russian. But an adjective-to-first-person sentence changes concept shape; owner must decide whether to retain legacy adjective as a separate formal sense or align the concept and all language variants.
- **Evidence:** [Cambridge thirsty](https://dictionary.cambridge.org/dictionary/english/thirsty) supports the sense; **the source does not independently certify Russian frequency**. Practical recommendation is editorial and supported by existing F10.
- **Impacted:** Locked original concept and all directions/audio/guides; link with focused-s38 to avoid teaching competing synonyms.

### V03 · General walking versus strolling — CLARIFY CONTEXT · P2 · High sense-confidence
- **Course / directions:** Full; en-ru, lv-ru, ru-en.
- **Question / concept:** basic-42-prompt-03 / vocab-0413.
- **Exact current:** EN “to walk” → RU “гулять”; LV “staigāt”; JA “歩く”.
- **Current choices lv-ru:** гулять [vocab-0413]; бегать [vocab-0414]; стоять [vocab-0416]; просыпаться [vocab-0418]. **ru-en:** to walk; to run; to stand; to wake up.
- **Recommendation:** For general movement on foot, consider “ходить пешком”; for leisure walking, keep “гулять” but render English as “go for a walk” and contextualize Latvian accordingly.
- **Evidence:** [Gramota ходить](https://gramota.ru/meta/khodit) covers walking/moving on foot; narrower leisure interpretation of “гулять” should be checked with a fluent reviewer. This is not a proven multiple-choice defect.
- **Impacted:** Original meaning/ID and audio/reading guides across directions.

### V04 · Everyday “look at” versus “watch” — CLARIFY / POTENTIAL AMBIGUOUS CHOICES · P1 · Medium confidence
- **Course / directions:** Full; en-ja and en-ru.
- **Question / concept:** basic-44-prompt-02 / vocab-0432.
- **Exact current:** EN “to look at” → JA “目を向ける”; RU “смотреть на”; LV “skatīties uz”.
- **Current choices en-ja:** 目を向ける [vocab-0432]; 観る [vocab-0433]; 探す [vocab-0435]; 与える [vocab-0437]. **en-ru:** смотреть на; наблюдать; искать; давать.
- **Recommendation:** More natural JA “見る” may work in a concrete instruction, but is potentially confused with “観る” (watch) currently present as an answer. **Clarify exact seeing action / replace the distractor as necessary before replacing any text**.
- **Evidence:** [Japan Foundation Irodori elementary material](https://www.irodori.jpf.go.jp/assets/data/elementary01/pdf/Y_L12.pdf); editorial choice and native review remain pending.
- **Impacted:** Both 0432/0433, target audio, locked Full choices, pending Japanese reading guides.

### V05 · Listen: “耳を傾ける” is attentively listen — RECOMMEND REPLACEMENT / HUMAN REVIEW · P2 · Medium confidence
- **Course / direction:** Full; en-ja.
- **Question / concept:** basic-43-prompt-05 / vocab-0425.
- **Exact current:** EN “to listen” → JA “耳を傾ける”; LV “klausīties”; RU “слушать”.
- **Current choices en-ja:** 耳を傾ける [vocab-0425]; 聞こえる [vocab-0426]; 書く [vocab-0428]; 理解する [vocab-0430].
- **Recommendation:** Consider everyday “聞く” with a context of listening to someone/audio; retain separate hear “聞こえる” and check the actual sentence/reading with human review.
- **Evidence:** [Irodori listening context](https://www.irodori.jpf.go.jp/assets/data/elementary01/pdf/Y_L12.pdf); context and specific replacement require verification.
- **Impacted:** Full legacy translations/ID locks, JA recording, L-010 guide, 0426 hear distinction.

### V06 · Paintbrush, not every brush — RECOMMEND REPLACEMENT · P2 · High semantic confidence
- **Course / directions:** Full; lv-en, ru-en.
- **Question / concept:** basic-40-prompt-08 / vocab-0398.
- **Exact current:** LV “ota” / RU “кисть” → EN “brush”; JA “筆”.
- **Current choices lv-en:** brush [vocab-0398]; drawing [vocab-0399]; schoolbag [vocab-0391]; eraser [vocab-0393].
- **Recommendation:** EN “paintbrush” (or add clear art context to prompt) rather than an ambiguous “brush”.
- **Evidence:** [Cambridge paintbrush](https://dictionary.cambridge.org/dictionary/english/paintbrush); [brush](https://dictionary.cambridge.org/dictionary/english/brush).
- **Impacted:** Full ID 0398/audio and guide, legacy text lock.

### V07 · Frying pan, not generic pan — RECOMMEND REPLACEMENT · P2 · High semantic confidence
- **Course / directions:** Full; lv-en and en-ja.
- **Question / concept:** basic-21-prompt-10 / vocab-0210.
- **Exact current:** LV “panna” / RU “сковорода” → EN “pan”; JA “フライパン”.
- **Current choices lv-en:** pan [vocab-0210]; plate [vocab-0201]; glass [vocab-0203]; spoon [vocab-0205]. **en-ja:** フライパン; 皿; ガラスのコップ; スプーン.
- **Recommendation:** EN “frying pan” if the specific frying vessel is the intended item. No current competing correct option established.
- **Evidence:** [Cambridge frying pan](https://dictionary.cambridge.org/dictionary/english/frying-pan).
- **Impacted:** Full 0210, English recording and any reading guides, original lock.

### V08 · Vegetable pepper versus spice — CLARIFY / RECOMMEND REPLACEMENT · P2 · High sense confidence
- **Course / directions:** Full; ru-en, en-ja.
- **Question / concept:** basic-24-prompt-08 / vocab-0238.
- **Exact current:** RU “сладкий перец”; LV “paprika”; EN “pepper”; JA “ピーマン”.
- **Current choices ru-en:** pepper [vocab-0238]; peas [vocab-0239]; potato [vocab-0231]; tomato [vocab-0233]. **en-ja:** ピーマン; えんどう豆; じゃがいも; トマト.
- **Recommendation:** Specify EN “bell pepper” / “sweet pepper” to avoid black pepper seasoning sense. Decide dialect/context instead of teaching a new synonym.
- **Evidence:** [Cambridge bell pepper](https://dictionary.cambridge.org/dictionary/english/bell-pepper); [pepper](https://dictionary.cambridge.org/dictionary/english/pepper).
- **Impacted:** Full 0238 across source/target variants, audio/guides and text lock.

### V09 · Cake versus small pastry — CLARIFY CONTEXT · P2 · High semantic confidence
- **Course / directions:** Full; en-ru, lv-ru.
- **Question / concept:** basic-26-prompt-09 / vocab-0259.
- **Exact current:** EN “cake” / LV “kūka” → RU “пирожное”; JA “ケーキ”.
- **Current choices en-ru:** пирожное [vocab-0259]; мороженое [vocab-0260]; ужин [vocab-0252]; бутерброд [vocab-0254].
- **Recommendation:** Whole cake may be better aligned with RU “торт”; if intending a small individual pastry, clarify EN/LV. No ambiguous four-option grading proven.
- **Evidence:** [Gramota торт](https://gramota.ru/poisk?query=%D1%82%D0%BE%D1%80%D1%82) and [Ozhegov пирожное](https://ozhegov.info/slovar/?ex=Y&q=%D0%9F%D0%98%D0%A0%D0%9E%D0%96%D0%9D%D0%9E%D0%95).
- **Impacted:** Full meaning ID 0259, locked translations, recorded audio, guides.

### V10 · Rice: ingredient or cooked rice — CLARIFY / HUMAN REVIEW · P2 · High semantic confidence
- **Course / direction:** Full; en-ja and lv-ru.
- **Question / concept:** basic-25-prompt-01 / vocab-0241.
- **Exact current:** EN “rice” → JA “米”; LV “rīsi” → RU “рис”.
- **Current choices en-ja:** 米 [vocab-0241]; パスタ [vocab-0242]; 鶏肉 [vocab-0244]; 卵 [vocab-0246].
- **Recommendation:** Keep “米” for raw rice/grain; when teaching prepared rice as food, consider “ご飯” with an explicitly cooked/meal context. Require a sense decision across languages.
- **Evidence:** [Japan Foundation Irodori food situations](https://www.irodori.jpf.go.jp/assets/data/starter/pdf/X_L05.pdf); [Cambridge rice](https://dictionary.cambridge.org/dictionary/english/rice).
- **Impacted:** Full 0241, JA audio/reading and other labels if meaning changed.

### V11 · Who versus which person — CLARIFY CONTEXT, NOT AN ACTIVE CHOICE COLLISION · P2 · Medium confidence
- **Course / direction:** Full; ru-lv and en-lv.
- **Question / concept:** basic-10-prompt-01 / vocab-0091.
- **Exact current:** RU “кто” / EN “who” → LV “kurš”; JA “誰”.
- **Current choices ru-lv:** kurš [vocab-0091]; kāda cena [vocab-0098]; kad [vocab-0094]; kā [vocab-0096].
- **Recommendation:** Differentiate who generally from which person in a context. LV “kas” can also ask who in an appropriate sentence, but is the separately taught what [0092]. Current choices do NOT put kas and kurš together.
- **Evidence:** [MLVV kurš search](https://mlvv.tezaurs.lv/_search/kur%C5%A1); [MLVV kas search](https://mlvv.tezaurs.lv/_search/kas). Scenario choice remains editorial.
- **Impacted:** If changed later, legacy 0091/0092 semantics/locks/audio/guides. No immediate distractor correction.

### V12 · Leg versus foot — KEEP: historical ambiguity not in current choices · P3 · High structural confidence
- **Course / direction:** Full; en-ja.
- **Question / concept:** basic-14-prompt-04 / vocab-0134.
- **Exact current:** EN “leg” → JA “脚”; LV “kāja” → RU “нога”.
- **Current choices en-ja:** 脚 [vocab-0134]; 皮膚 [vocab-0140]; 背中 [vocab-0137]; 肩 [vocab-0139]. Adjacent foot question 0135 uses 足, 膝, お腹, 皮膚 as its separate four choices.
- **Recommendation:** No immediate change. The historical report's concern about overlapping leg/foot dictionary senses does not create a current same-question answer collision.
- **Evidence:** [Historical audit](README.md) compared with actual main block IDs and current four options.
- **Impacted:** None.

### V13 · Word versus phrase — KEEP: historical ambiguity not in current choices · P3 · High structural confidence
- **Course / direction:** Full; en-ja.
- **Question / concept:** basic-41-prompt-02 / vocab-0402.
- **Exact current:** EN “word” → JA “単語”; RU “слово” / LV “vārds”.
- **Current choices en-ja:** 単語 [vocab-0402]; 例 [vocab-0409]; 質問 [vocab-0405]; ページ [vocab-0407]. Separate phrase question 0403 has 語句, 間違い, 答え, 練習問題 as options.
- **Recommendation:** No immediate distractor fix; no current shared-choice collision. Revisit pedagogical precision only if a fluent reviewer identifies a problem.
- **Evidence:** [Historical audit](README.md) plus current main source comparison.
- **Impacted:** None.

## Historical warnings rechecked against actual choice sets

Do not mistake overlaps in dictionaries for **multiple displayed correct answers**. Current main:
- **0091 who / 0092 what:** not mutual distractors.
- **0134 leg / 0135 foot:** not mutual distractors.
- **0148 plaster / 0149 bandage:** not mutual distractors; English “plaster” is normal UK English for an adhesive dressing.
- **0209 pot / 0210 pan:** not mutual distractors; “frying pan” remains a useful clarity proposal (V07).
- **0402 word / 0403 phrase:** not mutual distractors.
- **0251 lunch / 0252 dinner:** “dinner” is a one-way distractor for “lunch” in basic-26-prompt-01, but these intended meals are distinct here; no second correct answer demonstrated.
- **0432 look at / 0433 watch:** **are** paired in basic-44-prompt-02, and could be confusing if Japanese wording is changed indiscriminately (V04).

These distinctions supersede a *claim of current collision*, not the earlier source-sense concerns themselves.

## Owner decisions in priority order

1. **F01:** Should Basic teach *generic goodbye* (uz redzēšanos / до свидания) or *see you later* (uz tikšanos / до встречи)?
2. **F02–F03:** Schoolbag or backpack? Generic payment card or credit card?
3. **F04–F06:** Define stop-an-action versus stop-moving, injured versus in pain, and lost versus cannot find a road. Check Russian speaker-gender options and human language review.
4. **V01–V02:** Should Full prioritize naturally usable price and thirst requests rather than unnatural literal fragments? This affects locked meanings and may reuse Basic expressions.
5. **V04:** Any “look at” refinement must also check the displayed “watch” distractor; avoid adding a multiple-answer question.
6. **Remaining P2:** Scope-specific words for frying pan, paintbrush, bell pepper, rice, cake and leisure walking; don't change merely for polish.
7. **F07:** Put familiar/polite variants only where the actual scenario warrants them.

## Future implementation dependencies — **not authorized by this report**

If the owner approves corrections, Codex should make **small, independently reviewable changes**. Check stable concept, question and correct/distractor IDs, both focused courses and Full reuse, all seven directions, source/target recordings and audio manifests, original vocabulary locks, and the stale **reading-guide PR #21** before merging anything. Regenerate reading guides only from approved forms. Do not edit generated HTML directly. Preserve zero saved learner state, lesson algorithm, mistake correction sound and correct-answer wait behavior. No new language directions, accounts, Android features or deployment changes.

**Checks for this report:** Remote source and prior research read; exact current examples compared. **NOT RUN:** project test suite, full 510-question resweep, real-device tests, pronunciation listening, native-speaking human review, or corpus frequency analysis. The report is a prioritized editorial follow-up and **does not certify that every word is optimal**.
