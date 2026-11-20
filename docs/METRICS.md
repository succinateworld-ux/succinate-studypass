# StudyPass usage metrics

Open **Usage metrics** in the footer. This dashboard measures newly recorded activity from this browser only. It does not import earlier learning progress as historical traffic, estimate unique people, or combine browsers/devices.

Available: observed tab visits, free-learning activation, lesson openings/completions, practice answers, planner-task creation, upgrade-checkout preview interest, an independent-stage engagement breakdown, UTC daily activity, 7-day/30-day/all-retained reporting, refresh, and aggregate CSV export.

A visit is a browser-tab session reused on reload for up to 30 minutes after recorded activity. The expiry is evaluated at page load. Rates use distinct visits started in the selected window and whether those visits reached an action. Activity totals instead count events occurring in the window. Engagement rows are independent, not a sequential checkout funnel. An upgrade preview is interest, not purchase or revenue. First-time lesson completion records an event; reopening or clicking Complete again does not inflate that completion count.

Data stays in browser storage under `succinate-usage-v1`. Session IDs are random local identifiers. No note contents, question answers, names, wallet addresses, IP addresses, or payment details are captured. The dashboard offers recording pause, clear, and an undo for clear until reload. History retains the latest 10,000 events. Blocked storage falls back to the current page's memory with a visible notice. Counts can be modified by the browser owner and are not independently verified.

This is a local owner-tool preview, not an authenticated administrative service. An app-wide release requires a deployed event collector, durable storage, appropriate visitor disclosure/preferences, owner authentication, ingestion validation/deduplication, and reporting across real sessions. Verified paid conversion additionally requires real merchant payment confirmation. No shared production totals or revenue are claimed here. The existing hosting repository endpoint is still unavailable, so the delivered standalone file remains the review artifact.

Validation: sixteen tests pass, including empty-state accuracy, unique-session engagement, and date-window cohort rules. The dashboard was opened in Chrome and showed one newly observed tab visit with zero activation rather than seeded example data. CSV generation is implemented; its download was not separately verified in this revision.
