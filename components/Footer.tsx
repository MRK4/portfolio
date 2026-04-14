"use client";

import Link from "next/link";
import { motion } from "motion/react";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/clementpdr" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/clementpdr/" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--surface)" }}>
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm" style={{ color: "var(--on-surface-muted)" }}>
          © {new Date().getFullYear()} Clément Poudrée. All rights reserved.
        </p>

        <nav className="flex items-center gap-6">
          {socialLinks.map((link) => (
            <motion.div
              key={link.href}
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              <Link
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors"
                style={{ color: "var(--on-surface-muted)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--tertiary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--on-surface-muted)")
                }
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>
    </footer>
  );
}
