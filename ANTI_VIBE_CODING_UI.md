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

These take precedence over every rule below them. When a lower-level rule in this document seems to conflict with these, follow these. Each is numbered below because later sections cite it by number ("Governing Principle 7," etc.) — those citations always refer to the numbered list in this paragraph (1 through 9), never to the priority tiers immediately below, which are deliberately labeled with letters instead of numbers to avoid confusion between the two lists.

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

An AI self-review is heuristic evaluation, not user validation, and MUST NOT be described as proof that an interface is usable — this applies to an agent evaluating its own UI work, and equally to an agent evaluating this document itself (see Appendix F). When you lack user research, analytics, or product evidence, say so explicitly: state the assumption, why it matters, and what would confirm or disprove it. Never invent user quotes, personas, analytics figures, or research findings to make a design decision sound validated.

**4. Diagnostic signals, not style bans.** Cards, gradients, big headings, centered layouts, dark themes, outline icons, shadows, animation, and rounded corners are not defects by themselves. They become signals of a "vibe coded" result when they are unjustified by the product, used at high frequency, applied indiscriminately, competing visually with the primary task, inherited untouched from a library default, combined into a generic template shape, inconsistent with the rest of the interface, or added without a stated usability/communication/brand purpose. Every pattern entry in §4 explains both the misuse and the legitimate use — this document does not ask you to design conservatively, it asks you to design *on purpose*.

**5. Required product evidence brief.** Before recommending significant visual or structural decisions, record what you actually know versus assume: confirmed user needs vs. assumed ones, available research/analytics, primary tasks and their frequency/urgency, user expertise, data/content characteristics, failure consequences, accessibility considerations, brand and technical constraints, existing product conventions, and open unknowns needing validation. §3's product-brief template is this principle in operational form — fill it out before substantial styling begins. If you identify reference interfaces for inspiration, name the exact attribute you're studying from each (density, table behavior, navigation, onboarding structure) rather than importing an entire visual style because the reference is well-regarded.

**6. Observable acceptance criteria.** Every major rule in this file is written so it can be checked by one of: a direct inspection question, an automated test, a manual test, a screenshot comparison, a measurable performance condition, or a documented rationale. If you find yourself justifying a decision with "looks professional," "feels premium," "feels modern," or "has good vibes," stop and restate it as an observable condition (see §2 and §19 for the technique).

**7. Must-pass completion gates.** A numeric score (§20) never overrides §22's gate list. Gates fail the work regardless of how high anything else scores.

**8. Performance and perceived quality.** Performance is part of UI quality, evaluated alongside everything else in this document, not filed separately as a backend concern. See §14 for the full standard (loading, responsiveness, visual stability, large-collection handling, optimistic updates, duplicate-submission prevention) and Core Web Vitals as a starting measurement.

**9. Independent review.** A self-review by the same agent that built the UI is a weaker check than review by an independent context (a fresh agent session, a different reviewer, or a human) — not because the builder is careless, but structurally: the agent that made a choice is the least likely to notice its own unexamined default. Where an independent reviewer is genuinely unavailable, self-review is still better than none, but MUST be labeled as self-assessed rather than presented with the same confidence as an independently-confirmed result (see §22's note on self-graded confidence). "Where feasible" is not an excuse to skip this by default whenever an independent reviewer is *technically* obtainable (a second agent invocation, a colleague, the user) — reach for one before settling for self-review on any work you intend to call Strong or better.

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

A screen can have consistent spacing, a restrained palette, and smooth animation and still be vibe coded — if the hierarchy doesn't reflect what the user is actually trying to do, if the dashboard shows metrics nobody will act on, or if the copy could be pasted into any other product unchanged. Polish is necessary but not sufficient. The deeper requirement is that the visible structure of the interface has to trace back to a real understanding of the product (§3) and get inspected in its rendered form against real content (§17–18), not just described in code.

### How future agents should use this file

1. Read §0–§3 before writing any UI code for a new product or feature area.
2. Consult §4 (pattern catalog) while composing screens, and §5–§15 while making specific typography/color/component/motion/library decisions.
3. Follow the staged workflow in §16 for any non-trivial UI task.
4. Run the self-critique loop in §18 and the fast diagnostics in §19 before considering work done.
5. Use §20–§22 to decide whether the work is actually complete, and §23–§24 as fast-reference checklists and a fill-in template for recording a review.

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

This is the test you re-run throughout §16 and §18. Treat it as the single most reusable rule in this document.

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
- Content and data types (their real shape — see §10):
- User expertise (novice, occasional, expert/power user):
- Device/context of use (desktop-at-work, phone-on-the-go, split):
- Accessibility needs specific to this audience, if known:
- Brand constraints (existing identity, palette, voice, none):
- Existing design patterns already in the codebase (see Stage 1 in §16):
- Technical constraints (framework, component library already in use, performance budget):
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
| Content-heavy site | Low UI density, high reading comfort | Rare, only for progressive disclosure | Restrained, in service of legibility | Optimized for "look" over reading comfort (see §7) |
| Data-heavy dashboard | High, but organized by decision, not by "everything available" | None except loading/update feedback | Reserved for meaning (thresholds, alerts), not decoration | Decorative charts and metric cards with no decision attached (see §4) |

None of these are rigid — they are starting points to reason from, not rules to apply blindly. If your product brief indicates otherwise, follow the brief.

---

## 4. Common Vibe-Coded Failure Patterns

For each pattern: what it looks like, why AI agents produce it, why it harms the result, how to detect it, how to correct it, and legitimate exceptions. Frequency, combination, and lack of justification are what make a pattern a problem — not the pattern's mere existence (Governing Principle 4).

Note on this catalog's own structure: every entry below deliberately uses the same six-field template regardless of how severe the underlying pattern is — this is intentional for a reference catalog meant to be scanned and searched (§0's Observable Acceptance Criteria), not an instance of §4.1's "identical section rhythm" problem, which is about a *designed page* signaling no priority decisions were made. A reference catalog is expected to be uniform; a shipped product's page is not. Severity is handled separately, per actual instance found in a real UI, by §21's framework — not by how long or short a catalog entry reads here.

### 4.1 Layout & Structure Patterns

