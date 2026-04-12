import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryClient from "@/components/gallery/GalleryClient";
import { getAllProjects } from "@/lib/projects";

export default function GalleryPage() {
  const projects = getAllProjects();

  return (
    <>
      <Navbar />

      <main style={{ background: "var(--surface)" }}>
        {/* ── Hero header ── */}
        <section className="max-w-6xl mx-auto px-6 pt-36 pb-16">
          <p
            className="text-xs tracking-widest uppercase mb-5"
            style={{ color: "var(--tertiary)" }}
          >
            The Archive
          </p>
          <h1
            className="mb-6 leading-none"
            style={{
              fontFamily: "var(--font-newsreader)",
              fontStyle: "italic",
              fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
              letterSpacing: "-0.02em",
              color: "var(--on-surface)",
              maxWidth: "14ch",
            }}
          >
            The Vault of
            <br />
            Past&nbsp;Narratives.
          </h1>
          <p
            className="max-w-xl text-base"
            style={{ color: "var(--on-surface-variant)", lineHeight: 1.65 }}
          >
            A chronological journey through logic and aesthetics. Each entry
            represents a milestone in technical exploration and visual
            storytelling.
          </p>
          <div
            className="mt-10 h-px w-24"
            style={{
              background: "linear-gradient(to right, var(--tertiary), transparent)",
            }}
          />
        </section>

        <GalleryClient projects={projects} />

      </main>

      <Footer />
    </>
  );
}
