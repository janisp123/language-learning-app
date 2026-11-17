# Speaker-only interaction highlight

Owner requests that activating an answer speaker turns only its speaker cell green, without outlining/highlighting the answer text or grading.

Root cause: answer-option:focus-within outlined the whole row. Remove the shared row focus outline; apply green focus/active styling and a visible inset keyboard outline to the independent speaker button only. Preserve answer-button keyboard focus, correct/incorrect grading styles, all audio behavior, 500 ms transitions, theme continuity and zero saves.

A mobile/touch browser regression first reproduced the whole-row outline, then verifies row outline none, unchanged answer background, green speaker cell, clearing the previous speaker highlight and visible keyboard focus. Check light/dark at320/390/1280px, replay without progress changes, full Node/Python suites and canonical site/download parity. Build0.4.11; push verified source/PR before stable Drive upload and exact download readback. Publish only through checked authorized integration.
