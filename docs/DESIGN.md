# Design direction — Succinate StudyPass

Research and implementation date: November 18, 2026.

## Brief

Create a memorable, animated Web3 interface for a nursing education checkout under SuccinateWorld. The user selected StudyPass after brand-led ideation and requested online references, dynamic visual design, and strong competition presentation.

The existing local brand reference associates Nurse Succinate and NurseBridge with nursing and midwifery education, professional green, white, and dark green, and “Learn. Practise. Prepare. Progress.” This project proposes a related StudyPass visual direction; it does not claim that its palette or monogram is an existing official identity.

## Online references consulted

| Reference | Useful principle | How StudyPass applies it |
| --- | --- | --- |
| [Family](https://family.co/) | Friendly wallet presentation, human-readable activity, clear onboarding, deliberate interaction detail | Plain-language checkout stages, small feedback moments, readable privacy review |
| [Aave](https://aave.com/) | Clear product sections and concrete interface examples | Distinct collection, process, privacy, FAQ, and final invitation sections |
| [Linear](https://linear.app/) | Product-led storytelling and detailed interface presentation | Real interactive product flow inside an editorial landing experience |
| [Rainbow](https://rainbow.me/) | Approachable consumer language around crypto | Low-jargon CTAs and visible next actions |
| [Phantom](https://phantom.com/) | Direct navigation and clear product/security paths | Fast route to discovery, demo checkout, and learning access |

Awwwards listings were searched, but the attempted Family and Phantom listing URLs could not be fetched. No Awwwards recognition is claimed for this prototype or the particular reference pages. Online content was retrieved as reference material; the implementation was visually reviewed in the local browser. Reference-site animations were not recorded or measured.

Zcash privacy explanations are grounded in the official [shielded and transparent Zcash overview](https://z.cash/learn/what-is-the-difference-between-shielded-and-transparent-zcash/). StudyPass remains a simulated payment interface.

## Current visual identity — Spectrum revision

- Midnight blue `#0B1024`: primary background, replacing the original green direction at the user's request.
- Deep navy `#070B19`: backdrop and contrast.
- Soft ivory `#F5F2FF`: a readable pause between dark product sections.
- Electric violet `#BDA5FF`, cyan `#7EEAFF`, and warm coral `#FFAD97`: foil highlights, controls, orbits, and moving gradients.
- Cyan, lilac, and peach resource covers distinguish the three learning tracks.
- Large clean sans-serif headlines with italic serif accents; system fonts avoid external requests.
- Original typographic wordmark and currency-inspired S monogram. These are proposals for brand review.

## Motion system

The user requested motion across at least 95% of the experience, specifically highlighting the privacy diagram. The revised system registers 68 defined UI component groups at initial load; all 68 were confirmed registered through Chrome's rendered HTML attributes. This is 100% coverage of that **defined component registry**, not a claim that 95% of all HTML elements animate continuously. Dynamically added checkout, library, and lesson components are registered by a MutationObserver. Text uses short entrance transitions and then remains still for reading; decorative artwork uses continuous movement.

The privacy diagram now includes three orbiting markers, rotating arcs, two expanding waves, a sweeping light, floating labels, a breathing core, a permanent shield outline, an animated highlight tracing its outline, and a drawing checkmark. The permanent outline preserves the symbol throughout the animation. Navigation, course covers, process miniatures, buttons, progress lines, FAQ expansion, and closing artwork also have appropriate entrance, interaction, or decorative motion.

Offscreen sections and hidden browser tabs suspend continuous animation. Manual pause settles active entrance transitions and exposes waiting content. Reduced-motion preferences disable motion and preserve the complete visible interface. A pause-mode visibility conflict inherited from the original card/dialog CSS was fixed and verified in Chrome.

The main visual is an original CSS study-pass object, rather than a stock token image. An independently floating wrapper surrounds a pointer-responsive tilt layer, keeping the card movement from conflicting with the pointer effect. Orbital lines, restrained light sweeps, and offset status notes create depth. Other movement includes one continuously travelling banner, slow ambient light, short card transitions, section reveals, and dialog transitions.

`prefers-reduced-motion` disables animation, and the footer pause control offers a manual alternative. Content remains visible when JavaScript or IntersectionObserver is unavailable. No scroll hijacking, cursor replacement, autoplay sound, strobe effects, or fake transaction-count tickers are used.

## Experience and trust

Primary task: discover a resource and understand the proposed ZEC checkout. Secondary task: return to an unlocked sample. Checkout tells the visitor precisely what is simulated and distinguishes a demo receipt from a payment confirmation. Its privacy review distinguishes the public ledger, payment recipient, and local demo application.

No fabricated learners, revenue, exam pass rates, testimonials, regulator endorsements, or blockchain integrations appear in the design. Course names and prices are labelled concepts. One non-clinical learning-skills sample demonstrates the delivery experience without pretending that a complete course exists.

## Suggested competition recording

1. Start with the animated spectrum hero and floating foil pass.
2. Scroll through the gradient band to the three resource concepts.
3. Explain how this fits SuccinateWorld's nursing audience.
4. Open a pass and walk through order/price and privacy review.
5. Clearly state that payment is simulated in the current UI prototype.
6. Unlock, enter the library, open the sample, and complete it.
7. Show the mobile menu and resource layout.
8. End with the real next milestone: merchant wallet verification and protected delivery.

Polish helps presentation; a competition-ready functional entry still needs genuine Zcash integration and the required public source/demo materials. This design does not guarantee a prize.
