import Link from "next/link";
import SectionHeader from "../SectionHeader";
import ProjectCard, { ProjectCardProps } from "../ProjectCard";

const projects: ProjectCardProps[] = [
  {
    title: "Aura Analytics",
    description:
      "A real-time analytics dashboard for creative studios. Aggregating performance data across channels with a cognitive interface.",
    image: "https://placehold.co/800x450/1a1c1f/c5c0ff?text=Aura+Analytics",
    tags: ["Next.js", "D3.js", "Prisma"],
    href: "#",
    featured: true,
  },
  {
    title: "Ethos Protocol",
    description:
      "Identity framework exploring journeys through canvases. Built with Figma for maximum velocity and dispatch-based architecture.",
    image: "https://placehold.co/800x450/1a1c1f/ffb95a?text=Ethos+Protocol",
    tags: ["React", "TypeScript"],
    href: "#",
    featured: true,
  },
];

export default function ProjectsSection() {
  return (
    <section style={{ background: "var(--surface-low)" }}>
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-16">
          <SectionHeader parts={["Selected ", "Artifacts"]} />
          <Link
            href="/gallery"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium transition-colors"
            style={{ color: "var(--on-surface-muted)" }}
          >
            See all projects
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Asymmetric grid — first card wider, second narrower + offset */}
        <div className="grid md:grid-cols-5 gap-6 items-start">
          <div className="md:col-span-3">
            <ProjectCard {...projects[0]} />
          </div>
          <div className="md:col-span-2 md:mt-12">
            <ProjectCard {...projects[1]} />
          </div>
        </div>
      </div>
    </section>
  );
}
