# slidev-theme-ice

ICE Malta course material theme for [Slidev](https://sli.dev). Layouts, styling
and starter templates for building course decks.

## Quick start

Five commands gets you a running deck:

```bash
mkdir my-course && cd my-course
npm init -y
echo 'allow-git=root' > .npmrc
npm install -D @slidev/cli git+ssh://git@github.com/icemaltacode/ice_slidev.git
npx ice-deck-init
```

Then:

```bash
npm install
npm run dev
```

Your deck opens in the browser and live-reloads as you edit `slides.md`.

> The second `npm install` is not a typo — `ice-deck-init` adds dependency
> overrides to your `package.json`, and npm only applies those on the next
> install.

> **Why the `.npmrc`?** The theme is not on the public npm registry — it
> installs straight from the private repo. npm 12 refuses git dependencies by
> default (`npm error code EALLOWGIT`), and `allow-git=root` re-enables them
> for your own direct dependencies only, leaving transitive git deps blocked.
> Commit the `.npmrc` with the deck so `npm install` keeps working for everyone
> who clones it. On npm 11 and earlier the setting is harmless.

> **Access.** You need read access to `icemaltacode/ice_slidev` and an SSH key
> on your GitHub account. If your `~/.ssh/config` uses a host alias for the ICE
> account, swap the URL for
> `git+ssh://git@github.com-ice/icemaltacode/ice_slidev.git`.

`npx ice-deck-init` scaffolds the deck in the current directory. It never
overwrites anything — re-running it is safe, and it just reports what it
skipped. It creates:

- **`slides.md`** — a starter deck with headmatter placeholders and one of each
  structural slide, ready to edit.
- **npm scripts** — `dev`, `build`, `export` and `slide`, added to your
  `package.json`.
- **dependency overrides** — pinning patched versions of `sharp` and
  `dompurify` (see [Security](#security)).
- **`.npmrc`** — with `allow-git=root`, if you don't already have one.
- **`.gitignore`** — `node_modules`, `dist`, `.slidev`.

| Script          | What it does                                  |
| --------------- | --------------------------------------------- |
| `npm run dev`   | Live-reloading dev server, opens the browser   |
| `npm run build` | Static site into `dist/`                       |
| `npm run export`| PDF export                                     |
| `npm run slide` | Append a template slide (see below)            |

## Adding slides

Every layout has a matching starter template. Stamp one onto the end of your
deck with:

```bash
npm run slide -- content_with_image
```

Pass several at once, and use `--list` to see what's available:

```bash
npm run slide -- unit_title content_plain content_with_code
npm run slide -- --list
```

A stamped slide arrives with the right frontmatter and renders the layout's
built-in placeholder content — replace it with your own. Edits happen on the
copy in your `slides.md`; the master template in [templates/](templates/) is
never touched.

## Deck settings

The headmatter at the top of `slides.md` configures the whole deck:

```yaml
---
theme: ice
title: Course Name Here
info: |
  One-line description, shown in the presenter view.
author: Your Name
mdc: true
drawings:
  persist: false
layout: title
---
```

Keep `mdc: true` — the theme's inline styles and image attributes depend on it.
Canvas size (1920×1080), 16:9 aspect ratio, the light colour scheme, Shiki
highlighting and the slide transition all come from the theme, so you don't
need to set them.

> **Gotcha:** don't put `---` inside a YAML comment in the headmatter. Slidev
> splits slides on `---`, so a comment like `# --- settings ---` silently breaks
> theme resolution and your deck renders unstyled. Plain `# comments` are fine.

## Layouts

Set the layout per slide with `layout:` in that slide's frontmatter. Named
slots are filled with MDC syntax — a `::slot_name::` line, then the content.

### Structure

| Layout          | Use for                                    | Frontmatter                            | Slots            |
| --------------- | ------------------------------------------ | -------------------------------------- | ---------------- |
| `title`         | Deck cover                                 | —                                      | `::footer::`     |
| `module_title`  | Module divider                             | —                                      | `::number::`     |
| `topic_title`   | Topic divider                              | —                                      | `::number::`     |
| `contents`      | Topic agenda — items auto-numbered         | `topic` (e.g. `'1.1'`)                 | —                |
| `unit_title`    | Unit divider — sets the inherited unit no.  | `unit` (e.g. `'1.1.1'`)                | `::number::`     |
| `project_title` | Project or assignment intro                | `label` (default `Practical Project`)  | `::description::`|

### Content

All six take an optional `unit` and an optional `::annotations::` slot. If you
omit `unit`, the slide inherits the number from the last `unit_title` slide —
so set it once per unit and forget it.

| Layout               | Use for                                | Extra slot   |
| -------------------- | -------------------------------------- | ------------ |
| `content_plain`      | Bullets, prose, tables, code           | —            |
| `content_with_image` | Content left, image right              | `::image::`  |
| `content_with_code`  | Content left, code right               | `::code::`   |
| `content_phone`      | Content left, phone mockup right       | `::screen::` |
| `content_tablet`     | Content left, tablet mockup right      | `::screen::` |
| `content_desktop`    | Content left, desktop mockup right     | `::screen::` |

```md
---
layout: content_with_image
unit: '1.1.2'
---

# Slide Title

- Your bullets here.

::image::

![A rubber duck](./ducky.webp)

::annotations::

An optional note printed beneath the slide body.
```

### Emphasis

| Layout                          | Use for                                          | Slots              |
| ------------------------------- | ------------------------------------------------ | ------------------ |
| `statement` / `statement_alt`   | One short sentence, full bleed — two colourways   | —                  |
| `big_fact` / `big_fact_alt`     | Big number (`#` heading) plus caption (paragraph) | —                  |
| `big_quote` / `big_quote_alt`   | Pull quote as the `#` heading                     | `::attribution::`  |

### Everything else

| Layout          | Use for                                  | Frontmatter                | Slots                                |
| --------------- | ---------------------------------------- | -------------------------- | ------------------------------------ |
| `showcase`      | One hero image plus two supporting shots | —                          | `::main::` `::top::` `::bottom::`    |
| `educator`      | Educator bio with two photos             | —                          | `::photo1::` `::photo2::`            |
| `student_area`  | QR code linking to the student area      | `url`, `caption`           | `::title::` `::screen::` `::caption::`|
| `closing_slide` | Copyright closer                         | `startYear`, `dates`       | —                                    |
| `default`       | Plain slide with footer and page number  | —                          | —                                    |

## Components and styling

These are available on any slide without importing anything.

**Columns.** Wrap each column in a `<div>`, with blank lines around the
markdown inside so it still parses:

```md
<TwoColumns>

<div>

## Left

- Point one.

</div>

<div>

## Right

- Point two.

</div>

</TwoColumns>
```

`<ThreeColumns>` works the same way. `<Comparisons>` lays out a grid for
comparing several options side by side.

**Inline character styles**, via MDC:

| Syntax                | Renders as             |
| --------------------- | ---------------------- |
| `[terminology]{.em}`  | Emphasised term        |
| `[Settings]{.ui}`     | A UI element name      |
| `[npm install]{.code}`| Inline code            |

**OS logos:** `<Logo name="mac" />`, `windows`, or `linux`.

**Images** take utility classes — `![alt](./duck.webp){.w-60 .mr-auto}`. Use
`mx-auto` to centre, `mr-auto` to left-align.

**Code blocks** support size classes and step-through highlighting:

````md
```python {class:'code-md'}
def greet(name):
    return f"Hello, {name}!"
```

```python {all|2-3|6}
# highlights everything, then lines 2-3, then line 6 as you advance
```
````

Sizes are `code-lg`, `code-md` and `code-sm`.

## Device mockups

`<DeviceFrame>` wraps a screenshot in a device bezel at build time:

```md
<DeviceFrame src="./phone.png" device="iphone-6.3" />
<DeviceFrame src="./tablet.png" device="ipad-13-alt" orientation="landscape" />
```

| Preset               | Resolution  | Devices                        |
| -------------------- | ----------- | ------------------------------ |
| `iphone-6.9`         | 1320×2868   | iPhone Air, 17/16 Pro Max      |
| `iphone-6.9-alt`     | 1290×2796   | iPhone 16 Plus, 15 Pro Max     |
| `iphone-6.3`         | 1206×2622   | iPhone 17 Pro, 17              |
| `iphone-6.3-alt`     | 1179×2556   | iPhone 16 Pro, 16, 15 Pro      |
| `iphone-6.1`         | 1170×2532   | iPhone 14, 13, 12              |
| `iphone-5.5`         | 1242×2208   | iPhone 8 Plus, 7 Plus          |
| `android-phone`      | 1080×1920   | Standard Android (16:9)        |
| `android-phone-tall` | 1080×2400   | Modern Android (20:9)          |
| `ipad-13`            | 2064×2752   | iPad Pro M5/M4                 |
| `ipad-13-alt`        | 2048×2732   | iPad Pro 12.9" (6th–1st gen)   |
| `ipad-11`            | 1668×2388   | iPad Pro 11", iPad Air         |
| `ipad-11-alt`        | 1640×2360   | iPad (10th gen), iPad Air (M2) |
| `android-tablet-10`  | 1600×2560   | 10" Android tablet             |

## Assets

Put images and videos next to `slides.md` and reference them relatively
(`./ducky.webp`). Theme assets — the ICE logo, backgrounds, OS logos and the
bundled fonts — ship with the theme and need nothing from you.

## Reference deck

[example/slides.md](example/slides.md) demonstrates every layout, component and
styling feature in one deck. It is the fastest way to see what's available:

```bash
git clone git@github.com:icemaltacode/ice_slidev.git
cd ice_slidev && npm install && npm run demo
```

## Rebranding

Every colour and design token lives in [styles/tokens.css](styles/tokens.css).
Edit that one file to retheme; light and dark schemes are both supported.

## Security

A fresh deck installs ~690 packages, almost all of them Slidev's toolchain, so
`npm audit` has plenty to say. `ice-deck-init` writes three overrides into your
`package.json` to clear what is actually fixable:

```json
"overrides": {
  "sharp": "^0.35.3",
  "dompurify": "^3.4.13",
  "js-yaml@4": "^4.3.1"
}
```

`sharp` reaches the deck through `appshots`, which powers `<DeviceFrame>` and
pins `^0.33.5` — a range carrying four high-severity libvips CVEs. `dompurify`
arrives via `monaco-editor` inside Slidev, and `js-yaml` via the Slidev parser.
The `js-yaml@4` key scopes that last one to the 4.x line, since the tree also
contains an unaffected `js-yaml@3` that must not be dragged across a major.
Overrides have to live in the deck because npm only honours them from the root
project; the theme cannot patch these for its consumers.

That takes a new deck from 11 advisories to 4. The remaining four are all one
issue: a denial-of-service in `image-size`, pulled in by `pptxgenjs` for
Slidev's PowerPoint export. **Every published version of `image-size` is
affected**, so no override fixes it, and npm's suggested `--force` remedy
downgrades `@slidev/cli` by three years. It is reachable only by exporting a
deck to PPTX with a deliberately malformed ICNS, JXL or HEIF image, which is
not a threat model that applies to course material you assembled yourself.
Leave it, and revisit when `pptxgenjs` moves on.

You may also see npm report a blocked install script for `sharp`. `sharp` ships
its binary as a prebuilt optional dependency, so the script is only a fallback
check and refusing it changes nothing — verified by building a deck with
`<DeviceFrame>` and confirming the frames render. `ice-deck-init` records that
decision as `"allowScripts": { "sharp": false }` so npm stops asking.

## Theme development

To work on the theme against a deck you're writing, install the theme's own
dependencies first, then link it from the deck:

```bash
cd ice_slidev && npm install     # required — a linked theme resolves its
                                 # dependencies from its own directory
cd ../my-course && npm link ../ice_slidev
```

The theme is plain Vue and CSS, so Slidev hot-reloads layout and style edits
with no build step.

## License

MIT.

Circular Std is a commercial typeface licensed from Lineto and is bundled in
[assets/fonts/](assets/fonts/). Keep this repository private and do not
redistribute the font files.
