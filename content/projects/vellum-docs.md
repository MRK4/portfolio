---
title: "Vellum Docs"
subtitle: "Documentation that reads like it was printed on good paper"
description: "An opinionated documentation site that pairs vellum-weight paper textures with digital ink animations."
slug: vellum-docs
category: Experiments
status: WIP
year: "2025"
date: "2025-02-14"
tags: ["Next.js", "MDX", "Framer Motion", "Typography"]
coverGradient: "linear-gradient(145deg, #151316 0%, #1c1a20 50%, #221e28 100%)"
stats:
  - label: "Lighthouse score"
    value: "98"
  - label: "Themes"
    value: "4"
  - label: "Animation budget"
    value: "< 16ms"
  - label: "Zero JS fallback"
    value: "100%"
links:
  github: "https://github.com/clementpoudree/vellum-docs"
---

## The Premise

Technical documentation is the most read and least loved category of web content. It is functional by necessity and aesthetic by accident — usually the accident of a default theme.

**Vellum Docs** is a provocation: what if documentation was as carefully considered as the library it describes? What if reading a README felt like opening a well-printed book rather than parsing a terminal output?

The name comes from the material used for medieval manuscripts: thin, translucent, slightly warm. The goal is that quality of *substantial lightness* — content that feels weighty without being heavy.

> "The best documentation disappears. What remains is understanding."

## Typographic System

The typographic hierarchy was designed around a single constraint: *a developer should be able to read code and prose on the same page without adjusting their eyes.* This means the code and prose typefaces must share a common visual weight at their intended sizes.

After testing twelve combinations, the pairing that worked was **Newsreader** (serif, 17px) for prose and **Iosevka** (monospace, 14px) for code. The size differential compensates for the optical weight difference between proportional serif and monospace glyphs — at these sizes, they feel equal.

The ink-on-paper effect is achieved through a combination of:

1. A subtle sepia-tinted background (`#f9f6f0`) that reads as off-white but never glaring
2. A noise texture layer at 2% opacity that breaks the "too clean" quality of flat screens
3. Ink bleed simulation on headings — a 0.5px text-shadow in the same color as the text, offset by 0.3px, that mimics the slight spread of ink on textured paper

### The Animation Budget

Every animation in Vellum is subject to a **16ms budget** — one frame at 60fps. This is a hard constraint, not a guideline. The animation system uses `will-change: transform` exclusively, avoiding any property that triggers layout or paint.

The signature "ink reveal" animation for content entering the viewport:

```typescript
const inkReveal = {
  initial: { opacity: 0, filter: "blur(2px)", y: 8 },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};
```

The blur is kept at 2px — enough to suggest softness without creating a visible artifact on retina displays. The cubic bezier `[0.22, 1, 0.36, 1]` is the "expo out" curve, which gives the animation a physical quality without overshooting.

## Zero-JS Fallback

Documentation sites are frequently read in restricted environments — corporate proxies, browser extensions that strip scripts, low-power devices. Every Vellum page must be fully readable without JavaScript.

This is achieved through a combination of Next.js static generation and progressive enhancement: the base HTML contains all content and meaningful CSS styles, and the JavaScript layer adds animations and search — enhancements, not prerequisites.

The Lighthouse accessibility score of 98 reflects this philosophy: content structure, heading hierarchy, and color contrast ratios were validated before any animation layer was added.

---

## Current Status and Remaining Work

The four available themes (Manuscript, Nocturne, Daylight, Ink) are complete and stable. The search implementation — using a client-side index built from the MDX AST at build time — works but is slow on documentation sets larger than 500 pages.

The remaining WIP items are:

1. *Version switcher* — the most requested feature, requires a significant routing change
2. *Localization support* — the animation timing system doesn't account for right-to-left layouts
3. *Figma component kit* — several contributors have requested design tokens in Figma format

The project has attracted more interest than expected for an experiment, and I'm considering whether to invest in a production-ready release. The decision depends on whether the version switcher problem has a clean solution — without it, Vellum isn't usable for the libraries it's actually meant to serve.
