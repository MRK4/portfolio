"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringAlert, setIsHoveringAlert] = useState(false);
  const [isHoveringWhiteButton, setIsHoveringWhiteButton] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const circleX = useMotionValue(-100);
  const circleY = useMotionValue(-100);
  const rafIdRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);

  // Animation très réactive pour le point central - optimisé
  const pointSpringConfig = { damping: 30, stiffness: 1000, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, pointSpringConfig);
  const cursorYSpring = useSpring(cursorY, pointSpringConfig);
  
  // Animation légèrement plus douce pour le cercle - optimisé
  const circleSpringConfig = { damping: 25, stiffness: 500, mass: 0.5 };
  const circleXSpring = useSpring(circleX, circleSpringConfig);
  const circleYSpring = useSpring(circleY, circleSpringConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const throttleMs = 16; // ~60fps

      // Throttle avec requestAnimationFrame pour meilleures performances
      if (now - lastUpdateRef.current < throttleMs) {
        return;
      }
      lastUpdateRef.current = now;

      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }

      rafIdRef.current = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        circleX.set(e.clientX);
        circleY.set(e.clientY);

        // Détecte si on survole un élément cliquable (throttlé)
        const target = e.target as HTMLElement;
        const isInput = target.tagName === "INPUT" && target instanceof HTMLInputElement;
        const isClickable =
          target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          (isInput && target.type !== "text" && target.type !== "textarea") ||
          target.getAttribute("role") === "button" ||
          target.getAttribute("role") === "link" ||
          target.closest("a, button, [role='button'], [role='link']") !== null;

        // Détecte si on survole l'alerte du navigateur
        const browserAlertElement = target.closest(".browser-alert");
        const isHoveringBrowserAlert = browserAlertElement !== null;

        // Détecte si on survole un bouton blanc
        const buttonElement = target.closest("button, a, [role='button']");
        let isWhiteButton = false;
        if (buttonElement) {
          const element = buttonElement as HTMLElement;
          const classes = element.className || "";
          const computedStyle = window.getComputedStyle(element);
          const bgColor = computedStyle.backgroundColor;
          
          // Vérifie si le bouton a bg-white dans ses classes
          // ou si le background calculé est blanc
          const isWhiteInClasses = 
            classes.includes("bg-white");
          
          // Vérifie si le background calculé est blanc (rgb(255, 255, 255) ou proche)
          const isWhiteInStyle = 
            bgColor === "rgb(255, 255, 255)" ||
            bgColor === "#ffffff" ||
            bgColor.startsWith("rgb(255, 255, 255)");
          
          isWhiteButton = isWhiteInClasses || isWhiteInStyle;
        }

        setIsHovering(isClickable);
        setIsHoveringAlert(isHoveringBrowserAlert);
        setIsHoveringWhiteButton(isWhiteButton);
      });
    };

    // Utilisation de { passive: true } pour meilleures performances
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [cursorX, cursorY, circleX, circleY]);

  // Masque le curseur personnalisé si on survole l'alerte
  if (isHoveringAlert) {
    return null;
  }

  return (
    <>
      {/* Point central ou petit cercle au hover - optimisé GPU */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[101]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
          transform: "translateZ(0)", // Force l'accélération GPU
        }}
      >
        <motion.div
          className="rounded-full"
          animate={{
            width: isHovering ? 8 : 6,
            height: isHovering ? 8 : 6,
            borderWidth: isHovering ? 1 : 0,
            borderColor: isHoveringWhiteButton 
              ? (isHovering ? "#1f2937" : "#374151") 
              : (isHovering ? "white" : "transparent"),
            backgroundColor: isHoveringWhiteButton
              ? (isHovering ? "transparent" : "#1f2937")
              : (isHovering ? "transparent" : "white"),
          }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
        />
      </motion.div>

      {/* Cercle extérieur - optimisé GPU */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[101]"
        style={{
          x: circleXSpring,
          y: circleYSpring,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
          transform: "translateZ(0)", // Force l'accélération GPU
        }}
      >
        <motion.div
          className="w-8 h-8 border rounded-full"
          animate={{
            borderColor: isHoveringWhiteButton ? "#1f2937" : "white",
          }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
        />
      </motion.div>
    </>
  );
}
