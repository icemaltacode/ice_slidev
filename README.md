# slidev-theme-ice

ICE Malta course material theme for [Slidev](https://sli.dev).

## Use

```yaml
---
theme: ice
---
```

Install in a deck:

```bash
npm install slidev-theme-ice
```

Or for local development against a sibling checkout:

```bash
# from the deck repo
npm link ../ice_slidev
```

## Templates

Pre-written starter slides live in [templates/](templates/). A consuming
deck stamps a copy into its `slides.md` via `npm run slide -- <name>` —
edits happen on the copy, not the master.

Each template is a complete Slidev slide (frontmatter + body). Filename
without `.md` is the template name.

## Layouts

| Layout     | Use for                                |
| ---------- | -------------------------------------- |
| `default`  | Standard content with footer + page #  |
| `cover`    | Title slide with accent bar + eyebrow  |
| `section`  | Section dividers with accent underline |
| `center`   | Single centered statement              |
| `two-cols` | Two-column layout                      |
| `quote`    | Pull quote with attribution            |
| `end`      | Full-bleed gradient closer             |

## Rebranding

All colors and tokens live in [styles/tokens.css](styles/tokens.css). Edit
that one file to retheme — light and dark schemes both supported.

## Fonts (Circular Std)

The theme expects Circular Std as the sans family. Drop the `.woff2` files
into [assets/fonts/](assets/fonts/) using these exact filenames:

```
CircularStd-Book.woff2
CircularStd-BookItalic.woff2
CircularStd-Medium.woff2
CircularStd-MediumItalic.woff2
CircularStd-Bold.woff2
CircularStd-BoldItalic.woff2
CircularStd-Black.woff2
CircularStd-BlackItalic.woff2
```

The `@font-face` rules are defined in [styles/fonts.css](styles/fonts.css);
weight mapping is Book→400, Medium→500, Bold→700, Black→900. Until the
files are present the theme falls back to the system sans stack.

> Circular Std is a commercial typeface licensed from Lineto. Do not commit
> the font files to a public repository.

## Development

The theme is plain Vue + CSS. Slidev hot-reloads layout/style edits when
the consuming deck has it installed via `npm link` or `file:` protocol.

## License

MIT
