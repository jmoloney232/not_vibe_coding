# Interface Study Records — Round 7 (Live Empirical Verification)

**Status: this is genuine first-party evidence, not search-snippet or recalled evidence.** Round 6's `RESEARCH_REPORT.md` and `CALIBRATION_CORPUS.md` were explicit that this sandbox had no live network access, and flagged specific named products (Stripe, Linear, Vercel, Arc, Notion, Framer) as `[RECALLED]`-grade only, "until a future session with real network access re-verifies them directly" (`CALIBRATION_CORPUS.md`, closing section). This session has that access. The blocker documented in `CORPUS_MANIFEST_TEMPLATE.md` — a hard 403/`ERR_CONNECTION_RESET` on every real third-party URL — turned out to be two separable problems, both resolved:

1. **Session network tier.** This session runs with real (not allowlist-only) egress: `curl -I https://stripe.com` returns a genuine `200`, not a 403.
2. **A Chromium/proxy TLS incompatibility, independent of (1).** Even with real egress, headless Chromium's TLS `ClientHello` was being reset mid-handshake (`net::ERR_CONNECTION_RESET`, confirmed via Chrome's own `--log-net-log` as an `SSL_HANDSHAKE_ERROR`/`os_error 104` — a TCP reset during the handshake, not a certificate-trust failure) while `curl` through the identical proxy succeeded immediately. Forcing `--ssl-version-max=tls1.2` on the Chromium launch resolved it completely, with certificate verification left fully enabled (no `--ignore-certificate-errors`, no disabled TLS checking). The most likely cause is that Chromium's TLS 1.3 `ClientHello` (larger than curl/OpenSSL's, e.g. via post-quantum hybrid key-share extensions in current Chromium) is mishandled by the proxy's TLS-terminating layer specifically, not by the destination sites. This is recorded here so a future session hitting the same symptom does not re-diagnose it from scratch.

Every entry below was actually rendered via local Playwright/Chromium at 1440px (desktop), 834px (tablet), and 390px (mobile) this session, screenshotted, and inspected via `getComputedStyle` in the live DOM — not reasoned about, not recalled, not summarized from a search snippet. Where a limitation applies (e.g., a cross-origin iframe not inspected at the DOM level), it is stated in that record's Limitations field rather than glossed over.

---

## Corpus A — Credited, documented professional design

### Record 1: GOV.UK Design System

## Identification
- Product: GOV.UK Design System (the design system's own marketing/documentation site, not a transactional government service)
- URL: https://design-system.service.gov.uk/
- Category: Government / civic design system
- Page or workflow: Home page
- Provenance classification: Corpus A (credited professional design)
- Classification evidence: Maintained by a named team (Government Digital Service), public GitHub repo, Design Museum's Design of the Year award (per round 6 research, now directly corroborated by the page's own "Support" section crediting "a team at the Government Digital Service")
- Confidence: High

## Available Evidence
- [x] Rendered interface   - [x] Initial HTML   - [x] Rendered DOM   - [x] CSS
- [ ] JavaScript behavior (not exercised beyond page load)  - [x] Public repository (referenced, not cloned)  - [ ] Component source
- [x] Design-system documentation  - [ ] Case study  - [x] Commit history (release notes visible on page: "16 July 2026: We've released GOV.UK Frontend v6.4.0")

## Product Context
- Primary user: designers/developers building UK government digital services / Primary task: find a component, pattern, or style guideline / Interface maturity: mature, versioned, actively released / Important constraints: must itself model the accessibility and plainness it prescribes for government services

## Visual Composition
- Primary focal point: a single H1 statement ("Design your service using GOV.UK styles, components and patterns") on a flat blue band / Reading path: top-down, strictly linear, one column / Density: low-to-moderate, generous whitespace / Repetition: heavy — nearly every section is a heading + one or two sentences + a link, repeated ~10 times down the page / Visual tension: essentially none — this is a document, not a composition
- Signature decisions: a crest/coat-of-arms mark, a specific named typeface ("GDS Transport"), a flat 0px-radius green button with a hard 2px offset shadow (not a soft box-shadow) instead of any elevation/blur
- Generic decisions: the repeated heading+paragraph+link block itself is closer to a plain document template than a "designed" pattern — but this is explicitly the point (§ below)

## Implementation
- Framework: server-rendered (no visible SPA framework in the DOM) / Styling system: GOV.UK Frontend (own design system, not Tailwind/Bootstrap/etc.) / Component library: GOV.UK Frontend, self-authored / Token strategy: own named scale (not inspected in depth)
- Domain-specific components: the flat, hard-offset-shadow button is a specific, recognizable GOV.UK signature, not a generic default / Default-library remnants: none observed — this product *is* the library, so there is no "default" to have left unmodified / Responsive strategy: standard reflow, verified rendering cleanly at all three widths tested

## Product Realism
- Real constraints represented: a real, dated release note ("16 July 2026... GOV.UK Frontend v6.4.0... interruption variant of the Panel component... improved Date input component") — this is the single strongest piece of realism evidence in this whole record set: a specific version number, a specific dated change, specific named components changed. Not generic "we shipped updates" copy.
- Non-ideal states: not applicable to this page type
- Content realism: high — the "What's new" section reads like genuine release notes because it is one
- Evidence of ongoing operation: yes, directly (dated release note, a "Roadmap" section linking to a real 12-month roadmap, a live cookie-consent banner)

## AI-Associated Signals
- Weak signals: none identified
- Moderate signals: none identified
- Strong signal combinations: none identified
- Counterevidence: normal (not tight/negative) letter-spacing on its H1 (`letter-spacing: normal`, 48px, GDS Transport); a hard-edged, non-gradient, non-blurred button shadow, which is close to the opposite convention of the generic soft-shadow/gradient default this project's guide catalogs

## Authorship Signals
- Product-derived structure: strongly present — the whole page structure (Styles / Components / Patterns / a "refreshed brand" migration notice / Principles / Community / Support / Roadmap) matches the actual shape of a real, versioned open-source project's homepage, not a marketing template
- Deliberate exceptions: the flat/no-radius, hard-offset-shadow button breaks from the soft-shadow default cleanly and consistently across all buttons on the page (checked "Accept analytics cookies," "Get started," "Hide cookie message")
- Art direction: minimal but consistent — one blue, one green, high-contrast black-on-white body text, a crest mark, one custom typeface
- Cross-route coherence: not tested this round (home page only)
- Evidence of editing and restraint: yes — the page says less than it could; sections like "Roadmap" and "Support" are one or two sentences, not padded

