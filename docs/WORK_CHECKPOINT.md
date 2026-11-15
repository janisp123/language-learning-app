# Current working checkpoint

**As of:** 2026-11-15 (Europe/Riga)  
**Repository:** `janisp123/language-learning-app`  
**Source of truth:** `main` after the initial documentation PR is merged.

## Verified state

- Repository and initial README existed before setup.
- Planning documents define product requirements, content boundaries, Codex collaboration, regression expectations and the ordered backlog.
- **No executable Android app, browser learning experience, Pages deployment, CI pipeline, Play listing or release has been built or verified.**
- New documentation is a handoff/plan, not an implementation.

## Current product decision

First release = ten practical LV ↔ RU lessons for ages 10–17, with daily/fresh-session restart from lesson 1, 10 consecutive correct answers per lesson, wrong-answer step back, only Android's highest lesson retained, manual progress file transfer, anonymous unsaved browser experience, no ads or accounts.

## Blockers / owner decisions

- L-001 must choose a sustainable cross-platform approach and pronunciation delivery before large coding work.
- Final public app name and source-code/content licenses are undecided.
- Google Play verification, required testing, listing assets and publication have not occurred.
- Browser and Android delivery must be tested independently before release.

## One next action

**Owner starts Codex on L-001**: inspect the repository, propose the minimal platform/content/engine architecture, record decisions and tests; do not implement the full app or publish. After approved architecture, proceed with the next small TD item.

**Documentation synchronization:** Treat this checkpoint as applying to `main` only after verifying the setup PR merged; until then, use the actual branch/PR state. Never infer a merge from this text.
