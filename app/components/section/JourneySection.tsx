"use client";

import { motion, useTransform } from "motion/react";
import { useSpring } from "motion/react";
import { useState } from "react";

interface JourneySectionProps {
  scrollProgress: ReturnType<typeof useSpring>;
}

export default function JourneySection({ scrollProgress }: JourneySectionProps) {
  const opacity = useTransform(
    scrollProgress,
    [0.2, 0.3, 0.5, 0.6],
    [0, 1, 1, 0]
  );
  const y = useTransform(scrollProgress, [0.2, 0.6], [30, -30]);

  // Journey data (mock data)
  const journeyData = [
    {
      year: "2023 - Present",
      title: "Software Engineer",
      company: "Adventiel",
      location: "Pacé, France (hybrid)",
      description: "Within a multidisciplinary team, I develop web solutions for our clients — ranging from static websites to complex web applications — and also ensure the maintenance and continuous improvement of our technical systems.",
      technologies: ["WordPress", "React", "React", "Angular", "Python", "Docker", "Node.js", "SQL"],
    },
    {
      year: "2022 - 2023",
      title: "Freelance Web Developer",
      company: "Webtale",
      location: "Rennes, France (remote)",
      description: "Worked with several clients to create websites and web applications.",
      technologies: ["WordPress", "React", "Node.js"],
    },
    {
      year: "2021 - 2022",
      title: "Web Developer Apprenticeship",
      company: "Marketing Digital Facile",
      location: "Rennes, France (remote)",
      description: "I completed a one-year fully remote apprenticeship during my bachelor's degree. My role involved maintaining our clients' websites and developing a WordPress plugin on the side.",
      technologies: ["WordPress", "PHP", "ACF Pro", "Figma"],
    },
    {
      year: "2020",
      title: "Web Developer Internship",
      company: "Fireservice",
      location: "Fontainebleau, France (remote)",
      description: "A fully remote internship with Fireservice during my studies, a security company, where I was tasked with creating a website from scratch.",
      technologies: ["WordPress", "PHP", "ACF Pro", "Figma"],
    },
  ];

  return (
    <section id="journey" className="h-screen snap-start snap-always flex items-center justify-center bg-gradient-to-br from-zinc-900 via-black to-zinc-900 relative overflow-hidden z-20 isolate">
      <div className="absolute inset-0 overflow-y-auto overflow-x-hidden hide-scrollbar">
        <motion.div
          className="max-w-6xl mx-auto px-4 md:px-8 w-full z-20 relative py-12 md:py-20 min-h-full flex flex-col justify-center"
          style={{
            y,
            willChange: "transform",
            transform: "translateZ(0)",
          }}
        >
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 md:mb-12 lg:mb-16 text-center relative z-20"
          style={{ 
            transform: "translateZ(0)",
            fontFamily: 'var(--font-special-gothic-expanded-one)',
          }}
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          Work Experience
        </motion.h2>

        <div className="relative w-full">
          {/* Vertical timeline line */}
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white via-zinc-500 to-white z-10 -translate-x-1/2"
            style={{ 
              transform: "translateZ(0)",
              transformOrigin: "top",
            }}
            initial={{ scaleY: 1 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Timeline points and cards */}
          <div className="space-y-8 md:space-y-12 lg:space-y-16 relative z-20">
            {journeyData.map((item, index) => {
              const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
              
              const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                setMousePosition({ x, y });
              };

              const handleMouseLeave = () => {
                setMousePosition(null);
              };

              return (
              <motion.div
                key={index}
                className="relative flex items-start gap-4 md:gap-8 w-full"
                initial={{ opacity: 1, x: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Point on the line - absolutely positioned to align with the line */}
                <motion.div
                  className="absolute left-4 md:left-1/2 w-4 h-4 bg-white rounded-full -translate-x-1/2 border-4 border-black z-20"
                  style={{ 
                    transform: "translateZ(0)",
                  }}
                  initial={{ scale: 1 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15 + 0.3,
                    type: "spring",
                    stiffness: 200,
                  }}
                />
                <motion.div
                  className="absolute left-4 md:left-1/2 w-4 h-4 bg-white rounded-full -translate-x-1/2 opacity-0 z-20"
                  style={{ 
                    transform: "translateZ(0)",
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                />
                {/* Spacer to maintain space in flex layout */}
                <div className="flex-shrink-0 w-4 md:w-0" />

                {/* Content card */}
                <motion.div
                  className={`flex-1 min-w-0 ${
                    index % 2 === 0
                      ? "md:mr-auto md:pr-8 md:max-w-[45%]"
                      : "md:ml-auto md:pl-8 md:max-w-[45%]"
                  }`}
                  style={{ transform: "translateZ(0)" }}
                  whileHover={{ scale: 1.02, x: index % 2 === 0 ? 5 : -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div 
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-5 md:p-6 lg:p-8 hover:bg-white/15 transition-colors duration-300 shadow-lg relative overflow-hidden"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Light effect following cursor */}
                    {mousePosition && (
                      <motion.div
                        className="absolute pointer-events-none z-0"
                        style={{
                          left: mousePosition.x,
                          top: mousePosition.y,
                          transform: "translate(-50%, -50%)",
                          width: "300px",
                          height: "300px",
                          background: "radial-gradient(circle, rgba(255, 255, 255, 0.04) 0%, transparent 70%)",
                          willChange: "transform",
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    <div className="relative z-10">
                      <motion.div
                        className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4"
                        style={{ transform: "translateZ(0)" }}
                      >
                        <span className="text-xl md:text-2xl text-white">
                          {item.year}
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-r from-white/50 to-transparent" />
                      </motion.div>

                      <motion.h3
                        className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2"
                        style={{ transform: "translateZ(0)" }}
                      >
                        {item.title}
                      </motion.h3>

                      <motion.p
                        className="text-base md:text-lg text-zinc-200"
                        style={{ transform: "translateZ(0)" }}
                      >
                        {item.company}
                      </motion.p>

                      <motion.p
                        className="text-xs text-zinc-400 mb-3 md:mb-4"
                        style={{ transform: "translateZ(0)" }}
                      >
                        {item.location}
                      </motion.p>

                      <motion.p
                        className="text-sm md:text-base text-zinc-300 leading-relaxed mb-4 md:mb-6"
                        style={{ transform: "translateZ(0)" }}
                      >
                        {item.description}
                      </motion.p>

                      {/* Technologies */}
                      <motion.div
                        className="flex flex-wrap gap-2"
                        style={{ transform: "translateZ(0)" }}
                        initial={{ opacity: 1 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + 0.4 }}
                      >
                      {item.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          className="px-3 py-1 text-xs md:text-sm bg-white/10 text-white rounded-full border border-white/20"
                          style={{ transform: "translateZ(0)" }}
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              );
            })}
          </div>
        </div>
        </motion.div>
      </div>

      {/* Decorative background elements - GPU optimized */}
      <motion.div
        className="absolute inset-0 opacity-5 z-0 pointer-events-none"
        style={{
          y: useTransform(scrollProgress, [0.2, 0.6], [-30, 30]),
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        <div className="absolute top-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-white rounded-full blur-3xl" />
      </motion.div>
    </section>
  );
}
