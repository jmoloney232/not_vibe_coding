# Vendored webfonts

Self-hosted rather than linked from a CDN, so the examples render identically offline and make no
third-party request. Latin and Latin-Extended subsets only; the Cyrillic, Greek, and Vietnamese
subsets Google Fonts serves alongside them were dropped.

| Family | Used by | Designer(s) |
|---|---|---|
| Libre Franklin (variable, 400–900) | Lead Service Line Inventory | Impallari Type |
| Source Serif 4 (variable, 400–600) | Lead Service Line Inventory | Frank Grießhammer, Adobe |
| EB Garamond (variable 400–600, plus italic) | Cape Ansell Almanac | Georg Duffner, Octavio Pardo |
| Fira Sans Condensed (400/500/600) | Cape Ansell Almanac | Erik Spiekermann, Ralph du Carrois |
| Jost (variable, 300–700) | Drawdown | Owen Earl, indestructible type* |

All five are published under the SIL Open Font License 1.1, which permits redistribution and web
embedding. The upstream licence text ships with each family on Google Fonts and in each project's own
repository; it is not duplicated here, and the files themselves are unmodified apart from subsetting.

To refresh a family, request the CSS from `fonts.googleapis.com/css2` with a browser user-agent, keep
the `latin` and `latin-ext` `@font-face` blocks, and rewrite their `src` URLs to the local files.
