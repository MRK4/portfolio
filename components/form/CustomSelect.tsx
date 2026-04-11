"use client";

import { useState, useRef, useEffect, useId } from "react";
import { AnimatePresence, motion } from "motion/react";

interface CustomSelectProps {
  id: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function CustomSelect({ id, options, value, onChange }: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState<number>(options.indexOf(value));
  const containerRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  /* Close on outside click */
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  /* Keyboard navigation */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (open) {
        onChange(options[highlighted]);
        setOpen(false);
      } else {
        setOpen(true);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = (highlighted + 1) % options.length;
      setHighlighted(next);
      if (!open) setOpen(true);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (highlighted - 1 + options.length) % options.length;
      setHighlighted(prev);
      if (!open) setOpen(true);
    }
  };

  const select = (option: string) => {
    onChange(option);
    setHighlighted(options.indexOf(option));
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onKeyDown={handleKeyDown}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full text-left"
        style={{
          background: "var(--surface-low)",
          color: value ? "var(--on-surface)" : "var(--on-surface-muted)",
          borderRadius: "1rem",
          border: open ? "1px solid var(--primary)" : "1px solid transparent",
          boxShadow: open ? "0 0 0 4px rgba(197,192,255,0.12)" : "none",
          outline: "none",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          fontFamily: "var(--font-manrope)",
          fontSize: "0.9rem",
          padding: "0.75rem 1rem",
          cursor: "pointer",
        }}
      >
        <span>{value || "Select…"}</span>
        {/* Chevron — rotates when open */}
        <motion.svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          style={{ color: "var(--on-surface-muted)", flexShrink: 0 }}
        >
          <path
            d="M3 5l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            role="listbox"
            aria-label="Options"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-50 w-full mt-2 overflow-hidden"
            style={{
              background: "var(--surface-highest)",
              borderRadius: "1rem",
              boxShadow: "0px 20px 40px rgba(0,0,0,0.4)",
              padding: "0.4rem",
            }}
          >
            {options.map((option, i) => {
              const isSelected    = option === value;
              const isHighlighted = i === highlighted;
              return (
                <li
                  key={option}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setHighlighted(i)}
                  onMouseDown={(e) => { e.preventDefault(); select(option); }}
                  className="flex items-center justify-between gap-3 px-3 py-2.5 cursor-pointer"
                  style={{
                    borderRadius: "0.625rem",
                    background: isHighlighted ? "var(--surface-low)" : "transparent",
                    color: isSelected
                      ? "var(--primary)"
                      : isHighlighted
                      ? "var(--on-surface)"
                      : "var(--on-surface-variant)",
                    fontFamily: "var(--font-manrope)",
                    fontSize: "0.875rem",
                    transition: "background 0.12s ease, color 0.12s ease",
                  }}
                >
                  <span>{option}</span>
                  {isSelected && (
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path
                        d="M2 7l3.5 3.5L11 3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
