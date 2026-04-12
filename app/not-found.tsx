"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Link from "next/link";
import Button from "@/components/Button";

const SPRING_SLOW = { stiffness: 50, damping: 18, mass: 1 };
const SPRING_MED  = { stiffness: 80, damping: 20, mass: 1 };
const SPRING_FAST = { stiffness: 110, damping: 22, mass: 1 };

export default function NotFound() {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const slowX = useSpring(rawX, SPRING_SLOW);
  const slowY = useSpring(rawY, SPRING_SLOW);
  const medX  = useSpring(rawX, SPRING_MED);
  const medY  = useSpring(rawY, SPRING_MED);
  const fastX = useSpring(rawX, SPRING_FAST);
  const fastY = useSpring(rawY, SPRING_FAST);

  /* Parallax ranges per layer */
  const haloVX = useTransform(slowX, [-0.5, 0.5], [-50, 50]);
  const haloVY = useTransform(slowY, [-0.5, 0.5], [-35, 35]);
  const haloAX = useTransform(slowX, [-0.5, 0.5], [35, -35]);
  const haloAY = useTransform(slowY, [-0.5, 0.5], [25, -25]);
  const gridX  = useTransform(medX,  [-0.5, 0.5], [-20, 20]);
  const gridY  = useTransform(medY,  [-0.5, 0.5], [-14, 14]);
  const orb1X  = useTransform(fastX, [-0.5, 0.5], [-30, 30]);
  const orb1Y  = useTransform(fastY, [-0.5, 0.5], [-22, 22]);
  const orb2X  = useTransform(fastX, [-0.5, 0.5], [26, -26]);
  const orb2Y  = useTransform(fastY, [-0.5, 0.5], [-18, 18]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { rawX.set(0); rawY.set(0); };

  /* Gently idle-float the "404" glyphs when no mouse activity */
  useEffect(() => {
    let raf: number;
    let t = 0;
    const tick = () => {
      t += 0.006;
      // tiny sinusoidal drift so the page never feels "dead"
      rawX.set(Math.sin(t * 0.7) * 0.04);
      rawY.set(Math.cos(t * 0.5) * 0.03);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--surface)" }}
    >
      {/* ── Halos ────────────────────────────────────────────────────── */}
      <motion.div
        className="absolute -top-32 -right-32 w-[640px] h-[640px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(108,102,196,0.22) 0%, transparent 65%)",
          x: haloVX, y: haloVY,
        }}
      />
      <motion.div
        className="absolute -bottom-24 -left-24 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(255,185,90,0.1) 0%, transparent 65%)",
          x: haloAX, y: haloAY,
        }}
      />

      {/* ── Grid overlay ─────────────────────────────────────────────── */}
      <motion.svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]"
        style={{ x: gridX, y: gridY }}
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 480 480"
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 60} y1={0} x2={i * 60} y2={480} stroke="#c5c0ff" strokeWidth="1" />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 60} x2={480} y2={i * 60} stroke="#c5c0ff" strokeWidth="1" />
        ))}
      </motion.svg>

      {/* ── Floating orbs ────────────────────────────────────────────── */}
      <motion.div
        className="absolute w-5 h-5 rounded-full pointer-events-none"
        style={{
          top: "22%", left: "15%",
          background: "var(--tertiary)",
          opacity: 0.55,
          x: orb1X, y: orb1Y,
        }}
      />
      <motion.div
        className="absolute w-3 h-3 rounded-full pointer-events-none"
        style={{
          top: "18%", right: "18%",
          background: "var(--primary)",
          opacity: 0.45,
          x: orb2X, y: orb2Y,
        }}
      />
      <motion.div
        className="absolute w-2 h-2 rounded-full pointer-events-none"
        style={{
          bottom: "28%", right: "22%",
          background: "var(--tertiary)",
          opacity: 0.35,
          x: orb1X, y: orb2Y,
        }}
      />

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl">

        {/* Error code badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.18em] uppercase"
          style={{
            background: "var(--surface-high)",
            color: "var(--tertiary)",
            border: "1px solid rgba(255,185,90,0.18)",
            fontFamily: "var(--font-manrope)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--tertiary)" }}
          />
          Error 404
        </motion.div>

        {/* Giant "404" — editorial bleed */}
        <motion.div
          className="relative mb-2 select-none"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          <span
            className="block leading-none font-semibold"
            style={{
              fontFamily: "var(--font-newsreader)",
              fontSize: "clamp(7rem, 22vw, 18rem)",
              letterSpacing: "-0.04em",
              color: "transparent",
              WebkitTextStroke: "1px rgba(197,192,255,0.18)",
              /* Layered gradient fill for the editorial glow */
              backgroundImage:
                "linear-gradient(135deg, var(--primary) 0%, rgba(108,102,196,0.4) 50%, transparent 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            404
          </span>

          {/* Amber underline accent — like the desk lamp */}
          <motion.div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-px rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            style={{
              background: "linear-gradient(to right, transparent, var(--tertiary), transparent)",
            }}
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="mb-4 font-semibold"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
          style={{
            fontFamily: "var(--font-newsreader)",
            fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
            letterSpacing: "-0.02em",
            color: "var(--on-surface)",
          }}
        >
          This page wandered{" "}
          <span className="italic" style={{ color: "var(--primary)" }}>
            off the map
          </span>
          .
        </motion.h1>

        {/* Body */}
        <motion.p
          className="mb-10 max-w-md"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
          style={{
            fontFamily: "var(--font-manrope)",
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "var(--on-surface-variant)",
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist, was moved, or
          perhaps it never did. Let&apos;s get you somewhere familiar.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex items-center gap-3 flex-wrap justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.45 }}
        >
          <Button href="/" variant="primary" size="lg">
            Back to Home
          </Button>
          <Button href="/gallery" variant="ghost" size="lg">
            See Projects
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 7h8M8 4l3 3-3 3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </motion.div>

        {/* Subtle breadcrumb hint */}
        <motion.p
          className="mt-10 text-xs tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          style={{
            fontFamily: "var(--font-manrope)",
            color: "var(--on-surface-muted)",
          }}
        >
            clementpoudree.com
          {" / "}
          <span>404</span>
        </motion.p>
      </div>
    </div>
  );
}
