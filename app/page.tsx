"use client";

import { useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import HeroSection from "./components/section/HeroSection";
import JourneySection from "./components/section/JourneySection";
import ProjectsSection from "./components/section/ProjectsSection";
import ContactSection from "./components/section/ContactSection";
import Navbar from "./components/Navbar";

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
      {/* Navbar */}
      <Navbar scrollContainerRef={containerRef} />
      
      {/* Section Hero */}
      <HeroSection scrollProgress={smoothProgress} />

      {/* Section Parcours */}
      <JourneySection scrollProgress={smoothProgress} />

      {/* Section Projects */}
      <ProjectsSection scrollProgress={smoothProgress} />

      {/* Section Contact */}
      <ContactSection scrollProgress={smoothProgress} />
    </div>
  );
}
