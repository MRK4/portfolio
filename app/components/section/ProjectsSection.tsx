"use client";

import { motion, useTransform } from "motion/react";
import { useSpring } from "motion/react";
import { useState } from "react";

interface ProjectsSectionProps {
  scrollProgress: ReturnType<typeof useSpring>;
}

export default function ProjectsSection({ scrollProgress }: ProjectsSectionProps) {
  const y1 = useTransform(scrollProgress, [0.5, 0.75], [0, -150]);
  const y2 = useTransform(scrollProgress, [0.5, 0.75], [0, -75]);
  const opacity = useTransform(
    scrollProgress,
    [0.5, 0.6, 0.7, 0.75],
    [0, 1, 1, 0]
  );

  // Mock project data
  const projects = [
    {
      title: "ToDoGether",
      description: "Simple and easy to use todo list app, made in one day.",
      image: "/projects/todogether.png",
      technologies: ["Next.js", "Typescript", "Node.js", "Prisma"],
      category: "Side Project",
      year: "2026",
      link: "https://todogether.vercel.app/",
    },
    {
      title: "Lerni",
      description: "Lerni is a modern learning platform that enables creators to build and publish structured online courses combining video and rich written content. Designed as a realistic SaaS product, it focuses on engagement, clarity, and a motivating learning experience rather than a corporate, monochrome interface.",
      image: "/projects/lerni.png",
      technologies: ["Next.js", "Typescript", "Node.js", "Prisma"],
      category: "Side Project",
      year: "2026",
      link: "https://lerni-sand.vercel.app/"
    },
    {
      title: "GuruPress",
      description: "A complete monitoring dashboard for multiple WordPress websites, made with Next.js and Prisma. I wish I had time to put it in production...",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      technologies: ["Next.js", "Typescript", "Node.js", "Prisma", "PHP"],
      category: "Side Project",
      year: "2026",
      link: "https://gurupress.vercel.app/"
    },
    {
      title: "Farmanip",
      description: "A strong company in the automotive industry, I built their website from scratch using PHP and ACF Pro.",
      image: "/projects/farmanip.jpg",
      technologies: ["WordPress", "PHP", "ACF Pro", "Javascript", "Figma"],
      category: "Real Project",
      year: "2025",
      link: "https://farmanip.com/"
    },
    {
      title: "Fireservice",
      description: "Complete website for a security company, made with PHP and ACF Pro during my internship.",
      image: "/projects/fireservice.jpg",
      technologies: ["WordPress", "PHP", "ACF Pro", "Javascript", "Figma"],
      category: "Real Project",
      year: "2020",
      link: "https://www.fireservice.fr/"
    },
    {
      title: "Real Estate Website",
      description: "Always nostalgic about my first ever react project, it's kinda cute.",
      image: "/projects/realestate.jpg",
      technologies: ["React", "TailwindCSS"],
      category: "Side Project",
      year: "2019",
      link: "https://webtale-realestate.netlify.app/",
      github: "https://github.com/MRK4/real-estate-app",
    }
  ];

  return (
    <section id="projects" className="h-screen snap-start snap-always flex items-start justify-start bg-gradient-to-br from-black via-zinc-900 to-black relative overflow-y-auto overflow-x-hidden z-30 isolate hide-scrollbar">
      <motion.div
        className="max-w-7xl mx-auto px-4 md:px-8 w-full z-30 relative pt-8 md:pt-12 pb-12 md:pb-20 flex flex-col"
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 md:mb-12 lg:mb-16 text-center relative z-30"
          style={{
            willChange: "transform",
            transform: "translateZ(0)",
            fontFamily: 'var(--font-special-gothic-expanded-one)',
          }}
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 relative z-30 py-4">
          {projects.map((project, index) => {
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
                key={project.title}
                className="group relative flex flex-col bg-white/15 backdrop-blur-sm border border-white/30 rounded-xl overflow-hidden hover:bg-white/20 transition-all duration-150 cursor-pointer shadow-lg"
                style={{
                  willChange: "transform",
                  transform: "translateZ(0)",
                  zIndex: 30,
                }}
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.01, transition: { duration: 0.15, ease: "easeOut" } }}
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
                    transition={{ duration: 0.1, ease: "easeOut" }}
                  />
                )}
                {/* Project image */}
                <div className="relative w-full h-48 md:h-64 overflow-hidden bg-zinc-800 z-10">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    style={{ transform: "translateZ(0)" }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    onError={(e) => {
                      // Fallback si l'image ne charge pas
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-semibold bg-white/20 backdrop-blur-sm text-white rounded-full border border-white/30">
                      {project.category}
                    </span>
                  </div>

                  {/* Year */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-xs font-semibold bg-white/20 backdrop-blur-sm text-white rounded-full border border-white/30">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Card content */}
                <div className="flex flex-col flex-1 min-h-0 p-6 md:p-8 relative z-10">
                  <div className="flex-1 min-h-0">
                    <motion.h3
                      className="text-2xl md:text-3xl font-bold text-white mb-3"
                      style={{ transform: "translateZ(0)" }}
                    >
                      {project.title}
                    </motion.h3>

                    <motion.p
                      className="text-zinc-200 text-sm md:text-base leading-relaxed mb-6"
                      style={{ transform: "translateZ(0)" }}
                    >
                      {project.description}
                    </motion.p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          className="px-3 py-1 text-xs md:text-sm bg-white/15 text-white rounded-full border border-white/30"
                          style={{ transform: "translateZ(0)" }}
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: "rgba(255, 255, 255, 0.25)",
                          }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Card footer - toujours en bas */}
                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
                    {project.link ? (
                      <motion.a
                        href={project.link}
                        className="inline-flex items-center gap-2 text-white text-sm font-semibold hover:text-zinc-300 transition-colors duration-150"
                        style={{ transform: "translateZ(0)" }}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Project
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </motion.a>
                    ) : (
                      <motion.span className="inline-flex items-center gap-2 text-white text-sm font-semibold">
                        Still in development...
                      </motion.span>
                    )}
                    {project.github && (
                      <motion.a
                        href={project.github}
                        className="inline-flex items-center text-white hover:text-zinc-300 transition-colors duration-150"
                        style={{ transform: "translateZ(0)" }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5"
                        >
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                          <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* GitHub link */}
        <motion.div
          className="flex justify-center mt-8 md:mt-12 relative z-30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.a
            href="https://github.com/MRK4"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-white hover:text-zinc-300 transition-colors"
            style={{ transform: "translateZ(0)" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
              <path d="M9 18c-4.51 2-5-2-7-2"/>
            </svg>
            <span className="text-base md:text-lg font-medium">View on GitHub</span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Decorative background elements - GPU optimized */}
      <motion.div
        className="absolute inset-0 opacity-5 z-0 pointer-events-none"
        style={{
          y: useTransform(scrollProgress, [0.5, 0.75], [-30, 30]),
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
