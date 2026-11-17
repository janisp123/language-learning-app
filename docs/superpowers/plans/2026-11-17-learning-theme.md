# Carry dark mode into learning

Owner reports landing dark mode is lost on entering learning. Root cause: two separate documents, and the learning page has neither dark styles nor a theme control. Preserve the explicit zero-saves rule.

Use a one-use navigation fragment on landing Learn links only while dark mode is active. The learning document consumes and removes that fragment in its head before rendering, keeping theme solely in DOM memory afterward; reload of the cleaned URL starts light and lesson1. No storage APIs, saved history state, cookies, preferences or engine changes. Add a source-localized learning header toggle and dark styling for setup/practice/feedback/completion/audio controls. Theme changes must not cancel answers/audio, grade or reset progress.

- Observe failing real-browser landing→learning regression, then implement minimal handoff/toggle/style changes and required localized UI message contract.
- Verify all source UI languages, live learning/answer transition/restart/direction/completion, 320/1280px light/dark layout, cleaned URL, zero writes/reload reset, Japanese audio unaffected; full suites and independent review.
- Build0.4.10, push source/checked PR before Drive replacement and exact download equality. Checked integration/publication requires repository authorization; verify hosted bytes and end-to-end flow.
