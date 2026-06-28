---
title: "LinkAudit"
subtitle: "Backlink monitoring built for indie hackers, not agencies"
description: "Backlink monitoring and brand mention alerts for indie hackers, creators, and freelancers — at a price that doesn't require a marketing budget."
slug: linkaudit
category: SaaS
status: WIP
year: "2026"
date: "2026-06-01"
tags: ["Next.js", "TypeScript", "Supabase", "Stripe", "DataForSEO"]
coverGradient: "linear-gradient(145deg, #0f1a0f 0%, #0d1f14 60%, #0a1c10 100%)"
coverImage: "/projects/linkaudit.webp"
stats:
  - label: "Links indexed"
    value: "2T+"
  - label: "Data source"
    value: "DataForSEO"
  - label: "Scan frequency"
    value: "Every 12h"
  - label: "Alert channels"
    value: "Email + Slack"
---

## The Problem Space

The backlink monitoring market has a structural gap at the bottom. Ahrefs costs $129/month. Semrush costs $139/month. Brand24 costs $199/month. These tools are built for SEO agencies — and their pricing reflects that.

Meanwhile, there are hundreds of thousands of solo founders, bloggers, and freelancers who have one legitimate need:

> *"I want to know when someone links to me, and when an important link disappears."*

Google Alerts is free and doesn't cover backlinks. Linkstant costs $9/month but sends a raw URL with zero context. Between the two, there is nothing reliable.

**LinkAudit fills that gap.** Four features, done properly, at a price that makes sense for people who aren't running a 50-client SEO agency.

## What It Does

The product is intentionally narrow. No keyword research, no rank tracking, no site audit. Just the four things that matter for 80% of people who care about backlinks:

| Alert type | What it means |
|---|---|
| New backlink | A site just linked to your domain |
| Lost backlink | An existing link disappeared |
| Unlinked mention | Your brand was cited without a link — a free link reclaim opportunity |
| History dashboard | A chronological timeline of every event, with context |

Each alert includes the source domain's **Domain Rating**, the anchor text, and a contextual excerpt — enough to act without opening the dashboard.

## Architecture

```
User browser
    │
    ▼
Next.js app (Vercel)
    ├── /app          → Pages (dashboard, onboarding, settings)
    ├── /api          → Cron handler, Stripe webhooks, Slack alerts
    └── /components   → UI components
    │
    ▼
Supabase (PostgreSQL)
    ├── domains        → domains under monitoring per user
    ├── backlinks      → known backlink state (snapshot per scan)
    └── events         → new / lost / mention events
    │
    ▼
Vercel Cron (every 12h)
    └── For each active domain:
          1. Query DataForSEO Backlinks API
          2. Diff against stored state
          3. Write new events
          4. Dispatch alerts (Resend email + Slack webhook)
```

The core loop is a diff engine: every scan compares the current DataForSEO response against the last known snapshot in the database, then generates events only for what changed. This keeps alerts signal-dense — no noise, no repeats.

## The Economics

DataForSEO is the backbone. It's the API layer behind many well-known SEO tools, available to developers at a fraction of the cost: $0.02 per request, $0.00003 per row of backlink data. For a typical user with one domain scanned twice a day, the data cost is roughly **$1–3/month** — which is what makes a $9/month plan viable with healthy margins.

At 50 Solo users: **€450 MRR against ~$150/month infrastructure.** That's roughly 80% gross margin before any Pro upgrades.

## The Unlinked Mention Feature

Most tools in this price range don't offer unlinked mention detection at all — it's a feature that typically sits behind $100+/month paywalls.

When someone writes about your product but forgets the link, that's a free editorial backlink waiting to be claimed. LinkAudit detects those mentions via the DataForSEO Content Analysis API and generates a pre-filled link reclaim email template, ready to send in one click.

It turns a passive monitoring tool into an active link-building workflow.

## What I Would Change

The current architecture runs one cron job that processes all active domains sequentially. At scale, this becomes a bottleneck — a domain with a large backlink profile takes disproportionately long and can delay alerts for other users in the same batch.

The right fix is to move to a queue-based model (one job per domain, dispatched by the cron, processed independently), which would also make failure handling cleaner. It's on the roadmap for V1.

The free plan conversion triggers are also something I'm still calibrating. Showing a "4 alerts suppressed" banner is blunt — I'd rather find a moment where the user is engaged enough that an upgrade feels like the obvious next step, not a roadblock.
