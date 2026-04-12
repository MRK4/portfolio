import Image from "next/image";
import type { ProjectMeta } from "@/lib/projects";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import StatusPill from "@/components/gallery/StatusPill";

/* ── External link icon ─────────────────────────────────────────────────── */
function ExternalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M2 10L10 2M10 2H5M10 2v5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Stat item ──────────────────────────────────────────────────────────── */
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
      <span
        style={{
          fontFamily: "var(--font-newsreader)",
          fontStyle: "italic",
          fontSize: "1.75rem",
          fontWeight: 600,
          lineHeight: 1,
          color: "var(--primary)",
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: "var(--font-manrope)",
          fontSize: "0.68rem",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--on-surface-muted)",
          lineHeight: 1.4,
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ── Sidebar card ───────────────────────────────────────────────────────── */
function SidebarCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "var(--surface-low)",
        borderRadius: "1.5rem",
        padding: "1.5rem",
      }}
    >
      {children}
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────────────────── */
export default function ProjectArticle({
  project,
  children,
}: {
  project: ProjectMeta;
  children: React.ReactNode;
}) {
  const { title, subtitle, category, year, coverGradient, coverImage, stats, tags, status, links } = project;
  const bannerSrc = coverImage ?? "/background.webp";
  const hasLinks = links && Object.values(links).some(Boolean);

  return (
    <>
      <Navbar />

      {/*
       * Parallax structure:
       *   [hero]    sticky top-0  z-0  — reste ancré pendant le scroll
       *   [content] relative      z-1  — remonte par-dessus le hero
       *
       * Le fond solide du content masque progressivement la bannière.
       */}
      <main style={{ background: "var(--surface)" }}>

        {/* ── Band 1: Hero — sticky ─────────────────────────────────── */}
        <div className="sticky top-0 w-full overflow-hidden" style={{ height: "70vh", zIndex: 0 }}>
        <section
          className="relative w-full h-full"
        >
          {/* Banner image */}
          <Image
            src={bannerSrc}
            alt=""
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />

          {/* Dark base — lisibilité sur toute image */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(17, 19, 22, 0.58)" }}
          />

          {/* Teinte couleur du projet */}
          <div
            className="absolute inset-0"
            style={{ background: coverGradient, opacity: 0.5 }}
          />

          {/* Halos ambiance */}
          <div
            className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, rgba(108,102,196,0.22) 0%, transparent 65%)",
            }}
          />
          <div
            className="absolute -bottom-16 -left-16 w-[380px] h-[380px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, rgba(255,185,90,0.08) 0%, transparent 65%)",
            }}
          />

          {/* Contenu ancré en bas */}
          <div className="relative h-full max-w-6xl mx-auto px-6 pt-24 pb-14 flex flex-col justify-end">
            <p
              className="mb-4 text-xs tracking-widest uppercase"
              style={{ color: "var(--tertiary)", fontFamily: "var(--font-manrope)" }}
            >
              {category} · {year}
            </p>

            <h1
              className="mb-3 leading-none"
              style={{
                fontFamily: "var(--font-newsreader)",
                fontStyle: "italic",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--on-surface)",
                maxWidth: "20ch",
              }}
            >
              {title}
            </h1>

            {subtitle && (
              <p
                className="mb-6 max-w-xl"
                style={{
                  fontFamily: "var(--font-manrope)",
                  fontSize: "1.1rem",
                  lineHeight: 1.6,
                  color: "var(--on-surface-variant)",
                }}
              >
                {subtitle}
              </p>
            )}

            <div
              className="h-px w-24"
              style={{
                background: "linear-gradient(to right, var(--tertiary), transparent)",
              }}
            />
          </div>
        </section>
        </div>

        {/* ── Band 2 + 3: Contenu — remonte sur le hero ────────────── */}
        <div
          className="relative"
          style={{
            zIndex: 1,
            background: "var(--surface)",
            borderRadius: "2rem 2rem 0 0",
            marginTop: "-2.5rem",
          }}
        >
          {/* Article + Sidebar */}
          <section className="max-w-6xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16 items-start">
              {/* Gauche — corps MDX */}
              <article className="min-w-0">{children}</article>

              {/* Droite — sidebar sticky */}
              <aside className="flex flex-col gap-5 lg:sticky lg:top-20">
                {/* Status + Tags */}
                <SidebarCard>
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <StatusPill status={status} />
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="neutral">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </SidebarCard>

                {/* Stats */}
                {stats.length > 0 && (
                  <SidebarCard>
                    <p
                      className="mb-4 text-xs tracking-widest uppercase"
                      style={{
                        fontFamily: "var(--font-manrope)",
                        color: "var(--on-surface-muted)",
                      }}
                    >
                      By the numbers
                    </p>
                    <div className="grid grid-cols-2 gap-5">
                      {stats.map((s) => (
                        <Stat key={s.label} label={s.label} value={s.value} />
                      ))}
                    </div>
                  </SidebarCard>
                )}

                {/* Links */}
                {hasLinks && (
                  <SidebarCard>
                    <p
                      className="mb-4 text-xs tracking-widest uppercase"
                      style={{
                        fontFamily: "var(--font-manrope)",
                        color: "var(--on-surface-muted)",
                      }}
                    >
                      Links
                    </p>
                    <div className="flex flex-col gap-2">
                      {links?.live && (
                        <Button href={links.live} variant="primary" size="sm" external>
                          Live site <ExternalIcon />
                        </Button>
                      )}
                      {links?.github && (
                        <Button href={links.github} variant="ghost" size="sm" external>
                          Source code <ExternalIcon />
                        </Button>
                      )}
                      {links?.demo && (
                        <Button href={links.demo} variant="ghost" size="sm" external>
                          Demo <ExternalIcon />
                        </Button>
                      )}
                    </div>
                  </SidebarCard>
                )}
              </aside>
            </div>
          </section>

          {/* Retour à la galerie */}
          <section className="max-w-6xl mx-auto px-6 pb-20">
            <div
              className="h-px w-full mb-12"
              style={{
                background:
                  "linear-gradient(to right, transparent, var(--surface-high), transparent)",
              }}
            />
            <Button href="/gallery" variant="ghost" size="md">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M11 7H3M6 4L3 7l3 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to the Archive
            </Button>
          </section>

          <Footer />
        </div>

      </main>
    </>
  );
}
