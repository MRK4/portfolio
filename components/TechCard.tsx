export interface TechCardProps {
  name: string;
  description?: string;
  icon: React.ReactNode;
}

export default function TechCard({ name, description, icon }: TechCardProps) {
  return (
    <div
      className="flex flex-col items-center text-center"
      style={{
        /* surface-high card on surface-low section — no border needed */
        background: "var(--surface-highest)",
        borderRadius: "1.5rem", /* 24px — card md per spec */
        padding: "2rem", /* standard inner gutter */
      }}
    >
      <div
        className="w-12 h-12 flex items-center justify-center mb-4"
        style={{
          background: "var(--surface-high)",
          borderRadius: "0.75rem", /* min 12px */
        }}
      >
        {icon}
      </div>
      <h4
        className="text-sm font-semibold mb-1"
        style={{ color: "var(--on-surface)", fontFamily: "var(--font-manrope)" }}
      >
        {name}
      </h4>
      {description && (
        <p
          className="text-xs"
          style={{ color: "var(--on-surface-muted)", lineHeight: 1.6 }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