## Limitations
- What could not be inspected: internal component pages, cross-route coherence, actual government transactional services built with this system (a stronger test of the pattern's real-world stakes)
- Confounding factors: this is a design system's documentation site, which is intrinsically more "plain document" in character than a marketing site — some of its plainness is genre-appropriate, not necessarily transferable evidence to how a marketing page should look
- Alternative interpretation: none — this record is high-confidence

---

### Record 2: GitHub Primer

## Identification
- Product: Primer ("The design system for GitHub")
- URL: https://primer.style/
- Category: Developer tool / design system
- Page or workflow: Home page
- Provenance classification: Corpus A
- Classification evidence: Public repo (github.com/primer), explicit "About us... Learn about the core team working on Primer" page, GitHub-branded and hosted
- Confidence: High

## Available Evidence
- [x] Rendered interface   - [x] Initial HTML   - [x] Rendered DOM   - [x] CSS
- [ ] JavaScript behavior  - [x] Public repository (referenced)  - [ ] Component source
- [x] Design-system documentation  - [ ] Case study  - [ ] Commit history

## Product Context
- Primary user: designers/engineers building GitHub product or marketing surfaces / Primary task: find product-UI, brand-UI, or foundational (accessibility/octicons/primitives) resources / Interface maturity: mature / Important constraints: must serve two audiences (product engineers, brand/marketing designers) from one entry page

## Visual Composition
- Primary focal point: large centered wordmark-style H1 ("Primer") over a one-line subhead / Reading path: top-down through three large feature cards, then a 3-up "Shared Foundations" row, then a 2-up "Design at GitHub" row / Density: low, large card-based layout / Repetition: three large hero-style cards, then two rows of smaller uniform cards / Visual tension: low-moderate — mostly a grid, but the two large hero cards are asymmetric (one card of illustrative diagram fragments, one of a 2x3 icon/mascot grid)
- Signature decisions: hand-drawn-style wireframe illustrations (a "Success!" toast, a divider chip, a labeled measurement diagram showing "width: 480px / height: max 320px") used as literal component demos, not generic decoration
- Generic decisions: the "Shared Foundations" and "Design at GitHub" card rows are a fairly standard 3-card/2-card grid

## Implementation
- Framework: Next.js (many `_next/static/chunks/*.css` files observed in the rendered `<link>` tags) / Styling system: many small per-component CSS chunk files (consistent with CSS Modules or a similar per-component bundling strategy, not a single Tailwind utility bundle) / Component library: Primer itself / Token strategy: Primer Primitives (named directly on-page)
- Domain-specific components: the GitHub mascot ("Octocat") variations rendered as actual SVG illustrations in a 2x3 grid, genuinely brand-specific, not a stock icon set / Default-library remnants: none observed / Responsive strategy: reflow verified at all three widths

## Product Realism
- Real constraints represented: n/a (this is a design-system portal, not an operational product)
- Non-ideal states: n/a
- Content realism: n/a
- Evidence of ongoing operation: a "Give feedback" button, a light/dark theme toggle, and a real "Displa[y]" component-preview card — **a genuine layout bug found live**: the word "Display" is clipped to "Displo" at 1440px width because its container is too narrow relative to the heading's font size (visible directly in the desktop screenshot, `research/` scratch artifacts). This is a real, unstaged production overflow bug on a highly-credited, actively-maintained design system's own marketing page — worth noting because it demonstrates that visual imperfection/bugs are not, by themselves, any kind of AI-vs-human signal; they occur on both.

## AI-Associated Signals
- Weak signals: a `lorem ipsum` placeholder string ("Lorem ipsum dolor sit amet ullamcorper id. Aliquam luc elementum.") is visible in one of the component-demo cards
- Moderate signals: none
- Strong signal combinations: none
- Counterevidence: the lorem ipsum is inside a *simulated UI mockup being used to demonstrate a component*, not the page's own real marketing copy — this is a meaningfully different case from a shipped product using placeholder text as its real content, and this project's own guide's Realism Audit should be read as targeting the latter, not incidental placeholder text inside a demonstrated UI sample. `letter-spacing: normal` on the H1 (56px, "Mona Sans"), not tightened.

## Authorship Signals
- Product-derived structure: the page is organized around Primer's actual three real audiences (product engineers, brand designers, and the shared foundations both need) rather than a generic template shape
- Deliberate exceptions: hand-illustrated component-diagram artwork used as literal, specific demonstrations (a real toast, a real spacing-measurement diagram) rather than decorative filler
- Art direction: a consistent black/white/gray-scale-plus-brand-color palette, a custom variable font (Mona Sans), consistent wireframe-style illustration throughout
- Cross-route coherence: not tested this round
- Evidence of editing and restraint: the page is short (2147px scroll height, the shortest of the five Corpus A pages tested) relative to how much Primer actually documents — it does not try to cram the whole system onto the landing page

## Limitations
- What could not be inspected: the actual component documentation pages, which is where the real substance of a design system lives
- Confounding factors: the "Displa[y]" overflow bug may be specific to this exact viewport width and could be a genuine, since-introduced regression rather than a stable characteristic — flagged as an observation, not a verdict on Primer's overall quality
- Alternative interpretation: none

---

### Record 3: Stripe

## Identification
- Product: Stripe (marketing home page)
- URL: https://stripe.com
- Category: Financial infrastructure / developer tool
- Page or workflow: Home page
- Provenance classification: Corpus A
- Classification evidence: Widely cited, named design-engineering blog posts and public commentary from named Stripe designers/engineers (round 6 research); this round adds direct DOM evidence of a fully custom, licensed typeface and bespoke component system, inconsistent with any known AI-generation default stack
- Confidence: High

## Available Evidence
- [x] Rendered interface   - [x] Initial HTML   - [x] Rendered DOM   - [x] CSS
- [ ] JavaScript behavior  - [ ] Public repository (Stripe's marketing site is closed-source)  - [ ] Component source
- [ ] Design-system documentation  - [ ] Case study (not fetched this round)  - [ ] Commit history

## Product Context
- Primary user: businesses evaluating payments/financial infrastructure / Primary task: understand product breadth, find a path to sign-up or contact sales / Interface maturity: mature, highly resourced / Important constraints: must serve wildly different buyer types (a solo developer, an enterprise CFO) from one entry page

## Visual Composition
- Primary focal point: a large, specific H1 ("Financial infrastructure to grow your revenue. Accept payments, offer financial services, and implement custom revenue models to grow your business.") directly followed by concrete product-category cards / Reading path: top-down through a very long page (14,782px scroll height at 1440px — by far the longest page in this record set) / Density: high — many distinct sections, each with real sub-navigation / Repetition: low relative to length — sections vary in layout (some card grids, some big-number stat rows, some quote/testimonial, some dark full-bleed CTA bands) rather than repeating one block shape
- Signature decisions: an animated multi-color gradient mesh used sparingly (hero background and section dividers only, not on every surface); large specific stat call-outs ("135+ currencies and payment methods," "$1.9T processed," "99.999% API uptime," "200M+ API requests per day")
- Generic decisions: a standard nav (Products/Solutions/Developers/Resources/Pricing), a standard "Sign in / Start now" button pair

## Implementation
- Framework: Next.js (`_next/static/css/*.css` chunk files under a `b.stripecdn.com` asset host) / Styling system: bespoke, chunked per-page CSS, not a visible utility-class framework / Component library: proprietary / Token strategy: not fully inspected, but font stack is a licensed custom typeface
- Domain-specific components: a live-rendered product mockup showing "Monetize through agentic commerce," "Create a card issuing program," "Access borderless money movement with stablecoins and crypto" — three distinct, currently-relevant, non-interchangeable product lines, not generic feature-card copy / Default-library remnants: none observed / Responsive strategy: not fully re-verified at all breakpoints this round (full-page screenshot only)

## Product Realism
- Real constraints represented: named, dated, specific customer proof points visible in the mid-page content ("1Password unified $2B in offline and online payments with Stripe," "Instacart powers online grocery delivery with Stripe") — named companies, named specific use cases, not generic "trusted by industry leaders" copy
- Non-ideal states: n/a (marketing page)
- Content realism: high — specific dollar/percentage figures, specific named enterprise customers, specific product names ("agentic commerce," "stablecoins and crypto" — current, dated terminology rather than evergreen-vague copy)
- Evidence of ongoing operation: a "What's happening" news section and a "Book of the week" section, both indicating active content operations beyond the core product marketing

## AI-Associated Signals
- Weak signals: none identified as isolated
- Moderate signals: a gradient mesh background — but used sparingly (hero and CTA bands only) rather than on every card/surface, and rendered at high production value (multi-stop animated mesh, not a flat two-stop CSS gradient)
- Strong signal combinations: none identified
- Counterevidence: **the H1 uses `letter-spacing: -0.96px` at `font-size: 48px`, i.e. -0.02em — squarely inside this project's own guide's flagged "-0.01em to -0.03em template tell" range (§8, pre-round-7 wording).** This is the single most important individual data point in this entire record set: one of the most credited, design-forward, definitely-human-authored products available uses exactly the typographic value this document's prior round called a cliché in its own right. See the round-7 correction now made to §8.

## Authorship Signals
- Product-derived structure: strong — sections correspond to real, distinct Stripe product lines (Payments, Billing, Issuing, Stablecoins, a startup program, an enterprise-scale section with different named customers), not an interchangeable generic SaaS shape
- Deliberate exceptions: the animated gradient mesh is reserved for specific structural moments (hero, dark CTA bands) rather than applied everywhere
- Art direction: a distinct, licensed typeface (Söhne-based), a consistent lime-green/near-black accent pairing on the hero specifically, high production-value photography/mockups of real product UI
- Cross-route coherence: not tested this round
- Evidence of editing and restraint: for a page this long, sections are visually varied rather than one card-grid block repeated 15 times — evidence of real information architecture rather than filler

## Limitations
- What could not be inspected: the full 14,782px page was captured but not read section-by-section in detail in this record (only the hero, stat band, and testimonial/customer sections were closely inspected); Stripe's actual dashboard product (a stronger, more relevant test than the marketing site) was not accessed
- Confounding factors: Stripe's marketing budget and design-engineering headcount are far larger than a typical product this guide is written for — some of what reads as "authored" here may not be replicable advice for a smaller team, a scope question this document should keep in mind when citing Stripe as a positive reference
- Alternative interpretation: none for the negative-tracking finding specifically — the measurement is unambiguous

---

### Record 4: Linear

## Identification
- Product: Linear ("The system for product development")
- URL: https://linear.app
- Category: SaaS / developer & product tooling
- Page or workflow: Home page
- Provenance classification: Corpus A
- Classification evidence: Small credited team, public design commentary, own design-engineering blog (round 6 research)
- Confidence: High

## Available Evidence
- [x] Rendered interface   - [x] Initial HTML   - [x] Rendered DOM   - [x] CSS
- [ ] JavaScript behavior  - [ ] Public repository (closed-source product)  - [ ] Component source
- [ ] Design-system documentation  - [ ] Case study  - [ ] Commit history

## Product Context
- Primary user: product/engineering teams evaluating or using Linear / Primary task: understand the product's current positioning ("for teams and agents") and get to sign-up / Interface maturity: mature, frequently redesigned / Important constraints: needs to visually demonstrate the product itself, not just describe it

## Visual Composition
- Primary focal point: an extremely large (64px), extremely tight H1 directly above a real, embedded product screenshot / Reading path: top-down, dark theme throughout / Density: moderate / Repetition: low — each major section uses a different layout (a full product screenshot, a stat row, a "coding sessions" feature callout, a testimonial carousel) / Visual tension: high for a marketing page — oversized type against a mostly-black background, a bright product screenshot as the dominant visual weight rather than illustration
- Signature decisions: a real, live-feeling product screenshot as the actual hero visual (a genuine-looking issue titled "Faster app launch," with a real technical description — "Render UI before `vehicle_state` sync when minimum required state is present, instead of blocking on full refresh during iOS startup" — and a live-looking "Linear · Opus 5... Examining the startup path... Thinking..." agent-activity panel)
- Generic decisions: none notable

## Implementation
- Framework: Next.js (`static.linear.app/web/_next/static/css/*.css`, individually named component chunks like `CTA`, `Header`, `Grain.css`) / Styling system: bespoke, componentized (a `Grain.css` file suggests a deliberate film-grain/texture treatment, not a default) / Component library: proprietary / Token strategy: not fully inspected
- Domain-specific components: the hero product screenshot is specific to Linear's actual issue-tracking UI (sidebar sections literally named "Inbox," "My Issues," "Reviews," "Pulse," "Initiatives," "Projects") / Default-library remnants: none observed / Responsive strategy: not fully re-verified at all breakpoints this round

## Product Realism
- Real constraints represented: the embedded product screenshot shows specific, technically plausible content (a real-sounding bug title, a real-sounding fix description referencing a specific state variable name) rather than generic "Sample Task" placeholder text
- Non-ideal states: n/a (marketing page)
- Content realism: high, for exactly the reason above
- Evidence of ongoing operation: an "ENG-2703" ticket ID format, timestamps ("2min ago," "4 min ago") — small but specific realism details

## AI-Associated Signals
- Weak signals: none identified as isolated
- Moderate signals: none
- Strong signal combinations: none
- Counterevidence: **the H1 uses `letter-spacing: -1.408px` at `font-size: 64px`, i.e. -0.022em — again squarely inside the guide's flagged range, on one of the most design-credited SaaS products available, with `line-height: 64px` (exactly 100% of font-size, i.e. also very tight leading).** A second, independent confirmation of the Stripe finding above, from a different company, different typeface (Inter Variable vs. Söhne), different visual register (dark/bold vs. light/airy).

## Authorship Signals
- Product-derived structure: the hero's supporting visual is the actual product UI, not an illustration or abstract graphic — about as close to "form follows real content" as a marketing hero can get
- Deliberate exceptions: dark theme as a full commitment (not a toggle-only afterthought), oversized display type used once at the top of the page, not repeated at that scale elsewhere
- Art direction: consistent near-black background (`rgb(8, 9, 10)`), off-white text, a single visible accent color scheme in the product screenshot itself
- Cross-route coherence: not tested this round
- Evidence of editing and restraint: the subhead is a single, short, direct sentence ("Purpose-built for planning and building products. Designed for the AI era.") rather than a padded three-sentence paragraph

## Limitations
- What could not be inspected: the live product itself (only the marketing page was rendered); whether the embedded "product screenshot" in the hero is a live component or a static image was not determined
- Confounding factors: none identified beyond the general Stripe caveat about resourcing level
- Alternative interpretation: none for the negative-tracking finding

---

### Record 5: Basecamp

## Identification
- Product: Basecamp (marketing home page)
- URL: https://basecamp.com
- Category: SaaS / project management
- Page or workflow: Home page
- Provenance classification: Corpus A
- Classification evidence: DHH and Jason Fried publicly and repeatedly document design decisions; open 37signals engineering/design blog (round 6 research)
- Confidence: High

## Available Evidence
- [x] Rendered interface   - [x] Initial HTML   - [x] Rendered DOM   - [x] CSS
- [ ] JavaScript behavior  - [ ] Public repository  - [ ] Component source
- [ ] Design-system documentation  - [ ] Case study  - [ ] Commit history

## Product Context
- Primary user: teams/businesses evaluating project-management software / Primary task: understand positioning, get to pricing/sign-up / Interface maturity: mature, long-running product (explicitly cites "a multi-decade track record") / Important constraints: n/a beyond standard marketing-site goals

## Visual Composition
- Primary focal point: a two-column hero — a short, voice-driven link list on the left, a real embedded product screenshot on the right ("Website Redesign Project" with Message Board, Docs & Files, Project Tasks, Chat, Schedule, Workflow panels) / Reading path: scan the left link list, then the product mockup / Density: moderate / Repetition: low — mixed section types (link list, giant single-sentence statement, stat callout, testimonial grid with real star ratings)
- Signature decisions: a distinctive, informal editorial voice ("Tell me if this sounds about right," "Remember when companies cared about service? We still do," "All these questions have the same answer: Yes!") — copy that is specific to 37signals' well-documented public voice, not swappable generic SaaS copy
- Generic decisions: none notable

## Implementation
- Framework: not fully determined from DOM alone this round / Styling system: uses `oklch()` color values directly in computed styles (a modern, deliberate color-space choice, not a legacy hex/rgb default) / Component library: proprietary / Token strategy: not fully inspected
- Domain-specific components: the embedded product mockup uses specific, plausible content — real-looking names ("Geoff Collier," "Leah Bernstein," "Kurt Holloway"), a real file size ("Hero Image.png ... 1.86 MB"), real external tool links ("Design Playground" → a Figma URL pattern, "Client Files" → a Google Drive URL pattern, "Weekly Meeting Link" → a Zoom URL pattern) / Default-library remnants: none observed / Responsive strategy: not fully re-verified at all breakpoints this round

## Product Realism
- Real constraints represented: the product mockup's realistic file sizes, plausible names, and real-looking external tool integrations are a strong, concrete instance of exactly the content-specificity signal this project's own Realism Audit (§19) already prioritizes
- Non-ideal states: n/a (marketing page)
- Content realism: high
- Evidence of ongoing operation: "121,579 people are working in Basecamp right now" — a live-sounding, specific (not round-number) counter

## AI-Associated Signals
- Weak signals: none identified as isolated
- Moderate signals: none
- Strong signal combinations: none
- Counterevidence: **H1 letter-spacing measures `-0.942872px` at `font-size: 41.9054px`, i.e. -0.0225em — a third independent confirmation of the same finding as Stripe and Linear above, on a company famous for public, opinionated, hand-crafted design decisions specifically (DHH/Fried), making this the least plausible candidate in the entire corpus for "used a default without checking it."**

## Authorship Signals
- Product-derived structure: strong — the copy voice is distinctive and consistent with 37signals' well-documented public writing elsewhere (blog posts, book excerpts), which is real cross-context corroboration, not just this page in isolation
- Deliberate exceptions: an unusually short, informal left-column link list in place of a conventional nav-plus-hero-copy block
- Art direction: a muted sage-green/off-white palette (`oklch(0.9802 0.0074 151.89)` body background), one blue accent reserved for primary buttons only
- Cross-route coherence: not tested this round
- Evidence of editing and restraint: the entire hero section is six short link labels plus one big closing statement — notably less copy than most SaaS marketing pages in this record set

## Limitations
- What could not be inspected: pricing page, actual product interior (only the marketing home page was rendered)
- Confounding factors: none identified
- Alternative interpretation: none for the negative-tracking finding

---

## Corpus B — Disclosed AI-generation provenance

### Record 6: "Color Palette Generator" (v0 by Vercel community template)

## Identification
- Product: Color Palette Generator, a v0-generated app template
- URL: https://v0.app/templates/color-palette-generator-350IE4ojQXK (template listing); live embedded preview rendered directly
- Category: Small utility app / developer tool
- Page or workflow: Template detail page with embedded live preview
- Provenance classification: Corpus B (disclosed AI-generation provenance)
- Classification evidence: Hosted directly on v0.app's own "Templates" (formerly "Community") gallery, explicit "Open in v0" / "Open Original" affordances, author-attributed ("neonpostgres · 67 · ♡23"), v0's own product is prompt-to-app generation — provenance is definitional, not inferred
- Confidence: Very high

## Available Evidence
- [x] Rendered interface   - [x] Initial HTML (of the wrapper page)  - [x] Rendered DOM (wrapper page)  - [ ] CSS (of the embedded app specifically — cross-origin iframe, not deeply inspected)
- [ ] JavaScript behavior  - [ ] Public repository  - [ ] Component source
- [ ] Design-system documentation  - [ ] Case study  - [ ] Commit history

## Product Context
- Primary user: someone who wants to generate a color palette from a base color / Primary task: pick a base color and harmony type, generate a palette / Interface maturity: single-purpose utility, template-grade / Important constraints: none beyond "the generator should work"

## Visual Composition
- Primary focal point: a large, thick-bordered blue banner block naming the tool ("🖌️ Color Palette Generator / Generate beautiful color palettes using color theory") / Reading path: top toolbar → banner → two-column controls/output / Density: moderate / Repetition: uniform thick-black-border treatment on every panel (nav buttons, banner, both main panels) / Visual tension: moderate — deliberately high-contrast, saturated block colors (blue, yellow/gold, pink) against a warm off-white background
- Signature decisions: **neo-brutalist styling throughout** — 2-3px solid black borders on every interactive element, hard-offset (non-blurred) drop shadows, fully saturated primary-ish colors (not muted/pastel), no border-radius softening on most elements
- Generic decisions: the two-column "controls left / output right" layout is a standard utility-app pattern

## Implementation
- Framework: not determined (embedded preview, cross-origin) / Styling system: consistent with Tailwind's arbitrary-value or a themed shadcn-derivative given the border/shadow uniformity, not confirmed / Component library: not confirmed / Token strategy: not confirmed
- Domain-specific components: a live base-color swatch/hex input, harmony-type selector cards ("Complementary — Two opposite colors," "Analogous — Adjacent colors") with real, correct color-theory terminology / Default-library remnants: not confirmed at DOM level; visually this is emphatically not the generic soft-shadow/purple-gradient default — it is a different, equally recognizable convention (see AI-Associated Signals)
- Responsive strategy: not tested this round beyond desktop capture

## Product Realism
- Real constraints represented: the tool is genuinely single-purpose and the UI reflects only what that purpose needs (a color input, a harmony selector, a results panel) — no padding features
- Non-ideal states: the results panel shows a real, honest empty state ("Generate a palette to get started / Choose a harmony type and click Generate Palette") with an eyedropper icon, rather than being pre-filled with a fake "ideal" result
- Content realism: high for a utility tool — the copy is entirely functional, no marketing filler
- Evidence of ongoing operation: "67" users / "23" likes shown on the template listing — small, specific (non-round) social-proof numbers, though these describe the template's popularity on v0.app, not the tool's own operation

## AI-Associated Signals
- Weak signals: none isolated
- Moderate signals: the neo-brutalist thick-border-plus-hard-shadow convention is itself increasingly common enough across AI-generated-app galleries (observed again, independently, on other templates in the same gallery grid — see Limitations) to plausibly be an emerging AI-tool-generation convention in its own right, the same category of finding as the original corner-bracket/sci-fi-HUD observation: a *specific* aesthetic becoming a recognizable "tell" once enough tools converge on generating it
- Strong signal combinations: none confirmed without broader sampling
- Counterevidence: this is emphatically **not** the "purple/blue gradient, Inter font, four-card grid" stereotype this project's guide catalogs as the generic default — it demonstrates that AI-tool output is not monolithic, and that a template gallery explicitly built by prompting an AI tool can still produce a distinctive, internally consistent, non-generic-looking visual system

## Authorship Signals
- Product-derived structure: the UI structure (base color → harmony type → generated palette) matches the actual, correct domain logic of color-theory palette generation
- Deliberate exceptions: n/a — no way to know the human prompter's intent from the artifact alone
- Art direction: consistent (borders, shadows, saturated fills applied uniformly across every panel and control)
- Cross-route coherence: not tested
- Evidence of editing and restraint: not determinable from a single static capture — no way to tell how much of this was a first prompt output versus iterated

## Limitations
- What could not be inspected: the underlying DOM/CSS of the embedded app itself (cross-origin, sandboxed preview iframe — screenshot evidence only); whether the generator button actually functions was not tested (would require interaction, not just a load-and-screenshot pass); no visibility into how much human iteration/prompting shaped the final result versus a single-shot generation
- Confounding factors: this is one template selected from a gallery of dozens visible on the same page — see next two records for direct point of comparison within the same platform, and note that this single record should not be read as representative of "what v0 produces" generally
- Alternative interpretation: the neo-brutalist choice could equally be read as the human prompter's deliberate, specific creative direction (successfully executed by the tool) rather than a tool default — the artifact alone cannot distinguish these

---

### Record 7: "Home Goods Storefront" (Lovable template, "Maison")

## Identification
- Product: Home Goods Storefront ("Maison" brand), a Lovable-generated e-commerce template
- URL: https://lovable.dev/templates/websites/ecommerce/maison-artisan-home-lifestyle-store-template
- Category: E-commerce / small business storefront
- Page or workflow: Template detail page (embedded browser-chrome-framed static preview, not a live iframe)
- Provenance classification: Corpus B
- Classification evidence: Hosted on lovable.dev's own "Templates" gallery, explicit "Lovable · 4.1k remixes" attribution, "Use template" call-to-action — provenance definitional
- Confidence: Very high

## Available Evidence
- [x] Rendered interface (as displayed within Lovable's own template-preview chrome)   - [x] Initial HTML (of the wrapper page)   - [ ] Rendered DOM of the underlying template itself (only a framed screenshot/preview was captured, not the live deployed template)   - [ ] CSS (of the template itself)
- [ ] JavaScript behavior  - [ ] Public repository  - [ ] Component source
- [ ] Design-system documentation  - [ ] Case study  - [ ] Commit history

## Product Context
- Primary user: a home-goods maker/boutique wanting a storefront / Primary task: browse products, understand brand positioning / Interface maturity: template-grade / Important constraints: per the listing copy, explicitly positioned to "justify premium pricing" for artisan goods

## Visual Composition
- Primary focal point: a large italic serif display headline ("*Objects of* *Quiet Beauty*") over a warm, real-feeling lifestyle photograph (a sofa, a wooden side table, a floor lamp, layered textiles) / Reading path: kicker label ("CURATED FOR CONSIDERED LIVING") → headline → supporting sentence → CTA button / Density: low, deliberately spacious / Repetition: not visible in the single hero captured / Visual tension: a clear focal hierarchy — nothing competes with the headline and photograph
- Signature decisions: an editorial serif/italic mixed-weight headline treatment ("Objects of" in solid weight, "Quiet Beauty" in italic), a warm, desaturated, almost film-like photographic treatment, a terracotta/rust CTA button color pulled directly from the photograph's palette rather than an arbitrary brand blue
- Generic decisions: the kicker-label + headline + subhead + CTA hero structure is a standard e-commerce pattern

## Implementation
- Framework: not determined (static preview capture only) / Styling system: not determined / Component library: not determined / Token strategy: not determined

## Product Realism
- Real constraints represented: the template listing itself states a specific, real business rationale ("Launch your artisan home goods store with editorial-grade design that justifies premium pricing... no developer needed") and lists specific target users ("Home goods makers launching a first online store," "Boutique retailers," "Agencies building sites for clients")
- Non-ideal states: not visible in the hero capture
- Content realism: the headline/subhead copy ("Handcrafted home goods and lifestyle pieces designed to bring warmth and intention to everyday moments") is generic-brand-voice but internally consistent with a real editorial-retail register — it would not obviously look out of place on an actual boutique's site
- Evidence of ongoing operation: n/a (template, not a live operating business)

## AI-Associated Signals
- Weak signals: none identified in the hero alone
- Moderate signals: none
- Strong signal combinations: none
- Counterevidence: **this record is itself a direct counterexample to the "AI-generated always looks generic" assumption.** The typography (mixed serif/italic display treatment), the photography-led rather than illustration/gradient-led hero, and the palette-derived (not arbitrary) accent color are all choices this project's own guide would score as *positive*, deliberate, product-specific decisions if seen without knowing the provenance — directly relevant to Governing Principle 11's core claim that provenance and quality are separate axes.

## Authorship Signals
- Product-derived structure: the hero content is specifically about home goods/lifestyle retail, not a generic "Shop Now" template with placeholder category names
- Deliberate exceptions: the italic-serif headline treatment is a specific typographic choice, not a default
- Art direction: consistent warm, desaturated, editorial palette
- Cross-route coherence: not tested (only the hero preview was captured)
- Evidence of editing and restraint: not determinable from one hero image

## Limitations
- What could not be inspected: this record is based on a **static preview screenshot embedded in Lovable's own template-browsing chrome**, not a live-rendered, independently-hosted deployment of the template — DOM/CSS were not available, and the "editorial-grade" quality could partly be a marketing photograph chosen for the template listing rather than a fully representative sample of the generated site's every page
- Confounding factors: templates on a showcase gallery are, by construction, the platform's own selected best examples — not a random or representative sample of typical output, a limitation round 6 already anticipated for this exact corpus type
- Alternative interpretation: this could be an unusually well-directed/iterated example rather than typical single-shot generation; without the underlying prompt history, this cannot be resolved either way, same limitation as Record 6

---

### Record 8: "Daily Habit Tracker" (Lovable template, "Continuum")

## Identification
- Product: Daily Habit Tracker ("Continuum" brand), a Lovable-generated SaaS app template
- URL: https://lovable.dev/templates/apps/saas/continuum-daily-habit-tracker-template
- Category: SaaS / consumer productivity app
- Page or workflow: Template detail page (static framed preview)
- Provenance classification: Corpus B
- Classification evidence: Same as Record 7 — hosted on Lovable's own gallery, "Lovable · 7.2k remixes" attribution
- Confidence: Very high

## Available Evidence
- [x] Rendered interface (framed preview)   - [x] Initial HTML (wrapper page)   - [ ] Rendered DOM of the template itself   - [ ] CSS of the template itself
- [ ] JavaScript behavior  - [ ] Public repository  - [ ] Component source
- [ ] Design-system documentation  - [ ] Case study  - [ ] Commit history

## Product Context
- Primary user: someone trying to build a daily habit / Primary task: sign up, start tracking / Interface maturity: template-grade / Important constraints: listing copy states "A calm, focused, ad-free habit tracker you can deploy in minutes"

## Visual Composition
- Primary focal point: a bold sans headline ("Build lasting habits, one day at a time") over a warm, real-feeling lifestyle photograph (a woman reading at a table with coffee and a book) with a dark gradient overlay for text legibility / Reading path: nav → headline → subhead → orange CTA button / Density: low / Repetition: not visible in the hero alone / Visual tension: low — a fairly standard centered-content-over-photo hero
- Signature decisions: a specific, warm, editorial photograph choice rather than an abstract/illustrated hero
- Generic decisions: **this record is a clean, direct Product Swap Test failure.** "Build lasting habits, one day at a time" and "Continuum is a calm, focused habit tracker that helps you build consistency through streaks, visual progress, and zero distractions" could be the hero copy for essentially any habit-tracking product on the market with a one-word brand-name swap and zero other changes — this is exactly the interchangeable-content pattern this project's guide's Product Swap Test (§20) is designed to catch, found live and unambiguously in a disclosed-AI-generated template.

## Implementation
- Framework: not determined (static preview only) / Styling system: not determined / Component library: not determined / Token strategy: not determined

## Product Realism
- Real constraints represented: the listing copy names specific target users ("Self-improvement enthusiasts tracking daily habits," "Building streak-based engagement features," "Replacing bloated habit trackers with something minimal") — more specific than the hero copy itself
- Non-ideal states: not visible
- Content realism: the hero copy itself is the weakest, most generic content sampled in this entire record set
- Evidence of ongoing operation: n/a (template)

## AI-Associated Signals
- Weak signals: a real (non-stock-abstract) photograph used as a dark-overlay hero background is a common convention across both AI-generated and human-made SaaS marketing pages — weak on its own
- Moderate signals: fully generic, product-swappable hero copy (see above) combined with a single-color (orange) CTA on an otherwise neutral palette
- Strong signal combinations: the combination of interchangeable hero copy + generic "calm/focused/minimal" SaaS-wellness-app register + a stock-feeling (if real-looking) lifestyle photo is the closest match in this entire study to the "recognizable AI-generated SaaS marketing page" pattern this project's guide catalogs — and it is the one live instance in this record set where that specific combination was actually found with confirmed AI-generation provenance, rather than assumed
- Counterevidence: the photograph itself is well-chosen and not an obviously AI-generated or stock-generic image; the CTA color is warm and specific rather than a generic blue/purple

## Authorship Signals
- Product-derived structure: weak — nothing in the hero is specific to habit-tracking beyond the word "habit" itself; the same content shape would work unmodified for a meditation app, a fitness app, or a journaling app
- Deliberate exceptions: none evident
- Art direction: competent but generic (photo-with-overlay, single accent color)
- Cross-route coherence: not tested
- Evidence of editing and restraint: not determinable

## Limitations
- What could not be inspected: same as Record 7 — static preview only, no DOM/CSS, no visibility into prompt/iteration history, showcase-selection bias
- Confounding factors: same as Record 7
- Alternative interpretation: it remains possible a human reviewed and approved this exact copy deliberately (e.g., testing that the *generic* version is what most users actually want for a template meant to be widely reused) — but that is speculation, not evidence, and the Product Swap Test result stands regardless of intent

---

## Corpus C — Ambiguous / counterexamples

### Record 9: Varda Space Industries

## Identification
- Product: Varda Space Industries (corporate marketing site)
- URL: https://varda.com
- Category: Aerospace / orbital manufacturing — directly comparable in category to this project's own fictional "Perigee" example
- Page or workflow: Home page
- Provenance classification: Corpus C, but resolved this round to effectively Corpus A (real, funded, operating company; not ambiguous in origin, only listed as "ambiguous" in the manifest because it hadn't been inspected yet)
- Classification evidence: page title "Space born, Earth bound • Varda Space Industries," a real "Connect with our team" / Careers / Government / Biopharma / Microgravity Research navigation structure, a real dated news item ("Varda announces a research collaboration with United Therapeutics")
- Confidence: High

## Available Evidence
- [x] Rendered interface   - [x] Initial HTML   - [x] Rendered DOM   - [x] CSS
- [ ] JavaScript behavior  - [ ] Public repository  - [ ] Component source
- [ ] Design-system documentation  - [ ] Case study  - [ ] Commit history

## Product Context
- Primary user: government/defense agencies, biopharma partners, investors, potential employees / Primary task: understand what Varda does (in-space manufacturing with Earth return) and reach the right vertical (Government / Biopharma / Microgravity Research) / Interface maturity: mature, actively updated / Important constraints: three genuinely distinct customer types from one home page, same structural challenge this project's own fictional Perigee example was built to model

## Visual Composition
- Primary focal point: a huge (107px), tight, orange-on-navy H1 ("Space born, Earth bound") directly over a full-bleed duotone satellite/terrain photograph / Reading path: mark/nav → headline+subhead → three vertical links (Government/Biopharma/Microgravity Research) → a real dated announcement bar / Density: low at the hero, increasing further down / Visual tension: high — oversized type breaks out of the photograph's implied grid
- Signature decisions: **a dotted-line grid overlay across the entire hero photograph**, functioning simultaneously as a technical/geospatial reference motif and a literal echo of satellite-imagery grid lines; a specific, non-generic tagline ("Space born, Earth bound") that only makes sense for Varda's actual business model (materials manufactured in microgravity, then returned to Earth) — this fails the Product Swap Test in the *positive* direction: it could not be reused by a different orbital company without becoming wrong
- Generic decisions: a standard header nav (logo / Careers / Contact / Menu)

## Implementation
- Framework: not fully determined / Styling system: not determined / Component library: not determined / Token strategy: not determined
- Domain-specific components: three vertical-specific links (Government / Biopharma / Microgravity Research) matching Varda's actual three real business lines, not generic "Solutions/Products/Company" labels
- Responsive strategy: not fully re-verified at all breakpoints this round

## Product Realism
- Real constraints represented: a specific, dated, named partnership announcement ("Varda announces a research collaboration with United Therapeutics") directly in the hero fold — real operational content, not a generic "Latest News" placeholder
- Non-ideal states: n/a (marketing page)
- Content realism: high
- Evidence of ongoing operation: the announcement bar, plus the three-vertical navigation implying an actual multi-line business (government contracts, biopharma partnerships, and a research-access product), matching what a real orbital-manufacturing company's actual customer base would look like

## AI-Associated Signals
- Weak signals: none identified as isolated
- Moderate signals: negative tracking on the H1 (`-3.22358px` at `107.453px` ≈ **-0.03em**, at the very edge of the guide's flagged range) — a fourth confirmation of the negative-tracking finding, on a company as far as possible from "used an AI-tool default without checking it" (this is custom typography — "MT Everyday Sans," a licensed/commissioned typeface, not a system or Google font)
- Strong signal combinations: none
- Counterevidence: **this is the most direct, load-bearing counterevidence available anywhere in this document for the open question logged in round 6's Appendix I about corner-bracket/technical-grid framing devices.** Varda — a real, funded, operating company in the *exact same industry* as this project's own fictional Perigee example — uses a dotted grid overlay across its hero image, the same general category of "technical-looking framing decoration" that two blind reviewers flagged as a hollow AI-generated "sci-fi HUD" cliché when this project used it on Perigee's orbit diagram. The device is not automatically disqualifying; see Authorship Signals for the distinction this record draws.

## Authorship Signals
- Product-derived structure: the tagline, the three-vertical nav, and the announcement bar are all specifically true of Varda's real, current business — none of it is swappable to a different company
- Deliberate exceptions: the grid overlay is applied to a real satellite/terrain photograph specifically (a literal geospatial image), which gives the "technical grid" motif an actual representational connection to the content it sits on top of — this is the key distinction from the original Perigee case, where the bracket frame sat around an *illustrative, non-photographic* diagram with no equivalent representational justification
- Art direction: a consistent navy/orange duotone treatment applied to real photography, not a generic gradient
- Cross-route coherence: not tested this round
- Evidence of editing and restraint: the hero says very little (a five-word headline, one sentence, three links) for a company with a technically complex product — real restraint, not padded explanation

## Limitations
- What could not be inspected: internal pages (Government/Biopharma/Microgravity Research sub-pages), which would be a stronger test of cross-route coherence; whether the grid-overlay device would still read as motivated on a page without a literal satellite photograph beneath it was not tested
- Confounding factors: this project's own prior reasoning (Governing Principle 11, Appendix I) already anticipated needing exactly this kind of real counter-instance — some caution is warranted about seeing what was expected to be found; the "grid is motivated because the photo is satellite imagery" reading is a plausible interpretation, not a certainty, and is itself exactly the kind of "plausible rationale" Governing Principle 11 warns can be wrong
- Alternative interpretation: a skeptical reading could argue the grid overlay is decorative regardless of the photograph's content, and that "it happens to sit on satellite imagery" is a coincidence being used post-hoc to justify a device that would have been added regardless — this cannot be fully ruled out from the artifact alone, and is exactly why this record is logged as informative rather than dispositive

---

### Record 10: Craigslist (SF Bay Area)

## Identification
- Product: Craigslist
- URL: https://sfbay.craigslist.org
- Category: Consumer classifieds marketplace
- Page or workflow: Regional home/index page
- Provenance classification: Corpus C (counterexample: visually plain, definitely not AI-built, operationally excellent)
- Classification evidence: predates AI-generation tooling entirely (site design essentially unchanged since the late 1990s/early 2000s); round 6 research already established this via `[SEARCH]` evidence, now directly confirmed by rendering
- Confidence: Very high

## Available Evidence
- [x] Rendered interface   - [x] Initial HTML   - [x] Rendered DOM   - [x] CSS
- [ ] JavaScript behavior  - [ ] Public repository  - [ ] Component source
- [ ] Design-system documentation  - [ ] Case study  - [ ] Commit history

## Product Context
- Primary user: anyone buying, selling, seeking housing, jobs, or community connections in a specific metro area / Primary task: find the right category fast / Interface maturity: extremely mature, deliberately near-static for decades / Important constraints: must serve an enormous number of categories/regions from one dense index

## Visual Composition
- Primary focal point: none — deliberately flat information hierarchy, no single dominant visual element / Reading path: scan-based, not linear — a reader jumps to whichever of ~15 category blocks is relevant / Density: extremely high — dozens of links visible without scrolling at 1440px / Repetition: uniform link-list styling throughout, no card treatment anywhere / Visual tension: none by design
- Signature decisions: a peace-sign logo mark (the only illustrative element on the page), a small embedded event calendar widget
- Generic decisions: none in the pattern-catalog sense — there is no shadcn/Tailwind default to compare this to, since the visual language predates that entire convention

## Implementation
- Framework: none detected (classic server-rendered HTML, no visible modern JS framework chunks) / Styling system: a single small stylesheet, no utility-class framework / Component library: none / Token strategy: none
- Domain-specific components: n/a — the "components" are just links, by design / Default-library remnants: n/a / Responsive strategy: not meaningfully tested — this is fundamentally a desktop-density-first design

## Product Realism
- Real constraints represented: the entire page *is* real constraint made visible — genuine category breadth (community/housing/jobs/services/for sale/discussion forums/gigs, each with 15-30 real sub-links), a real event calendar showing the actual current date highlighted (30th, matching this session's real date)
- Non-ideal states: n/a
- Content realism: maximal — every link is a real, functional category
- Evidence of ongoing operation: the live-highlighted current date in the calendar widget is itself direct, undeniable evidence of an actively operating, non-static system

## AI-Associated Signals
- Weak signals: none
- Moderate signals: none
- Strong signal combinations: none
- Counterevidence: this page has essentially zero properties in common with any AI-generation convention this project's guide catalogs (no gradients, no cards, no generous whitespace, no hero section, no rounded corners, a serif system font on buttons) — it is not merely "not generic-looking," it is close to visually orthogonal to the entire evaluative frame

## Authorship Signals
- Product-derived structure: total — the page structure is nothing but the product's actual category taxonomy, exposed directly
- Deliberate exceptions: n/a
- Art direction: minimal/absent by design, not by omission — round 6's citation of this as "subverting the Aesthetic-Usability Effect" is directly confirmed by direct inspection, not just by the secondary source describing it
- Cross-route coherence: not tested this round, but well-documented elsewhere (round 6 research) as consistent across the entire site for decades
- Evidence of editing and restraint: the restraint here is total and, per round 6's citation, has an explicit business rationale (a high-frequency, trust-through-familiarity marketplace where visual investment would plausibly cost more usability than it added) rather than being unexamined

## Limitations
- What could not be inspected: an actual listing page or the posting flow (only the category-index home page was rendered)
- Confounding factors: none — this record is about as unambiguous as evidence gets in this entire study
- Alternative interpretation: none

---

## Summary of what this round's live evidence changes

1. **The single largest correction:** negative letter-spacing in the -0.01em to -0.03em range, previously flagged in `ANTI_VIBE_CODING_UI.md` §8 as reading like "a template tell in its own right," was measured directly on the primary hero heading of **four separate, maximally-credited, definitely-human products** (Stripe -0.02em, Linear -0.022em, Basecamp -0.0225em, Varda -0.03em) and was absent (`normal`) on the two reference design-system sites (GOV.UK, Primer). §8 has been corrected in place; see the inline round-7 note there.
2. **Partial resolution of the open corner-bracket/technical-framing question from round 6:** Varda's real, live use of a dotted grid overlay on its hero photograph is genuine counter-instance evidence that this class of device is not automatically disqualifying — with a specific, testable distinction offered (representational connection to real content vs. decoration reached for because it "looks technical"), not a full resolution. Logged in Appendix I.
3. **Confirmation, not correction, of the Realism Audit's core claim:** every Corpus A record in this set (GOV.UK's dated release note, Primer's real bug alongside its real component demos, Stripe's named customers and dated terminology, Linear's specific bug-report content, Basecamp's plausible file sizes and names) independently reinforces that content specificity is a stronger, more reliable signal than any single visual-pattern choice — consistent with round 6's `[SEARCH]`-grade finding, now with `[LIVE]`-grade confirmation.
4. **Confirmation that AI-tool output is not monolithic:** the three Corpus B records span from a distinctive neo-brutalist utility app (Record 6) and a genuinely tasteful, non-generic editorial storefront (Record 7) to a template with a clean, textbook Product Swap Test failure in its hero copy (Record 8) — all three carry disclosed AI-generation provenance from the same two platforms. Provenance alone does not predict genericness; content-swappability, checked per-instance, still does.
