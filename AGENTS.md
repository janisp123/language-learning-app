# AGENTS.md — instructions for coding and planning agents

## Project protocol v1.0 — read before any project action

First fetch current remote `main:docs/TD_LIST.md`; then read this file, `docs/WORK_CHECKPOINT.md` and applicable `docs/DECISIONS.md`. Check overlapping PRs. Standard labels: **chat** = regular ChatGPT, **cw** = ChatGPT Work, **codex** = Codex; **Owner** approves. Follow `docs/AGENT_PROTOCOL.md`; tasks do not authorize themselves. Run `python tools/check_project_protocol.py` and use checked PRs for edits. All product/safety/release rules below remain binding.

## Owner command convention — "continue" (2026-11-18)

This applies to project work by **chat**, **cw** and **codex**, including after a tool or usage-limit interruption. The phrase is not automatic authorization to code:

- **"Continue" (alone): READ-ONLY preflight.** Fetch current remote `main:docs/TD_LIST.md` first, read this file, checkpoint, decisions, relevant evidence and open PRs; identify the last verified state and any conflicts. Reply with the specific task/ID, what was completed, what remains, the smallest next change, tests/risks and **"Should I proceed?"** Do **not** modify files, create branches/PRs, commit, merge, publish or perform external actions until the Owner answers.
- **"Continue and implement":** The Owner explicitly authorizes execution of an already-approved, clearly identified scope. Still do the full preflight, check conflicts and proceed only with previously approved decisions; stop to request approval for new choices, changed scope, ambiguous repository/task, destructive actions, merges or releases requiring separate approval.
- **"Check status":** Read-only status report; no implementation and no approval question required unless an ambiguity prevents a meaningful answer.
- If the project or task is ambiguous, ask which one; do not invent a handoff. Usage limits resetting never trigger automatic work.

Scope: **this repository only** (`janisp123/language-learning-app`). Do not edit `mental-health-questionnaire` or its task list as part of this work.

## 1. Start here — avoid repeating work

1. Read latest remote `main:docs/TD_LIST.md` first, then `AGENTS.md` and `docs/WORK_CHECKPOINT.md`; check actual `main` and open PRs before making claims.
2. Read relevant sections of `docs/ARCHITECTURE.md`, `docs/CONTENT_RULES.md`, `docs/PROJECT_PLAYBOOK.md`, and `docs/RELEASE_CHECKLIST.md` before changing related areas.
3. Verify actual files, commits, and test evidence. Documentation, conversations and PR titles **are not proof of deployed behavior**.
4. Check task dependencies and the latest owner decisions. If instructions conflict, **stop the affected task, explain the conflict and request a decision**. Do not silently reinterpret the learning algorithm.

## 2. Roles and authorization

- **Owner:** decides product direction, approves design changes, releases, and merges where required.
- **chat (regular ChatGPT):** researches and plans; may maintain approved specifications and TD entries when asked.
- **cw (ChatGPT Work):** works on tasks explicitly assigned to cw; do not assume it shares chat's session state.
- **codex (Codex):** implements, tests, documents and proposes merges **only when the owner explicitly requests coding**.
- A task being present in `docs/TD_LIST.md` does **not** launch work. A chat discussion does **not** override written, approved specifications.
- Never invent finished features, successful tests, downloads, public URLs or publication status. Do not silently add monetization or unrelated features.

## 3. Single source of truth and attribution

- **Only `docs/TD_LIST.md`** contains active approved language-app tasks. Do not create any second active task list in this repository.
- Use `docs/CHANGELOG.md` for completed changes, `docs/WORK_CHECKPOINT.md` for current state/next action, and `docs/PROJECT_PLAYBOOK.md` for generalizable lessons, not logs or tasks.
- Every new TD item records **Added by: chat / cw / codex / Owner** (the actual recorder, no guessing), and **Implemented by: Not yet** until verified; preserve historical names/entries. When resolved, retain its history in the changelog with evidence.
- Task IDs are stable. On completion, archive the result to the changelog and remove it from the active TD only after verified integration.
- A suggestion goes in a short **Discussion / not approved** section if recorded at all; it must not be mistaken for implementation authorization.

## Resume pointer and pending-task reconciliation

