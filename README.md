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

## Development

The theme is plain Vue + CSS. Slidev hot-reloads layout/style edits when
the consuming deck has it installed via `npm link` or `file:` protocol.

## License

MIT
