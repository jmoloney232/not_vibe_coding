# ANTI_VIBE_CODING_UI.md

**A durable standard, checklist, and self-review framework for AI agents building websites and web applications.**

This file is written for AI coding agents. Read it before designing or styling any UI, and re-consult specific sections during implementation. It assumes no prior context: if you are an agent who has never seen this project before, this file is sufficient to act on.

Normative language used throughout:

| Term | Meaning |
|---|---|
| **MUST** | A requirement. Violate only with an explicit, documented reason and user awareness. |
| **SHOULD** | A strong default. Deviate when the product genuinely requires it, and be able to say why. |
| **MAY** | Optional; a legitimate technique to consider, not an obligation. |
| **AVOID** | A recurring failure pattern. Treat its presence as a signal to inspect, not an automatic ban — see §4 and Governing Principle 4. |
| **EXCEPTION** | A deliberate, documented departure from a MUST/SHOULD rule. Write down the rule, the reason, and the tradeoff. |

---

## 0. Governing Quality Principles (read first, apply always)

These take precedence over every rule below them. When a lower-level rule in this document seems to conflict with these, follow these. Each is numbered below because later sections cite it by number ("Governing Principle 7," etc.) — those citations always refer to the numbered list in this paragraph (1 through 11), never to the priority tiers immediately below, which are deliberately labeled with letters instead of numbers to avoid confusion between the two lists.

**1. Priority order.** Evaluate and design in these tiers, highest first. A lower tier cannot justify failing a higher one — but tiers are not a strict veto chain for every micro-tradeoff; a negligible cost at a higher tier (e.g., a few milliseconds of performance) is not automatically worth sacrificing a real gain at a lower tier (e.g., meaningfully better long-term maintainability) — the ordering matters most when tiers are genuinely in tension, not for every small tradeoff:

- **Tier A** — Task completion and functional correctness
- **Tier B** — User safety, accessibility, and accurate communication
- **Tier C** — Information architecture and interaction clarity
- **Tier D** — Content, state, and responsive resilience
- **Tier E** — Performance and visual stability
- **Tier F** — System consistency and maintainability
- **Tier G** — Product-specific visual identity
- **Tier H** — Decorative refinement and novelty

A beautiful interface that doesn't let the user finish their task is not a success. A consistent design system that shows wrong information is not a success. A distinctive brand look that fails a screen-reader user is not a success.

**2. Evidence hierarchy.** Not all guidance in this file carries equal weight. Every non-trivial recommendation below is implicitly tagged as one of:

- **Standard-backed requirement** — traceable to WCAG, HTML/ARIA specs, or platform accessibility guidelines.
- **Evidence-backed product recommendation** — supported by a specific product's user research, analytics, or observed workflow (only applicable when you have such evidence for the product you're building).
- **Widely accepted professional default** — appears consistently across multiple independent, credible design systems and practitioner sources.
- **Context-dependent heuristic** — reasonable in most cases, but its correctness depends on product type, and exceptions are common.
- **Temporary visual trend** — currently popular, not load-bearing; expect it to age.
- **Author/community opinion** — one credible voice's take, useful as a hypothesis, not proof.

When you cite a rule to justify a decision (to yourself, in a comment, or to the user), know which of these six categories it belongs to. Do not present a subjective preference as an objective usability fact.

**3. Limits of AI self-evaluation.** Distinguish what you can actually verify:

- **Automated verification** (you can check this directly): contrast ratios, missing accessible names, DOM overflow, console errors, failing tests, broken links, invalid markup, layout-shift metrics.
- **Heuristic evaluation** (you can flag this as *likely*, not proven): weak hierarchy, generic composition, excessive decoration, unclear affordances, inconsistent behavior.
- **Product-evidence evaluation** (requires real data you may not have): whether a workflow matches how users actually work, whether a metric matters to a real decision.
- **User validation** (requires an actual human): whether the interface is *usable* by representative users attempting real tasks.

**The aesthetic-usability effect applies to your own review, not just to end users.** A well-documented HCI finding (Kurosu & Kashimura, 1995, Hitachi Design Center — the original ATM-interface study; corroborated since by Nielsen Norman Group and subsequent discussion) is that people rate visually attractive interfaces as more usable than they actually are. The sources reviewed for this document consistently describe the effect as strongest for problems that aren't immediately obvious (an outright crash or a fully broken flow is unlikely to be masked by good looks) — but the precise boundary of what counts as "minor" versus "major," and how long the effect persists under repeated use, is described qualitatively across sources rather than pinned down by a single precise threshold this document can cite with confidence. The practical takeaway is not a sharp line, but a caution: a screenshot that looks clean and polished is weaker evidence the underlying workflow is easy to use than it feels like it should be, including when you are the one judging your own screenshot. Do not let "this looks well-designed" substitute for "I traced the actual task and it worked smoothly" (§18's route-continuity check exists specifically to force the second, harder check).

An AI self-review is heuristic evaluation, not user validation, and MUST NOT be described as proof that an interface is usable — this applies to an agent evaluating its own UI work, and equally to an agent evaluating this document itself (see Appendix E, the independent-review log this document keeps on itself). When you lack user research, analytics, or product evidence, say so explicitly: state the assumption, why it matters, and what would confirm or disprove it. Never invent user quotes, personas, analytics figures, or research findings to make a design decision sound validated.

**4. Diagnostic signals, not style bans.** Cards, gradients, big headings, centered layouts, dark themes, outline icons, shadows, animation, and rounded corners are not defects by themselves. They become signals of a "vibe coded" result when they are unjustified by the product, used at high frequency, applied indiscriminately, competing visually with the primary task, inherited untouched from a library default, combined into a generic template shape, inconsistent with the rest of the interface, or added without a stated usability/communication/brand purpose. Every pattern entry in §4 explains both the misuse and the legitimate use — this document does not ask you to design conservatively, it asks you to design *on purpose*.

**Restraint is not automatically correct — bland is a failure mode too, not the safe default.** Industry commentary independently converges on a specific, opposite complaint about the current SaaS landscape: widespread "copy-paste minimalism" — flat neutral palettes, generic sans-serif type, interchangeable layouts — makes even genuinely strong products forgettable, because users "remember functional flows but forget which brand delivered them if everything looks and sounds the same." This document's emphasis on restraint (Priority Tier H putting decorative novelty last, muted palettes recommended for dense/internal tools) is about removing *unjustified* decoration, not about defaulting every product toward the same safe, personality-free look — that would just trade one homogenized aesthetic (AI-slop maximalism) for another (algorithm-safe minimalism), and independent critique explicitly names this second failure mode too.

