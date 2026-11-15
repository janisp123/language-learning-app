# Project Playbook — reusable lessons for humans and AI agents

**Purpose:** Practical preventive knowledge from previous work, especially the mental-health questionnaire repository. **Not** a changelog, backlog, private conversation archive or a substitute for `AGENTS.md`.

## Fast lookup

| ID | Issue avoided | Apply when |
| --- | --- | --- |
| PB-01 | Oversized, unresumable tasks | Planning implementation |
| PB-02 | Confused task sources and branches | Selecting work |
| PB-03 | Losing progress when interrupted | Every work session |
| PB-04 | Claims of completion without evidence | Testing and reporting |
| PB-05 | Divergent hosted and downloadable apps | Multiple delivery paths |
| PB-06 | Breaking progress imports | Persisted formats |
| PB-07 | Translation drift and misleading options | Editing lesson content |
| PB-08 | Unnecessary features delaying release | Prioritization |
| PB-09 | Mixing public and internal communication | Docs and release |
| PB-10 | Private data leaking into public repos | Any public repository change |
| PB-11 | Guessed tool arguments, blind retries and oversized output | Connector actions |

**Entry format:** `ID · Confidence (PROVEN / PROVISIONAL / SUPERSEDED) · Trigger · Observed problem · Preventive action · Evidence/check`. Mark provisional when a rule is sensible but has not been validated in the new project. A playbook entry is advice; mandatory requirements belong in AGENTS/ARCHITECTURE and must be approved.

## Entries

### PB-01 · PROVEN — Split large tasks
**Trigger:** Multi-file, content-heavy or cross-platform changes.  
**Observed:** Large questionnaire implementations were difficult to verify, audit and resume after interruptions.  
**Prevent:** Use short, independent slices, one verified checkpoint/commit/PR at a time; do not rebuild known-working features.  
**Check:** Each finished slice has concrete files, checks, commit and next action.

### PB-02 · PROVEN — Keep exactly one active TD
**Trigger:** Multiple assistants or historical branches.  
**Observed:** Confusion arises when old TODO files, branches, and finished tasks all look active.  
**Prevent:** One active TD per repo; separate backlog, discussions, history and checkpoint. Preserve writer/implementer attribution.  
**Check:** AGENTS, README and checkpoint all point to the same TD path; no stale aliases.

### PB-03 · PROVEN — Use a compact checkpoint, not chat memory
**Trigger:** Restarting work after usage limits, context loss or a paused coding session.  
**Observed:** Reconstructing state from old conversations caused repeated effort and uncertainty about what actually reached GitHub.  
**Prevent:** A current checkpoint names exact commit, product state, blockers and **one next action**. Put the historical story in CHANGELOG.  
**Check:** Another agent can resume from repository files alone and distinguish local from remote work.

### PB-04 · PROVEN — Verify delivered behavior, not just source code
**Trigger:** A task says “done,” “deployed,” “downloadable,” or “works.”  
**Observed:** The questionnaire required additional real-browser, mobile-size, actual-file and hosted readback checks; passing code inspection was insufficient.  
**Prevent:** Record specific tests and actual published/downloaded readback. Say NOT RUN for omitted checks.  
**Check:** A reviewer can reproduce the exact tested version and see which environment was verified.

### PB-05 · PROVEN — Avoid parallel unsynchronized product copies
**Trigger:** The same learning system is offered through GitHub Pages and Android.  
**Observed:** Separate hosted/download sources in the questionnaire required explicit version/source parity checks.  
**Prevent:** One canonical lesson bank, a behavior contract with shared conformance cases, release/version checks, and clear deployment ownership.  
**Check:** Browser and Android agree for identical sample inputs and lesson IDs; no stale published copy is passed off as current.

### PB-06 · PROVISIONAL — Treat the backup schema as a contract
**Trigger:** Changing progress storage or content identifiers.  
**Observed:** Questionnaire recovery/report functionality required care around IDs, version compatibility and meaningful stored choices.  
**Prevent:** Stable IDs, versioned export format, validation before import, and tested failure behavior.  
**Check:** Old supported backups restore on a fresh device; incompatible/corrupt backups cannot overwrite valid progress.

