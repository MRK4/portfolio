"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { ProjectMeta } from "@/lib/projects";
import GalleryCard, { type Category } from "@/components/gallery/GalleryCard";

type FilterOption = "All Works" | Category;

const FILTERS: FilterOption[] = [
  "All Works",
  "Open Source",
  "Client Work",
  "Experiments",
];

export default function GalleryClient({ projects }: { projects: ProjectMeta[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("All Works");

  const filtered =
    activeFilter === "All Works"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* ── Filter bar ── */}
      <motion.section
        className="max-w-6xl mx-auto px-6 mb-14"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
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
      </motion.section>

      {/* ── Masonry grid ── */}
      <section className="max-w-6xl mx-auto px-6 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[0, 1, 2].map((colIndex) => (
            <div key={colIndex} className={colIndex === 1 ? "mt-10" : ""}>
              {filtered
                .filter((_, i) => i % 3 === colIndex)
                .map((project) => (
                  <GalleryCard
                    key={project.slug}
                    project={{
                      title: project.title,
                      description: project.description,
                      gradient: project.coverGradient,
                      category: project.category,
                      year: project.year,
                      status: project.status,
                      href: `/gallery/${project.slug}`,
                    }}
                  />
                ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
