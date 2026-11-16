# Browser test-build publication

The owner-requested landing page was integrated via PR #5. This branch adds a real browser test app, generated from canonical data and engine/UI source; see [test-build instructions](../BROWSER_TEST_BUILD.md).

The ordinary checks workflow runs engine/content/UI-wiring and packaging tests and uploads the standalone HTML artifact. The committed `downloads/language-learning-test.html` is an immediate offline testing route without hosting.

The manual Pages workflow stages only:
- `index.html`: the static landing page with a link to the test app.
- `learn/index.html`: the generated self-contained browser app.
- `language-learning-test.html`: the exact same generated app bytes for download.

No docs tree, tests, source repository metadata or private files enter the Pages artifact. There are no remote runtime dependencies or saved browser progress. The landing page remains script-free; JavaScript in the app performs learning interactions locally.

## Publish only when authorized

1. Review/merge the browser test-build PR with owner authorization.
2. Owner enables GitHub Actions in Settings → Pages. The workflow uses `enablement: false` and does not enable hosting.
3. Manually run the Pages workflow on main; merge alone does not deploy. It tests and packages the app before upload/deployment.
4. Read the actual URL from the deployment result and verify the real landing, `learn/` route and downloaded HTML. Confirm deployed app/download bytes match the checked source build.
5. Test narrow/desktop layout, keyboard/screen-reader/zoom, both directions and refresh reset in an actual browser. Record unrun physical-device and language-review checks separately.
6. Only then describe a hosted URL as live or add a canonical. No live URL, indexing result or Android release is claimed by this branch.

## Current limits

The downloadable HTML is prepared for testing. Automated tests are recorded in the browser-build guide. Managed browser tooling is unavailable, so real browser rendering/interaction, physical devices, deployment and public HTTPS checks remain NOT RUN. Draft course content needs fluent human review. A testable file is not evidence of public release readiness.
