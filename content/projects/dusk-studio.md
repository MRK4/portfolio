---
title: "Dusk Studio"
subtitle: "Session booking without the scheduling grief"
description: "Booking platform for independent recording studios. Real-time session scheduling with conflict-free slot resolution."
slug: dusk-studio
category: Client Work
status: Live
year: "2023"
date: "2023-08-30"
tags: ["Next.js", "tRPC", "Prisma", "WebSockets"]
coverGradient: "linear-gradient(145deg, #111316 0%, #1c1a18 50%, #22201a 100%)"
stats:
  - label: "Studios onboarded"
    value: "28"
  - label: "Bookings / month"
    value: "3 400+"
  - label: "Conflict rate"
    value: "0.04%"
  - label: "Avg. booking time"
    value: "< 40s"
links:
  live: "https://duskstudio.app"
---

## The Problem with Studio Booking

Independent recording studios operate in a peculiar scheduling environment: sessions are long (4–12 hours), bookable in advance (weeks to months), subject to last-minute changes, and staffed by engineers whose availability is tracked separately from the rooms themselves.

The studio owners who came to this project were managing all of this through a combination of Google Calendar, WhatsApp threads, and institutional memory. The 0.04% conflict rate in production represents an improvement from an estimated 3–5% under the previous system — a rate high enough to regularly strand artists at studio doors.

**Dusk Studio** was built to make the scheduling problem *disappear* from the studio owner's daily attention budget.

> "The best booking system is the one you forget is there."

## Real-Time Conflict Resolution

The core technical challenge is the classic double-booking problem, with an added dimension: a room booking requires both the physical room *and* an available engineer. These two resources have independent availability constraints that must be validated atomically.

The solution is an **optimistic lock protocol** implemented at the database layer using Prisma and PostgreSQL advisory locks:

```typescript
async function bookSession(input: BookingInput): Promise<Booking> {
  return await prisma.$transaction(async (tx) => {
    // Acquire advisory lock on the room-date combination
    await tx.$executeRaw`
      SELECT pg_advisory_xact_lock(${input.roomId}, ${dateToInt(input.date)})
    `;

    // Validate availability within the lock
    const conflict = await tx.booking.findFirst({
      where: {
        roomId: input.roomId,
        date: input.date,
        OR: [
          { startTime: { lt: input.endTime }, endTime: { gt: input.startTime } },
        ],
      },
    });

    if (conflict) throw new TRPCError({ code: "CONFLICT" });

    return tx.booking.create({ data: input });
  });
}
```

The advisory lock ensures that two concurrent booking attempts for the same room-date combination are serialized at the database layer, not at the application layer. This eliminates the race condition that caused the ghost-booking problem in the client's previous system.

## The Calendar Interface

The calendar component was the most time-consuming piece of the project. It needed to display:

- Room availability across multiple rooms on a single view
- Engineer availability overlaid on room availability
- Pending bookings (tentative) distinguished from confirmed bookings
- The current user's booking in progress

A standard calendar library couldn't accommodate this level of data density without significant customization. The calendar was built from scratch using a CSS grid layout — each hour of the day maps to a row, each room to a column, and bookings are positioned using grid-area coordinates computed at render time.

WebSocket connections push availability changes to all connected clients in real time, so studio staff see calendar updates immediately when a booking is made, modified, or cancelled from any session.

---

## What Would Be Different

The tRPC stack was an excellent choice for the client-server type safety it provides — the calendar component consumes booking data with full TypeScript inference and no manual type definitions. I would make the same choice again.

The WebSocket architecture, however, was over-engineered. The studios using the platform have at most three staff members active at any time. Server-sent events would have provided the real-time push behavior at significantly lower infrastructure complexity, and the unidirectional nature of SSE matches the actual data flow (server pushes updates; clients only write via standard HTTP). The WebSocket connection is maintained speculatively in case of a future multi-user collaborative editing feature that has never been requested.
