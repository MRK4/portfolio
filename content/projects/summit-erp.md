---
title: "Summit ERP"
subtitle: "Resource planning as clear as mountain air"
description: "Re-imagining resource planning for sustainable housing startups. Minimalist data visualization at scale."
slug: summit-erp
category: Client Work
status: Live
year: "2024"
date: "2024-04-12"
tags: ["React", "D3.js", "Go", "TimescaleDB"]
coverGradient: "linear-gradient(145deg, #111316 0%, #1a1f1c 50%, #1e2420 100%)"
stats:
  - label: "Data points / day"
    value: "2.4M"
  - label: "Dashboard load"
    value: "< 1.2s"
  - label: "Material modules"
    value: "34"
  - label: "Team size tracked"
    value: "180+"
links:
  live: "https://summit-erp.io"
---

## The Client's Challenge

The client — a network of sustainable housing cooperatives across three countries — had outgrown spreadsheets and was drowning in the data gravity of their own growth. They tracked materials, labor, subcontractors, permits, and carbon offset credits across 40 simultaneous projects, each with its own stakeholder reporting requirements.

**Summit ERP** was built to reduce the cognitive load of resource visibility. Not to replace judgment — but to make the information needed to exercise judgment *immediately legible*.

The guiding design principle: **every metric should answer a question a real person is asking at 8am on a Monday.** Anything that doesn't serve that test is noise.

> "A dashboard that shows everything shows nothing. We built for the Monday morning question."

## Visualization Philosophy

ERP systems are historically punishing to use because they optimize for data completeness rather than comprehension. Summit inverts this: the primary views are narrative, not tabular.

The main project dashboard uses a **material flow diagram** — a Sankey chart variant built in D3.js — that shows where material is accumulating, where it's moving faster than expected, and where blockages are forming. Project managers reported that they understood their supply chain status in under 30 seconds, compared to the 15–20 minutes previously spent assembling the picture from separate reports.

```typescript
const sankeyLayout = d3
  .sankey<MaterialNode, MaterialLink>()
  .nodeWidth(20)
  .nodePadding(12)
  .extent([[0, 0], [width, height]]);

const { nodes, links } = sankeyLayout({
  nodes: materialNodes.map((d) => ({ ...d })),
  links: materialFlows.map((d) => ({ ...d })),
});
```

Color encodes **velocity** rather than category — a deliberate departure from the categorical coloring typical of Sankey diagrams. Materials moving faster than forecast are amber; materials stalled are muted violet. The choice maps to the design system's color vocabulary: amber for active attention, violet for informational context.

## Time-Series Architecture

The project generates approximately 2.4 million data points per day across all sites — material deliveries, labor check-ins, equipment telemetry, and permit status changes. This volume ruled out a standard relational database for the analytics queries that power the dashboards.

**TimescaleDB** was chosen for its PostgreSQL compatibility (the team already knew SQL) and its hypertable compression, which reduced raw storage requirements by 73% compared to an uncompressed approach.

| Query type | p50 | p95 | p99 |
|---|---|---|---|
| 7-day material flow | 180ms | 340ms | 580ms |
| 30-day cost trend | 290ms | 510ms | 890ms |
| Cross-site comparison | 420ms | 780ms | 1 240ms |

The sub-1.2s dashboard load time is achieved through a combination of server-side query caching (60-second TTL) and incremental hydration — the critical path renders with cached data, and fresher data replaces it silently on the client.

---

## Retrospective

The material flow diagram was the right bet. It became the feature that drove adoption within the network — teams were demoing it to each other before formal rollout.

The Go backend was the wrong choice for the team's context. The client has no Go expertise, and the codebase has already needed two rounds of external consultancy for maintenance. A Node.js service — less performant at the margin, but familiar to every web developer — would have been the more honest recommendation given the client's team composition.

Carbon offset credit tracking, a module I was proud of technically, has seen almost zero usage. The clients track their offsets in a separate purpose-built tool and had no interest in consolidating. A discovery conversation earlier in the project would have saved three weeks of development.
