import { useState } from "react";

// ── Field wrapper ──────────────────────────────────────────────────────────────

interface FieldProps {
  label: string;
  id: string;
  required?: boolean;
  children: React.ReactNode;
}

export default function Field({ label, id, required, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-xs font-semibold tracking-widest uppercase"
        style={{ color: "var(--on-surface-muted)" }}
      >
        {label}
        {required && (
          <span style={{ color: "var(--tertiary)", marginLeft: "0.25rem" }}>*</span>
        )}
      </label>
      {children}
    </div>
  );
}

// ── Shared input utilities ─────────────────────────────────────────────────────

export function useInputFocus() {
  const [focused, setFocused] = useState(false);
  return {
    focused,
    onFocus: () => setFocused(true),
    onBlur:  () => setFocused(false),
  };
}

export function inputStyle(focused: boolean): React.CSSProperties {
  return {
    background: "var(--surface-low)",
    color: "var(--on-surface)",
    borderRadius: "1rem",
    border: focused ? "1px solid var(--primary)" : "1px solid transparent",
    boxShadow: focused ? "0 0 0 4px rgba(197,192,255,0.12)" : "none",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    fontFamily: "var(--font-manrope)",
    fontSize: "0.9rem",
    lineHeight: 1.6,
    width: "100%",
    padding: "0.75rem 1rem",
  };
}