Read the checkpoint's standalone `Current task: L-NNN` line and match it to `docs/TD_LIST.md`; do not select the first numeric backlog entry as the current assignment. Report the task's title/scope, last authorization, completed versus pending work and exact next step. Check pending PRs for newer instructions, but never treat unmerged product code as adopted. If task metadata is stranded in a held feature PR or a retired path, restore it through a separate checked main-based coordination change without merging the feature. Preserve attribution/history and current owner command semantics. Run the protocol checker: it rejects missing/orphan current-task pointers. It cannot enforce comprehension, so do not promise that confusion is impossible.

## 4. Safe implementation workflow

- Inspect latest `main`; identify the exact starting commit. Do not work from stale or historical branches.
- Prefer **one small task or independently testable slice per branch/PR**. Do not rebuild a verified component because a new prompt is vague.
- Before editing, state the intended files, behavior, relevant tests and any impact on releases or saved progress.
- Implement, test, commit, and document evidence. Include task ID, files, outcomes, checks, commit/PR reference and one clear next step.
- Keep `main` stable. Open a PR; **do not merge or publish an app release without requested authorization**. Never force push or overwrite active changes without an explicit owner decision.
- If interrupted, update the checkpoint with **DONE / PARTIAL / BLOCKED**, commit and next action. A local file is not proof GitHub or Google Play was updated.
- Any agent that changes code should be identified truthfully. Do not claim Codex implemented documentation authored by ChatGPT.

## 5. Non-negotiable product constraints for v1

- Product scope: roughly 500 crucial words and short phrases for survival basics and everyday communication. Practical usefulness, intelligibility, pronunciation and reuse take priority over breadth or an exact marketing count. Current development focus is Russian ↔ Latvian. Do not turn this into a broad language curriculum or Duolingo-style feature set; see `docs/CONTENT_RULES.md`. The owner-authorized practical-core revision contains 510 entries: all original 500 plus ten reusable requests/restrictions.
- Android and GitHub Pages browser learning; no account, remote user database, advertising, subscriptions or payments.
- **Zero learner-state saves on every platform (owner decision, 2026-11-17):** Browser, Android and any future wrapper keep progress only in memory. Never persist answers, lesson position, highest lesson, counters, history or learning preferences to cookies, localStorage/sessionStorage, IndexedDB, native preferences/databases/files, cloud or backup/export files. Do not restore learner state through OS lifecycle/backup mechanisms. Every fresh session, reload or process restart begins at lesson 1. Bundled course/audio assets are application content, not saved learner state.
- Each new session begins at lesson 1; no resume-from-last-lesson. Ten **consecutive correct** answers complete a lesson, and a wrong answer moves back one prompt. Reshuffle choices on every appearance; no position memorization.
- Each lesson is a block of exactly ten questions. Count all mistakes within the current block, including those separated by correct answers. The third mistake restarts at lesson 1/question 1 and clears mistake/consecutive counters. Correct answers retain the mistake count; completing a block or restarting resets it. All counters remain volatile; no highest-lesson record exists.
- No saved records or record-based congratulations. No XP, leaderboards, hearts, sounds/animations as rewards, daily streak achievements, or unnecessary pop-ups.
- Initial content: Latvian, Russian and English, all six directed pairs, ages 10–17, 51 blocks of ten questions covering 510 basic words and short phrases. The first ten blocks remain words/short phrases; full practical request phrases begin at block 11. Preserve block/concept IDs when changing display order. Future languages/age groups are a data/content architecture concern, **not** additional v1 features.
- **Owner-authorized Japanese addition (2026-11-17):** Add English→Japanese only, with Japanese script-only answers and the English interface. The catalog allowlist is exactly the existing six directions plus en-ja; Japanese→English/LV/RU and LV/RU→Japanese remain unavailable. Japanese is target-only; current-prompt audio uses bundled English clips. Preserve existing IDs, translations/bindings and recordings. This supersedes the blanket future-language exclusion only for en-ja.
- The complete learning UI follows the source language: Latvian for LV→RU/EN, Russian for RU→LV/EN, English for EN→LV/RU. Change controls, instructions, lesson titles, counters, feedback, errors and completion immediately when the direction changes. Prompt/options retain their actual language tags.
- Author content through `content/catalog.json`, `content/concepts.json`, per-block files and per-language modules; follow `docs/CONTENT_MODULES.md`. Preserve permanent question/concept IDs, explicit correct-answer IDs and both active-vocabulary and archived original-content lock evidence. Do not edit generated downloads or bypass loader/UI-contract checks to silence an identity error. Keep engine/UI independent of total block/language counts.
- Separate canonical content from platform UI and logic. Preserve stable course, lesson and prompt IDs. Do not add learner-progress export/import or a progress-file format.
- Prioritize reusing taught words, phrases and phrase patterns across content, even if style becomes repetitive or less elegant. Avoid unnecessary synonyms and stylistic alternatives; introduce new words for useful meanings or necessary clarity. Communication efficiency takes priority over style and formal grammar: understandable fragments/imperfect phrasing are acceptable when they reduce vocabulary burden. Preserve intended meaning and clear answer choices; do not add synonyms or grammatical complexity merely for correctness. Follow `docs/CONTENT_RULES.md`.
- Child safety: never ask for or transmit personal information; don't include tracking or unreviewed external content; respect basic accessibility, audio clarity, and small-screen usability.

