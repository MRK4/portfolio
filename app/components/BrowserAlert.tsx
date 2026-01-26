"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function BrowserAlert() {
  const [showAlert, setShowAlert] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Vérifie si l'alerte a déjà été fermée (localStorage)
    const dismissed = localStorage.getItem("browser-alert-dismissed");
    if (dismissed === "true") {
      setIsDismissed(true);
      return;
    }

    // Détecte si le navigateur est Chromium
    const isChromium =
      /Chrome/.test(navigator.userAgent) ||
      /Chromium/.test(navigator.userAgent) ||
      /Edg/.test(navigator.userAgent); // Edge est basé sur Chromium

    // Affiche l'alerte seulement si ce n'est pas Chromium
    // Pour tester, vous pouvez forcer l'affichage en mettant: if (true) {
    if (!isChromium) {
      // Petit délai pour ne pas être trop intrusif
      const timer = setTimeout(() => {
        setShowAlert(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setShowAlert(false);
    setIsDismissed(true);
    localStorage.setItem("browser-alert-dismissed", "true");
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {showAlert && (
        <motion.div
          className="browser-alert fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto"
          style={{ cursor: "auto" }}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div 
            className="bg-zinc-900/90 backdrop-blur-sm border border-zinc-700 rounded-lg px-4 py-3 shadow-lg flex items-center gap-3 max-w-md"
            style={{ cursor: "auto" }}
          >
            <div className="flex-1">
              <p className="text-xs text-zinc-400">
                Pour une meilleure expérience, utilisez un navigateur{" "}
                <span className="font-medium text-zinc-100">
                  Chromium
                </span>
              </p>
            </div>
            <button
              onClick={handleDismiss}
              className="text-zinc-400 hover:text-zinc-300 transition-colors text-lg leading-none"
              style={{ cursor: "pointer" }}
              aria-label="Fermer"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
