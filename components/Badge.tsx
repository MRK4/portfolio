type BadgeVariant = "primary" | "tertiary" | "neutral";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

function getStyle(variant: BadgeVariant): React.CSSProperties {
  switch (variant) {
    case "primary":
      return {
        background: "rgba(197, 192, 255, 0.1)",
        color: "var(--primary)",
      };
    case "tertiary":
      return {
        background: "rgba(255, 185, 90, 0.1)",
        color: "var(--tertiary)",
      };
    case "neutral":
      return {
        background: "var(--surface-high)",
        color: "var(--on-surface-variant)",
      };
  }
}

export default function Badge({ children, variant = "neutral", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium tracking-wide ${className}`}
      style={{
        ...getStyle(variant),
        borderRadius: "9999px", /* pill — full radius per spec */
      }}
    >
      {children}
    </span>
  );
}
