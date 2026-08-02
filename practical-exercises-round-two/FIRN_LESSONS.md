# What Firn established, and what it did not

Firn (Exercise 01, commit `93b5211`) is the first build in this repository that reached the round-two
quality floor. It is being kept as-is. This note exists so the next eleven exercises inherit its
*process* without inheriting its *appearance*.

## The process floor

Five things happened in Firn that had not reliably happened before. All five transfer, unchanged.

**1. Structure came from the subject, not from a layout vocabulary.** The core rail is a stratigraphic
log because the artefact under discussion is a stratigraphic column read top-down. It was not chosen
because a sidebar looked good; had the article jumped around in depth, the rail would have been wrong
and would have been dropped.

**2. Assets were real and licensed before design started.** Two CC-licensed photographs from Wikimedia
Commons, `ASSETS.md` recording source, author, licence and URL, credits inline in the captions rather
than buried in a colophon. No gradients standing in for imagery.

**3. Typography was tested, not selected.** Three directions rendered on the same 3,100 words, then
judged. Two were rejected for stated functional reasons — one because a semi-condensed labelling face
cannot carry continuous reading, one because an italic display assigns a literary register to a
subject that is measurement. The winner won a comparison; it was not the first plausible pairing.

**4. Structure was tested the same way.** Three sketches, rendered, then two rejected on product fit
rather than taste.

**5. Defects were found by looking at renders, not by reading markup.** Both real defects — the rail
label collision and the contents dead band — were invisible in source and obvious on screen at
1440/834/390. Static review would have missed both.

Add to these the round-one habit that held: check the new build against the specific failure modes the
previous round documented, by name.

## What does not transfer

Everything that makes Firn look like Firn:

- the cool near-white ground (`#f4f6f6`)
- the centred editorial reading column at a 62ch measure
- the annotation rail and the side-note system
- Newsreader + Barlow Semi Condensed
- the restrained, low-energy visual register
- the research-publication tone
- the near-golden spacing scale derived from a 30px reading line

None of that is a house style. It is one correct answer to one brief about long-form scientific
reading. Reused elsewhere it becomes a template, which is the failure this whole benchmark exists to
detect. Exercises 02–12 must not produce a family resemblance to Firn.

## The specific trap: overlearning the rail

The rail worked, so the temptation is to give every exercise a signature device. That is the wrong
lesson. The rail earned its place because it improves navigation and comprehension of *this* content;
it is not evidence that clever structural metaphors are generally good.

Every proposed signature move from here on gets six questions, answered honestly in the exercise
README:

1. Does it improve comprehension, navigation, task completion, or emotional fit?
2. Does it emerge from the subject, or is it applied to it?
3. Does it survive real content — long titles, missing values, unflattering photographs?
4. Does it survive mobile, or does it quietly disappear?
5. Does it scale to the secondary route, or does it exist on one page only?
6. Would the design be better with it removed?

If the honest answer to (1) is "it demonstrates creativity," it comes out. Several of the twelve
exercises should ship with **no** signature device at all — 03, 05 and 08 in particular are briefs
where a conventional structure executed with exceptional judgment is the correct answer, and inventing
a device for them would be a defect, not a feature.

## Remaining risk in Firn itself

Recorded so it is not mistaken for a solved problem:

- No independent blind review yet — that runs across the whole set.
- No screen-reader pass. The rail is a labelled `role="img"` and everything it names also appears in
  prose or captions, so nothing is rail-only, but this is reasoned rather than tested.
- The reader-position mapping assumes the article moves monotonically down the core. True here,
  not generalised, and the rail's own note says so.
- No print stylesheet, and a publication about a printed-log convention is a plausible place to want
  one.
