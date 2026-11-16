# AGENTS.md — instructions for coding and planning agents

Scope: **this repository only** (`janisp123/language-learning-app`). Do not edit `mental-health-questionnaire` or its task list as part of this work.

## 1. Start here — avoid repeating work

1. Read `docs/WORK_CHECKPOINT.md`, then `docs/TD.learn.md`; check actual `main` and open PRs before making claims.
2. Read relevant sections of `docs/ARCHITECTURE.md`, `docs/CONTENT_RULES.md`, `docs/PROJECT_PLAYBOOK.md`, and `docs/RELEASE_CHECKLIST.md` before changing related areas.
3. Verify actual files, commits, and test evidence. Documentation, conversations and PR titles **are not proof of deployed behavior**.
4. Check task dependencies and the latest owner decisions. If instructions conflict, **stop the affected task, explain the conflict and request a decision**. Do not silently reinterpret the learning algorithm.

## 2. Roles and authorization

- **Owner:** decides product direction, approves design changes, releases, and merges where required.
- **ChatGPT:** researches and plans; may maintain approved specifications and TD entries when asked.
- **Codex:** implements, tests, documents and proposes merges **only when the owner explicitly requests coding**.
- A task being present in `docs/TD.learn.md` does **not** launch work. A chat discussion does **not** override written, approved specifications.
- Never invent finished features, successful tests, downloads, public URLs or publication status. Do not silently add monetization or unrelated features.

## 3. Single source of truth and attribution

- **Only `docs/TD.learn.md`** contains active approved language-app tasks. Do not create `TD_LIST.md`, `TD.question.md` or duplicate TD files in this repository.
- Use `docs/CHANGELOG.md` for completed changes, `docs/WORK_CHECKPOINT.md` for current state/next action, and `docs/PROJECT_PLAYBOOK.md` for generalizable lessons, not logs or tasks.
- Every new TD item records **Added by: ChatGPT / Codex / Owner** (only the actual writer, no guessing), and **Implemented by: Not yet** until verified. When resolved, retain its history in the changelog with evidence.
- Task IDs are stable. On completion, archive the result to the changelog and remove it from the active TD only after verified integration.
- A suggestion goes in a short **Discussion / not approved** section if recorded at all; it must not be mistaken for implementation authorization.

## 4. Safe implementation workflow

- Inspect latest `main`; identify the exact starting commit. Do not work from stale or historical branches.
- Prefer **one small task or independently testable slice per branch/PR**. Do not rebuild a verified component because a new prompt is vague.
- Before editing, state the intended files, behavior, relevant tests and any impact on releases or saved progress.
- Implement, test, commit, and document evidence. Include task ID, files, outcomes, checks, commit/PR reference and one clear next step.
- Keep `main` stable. Open a PR; **do not merge or publish an app release without requested authorization**. Never force push or overwrite active changes without an explicit owner decision.
- If interrupted, update the checkpoint with **DONE / PARTIAL / BLOCKED**, commit and next action. A local file is not proof GitHub or Google Play was updated.
- Any agent that changes code should be identified truthfully. Do not claim Codex implemented documentation authored by ChatGPT.

## 5. Non-negotiable product constraints for v1

- Android and GitHub Pages browser learning; no account, remote user database, advertising, subscriptions or payments.
- Browser learning: no saved progress, cookies, localStorage, IndexedDB or external progress synchronization.
- Android: persist **only the highest lesson reached** for the course, plus minimal technical metadata required to interpret it; allow manual export/import. Do not silently save per-word scores or daily progress.
- Each new session begins at lesson 1; no resume-from-last-lesson. Ten **consecutive correct** answers complete a lesson, and a wrong answer moves back one prompt. Reshuffle choices on every appearance; no position memorization.
- Each lesson is a block of exactly ten questions. Count all mistakes within the current block, including those separated by correct answers. The third mistake restarts at lesson 1/question 1 and clears mistake/consecutive counters. Correct answers retain the mistake count; completing a block or restarting resets it. These counters stay volatile; Android's highest-lesson record is unaffected.
- The highest-lesson congratulation appears **only when the learner exceeds their prior record**. No XP, leaderboards, hearts, sounds/animations as rewards, daily streak achievements, or unnecessary pop-ups.
- Initial content: Latvian, Russian and English, all six directed pairs, ages 10–17, ten practical situation lessons. Future languages/age groups are a data/content architecture concern, **not** additional v1 features.
- The complete learning UI follows the source language: Latvian for LV→RU/EN, Russian for RU→LV/EN, English for EN→LV/RU. Change controls, instructions, lesson titles, counters, feedback, errors and completion immediately when the direction changes. Prompt/options retain their actual language tags.
- Separate canonical content from platform UI and logic. Preserve stable course, lesson and prompt IDs; version any exported progress format.
- Use `docs/CONTENT_RULES.md` to prefer clarity/reusability while keeping translations genuinely understandable and grammatically defensible.
- Child safety: never ask for or transmit personal information; don't include tracking or unreviewed external content; respect basic accessibility, audio clarity, and small-screen usability.

## 6. Verification and release

- Cover the algorithm with deterministic tests: correct/incorrect navigation, lesson boundary/wrapping, 10-in-row, repeated misses, shuffle, highest-only persistence, import validation, session resets, and dual translation directions.
- Test website and Android against a common content format and shared conformance examples; **do not claim one engine implementation is shared unless verified**.
- For releases, follow `docs/RELEASE_CHECKLIST.md`, test an actual phone/browser, check GitHub Pages deployed content, and verify real Google Play availability before linking.
- Do not mark a task done merely because CI ran; inspect output and user-visible behavior. Mark unrun checks **NOT RUN**, not PASS.
- Report succinctly: changed, tested, remaining, blocker, PR/commit, next step.

## 7. Improving these rules

If a real, reusable failure or surprising workaround occurs, add an evidence-based, concise entry to `docs/PROJECT_PLAYBOOK.md` (symptom → cause → prevention → verification → confidence). Do not dump transcripts, speculative fixes or private user details into the public repository.
