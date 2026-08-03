# 01 — Firn: an independent glaciology quarterly

Two routes: the issue index (`index.html`) and the lead feature (`article.html`).

## The product

A quarterly on glaciology and the ice-core record, written for readers who have a science background
but are not necessarily glaciologists. It publishes long arguments with real apparatus — figures,
horizons, side notes, sources, corrections — and its credibility rests on being precise about what is
measured and what is inferred. Issue 14 is *Timescales*: how a core gets dated, and where the method
runs out.

## The idea

**An ice core is read down its length, so the article is too — with the apparatus in the margin, the
way a core log is annotated.** A rail beside the reading column carries the fixed dated horizons of
the core, ticks at true depth, and marks the reader's own position against them. It is the one
structural decision the whole exercise turns on, and it comes from the subject rather than from a
layout idea.

## References

| Reference | Why relevant | Attribute studied | Transfers | Does not transfer |
|---|---|---|---|---|
| **Quanta Magazine** (professional) | Independent science publication that is long-form without being academic | How rigour is signalled through apparatus rather than formatting | Standfirst that states the argument; willingness to run long; author expertise made explicit | Their commissioned illustration — it depends on a budget this exercise does not have, and imitating it with stand-ins would be exactly the round-one failure |
| **Works in Progress** (professional) | Essay-led, near-zero chrome, typographically confident | Measure, leading and rhythm sustained over thousands of words | Single-column discipline; resisting the urge to break text with furniture | Its near-absence of figures — Firn is figure-led and needs a place to put them |
| **A university department news page** (conventional) | The default a reader of this subject actually encounters | What readers expect to find: byline, affiliation, date, related items, corrections | Those conventions are conventions for good reason and are kept | Card-grid contents, hero image followed by undifferentiated blocks |
| **AI-generated "science magazine" landing pages** (negative) | The documented template cluster for this category | What the failure looks like: gradient hero, three equal feature cards, a generic serif headline, a stock laboratory photograph illustrating nothing, "exploring the frontiers of" | — | Everything. The specific avoidance: contents is a **list with varying scale by length**, not a card grid; the photographs are of the actual subject and are credited |
| **The printed stratigraphic core log** (outside web design) | The document this publication is about | Annotating a linear continuum: ticks at true position, labels displaced where they crowd, leaders connecting the two | The rail is this, directly — including the label-displacement rule that solves the real collision at the top of the core | The full formality of a survey log; this is a reading page, not a data sheet |

Quality dependence: Quanta's depends heavily on commissioned art; Works in Progress's does not, which
is why it is the closer model here.

## Typography

Three directions rendered on identical content — `../evaluation/01-studies/typography.html`.

**Chosen: A — Newsreader (reading) + Barlow Semi Condensed (apparatus).** Newsreader is a screen-first
reading serif; it holds a 62ch measure at 19px comfortably. The publication is apparatus-heavy — depths,
δ¹⁸O values, ages, figure numbers, credits — and a second, condensed voice keeps all of that legible at
11–13px without competing with the prose.

**Rejected B — Barlow Semi Condensed throughout.** It produced a convincing *report*, and the numeric
emphasis was genuinely good. It fails the primary task: a semi-condensed face is a labelling design, and
asking it to carry 3,100 words of continuous reading is asking the wrong thing of it.

**Rejected C — Newsreader only, italic display.** The most beautiful of the three, and the closest to
being kept. Two reasons against: the italic display assigns the publication a literary register when the
subject is measurement, and with a single family the apparatus has no distinct voice, so units and depths
end up in the same colour as the argument.

Both families are SIL OFL 1.1, self-hosted, latin + latin-ext subsets only.

## Structure

Three directions sketched — `../evaluation/01-studies/structure.html`.

**Chosen: S1 — reading column with a live core rail.** Best product fit: the apparatus stays beside the
passage it belongs to, the rail gives the article a spine that is the subject's own, and it degrades
honestly on a phone (the rail becomes a horizontal key above the article rather than disappearing).

**Rejected S2 — two printed columns.** Familiar to the audience and genuinely dense, but two columns at
this width force a short measure, and collecting the apparatus into a footer severs each note from the
passage it explains. It also collapses to a single column on a phone, at which point it is just S1 with
the apparatus in the wrong place.

**Rejected S3 — figure spine.** Right for a photo essay, wrong here. This piece is a continuous argument
that figures support; inverting that would make the figures assert things the prose is carefully
qualifying.

## States and depth

- Article lengths differ and the contents shows it: a 6,200-word long read is set larger than a
  700-word column, and a correction is set smallest and marked in the warm accent.
- Corrections are a first-class item in the contents, not hidden — it is a publication about
  measurement, so being seen to correct is part of the product.
- Side notes are apparatus attached to their own passage, floating into the margin above 1180px and
  falling inline below it.
- Below 1080px the rail is redrawn as a flat horizontal strip, 66px tall rather than 1,763px, with
  the reader marker riding the horizontal axis. Earlier versions of this file claimed that behaviour
  while the stylesheet implemented it against elements the page never rendered.
- Figures carry credit and licence inline, not in a colophon.
- The rail's reader-position marker is an honest approximation and the rail says so in its own note.

## Verified

Rendered at 1440 / 834 / 390, both routes, no console errors and no horizontal overflow at any width.

- Rail label collisions: **0** at all three widths, after the fix below.
- Both drawn figures render their marks at every width; the horizons named in Fig. 3 are the same
  array the rail is built from, so the figure and the rail cannot disagree.
- Photographs carry explicit width/height, so the column does not reflow if they fail to load.

### Defects this caught

**The rail collided with itself.** The top four horizons of the core fall within 4% of its length, so
at true depth their labels — three lines each — overlapped into an unreadable stack, and the bottom
label ran through the rail's own footnote. Fixed by keeping ticks at true depth and displacing labels
to a minimum spacing with leader lines back to the tick, which is what a printed core log does for the
same reason. This was invisible in the markup and obvious in the first render.

**The contents left a dead band.** The entry grid inherited the page frame's full width while the text
inside it was capped at 58ch, leaving a wide gap before the right-hand metadata — the "unset max-width"
read that a round-one reviewer flagged on a different page. The list is now capped at 940px.

## Not verified

- **Blind review has been run** — `../ROUND_TWO_BLIND_REVIEW.md`, reviewer D, plus the authorship
  reviewer X. It returned visual craft 2 and information design 2, against a considerably kinder
  self-assessment, and found eight real defects including two figure label collisions, a caption
  describing a different chart, a silently truncated axis, an index whose entries did not look like
  links, and a mobile rail that rendered 1,763px tall between the headline and the first sentence.
  All are fixed and re-verified. The reviewers were AI agents in fresh contexts, not people.
- No screen-reader pass. The rail is a labelled `role="img"` and the horizons it names are also given
  in the figure captions and the prose, so nothing exists only in the rail — but this is untested with
  real assistive technology.
- The reader-position mapping assumes the article discusses the core top-down, which this one does. It
  would need rethinking for a piece that jumps around, and it is not generalised.
- No print stylesheet.