## Owner-approved cross-course vocabulary consistency — 2026-11-24

For the **same intended meaning and situation**, Basic Kids, Basic Adults and Full must teach **one consistent default translation**. Prioritize a simple, common, safe and polite expression that a child may use with a teacher or unfamiliar adult and an adult may use naturally. Avoid casual alternatives in Basic when Full already has a suitable polite default; never split synonyms by age solely for style. **General goodbye** is `uz redzēšanos / до свидания / goodbye` (Japanese expression subject to its real situation). Do **not** use `До встречи` as the Basic translation of a generic goodbye; it has a distinct “see you” meaning. Preserve real distinctions when necessary and do not assert that other expressions are “never used.” This latest owner decision refines earlier “politeness secondary/contextual” instructions without changing the priority of understandable, useful speech. Follow `docs/DECISIONS.md` and `docs/CONTENT_RULES.md` for the precise contract. **Documentation here is not authorization to rewrite vocabulary/audio/live code**; audit first, then request owner signoff for actual edits.

## Owner-approved focused courses — 2026-11-23

Kids/Adults starting courses supersede the former single-age-only restriction for this authorized slice:100 items each (80 shared communicative intents +20 relevant to each audience), practical short phrases from lesson1. Exactly the existing seven selectable directions; no new Japanese pairings. Preserve the original510-item course separately, without duplicating its dictionary or silently changing its meanings/recordings. New-only concepts/forms/course selections live in content/focused; lesson/answer identity and scoring rules remain unchanged. A selected focused view has one allowed direction for grading, while setup exposes the same global seven. Existing legacy content policy/locks remain scoped to the original bank; focused complete expressions have a12-word structural ceiling and require semantic/context review. Zero saves includes audience/direction/original-course choice. Owner explicitly authorized efficient checked merging and live publication so the website can be tested while remaining work proceeds; do not ask again for that authorized scope. Reading-guide PR #21 remains a separately tracked unfinished integration, not an excuse to claim guides are live.

## Owner-approved mistake correction audio — 2026-11-23

After an incorrect answer, play the CURRENT source-language question then its CORRECT target-language answer three times, waiting for actual clip completion, before automatically applying the existing one-prompt-back result. No Try again button or extra grading. Third cumulative block mistake restarts lesson1 only after the three pairs. Correct answers retain500ms; wrong-answer timing is explicitly superseded by this listening sequence. Replay controls stay locked during the sequence; restart/course/direction changes cancel sound and stale continuations. Media failure must show the correction/error and recover, not trap a session. This is the authorized exception to the older “answer feedback never plays target audio” rule, only for wrong-answer correction. Preserve counters, content, seven directions and ZERO saves.

## 6. Verification and release

