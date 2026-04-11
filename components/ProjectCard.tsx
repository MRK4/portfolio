import Image from "next/image";
import Link from "next/link";
import Badge from "./Badge";

export interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  gradient?: string;
  tags?: string[];
  href?: string;
  featured?: boolean;
}

export default function ProjectCard({
  title,
  description,
  image,
  gradient = "linear-gradient(135deg, #1a1c1f 0%, #282a2d 100%)",
  tags = [],
  href = "#",
  featured = false,
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden transition-transform hover:-translate-y-1"
      style={{
        /* surface-container-high on surface base — no border needed */
        background: "var(--surface-high)",
        borderRadius: "2rem", /* 32px — card lg per spec */
        boxShadow: "none", /* no drop shadows — rely on tonal layering */
      }}
    >
      {/* Thumbnail */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: featured ? "16/9" : "4/3" }}
      >
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
            style={{ background: gradient }}
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent 40%, rgba(40,42,45,0.9) 100%)",
          }}
        />
      </div>

      {/* Content — 2rem padding per spec */}
      <div className="p-8">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.map((tag) => (
              <Badge key={tag} variant="neutral">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <h3
          className="text-lg font-semibold mb-2 leading-snug"
          style={{
            fontFamily: "var(--font-manrope)",
            color: "var(--on-surface)",
          }}
        >
          {title}
        </h3>
        <p
          className="text-sm"
          style={{ color: "var(--on-surface-variant)", lineHeight: 1.6 }}
        >
          {description}
        </p>
        <span
          className="inline-flex items-center gap-1.5 mt-5 text-xs font-semibold transition-colors"
          style={{ color: "var(--tertiary)" }}
        >
          View Project
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6h7M6.5 3l3 3-3 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
