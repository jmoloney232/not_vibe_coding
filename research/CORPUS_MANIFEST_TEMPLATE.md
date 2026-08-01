# Round 7 Corpus Manifest — Superseded by Live Execution

**Status: executed.** A later session in this same round had real (Full) network access — confirmed by genuine 200 responses from `stripe.com`, `vercel.com`, and `design-system.service.gov.uk`. The blocker described below turned out to be two separable things: the session's network tier (resolved by running in a Full-access environment) and an unrelated Chromium/proxy TLS-handshake incompatibility (headless Chromium's TLS 1.3 `ClientHello` was reset by the proxy; forcing `--ssl-version-max=tls1.2` on the Chromium launch fixed it without disabling certificate verification). Both are documented in detail, so a future session hitting the same symptom doesn't have to re-diagnose it.

**Real results are in `research/INTERFACE_STUDY_RECORDS.md`** — ten fully-rendered, screenshotted, DOM/CSS-inspected records (five Corpus A, three Corpus B, two Corpus C), plus a summary of what the live evidence confirmed versus corrected from the search-snippet-grade round 6 report. The candidate list and template schema below are kept as a historical record of the pre-execution plan, not as a substitute for the real findings.

---

*Original prep note, unedited below:*

This file is preparation for that session, not a substitute for it. Nothing below has been verified by rendering or inspection yet — every candidate is a lead to check, not a finding.

## Interface Study Record schema (use this for every example, once network access exists)

```md
# Interface Study Record
## Identification
- Product:
- URL:
- Category:
- Page or workflow:
- Provenance classification:
- Classification evidence:
- Confidence:
## Available Evidence
- [ ] Rendered interface   - [ ] Initial HTML   - [ ] Rendered DOM   - [ ] CSS
- [ ] JavaScript behavior  - [ ] Public repository  - [ ] Component source
- [ ] Design-system documentation  - [ ] Case study  - [ ] Commit history
## Product Context
- Primary user: / Primary task: / Interface maturity: / Important constraints:
## Visual Composition
- Primary focal point: / Reading path: / Density: / Repetition: / Visual tension:
- Signature decisions: / Generic decisions:
## Implementation
- Framework: / Styling system: / Component library: / Token strategy:
- Domain-specific components: / Default-library remnants: / Responsive strategy:
## Product Realism
- Real constraints represented: / Non-ideal states: / Content realism: / Evidence of ongoing operation:
## AI-Associated Signals
- Weak signals: / Moderate signals: / Strong signal combinations: / Counterevidence:
## Authorship Signals
- Product-derived structure: / Deliberate exceptions: / Art direction: / Cross-route coherence: / Evidence of editing and restraint:
## Limitations
- What could not be inspected: / Confounding factors: / Alternative interpretation:
```

## Candidate list (unverified leads — confirm provenance evidence before classifying anything)

**Corpus A candidates — credible professional-design provenance to verify:**
- GOV.UK Design System (gov.uk, design-system.service.gov.uk) — public repo, named team, Design of the Year award. Category: government/civic.
- GitHub Primer (primer.style, github.com/primer) — public repo, credited internal design-systems team. Category: developer tool / design system.
- IBM Carbon (carbondesignsystem.com) — public repo, credited team, extensive documentation. Category: enterprise design system.
- Stripe (stripe.com, especially /docs and a case-study-documented dashboard) — widely cited design-engineering blog posts from named Stripe designers/engineers. Category: financial/developer tool.
- Linear (linear.app) — public design commentary, small credited team, own design-engineering blog. Category: SaaS/dev tool.
- Basecamp / HEY (basecamp.com, hey.com) — DHH and Jason Fried publicly and repeatedly document design decisions; open engineering blog (37signals). Category: SaaS/consumer email.
- Radix UI + a product built on it with public credit (need to identify one with disclosed design involvement, not just library use). Category: dev tool/design system.
- A real newsroom/editorial site with a documented redesign case study (e.g., a Source: An OpenNews or Nieman Lab writeup of a specific outlet's redesign). Category: editorial.
- Figma's own marketing/product site (figma.com) — named in-house design team, public design commentary. Category: creative tool.
- A credited small-business or agency-built local-business site (needs a specific agency case study, not just "looks nice"). Category: small business.

**Corpus B candidates — need live verification of disclosed AI-generation provenance:**
- v0.dev community gallery (v0.dev/community or similar) — Vercel's own showcase of v0-generated projects, explicit "built with v0" attribution.
- Lovable showcase (lovable.dev, "Launched" section) — explicit "built with Lovable" attribution.
- Bolt.new hackathon/community showcase — explicit attribution.
- GitHub topic/search for repos whose README states "built with Claude Code," "built with Cursor," or similar disclosed-provenance language (requires live GitHub search once network access allows broader search, or a `Full`-access session using `gh` directly).
- Any repo in this project's own history is *not* eligible for Corpus B (it's the subject of the self-reevaluation, not external corpus material).

**Corpus C candidates — ambiguous/counterexamples to identify once inspection is possible:**
- Real Varda Space Industries site (varda.com) — a real orbital-manufacturing company (directly comparable to this project's own Perigee example); need to actually render and inspect it now that the redesign exercise assumed its structure from search snippets only.
- Craigslist (craigslist.org) — plain, arguably "vibe-coded-looking," but extremely operationally excellent and definitely not AI-built (predates the category). Good counterexample: looks generic, is not generic in the relevant sense.
- A real small-business site that is human-made but visually generic (needs a specific, findable example, not assumed).
- A real AI-builder output that does NOT look stereotypically generic (harder to find; worth specifically searching for as a counterexample once live access exists).

## What the next session should do first

1. Verify network access actually works (`curl -I https://stripe.com` should return a real status, not a 403).
2. Re-verify every candidate above with real evidence before using it — a name on this list is a lead, not a citation.
3. Actually render and screenshot at multiple widths, inspect real DOM/CSS, before filling in any Interface Study Record.
4. Expand past this list once real inspection starts revealing what's actually accessible (some sites will block automation; note that as a limitation, don't skip it silently).