This document repeatedly cites Stripe, Linear, and Vercel as evidence that concentrated, consistent distinctiveness beats uniform restraint (each commits hard to one or two signatures — Stripe's editorial light-weight type and shifting gradient, Linear's owned purple, Vercel's stark black-and-white — while staying disciplined everywhere else). Treat that as *one illustration of the underlying principle*, not as the template to imitate: these three happen to share a restrained-SaaS aesthetic family, and if every product read this document and converged on "one owned accent, otherwise minimal" as the definition of distinctiveness, that would itself become a new homogenized target, just a smaller and more tasteful one. The underlying principle is broader than these three examples: a product's genuine distinctiveness can equally be loud, maximalist, playful, or built on breaking its own visual patterns on purpose (a brand whose personality *is* unpredictability) — Tier G (product-specific visual identity) does not require Tier F-style internal consistency to be legitimate, provided the inconsistency itself is the deliberate, stated choice (answerable under §2) rather than an accident of not having a system at all. What makes Stripe/Linear/Vercel useful examples is that they're well-documented and easy to point to, not that restrained-SaaS-with-one-accent is the only valid shape distinctiveness can take — see the Blandness Test (§20) and the worked branded-product simulation in Appendix D.

**Restraint has two distinct causes, and only one of them is legitimate — and getting this wrong has a real, documented cost, not just a theoretical one.** Restraint chosen *for a stated, verifiable product reason* (GOV.UK's design system won the Design Museum's Design of the Year specifically for restraint built on "user need and convenience... not the needs of government" — research/CALIBRATION_CORPUS.md #1) is a different act from restraint chosen *defensively* — removing a distinctive element specifically because it might read as decoration, with no independent product reason for the removal. The two can look pixel-identical and are not distinguishable by inspecting the resulting tokens; they are only distinguishable by asking why the restraint was chosen. Defensive restraint is not a safe default: Cracker Barrel's 2025 rebrand, a real and recent case, replaced a distinctive mark with a safer, more minimal one and lost roughly $100M in market cap within 48 hours to backlash explicitly using the words "generic," "soulless," and "bland," with the CEO stepping down about a year later over the same incident (research/RESEARCH_REPORT.md §6b, sourced to CNBC, Creative Bloq, and a 24/7 Wall St. follow-up dated two days before this principle was written). Craigslist is the matched positive-and-different case: visually plain by any conventional measure, but its plainness is instrumented to a specific, real usability tradeoff for its actual users, not a defensive move — which is why it reads as authored-and-successful rather than generic, despite looking, by conventional standards, worse than either the GOV.UK or Cracker Barrel examples. Before applying any restraint-motivated cut, state the specific product reason; "this might look AI-generated/decorative" is not itself a product reason and, applied on its own, is exactly the defensive move this note warns against.

**5. Required product evidence brief.** Before recommending significant visual or structural decisions, record what you actually know versus assume: confirmed user needs vs. assumed ones, available research/analytics, primary tasks and their frequency/urgency, user expertise, data/content characteristics, failure consequences, accessibility considerations, brand and technical constraints, existing product conventions, and open unknowns needing validation. §3's product-brief template is this principle in operational form — fill it out before substantial styling begins. If you identify reference interfaces for inspiration, name the exact attribute you're studying from each (density, table behavior, navigation, onboarding structure) rather than importing an entire visual style because the reference is well-regarded.

**6. Observable acceptance criteria.** Every major rule in this file is written so it can be checked by one of: a direct inspection question, an automated test, a manual test, a screenshot comparison, a measurable performance condition, or a documented rationale. If you find yourself justifying a decision with "looks professional," "feels premium," "feels modern," or "has good vibes," stop and restate it as an observable condition (see §2 and §20 for the technique).

**7. Must-pass completion gates.** A numeric score (§21) never overrides §23's gate list. Gates fail the work regardless of how high anything else scores.

**8. Performance and perceived quality.** Performance is part of UI quality, evaluated alongside everything else in this document, not filed separately as a backend concern. See §15 for the full standard (loading, responsiveness, visual stability, large-collection handling, optimistic updates, duplicate-submission prevention) and Core Web Vitals as a starting measurement.

**9. Independent review.** A self-review by the same agent that built the UI is a weaker check than review by an independent context (a fresh agent session, a different reviewer, or a human) — not because the builder is careless, but structurally: the agent that made a choice is the least likely to notice its own unexamined default. Where an independent reviewer is genuinely unavailable, self-review is still better than none, but MUST be labeled as self-assessed rather than presented with the same confidence as an independently-confirmed result (see §23's note on self-graded confidence).

The trigger for seeking independent review MUST be an objective condition — work reaching production, work a real user will see, work being merged, or exceeding the exception-count gate in §23 — and MUST NOT be "whenever I would self-score this Strong or better," because that trigger is circular: an agent can simply self-score low enough to avoid ever needing a second opinion, satisfying the letter of this principle while never actually obtaining one. "Where feasible" is not an excuse to skip this by default whenever an independent reviewer is *technically* obtainable (a second agent invocation, a colleague, the user).

**A second AI agent is a real but limited form of independence.** It reliably catches mechanical and structural defects a same-author self-check misses (a numbering collision, a broken cross-reference, an internally contradictory rule) — this has happened in practice during this document's own revision history (see Appendix E). It is a much weaker check for taste-based or subjective claims specifically, because a second AI agent likely shares correlated training-derived aesthetic priors with the first (the same admiration for the same widely-discussed reference products, the same generic-copy-avoidance vocabulary) — two similarly-trained models agreeing is not the same evidentiary event as an independent human, or a real user, disagreeing. Use AI-agent review routinely for mechanical/structural correctness; treat it as a hypothesis-generator rather than a settled verdict for claims about what looks distinctive, tasteful, or well-branded, and prefer human or real-user input specifically for those claims when it's available at all.

**This is not a one-time risk — it is this project's single most-repeated failure, documented independently three separate times.** `CLAUDE_DESIGN_DEFAULTS.md` Default 1 traces the identical failure shape recurring across three unrelated rounds of this same project's own work: a same-author review defending the shadcn-default button and cliché negative-tracking headings (an early round); two blind reviewers independently catching the corner-bracket device this principle's own opening paragraph describes, after a same-author review had defended it with a coherent rationale; and a blind subagent review catching a real timestamp-drift data bug that a same-author automated verification suite — which specifically checked that values rendered and updated — never thought to check, because "does the same real event stay consistent across independent reloads" was not a question the builder's own reasoning pass generated. Three occurrences across three structurally different kinds of defect (a component default, a decorative motif, a data-correctness bug) is the actual evidentiary weight behind this principle — treat "I already checked this carefully myself" as the exact condition under which this principle predicts a miss, not as a reason the check is less necessary this time.

**10. Compliance with this document is not itself a deliverable.** A first practical test of this guide (building a small real site, then inspecting it as a skeptical reviewer — see Appendix F) surfaced a failure mode none of the rules above directly named: an implementation that visibly performs having followed this document, rather than simply being a good, specific interface that happens to comply. The tell was code comments like "single owned accent, used nowhere decorative" or "real state, not decoration" — phrasing written for an evaluator grading the page against this guide, not for a future maintainer trying to understand the code. This generalizes beyond comments: an interface can pass every checklist in this document while still feeling constructed primarily to demonstrate the *absence* of vibe-coded patterns, which is its own kind of unnaturalness (see the Anti-Vibe Performance Test, §20). Two concrete rules follow:

- Source-code comments MUST explain non-obvious business logic, technical constraints, browser/platform workarounds, or accessibility decisions that aren't self-evident from the code — the normal bar for any production comment. They MUST NOT restate or justify a design decision against this document's rules ("this uses one accent color, per the guide's restraint principle"); that reasoning belongs in a review artifact (the §25 template, a PR description, an audit note), not in the source a maintainer has to read to understand what the code *does*.
- If, after applying this document, the honest justification for a choice is "this demonstrates I followed the guide" rather than "this serves the product or its user," that choice has failed the Central Principle's justification test (§2) regardless of which specific rule it cites — being demonstrably compliant is not one of the seven acceptable answers to "why is this here."

**11. A plausible rationale is not evidence a decision was good — pattern-avoidance is not authorship, and only a signal *combination*, not an isolated pattern, is meaningful evidence.** This principle exists because of a documented, first-party failure, not a hypothetical one: a prior round of building against this very document added a corner-bracket framing device to a technical diagram, defended at the time with an internally consistent rationale ("grounded in the product's stated creative thesis"). Two independent blind reviewers, shown only the rendered screenshot with zero access to that rationale, each independently named the exact same device as a recognizable AI-generated "sci-fi HUD" cliché — one of them predicting, correctly and unprompted, that a wider viewport would make it read as *more* generated, not less. The rationale was real, internally consistent, and wrong. Full detail: `research/SELF_AUDIT.md`.

Two corollaries follow directly:

- **Removing a known bad pattern and adding a new decision motivated only by "this avoids looking AI-generated" are the same failure mode, not opposites.** Both are choices made by rule-following instead of by product reasoning, and a rule-following choice can manufacture a brand-new cliché exactly as easily as it avoids an old one. Before keeping any decision whose justification traces back to this document's own rules rather than to the product, apply the Authorship Audit and Realism Audit (§19).
- **No single visual pattern — a gradient, a rounded card, a monospace label, a corner bracket, a dark theme, restrained minimalism itself — is, by itself, meaningful evidence that a design reads as generic or as distinctive.** Evidence in this domain is close to always a *combination*: the specific cluster of "purple/blue gradient + system font + 3-4 card grid + generic stock imagery + interchangeable copy" is what independent discourse actually means by "AI slop" (`research/TAXONOMY.md`, Tier 7) — no single element of that cluster is individually damning, and conversely, using one or two elements from it is not itself evidence of anything. Treat every pattern-catalog entry in §4 and every AVOID list in §7-§15 as a *tier-1 or tier-2 signal* in the sense of `research/TAXONOMY.md`: necessary context, never sufficient conclusion on its own. State which combination of signals is present before concluding a design reads as generic, and check the combination against `research/TAXONOMY.md`'s legitimate-exception tier before concluding anything.

Because a builder's own rationale cannot be trusted to catch this failure (the rationale is generated in the same reasoning pass as the decision, so it is optimized to be consistent with the decision, not to test it), this principle is enforced structurally, not just by admonition — see the Blind Review Requirement, First-Impression Review, Composition Audit, Authorship Audit, and Realism Audit in §19, and the mandatory taxonomy-tier citation in §23's Definition of Done.

---

## 1. Purpose and Scope

### What "vibe coded" means here

This document does not treat "vibe coded" as an academic term. It is defined operationally, by recognizable outcomes independent observers report:

An interface is "vibe coded" when it was assembled from attractive-looking pieces without an underlying reason for what got included, how prominent each piece is, or how the pieces relate to the product's actual purpose — so that a knowledgeable viewer can identify it as AI-generated, template-derived, or a "hackathon demo" rather than considered, production software, even though no individual piece is broken.

The tell isn't any single component. It's the *combination*: default library styling + generic copy + decorative statistics + uniform card grids + unjustified animation, all appearing together with no sign that anyone made a decision specific to this product. Independent commentary on "AI slop" repeatedly converges on a similar framing, paraphrased here rather than quoted from any single source: such design reads as a statistical average across many interfaces, produced without anyone stopping to ask whether it should look this way for this product. (Author/community opinion, per Governing Principle 2 — a widely repeated framing across multiple independent writers, not a single verified quotation or a peer-reviewed finding.)

### What this guide covers

- Visual design and UI composition for websites and web applications (marketing sites, dashboards, internal tools, consumer apps).
- The implementation decisions that visibly affect perceived quality: state handling, responsive behavior, accessibility, content/data realism, motion, and use of component libraries.
- A repeatable process — inspection, product modeling, structural build, refinement, testing, self-critique — an agent can run every time it builds or edits UI.
- Diagnostic tests and a scoring/severity framework for reviewing work already built.

### What this guide does not cover

- Backend architecture, database design, or business logic correctness (beyond the accessibility/accuracy of what the UI communicates).
- Brand strategy or graphic design for logos/illustration assets (this guide assumes those are supplied or intentionally simple).
- A replacement for real user research. This guide improves the odds that a design is *defensible*; it cannot prove a design is *validated*. Only observing real users can do that.
- A universal visual style. Nothing here mandates minimalism, flat design, or any specific aesthetic. It mandates that whatever aesthetic you choose be deliberate and consistently applied.

### Why visual polish alone is not enough

A screen can have consistent spacing, a restrained palette, and smooth animation and still be vibe coded — if the hierarchy doesn't reflect what the user is actually trying to do, if the dashboard shows metrics nobody will act on, or if the copy could be pasted into any other product unchanged. Polish is necessary but not sufficient. The deeper requirement is that the visible structure of the interface has to trace back to a real understanding of the product (§3) and get inspected in its rendered form against real content (§18–18), not just described in code.

### How future agents should use this file

1. Read §0–§3 before writing any UI code for a new product or feature area.
2. Consult §4 (pattern catalog) while composing screens, and §7–§16 while making specific typography/color/component/motion/library decisions.
3. If the product brief (§3) indicates a stronger visual identity than a conventional utility interface, work through §6 before or alongside §7–§16 — it's the process for making ambition intentional rather than an alternative to the rest of this document.
4. Follow the staged workflow in §17 for any non-trivial UI task.
5. Run the self-critique loop in §19 and the fast diagnostics in §20 before considering work done.
6. Use §21–§23 to decide whether the work is actually complete, and §24–§25 as fast-reference checklists and a fill-in template for recording a review.

---

## 2. The Central Principle

> Every visible choice must either support the product's purpose, clarify hierarchy, communicate state, improve usability, or reinforce a coherent visual system. Elements that are attractive but unjustified typically make an interface look worse, not better, because they compete for attention with the things that matter and signal that no one was deciding.

For every prominent visual element you add — a card, a gradient, an icon, an animation, an extra color, a headline size jump — you MUST be able to answer:

1. **Why is this element here?** (What user need or product fact does it serve?)
2. **Why is it styled this way?** (Why this color/weight/radius/shadow and not the system default?)
3. **Why is it more prominent than its neighbors?** (What makes it more important right now?)
4. **Why does it use this amount of space?** (Does the content need it, or is it filling the layout?)
5. **Why is it interactive?** (What happens when it's activated, and does it look like it?)
6. **Why is this pattern appropriate for this product?** (Would a different domain need something else here?)
7. **What would be lost if it were removed?**

If you cannot answer one of these with something more specific than "it looks good" or "it's common in this kind of app," that is a signal to simplify, revise, or remove the element — not proof that it is wrong. A hero illustration with no answer to "why is this here" is a candidate for removal. A hero illustration that demonstrates the product's actual output (e.g., a code diff for a dev tool, a rendered document for a docs tool) has an answer and can stay.

This is the test you re-run throughout §17 and §19. Treat it as the single most reusable rule in this document.

---

## 3. Product Understanding Before Visual Design

MUST establish this before writing meaningful styling, and MUST NOT start a UI task by browsing component libraries, picking a hero layout, or choosing a color palette before this exists in at least rough form.

AVOID: opening a session by scaffolding a hero section, a stats row, and a three-card feature grid before anything is known about what the product does. This is the single most common source of generic output, because in the absence of specifics, a generated layout defaults to the statistical average of every SaaS template the underlying training data contained.

### Product-design brief template

Copy this into your working notes (a scratch file, a PR description, or your own reasoning) and fill it out — briefly, in bullet points, in proportion to the size of the task. A one-page landing page still needs a few lines of answers; a multi-screen application needs more.

```md
## Product Brief
- Product purpose (one sentence, in the user's terms, not the pitch deck's):
- Target user(s):
- Primary task (the thing this UI exists to let someone do):
- Secondary tasks:
- Usage frequency/context (once, daily, constantly-open-in-a-tab, occasional-high-stakes):
- Content and data types (their real shape — see §11):
- User expertise (novice, occasional, expert/power user):
- Device/context of use (desktop-at-work, phone-on-the-go, split):
- Accessibility needs specific to this audience, if known:
- Brand constraints (existing identity, palette, voice, none):
- Existing design patterns already in the codebase (see Stage 1 in §17):
- Technical constraints (framework, component library already in use, performance budget):
- Real operational specifics and exceptions (irregular hours, capacity limits, things the product explicitly does NOT do, conditions on price/availability — see "Necessary complexity" below):
- Success criteria (what "this UI works" means for this product, stated as an observable condition):
```

If several fields are genuinely unknown, state the assumption explicitly and prefer reversible choices (see Governing Principle on limits of AI evaluation) rather than inventing detail to fill the template.

### Why this changes the visual language

The same component set (buttons, tables, forms) should look and behave differently depending on answers above. Illustrative contrasts, not an exhaustive list:

| Product type | Density | Motion | Color use | Typical failure if brief is skipped |
|---|---|---|---|---|
| Developer tool | High; monospace for real code/IDs | Minimal, functional only | Neutral-dominant, one accent for state | Looks like a consumer landing page with a code snippet pasted in |
| Consumer app | Medium; approachable, larger touch targets | Can support delight in low-frequency, high-emotion moments | Warmer, more expressive accent | Feels cold/enterprise for a casual, infrequent-use product |
| Financial tool | High for data, generous for decisions with consequences | Almost none — no motion drama around money | Conservative; color reserved strictly for state (gain/loss/risk) | Playful animation or gradients undermine trust in a context where trust is the product |
| Internal enterprise software | Very high; power users repeat tasks all day | None beyond state feedback | Muted, low visual noise so it doesn't fatigue over 8 hours | Marketing-site aesthetic wastes screen space power users need |
| Marketplace | Medium-high; comparison is core | Moderate, to support scanning/comparison | Accent reserved for CTAs and trust signals | Generic template hides the actual differentiators between listings |
| Creative tool | Low chrome, content (the user's work) dominates | Can be more expressive around the canvas, not around chrome | Muted UI so it doesn't compete with user content | Chrome competes visually with the thing the user is making |
| Content-heavy site | Low UI density, high reading comfort | Rare, only for progressive disclosure | Restrained, in service of legibility | Optimized for "look" over reading comfort (see §8) |
| Data-heavy dashboard | High, but organized by decision, not by "everything available" | None except loading/update feedback | Reserved for meaning (thresholds, alerts), not decoration | Decorative charts and metric cards with no decision attached (see §4) |

None of these are rigid — they are starting points to reason from, not rules to apply blindly. If your product brief indicates otherwise, follow the brief.

### Product specificity requires more than surface signals

Domain terminology, a customized color palette, a few informal-sounding sentences, industry-appropriate icons, and plausible sample content are all easy to produce and do not, by themselves, make an interface product-specific. A practical test (Appendix F) built a page for a fictional local business that avoided every stereotypical AI-slop pattern in §4 — no cards, no gradients, no fake testimonials — and was still, correctly, assessed as generic: nearly the same page structure could have served any similar small business by changing only the name, description, services, and address. It passed the letter of this document's anti-pattern checks while only partially passing the Product Swap Test in spirit (see §20's expanded version of that test).

**Diagnostic question, apply it explicitly, not just implicitly:** *What information, interaction, or structural decision on this page could not be transferred unchanged to ten similar businesses or products?* If the honest answer is "almost nothing," the interface remains insufficiently specific, regardless of how well it scores against §4's pattern catalog. The fix is not more decoration or more adjectives — it's identifying details that could only belong to *this* organization, workflow, or user population: names of real people involved, actual operational policies (appointment vs. walk-in, capacity limits, what the business explicitly does or doesn't handle), pricing conditions, real constraints on the interaction model, not just its copy. See the Authentic Detail Test and expanded Product Swap Test in §20.

### Necessary complexity: remove, don't hide, and don't fail to model

Distinguish three different things an agent can do with a product's real-world complexity, because only one of them is this document's actual goal:

- **Removing unnecessary complexity** — cutting decoration, redundant states, or options nobody uses. This is what most of this document (§4–§10) is about, and it is correct.
- **Hiding necessary complexity** — a real constraint, exception, or condition exists (appointment requirements, capacity limits, pricing conditions, service exclusions) but the interface omits it to look cleaner. This is a defect, not restraint — it produces a page that's easy to build and pleasant to look at precisely because it no longer represents the real product.
- **Failing to model complexity at all** — building from a scenario so idealized that no real operational detail was ever considered, so there was never anything to hide. This is the more common failure for an AI agent working from a one-line prompt or a thin brief, and it's easy to mistake for successful restraint, because the result looks exactly as clean as if real complexity had been deliberately simplified.

A realistically scoped product brief (§3's template, especially the "operational specifics and exceptions" field) exists to force the second and third cases into view before they can be silently skipped. When working from a fictional or placeholder scenario rather than a real business/product, invent plausible operational texture to *exercise* the interface's ability to represent it (per the realistic-content-variance testing already required in §11) — but do not present invented specifics as verified facts about a real entity, and say plainly, when reporting the work, which details are real and which are illustrative test data. See the Useful Mess Test in §20.

### Research before designing — gather real context in priority order, never start from thin air

MUST establish context in this order before choosing tokens, before picking a layout, before opening a component library — adapted from an external skill's context-gathering priority (`PROFESSIONAL_WEB_DESIGN_RESEARCH.md` Part 0 critically evaluates the source; this ordering is one of the ideas judged durable and worth adopting):

1. **Resources the user has actually provided** — a codebase, screenshots, a Figma file, a design system, existing brand assets. Read a codebase over a screenshot when both exist: rebuilding or extending from real source code and real tokens produces materially higher fidelity than reconstructing intent from a static image, because the code carries decisions (states, edge cases, real constraints) a screenshot cannot show.
2. **Existing pages of the user's own product**, if any exist and the user can grant access — the product's own prior decisions are a more authoritative source of its actual voice and constraints than any external reference.
3. **Real, named, currently-verifiable industry references** — not a vague "make it modern" gesture, but specific products or studios whose actual current output has been checked, not recalled from training-data memory. `DESIGN_REFERENCE_ATLAS.md` is this project's own curated, evidence-tagged starting point for this step; treat any entry there tagged `[LIVE]` as more trustworthy than one tagged `[SEARCH]` or `[RECALLED]`, and re-verify a `[SEARCH]`/`[RECALLED]` entry by actually rendering the real product when the task's stakes justify the cost, exactly as this project's own round 7–9 work repeatedly found necessary (see `PROFESSIONAL_WEB_DESIGN_RESEARCH.md` Part 0 for a documented case where an unsourced, confidently-stated reference value was very close to correct, and another, in the same reference material's own font-recommendation table, where a "safe alternative" list had quietly become a second, equally-recognizable default cluster — confidence in a reference is not evidence for it).
4. **A user-named anchor** ("make it Linear-style," "Aesop feeling") — locate the actual, current product and either render it live or draw on this project's own atlas entry for it if one exists at LIVE tier; do not substitute a recalled impression of the brand for an actual current look at it.
5. **Starting from genuinely nothing** — say so explicitly rather than silently defaulting to a template shape. State plainly that quality is constrained without real reference material, and follow §6's Creative Direction process to establish at least a temporary, reasoned system rather than reaching for the statistical average of every product in this category.

**Company and studio research is not optional groundwork for an important greenfield build — it is part of the brief.** Before proposing a creative direction for a product with real stakes (not a small utility fix), identify at least one real, currently-inspectable reference in the same product category and at least one in an adjacent-but-different category, and note explicitly what about each is and is not transferable to this product (§6's Reference Analysis stage already requires this per-direction; this instruction is what makes sure a direction has real references to analyze in the first place, not invented ones).

### Asset strategy — assets carry more brand recognition than any token, and missing ones must be named, not faked

**A brand is recognized through its assets before it is recognized through its color palette.** Adapted from the same external skill's Asset Protocol (`PROFESSIONAL_WEB_DESIGN_RESEARCH.md` Part 0 judges this the single most importable idea in that reference), in descending order of recognition contribution:

| Asset | Recognition contribution | When required |
|---|---|---|
| Logo / wordmark | Highest — any brand is identified by its logo before anything else | Any branded task, without exception |
| Product imagery (physical products: hero shots, detail, in-context) | Very high — a physical product's "main character" is the product itself | Hardware, packaging, consumer goods |
| UI screenshots (digital products, current version, real data scrubbed) | Very high — a digital product's "main character" is its actual interface | Apps, SaaS, websites |
| Color tokens | Medium — auxiliary; without the assets above, distinct brands collide into the same generic look | Auxiliary |
| Typography | Low on its own — needs the assets above to actually land as identity rather than as a neutral system choice (see §8) | Auxiliary |

MUST NOT substitute for a missing essential asset with: a CSS-drawn silhouette standing in for a real product or logo, an abstract gradient blob, a generic dashboard mockup, a fake device frame, a hand-drawn pseudo-logo, an invented customer logo, or a decorative code snippet used to imply technical legitimacy — every one of these produces exactly the "generic tech aesthetic any brand could wear" failure this document's entire pattern catalog (§4) exists to prevent, and produces it specifically *because* it was reached for to paper over a genuine asset gap rather than naming the gap. A logo is non-negotiable for any branded task: if it cannot be sourced after a real, documented attempt (an official press kit or brand site, official launch material, an app-store listing, a properly licensed public archive — never an unlicensed scrape), stop and say so rather than shipping a colored rectangle or a typed wordmark presented as if it were the real mark.

Before designing, classify every asset the product needs — logo, product imagery, photography, illustration, screenshots, icons, video, data, editorial content — as: **available**, **obtainable from an authorized source**, **must be commissioned or generated** (and disclosed as such if shipped), **can use an honest, clearly-labeled placeholder**, or **not required**.

**An honest placeholder has two separate obligations, not one — round-9 finding, `exercises/fenwick-museum/REVIEW.md`.** The first is substantive: don't substitute a missing asset with something that pretends to be real (the MUST-NOT list above). The second, easy to miss even after getting the first one right, is about *wording*: a placeholder's label should read as something the real product would actually ship in that state (e.g., "Photography pending," matching how a real museum collection database labels an object awaiting imaging), not meta-commentary about the exercise or prototype itself (e.g., "Image not available for this demo/exercise/prototype"). A blind reviewer in that round rated the underlying decision correct but flagged the exact wording as the single tell that broke the illusion of a real production site — the two obligations can be satisfied or failed independently, so check both. When an essential asset lands in the "must be commissioned" or "cannot be sourced" category, state plainly, in the actual deliverable summary, that achievable visual quality is constrained by that gap — this is the same honesty standard §11 already requires for content ("Not provided," "Unavailable," a real error, rather than a plausible-sounding invention), extended to visual assets. This project's own matched-comparison research (`PROFESSIONAL_WEB_DESIGN_RESEARCH.md` Part 3) found repeatedly that where a credited professional reference genuinely outperformed a comparable AI-generated output, the gap was almost always a real asset or a validated process behind it (commissioned photography, staff-tested content, decades of accumulated real data) — never a CSS or layout technique unavailable in principle to any other implementation. Naming an asset gap honestly is more useful, and more honest, than a token or layout choice that cannot actually close it.

---

## 4. Common Vibe-Coded Failure Patterns

For each pattern: what it looks like, why AI agents produce it, why it harms the result, how to detect it, how to correct it, and legitimate exceptions. Frequency, combination, and lack of justification are what make a pattern a problem — not the pattern's mere existence (Governing Principle 4).

Note on this catalog's own structure: every entry below deliberately uses the same six-field template regardless of how severe the underlying pattern is — this is intentional for a reference catalog meant to be scanned and searched (§0's Observable Acceptance Criteria), not an instance of §4.1's "identical section rhythm" problem, which is about a *designed page* signaling no priority decisions were made. A reference catalog is expected to be uniform; a shipped product's page is not. Severity is handled separately, per actual instance found in a real UI, by §22's framework — not by how long or short a catalog entry reads here.

**The Signal-Combination Model (read this before using the catalog below).** Every entry in this catalog is a *weak-to-moderate signal on its own*, per Governing Principle 11 — none of them, individually, is meaningful evidence that an interface reads as generic or AI-produced. What research into how people actually describe generic/"AI slop" interfaces converges on is specific *combinations*, not isolated patterns (`research/TAXONOMY.md`, Tier 7):

- **Weak alone:** any single catalog entry below — a gradient, a rounded card, a corner-bracket diagram frame, negative letter-spacing, an opacity-fade hover. Each has legitimate, well-documented uses (this catalog names them).
- **Moderate:** two or three entries co-occurring with no independent product reason connecting them (e.g., a gradient hero *and* a generic three-card feature grid, with no stated reason either exists for this specific product).
- **Strong signal cluster:** the combination independent sources actually mean by "AI slop" — a purple/blue gradient, a system-default font with no distinct display face, a 3-4 card feature grid, generic/abstract stock or AI-generated imagery, uniform padding/radius with no variation anywhere on the page, and copy that would survive a product-name swap unchanged. Similarly, "shadcn-looking" as a criticism specifically means *default shadcn shapes and spacing with only an accent-color swap and no structural composition beyond the library's demo layout* — not "uses shadcn," which the same discourse explicitly defends ("shadcn is not the problem — shadcn defaults are the problem").
- **Contextual counterevidence overrides the cluster:** a dense multi-card metric grid that would otherwise read as a moderate/strong signal is not one, for a professional trading/ops dashboard whose users scan for anomaly-by-contrast (§4.3's existing EXCEPTION, corroborated in Appendix D simulation 4). A recognizable component-library look is not a signal at all when a team can state why staying recognizable serves their specific users (§16's EXCEPTION).

Before concluding any interface "looks vibe coded," state which combination of signals is present and check it against the legitimate-exception tier in `research/TAXONOMY.md` — a single catalog match is a prompt to look further, never a verdict by itself.

### 4.1 Layout & Structure Patterns

**Excessive cards**
- *Looks like:* Every piece of content, no matter how small, wrapped in its own bordered/shadowed rounded box.
- *Why agents do it:* Cards are a "safe," self-contained unit that composes easily without deciding how things relate to each other.
- *Harm:* Every card visually competes at the same weight; there is no hierarchy, just a grid of boxes ("wallpaper").
- *Detect:* Count distinct bordered/shadowed containers in one viewport (see the Card Count Test, §20). More than ~4–6 competing at equal visual weight in a single view is a signal.
- *Fix:* Apply the Card Necessity Test (§7) before wrapping anything in a card; prefer plain document flow, dividers, or spacing for groups that don't need a container.
- *Exception:* Genuine collections of independent, repeatable, selectable items (a list of products, a grid of files) legitimately use cards.

**Cards nested inside cards**
- *Looks like:* A card containing another bordered/shadowed card containing another.
- *Why:* Components composed without checking whether the surrounding container already provides separation.
- *Harm:* Visual noise; redundant borders/shadows make the interface look mechanically assembled rather than composed with intent.
- *Detect:* Look for a bordered container immediately inside another bordered container with no distinct purpose for the inner one.
- *Fix:* Collapse to a single container, or replace the inner card with a divider/heading/indentation appropriate to what's actually being separated.
- *Exception:* A card that must remain independently selectable/draggable inside a card that groups a page region (e.g., a Kanban column containing task cards).

**Every section wrapped in a rounded container**
- *Looks like:* Page built entirely as a vertical stack of same-radius, same-shadow rounded panels, header to footer.
- *Why:* Copying one "section" component and reusing it uncritically for every block of content.
- *Harm:* Removes the ability to distinguish "this is a distinct module" from "this is normal page content"; monotony reads as lack of intent.
- *Detect:* Screenshot the full page; count how many section boundaries use an identical rounded-panel treatment.
- *Fix:* Reserve panel treatment for content that's actually a discrete, separable module; let ordinary page content live in the page's normal flow with spacing and headings.
- *Exception:* Dashboards composed of genuinely independent widgets a user can rearrange benefit from a consistent panel treatment for every widget.

**Excessive border radii / everything pill-shaped**
- *Looks like:* Buttons, inputs, cards, badges, and images all sharing one large, identical radius, including on elements where it has no functional meaning.
- *Why:* One radius token copy-pasted everywhere, or a component library default applied without a decision.
- *Harm:* Radius stops communicating anything (e.g., "this is fully rounded because it's a toggle/pill affordance") once it's applied to everything uniformly.
- *Detect:* The Radius Test (§20): do unrelated element types share the exact same rounding for no functional reason?
- *Fix:* Define a small radius scale (§5) tied to element role — e.g., sharper for dense data containers, fuller for pill/tag/toggle-style controls — and apply deliberately.
- *Exception:* A brand that has chosen "fully rounded" as a signature look, applied consistently and on purpose, with the choice documented.

**Huge unused whitespace / artificially sparse layouts**
- *Looks like:* A dashboard or app screen with three sparse widgets floating in an otherwise empty viewport, mimicking a "clean minimalist" marketing aesthetic rather than an information-dense tool.
- *Why:* Marketing-page spacing conventions applied to application screens, or a generated screen padded out to "look finished" without enough real content plugged in.
- *Harm:* Application users doing repetitive work want information density and fewer clicks/scrolls, not decorative breathing room; sparse layouts waste vertical space on the exact screens people revisit constantly.
- *Detect:* Compare information available per scroll vs. what the user's task requires; ask whether spacing is proportional to content importance or just filling a template.
- *Fix:* Match density to product type and task frequency (§3 table); prefer information visible over information requiring a click, for internal/dense tools.
- *Exception:* Empty states before first use, low-frequency consumer flows (onboarding), and marketing pages legitimately use generous space.

**Centered application layouts that should be task-oriented**
- *Looks like:* A dense application screen (table, form, dashboard) laid out with the marketing-page convention of a centered, width-constrained column.
- *Why:* Reuse of marketing-page layout shells for application screens.
- *Harm:* Wastes horizontal space that a table, editor, or multi-panel workflow needs; centered narrow columns are for reading, not for working.
- *Detect:* Does the content width leave large empty margins on a wide viewport, on a screen whose job is dense work rather than reading?
- *Fix:* Use full-width or sidebar+content shells for application screens (§7); reserve centered narrow columns for marketing/reading contexts.
- *Exception:* Settings pages, single-record detail views, and forms often benefit from a constrained reading width even inside an app shell. **This exception is common enough that it's worth checking explicitly before flagging a constrained-width screen as an instance of this pattern** — a narrow settings page is very likely the legitimate case, not the failure; the failure case is specifically a table, dashboard, or multi-panel workflow screen sitting in a narrow centered column it doesn't need (see §7's page-shell guidance for the full breakdown).

**Identical section rhythm from top to bottom**
- *Looks like:* Every section on a marketing page follows the exact same rhythm — heading, one sentence, three-icon row, image — repeated with no variation in emphasis.
- *Why:* One section template repeated because it was easy to duplicate.
- *Harm:* Nothing signals which section matters most; scanning the page top to bottom gives no sense of priority.
- *Detect:* List section types top to bottom; do the same three visual beats recur unchanged?
- *Fix:* Let emphasis, layout, and density vary by section importance and content type — see Controlled Variety (§5).
- *Exception:* A deliberately rhythmic pattern used for genuinely parallel content (e.g., a changelog, a repeated FAQ list) is fine, because parallelism is the point there.

**Alternating image-and-copy sections / generic feature grids**
- *Looks like:* "Zig-zag" marketing sections alternating image-left/text-right, image-right/text-left; or a uniform three-column icon+heading+paragraph feature grid.
- *Why:* Extremely common in training data; the "average" landing page follows exactly this shape.
- *Harm:* Communicates nothing product-specific; visitors report these pages as interchangeable with any other SaaS product. Practitioner analysis of high-converting pages found visitors drop off at generic feature grids specifically because features appear before the visitor understands the problem — the narrative, not just the visuals, is generic.
- *Detect:* The Product Swap Test (§20): could this section be relabeled for an unrelated product without changing anything but text?
- *Fix:* Replace generic icon+heading+paragraph blocks with the product's real screenshots, real output, or real workflow; vary tile size by feature importance (a "bento" layout of unequal tiles is one legitimate alternative, not the only one); lead with the user's problem before the feature list.
- *Exception:* A three-column layout is fine when the three items are genuinely parallel and equally weighted (e.g., three pricing tiers).

### 4.2 Color & Surface Patterns

**Gratuitous gradients / purple-blue-pink defaults**
- *Looks like:* Backgrounds, buttons, and headline text all rendered with a blue-to-purple (or purple-to-pink) gradient with no connection to brand or content.
- *Why:* Documented training-data bias: indigo/purple-heavy component-library defaults (a widely cited example: Tailwind UI's early defaults leaned heavily on `indigo-500`) are overrepresented in the design examples models learned from, so gradient-indigo reads as the statistically "safe, modern-looking" choice.
- *Harm:* Signals "generic AI-generated" specifically because it's so recognizable; competes with real accent/status color if one exists.
- *Detect:* Apply the Gradient Justification Test, defined once in §9 and reused throughout this document — don't restate its wording here, just run it.
- *Fix:* Pick an accent tied to the brand or domain (or none at all); if a gradient is used, restrict it to one clearly bounded decorative area (e.g., a hero background) and never let it also carry semantic meaning.
- *Exception:* A product whose brand identity is genuinely built around a gradient (documented, chosen on purpose, applied consistently) is not making this mistake — the tell is *unexamined default use*, not gradients per se.

**Glow effects without purpose**
- *Looks like:* Soft colored blur/glow behind buttons, cards, or headlines with no state meaning.
- *Why:* Visually striking in isolation, copied from dark-themed template screenshots.
- *Harm:* Adds visual noise without communicating anything; on light backgrounds especially, reads as decoration for its own sake.
- *Fix:* Reserve glow/emphasis effects (if used at all) for an actual state signal (e.g., "this is currently processing," "this just changed") rather than permanent decoration.
- *Exception:* A focus ring is a legitimate, purposeful "glow" — it communicates keyboard focus and MUST remain visible (§13).

**Glassmorphism used indiscriminately**
- *Looks like:* Frosted-glass translucency and background blur applied broadly across cards, navigation, and panels.
- *Why:* Visually novel, appears frequently in current UI trend content.
- *Harm:* Nielsen Norman Group's review notes glassmorphism reduces text legibility against the busy content typically behind it, and independent accessibility analysis flags it as a specific problem for low-vision, dyslexic readers and inconsistent contrast across differing backgrounds. It is also a trend-cycle style disconnected from most products' actual needs.
- *Fix:* If used, apply narrowly (a single navigation bar or a "pinned" surface, not every panel), verify contrast against every actual background it will sit on (not just the mockup background), and never place body text needing AA contrast directly on a blurred/translucent surface without checking.
- *Exception:* Deliberate, brand-driven use, tested for contrast in every real context it appears — e.g. a media/creative app using an "always over content" translucent toolbar.

**Purple/blue gradient + pure-black neon dark mode**
- *Looks like:* Automatic "dark mode" that is just the light theme's colors on a `#000000` background with unchanged saturated accent colors.
- *Why:* Simplest possible implementation of "add dark mode" — invert lightness, leave everything else.
- *Harm:* Pure black creates a harsh halation/"blooming" effect against bright text and saturated accents, and looks amateurish/harsh rather than deliberately dark. See §9 for the correct approach (elevation via lightness steps, not shadows).
- *Detect:* Is the dark background literally `#000`? Are accent colors identical hex values to the light theme, just as bright?
- *Fix:* Design dark surfaces as their own scale (near-black, not pure black, e.g., Material's documented ~`#121212` base), desaturate accents slightly, and re-derive elevation via lightness steps rather than shadow (§9).
- *Exception:* True pure black is legitimate for OLED-optimized, content-first surfaces (video/photo viewers) where maximum contrast against media is the goal, and for developer terminals where users expect it.

**Too many surface colors / no clear elevation system**
- *Looks like:* Every panel, card, sidebar, and section uses a visibly different background color/tint with no logic connecting them.
- *Why:* Each component styled independently rather than against a shared token set.
- *Harm:* Surface color stops communicating "this is more/less elevated/prominent"; the eye can't use color to understand structure.
- *Fix:* Define a small ordered surface scale (page background → primary surface → elevated surface, §5) and only introduce a new tint when it encodes a real distinction.

**Unnecessary dark mode**
- *Looks like:* A dark theme built because it's expected, without checking whether it serves this product's users or use case, and without a real color-token system behind it (colors hardcoded per-component rather than defined once as roles, §9) — that specific setup is what actually doubles the maintenance surface, not the presence of a dark theme by itself.
- *Why:* Assumed baseline feature.
- *Harm:* Building it on hardcoded, per-component colors rather than the role-based token system §9 already requires means every screen, state, and contrast pair has to be revisited by hand; that cost is real, but it is the cost of skipping §5's tokens, not an inherent cost of dark mode. A project that already has a proper role-based palette (§9) can add a dark theme by redefining the *values* those roles point to, not by re-touching every component — meaningfully cheaper than this entry might otherwise imply, and not a reason to skip dark mode reflexively for products whose users would genuinely benefit from it. What's actually being warned against here is a half-designed dark theme shipped under time pressure, producing the "pure black + neon" pattern above — not dark mode itself.
- *Fix:* Confirm the product actually needs it (brand requirement, accessibility requirement, user context like low-light/technical audience) before committing to it; if the token system in §5/§9 already exists, adding a second theme is a smaller lift than this entry's harm description alone might suggest — weigh that before deciding to postpone it.
- *Exception:* Developer tools, media apps, and anything used for long sessions in variable lighting have a strong, well-evidenced case for dark mode. More broadly, any product whose users have expressed or would reasonably be expected to have a real preference for it is a legitimate case — this entry is about skipping the design work, not about dark mode being disfavored.

### 4.3 Content Density & Data Patterns

**Decorative charts with meaningless data / metric cards with no decision value**
- *Looks like:* A dashboard front page with four to eight metric tiles and a chart or two, where none of the numbers change what the user does next.
- *Why:* "Add a dashboard with some stats" is a common generated pattern; charts read as "data-driven" regardless of whether the data matters.
- *Harm:* Dashboard-usability research is consistent on the underlying principle: every number shown should inform a decision or trigger an action, or it becomes "wallpaper" users learn to ignore. (Evidence-tier note: the specific "within roughly two weeks" timeframe and the "5–7 primary metrics" ceiling below are practitioner-reported figures encountered via secondary/search-synthesized sources during this document's research, not independently re-derived from raw study data — treat the timeframe and count as illustrative, not measured facts about your specific product; the underlying principle, not the exact numbers, is the load-bearing rule.) Practitioner guidance sets 5–7 as a rough ceiling on primary metrics shown at once before comprehension degrades (a widely accepted professional default, not a hard rule for every context).
- *Detect:* For each stat/chart, ask: what does the user do differently if this number is high vs. low? If there's no answer, it's decorative.
- *Fix:* Cut to the metrics that drive an actual decision; demote the rest to a detail view or remove them; give the one actionable number stronger visual weight than the rest, not equal weight.
- *Exception:* A small set of "vanity" metrics is legitimate on a page whose literal purpose is a public-facing scoreboard or status page — the exception is the *purpose of the page*, not the metric itself.

**Interfaces that show only ideal data**
- *Looks like:* Every screenshot/demo shows perfectly formatted names, round numbers, short strings, and populated states — never empty, error, extreme, or malformed.
- *Why:* Generated example/seed data is usually "nice" by default.
- *Harm:* Hides real layout failures (truncation, overflow, alignment breaks) until a real user hits them in production.
- *Fix:* Test with the realistic data variants in §11 before calling any screen done.

**Fake testimonials, invented customer logos, unsupported statistics**
- *Looks like:* "Trusted by 10,000+ teams," a row of recognizable company logos never actually confirmed as customers, quotes attributed to generic names/titles.
- *Why:* Trained heavily on marketing pages that include social proof sections; the AI fills the slot with plausible-sounding content.
- *Harm:* This is a factual/ethical problem, not just a stylistic one — presenting invented claims as real is misrepresentation, and Governing Principle 7 treats "fabricated claims presented as fact" as an automatic completion blocker, not merely a style flaw. It is also usually recognized by users as generic decoration rather than genuine proof (practitioner critiques flag boilerplate testimonials like "Great tool, saved us a lot of time!" as adding zero credibility).
- *Fix:* Use only real customer/testimonial/logo content the team has supplied and cleared; otherwise omit the section entirely or replace it with something true (a concrete before/after, a real product screenshot, an honest "new product" framing) rather than a fabricated placeholder.
- *Exception:* None for presenting fabricated claims as real. Clearly labeled placeholder content in an unfinished/internal build (e.g., `[CUSTOMER LOGO PLACEHOLDER]`) is acceptable *only* if it cannot be mistaken for real content and is not what ships.

**Meaningless badges / decorative status indicators**
- *Looks like:* "New," "Pro," "Beta," colored dots, or icon badges applied for visual interest rather than to communicate an actual state.
- *Why:* Badges are a cheap way to add visual variety to an otherwise uniform list.
- *Fix:* A badge MUST correspond to a real, current state of the underlying data (see Components, §10); if the state isn't real, remove the badge.

### 4.4 Typography, Icons & Copy Patterns

**Oversized marketing headlines used for drama, excessive centered text**
- *Looks like:* Every heading rendered at maximum type-scale size and centered, regardless of whether the content underneath is a hero statement or a routine section label.
- *Why:* Large centered type reads as "confident design" in isolation.
- *Harm:* When applied everywhere, nothing is actually emphasized; oversized type on application screens wastes vertical space users need for their task.
- *Fix:* Reserve maximum type sizes for the one or two most important statements per page (§8); left-align body/application content by default, reserve centering for short, standalone marketing statements.

**Excessive use of outline icon sets, icons where text is clearer, emoji as product icons, inconsistent icon metaphors**
- *Looks like:* An icon in front of every label "for visual interest"; the same generic outline icon library (frequently a Lucide/Heroicons-style set, because of its ubiquity in AI-assisted templates) applied everywhere without variation; emoji standing in for a product's icon system; icons whose metaphor doesn't clearly map to their action (e.g., an unrelated icon reused for two different actions).
- *Why:* These libraries are the default bundled with popular starter kits and are heavily represented in AI training data, so they get reached for automatically.
- *Harm:* Icon-heavy interfaces with a generic outline set are specifically named in independent critiques as a visual "tell" of a templated build; icons used where a short label would be clearer add ambiguity and localization cost for no benefit; emoji icons don't scale, aren't consistent across platforms/renderers, and read as placeholder rather than considered.
- *Detect:* Could the icon be removed and replaced by nothing, with no loss of clarity? Is there a text label anywhere near an icon-only control (required — see §10, §13)?
- *Fix:* Use icons only where they add real recognition speed (well-established metaphors: trash, search, close) or save critical space (dense toolbars); always accompany icon-only controls with an accessible name and, where space allows, a visible label; keep one consistent icon set and stroke weight across the product; AVOID reaching for emoji as a default substitute for a real icon system (§4 detects this as unconsidered/placeholder).
- *Exception:* Emoji are legitimate as user-authored content (a reaction, a status someone typed). They are also a legitimate, deliberate design choice for product-authored iconography in specific contexts — e.g., page/document icons or status indicators in products like Notion or Slack — when chosen consistently as part of the actual icon system (able to answer §2's justification questions) rather than dropped in ad hoc as a quick placeholder. The distinction is unexamined default vs. deliberate system, the same distinction this whole document applies to gradients, cards, and radii — which includes a popular outline icon set itself: a team that deliberately chose a widely-used library (Lucide, Heroicons, or any other) for its consistency, coverage, and low maintenance cost, and applies it with real usage discipline (§10, §13), has made the same kind of defensible decision this document asks for everywhere else. The failure this entry targets is reaching for that library *by default, without the decision being made at all* — not the mere fact of using a popular icon set.

**Gradient text on headings, arbitrary letter-spacing, monospace used only to look "technical"**
- *Looks like:* Every major heading rendered with a gradient fill; letter-spacing values with no relationship to the type scale; code-style monospace font on non-code content to imply sophistication.
- *Why:* Visually novel, appears in trend-heavy templates.
- *Fix:* Reserve gradient text for a genuinely bounded, brand-driven use (at most one per page); derive letter-spacing from the type scale, not per-element guesswork; reserve monospace for genuinely technical content (code, IDs, hashes, tabular numbers where alignment matters).

**Copy that sounds like generic AI marketing language**
- *Looks like:* Headlines and CTAs built from a small, recognizable vocabulary: "seamless," "powerful," "revolutionize," "elevate," "unlock," "supercharge," "empower," "cutting-edge," "game-changing," "streamline," alongside generic CTAs like "Get Started" or "Learn More" with no stated outcome.
- *Why:* This is the statistically dominant vocabulary of marketing copy the model was trained on; content analyses of AI-generated writing repeatedly flag the same handful of words as tells.
- *Harm:* Fails the Copy Swap Test (§20) — text this generic could be pasted into almost any other product's page unchanged, so it communicates nothing about *this* product.
- *Fix:* Replace adjectives with the specific outcome the feature produces for the specific user (§11); replace "Get Started" with what starting actually does ("Start free trial," "Create your first project," "Import your data"); write from the product brief (§3), not from a generic template voice.

### 4.5 Motion & Interaction Patterns

**Gratuitous animation; everything fades/slides into view; excessive hover movement; overanimated buttons**
- *Looks like:* Every section fades or slides in on scroll; every hover state includes a scale/translate/shadow change; buttons have bounce, glow-pulse, or ripple effects with no functional reason.
- *Why:* Individually, each animation is easy to add (one utility class) and looks polished in isolation.
- *Harm:* In combination, constant motion competes for attention with content and communicates nothing (see the Motion Standard, §14); it also has real costs for vestibular-disorder users if `prefers-reduced-motion` isn't respected.
- *Fix:* Apply the animation-purpose test in §14 to every motion effect; remove any that fail it; always implement a `prefers-reduced-motion` fallback.
- *Exception:* A single, well-chosen entrance animation on a genuinely new, attention-worthy element (e.g., a toast notification, a newly created item appearing in a list) is purposeful, not gratuitous.

**Generic skeleton loaders everywhere**
- *Looks like:* Every loading state, including ones lasting a fraction of a second, replaced with an animated gray skeleton shape.
- *Why:* Skeletons feel more "sophisticated" than a spinner and are easy to template.
- *Harm:* Practitioner guidance is consistent that skeletons should be reserved for loads that genuinely take a noticeable amount of time (roughly >500ms as a starting default, not a hard threshold) — using them for near-instant loads adds visual noise and can make fast interfaces feel slower than they are; a skeleton whose shape doesn't match the eventual content causes a jarring layout shift when real content arrives.
- *Fix:* Use skeletons for loads that take long enough to notice, shaped to match the real content's layout; use no loading indicator at all for sub-threshold loads; always avoid unexpected layout shift when content replaces the skeleton (this also protects your Cumulative Layout Shift score, §"Performance").

### 4.6 Technical/Consistency Patterns

**Default component-library appearance**
- *Looks like:* A shadcn/ui, Bootstrap, Material UI, or Chakra project left entirely at its out-of-the-box theme, radius, font, and spacing.
- *Why:* Fastest path to a working UI; changing only the accent color feels like "customizing" it.
- *Harm:* A developer familiar with the library recognizes it immediately (the Default Library Test, §20); this is a specific, repeatedly cited driver of AI-generated interfaces looking interchangeable.
- *Fix:* See §16 for the full de-defaulting checklist. Changing only the accent color does not constitute customization.

**Inconsistent spacing / arbitrary one-off CSS values**
- *Looks like:* Padding/margin values that don't reuse a shared scale (`13px` here, `18px` there, `22px` somewhere else) with no relationship between them.
- *Why:* Each element styled in isolation without checking existing tokens.
- *Harm:* Produces a subtly "off" feeling even when no single value is wrong; makes future changes error-prone.
- *Fix:* Establish and reuse a spacing scale (§5); treat a new arbitrary value as a signal to either reuse an existing token or deliberately extend the scale, not to freelance.

**Mobile layouts created only by stacking; desktop navigation squeezed into mobile**
- *Looks like:* Responsive behavior implemented purely as "everything becomes one column"; a desktop mega-menu or wide toolbar shrunk to fit rather than redesigned for the viewport.
- *Harm:* Stacking alone does not address reading order, action priority, or control discoverability — see the full Responsive Design Standard, §12.
- *Fix:* Apply the response-strategy hierarchy in §12, testing intermediate widths, not just phone/desktop extremes.

**Truncated content without a recovery mechanism; empty states that are only an illustration; error states that don't explain recovery; low-contrast gray text; missing focus styles; placeholder text used as a label**
- *Harm:* Each of these is a specific, testable failure covered in detail in §10 (Components), §11 (Content), and §13 (Accessibility). They are grouped here because they share a root cause: implementing the "happy path" appearance of a state without implementing what the state actually needs to do for the user.
- *Fix:* See the cross-references above; no state should exist as pure decoration without functional content behind it.

### 4.7 Applying this catalog

Every entry above answers "how is this misused" and "when is it legitimate." When you notice one of these patterns in your own output, do not reflexively delete it — apply §2's justification test first. If you can answer all seven questions concretely, keep it and note why (an EXCEPTION). If you cannot, that's your signal to revise.

---

## 5. Visual System Requirements

### Design tokens

Every project — regardless of size — SHOULD define at least a minimal version of the following, and reuse these values instead of arbitrary numbers. Established design systems (Carbon, Material 3, Primer) converge on the same categories, which is strong cross-system evidence this list is close to necessary and sufficient:

| Token category | Minimum content | Notes |
|---|---|---|
| Spacing scale | 5–8 steps (e.g., 4/8/12/16/24/32/48/64px) | A geometric or near-geometric progression avoids visually meaningless steps. |
| Type scale | 5–8 sizes with a defined ratio | A consistent ratio (musical-scale-like, e.g., 1.125–1.5×) keeps steps systematic without being mechanically obvious — see §8. |
| Font weights | 2–3 in use per surface | More than 3 in one interface usually signals no real hierarchy decision was made. |
| Line heights | Tied to text role (heading vs. body vs. dense UI) | Body text needs more line-height than a tight UI label. |
| Color roles | See §9's role table | Roles, not raw hex values, are what components should reference. |
| Surface hierarchy | 3–5 ordered levels | Page background → surface → elevated surface (→ overlay) is the common shape. |
| Border colors | 1–2 (default, strong/emphasis) | |
| Border widths | 1–2 | |
| Radius scale | 2–4 steps tied to element role | Not one global radius applied everywhere (§4). |
| Shadow scale | 2–4 steps tied to elevation | Shadows should map to a real elevation level, not be picked per-component. |
| Control heights | 2–4 (e.g., compact/default/large) | Consistent control height is one of the fastest ways to look "built," not assembled. |
| Content widths | A small set of max-widths for reading vs. dense content | |
| Breakpoints | Tied to layout failure points, not device marketing names (§12) | |
| Motion durations | 2–3 (fast/default/slow) | See §14. |
| Motion easing | 1–2 curves | |
| Layering/z-index | A small ordered scale (base, dropdown, sticky, overlay, modal, toast) | Prevents ad hoc `z-index: 9999` fights. |
| Focus indicators | One consistent, high-contrast treatment | MUST be visible and not obscured (WCAG 2.2 AA); SHOULD also meet the more specific Focus Appearance size/contrast thresholds, which are an AAA-level criterion, not an AA one (§13). |

SHOULD NOT build an elaborate, fully abstracted multi-tier token pipeline (primitive → semantic → component tokens, with tooling) for a small project — that is appropriate for a multi-team, multi-product design system, not a single app. Scale the *formality* of the system to the project: a small project can express this list as a short set of CSS custom properties or Tailwind theme config; a large multi-surface product benefits from a formal primitive/semantic/component token architecture, the way Carbon and Material do it. What must not vary by project size is the *discipline* of reusing tokens instead of one-off values (§4's "arbitrary CSS values" pattern).

### Proportionality

A design system exists to reduce inconsistency and future effort — it is not evidence, in itself, that the work is thorough. A practical test of this document (Appendix F) produced a fully-tokenized spacing/type/color/motion system, complete with a separate dark theme, for a single static page — technically competent, and also more elaborate than that page needed, with several tokens defined and never actually used anywhere in the file (an unused token is a clear, checkable sign of this: grep for each custom property and confirm it's referenced before keeping it).

Before adding or keeping a piece of design-system infrastructure (a token, a variant, a new abstraction layer), MUST be able to answer yes to more than one of:

- Is this currently reducing duplication or preventing an actual inconsistency, not a hypothetical future one?
- Is it likely to support a real near-term requirement (another route, another contributor, a stated theming need) rather than an imagined one?
- Is it easier to understand at a glance than the raw values it replaces?
- Would another maintainer opening this file benefit from it, or would they have to learn an abstraction to change one number?

And MUST be honest about the failure mode this section exists to catch: **am I adding this because the product needs it, or because it demonstrates technical sophistication?** The second reason is not a reason. Scale abstraction to project size (a one-page site needs a short, fully-used list of custom properties, not a multi-tier token pipeline — see the table above), and remove a token the moment it stops being referenced anywhere, rather than leaving it as unused scaffolding. See the Proportionality Test, §20.

### Feature prioritization

Dark mode, animation beyond basic state feedback, theme switching, a command palette, skeleton loaders, complex search/filtering, decorative illustration, elaborate responsive behavior, and additional component variants are all legitimate features *somewhere* — but none of them are free, and none of them are owed to a product by default just because the underlying platform makes them easy to add (`prefers-color-scheme` costing one CSS block is not, by itself, a reason to ship a second theme). Each one competes for implementation and testing effort against whatever the product's actual priority needs still are, per Governing Principle 1's tiers. Before adding any of them, ask:

- Have users (or a credible proxy for them) actually asked for this, or is a real usage pattern known that requires it?
- Is the product used for extended, repeated, or low-light sessions where the feature would plausibly matter?
- Does an existing brand, platform convention, or accessibility need already establish it?
- Can both the "on" and "off" (or all variant) states realistically be maintained and tested going forward, not just shipped once?
- Does it create meaningful, arguable user value — not just visual/technical completeness?
- Are higher-priority product needs (Governing Principle 1, Tiers A–F) already fully addressed? If not, this loses the competition by default.

If the honest answer across these is thin, the correct move is to leave the feature out and say so explicitly (an unresolved question or a stated assumption, not a silent omission) rather than include it because it was technically easy and made the implementation look more complete. This is a diagnostic, not a ban — a developer tool used for hours a day has a real case for dark mode; a one-page local-business site glanced at for thirty seconds typically does not, and the right default there is to leave it out until told otherwise.

### Controlled variety

Distinguish five related but different things:

- **Consistency** — the same kind of thing looks and behaves the same way everywhere. Required.
- **Repetition** — the same visual treatment recurring because the content is genuinely parallel (e.g., every row in a table). Fine when the content really is parallel.
- **Monotony** — the same visual treatment recurring even though the content's importance or purpose differs (§4's "identical section rhythm"). A defect.
- **Hierarchy** — visual weight varying *because* importance varies. The goal.
- **Deliberate exception** — a rule broken on purpose, in a specific place, for a stated reason (an EXCEPTION per this file's convention).

MUST let visual variation follow content importance, page purpose, or interaction state. AVOID variation that follows nothing but "this looked like it needed something different" — that is the arbitrariness this whole document is trying to prevent.

---

## 6. Creative Direction and Visual Ambition Framework

Everything from §4 onward is calibrated to catch *unjustified* decoration — it is not an instruction to make every product restrained, and Governing Principle 4's blandness note and the Blandness Test (§20) already flag "restrained by default" as its own failure mode. Many products should feel energetic, vibrant, expressive, premium, playful, dramatic, experimental, editorial, immersive, culturally specific, or technically advanced. Avoiding the patterns in §4 is the baseline for any of those products, not a substitute for them — a visually ambitious interface still has to pass every AVOID in this document; it just has more going on that has to be justified, not less.

This section sits at Priority Tier G (product-specific visual identity, Governing Principle 1) and MUST NOT be used to justify weakening any higher tier — task completion, accessibility, information clarity, or content/state resilience still win in a conflict, no matter how strong the creative rationale. Use this section when a product's brief (§3) indicates it calls for a stronger visual identity than a conventional utility interface. For most dense application/utility work, §4–§5 and §7–§15's default guidance is sufficient without it, and reaching for this section anyway is itself a proportionality problem (§5).

### Core Principle

Visual excitement should come from a coherent creative idea expressed across the interface, not from accumulating fashionable effects. Before making an interface visually ambitious, answer:

1. What should the user feel?
2. Why is that feeling appropriate for this product?
3. Which visual decisions will create that feeling?
4. Which visual decisions would undermine usability?
5. What should remain restrained so the expressive elements have impact?

AVOID starting from a technique instead of a concept: "add more gradients," "make it pop," "use glassmorphism," "add animations," "make it futuristic," "use bolder colors," "make it premium." None of these is a reason (§2's justification test still applies) — each names an effect, not the feeling it's supposed to produce or why this product should produce that feeling. Translate vague direction into a specific creative concept before implementing anything.

### Stage 1 — Establish the Intended Experience

Before implementing high-level visual design, fill out a creative-direction brief — in proportion to the project (§5's Proportionality guidance applies here too; a small product needs a short version of this, not every field exhaustively answered):

```md
## Creative Direction Brief
### Product
- What the product does:
- Primary users:
- Primary task:
- Usage context:
### Intended Emotional Response
- Users should initially feel:
- Users should feel while using it:
- Users should feel after completing the main task:
### Brand Character
Choose three to five precise traits:
-
### Traits to Avoid
Choose three to five traits that would be harmful:
-
### Visual Energy
- Quiet / moderate / high / immersive:
- Reason:
### Familiarity Versus Novelty
- Familiar interaction patterns that should remain:
- Areas where visual experimentation is appropriate:
### Product-Specific Source Material
- Domain objects:
- Cultural references:
- Physical materials:
- Historical references:
- Data shapes:
- User rituals:
- Existing brand assets:
- Unique content:
### Constraints
- Accessibility:
- Performance:
- Device:
- Framework:
- Content:
- Brand:
```

Use precise traits, not adjectives that could describe almost any product. **Weak traits** (AVOID — these are the same generic-adjective problem as §4's copy patterns, applied to brand character instead of marketing copy): modern, clean, premium, beautiful, cool, professional. **Stronger traits**, illustrative not exhaustive: industrial but carefully maintained; editorial and culturally literate; fast, competitive, and information-dense; playful without appearing childish; cinematic but operationally clear; technical without relying on cyberpunk clichés; luxurious through materials and proportion rather than gold decoration; energetic like live-performance graphics rather than generic startup branding. A trait that survives being read aloud without sounding like it came from any other pitch deck is doing its job.

### Stage 2 — Develop Multiple Creative Directions

Before committing to one visual direction, MUST generate at least three **structurally** different concepts — not three variations differing only in accent color, font, or corner radius on an otherwise identical page. "Structural" means the directions differ in at least two of: page architecture, reading path/scan order, information density, hierarchy model (what leads, what's subordinate), compositional rhythm, and grid. A red version and a blue version of the same column layout is one direction, not three, no matter how different the two style briefs read (this is the Distinctiveness Rubric's "Composition" row catching what the "Color discipline" row alone would miss). For each, define: central creative idea, product rationale, composition, typography, color behavior, surface treatment, image/illustration direction, motion language, density, navigation behavior, signature visual element, risks, accessibility implications, performance implications, how it avoids the generic generated aesthetics in §4, and a real reference anchor.

**Real reference anchor** (MUST, when `DESIGN_REFERENCE_ATLAS.md` or equivalent named-organization research is available for this product category — for greenfield work with real stakes, absence of this field is itself a finding to state explicitly, per §3's research-priority-order rule, not a silently skipped field): name at least one real, verifiable organization/product whose actual shipped design the direction is structurally informed by, with the specific attribute being drawn from and its evidence tier (`[LIVE]`/`[CODE]`/`[PROVENANCE]`/`[SEARCH]`/`[RECALLED]`). A direction with no real anchor is not automatically wrong, but MUST say so plainly ("no real-world anchor identified; this direction is a synthesized hypothesis") rather than implying research backing it doesn't have.

```md
## Direction A: Mechanical Workshop Ledger
### Concept
The interface combines the clarity of a service ledger with details drawn from
physical workshop labels and stamped maintenance records.
### Product connection
The visual language reflects repair history, mechanical precision, and long-term
ownership.
### Structural difference from Directions B/C
Single-column chronological ledger reading path (top to bottom, oldest to newest
service events) rather than a dashboard grid or a card-based catalog — density is
high and uniform rather than featuring a hero region.
### Real reference anchor
GOV.UK's transaction-history list pattern [LIVE] — the specific attribute drawn on
is strict chronological single-column density with no card containers, not GOV.UK's
color or typeface.
### Expression
- Structured editorial columns
- Strong numeric alignment
- Small stamped status labels
- Warm paper-like base
- One utilitarian condensed display face
- Photographs of real tools and repairs
- Motion limited to mechanical state changes
### Risks
- Could become nostalgic or costume-like
- Condensed typography may reduce readability
- Physical metaphors must not obscure interaction
### Generic patterns deliberately avoided
- SaaS feature cards
- Decorative gradients
- Floating glass panels
- Generic outline-icon grids
```

### Stage 3 — Select a Direction Through Evidence

Evaluate the candidate directions against product fit, user-task clarity, distinctiveness, cross-route scalability, accessibility, performance, content compatibility, technical feasibility, brand credibility, and risk of becoming trend-dependent, using a decision table with written reasoning per cell (a bare score with no reasoning fails the same test as an unjustified visual choice, §2):

| Criterion | Direction A | Direction B | Direction C |
|---|---|---|---|
| Product fit | | | |
| Task clarity | | | |
| Distinctiveness | | | |
| Cross-page scalability | | | |
| Accessibility risk | | | |
| Performance risk | | | |
| Content resilience | | | |
| Technical feasibility | | | |

MUST NOT select a concept solely because it produces the most visually impressive first screenshot (the One-Screenshot Test, below, exists specifically to catch this after the fact — apply the same skepticism here, before committing).

### Stage 4 — Define the Visual Thesis

Summarize the selected direction in one sentence: *"This interface expresses [product truth] through [visual language], while preserving [critical usability quality]."* For example: "This interface expresses the speed and competitiveness of live market decision-making through compressed typography, directional motion, and high-contrast data layers, while preserving immediate numeric legibility." Every major visual decision from this point on SHOULD reinforce this thesis; if a decision doesn't support the thesis, hierarchy, usability, state communication, or brand, reconsider it — the thesis is what makes §2's justification test answerable for an ambitious choice instead of a restrained one.

### Stage 5 — Establish a Restraint Strategy

Visually ambitious design requires restraint somewhere, or nothing stands out (this is the same contrast principle §7's spacing/hierarchy guidance and §9's "reserve accent for meaning" rule apply to layout and color — here it's applied to the whole expressive system). Choose one or two primary expressive systems, one supporting system, and name what stays conventional. Do not maximize every system simultaneously.

```md
## Expression Budget
### Primary expression
- Oversized editorial typography
- Art-directed photography
### Supporting expression
- Controlled asymmetric composition
### Intentionally restrained
- Buttons
- Forms
- Navigation behavior
- Status colors
- Dialogs
### Avoid
- Gradients
- Glows
- Excessive shadows
- Decorative iconography
- Continuous ambient motion
```

### Stage 6 — Create a Signature Move

Every ambitious direction SHOULD identify one memorable visual or interaction idea that belongs to the product: a product-specific data visualization, a distinctive editorial composition, a custom transition that communicates workflow, a meaningful physical metaphor, a domain-specific interaction, a distinctive image-treatment system, a recognizable typographic composition, a visual response to real data, or a custom spatial model. It MUST connect to the product, improve meaning/emotion/comprehension (not just decorate), work beyond one hero screenshot, be repeatable without becoming repetitive, remain accessible, degrade gracefully, and avoid excessive performance cost.

It must NOT simply be a gradient, a glow, a mouse-following effect, a floating 3D object, a marquee, a glass card, a large serif heading, a page-entry animation, or a custom cursor — these may support a concept but are not sufficient as the concept itself (each one is already a named pattern in §4, and naming it "the signature move" doesn't exempt it from that entry's justification test).

### Stage 7 — Reference Analysis Without Copying

This is Governing Principle 5's "name the exact attribute you're studying, don't import the whole style" rule, applied specifically to creative/visual references. For each reference, record what exact quality is useful, why it works in its original context, whether it applies here, what should NOT be copied, and how the principle translates rather than gets imitated:

```md
## Reference Analysis
### Reference
Editorial publication homepage
### Attribute studied
Contrast between dense metadata and dramatic article imagery
### Why it works there
The imagery establishes editorial importance while compact metadata supports scanning.
### Relevant translation
Use larger campaign artwork alongside compressed event metadata.
### Do not copy
Publication navigation, serif typeface, or article-card structure.
```

MUST NOT combine fashionable fragments from unrelated references without a unifying concept — that combination is exactly how a generic, "collection of attractive components" result happens (§1's operational definition of vibe-coded), just with better-curated components.

### No Recipe Without Reason

This applies whenever a direction draws on a named external reference, a third-party design-system pattern, or a packaged "recipe" (a style guide, a component-library theme, a skill or plugin that ships pre-built visual treatments, an atlas entry from `DESIGN_REFERENCE_ATLAS.md`) — treat it as a stronger, not weaker, obligation than an informal Reference Analysis, because a packaged recipe is easier to apply mechanically without the translation step Stage 7 requires. Before applying one, answer all of the following in writing; an unanswered question means the recipe is not yet cleared for use, not that it defaults to allowed:

1. Why does this recipe fit *this* product specifically — not "it looks good" or "it's popular," but a stated product/audience/task reason?
2. What concrete constraint does it solve (a real density problem, a real hierarchy problem, a real content-type mismatch) that this product actually has?
3. Which specific attributes of the recipe transfer, and which are being left behind (Stage 7's "what should NOT be copied" applies in full)?
4. Does the recipe's effect depend on something this product doesn't have — brand equity, premium photography, a proprietary or licensed typeface, a large content team, an established visual identity? If yes, adopting the surface pattern without the thing that makes it work is the same failure `PROFESSIONAL_WEB_DESIGN_RESEARCH.md`'s matched comparisons document repeatedly: attributing a professional result to a technique when the real driver was an asset or resource this project doesn't have access to.
5. Does it actually fit this content's density and task, verified against real or representative content (§11) — not just the recipe's own demo content?
6. Would adapting it here produce something recognizable as *that specific recipe* to someone who knows it, rather than a translated, product-specific result? Recognizable imitation fails Stage 7's translation test even when every individual step above was answered honestly.

A recipe that survives all six questions is a legitimate input, same as any other reference in Stage 7 — this section exists to stop mechanical reuse, not to forbid learning from precedent. Treat a codebase-provided design skill, plugin, or template pack the same way: installing its recipes and treating that as evidence of improved design judgment is exactly the failure this whole section exists to prevent (Governing Principle 5).

### Stage 8 — Build a Structural Prototype First

Before full visual treatment, establish information hierarchy, the main user flow, page composition, navigation, responsive structure, state behavior, and content density — the same "structure before decoration" discipline as §17's Stage 4, applied here. The structural version should reveal whether the concept works without relying entirely on effects.

This does NOT mean every ambitious interface must begin as a plain grayscale wireframe — some concepts depend on typography, imagery, or color to communicate structure at all, and forcing a colorless wireframe on those would strip the very thing being tested. Instead, separate three kinds of decisions: **structural** decisions (must work independently of any visual treatment), **expressive** decisions (should improve meaning and identity, tied to the visual thesis), and **decorative** decisions (optional, and MUST be removable without breaking the product — this is the Removal Test, §20, applied at the level of a whole creative direction rather than one element).

### Stage 9 — Create an Excitement Hypothesis

Before adding a major visual element, state what effect it's expected to create, then verify after implementation whether it actually did:

```md
## Excitement Hypothesis
### Proposed decision
Use full-width photography with irregular editorial cropping.
### Intended effect
Create a sense of immediacy and cultural relevance while distinguishing major stories.
### Product rationale
The content is driven by live events and personalities, so real imagery should lead
the experience.
### Risk
Irregular crops may obscure important subjects or create inconsistent page rhythm.
### Verification
- Test with at least 20 real images
- Test portrait and landscape subjects
- Compare scan speed against a standard grid
- Verify mobile focal-point behavior
```

MUST NOT retain a decision merely because it required significant implementation effort — sunk cost is not a justification under §2's test any more than "it's common in this kind of app" is.

### Stage 10 — Visual Ambition Review Loop

This is §19's Self-Critique Procedure, specialized for ambition: render all major routes, capture screenshots at relevant viewport sizes, review first for task clarity and again for emotional/visual impact, identify where the concept is strong / disappears / becomes excessive, identify where generic components break the visual language and where expressive components harm usability, revise, compare before and after, and repeat with real or representative content (§11's realistic-data testing still applies in full).

The critique MUST name the specific problem and connect it to a concrete revision, exactly as §19 already requires — **weak**: "It could feel more exciting." **Strong**: "The concept promises energetic editorial composition, but every content region resolves into an equal four-column card grid. Preserve the stable grid for filters and metadata, but allow featured content to break the grid through scale and image treatment."

### Required Self-Checks

Run these against the rendered result, not the plan. None are pass/fail by themselves (same rule as §20's general heuristic tests) — a failing answer means inspect further and likely revise, not necessarily discard the whole direction.

| Check | Question |
|---|---|
| Concept Test | Can the direction be explained without listing CSS effects? Bad: "It uses gradients, large text, glass panels, and animations." Better: "It presents the product as a live control room where information changes visibly according to urgency and user action." |
| Product-Origin Test | Could this concept have emerged from the product's users, content, culture, mechanics, or domain — or was it imported from a general design trend? Identify the concrete product source for color, typography, imagery, shape, motion, composition, texture, and interaction. Not every choice needs a literal domain metaphor, but the system as a whole should have a credible relationship to the product. |
| Swap Test (creative) | Could the exact creative direction transfer to an unrelated AI startup, cryptocurrency platform, fitness app, music service, finance dashboard, or creative portfolio with only copy changes? If yes, insufficiently product-specific — this is the Product Swap Test and False-Specificity Test (§20, and §3's diagnostic question) applied to an ambitious direction instead of a restrained one; ambition is not automatically exempt from either. |
| Excitement Source Test | What is actually making the interface exciting? Acceptable: strong composition, meaningful contrast, original imagery, expressive typography, responsive interaction, product-specific data behavior, narrative sequencing, deliberate density, spatial rhythm, cultural specificity, confident restraint, high-quality content. Warning signs: relying mainly on saturation, gradients, glows, shadows, motion quantity, border radius, floating objects, visual noise — the §4 tells, present here in ambitious form rather than absent. |
| One-Screenshot Test | Does the concept only look impressive in one carefully framed desktop screenshot? Test inner pages, settings, empty states, error states, forms, tables, long content, mobile, reduced motion, low-quality imagery, and loading behavior — a mature direction survives ordinary product surfaces, not just the hero shot. |
| Component Collision Test | Do ordinary components feel disconnected from the expressive pages — forms resembling library defaults, dialogs in a different design language, tables losing the concept entirely, generic empty states, expressive navigation next to bland workflow screens, marketing and application surfaces reading as separate products? Do not force every component to become decorative; translate the concept into proportion, typography, spacing, state behavior, and composition instead (§10's component quality bar still applies in full). |
| Saturation Test | Temporarily reduce color, motion, imagery, texture, and effects. Does the underlying composition remain strong? If removing decoration collapses the whole design, the concept lacked structural quality, not just polish — the same whole-direction application of the Removal Test as Stage 8, above, run again after implementation rather than during structural planning. |
| Restraint Test | Is every element demanding attention? Identify the primary focal point, secondary focal point, quiet support regions, stable controls, and rest areas. Visual excitement requires contrast between intensity and calm, not intensity everywhere. |
| Identity Test | After viewing the product briefly, can someone recall a specific visual idea — not "it was modern/colorful/premium," but something like "the interface organized releases like a physical music archive" or "the data moved like a live race broadcast"? This is the Memory Test (§20) with a bar raised from "recall the task" to "recall the concept" — and it inherits §20's explicit caveat that this specific test cannot be meaningfully self-administered by the agent that built the interface; run it on a genuinely separate party (a fresh agent context or a real person) after a real gap, or skip it and say so. |
| Novelty Tax Test | For every unusual interaction: what must users learn, is the learning cost justified, would familiar behavior work better, does it remain accessible, do mobile and keyboard users get an equivalent experience? Concentrate novelty where it creates real value, not everywhere it's technically possible. |
| Brand-Excuse Test | "Brand expression" alone is not sufficient justification (a specific, named failure mode of §2's justification test — "brand" is not one of the seven acceptable answers unless it's backed by an actual, statable trait). For each expressive choice: what exact brand trait does this express, how does a user perceive that trait, is it consistent across the system, does it conflict with usability or trust, is there a less disruptive way to express it? |
| Anti-Minimalism Test | Has so much character been removed that the result feels anonymous? Warning signs: neutral sans-serif type with no reason, identical centered content widths everywhere, one accent color used only on buttons, perfectly regular spacing with no compositional variation, no meaningful imagery, no product-specific visual behavior, every page following the same shell, restraint treated as the design concept rather than a technique within one. This is the Blandness Test (§20) restated for when a direction has already committed to ambition and then quietly reverted to safety mid-build. |
| Controlled Rule-Break Test | Which conventional layout/system rules does the design deliberately break? For each: what rule, what product/expressive reason, what user risk, what responsive behavior, what accessibility impact, how does comprehension survive? If no rules are ever broken, the design may be generic; if many are broken simultaneously, it may become incoherent — the useful range is a small number of deliberate, individually-justified breaks, not zero and not many. |

### Route-Level Coherence Review

MUST inspect the experience across the full product, not just the direction's best screen — visual intensity may legitimately vary by route (marketing/discovery surfaces expressive, editing/financial-confirmation screens calmer, errors reducing decorative intensity, dense operational screens expressing identity through typography/rhythm/data behavior rather than imagery). Coherence does not mean identical intensity everywhere; it means every route's intensity level is a deliberate choice, not an accident of which screens got attention.

| Route | Primary task | Visual intensity | Signature element | Stable system element | Risk |
|---|---|---|---|---|---|
| Homepage | | | | | |
| Search | | | | | |
| Detail | | | | | |
| Create/Edit | | | | | |
| Settings | | | | | |
| Empty/Error | | | | | |

### Responsive Creative Direction

MUST NOT treat mobile as a compressed desktop composition (§12's response-strategy hierarchy already requires this in general; here it's applied to a creative concept specifically). MUST identify which signature elements survive, which are simplified, which are reordered, which become interaction-driven, which disappear, and how visual identity, motion, typography, image crops, and density each change going down in width. A design that loses its entire identity on mobile is incomplete; a design that preserves every desktop effect on mobile may become unusable — both are failures, in opposite directions.

### Motion Direction

§14's Motion Standard already sets the base rules (purpose test, duration/easing ranges, reduced-motion requirement, animation budget) — those still apply in full here. SHOULD additionally define a coherent motion *language* for an expressive product, rather than adding animations independently: what moves, what stays stable, directional logic, the relationship to user action, and a maximum-simultaneous-movement limit specific to this direction. Coherent examples: objects moving along one consistent spatial model; new content replacing old through directional continuity; data changes receiving short local emphasis; navigation transitions establishing location; a media interface using rhythm tied to playback or sequencing. AVOID mixing fades, slides, scales, bounces, parallax, rotations, and cursor effects unless they demonstrably form one intentional system — an unintentional mixture of all of them is indistinguishable from §4's "everything fades/slides into view" pattern, just spread across more distinct effects.

### Typography Direction

§8's Typography Rules set the base constraints (family count, systematic scale, line-length, contrast) — those still apply. For an ambitious direction, typography should also carry voice, rhythm, density, cultural reference, editorial character, technical credibility, numeric behavior, and a deliberate contrast between expressive and functional type. MUST test with real headings, long headings, multiple languages, numbers, dates, dense labels, mobile widths, and font-loading/fallback behavior (§11, §15's font-loading requirement) — an unusual typeface that only works for the one heading in the mockup is not tested. MUST NOT choose an unusual typeface solely to make the design distinctive — that's a Brand-Excuse Test failure with a font attached.

### Color Direction

§9's Color and Surface Rules set the base requirements (role-based palette, contrast verification, gradient justification, and — MUST NOT be relaxed by this section without saying so — accent color limited to interactive/priority elements) — those still apply. An ambitious direction that genuinely needs more expressive range than §9's single-accent model (a second, clearly-scoped color used for high-intensity moments, image-interaction color, or a distinct expressive region) MUST add it as a documented EXCEPTION per this file's convention: name the new role, state why §9's default roles don't cover this product's need, and state the tradeoff (more roles to keep disciplined, more surfaces to verify contrast on) — not as an unstated expansion of "accent" into several colors. A vibrant design does not require every surface to be colorful; use saturation strategically within whatever role set results so the important color retains impact (the same "reserve the accent" logic as the Accent Test, §20, applied to however many roles the EXCEPTION actually adds).

### Image and Illustration Direction

If imagery is central to the concept, SHOULD define subject matter, authenticity requirements, cropping, lighting, perspective, color treatment, background behavior, human representation, repetition rules, fallbacks, loading behavior, accessibility (alt text per §13), and rights/provenance. AVOID inconsistent mixtures of stock photography, AI illustration, product screenshots, 3D objects, flat icons, and editorial photography unless the contrast between them is conceptually deliberate and stated as such (an unstated mixture reads as "whatever was available," which is its own §4-style tell).

### Distinctiveness Rubric

A supplementary rubric for ambitious-direction work — this does not replace §21's general Scoring Rubric or override Governing Principle 7's must-pass gates; a visually distinctive interface that fails a must-pass gate is still incomplete regardless of this score. Score with written justification per dimension, never a bare number. 14 dimensions, /10 each, sums to /140; treat it the same way §21 treats its own bands (a summary aid requiring written justification, never sufficient by itself) rather than assigning this document's own named Low/Acceptable/Strong/Exceptional bands to a second, parallel scale — reconcile a §6 score and a §21 score for the same interface by reading both sets of written justification together, not by averaging the two numbers:

| Dimension | Score | Evidence |
|---|---|---|
| Product connection | /10 | |
| Concept clarity | /10 | |
| Emotional impact | /10 | |
| Visual distinctiveness | /10 | |
| Composition | /10 | |
| Typography | /10 | |
| Color discipline | /10 | |
| Motion coherence | /10 | |
| Cross-route scalability | /10 | |
| Responsive integrity | /10 | |
| Accessibility | /10 | |
| Performance feasibility | /10 | |
| Content resilience | /10 | |
| Usability preservation | /10 | |

MUST NOT average the score blindly. The direction fails regardless of total if: the primary task becomes unclear; the concept depends on fake or unavailable content (§11's data-integrity rules, Governing Principle 7); the design works only on the homepage (One-Screenshot Test, above); accessibility is substantially weakened; mobile loses essential functionality; the experience becomes slow or unstable; the concept is mostly a collection of current trends (Governing Principle 2's "temporary visual trend" evidence tier — would this direction still make sense if the trends underlying it fell out of fashion?); or the direction is interchangeable with an unrelated product (Swap Test, above).

### Independent Creative Review

This is Governing Principle 9's independent-review requirement, applied specifically to taste-based creative claims — exactly the category that principle already flags AI-agent review as weakest for, so a human or fresh reviewer matters more here than almost anywhere else in this document. SHOULD be run whenever Governing Principle 9's own triggers apply (work reaching production, work a real user will see, or exceeding the exception-count gate) to *any* interface built using this section — a visually ambitious direction doesn't get a separate, softer trigger than the rest of this document. After implementing the direction, ask a fresh reviewer to evaluate it *without* seeing the original creative brief first:

1. What does this product appear to be?
2. What should the user do first?
3. What three traits describe the design?
4. What visual idea is most memorable?
5. What feels product-specific?
6. What feels generic?
7. What feels excessive?
8. What feels underdeveloped?
9. Which routes appear to belong to another system?
10. What would you remove?
11. What would you strengthen?
12. Does it feel designed around the product, or styled after implementation?

Compare the reviewer's interpretation against the intended creative brief (Stage 1). If the perceived traits differ significantly from the intended ones, revise the work — a mismatch here is real signal, not noise, precisely because the reviewer had no access to what was intended.

**This section's own gaming risk, named directly (the same discipline §23 applies to exception-laundering and self-graded confidence for the rest of the document).** An agent can fill out the Creative Direction Brief and three "directions" with vague-but-differently-worded language, self-grade the Required Self-Checks and Distinctiveness Rubric, and call the work done without ever triggering Independent Creative Review — satisfying this section's letter while producing something no more product-specific than if §6 had never been consulted. There is a second, subtler version of the same risk: classifying a purely decorative flourish as Tier G "product-specific visual identity" rather than Tier H "decorative refinement and novelty" (Governing Principle 1) is itself an easy way to smuggle low-priority decoration past the priority ordering under a more flattering label. The Brand-Excuse Test and Product-Origin Test above are the actual checks against both versions of this — treat a direction that can't answer them concretely as not yet earning Tier G status, and route it back through Governing Principle 1 as ordinary decoration instead.

### Completion Standard

A visually ambitious design is ready only when, in addition to §23's general Definition of Done: its creative direction can be explained clearly; the direction derives from the product rather than a trend list; the primary workflow remains understandable; at least one memorable product-specific idea exists; expressive and restrained regions are deliberately balanced; the direction works across major routes and states; mobile retains the product's identity; motion forms a coherent system; typography and color survive realistic content; the design does not depend on fabricated evidence; accessibility and performance risks have been tested; independent review recognizes the intended character; the result does not resemble a default component-library composition; removing superficial effects does not destroy the underlying quality; and the result is neither generically minimal nor generically maximal.

The target is not a simple interface with no obvious AI clichés — that's this document's floor, not its ceiling, for a product that calls for more. The target is a distinctive and emotionally appropriate interface whose visual ambition emerges from the product, remains coherent across the experience, and strengthens rather than competes with the user's work.

---

## 7. Layout and Spacing Rules

### Spacing communicates relationship

MUST make spacing within a group smaller than spacing between groups. This rule (proximity — one of several Gestalt grouping principles alongside alignment, repetition, and contrast, all of which contribute to a layout reading as organized rather than scattered) is one of the most consistently repeated in UI/graphic design writing, and it is directly testable: measure the gap between two fields in the same form section vs. the gap between that section and the next one — the former should be visibly smaller.

MUST avoid making every section of a page the same visual weight — differentiate primary content from supporting content using space, type scale, and position, not arbitrary decoration (§2).

MUST avoid both crowding (no breathing room between unrelated elements) and theatrical emptiness (spacing so generous on a working screen that it reduces information density below what the task needs, §4). The right amount is a function of the product brief (§3), not a universal spacing amount.

### The card necessity test

Before wrapping content in a card/bordered container, MUST ask whether the content needs:

- Independent interaction (it can be clicked/dragged/selected on its own)
- A distinct surface (it needs visual separation from a busy background)
- Strong semantic grouping (it's a self-contained unit of meaning, not just nearby content)
- Reordering (users rearrange these relative to each other)
- Selection (users pick one of several)
- Repetition as a collection (many structurally identical items, like search results or products)
- Separation from the page background specifically (not just from other content)

If none apply, prefer normal document flow, a heading, whitespace, a divider, a subtle background-tint, or indentation instead of a card. This is the direct fix for §4's "excessive cards" pattern.

| Grouping need | Prefer |
|---|---|
| Loosely related content, same importance as its neighbors | Whitespace alone |
| A named subsection within a larger flow | A heading + whitespace |
| A tight visual/logical boundary without full separation | A divider (hairline rule) |
| A background shift signaling "this region behaves differently" (e.g., a code block, a quoted callout) | A background-color surface, no border needed |
| A parent/child relationship | Indentation |
| Independent interaction, selection, or repetition (see test above) | A card |

### Layout guidance by context

- **Page shells** — MUST decide, per screen type, whether the shell is full-width-with-sidebar (dense apps), constrained-centered (marketing/reading), or a hybrid (a constrained content column inside a full-width app shell, common for settings/detail views). Do not apply one shell to every screen type in a product (§4).
- **Content widths** — SHOULD constrain body text and forms to a comfortable reading/scanning width (see §8 for the line-length rule); SHOULD let tables, canvases, and dashboards use available width instead of forcing them into a narrow centered column.
- **Sidebars** — MUST remain usable (collapsible or off-canvas, not simply hidden) at narrower viewports (§12); avoid a sidebar wide enough to starve the primary content on common laptop widths.
- **Toolbars** — MUST define what happens when controls don't fit: wrap, collapse into an overflow menu, or reduce to icon-only with accessible names — decided deliberately, not left to overflow off-screen.
- **Forms** — SHOULD group related fields with proximity before adding a border; SHOULD generally use a single column for sequential data entry (faster completion, clearer order) unless fields are genuinely parallel (e.g., city/state/zip).
- **Tables** — MUST have a considered strategy for narrow viewports (horizontal scroll within a bounded region, column priority/hiding, or a card-per-row transform) rather than an uncontained overflow; see §12.
- **Detail views** — SHOULD separate primary identifying information from secondary metadata visually (position, size, weight), not list every field with equal weight.
- **Settings screens** — SHOULD group by the user's mental model of what changes together, not by backend data structure; a constrained content width usually aids scanning here.
- **Dashboards** — MUST apply the metric-value test in §4 to every tile/chart before including it; order by decision importance, not by data availability.
- **Marketing pages** — MAY use more generous spacing and centered composition than application screens, because the task here (persuade/inform) differs from the task in an app (get work done) — but still MUST vary section rhythm by content importance (§4). A marketing page with a flawless visual layout but no page title, meta description, or Open Graph/social-preview metadata is just as unfinished as one with a broken mobile layout — MUST set accurate per-page `<title>`/meta description/canonical URL and social-preview tags for any public marketing route; this is a visible-quality gap the moment the page is shared or found via search, even though it's invisible in a screenshot.
- **Empty states** — MUST include: why it's empty, and what to do next (§11), not decoration alone.
- **Authentication pages** — SHOULD be minimal and focused (one primary action), consistent with the rest of the product's visual system, not a separate unthemed template.
- **Dialogs** — MUST size to content, not to a fixed arbitrary width that clips or leaves excess empty space; MUST manage focus on open/close (§13).
- **Responsive grids** — MUST be tested at the breakpoints and intermediate widths defined by where the *specific* layout breaks (§12), not only common device widths.

---

## 8. Typography Rules

MUST limit a single interface to 1–2 typeface families (e.g., one for UI/body, optionally one distinct one reserved for code/data) unless the brand explicitly requires more. MUST derive sizes from one systematic type scale (a fixed ratio or an explicit set of steps, §5), not ad hoc per-element sizing.

| Rule | Guidance | Category |
|---|---|---|
| Number of families | 1, or 2 if one is reserved for code/monospace | Widely accepted default |
| Number of weights in active use | 2–3 per surface (e.g., regular, medium, semibold) | Widely accepted default |
| Body line length | ~45–75 characters per line for reading-oriented text | Widely accepted default (typographic convention, not a hard spec) |
| Body line height | Looser for reading text (≈1.4–1.6×), tighter for dense UI labels/tables (≈1.2–1.3×) | Context-dependent heuristic |
| Paragraph width | Constrained to the line-length range above; MUST NOT let body copy stretch edge-to-edge on wide viewports | Widely accepted default |
| Heading sizes | Reserve the largest 1–2 steps of the scale for the single most important statement per page/screen | Central Principle application |
| Labels/captions | Smallest step of the scale, MUST still meet contrast requirements (§13) — "smaller" is not an excuse to also go low-contrast | Standard-backed (contrast) + heuristic (size) |
| Alignment | Left-align body and application content by default; reserve center alignment for short, standalone statements (headlines, empty states, dialogs) | Widely accepted default |
| Numeric data | Use tabular/monospaced figures in tables and anywhere numbers must align vertically for comparison | Widely accepted default |
| Code/monospace | Reserve for actual code, IDs, hashes — not for prose meant to look "technical" (§4) | Central Principle application |
| Responsive type | Scale down heading sizes at narrow viewports rather than keeping desktop sizes and causing wrap/overflow | Widely accepted default |
| Marketing vs. application type | Marketing pages can use more dramatic scale jumps and looser tracking for impact; application interfaces should favor restraint and legibility over drama, since users read them repeatedly, not once | Context-dependent heuristic |

AVOID:
- Giant headings used purely for drama on screens where nothing is actually being emphasized more than usual (§4).
- Tiny, low-contrast gray labels used to look "sophisticated" — this usually just fails contrast (§13).
- Excessive uppercase for anything longer than a short label — widely reported to slow reading of running text, plausibly because it flattens the ascender/descender shape cues readers use to recognize word shapes (context-dependent heuristic; short labels/badges are a normal, low-risk exception).
- More than 3 font weights genuinely in play on one surface.
- Full-width, wide-column paragraphs with no max-width.
- Gradient text applied to every heading (§4).
- Letter-spacing values chosen per element rather than derived from the type scale.
- Negative letter-spacing (roughly -0.01em to -0.03em) applied to large headings as a default "premium" finishing touch, applied because it is a common convention elsewhere rather than because it was checked against this product's actual type metrics and visual thesis (§6) — the same failure as the shadcn button in §16, applied to type instead of components. **Round 7 correction, evidence-backed:** this AVOID entry previously claimed the value range itself "reads as a template tell in its own right." Round 7's live-rendered inspection of real production sites (`research/INTERFACE_STUDY_RECORDS.md`) directly contradicts that framing: Stripe's hero H1 measures -0.02em, Linear's -0.022em, Basecamp's -0.0225em, and Varda's -0.03em — four credited, definitely-human, definitely-not-generic products, landing squarely inside the flagged range on their primary heading. The range is not a reliable standalone signal; it is common contemporary practice among exactly the kind of confident, design-forward marketing pages this document holds up as positive examples. Tightened tracking in this range is not evidence of anything by itself — the only real test remains whether it was chosen against the type's actual metrics or applied unexamined, which is not visually detectable from the value alone.
- Monospace used merely to signal "technology."

Inspection questions: Does removing the largest heading size from all but the top 1–2 statements on this page change how it reads? Would a reader scanning quickly know what matters most? Is any body text under the WCAG contrast minimum (§13) because it was styled "quiet" rather than checked?

### Typography Decision Framework

For an important greenfield design (real stakes, not a throwaway prototype), MUST answer these 15 questions before committing to a typeface selection — in full in `TYPOGRAPHY_RESEARCH.md` Part 6, summarized here so this document stands on its own: (1) what role does this font play — display/body/UI/monospace need not share one answer; (2) is it identity-bearing or intentionally neutral, and is that the right choice for this product; (3) what product trait does it express, stated in one sentence tied to the actual brief (§3), not a mood word; (4) does its width support this product's actual content density; (5) does its x-height support the intended reading size; (6) does it support required languages and symbols; (7) are the needed weights/styles actually available; (8) does it render well on target devices, checked by actually rendering it, not assumed; (9) is the license appropriate — MUST NOT add a downloaded proprietary font file to a repository without confirmed permission; (10) is the loading cost justified; (11) does the fallback stack preserve layout; (12) is this selection based on this product's context or on familiarity/what's commonly recommended; (13) does the pairing (if more than one family) create meaningful contrast rather than arbitrary variety; (14) does the typography remain effective without decorative styling; (15) does it resemble an overused generated-site pairing reached for because it's recommended somewhere, including this document itself if consulted as a checklist rather than a set of questions to actually answer.

A named font family is neither banned nor pre-approved by appearing on any list, including the AI-associated-default list this document's earlier rounds and `TYPOGRAPHY_RESEARCH.md` Part 5 discuss (Inter, Roboto, Geist, Manrope, DM Sans, Plus Jakarta Sans, Sora, Space Grotesk, Poppins, Montserrat, Outfit, Urbanist, Instrument Sans/Serif, Fraunces, Playfair Display, and similar). These fonts are common defaults because they are frequently genuinely reasonable choices — free, well-hinted, broad-coverage, variable-weight faces solve a real problem. The signal worth treating as evidence is never the font name alone; it is the same unexamined-default pattern §16 already names for shadcn components, applied to type (question 12, above). A product that has a real, stated reason (questions 1–4) to use Inter is in a different position than one that used Inter because it didn't ask the question.

**Specimen prototyping requirement**: before selecting a typographic direction for an important greenfield design, MUST render at least 3 materially different typographic directions with this product's *actual* real or representative content (§11) — not a lorem-ipsum specimen and not a font-swap of one otherwise-identical layout. "Materially different" means the directions vary at least two of: type-scale proportion (how large the jump from body to display is), hierarchy model (how many distinct levels are visually distinguished and how), measure/line-length, spacing/line-height density, alignment, and overall density — the same structural-difference bar Stage 2 of §6 sets for whole creative directions, applied here specifically to type. A specimen that only swaps `font-family` while holding every size/spacing/alignment value constant does not satisfy this requirement, because it cannot actually test question 14 above (whether the typography works without relying on everything else staying identical). Render each specimen with the product's longest realistic heading, a representative paragraph, a dense numeric/tabular sample if the product has one, and at mobile width — not just one clean headline in isolation.

---

## 9. Color and Surface Rules

Require a role-based palette. Define these roles and let components reference *roles*, not raw color values:

| Role | Purpose |
|---|---|
| Page background | The base canvas behind everything |
| Primary surface | The default content container level |
| Secondary surface | A subordinate container level (e.g., a sidebar, a nested panel) |
| Elevated surface | Modals, popovers, dropdowns — visually "above" the page |
| Primary text | Default reading text |
| Secondary text | De-emphasized but still readable text (metadata, captions) |
| Muted text | The lowest-emphasis text still meant to be read — MUST still pass contrast (§13); "muted" is not license to fail contrast |
| Border | Default separators |
| Strong border | Emphasis separators (e.g., an active/selected item's border) |
| Accent | The product's one primary interactive/brand color |
| Accent hover / active | State variants of accent, not new colors |
| Focus | A distinct, always-visible ring/outline color; MUST meet WCAG 2.2's AA-level Focus Visible/Focus Not Obscured requirements, SHOULD also meet the stricter AAA-level Focus Appearance size/contrast thresholds where feasible |
| Success / Warning / Error / Information | Semantic-only; MUST NOT be reused for decoration |
| Selection | Background for selected items/text |

Rules:
- MUST limit accent color usage to elements that are interactive or that need to draw attention to state/priority; MUST NOT scatter the accent color across decorative elements that aren't interactive or don't carry meaning. Products commonly cited as well-branded rather than generic tend to *own* a single accent and apply it with total consistency (one purple, one gradient treatment, one monochrome pairing) rather than using several "on-brand" colors loosely — a single, disciplined accent is both the anti-generic move and the anti-decoration move at the same time; they are not in tension.
- **EXCEPTION for multi-tenant/white-label products:** the "own a single accent" default assumes one product with one brand. A platform whose UI is deliberately re-skinned per customer/tenant (the accent, and sometimes the logo/type, are the customer's brand, not the platform's) is a legitimate, different case — the platform's job is to define the *role* (accent, accent-hover, accent-active) and the contrast/accessibility guarantees those roles must satisfy for any value a tenant supplies, not to own one specific color itself. Verify tenant-supplied accent colors still meet the contrast requirements in this section before applying them.
- MUST NOT let more than a small number of surface tints appear on one screen without each one encoding a real distinction (§4, "too many surface colors").
- MUST verify contrast for every text/background and meaningful-graphic/background pairing against WCAG 2.2: 4.5:1 for normal text, 3:1 for large text (≥24px, or ≥18.66px bold), 3:1 for meaningful UI-component borders/states and graphical objects. Use an actual contrast-checking tool (e.g., WebAIM's contrast checker or an automated audit) rather than eyeballing it — this is automated verification, not heuristic judgment, and should be treated as such.
- MUST NOT convey status, error, or required information through color alone — pair color with an icon, text label, or pattern (Governing Principle 7; WCAG 1.4.1).
- SHOULD design dark mode as its own considered theme, not an automatic inversion: near-black (not pure-black) base surfaces, with elevation communicated by making surfaces progressively lighter as they sit "closer to the user" (Material's documented dark-theme approach uses a continuous white-overlay-opacity formula that increases with elevation, rather than a fixed small number of steps — implement it as a scale of a few practical stops for your own token system, e.g. base/raised/overlay/popover, but don't assume Material's exact formula is a universal 4–5-step standard), and slightly desaturated accent colors to avoid vibration against dark backgrounds. See §4 for the specific "pure black + neon" failure this prevents.
- MAY use gradients, but only after passing the **Gradient Justification Test**: can you name a reason this gradient exists beyond "it looks modern"? If yes and it's bounded to a specific area (not applied to text, buttons, and backgrounds simultaneously), it's a legitimate stylistic choice, not a red flag. (This is the canonical definition of the test; §4 and §20 reference it rather than restating it.)
- MUST NOT let decorative color compete visually with status color — if a page is full of colorful decoration, a red "error" state stops standing out.

**Surface count audit** — count distinct background colors/tints visible in one viewport. Each one MUST correspond to a real role in the table above; if two "different-looking" surfaces are actually the same role, they should be the same value.

---

## 10. Components and Interaction States

For each component category: correct use, common misuse, required states, accessibility requirements, responsive notes, content edge cases, and the tell of a generic/default implementation. Required states (apply the relevant subset per component): **default, hover, focus-visible, active, selected, disabled, loading, empty, error, success, read-only, partial/indeterminate, destructive-confirmation.**

| Component | Correct use | Common misuse | Required states (subset) | Accessibility | Generic-implementation tell |
|---|---|---|---|---|---|
| Buttons | One primary action per decision region (§4); label describes the outcome | Every action styled as a filled button; more than ~2 button styles used inconsistently; competing primaries | default/hover/focus-visible/active/disabled/loading | Accessible name matches visible label; disabled state still explains why if it blocks a needed action | All buttons are the same filled-gradient style regardless of priority |
| Links | Navigate or reference; underline or a clear non-color cue if inline in text | Styled identically to buttons, or vice versa, blurring navigation vs. action | default/hover/focus-visible/visited (optional) | 3:1 contrast against surrounding text if color is the only distinguishing cue (WCAG) | Every link looks like a button, or every button looks like a link |
| Text inputs | Single-line, short-to-medium data | Placeholder used as the only label (§4) | default/focus/disabled/read-only/error/success | Persistent, programmatically associated `<label>`; errors linked via `aria-describedby`/`aria-invalid` | Border-only styling identical to every library's default with no product-specific density/sizing decision |
| Text areas | Multi-line, longer content | Fixed tiny height forcing internal scrolling for expected content length | default/focus/disabled/error | Same as text inputs | |
| Select menus | Small, fixed option sets | Used for large/searchable lists (should be a combobox instead) | default/focus/open/disabled/error | Keyboard operable; visible selected value | |
| Comboboxes | Large or searchable option sets | Missing keyboard filtering; no "no results" state | default/focus/open/filtering/empty-results/disabled | Announces result count changes to screen readers | |
| Checkboxes | Independent binary choices, including multi-select in a list | Used for mutually exclusive choices (should be radio) | default/checked/indeterminate/disabled/error | Label click-target includes the box | Indeterminate state never implemented for partial-selection cases |
| Radio buttons | Mutually exclusive single choice from a small visible set | Used for choices better served by a select (long lists) | default/checked/disabled | Grouped with a fieldset/legend or equivalent | |
| Switches | Immediate-effect binary settings (not "submit to apply") | Used for choices that require a save/confirm step | on/off/disabled/loading | State communicated via more than color/position alone (label text) | |
| Tabs | Switching between views of the same object/context | Used for unrelated/sequential content that should be separate pages | default/selected/hover/focus-visible/disabled | Keyboard arrow-key navigation between tabs; correct ARIA tab roles | Tabs used purely as a "look" for a wizard/sequence |
| Tables | Comparing structured records | No strategy for narrow viewports (§12); no empty/loading state | default row/hover/selected/loading/empty/error | Real `<table>` semantics or equivalent ARIA grid roles; row/column headers associated | Infinite generic rows of placeholder-looking data never tested with real content variance (§11) |
| Lists | Ordered/unordered content, especially non-tabular | Rendered as a stack of full cards when plain rows would do (§4) | default/hover/selected/empty/loading | | |
| Cards | See §7's necessity test | See §4 | default/hover/selected/loading/error | Interactive cards are a single accessible target, not nested clickable regions with unclear focus order | |
| Navigation | Wayfinding across the product | Desktop nav squeezed into mobile without redesign (§4) | default/current-page/hover/focus-visible | Current page indicated by more than color; landmark roles | |
| Breadcrumbs | Deep hierarchical location | Added to flat/shallow structures for decoration | default/current (non-link) | Marked up as a list with correct `aria-current` | |
| Pagination | Large result sets where "load more"/infinite scroll isn't appropriate | Used with tiny result sets for no reason | default/current-page/disabled (ends)/loading | Keyboard operable; announces page changes | |
| Dialogs | Focused, interrupting tasks that need a decision before continuing | Used for content that could just be a page/panel (unnecessary interruption) | open/loading/error/destructive-confirmation | Focus moves into dialog on open and returns to trigger on close; Escape closes; focus trapped inside while open | Fixed generic width regardless of content, from a library default |
| Drawers | Secondary content/actions that keep page context visible behind them | Used identically to a dialog with no reason to prefer a drawer | open/loading/error | Same focus-management requirements as dialogs | |
| Tooltips | Supplementary clarification for an already-labeled control | Used to hide a control's *only* label (icon-only button with no accessible name otherwise) | visible-on-hover/focus | Must also appear on keyboard focus, not hover only; dismissible with Escape | |
| Popovers | Contextual actions/info anchored to a trigger | Used for content that should be a full dialog (loses page context inappropriately) | open/loading | Focus and dismissal behavior equivalent to dialogs at smaller scale | |
| Dropdown menus | A short list of actions on a trigger | Overloaded with too many unrelated actions | open/hover/disabled-items | Keyboard arrow navigation; correct menu roles | |
| Toasts | Transient, non-blocking confirmation of an action just taken | Used for information the user needed *before* acting, or for errors requiring action | appear/dismiss/auto-timeout | Announced via a live region; not the *only* record of an important outcome | |
| Alerts | Persistent, page-level important information | Used for routine confirmations that should be a toast instead | info/success/warning/error | Not color-only; appropriate ARIA role (`alert`/`status`) | |
| Badges | A real, current state of the underlying data (§4) | Decorative "New"/"Pro" labels with no real backing state | default/multiple semantic variants | Not the sole means of conveying meaning | |
| Charts | Data that supports an actual decision (§4, §7) | Decorative charts with meaningless data | loading/empty/error/populated | Data available in an accessible alternative (table/summary), not chart-only | |
| Date pickers | Selecting single or range dates | Reinvented custom widget with broken keyboard support | default/open/disabled-dates/error | Full keyboard operability; announces selected date | |
| File uploads | Adding files/documents | No feedback during upload; silent failure | idle/dragging-over/uploading/success/error | Progress and errors announced, not just visual | |
| Search | Finding content within the product | No empty-results or loading state | idle/typing/loading/results/no-results/error | Results count announced to screen readers | |
| Filters | Narrowing a large result set | No indication of active filters or how to clear them | default/active/disabled (no matches) | Active filter state visible and announced | |
| Command palettes | Fast keyboard-driven navigation/actions for power users | Added without validating it serves *this* product's users (a developer-tool pattern applied to a low-frequency consumer app) | closed/open/typing/results/no-results | Full keyboard operability; standard shortcut convention respected | |

MUST implement the states relevant to a component before considering it done — a button with no visible disabled/loading state, or a form with no error state, is an incomplete component, not a finished one with extra work optional.

**Security-adjacent UI concerns.** These are UI-implementation details, not backend architecture, so they're in scope here even though §1 excludes general backend/business-logic correctness: MUST render any user-supplied or externally-sourced rich text/HTML through a sanitizing path rather than raw injection, to prevent XSS — this is a routine, common production bug, not an edge case. Form inputs for name/email/password/address fields SHOULD carry correct `autocomplete` attributes so password managers and browser autofill work as users expect (a frequently-missed detail that makes a form feel unfinished even when everything else about it is polished). Paste handling into rich-text fields SHOULD strip or sanitize pasted markup rather than executing it verbatim.

**Permission and privacy communication.** When a UI shows or hides content based on ownership, role, or sharing settings, MUST communicate that scope accurately rather than implying broader or narrower access than actually exists — e.g., a "shared with 3 people" label MUST reflect real current sharing state, not a cached or assumed one. Requests for sensitive data (location, contacts, payment info) SHOULD state why the data is needed at the point of the request, not only in a separate privacy policy; vague deflections like "to enhance your experience" are a content smell analogous to generic marketing copy (§4) — they signal no one wrote a real reason because there may not be one. Prefer granular controls (per-category toggles) over all-or-nothing consent when the underlying permissions are actually separable. Where the product requires a specific legally-mandated UI pattern (a cookie-consent banner, an age gate, a jurisdiction-specific disclosure), MUST implement the actual requirement for that product's real jurisdiction/audience rather than a generic template banner copied from an unrelated product — this document does not attempt to enumerate jurisdiction-specific legal requirements, which change by region and over time and are outside its scope, but treats getting this right as part of the same "accurate communication" principle (Priority Tier B) as everything else in this paragraph.

---

## 11. Content and Data Integrity

MUST distinguish clearly, in your own reasoning and in code/comments where relevant, between:

- **Real data** — actual product data.
- **Seed data** — realistic data used for local development, clearly not shown to real users.
- **Placeholder data** — a stand-in the UI displays until real content loads (e.g., a name skeleton).
- **Demonstration data** — data used specifically to showcase the product (marketing screenshots, sales demos) — MUST be labeled as such if there's any risk of it being mistaken for real customer results.
- **Unknown data** — a value that exists but hasn't been provided yet.
- **Unavailable data** — a value that cannot be retrieved (permission, deletion, external failure).

MUST NOT present invented claims — statistics, testimonials, customer counts, "trusted by" logos — as fact (§4; Governing Principle 7 treats this as a completion blocker). MUST NOT invent plausible-sounding content to fill an "unknown" or "unavailable" slot — show the actual state ("Not provided," "Unavailable," a real error) instead of guessing.

MUST test layouts against realistic content variance, not only the tidy default case. At minimum, check:

| Test input | What it reveals |
|---|---|
| Very long names/strings | Truncation, wrapping, overflow |
| Very short / single-character strings | Minimum-width layout collapse |
| Missing / null values | Whether the UI shows a real "unknown" state or crashes/blanks |
| Zero values | Whether zero is rendered distinctly from "no data" |
| Very large numbers | Column/number formatting, alignment |
| Negative values | Sign handling in tables/charts |
| Duplicate values | Sort/dedup assumptions |
| Unusual characters (accents, emoji, RTL scripts, symbols) | Font coverage, direction handling (§ internationalization below) |
| Long unbroken strings (URLs, hashes, IDs) | Word-break/overflow behavior |
| Very large collections (hundreds+ of items) | Pagination/virtualization need, scroll performance |
| Empty collections | A real empty state (§10), not a blank region |
| Single-item collections | Whether grid/list layout degrades gracefully with one item |
| Failed image loads | Fallback/alt content |
| Slow-loading content | Loading state correctness (§10), no layout shift on arrival |

"Realistic" test data means data that resembles what the product will actually encounter — it does NOT mean inventing unsupported business claims (§4) to make demo content look more impressive.

### Dynamic state must be correct for the domain, not merely technically functional

A UI element that computes and displays a live value (a status, a countdown, a price, an availability count) is making a factual claim, and MUST be correct relative to the real-world thing it describes, not just internally consistent or bug-free by the narrowest test. A practical test of this document (Appendix F) shipped an "open now / closed" indicator for a business with a fixed physical location, computed from `new Date()` — the visitor's own browser clock. It worked perfectly for a visitor in the same timezone as the business and gave a confidently wrong answer for anyone else, because "no runtime error" and "correct" are different bars, and only the first one was actually checked before considering the feature done. **A real-looking state indicator that confidently communicates incorrect information is worse than no indicator at all** — the absence of a feature reads as absence; a wrong answer stated with the same visual confidence as a right one reads as trustworthy and misleads on that basis.

A second, mechanism-distinct practical test (Appendix F's round-8 entry, an internal ops dashboard) found a different way to fail this same requirement: a "time since last telemetry" readout stored each event's age as an offset relative to page load ("6 minutes before whoever opens this page"), then derived an "absolute" timestamp backwards from that offset fresh on every load. The relative age looked stable and correct in any single render; only comparing the *absolute* timestamp across two separate page loads of the same real event revealed it silently drifted, because it was never actually fixed — a blind reviewer caught this by comparing three screenshots side by side, which none of the build's own automated checks did. **The general rule this generalizes to: a relative/live value MUST be computed from a real, fixed record of when the underlying event actually happened, never the reverse of manufacturing a fake fixed value from a relative one** — the fixed timestamp is the source of truth; the live-updating relative string is a view derived from it on every render, not stored or reconstructed independently of it.

MUST identify, for any computed/dynamic UI value, what the actual authoritative source of truth is, and MUST NOT substitute a proxy (the visitor's local clock, a cached value, an assumed default) for that source without confirming they're equivalent for this product's real users. Concrete cases, some standard-backed and some this document's own synthesis of the underlying principle — MUST for the standards-backed items, SHOULD for the others as a strong default requiring active justification to skip:

- **Business hours / "open now" status** MUST be computed in the business's own timezone (e.g., via `Intl.DateTimeFormat` with an explicit IANA `timeZone`, which also handles daylight-saving transitions correctly), never the visitor's local clock, whenever the two can differ.
- **Prices** SHOULD state their currency explicitly when a non-obvious or non-default currency applies, and MUST state the conditions attached (tax included or not, deposit vs. full price, estimate vs. fixed) rather than presenting a bare number as unconditional.
- **Dates and times shown to a user** SHOULD use that user's actual locale and timezone for formatting, distinct from the point above about a fixed physical location's own hours — these are two different timezones that are each correct in their own context and MUST NOT be conflated.
- **Availability/inventory/capacity** MUST come from the same authoritative source the business or system actually uses to make that decision, not an assumption baked into the UI — if that source isn't available to check against, the UI MUST NOT claim real-time accuracy it can't back up (show the posted/static information instead, without a "live" framing).
- **Account/permission/subscription status** MUST reflect current backend state, not a value cached at page load or assumed from a previous session.
- **Progress indicators** MUST represent real, measured progress of the actual operation, not a generic animation timed to "feel about right."
- **Success/confirmation messages** MUST appear only after the underlying action is actually confirmed to have succeeded, not optimistically before the response is known (see §15's optimistic-update guidance for how to do this safely without a false-positive confirmation).

When the authoritative source for a claimed real-time value isn't available or reliable, the correct move is to show the static/posted information plainly (e.g., the regular hours table, with no live status line at all, or one that says "regular hours below — call to confirm" for cases like holidays this document has no way to know about) rather than ship a live-looking indicator that can't actually back up what it implies. See the Operational Truth Test, §20.

### Internationalization and content expansion

MUST NOT assume English-length strings when sizing UI elements. Widely accepted professional defaults (industry-practitioner figures, not first-party product measurement — per Governing Principle 2's tagging, these belong in the "widely accepted default" tier, not "evidence-backed," since that tier specifically means a *specific product's* user research): German strings commonly run 30–50% longer than English equivalents; other European languages typically expand 20–35%. MUST test with a longer-string locale or simulated expansion before considering layout final.

MUST support right-to-left layout considerations if the product will ship in an RTL language: mirroring of layout direction, navigation order, and directional icons (not just text direction) — full RTL support requires layout-level changes, not a CSS flip alone.

MUST NOT solve text overflow by truncating everything — preserve access to full content (a tooltip, a wrap, an expand control) rather than silently cutting information the user needs (§4, "truncated content without a recovery mechanism").

Also account for locale-dependent date/time/number/currency formatting, pluralization rules, and locale-aware sorting when the product supports multiple locales.

---

## 12. Responsive Design Standard

Responsive design is NOT "does it avoid horizontal overflow." MUST inspect, at each viewport tested: reading order, action priority, control discoverability, navigation behavior, form usability, table behavior, toolbar wrapping, modal dimensions, touch target size, chart legibility, text truncation, keyboard behavior, sticky-element behavior, viewport height (not just width), landscape mobile, and zoomed desktop layouts.

### Response strategy hierarchy

When content doesn't fit the available space, apply strategies in this order, moving down only when the one above genuinely doesn't work for that content:

1. **Preserve** — the layout already handles it; do nothing.
2. **Reflow** — let content wrap/reorder using normal flow (flex/grid) without resizing anything.
3. **Resize** — shrink type/spacing according to the system's scale (§5), not ad hoc.
4. **Wrap** — allow a toolbar/row to wrap to multiple lines.
5. **Collapse** — combine controls into a single disclosure (e.g., an overflow menu).
6. **Relocate** — move an element to a different position (e.g., sidebar → bottom sheet).
7. **Summarize** — show a condensed representation with access to full detail (e.g., a table row collapses to a card showing only key fields, with a way to see the rest).
8. **Scroll within a deliberate region** — a bounded, intentional scroll container (e.g., a horizontally scrollable table), not an accidental page-level overflow.
9. **Hide only when nonessential** — MUST be justified: state what's being hidden and why it's safe to hide at this width, before removing it from a narrower layout.

MUST test intermediate widths (not only a phone width and a desktop width) — independent analyses of responsive-design failure point to the roughly 600–900px tablet/small-laptop range as where many designs break because it receives the least testing attention. MUST test landscape mobile and zoomed-desktop (see §13) as distinct cases, not assumed to behave like the nearest breakpoint.

Breakpoints SHOULD be chosen where a specific layout actually fails, not solely from a generic device-width chart; common anchor widths (roughly ~480/768/1024/1280px) are a reasonable starting point, but the deciding factor is where *this* layout's content stops working, not matching a device's marketing name.

MUST NOT hide essential content or controls at a supported viewport without an equivalent path to reach them (Governing Principle 7 gate).

---

## 13. Accessibility as a Quality Requirement

Accessibility MUST be built in throughout implementation, not audited once at the end — and accessibility failures are also, independently, a strong signal of an unfinished or superficial build, because they usually indicate no one interacted with the rendered output using anything but a mouse and eyes.

**What "manual with a screen reader" means when you are an AI agent without one.** Several checks below are marked "manual" because that is the correct, most rigorous method — but an AI agent working alone typically does not have a literal screen reader and a human ear to verify what it announces. Per Governing Principle 3 (Limits of AI Evaluation), do the best available approximation and say so explicitly, rather than silently treating a weaker check as equivalent to the real one:

1. **Best available for an agent alone:** inspect the accessible-name/accessible-description computation directly (via browser devtools' accessibility tree, or an automated tool such as axe-core/Lighthouse/Pa11y) to confirm a name/description exists and is correct — this catches missing labels and broken `aria-describedby` wiring without needing an actual voice output.
2. **Also do:** a full keyboard-only pass (Tab/Shift+Tab/Enter/Space/Arrows/Escape) through the real, rendered UI — this is genuinely and fully achievable by an agent with browser access, not just an approximation, and it catches a large share of what a screen-reader user would also hit (unreachable controls, wrong focus order, traps).
3. **State the gap:** when reporting results (§25's template), distinguish "verified via accessibility-tree inspection and keyboard testing" from "verified with an actual screen reader by a person" — these are different confidence levels, and claiming the former as if it were the latter is exactly the kind of invented-validation problem Governing Principle 3 prohibits.
4. **When a human or real assistive technology is available** (the user, a teammate, a device lab), prefer that for Critical-path flows before calling accessibility work done at the highest confidence band (§22).

| Requirement | Standard | Check |
|---|---|---|
| Semantic HTML | Use native elements (`button`, `nav`, `table`, `label`, headings) before reaching for generic `div`/ARIA | Inspect DOM for div-soup where a semantic element exists |
| Heading structure | One `h1` per page; no skipped levels | Automated + manual outline check |
| Form labels | Every input has a programmatically associated, persistent label — placeholder is never a substitute (§4) | Automated (missing accessible name) |
| Error association | Errors linked to their field via `aria-describedby`/`aria-invalid`, not just visually adjacent | Manual: does a screen reader announce the error on focus? |
| Keyboard access | Every interactive element reachable and operable via keyboard alone, in a logical order | Manual: navigate the full flow using only Tab/Shift+Tab/Enter/Space/Arrows/Escape |
| Focus-visible treatment | MUST (AA): the focus indicator is visible and not entirely obscured (WCAG 2.2 Focus Visible / Focus Not Obscured). SHOULD (AAA, a stricter but valuable target): also meet Focus Appearance's specific size/contrast thresholds (≥3:1 against adjacent colors, sized appropriately) — this specific numeric criterion is AAA-level, not a universal AA requirement, so don't treat it as mandatory for AA-conformance claims, but don't skip it either since it materially helps keyboard/low-vision users | Automated contrast check + manual visual check |
| Skip links | Present where repeated navigation would otherwise force a keyboard user through it on every page | Manual: first Tab press on page load |
| Contrast | 4.5:1 normal text / 3:1 large text / 3:1 meaningful graphics & UI component borders (WCAG 2.2) | Automated tool (e.g., WebAIM contrast checker) |
| Non-color indicators | Status/required/error never conveyed by color alone | Manual: grayscale the page (§20) and re-check comprehension |
| Screen-reader names | Icon-only controls have an accessible name (`aria-label` or equivalent), not just a tooltip | Automated + manual with a screen reader |
| Live regions | Dynamic updates (toasts, async results, form errors) announced via appropriate ARIA live regions | Manual with a screen reader |
| Dialog focus management | Focus moves in on open, is trapped inside while open, returns to the trigger on close | Manual keyboard test |
| Reduced motion | `prefers-reduced-motion` respected for all non-essential animation (§14) | Automated (media query present) + manual (OS setting toggle) |
| Touch targets | ≥24×24 CSS px minimum (WCAG 2.2 §2.5.8), with 44×44 as a widely used stronger default (Apple HIG/Material) where space allows | Manual measurement |
| Zoom / text enlargement | Usable at 200% browser zoom and at large OS-level text-size settings, without loss of content or function | Manual test at 200% zoom |
| Table semantics | Real header/data cell association (`<th>`/`scope`, or ARIA grid equivalents) | Automated + manual |
| Alternative text | Meaningful images have descriptive alt text; decorative images are marked so they're skipped | Automated + manual |
| Icon-only controls | Always paired with an accessible name; tooltip alone is not sufficient (tooltips aren't reliably exposed the same way) | Manual with a screen reader |
| Disabled-state communication | A disabled control's reason is discoverable, not just an unexplained inert element, when it blocks a needed action | Manual review |

MUST fix all Critical accessibility failures and, absent a documented constraint, all Major ones before calling work complete (Governing Principle 7, §22).

---

## 14. Motion Standard

Before adding any motion, identify its purpose. Legitimate purposes:

- **Spatial continuity** — showing where something came from or is going (e.g., a drawer sliding from the edge it's anchored to).
- **State transition** — visually connecting a before/after state so the change isn't jarring.
- **Feedback** — confirming an action was registered (e.g., a button's brief pressed state).
- **Causality** — showing that one thing caused another (e.g., a new item's insertion point).
- **Attention guidance** — directing focus to something the user needs to notice right now (e.g., an error just appearing) — used sparingly.
- **Progress communication** — showing that a system is working, not stalled.

If none of these apply, motion SHOULD normally be omitted. This is the direct fix for §4's "gratuitous animation" pattern.

Naming one of these purposes is not by itself sufficient justification — these categories are broad enough that almost any animation can be labeled "feedback" or "attention guidance" after the fact. Apply §2's removal test as the actual check: if removing the animation entirely doesn't measurably hurt comprehension of state, causality, or progress, it wasn't really serving that purpose, regardless of what it's labeled. Be suspicious of your own reasoning here specifically because this is an easy rule to satisfy in form while missing it in substance.

| Aspect | Guidance |
|---|---|
| Duration | Small UI transitions: ~150–200ms. Larger transitions (panel/page-level): ~250–400ms. Longer durations feel sluggish; shorter feel abrupt or get missed (widely-cited Material Design convention). |
| Easing | Standard "ease-in-out"-style curves for most transitions (fast start or end feels unnatural for symmetric moves); avoid linear easing for anything meant to feel natural. |
| Entry/exit | Entering elements may accelerate in; exiting elements may accelerate out — asymmetric easing generally reads as more natural than one curve for both. |
| Interruptibility | An in-progress animation MUST be interruptible by a new user action, not block input until it completes. |
| Reduced motion | MUST provide a reduced/no-motion alternative via `prefers-reduced-motion` for anything non-essential — swap movement for a simple opacity change or remove it, rather than ignoring the preference. |
| Repeated animation | Looping/attention-seeking animation (pulsing, bouncing) MUST be used only for something that genuinely requires ongoing attention, and MUST stop once acknowledged. |
| Loading animation | See §10/§4 — shape to match real content, use only above a noticeable-delay threshold. |
| Hover effects | Every hover effect MUST communicate interactivity or a real state — not decoration for its own sake (§4; the Interaction Test, §20). |
| Scroll-based effects | Parallax and scroll-triggered reveals are a strong AVOID for application interfaces; for marketing pages, use only where it clarifies a sequence or relationship, never merely to look sophisticated. |
| Layout shift | Motion MUST NOT cause unexpected layout shift for unrelated content (protect CLS — see Performance below). |

**Animation budget.** For any single view, count how many independently-animating elements exist at once (entrance animations, hover effects, looping indicators). If most elements on the screen are moving independently with no shared coordinating logic, that is a signal of "everything fading/sliding" (§4) rather than deliberate motion design — reduce to the ones that pass the purpose test above.

---

## 15. Performance and Perceived Quality

Performance is part of UI quality, not a separate backend concern — a visually polished screen that stutters, jumps, or double-submits reads as unfinished exactly like a missing empty state does. Review:

| Area | What to check | Category |
|---|---|---|
| Main-content loading | Is the content the user came for visible quickly, before secondary chrome? | Standard-backed (LCP) |
| Interaction responsiveness | Does the UI respond to clicks/taps/keystrokes without a perceptible stall? | Standard-backed (INP) |
| Visual stability | Does content shift position unexpectedly as things load (ads, images, async content, fonts)? | Standard-backed (CLS) |
| Font loading and fallback | Is there a sane fallback font during web-font load, sized close enough to the final font to avoid a jarring reflow? | Widely accepted default |
| Image sizing and loading | Are images given explicit dimensions (preventing layout shift) and appropriately sized/lazy-loaded for their placement? | Widely accepted default |
| JavaScript cost | Is the interface shipping/executing more script than the interaction actually needs? | Widely accepted default |
| Rendering cost | Do frequent re-renders or expensive layout/paint operations cause visible jank during scrolling or interaction? | Widely accepted default |
| Large collections | Do large lists/tables remain responsive, or does rendering hundreds of DOM nodes at once stall the page? | Widely accepted default |
| Virtualization | Is windowing/virtualization used where a collection is large enough that rendering it all is the actual bottleneck (not applied reflexively to small lists)? | Context-dependent heuristic |
| Animation cost | Do animations run on cheap properties (transform/opacity) rather than properties that force layout recalculation? | Widely accepted default |
| Skeleton/placeholder behavior | See §4/§10 — shown only above a noticeable-delay threshold, shaped to match final content to avoid shift on arrival | Context-dependent heuristic |
| Slow/unreliable network behavior | Does the UI degrade gracefully (clear loading/error/retry states) rather than hanging silently, when tested under throttling? | Widely accepted default |
| Disabled/delayed action feedback | Does a button that triggers a slow operation show it's working (disabled + loading state), rather than looking inert or allowing repeat clicks? | Widely accepted default |
| Optimistic updates and rollback | Where an optimistic UI update is used, is there a real rollback path and error message if the underlying action fails? | Widely accepted default |
| Duplicate submission prevention | Is a form/action guarded against double-submission from a double-click or slow network retry? | Widely accepted default |
| Race conditions visible in the UI | If a slower-issued request can resolve after a faster/later one, does the UI keep the latest intent's result, or can a stale response silently overwrite newer state? This class of bug is specifically insidious because nothing crashes and no error appears — the screen just becomes quietly wrong (e.g., search results from an abandoned query appearing after a new one was typed) | Widely accepted default |
| State ownership clarity | For any value shown in multiple places (a count in a sidebar and in a detail view, a status badge in a list and on its detail page), is there one clear source of truth it derives from, rather than several independently-fetched copies that can drift out of sync? | Widely accepted default |

**Core Web Vitals as a starting measurement, not the whole picture.** As general starting thresholds when applicable: Largest Contentful Paint (LCP) under ~2.5s, Interaction to Next Paint (INP) under ~200ms, Cumulative Layout Shift (CLS) under ~0.1, each evaluated at a realistic percentile of real usage rather than a single best-case load. MUST NOT treat passing these three numbers as proof the whole experience performs well — they measure loading, responsiveness, and stability at a page level, not whether a specific slow interaction inside an already-loaded page feels smooth, or whether a large data operation blocks the UI. Use real field data when available; fall back to lab testing (throttled network/CPU) when it isn't, and say which one a conclusion is based on.

**Locking in quality over time.** A one-time manual review (§18–§19) catches what exists today but not what a later change silently breaks. Where the project's tooling supports it, MAY add automated visual-regression testing (screenshot-diffing on key routes/states) so future changes that alter layout are caught by a check rather than requiring someone to notice; MAY add runtime error monitoring/crash reporting so failures the user's session hits (not just what your own testing hit) become visible instead of silent. Neither is required to consider a single piece of UI work done, but their absence on an ongoing production product is itself a gap worth flagging (§26, unresolved-questions style) rather than silently assuming someone else has it covered.

If you do add visual-regression testing, SHOULD account for the specific things that make such tests flaky in practice: randomized/live data (mock or fix it for the test), running animations and transitions (disable them for the snapshot), inconsistent font rendering across environments (pin a consistent rendering environment), and race conditions between async content loading and the moment the screenshot is taken (wait for a genuine loaded/settled signal, not a fixed timeout). A flaky visual-regression suite that gets skipped or ignored on failure provides less real protection than no suite at all, because it trains the team (or the next agent) to disregard red results.

---

## 16. Component-Library De-Defaulting

Do not avoid component libraries — Tailwind CSS, shadcn/ui, Radix UI (primitives), Material UI, Chakra UI, Bootstrap, Ant Design, Headless UI, and similar systems are legitimate accelerators. The failure is shipping their *default visual expression* unexamined (§4), which independent critiques identify as one of the most recognizable "tells" of a generated interface — precisely because so many projects share the exact same untouched defaults.

**This section's checklist applies even when no library is involved.** Hand-written CSS converges on the same defaults for the same reason: they are the path of least resistance, not a property of any specific library. A `border-radius: 4-8px` button with a solid accent fill and an `opacity: 0.9` hover state is the shadcn/Tailwind default *convention*, and reproducing that shape and interaction pattern by hand, with only the fill color changed, is the identical failure this section describes — "no component library" is not evidence of de-defaulting, only evidence that a library isn't the traceable source. Two conventions common enough to have become defaults in their own right, whether or not a library produced them:
- **Solid-fill button + opacity-fade hover.** The hover state changes nothing about the button's actual color role — it just fades it. This is called out specifically because "hover states that do nothing" (an opacity tween with no other change) is a named tell of generated interfaces; a real hover state changes a role-based value (background shade, border, elevation), not just alpha.
- **Small uniform radius on every rectangular control** (frequently 4-8px) regardless of what the product's visual thesis (§6) would actually imply — sharp/near-0 radius, a much larger radius, or asymmetric radius are all legitimate choices when derived from a stated direction; 4-8px-everywhere is only a problem when it's the unexamined default rather than one of these.

Before considering a library-based UI finished, MUST have deliberately reviewed and set (not merely left at default) each of:

- **Radius** — chosen per element role (§5), not the library's single global default value everywhere.
- **Color** — a role-based palette (§9) mapped onto the library's theming mechanism, not just the accent/primary color swapped while every neutral, border, and surface stays default. **Changing only the accent color does not constitute customization** — this is explicitly called out because it is the most common half-measure.
- **Typography** — the product's chosen type scale and family(ies) (§8), not the library's bundled default font and size steps.
- **Spacing** — the product's spacing scale (§5) applied to the library's spacing props/utilities, not the library's default density.
- **Control dimensions** — heights/paddings for buttons, inputs, and rows decided deliberately for this product's density needs (§3), not left at default.
- **Borders** — width and color decided as part of the palette, not left at the library default alongside a new accent color.
- **Shadows** — mapped to this product's elevation scale (§5), not the library's default shadow preset applied everywhere uniformly.
- **Iconography** — a deliberately chosen icon set and usage discipline (§4, §10), not just whatever the starter template bundled.
- **Density** — an explicit choice per §3's product type, not the library's one-size default.
- **Component composition** — how components combine into this product's actual screens, not the library's demo/kitchen-sink layout reused as the real page structure.
- **Motion** — the library's default transitions reviewed against §14's purpose test, not left untouched.
- **Page structure** — overall page shells (§7) built for this product's information architecture, not the library's example dashboard/marketing template used as the real structure.

MUST remove unused variants, components, and utility classes the library ships that this product doesn't use — an unused surface of options is easy to accidentally reach for later without a decision, reintroducing default-library patterns.

**EXCEPTION: staying recognizable can itself be the deliberate choice, not a failure to de-default.** For a narrow but real set of products, an interface that visually resembles its component library's conventions is correct, not generic — an internal enterprise tool where every user already knows a common design language, a developer tool whose users specifically expect the look of the ecosystem's standard components (so it reads as familiar and trustworthy rather than as an unfamiliar bespoke system to learn), or a plugin/extension meant to blend into a host platform's existing UI. The distinguishing question is the same one that runs through this entire document (§2): was staying close to the library's defaults an active decision made *for a reason specific to this product's users* (familiarity, consistency with an existing internal ecosystem, integration into a host UI), or was it simply never reconsidered? A team that explicitly decided "our internal tool should look like every other internal tool built on this design system, because our users context-switch between a dozen of them daily and unfamiliarity would cost them time" has satisfied this section's requirement even while looking close to default — they can answer why. A team that never asked the question has not, even if the final product happens to look different by way of `dub.co`-style tokens getting layered on top of a shadcn/Radix foundation. (Dub, a widely-used open-source link-management product, is a documented example of a product that started on shadcn/ui primitives and grew its own multi-hundred-component internal system on top of that foundation over time — evidence that de-defaulting is a trajectory teams actually follow in production, not just a hypothetical this document invented, but also evidence that the foundation itself was never the problem.)

---

## 17. Implementation Workflow

A staged process for any non-trivial UI task.

**Stage 1 — Inspect.** Read the repository structure. Identify the framework and styling approach in use. Find existing tokens, global styles, layout primitives, and components before adding new ones. Identify repeated patterns already established. Inspect all relevant existing routes/screens. Determine whether a design system already exists (even an informal one) — if so, extend it; do not introduce a parallel, inconsistent convention. Note existing inconsistencies rather than silently reproducing or "fixing" them without flagging the change.

**Stage 2 — Model the product.** Fill out the product brief (§3). Map the primary workflow, the states that matter, the information hierarchy, the major entities involved, the key user decisions, and the navigation structure.

**Stage 3 — Establish the visual system.** Define or extend tokens (§5), typography (§8), surfaces (§9), core components (§10), layout rules (§7), and responsive behavior (§12) — proportional to project size (§5).

**Stage 4 — Build the structural version.** Implement hierarchy and the real workflow before decoration. The first working pass SHOULD function without: gradients, complex shadows, entrance animation, decorative illustrations, glass effects, special cursors, or excessive icons. If it doesn't work as a plain, unstyled-but-structured version, decoration will not fix it.

**Stage 5 — Add visual refinement.** Add only refinements that have a stated purpose per §2's justification test.

**Stage 6 — Test states and content extremes.** Exercise every meaningful state (§10) and the content variance list (§11).

**Stage 7 — Conduct visual review.** Render and inspect at multiple routes and viewport sizes (§18).

**Stage 8 — Simplify.** Remove unnecessary elements, wrapper divs, one-off styles, and effects that didn't survive §2's test.

**Stage 9 — Final audit.** Apply the scoring/severity framework (§21–§22) and confirm the completion gates (Governing Principle 7, §23).

---

## 18. Visual Inspection and Tool Use

Code review alone cannot catch most of what this document is about — you MUST inspect the rendered output.

**First-Impression Review MUST happen before detailed technical inspection, not after.** Once you've inspected a screenshot for contrast, overflow, and pattern-catalog compliance, you can no longer see it fresh — so capture the fresh reaction first, before it's contaminated by the checklist. Before running any of the mechanical checks below, look at the rendered screen and answer, in this order, without design vocabulary: What is this? Who is it for? What am I supposed to do here? What does it feel like? What looks familiar — like something seen many times before? What looks distinctive or specific to this exact product? What, if anything, feels fake, hollow, or generic — and can that impression be traced to something specific, or is it just a vague feeling (if the latter, keep looking until you can name the specific thing, or discount the impression)? Write these answers down before proceeding to the mechanical checklist — this is cheap insurance against the failure documented in Governing Principle 11, where a rationale-laden technical review missed something a genuinely fresh look catches immediately. Self-administering this is real but weaker evidence than an independent reviewer doing it (see the Blind Review Requirement below) — a builder reviewing their own work is never fully unprimed, no matter how deliberately the fresh-look step is sequenced first.

**Blind Review Requirement.** For any UI work of real consequence — reaching production, shipping to a real user, or meeting Governing Principle 9's independent-review trigger — the First-Impression Review above MUST also be performed by a reviewer with none of the following visible: the original prompt or brief, the intended creative direction or thesis, implementation notes, any self-score, or this document's own rationale/checklist language. A fresh agent context (a new subagent invocation with no shared history) or a human are both valid; a continuation of the same conversation that built the UI is not, because it already has the rationale in context whether or not that context is explicitly re-read. Record the reviewer's unprompted reaction verbatim, including disagreement with your own assessment — a reviewer's blind first reaction is evidence in its own right, not a step to be summarized away if it's inconvenient. This requirement exists because of a documented failure, not a hypothetical one: a design decision defended with an internally consistent rationale was independently read by two blind reviewers as reinforcing the exact problem it was meant to fix (Governing Principle 11; full detail in `research/SELF_AUDIT.md` for the project this document was developed alongside). A same-author review, however careful, did not and structurally could not have caught this on its own.

**Inspecting routes in isolation is not the same as verifying a workflow, and it's the more common shortcut to take.** A screenshot of every route can look complete while the path connecting them is broken — a create action that doesn't show up in the list it should land in, a form that resets state it shouldn't, an edit that doesn't reflect in a summary view elsewhere. MUST additionally walk at least one real, complete task end-to-end (e.g., create → see it reflected in a list/summary → edit → see the update propagate → delete/complete → confirm the resulting state), not just visit each screen once in isolation. This is the direct countermeasure to the aesthetic-usability effect (§0 Governing Principle 3): a set of individually attractive, individually-working screenshots is exactly the failure mode that per-screen review misses and a continuous task walkthrough catches.

Depending on tools actually available in your environment, run the application and, for every route relevant to the change:

- Visit the route and capture a screenshot.
- Inspect at desktop, tablet, and mobile widths, AND at intermediate widths (§12) — not only the two extremes.
- Compare visually related pages side by side for consistency.
- Walk the complete task described above across routes, not just each route in isolation — confirm state actually propagates where the product implies it should.
- Test hover and focus states explicitly (don't rely on the default/rest state alone).
- Navigate using only the keyboard, start to finish, for the primary workflow.
- Trigger and inspect loading, empty, error, and normally-populated states, not just the populated one.
- Check the browser console for warnings/errors.
- Check for overflow (horizontal scroll appearing where it shouldn't; clipped content).
- Check for layout shift (content jumping as it loads).
- Check that menus, dropdowns, and dialogs aren't clipped by a parent's `overflow: hidden` or viewport edge.
- Check sticky-positioned elements at scroll extremes.
- Inspect both light and dark modes if both exist.
- Review at 200% browser zoom.
- Test with long/extreme content (§11).
- Test with the OS/browser reduced-motion setting enabled.
- Test with a throttled/slow network connection where loading behavior matters.
- Check the target browser(s) the product actually needs to support, not only whichever one your tooling defaults to — a layout or API that only works in one engine is a real production failure this checklist would otherwise miss.
- If the product has a stated no-JS/progressive-enhancement requirement, verify core content and navigation remain usable with JavaScript disabled; if it doesn't have that requirement, this check is not applicable — don't invent a requirement the product brief (§3) didn't ask for.

If browser automation and screenshot tools are available in your environment, use them rather than reasoning about the UI from source code alone. If you have image-understanding capability, actually look at the screenshots critically — check for the §4 pattern catalog, hierarchy, density, and consistency issues — rather than treating a successful screenshot capture as proof of quality. Examine the result the way a user encountering it fresh would, not merely confirm that elements rendered without crashing.

---

## 19. Self-Critique Procedure

Repeat this cycle until further changes would be marginal or subjective, not because a fixed number of iterations was reached:

1. **Render** the current state.
2. **Capture** screenshots across the required viewports/states (§18).
3. **Inspect** critically, using §4's catalog and §20's diagnostics.
4. **List defects** — specific and concrete, never a vague overall impression.
5. **Rank defects by impact** — what most affects task completion, comprehension, or credibility first.
6. **Fix the highest-impact defects.**
7. **Render again.**
8. **Compare before and after** — did the fix actually address the defect without introducing a new one?
9. **Repeat** until remaining issues are genuinely marginal/subjective, and document any you consciously chose not to fix (an EXCEPTION, §23).

The critique in step 3 MUST look for: generic structure, excessive decoration, weak hierarchy, inconsistent spacing, repeated card patterns, default-library appearance, unnecessary icons, unclear actions, unrealistic data, missing states, accessibility problems, responsive failures, copy that doesn't sound product-specific, areas that look fine in isolation but incoherent together, density mismatched to the task, and components attracting more attention than their importance warrants. Step 3 MUST also run the following four structured audits, not as extra optional detail but as the actual mechanism for catching what a pattern checklist alone misses (Governing Principle 11).

**Composition Audit** — evaluates the whole arrangement, not individual components:
- Where is the focal point, and does it match the page's actual most-important content or action?
- Does visual/spatial contrast vary meaningfully across the page (some regions denser or louder, others quieter), or is everything evenly resolved at the same volume throughout? Evenly-resolved-everywhere is the specific signature research associates with generated interfaces — genuine visual tension comes from *uneven* contrast and spacing, not from any specific layout shape (`research/RESEARCH_REPORT.md` §6a).
- If any asymmetry or grid-breaking is present, would a viewer be able to sense the more conventional alternative it's deviating from? Grid-breaking only reads as a choice when the rule it breaks is legible; used more than once or twice on the same surface, it stops reading as a statement and starts reading as noise.
- Did every content group become a card/rectangle by default, or does the composition actually respond to what each piece of content is?
- Does page structure follow this specific product's information architecture, or a template/library's available shapes?

**Authorship Audit** — evaluates whether decisions are traceable to this product or to habit/library/trend:
- Which decisions would be difficult to reproduce by swapping the product's name and copy for an unrelated product's? (This applies to composition and interaction, not just content — a compositional move reached for regardless of what the product actually is is a library move, even if no literal component library was used.)
- Which decisions exist because they were the easiest available move (a decorative device that gestures at a theme, an asymmetric layout added because asymmetry was the last lesson learned) rather than because the product's actual content demanded them? See Governing Principle 11's corner-bracket case for what this looks like when it goes wrong.
- Is there a coherent point of view, and does it survive past the first viewport, into secondary routes, states, and narrower widths — or is the signature confined to the hero?
- Would this design's character be visible to someone who never read its rationale? If the design only makes sense once its creative brief is explained, the brief is doing work the design itself should be doing.

**Realism Audit** — evaluates content and operational fidelity, which research found to be a stronger, more diagnostic signal cluster than any visual pattern (`research/RESEARCH_REPORT.md` §4):
- Does every decorative or "technical-looking" element carry real information proportional to its visual prominence, or is it a placeholder wearing the visual costume of data? (If a diagram, chart, or readout is illustrative rather than real, say so honestly in its own caption — per §11's existing Operational Truth Test — but also ask whether real information could have been used instead of a stand-in.)
- Are claims, metrics, and testimonials supported, or fabricated-but-plausible? (Fabricated social proof is a documented pattern serious enough to have drawn FTC regulatory action against consumer-facing products — `research/RESEARCH_REPORT.md` §4 — treat it as a hard line, not a style choice.)
- Does the content model real constraints, exceptions, and awkward-but-necessary detail (pricing conditions, permission states, partial completion, legacy behavior), or only the tidy default case?
- Does dynamic/computed state represent real, authoritative information, or a plausible-looking placeholder standing in for it?

**Personal-Defaults Check** — evaluates whether the *builder's own* recurring habits, not just generic AI/library patterns, produced this result. This audit exists because the other three ask "does this look generic" and "does this look product-specific," but neither asks "does this look like *me*, regardless of the product" — and this project's own record (`CLAUDE_DESIGN_DEFAULTS.md`, built from this project's own prior builds) shows that's a real, distinct, and recurring failure mode, not a hypothetical one:
- Check the current design against every entry in `CLAUDE_DESIGN_DEFAULTS.md` specifically, not just §4's general catalog — that document names defaults evidenced in this project's own prior work (rationale-over-perception assessment, performative code comments, treating this guide's own illustrative examples as prescriptions, monospace reached for beyond its functional need, reflexive rounded-card grouping, blanket uppercase micro-labeling, and two flagged-but-unconfirmed hypotheses about accent color and dark-technical registers) that a generic pattern catalog would not catch because each one is individually defensible — the problem is only visible as a *repeated* choice across unrelated builds.
- For any trait shared with a prior build in this project (an accent hue, a spacing scale, a card treatment, a label style, a typographic pairing), can it be justified from *this* product's brief independent of having been used before — or would the honest answer be "it's what I used last time"? The latter is the same unexamined-default failure §16 names for shadcn, applied to the builder's own prior output instead of a library's.
- If this is a genuinely new pattern not yet in `CLAUDE_DESIGN_DEFAULTS.md`, and it recurs on a future build, that document is the place to add it — this audit is only as good as that document staying current, not a one-time check.

"Looks clean" is not an acceptable critique output on its own. Every finding MUST name the specific problem and connect it to a concrete revision. **Uncertainty Requirement:** do not conclude a critique with "this no longer looks AI-generated," "this feels human-designed," or "this is objectively distinctive" — none of these are claims this document's methods can actually prove (see `research/RESEARCH_REPORT.md` §5 on documented cases of confident, wrong AI-detection judgments, including on genuine human work). Instead report: which specific signals were checked, which were found, what a blind reviewer said if one was consulted, remaining disagreement if reviewers disagreed, and what's still ambiguous. A critique that ends in unqualified confidence has usually stopped looking, not finished looking.

**Bad critique:** "The page could be more polished."

**Good critique examples:**
- "The four equal-width metric cards dominate the first viewport, but only one metric affects the user's next decision. Reduce the other three to a compact summary row and give the actionable metric stronger hierarchy." (§4, §7)
- "The empty-state illustration is the only content in the panel; there's no explanation of why the list is empty or what action fills it. Add a one-line reason and a primary action." (§10, §11)
- "The 'Save' button in this form uses the same filled-accent style as the destructive 'Delete account' button below it, differentiated only by label text. A user scanning quickly could mis-click. Give destructive actions a distinct, less prominent default style with a confirmation step." (§10)
- "Every card on this dashboard has an identical 16px radius, 1px border, and drop shadow — including the page's single most important alert banner, which is visually indistinguishable from a routine data tile. Increase the alert's contrast/position so it reads as higher priority." (§4, §7)
- "The hero heading uses a gradient fill, the pricing-tier headings use a gradient fill, and the FAQ section headings use a gradient fill. None of these needs the effect; reserve it for the hero only, if at all." (§4, §8)

---

## 20. Anti–Vibe-Coding Heuristic Tests

Fast, repeatable diagnostics. Run them against a screenshot or the live rendered UI, not the source code.

| Test | Question |
|---|---|
| Grayscale Test | With all color removed, is hierarchy still understandable from size/weight/position/space alone? |
| Blur Test | Viewed blurred or from a distance, is the primary structure (where's the main content, where's the main action) still visible? |
| Squint Test | Does the eye go first to the most important task, or just to the brightest/loudest object? |
| Removal Test | Can a decorative element be removed without harming comprehension? If yes, seriously consider removing it. |
| Product Swap Test (expanded) | Could this exact interface be relabeled as an unrelated product without changing the layout — and, more demandingly, could a small local-service page (a bike shop, a plumber, a barber, a shoe-repair shop) become any of the others by changing only names/prices/text? Check this at the level of information architecture, content priority, interaction model, operational details, terminology, data relationships, trust signals, the conversion path, and error/exception handling — not just visual styling. Some structural reuse across similar small businesses is normal and not a failure by itself; the failure is when *no* structural or content decision anywhere reflects this specific customer journey (§3, §4). |
| Default Library Test | Would a developer familiar with the component library in use immediately recognize its untouched defaults? If yes, revisit §16. |
| Card Count Test | How many visually separate containers appear in one viewport? Is each one necessary per §7's test? |
| Radius Test | Are visually and functionally unrelated elements receiving the identical exaggerated rounded treatment for no reason? |
| Accent Test | Is the accent color reserved for priority/interactivity/state, or scattered as decoration? |
| Interaction Test | Does every hover/active effect communicate real interactivity or state, or is some of it just movement for its own sake? |
| Copy Swap Test | Could the headings and CTAs be pasted into almost any other software product unchanged? If yes, rewrite them from the product brief (§3, §4). |
| Real Data Test | Does the layout survive realistic, missing, long, and unusual data (§11), or only the tidy default case? |
| Screenshot Test | Does a screenshot read as a real workflow someone could actually do something with, or just a collection of attractive components? |
| Memory Test | After looking away, can you (or a test user) describe the main task on this screen and the next action to take? |
| Consistency Test | Are visually repeated patterns actually consistent in dimensions, spacing, behavior, and naming — or only superficially similar? |
| Justification Test | Can you answer §2's seven questions for every prominent visual choice on this screen? |
| Gradient Justification Test | Is there a reason for this gradient beyond "it looks modern"? (§4, §9) |
| Surface Count Audit | Does every distinct background tint on this screen correspond to a real role (§9), or are some just "different because it looked flat otherwise"? |
| Blandness Test | If you removed every product-specific detail, would this be indistinguishable from any other neutral-palette, generic-sans-serif SaaS interface? Restraint that removes decoration is good; restraint that also removes the one or two things that would make this product recognizable is a different failure mode, not a safer one (Governing Principle 4). |
| False-Specificity Test | Is the domain terminology, iconography, or sample data dressing up a workflow and information architecture that's actually generic — i.e., would the *structure* survive if you swapped in a different domain's terms? If the structure is generic even though the labels aren't, this fails the same way a Product Swap Test failure does, just with better camouflage. |
| Component-Library Test | Strip away color/radius/type/spacing tokens mentally — is the remaining page structure, information hierarchy, and component composition still just the library's demo/kitchen-sink layout underneath? Retokenizing a default starter is not the same as designing for this product (§16). |
| Anti-Vibe Performance Test | Does the interface look as though it was constructed primarily to demonstrate that it avoided AI design clichés, rather than to serve its product? Warning signs: self-congratulatory code comments explaining that a choice follows a design principle (Governing Principle 10); unnaturally perfect restraint with no personality anywhere; every styling choice visibly defending itself; formal systems (tokens, themes, states) that exceed the project's actual needs (§5); treating the mere absence of decoration as proof of quality rather than checking whether the product is actually well served. Avoiding vibe-coded patterns is necessary but not sufficient — an interface can pass every other test in this table and still fail this one. |
| Operational Truth Test | Does every dynamic label accurately represent real business or application state — timezone-correct hours, exceptional schedules, currency and pricing conditions, real availability, current auth/permission state, real completion/submission status, real inventory, real progress? (§11's "dynamic state must be correct for the domain.") A confidently-displayed wrong answer is worse than no indicator. |
| Proportionality Test | Does implementation complexity match the product's actual complexity? Look specifically for unused tokens, themes, or variants (grep for each one; if it's defined and never referenced, that's a concrete answer, not a judgment call), and for any abstraction whose real justification is "this demonstrates engineering sophistication" rather than "this reduces duplication or serves a near-term need" (§5). |
| Authentic Detail Test | Which details on this screen could only belong to this specific organization, product, or user population? Do not count brand color, product name, generic industry terminology, decorative icons, or plausible-but-invented statistics/history — none of those are specific, however natural they sound (§3). |
| Useful Mess Test | Has the design organized genuine operational complexity (real exceptions, conditions, constraints), or has the underlying scenario been simplified until no real complexity — and therefore no real design problem — remains to solve (§3's distinction between removing, hiding, and failing to model complexity)? |
| Comment Intent Test | Does each source-code comment help a future maintainer understand something non-obvious (business logic, a technical constraint, a browser workaround, a non-apparent accessibility decision), or does it explain that the code follows a design principle from this document? Only the first kind belongs in source (Governing Principle 10). |

None of these tests are pass/fail gates by themselves — they're diagnostic prompts. A "failing" answer means: go inspect further, don't automatically delete the element (Governing Principle 4).

Most of these are genuinely runnable by the same agent that built the UI, immediately, against a screenshot. The **Memory Test is the exception**: an agent cannot simulate forgetting, so self-administering it (look at a screenshot, immediately ask yourself to recall it) produces a hollow result, not a real signal — you have no memory decay to test against. Run it for real by handing the screenshot to a separate party (a fresh agent context with no memory of building the screen, a different reviewer, or an actual person) after a genuine gap, or skip it and say so rather than reporting a self-administered pass as if it meant something.

---

## 21. Scoring Rubric and the Five-Dimension Self-Evaluation Instrument

**These are two separate evaluations, and MUST NOT be collapsed into one score (Governing Principle 11).** "Is this a good interface" (does it complete tasks, communicate accurately, hold up accessibly and responsively) and "does this read as generic/AI-produced" (perceived genericness, authorship, content realism) are different axes — an interface can be good and still read as generic; it can be distinctive and still be a poor interface. The 100-point rubric immediately below evaluates the first axis. The five-dimension instrument that follows it evaluates the second, and is the newer, more direct tool for the specific failure this document exists to catch — use both, report them separately, and do not average them into a single number.

### Part I — General UI-Quality Rubric (Evaluation B: is it a good interface)

A 100-point rubric to summarize a review. It supplements, and never overrides, the gate list in Governing Principle 7 / §23 — a design can score 90 and still be incomplete if a gate condition is unmet.

| Area | Points | Low | Acceptable | Strong | Exceptional |
|---|---|---|---|---|---|
| Product specificity | 12 | Generic template feel; fails Product Swap Test | Some product-specific language/content, still fairly generic | Clearly built for this product's users and data | Interface could not be mistaken for any other product |
| Information architecture | 10 | No clear structure; user can't find primary task | Findable with effort | Clear, task-aligned structure | Structure matches the user's own mental model, confirmed against the brief |
| Visual hierarchy | 10 | Everything the same weight | Some differentiation, inconsistent | Clear primary/secondary/tertiary distinction throughout | Hierarchy holds under Grayscale/Blur/Squint tests everywhere |
| Layout and spacing | 8 | Crowded or arbitrarily sparse; inconsistent spacing | Mostly consistent, some one-off values | Systematic spacing scale applied throughout | Spacing actively communicates relationships everywhere it appears |
| Typography | 8 | Inconsistent sizes/weights, poor legibility | Mostly systematic, some drift | Full systematic type scale, good legibility | Type choices reinforce hierarchy and product tone with restraint |
| Color and surfaces | 8 | Arbitrary palette, contrast failures | Role-based but some role confusion | Clean role-based palette, verified contrast | Distinct, deliberate light/dark themes, all state color reserved for meaning |
| Component quality | 10 | Default-library appearance throughout | Partially customized | Fully de-defaulted, consistent component set | Components read as native to this specific product |
| State completeness | 10 | Missing loading/empty/error states | Most major states present | All relevant states present per §10 | States tested against real content extremes (§11) |
| Responsiveness | 8 | Breaks or unusable at common widths | Usable at extremes, weak at intermediate widths | Full response-strategy hierarchy applied (§12) | Verified at intermediate widths, landscape, and zoom |
| Accessibility | 8 | Critical failures present (§13) | No critical failures, some major gaps | Full §13 checklist passes | Verified with actual keyboard/screen-reader testing |
| Content credibility | 4 | Fabricated claims/generic filler copy | Real content, some generic copy | Product-specific copy throughout | Copy fails the Copy Swap Test in the good sense — could not be reused elsewhere |
| Interaction clarity | 4 | Unclear what's interactive/what an action does | Mostly clear | Every interactive element signals its purpose | Passes the Interaction Test everywhere |

*(Sums to 100.)*

Interpretation bands: **0–49 Low** (do not ship), **50–69 Acceptable** (functional but visibly unrefined, revisit before calling done), **70–89 Strong** (ready pending gate check), **90–100 Exceptional** (rare; verify this isn't a false-confidence self-assessment — re-run §19 once more before trusting it).

**A plain, functional Strong score is a genuinely good outcome, not a consolation prize.** The "Product specificity" and "Content credibility" rows' top band rewards distinctiveness ("could not be mistaken for any other product," copy that "could not be reused elsewhere") — read that as a description of what naturally follows from real product specificity, not as an instruction to add novelty, unusual phrasing, or unconventional structure in order to defeat the Product/Copy Swap Tests artificially. Governing Principle 1 puts "decorative refinement and novelty" at the lowest priority tier for a reason: an interface that chases distinctiveness for its own sake, at the cost of clarity or convention a user actually relies on (a familiar checkout flow, a standard settings-page layout), is optimizing the wrong thing even if it scores well on this rubric. If pursuing a higher score on this rubric would mean adding something whose only justification is "this makes it look less generic," that fails §2's justification test and should not be added.

**Automatic score caps / failure conditions** — regardless of computed total, cap the reported score and treat the work as incomplete if any apply: the primary workflow doesn't function; keyboard navigation is substantially broken; text has severe (well below 3:1) contrast failures; the mobile layout is unusable; the interface contains fabricated claims presented as fact; critical loading/empty/error states are absent; major components visibly overflow; multiple primary actions compete with no clear priority; the UI is almost entirely default-library components with no product-specific composition; the interface is visually attractive but doesn't support the intended task.

**Recommended minimum confidence threshold before calling a UI complete:** Strong band (≥70) with zero unresolved Critical or Major findings (§22) and all §23 completion criteria met, PLUS an explicit, honest confidence statement (§0) about what remains unverified due to lack of user testing. A numeric score is a summary aid; it MUST be accompanied by written justification, not stand alone.

### Part II — Five-Dimension Instrument (Evaluation A: does this read as generic/AI-produced, and is it actually authored)

Qualitative findings come first — write the critique (§19's Composition/Authorship/Realism Audits, the First-Impression Review) before assigning any score in this part. A score with no qualitative evidence behind it is not usable; cite the specific finding driving each dimension's rating.

| Dimension | What it evaluates | Low | Strong |
|---|---|---|---|
| 1. Product and workflow quality | Does the interface serve real tasks for real users of this specific product? | Generic workflow, could serve any similar product | Workflow reflects this product's actual users, priorities, and task sequence |
| 2. Visual-design quality | Composition, hierarchy, typography, color — independent of whether it "looks AI" | Weak hierarchy, inconsistent system, poor legibility | Clear hierarchy, deliberate composition, systematic and legible |
| 3. Perceived AI-generation signals | Presence and *combination* of signals in `research/TAXONOMY.md` (Tiers 1-2 and 7) | Strong signal cluster present (see §4's Signal-Combination Model) | No strong cluster; isolated weak signals only, each independently justifiable |
| 4. Product specificity and authorship | Per the Authorship Audit (§19): would decisions survive a product-name swap? | Content and composition both survive a swap unchanged | Content and composition both resist a swap — this product's specific reasoning is visible in the result |
| 5. Production realism | Per the Realism Audit (§19): does content/state reflect real operational complexity? | Idealized happy-path only; decorative elements carry no real information; fabricated-feeling claims | Real constraints/exceptions modeled; decorative elements carry real information; claims are honest about their own limits |

**Do not average these five into one number.** Report each with its supporting evidence. A product can legitimately be Strong on 1/2/4/5 and still carry a residual Tier-2 signal on dimension 3 that's fully explained by a stated, checked-against-`research/TAXONOMY.md` exception — that's a fine outcome, and forcing it into a blended score would hide the actual reasoning behind a single misleading digit.

**Score caps — apply regardless of the ratings above, and state which cap applies rather than silently reporting a lower number:**
- The interface was not actually rendered and inspected (source-reading only) — cap: cannot be scored on dimensions 2, 3, or 5 at all; report as "not evaluated," not as a passing score.
- Only one route/screen was reviewed, on a multi-route product — cap: dimension 4 cannot exceed Low, regardless of how strong that one screen is (Cross-Route Incoherence, `research/TAXONOMY.md` Tier 6).
- Only ideal/tidy content was tested, per §11's content-variance requirement — cap: dimension 5 cannot exceed Low.
- No independent/blind review occurred on work meeting Governing Principle 9's trigger — cap: dimension 3 cannot exceed Low, regardless of self-assessed confidence (per Governing Principle 11's documented case, self-assessment specifically missed this dimension).
- The reviewer had the original prompt, creative rationale, or self-score visible during review — same cap as above; a same-author or rationale-primed review does not satisfy the Blind Review Requirement (§18).
- The interface contains any fabricated claim, metric, testimonial, or logo presented as real — cap: dimension 5 cannot exceed Low, full stop, regardless of how minor the fabrication seems.
- The design is structurally interchangeable with an unrelated product per the Product Swap Test — cap: dimension 4 cannot exceed Low.
- The strongest distinctive idea exists only on the homepage/first viewport and doesn't recur elsewhere — cap: dimension 4 cannot exceed Moderate even if the homepage alone would score Strong.

---

## 22. Severity Framework

- **Critical** — prevents task completion, creates a serious accessibility barrier, misrepresents information, or causes a major responsive failure. MUST be fixed before completion, no exceptions.
- **Major** — substantially weakens hierarchy, usability, consistency, or product specificity. MUST be fixed unless a documented, justified constraint prevents it (an EXCEPTION, §23).
- **Moderate** — noticeably reduces polish or comprehension but doesn't block the workflow. SHOULD be fixed; may be deferred with a reason.
- **Minor** — small visual inconsistency or refinement opportunity. MAY be deferred.

---

## 23. Definition of Done

A UI is NOT complete merely because: it compiles; it has no obvious overflow; it uses a component library; it has animations; it "looks modern"; it has responsive classes; one screenshot looks attractive; the homepage is polished; the happy path works.

Completion requires all of:

- A coherent visual system (§5) actually applied, not just defined.
- Clear, product-specific hierarchy (§2, §3, §7, §8).
- Functional primary workflows, verified end to end, not just visually present.
- Tested responsive behavior at required widths, including intermediate ones (§12).
- Meaningful interaction states implemented for every relevant component (§10).
- Accessible semantics and full keyboard navigation (§13).
- Realistic content resilience — tested against §11's extremes.
- Cross-page/cross-state consistency (§5's Controlled Variety).
- At least one complete task walked end-to-end across routes, with state verified to propagate correctly (§18) — not only each route confirmed individually.
- Screenshot-based visual review actually performed (§18), not skipped because "it should be fine."
- Self-critique and at least one revision cycle actually run (§19), including the First-Impression Review and the Composition, Authorship, and Realism Audits (§19) — not only the pattern-catalog check.
- Product Swap Test, Copy Swap Test, and False-Specificity Test (§20) actually run and passed — these are completion requirements here, not merely optional diagnostics; a generic structure dressed in domain-specific labels is not product-specific just because §20 exists somewhere in this document.
- No unresolved Critical findings, and no unresolved Major findings without a documented reason (§22).
- Written justification for every intentional exception to a MUST/SHOULD rule (§25's Intentional Exceptions field).
- MUST NOT exceed roughly 2 EXCEPTIONs on one piece of non-trivial UI work without triggering independent review (Governing Principle 9) before completion — see exception-laundering below; this is a hard gate, not a self-critique prompt.
- The Blind Review Requirement (§18) satisfied for any work meeting Governing Principle 9's trigger — a same-author review, however thorough, does not substitute for this (Governing Principle 11).
- Five-Dimension Instrument (§21 Part II) reported alongside the general rubric, with any applicable score caps stated explicitly rather than omitted.

**Before starting a fix, state which failure this targets, and don't default to the axis that's easiest to self-verify.** When responding to feedback that a UI "looks generic" or "looks vibe coded," state which `research/TAXONOMY.md` tier the suspected problem actually belongs to (surface/Tier 1-2, product/Tier 3, content/Tier 4, interaction/Tier 5, or realism/Tier 6) *before* making changes. This project's own self-audit found a recurring failure pattern worth naming directly: compositional fixes (Tier 1-2) are the easiest to verify (a before/after screenshot comparison is unambiguous), so there's a real pull toward making another compositional pass even when a blind reviewer's actual complaint was about Tier 3/6 (content and product realism, which have no equally quick self-check). If the suspected problem is Tier 3 or Tier 6, a Tier 1-2 fix (better composition, more considered typography, a new signature visual motif) is not a substitute, no matter how much it improves the screenshot.

**This checklist can be satisfied in letter while failing in intent — watch for that in your own work.** Two specific ways it happens, both worth naming directly rather than trusting good faith alone to prevent them:

1. **Exception-laundering.** Writing a documented EXCEPTION for every MUST/SHOULD you didn't want to follow technically satisfies the "written justification" requirement while leaving the shipped UI exactly as generic as if this document didn't exist. This is a specific instance of a general, well-documented dynamic (Goodhart's Law: once a measure becomes the target, it stops being a good measure) — any checklist that can be satisfied by documentation instead of by the underlying change it was meant to produce will eventually be gamed that way under enough time pressure, not necessarily out of bad faith but because the incentive rewards it. Naming this risk in prose was found, on independent review, to be insufficient by itself — an agent can still document its way past a purely rhetorical warning. The actual mechanism is the exception-count gate above: past roughly two EXCEPTIONs on one piece of work, completion requires an independent reviewer's sign-off, not just the builder's own justification, regardless of how well-argued that justification reads.
2. **Self-graded confidence.** A score or "Definition of Done" checklist filled out by the same agent that built the UI is real information, but it is heuristic self-evaluation (Governing Principle 3), not independent confirmation — and Governing Principle 9 exists specifically because self-review has a structural blind spot: the agent that made a choice is the least likely to notice its own unexamined default. Don't report a self-assessed "Strong" or "Exceptional" band as equivalent to one confirmed by an independent reviewer (a fresh agent context, a different person). When only a self-assessment is available, say so plainly in whatever you report — "self-assessed, Strong band, not independently reviewed" is honest; presenting it without that qualifier is not. The trigger for seeking independent review MUST NOT itself depend on a self-assigned score (see Governing Principle 9) — that would make the safeguard circular, since an agent could simply self-score low enough to avoid triggering it.

---

## 24. Compact Build Checklist

Use this without rereading the full guide.

**Before coding**
- [ ] Product brief filled out (§3) — purpose, user, primary task, data shape, device context.
- [ ] Brief checked against §6: does this product call for a stronger visual identity than a conventional utility interface? If yes, work through §6's Stages 1–4 (brief, directions, evidence-based selection, visual thesis) before proceeding; if no, proceed with §7–§16's defaults and skip §6.
- [ ] Repository inspected for existing tokens/components/conventions (§17 Stage 1).
- [ ] Did NOT start from a hero section, card grid, or component-library browsing.

**Before styling**
- [ ] Structural version works with no gradients/shadows/animation/icons (§17 Stage 4) — for an ambitious direction, this means §6's Stage 8 structural/expressive/decorative split, not a plain grayscale mandate.
- [ ] Token set exists (or extends the existing one) — spacing, type, color roles, radius, shadow (§5).
- [ ] If following §6, an Expression Budget is defined (Stage 5) before adding expressive treatment — where the direction is loud, where it stays quiet.

**During component work**
- [ ] Card Necessity Test applied to every container (§7).
- [ ] Required states implemented per component (§10).
- [ ] Component library defaults deliberately reviewed — either overridden with a stated reason, or deliberately kept per §16's recognizability exception; accent color alone is not enough either way.
- [ ] If the product has one — confirmed that removing unjustified decoration didn't also strip out the product's one deliberate brand signature (Blandness Test, §20; Governing Principle 4).
- [ ] Copy written from the product brief, not generic marketing vocabulary (§4, §11).
- [ ] No fabricated claims/testimonials/statistics (§11).

**During responsive work**
- [ ] Tested at intermediate widths, not just phone/desktop extremes (§12).
- [ ] Every hidden/collapsed element justified (§12's hierarchy).
- [ ] Tables/toolbars/dialogs have an explicit narrow-viewport strategy (§7, §10).

**Before final review**
- [ ] Rendered output actually inspected (screenshots or live browsing), not just code (§18).
- [ ] First-Impression Review recorded before any technical/checklist inspection began, not after (§18).
- [ ] At least one complete task walked end-to-end across routes, not just each route screenshotted in isolation (§18).
- [ ] Keyboard-only pass of the primary workflow (§13, §18).
- [ ] Contrast checked with a real tool, not eyeballed (§9, §13).
- [ ] Content extremes tested: long/short/empty/error/many-items (§11).
- [ ] `prefers-reduced-motion` respected (§14).
- [ ] Self-critique cycle run at least once, with specific findings (§19), including the Composition, Authorship, and Realism Audits — not the pattern catalog alone.

**Before declaring completion**
- [ ] Product Swap Test, Copy Swap Test, and False-Specificity Test (§20) actually run, not left as optional — a generic workflow dressed in domain-specific nouns/icons/sample data MUST NOT pass as product-specific without this check.
- [ ] If following §6: Required Self-Checks run, Independent Creative Review conducted (not just self-graded) whenever Governing Principle 9's triggers apply, and the Completion Standard checked — a visually ambitious direction is not exempt from any other item on this checklist.
- [ ] Blind Review Requirement satisfied whenever Governing Principle 9's trigger applies — a reviewer with no access to the prompt, rationale, or self-score has actually looked and their unedited reaction is recorded (§18).
- [ ] Exception count reviewed: more than ~2 EXCEPTIONs taken on this piece of work MUST trigger independent review (Governing Principle 9) before calling it done, not just a note in §19's self-critique.
- [ ] Every Governing Principle 7 / §23 gate condition checked and cleared.
- [ ] Severity of remaining findings assessed; no unresolved Critical, no undocumented unresolved Major (§22).
- [ ] Five-Dimension Instrument (§21 Part II) filled in with evidence, applicable score caps stated, not just the general rubric.
- [ ] Confidence stated honestly, including what wasn't validated by real users (§0) — and phrased as signals/evidence, not as an unqualified claim that the result "doesn't look AI-generated" (Uncertainty Requirement, §19).
- [ ] Intentional exceptions documented, not silently taken (§25).

---

## 25. Machine-Readable Review Template

```md
# UI Review

## Product Context
- Product:
- Primary user:
- Primary task:
- Routes reviewed:
- Viewports reviewed:

## Creative Direction (fill in only if §6 applied; otherwise write "N/A — utility-default")
- Visual thesis (§6 Stage 4):
- Distinctiveness Rubric total (/140) and one-line justification:
- Identity Test result (who ran it, and was it a genuinely separate party — see §6):
- Independent Creative Review conducted: Y/N, by whom:

## First Impression (recorded before technical inspection — see §18)
- What is this, who's it for, what am I supposed to do:
- What looks familiar:
- What looks distinctive:
- What feels fake/hollow/generic, and can it be traced to something specific:

## Five-Dimension Instrument (§21 Part II — report separately, do not average)
- 1. Product and workflow quality:
- 2. Visual-design quality:
- 3. Perceived AI-generation signals (cite `research/TAXONOMY.md` tier/cluster, not a single pattern):
- 4. Product specificity and authorship:
- 5. Production realism:
- Score caps applicable, if any:

## Blind Review (required whenever Governing Principle 9's trigger applies — §18)
- Reviewer type (fresh agent context / independent human / none obtained):
- Reviewer's unedited reaction:
- Agreement/disagreement with self-review:

## Overall Assessment
- Score (general rubric, §21 Part I):
- Confidence: (heuristic self-review only, unless real user testing occurred — state which; do not write "no longer looks AI-generated" or "objectively distinctive" — report signals and remaining ambiguity instead, per the Uncertainty Requirement in §19)
- Highest-risk issue:
- Most successful aspect:

## Findings

### Critical
- None / findings

### Major
- None / findings

### Moderate
- None / findings

### Minor
- None / findings

## Vibe-Coding Indicators
- Excessive cards:
- Generic layout:
- Default-library appearance:
- Gratuitous effects:
- Generic copy:
- Product-swap test result (expanded — see §20):
- Anti-Vibe Performance Test result:
- Authentic Detail Test result — details that could only belong to this specific product:
- Proportionality Test result — any unused tokens/themes/variants found:
- Operational Truth Test result — any dynamic value not verified against its real source of truth:
- Missing states:
- Responsive weaknesses:

## Design Rationale
(This is where compliance/design reasoning belongs — NOT in source-code comments, per Governing Principle 10. One line per notable decision is enough.)
1.
2.
3.

## Accessibility
- Keyboard:
- Focus:
- Contrast:
- Semantics:
- Motion:
- Zoom:

## Recommended Changes
1.
2.
3.

## Verification Completed
- [ ] Desktop
- [ ] Tablet
- [ ] Mobile
- [ ] Intermediate widths
- [ ] Keyboard navigation
- [ ] Zoom
- [ ] Reduced motion
- [ ] Loading state
- [ ] Empty state
- [ ] Error state
- [ ] Long content
- [ ] End-to-end task walked across routes (not just each route in isolation)

## Intentional Exceptions
- Rule:
- Reason:
- Tradeoff:
```

---

## 26. Sources and Further Reading

Every source below was actually retrieved and reviewed during research for this document (via web search, with content synthesized from search-result summaries; a small number of full-page fetches were blocked by target-site restrictions and are noted as such in the coverage matrix in the appendix). Sources are grouped by the principle they support. Where sources disagreed, the disagreement is noted.

**Vibe coding / AI-generated UI critique**
- Živilė Ma, "Why All Vibe-Coded Designs Look the Same," Medium — https://medium.com/@zivilema/why-all-vibe-coded-designs-look-the-same-709c0db84317 — supports: training-data bias explanation for repeated visual patterns (§1, §4).
- Nielsen Norman Group, "GenUI vs. Vibe Coding: Who's Designing?" — https://www.nngroup.com/articles/genui-vs-vibe/ — supports: the distinction between AI-assisted generation and deliberate design ownership (§1, §2).
- The Fountain Institute, "7 Signs a UI Has Been Vibe Coded" — https://www.thefountaininstitute.com/blog/signs-vibe-coded-ui — supports: recognizable-pattern catalog approach (§4).
- Jack Pearce, "Where does that purple gradient come from?" — https://www.jackpearce.co.uk/notes/purple-gradient-ai-aesthetics/ — supports: purple/indigo-gradient default explanation (§4).
- Kai Ni, "Design Observation: Why Do AI-Generated Websites Always Favour Blue-Purple Gradients?," Medium — https://medium.com/@kai.ni/design-observation-why-do-ai-generated-websites-always-favour-blue-purple-gradients-ea91bf038d4c — supports: same, independent corroboration (§4).
- 925 Studios, "AI Slop Web Design: Complete Guide" — https://www.925studios.co/blog/ai-slop-web-design-guide — supports: pattern catalog (purple gradients, Inter font, card grids) (§4).
- freedesignmd, "The shadcn trap: why shadcn looks generic and how to fix it" — https://freedesignmd.com/blog/shadcn-looks-generic — supports: default-library-appearance pattern and de-defaulting need (§4, §16).
- LogRocket, "Shadcn UI adoption guide" — https://blog.logrocket.com/shadcn-ui-adoption-guide/ — supports: same; documents shadcn's newer preset-based workflow as an industry response (§16).
- arXiv, "AI Slop and the Software Commons" (2604.16754) — https://arxiv.org/abs/2604.16754 — supports: qualitative-research framing of AI-generated output quality concerns as a broader software-commons problem (§1).
- arXiv, "'An Endless Stream of AI Slop': How Developers Discuss the Burden of AI-Assisted Software Development" (2603.27249) — https://arxiv.org/html/2603.27249v3 — supports: a qualitative coded analysis of developer posts on Reddit/Hacker News discussing AI-output quality; used as qualitative evidence, not a universal design rule (§1, Evidence Hierarchy). The specific figures attributed to this paper elsewhere (post/thread counts) were obtained via search-result synthesis rather than a full-text fetch of the paper itself (several full-text fetches were blocked during this research — see Appendix A/B), so treat those specific counts as approximate secondhand reporting, not independently confirmed against the source.
- Superdesign, "Why AI Design Looks Generic" — https://superdesign.dev/blog/why-ai-design-looks-generic — supports: "statistical average of the training set" framing (§1).
- Developers Digest, "AI Design Slop: 16 Patterns That Out Your App as Vibe-Coded" — https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it — supports: pattern catalog scope check for §4.
- Sailop, "AI Slop in 2026: The State of the AI-Generated Web" — https://www.sailop.com/blog/ai-slop-2026-state-of-the-ai-generated-web — supports: pattern catalog scope check.
- thecrit.co, "Why Your Vibe-Coded App Looks Like Every Other AI App" — https://thecrit.co/resources/vibe-coding-design-guide — supports: pattern/fix pairing structure used throughout §4 (title/summary reviewed via search result; full page blocked to direct fetch — see coverage matrix).

**Design systems and tokens**
- Carbon Design System (IBM), "Spacing" — https://carbondesignsystem.com/elements/spacing/overview/ — supports: spacing-scale discipline, density-appropriate whitespace (§5, §7).
- Material Design 3, "Typography" — https://m3.material.io/styles/typography/type-scale-tokens — supports: systematic type-scale tokens (§5, §8).
- Penpot, "Using design tokens for a proportional typographic scale" — https://penpot.app/blog/using-design-tokens-for-a-proportional-typographic-scale/ — supports: ratio-based type scale (§8).
- UX Collective (Oluwatosin Obalana), "Mastering typography in design systems with semantic tokens and responsive scaling" — https://uxdesign.cc/mastering-typography-in-design-systems-with-semantic-tokens-and-responsive-scaling-6ccd598d9f21 — supports: semantic vs. primitive token layering (§5).
- Radix UI Primitives, GitHub — https://github.com/radix-ui/primitives — supports: accessible-primitive layer as a legitimate library foundation to de-default on top of (§16).
- Carbon Design System, GitHub — https://github.com/carbon-design-system/carbon — supports: token/component architecture reference (§5, §16).

**Foundational UI/UX practice**
- Adam Wathan & Steve Schoger, *Refactoring UI* — summarized via Abdul Khaleque, "Top 20 Key Points from Refactoring UI," Medium — https://medium.com/design-bootcamp/top-20-key-points-from-refactoring-ui-by-adam-wathan-steve-schoger-d81042ac9802 — supports: hierarchy via size/color/weight, shadow-as-elevation discipline, restrained accent-color use (§4, §8, §9, §10).
- Nielsen Norman Group, "10 Usability Heuristics for User Interface Design" — https://www.nngroup.com/articles/ten-usability-heuristics/ — supports: aesthetic-and-minimalist-design heuristic underlying §2's justification test and §7's density guidance.
- Cieden, "How do I create the right button hierarchy?" — https://cieden.com/book/atoms/button/how-to-create-button-hierarchy — supports: one-primary-action-per-region rule (§10).
- Carbon Design System, "Button" usage guidance — https://v10.carbondesignsystem.com/components/button/usage/ — supports: same, independent corroboration.

**Dashboards and data credibility**
- Nielsen Norman Group, "Vanity Metrics in Analytics" (video) — https://www.nngroup.com/videos/vanity-metrics-analytics/ — supports: decision-value test for metrics/charts (§4, §7). NN/g dashboard research cited via search-result synthesis for the "5–7 primary metrics" and "wallpaper within two weeks" findings — treated as a widely-cited practitioner default, not a universal numeric law (Evidence Hierarchy).

**Accessibility standards**
- W3C, Web Content Accessibility Guidelines (WCAG) 2.2 — https://www.w3.org/TR/WCAG22/ — supports: contrast, focus appearance, target size, error identification requirements throughout §9, §10, §13 (standard-backed requirement, highest evidence tier).
- Deque, "What to Expect From WCAG 2.2" — https://www.deque.com/blog/what-to-expect-from-wcag-2-2/ — supports: plain-language summary of new 2.2 criteria (§13).
- WebAIM, "WCAG 2.2 Overview and Feedback" — https://webaim.org/blog/wcag-2-2-overview-and-feedback/ — supports: same.
- WebAIM, "Understanding WCAG 2 Contrast and Color Requirements" and "Contrast Checker" — https://webaim.org/articles/contrast/ , https://webaim.org/resources/contrastchecker/ — supports: the specific contrast-ratio verification method in §9/§13.
- Smashing Magazine, "Accessible Target Sizes Cheatsheet" — https://www.smashingmagazine.com/2023/04/accessible-tap-target-sizes-rage-taps-clicks/ — supports: 24px WCAG minimum vs. 44px platform-recommended default (§13).
- The Reform Blog, "Common ARIA Mistakes in Forms and Fixes" — https://www.reform.app/blog/common-aria-mistakes-in-forms-and-fixes — supports: `aria-describedby`/`aria-invalid` error-association pattern (§13).
- MDN, "prefers-reduced-motion" — https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion — supports: technical mechanism for §14's reduced-motion requirement.
- Tatiana Mac, "prefers-reduced-motion: Taking a no-motion-first approach to animations" — https://www.tatianamac.com/posts/prefers-reduced-motion — supports: practitioner implementation guidance for §14, including vestibular-disorder rationale.

**Color, surfaces, and theming**
- ColorArchive, "Dark Mode Color Design: Building a System, Not Just an Inversion" — https://colorarchive.org/guides/dark-mode-color-design-guide/ — supports: near-black base, elevation-via-lightness approach (§4, §9).
- Muzli/Medium, "Dark Mode Design: Why Simply Inverting Colors Is Not Enough" — https://medium.muz.li/dark-mode-design-why-simply-inverting-colors-is-not-enough-e2584ebb139b — supports: same, independent corroboration; Material's documented ~#121212 base and elevation-via-lightness approach (a continuous overlay formula, not a fixed step count — corrected in this document's §9 after independent review flagged an earlier overstatement) referenced from this and related search synthesis (§9).
- Nielsen Norman Group, "Glassmorphism: Definition and Best Practices" — https://www.nngroup.com/articles/glassmorphism/ — supports: legibility/contrast concerns and narrow-use recommendation (§4, §9).
- Axess Lab, "Glassmorphism Meets Accessibility: Can Glass Be Inclusive?" — https://axesslab.com/glassmorphism-meets-accessibility-can-frosted-glass-be-inclusive/ — supports: specific accessibility concerns (low vision, dyslexia) with translucent surfaces.

**Responsive design and performance**
- Framer Blog, "Breakpoints in responsive web design: 2026 guide" — https://www.framer.com/blog/responsive-breakpoints/ — supports: common breakpoint anchor points and the tablet-range testing gap (§12).
- BrowserStack, "Breakpoint: Responsive Design Breakpoints in 2025" — https://www.browserstack.com/guide/responsive-design-breakpoints — supports: content-based vs. device-based breakpoint reasoning; real-device testing recommendation (§12, §18).
- web.dev, "How the Core Web Vitals metrics thresholds were defined" and "Web Vitals" — https://web.dev/articles/defining-core-web-vitals-thresholds , https://web.dev/articles/vitals — supports: LCP/INP/CLS thresholds referenced in the Performance section (Governing Principle 8).
- LogRocket, "Skeleton loading screen design" — https://blog.logrocket.com/ux-design/skeleton-loading-screen-design/ — supports: noticeable-delay threshold and shape-matching guidance for skeleton loaders (§4, §10).

**Content, microcopy, and empty/error states**
- Content Beta, "List of 300+ AI Words, Phrases and Sentences to Avoid" — https://www.contentbeta.com/blog/list-of-words-overused-by-ai/ — supports: specific generic-vocabulary list in §4/§11 (author/community-compiled list; treated as illustrative, not exhaustive).
- UXPin, "Designing the Overlooked Empty States" — https://www.uxpin.com/studio/blog/ux-best-practices-designing-the-overlooked-empty-states/ — supports: context+guidance structure for empty states (§4, §10).
- Pencil & Paper, "Empty State UX Examples & Best Practices" — https://www.pencilandpaper.io/articles/empty-states — supports: same, independent corroboration.

**Internationalization**
- Crowdin Blog, "Advanced UI Localization Guide for Your App or Website" — https://crowdin.com/blog/best-practices-for-ui-localization — supports: text-expansion percentages and layout-flexibility guidance (§11).
- SimpleLocalize, "Design that speaks every language: UI tips for localization" — https://simplelocalize.io/blog/posts/ui-localization-best-practices/ — supports: RTL and layout-mirroring requirements (§11).

**Round 2 audit: counter-evidence, blandness, and engineering additions** (fresh research conducted specifically for the adversarial audit that added this subsection — see Appendix H for the full audit process)
- Nielsen Norman Group, "The Aesthetic-Usability Effect" — https://www.nngroup.com/articles/aesthetic-usability-effect/ — supports: the caution in Governing Principle 3 that visually attractive interfaces are rated more usable than they are, masking minor (not major) usability problems; traces to Kurosu & Kashimura's 1995 Hitachi Design Center ATM-interface study (peer-reviewed HCI research, the highest evidence tier this document cites for a UI-perception claim).
- Overpass Studio, "Why SaaS Websites Look The Same & How To Stand Out" — https://www.overpass.studio/blog/why-saas-websites-look-the-same — supports: the "copy-paste minimalism" critique used in Governing Principle 4's blandness counter-risk — independent evidence that restraint, applied without a signature element, is its own homogenization failure, not a safe default.
- Mantlr, "How Stripe, Linear, and Vercel Ship Premium UI" — https://mantlr.com/blog/stripe-linear-vercel-premium-ui — and Pixeldarts, "Four design principles behind Stripe, Linear, and Vercel" — https://www.pixeldarts.com/en/post/four-design-principles-behind-stripe-linear-and-vercel — support: the "one owned, consistently-applied signature plus restraint everywhere else" pattern cited in Governing Principle 4 and §9 (practitioner analysis, not first-party design documentation from these companies — treated as credible secondhand analysis, not a company-endorsed case study).
- Setproduct Blog, "Dashboard UI design: From KPIs to layouts that convert" — https://www.setproduct.com/blog/dashboard-ui-design — supports: the 4–6 KPI-card range and disciplined dense-dashboard pattern (Grafana/Datadog/Linear/Stripe cited as examples) used in the dense-dashboard red-team simulation (Appendix D). This is a second practitioner blog stating a similar range to §4.3's existing "5–7 metric" figure — presented as *consistent with*, not as independent proof of, that figure: both may be downstream restatements of the same circulating practitioner heuristic rather than two separately-measured data points, and this document cannot distinguish those two possibilities from secondhand web sources. Treat the range as a repeated practitioner default, not as strengthened evidence.
- ShadcnDeck / community sourcing on Dub (dub.co) as a shadcn/ui-originated product that grew its own in-house component system — supports: §16's exception for products that evolve from a library foundation rather than needing to look nothing like it from day one (practitioner observation, not the vendor's own documented case study; treated as illustrative, not authoritative).
- Medium (Rahul Kengale), "Why inconsistent state, async updates, and race conditions cause most React and frontend bugs" — https://medium.com/@rahulkengale1110/why-inconsistent-state-async-updates-and-race-conditions-cause-most-react-and-frontend-bugs-3bd141602e0a — supports: the race-condition/stale-state row added to §15's performance table (practitioner analysis; the underlying mechanism — no single source of truth across local/derived/server/cached/URL state — is a widely-corroborated description of the failure class, not this one author's invention).
- Chromatic, "Percy alternatives" comparison — https://www.chromatic.com/compare/percy — and OneUptime, "How to Build Visual Regression Testing" — https://oneuptime.com/blog/post/2026-01-30-visual-regression-testing/view — support: the flaky-test causes and mitigations added to §15 (live/randomized data, running animations, font-rendering variance, load-timing races).
- BugBug.io, "What is User Journey Testing?" — https://bugbug.io/blog/software-testing/what-is-user-journey-testing/ — and Whatfix, journey/path-analysis guidance — support: §18's route-continuity requirement (testing a complete task across routes, not each route in isolation).
- UXmatters, "Designing for Privacy" — https://www.uxmatters.com/mt/archives/2024/10/designing-for-privacy.php — and general privacy-UX-pattern-catalog discussion — support: §10's permission/privacy communication addition (accurate scope communication, stated reasons for sensitive-data requests, granular over all-or-nothing consent).
- Practical DevSecOps / general summaries of Goodhart's Law ("when a measure becomes a target, it ceases to be a good measure") — supports: the exception-laundering caution in §23, reframing it as an instance of a general, well-documented dynamic rather than a problem specific to this document.

**Where sources disagreed or required judgment calls**
- Numeric guidance (dashboard metric counts, skeleton-loader delay thresholds, animation durations, breakpoint widths) varies across sources by roughly 20–50%. This document presents such numbers explicitly as *starting defaults or common ranges*, not fixed universal requirements, per the Evidence Hierarchy in §0 — the load-bearing rule in each case is the underlying principle (don't show unused metrics; don't show a loader for imperceptible delays; motion should feel neither sluggish nor abrupt; breakpoints should follow real layout failure), not the specific number.
- Some sources (notably the shadcn/ui ecosystem discussion) present "the library is not the problem, developers are" as a rebuttal to "the library looks generic" criticism. Both are represented in §4/§16: the guide agrees defaults aren't inherently bad, but treats *unexamined* default use as the actual failure mode, which is compatible with both positions.
- A genuine, unresolved tension surfaced by round-2 research: minimalism-critique sources ("copy-paste minimalism is bland and forgettable") and this document's own density/restraint guidance for internal/dense tools could read as contradictory. They aren't, once separated by claim: the minimalism critique is about *brand distinctiveness* (does the product have one memorable, consistent signature?), while this document's restraint guidance is about *decorative noise* (is space/color/motion used only where it earns its place?). A product can and should be both restrained in decoration and distinctive in brand at the same time — Stripe, Linear, and Vercel are the cited evidence that these are independent axes, not the same axis. See Governing Principle 4 and the Blandness Test (§20).

---

## Appendix A — Topic Coverage Matrix

| Topic | Key conclusion | Evidence type | Confidence | Remaining uncertainty |
|---|---|---|---|---|
| Why AI UI looks generic | Statistical-average-of-training-data effect, reinforced by ubiquitous library defaults (indigo/purple, Lucide icons, Inter font) | Multiple independent practitioner analyses + one qualitative academic study | Medium (downgraded on round-2 audit — this is a pattern-recognition/qualitative claim from secondary web sourcing, not a verified technical fact, despite consistent repetition across sources) | Exact training-data composition of any specific model is not independently verifiable by this research |
| Card/container overuse | Cards should pass a necessity test (independent interaction/selection/grouping); default behavior overuses them | Practitioner consensus (Refactoring UI, multiple critique pieces) | High | No controlled study quantifies an exact "too many cards" threshold; guidance here is heuristic |
| Dashboard metric value | Shown metrics should each drive a decision; excess metrics become ignored ("wallpaper") | NN/g research summary (via search synthesis) | Medium-High | Exact "5–7 metric" figure is a practitioner default, not independently re-derived here from raw NN/g data |
| Purple/gradient default | Documented as training-data/library-default artifact (Tailwind's early indigo-heavy defaults cited as a specific contributing factor) | Multiple independent sources, consistent account | Medium (downgraded on round-2 audit — same reasoning as the row above; consistent repetition across secondary sources is not the same evidence tier as a verified primary fact) | Anecdote (a widely quoted Tailwind-creator remark) could not be independently verified as an exact quote via direct source fetch (blocked); treated as illustrative, not load-bearing |
| Contrast/focus/target-size requirements | WCAG 2.2 defines exact numeric thresholds | W3C standard (highest evidence tier) | High | None significant |
| Dark mode design | Should be a designed theme (near-black base, lightness-based elevation, desaturated accents), not an inversion | Multiple independent sources, consistent with documented Material Design approach | Medium-High (the underlying mechanism traces to Material's own published design guidelines, a primary design-system source, even though accessed here via search summary rather than direct fetch) | Exact lightness percentages vary slightly by source; treated as illustrative range |
| Responsive intermediate widths | The ~600–900px range is under-tested and where layouts commonly fail | Multiple independent practitioner sources | Medium-High | No first-party analytics available to this research confirming this range for any specific product |
| Motion duration/easing | ~150–400ms range, ease-in-out family, purpose-driven | Material Design + NN/g, consistent | Medium-High | Treated as a strong default range, not a hard limit |
| Reduced motion | `prefers-reduced-motion` is the correct mechanism; vestibular-disorder rationale documented | MDN (technical spec) + accessibility practitioner sources | High | None significant |
| Generic AI copy vocabulary | A recognizable, evolving set of words/phrases reads as generic/AI-authored | Multiple content-analysis sources | Medium | Vocabulary lists are illustrative and will date; the underlying principle (write from the specific product) is the durable part |
| Glassmorphism | Legitimate in narrow, tested use; broad use harms legibility/accessibility | NN/g + accessibility-focused source, consistent | Medium-High | "Narrow use" is a judgment call, not a numeric rule |
| i18n text expansion | German +30–50%, other European languages +20–35%; RTL requires layout-level (not just text-direction) changes | Multiple localization-industry sources, consistent | Medium-High | Figures are commonly cited ranges, not derived from a single authoritative measurement study |
| Touch target size | WCAG 2.2 minimum 24×24px; platform guidance (Apple/Material) commonly recommends 44–48px | W3C standard + platform documentation | High | None significant |
| Component-library de-defaulting | Changing only accent color is insufficient; full token review needed | Practitioner sources (shadcn-specific critiques) + this document's own synthesis | Medium-High | This is more a synthesized recommendation than a single directly-cited finding |
| Aesthetic-usability effect (round 2) | Attractive interfaces are perceived as more usable than they measurably are, masking minor (not major) usability problems, including in self-review | Peer-reviewed-adjacent original HCI study (Kurosu & Kashimura 1995) + NN/g corroboration | High | Effect size/duration of the masking (how long it persists with repeated use) is less precisely quantified in the sources reviewed than the effect's existence |
| Blandness/homogenized minimalism (round 2) | "Copy-paste minimalism" is a real, independently-documented failure mode distinct from AI-slop maximalism; distinctiveness and restraint are independent axes | Practitioner/industry critique, cross-checked against Stripe/Linear/Vercel case analysis | Medium-High | No controlled study quantifies brand recall loss from generic minimalism; treated as consistent qualitative critique, not a measured finding |
| Dense dashboards with many cards done well (round 2) | A disciplined 4–6/5–7 metric-card range with strong alert contrast is a legitimate, praised professional pattern (Grafana/Datadog-style), not inherently a "vibe coded" tell | Practitioner dashboard-design analysis, restating a similar range to this document's own earlier 5–7 figure | Medium | Both this source and the original 5–7 figure trace to practitioner synthesis rather than a single controlled study, and both may ultimately derive from the same circulating heuristic rather than two independent measurements; this document cannot rule that out from secondhand web sourcing, so treat the range as a repeated practitioner default, not as strengthened evidence via triangulation |
| Race conditions / stale state visible in UI (round 2) | Async requests resolving out of order can silently overwrite newer UI state with no visible error; lack of single source of truth across local/derived/server/cached/URL state is the common root cause | Practitioner engineering analysis, consistent with well-known frontend-engineering folklore | High (as a description of a real, common bug class) | No first-party incident data for any specific product; the general mechanism is well-established, the frequency in any given codebase is not measured here |
| Visual-regression test flakiness causes (round 2) | Flakiness traces to live/randomized data, running animations, font-rendering variance, and load-timing races; mitigated by mocking, disabling animation, and waiting for a settled-state signal | Vendor/practitioner engineering documentation (Chromatic, OneUptime) | Medium-High | Vendor sources have some incentive to characterize their own tools favorably; the failure-cause list itself is corroborated across multiple independent practitioner sources |
| Workflow/route continuity as a distinct test (round 2) | Testing each route in isolation misses state-propagation failures across a task; explicit end-to-end task walkthroughs catch a distinct class of bug | Software-testing practitioner guidance (journey/path testing) | Medium-High | No controlled comparison of "per-route review" vs. "journey review" defect-catch rates was found; the recommendation is a reasoned inference from the testing literature, not a measured result |
| Permission/privacy UI communication patterns (round 2) | Accurate scope communication, stated reasons for sensitive-data requests, and granular consent are established, named patterns, not this document's invention | UX practitioner/privacy-UX literature | Medium | Breadth of sourcing here is narrower than other topics in this document; treat as a reasonable starting point, not an exhaustively researched sub-domain |
| Visitor-local-clock timezone bug (round 3) | Computing a business's "open now" status from the visitor's browser clock rather than the business's own timezone produces contradictory, confidently-wrong answers for visitors outside that timezone | **Direct first-party evidence** — built the example, reproduced the bug with Playwright (mocked the same real-world instant, compared a Portsmouth-timezone visitor against a Tokyo-timezone visitor, got different status text for the same real shop state), then verified the fix against 4 required scenarios (weekday open/closed, Saturday, Sunday) from a third-timezone visitor | High — this is the only claim in this entire document backed by direct, reproduced, first-party testing rather than secondary sourcing | None significant for the specific bug; the fix (Intl.DateTimeFormat with an explicit IANA timeZone) is a standard, well-supported browser API, not a novel technique |
| Performative/self-evaluative code comments as a real failure mode (round 3) | An implementation can satisfy every rule in this document while its source comments and overall affect reveal it was optimizing for evaluation against this document, not for the product | First-party observation of this document's own generated example, corroborated by the fact that the pattern was specific and identifiable enough to name precisely (Governing Principle 10) | Medium-High as a description of what happened in this one case; not established as how often it happens across other agents/products | This is evidence from a single example built by one agent (this document's own author); it demonstrates the failure mode is real and specific, not how common it is elsewhere |

## Appendix B — Assumptions Made

1. This guide assumes the reading agent has no prior context and must be able to act on the file alone — so definitions and cross-references are repeated rather than assumed known.
2. Numeric defaults throughout (spacing steps, type-scale ratios, motion durations, breakpoint widths, metric-count ceilings) are presented as starting ranges from cited sources, not hard requirements, per the Evidence Hierarchy — this is a deliberate editorial choice given how much these numbers vary by source and by product.
3. The repository this guide was written for (`jmoloney232/not_vibe_coding`) contains no existing code, framework choice, or design system at the time of writing — so §5's "scale to project size" guidance and §17's "inspect existing patterns" stage will be the first thing a future agent actually exercises against real content.
4. Where a source's claim could not be verified by direct page fetch (several target sites returned HTTP 403 to automated fetching during this research), the claim is retained only when corroborated by a second, independently reachable source, and is flagged in Appendix A rather than presented as directly verified.
5. **A real process failure occurred during round 1 and is recorded here rather than minimized:** an early draft of round 1's Appendix E briefly stated that an independent review had been "completed," with fabricated-sounding findings, before the actual review had returned — the exact invented-validation failure Governing Principle 3 exists to prevent, produced while writing the document that names it. Root cause: the appendix was drafted in the same pass as the rest of the document, before the independent-review subagent call had actually been made, rather than being written only after real results existed. It was caught and corrected before that round's commit (replaced with an honest "pending" placeholder until the real review landed), but the fact that it happened at all — not just that it was caught — is the more informative signal about how easily a self-narrating audit trail can drift into producing exactly the fabrication it warns against. The standing corrective, followed for round 2 as well: any appendix describing a review's outcome is written as a "pending" placeholder at the time the review is commissioned, and only filled in with real content after the review actually returns, never predicted or drafted in advance.

## Appendix C — Unresolved Questions

- No first-party user research, analytics, or support-ticket data exists for any concrete product yet (there is no shipped product in this repository) — every product-specificity rule in §3–§4 is therefore a general heuristic until applied to and validated against a real product with real users.
- Exact numeric thresholds (dashboard metric ceilings, skeleton-loader delay cutoff, animation duration ranges) vary meaningfully across the sources reviewed; this document picked representative ranges and labeled them as defaults, but a future agent applying this guide to a specific product should validate against that product's own analytics where available, rather than treating these numbers as fixed.
- Several primary-source articles central to current "vibe coding" discourse (thecrit.co, superdesign.dev, developersdigest.tech, freedesignmd.com, jackpearce.co.uk, thefountaininstitute.com) blocked direct automated fetching (HTTP 403) during this research session; their content was accessed only through search-engine result summaries, which is a shallower form of evidence than a full-text read. The conclusions drawn from them are corroborated across multiple independent summaries but were not independently verified word-for-word against the original text.
- This guide has been simulated against five contrasting product categories (Appendix D), but not validated by an actual independent human design reviewer or real end users. Two independent AI review passes (Appendix E) have been completed and their findings integrated — treat these as heuristic review by a second model context, which caught real defects across both rounds (a numbering collision, an overstated WCAG level, several unhedged claims, several gameable-in-practice rules) that same-author self-checks missed, but this is still not equivalent to human user validation or a human design reviewer's judgment, and per Governing Principle 9's round-2 addition, a second AI reviewer is specifically weak evidence for taste-based claims (it may well share the first agent's correlated aesthetic priors) even where it's strong evidence for mechanical/structural bugs.
- No mechanism in this document can verify that an agent's self-reported checkboxes (§19's self-critique, §25's Verification Completed list) reflect work that actually happened, as opposed to being filled in without doing the harder underlying task. This is a real, likely irreducible limitation of a text-based standard rather than a solved problem — the exception-count gate and the Swap Test completion requirements added in round 2 (§23, §24) reduce the *number* of ways this can happen undetected, but do not eliminate the possibility that an agent asserts something it didn't verify. Independent review (Governing Principle 9) is the actual check on this, not the checklist itself.
- Design-token governance as a product and its design system grow over time (deprecating tokens, preventing multi-surface drift across a large codebase over years) and any human-designer/PM handoff or sign-off process are out of this document's stated scope (§1: this document is written for an AI agent's own build/review workflow, not a multi-person team process) and are not addressed here. A team adopting this guide alongside a human design/review process should expect to layer that process on top of, not find it inside, this document.
- The round-3 practical test (Appendix F) was one small, simple, mostly-static example (a one-page local-business site). It's the strongest evidence in this document precisely because it's first-party and reproduced, not secondhand — but it's a single data point from one product type. The new principles it produced (Governing Principle 10, §3's specificity/complexity additions, §5's proportionality/feature-prioritization additions, §11's dynamic-state-correctness addition) have not yet been tested against a denser, more stateful product (an internal tool, a dashboard, a multi-route application) where the proportionality and feature-prioritization tradeoffs are likely to be genuinely harder calls than "does a one-page site need dark mode." Treat those additions as sound in principle but not yet stress-tested outside this one example.
- §6 (Creative Direction and Visual Ambition Framework, round 4) has a different evidence status than the rest of this document: it was integrated from a detailed user-provided specification rather than derived from this document's own external research. A consistency/cross-reference review was completed in round 4 (13 findings fixed), and round 5 added a first real practical test (Appendix F's second entry) — an ambitious landing page was built following §6's process and still shipped a generic default button and a cliché negative-tracking heading, because §6's stages produced a stated creative thesis without a mechanism forcing every element, including small/secondary ones, to actually be checked against it. That gap is now named directly (§16's hand-rolled-defaults note, §8's tracking-cliché AVOID entry) but it surfaced from one build; whether the same drift recurs on a denser, multi-route product (more surfaces for a chosen direction to quietly lapse on) is not yet tested. (Round 7 note: §8's tracking-cliché entry itself has since been corrected by live evidence — the value range alone is not a reliable tell; see Appendix J. The underlying lesson this entry was drawn from — that §6's creative thesis must reach every element, not just the primary hierarchy — is unaffected by that correction and stands on its own.)

## Appendix D — Practical Simulation Report

Round 2 of this audit replaced the original three simulations with five, per the audit's requirement to cover contrasting product types and specific legitimate-use cases (a highly branded product, a deliberately dense interface, a product where cards/dashboards are genuinely correct, a product where strong motion is justified, and a product where a standard component library should stay recognizable). The three retained findings from round 1 are folded into simulations 1–3 below rather than duplicated.

**1. Marketing site for a technical product, deliberately branded** (brief: a developer-facing API platform's public marketing site; primary user is an evaluating engineer; primary task is deciding whether to try the product in the next 10 minutes; the product has committed to one signature — a specific accent color and a distinctive display-type treatment — as its brand). *Likely vibe-coded default:* indigo-to-purple hero gradient, generic three-icon feature grid, fabricated "Trusted by 10,000+ developers" banner, identical section rhythm top to bottom. *Applying the guide:* §4/§9's Gradient Justification Test forces either removing the unjustified gradient or replacing it with the product's actual chosen signature (not a default); §4's feature-grid entry forces real code/API output over generic icons; §11 blocks the fabricated trust banner outright (Governing Principle 7 gate); §5's Controlled Variety forces section rhythm to vary by importance. *Where the guide had to work harder this round:* a first pass at applying §0's restraint-leaning language (muted defaults, Tier H deprioritizing novelty) risks *removing* the brand's one deliberate signature along with the unjustified decoration, landing on a technically-compliant but now-forgettable page — exactly the "copy-paste minimalism" failure Governing Principle 4's new blandness note names. *Revision made because of this simulation:* Governing Principle 4 now explicitly distinguishes removing unjustified decoration from removing a product's one deliberate, consistently-applied signature, using this exact scenario as the reasoning (a single owned accent/type treatment is not itself a §4 violation, and removing it to "de-risk" is not what this guide asks for).

**2. Dense internal enterprise workflow, on a shared internal design system** (brief: an internal tool for a large org's support/operations team, built on the company's existing internal component library that dozens of other internal tools also use; users context-switch between these tools daily; primary task is processing queued cases quickly, all day). *Likely vibe-coded default (in the other direction from #1):* a generic marketing-style shell wrapped around the data, low density, unnecessary card treatment per data point, a "fresh coat of paint" that makes this tool look different from every other internal tool the same users rely on. *Applying the guide:* §3's density table correctly steers toward high density, minimal motion, low visual noise; §7's card-necessity test and dashboard/metric-value test cut unnecessary cards; §10's state-completeness table matters more here than for a marketing page, since this tool is used all day, every day. *Where the guide's default framing would have misled an agent:* §16's original de-defaulting checklist, read literally, would push an agent to redesign this tool's tokens/composition away from the shared internal system it's built on — which is the *wrong* move here, since consistency with the other internal tools the same users already know is the actual usability win, not a failure to customize. *Revision made because of this simulation:* added an explicit EXCEPTION to §16 covering exactly this case — staying recognizable is the deliberate, defensible choice when users' familiarity with a shared system is the point, distinguished from unexamined default use by whether the team can answer *why* (§2), not by how the pixels look.

**3. Content-heavy / data-heavy product** (a documentation site with an embedded analytics dashboard for API usage) — retained from round 1. §8's typography rules (line length, reading-optimized line height) apply to the documentation surface; §7's dashboard rules and §10's chart/table state requirements apply to the analytics surface within the same product; the guide's context-scoping (rules keyed to product-type and component, not applied globally) handled the split without contradiction. Round 1's identified gap (no explicit guidance on cross-density visual consistency between the two sub-experiences) remains a documented limitation rather than fully resolved — see Appendix C.

**4. Data-heavy financial/analytics dashboard, where cards and density are genuinely correct** (brief: a trading/portfolio-analytics dashboard; primary user is a professional trader monitoring positions all day; primary task is noticing a threshold breach and acting within seconds; comparable in kind to Grafana/Datadog-style operational dashboards, where a dense grid of small, comparable metric panels is the documented, praised pattern, not a defect). *Likely vibe-coded default:* either the "artificially sparse" failure (§4 — three widgets floating in whitespace, wrong for this user) or the opposite failure of decorative charts with no decision value (§4.3). *Applying the guide:* §4.3's metric-value test ("what does the user do differently if this number is high vs. low") is the load-bearing check — for this product type, the honest answer for most tiles is "yes, this drives an immediate action," which is precisely the case where §4.3's own stated EXCEPTION applies and a dense multi-card layout is correct, not a smell. *Where a naive reading of the guide would go wrong:* an agent pattern-matching only "excessive cards" and "5–7 metric ceiling" as hard limits (rather than as defaults, per the Evidence Hierarchy) could wrongly strip this dashboard down below the density its users actually need, especially since alert/threshold panels (a single red panel demanding attention, the pattern research attributes to Grafana/Datadog specifically) require enough simultaneous panels to make an anomaly visible by contrast. *Confirms rather than requires a revision:* this is the intended reading of §4.3's existing EXCEPTION clause and the Evidence Hierarchy's framing of numeric guidance as defaults, not ceilings — logged here as a successful stress test of existing wording, and cited as the source for the round-2 addition to §26 corroborating the 4–6/5–7 metric range from an independent source (Setproduct's dashboard-pattern analysis) rather than as a new rule.

**5. Consumer web application with justified strong motion** (brief: a habit/streak-tracking consumer app, comparable in category to Duolingo-style products; primary user is a casual, infrequent, emotionally-invested user; the product's business case for retention specifically depends on a rewarding, low-frequency celebratory moment). *Likely vibe-coded default:* motion applied everywhere uniformly (every card fades in, every hover moves) with no distinction between routine chrome and the one moment that matters. *Applying the guide:* §14's motion-purpose test, combined with the round-2 addition requiring the §2 removal test as the actual check (not just naming a purpose category), correctly identifies that most of the app's routine motion (list scrolling, navigation) should be minimal-to-none, while the streak-completion celebration is a legitimate, strong "feedback/attention guidance" moment specifically because removing it would measurably hurt the emotional payoff the product's retention model depends on — this passes the removal test where routine hover-jiggle does not. *Where this simulation adds something round 1 didn't test:* it's the first simulation where "strong, non-minimal motion" is the *correct* answer for part of the interface, confirming that §14's restraint-leaning framing doesn't (and per its own text, was not intended to) forbid deliberate, justified expressiveness — it forbids *unexamined* motion applied uniformly regardless of purpose. No revision needed; logged as a successful stress test of §14's existing "if none of these apply" framing, which already conditions removal on the purpose test failing, not on motion being present at all.

**Cross-simulation observation.** The two revisions this round's simulations actually produced (Governing Principle 4's blandness note, §16's recognizable-library exception) both correct the same underlying risk: earlier wording that was *correct in intent* ("don't add unjustified decoration," "de-default component libraries") but read, on a literal pass, as if it also prohibited deliberate distinctiveness and deliberate consistency-with-convention — the two cases where following the letter of the rule would have actively hurt the product. Both fixes work by pointing back to §2's justification test as the actual arbiter, rather than by carving out more specific exceptions per case, which keeps the rule count from growing unboundedly as more edge cases get found.

## Appendix E — Independent Review Log

Two independent reviews have been commissioned so far, each from a fresh agent context with no access to this document's drafting rationale (Governing Principle 9). Both are logged here as compact tables rather than full transcripts — round 1's entry was previously a much longer prose report; round 2's own independent review specifically flagged that appendix bulk had started to read as rigor-signaling rather than rigor, and this table format is the direct response to that finding, not just a stylistic choice. A former appendix — self-grading the document against its own gate list, lettered "F" at the time — was removed for the same reason (see the closing note below). That letter has since been reused for unrelated round-3 content (Appendix F, below, is now the practical bike-shop test); every "old Appendix F" reference in this section means the removed gate report, not the current appendix at that letter.

**Round 1** (25 findings + a fact-check pass). "Fixed" means the document body was edited in response.

| # | Finding | Disposition |
|---|---|---|
| 1–4 | Unsupported/overstated claims: an unattributed quote (§1), a flat-stated "wallpaper/two weeks" figure (§4.3), an over-precise arXiv citation, an over-precise Material dark-mode description | Fixed — reworded/hedged/corrected in place |
| 5–6 | Overly rigid rules: "never trade tiers" read as absolute; absolute emoji ban ignored real cases (Notion/Slack) | Fixed — softened both, with exceptions |
| 7–10 | Missing: security-adjacent UI concerns, SEO/metadata, cross-browser/progressive-enhancement checks, error-monitoring/visual-regression mention | Fixed — added to §10, §7, §18, §15 respectively |
| 11 | Two numbered lists in §0 both had an "item 7" (real bug) | Fixed — priority list now uses Tier A–H letters |
| 12 | §4.1's centered-layout warning easy to over-apply against §7's own exceptions | Fixed — strengthened the exception note |
| 13 | Gradient Justification Test defined three times | Fixed — canonicalized in §9 |
| 14 | Uniform §4 catalog template read as the document's own "identical rhythm" anti-pattern | Not restructured — task-specified structure for a reference catalog; added a clarifying note instead (§4 intro) |
| 15–16 | Rubric could reward novelty-chasing; motion-purpose categories gameable post hoc | Fixed — added caveats tying back to Priority Tier H and the §2 removal test |
| 17–18 | "Manual with a screen reader" not achievable by an AI agent alone; Memory Test can't be self-administered | Fixed — added best-available-alone methods and an explicit gap-disclosure requirement (§13, §20) |
| 19–20 | Proximity overstated as the dominant hierarchy cause; uppercase claim missing an evidence tag | Fixed — reworded and tagged |
| 21–22 | EXCEPTION mechanism uncapped; independent-review trigger too soft ("where feasible") | Named as risks, but round 1's fix was rhetorical (a warning paragraph) rather than a mechanism — **round 2's review found this insufficient; see round 2 findings 2 and 4 below for the actual mechanism fix** |
| 23–24 | Same uniform-template concern restated; repeated hedge-phrase register | 23: same as #14. 24: acknowledged, not rewritten (fixing prose variety across 1,200+ lines carried more risk than benefit) |
| 25 | The old Appendix F's self-grading was itself weak evidence | Partially addressed in round 1 (marked "provisional"); **fully resolved in round 2 by removing Appendix F** (see below) |
| Fact-check | WCAG contrast/target-size and Material `#121212` confirmed correct. **Focus Appearance's numeric thresholds are AAA, not AA** — this was a real factual error | Fixed — corrected in §5, §9, §13 |

Round 1's closing verdict, verbatim: *"This document is not ready to adopt as an org-wide standard as-is... but naming a risk is not the same as closing it, and on inspection several of its core defenses are load-bearing rhetoric rather than mechanisms."* That assessment turned out to be correct, and is exactly what round 2's independent review confirmed and extended (below).

**Round 2** (18 findings, testing five concrete scenarios plus general critique). This review was explicitly harsher, was told nothing about round 1, and its central conclusion was that round 1's fixes for the exception-loophole and independent-review-trigger problems were "load-bearing rhetoric rather than mechanisms." That conclusion is accepted at face value below.

| # | Finding | Disposition |
|---|---|---|
| 1 | §24's fast-path checklist omitted any blandness counterbalance — an agent using only the checklist had no nudge to preserve a deliberate brand signature | **Fixed** — added a §24 item requiring confirmation that de-decoration didn't strip out the product's signature |
| 2 | Independent-review trigger was self-graded ("work you'd call Strong or better") — circular, since an agent can just self-score low to avoid it | **Fixed** — Governing Principle 9 now keys the trigger to an objective condition (production/shipping/the exception-count gate), not a self-assigned score |
| 3 | §24's "overridden" wording contradicted §16's own recognizability exception | **Fixed** — reworded to allow "deliberately kept per §16" |
| 4 | Exception-laundering was named in prose but had no actual mechanism preventing it | **Fixed** — added a hard gate: more than ~2 EXCEPTIONs on one piece of work MUST trigger independent review before completion (§23, §24) |
| 5 | Swap Tests (Product/Copy/False-Specificity) were optional §20 diagnostics, absent from the actual Definition of Done | **Fixed** — added as required §23/§24 completion items, not optional |
| 6 | Self-review defenses (route-continuity, "looks clean is not a critique") are purely instructional with no way to verify an agent actually did them | **Acknowledged as a standing, likely irreducible limitation** of a text-based standard (Appendix C) — the round-2 mechanism fixes reduce how often this matters, but don't eliminate it |
| 7 | "Independent review" by another AI shares correlated training priors — real independence for mechanical bugs, weak for taste-based claims | **Fixed** — Governing Principle 9 now says this explicitly and recommends human/user input specifically for taste claims |
| 8 | Confidence labels in Appendix A ("High") overstated the rigor of search-snippet-only sourcing | **Fixed** — downgraded three rows to Medium/Medium-High with reasons stated |
| 9 | A fabricated "review complete" appendix incident during round 1 got one passing mention, no real examination | **Fixed** — added an actual root-cause note and standing corrective practice (Appendix B) |
| 10–11 | Canonizing Stripe/Linear/Vercel as "the" distinctiveness pattern risks a new homogenized target; no room for brands built on deliberate inconsistency | **Fixed** — reframed as one illustration, not the template; added explicit room for non-restrained and pattern-breaking brand identities (Governing Principle 4) |
| 12 | Aesthetic-usability-effect claim stated more precisely in body text than this document's own Appendix A hedge supports | **Fixed** — softened body text to match |
| 13 | i18n text-expansion figures mislabeled "Evidence-backed" against this document's own Evidence Hierarchy definition | **Fixed** — relabeled to "Widely accepted professional default" |
| 14 | Two practitioner sources both citing "5–7 metrics" may be the same recycled heuristic, not independent corroboration | **Fixed** — reworded to avoid claiming triangulation that can't be verified from secondhand sourcing |
| 15 | Dark-mode guidance's cost framing risked functioning as a near-blanket ban | **Fixed** — clarified that the real cost is skipping the token system (§5/§9), not dark mode itself; a product with tokens already in place can add it more cheaply than the entry implied |
| 16 | Icon-library guidance didn't grant the same "deliberate, consistent use is legitimate" exception given to every other §4 pattern | **Fixed** — added parity exception |
| 17 | Missing: multi-tenant/white-label theming tension, legal/compliance UI, design-token governance over time, human-designer handoff process | **Partially fixed** — added multi-tenant/white-label and legal/compliance notes (§9, §10); token governance and human handoff logged as explicitly out of this document's stated scope (Appendix C), not solved |
| 18 | Appendix bloat (D–H) reads as rigor-signaling, disproportionate to the substantive fixes it wraps | **Fixed by this edit** — this table replaces round 1's long prose report and the old self-grading Appendix F |

Round 2's closing verdict, verbatim: *"A team adopting this today should treat it as a good first-draft pattern catalog and checklist, strip or radically shorten the appendices before shipping it internally, and add the specific gate fixes above (especially items 1–5) before trusting it to actually change outcomes rather than just generate paperwork around them."* Items 1–5 are the ones fixed with actual mechanisms (checklist items, hard gates, an objective review trigger) rather than more prose, for exactly that reason.

**On the old Appendix F.** It graded this document against its own completion gates and reported "Pass" on most items — round 2's review correctly identified this as a same-author self-check dressed up as an audit, which is weaker evidence than either independent review above and shouldn't have shared space with them as if it were comparable. It has been removed rather than kept and re-labeled again; the two verdicts quoted above, not a self-administered checklist, are this document's actual evidence about its own state.

## Appendix F — Practical Tests: Bike Shop Example, Perigee Landing Page, and Perigee Mission Control

The first real (not hypothetical) test of this document: a one-page site for a fictional local bike-repair shop was built following this guide, then inspected as a skeptical stakeholder would — read in full, actually rendered, and checked with browser automation (Playwright/Chromium) rather than judged from source alone: screenshots at desktop/tablet/mobile widths and in dark mode, a keyboard tab-order and focus-visible check, a 200%-zoom render, a console-error check, and a direct reproduction of the timezone claim below (not taken on faith) by mocking the same real-world instant from two different visitor timezones.

**What held up.** No gradient hero, no card grid, no fake testimonials/stats, no icon clutter, no exaggerated radii — the pattern catalog (§4) worked as intended. Tables for hours/prices instead of cards (§7's card-necessity test applied correctly). Appropriate density for the content. No console errors; keyboard tab order and focus-visible outlines correct; contrast was actually measured (WCAG relative-luminance formula, not eyeballed) and one real failure caught and fixed before the page was ever shown to anyone (a muted gray at 3.88:1 against a 4.5:1 requirement).

**What didn't.** Six real problems, each traced to a specific gap this document had before this test, not to sloppy one-off execution:

| Problem found | Category | Guide gap it revealed |
|---|---|---|
| Code comments ("single owned accent, used nowhere decorative," "real state, not decoration") read as justifications to an evaluator, not maintainer-useful notes | Overengineering / performative implementation | No prior guidance distinguished source comments from compliance narration — added as Governing Principle 10 |
| Business name/address/history/pricing were generic enough to belong to nearly any similar shop | Missing product evidence | §3 required a product brief but not a test for whether the *result* was still generic — added the diagnostic question and Authentic Detail Test |
| Full token system (spacing/type/color/motion scales, separate dark theme) for a single static page, with four tokens defined and never referenced anywhere in the file | Overengineering | §5 already said "scale to project size" but gave no way to check it — added the Proportionality subsection and test, with "grep for unused tokens" as a concrete, checkable method |
| Automatic dark mode with no stated justification for this product | Overengineering / missing product evidence | No prior guidance treated optional features as competing for priority rather than free to add — added the Feature Prioritization subsection in §5 |
| "Open now" computed from the visitor's browser clock, not the shop's own timezone — confirmed via Playwright: at one real instant, a Tokyo-based visitor and a Portsmouth-based visitor got different, contradictory status text for the same shop | Technical defect | §11 covered content variance but not domain-correctness of computed values — added the "dynamic state must be correct for the domain" subsection and Operational Truth Test |
| The scenario itself had almost no real operational texture (no appointment/walk-in distinction, no parts-vs-labor pricing note, no service exclusions) to model in the first place | Visual/product weakness | No prior guidance distinguished removing unnecessary complexity from never having modeled any — added the "necessary complexity" distinction and Useful Mess Test in §3 |

**Changes made to the example** (kept the restrained visual system, tables, and single accent — did not add a hero, cards, fake reviews, or extra sections): rewrote the open/closed calculation to use `Intl.DateTimeFormat` with an explicit `America/New_York` timeZone rather than the visitor's local clock (re-verified: now correct from Tokyo, Portsmouth, on a weekday during/after hours, Saturday, and Sunday — 4/4 scenarios pass); removed every performative comment, replacing the one genuinely non-obvious piece of logic (why timezone-aware calculation, not local time) with a normal technical comment; removed unused tokens (a spacing step, two type-scale steps, an unused surface color) and removed dark mode entirely (no stated justification for a briefly-glanced-at local business site, per the new Feature Prioritization test); added an owner name, a walk-in-vs-appointment distinction, a same-day cutoff time, the bike categories serviced with an e-bike/cargo-bike caveat, a parts-vs-labor pricing note, a "holiday hours may differ" caveat on the live status feature, a directions link, and a parking/payment note. All of this is fictional test data for a fictional shop, not a real business's facts — it is labeled as such here and was chosen because it's the kind of detail a real shop in this situation would plausibly have, not asserted as verified.

**What this test could not validate.** No real bike shop, owner, or customer was involved — every "authentic" detail added is still invented, just invented with more operational specificity than round one's version; a real deployment would need to replace all of it with the shop's actual facts. No human user attempted the actual task of finding hours or calling the shop. The Playwright checks confirm rendering, contrast, keyboard behavior, and the timezone fix mechanically; they do not confirm the page is persuasive, trustworthy, or usable to a real visitor, which remains heuristic judgment per Governing Principle 3.

**Round 5: Perigee landing page (first real test of §6).** A one-page marketing site for a fictional orbital-manufacturing startup was built by working through §6's Creative Direction stages (a stated "Mission Control" visual thesis, a real signature visualization — an SVG orbit path with a `prefers-reduced-motion`-guarded platform marker and telemetry readouts derived from the same orbital phase, not independent random numbers), then inspected the same way as the bike-shop round: rendered and screenshotted at four widths, keyboard tab-order and focus-visible checked, 200% zoom checked, console errors checked, and both the reduced-motion and normal-motion telemetry/animation behavior directly exercised via Playwright rather than assumed from the CSS.

*What held up.* The signature visualization itself, the honest "illustrative telemetry" labeling (avoiding a repeat of the round-3 Operational Truth failure), a real measured contrast fix (`--text-muted` at 4.21:1 raised to 5.54:1 before shipping), an unused-token removal caught by the same grep-based Proportionality check round 3 introduced, and a tablet-width layout bug caught only by actually viewing the screenshot and fixed with a re-verified re-screenshot rather than assumed fixed.

*What didn't.* Direct user feedback ("this still looks incredibly vibe coded... the buttons and text formatting") identified two problems the build/review process above had not caught on its own: the primary button (`border-radius: 4px`, solid accent fill, `opacity: 0.9` hover) was the unmodified shadcn/Tailwind button convention with only the fill color swapped, and the hero heading/mark/CTA heading used `-0.01em` to `-0.015em` letter-spacing — Tailwind's own `tracking-tight` value, common enough to be a recognizable default rather than a deliberate refinement. Both occurred with zero component library in the codebase, and both occurred *after* §6's process had produced a real, specific creative thesis (Mission Control) — the thesis just never reached these two elements; the one genuinely distinctive typographic idea in the page (a monospace/technical register) was confined to three small caption-level elements throughout the build and review, never touching the primary hierarchy where a reader would actually notice it. Root cause, confirmed against research on both conventions: §6 asks for a stated direction but nothing in the guide's checklist forced every element — especially small, secondary ones like a button's hover state — to be checked against that direction rather than left at whatever a plausible-looking default supplies.

*Fix, in the example:* button radius sharpened to 2px, label typography moved to the mono/uppercase register already established for telemetry elsewhere on the page, the opacity-fade hover replaced with a real state change (a computed, contrast-verified darker fill plus a pressed-state transform), and negative tracking removed from all three headings; the monospace register was also elevated into the primary hierarchy (the header mark, and a new kicker line above the H1) instead of staying confined to captions. Re-verified with the same Playwright suite (console, tab order/focus-visible, 200% zoom, both motion states) plus fresh screenshots at all four widths.

*Fix, in the guide:* §16 (Component-Library De-Defaulting) now states explicitly that its checklist applies with no library present — hand-written CSS converges on the same defaults for the same reason a library ships them — and names the solid-fill-plus-opacity-hover button and uniform small-radius convention as recognizable failures independent of accent color. §8 (Typography Rules) gained an AVOID entry naming negative tracking on large headings as a specific, now-common utility value rather than a neutral choice, requiring justification against the product's actual thesis rather than default application.

*What this test could not validate.* The catch that mattered came from direct user critique of the rendered page, not from any checklist item or self-review step in this document — the build's own §19 self-critique and the Playwright verification suite both passed the page before that feedback arrived. This is the same category of limitation Appendix C already names for self-reported checklists generally, now with a concrete instance: a real independent look (Governing Principle 9) caught something a same-author process, even a thorough one with real browser verification, did not.

**Round 8: Perigee Mission Control (first test against a dense, stateful, multi-route application).** Every practical test through round 6 was a simple, mostly-static, single-purpose marketing page — a gap this document's own evidence named three separate times (this Appendix C entry; round 6's Appendix I; round 7's own live-verification Appendix J) without ever being closed. This test builds `examples/perigee-mission-control/` — three real routes (Fleet Overview, Capsule Detail, Manifest & Schedule) for a fictional internal tool Perigee's own mission-ops engineers would use, the "data-heavy dashboard" row of §3's own product-type table, rendered and verified the same way as the prior two tests (Playwright at three widths, console-error check, keyboard tab-order/focus-visible check, WCAG contrast calculated — not eyeballed — against the real rendered, alpha-blended surfaces) plus a live check specific to this product type: loading the same page twice, several seconds apart, and confirming a displayed real-event timestamp stays byte-identical while its relative age still advances. Full build notes: `examples/perigee-mission-control/README.md`.

*What held up.* No metric wall (three summary tiles, each tied to §4.3's "does this number change what the user does next" test); dark theme built and justified per §5's Feature Prioritization test (an extended-session monitoring tool), not applied or skipped reflexively; no negative tracking on any heading, a real, non-reflexive application of §8's own marketing-vs-application distinction rather than either a blanket ban or a default; non-ideal states that are load-bearing, not decorative — an active anomaly with a stated owner and an honest "fault not yet ruled out," a telemetry gap explicitly modeled as a *different kind of state* than an anomaly (§11's unavailable-vs-erroneous distinction), a genuinely empty unassigned manifest slot, a real "capsule not found" state for an unmatched URL parameter, and a recovered capsule that correctly has no live-telemetry section at all. Self-review and automated checks independently caught and fixed a redundant status badge visible only once screenshotted at a narrow width, an inconsistent status-color mapping between two non-nominal states, and a missing focus-visible style on the very first keyboard-Tab stop on every page.

*What didn't.* A blind review (a fresh subagent, given only four screenshots with zero framing, matching this document's Blind Review Requirement methodology) found a real data-modeling bug none of the build-time checks had caught: telemetry age was stored as "minutes before whoever happens to load the page," and an "absolute" UTC timestamp was derived backwards from that relative offset fresh on every load — so the same real event showed a visibly different absolute timestamp in each of three screenshots, caught by the reviewer simply comparing them side by side. This is a new, general instance of §11's dynamic-state-correctness principle, distinct in mechanism from the round-3 timezone bug (that one used the wrong clock; this one manufactured a fake fixed value from a relative one, which is backwards — the relative value must be derived from a real fixed event, never the reverse). The same review also found: an unbacked "updated live" claim and an inaccurate active-capsule count in violation of §11's content-integrity rules; a schedule hold visible on the Manifest route but invisible on the Fleet route, the actual screen a controller would be scanning (a cross-route-coherence gap, not a single-page defect); a thermal reading presented as a single instantaneous number with no way to answer "is it rising, flat, or oscillating" — named as the single biggest functional gap; and a button/link double-affordance and an over-colored alert paragraph, both small but real polish defects invisible to the build's own automated checks because they check for presence and function, not redundant or misapplied visual signals.

*Fix, in the example:* `data.js` now stores one fixed ISO 8601 timestamp per real telemetry event instead of a page-load-relative offset, and `app.js` computes every displayed age from that fixed source of truth — re-verified by loading the same page twice, four seconds apart, and confirming the absolute timestamp is now identical both times. A row-level hold indicator was added to the Fleet table, cross-referencing the schedule data so a hold is visible from the screen someone is actually scanning. A real ten-point SVG trend chart (hand-authored data consistent with the anomaly's own "40 minutes" narrative, a drawn nominal-ceiling reference line) replaced the single instantaneous thermal reading — a chart that answers an actual question, per §10's chart requirement, not a decorative one. The unbacked "live" claim and inaccurate count were reworded to state only what's true; the double-affordance and over-colored paragraph were fixed with one CSS/markup change each. Fixing the timestamp bug introduced a second one, caught immediately by re-screenshotting rather than assumed fixed: reusing the same live-age widget for a recovered capsule's landing time made its 10-hour-old age inherit the "stale/lost" alert coloring meant for a vehicle that should be talking to mission control and isn't — fixed by adding an explicit non-alerting mode to the widget for cases where "old" doesn't mean "wrong." Two findings were deferred rather than fixed, stated honestly rather than smoothed over: whether the two least-decisive KPI tiles individually earn their space is logged as an arguable judgment call, not a bug; and the mobile fleet table remaining a shrunk desktop table rather than a true card-based mobile layout is logged as an accepted scope limit of this test, not a claimed fix.

*Fix, in the guide:* §11's dynamic-state-correctness subsection gains this as a second, mechanism-distinct concrete case alongside the round-3 timezone bug (see the addition there). No other section required a correction — round 6's Signal-Combination Model, audits, and this Appendix's own Blind Review Requirement are what caught every finding above; this test is evidence they work on a denser product type, not evidence they needed to change.

*What this test could not validate.* One blind reviewer, one session — the same "single data point" caveat every practical test in this document has carried individually. No independent human reviewed it. No real mission-ops team's actual workflows were checked against this build's invented operational texture, which is internally consistent and specific but still invented (per §3's necessary-complexity guidance, disclosed as such rather than presented as fact). And the product itself is still small — six capsules, one company, no real scale — so the proportionality and information-architecture tradeoffs a genuinely large multi-tenant or high-volume version of this product would force were never actually faced.

## Appendix G — Change Summary

**Round 1.** Created `ANTI_VIBE_CODING_UI.md` at the repository root (no prior equivalent existed). Built ~50-source research base spanning WCAG, established design systems, and independent AI-slop/vibe-coding critique. Simulated against three product types (Appendix D). Independent review (Appendix E) produced 25 findings; 20 integrated directly, 1 addressed by a clarifying note instead of the suggested restructure (reasoned in Appendix E), 1 acknowledged without a fix (hedge-phrase repetition — cost of fixing exceeded benefit). Fact-check caught and corrected one real error: WCAG Focus Appearance's numeric thresholds are AAA, not AA, cited in three places.

**Round 2.** Added a Performance and Perceived Quality section (new §15), requiring §15–§25 to renumber to §16–§26. Conducted fresh, counter-evidence-focused research (Appendix H's sourcing) and a 25-row claim-by-claim audit (Appendix H). First substantive pass added: the aesthetic-usability effect to Governing Principle 3; a blandness/homogenized-restraint counter-risk and two new heuristic tests to Governing Principle 4/§20; a route-continuity requirement to §18/§23/§24/§25; race-condition/state-ownership rows and visual-regression-flakiness detail to §15; a recognizable-library exception to §16; a permission/privacy paragraph to §10; a Goodhart's-Law framing for exception-laundering in §23; and replaced Appendix D's 3 simulations with 5.

A second independent review (folded into Appendix E above) found that several of those first-pass fixes — the exception cap and the independent-review trigger specifically — were still rhetorical rather than mechanical, and found 16 further issues (a self-graded circular review trigger, Swap Tests absent from the actual completion gates, a §16/§24 wording contradiction, overstated confidence labels, an under-examined process failure, a homogenization risk in citing the same three reference products repeatedly, an evidence-tier mislabeling, an illusory-corroboration claim, a near-blanket-ban risk in the dark-mode entry, an icon-library exception-parity gap, missing multi-tenant/legal-compliance coverage, and — the most consequential structural finding — that the appendix machinery itself (D through the old F) had become disproportionate self-referential bulk relative to the substance it wrapped). All but one were fixed with concrete mechanism changes (a hard exception-count gate, an objective independent-review trigger, Swap Tests moved into the actual Definition of Done, corrected labels and citations); the appendix-bloat finding was addressed by consolidating both independent-review reports into a single compact table (Appendix E) and removing the old self-grading gate-report appendix entirely (its own appendix letter has since been reused for unrelated round-3 content below, since appendix letters track position, not identity), rather than by adding a third appendix narrating the fix.

**Round 3** (a real, not hypothetical, practical test — Appendix F). Built and inspected a real one-page example against this guide, using browser automation to verify rendering, contrast, keyboard behavior, and a concrete, reproduced timezone-correctness bug rather than relying on inspection alone. This surfaced six problems traced to genuine gaps in the guide, not one-off execution mistakes: performative source-code comments justifying decisions to an imagined evaluator (fixed by adding Governing Principle 10, and a Design Rationale field to §25's template as the correct home for that reasoning); product specificity that stopped at copy/color and didn't survive being transferred to ten similar businesses (fixed by §3's new diagnostic question and the Authentic Detail Test); a design-token system with unused, never-referenced tokens for a single static page (fixed by §5's new Proportionality subsection and test); automatic dark mode with no stated justification (fixed by §5's new Feature Prioritization subsection); a real, reproduced correctness bug where computing "open now" from the visitor's browser clock instead of the business's own timezone gave contradictory answers to visitors in different timezones at the same instant (fixed in the example via `Intl.DateTimeFormat` with an explicit timeZone, and generalized in the guide via §11's new "dynamic state must be correct for the domain" subsection and the Operational Truth Test); and a test scenario simplified until it had no real operational complexity left to model (fixed by §3's new "necessary complexity" distinction and the Useful Mess Test). Full detail, including what was verified with browser automation versus reasoned about, is in Appendix F.

**Round 4.** Added a new "Creative Direction and Visual Ambition Framework" section (new §6, requiring §6–§25 to renumber to §7–§26), addressing a gap the document already knew it had: everything through round 3 was calibrated to catch unjustified decoration, with only a short blandness counter-note (Governing Principle 4) and two heuristic tests as the counterweight, and nothing operationalizing how to make a genuinely ambitious, expressive, high-personality direction deliberate and product-specific rather than an accumulation of effects. Unlike rounds 1–3, this content originated as a detailed framework specification provided directly by the user, not as this document's own independently-researched synthesis — it was integrated and cross-referenced into the existing structure (Governing Principles, the pattern catalog, the heuristic-test table, the scoring rubric, must-pass gates) rather than appended as a separate, disconnected document. A review pass checking internal consistency, cross-reference accuracy, and testability against the rest of this document was commissioned and completed. It confirmed the cross-references check out (spot-checked well over a dozen against real section content) and that §6 doesn't tell an agent to violate any existing MUST/AVOID, but found 13 concrete problems, all fixed directly rather than merely noted: a citation to a "Trend-Reversal reasoning" test that didn't exist anywhere in the document (pointed to Governing Principle 2's real "temporary visual trend" category instead); a genuine, previously-unstated contradiction with §9's single-accent color model (now requires a documented EXCEPTION per this file's own convention rather than silently licensing a wider palette); the Identity Test silently dropping the Memory Test's explicit "cannot be self-administered" caveat (restored); the Distinctiveness Rubric having no stated scale or interpretation, unlike its sibling in §21 (added: /140, explicitly advisory, reconciled by reading justifications together rather than averaging two scores); a duplicated statement of the same idea (Removal Test applied to a whole direction) in two places (merged into one with a cross-reference); a self-referential range citation that included §6 in a list of sections it claimed were "sufficient without it"; Independent Creative Review carrying no explicit MUST/SHOULD or stated trigger (now tied explicitly to Governing Principle 9's objective triggers); no named gaming-pattern warning for this section, unlike §23's explicit treatment for the rest of the document (added, including the specific risk of mislabeling ordinary decoration as Tier G to smuggle it past Governing Principle 1's priority order); and — the most structural finding — that §6 was entirely invisible to §24's Compact Build Checklist and §25's review template, the two artifacts this document tells agents to actually use day-to-day, so an agent following those exactly as instructed would never be prompted to open §6 even for a product whose brief called for it (fixed with new checklist items and a review-template field). The reviewer's remaining concern — that §6, at ~300 lines, is the single longest section in the document and risks the same self-referential-bulk failure mode this document's own appendices were trimmed for twice before — was judged, after review, to be substantially mitigated rather than fully resolved: §6 already compresses its overlap with existing machinery (§3's brief, §17's workflow, §19's self-critique, §20's tests) into pointers rather than restatements in most places, and the specific redundancy found (the duplicated Removal Test mention) was fixed; a full restructure was not undertaken because the reviewer's own verdict judged the section's substance sound and its length a secondary concern next to the four correctness issues above, which were the ones actually fixed with priority.

**Round 5.** First real practical test of §6 (Appendix F's second entry): an ambitious landing page was built following the Creative Direction process, verified with the same rendering/contrast/keyboard/motion checks as round 3, and shipped with a real defect anyway — a default shadcn/Tailwind-style button (rounded fill + opacity-fade hover) and cliché negative-tracking headings, both occurring with no component library present and both surfaced only by direct user critique of the rendered page rather than by any check in the document itself. Fixed in the example (sharpened radius, mono/uppercase button labels tied to the page's own technical register, a real non-opacity hover state, negative tracking removed, the monospace idea elevated from captions into the primary hierarchy) and generalized into the guide: §16 now states its de-defaulting checklist applies with no library involved and names both conventions explicitly; §8 gained an AVOID entry for negative tracking on headings as a specific, common utility value rather than a neutral default. Appendix C's §6 entry updated to reflect that the section has now been build-tested once, with a real, specific gap found and fixed rather than confirmed clean.

**Round 6** (a deep recalibration pass, not another cosmetic fix — full detail in Appendix I and `research/`). Triggered by direct user instruction after round 5's fix still read as "weak," specifically asking for genuine research into what makes interfaces read as generated and a recalibration of this document's own judgment, not another prohibited-pattern pass. Produced four external research documents (`research/RESEARCH_REPORT.md`, `TAXONOMY.md`, `CALIBRATION_CORPUS.md`, `SELF_AUDIT.md`/`INDEPENDENT_REVIEWS.md`), disclosed honestly as constrained by this sandbox's lack of general network access (no live inspection of third-party production sites was possible; external evidence is real but search-snippet-grade). The single most consequential finding: two blind reviewers, given zero context, independently read round 5's corner-bracket framing device — defended at the time by an internally consistent rationale — as a recognizable AI-generated cliché reinforcing the exact problem it was meant to fix. This produced new Governing Principle 11 (pattern-avoidance is not authorship; only signal *combinations*, never isolated patterns, are meaningful evidence) and a set of new structural mechanisms rather than more prose: a Signal-Combination Model reframing the entire §4 catalog (every entry is now explicitly weak/moderate evidence alone); a First-Impression Review and a Blind Review Requirement in §18; Composition, Authorship, and Realism Audits plus an Uncertainty Requirement in §19; a five-dimension self-evaluation instrument in §21 (separating "is this good" from "does this read as generated," with named score caps for common evidentiary gaps) alongside, not blended into, the existing 100-point rubric; and completion-gate updates in §23/§24/§25 requiring these mechanisms rather than the pattern catalog alone. Governing Principle 4 gained a concrete anchor for its existing blandness warning: the 2025 Cracker Barrel rebrand backlash, a real, dated, financially-consequential case of defensive restraint reading as "soulless" rather than safe. No new items were added to the §4 pattern catalog and no rule was tightened into a stricter ban — every change is a new evaluative mechanism or a reframing of how to weigh existing rules, per explicit user instruction not to just produce a longer checklist.

**Round 7** (live empirical verification, closing the network-access gap round 6 disclosed — full detail in Appendix J and `research/INTERFACE_STUDY_RECORDS.md`). Round 6 was explicit that its external evidence was search-snippet/recalled-grade because the sandbox had no live network access, and named specific products (Stripe, Linear, Vercel, Arc, Notion, Framer) that should be treated as unverified until a session with real access could check them directly. This round had that access and did exactly that: ten interfaces were actually rendered via Playwright/Chromium at three widths, screenshotted, and inspected via live `getComputedStyle` — five Corpus A (GOV.UK, Primer, Stripe, Linear, Basecamp), three Corpus B (a v0 template and two Lovable templates, all disclosed AI-generation provenance), two Corpus C (Varda Space Industries, Craigslist). The verification produced a real, not merely confirmatory, correction: §8's negative-letter-spacing AVOID entry claimed the -0.01em-to-0.03em range "reads as a template tell in its own right"; live measurement found Stripe (-0.02em), Linear (-0.022em), Basecamp (-0.0225em), and Varda (-0.03em) — four maximally-credited, definitely-human-designed products — all landing inside that exact range on their primary hero heading, while only the two design-system reference sites (GOV.UK, Primer) used `normal` tracking. §8 now states the corrected, evidence-backed position directly at the point of the original claim rather than only in an appendix. A second finding partially informs, without fully resolving, round 6's open question about corner-bracket/technical-framing decoration: Varda (a real orbital-manufacturing company, the same industry as this project's own fictional Perigee example) uses a dotted grid overlay on its hero photograph, a live counter-instance to the claim that this class of device is inherently a hollow AI tell — with a specific, testable distinction offered (representational connection to real content vs. decoration reached for because it "looks technical"), logged in Appendix I rather than presented as settled. A third finding confirms rather than corrects prior work: every Corpus A record independently reinforced the Realism Audit's content-specificity signal (dated release notes, named customers, plausible file sizes), and the three Corpus B records demonstrate AI-tool output is not visually monolithic — one neo-brutalist, one genuinely tasteful and non-generic, one a clean Product Swap Test failure — all three disclosed-provenance. This round also documents, for future sessions, a Chromium/proxy TLS-handshake incompatibility that produced misleading `ERR_CONNECTION_RESET` errors indistinguishable at first glance from a network-access block, and its fix (`--ssl-version-max=tls1.2`, no certificate verification disabled).

**Round 8** (a fourth practical test, and the first against a dense, stateful, multi-route application — full detail in Appendix F's round-8 entry). Closes a gap this document's own evidence had named three separate times without ever closing it (Appendix C; round 6's Appendix I; round 7's Appendix J): every practical test through round 7 was a simple, mostly-static marketing page. Built `examples/perigee-mission-control/` — three real routes for a fictional internal ops dashboard — verified with the same Playwright suite as the prior tests, plus a check specific to this product type (loading the same page twice, seconds apart, confirming a displayed event timestamp stays identical while its relative age still advances). A blind review (a fresh subagent, zero framing, per this document's own Blind Review Requirement) found a real data-modeling bug the build's own checks had missed: an "absolute" timestamp was being derived backwards from a page-load-relative offset, so it silently drifted across reloads of the same real event — fixed at the data-model level, and generalized into §11 as a second, mechanism-distinct concrete case alongside round 3's timezone bug. The same review found and this round fixed: an unbacked "live" claim and an inaccurate count (§11 content-integrity), a schedule-hold state visible on one route but not the fleet-table route a controller would actually be scanning (cross-route coherence), a thermal reading with no way to tell if it was rising or falling (fixed by adding a real, decision-relevant trend chart, not a decorative one), and a button/link double-affordance plus an over-colored alert paragraph. Fixing the timestamp bug introduced a second bug (a recovered capsule's old landing time inheriting "stale" alert coloring meant for a vehicle that should be reporting and isn't), caught immediately by re-screenshotting rather than assumed fixed. No other section of this document required correction — this round is evidence round 6's mechanisms (Signal-Combination Model, audits, Blind Review Requirement) work on a denser product type, not evidence they needed to change. Two reviewer findings were deferred and stated as such rather than fixed cosmetically: whether two of three KPI tiles individually earn their space, and a full mobile card-layout redesign of the fleet table.

## Appendix H — Round 2 Adversarial Audit: Claim-by-Claim Table

A second, more demanding audit pass was conducted after round 1, using fresh external research (§26's "Round 2" source subsection) specifically aimed at counter-evidence — successful uses of cards/gradients/motion/centered layouts/recognizable component libraries, and documented criticism of restraint-as-default — not just confirmation of existing content. This table covers the ~25 highest-risk or highest-load-bearing claims in the document, evaluated against the eight audit questions (evidence, scope, failure mode, detection, correction, exception, verification, exploitability). Claims not listed here were reviewed but did not surface a problem worth a table row; that is a statement about this table's selection, not a claim that every sentence in the document was individually re-litigated.

| # | Section | Claim / instruction | Evidence class | Problem found (if any) | Disposition |
|---|---|---|---|---|---|
| 1 | §0 Priority order | Tiered priority, decorative novelty lowest | Author synthesis, internally consistent with Governing Principle 1's own priority list | Read literally, could suppress deliberate brand distinctiveness along with unjustified decoration (Blandness Test) | **Clarify** — added explicit blandness counter-note distinguishing the two (Governing Principle 4) |
| 2 | §0 Governing Principle 3 | AI self-review ≠ user validation | Standard HCI concept, now backed by the aesthetic-usability effect (Kurosu & Kashimura 1995) | Previously asserted without citing why self-review specifically is unreliable, not just "different" | **Expand** — added the aesthetic-usability-effect citation and mechanism |
| 3 | §4 catalog structure | Uniform 7-field template for every pattern | Task-specified requirement (machine scannability) | Round-1 reviewer read this as the document exhibiting its own "identical rhythm" anti-pattern | **Retain, clarified** — explicit note distinguishing catalog uniformity (intentional) from page-rhythm monotony (a defect); not restructured, since severity is already handled per-instance by §22 |
| 4 | §4.3 "5–7 metric ceiling" | Practitioner default for dashboard metric count | Practitioner synthesis (round 1) + independent corroboration (round 2, Setproduct) | Risk of being read as a hard ceiling rather than a default, wrongly capping legitimately dense professional dashboards | **Retain, corroborated** — round-2 research independently converged on the same range from a different source; risk addressed by the dense-dashboard simulation (Appendix D #4) confirming the existing EXCEPTION clause already permits denser layouts when justified |
| 5 | §4.2 purple/gradient default | Training-data-bias explanation, incl. a widely-cited Tailwind-creator remark | Multiple independent sources (round 1); anecdote unverifiable by direct fetch | Anecdote reads with more certainty than its verification status supports | **Retain, already hedged** — round 1 already labeled this "a widely cited example," Appendix A already flags the verification gap; no further action needed |
| 6 | §9 dark-mode elevation | Material's approach is "roughly 4–5 discrete steps" | Overstated precision vs. Material's actual continuous overlay formula | Factual error (caught by round-1 independent review) | **Narrow** — already corrected in round 1 to describe a continuous formula, with the step framing labeled as this document's own simplification |
| 7 | §9/§13 Focus Appearance | Cited as a blanket MUST | WCAG 2.2 — the specific numeric thresholds are AAA, not AA | Level mismatch (caught by round-1 independent review) | **Narrow** — already corrected to separate the AA-level "visible" requirement from the AAA-level specific thresholds |
| 8 | §9 accent-color rule | Limit accent to interactive/state elements | Refactoring UI + round-2 Stripe/Linear/Vercel analysis | None found; round 2 strengthened this with concrete evidence that single-owned-accent products are the ones cited as well-branded | **Expand** — added the "own a single accent" evidence note |
| 9 | §10 component table | Required states per component (12-state vocabulary) | Established design-system convention (Carbon, Material, ARIA APG patterns) | None found on inspection; internally consistent with §22's severity framework | **Retain** |
| 10 | §10 (new, round 2) | Security-adjacent UI concerns (XSS, autofill) | Standard secure-coding practice; genuinely a UI-visible concern | Missing from round 1 | **Expand** (added round 1, retained round 2) |
| 11 | §10 (new, round 2) | Permission/privacy communication | UX privacy-pattern literature (narrower sourcing than most of this document) | Newly added; sourcing breadth is the weakest of this round's additions | **Expand, flagged as lower-confidence** — see Appendix A |
| 12 | §11 realistic test-data list | 14 specific content-variance test cases | Practitioner QA convention, internally testable | None found; this is one of the document's more directly actionable, low-risk sections | **Retain** |
| 13 | §12 responsive breakpoints | ~600–900px under-tested range | Multiple independent practitioner sources | None found beyond the pre-existing "no first-party analytics" caveat | **Retain** |
| 14 | §13 accessibility table | "Manual with a screen reader" as the check for several rows | Standard accessibility-testing practice | An AI agent alone cannot perform this literally (caught by round-1 independent review) | **Clarify** — round 1 added the accessibility-tree/keyboard-only best-available-alone method, with an explicit instruction to state the gap rather than claim equivalence |
| 15 | §14 motion-purpose categories | Six legitimate purposes for motion | Author synthesis, broad by design | Broad enough to rationalize almost anything post hoc (caught by round-1 independent review); round 2's justified-motion simulation (Appendix D #5) confirms the categories are still useful when paired with the removal test | **Retain, corrected** — round 1 added the removal-test requirement as the actual check |
| 16 | §15 performance table | Core Web Vitals as starting thresholds | web.dev / Google standard-adjacent guidance | Risk of being treated as proof of overall quality | **Retain, already hedged** — explicit MUST NOT clause already present |
| 17 | §15 (new, round 2) | Race conditions / stale state visible in UI | Practitioner engineering analysis, well-corroborated mechanism | Missing entirely before round 2 | **Expand** |
| 18 | §15 (new, round 2) | Visual-regression flakiness causes/mitigations | Vendor + practitioner sources | Missing entirely before round 2; vendor sources carry mild self-interest bias | **Expand, bias noted in Appendix A** |
| 19 | §16 de-defaulting checklist | 12-item deliberate-review list for library-based UI | Practitioner critique (shadcn-specific) + this document's synthesis | Read literally, provides no room for the legitimate case where staying recognizable is the correct choice (caught by round-2 red-team simulation #2) | **Expand** — added the recognizable-library EXCEPTION with the Dub.co corroborating example |
| 20 | §18 route-by-route inspection | Visit and screenshot every relevant route | Standard QA practice | Passing every route in isolation doesn't verify the workflow between them (caught by round-2 red-team analysis, corroborated by journey-testing literature) | **Expand** — added the explicit end-to-end task-walkthrough requirement |
| 21 | §20 heuristic tests | 17 named diagnostic tests | Author synthesis, individually simple and testable | Missing an explicit test for homogenized-restraint and for domain-terminology-disguising-generic-structure | **Expand** — added the Blandness Test, False-Specificity Test, and an explicitly-named Component-Library Test |
| 22 | §21 scoring rubric | Top band rewards "could not be mistaken for any other product" | Author synthesis | Risk of incentivizing novelty-for-its-own-sake to defeat the swap tests (caught by round-1 independent review) | **Retain, corrected** — round 1 added the caveat tying this back to Priority Tier H |
| 23 | §23 Definition of Done | Exception-laundering / self-graded-confidence warnings | Round 1 addition; round 2 added Goodhart's Law framing | None found; round 2 strengthened the evidentiary basis (a named, general phenomenon, not an ad hoc worry specific to this document) | **Expand** |
| 24 | §23 (new, round 2) | Route-continuity required for Definition of Done | Corollary of #20 above | Missing before round 2 | **Expand** |
| 25 | §26 dashboard-metric sourcing | "5–7 metrics," "wallpaper within two weeks" | Practitioner secondary sourcing, not raw study data (already hedged in round 1) | Round 2 found a second practitioner source stating a similar range, but on review this may be the same recycled heuristic restated rather than independent corroboration — see finding 14 in Appendix E's round-2 table | **Retain, both figures still explicitly hedged as practitioner defaults, not upgraded to a stronger evidence tier** |

Claims not surfaced as problems in this pass, worth naming explicitly so the absence isn't mistaken for an oversight: the WCAG contrast/target-size numeric requirements (§9, §13 — standards-backed, verified correct in round 1's fact-check and not re-litigated here); the response-strategy hierarchy in §12 (internally consistent, each step independently testable); the severity framework in §22 (a simple four-tier scheme with no internal contradiction found). Absence from this table means the claim was checked and did not warrant a row, not that it was skipped.

---

## Appendix I — Round 6: Deep Recalibration Research

Round 6 was triggered by direct user instruction after round 5's practical fix (the button/typography corrections, then a composition/asymmetry pass) still read as "weak" — with explicit instruction to research more deeply rather than iterate cosmetically again, and to recalibrate this document's own model of what makes an interface read as generated, not just append more prohibited patterns.

**This round produced three full-length research documents in `research/` rather than folding everything inline, specifically to avoid the appendix-bloat failure this document has now named and corrected twice before (round 2's finding #18; round 4's reviewer note on §6's length).** Read them for full detail; this appendix summarizes only what changed in the document body and why.

- `research/RESEARCH_REPORT.md` — the research synthesis, with every claim labeled `[SEARCH]` (freshly retrieved via WebSearch, real URLs), `[RECALLED]` (training-knowledge description of a named product, not freshly observed), or `[OWN]` (this project's own rendered/screenshotted artifacts). **Methodology limitation, disclosed rather than hidden:** this sandbox has no general network egress (allowlisted to npm/pypi/anthropic/github only) and `WebFetch` returned 403 on every external URL attempted — so no live Playwright screenshot of a real third-party production site (Stripe, Linear, Vercel, etc.) was possible this round. External evidence is search-snippet-grade, not full-fetch-verified; this project's own artifacts are the only entries with genuine first-party visual verification.
- `research/TAXONOMY.md` — an eight-tier taxonomy (surface/structural/product/content/interaction/production-realism signals, strong signal combinations, legitimate exceptions) built from the research rather than from this document's pre-existing pattern catalog, then compared against it.
- `research/CALIBRATION_CORPUS.md` — a corpus honestly scoped to what could actually be verified: real discourse/critique with sources, plus this project's own two built examples (bike-shop, Perigee), rather than padded with invented per-example detail about sites never actually inspected this session.
- `research/SELF_AUDIT.md` and `research/INDEPENDENT_REVIEWS.md` — a blind review of this project's own bike-shop and Perigee screenshots by two fresh subagents with zero shared context (no prompt, no rationale, no framing), recording agreement and disagreement rather than a forced consensus.
- `research/REDESIGN_EXERCISE.md` — the required calibration redesign (Perigee's hero visual, taxonomy-tiered as a production-realism/Tier-6 fix, not another composition pass), including three considered structural directions and the reasoning for the one selected.
- `research/BLIND_VALIDATION.md` — a third, independent reviewer (uninvolved in the earlier blind reviews) compared the pre- and post-redesign screenshots unlabeled and, with no priming, correctly identified the same hollow-decoration problem, confirmed the fix addressed it for the stated reason, and surfaced two real remaining weaknesses this round did not fix (a placeholder `.example` contact domain; "Program 01" numbering implying other programs that never appear).
- `research/FRAMEWORK_DIFF.md` — a section-by-section before/after table, what was deliberately left unchanged and why, and which prior beliefs this round found incorrect or incomplete.

**The single most consequential finding, used as the basis for the largest single change to this document this round:** round 5's Perigee fix added corner-bracket framing around a technical diagram, defended at the time as "grounded in the Mission Control creative thesis." Both blind reviewers, independently and without seeing that rationale, named the same device as a recognizable AI-generated "sci-fi HUD" cliché — one predicting, correctly, that a wider viewport would make it read as *more* generated. **A plausible, internally-consistent design rationale was directly demonstrated to be wrong** — not hypothetically, but in this project's own immediately-prior work. This produced new Governing Principle 11 (pattern-avoidance is not authorship; a signal combination, not an isolated pattern, is the actual unit of evidence) and is the reason the Blind Review Requirement, First-Impression Review, and the Composition/Authorship/Realism Audits (all new, in §18-§19) are now completion gates rather than optional appendix content.

**Changes made to the document body, summarized (full text at each citation):**
- New Governing Principle 11 (pattern-avoidance ≠ authorship; Signal-Combination Model).
- Governing Principle 4 expanded with the purposeful-vs-defensive-restraint distinction, anchored to a real, dated, financially-consequential case (the 2025 Cracker Barrel rebrand backlash) rather than only prior reasoning.
- §4 gained an explicit Signal-Combination Model section, reframing every catalog entry as a weak/moderate signal rather than an individual verdict.
- §18 gained the First-Impression Review (self-administered, run before technical inspection) and the Blind Review Requirement (independent, run whenever Governing Principle 9's trigger applies).
- §19 gained three structured audits (Composition, Authorship, Realism) as required content of the self-critique cycle, plus an explicit Uncertainty Requirement banning unqualified claims like "no longer looks AI-generated."
- §21 split into two explicitly separate evaluations (Part I: general UI-quality rubric; Part II: a new five-dimension instrument for perceived-AI-generation/authorship/realism specifically, with named score caps for common evidentiary gaps — unrendered work, single-route review, ideal-content-only testing, no independent review, rationale visible during review, fabricated claims, structural interchangeability, homepage-only distinctiveness).
- §23 and §24 updated to require the new audits and Blind Review Requirement as completion gates, plus an explicit instruction to state which taxonomy tier a suspected problem belongs to *before* fixing it — directly correcting a recurring habit this round's self-audit found: defaulting to compositional fixes because they're the easiest to self-verify, even when the actual complaint was about content/product realism (Tier 3/6), which has no equally quick self-check.
- §25's review template gained First Impression, Five-Dimension Instrument, and Blind Review fields.

**What this round deliberately did not do, per the user's explicit instruction not to just produce a longer prohibited-pattern list:** no new items were added to the §4 pattern catalog itself, and no existing MUST/AVOID rule was tightened into a stricter ban. Every change above is either a new evaluative mechanism (an audit, a review requirement, a scoring dimension) or a reframing of how existing rules should be weighed (the Signal-Combination Model) — the goal was better judgment, not a longer checklist, and the additions were deliberately kept to mechanisms rather than more prose warnings, for the same reason round 2 rejected purely rhetorical fixes to the exception-laundering problem.

**What remains unresolved, stated plainly rather than smoothed over:** the corpus in `research/CALIBRATION_CORPUS.md` is smaller and shallower than the task's own requested minimums, for a disclosed, structural reason (no live network access to third-party sites this round) — a future session with real browsing access should redo the external corpus with genuine visual inspection rather than search-snippet evidence. The redesign exercise this round produced (`research/REDESIGN_EXERCISE.md`, applied to Perigee's hero visual — corner brackets removed, replaced with a real ground-vs-orbit comparison chart, plus an honest pre-flight stage disclosure) was completed and blind-validated (`research/BLIND_VALIDATION.md`): a third, previously-uninvolved reviewer, shown both versions unlabeled, independently confirmed the fix addressed the specific problem the two earlier blind reviewers found, and also surfaced two real weaknesses the redesign did not fix (a placeholder `.example` contact domain — an artifact of this being fictional content, not a real company; and "Program 01" numbering implying other programs that never appear). That validation is still a single data point on a single product category, reviewed by a small number of people. The corner-bracket finding itself, while now confirmed across three independent reviewers rather than two, is still evidence about one specific instance — whether "technical-looking decorative framing" is *always* a hollow-decoration tell, or only was in this specific instance, is not yet established with enough evidence to state as a general rule, and `research/TAXONOMY.md` logs it as ambiguous rather than settled for exactly this reason.

**Round 7 note on that open question:** live inspection of Varda Space Industries (varda.com — a real, funded orbital-manufacturing company, directly comparable to this document's own fictional Perigee example) found a dotted grid overlay across its full hero image, functioning as exactly the kind of "technical framing" device round 6 flagged as a hollow AI cliché. This does not resolve the open question in the other direction (Varda is one instance, same as the original finding) — but it is direct evidence that the device is not *automatically* disqualifying: on Varda it plausibly reads as motivated (satellite/geospatial imagery, an actual orbital-manufacturing product, a grid that echoes real geospatial reference lines) in a way the original Perigee instance did not (a decorative frame around an illustrative diagram, not motivated by any specific technical content). This sharpens rather than settles the open question: the mechanism is not "grid/bracket framing is inherently a tell," it is whether the framing device is legible as connected to real content specific to this product, or reachable as a generic "looks technical" move — consistent with, and now with one real counter-instance supporting, Governing Principle 11's actual claim (signal combinations and motivation, not isolated patterns, are the evidence). See `research/INTERFACE_STUDY_RECORDS.md` for the full record.

## Appendix J — Round 7: Live Empirical Verification

Round 7 was triggered by round 6's own disclosed limitation: its research was real but search-snippet/recalled-grade, because the sandbox at the time had no live network egress, and its closing corpus note named specific products (Stripe, Linear, Vercel, Arc, Notion, Framer) that should be treated as unverified until a session with real access could check them directly. A later round-7 session had that access. This appendix summarizes what changed; full detail, including all ten complete Interface Study Records, is in `research/INTERFACE_STUDY_RECORDS.md`.

**A methodology note worth recording for its own sake:** the network blocker documented in `research/CORPUS_MANIFEST_TEMPLATE.md` turned out to be two separate problems layered on top of each other. The first was the session's actual network tier (resolved simply by running in a Full-access environment — confirmed with a direct `curl -I https://stripe.com` returning a genuine `200`). The second, discovered only after the first was resolved, was an unrelated Chromium/proxy TLS-handshake incompatibility: headless Chromium's requests to real third-party sites were failing with `net::ERR_CONNECTION_RESET` even with working network access, which looks identical to a network-access block from the outside. `curl` through the identical proxy succeeded immediately on the same hosts, isolating the problem to Chromium specifically. Chrome's own `--log-net-log` net-log output showed the failure as an `SSL_HANDSHAKE_ERROR` with `os_error: 104` (ECONNRESET) during the TLS handshake itself, not a certificate-trust rejection. Forcing `--ssl-version-max=tls1.2` on the Chromium launch resolved it completely, with certificate verification left fully enabled throughout (no `--ignore-certificate-errors`, no disabled TLS checking, consistent with this environment's standing instruction never to disable TLS verification). The likely mechanism: current Chromium's TLS 1.3 `ClientHello` is larger than curl/OpenSSL's default (plausibly due to post-quantum hybrid key-share extensions now enabled by default), and the proxy's TLS-terminating layer mishandles it specifically. This is recorded so a future session hitting an apparent network block that survives a basic `curl` check knows to check the browser automation layer specifically, rather than concluding access is unavailable.

**Ten interfaces were rendered, not merely searched or recalled** — via local Playwright/Chromium at 1440px/834px/390px, screenshotted, and inspected with live `getComputedStyle` calls against the real DOM:
- Corpus A (credited, documented professional design): GOV.UK Design System, GitHub Primer, Stripe, Linear, Basecamp.
- Corpus B (disclosed AI-generation provenance): a v0-by-Vercel community template (Color Palette Generator), and two Lovable templates (a home-goods storefront, a habit-tracker SaaS app).
- Corpus C (ambiguous/counterexamples): Varda Space Industries, Craigslist.

**The single most consequential finding, and the reason §8 was edited directly rather than only footnoted here:** round 6's negative-letter-spacing AVOID entry (§8) claimed the -0.01em-to-0.03em range "has become common enough on hero headings to read as a template tell in its own right." Live measurement found this claim does not hold as stated: Stripe's hero H1 measures -0.02em, Linear's -0.022em, Basecamp's -0.0225em, and Varda's -0.03em — four separate, maximally-credited, definitely-human, definitely-not-generic products, spanning payments infrastructure, developer/product tooling, project-management SaaS, and aerospace, each using a different licensed or variable typeface (Söhne, Inter Variable, Graphik, "MT Everyday Sans"). Only the two design-system reference sites in the sample (GOV.UK, Primer) used `letter-spacing: normal`. §8's AVOID entry has been corrected in place at the point of the original claim (not just here) to state the accurate position: the value range is not a reliable standalone signal, and the only real test is whether the choice was checked against the type's actual metrics, which is not visually detectable from the value alone. This is exactly the kind of correction round 6's own closing caveat existed to make possible, and its arrival on the very first re-verification pass is a data point in favor of that caution having been calibrated correctly, not excessively.

**A second finding informs, without fully resolving, round 6's open question about corner-bracket/technical-framing decoration** (logged as ambiguous in `research/TAXONOMY.md` and discussed above in this appendix's round-6 entry): Varda — a real, funded orbital-manufacturing company in the same industry as this document's own fictional Perigee example — uses a dotted grid overlay across its full hero photograph, the same general category of device two blind reviewers flagged as a hollow "sci-fi HUD" cliché when this project used a comparable device on Perigee. The distinction this record offers, not yet independently tested: on Varda, the grid sits on an actual satellite/terrain photograph, giving it a representational connection to real geospatial imagery that the original Perigee instance (a decorative frame around an illustrative, non-photographic diagram) lacked. This is treated as informative rather than dispositive — a skeptical reading (the grid is decorative regardless, and the photograph is a post-hoc justification) cannot be ruled out from the artifact alone, and is itself exactly the kind of plausible-but-possibly-wrong rationale Governing Principle 11 warns about. Full reasoning in `research/INTERFACE_STUDY_RECORDS.md`, Record 9.

**A third finding confirms, rather than corrects, prior work:** every Corpus A record independently reinforced the Realism Audit's content-specificity claim — a dated, specific GOV.UK release note; a real production overflow bug found live on Primer's own marketing page (a word clipped at 1440px width, logged as a reminder that visual imperfection occurs on both AI- and human-made interfaces and is not itself a provenance signal); Stripe's named enterprise customers and dated product terminology; Linear's technically specific embedded bug-report content; Basecamp's plausible file sizes, names, and external-tool links. The three Corpus B records demonstrate that AI-tool output, at least across two current platforms' own showcase galleries, is not visually monolithic: one is a distinctive, internally consistent neo-brutalist utility app; one is a genuinely tasteful, non-generic editorial storefront that would score as a positive example on this document's own rubric if provenance were unknown; one is a clean, textbook Product Swap Test failure in its hero copy. This directly reinforces Governing Principle 11's core claim — that provenance and quality are separate axes — with disclosed-provenance, not assumed-provenance, evidence for the first time in this project's research.

**What this round deliberately did not do:** no wholesale rewrite of the guide's model was undertaken — round 6's Signal-Combination Model, audits, and review requirements are not contradicted by anything found this round, and in several places (the Realism Audit, Governing Principle 11 itself) are directly reinforced. The correction was scoped to the one claim the live evidence actually contradicted (§8's negative-tracking wording) plus one open question it usefully informed (the corner-bracket/technical-framing discussion), rather than treated as license to re-litigate the whole document.

**What remains unresolved:** ten records is still a small sample relative to the breadth of interfaces this guide addresses (no dashboards, no internal tools, no dense data applications were inspected live this round — the Corpus A/B/C candidates chosen leaned toward marketing/landing pages and one utility app). The Varda grid-overlay distinction (representational connection vs. decorative reach) is offered as a testable hypothesis, not a settled rule, and should be checked against further real instances before being treated as reliable. Corpus B was sampled from two platforms' own curated showcase galleries, which round 6 already anticipated is a best-case, not representative, sample of typical AI-tool output — a future round with access to a broader, less curated sample (e.g., a random sample of deployed AI-generated sites rather than a platform's own picks) would be a stronger test of the "AI output is not monolithic" finding than this round's showcase-gallery sample provides.

---

## Appendix K — Round 9: Major Design-Calibration Project (in progress)

> **Superseded in part. Read Appendix L first.** This appendix was accurate when written and four of
> its closing claims are now false: specimen prototyping *has* been executed, practical exercises
> *have* been built under the revised process, `DESIGN_EVALUATION_PROTOCOL.md` and
> `FINAL_CALIBRATION_REPORT.md` *do* exist, and blind critique *has* been run. It is kept unedited
> below as the record of that round's state rather than rewritten to look prescient. Appendix L
> corrects it point by point and carries what the builds since then actually taught.

Round 9 is a substantially larger undertaking than any prior round: a user-specified, multi-week-scale program requiring 75+ researched organizations, 15+ matched professional-vs-AI comparisons, dedicated typography and minimalism research tracks, a machine-readable reference atlas, an audit of this project's own recurring design defaults, a materially rewritten guide (this document), and at least six practical exercises with independent blind critique before any completion claim. This appendix records what has actually landed in this document so far as a direct result of that project, and states plainly what has not yet happened, rather than implying the rewrite is finished because this appendix exists.

**Mandatory starting point, completed:** the round began by fetching and critically reading `github.com/ConardLi/garden-skills`'s `skills/web-design-engineer/SKILL.md` and its referenced files (failure-patterns, design-directions, design-calibration, critique-guide, redesign-protocol, browser-acceptance, style-recipes) under an MIT license, per the explicit instruction not to "install its recipes and conclude design judgment has improved." The critical review is recorded in `PROFESSIONAL_WEB_DESIGN_RESEARCH.md` Part 0; its most load-bearing output for this document specifically is the **No Recipe Without Reason** rule added to §6 below, which generalizes the Garden skill's own recipe-application step into a mandatory justification gate rather than a menu to select from.

**What has been edited into this document so far, each backed by a specific document elsewhere in this repository:**
- **§3** gained two new subsections: a mandatory research-priority-order requirement (user resources > existing product pages > `DESIGN_REFERENCE_ATLAS.md`'s real named references, evidence-tiered > a user-named anchor product > explicitly stating "starting from nothing" when true) and an asset-strategy requirement (a Logo/Product-imagery/UI-screenshots/Color-tokens/Typography recognition-contribution table, a MUST-NOT list against fake placeholder assets, and a hard stop-and-ask rule for a missing logo) — both derived directly from `PROFESSIONAL_WEB_DESIGN_RESEARCH.md` Part 3's finding that matched-comparison gaps were almost always real assets or validated process, never CSS technique.
- **§6** gained a structural-difference requirement for Stage 2's three creative directions (must differ in page architecture/reading path/density/hierarchy/rhythm, not just color/font), a required real-reference-anchor field per direction tied to evidence tiers, and the **No Recipe Without Reason** six-question gate described above.
- **§8** gained a condensed 15-question Typography Decision Framework (full version in `TYPOGRAPHY_RESEARCH.md` Part 6) with an explicit statement that no font name is banned or pre-approved by appearing on any list, and a specimen-prototyping requirement (3+ structurally different typographic directions rendered with real content, not a font-swap of one layout) before an important greenfield typography selection.
- **§19** gained a fourth structured self-critique audit, the **Personal-Defaults Check**, cross-referencing `CLAUDE_DESIGN_DEFAULTS.md` directly — checking not just "is this generic" or "is this product-specific" but "is this a habit this same builder has repeated across unrelated products," which the first three audits cannot catch by construction.
- **Governing Principle 9** gained a paragraph naming, explicitly, that the failure it exists to prevent (same-author review missing what independent review catches) has now recurred three separate times across three structurally different defect types in this project's own history — a shadcn/typography default, a decorative motif, and a data-correctness bug — making it this project's single most-repeated failure rather than a one-time caution.

**What this round has produced outside this document, feeding the edits above and still growing:** `PROFESSIONAL_WEB_DESIGN_RESEARCH.md` (41 of the required 75+ organizations logged, 20 with full live-tier atlas entries, 5 of 15 required matched comparisons, 7 of 10 required counterexamples), `design-reference-atlas.json` and its generated `DESIGN_REFERENCE_ATLAS.md` (20 entries), `TYPOGRAPHY_RESEARCH.md` (~12 of the required 30+ systems, the 15-question framework written but not yet exercised through required specimen prototyping), `MINIMALISM_RESEARCH.md` (10 traditions sourced, including the Cracker Barrel case study cited in Governing Principle 4), and `CLAUDE_DESIGN_DEFAULTS.md` (8 defaults evidenced from this project's own prior builds, 2 explicitly flagged as unconfirmed hypotheses rather than asserted fact).

**What has explicitly not happened yet, stated the same way every prior appendix in this document has stated its own gaps:** the organization count, matched-comparison count, and typography-system count are all still short of the brief's required minimums. No specimen-prototyping exercise (§8's new requirement) has actually been executed yet — the requirement exists in this document before the process that would validate it has been run once, which is a real ordering risk worth naming rather than hiding: a requirement that has never been exercised by its own authors may still contain an impractical or missing step that only surfaces on first real use. None of the required six practical exercises (a minimal small-business site, a dense professional application, an editorial/cultural site, an expressive marketing site, an e-commerce/product-detail experience, and a developer/technical product, one of them in four structurally distinct variants) has been built under this revised process yet, so the Personal-Defaults Check and the No Recipe Without Reason gate above are both still unexercised against real new work — they have only been written, not yet tested against a build the way `CLAUDE_DESIGN_DEFAULTS.md`'s existing entries were tested against Mission Control. No independent blind critique or typography blind test has been run this round. `DESIGN_EVALUATION_PROTOCOL.md` and `FINAL_CALIBRATION_REPORT.md`, both required deliverables, do not exist yet. This document's rewrite itself is not finished: §16 (Component-Library De-Defaulting), the Distinctiveness Rubric's relationship to the new Personal-Defaults Check, and further narrowing of guidance the calibration brief specifically flagged has been partially checked: §16 (Component-Library De-Defaulting) and §21 (Scoring Rubric) were re-read against the brief's stated concerns this round — §21 already gates dimension 3 to Low whenever no blind review occurred and already requires qualitative evidence before any score is assigned (lines under "Score caps," above), which substantially covers the brief's "rewards plausible rationale" and "numerical scoring without perceptual evidence" concerns without further edits being needed; §16 was found to be correctly scoped to component-library defaults specifically rather than brand assets, so the asset-strategy gap identified by the brief belonged in §3 (already added) rather than §16. This is a real check, not a placeholder — but it means confidence in §16/§21 rests on one reviewer's read against the brief's text, not on independent or blind confirmation, which is the same caveat this document applies to every other unverified self-assessment. Per this document's own Governing Principle 10, none of the above should be read as more complete than it actually is merely because this appendix describes it in finished-sounding prose — the honest state is: real, checkable progress, on a project whose own completion gates are still mostly open.

## Appendix L — Rounds 10 and 11: what five builds actually taught

Appendix K described a round in which the guide had been rewritten but not yet exercised. It closed
by naming the risk in that ordering: *"a requirement that has never been exercised by its own authors
may still contain an impractical or missing step that only surfaces on first real use."* Five builds
have since been made under the revised process — three in `examples/`, two in
`practical-exercises-round-two/` — and all of them have now been through independent blind review.
This appendix records what that produced.

### Correcting Appendix K

Four of its closing claims are false as of this appendix, and are corrected here rather than edited
out of it:

| Appendix K said | Actually |
|---|---|
| "No specimen-prototyping exercise has actually been executed yet" | Executed twice, on Firn and on Bellman's Mill. Both times it changed the answer. |
| "None of the required six practical exercises has been built under this revised process" | Five builds exist. |
| "`DESIGN_EVALUATION_PROTOCOL.md` and `FINAL_CALIBRATION_REPORT.md` … do not exist yet" | Both exist and are committed. |
| "No independent blind critique … has been run this round" | Run twice: `BLIND_REVIEW_ROUND_10.md` and `practical-exercises-round-two/ROUND_TWO_BLIND_REVIEW.md`. |

### L1. The specification layer and the habit layer — the round's most useful finding

Two builds were made under a diversity matrix constraining category, user, task, density, energy,
design tradition, typeface, layout model, assets, colour behaviour, motion, device and ground. They
share no typeface, no ground value, no page architecture and no register. A reviewer given both, and
asked only whether the same person made them, answered **"certainly the same. Not 'probably.'"**

Their explanation is the transferable part:

> Every difference lives at the **specification layer** — typeface, ground value, display weight,
> whether there is a form. Those are "exactly the knobs anyone would turn first if they were *trying*
> to make two sites look unrelated. They are cheap to vary and they prove nothing." Every similarity
> lives at the **habit layer**.

The habit layer, as found and then confirmed by measurement: caption grammar down to which clause is
bolded; the middot as universal separator; the spaced em dash; exactly two rule weights with fixed
semantics; one accent plus one error colour; a filled hard-edged square used as both identity chip
and data mark; a categorical refusal of radius and shadow; negative tracking on display paired with
positive tracking on labels; surfaces always lighter than the ground, never elevated; an accent-
coloured square focus ring; and two footers that were **one paragraph retyped with two nouns
changed**.

**The rule this produces.** A variation plan that lists typeface, colour and layout is a
specification-layer plan and will not produce different-looking work. Before starting a second
project in a series, write down the ten smallest things the first one did without being asked —
punctuation, caption structure, rule weights, label case, focus treatment, footer boilerplate — and
treat that list as the thing to vary. Everything on it was invisible to its own author.

### L2. Rendering finds a defect class that reading cannot

Every build in these two rounds shipped defects that were invisible in source and obvious on screen.
They fall into repeatable classes, and the classes are the useful output:

1. **CSS written for markup that was never produced.** Firn's stylesheet implemented a mobile
   fallback against `.rail-mark` elements the page has never rendered; Bellman's implemented a lead
   plate and a paired comparison the HTML never marked up. Both were described in prose as working.
   **Check that every selector in a responsive block matches something the page actually emits.**
2. **A figure generated one unit off.** Every room in a building section was positioned from its
   floor level *downwards* instead of upwards, so two rooms overdrew a third out of existence.
3. **Label collisions in generated graphics** — found on a rail, fixed, and then not checked on the
   two figures beside it on the same page. **A collision test belongs in the harness, not in
   attention.**
4. **A comparison set with mismatched shapes.** Two photographs of the same pond in different seasons,
   one portrait and one landscape, presented side by side: the taller frame reads as the more
   important one and the comparison collapses. **Anything presented as a set gets one shape.**
5. **Narrow but not overflowing.** A table caption rendered 72px wide and 440px tall — one word per
   line — and produced no console error and no horizontal overflow, so the harness passed it.
6. **CSS beating a JS presentation attribute**, rendering numerals dark-on-dark.
7. **A figure legible at 1440 and illegible at 390.** Scaling a 620px-wide drawing into a phone
   renders its labels at about 6px. Two compositions, not one that scales.
8. **Prose composed from data fragments.** Table cells are noun phrases; dropped into a sentence they
   produce "in July the wheel usually stopped." Generated prose needs its own wording, tested across
   every value.
9. **`:focus-within` on date inputs.** Chromium focuses a segment inside the shadow tree, so the host
   matches neither `:focus` nor `:focus-visible` and a keyboard user sees no ring at all.
10. **Attribution as the least-readable text on the page.** Photograph credits sat at 2.91:1. A
    licence obligation is not decoration and does not get faded out.

### L3. The specimen test survives first use, with one addition

§8's requirement worked both times it was run, and both times it changed the outcome — which is the
only evidence that matters for a process step. What §8 does not say, and should:

**The best-looking direction is frequently the wrong one, and the reason to reject it is usually
register or role rather than legibility.** Firn rejected a single-family italic display that was the
most beautiful of its three because it assigned a literary voice to a subject that is measurement.
Bellman's rejected a reading-serif-plus-grotesque pairing that was the most comfortable of its three
because it made the page sound like a magazine writing *about* the mill rather than the people who
run it — and because it repeated the previous exercise's recipe.

**A colour equivalent of the specimen test is missing from §9 and should exist.** Bellman's ground was
pre-committed in writing as "dark, sampled from the photographs." Rendering three grounds under the
real images killed it in one look: bright daylight photographs of a white building become isolated
rectangles on a dark ground and the interiors lose their shadow detail. A written colour decision that
has not been rendered against the real assets is a guess.

### L4. Blind review, twice more, and what it costs to run badly

Governing Principle 9 is upheld again: across two rounds, **the most serious defect in every single
build was one the builder did not predict.** Round 10: a headline excluding unknowns, a caption its
own chart contradicted, a grid misaligned with its own cloth. Round 11: a mobile fallback that never
existed, a caption describing a different chart, and an enquiry form pre-filled across a night its own
availability strip showed as taken.

Two capture rules, both learned by breaking them:

- **Round 10:** drive the real controls. A script calling `loadDraft()` directly produced a tab/content
  desync that did not exist, and a reviewer reported it in good faith with evidence.
- **Round 11:** *and scroll the whole page before capturing.* A script that obeyed the round-10 rule
  perfectly still manufactured two "missing image" defects, because `loading="lazy"` images below the
  fold are never requested by a `fullPage` screenshot. Lazy loading is user behaviour too.

**And record refutations.** Of the findings in round 11, two were refuted by measurement (a marker
reported as frozen does move; a footer reported as misaligned is not) and two were the harness's
fault. Acting on all of them would have introduced defects to fix imaginary ones.

### L5. Two defaults closed, two open, one new

Measured across the five builds, against `CLAUDE_DESIGN_DEFAULTS.md`:

- **Default 5 (rounded-card tiles) is closed.** `border-radius` declarations per stylesheet:
  Mission Control 11, then 3, 3, 3, 0, 1.
- **Default 2 (performative comments citing the guide) is closed.** Zero occurrences of `§`,
  "Governing Principle" or the banned phrasings across all round-two source files.
- **Default 6 (uppercase micro-labels) is not closed and the evidence is stronger than recorded.**
  Present in **5 of 5** builds — 7, 5, 8, 6 and 4 instances — including two briefed to be maximally
  unlike each other.
- **Default 1 (rationale-driven self-assessment) recurred in its purest form.** A README described a
  responsive behaviour that had never been implemented, and the author repeated the claim in
  conversation. The rationale was fluent, coherent, and describing dead code.
- **New: a private spacing generator.** Firn's scale is 6/12/18/30/48/78/126; Bellman's is
  6/12/20/32/52/84/136. Different numbers, both starting at 6px, both Fibonacci-additive. Each was
  derived separately and each was believed to come from its own product. Default 3 was recorded as
  "I copy the guide's example scale"; the real habit is that **changing the output does not change
  the generator.**

### What has still not happened

No human reviewer and no domain practitioner has seen any of the five builds; every blind review so
far has been an AI agent in a fresh context, which is reliable for structure and arithmetic and weak
on taste. No screen-reader pass anywhere. Ten of the round's twelve exercises are unbuilt. The
round-two evaluation set — comparative review, scoring, regression report, fingerprint audit, final
ranking — does not exist yet. And the specification/habit-layer finding in L1 has been diagnosed but
not yet acted on: the diversity matrix still constrains only the specification layer.
