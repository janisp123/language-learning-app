# Language Learning App

**Learn useful language for real life — and remember it.**

A free language-learning project centered on practical situations and **cumulative repetition**, rather than points, leaderboards or lesson-completion rewards. Content is designed as age-appropriate courses that can later support different language pairs.

**Status: planning and documentation.** There is currently **no usable browser app, Android download, or Google Play listing**. Please do not advertise a working product yet.

## First release (planned)

- Practical **Latvian ↔ Russian** lessons for the **10–17** learning path, originally focused on everyday situations relevant to children in Latvia.
- Ten small situation-based lessons: greetings, communication, self-introduction, locations, school, activities, shopping, directions, transport and safety.
- A learner must answer **10 prompts correctly in succession** to complete a lesson. A wrong answer moves back one question. Answer choices are reshuffled on each appearance.
- Each fresh learning session begins at lesson 1. Later lessons are earned again by revisiting earlier material. No XP, scores, lives or daily streak rewards.
- Android saves **only the highest lesson reached** for the selected course, with manual backup/import. The browser version saves **no progress** and requires no account.
- No ads, subscriptions, payments, user accounts, server-side database or tracking in version 1.
- A simple GitHub Pages landing page with **Learn in browser** and, once released, a link to **Google Play**.

The purpose is understandable, useful communication, **not** mastery of perfect stylistic language or arbitrary vocabulary counts. Teach natural, intelligible phrases that are useful in realistic situations; do not knowingly teach incorrect grammar or unsafe advice.

## Development and collaboration

This repository uses GitHub as the shared written handoff between the project owner, ChatGPT (planning/research/specification), and Codex (implementation/testing when expressly requested). **Adding an idea or task does not start Codex automatically.**

| File | Role |
| --- | --- |
| [AGENTS.md](AGENTS.md) | Mandatory agent operating rules |
| [docs/TD.learn.md](docs/TD.learn.md) | The **only** approved implementation backlog for this repository |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Product boundaries and proposed architecture |
| [L-001 architecture decision](docs/decisions/L-001-platform-content-engine.md) | Codex technical proposal, pending owner review |
| [docs/CONTENT_RULES.md](docs/CONTENT_RULES.md) | Curriculum and translation/content policy |
| [docs/PROJECT_PLAYBOOK.md](docs/PROJECT_PLAYBOOK.md) | Reusable lessons from earlier work |
| [docs/WORK_CHECKPOINT.md](docs/WORK_CHECKPOINT.md) | Current verified state and next action |
| [docs/CHANGELOG.md](docs/CHANGELOG.md) | Historical record of completed changes |
| [docs/RELEASE_CHECKLIST.md](docs/RELEASE_CHECKLIST.md) | Browser/Android/Play release gates |

**Project naming:** the GitHub name is intentionally generic. There is **no final app/brand name** yet.

**Licensing:** public visibility does not itself grant an open-source reuse license. A license has not been selected; the licensing decision is a documented pre-release task. Do not label the code as licensed for reuse until a license is chosen.

**Separate project:** the mental-health questionnaire lives in its own repository and task system. Never implement language-app tasks there.
