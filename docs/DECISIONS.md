# Durable owner-approved decisions

Record decisions only when explicitly approved, with date and superseding history. Do not turn proposals or chat speculation into decisions.

| ID | Date | Approved by | Decision | Status |
| --- | --- | --- | --- | --- |
| PRO-001 | 2026-11-18 | Owner | Same file locations in all projects; `docs/TD_LIST.md` is the only active task list. | Active |
| PRO-002 | 2026-11-18 | Owner | Actor labels: `chat` = regular ChatGPT; `cw` = ChatGPT Work; `codex` = Codex. | Active |
| PRO-003 | 2026-11-18 | Owner | Read current remote TD before project-specific action; use verified PR/handoff procedure and a starter template for new projects. | Active |
| PRO-004 | 2026-11-18 | Owner | Bare “continue” is read-only: inspect/resume-plan/ask approval; “continue and implement” proceeds only within an already approved scope; “check status” stays read-only. | Active |

The language application's product decisions remain in `AGENTS.md`, `docs/ARCHITECTURE.md`, `docs/CONTENT_RULES.md` and `docs/RELEASE_CHECKLIST.md`. Do not silently migrate or reinterpret them. This coordination change alters no learning behavior.

## Product direction — 2026-11-23

Owner requested Kids / Adults selection across the existing seven directions and accepted approximately100–150 essential words/short expressions per starting course, preserving the510-item bank outside focused starters. Goal: basic mutual communication and familiar-word reuse, with relevance to everyday child/adult situations. Politeness refinement is secondary to being understood. Authorized next action is drafting course lists for review before application changes. Exact100/80+20 arrangement, lists, rule changes, implementation and publication remain proposals pending review. See L-012 and its linked draft; this decision does not add Japanese reverse/other pairings or saved preferences.

### Course-list approval — 2026-11-23

After receiving the complete list/design in PR #28, Owner replied “Yes it looks good.” Approved design:100 items each,80 shared +20 Kids/Adults-specific, practical phrases from lesson1, preserving510 outside the focused starters and existing seven directions/ZERO saves. The English labels express teaching intents; translations, canonical ID mapping, concrete pattern realizations and the technical implementation plan are not finished by this approval. Codex is preparing the plan; default audience/original-course access presentation and specific technical ceilings are author proposals for that plan. No coding, held-PR merge or publication is claimed or automatically authorized.

## Mistake correction playback — 2026-11-23

Owner explicitly requested source-question→correct-target-answer audio three times before automatic one-question-back navigation, with no Try again option. Apply the existing third-mistake lesson1 reset after correction playback. Correct answers keep500ms and all scoring rules remain unchanged. This supersedes immediate wrong-answer navigation/blanket no target-audio feedback for this correction only. Existing restart/course/direction cancellation and zero saved state remain mandatory; playback failure recovers automatically with correct text/error visible.

## Owner-approved setup simplification and dark default — 2026-11-23

Owner requested direction first, then exactly three choices: Basic Kids (100), Basic Adults (100), Full (510). Replace separate audience/original-course controls; preserve all content, seven directions, scoring and correction audio. Both website and app start dark on every fresh load, with manual light mode in memory only. An exact one-use light/dark fragment carries the landing choice into learning, is immediately consumed, and never restores a preference on reload. This supersedes older light-default notes. Checked merge/live publication remains authorized.

## Selected correct-answer playback — 2026-11-23

Owner requested pronunciation when submitting an answer, including correct answers, and explicitly rejected waiting for the full recording: use the normal answer-speaker action with no additional waiting step. Correct submissions play the selected target clip immediately, then retain500ms navigation. Next prompt/restart/direction/course/completion stops old sound; long clips can therefore be interrupted, as with manual replay. Incorrect submissions retain the existing three source-question/correct-answer pairs. Speaker-only clicks never grade. This supersedes the old no-target-audio-on-correct-feedback rule only for this approved action; no stored state, vocabulary/audio, scoring or direction changes.

## Correct playback duration plus two seconds — 2026-11-23

Owner reported correct-answer audio was cut short and explicitly requested its playback duration plus2 seconds. This supersedes L-015’s fixed500ms correct transition/no-completion-gate decision. Play the selected correct target recording to its actual ended event, then wait2000ms before applying the already-computed result. Keep answers/prompt replay locked; reset/course/direction changes cancel playback and the pause. Blocked/missing/errored audio uses a2000ms fallback; stalled playback retains the existing30s watchdog then2000ms recovery. Wrong-answer three source-question/correct-answer pairs remain unchanged, with their existing failure fallback. No duration guesses or stored preferences/progress; engine/content/IDs/recordings/seven directions remain unchanged.

