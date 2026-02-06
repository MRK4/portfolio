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

interface NavbarProps {
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
}

export default function Navbar({ scrollContainerRef }: NavbarProps) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const updateActiveSection = () => {
      const viewportHeight = window.innerHeight;
      const viewportCenterY = viewportHeight / 2;

      // La section active est celle qui contient le centre de la fenêtre
      // (plus stable avec le scroll snap : on ne change qu'une fois le centre passé)
      let activeId = "";

      for (const item of navItems) {
        const sectionId = item.href.substring(1);
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const centerInView = rect.top <= viewportCenterY && rect.bottom >= viewportCenterY;
          if (centerInView) {
            activeId = sectionId;
            break;
          }
        }
      }

      // Si le centre n'est dans aucune section (transition), prendre la plus proche du centre
      if (!activeId) {
        let minDistance = Infinity;
        for (const item of navItems) {
          const sectionId = item.href.substring(1);
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            const sectionCenterY = rect.top + rect.height / 2;
            const distance = Math.abs(sectionCenterY - viewportCenterY);
            if (distance < minDistance) {
              minDistance = distance;
              activeId = sectionId;
            }
          }
        }
      }

      if (activeId) {
        setActiveSection(activeId);
      }
    };

    // Vérifier la section active au scroll
    const handleScroll = () => {
      updateActiveSection();
    };

    // Vérifier la section initiale après que le DOM soit prêt
    const rafId = requestAnimationFrame(() => {
      updateActiveSection();
    });

    // Écouter les événements de scroll sur le bon élément
    if (scrollContainerRef?.current) {
      scrollContainerRef.current.addEventListener("scroll", handleScroll, { passive: true });
    } else {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }
    window.addEventListener("resize", updateActiveSection, { passive: true });

    // Intersection Observer en backup : ne change que si une section a >70% de visibilité
    const observerOptions = {
      root: scrollContainerRef?.current ?? null,
      rootMargin: "-15% 0px -15% 0px",
      threshold: [0, 0.5, 0.7, 1],
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      let maxRatio = 0;
      let bestEntry: IntersectionObserverEntry | undefined;

      for (const entry of entries) {
        if (entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          bestEntry = entry;
        }
      }

      if (bestEntry && bestEntry.isIntersecting && maxRatio > 0.7) {
        setActiveSection(bestEntry.target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observer les sections (avec un léger délai pour que le ref soit attaché)
    const observeSections = () => {
      navItems.forEach((item) => {
        const sectionId = item.href.substring(1);
        const element = document.getElementById(sectionId);
        if (element) {
          observer.observe(element);
        }
      });
    };

    observeSections();

    return () => {
      cancelAnimationFrame(rafId);
      if (scrollContainerRef?.current) {
        scrollContainerRef.current.removeEventListener("scroll", handleScroll);
      } else {
        window.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("resize", updateActiveSection);
      observer.disconnect();
    };
  }, [scrollContainerRef]);

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
