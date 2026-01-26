"use client";

import { motion, useTransform } from "motion/react";
import { useSpring } from "motion/react";

interface HeroSectionProps {
  scrollProgress: ReturnType<typeof useSpring>;
}

export default function HeroSection({ scrollProgress }: HeroSectionProps) {
  const y1 = useTransform(scrollProgress, [0, 0.5], [0, -200]);
  const y2 = useTransform(scrollProgress, [0, 0.5], [0, -100]);
  const scale = useTransform(scrollProgress, [0, 0.4], [1, 0.8]);
  const rotate = useTransform(scrollProgress, [0, 0.5], [0, 5]);

  // Animation pour les lettres individuelles
  const letters = "CLÉMENT".split("");
  const letters2 = "POUDRÉE".split("");

  return (
    <section id="home" className="h-screen snap-start snap-always flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-black via-zinc-900 to-black py-8 z-10">
      {/* Grille animée en arrière-plan - optimisée GPU */}
      <motion.div
        className="absolute inset-0 opacity-10 z-0"
        style={{ 
          rotate,
          willChange: "transform",
          transform: "translateZ(0)", // Force l'accélération GPU
        }}
      >
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: "translateZ(0)",
          }} 
        />
      </motion.div>

      {/* Éléments de fond avec parallax - optimisé GPU */}
      <motion.div
        className="absolute inset-0 opacity-20 z-0"
        style={{ 
          y: y1,
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"
          style={{ transform: "translateZ(0)" }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"
          style={{ transform: "translateZ(0)" }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
          style={{ transform: "translateZ(0)" }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </motion.div>

      {/* Lignes graphiques animées - optimisé GPU */}
      <motion.div
        className="absolute inset-0 opacity-5 z-0"
        style={{ 
          y: y1,
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        <motion.div
          className="absolute top-0 left-1/4 w-px h-full bg-white"
          style={{ transform: "translateZ(0)" }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
        <motion.div
          className="absolute top-0 right-1/4 w-px h-full bg-white"
          style={{ transform: "translateZ(0)" }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, delay: 0.7 }}
        />
        <motion.div
          className="absolute top-1/4 left-0 w-full h-px bg-white"
          style={{ transform: "translateZ(0)" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.9 }}
        />
        <motion.div
          className="absolute bottom-1/4 left-0 w-full h-px bg-white"
          style={{ transform: "translateZ(0)" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.1 }}
        />
      </motion.div>

      {/* Contenu principal - optimisé GPU */}
      <motion.div
        className="text-center z-20 relative px-8"
        style={{ 
          y: y2, 
          scale,
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        {/* Premier nom avec animation lettre par lettre */}
        <div className="flex justify-center items-center gap-2 md:gap-3 mb-2">
          {letters.map((letter, index) => (
            <motion.span
              key={`letter1-${index}`}
              className="select-none text-6xl md:text-9xl lg:text-[12rem] text-white leading-none relative z-30"
              style={{ 
                fontFamily: 'var(--font-special-gothic-expanded-one)',
                willChange: "auto", // Optimisé : willChange seulement pendant animation
                transform: "translateZ(0)",
              }}
              initial={{ 
                opacity: 0, 
                y: 100,
                rotateX: -90,
              }}
              animate={{ 
                opacity: 1, 
                y: 0,
                rotateX: 0,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              onAnimationComplete={() => {
                // Retire willChange après l'animation pour économiser les ressources
              }}
              whileHover={{
                scale: 1.2,
                y: -10,
                transition: { duration: 0.3 },
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </div>

        {/* Deuxième nom avec animation lettre par lettre */}
        <div className="flex justify-center items-center gap-2 md:gap-3 mb-8">
          {letters2.map((letter, index) => (
            <motion.span
              key={`letter2-${index}`}
              className="select-none text-6xl md:text-9xl lg:text-[12rem] text-white leading-none relative z-30"
              style={{ 
                fontFamily: 'var(--font-special-gothic-expanded-one)',
                willChange: "auto", // Optimisé : willChange seulement pendant animation
                transform: "translateZ(0)",
              }}
              initial={{ 
                opacity: 0, 
                y: 100,
                rotateX: -90,
              }}
              animate={{ 
                opacity: 1, 
                y: 0,
                rotateX: 0,
              }}
              transition={{
                duration: 0.8,
                delay: letters.length * 0.1 + index * 0.1 + 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                scale: 1.2,
                y: -10,
                transition: { duration: 0.3 },
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </div>

        {/* Sous-titre avec animation */}
        <motion.div
          className="relative z-30"
          style={{ transform: "translateZ(0)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.p
            className="select-none text-xl md:text-3xl text-zinc-400 font-light tracking-wider uppercase relative z-30"
            style={{ transform: "translateZ(0)" }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
          >
            Full Stack Developer
          </motion.p>
          <motion.div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-white relative z-30"
            style={{ transform: "translateZ(0)" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
          />
        </motion.div>

        {/* Localisation avec animation */}
        <motion.p
          className="select-none text-sm md:text-lg text-zinc-500 mt-8 tracking-[0.3em] uppercase relative z-30"
          style={{ transform: "translateZ(0)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
        >
          Based in Rennes
        </motion.p>
      </motion.div>

      {/* Indicateur de scroll - optimisé GPU */}
      <motion.div
        className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 z-20"
        style={{ transform: "translateZ(0)" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        {/* Flèche vers le bas - Mobile */}
        <motion.div
          className="md:hidden"
          style={{ transform: "translateZ(0)" }}
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>

        {/* Souris - Desktop */}
        <motion.div
          className="hidden md:block w-6 h-10 border-2 border-white rounded-full flex justify-center p-2"
          style={{ transform: "translateZ(0)" }}
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="w-1 h-3 bg-white rounded-full"
            style={{ transform: "translateZ(0)" }}
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
