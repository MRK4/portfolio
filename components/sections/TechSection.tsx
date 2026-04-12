"use client";

import { motion } from "motion/react";

// ── Data ──────────────────────────────────────────────────────────────────────

const categories = [
  {
    label: "Robust web applications",
    description:
      "Built to last — responsive interfaces, reliable APIs, and well-structured data models.",
    accent: "#c5c0ff",
    cards: [
      {
        name: "React & Next.js",
        description:
          "The core of every interface — server rendering, streaming, and finely tuned client islands.",
        tags: ["App Router", "RSC", "Turbopack", "Edge Runtime"],
        accent: "#c5c0ff",
        span: "col-span-2",
        icon: (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="2.5" fill="#c5c0ff" />
            <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#c5c0ff" strokeWidth="1.5" fill="none" />
            <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#c5c0ff" strokeWidth="1.5" fill="none" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#c5c0ff" strokeWidth="1.5" fill="none" transform="rotate(120 12 12)" />
          </svg>
        ),
      },
      {
        name: "Type Safety",
        description:
          "End-to-end strict typing — from schema to UI, no surprises in production.",
        tags: ["TypeScript", "Zod", "tRPC"],
        accent: "#c5c0ff",
        span: "col-span-1",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-icon lucide-circle-check"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
        ),
      },
      {
        name: "Data Layer",
        description:
          "Schemas that scale over time, with queries that stay fast.",
        tags: ["Prisma", "PostgreSQL", "Redis", "Drizzle"],
        accent: "#c5c0ff",
        span: "col-span-1",
        icon: (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <ellipse cx="12" cy="6" rx="9" ry="3.5" stroke="#c5c0ff" strokeWidth="1.5" fill="none" />
            <path d="M3 6v6c0 1.93 4.03 3.5 9 3.5s9-1.57 9-3.5V6" stroke="#c5c0ff" strokeWidth="1.5" fill="none" />
            <path d="M3 12v6c0 1.93 4.03 3.5 9 3.5s9-1.57 9-3.5v-6" stroke="#c5c0ff" strokeWidth="1.5" fill="none" />
          </svg>
        ),
      },
      {
        name: "UI System",
        description:
          "Design tokens, accessible components, and purposeful motion.",
        tags: ["Tailwind CSS", "Radix UI", "Framer Motion", "WCAG AA"],
        accent: "#c5c0ff",
        span: "col-span-2",
        icon: (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 10h16M4 14h12M4 18h8" stroke="#c5c0ff" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ),
      },
    ],
  },
  {
    label: "Client-managed websites",
    description:
      "For clients who want full control — familiar admin interfaces.",
    accent: "#ffb95a",
    cards: [
      {
        name: "WordPress",
        description:
          "The world’s most widely used CMS — robust, extensible, and easy for clients to manage.",
        tags: ["Gutenberg", "ACF", "Custom Post Types", "WP-CLI"],
        accent: "#ffb95a",
        span: "col-span-2",
        icon: (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="#ffb95a" strokeWidth="1.5" fill="none" />
            <path d="M3 12h4m10 0h4M12 3v4m0 10v4" stroke="#ffb95a" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="12" cy="12" r="2.5" fill="#ffb95a" opacity="0.4" />
          </svg>
        ),
      },
      {
        name: "Custom Themes",
        description:
          "Child themes or fully custom builds — pixel-perfect, without relying on page builders.",
        tags: ["PHP", "SCSS", "Timber / Twig", "Blade"],
        accent: "#ffb95a",
        span: "col-span-1",
        icon: (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M4 17.5L9 12l-5-5.5" stroke="#ffb95a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 19h8" stroke="#ffb95a" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        name: "Performance & Deployment",
        description:
          "Fast, secure websites with deployment pipelines and automated backups.",
        tags: ["WP Engine", "Cloudflare", "WP Rocket", "Git Flow"],
        accent: "#ffb95a",
        span: "col-span-1",
        icon: (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#ffb95a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        name: "SEO",
        description:
          "Built for ranking — fast rendering, clean architecture, and crawlable content that scales. From Core Web Vitals to structured data, every layer is optimized for visibility and indexing.",
        tags: ["Core Web Vitals", "Structured Data", "Indexing & Crawl", "Semantic HTML"],
        accent: "#ffb95a",
        span: "col-span-2",
        icon: (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 10h16M4 14h12M4 18h8" stroke="#ffb95a" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ),
      }
    ],
  },
];

// ── Variants ──────────────────────────────────────────────────────────────────

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function TechSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--surface)" }}>

      {/* Ambient halos */}
      <div
        className="absolute -top-40 -right-40 w-[540px] h-[540px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(108,102,196,0.1) 0%, transparent 65%)" }}
      />
      <div
        className="absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(255,185,90,0.07) 0%, transparent 65%)" }}
      />

      <div className="max-w-6xl mx-auto px-6 py-28 relative z-10 flex flex-col gap-24">

        {/* Section header */}
        <div className="max-w-lg">
          <p
            className="text-xs tracking-widest uppercase mb-4"
            style={{ color: "var(--tertiary)", fontFamily: "var(--font-manrope)" }}
          >
            The Craft
          </p>
          <h2
            className="text-5xl md:text-6xl font-semibold"
            style={{ fontFamily: "var(--font-newsreader)", letterSpacing: "-0.02em", color: "var(--on-surface)", lineHeight: 1.05 }}
          >
            Technical{" "}
            <span className="italic font-medium" style={{ color: "var(--primary)", fontFamily: "var(--font-newsreader)" }}>
              Instruments
            </span>
          </h2>
          <p
            className="mt-4 text-base"
            style={{ color: "var(--on-surface-variant)", lineHeight: 1.65, fontFamily: "var(--font-manrope)" }}
          >
            Two disciplines, two ways to deliver — one built for performance, the other for client autonomy.
          </p>
        </div>

        {/* Categories */}
        <div className="grid md:grid-cols-2 gap-12">
        {categories.map((cat, ci) => (
          <div key={ci}>

            {/* Category label */}
            <div className="flex items-center gap-4 mb-8">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: cat.accent }}
              />
              <div>
                <p
                  className="text-base font-semibold"
                  style={{ color: "var(--on-surface)", fontFamily: "var(--font-manrope)" }}
                >
                  {cat.label}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "var(--on-surface-muted)", fontFamily: "var(--font-manrope)", lineHeight: 1.6 }}
                >
                  {cat.description}
                </p>
              </div>
            </div>

            {/* Cards grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              {cat.cards.map((tech) => (
                <motion.div
                  key={tech.name}
                  variants={item}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className={`group relative flex flex-col gap-5 p-6 rounded-2xl cursor-default ${tech.span === "col-span-2" ? "md:col-span-2" : ""}`}
                  style={{
                    background: "var(--surface-high)",
                    boxShadow: "0 0 0 0px transparent",
                    transition: "box-shadow 0.3s ease",
                  }}
                  onHoverStart={(e) => {
                    (e.target as HTMLElement).style.boxShadow = `0 8px 32px ${tech.accent}18, 0 0 0 1px ${tech.accent}14`;
                  }}
                  onHoverEnd={(e) => {
                    (e.target as HTMLElement).style.boxShadow = "0 0 0 0px transparent";
                  }}
                >
                  {/* Icon */}
                  <div
                    className="relative w-12 h-12 flex items-center justify-center rounded-xl"
                    style={{ background: "var(--surface-highest)" }}
                  >
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `radial-gradient(ellipse at center, ${tech.accent}22 0%, transparent 70%)` }}
                    />
                    <span className="relative z-10">{tech.icon}</span>
                  </div>

                  {/* Text */}
                  <div className="flex flex-col gap-1.5">
                    <h4
                      className="text-sm font-semibold"
                      style={{ color: "var(--on-surface)", fontFamily: "var(--font-manrope)" }}
                    >
                      {tech.name}
                    </h4>
                    <p
                      className="text-xs"
                      style={{ color: "var(--on-surface-muted)", lineHeight: 1.7, fontFamily: "var(--font-manrope)" }}
                    >
                      {tech.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {tech.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-xs"
                        style={{
                          background: "var(--surface-highest)",
                          color: "var(--on-surface-variant)",
                          fontFamily: "var(--font-manrope)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        ))}
        </div>

      </div>
    </section>
  );
}
