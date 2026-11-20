# Succinate StudyPass

**Your next chapter, unlocked.** A free nursing-foundations study workspace, animated resource storefront, and optional Zcash checkout concept by SuccinateWorld.

The free learning tools work now: nine original starter lessons, twelve practice questions with explanations and unlimited retries, personal notes, a study planner, progress tracking, and backup export/restore. They require no account, wallet, or checkout. Expanded paid packs are still concepts; payments are simulated, no ZEC is sent, and no payment is verified. Catalog prices for those future packs are illustrative.

Click **Start free** or **My learning**. The learning loop is learn → practise → review mistakes → plan a return. The free version does not depend on completing a simulated payment. See [the free-tier guide](docs/FREE-TIER.md).

## Open the preview

Double-click **StudyPass-Preview.html**. It contains the complete UI, styles, and application code and requires no server or installation. The standalone file was opened and checked in Chrome.

For development, install Node.js 22 or newer and run:

```sh
npm start
```

Open http://127.0.0.1:4180. There are no package dependencies.

```sh
npm test
node build-preview.mjs
```

The second command rebuilds the self-contained HTML preview and the root `index.html` for static hosting from `dist/`. After editing source, regenerate those files to keep all versions consistent.

## Experience

- Editorial hero with a custom CSS foil pass, pointer-responsive 3D rotation, moving reflections, orbital details, and floating status notes.
- Midnight-blue, electric-violet, cyan, and warm-coral visual system, with original typography, illustrations, and course-cover artwork made in HTML/CSS/SVG.
- Animated spectrum banner, component entrances, hover feedback, moving course covers, miniature process illustrations, and responsive layouts.
- Orbital privacy diagram with a permanent shield outline, moving trace, three orbiting markers, rotating arcs, expanding ripples, and a light sweep.
- A shared motion director registers the main page and dynamically created checkout/library/lesson components. Motion includes brief entrances and interaction feedback; body text stays still after entry. Offscreen sections and hidden browser tabs suspend continuous animation.
- Filterable NCLEX-RN, midwifery, and public-health resource concepts.
- Three-step demo checkout: order review → privacy review with explicit demo acknowledgement → simulated unlock.
- Ungated free library with three foundation paths, lesson notes, completion tracking, repeatable practice, a mistake-review list, study tasks, and portable JSON backups.
- A separate checkout preview and clearly labelled free-versus-planned-paid comparison. A paid expansion is not required to keep using the free starter tools.
- Mobile navigation with learning-library access; native dialogs, focus outlines, keyboard dismissal, reduced-motion support, and an explicit pause-motion control.
- No third-party scripts, remote assets, remote analytics, payment requests, sign-in, or API keys. Browser-local usage counters are available through **Usage metrics** in the footer, with pause/clear controls and CSV export; see [metric definitions and limits](docs/METRICS.md).

All downloaded receipts explicitly state `demo: true`, `paymentSent: false`, and `paymentVerified: false`. Browser-local unlocks are demonstrations, **not secure production entitlements**. A visitor can modify browser storage or inspect source. Do not use this implementation to protect paid course content.

## Design references

The user requested online examples as design guides. Research and the original design rationale are documented in [docs/DESIGN.md](docs/DESIGN.md). The interface is original; no reference-site code, images, logos, customer claims, testimonials, or product statistics were copied.

## Verification

See [docs/VALIDATION.md](docs/VALIDATION.md). Sixteen tests cover ungated completion of all free lessons, unlimited retries with bounded saved history, mistake correction, notes/tasks/progress backup round trips, rejection of malformed data, and local metric counts and reporting windows. The free lesson, notes, completion, practice feedback, planner, reload persistence, backup download, and clean restore were checked in Chrome. Desktop and 400-pixel responsive views were inspected.

## Hackathon review

Read [the submission overview and demo walkthrough](docs/SUBMISSION.md). This entry is a working free-learning app and a Zcash checkout UX prototype. It does not yet integrate a Zcash wallet or verify blockchain payments. The intended paid flow and the work needed to make it real are described below; they are not shipped capabilities.

The source-linked nursing foundations are original educational adaptations, not official exam questions, comprehensive test-plan coverage, clinical protocols, or an independently reviewed curriculum. WHO and NCSBN sources were checked on November 18, 2026. SuccinateWorld should review this starter material before using it as a public clinical education offering.

## Production work still required

1. Confirm actual resources, content rights, availability, ZEC prices, and access terms with SuccinateWorld.
2. Configure a merchant-controlled Zcash receiving wallet and a supported shielded payment-request flow.
3. Generate orders and references on the server; verify received amount, currency, destination, order binding, confirmations, duplicates, expiry, and reorg handling through authenticated merchant wallet infrastructure.
4. Issue access only after server-side confirmation. Use durable orders and entitlements, protected resource delivery, appropriate recovery, and refund handling.
5. Document the application privacy model: shielded transfers do not hide an order from its merchant, and hosting/network metadata remains relevant.
6. Test with supported Zcash wallets and a controlled test network before enabling real payments. No Ethereum wallet connection or unsupported WalletConnect claims should be added for appearance.
7. Complete accessibility, real-device, and security review; publish the new MIT-licensed repository, record the demo, and submit before the confirmed bounty deadline.

## Files

```text
dist/index.html       Main presentation, navigation, and dialog containers
dist/styles.css       Responsive visual and motion system
dist/motion.css       Spectrum palette refinements and decorative animation
dist/motion.mjs       Component entrances, motion coverage audit, visibility suspension
dist/learning-data.mjs Nine free lessons, twelve original questions, source references
dist/learning-state.mjs Validated notes, progress, practice, planner and backup operations
dist/learning-app.mjs Free learning workspace and reading/practice/planner screens
dist/learning.css     Responsive free workspace, starter section and plan comparison
dist/app.mjs          Filtering, demo checkout, dialogs, progress, motion
dist/model.mjs        Catalog, integer pricing, validated demo-state changes
server.mjs            Localhost server with an asset allowlist
build-preview.mjs     Generates the standalone HTML
StudyPass-Preview.html Complete portable preview
test/model.test.mjs   State validation, pricing, unlock and access regression checks
docs/                 Design rationale, validation, and submission direction
```

## License

MIT. Proposed visual identity and catalog concepts are for SuccinateWorld's review. No examination body or Zcash organization endorsement is implied.