### PB-07 · PROVISIONAL — Audit content in both directions
**Trigger:** Adding or changing translations, answer choices, or audio.  
**Observed:** Multi-language question content became difficult to keep semantically aligned and grammatically correct.  
**Prevent:** Define meaning once, run automated consistency tests, manually review context and all correct/distractor choices in both directions.  
**Check:** No duplicate correct alternatives, invalid distractors or mismatched source/target meanings.

### PB-08 · PROVEN — Freeze release scope early
**Trigger:** “While we're here” feature requests during implementation.  
**Observed:** Feature expansion increased complexity and delayed practical review of the questionnaire.  
**Prevent:** Ship the smallest useful release, defer extras, document any intentional scope change as a new decision.  
**Check:** Every change maps to an approved TD task or documented safety/reliability fix.

### PB-09 · PROVEN — Keep outward descriptions honest and audience-focused
**Trigger:** README, landing page, release notes or public guide changes.  
**Observed:** Developer coordination details can clutter material intended for ordinary users.  
**Prevent:** Public text explains what works now, who it's for, and privacy limitations. Keep PR/checkpoint/AI attribution in repository development docs.  
**Check:** Never claim current Play availability, indexing, offline mode or validated translations without evidence.

### PB-10 · PROVEN — Public repositories need privacy discipline
**Trigger:** Pushing prompts, test fixtures, logs, example reports or filenames.  
**Observed:** Public project artifacts can inadvertently expose private motives, account info or personal examples.  
**Prevent:** Use synthetic examples, avoid identifiable child/family details, secrets, private communication and unapproved personal branding in public docs.  
**Check:** Inspect changes for credentials, private email addresses and personal data before PR or release.

### PB-11 · PROVEN — Read complete tool declarations before constructing calls
**Trigger:** First use of an unfamiliar connector action, especially GitHub mutations or batched retrieval.
**Observed:** During the L-001 documentation session (2026-11-15), Codex shortened tool descriptions and guessed wrapper arguments. Rejected calls used `from_sha` instead of `sha`, `base_tree` instead of `base_tree_sha`, `parents` instead of `parent_sha`, `ref` instead of `branch_name`, or `repository_full_name` where comparison requires `repo_full_name`; scrape calls omitted required `objective`. Corrected calls succeeded. This was caller error, not evidence of a GitHub outage or lost committed work.
**Prevent:** Read the full declaration for the exact tool before its first use. In this execution harness, `ALL_TOOLS` descriptions include `exec tool declaration` signatures: select exact tool names and print their complete descriptions, rather than truncating them or dumping the whole catalog. Check required fields, accepted field names/types, mutually exclusive options and prerequisites locally. Reuse the verified call shape within the session; re-read the current declaration after a tool/version change. For example, branch creation takes `repository_full_name`, `branch_name`, and exactly one of `sha` or `base_ref`. Never probe a mutation just to discover its inputs.
**On failure:** Inspect both promise rejection and returned `isError` / structured error; a fulfilled promise is not proof of action success. An argument-validation error calls for declaration review and a corrected request, not blind retries or new guessed field names. For timeout/transport ambiguity, read the actual branch/file/PR state before retrying a write; reuse existing successful artifacts. A conflicting expected SHA requires inspecting the current head, never automatic force-push. Batch only independent calls after validating their shared call shape; stop dependent actions on error.
**Resource check:** Keep full results in session memory or a local scratch artifact and print only the fields/passages needed next; do not emit both duplicated `content` and `structuredContent` bodies or the full tool catalog. Inspect every batched result. This reduces avoidable context use without discarding evidence.
**Evidence/check:** L-001 PR [#3](https://github.com/janisp123/language-learning-app/pull/3), commit `1d1622469d07a5215c35b11b43d0829f581c5c41`, records the successful final delivery; the rejected/corrected argument examples above were observed in the associated work session, not inferred from that PR. For the lessons update, read full declarations before branch/file/PR operations and verify their returned results plus file readback. No promise of zero external failures or measured token/cost savings is made.

## Maintenance

- Add a new entry **only** after a reusable lesson is demonstrated or a carefully bounded provisional risk is identified. If it repeats an existing entry, update that entry.
- Keep the index current, give a short reproducer or verification criterion, and mark SUPERSEDED when no longer reliable.
- Do not turn personal conclusions into permanent agent rules without evidence and owner acceptance.
