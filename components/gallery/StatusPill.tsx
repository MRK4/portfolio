"use client";

import { motion } from "motion/react";

export type Status = "Live" | "WIP" | "Archived";

const CONFIG: Record<Status, { label: string; color: string; bg: string }> = {
  Live:     { label: "Live",     color: "var(--primary)",          bg: "rgba(197,192,255,0.12)"  },
  WIP:      { label: "WIP",      color: "var(--tertiary)",         bg: "rgba(255,185,90,0.12)"   },
  Archived: { label: "Archived", color: "var(--on-surface-muted)", bg: "rgba(122,118,133,0.12)"  },
};

export default function StatusPill({ status }: { status: Status }) {
  const { label, color, bg } = CONFIG[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold tracking-wide"
      style={{ background: bg, color, borderRadius: "9999px" }}
    >
      {status === "Live" ? (
        <motion.span
          className="block w-1.5 h-1.5 rounded-full"
          style={{ background: color, boxShadow: `0 0 6px ${color}` }}
          animate={{ scale: [1, 1.7, 1], opacity: [1, 0.25, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : (
        <span
          className="block w-1.5 h-1.5 rounded-full"
          style={{ background: color, boxShadow: `0 0 6px ${color}` }}
        />
      )}
      {label}
    </span>
  );
}
