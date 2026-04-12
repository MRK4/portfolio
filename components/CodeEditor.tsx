"use client";

import { useState, useEffect, useRef, CSSProperties } from "react";

// ── Target code ────────────────────────────────────────────────────────────────

const TARGET_CODE = `const craft = (vision): Artifact => {
  return merge(
    aesthetics,
    precision,
    soul
  )
}`;

// ── Shared style (must be identical on highlight div + textarea) ───────────────

const SHARED_STYLE: CSSProperties = {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  fontSize: "0.75rem",
  lineHeight: "1.5rem",
  padding: "1.25rem",
  margin: 0,
  width: "100%",
  minHeight: "120px",
  whiteSpace: "pre",
  overflowWrap: "break-word",
  tabSize: 2,
  display: "block",
};

// ── Tokenizer ─────────────────────────────────────────────────────────────────

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const TOKEN_RULES: Array<{ pattern: RegExp; color: string }> = [
  // 1. Line comments
  { pattern: /\/\/[^\n]*/g, color: "#8b949e" },
  // 2. String literals
  { pattern: /`[^`]*`|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g, color: "#a8ff78" },
  // 3. Keywords & operators
  { pattern: /\b(const|let|var|return|function|if|else|for|while|do|new|delete|typeof|instanceof|void|in|of|class|extends|import|export|default|from|async|await|yield|try|catch|finally|throw|switch|case|break|continue|=>)\b/g, color: "#c5c0ff" },
  // 4. Type annotations (PascalCase identifiers after ": ")
  { pattern: /(?<=:\s*)[A-Z][A-Za-z0-9]*/g, color: "#c5c0ff" },
  // 5. Function call names
  { pattern: /\b([a-z_$][a-zA-Z0-9_$]*)(?=\s*\()/g, color: "#ffb95a" },
  // 6. Numbers
  { pattern: /\b\d+(\.\d+)?\b/g, color: "#79c0ff" },
];

function tokenize(code: string): string {
  const escaped = escapeHtml(code);

  const spans: Array<{ start: number; end: number; color: string }> = [];

  for (const { pattern, color } of TOKEN_RULES) {
    pattern.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = pattern.exec(escaped)) !== null) {
      spans.push({ start: m.index, end: m.index + m[0].length, color });
    }
  }

  spans.sort((a, b) => a.start - b.start);

  let result = "";
  let cursor = 0;

  for (const span of spans) {
    if (span.start < cursor) continue; // skip overlapping lower-priority match
    if (span.start > cursor) {
      result += escaped.slice(cursor, span.start);
    }
    result += `<span style="color:${span.color}">${escaped.slice(span.start, span.end)}</span>`;
    cursor = span.end;
  }

  result += escaped.slice(cursor);
  return result;
}

// ── Component ─────────────────────────────────────────────────────────────────

type Phase = "typing" | "idle" | "editing";

export default function CodeEditor() {
  const [phase, setPhase] = useState<Phase>("typing");
  const [charCount, setCharCount] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  // Trigger animation when scrolled into view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasBeenVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Typewriter animation
  useEffect(() => {
    if (!hasBeenVisible || phase !== "typing") return;
    if (charCount >= TARGET_CODE.length) {
      setPhase("idle");
      return;
    }
    const id = setInterval(() => {
      setCharCount((n) => {
        if (n >= TARGET_CODE.length) {
          clearInterval(id);
          setPhase("idle");
          return n;
        }
        return n + 1;
      });
    }, 28);
    return () => clearInterval(id);
  }, [hasBeenVisible, phase, charCount]);

  // Switch to idle once typing completes
  useEffect(() => {
    if (phase !== "idle") return;
    setUserInput(TARGET_CODE);
  }, [phase]);

  function resetToTyping() {
    setCharCount(0);
    setUserInput("");
    setPhase("typing");
  }

  function syncScroll() {
    if (textareaRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }

  const currentCode =
    phase === "typing"
      ? TARGET_CODE.slice(0, charCount)
      : phase === "idle"
      ? TARGET_CODE
      : userInput;

  return (
    <>
    <div
      ref={containerRef}
      className="overflow-hidden mb-6 rounded-2xl"
      style={{ background: "var(--surface-high)" }}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between p-4"
        style={{ background: "var(--surface-highest)" }}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f56" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#27c93f" }} />
        </div>

        {phase === "editing" ? (
          <button
            onClick={resetToTyping}
            className="italic text-xs transition-opacity hover:opacity-70"
            style={{
              color: "var(--on-surface-muted)",
              cursor: "pointer",
              background: "none",
              border: "none",
              padding: 0,
              fontFamily: "inherit",
            }}
          >
            reset
          </button>
        ) : (
          <span
            className="italic text-sm"
            style={{ color: "var(--on-surface-muted)" }}
          >
            craft.ts
          </span>
        )}
      </div>

      {/* Code body */}
      {phase === "editing" ? (
        // Textarea overlay editor
        <div style={{ position: "relative", color: "#8b949e" }}>
          {/* Highlight layer */}
          <div
            ref={highlightRef}
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: tokenize(userInput) + "<br />" }}
            style={{
              ...SHARED_STYLE,
              color: "#8b949e",
              overflow: "hidden",
              position: "relative",
            }}
          />
          {/* Input layer */}
          <textarea
            ref={textareaRef}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onScroll={syncScroll}
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
            style={{
              ...SHARED_STYLE,
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              color: "transparent",
              caretColor: "#e4e0f0",
              WebkitTextFillColor: "transparent",
              background: "transparent",
              resize: "none",
              overflow: "auto",
              border: "none",
            }}
          />
        </div>
      ) : (
        // Static / animated display
        <div
          className="p-5 font-mono text-xs leading-6"
          style={{
            color: "#8b949e",
            whiteSpace: "pre",
            cursor: phase === "idle" ? "text" : "default",
          }}
          onClick={() => {
            if (phase === "idle") setPhase("editing");
          }}
        >
          <span dangerouslySetInnerHTML={{ __html: tokenize(currentCode) }} />
          {phase === "typing" && (
            <span
              style={{
                color: "#c5c0ff",
                animation: "blink 1s step-end infinite",
                userSelect: "none",
              }}
            >
              |
            </span>
          )}
        </div>
      )}
    </div>
    </>
  );
}
