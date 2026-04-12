---
title: "Lerni"
subtitle: "A modern platform for structured online courses"
description: "Modern learning platform enabling creators to build and publish structured courses combining video content and rich written material."
slug: lerni
category: Experiments
status: Live
year: "2026"
date: "2026-03-01"
tags: ["Next.js", "TypeScript", "Prisma", "Node.js"]
coverGradient: "linear-gradient(145deg, #1a1410 0%, #2a1f10 60%, #321e08 100%)"
stats:
  - label: "Stack"
    value: "Next.js"
  - label: "Type"
    value: "Platform"
links:
  live: "https://lerni-sand.vercel.app/"
---

## The Concept

Online learning is fragmented. Video platforms lack structure; documentation tools lack media. **Lerni** bridges that gap — a platform where creators combine video lessons and rich written content into a cohesive course experience.

## Core Features

- Creator dashboard to build and publish courses
- Mixed-media lessons: video + MDX-style rich text
- Structured curriculum with modules and progress tracking
- Clean reader-first UI for learners

## Technical Highlights

Built on the **Next.js App Router** with **Prisma** as the ORM against a relational database. Content is modelled with a flexible schema that supports nested modules and multiple content block types per lesson.
