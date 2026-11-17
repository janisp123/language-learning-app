# GitHub Pages publication

The website uses the same GitHub Pages delivery pattern as the mental-health test: a landing page, an online-open action and a stable Drive-folder download action. The app is built from canonical content and the same builder as the verified offline copy.

## Artifact

- index.html: the landing page.
- learn/index.html: the complete self-contained browser app with all 1,500 pronunciation clips.
- language-learning-test.html: identical app bytes retained for parity/direct technical checks.

The public download button points to the default Drive folder. No source tree, tests, private files or Git metadata enter the published artifact. Learning state is browser memory only.

## Account step

In repository Settings → Pages → Build and deployment, choose Source: GitHub Actions. The GitHub connector does not expose this admin setting. The publishing workflow keeps configure-pages enablement false and preserves the selected repository access.

## Publishing

The Publish language app website workflow runs on approved main-branch changes to site/app sources and delivery records, and can also be dispatched manually on main. It runs tests, stages the isolated artifact and deploys through GitHub Pages. A feature branch push cannot deploy.

After the source PR is merged, follow that existing workflow run. If it failed because Pages was not enabled yet, enable the Source setting and rerun only failed jobs. Avoid redundant deployments. Read the actual page_url/deployment result; a merge or successful build is not proof of a live site.

Verify the public landing page, Learn action, language/direction selection and pronunciation. Download/read back the hosted learn/index.html and compare its SHA-256 with docs/delivery/2026-11-17-english-complete-drive-sync.json. Physical-phone and fluent pronunciation checks remain separate.

## Current status

Owner requested website publication on 2026-11-17. Source synchronization recovered; publishing preparation uses build 0.4.3 with all languages/audio. Actual deployment and public URL verification remain pending until recorded in the current checkpoint.
