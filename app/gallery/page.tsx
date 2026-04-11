"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryCard, { GalleryProject, Category } from "@/components/gallery/GalleryCard";

// ── Data ───────────────────────────────────────────────────────────────────────

const PROJECTS: GalleryProject[] = [
  {
    title: "Aether Protocol",
    description:
      "Decentralized liquidity aggregator built with a focus on low-latency execution and durability. A composable architecture with plug-in resolvers.",
    gradient: "linear-gradient(145deg, #1a1c1f 0%, #1e1a2e 60%, #282032 100%)",
    category: "Open Source",
    year: "2024",
    status: "Live",
    href: "#",
  },
  {
    title: "Lumina CRM",
    description:
      "High-end relationship management tool for luxury concierge services, built with privacy as a first-class citizen.",
    gradient: "linear-gradient(145deg, #1a1c1f 0%, #1c2028 60%, #24282e 100%)",
    category: "Client Work",
    year: "2025",
    status: "Live",
    href: "#",
  },
  {
    title: "Obsidian Slate",
    description:
      "A custom markdown engine designed for poets. Bringing terse typography that pulses with atmospheric pressure.",
    gradient: "linear-gradient(145deg, #111316 0%, #1a1c22 50%, #1e202a 100%)",
    category: "Experiments",
    year: "2024",
    status: "WIP",
    href: "#",
  },
  {
    title: "Nocturnal API",
    description:
      "An elegantly thin server toolkit for managing serverless functions during off-peak hours.",
    gradient: "linear-gradient(145deg, #0e1012 0%, #141618 50%, #1a1c20 100%)",
    category: "Open Source",
    year: "2023",
    status: "Live",
    href: "#",
  },
  {
    title: "Summit ERP",
    description:
      "Re-imagining resource planning for sustainable housing startups. Minimalist data visualization at scale.",
    gradient: "linear-gradient(145deg, #111316 0%, #1a1f1c 50%, #1e2420 100%)",
    category: "Client Work",
    year: "2024",
    status: "Live",
    href: "#",
  },
  {
    title: "Vellum Docs",
    description:
      "An opinionated documentation site that pairs vellum-weight paper textures with digital ink animations.",
    gradient: "linear-gradient(145deg, #151316 0%, #1c1a20 50%, #221e28 100%)",
    category: "Experiments",
    year: "2025",
    status: "WIP",
    href: "#",
  },
  {
    title: "Fracture UI",
    description:
      "Component library built on the principle that interfaces should crack under scrutiny—exposing the logic beneath.",
    gradient: "linear-gradient(145deg, #111316 0%, #1a1820 50%, #201e28 100%)",
    category: "Open Source",
    year: "2023",
    status: "Archived",
    href: "#",
  },
  {
    title: "Dusk Studio",
    description:
      "Booking platform for independent recording studios. Real-time session scheduling with conflict-free slot resolution.",
    gradient: "linear-gradient(145deg, #111316 0%, #1c1a18 50%, #22201a 100%)",
    category: "Client Work",
    year: "2023",
    status: "Live",
    href: "#",
  },
];

const FILTERS: Array<"All Works" | Category> = [
  "All Works",
  "Open Source",
  "Client Work",
  "Experiments",
];

// ── Page ───────────────────────────────────────────────────────────────────────

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<"All Works" | Category>("All Works");

  const filtered =
    activeFilter === "All Works"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <>
      <Navbar />

      <main style={{ background: "var(--surface)" }}>
        {/* ── Hero header ── */}
        <section className="max-w-6xl mx-auto px-6 pt-36 pb-16">
          <p
            className="text-xs tracking-widest uppercase mb-5"
            style={{ color: "var(--tertiary)" }}
          >
            The Archive
          </p>
          <h1
            className="mb-6 leading-none"
            style={{
              fontFamily: "var(--font-newsreader)",
              fontStyle: "italic",
              fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
              letterSpacing: "-0.02em",
              color: "var(--on-surface)",
              maxWidth: "14ch",
            }}
          >
            The Vault of
            <br />
            Past&nbsp;Narratives.
          </h1>
          <p
            className="max-w-xl text-base"
            style={{ color: "var(--on-surface-variant)", lineHeight: 1.65 }}
          >
            A chronological journey through logic and aesthetics. Each entry
            represents a milestone in technical exploration and visual
            storytelling.
          </p>
          <div
            className="mt-10 h-px w-24"
            style={{
              background: "linear-gradient(to right, var(--tertiary), transparent)",
            }}
          />
        </section>

        {/* ── Filter bar ── */}
        <section className="max-w-6xl mx-auto px-6 mb-14">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const active = f === activeFilter;
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="relative text-sm font-medium px-4 py-1.5 transition-colors duration-200"
                  style={{
                    borderRadius: "9999px",
                    color: active ? "var(--on-primary)" : "var(--on-surface-muted)",
                    outline: "none",
                    cursor: "pointer",
                    background: "transparent",
                  }}
                >
                  {/* Sliding pill background */}
                  {!active && (
                    <span
                      className="absolute inset-0"
                      style={{
                        borderRadius: "9999px",
                        background: "var(--surface-high)",
                      }}
                    />
                  )}
                  {active && (
                    <motion.span
                      layoutId="filter-pill-bg"
                      className="absolute inset-0"
                      style={{ borderRadius: "9999px", background: "var(--primary-container)" }}
                      transition={{ type: "spring", stiffness: 350, damping: 32 }}
                    />
                  )}
                  <span className="relative">{f}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Masonry grid ── */}
        <section className="max-w-6xl mx-auto px-6 pb-8">
          <div style={{ columns: "3 280px", columnGap: "1.5rem" }}>
            {filtered.map((project) => (
              <GalleryCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        {/* ── Load more ── */}
        <section className="max-w-6xl mx-auto px-6 pt-4 pb-28 flex flex-col items-center gap-3">
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: "var(--on-surface-muted)" }}
          >
            View older manuscripts
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            style={{ color: "var(--on-surface-muted)" }}
          >
            <path
              d="M10 4v12M4 10l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </section>
      </main>

      <Footer />
    </>
  );
}
