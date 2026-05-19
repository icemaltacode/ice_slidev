---
theme: ../
title: ICE Theme Demo
info: |
  Reference deck for the slidev-theme-ice — one slide per template.
layout: title
drawings:
  persist: false
mdc: true
---

---
layout: module_title
---
# Module Title Here

::number::

#1

---
layout: topic_title
---

---
layout: contents
unit: '1.1'
---

---
layout: unit_title
---

---
layout: content_plain
unit: '1.1.1'
---

# Lorem Ipsum Dolor

- [Sed ut perspiciatis?]{.em}
  - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
  - Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
  - Duis aute irure dolor in [reprehenderit]{.em} in voluptate velit esse cillum.
- [Excepteur sint occaecat?]{.em}
  - Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit.
  - Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.

::annotations::

Lorem ipsum annotation source — *consectetur adipiscing elit*.

---
layout: content_plain
unit: '1.1.2'
---

# Framework Comparison

<ThreeColumns>

<div>

## React

- Component-based
- JSX syntax
- [Large ecosystem]{.em}
- One-way data flow

</div>

<div>

## Vue

- Single-file components
- Template syntax
- [Progressive]{.em} adoption
- Two-way binding

</div>

<div>

## Svelte

- Compiler-based
- Minimal runtime
- [Built-in]{.em} transitions
- Less boilerplate

</div>

</ThreeColumns>

::annotations::

A high-level comparison of three popular component frameworks.

---
layout: content_plain
unit: '1.1.3'
---

# Imperative vs Declarative

<TwoColumns>

<div>

## Imperative

- Describe [how]{.em} to do something
- Step-by-step instructions
- Mutable state, sequential logic
- Example: vanilla DOM manipulation

</div>

<div>

## Declarative

- Describe [what]{.em} you want
- Framework handles the how
- State drives the UI
- Example: React, Vue templates

</div>

</TwoColumns>

::annotations::

Two complementary paradigms — most modern UI frameworks favour declarative.

---
layout: content_plain
unit: '1.1.4'
---

# Choose Your Framework

<Comparisons>

<div>

## Option 1

The text goes here

</div>

<div>

## Option 2

The text goes here

</div>

<div>

## Option 3

The text goes here

</div>

<div>

## Option 4

The text goes here

</div>

</Comparisons>

---
layout: project_title
---

---
layout: closing_slide
---

---
layout: content_with_image
unit: '1.1.1'
---

---
layout: content_with_code
unit: '1.1.1'
---

# Using `useState`

- Returns a stateful value and an updater
  - Initial value passed as argument
  - Updates trigger a re-render
- State lives across renders

::code::

```tsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  )
}
```

::annotations::

`useState` is the foundational React hook for component state.

---
layout: content_phone
unit: '1.1.1'
---

---
layout: content_desktop
unit: '1.1.1'
---

---
layout: student_area
url: 'https://bit.ly/3E1JOrJ'
---

---
layout: educator
---

---
layout: statement
---

---
layout: statement_alt
---

---
layout: big_fact
---

---
layout: big_fact_alt
---

---
layout: big_quote
---

---
layout: big_quote_alt
---

---
layout: showcase
---

---
layout: content_plain
unit: '1.1.5'
---

# Character Styles

- Click the [Settings]{.ui} button to open the preferences panel.
- Use [npm install]{.code} to install dependencies.
- The [Submit]{.ui} button sends the form to [/api/users]{.code}.
- Wrap [terminology]{.em} in emphasis for emphasised inline text.
- Run on <Logo name="mac" /> macOS, <Logo name="windows" /> Windows, or <Logo name="linux" /> Linux.

::annotations::

- Three inline character styles: [.em] for emphasis, [.ui] for UI element names, [.code] for inline code.
- Inline logos via `<Logo name="mac|windows|linux" />`.
