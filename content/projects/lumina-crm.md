---
title: "Lumina CRM"
subtitle: "Relationship intelligence for the luxury tier"
description: "High-end relationship management tool for luxury concierge services, built with privacy as a first-class citizen."
slug: lumina-crm
category: Client Work
status: Live
year: "2025"
date: "2025-01-20"
tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"]
coverGradient: "linear-gradient(145deg, #1a1c1f 0%, #1c2028 60%, #24282e 100%)"
stats:
  - label: "Contacts managed"
    value: "40k+"
  - label: "Response time"
    value: "< 80ms"
  - label: "Data residency"
    value: "EU-only"
  - label: "Uptime SLA"
    value: "99.95%"
links:
  live: "https://lumina-crm.com"
---

## The Brief

The client — a boutique concierge firm operating across Paris, Geneva, and Dubai — came with a specific mandate: their existing CRM was "a filing cabinet wearing a blazer." Contact data was scattered across three tools, relationship history was stored in email threads, and the concept of *proactive* client care was entirely absent.

**Lumina CRM** was built from scratch as a bespoke alternative. The guiding principle was that every interaction with the interface should feel as considered as the service it supports.

> "A concierge doesn't react. They anticipate. The software should do the same."

Privacy was not a feature — it was a constraint. All data needed to remain within EU jurisdiction at every layer: compute, storage, and backups. This ruled out several otherwise-attractive SaaS components and drove a number of architectural decisions.

## Design Philosophy

The interface was designed around the concept of a *dossier* — a rich, layered view of a single relationship rather than a flat contact record. Each client page aggregates:

- **Timeline** — every logged interaction, with sentiment annotations
- **Preferences** — dietary needs, travel habits, discretionary spending tier
- **Network map** — relationships between contacts, surfaced as a lightweight graph
- **Upcoming touchpoints** — proactively surfaced reminders, not reactive tasks

The color palette deliberately avoided the garish dashboards typical of enterprise software. High contrast was replaced with *high signal* — information density without visual noise.

### The Reminder Engine

The most technically interesting piece is the reminder engine. Rather than calendar-based triggers, Lumina uses a **relationship decay model**: contacts that haven't been touched in a sliding window proportional to their tier receive progressively more urgent signals. A Tier 1 client untouched for 14 days is flagged differently than a Tier 3 contact untouched for 60 days.

```typescript
function decayScore(lastContact: Date, tier: ClientTier): number {
  const daysSince = differenceInDays(new Date(), lastContact);
  const window = DECAY_WINDOWS[tier]; // [14, 30, 60] days per tier
  return Math.min(1, daysSince / window);
}
```

A score approaching `1.0` triggers the amber "reconnect" signal in the UI — a subtle but persistent nudge that respects the concierge's judgment while ensuring nothing falls through the cracks.

## Data Architecture

The data model was carefully normalized around the principle that **relationships are first-class entities**, not attributes of contacts. A `Relationship` record connects two `Contact` records with typed edges (`colleague`, `family`, `associate`) and carries its own interaction history.

| Table | Rows (prod) | Notes |
|---|---|---|
| `contacts` | 41 200 | Soft-deleted, never purged |
| `relationships` | 8 400 | Bidirectional edges |
| `interactions` | 312 000 | Append-only log |
| `reminders` | 1 900 | Active queue |

PostgreSQL row-level security ensures that each concierge agent can only access the contacts assigned to their portfolio — a property verified by the client's external security audit.

---

## Retrospective

The decay model works well in practice, but the tier-window constants were set empirically during the pilot phase and have never been formally validated. A proper statistical analysis of interaction patterns — which the client now has enough data to support — would likely produce meaningfully different values.

The graph visualization for the network map was the feature that generated the most friction during handover. The client's team found it *fascinating* but rarely actionable. In hindsight, a simpler "people this contact knows" list would have delivered 90% of the value with a fraction of the implementation complexity.
