"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import CodeEditor from "../CodeEditor";
import { ChevronRight } from "lucide-react";

const journeyEntries = [
  {
    company: "Adventiel",
    role: "Fullstack Developer",
    period: "2023 — Present",
    summary: "Modern web apps and internal tools for an agri-tech company, working hybrid from Pacé.",
    missions: [
      "React, Node.js, Angular web apps — including a wheel OAV configurator",
      "Python AI integration: livestock data analysis tool powered by a language model",
      "Advanced WordPress development: custom post types, external databases, product catalogues",
      "Java & .NET legacy maintenance: bug fixes and functional evolutions",
      "Functional analysis & scoping: requirements gathering, specs, effort estimation",
    ],
    stack: ["React", "Angular", "Node.js", "WordPress", "Python", "Docker"],
  },
  {
    company: "Webtale",
    role: "Freelance Web Developer",
    period: "2022 — 2023",
    summary: "Fully autonomous freelance — design, development, and deployment of websites and web apps.",
    missions: [
      "Custom WordPress sites: bespoke themes, Timber/Twig templating, Figma integration",
      "React / Node.js web applications for multiple clients",
      "Full ownership from conception to production",
    ],
    stack: ["React", "TypeScript", "WordPress", "PHP", "Timber", "Tailwind CSS"],
  },
  {
    company: "MDF",
    role: "Web Developer — Apprenticeship",
    period: "2021 — 2022",
    summary: "Work-study contract focused on WordPress development and technical SEO.",
    missions: [
      "WordPress plugin: video tutorial access tool for clients",
      "PHP maintenance and version updates",
      "Hosting migrations and search engine optimisation",
    ],
    stack: ["WordPress", "PHP", "ACF Pro", "JavaScript", "SEO"],
  },
  {
    company: "Fireservice",
    role: "Web Developer — Internship",
    period: "Oct. — Nov. 2020",
    summary: "Web development internship at a security company based in Fontainebleau.",
    missions: [
      "WordPress site built from scratch with a customisable ACF Pro theme from Figma mockups",
      "Performance optimisation and SEO content improvements",
    ],
    stack: ["WordPress", "PHP", "ACF Pro", "JavaScript", "Figma"],
  },
];

export default function JourneySection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered !== null ? journeyEntries[hovered] : null;

  return (
    <section style={{ background: "var(--surface-low)" }}>
      <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16">

        {/* ── Left: timeline ───────────────────────────────────────── */}
        <div>
          <h2
            className="text-5xl text-on-surface md:text-6xl font-semibold leading-tight mb-6"
            style={{ fontFamily: "var(--font-newsreader)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            The
            <span
              className="italic font-medium text-primary"
              style={{ fontFamily: "var(--font-newsreader)", letterSpacing: "-0.02em" }}
            >
              {" "}Journey
            </span>
          </h2>
          <p
            className="text-sm mb-10"
            style={{ color: "var(--on-surface-variant)", lineHeight: 1.6 }}
          >
            I build reliable and scalable systems with a strong focus on how they feel to use, not just how they work.
          </p>

          <div className="flex flex-col gap-2">
            {journeyEntries.map((entry, i) => {
              const isActive = hovered === i;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className="flex items-start gap-4 rounded-xl px-3 py-3 cursor-default transition-colors"
                  style={{
                    background: isActive ? "var(--surface-high)" : "transparent",
                  }}
                >
                  <div
                    className="mt-2 w-2 h-2 rounded-full shrink-0 transition-colors"
                    style={{ background: isActive ? "var(--tertiary)" : "var(--on-surface-muted)" }}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-bold text-sm transition-colors"
                      style={{
                        color: isActive ? "var(--on-surface)" : "var(--on-surface-variant)",
                        fontFamily: "var(--font-manrope)",
                      }}
                    >
                      {entry.company}
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "var(--on-surface-muted)", fontFamily: "var(--font-manrope)" }}
                    >
                      {entry.role} · {entry.period}
                    </p>
                  </div>
                  <span
                    className="text-xs mt-0.5 shrink-0 transition-opacity"
                    style={{
                      color: "var(--tertiary)",
                      opacity: isActive ? 1 : 0,
                      fontFamily: "var(--font-manrope)",
                    }}
                  >
                    <ChevronRight size={16} />
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Right: detail / code editor ──────────────────────────── */}
        <div>
          <AnimatePresence mode="wait" initial={false}>
            {active ? (
              <motion.div
                key={active.company}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                {/* Detail card */}
                <div
                  className="overflow-hidden mb-6 rounded-2xl"
                  style={{ background: "var(--surface-high)" }}
                >
                  {/* Header */}
                  <div
                    className="px-5 py-4"
                    style={{ background: "var(--surface-highest)" }}
                  >
                    <p
                      className="font-semibold text-sm"
                      style={{ color: "var(--on-surface)", fontFamily: "var(--font-manrope)" }}
                    >
                      {active.company}
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "var(--tertiary)", fontFamily: "var(--font-manrope)" }}
                    >
                      {active.role} · {active.period}
                    </p>
                  </div>

                  {/* Body */}
                  <div className="px-5 py-4 flex flex-col gap-4">
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--on-surface-variant)", fontFamily: "var(--font-manrope)" }}
                    >
                      {active.summary}
                    </p>

                    <ul className="flex flex-col gap-2">
                      {active.missions.map((m, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span
                            className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ background: "var(--tertiary)" }}
                          />
                          <span
                            className="text-xs leading-relaxed"
                            style={{ color: "var(--on-surface-variant)", fontFamily: "var(--font-manrope)" }}
                          >
                            {m}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {active.stack.map((tag) => (
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
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="editor"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <p
                  className="text-xl font-semibold mb-6"
                  style={{ color: "var(--on-surface)", fontFamily: "var(--font-manrope)" }}
                >
                  Philosophy
                </p>
                <CodeEditor />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!active && (
              <motion.blockquote
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="pl-4 italic text-base leading-relaxed"
                style={{
                  fontFamily: "var(--font-newsreader)",
                  color: "var(--on-surface-variant)",
                  borderLeft: "2px solid var(--primary)",
                }}
              >
                "The best interfaces fail those who use them wisely."
              </motion.blockquote>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
