import Link from "next/link";

export default function CTASection() {
  return (
    <>
      <style>{`
        @keyframes cta-glow-violet {
          0%, 100% { opacity: 1; transform: translate(-60%, -50%) scale(1); }
          50%       { opacity: 1.4; transform: translate(-60%, -50%) scale(1.12); }
        }
        @keyframes cta-glow-amber {
          0%, 100% { opacity: 1; transform: translate(-40%, -50%) scale(1); }
          50%       { opacity: 1.4; transform: translate(-40%, -50%) scale(1.1); }
        }
        @keyframes cta-fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cta-section .cta-violet {
          animation: cta-glow-violet 7s ease-in-out infinite;
        }
        .cta-section .cta-amber {
          animation: cta-glow-amber 9s ease-in-out infinite reverse;
        }
        .cta-section .cta-body {
          animation: cta-fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 0.1s;
        }
        .cta-link .cta-arrow {
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cta-link:hover .cta-arrow {
          transform: translateX(6px);
        }
      `}</style>

      <section
        className="cta-section relative py-32 text-center overflow-hidden"
        style={{ background: "var(--surface)" }}
      >
        {/* Violet ambient glow — left */}
        <div
          className="cta-violet absolute top-1/2 left-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
          style={{
            transform: "translate(-60%, -50%)",
            background:
              "radial-gradient(ellipse, rgba(197,192,255,0.08) 0%, transparent 68%)",
          }}
        />

        {/* Amber ambient glow — right */}
        <div
          className="cta-amber absolute top-1/2 left-1/2 w-[500px] h-[360px] rounded-full pointer-events-none"
          style={{
            transform: "translate(-40%, -50%)",
            background:
              "radial-gradient(ellipse, rgba(255,185,90,0.07) 0%, transparent 68%)",
          }}
        />

        <div className="cta-body relative max-w-2xl mx-auto px-6">
          {/* Status pill */}
          <span
            className="inline-flex items-center gap-2 text-xs font-medium px-4 py-1.5 rounded-full mb-8"
            style={{
              background: "rgba(255,185,90,0.1)",
              color: "var(--tertiary)",
              border: "1px solid rgba(255,185,90,0.15)",
            }}
          >
            <span className="relative inline-flex w-2 h-2 shrink-0">
              <span
                className="absolute inset-0 rounded-full animate-ping"
                style={{ background: "var(--tertiary)", opacity: 0.6 }}
              />
              <span
                className="relative w-2 h-2 rounded-full"
                style={{
                  background: "var(--tertiary)",
                  boxShadow: "0 0 8px var(--tertiary)",
                }}
              />
            </span>
            Open to opportunities
          </span>

          <h2
            className="text-4xl md:text-5xl font-semibold leading-tight mb-5"
            style={{
              fontFamily: "var(--font-newsreader)",
              color: "var(--on-surface)",
              letterSpacing: "-0.02em",
            }}
          >
            Got a{" "}
            <em style={{ fontStyle: "italic", color: "var(--primary)" }}>
              project or a role
            </em>{" "}
            in mind?
          </h2>

          <p
            className="text-base mb-10 max-w-md mx-auto"
            style={{ color: "var(--on-surface-variant)", lineHeight: 1.7 }}
          >
            I&apos;m open to full-time roles, freelance missions, and side
            project collaborations. If something resonates, just say hello.
          </p>

          <Link
            href="/contact"
            className="cta-link group inline-flex items-center gap-3 font-semibold text-base px-7 py-3.5 transition-all active:scale-[0.97]"
            style={{
              background:
                "linear-gradient(135deg, var(--tertiary) 0%, var(--tertiary-container) 100%)",
              color: "#fff",
              borderRadius: "1rem",
              boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.4)",
            }}
          >
            Let&apos;s talk
            <svg
              className="cta-arrow"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
