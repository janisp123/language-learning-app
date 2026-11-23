# Current working checkpoint

Current task: L-010

## Last completed slice — 2026-11-23

**L-012 focused Kids/Adults courses are LIVE at0.5.0.** Owner explicitly authorized efficient checked merging/live publication so testing can happen on the actual website; no further routine publication approval is needed within that scope.

- [Learning page](https://janisp123.github.io/language-learning-app/learn/?v=0.5.0):100 items each,80 shared intents +20 school/play or everyday shop/transport. Source-language Kids/Adults selector; original510 course available separately. Seven global directions only, matching bundled audio, same scoring/500ms/replay/autoplay and ZERO saves.
- Source8b3995f, [PR #29](https://github.com/janisp123/language-learning-app/pull/29) MERGED at eed6e9dba3fd2a5bd42d4c57eeb646a3c815e231. Source CI45244251413, main CI45244458566 and Pages45244458557 succeeded.48Node/41Python local checks; Chromium14×100 plus original-course access, audio/session/layout/zero-storage;268 new clips decode;2040 protected old clips unchanged. Independent review issues fixed and cleared.
- Verified HTTPS downloads of actual live app and landing match checked source exactly. App26,166,776 bytes, SHA2569ef61fb215c644a2858d95b509af31ba6e6206f6f8f584538a016c91c998325d. [Live receipt](delivery/2026-11-23-focused-live.json). Direct live headless navigation had an environment certificate-trust error; no TLS bypass. Actual app bytes were browser-tested locally and read back through verified HTTPS.
- Website EN/RU/LV description/metadata, README and direct offline download now match focused courses. GitHub About metadata update returned403 (integration lacks permission); its old description remains. Optional owner manual action:repository About gear→Description; use “Focused100-item Kids and Adults courses for Latvian,Russian,English and English-to-Japanese, with pronunciation and zero saved progress.” Homepage already correct.
- First greeting/ambiguous-choice correction PR #27 merged/deployed0.4.13 before this slice. Design/plan PR #28 merged3bc78a9. Audit/library PR #26 merged. Do not repeat design/implementation for these delivered slices.

## Next bounded work — L-010 reading aids

Reading-guide PR #21 remains OPEN/UNMERGED and was not imported in0.5.0. The public app currently has no per-symbol/source-letter reading aids. Reconcile the existing modules against latest main, preserve current task/protocol and focused courses, apply the exactこんにちは ko/n/ni/chi/wa patch (finalは contextualwa), then add guide coverage for selected focused utterances/variants. Keep readings only lv-ru (Latvian letters),ru-en (Cyrillic),en-ja (per-symbol romaji and contextual kana/kanji notes); other four unannotated. Never use old source/translations/recordings from held #21 to overwrite current main.

Use the existing loader/view/rendering code; no new learning engine. Test complete selected text/ID/audio/guide bindings and all course switches, mobile/dark/keyboard, no grading from speakers,500ms and zero saves. Publish a checked slice under the owner’s standing live-website request once verified, not by blindly merging old #21. Update live receipt and compare actual hosted bytes. Legacy510 remains available.

Other L-011 commonness/context recommendations, fluent-human review and physical-device/full-accessibility checks remain pending. Technical tests do not prove every expression optimal or conversational fluency. Preserve the older held0.4.12 Drive file; website offline download is current0.5.0 and no Drive replacement was made.

Canonical active tasks: docs/TD_LIST.md. Completed L-012 task history is preserved in docs/history/L-012-completed-2026-11-23.md. Current code checkout /workspace/work/focused-courses is on docs/focused-live-receipt from main eed6e9d; read actual latest main/PRs on resume. This handoff changes docs only and must not be mistaken for a new product release.
