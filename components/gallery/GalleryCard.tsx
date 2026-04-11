import Link from "next/link";
import StatusPill, { Status } from "./StatusPill";

export type Category = "Open Source" | "Client Work" | "Experiments";

export interface GalleryProject {
  title: string;
  description: string;
  gradient: string;
  category: Category;
  year: string;
  status: Status;
  href: string;
}

export default function GalleryCard({ project }: { project: GalleryProject }) {
  return (
    <Link
      href={project.href}
      className="group block break-inside-avoid mb-6 overflow-hidden transition-transform duration-300 hover:-translate-y-1"
      style={{
        background: "var(--surface-high)",
        borderRadius: "2rem",
      }}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <div
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
          style={{ background: project.gradient }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent 40%, rgba(40,42,45,0.95) 100%)",
          }}
        />
        {/* Status — top right */}
        <div className="absolute top-4 right-4">
          <StatusPill status={project.status} />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-5 pb-6">
        <h3
          className="text-lg font-semibold mb-2 leading-snug"
          style={{ fontFamily: "var(--font-manrope)", color: "var(--on-surface)" }}
        >
          {project.title}
        </h3>
        <p
          className="text-sm mb-4"
          style={{ color: "var(--on-surface-variant)", lineHeight: 1.6 }}
        >
          {project.description}
        </p>

        {/* Meta row — arrow appears on hover */}
        <div className="flex items-center justify-between">
          <p
            className="text-xs tracking-widest uppercase"
            style={{ color: "var(--on-surface-muted)" }}
          >
            {project.category} · {project.year}
          </p>
          <svg
            className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            style={{ color: "var(--on-surface-muted)", flexShrink: 0 }}
          >
            <path
              d="M2 7h10M8 4l3 3-3 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
