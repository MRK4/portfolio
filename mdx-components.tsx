import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import type { AnchorHTMLAttributes, HTMLAttributes } from "react";

export function useMDXComponents(): MDXComponents {
  return {
    /* ── Headings ────────────────────────────────────────────────────────── */
    h1: ({ children }) => (
      <h1
        style={{
          fontFamily: "var(--font-newsreader)",
          fontStyle: "italic",
          fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          color: "var(--on-surface)",
          marginTop: "3rem",
          marginBottom: "1.5rem",
        }}
      >
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <div style={{ marginTop: "3.5rem", marginBottom: "1rem" }}>
        {/* Amber rule — announced before each section */}
        <div
          style={{
            height: "1px",
            width: "2.5rem",
            background: "linear-gradient(to right, var(--tertiary), transparent)",
            marginBottom: "0.75rem",
          }}
        />
        <h2
          style={{
            fontFamily: "var(--font-newsreader)",
            fontSize: "1.6rem",
            fontWeight: 600,
            letterSpacing: "-0.015em",
            lineHeight: 1.2,
            color: "var(--on-surface)",
            margin: 0,
          }}
        >
          {children}
        </h2>
      </div>
    ),

    h3: ({ children }) => (
      <h3
        style={{
          fontFamily: "var(--font-manrope)",
          fontSize: "1.05rem",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--on-surface)",
          marginTop: "2.5rem",
          marginBottom: "0.75rem",
        }}
      >
        {children}
      </h3>
    ),

    /* ── Body ────────────────────────────────────────────────────────────── */
    p: ({ children }) => (
      <p
        style={{
          fontFamily: "var(--font-manrope)",
          fontSize: "1rem",
          lineHeight: 1.75,
          color: "var(--on-surface-variant)",
          marginBottom: "1.5rem",
        }}
      >
        {children}
      </p>
    ),

    blockquote: ({ children }) => (
      <blockquote
        style={{
          borderLeft: "4px solid var(--tertiary)",
          background: "rgba(255, 185, 90, 0.05)",
          padding: "1.5rem 2rem",
          borderRadius: "0 1rem 1rem 0",
          margin: "2rem 0",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-newsreader)",
            fontStyle: "italic",
            fontSize: "1.15rem",
            color: "var(--on-surface-variant)",
            lineHeight: 1.6,
          }}
        >
          {children}
        </div>
      </blockquote>
    ),

    strong: ({ children }) => (
      <strong style={{ color: "var(--tertiary)", fontWeight: 700 }}>
        {children}
      </strong>
    ),

    em: ({ children }) => (
      <em style={{ color: "var(--primary)", fontStyle: "italic" }}>
        {children}
      </em>
    ),

    /* ── Links ───────────────────────────────────────────────────────────── */
    a: ({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
      const isExternal = href?.startsWith("http");
      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          style={{
            color: "var(--primary)",
            textDecoration: "underline",
            textDecorationColor: "rgba(197, 192, 255, 0.4)",
            transition: "text-decoration-color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.textDecorationColor =
              "var(--primary)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.textDecorationColor =
              "rgba(197, 192, 255, 0.4)";
          }}
          {...props}
        >
          {children}
        </a>
      );
    },

    /* ── Code ────────────────────────────────────────────────────────────── */
    code: ({ children, ...props }: HTMLAttributes<HTMLElement>) => (
      <code
        style={{
          background: "var(--surface-high)",
          color: "var(--primary)",
          padding: "0.15em 0.4em",
          borderRadius: "0.375rem",
          fontSize: "0.875em",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        }}
        {...props}
      >
        {children}
      </code>
    ),

    pre: ({ children }) => (
      <pre
        style={{
          background: "var(--surface-low)",
          borderRadius: "1.25rem",
          padding: "1.5rem",
          overflowX: "auto",
          fontSize: "0.875rem",
          lineHeight: 1.7,
          color: "var(--on-surface-variant)",
          margin: "2rem 0",
        }}
      >
        {children}
      </pre>
    ),

    /* ── Media ───────────────────────────────────────────────────────────── */
    img: ({ alt, src, ...rest }) => (
      <Image
        width={1200}
        height={675}
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "1.5rem",
          margin: "2rem 0",
          display: "block",
        }}
        sizes="(max-width: 768px) 100vw, 800px"
        alt={alt ?? ""}
        src={(src as ImageProps["src"]) ?? ""}
        {...(rest as Partial<ImageProps>)}
      />
    ),

    /* ── Divider — centered amber gradient ───────────────────────────────── */
    hr: () => (
      <div
        style={{
          height: "1px",
          width: "100%",
          background:
            "linear-gradient(to right, transparent, var(--tertiary), transparent)",
          margin: "3rem 0",
        }}
      />
    ),

    /* ── Lists ───────────────────────────────────────────────────────────── */
    ul: ({ children }) => (
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          marginBottom: "1.5rem",
        }}
      >
        {children}
      </ul>
    ),

    ol: ({ children }) => (
      <ol
        style={{
          paddingLeft: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        {children}
      </ol>
    ),

    li: ({ children }) => (
      <li
        style={{
          display: "flex",
          gap: "0.75rem",
          fontFamily: "var(--font-manrope)",
          fontSize: "1rem",
          lineHeight: 1.75,
          color: "var(--on-surface-variant)",
          marginBottom: "0.5rem",
        }}
      >
        <span style={{ color: "var(--tertiary)", flexShrink: 0, marginTop: "0.05em" }}>·</span>
        <span>{children}</span>
      </li>
    ),

    /* ── Table ───────────────────────────────────────────────────────────── */
    table: ({ children }) => (
      <div style={{ overflowX: "auto", margin: "2rem 0" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "var(--font-manrope)",
          }}
        >
          {children}
        </table>
      </div>
    ),

    th: ({ children }) => (
      <th
        style={{
          fontFamily: "var(--font-manrope)",
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--on-surface-muted)",
          padding: "0.75rem 1rem",
          textAlign: "left",
          borderBottom: "1px solid var(--surface-high)",
        }}
      >
        {children}
      </th>
    ),

    td: ({ children }) => (
      <td
        style={{
          fontFamily: "var(--font-manrope)",
          fontSize: "0.875rem",
          color: "var(--on-surface-variant)",
          padding: "0.75rem 1rem",
          lineHeight: 1.6,
        }}
      >
        {children}
      </td>
    ),

    tr: ({ children, ...props }: HTMLAttributes<HTMLTableRowElement>) => (
      <tr
        style={{}}
        {...props}
      >
        {children}
      </tr>
    ),
  };
}
