"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll(); // init au cas où déjà scroll

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 select-none transition-all duration-300 ${
        isScrolled ? "backdrop-blur-xl py-0" : "py-4"
      }`}
      style={{
        background: isScrolled ? "rgba(17, 19, 22, 0.7)" : "transparent",
        boxShadow: isScrolled
          ? "0px 20px 40px rgba(0, 0, 0, 0.4)"
          : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial="rest"
          whileHover="hover"
          whileTap={{ scale: 0.96 }}
          className="relative"
        >
          <Link
            href="/"
            className="relative inline-block text-xl italic select-none pb-0.5"
            style={{ fontFamily: "var(--font-newsreader)", fontWeight: 500 }}
          >
            <motion.span
              className="inline-block"
              variants={{
                rest: { y: 0, color: "var(--on-surface)" },
                hover: { y: -1, color: "var(--primary)" },
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              Clément
            </motion.span>

            {/* Underline qui se déploie de gauche à droite */}
            <motion.span
              className="absolute bottom-0 left-0 h-px w-full block"
              style={{ background: "var(--primary)", originX: 0 }}
              variants={{
                rest: { scaleX: 0 },
                hover: { scaleX: 1 },
              }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </Link>
        </motion.div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm pb-1 select-none"
                style={{
                  fontFamily: "var(--font-manrope)",
                  color: active ? "var(--on-surface)" : "var(--on-surface-muted)",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.color = "var(--on-surface-variant)";
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.color = "var(--on-surface-muted)";
                }}
              >
                {link.label}
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ background: "var(--primary)", originX: 0 }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: active ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <motion.div
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="hidden md:block"
        >
          <Link
            href="/contact"
            className="flex items-center text-sm text-on-primary font-semibold px-5 py-2 select-none"
            style={{
              background: "var(--primary-container)",
              borderRadius: "1rem",
            }}
          >
            Hire me
          </Link>
        </motion.div>
      </div>
    </header>
  );
}
