# A free version that is useful on its own

## Available in this build

The free learner can start immediately, without an account, card, wallet, payment, trial countdown, or simulated checkout.

- Nine original foundation lessons: three each for NCLEX-RN learners, midwifery learners, and public-health learners.
- Twelve original multiple-choice questions with answer explanations, path filters, repeated practice, and review of the learner's latest mistakes.
- A personal note for every lesson, saved as the learner types.
- A task planner with optional dates and completion tracking; any lesson can be added from its reading screen.
- Lesson completion, recent practice accuracy, task completion, and note counts.
- A Start/Continue action that chooses the next unfinished lesson.
- Export and restore of learning data through a local JSON backup.
- Keyboard-operable workspace tabs, sticky navigation, mobile layouts, and the existing motion controls.

The question bank is a starter collection, not a large adaptive question bank. Repeated attempts are not capped; saved history keeps the most recent 100 responses. Accuracy is descriptive, not a prediction of examination performance. Planner storage supports 200 local tasks, and each lesson note supports 4,000 characters. These are implementation bounds, not prompts to pay.

## Learning loop

Open a free lesson → explain the idea in a note → mark it complete → practise → read the explanation → revisit a related lesson → add the next study action to the plan.

The free version already supports the complete loop. Paid checkout is a separate preview. It cannot create a genuine paid entitlement or unlock additional production content in this build.

## Upgrade proposition

The planned StudyPass expansion would add depth and breadth: expanded course packs, more original practice scenarios, and structured revision resources. These benefits must actually be produced and reviewed before a paid launch. Prices, access terms, content rights, resource availability, settlement verification, and protected delivery remain production work.

The interface does not claim an existing premium bank, tutor access, certification, cloud sync, examination endorsement, clinical review, learner pass rates, or conversion results. No willingness-to-pay outcome has been measured or guaranteed. The intended reason to upgrade is added learning value after the free experience has established trust.

## Content and sources

Clinical foundation statements are deliberately limited to introductory recognition and communication concepts. Other lessons are original study-skills activities. Sources are linked in the relevant lesson or answer explanation:

- [NCSBN: 2026 NCLEX-RN test plan](https://www.ncsbn.org/publications/2026-nclex-rn-test-plan)
- [WHO: hand-hygiene resources](https://www.who.int/campaigns/world-hand-hygiene-day/key-resources-on-hand-hygiene)
- [WHO: five moments overview](https://www.who.int/publications/m/item/five-moments-for-hand-hygiene)
- [WHO: respectful care](https://www.who.int/teams/maternal-newborn-child-adolescent-health-and-ageing/quality-of-care/respectful-care)
- [WHO: respectful maternal and newborn care](https://www.who.int/publications/b/78409)
- [WHO: health promotion](https://www.who.int/health-topics/health-promotion)
- [WHO: health literacy](https://www.who.int/news-room/fact-sheets/detail/health-literacy)

Checked November 18, 2026. These original adaptations do not reproduce official exam items or claim blueprint completeness. No clinician review has been performed as part of this implementation. Follow approved course material, professional training, and local clinical guidance for practice.

## Data and usability

Free learning data uses a separate browser-storage key from the old checkout-demo records. Old simulated purchases are not required for, and do not gate, the free workspace. The header badge counts actual completed free lessons.

Notes and progress are stored locally, not on a server. They can disappear if browser data is cleared, storage is unavailable, or the learner moves to another browser/device. The interface explains storage status and offers backups. Local storage and exported JSON are not encrypted; study notes should not include patient-identifying information.

Restore explicitly replaces local free-learning data. Imports are size-limited and validated against known lesson/question IDs; answer accuracy is recomputed rather than trusting an imported `correct` flag. Unsupported backup formats are rejected without replacing state.

Source files and the self-contained preview contain the same free library and application. No external APIs or third-party scripts are needed to use the local free tools.