- Cover the algorithm with deterministic tests: correct/incorrect navigation, lesson boundary/wrapping, 10-in-row, repeated misses, shuffle, no learner-state writes/restoration, session resets, and dual translation directions.
- Test website and Android against a common content format and shared conformance examples; **do not claim one engine implementation is shared unless verified**.
- For releases, follow `docs/RELEASE_CHECKLIST.md`, test an actual phone/browser, check GitHub Pages deployed content, and verify real Google Play availability before linking.
- Do not mark a task done merely because CI ran; inspect output and user-visible behavior. Mark unrun checks **NOT RUN**, not PASS.
- Report succinctly: changed, tested, remaining, blocker, PR/commit, next step.

## 7. Improving these rules

If a real, reusable failure or surprising workaround occurs, add an evidence-based, concise entry to `docs/PROJECT_PLAYBOOK.md` (symptom → cause → prevention → verification → confidence). Do not dump transcripts, speculative fixes or private user details into the public repository.

## Owner-approved setup simplification and dark default — 2026-11-23

Owner requested direction first, then exactly three choices: Basic Kids (100), Basic Adults (100), Full (510). Replace separate audience/original-course controls; preserve all content, seven directions, scoring and correction audio. Both website and app start dark on every fresh load, with manual light mode in memory only. An exact one-use light/dark fragment carries the landing choice into learning, is immediately consumed, and never restores a preference on reload. This supersedes older light-default notes. Checked merge/live publication remains authorized.

## Selected correct-answer playback — 2026-11-23

Owner requested pronunciation when submitting an answer, including correct answers, and explicitly rejected waiting for the full recording: use the normal answer-speaker action with no additional waiting step. Correct submissions play the selected target clip immediately, then retain500ms navigation. Next prompt/restart/direction/course/completion stops old sound; long clips can therefore be interrupted, as with manual replay. Incorrect submissions retain the existing three source-question/correct-answer pairs. Speaker-only clicks never grade. This supersedes the old no-target-audio-on-correct-feedback rule only for this approved action; no stored state, vocabulary/audio, scoring or direction changes.

## Correct playback duration plus two seconds — 2026-11-23

Owner reported correct-answer audio was cut short and explicitly requested its playback duration plus2 seconds. This supersedes L-015’s fixed500ms correct transition/no-completion-gate decision. Play the selected correct target recording to its actual ended event, then wait2000ms before applying the already-computed result. Keep answers/prompt replay locked; reset/course/direction changes cancel playback and the pause. Blocked/missing/errored audio uses a2000ms fallback; stalled playback retains the existing30s watchdog then2000ms recovery. Wrong-answer three source-question/correct-answer pairs remain unchanged, with their existing failure fallback. No duration guesses or stored preferences/progress; engine/content/IDs/recordings/seven directions remain unchanged.

## Copy-only translation reports — 2026-11-24

Owner approved a flag on every question: choose Question or one displayed Answer, enter a proposed correction, and copy a report for pasting into chat. Capture exact original wording plus app/content version, direction, Kids/Adults/Full preset, course/lesson/question/concept and relevant answer IDs. Snapshot stays tied to the flagged item even if normal learning advances. No automatic submission, external report service, content editing, accounts, learner-history/progress export or saved drafts. Only an explicit Copy action writes the user’s requested plain-text content report to the clipboard; denied/unavailable access offers selectable text. Drafts live in memory and clear on close/Escape/restart/course/direction/reload. UI follows source language, supports keyboard/mobile/dark and does not grade, reshuffle, change audio timing or scoring. This authorized copy-only content-correction workflow does not authorize persisting learner state. Checked integration/publication remains authorized.

## First audit implementation and shorter correct pause — 2026-11-24

Owner explicitly requested starting the common-usage implementation and shortening the post-correct-answer pause by one second. Keep full target playback, then1000ms instead of2000ms (also1000ms after correct-audio failure/unavailability). Wrong-answer correction and its500ms failure fallback remain unchanged. Start with confirmed PR #43 findings F014/F015: remove dinner as a competing answer to lunch (basic-26-prompt-01:0252→0250 sugar), and what price as a competing answer to how many (basic-10-prompt-07:0098→0093 where). Preserve correct IDs/text/all recordings/historical digests, documenting allowed distractor exceptions. This is a bounded implementation authorization, not approval of every editorial proposal. Farewell F001 remains pending the explicitly asked Japanese departure-context choice; do not silently split directions or overwrite meanings. PR #43 remains held, research is referenced without merging it. Zero saves and all delivered features remain mandatory.
