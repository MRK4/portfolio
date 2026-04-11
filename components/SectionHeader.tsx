/**
 * SectionHeader — Newsreader italic for the accent word, Manrope for the rest.
 * parts: [regularText, italicAccentText]
 */

interface SectionHeaderProps {
  parts: [string, string];
  subtitle?: string;
  centered?: boolean;
  size?: "md" | "lg";
}

const sizeMap = {
  md: "text-3xl md:text-4xl",
  lg: "text-4xl md:text-5xl",
};

export default function SectionHeader({
  parts,
  subtitle,
  centered = false,
  size = "lg",
}: SectionHeaderProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      <h2
        className={`${sizeMap[size]} font-semibold leading-tight`}
        style={{
          fontFamily: "var(--font-newsreader)",
          color: "var(--on-surface)",
          letterSpacing: "-0.02em",
        }}
      >
        {parts[0]}
        <span
          className="italic text-primary"
          style={{
            fontFamily: "var(--font-newsreader)",
            fontWeight: 500,
          }}
        >
          {parts[1]}
        </span>
      </h2>
      {subtitle && (
        <p
          className="mt-3 text-base"
          style={{ color: "var(--on-surface-variant)", lineHeight: 1.6 }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