## Copy-only translation reports — 2026-11-24

Owner approved a flag on every question: choose Question or one displayed Answer, enter a proposed correction, and copy a report for pasting into chat. Capture exact original wording plus app/content version, direction, Kids/Adults/Full preset, course/lesson/question/concept and relevant answer IDs. Snapshot stays tied to the flagged item even if normal learning advances. No automatic submission, external report service, content editing, accounts, learner-history/progress export or saved drafts. Only an explicit Copy action writes the user’s requested plain-text content report to the clipboard; denied/unavailable access offers selectable text. Drafts live in memory and clear on close/Escape/restart/course/direction/reload. UI follows source language, supports keyboard/mobile/dark and does not grade, reshuffle, change audio timing or scoring. This authorized copy-only content-correction workflow does not authorize persisting learner state. Checked integration/publication remains authorized.

## One shared beginner default per meaning — 2026-11-24

**Owner-approved editorial rule for L-011 and all future lessons:** If Basic Kids, Basic Adults and Full teach **the same meaning and situation**, they must teach the **same preferred expression/translation**, not different stylistic or register variants. Reuse the canonical vocabulary meaning and stable IDs where appropriate; avoid duplicate synonyms invented solely for a new preset. Prefer a **short, common, understandable and politely safe default** that a child could use with a teacher, stranger or other adult and an adult could use in everyday conversation. Correct everyday intelligibility matters more than showcasing nuance or adding extra vocabulary; do not turn every sentence artificially formal.

**Explicit example:** For a general `goodbye / uz redzēšanos`, the preferred Russian teaching default is **`до свидания`** in **all three presets**. Do **not** substitute `до встречи` as the Basic default for generic goodbye. `До встречи` is an authentic expression closer to “see you”, but that different meaning is not needed as an alternative in the first basic set; don't falsely claim it is unused. If a different meaning (e.g. “see you later”) is intentionally taught in the future, label it clearly as a separate concept, not another default translation of goodbye.

**Audit and implementation requirements:** Identify cross-course meaning duplication, verify actual 4-choice answer sets in all seven directions, propose one source-backed default per meaning, and list exactly which shared references, recorded audio and reading guides would be affected. Owner approves changes before Codex edits live content. Preserve stable identity or allocate a new ID if meaning truly differs. This decision **overrides earlier wording that might encourage different Basic/Full answers or favor context-dependent casual alternatives in the common core**. It does not alter the already-live source, recordings, reading-guide PR, current L-010 handoff or published app merely by being recorded.

## First audit implementation and shorter correct pause — 2026-11-24

Owner explicitly requested starting the common-usage implementation and shortening the post-correct-answer pause by one second. Keep full target playback, then1000ms instead of2000ms (also1000ms after correct-audio failure/unavailability). Wrong-answer correction and its500ms failure fallback remain unchanged. Start with confirmed PR #43 findings F014/F015: remove dinner as a competing answer to lunch (basic-26-prompt-01:0252→0250 sugar), and what price as a competing answer to how many (basic-10-prompt-07:0098→0093 where). Preserve correct IDs/text/all recordings/historical digests, documenting allowed distractor exceptions. This is a bounded implementation authorization, not approval of every editorial proposal. Owner subsequently explicitly chose the shared Full-course goodbye in every course, including Japaneseさようなら. F001 therefore reuses canonicalvocab-0002 in both Basic courses/all7directions, replacing22 active focus-s02 references while retaining questionfocused-s02/slotS02. Preserve unused originalfocus-s02 forms/recordings; focused catalog/audio revision becomesfocused-0.1.1. This is the owner-approved teaching default, not a universal claim about Japanese departures. PR #43 remains held, research is referenced without merging it. Zero saves and all delivered features remain mandatory.

## 2026-11-24 — Owner approved ten shared polite-default cells

After reviewing PR46 preparation and being told implementation/audio/publication were next, Owner instructed “Make the change already.” This authorizes the exact ten F002–F007 cells in [the approved table](../research/common-usage/2026-11-24-reconciled/F002-F007-wording.csv), matching nine new recordings and existing Russian извините clip reuse, checked integration and live publication under standing authorization. Keep Japanese F004 名前は何ですか unchanged pending a separate selection. Keep apology and attention as distinct meanings/IDs even when Russian wording matches. No approval of unrelated remaining findings or held reading-guide integration is implied. See [implementation notes](../research/common-usage/2026-11-24-implementation-02.md).
