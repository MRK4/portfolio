import Button from "../Button";

export default function CTASection() {
  return (
    <section
      className="relative py-28 text-center"
      style={{ background: "var(--surface)" }}
    >
      {/* Ambient amber glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(255,185,90,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-2xl mx-auto px-6">
        <h2
          className="text-4xl md:text-5xl font-semibold leading-tight mb-5"
          style={{
            fontFamily: "var(--font-newsreader)",
            color: "var(--on-surface)",
            letterSpacing: "-0.02em",
          }}
        >
          Ready to start a{" "}
          <span className="font-medium" style={{ fontStyle: "italic", color: "var(--primary)" }}>new chapter?</span>
        </h2>
        <p
          className="text-sm mb-10"
          style={{ color: "var(--on-surface-variant)", lineHeight: 1.6 }}
        >
          I&apos;m currently accepting selective inquiries for late 2026 projects.
        </p>

        <Button href="mailto:julian@theitler.dev" variant="tertiary" size="lg" external>
          julian@theitler.dev
        </Button>
      </div>
    </section>
  );
}
