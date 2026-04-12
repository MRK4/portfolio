---
title: "Fracture UI"
subtitle: "Components that reveal the logic beneath"
description: "Component library built on the principle that interfaces should crack under scrutiny — exposing the logic beneath."
slug: fracture-ui
category: Open Source
status: Archived
year: "2023"
date: "2023-03-20"
tags: ["React", "TypeScript", "Storybook", "CSS Variables"]
coverGradient: "linear-gradient(145deg, #111316 0%, #1a1820 50%, #201e28 100%)"
stats:
  - label: "Components"
    value: "47"
  - label: "Weekly downloads"
    value: "1 200"
  - label: "Bundle (tree-shaken)"
    value: "12 KB"
  - label: "Zero runtime deps"
    value: "true"
links:
  github: "https://github.com/clementpoudree/fracture-ui"
---

## The Thesis

Most component libraries hide their decisions. You get a button that looks a certain way because someone at a company with a design team decided it should look that way, and your job is to override their decisions until your product looks like yours.

**Fracture UI** was built around the opposite thesis: *expose every decision as a variable.* Every visual property — spacing, timing, color, radius, shadow — is surfaced as a CSS custom property with a sensible default. The components are intentionally minimal. The "cracking" metaphor comes from the idea that good components should reveal their structure when you look closely, not obscure it.

> "A component that you cannot understand is a component you cannot trust."

## Architecture

The library is organized into four layers:

1. **Tokens** — a flat set of CSS custom properties covering the full design primitive space
2. **Primitives** — unstyled components with semantic HTML and ARIA attributes
3. **Compositions** — styled components built entirely from primitives and tokens
4. **Patterns** — common UI patterns assembled from compositions

The primitive layer is the most unusual. A `<Button.Root>` component provides only the semantic structure — `role`, `aria-*` attributes, focus management, and keyboard interaction — with zero visual styling. Every composition is built from it:

```tsx
// Primitive — zero styles
<Button.Root onPress={handlePress} isDisabled={loading}>
  {children}
</Button.Root>

// Composition — uses tokens
<FilledButton onPress={handlePress} isDisabled={loading}>
  {children}
</FilledButton>
```

This separation means that teams with strong design systems can use the primitives directly and build their own compositions, while teams that want to move fast can use the compositions out of the box.

### Zero Runtime Dependencies

The 12 KB tree-shaken bundle includes the complete composition layer — all 47 components — because there are no external dependencies to exclude. Animations are handled through CSS transitions, not a JavaScript animation library. Focus management is a small custom implementation rather than a dependency on `@radix-ui/focus-trap`.

This was a deliberate constraint with significant trade-offs: the focus management implementation has edge cases that a battle-tested library would handle correctly, and the animation vocabulary is more limited than what a proper animation library would provide.

## Why Archived

Fracture UI was archived in Q4 2023 for a straightforward reason: **Radix UI and shadcn/ui solved the same problem better.**

Radix provides a more comprehensive primitive layer with better accessibility coverage. shadcn/ui provides a more sophisticated composition pattern (copying components into your codebase rather than importing a package). The combination of these two tools renders Fracture's thesis — expose structure, avoid hiding decisions — both validated and superseded.

The library remains available and is still downloaded by teams that found it during its active period, but no new features will be added.

## What It Taught Me

The zero-dependency constraint was valuable as a learning exercise. Building focus management from scratch forced a deep understanding of browser focus behavior across different operating systems and assistive technologies — knowledge that would have remained superficial if I had simply imported `focus-trap`.

The token architecture influenced every subsequent project. The convention of surfacing design decisions as named CSS custom properties — rather than hardcoded values — is now the default approach in all my work, including this portfolio.

The lesson about competition timing was harder. Fracture was architecturally sound but arrived eighteen months after Radix and six months before shadcn's breakout adoption. The timing window for a new component library — a category with significant network effects — is narrow, and I was in it without knowing it.
