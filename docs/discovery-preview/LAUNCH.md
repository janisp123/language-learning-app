# Language landing page

**Prepared by:** Codex, 2026-11-16, at the owner's explicit request.  
**Scope:** L-004 landing-page slice only; browser learning, Android and publication are not completed.  
**Source baseline:** `ae1be9361eb26dba0cdbe08eeb154172880a441d`.

## Structure and design

Like the mental-health project's delivery structure, `index.html` is a self-contained static landing page in `docs/discovery-preview/`. It uses semantic HTML, inline CSS, system fonts and no JavaScript, dependencies, forms, tracking or storage. The language-app repository is its sole source; nothing in the mental-health repository is modified or copied as product content.

The page uses a warm paper background, forest-green typography and illustrative phrase cards. Navigation leads to the approach, ten planned themes and availability. Native HTML disclosure elements provide the FAQ. Real actions are page anchors and the repository link. Browser/Android availability is plain status text, not dead buttons or invented download links. The page has no final brand-name claim, fake testimonials or invented release dates.

All application capabilities are labelled as planned. The illustrative phrase pair is not a reviewed lesson pack. No architecture dependency is selected or learning algorithm implemented here. This isolated page can be reviewed before L-001–L-003 are integrated; it does not satisfy the full L-004 acceptance criteria or authorize starting dependent learning work.

## Review and publication

1. Review the HTML in a browser, including narrow/desktop widths, keyboard focus, FAQ controls, 200% zoom and contrast. Local file opening requires no server or build. GitHub's source viewer does not render the page as a website.
2. Obtain owner authorization to merge and publish. Merging the prepared workflow does **not** deploy; it supports manual dispatch only, restricted to main. No workflow run is started by this task.
3. After publication is authorized, an owner enables GitHub Actions under repository Settings → Pages. `configure-pages` uses `enablement: false`; the workflow does not enable hosting or change account settings.
4. Run **Publish approved language landing page** on main. It uploads only `dist/landing/index.html`, copied from this source. Do not publish the entire docs tree. Set any desired deployment approval in the `github-pages` environment before dispatch.
5. Read the actual URL from the deployment result; verify HTTPS, content, links and mobile/desktop behavior at that URL. Only then announce it as live or add a canonical based on that verified destination. No canonical, sitemap, indexing or live URL is claimed by this preparation task.

The workflow follows the reference project's established official Actions versions. No changes to that project's workflows or its existing publication are made. Hosting request handling is distinct from app progress storage.

## Verification boundary

Source checks cover HTML structure, unique IDs, valid fragment destinations, exactly ten themes, semantic language labels, no scripts/forms/remote assets/storage, and the workflow's manual-only trigger and isolated artifact. GitHub commit readback and PR scope are checked before handoff.

Managed browser QA is unavailable in this environment because `cua_repl.js` is absent. Browser rendering, keyboard interaction, zoom, actual device use, public Pages deployment and live URL verification are **NOT RUN**; source inspection is not a substitute. No alternate browser-control path or preview server was started.

**Next:** owner reviews the landing-page PR. L-004 remains active until the actual browser learning dependencies, implementation and full verification are completed.
