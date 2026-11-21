# Succinate StudyPass

**Your next chapter, unlocked.** SuccinateWorld's free nursing-foundations workspace, with a server-backed Zcash testnet checkout implementation.

**Live app: https://succinate-studypass.onrender.com. Merchant setup, hosted deployment, real invoice creation, payment broadcast, and receipt of the exact amount in the merchant wallet have been verified. CipherPay still reports pending with zero received; automatic gateway confirmation, workbook unlock, and receipt verification remain blocked. Do not send mainnet funds.** The public GitHub Pages version originally submitted was a simulated checkout prototype. Read [the payment integration record](docs/PAYMENTS.md) for exact scope and completion evidence.

## Use the free app

Nine original starter lessons, twelve practice questions with explanations and unlimited retries, personal notes, a study planner, progress tracking, mistake review, and validated JSON backup/restore. No account, wallet, or checkout is required. Data stays in your browser unless you export it. Browser-local usage metrics have recording controls and CSV export; they are not global users, purchases, or revenue.

The source-linked introductory material is not an official exam question bank, clinical protocol, complete curriculum, or independently reviewed clinical course. No exam outcomes are promised. Expanded clinical packs remain planned and cannot be purchased.

## Hosted source package

The root Dockerfile deploys the current v0.2 source in StudyPass-runtime.tar.gz. Extract that archive into an empty directory to inspect or run the hosted version; older static prototype files remain in this repository.

```sh
mkdir StudyPass-v02
tar -xzf StudyPass-runtime.tar.gz -C StudyPass-v02
cd StudyPass-v02
```

## Run

Use Node.js 24 or newer. No package installation is needed.

```sh
npm start
```

Open http://127.0.0.1:4180. Without payment environment settings the free app works and checkout is explicitly unavailable. Windows PowerShell users with script execution restricted can run `npm.cmd start`.

```sh
npm test
npm run build
```

Thirty-four automated tests cover the free workspace, local metrics, legacy demo-state handling, payment binding and encrypted capabilities, locked fulfillment, malformed provider data, underpayment, expiry, wrong network, refunds, and provider outages. Payment tests use an isolated stub gateway and do not prove an on-chain transaction. The builder parses and embeds the frontend into `StudyPass-Preview.html` and root `index.html`.

You can open the standalone file for free learning. It cannot verify payments. The root `index.html` supports static hosting, including GitHub Pages; a static host cannot run the payment API.

## Zcash testnet checkout

[Setup, architecture, limitations, and completion evidence](docs/PAYMENTS.md).

The optional **Focus Workbook** is an actual original planning resource with a seven-session planner, reasoning journal, mistake-review guide, and weekly reflection. The server requests a $1 USD quote converted to test ZEC. Testnet coins have no monetary value; this is not a real-money sale. The workbook is MIT licensed and included in the repository for audit, so it is not commercially exclusive content or DRM.

The server creates an invoice through the merchant's configured CipherPay testnet API. An encrypted order key binds its product, destination, memo, integer amount, network, and invoice. Each status/download request reads the invoice again. Only a fully paid, confirmed invoice with a valid transaction ID and confirmation timestamp can download the workbook or testnet receipt. Detection alone, browser storage edits, and client-provided prices never grant access. Underpayments require merchant review, not resending the full request. Mainnet configuration is rejected.

Configure the ignored `.env` from [.env.example](.env.example), or use your host's secret environment settings. Never commit credentials. StudyPass does not need a seed phrase, spending key, or viewing key. The gateway's merchant setup may require a UFVK; sharing that read-only payment visibility requires the wallet owner's deliberate setup.

A Node host with HTTPS, server secrets, and outbound HTTPS is required. [render.yaml](render.yaml) is a deployment blueprint, not a claim that a backend is deployed. Hosted gateway compatibility, real wallet interoperability, actual blockchain confirmation, and live fulfillment remain unverified. Verification trusts the gateway's scanner and confirmation policy; StudyPass does not independently run a Zcash node or detect reorganizations.

## Design and privacy

Original midnight-blue, violet, cyan, and coral interface with CSS/SVG pass artwork, orbital shield animation, component entrances and interaction feedback, offscreen suspension, a motion pause control, and reduced-motion support. References and design rationale are in [DESIGN.md](docs/DESIGN.md).

Free learning data and local metrics stay in this browser. The payment server talks to the gateway; the merchant and gateway can associate an invoice with a payment, and hosting/network providers can observe metadata. The order key is a private bearer credential stored in the current tab; its private backup supports restore. It expires after 30 days and depends on provider invoice retention. No account-based recovery is implemented. No seed/spending keys are ever requested.

## Project files

- `dist/`: free learning app, checkout client, animation and styles.
- `server.mjs`: allowlisted static files and private payment API.
- `payments.mjs`: CipherPay adapter, quote binding, encrypted order keys, verification.
- `resources/focus-workbook.md`: actual fulfillment document; not served as a public app asset.
- `test/`: 33 automated checks; gateway fixtures are test-only.
- `build-preview.mjs`: self-contained static preview generator.
- `docs/`: product notes, historical QA, original submission, payment setup and verification status.

## Hackathon status

The original early-stage entry was posted to the Zcash India Telegram group with payment simulation explicitly disclosed. That sending is recorded in [SUBMISSION-RECORD.md](docs/SUBMISSION-RECORD.md); organizer acceptance and prize eligibility have not been confirmed. The new payment implementation must not be announced as complete until real testnet evidence exists. The old [submission write-up](docs/SUBMISSION.md) describes the originally submitted version; current integration status is [PAYMENTS.md](docs/PAYMENTS.md).

## License

MIT. No examination body, payment provider, or Zcash organization endorsement is implied.