**Excessive cards**
- *Looks like:* Every piece of content, no matter how small, wrapped in its own bordered/shadowed rounded box.
- *Why agents do it:* Cards are a "safe," self-contained unit that composes easily without deciding how things relate to each other.
- *Harm:* Every card visually competes at the same weight; there is no hierarchy, just a grid of boxes ("wallpaper").
- *Detect:* Count distinct bordered/shadowed containers in one viewport (see the Card Count Test, §19). More than ~4–6 competing at equal visual weight in a single view is a signal.
- *Fix:* Apply the Card Necessity Test (§6) before wrapping anything in a card; prefer plain document flow, dividers, or spacing for groups that don't need a container.
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
- *Detect:* The Radius Test (§19): do unrelated element types share the exact same rounding for no functional reason?
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
- *Fix:* Use full-width or sidebar+content shells for application screens (§6); reserve centered narrow columns for marketing/reading contexts.
- *Exception:* Settings pages, single-record detail views, and forms often benefit from a constrained reading width even inside an app shell. **This exception is common enough that it's worth checking explicitly before flagging a constrained-width screen as an instance of this pattern** — a narrow settings page is very likely the legitimate case, not the failure; the failure case is specifically a table, dashboard, or multi-panel workflow screen sitting in a narrow centered column it doesn't need (see §6's page-shell guidance for the full breakdown).

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
- *Detect:* The Product Swap Test (§19): could this section be relabeled for an unrelated product without changing anything but text?
- *Fix:* Replace generic icon+heading+paragraph blocks with the product's real screenshots, real output, or real workflow; vary tile size by feature importance (a "bento" layout of unequal tiles is one legitimate alternative, not the only one); lead with the user's problem before the feature list.
- *Exception:* A three-column layout is fine when the three items are genuinely parallel and equally weighted (e.g., three pricing tiers).

### 4.2 Color & Surface Patterns

**Gratuitous gradients / purple-blue-pink defaults**
- *Looks like:* Backgrounds, buttons, and headline text all rendered with a blue-to-purple (or purple-to-pink) gradient with no connection to brand or content.
- *Why:* Documented training-data bias: indigo/purple-heavy component-library defaults (a widely cited example: Tailwind UI's early defaults leaned heavily on `indigo-500`) are overrepresented in the design examples models learned from, so gradient-indigo reads as the statistically "safe, modern-looking" choice.
- *Harm:* Signals "generic AI-generated" specifically because it's so recognizable; competes with real accent/status color if one exists.
- *Detect:* Apply the Gradient Justification Test, defined once in §8 and reused throughout this document — don't restate its wording here, just run it.
- *Fix:* Pick an accent tied to the brand or domain (or none at all); if a gradient is used, restrict it to one clearly bounded decorative area (e.g., a hero background) and never let it also carry semantic meaning.
- *Exception:* A product whose brand identity is genuinely built around a gradient (documented, chosen on purpose, applied consistently) is not making this mistake — the tell is *unexamined default use*, not gradients per se.

**Glow effects without purpose**
- *Looks like:* Soft colored blur/glow behind buttons, cards, or headlines with no state meaning.
- *Why:* Visually striking in isolation, copied from dark-themed template screenshots.
- *Harm:* Adds visual noise without communicating anything; on light backgrounds especially, reads as decoration for its own sake.
- *Fix:* Reserve glow/emphasis effects (if used at all) for an actual state signal (e.g., "this is currently processing," "this just changed") rather than permanent decoration.
- *Exception:* A focus ring is a legitimate, purposeful "glow" — it communicates keyboard focus and MUST remain visible (§12).

**Glassmorphism used indiscriminately**
- *Looks like:* Frosted-glass translucency and background blur applied broadly across cards, navigation, and panels.
- *Why:* Visually novel, appears frequently in current UI trend content.
- *Harm:* Nielsen Norman Group's review notes glassmorphism reduces text legibility against the busy content typically behind it, and independent accessibility analysis flags it as a specific problem for low-vision, dyslexic readers and inconsistent contrast across differing backgrounds. It is also a trend-cycle style disconnected from most products' actual needs.
- *Fix:* If used, apply narrowly (a single navigation bar or a "pinned" surface, not every panel), verify contrast against every actual background it will sit on (not just the mockup background), and never place body text needing AA contrast directly on a blurred/translucent surface without checking.
- *Exception:* Deliberate, brand-driven use, tested for contrast in every real context it appears — e.g. a media/creative app using an "always over content" translucent toolbar.

**Purple/blue gradient + pure-black neon dark mode**
- *Looks like:* Automatic "dark mode" that is just the light theme's colors on a `#000000` background with unchanged saturated accent colors.
- *Why:* Simplest possible implementation of "add dark mode" — invert lightness, leave everything else.
- *Harm:* Pure black creates a harsh halation/"blooming" effect against bright text and saturated accents, and looks amateurish/harsh rather than deliberately dark. See §8 for the correct approach (elevation via lightness steps, not shadows).
- *Detect:* Is the dark background literally `#000`? Are accent colors identical hex values to the light theme, just as bright?
- *Fix:* Design dark surfaces as their own scale (near-black, not pure black, e.g., Material's documented ~`#121212` base), desaturate accents slightly, and re-derive elevation via lightness steps rather than shadow (§8).
- *Exception:* True pure black is legitimate for OLED-optimized, content-first surfaces (video/photo viewers) where maximum contrast against media is the goal, and for developer terminals where users expect it.

**Too many surface colors / no clear elevation system**
- *Looks like:* Every panel, card, sidebar, and section uses a visibly different background color/tint with no logic connecting them.
- *Why:* Each component styled independently rather than against a shared token set.
- *Harm:* Surface color stops communicating "this is more/less elevated/prominent"; the eye can't use color to understand structure.
- *Fix:* Define a small ordered surface scale (page background → primary surface → elevated surface, §5) and only introduce a new tint when it encodes a real distinction.

**Unnecessary dark mode**
- *Looks like:* A dark theme built because it's expected, without checking whether it serves this product's users or use case.
- *Why:* Assumed baseline feature.
- *Harm:* Doubles the design and QA surface (every screen, every state, every contrast pair) for a feature with no established need; frequently done badly under time pressure, producing the "pure black + neon" pattern above.
- *Fix:* Confirm the product actually needs it (brand requirement, accessibility requirement, user context like low-light/technical audience) before committing to building and maintaining it properly, or postpone it rather than shipping a half-designed version.
- *Exception:* Developer tools, media apps, and anything used for long sessions in variable lighting have a strong, well-evidenced case for dark mode.

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
- *Fix:* Test with the realistic data variants in §10 before calling any screen done.

**Fake testimonials, invented customer logos, unsupported statistics**
- *Looks like:* "Trusted by 10,000+ teams," a row of recognizable company logos never actually confirmed as customers, quotes attributed to generic names/titles.
- *Why:* Trained heavily on marketing pages that include social proof sections; the AI fills the slot with plausible-sounding content.
- *Harm:* This is a factual/ethical problem, not just a stylistic one — presenting invented claims as real is misrepresentation, and Governing Principle 7 treats "fabricated claims presented as fact" as an automatic completion blocker, not merely a style flaw. It is also usually recognized by users as generic decoration rather than genuine proof (practitioner critiques flag boilerplate testimonials like "Great tool, saved us a lot of time!" as adding zero credibility).
- *Fix:* Use only real customer/testimonial/logo content the team has supplied and cleared; otherwise omit the section entirely or replace it with something true (a concrete before/after, a real product screenshot, an honest "new product" framing) rather than a fabricated placeholder.
- *Exception:* None for presenting fabricated claims as real. Clearly labeled placeholder content in an unfinished/internal build (e.g., `[CUSTOMER LOGO PLACEHOLDER]`) is acceptable *only* if it cannot be mistaken for real content and is not what ships.

**Meaningless badges / decorative status indicators**
- *Looks like:* "New," "Pro," "Beta," colored dots, or icon badges applied for visual interest rather than to communicate an actual state.
- *Why:* Badges are a cheap way to add visual variety to an otherwise uniform list.
- *Fix:* A badge MUST correspond to a real, current state of the underlying data (see Components, §9); if the state isn't real, remove the badge.

### 4.4 Typography, Icons & Copy Patterns

**Oversized marketing headlines used for drama, excessive centered text**
- *Looks like:* Every heading rendered at maximum type-scale size and centered, regardless of whether the content underneath is a hero statement or a routine section label.
- *Why:* Large centered type reads as "confident design" in isolation.
- *Harm:* When applied everywhere, nothing is actually emphasized; oversized type on application screens wastes vertical space users need for their task.
- *Fix:* Reserve maximum type sizes for the one or two most important statements per page (§7); left-align body/application content by default, reserve centering for short, standalone marketing statements.

**Excessive use of outline icon sets, icons where text is clearer, emoji as product icons, inconsistent icon metaphors**
- *Looks like:* An icon in front of every label "for visual interest"; the same generic outline icon library (frequently a Lucide/Heroicons-style set, because of its ubiquity in AI-assisted templates) applied everywhere without variation; emoji standing in for a product's icon system; icons whose metaphor doesn't clearly map to their action (e.g., an unrelated icon reused for two different actions).
- *Why:* These libraries are the default bundled with popular starter kits and are heavily represented in AI training data, so they get reached for automatically.
- *Harm:* Icon-heavy interfaces with a generic outline set are specifically named in independent critiques as a visual "tell" of a templated build; icons used where a short label would be clearer add ambiguity and localization cost for no benefit; emoji icons don't scale, aren't consistent across platforms/renderers, and read as placeholder rather than considered.
- *Detect:* Could the icon be removed and replaced by nothing, with no loss of clarity? Is there a text label anywhere near an icon-only control (required — see §9, §12)?
- *Fix:* Use icons only where they add real recognition speed (well-established metaphors: trash, search, close) or save critical space (dense toolbars); always accompany icon-only controls with an accessible name and, where space allows, a visible label; keep one consistent icon set and stroke weight across the product; AVOID reaching for emoji as a default substitute for a real icon system (§4 detects this as unconsidered/placeholder).
- *Exception:* Emoji are legitimate as user-authored content (a reaction, a status someone typed). They are also a legitimate, deliberate design choice for product-authored iconography in specific contexts — e.g., page/document icons or status indicators in products like Notion or Slack — when chosen consistently as part of the actual icon system (able to answer §2's justification questions) rather than dropped in ad hoc as a quick placeholder. The distinction is unexamined default vs. deliberate system, the same distinction this whole document applies to gradients, cards, and radii.

**Gradient text on headings, arbitrary letter-spacing, monospace used only to look "technical"**
- *Looks like:* Every major heading rendered with a gradient fill; letter-spacing values with no relationship to the type scale; code-style monospace font on non-code content to imply sophistication.
- *Why:* Visually novel, appears in trend-heavy templates.
- *Fix:* Reserve gradient text for a genuinely bounded, brand-driven use (at most one per page); derive letter-spacing from the type scale, not per-element guesswork; reserve monospace for genuinely technical content (code, IDs, hashes, tabular numbers where alignment matters).

**Copy that sounds like generic AI marketing language**
- *Looks like:* Headlines and CTAs built from a small, recognizable vocabulary: "seamless," "powerful," "revolutionize," "elevate," "unlock," "supercharge," "empower," "cutting-edge," "game-changing," "streamline," alongside generic CTAs like "Get Started" or "Learn More" with no stated outcome.
- *Why:* This is the statistically dominant vocabulary of marketing copy the model was trained on; content analyses of AI-generated writing repeatedly flag the same handful of words as tells.
- *Harm:* Fails the Copy Swap Test (§19) — text this generic could be pasted into almost any other product's page unchanged, so it communicates nothing about *this* product.
- *Fix:* Replace adjectives with the specific outcome the feature produces for the specific user (§10); replace "Get Started" with what starting actually does ("Start free trial," "Create your first project," "Import your data"); write from the product brief (§3), not from a generic template voice.

### 4.5 Motion & Interaction Patterns

**Gratuitous animation; everything fades/slides into view; excessive hover movement; overanimated buttons**
- *Looks like:* Every section fades or slides in on scroll; every hover state includes a scale/translate/shadow change; buttons have bounce, glow-pulse, or ripple effects with no functional reason.
- *Why:* Individually, each animation is easy to add (one utility class) and looks polished in isolation.
- *Harm:* In combination, constant motion competes for attention with content and communicates nothing (see the Motion Standard, §13); it also has real costs for vestibular-disorder users if `prefers-reduced-motion` isn't respected.
- *Fix:* Apply the animation-purpose test in §13 to every motion effect; remove any that fail it; always implement a `prefers-reduced-motion` fallback.
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
- *Harm:* A developer familiar with the library recognizes it immediately (the Default Library Test, §19); this is a specific, repeatedly cited driver of AI-generated interfaces looking interchangeable.
- *Fix:* See §15 for the full de-defaulting checklist. Changing only the accent color does not constitute customization.

**Inconsistent spacing / arbitrary one-off CSS values**
- *Looks like:* Padding/margin values that don't reuse a shared scale (`13px` here, `18px` there, `22px` somewhere else) with no relationship between them.
- *Why:* Each element styled in isolation without checking existing tokens.
- *Harm:* Produces a subtly "off" feeling even when no single value is wrong; makes future changes error-prone.
- *Fix:* Establish and reuse a spacing scale (§5); treat a new arbitrary value as a signal to either reuse an existing token or deliberately extend the scale, not to freelance.

**Mobile layouts created only by stacking; desktop navigation squeezed into mobile**
- *Looks like:* Responsive behavior implemented purely as "everything becomes one column"; a desktop mega-menu or wide toolbar shrunk to fit rather than redesigned for the viewport.
- *Harm:* Stacking alone does not address reading order, action priority, or control discoverability — see the full Responsive Design Standard, §11.
- *Fix:* Apply the response-strategy hierarchy in §11, testing intermediate widths, not just phone/desktop extremes.

**Truncated content without a recovery mechanism; empty states that are only an illustration; error states that don't explain recovery; low-contrast gray text; missing focus styles; placeholder text used as a label**
- *Harm:* Each of these is a specific, testable failure covered in detail in §9 (Components), §10 (Content), and §12 (Accessibility). They are grouped here because they share a root cause: implementing the "happy path" appearance of a state without implementing what the state actually needs to do for the user.
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
| Type scale | 5–8 sizes with a defined ratio | A consistent ratio (musical-scale-like, e.g., 1.125–1.5×) keeps steps systematic without being mechanically obvious — see §7. |
| Font weights | 2–3 in use per surface | More than 3 in one interface usually signals no real hierarchy decision was made. |
| Line heights | Tied to text role (heading vs. body vs. dense UI) | Body text needs more line-height than a tight UI label. |
| Color roles | See §8's role table | Roles, not raw hex values, are what components should reference. |
| Surface hierarchy | 3–5 ordered levels | Page background → surface → elevated surface (→ overlay) is the common shape. |
| Border colors | 1–2 (default, strong/emphasis) | |
| Border widths | 1–2 | |
| Radius scale | 2–4 steps tied to element role | Not one global radius applied everywhere (§4). |
| Shadow scale | 2–4 steps tied to elevation | Shadows should map to a real elevation level, not be picked per-component. |
| Control heights | 2–4 (e.g., compact/default/large) | Consistent control height is one of the fastest ways to look "built," not assembled. |
| Content widths | A small set of max-widths for reading vs. dense content | |
| Breakpoints | Tied to layout failure points, not device marketing names (§11) | |
| Motion durations | 2–3 (fast/default/slow) | See §13. |
| Motion easing | 1–2 curves | |
| Layering/z-index | A small ordered scale (base, dropdown, sticky, overlay, modal, toast) | Prevents ad hoc `z-index: 9999` fights. |
| Focus indicators | One consistent, high-contrast treatment | MUST be visible and not obscured (WCAG 2.2 AA); SHOULD also meet the more specific Focus Appearance size/contrast thresholds, which are an AAA-level criterion, not an AA one (§12). |

SHOULD NOT build an elaborate, fully abstracted multi-tier token pipeline (primitive → semantic → component tokens, with tooling) for a small project — that is appropriate for a multi-team, multi-product design system, not a single app. Scale the *formality* of the system to the project: a small project can express this list as a short set of CSS custom properties or Tailwind theme config; a large multi-surface product benefits from a formal primitive/semantic/component token architecture, the way Carbon and Material do it. What must not vary by project size is the *discipline* of reusing tokens instead of one-off values (§4's "arbitrary CSS values" pattern).

### Controlled variety

Distinguish five related but different things:

- **Consistency** — the same kind of thing looks and behaves the same way everywhere. Required.
- **Repetition** — the same visual treatment recurring because the content is genuinely parallel (e.g., every row in a table). Fine when the content really is parallel.
- **Monotony** — the same visual treatment recurring even though the content's importance or purpose differs (§4's "identical section rhythm"). A defect.
- **Hierarchy** — visual weight varying *because* importance varies. The goal.
- **Deliberate exception** — a rule broken on purpose, in a specific place, for a stated reason (an EXCEPTION per this file's convention).

MUST let visual variation follow content importance, page purpose, or interaction state. AVOID variation that follows nothing but "this looked like it needed something different" — that is the arbitrariness this whole document is trying to prevent.

---

## 6. Layout and Spacing Rules

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
- **Content widths** — SHOULD constrain body text and forms to a comfortable reading/scanning width (see §7 for the line-length rule); SHOULD let tables, canvases, and dashboards use available width instead of forcing them into a narrow centered column.
- **Sidebars** — MUST remain usable (collapsible or off-canvas, not simply hidden) at narrower viewports (§11); avoid a sidebar wide enough to starve the primary content on common laptop widths.
- **Toolbars** — MUST define what happens when controls don't fit: wrap, collapse into an overflow menu, or reduce to icon-only with accessible names — decided deliberately, not left to overflow off-screen.
- **Forms** — SHOULD group related fields with proximity before adding a border; SHOULD generally use a single column for sequential data entry (faster completion, clearer order) unless fields are genuinely parallel (e.g., city/state/zip).
- **Tables** — MUST have a considered strategy for narrow viewports (horizontal scroll within a bounded region, column priority/hiding, or a card-per-row transform) rather than an uncontained overflow; see §11.
- **Detail views** — SHOULD separate primary identifying information from secondary metadata visually (position, size, weight), not list every field with equal weight.
- **Settings screens** — SHOULD group by the user's mental model of what changes together, not by backend data structure; a constrained content width usually aids scanning here.
- **Dashboards** — MUST apply the metric-value test in §4 to every tile/chart before including it; order by decision importance, not by data availability.
- **Marketing pages** — MAY use more generous spacing and centered composition than application screens, because the task here (persuade/inform) differs from the task in an app (get work done) — but still MUST vary section rhythm by content importance (§4). A marketing page with a flawless visual layout but no page title, meta description, or Open Graph/social-preview metadata is just as unfinished as one with a broken mobile layout — MUST set accurate per-page `<title>`/meta description/canonical URL and social-preview tags for any public marketing route; this is a visible-quality gap the moment the page is shared or found via search, even though it's invisible in a screenshot.
- **Empty states** — MUST include: why it's empty, and what to do next (§10), not decoration alone.
- **Authentication pages** — SHOULD be minimal and focused (one primary action), consistent with the rest of the product's visual system, not a separate unthemed template.
- **Dialogs** — MUST size to content, not to a fixed arbitrary width that clips or leaves excess empty space; MUST manage focus on open/close (§12).
- **Responsive grids** — MUST be tested at the breakpoints and intermediate widths defined by where the *specific* layout breaks (§11), not only common device widths.

---

## 7. Typography Rules

MUST limit a single interface to 1–2 typeface families (e.g., one for UI/body, optionally one distinct one reserved for code/data) unless the brand explicitly requires more. MUST derive sizes from one systematic type scale (a fixed ratio or an explicit set of steps, §5), not ad hoc per-element sizing.

| Rule | Guidance | Category |
|---|---|---|
| Number of families | 1, or 2 if one is reserved for code/monospace | Widely accepted default |
| Number of weights in active use | 2–3 per surface (e.g., regular, medium, semibold) | Widely accepted default |
| Body line length | ~45–75 characters per line for reading-oriented text | Widely accepted default (typographic convention, not a hard spec) |
| Body line height | Looser for reading text (≈1.4–1.6×), tighter for dense UI labels/tables (≈1.2–1.3×) | Context-dependent heuristic |
| Paragraph width | Constrained to the line-length range above; MUST NOT let body copy stretch edge-to-edge on wide viewports | Widely accepted default |
| Heading sizes | Reserve the largest 1–2 steps of the scale for the single most important statement per page/screen | Central Principle application |
| Labels/captions | Smallest step of the scale, MUST still meet contrast requirements (§12) — "smaller" is not an excuse to also go low-contrast | Standard-backed (contrast) + heuristic (size) |
| Alignment | Left-align body and application content by default; reserve center alignment for short, standalone statements (headlines, empty states, dialogs) | Widely accepted default |
| Numeric data | Use tabular/monospaced figures in tables and anywhere numbers must align vertically for comparison | Widely accepted default |
| Code/monospace | Reserve for actual code, IDs, hashes — not for prose meant to look "technical" (§4) | Central Principle application |
| Responsive type | Scale down heading sizes at narrow viewports rather than keeping desktop sizes and causing wrap/overflow | Widely accepted default |
| Marketing vs. application type | Marketing pages can use more dramatic scale jumps and looser tracking for impact; application interfaces should favor restraint and legibility over drama, since users read them repeatedly, not once | Context-dependent heuristic |

AVOID:
- Giant headings used purely for drama on screens where nothing is actually being emphasized more than usual (§4).
- Tiny, low-contrast gray labels used to look "sophisticated" — this usually just fails contrast (§12).
- Excessive uppercase for anything longer than a short label — widely reported to slow reading of running text, plausibly because it flattens the ascender/descender shape cues readers use to recognize word shapes (context-dependent heuristic; short labels/badges are a normal, low-risk exception).
- More than 3 font weights genuinely in play on one surface.
- Full-width, wide-column paragraphs with no max-width.
- Gradient text applied to every heading (§4).
- Letter-spacing values chosen per element rather than derived from the type scale.
- Monospace used merely to signal "technology."

Inspection questions: Does removing the largest heading size from all but the top 1–2 statements on this page change how it reads? Would a reader scanning quickly know what matters most? Is any body text under the WCAG contrast minimum (§12) because it was styled "quiet" rather than checked?

---

## 8. Color and Surface Rules

Require a role-based palette. Define these roles and let components reference *roles*, not raw color values:

| Role | Purpose |
|---|---|
| Page background | The base canvas behind everything |
| Primary surface | The default content container level |
| Secondary surface | A subordinate container level (e.g., a sidebar, a nested panel) |
| Elevated surface | Modals, popovers, dropdowns — visually "above" the page |
| Primary text | Default reading text |
| Secondary text | De-emphasized but still readable text (metadata, captions) |
| Muted text | The lowest-emphasis text still meant to be read — MUST still pass contrast (§12); "muted" is not license to fail contrast |
| Border | Default separators |
| Strong border | Emphasis separators (e.g., an active/selected item's border) |
| Accent | The product's one primary interactive/brand color |
| Accent hover / active | State variants of accent, not new colors |
| Focus | A distinct, always-visible ring/outline color; MUST meet WCAG 2.2's AA-level Focus Visible/Focus Not Obscured requirements, SHOULD also meet the stricter AAA-level Focus Appearance size/contrast thresholds where feasible |
| Success / Warning / Error / Information | Semantic-only; MUST NOT be reused for decoration |
| Selection | Background for selected items/text |

Rules:
- MUST limit accent color usage to elements that are interactive or that need to draw attention to state/priority; MUST NOT scatter the accent color across decorative elements that aren't interactive or don't carry meaning.
- MUST NOT let more than a small number of surface tints appear on one screen without each one encoding a real distinction (§4, "too many surface colors").
- MUST verify contrast for every text/background and meaningful-graphic/background pairing against WCAG 2.2: 4.5:1 for normal text, 3:1 for large text (≥24px, or ≥18.66px bold), 3:1 for meaningful UI-component borders/states and graphical objects. Use an actual contrast-checking tool (e.g., WebAIM's contrast checker or an automated audit) rather than eyeballing it — this is automated verification, not heuristic judgment, and should be treated as such.
- MUST NOT convey status, error, or required information through color alone — pair color with an icon, text label, or pattern (Governing Principle 7; WCAG 1.4.1).
- SHOULD design dark mode as its own considered theme, not an automatic inversion: near-black (not pure-black) base surfaces, with elevation communicated by making surfaces progressively lighter as they sit "closer to the user" (Material's documented dark-theme approach uses a continuous white-overlay-opacity formula that increases with elevation, rather than a fixed small number of steps — implement it as a scale of a few practical stops for your own token system, e.g. base/raised/overlay/popover, but don't assume Material's exact formula is a universal 4–5-step standard), and slightly desaturated accent colors to avoid vibration against dark backgrounds. See §4 for the specific "pure black + neon" failure this prevents.
- MAY use gradients, but only after passing the **Gradient Justification Test**: can you name a reason this gradient exists beyond "it looks modern"? If yes and it's bounded to a specific area (not applied to text, buttons, and backgrounds simultaneously), it's a legitimate stylistic choice, not a red flag. (This is the canonical definition of the test; §4 and §19 reference it rather than restating it.)
- MUST NOT let decorative color compete visually with status color — if a page is full of colorful decoration, a red "error" state stops standing out.

**Surface count audit** — count distinct background colors/tints visible in one viewport. Each one MUST correspond to a real role in the table above; if two "different-looking" surfaces are actually the same role, they should be the same value.

---

## 9. Components and Interaction States

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
| Tables | Comparing structured records | No strategy for narrow viewports (§11); no empty/loading state | default row/hover/selected/loading/empty/error | Real `<table>` semantics or equivalent ARIA grid roles; row/column headers associated | Infinite generic rows of placeholder-looking data never tested with real content variance (§10) |
| Lists | Ordered/unordered content, especially non-tabular | Rendered as a stack of full cards when plain rows would do (§4) | default/hover/selected/empty/loading | | |
| Cards | See §6's necessity test | See §4 | default/hover/selected/loading/error | Interactive cards are a single accessible target, not nested clickable regions with unclear focus order | |
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
| Charts | Data that supports an actual decision (§4, §6) | Decorative charts with meaningless data | loading/empty/error/populated | Data available in an accessible alternative (table/summary), not chart-only | |
| Date pickers | Selecting single or range dates | Reinvented custom widget with broken keyboard support | default/open/disabled-dates/error | Full keyboard operability; announces selected date | |
| File uploads | Adding files/documents | No feedback during upload; silent failure | idle/dragging-over/uploading/success/error | Progress and errors announced, not just visual | |
| Search | Finding content within the product | No empty-results or loading state | idle/typing/loading/results/no-results/error | Results count announced to screen readers | |
| Filters | Narrowing a large result set | No indication of active filters or how to clear them | default/active/disabled (no matches) | Active filter state visible and announced | |
| Command palettes | Fast keyboard-driven navigation/actions for power users | Added without validating it serves *this* product's users (a developer-tool pattern applied to a low-frequency consumer app) | closed/open/typing/results/no-results | Full keyboard operability; standard shortcut convention respected | |

MUST implement the states relevant to a component before considering it done — a button with no visible disabled/loading state, or a form with no error state, is an incomplete component, not a finished one with extra work optional.

**Security-adjacent UI concerns.** These are UI-implementation details, not backend architecture, so they're in scope here even though §1 excludes general backend/business-logic correctness: MUST render any user-supplied or externally-sourced rich text/HTML through a sanitizing path rather than raw injection, to prevent XSS — this is a routine, common production bug, not an edge case. Form inputs for name/email/password/address fields SHOULD carry correct `autocomplete` attributes so password managers and browser autofill work as users expect (a frequently-missed detail that makes a form feel unfinished even when everything else about it is polished). Paste handling into rich-text fields SHOULD strip or sanitize pasted markup rather than executing it verbatim.

---

## 10. Content and Data Integrity

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
| Empty collections | A real empty state (§9), not a blank region |
| Single-item collections | Whether grid/list layout degrades gracefully with one item |
| Failed image loads | Fallback/alt content |
| Slow-loading content | Loading state correctness (§9), no layout shift on arrival |

"Realistic" test data means data that resembles what the product will actually encounter — it does NOT mean inventing unsupported business claims (§4) to make demo content look more impressive.

### Internationalization and content expansion

MUST NOT assume English-length strings when sizing UI elements. Evidence-backed defaults: German strings commonly run 30–50% longer than English equivalents; other European languages typically expand 20–35%. MUST test with a longer-string locale or simulated expansion before considering layout final.

MUST support right-to-left layout considerations if the product will ship in an RTL language: mirroring of layout direction, navigation order, and directional icons (not just text direction) — full RTL support requires layout-level changes, not a CSS flip alone.

MUST NOT solve text overflow by truncating everything — preserve access to full content (a tooltip, a wrap, an expand control) rather than silently cutting information the user needs (§4, "truncated content without a recovery mechanism").

Also account for locale-dependent date/time/number/currency formatting, pluralization rules, and locale-aware sorting when the product supports multiple locales.

---

## 11. Responsive Design Standard

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

MUST test intermediate widths (not only a phone width and a desktop width) — independent analyses of responsive-design failure point to the roughly 600–900px tablet/small-laptop range as where many designs break because it receives the least testing attention. MUST test landscape mobile and zoomed-desktop (see §12) as distinct cases, not assumed to behave like the nearest breakpoint.

Breakpoints SHOULD be chosen where a specific layout actually fails, not solely from a generic device-width chart; common anchor widths (roughly ~480/768/1024/1280px) are a reasonable starting point, but the deciding factor is where *this* layout's content stops working, not matching a device's marketing name.

MUST NOT hide essential content or controls at a supported viewport without an equivalent path to reach them (Governing Principle 7 gate).

---

## 12. Accessibility as a Quality Requirement

Accessibility MUST be built in throughout implementation, not audited once at the end — and accessibility failures are also, independently, a strong signal of an unfinished or superficial build, because they usually indicate no one interacted with the rendered output using anything but a mouse and eyes.

**What "manual with a screen reader" means when you are an AI agent without one.** Several checks below are marked "manual" because that is the correct, most rigorous method — but an AI agent working alone typically does not have a literal screen reader and a human ear to verify what it announces. Per Governing Principle 3 (Limits of AI Evaluation), do the best available approximation and say so explicitly, rather than silently treating a weaker check as equivalent to the real one:

1. **Best available for an agent alone:** inspect the accessible-name/accessible-description computation directly (via browser devtools' accessibility tree, or an automated tool such as axe-core/Lighthouse/Pa11y) to confirm a name/description exists and is correct — this catches missing labels and broken `aria-describedby` wiring without needing an actual voice output.
2. **Also do:** a full keyboard-only pass (Tab/Shift+Tab/Enter/Space/Arrows/Escape) through the real, rendered UI — this is genuinely and fully achievable by an agent with browser access, not just an approximation, and it catches a large share of what a screen-reader user would also hit (unreachable controls, wrong focus order, traps).
3. **State the gap:** when reporting results (§24's template), distinguish "verified via accessibility-tree inspection and keyboard testing" from "verified with an actual screen reader by a person" — these are different confidence levels, and claiming the former as if it were the latter is exactly the kind of invented-validation problem Governing Principle 3 prohibits.
4. **When a human or real assistive technology is available** (the user, a teammate, a device lab), prefer that for Critical-path flows before calling accessibility work done at the highest confidence band (§21).

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
| Non-color indicators | Status/required/error never conveyed by color alone | Manual: grayscale the page (§19) and re-check comprehension |
| Screen-reader names | Icon-only controls have an accessible name (`aria-label` or equivalent), not just a tooltip | Automated + manual with a screen reader |
| Live regions | Dynamic updates (toasts, async results, form errors) announced via appropriate ARIA live regions | Manual with a screen reader |
| Dialog focus management | Focus moves in on open, is trapped inside while open, returns to the trigger on close | Manual keyboard test |
| Reduced motion | `prefers-reduced-motion` respected for all non-essential animation (§13) | Automated (media query present) + manual (OS setting toggle) |
| Touch targets | ≥24×24 CSS px minimum (WCAG 2.2 §2.5.8), with 44×44 as a widely used stronger default (Apple HIG/Material) where space allows | Manual measurement |
| Zoom / text enlargement | Usable at 200% browser zoom and at large OS-level text-size settings, without loss of content or function | Manual test at 200% zoom |
| Table semantics | Real header/data cell association (`<th>`/`scope`, or ARIA grid equivalents) | Automated + manual |
| Alternative text | Meaningful images have descriptive alt text; decorative images are marked so they're skipped | Automated + manual |
| Icon-only controls | Always paired with an accessible name; tooltip alone is not sufficient (tooltips aren't reliably exposed the same way) | Manual with a screen reader |
| Disabled-state communication | A disabled control's reason is discoverable, not just an unexplained inert element, when it blocks a needed action | Manual review |

MUST fix all Critical accessibility failures and, absent a documented constraint, all Major ones before calling work complete (Governing Principle 7, §21).

---

## 13. Motion Standard

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
| Loading animation | See §9/§4 — shape to match real content, use only above a noticeable-delay threshold. |
| Hover effects | Every hover effect MUST communicate interactivity or a real state — not decoration for its own sake (§4; the Interaction Test, §19). |
| Scroll-based effects | Parallax and scroll-triggered reveals are a strong AVOID for application interfaces; for marketing pages, use only where it clarifies a sequence or relationship, never merely to look sophisticated. |
| Layout shift | Motion MUST NOT cause unexpected layout shift for unrelated content (protect CLS — see Performance below). |

**Animation budget.** For any single view, count how many independently-animating elements exist at once (entrance animations, hover effects, looping indicators). If most elements on the screen are moving independently with no shared coordinating logic, that is a signal of "everything fading/sliding" (§4) rather than deliberate motion design — reduce to the ones that pass the purpose test above.

---

## 14. Performance and Perceived Quality

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
| Skeleton/placeholder behavior | See §4/§9 — shown only above a noticeable-delay threshold, shaped to match final content to avoid shift on arrival | Context-dependent heuristic |
| Slow/unreliable network behavior | Does the UI degrade gracefully (clear loading/error/retry states) rather than hanging silently, when tested under throttling? | Widely accepted default |
| Disabled/delayed action feedback | Does a button that triggers a slow operation show it's working (disabled + loading state), rather than looking inert or allowing repeat clicks? | Widely accepted default |
| Optimistic updates and rollback | Where an optimistic UI update is used, is there a real rollback path and error message if the underlying action fails? | Widely accepted default |
| Duplicate submission prevention | Is a form/action guarded against double-submission from a double-click or slow network retry? | Widely accepted default |

**Core Web Vitals as a starting measurement, not the whole picture.** As general starting thresholds when applicable: Largest Contentful Paint (LCP) under ~2.5s, Interaction to Next Paint (INP) under ~200ms, Cumulative Layout Shift (CLS) under ~0.1, each evaluated at a realistic percentile of real usage rather than a single best-case load. MUST NOT treat passing these three numbers as proof the whole experience performs well — they measure loading, responsiveness, and stability at a page level, not whether a specific slow interaction inside an already-loaded page feels smooth, or whether a large data operation blocks the UI. Use real field data when available; fall back to lab testing (throttled network/CPU) when it isn't, and say which one a conclusion is based on.

**Locking in quality over time.** A one-time manual review (§17–§18) catches what exists today but not what a later change silently breaks. Where the project's tooling supports it, MAY add automated visual-regression testing (screenshot-diffing on key routes/states) so future changes that alter layout are caught by a check rather than requiring someone to notice; MAY add runtime error monitoring/crash reporting so failures the user's session hits (not just what your own testing hit) become visible instead of silent. Neither is required to consider a single piece of UI work done, but their absence on an ongoing production product is itself a gap worth flagging (§25, unresolved-questions style) rather than silently assuming someone else has it covered.

---

## 15. Component-Library De-Defaulting

Do not avoid component libraries — Tailwind CSS, shadcn/ui, Radix UI (primitives), Material UI, Chakra UI, Bootstrap, Ant Design, Headless UI, and similar systems are legitimate accelerators. The failure is shipping their *default visual expression* unexamined (§4), which independent critiques identify as one of the most recognizable "tells" of a generated interface — precisely because so many projects share the exact same untouched defaults.

Before considering a library-based UI finished, MUST have deliberately reviewed and set (not merely left at default) each of:

- **Radius** — chosen per element role (§5), not the library's single global default value everywhere.
- **Color** — a role-based palette (§8) mapped onto the library's theming mechanism, not just the accent/primary color swapped while every neutral, border, and surface stays default. **Changing only the accent color does not constitute customization** — this is explicitly called out because it is the most common half-measure.
- **Typography** — the product's chosen type scale and family(ies) (§7), not the library's bundled default font and size steps.
- **Spacing** — the product's spacing scale (§5) applied to the library's spacing props/utilities, not the library's default density.
- **Control dimensions** — heights/paddings for buttons, inputs, and rows decided deliberately for this product's density needs (§3), not left at default.
- **Borders** — width and color decided as part of the palette, not left at the library default alongside a new accent color.
- **Shadows** — mapped to this product's elevation scale (§5), not the library's default shadow preset applied everywhere uniformly.
- **Iconography** — a deliberately chosen icon set and usage discipline (§4, §9), not just whatever the starter template bundled.
- **Density** — an explicit choice per §3's product type, not the library's one-size default.
- **Component composition** — how components combine into this product's actual screens, not the library's demo/kitchen-sink layout reused as the real page structure.
- **Motion** — the library's default transitions reviewed against §13's purpose test, not left untouched.
- **Page structure** — overall page shells (§6) built for this product's information architecture, not the library's example dashboard/marketing template used as the real structure.

MUST remove unused variants, components, and utility classes the library ships that this product doesn't use — an unused surface of options is easy to accidentally reach for later without a decision, reintroducing default-library patterns.

---

## 16. Implementation Workflow

A staged process for any non-trivial UI task.

**Stage 1 — Inspect.** Read the repository structure. Identify the framework and styling approach in use. Find existing tokens, global styles, layout primitives, and components before adding new ones. Identify repeated patterns already established. Inspect all relevant existing routes/screens. Determine whether a design system already exists (even an informal one) — if so, extend it; do not introduce a parallel, inconsistent convention. Note existing inconsistencies rather than silently reproducing or "fixing" them without flagging the change.

**Stage 2 — Model the product.** Fill out the product brief (§3). Map the primary workflow, the states that matter, the information hierarchy, the major entities involved, the key user decisions, and the navigation structure.

**Stage 3 — Establish the visual system.** Define or extend tokens (§5), typography (§7), surfaces (§8), core components (§9), layout rules (§6), and responsive behavior (§11) — proportional to project size (§5).

**Stage 4 — Build the structural version.** Implement hierarchy and the real workflow before decoration. The first working pass SHOULD function without: gradients, complex shadows, entrance animation, decorative illustrations, glass effects, special cursors, or excessive icons. If it doesn't work as a plain, unstyled-but-structured version, decoration will not fix it.

**Stage 5 — Add visual refinement.** Add only refinements that have a stated purpose per §2's justification test.

**Stage 6 — Test states and content extremes.** Exercise every meaningful state (§9) and the content variance list (§10).

**Stage 7 — Conduct visual review.** Render and inspect at multiple routes and viewport sizes (§17).

**Stage 8 — Simplify.** Remove unnecessary elements, wrapper divs, one-off styles, and effects that didn't survive §2's test.

**Stage 9 — Final audit.** Apply the scoring/severity framework (§20–§21) and confirm the completion gates (Governing Principle 7, §22).

---

## 17. Visual Inspection and Tool Use

Code review alone cannot catch most of what this document is about — you MUST inspect the rendered output.

Depending on tools actually available in your environment, run the application and, for every route relevant to the change:

- Visit the route and capture a screenshot.
- Inspect at desktop, tablet, and mobile widths, AND at intermediate widths (§11) — not only the two extremes.
- Compare visually related pages side by side for consistency.
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
- Test with long/extreme content (§10).
- Test with the OS/browser reduced-motion setting enabled.
- Test with a throttled/slow network connection where loading behavior matters.
- Check the target browser(s) the product actually needs to support, not only whichever one your tooling defaults to — a layout or API that only works in one engine is a real production failure this checklist would otherwise miss.
- If the product has a stated no-JS/progressive-enhancement requirement, verify core content and navigation remain usable with JavaScript disabled; if it doesn't have that requirement, this check is not applicable — don't invent a requirement the product brief (§3) didn't ask for.

If browser automation and screenshot tools are available in your environment, use them rather than reasoning about the UI from source code alone. If you have image-understanding capability, actually look at the screenshots critically — check for the §4 pattern catalog, hierarchy, density, and consistency issues — rather than treating a successful screenshot capture as proof of quality. Examine the result the way a user encountering it fresh would, not merely confirm that elements rendered without crashing.

---

## 18. Self-Critique Procedure

Repeat this cycle until further changes would be marginal or subjective, not because a fixed number of iterations was reached:

1. **Render** the current state.
2. **Capture** screenshots across the required viewports/states (§17).
3. **Inspect** critically, using §4's catalog and §19's diagnostics.
4. **List defects** — specific and concrete, never a vague overall impression.
5. **Rank defects by impact** — what most affects task completion, comprehension, or credibility first.
6. **Fix the highest-impact defects.**
7. **Render again.**
8. **Compare before and after** — did the fix actually address the defect without introducing a new one?
9. **Repeat** until remaining issues are genuinely marginal/subjective, and document any you consciously chose not to fix (an EXCEPTION, §22).

The critique in step 3 MUST look for: generic structure, excessive decoration, weak hierarchy, inconsistent spacing, repeated card patterns, default-library appearance, unnecessary icons, unclear actions, unrealistic data, missing states, accessibility problems, responsive failures, copy that doesn't sound product-specific, areas that look fine in isolation but incoherent together, density mismatched to the task, and components attracting more attention than their importance warrants.

"Looks clean" is not an acceptable critique output on its own. Every finding MUST name the specific problem and connect it to a concrete revision.

**Bad critique:** "The page could be more polished."

**Good critique examples:**
- "The four equal-width metric cards dominate the first viewport, but only one metric affects the user's next decision. Reduce the other three to a compact summary row and give the actionable metric stronger hierarchy." (§4, §6)
- "The empty-state illustration is the only content in the panel; there's no explanation of why the list is empty or what action fills it. Add a one-line reason and a primary action." (§9, §10)
- "The 'Save' button in this form uses the same filled-accent style as the destructive 'Delete account' button below it, differentiated only by label text. A user scanning quickly could mis-click. Give destructive actions a distinct, less prominent default style with a confirmation step." (§9)
- "Every card on this dashboard has an identical 16px radius, 1px border, and drop shadow — including the page's single most important alert banner, which is visually indistinguishable from a routine data tile. Increase the alert's contrast/position so it reads as higher priority." (§4, §6)
- "The hero heading uses a gradient fill, the pricing-tier headings use a gradient fill, and the FAQ section headings use a gradient fill. None of these needs the effect; reserve it for the hero only, if at all." (§4, §7)

---

## 19. Anti–Vibe-Coding Heuristic Tests

Fast, repeatable diagnostics. Run them against a screenshot or the live rendered UI, not the source code.

| Test | Question |
|---|---|
| Grayscale Test | With all color removed, is hierarchy still understandable from size/weight/position/space alone? |
| Blur Test | Viewed blurred or from a distance, is the primary structure (where's the main content, where's the main action) still visible? |
| Squint Test | Does the eye go first to the most important task, or just to the brightest/loudest object? |
| Removal Test | Can a decorative element be removed without harming comprehension? If yes, seriously consider removing it. |
| Product Swap Test | Could this exact interface be relabeled as an unrelated product (a different SaaS category, a finance app, a productivity tool) without changing the layout? If yes, it's probably insufficiently product-specific (§3, §4). |
| Default Library Test | Would a developer familiar with the component library in use immediately recognize its untouched defaults? If yes, revisit §15. |
| Card Count Test | How many visually separate containers appear in one viewport? Is each one necessary per §6's test? |
| Radius Test | Are visually and functionally unrelated elements receiving the identical exaggerated rounded treatment for no reason? |
| Accent Test | Is the accent color reserved for priority/interactivity/state, or scattered as decoration? |
| Interaction Test | Does every hover/active effect communicate real interactivity or state, or is some of it just movement for its own sake? |
| Copy Swap Test | Could the headings and CTAs be pasted into almost any other software product unchanged? If yes, rewrite them from the product brief (§3, §4). |
| Real Data Test | Does the layout survive realistic, missing, long, and unusual data (§10), or only the tidy default case? |
| Screenshot Test | Does a screenshot read as a real workflow someone could actually do something with, or just a collection of attractive components? |
| Memory Test | After looking away, can you (or a test user) describe the main task on this screen and the next action to take? |
| Consistency Test | Are visually repeated patterns actually consistent in dimensions, spacing, behavior, and naming — or only superficially similar? |
| Justification Test | Can you answer §2's seven questions for every prominent visual choice on this screen? |
| Gradient Justification Test | Is there a reason for this gradient beyond "it looks modern"? (§4, §8) |
| Surface Count Audit | Does every distinct background tint on this screen correspond to a real role (§8), or are some just "different because it looked flat otherwise"? |

None of these tests are pass/fail gates by themselves — they're diagnostic prompts. A "failing" answer means: go inspect further, don't automatically delete the element (Governing Principle 4).

Most of these are genuinely runnable by the same agent that built the UI, immediately, against a screenshot. The **Memory Test is the exception**: an agent cannot simulate forgetting, so self-administering it (look at a screenshot, immediately ask yourself to recall it) produces a hollow result, not a real signal — you have no memory decay to test against. Run it for real by handing the screenshot to a separate party (a fresh agent context with no memory of building the screen, a different reviewer, or an actual person) after a genuine gap, or skip it and say so rather than reporting a self-administered pass as if it meant something.

---

## 20. Scoring Rubric

A 100-point rubric to summarize a review. It supplements, and never overrides, the gate list in Governing Principle 7 / §22 — a design can score 90 and still be incomplete if a gate condition is unmet.

| Area | Points | Low | Acceptable | Strong | Exceptional |
|---|---|---|---|---|---|
| Product specificity | 12 | Generic template feel; fails Product Swap Test | Some product-specific language/content, still fairly generic | Clearly built for this product's users and data | Interface could not be mistaken for any other product |
| Information architecture | 10 | No clear structure; user can't find primary task | Findable with effort | Clear, task-aligned structure | Structure matches the user's own mental model, confirmed against the brief |
| Visual hierarchy | 10 | Everything the same weight | Some differentiation, inconsistent | Clear primary/secondary/tertiary distinction throughout | Hierarchy holds under Grayscale/Blur/Squint tests everywhere |
| Layout and spacing | 8 | Crowded or arbitrarily sparse; inconsistent spacing | Mostly consistent, some one-off values | Systematic spacing scale applied throughout | Spacing actively communicates relationships everywhere it appears |
| Typography | 8 | Inconsistent sizes/weights, poor legibility | Mostly systematic, some drift | Full systematic type scale, good legibility | Type choices reinforce hierarchy and product tone with restraint |
| Color and surfaces | 8 | Arbitrary palette, contrast failures | Role-based but some role confusion | Clean role-based palette, verified contrast | Distinct, deliberate light/dark themes, all state color reserved for meaning |
| Component quality | 10 | Default-library appearance throughout | Partially customized | Fully de-defaulted, consistent component set | Components read as native to this specific product |
| State completeness | 10 | Missing loading/empty/error states | Most major states present | All relevant states present per §9 | States tested against real content extremes (§10) |
| Responsiveness | 8 | Breaks or unusable at common widths | Usable at extremes, weak at intermediate widths | Full response-strategy hierarchy applied (§11) | Verified at intermediate widths, landscape, and zoom |
| Accessibility | 8 | Critical failures present (§12) | No critical failures, some major gaps | Full §12 checklist passes | Verified with actual keyboard/screen-reader testing |
| Content credibility | 4 | Fabricated claims/generic filler copy | Real content, some generic copy | Product-specific copy throughout | Copy fails the Copy Swap Test in the good sense — could not be reused elsewhere |
| Interaction clarity | 4 | Unclear what's interactive/what an action does | Mostly clear | Every interactive element signals its purpose | Passes the Interaction Test everywhere |

*(Sums to 100.)*

Interpretation bands: **0–49 Low** (do not ship), **50–69 Acceptable** (functional but visibly unrefined, revisit before calling done), **70–89 Strong** (ready pending gate check), **90–100 Exceptional** (rare; verify this isn't a false-confidence self-assessment — re-run §18 once more before trusting it).

**A plain, functional Strong score is a genuinely good outcome, not a consolation prize.** The "Product specificity" and "Content credibility" rows' top band rewards distinctiveness ("could not be mistaken for any other product," copy that "could not be reused elsewhere") — read that as a description of what naturally follows from real product specificity, not as an instruction to add novelty, unusual phrasing, or unconventional structure in order to defeat the Product/Copy Swap Tests artificially. Governing Principle 1 puts "decorative refinement and novelty" at the lowest priority tier for a reason: an interface that chases distinctiveness for its own sake, at the cost of clarity or convention a user actually relies on (a familiar checkout flow, a standard settings-page layout), is optimizing the wrong thing even if it scores well on this rubric. If pursuing a higher score on this rubric would mean adding something whose only justification is "this makes it look less generic," that fails §2's justification test and should not be added.

**Automatic score caps / failure conditions** — regardless of computed total, cap the reported score and treat the work as incomplete if any apply: the primary workflow doesn't function; keyboard navigation is substantially broken; text has severe (well below 3:1) contrast failures; the mobile layout is unusable; the interface contains fabricated claims presented as fact; critical loading/empty/error states are absent; major components visibly overflow; multiple primary actions compete with no clear priority; the UI is almost entirely default-library components with no product-specific composition; the interface is visually attractive but doesn't support the intended task.

**Recommended minimum confidence threshold before calling a UI complete:** Strong band (≥70) with zero unresolved Critical or Major findings (§21) and all §22 completion criteria met, PLUS an explicit, honest confidence statement (§0) about what remains unverified due to lack of user testing. A numeric score is a summary aid; it MUST be accompanied by written justification, not stand alone.

---

## 21. Severity Framework

- **Critical** — prevents task completion, creates a serious accessibility barrier, misrepresents information, or causes a major responsive failure. MUST be fixed before completion, no exceptions.
- **Major** — substantially weakens hierarchy, usability, consistency, or product specificity. MUST be fixed unless a documented, justified constraint prevents it (an EXCEPTION, §22).
- **Moderate** — noticeably reduces polish or comprehension but doesn't block the workflow. SHOULD be fixed; may be deferred with a reason.
- **Minor** — small visual inconsistency or refinement opportunity. MAY be deferred.

---

## 22. Definition of Done

A UI is NOT complete merely because: it compiles; it has no obvious overflow; it uses a component library; it has animations; it "looks modern"; it has responsive classes; one screenshot looks attractive; the homepage is polished; the happy path works.

Completion requires all of:

- A coherent visual system (§5) actually applied, not just defined.
- Clear, product-specific hierarchy (§2, §3, §6, §7).
- Functional primary workflows, verified end to end, not just visually present.
- Tested responsive behavior at required widths, including intermediate ones (§11).
- Meaningful interaction states implemented for every relevant component (§9).
- Accessible semantics and full keyboard navigation (§12).
- Realistic content resilience — tested against §10's extremes.
- Cross-page/cross-state consistency (§5's Controlled Variety).
- Screenshot-based visual review actually performed (§17), not skipped because "it should be fine."
- Self-critique and at least one revision cycle actually run (§18).
- No unresolved Critical findings, and no unresolved Major findings without a documented reason (§21).
- Written justification for every intentional exception to a MUST/SHOULD rule (§24's Intentional Exceptions field).

**This checklist can be satisfied in letter while failing in intent — watch for that in your own work.** Two specific ways it happens, both worth naming directly rather than trusting good faith alone to prevent them:

1. **Exception-laundering.** Writing a documented EXCEPTION for every MUST/SHOULD you didn't want to follow technically satisfies the "written justification" requirement while leaving the shipped UI exactly as generic as if this document didn't exist. A high ratio of EXCEPTIONs to rules actually followed is itself a finding, not a neutral bookkeeping outcome — if you notice yourself reaching for an EXCEPTION more than occasionally on one piece of work, that is a signal to reconsider the design, not to document faster. Treat "how many exceptions did I take, and could I actually defend each one to a skeptical reviewer" as an explicit question in your own §18 self-critique.
2. **Self-graded confidence.** A score or "Definition of Done" checklist filled out by the same agent that built the UI is real information, but it is heuristic self-evaluation (Governing Principle 3), not independent confirmation — and Governing Principle 9 exists specifically because self-review has a structural blind spot: the agent that made a choice is the least likely to notice its own unexamined default. Don't report a self-assessed "Strong" or "Exceptional" band as equivalent to one confirmed by an independent reviewer (a fresh agent context, a different person). When only a self-assessment is available, say so plainly in whatever you report — "self-assessed, Strong band, not independently reviewed" is honest; presenting it without that qualifier is not.

---

## 23. Compact Build Checklist

Use this without rereading the full guide.

**Before coding**
- [ ] Product brief filled out (§3) — purpose, user, primary task, data shape, device context.
- [ ] Repository inspected for existing tokens/components/conventions (§16 Stage 1).
- [ ] Did NOT start from a hero section, card grid, or component-library browsing.

**Before styling**
- [ ] Structural version works with no gradients/shadows/animation/icons (§16 Stage 4).
- [ ] Token set exists (or extends the existing one) — spacing, type, color roles, radius, shadow (§5).

**During component work**
- [ ] Card Necessity Test applied to every container (§6).
- [ ] Required states implemented per component (§9).
- [ ] Component library defaults reviewed and deliberately overridden (§15) — accent color alone is not enough.
- [ ] Copy written from the product brief, not generic marketing vocabulary (§4, §10).
- [ ] No fabricated claims/testimonials/statistics (§10).

**During responsive work**
- [ ] Tested at intermediate widths, not just phone/desktop extremes (§11).
- [ ] Every hidden/collapsed element justified (§11's hierarchy).
- [ ] Tables/toolbars/dialogs have an explicit narrow-viewport strategy (§6, §9).

**Before final review**
- [ ] Rendered output actually inspected (screenshots or live browsing), not just code (§17).
- [ ] Keyboard-only pass of the primary workflow (§12, §17).
- [ ] Contrast checked with a real tool, not eyeballed (§8, §12).
- [ ] Content extremes tested: long/short/empty/error/many-items (§10).
- [ ] `prefers-reduced-motion` respected (§13).
- [ ] Self-critique cycle run at least once, with specific findings (§18).

**Before declaring completion**
- [ ] Every Governing Principle 7 / §22 gate condition checked and cleared.
- [ ] Severity of remaining findings assessed; no unresolved Critical, no undocumented unresolved Major (§21).
- [ ] Confidence stated honestly, including what wasn't validated by real users (§0).
- [ ] Intentional exceptions documented, not silently taken (§24).

---

## 24. Machine-Readable Review Template

```md
# UI Review

## Product Context
- Product:
- Primary user:
- Primary task:
- Routes reviewed:
- Viewports reviewed:

## Overall Assessment
- Score:
- Confidence: (heuristic self-review only, unless real user testing occurred — state which)
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
- Product-swap test result:
- Missing states:
- Responsive weaknesses:

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

## Intentional Exceptions
- Rule:
- Reason:
- Tradeoff:
```

---

## 25. Sources and Further Reading

Every source below was actually retrieved and reviewed during research for this document (via web search, with content synthesized from search-result summaries; a small number of full-page fetches were blocked by target-site restrictions and are noted as such in the coverage matrix in the appendix). Sources are grouped by the principle they support. Where sources disagreed, the disagreement is noted.

**Vibe coding / AI-generated UI critique**
- Živilė Ma, "Why All Vibe-Coded Designs Look the Same," Medium — https://medium.com/@zivilema/why-all-vibe-coded-designs-look-the-same-709c0db84317 — supports: training-data bias explanation for repeated visual patterns (§1, §4).
- Nielsen Norman Group, "GenUI vs. Vibe Coding: Who's Designing?" — https://www.nngroup.com/articles/genui-vs-vibe/ — supports: the distinction between AI-assisted generation and deliberate design ownership (§1, §2).
- The Fountain Institute, "7 Signs a UI Has Been Vibe Coded" — https://www.thefountaininstitute.com/blog/signs-vibe-coded-ui — supports: recognizable-pattern catalog approach (§4).
- Jack Pearce, "Where does that purple gradient come from?" — https://www.jackpearce.co.uk/notes/purple-gradient-ai-aesthetics/ — supports: purple/indigo-gradient default explanation (§4).
- Kai Ni, "Design Observation: Why Do AI-Generated Websites Always Favour Blue-Purple Gradients?," Medium — https://medium.com/@kai.ni/design-observation-why-do-ai-generated-websites-always-favour-blue-purple-gradients-ea91bf038d4c — supports: same, independent corroboration (§4).
- 925 Studios, "AI Slop Web Design: Complete Guide" — https://www.925studios.co/blog/ai-slop-web-design-guide — supports: pattern catalog (purple gradients, Inter font, card grids) (§4).
- freedesignmd, "The shadcn trap: why shadcn looks generic and how to fix it" — https://freedesignmd.com/blog/shadcn-looks-generic — supports: default-library-appearance pattern and de-defaulting need (§4, §15).
- LogRocket, "Shadcn UI adoption guide" — https://blog.logrocket.com/shadcn-ui-adoption-guide/ — supports: same; documents shadcn's newer preset-based workflow as an industry response (§15).
- arXiv, "AI Slop and the Software Commons" (2604.16754) — https://arxiv.org/abs/2604.16754 — supports: qualitative-research framing of AI-generated output quality concerns as a broader software-commons problem (§1).
- arXiv, "'An Endless Stream of AI Slop': How Developers Discuss the Burden of AI-Assisted Software Development" (2603.27249) — https://arxiv.org/html/2603.27249v3 — supports: a qualitative coded analysis of developer posts on Reddit/Hacker News discussing AI-output quality; used as qualitative evidence, not a universal design rule (§1, Evidence Hierarchy). The specific figures attributed to this paper elsewhere (post/thread counts) were obtained via search-result synthesis rather than a full-text fetch of the paper itself (several full-text fetches were blocked during this research — see Appendix A/B), so treat those specific counts as approximate secondhand reporting, not independently confirmed against the source.
- Superdesign, "Why AI Design Looks Generic" — https://superdesign.dev/blog/why-ai-design-looks-generic — supports: "statistical average of the training set" framing (§1).
- Developers Digest, "AI Design Slop: 16 Patterns That Out Your App as Vibe-Coded" — https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it — supports: pattern catalog scope check for §4.
- Sailop, "AI Slop in 2026: The State of the AI-Generated Web" — https://www.sailop.com/blog/ai-slop-2026-state-of-the-ai-generated-web — supports: pattern catalog scope check.
- thecrit.co, "Why Your Vibe-Coded App Looks Like Every Other AI App" — https://thecrit.co/resources/vibe-coding-design-guide — supports: pattern/fix pairing structure used throughout §4 (title/summary reviewed via search result; full page blocked to direct fetch — see coverage matrix).

**Design systems and tokens**
- Carbon Design System (IBM), "Spacing" — https://carbondesignsystem.com/elements/spacing/overview/ — supports: spacing-scale discipline, density-appropriate whitespace (§5, §6).
- Material Design 3, "Typography" — https://m3.material.io/styles/typography/type-scale-tokens — supports: systematic type-scale tokens (§5, §7).
- Penpot, "Using design tokens for a proportional typographic scale" — https://penpot.app/blog/using-design-tokens-for-a-proportional-typographic-scale/ — supports: ratio-based type scale (§7).
- UX Collective (Oluwatosin Obalana), "Mastering typography in design systems with semantic tokens and responsive scaling" — https://uxdesign.cc/mastering-typography-in-design-systems-with-semantic-tokens-and-responsive-scaling-6ccd598d9f21 — supports: semantic vs. primitive token layering (§5).
- Radix UI Primitives, GitHub — https://github.com/radix-ui/primitives — supports: accessible-primitive layer as a legitimate library foundation to de-default on top of (§15).
- Carbon Design System, GitHub — https://github.com/carbon-design-system/carbon — supports: token/component architecture reference (§5, §15).

**Foundational UI/UX practice**
- Adam Wathan & Steve Schoger, *Refactoring UI* — summarized via Abdul Khaleque, "Top 20 Key Points from Refactoring UI," Medium — https://medium.com/design-bootcamp/top-20-key-points-from-refactoring-ui-by-adam-wathan-steve-schoger-d81042ac9802 — supports: hierarchy via size/color/weight, shadow-as-elevation discipline, restrained accent-color use (§4, §7, §8, §9).
- Nielsen Norman Group, "10 Usability Heuristics for User Interface Design" — https://www.nngroup.com/articles/ten-usability-heuristics/ — supports: aesthetic-and-minimalist-design heuristic underlying §2's justification test and §6's density guidance.
- Cieden, "How do I create the right button hierarchy?" — https://cieden.com/book/atoms/button/how-to-create-button-hierarchy — supports: one-primary-action-per-region rule (§9).
- Carbon Design System, "Button" usage guidance — https://v10.carbondesignsystem.com/components/button/usage/ — supports: same, independent corroboration.

**Dashboards and data credibility**
- Nielsen Norman Group, "Vanity Metrics in Analytics" (video) — https://www.nngroup.com/videos/vanity-metrics-analytics/ — supports: decision-value test for metrics/charts (§4, §6). NN/g dashboard research cited via search-result synthesis for the "5–7 primary metrics" and "wallpaper within two weeks" findings — treated as a widely-cited practitioner default, not a universal numeric law (Evidence Hierarchy).

**Accessibility standards**
- W3C, Web Content Accessibility Guidelines (WCAG) 2.2 — https://www.w3.org/TR/WCAG22/ — supports: contrast, focus appearance, target size, error identification requirements throughout §8, §9, §12 (standard-backed requirement, highest evidence tier).
- Deque, "What to Expect From WCAG 2.2" — https://www.deque.com/blog/what-to-expect-from-wcag-2-2/ — supports: plain-language summary of new 2.2 criteria (§12).
- WebAIM, "WCAG 2.2 Overview and Feedback" — https://webaim.org/blog/wcag-2-2-overview-and-feedback/ — supports: same.
- WebAIM, "Understanding WCAG 2 Contrast and Color Requirements" and "Contrast Checker" — https://webaim.org/articles/contrast/ , https://webaim.org/resources/contrastchecker/ — supports: the specific contrast-ratio verification method in §8/§12.
- Smashing Magazine, "Accessible Target Sizes Cheatsheet" — https://www.smashingmagazine.com/2023/04/accessible-tap-target-sizes-rage-taps-clicks/ — supports: 24px WCAG minimum vs. 44px platform-recommended default (§12).
- The Reform Blog, "Common ARIA Mistakes in Forms and Fixes" — https://www.reform.app/blog/common-aria-mistakes-in-forms-and-fixes — supports: `aria-describedby`/`aria-invalid` error-association pattern (§12).
- MDN, "prefers-reduced-motion" — https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion — supports: technical mechanism for §13's reduced-motion requirement.
- Tatiana Mac, "prefers-reduced-motion: Taking a no-motion-first approach to animations" — https://www.tatianamac.com/posts/prefers-reduced-motion — supports: practitioner implementation guidance for §13, including vestibular-disorder rationale.

**Color, surfaces, and theming**
- ColorArchive, "Dark Mode Color Design: Building a System, Not Just an Inversion" — https://colorarchive.org/guides/dark-mode-color-design-guide/ — supports: near-black base, elevation-via-lightness approach (§4, §8).
- Muzli/Medium, "Dark Mode Design: Why Simply Inverting Colors Is Not Enough" — https://medium.muz.li/dark-mode-design-why-simply-inverting-colors-is-not-enough-e2584ebb139b — supports: same, independent corroboration; Material's documented ~#121212 base and elevation-via-lightness approach (a continuous overlay formula, not a fixed step count — corrected in this document's §8 after independent review flagged an earlier overstatement) referenced from this and related search synthesis (§8).
- Nielsen Norman Group, "Glassmorphism: Definition and Best Practices" — https://www.nngroup.com/articles/glassmorphism/ — supports: legibility/contrast concerns and narrow-use recommendation (§4, §8).
- Axess Lab, "Glassmorphism Meets Accessibility: Can Glass Be Inclusive?" — https://axesslab.com/glassmorphism-meets-accessibility-can-frosted-glass-be-inclusive/ — supports: specific accessibility concerns (low vision, dyslexia) with translucent surfaces.

**Responsive design and performance**
- Framer Blog, "Breakpoints in responsive web design: 2026 guide" — https://www.framer.com/blog/responsive-breakpoints/ — supports: common breakpoint anchor points and the tablet-range testing gap (§11).
- BrowserStack, "Breakpoint: Responsive Design Breakpoints in 2025" — https://www.browserstack.com/guide/responsive-design-breakpoints — supports: content-based vs. device-based breakpoint reasoning; real-device testing recommendation (§11, §17).
- web.dev, "How the Core Web Vitals metrics thresholds were defined" and "Web Vitals" — https://web.dev/articles/defining-core-web-vitals-thresholds , https://web.dev/articles/vitals — supports: LCP/INP/CLS thresholds referenced in the Performance section (Governing Principle 8).
- LogRocket, "Skeleton loading screen design" — https://blog.logrocket.com/ux-design/skeleton-loading-screen-design/ — supports: noticeable-delay threshold and shape-matching guidance for skeleton loaders (§4, §9).

**Content, microcopy, and empty/error states**
- Content Beta, "List of 300+ AI Words, Phrases and Sentences to Avoid" — https://www.contentbeta.com/blog/list-of-words-overused-by-ai/ — supports: specific generic-vocabulary list in §4/§10 (author/community-compiled list; treated as illustrative, not exhaustive).
- UXPin, "Designing the Overlooked Empty States" — https://www.uxpin.com/studio/blog/ux-best-practices-designing-the-overlooked-empty-states/ — supports: context+guidance structure for empty states (§4, §9).
- Pencil & Paper, "Empty State UX Examples & Best Practices" — https://www.pencilandpaper.io/articles/empty-states — supports: same, independent corroboration.

**Internationalization**
- Crowdin Blog, "Advanced UI Localization Guide for Your App or Website" — https://crowdin.com/blog/best-practices-for-ui-localization — supports: text-expansion percentages and layout-flexibility guidance (§10).
- SimpleLocalize, "Design that speaks every language: UI tips for localization" — https://simplelocalize.io/blog/posts/ui-localization-best-practices/ — supports: RTL and layout-mirroring requirements (§10).

**Where sources disagreed or required judgment calls**
- Numeric guidance (dashboard metric counts, skeleton-loader delay thresholds, animation durations, breakpoint widths) varies across sources by roughly 20–50%. This document presents such numbers explicitly as *starting defaults or common ranges*, not fixed universal requirements, per the Evidence Hierarchy in §0 — the load-bearing rule in each case is the underlying principle (don't show unused metrics; don't show a loader for imperceptible delays; motion should feel neither sluggish nor abrupt; breakpoints should follow real layout failure), not the specific number.
- Some sources (notably the shadcn/ui ecosystem discussion) present "the library is not the problem, developers are" as a rebuttal to "the library looks generic" criticism. Both are represented in §4/§15: the guide agrees defaults aren't inherently bad, but treats *unexamined* default use as the actual failure mode, which is compatible with both positions.

---

## Appendix A — Topic Coverage Matrix

| Topic | Key conclusion | Evidence type | Confidence | Remaining uncertainty |
|---|---|---|---|---|
| Why AI UI looks generic | Statistical-average-of-training-data effect, reinforced by ubiquitous library defaults (indigo/purple, Lucide icons, Inter font) | Multiple independent practitioner analyses + one qualitative academic study | High | Exact training-data composition of any specific model is not independently verifiable by this research |
| Card/container overuse | Cards should pass a necessity test (independent interaction/selection/grouping); default behavior overuses them | Practitioner consensus (Refactoring UI, multiple critique pieces) | High | No controlled study quantifies an exact "too many cards" threshold; guidance here is heuristic |
| Dashboard metric value | Shown metrics should each drive a decision; excess metrics become ignored ("wallpaper") | NN/g research summary (via search synthesis) | Medium-High | Exact "5–7 metric" figure is a practitioner default, not independently re-derived here from raw NN/g data |
| Purple/gradient default | Documented as training-data/library-default artifact (Tailwind's early indigo-heavy defaults cited as a specific contributing factor) | Multiple independent sources, consistent account | High | Anecdote (a widely quoted Tailwind-creator remark) could not be independently verified as an exact quote via direct source fetch (blocked); treated as illustrative, not load-bearing |
| Contrast/focus/target-size requirements | WCAG 2.2 defines exact numeric thresholds | W3C standard (highest evidence tier) | High | None significant |
| Dark mode design | Should be a designed theme (near-black base, lightness-based elevation, desaturated accents), not an inversion | Multiple independent sources, consistent with documented Material Design approach | High | Exact lightness percentages vary slightly by source; treated as illustrative range |
| Responsive intermediate widths | The ~600–900px range is under-tested and where layouts commonly fail | Multiple independent practitioner sources | Medium-High | No first-party analytics available to this research confirming this range for any specific product |
| Motion duration/easing | ~150–400ms range, ease-in-out family, purpose-driven | Material Design + NN/g, consistent | Medium-High | Treated as a strong default range, not a hard limit |
| Reduced motion | `prefers-reduced-motion` is the correct mechanism; vestibular-disorder rationale documented | MDN (technical spec) + accessibility practitioner sources | High | None significant |
| Generic AI copy vocabulary | A recognizable, evolving set of words/phrases reads as generic/AI-authored | Multiple content-analysis sources | Medium | Vocabulary lists are illustrative and will date; the underlying principle (write from the specific product) is the durable part |
| Glassmorphism | Legitimate in narrow, tested use; broad use harms legibility/accessibility | NN/g + accessibility-focused source, consistent | Medium-High | "Narrow use" is a judgment call, not a numeric rule |
| i18n text expansion | German +30–50%, other European languages +20–35%; RTL requires layout-level (not just text-direction) changes | Multiple localization-industry sources, consistent | Medium-High | Figures are commonly cited ranges, not derived from a single authoritative measurement study |
| Touch target size | WCAG 2.2 minimum 24×24px; platform guidance (Apple/Material) commonly recommends 44–48px | W3C standard + platform documentation | High | None significant |
| Component-library de-defaulting | Changing only accent color is insufficient; full token review needed | Practitioner sources (shadcn-specific critiques) + this document's own synthesis | Medium-High | This is more a synthesized recommendation than a single directly-cited finding |

## Appendix B — Assumptions Made

1. This guide assumes the reading agent has no prior context and must be able to act on the file alone — so definitions and cross-references are repeated rather than assumed known.
2. Numeric defaults throughout (spacing steps, type-scale ratios, motion durations, breakpoint widths, metric-count ceilings) are presented as starting ranges from cited sources, not hard requirements, per the Evidence Hierarchy — this is a deliberate editorial choice given how much these numbers vary by source and by product.
3. The repository this guide was written for (`jmoloney232/not_vibe_coding`) contains no existing code, framework choice, or design system at the time of writing — so §5's "scale to project size" guidance and §16's "inspect existing patterns" stage will be the first thing a future agent actually exercises against real content.
4. Where a source's claim could not be verified by direct page fetch (several target sites returned HTTP 403 to automated fetching during this research), the claim is retained only when corroborated by a second, independently reachable source, and is flagged in Appendix A rather than presented as directly verified.

## Appendix C — Unresolved Questions

- No first-party user research, analytics, or support-ticket data exists for any concrete product yet (there is no shipped product in this repository) — every product-specificity rule in §3–§4 is therefore a general heuristic until applied to and validated against a real product with real users.
- Exact numeric thresholds (dashboard metric ceilings, skeleton-loader delay cutoff, animation duration ranges) vary meaningfully across the sources reviewed; this document picked representative ranges and labeled them as defaults, but a future agent applying this guide to a specific product should validate against that product's own analytics where available, rather than treating these numbers as fixed.
- Several primary-source articles central to current "vibe coding" discourse (thecrit.co, superdesign.dev, developersdigest.tech, freedesignmd.com, jackpearce.co.uk, thefountaininstitute.com) blocked direct automated fetching (HTTP 403) during this research session; their content was accessed only through search-engine result summaries, which is a shallower form of evidence than a full-text read. The conclusions drawn from them are corroborated across multiple independent summaries but were not independently verified word-for-word against the original text.
- This guide has not been simulated against a fourth product category beyond the three required in Appendix D, nor validated by an actual independent human design reviewer. An independent AI review pass (Appendix E) has been completed and its findings integrated — treat that as heuristic review by a second model context, which caught real defects (a numbering bug, an overstated WCAG level, several unhedged claims) a same-author self-check missed, but it is still not equivalent to human user validation or a human design reviewer's judgment.

## Appendix D — Practical Simulation Report

**1. Marketing website (e.g., a B2B SaaS landing page).** Walking through §3's brief and §4's catalog against a typical generated marketing page surfaces: an unjustified hero gradient (§4/§8 — apply the Gradient Justification Test), a three-column generic feature grid (§4 — replace with real product screenshots, lead with the problem before features), fabricated testimonials/logos (§10 — remove or replace with real, cleared content), and identical section rhythm (§4/§5 — vary emphasis by section importance). The guide's marketing-specific allowances (§6, §7 — more generous spacing and larger type scale jumps are acceptable here) prevented over-applying application-density rules to a page whose job is persuasion, not repeated task completion. No significant gaps found; §6's guidance to still vary rhythm by content importance was the most load-bearing rule for this case.

**2. Dense SaaS / internal web application.** Walking through the same catalog against a data-heavy internal tool instead surfaces different priorities: §3's density table correctly steers toward high information density and minimal motion; §6's dashboard/metric-value test is the most load-bearing check (catching decorative KPI tiles); §9's full state-completeness table matters far more here than for a marketing page, since this is a repeatedly-used tool where missing error/empty states compound over time; §11's responsive guidance (especially table/toolbar strategies) becomes central where it was marginal for the marketing case. One ambiguity surfaced: §6 recommends centered/constrained layouts mainly for marketing/reading contexts, but internal apps commonly have settings/detail sub-views that legitimately want a constrained width even inside a full-width app shell — this is addressed by the explicit EXCEPTION already present in §6's "Centered application layouts" entry and the "Detail views/Settings screens" row, so no revision was needed, but a future agent should confirm this nuance isn't missed by pattern-matching only the summary rule.

**3. Content-heavy / data-heavy product (e.g., a documentation site with an embedded analytics dashboard).** This case exercises both extremes in one product — §7's typography rules (line length, reading-optimized line height) apply to the documentation surface, while §6's dashboard rules and §9's chart/table state requirements apply to the analytics surface within the same product. The guide handles this by making rules context-scoped (per §3's product-type table and per-component in §9) rather than global, which worked without contradiction. The one gap identified: the guide does not explicitly discuss how to keep *visual consistency* (§5's Controlled Variety) across two sub-experiences with legitimately different density needs within one product — this is implicitly covered by "vary by content importance, not arbitrary decoration" but could be stated more explicitly in a future revision. Documented here rather than silently left unaddressed.

## Appendix E — Adversarial / Independent Review Report

An independent review was commissioned from a separate agent context (general-purpose subagent, no access to this document's drafting rationale — only the finished text, per Governing Principle 9/§0 Independent Review). It read the document cold and produced 25 numbered findings plus a fact-check of several specific technical claims and an overall verdict. Below: each finding, and its disposition. "Integrated" means the document was edited in response; "Not adopted" states the reason.

**Unsupported claims**
1. Unattributed "statistical average of ten thousand interfaces" quote in §1 read as a precise citation without a traceable single source. **Integrated** — reworded as an explicit paraphrase with an inline evidence-tier tag (author/community opinion), quote marks removed.
2. "Wallpaper... within roughly two weeks" (§4.3) stated as flat fact in body text, with the real hedge buried three sections away in Appendix A. **Integrated** — added the hedge inline, next to the claim, not only in the appendix.
3. arXiv citation (§25) attributed a precise "1,154 developer posts" figure with more confidence than the underlying access method (search-synthesis, not full-text fetch) supports. **Integrated** — removed the specific count from the citation and added an explicit note that figures attributed to that paper came from secondhand search synthesis, not a verified full-text read.
4. Material dark-mode elevation described as "roughly 4–5 discrete steps," overstating precision versus Material's actual continuous overlay-opacity formula. **Integrated** — corrected in §8 and the source ledger to describe it as a continuous, formula-based approach, with the "few practical stops" framing presented explicitly as this document's own simplification for token systems, not Material's spec.

**Rules that were overly rigid**
5. Priority order's "never trade a higher item for a lower one" read as an absolute veto forbidding any minor tradeoff. **Integrated** — reworded to "a lower tier cannot justify failing a higher one," with an explicit carve-out that the ordering governs genuine tension, not every micro-tradeoff.
6. Absolute "never use emoji as functional UI icons" ignored real, successful product-authored emoji iconography (e.g., Notion page icons, Slack statuses). **Integrated** — downgraded to AVOID-with-exception, consistent with how §4 treats gradients/glassmorphism/radius elsewhere: the failure is unexamined default use, not the pattern itself.

**Missing production concerns**
7. No coverage of security-adjacent UI concerns (XSS-safe rendering of user content, autofill attributes, paste sanitization). **Integrated** — added to §9.
8. No SEO/metadata guidance despite substantial marketing-page coverage. **Integrated** — added to §6's marketing-pages guidance.
9. No cross-browser/progressive-enhancement checks in §17's inspection list. **Integrated** — added two checklist items.
10. No mention of error monitoring/crash reporting or automated visual-regression testing as a way to lock in manual review findings over time. **Integrated** — added a "Locking in quality over time" note to §14, framed as MAY (not required for a single piece of work, but a gap worth flagging on an ongoing product).

**Contradictions**
11. Two separately-numbered lists in §0 (the 8-item priority order and the 9-item bolded principles) both had an "item 7," and every in-document citation of "Governing Principle 7" meant the second list — a real risk of a reader resolving the wrong one. **Integrated** — the priority-order list now uses Tier A–H (letters) instead of numbers, so only one numbered list exists in §0 and all "Governing Principle N" citations resolve unambiguously.
12. §4.1's centered-layout AVOID is easy to over-apply against §6's own legitimate exceptions for settings/detail views (this risk was actually first surfaced by this document's own Appendix D dogfooding notes, before the independent review flagged it too). **Integrated** — strengthened the exception note in §4.1 to explicitly flag that a narrow settings/detail page is very likely the legitimate case, not the failure, before the pattern is flagged.

**Redundancy**
13. The Gradient Justification Test was defined near-verbatim in three places. **Integrated** — §8 is now the canonical definition; §4.2 and §19 reference it rather than restating its wording.
14. All ~28 §4 catalog entries use one uniform template regardless of severity, which the reviewer read as the document itself exhibiting the "identical section rhythm" pattern it warns against. **Not adopted as a structural change, but acknowledged inline** — the task this document was written to satisfy explicitly specifies this exact seven-field structure for every catalog entry, for machine-scannability across a reference catalog (a different context than a designed page's narrative rhythm, where the same uniformity is a real defect). Restructuring by severity would trade searchability for a distinction §21's Severity Framework already handles per actual instance found. Added an explicit note in §4's intro distinguishing "catalog structure, meant to be uniform" from "page rhythm, meant to vary by importance" so a reading agent doesn't conflate the two.

**Advice that could optimize appearance over usability**
15. §20's rubric only rewards top marks for maximal distinctiveness, risking novelty-chasing to defeat the Product/Copy Swap Tests rather than genuine product fit. **Integrated** — added a caveat directly under the rubric's interpretation bands, tying back to Priority Tier H (decorative refinement/novelty is lowest priority) and explicitly warning against adding anything whose only justification is defeating a swap test.
16. §13's six motion-purpose categories are broad enough to rationalize almost any animation post hoc, satisfying the rule's letter while missing its intent. **Integrated** — added a paragraph requiring the §2 removal test as the actual check, not just naming a purpose category.

**Requirements not actually testable by an AI agent alone**
17. Several §12 rows specify "manual with a screen reader" with no guidance on what a good-faith partial check looks like for an agent that has no literal screen reader or human tester. **Integrated** — added an explicit sub-section to §12 distinguishing the best-available-alone method (accessibility-tree/automated-tool inspection, full keyboard-only passes — genuinely achievable, not an approximation) from full verification with real assistive technology, and requiring that gap be stated explicitly rather than papered over.
18. The Memory Test cannot be meaningfully self-administered (an agent has no memory decay to simulate). **Integrated** — added a caveat directly after §19's table flagging this as the one test in the list requiring a genuinely separate party, not a mechanical self-check.

**Subjective taste presented as fact**
19. The proximity/spacing rule was credited as "responsible for most of what reads as organized vs. scattered," overstating one Gestalt principle among several comparable ones (alignment, repetition, contrast). **Integrated** — reworded to name proximity as one of several contributing Gestalt principles rather than the dominant cause.
20. The uppercase-reduces-reading-speed claim in §7 lacked an evidence-tier tag, inconsistent with the table immediately above it. **Integrated** — added an explicit context-dependent-heuristic tag and softened "removes... cues" to "plausibly because."

**Loopholes**
21. The EXCEPTION mechanism has no cap on frequency, so an agent under time pressure could document every violated rule as an EXCEPTION and technically satisfy §22 while shipping something just as generic as before. **Integrated** — added an explicit "exception-laundering" warning to §22, naming a high exception-to-rules-followed ratio as itself a finding, and requiring the self-critique loop (§18) to ask about it directly.
22. §20's rubric is self-graded by construction, and the "Independent review" principle was only a soft SHOULD ("where feasible") that's trivially waived. **Integrated** — strengthened Governing Principle 9's wording (self-review MUST be labeled as such, not presented at the same confidence as independent confirmation; "where feasible" narrowed to mean genuinely unavailable, not just avoidable) and added a matching "self-graded confidence" warning to §22.

**Does the document itself read as generic/AI-generated**
23. The uniform §4 template read, on its own, as an instance of the anti-pattern it names. **Same disposition as finding 14** — addressed by an explicit clarifying note rather than a restructure, for the reasons given there.
24. Repeated stock hedge phrases ("not a hard rule for every context," "illustrative, not load-bearing," etc.) recur near-verbatim across the document. **Acknowledged, not fully rewritten.** A pass to vary this phrasing throughout a 1,200+ line, no-prior-context reference document would cost more editing risk (introducing new inconsistencies or losing precision) than it would gain in prose variety, given the document's explicit design goal of being usable by an agent that reads only the section it needs, not the whole file end to end. This is a real, acknowledged stylistic weakness, not a dismissed one.
25. Appendix F (this document grading itself against its own gate list, "Pass" on most items) is a same-author self-check — exactly the weaker-evidence pattern Governing Principle 3/9 warn against, applied to itself. **Already partially addressed before this review landed** (Appendix F's items were changed to "provisional pass, pending Appendix E" during drafting, precisely to avoid presenting a self-certification as final) **and further integrated now**: Appendix F below is updated to explicitly resolve those provisional items based on this completed review, rather than leaving them open indefinitely — since an independent review has now actually run, the provisional caveat can be lifted for the items it covered, but the self-graded/independent-review distinction from finding 22 still applies to the rest of Appendix F's self-assessment.

**Fact-check corrections**
- WCAG 2.2 contrast (4.5:1/3:1) and target-size (24×24px min, 44×44 convention) figures confirmed correct by the reviewer — no change needed.
- Material `#121212` dark-theme base confirmed correct — no change needed.
- **Focus Appearance's specific numeric thresholds are an AAA-level success criterion, not AA** — this document had cited it as a blanket MUST alongside genuinely-AA requirements without noting the level difference. **Integrated** — corrected in three places (§5's token table, §8's Focus role, §12's Focus-visible-treatment row) to correctly separate the AA-level "visible and not obscured" requirement from the AAA-level specific size/contrast thresholds, recommending the latter as a SHOULD rather than presenting it as a universal AA MUST.
- The general shape of the AI-slop/vibe-coding discourse (purple gradients, Inter font, card grids, shadcn defaults as recognizable "tells") was assessed as plausible and consistent with real commentary — no change needed beyond the specific quote/count corrections in findings 1 and 3 above.

**Overall verdict, and this document's response to it.** The reviewer's central risk claim was that this document's own escape hatches (EXCEPTION, self-assessed Evidence Hierarchy tags, a self-graded rubric) are wide enough for an agent under deadline pressure to satisfy the letter of nearly every rule while shipping something just as generic as before, and that several "verification" steps ask for confidence levels an AI-alone agent cannot actually produce. Both points are accepted as correct and are why findings 17, 18, 21, and 22 above were integrated as substantive additions rather than minor wording fixes — they are the four changes in this revision most directly aimed at closing that gap, not merely acknowledging it. This document does not claim the gap is now fully closed: a determined or careless agent can still satisfy any written rule in bad faith, the same way any checklist can be gamed by whoever is filling it out. What changed is that doing so now requires ignoring explicit, adjacent warnings that name the exact gaming pattern, rather than a genuine ambiguity in the rule.

## Appendix F — Must-Pass Gate Report (for this document itself)

Applying Governing Principle 7's gate list to the guide's own usability as a document (not to a shipped product, since none exists yet in this repository):

- Primary "workflow" (an agent using this file to build/review a UI) is completable: the file provides a brief template, a pattern catalog, a workflow, diagnostics, and a checklist in logical order. **Pass** — the independent reviewer (Appendix E) used the document this way (section-by-section, cold) and did not report it as unusable; its "usable as-is?" verdict was qualified (see below), not a fail.
- No fabricated claims presented as fact: numeric claims are sourced or explicitly labeled as defaults/ranges. **Pass, with corrections applied** — the independent review found four specific instances of overstated precision/attribution (Appendix E findings 1–4); all four are now corrected in the document body, not just noted here.
- Internal consistency: no MUST/SHOULD/AVOID rule found to directly contradict another. **Pass, with one real bug found and fixed** — the independent review caught a genuine numbering collision between two numbered lists in §0 (finding 11), which a same-author self-check had missed entirely. This is direct evidence for why Governing Principle 9 (independent review) exists: this specific defect was invisible from inside the drafting process and visible immediately to a fresh reader.
- Searchability/structure: numbered sections, consistent heading names, tables for scanability. **Pass** (confirmed by the independent reviewer's own ability to locate and quote specific fragments by section).
- Remaining uncertainty documented rather than hidden: Appendix C. **Pass.**

This is still, in the end, a self-assessment written by the same overall process that authored the document and the fixes — Appendix E's review was independent, but the disposition and integration of its findings, and this gate report itself, were not separately re-reviewed after the fact. Per Governing Principle 3/9 and §22's note on self-graded confidence, label this Appendix F as **self-assessed following one completed independent review**, not as independently re-confirmed after edits. The reviewer's own overall verdict (quoted in full at the end of Appendix E) is the more skeptical, arm's-length read of this document's remaining risk — it should be weighed at least as heavily as this appendix's "Pass" lines. None of this certifies that any future UI built using this guide will automatically pass these gates — that determination has to be made per-product, using Governing Principle 7 / §22 directly.

## Appendix G — Change Summary

- Created `ANTI_VIBE_CODING_UI.md` at the repository root (no pre-existing equivalent file, design documentation, or agent-instruction file existed in this repository).
- Structured per the requested 24 main sections (now 25, after adding a Performance and Perceived Quality section — see below) plus a governing-principles preface (§0) and seven lettered appendices (source ledger folded into §25; Appendices A–F as required verification artifacts).
- Incorporated ~50 distinct external sources spanning W3C/WCAG standards, established design systems (Material, Carbon, Radix, Primer), Nielsen Norman Group research, and independent practitioner/critique writing on AI-generated interfaces, cross-checked against each other where they overlapped.
- Simulated the guide against the three required project types (Appendix D) and documented one identified gap (explicit cross-density consistency guidance) as a noted limitation rather than silently patching it into vagueness.
- Commissioned and completed an independent adversarial review pass from a separate agent context (Appendix E). Two gaps caught by the reviewer were self-identified and fixed by the author before that review returned (a fabricated "review complete" appendix caught and corrected mid-draft; a missing standalone Performance section added as new §14, requiring §14–§24 to be renumbered to §15–§25); 25 further findings came from the independent pass itself, of which 20 were integrated as direct edits (new content, corrected figures, reworded rules, a structural fix to a numbering collision in §0), 1 was addressed via a different mechanism than the reviewer suggested (§4's catalog uniformity, resolved with a clarifying note rather than a restructure, for a stated reason), and 1 was acknowledged without a code change (repeated hedge-phrase register, §25/Appendix E finding 24) because fixing it carried more risk than benefit for this document's stated use case. Full disposition of every finding is in Appendix E.
- The independent review's fact-check also caught one real factual overstatement carried from the initial draft — WCAG 2.2's Focus Appearance numeric thresholds cited as if AA-level when they are AAA-level — corrected in three locations.
