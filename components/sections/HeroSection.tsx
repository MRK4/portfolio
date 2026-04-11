"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import Badge from "../Badge";
import Button from "../Button";

/* Spring config — stiffness/damping tuned per layer depth */
const SPRING_SLOW = { stiffness: 60, damping: 20, mass: 1 };   // bg halos
const SPRING_MED = { stiffness: 90, damping: 22, mass: 1 };   // grid / rings
const SPRING_FAST = { stiffness: 120, damping: 24, mass: 1 };   // photo / dots

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  /* Raw mouse position normalised to [-0.5, 0.5] */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  /* Smooth springs — one set per speed tier */
  const slowX = useSpring(rawX, SPRING_SLOW);
  const slowY = useSpring(rawY, SPRING_SLOW);
  const medX = useSpring(rawX, SPRING_MED);
  const medY = useSpring(rawY, SPRING_MED);
  const fastX = useSpring(rawX, SPRING_FAST);
  const fastY = useSpring(rawY, SPRING_FAST);

  /* Transform ranges per layer */
  const haloVioletX = useTransform(slowX, [-0.5, 0.5], [-40, 40]);
  const haloVioletY = useTransform(slowY, [-0.5, 0.5], [-30, 30]);
  const haloAmberX = useTransform(slowX, [-0.5, 0.5], [30, -30]);
  const haloAmberY = useTransform(slowY, [-0.5, 0.5], [20, -20]);
  const gridX = useTransform(medX, [-0.5, 0.5], [-18, 18]);
  const gridY = useTransform(medY, [-0.5, 0.5], [-12, 12]);
  const ring1X = useTransform(medX, [-0.5, 0.5], [-24, 24]);
  const ring1Y = useTransform(medY, [-0.5, 0.5], [-16, 16]);
  const ring2X = useTransform(medX, [-0.5, 0.5], [-14, 14]);
  const ring2Y = useTransform(medY, [-0.5, 0.5], [-10, 10]);
  const photoX = useTransform(fastX, [-0.5, 0.5], [-20, 20]);
  const photoY = useTransform(fastY, [-0.5, 0.5], [-14, 14]);
  const glowX = useTransform(fastX, [-0.5, 0.5], [-28, 28]);
  const glowY = useTransform(fastY, [-0.5, 0.5], [-20, 20]);
  const dotAmberX = useTransform(fastX, [-0.5, 0.5], [-32, 32]);
  const dotAmberY = useTransform(fastY, [-0.5, 0.5], [-22, 22]);
  const dotVioletX = useTransform(fastX, [-0.5, 0.5], [28, -28]);
  const dotVioletY = useTransform(fastY, [-0.5, 0.5], [-18, 18]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full relative min-h-screen flex items-center pt-14 overflow-hidden"
      style={{ background: "var(--surface)" }}
    >

      {/* ── Layer 1 — slow halos (depth = far) ──────────────────────── */}
      <motion.div
        className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(108,102,196,0.18) 0%, transparent 65%)",
          x: haloVioletX,
          y: haloVioletY,
        }}
      />
      <motion.div
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(255,185,90,0.07) 0%, transparent 65%)",
          x: haloAmberX,
          y: haloAmberY,
        }}
      />

      {/* ── Layer 2 — medium grid + rings (depth = mid) ─────────────── */}
      <motion.svg
        className="absolute top-0 right-0 pointer-events-none opacity-[0.06]"
        width="480"
        height="480"
        viewBox="0 0 480 480"
        fill="none"
        style={{ x: gridX, y: gridY }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 60} y1={0} x2={i * 60} y2={480} stroke="#c5c0ff" strokeWidth="1" />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 60} x2={480} y2={i * 60} stroke="#c5c0ff" strokeWidth="1" />
        ))}
      </motion.svg>

      <motion.div
        className="absolute top-24 right-[28%] w-40 h-40 rounded-full pointer-events-none"
        style={{
          border: "1px solid rgba(197,192,255,0.12)",
          x: ring1X,
          y: ring1Y,
        }}
      />
      <motion.div
        className="absolute top-32 right-[30%] w-20 h-20 rounded-full pointer-events-none"
        style={{
          border: "1px solid rgba(197,192,255,0.08)",
          x: ring2X,
          y: ring2Y,
        }}
      />

      {/* ── Content ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 w-full py-24 grid md:grid-cols-2 gap-16 items-center">

        {/* Left — text (no parallax, stays anchored) */}
        <div>
          <Badge variant="primary" className="mb-6 tracking-widest uppercase text-[10px]">
            The Digital Atelier
          </Badge>

          <h1
            className="text-6xl md:text-7xl 2xl:text-8xl font-semibold leading-[1.02] mb-6"
            style={{
              fontFamily: "var(--font-newsreader)",
              color: "var(--on-surface)",
              letterSpacing: "-0.02em",
            }}
          >
            <span className="text-nowrap">Clément Poudrée,</span>
            <br />
            <span className="italic text-primary">Crafting</span>{" "}
            Digital
            <br />
            Artifacts.
          </h1>

          <p
            className="text-base md:text-lg mb-4 max-w-md"
            style={{
              fontFamily: "var(--font-manrope)",
              color: "var(--on-surface-variant)",
              lineHeight: 1.6,
            }}
          >
            A fullstack developer dedicated to the intersection of poetic aesthetics and
            technical precision. Building resilient systems with a not-human soul.
          </p>

          <div
            className="mb-8 h-px w-24"
            style={{
              background: "linear-gradient(to right, var(--tertiary), transparent)",
            }}
          />

          <div className="flex items-center gap-3 flex-wrap">
            <Button href="/gallery" variant="primary" size="lg">
              See Projects
            </Button>
            <Button href="/blog" variant="ghost" size="lg" className="backdrop-blur-xs">
              The Journal
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Right — image + decorative frame (layer 3 = fast / close) */}
        <div className="relative flex justify-center md:justify-end">

          {/* Violet glow — moves slightly more than the photo */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 60% 40%, rgba(108,102,196,0.35) 0%, transparent 65%)",
              filter: "blur(32px)",
              transform: "scale(1.1)",
              x: glowX,
              y: glowY,
            }}
          />

          {/* Photo */}
          <motion.div
            className="relative w-72 h-80 md:w-80 md:h-104 overflow-hidden"
            style={{
              borderRadius: "2.5rem",
              x: photoX,
              y: photoY,
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none backdrop-blur-xs"
              style={{
                background: "radial-gradient(ellipse at 50% 110%, rgba(255,185,90,0.2) 0%, transparent 60%)",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(135deg, rgba(108,102,196,0.15) 0%, transparent 50%, rgba(108,102,196,0.08) 100%)",
              }}
            />
            <Image
              draggable={false}
              src="/clement.png"
              alt="Clément Poudree"
              fill
              className="object-cover object-top select-none"
              priority
              sizes="(max-width: 768px) 288px, 320px"
            />
          </motion.div>

          {/* Offset border frame */}
          <div
            className="absolute -top-4 -left-4 w-full h-full pointer-events-none"
            style={{
              border: "1px solid rgba(197,192,255,0.15)",
              borderRadius: "2.5rem",
            }}
          />

          {/* Floating dots */}
          <motion.div
            className="absolute -bottom-3 -right-3 w-6 h-6 rounded-full pointer-events-none"
            style={{
              background: "var(--tertiary)",
              opacity: 0.7,
              x: dotAmberX,
              y: dotAmberY,
            }}
          />
          <motion.div
            className="absolute -top-2 right-8 w-3 h-3 rounded-full pointer-events-none"
            style={{
              background: "var(--primary)",
              opacity: 0.5,
              x: dotVioletX,
              y: dotVioletY,
            }}
          />
        </div>
      </div>
    </section>
  );
}
