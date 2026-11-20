# Validation record

## Submission preparation — November 20, 2026

All sixteen automated tests pass with `npm.cmd test` on Windows. The standalone builder completes and parses the combined application script. The README now reports the current test coverage and links to an explicit submission overview. A root `index.html` is generated from the same source as the portable preview for static hosting. Payment status remains simulated; no new blockchain verification is claimed. GitHub publication and hosting status must be verified separately from these local checks.

November 18, 2026 · Node.js v24.21.0 · Windows · Google Chrome.

## Completed

- Seven tests pass: integer ZEC pricing; known-resource enforcement; explicitly demo-only grants; repeated-unlock idempotence; unavailable-lesson rejection; browser-state sanitization; isolated lesson completion.
- `node --check dist/app.mjs`: passes.
- Portable HTML generated successfully and opened directly from disk in Chrome, with no application errors shown in its console at load.
- Desktop hero inspected at a 1366-pixel browser-window width.
- Responsive hero, navigation, and resource collection inspected at a 400-pixel viewport width.
- Checkout UI verified from order review through privacy acknowledgement and simulated unlock.
- Unlocked library entry opened; sample lesson read and marked complete; library updated to one completed sample with a filled progress bar.
- Mobile learning-library menu entry added after review and visually verified.
- Browser left on the self-contained preview's opening desktop screen.
- Native desktop browser used because the browser-extension access host was unavailable. Accessibility-tree extraction was unavailable, so UI checks used screenshots and native interaction.
- Local page and model module returned HTTP 200.

## Limits

No real Zcash payments, wallet connection, merchant settlement verification, secure entitlements, or paid-content delivery exist in this version. Prices and full modules are illustrative. A real mobile device and screen reader have not been tested. Download generation is implemented but the final JSON download was not opened through the browser during this review.

The localhost page's console included a missing favicon and a Chrome DevTools discovery connection blocked by `connect-src 'none'`, plus warnings from browser-extension content scripts. A self-contained favicon was added; the standalone file then loaded with no application console errors. The development server's no-network CSP was retained.

## Spectrum revision checks

- Seven existing state/pricing regression tests pass after the update.
- Revised application and motion-module syntax checks pass. The standalone builder also parses the combined script and verifies that its asset tags were replaced before writing the portable HTML.
- Chrome desktop: new hero palette, gradient pass, resource covers, closing section, and orbital privacy illustration inspected.
- Chrome responsive mode, 400-pixel width: animated privacy diagram and its labels inspected without clipping.
- Chrome Elements panel showed `data-motion-components="68"` and `data-motion-covered="68"` on initial load. This covers the explicitly defined UI component registry, not every DOM node or continuous motion on every element.
- Pause/resume control checked. The final paused-state check confirmed complete, readable course cards and a newly opened checkout dialog.
- A permanent shield outline was added so the tracing animation never removes the base symbol.
- Offscreen and background-tab animation suspension implemented. Performance has not been profiled on a real mobile device.
- Browser left at the refreshed standalone hero with motion enabled. The local file and source ZIP contain the spectrum revision.

## Publication status

## Free-learning revision

- Thirteen tests pass. New checks cover free completion with no paid state, question references/answer keys, unlimited retries, correct recent-mistake tracking, backup round trips, imported-data sanitization, and invalid dates/backup formats.
- Browser: Start free opened the ungated library; an original lesson was read, a QA note saved, the lesson completed, and the lesson added to the planner.
- Practice: selected an answer, checked it, and saw the correct explanation. One saved response was reflected accurately in Progress after reloading.
- Planner: created a task through its form and completed a task. Counts and note/lesson state survived a page reload.
- Backup: Chrome downloaded `succinate-study-backup.json`. Restore of the empty fixture succeeded through the native file picker, clearing only the records created during these QA checks. The final workspace shows a fresh learner state.
- The free workspace was visually checked at desktop and 400-pixel responsive widths. Its browser console showed no application errors.
- Returning to the workspace/reader now resets that dialog's scroll position. The final Start free screen was checked with all free tools available and no payment flow.
- Standalone bundle rebuilt and syntax parsed. Real-device, screen-reader and independent clinical/security reviews remain outstanding.

## Current publication status

A private Sites project was created and its identity retained in `.openai/hosting.json`. Source publication failed because `git.chatgpt-team.site:443` could not be reached. No remote source push or deployment completed. The expected Site URL is not a live demo. Use the verified standalone HTML file for review; the retained project can be retried when repository connectivity is restored.
