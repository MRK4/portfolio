---
title: "Nocturnal API"
subtitle: "Serverless orchestration for the hours nobody watches"
description: "An elegantly thin server toolkit for managing serverless functions during off-peak hours."
slug: nocturnal-api
category: Open Source
status: Live
year: "2023"
date: "2023-11-08"
tags: ["Node.js", "TypeScript", "Serverless", "Cron"]
coverGradient: "linear-gradient(145deg, #0e1012 0%, #141618 50%, #1a1c20 100%)"
stats:
  - label: "NPM downloads"
    value: "24k/mo"
  - label: "Scheduling precision"
    value: "± 200ms"
  - label: "Cold start overhead"
    value: "< 5ms"
  - label: "Bundle size"
    value: "3.2 KB"
links:
  github: "https://github.com/clementpoudree/nocturnal-api"
---

## The Context

Serverless platforms bill by invocation and execution time. Most teams focus obsessively on reducing latency — but the more significant cost driver is often *unnecessary* invocations: scheduled jobs that run every minute when they only need to run three times a day, health checks that fire during traffic peaks, batch operations competing with user-facing requests for cold-start capacity.

**Nocturnal API** is a zero-dependency orchestration layer that answers a deceptively simple question: *when is the best time for this to run?*

> "Off-peak hours are not just cheaper. They are quieter. Some work belongs in the quiet."

The toolkit provides three primitives: a *temporal scheduler* that respects traffic patterns, a *cost-aware queue* that defers non-urgent work, and a *shadow executor* that replays failed jobs without disrupting the live system.

## The Scheduling Model

Standard cron-based scheduling is oblivious to system state. Nocturnal's scheduler observes a rolling traffic window and computes an **execution score** for each pending job:

```typescript
interface JobScore {
  urgency: number;        // 0-1, set by the caller
  trafficFactor: number;  // 0-1, inverse of current traffic percentile
  costFactor: number;     // 0-1, based on current provider spot pricing
  combined: number;       // weighted harmonic mean
}

function score(job: Job, window: TrafficWindow): JobScore {
  const urgency = job.urgency ?? 0.5;
  const trafficFactor = 1 - window.percentile(Date.now());
  const costFactor = 1 - window.costPercentile(Date.now());
  const combined = harmonicMean([urgency, trafficFactor, costFactor], [0.4, 0.35, 0.25]);
  return { urgency, trafficFactor, costFactor, combined };
}
```

Jobs with a `combined` score above a configurable threshold are dispatched immediately. Below the threshold, they are placed in the deferred queue and re-scored every 30 seconds until conditions improve or the deadline approaches.

## Design Constraints

The 3.2 KB bundle size is the most visible constraint and the one that required the most discipline. The original prototype was 14 KB — four distinct refactoring passes removed abstractions that seemed useful during design but were never exercised in real integrations:

1. The plugin registry was replaced by direct constructor injection
2. The metrics emitter was extracted into an optional peer dependency
3. The retry policy object was collapsed into three simple parameters
4. The transport abstraction was removed — HTTP-only, no illusions about other protocols

The `± 200ms` scheduling precision is intentionally documented. Nocturnal does not attempt sub-second precision — that is not what deferred off-peak work requires, and claiming it would be dishonest.

## Adoption

The project found an audience in the cost-optimization layer of mid-size SaaS applications — exactly the context it was designed for. The most common integration pattern is alongside Vercel Cron Jobs or AWS EventBridge, where Nocturnal handles the *logic* of when to run while the platform handles the *mechanics* of triggering.

| Integration | Share of downloads | Primary use case |
|---|---|---|
| Vercel / Next.js | 41% | Route handler scheduling |
| AWS Lambda | 33% | EventBridge deferral |
| Cloudflare Workers | 18% | Edge job orchestration |
| Other | 8% | — |

---

## What Didn't Work

The traffic window estimation is the weakest part of the system. It relies on a simple exponential moving average of request counts, which works well for applications with stable diurnal patterns but fails for event-driven spikes. A team using Nocturnal for post-purchase email sequences reported that the scheduler consistently deferred their jobs during the exact moments when purchase events spiked — the opposite of the intended behavior.

The fix is straightforward (separate traffic and event queues), but it would require a breaking API change. It is scheduled for v2.
