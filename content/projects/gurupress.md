---
title: "GuruPress"
subtitle: "Multi-site WordPress monitoring dashboard"
description: "Complete monitoring dashboard for managing and tracking the health of multiple WordPress websites from a single interface."
slug: gurupress
category: Experiments
status: Live
year: "2026"
date: "2026-02-15"
tags: ["Next.js", "TypeScript", "Prisma", "PHP", "Node.js"]
coverGradient: "linear-gradient(145deg, #10101a 0%, #181428 60%, #1e1630 100%)"
stats:
  - label: "Stack"
    value: "Next.js + PHP"
  - label: "Type"
    value: "Dashboard"
links:
  live: "https://gurupress.vercel.app/"
---

## The Problem

Managing multiple WordPress websites means juggling several admin panels, each with its own update queue, uptime status, and plugin list. **GuruPress** consolidates everything into a single dashboard.

## Features

- Centralised view of all connected WordPress sites
- Plugin and theme update tracking
- Uptime and health monitoring
- Site metadata and quick-access links

## Architecture

The frontend is a **Next.js** dashboard consuming data from a lightweight **PHP** bridge installed on each WordPress site. The bridge exposes a minimal REST endpoint; GuruPress polls it on a schedule and stores results via **Prisma**.

This hybrid approach avoids any dependency on third-party WordPress hosting APIs and works with any self-hosted or managed WordPress install.
