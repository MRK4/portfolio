---
title: "Aether Protocol"
subtitle: "Composable liquidity at the speed of intent"
description: "Decentralized liquidity aggregator built with a focus on low-latency execution and durability. A composable architecture with plug-in resolvers."
slug: aether-protocol
category: Open Source
status: Live
year: "2024"
date: "2024-09-15"
tags: ["Rust", "TypeScript", "WebAssembly", "DeFi"]
coverGradient: "linear-gradient(145deg, #1a1c1f 0%, #1e1a2e 60%, #282032 100%)"
stats:
  - label: "Avg. latency"
    value: "< 12ms"
  - label: "Resolver plugins"
    value: "14+"
  - label: "Uptime"
    value: "99.98%"
  - label: "Lines of Rust"
    value: "18 000"
links:
  github: "https://github.com/clementpoudree/aether-protocol"
---

## The Problem Space

Modern DeFi aggregators treat liquidity as a flat graph. **Aether Protocol** treats it as a living network — where each resolver is an autonomous agent with its own risk posture and execution strategy.

The core insight is that latency compounds. A 3ms resolver advantage, repeated across hundreds of daily executions, translates into measurable slippage savings for every participant. The traditional monolithic design — where a single routing algorithm holds a monopoly on execution paths — is structurally incapable of adapting to local market conditions.

> "The fastest path through a market is not the shortest one. It is the one that never waits."

This demanded a fundamentally different architecture: one where the engine itself is a blank canvas, and the intelligence lives in the plug-ins.

## Architecture Overview

The system is divided into three layers, each with a strict interface contract and zero coupling:

1. **Intent Layer** — accepts user-signed intents expressed as typed structs. No order books, no state.
2. **Resolver Mesh** — a plug-in registry where resolvers bid on intents in a sealed-bid auction lasting less than 8ms.
3. **Settlement Layer** — final execution, on-chain commitment, and cryptographic proof archival.

Each resolver is a *WebAssembly module* loaded at runtime. This means the core engine never needs to be redeployed to add new execution strategies — a property that proved critical during the November 2024 mainnet stress test, when three resolvers were hot-swapped without any downtime.

### The Resolver Interface

A resolver must implement exactly one trait:

```rust
pub trait Resolver: Send + Sync {
    fn name(&self) -> &'static str;
    fn bid(&self, intent: &Intent) -> Option<Bid>;
    fn execute(&self, bid: &Bid) -> Result<Receipt, ResolverError>;
}
```

The `bid` function runs in under **400 microseconds** on a standard VM. Everything downstream is async and non-blocking. The engine never calls `execute` without a winning bid, which eliminates an entire class of state-inconsistency bugs that plagued earlier designs.

### Intent Serialization

Intents are serialized using MessagePack, chosen for its compact binary format and broad language support across the resolver ecosystem. Each intent is signed with the user's private key using Ed25519, ensuring that the settlement layer can verify authenticity without a round-trip to an authority.

## Performance Benchmarks

The numbers below were recorded on a 4-core, 8-thread node with 16 GB RAM, simulating peak mainnet conditions.

| Scenario | Median Latency | P99 Latency | Success Rate |
|---|---|---|---|
| Single resolver | 4.2ms | 9.1ms | 99.97% |
| 6-resolver auction | 11.8ms | 24.3ms | 99.94% |
| 14-resolver auction | 19.4ms | 38.7ms | 99.89% |

The P99 latency remains under 40ms even at full resolver capacity — well within the 200ms threshold that users perceive as "instant." The success rate degradation at scale is attributable to network variance between resolver nodes, not to the engine itself.

---

## What I Would Change

The current resolver serialization format uses MessagePack. In retrospect, *FlatBuffers* would have been the better choice — zero-copy deserialization eliminates an allocation in the hot path and would shave an estimated 0.8ms from the median auction time.

The intent signing UX also remains an open problem. Users should not have to understand nonces. That is infrastructure's job, and I didn't solve it cleanly here.

Finally, the WebAssembly sandbox boundary introduces a 0.3ms overhead per resolver call. For a future version targeting sub-5ms auctions, this cost will need to be re-examined — possibly by moving to a native plugin interface with a more restricted trust model.
