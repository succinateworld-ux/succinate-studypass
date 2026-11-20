# Succinate StudyPass — hackathon entry

## Pitch

Succinate StudyPass is SuccinateWorld's free nursing-foundations learning workspace, with a prototype for optional Zcash-funded study packs. Learners can start without an account, wallet, or payment: read original starter lessons, practise with explanations, save notes, plan study sessions, and track progress.

The product aims to make the free experience useful on its own. Optional specialist packs could fund future content, while a Zcash checkout could offer an additional payment choice for learners across borders.

## Delivered in this version

- Nine original starter lessons across nursing, midwifery, and public health.
- Twelve original practice questions with explanations, repeat attempts, and mistake review.
- Browser-local notes, planner, completion history, and validated JSON backup/restore.
- Original animated interface, responsive layouts, reduced-motion support, and a motion pause control.
- Browser-local usage metrics, recording controls, and CSV export. These are not global user counts or revenue.
- A three-step Zcash checkout simulation with explicit demo acknowledgements and receipts that state no payment was sent or verified.
- MIT-licensed source, dependency-free local server, self-contained HTML preview, and sixteen automated tests.

## Zcash integration status

This is an early-stage product and checkout UX prototype. There is no live Zcash integration, on-chain transaction, merchant payment verification, or secure paid-content entitlement in this version. No wallet address, transaction hash, testnet result, paid customer, or revenue is claimed.

The intended next implementation is a merchant-generated shielded payment request with server-side invoice binding and confirmation. Access must remain locked until the merchant verifies destination, amount, order reference, and confirmation status. Client storage must never grant real paid access. An authenticated gateway such as CipherPay is one integration candidate, subject to configuration, privacy review, and end-to-end testnet testing. It is not installed or connected here.

## Run and judge

1. Clone or download the repository.
2. Open `StudyPass-Preview.html` directly in a browser, or use Node.js 22+ and run `npm start`, then visit `http://127.0.0.1:4180`.
3. Run `npm test` for the automated checks. On Windows PowerShell with script execution restricted, use `npm.cmd test`.

No API key, package install, account, or payment is needed to try the free experience.

## 90-second demo walkthrough

| Time | Show | Explain |
| --- | --- | --- |
| 0–12s | Hero, animated pass, motion toggle | StudyPass makes useful learning available before a learner pays. |
| 12–30s | Start free; open a lesson; write a note; complete it | Nine original foundation lessons, notes, and completion work without a wallet. |
| 30–48s | Practice; answer; read the rationale; review mistakes | Learners can repeat practice and use explanations to improve. This is introductory material, not an official exam product. |
| 48–62s | Planner and Progress | A small repeatable loop: learn, practise, review, and plan the next session. |
| 62–74s | Usage metrics | Counts reflect activity in this browser; there are no seeded users or revenue figures. |
| 74–90s | Clearly labelled checkout preview | Optional Zcash study packs are the next stage. This checkout is simulated; merchant verification is still required. |

Use a disposable learner profile for recordings. Do not display private notes, wallet material, or unrelated browser tabs.

## Limitations

Data is stored on the current browser/device; backup files support portability. Metrics are local and editable by the browser owner. Expanded course packs are concepts. The source-linked learning material has not undergone independent clinical review and is not a clinical protocol, complete curriculum, or official examination question bank. Real-device, screen-reader, security, and clinical reviews remain outstanding.

## Submission message

Succinate StudyPass by SuccinateWorld is a free nursing-foundations study workspace with a Zcash checkout UX prototype. The runnable MIT-licensed MVP includes nine original lessons, twelve practice questions, notes, a planner, progress tracking, backups, local usage metrics, and an original animated responsive interface. The free tools require no account or wallet. Zcash payments are explicitly simulated; wallet integration and merchant-side confirmation are planned, not claimed as implemented. Please see the repository README and this demo walkthrough for setup, scope, and verification details.

Before sending, attach the verified public repository URL and any genuinely published demo or recorded walkthrough. This file is preparation material, not evidence of submission or acceptance.
