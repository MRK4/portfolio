"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

// Navigation items
const navItems = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#journey" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {

  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const updateActiveSection = () => {
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;

      // Trouver la section la plus proche du centre de la fenêtre
      let activeId = "";
      let minDistance = Infinity;

      navItems.forEach((item) => {
        const sectionId = item.href.substring(1);
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const sectionCenter = rect.top + rect.height / 2;
          const distance = Math.abs(sectionCenter - viewportCenter);

          // Si la section occupe plus de 50% de la fenêtre visible, elle est active
          const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
          const visibilityRatio = visibleHeight / viewportHeight;

          if (visibilityRatio > 0.5 && distance < minDistance) {
            minDistance = distance;
            activeId = sectionId;
          }
        }
      });

      // Si aucune section n'occupe plus de 50%, prendre la plus proche du centre
      if (!activeId) {
        navItems.forEach((item) => {
          const sectionId = item.href.substring(1);
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            const sectionCenter = rect.top + rect.height / 2;
            const distance = Math.abs(sectionCenter - viewportCenter);

            if (distance < minDistance) {
              minDistance = distance;
              activeId = sectionId;
            }
          }
        });
      }

      if (activeId) {
        setActiveSection(activeId);
      }
    };

    // Vérifier la section active au scroll
    const handleScroll = () => {
      updateActiveSection();
    };

    // Vérifier la section initiale
    updateActiveSection();

    // Écouter les événements de scroll
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateActiveSection, { passive: true });

    // Utiliser aussi Intersection Observer comme backup
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Section active quand elle occupe au moins 60% de la fenêtre
      threshold: [0, 0.5, 1],
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Trouver l'entrée avec le plus grand ratio d'intersection
      let maxRatio = 0;
      let bestEntry: IntersectionObserverEntry | undefined;

      for (const entry of entries) {
        if (entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          bestEntry = entry;
        }
      }

      if (bestEntry && bestEntry.isIntersecting && maxRatio > 0.5) {
        setActiveSection(bestEntry.target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observer toutes les sections
    navItems.forEach((item) => {
      const sectionId = item.href.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateActiveSection);
      observer.disconnect();
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-[100] pointer-events-none"
    >
      <motion.ul
        className="flex flex-col items-start gap-6 pointer-events-auto"
      >
        {navItems.map((item, index) => {
          const sectionId = item.href.substring(1);
          const isActive = activeSection === sectionId;

          return (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.a
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={`text-sm md:text-base font-medium relative block transition-colors duration-300 ${
                  isActive ? "text-white" : "text-white/60"
                }`}
                style={{ transform: "translateZ(0)" }}
                whileHover={{ opacity: 1, scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-white"
                  initial={{ width: isActive ? "100%" : "0%" }}
                  animate={{ width: isActive ? "100%" : "0%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            </motion.li>
          );
        })}
      </motion.ul>
    </motion.nav>
  );
}
