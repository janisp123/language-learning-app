# Fix missing Japanese answer audio

The disabled Japanese answer speakers are caused by absent clips, not click/grade wiring. Owner reported the missing sound and authorized fixing it. Add exactly one bundled Japanese recording for each existing Japanese translation (510 clips), preserve all original 1,530 recordings and every translation/ID/binding. Reuse the existing cancellable player and independent answer buttons; no runtime synthesis/network or new directions/storage.

- Add failing full Japanese coverage/playback regressions and require all source and target languages under all-phrases audio coverage.
- Generate Japanese MP3 assets through the existing optional authoring provider, validate decoding/hashes and exact translation bindings, register provenance. Probe provider before bulk generation, preserve partial successful work if interrupted.
- Build 0.4.9; test all original seven directions and Japanese answer speakers, zero grading/timing changes, browser decoding for all clips and original-byte preservation. Independent review; source push/CI, Drive upload/download equality, then checked publication within owner authorization.
