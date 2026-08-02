# Firn — asset note

Two photographs, both obtained from Wikimedia Commons with machine-readable licence metadata, both
resized and re-encoded for the web. No placeholder stands in for either.

## core.jpg / core@700.jpg — a raw ice core in its receiving tray

- **Source**: https://commons.wikimedia.org/wiki/File:Antarctica_WAIS_Divide_Field_Camp_10.jpg
- **Author**: Eli Duke
- **Licence**: CC BY-SA 2.0 — https://creativecommons.org/licenses/by-sa/2.0
- **Role**: the article's opening figure. It is the subject of the piece, not decoration: the reader
  needs to see the physical object the whole argument is measured from.
- **Treatment**: resized to 1400px and 700px, quality 82, progressive. No crop, no colour grading, no
  filter — the publication's credibility depends on the photograph being what it says it is.
- **Fallback**: `<img>` carries width/height so the column does not reflow if it fails; the caption
  stands alone and still identifies the object.
- **Dependency**: high. Without it the article opens on a claim about an object the reader cannot see.

## trench.jpg / trench@700.jpg — drilling trench, backlit, with steam

- **Source**: https://commons.wikimedia.org/wiki/File:Ice-core_drill_hg.jpg
- **Author**: Hannes Grobe, Alfred Wegener Institute for Polar and Marine Research
- **Licence**: CC BY-SA 2.5 — https://creativecommons.org/licenses/by-sa/2.5
- **Role**: the issue cover image on the index route, and the "how it is collected" figure in the
  article. Establishes the working conditions the data comes out of.
- **Treatment**: as above. Its darkness is used as-is; the layout gives it a full-bleed band rather
  than lightening it to fit a scheme.
- **Fallback**: same. On the index the headline sits beside rather than on top of it, so it stays
  legible if the image never arrives.
- **Dependency**: medium.

## Attribution in the interface

CC BY-SA requires attribution and a licence indication. Both are credited in the visible figure
caption — author, institution where relevant, and licence — not hidden in a colophon. Since the
photographs are BY-SA, they are reproduced unmodified apart from resizing, and the credit line
carries a link back to the source page.

## Authored figures, not photographs

The isotope curve and the layer-count column are drawn from values held in `data.js`. They are
diagrams of data, generated the same way round one's tide curve and cloth were. Their provenance is
the article's own stated dataset, and the caption says so.

## Fictional-work notice

*Firn* is not a real publication. The named authors, institutions, issue numbering, and the specific
numeric series in `data.js` are invented for this exercise. The photographs are real and credited;
the science described around them is written to be plausible rather than citable, and the page says
so in its colophon.
