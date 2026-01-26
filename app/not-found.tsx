"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";
import Link from "next/link";

export default function NotFound() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Animation légèrement plus douce pour le cercle - similaire au CustomCursor
  const circleSpringConfig = { damping: 25, stiffness: 500, mass: 0.5 };
  const springX = useSpring(mouseX, circleSpringConfig);
  const springY = useSpring(mouseY, circleSpringConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const numbers = ["4", "0", "4"];
  const letters = "Page not found".split("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center relative overflow-hidden">
      {/* Effet de lumière suivant la souris */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-0"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />

      {/* Grille animée en arrière-plan */}
      <motion.div
        className="absolute inset-0 opacity-5 z-0"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Éléments décoratifs animés */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl opacity-10 z-0"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl opacity-10 z-0"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Contenu principal */}
      <div className="relative z-10 text-center px-4">
        {/* Numéro 404 animé */}
        <div className="flex justify-center items-center gap-2 md:gap-4 mb-8">
          {numbers.map((number, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                fontFamily: 'var(--font-special-gothic-expanded-one)',
                transform: "translateZ(0)",
              }}
            >
              <span className="text-8xl md:text-[12rem] lg:text-[16rem] text-white leading-none select-none">
                {number}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Texte "Page not found" */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex justify-center items-center gap-2 flex-wrap">
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                className="text-2xl md:text-4xl text-zinc-400 select-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 1 + index * 0.05,
                }}
                whileHover={{
                  scale: 1.2,
                  color: "#ffffff",
                  y: -5,
                }}
                style={{ transform: "translateZ(0)" }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Message */}
        <motion.p
          className="text-lg md:text-xl text-zinc-500 mb-12 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>

        {/* Bouton retour à l'accueil */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
        >
          <Link href="/">
            <motion.button
              className="relative px-8 py-4 bg-white text-black rounded-full font-semibold text-lg overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ transform: "translateZ(0)" }}
            >
              <span className="relative z-10">Go Home</span>
              {/* Effet de brillance au survol */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              {/* Effet de pulsation */}
              <motion.div
                className="absolute inset-0 bg-white rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
