"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Animation fluide du scroll progress - optimisé pour performance
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
    mass: 0.5, // Réduit la masse pour meilleures performances
  });

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
    >
      {/* Section Hero */}
      <HeroSection scrollProgress={smoothProgress} />

      {/* Section About */}
      <AboutSection scrollProgress={smoothProgress} />

      {/* Section Projects */}
      <ProjectsSection scrollProgress={smoothProgress} />

      {/* Section Contact */}
      <ContactSection scrollProgress={smoothProgress} />
    </div>
  );
}

// Section Hero avec effet parallax
function HeroSection({
  scrollProgress,
}: {
  scrollProgress: ReturnType<typeof useSpring>;
}) {
  const y1 = useTransform(scrollProgress, [0, 0.5], [0, -200]);
  const y2 = useTransform(scrollProgress, [0, 0.5], [0, -100]);
  const scale = useTransform(scrollProgress, [0, 0.4], [1, 0.8]);
  const rotate = useTransform(scrollProgress, [0, 0.5], [0, 5]);

  // Animation pour les lettres individuelles
  const letters = "CLÉMENT".split("");
  const letters2 = "POUDRÉE".split("");

  return (
    <section className="h-screen snap-start snap-always flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-black via-zinc-900 to-black py-8">
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
              className="text-6xl md:text-9xl lg:text-[12rem] text-white leading-none relative z-30"
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
              className="text-6xl md:text-9xl lg:text-[12rem] text-white leading-none relative z-30"
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
            className="text-xl md:text-3xl text-zinc-400 font-light tracking-wider uppercase relative z-30"
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
          className="text-sm md:text-lg text-zinc-500 mt-8 tracking-[0.3em] uppercase relative z-30"
          style={{ transform: "translateZ(0)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
        >
          Basé à Rennes
        </motion.p>
      </motion.div>

      {/* Indicateur de scroll - optimisé GPU */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        style={{ transform: "translateZ(0)" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-2"
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

// Section About avec parallax - optimisée GPU
function AboutSection({
  scrollProgress,
}: {
  scrollProgress: ReturnType<typeof useSpring>;
}) {
  const y = useTransform(scrollProgress, [0.25, 0.75], [100, -100]);
  const opacity = useTransform(
    scrollProgress,
    [0.25, 0.4, 0.6, 0.75],
    [0, 1, 1, 0]
  );

  return (
    <section className="h-screen snap-start snap-always flex items-center justify-center bg-white dark:bg-zinc-900 relative overflow-hidden">
      <motion.div
        className="max-w-4xl mx-auto px-8 text-center z-10"
        style={{ 
            y, 
            opacity,
            willChange: "transform, opacity",
            transform: "translateZ(0)",
        }}
      >
        <motion.h2
          className="text-5xl md:text-6xl font-bold text-black dark:text-white mb-8"
          style={{ transform: "translateZ(0)" }}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          À propos
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed"
          style={{ transform: "translateZ(0)" }}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Développeur full stack passionné par la création d&apos;expériences
          web modernes et performantes. Spécialisé dans les technologies
          JavaScript/TypeScript, React, Next.js et Node.js.
        </motion.p>
      </motion.div>

      {/* Éléments décoratifs avec parallax inversé - optimisé GPU */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full opacity-10"
        style={{ 
          y: useTransform(scrollProgress, [0.25, 0.75], [-50, 50]),
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        <div className="w-full h-full bg-gradient-to-l from-black dark:from-white" />
      </motion.div>
    </section>
  );
}

// Section Projects avec parallax - optimisée GPU
function ProjectsSection({
  scrollProgress,
}: {
  scrollProgress: ReturnType<typeof useSpring>;
}) {
  const y1 = useTransform(scrollProgress, [0.5, 1], [0, -150]);
  const y2 = useTransform(scrollProgress, [0.5, 1], [0, -75]);
  const opacity = useTransform(
    scrollProgress,
    [0.5, 0.65, 0.85, 1],
    [0, 1, 1, 0]
  );

  const projects = [
    { title: "Projet 1", description: "Description du projet 1" },
    { title: "Projet 2", description: "Description du projet 2" },
    { title: "Projet 3", description: "Description du projet 3" },
  ];

  return (
    <section className="h-screen snap-start snap-always flex items-center justify-center bg-gradient-to-br from-zinc-900 via-black to-zinc-900 relative overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto px-8 z-10"
        style={{ 
          opacity,
          willChange: "opacity",
          transform: "translateZ(0)",
        }}
      >
        <motion.h2
          className="text-5xl md:text-6xl font-bold text-white mb-12 text-center"
          style={{ 
            y: y1,
            willChange: "transform",
            transform: "translateZ(0)",
          }}
        >
          Projets
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-zinc-800 p-6 rounded-lg"
              style={{
                y: y2,
                willChange: "transform",
                transform: "translateZ(0)",
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
                {project.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                {project.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// Section Contact avec parallax - optimisée GPU
function ContactSection({
  scrollProgress,
}: {
  scrollProgress: ReturnType<typeof useSpring>;
}) {
  const y = useTransform(scrollProgress, [0.75, 1], [100, -50]);
  const opacity = useTransform(scrollProgress, [0.75, 0.9], [0, 1]);
  const scale = useTransform(scrollProgress, [0.75, 1], [0.9, 1]);

  return (
    <section className="h-screen snap-start snap-always flex items-center justify-center bg-white dark:bg-black relative overflow-hidden">
      <motion.div
        className="max-w-2xl mx-auto px-8 text-center z-10"
        style={{ 
          y, 
          opacity, 
          scale,
          willChange: "transform, opacity",
          transform: "translateZ(0)",
        }}
      >
        <motion.h2
          className="text-5xl md:text-6xl font-bold text-black dark:text-white mb-8"
          style={{ transform: "translateZ(0)" }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Contact
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-8"
          style={{ transform: "translateZ(0)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          N&apos;hésitez pas à me contacter pour discuter de vos projets.
        </motion.p>
        <motion.a
          href="mailto:contact@example.com"
          className="inline-block px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold text-lg transition-transform hover:scale-105"
          style={{ transform: "translateZ(0)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Envoyer un email
        </motion.a>
      </motion.div>

      {/* Éléments décoratifs - optimisé GPU */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1/2 opacity-5"
        style={{
          y: useTransform(scrollProgress, [0.75, 1], [0, -100]),
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        <div className="w-full h-full bg-gradient-to-t from-black dark:from-white" />
      </motion.div>
    </section>
  );
}
