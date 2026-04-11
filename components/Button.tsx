import Link from "next/link";

type ButtonVariant = "primary" | "tertiary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

function getVariantStyle(variant: ButtonVariant): React.CSSProperties {
  switch (variant) {
    case "primary":
      return {
        background: "var(--primary-container)",
        color: "var(--on-primary)",
        /* 16px radius per spec */
        borderRadius: "1rem",
      };
    case "tertiary":
      /* Subtle amber gradient for "artisan" sections */
      return {
        background:
          "linear-gradient(135deg, var(--tertiary) 0%, var(--tertiary-container) 100%)",
        color: "#fff",
        borderRadius: "1rem",
      };
    case "ghost":
      return {
        background: "transparent",
        color: "var(--on-surface-variant)",
        borderRadius: "1rem",
        /* Ghost border fallback for contrast */
        border: "1px solid var(--outline-variant)",
      };
  }
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  external,
  onClick,
  className = "",
  type = "button",
  disabled,
}: ButtonProps) {
  const baseClass = `group inline-flex items-center gap-2 font-semibold transition-all hover:opacity-90 active:scale-[0.97] cursor-pointer disabled:opacity-40 ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={baseClass}
        style={getVariantStyle(variant)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClass}
      style={getVariantStyle(variant)}
    >
      {children}
    </button>
  );
}
