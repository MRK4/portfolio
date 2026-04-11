import SectionHeader from "../SectionHeader";
import TechCard, { TechCardProps } from "../TechCard";

const techStack: TechCardProps[] = [
  {
    name: "React & Next.js",
    description: "App Router, RSC, streaming SSR, performance optimization",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="2.5" fill="#c5c0ff" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#c5c0ff" strokeWidth="1.5" fill="none" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#c5c0ff" strokeWidth="1.5" fill="none" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#c5c0ff" strokeWidth="1.5" fill="none" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    name: "UI System",
    description: "Scalable design systems, Radix UI, accessibility, responsive design",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16M4 10h16M4 14h12M4 18h8" stroke="#c5c0ff" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Data Layer",
    description: "Prisma, clean schema design, efficient queries",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 3L3 9l9 3 9-3-9-6z" stroke="#ffb95a" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M3 9v6l9 6 9-6V9" stroke="#ffb95a" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Type Safety",
    description: "Strict TypeScript, Zod, runtime validation, reliable DX",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="#6c66c4" opacity="0.3" />
        <path d="M7 15v-1.5c0-1.1.9-2 2-2h2m0 0v-2m0 2H13m4-2v6M17 9h-3v2h2.5" stroke="#c5c0ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function TechSection() {
  return (
    <section style={{ background: "var(--surface)" }}>
      <div className="max-w-6xl mx-auto px-6 py-24">
        <SectionHeader
          parts={["Technical ", "Instruments"]}
          subtitle="The tools I use to bring vision into reality"
          centered
        />
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {techStack.map((tech) => (
            <TechCard key={tech.name} {...tech} />
          ))}
        </div>
      </div>
    </section>
  );
}
