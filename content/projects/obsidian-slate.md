---
title: "Obsidian Slate"
subtitle: "A markdown engine built for those who write in the dark"
description: "A custom markdown engine designed for poets. Bringing terse typography that pulses with atmospheric pressure."
slug: obsidian-slate
category: Experiments
status: WIP
year: "2024"
date: "2024-07-03"
tags: ["Rust", "WASM", "Typography", "Parser"]
coverGradient: "linear-gradient(145deg, #111316 0%, #1a1c22 50%, #1e202a 100%)"
stats:
  - label: "Parse speed"
    value: "4.1 MB/s"
  - label: "Custom AST nodes"
    value: "23"
  - label: "Export formats"
    value: "6"
  - label: "Bundle size"
    value: "48 KB"
links:
  github: "https://github.com/clementpoudree/obsidian-slate"
---

## Why Another Markdown Engine

Standard markdown was designed for documentation. **Obsidian Slate** was designed for writing that *breathes* — where the space between words carries as much weight as the words themselves.

The existing tooling forces a binary choice: either you use a general-purpose renderer with generic typographic defaults, or you write raw HTML. Neither option serves the poet who wants semantic intent to drive visual output. A line marked with `~~` should not merely render as strikethrough — it should be *erased*, with different weight than a correction.

> "Every markup language is an argument about what deserves a name. Slate makes different arguments."

This project is an experiment in *opinionated parsing* — building a language that encodes typographic meaning directly into its syntax.

## The Extended Syntax

Slate introduces seven new node types beyond CommonMark:

- `|word|` — *breath pause*. Renders as a thin space on either side, slowing the reader's eye.
- `^word^` — *elevation*. Superscript with semantic weight, used for asides that belong above the line.
- `~word~` — *erasure*. Strikethrough, but typeset with a lighter weight and reduced opacity — a ghost, not a correction.
- `{word}` — *whisper*. Reduced size and muted color, for the thing said under the breath.
- `[[ ]]` — *margin note*. Content placed in the right margin on wide viewports, inline on narrow.
- `---word---` — *em-dash expansion*. Inserts proper em-dashes with non-breaking spaces, a correction of one of markdown's most persistent failures.
- `:::` blocks — *tonal containers*. Like fenced code blocks, but for atmosphere rather than code.

### The AST

The parser produces a custom AST that extends the MDAST specification:

```rust
#[derive(Debug, Clone)]
pub enum SlateNode {
    // Standard MDAST nodes
    Paragraph(Vec<SlateNode>),
    Heading { depth: u8, children: Vec<SlateNode> },
    Text(String),
    // Slate extensions
    Breath { word: String },
    Elevation { children: Vec<SlateNode> },
    Erasure { children: Vec<SlateNode> },
    Whisper { children: Vec<SlateNode> },
    MarginNote { children: Vec<SlateNode> },
    TonalContainer { tone: String, children: Vec<SlateNode> },
}
```

Each node carries enough information for the renderer to make typographic decisions without consulting the surrounding context — a constraint that simplifies both the renderer and the export pipeline.

## Performance

The parser is written in Rust and compiled to WebAssembly for browser use. The 4.1 MB/s throughput is measured on a 2021 M1 MacBook Pro; WASM performance on a mid-range browser drops to approximately 2.3 MB/s — still well above what any human writing session requires.

| Platform | Throughput | Cold start |
|---|---|---|
| Native (Rust) | 4.1 MB/s | — |
| WASM (V8) | 2.3 MB/s | 12ms |
| WASM (Safari) | 1.9 MB/s | 18ms |

The 48 KB WASM bundle includes the parser, the default renderer, and all six export format modules. The size budget was a deliberate constraint: Slate must be embeddable in any page without apology.

---

## Current Status

The parser is stable. The renderer for HTML output is complete. The remaining work is concentrated in two areas:

*PDF export* is the most requested feature and the most technically challenging. Getting correct typographic output from a browser renderer requires either a headless browser or a custom PDF composition library — neither option is satisfying at the current bundle size target.

*The editor* — a planned companion component — exists as a prototype but lacks the inline preview mode that makes the extended syntax usable without mental overhead. This is the piece I'm least satisfied with, and the reason the project remains WIP.
</content>
