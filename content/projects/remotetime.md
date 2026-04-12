---
title: "RemoteTime"
subtitle: "Visualize collaborator availability across time zones"
description: "Proof of concept web app for remote-first companies to see at a glance who is available and when, across every time zone."
slug: remotetime
category: Experiments
status: Live
year: "2026"
date: "2026-01-01"
tags: ["Next.js", "TypeScript", "Node.js", "Shadcn/ui"]
coverGradient: "linear-gradient(145deg, #0f1923 0%, #0d2137 60%, #102840 100%)"
stats:
  - label: "Stack"
    value: "Next.js"
  - label: "Type"
    value: "PoC"
links:
  github: "https://github.com/MRK4/remotetime"
  live: "https://remotetime.vercel.app/"
---

## The Problem Space

Remote teams span multiple continents and time zones. Scheduling a simple call turns into a mental puzzle — opening world clocks, converting offsets, and still missing someone who is off for a local holiday.

**RemoteTime** removes that friction entirely by providing a single visual surface where every collaborator's availability is visible at a glance.

## What it Does

- Add teammates with their location or UTC offset
- See a live timeline of who is currently online, in a meeting window, or asleep
- Quickly identify overlap windows for scheduling across the team

## Tech Choices

The stack is deliberately lightweight: **Next.js App Router** for server-side rendering and routing, **Shadcn/ui** for accessible, unstyled-at-heart components, and plain **TypeScript** throughout.

No database — availability is computed client-side from user-supplied offsets, keeping the app fast and zero-maintenance.
