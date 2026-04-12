"use client";

import { motion } from "motion/react";

export default function GalleryHeader() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-36 pb-16">
      <motion.p
        className="text-xs tracking-widest uppercase mb-5"
        style={{ color: "var(--tertiary)" }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        The Archive
      </motion.p>

      <motion.h1
        className="mb-6 leading-none"
        style={{
          fontFamily: "var(--font-newsreader)",
          fontStyle: "italic",
          fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
          letterSpacing: "-0.02em",
          color: "var(--on-surface)",
          maxWidth: "14ch",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        The Vault of
        <br />
        Past&nbsp;Narratives.
      </motion.h1>

      <motion.p
        className="max-w-xl text-base"
        style={{ color: "var(--on-surface-variant)", lineHeight: 1.65 }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.14, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        A chronological journey through logic and aesthetics. Each entry
        represents a milestone in technical exploration and visual storytelling.
      </motion.p>

      <motion.div
        className="mt-10 h-px w-24"
        style={{
          transformOrigin: "left",
          background: "linear-gradient(to right, var(--tertiary), transparent)",
        }}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </section>
  );
}
