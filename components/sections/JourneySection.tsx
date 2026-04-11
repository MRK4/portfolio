const journeyEntries = [
  { company: "Adventiel", role: "Fullstack Developer", period: "2023 — Present" },
  { company: "Webtale", role: "Freelance Developer", period: "2022 — 2023" },
  { company: "MDF", role: "Wordpress Developer Internship", period: "2021 — 2022" },
  { company: "Fireservice", role: "Web Developer Internship", period: "2020" }
];

export default function JourneySection() {
  return (
    <section style={{ background: "var(--surface-low)" }}>
      <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16">

        {/* Journey */}
        <div>
          <h2
            className="text-5xl text-on-surface md:text-6xlmb-6 font-semibold leading-tight"
            style={{
              fontFamily: "var(--font-newsreader)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            The
            <span
            className="italic font-medium text-primary"
              style={{
                fontFamily: "var(--font-newsreader)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              {" "}Journey
            </span>
          </h2>
          <p
            className="text-sm mb-10"
            style={{ color: "var(--on-surface-variant)", lineHeight: 1.6 }}
          >
            My path began in the quiet corners of traditional design, where I learned the
            weight of space. Today I translate that tactile sensibility into modern codebases.
          </p>

          <div className="flex flex-col gap-6">
            {journeyEntries.map((entry, i) => (
              <div key={i} className="flex items-start gap-4">
                <div
                  className="mt-2 w-2 h-2 rounded-full shrink-0"
                  style={{ background: "var(--tertiary)" }}
                />
                <div>
                  <label
                    className="font-bold"
                    style={{ color: "var(--on-surface)", fontFamily: "var(--font-manrope)" }}
                  >
                    {entry.company}
                  </label>
                  <h3
                    className="text-xs mt-0.5"
                    style={{ color: "var(--on-surface-muted)", fontFamily: "var(--font-manrope)" }}
                  >
                    {entry.role} · {entry.period}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy */}
        <div>
          <h3
            className="text-xl font-semibold mb-6"
            style={{ color: "var(--on-surface)", fontFamily: "var(--font-manrope)" }}
          >
            Philosophy
          </h3>

          {/* Code editor — surface-high card inside surface-low section */}
          {/* TODO: Allow the user to write inside the code editor */}
          <div
            className="overflow-hidden mb-6 rounded-2xl"
            style={{
              background: "var(--surface-high)"
            }}
          >
            <div
              className="flex items-center justify-between p-4"
              style={{ background: "var(--surface-highest)" }}
            >
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f56" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#27c93f" }} />
              </div>
              <span className="italic text-sm text-on-surface-muted">Try me now!</span>
            </div>
            <div
              className="p-5 font-mono text-xs leading-6"
              style={{ color: "#8b949e" }}
            >
              <span style={{ color: "#c5c0ff" }}>const</span>{" "}
              <span style={{ color: "#ffb95a" }}>craft</span>{" "}
              <span style={{ color: "#c5c0ff" }}>=</span>{" "}
              <span style={{ color: "#e4e0f0" }}>(vision): Artifact =&gt; {"{"}</span>
              <br />
              {"  "}<span style={{ color: "#c5c0ff" }}>return</span>{" "}
              <span style={{ color: "#ffb95a" }}>merge</span>
              <span style={{ color: "#e4e0f0" }}>(</span>
              <br />
              {"    "}<span style={{ color: "#c5c0ff" }}>aesthetics</span><span style={{ color: "#e4e0f0" }}>,</span>
              <br />
              {"    "}<span style={{ color: "#c5c0ff" }}>precision</span><span style={{ color: "#e4e0f0" }}>,</span>
              <br />
              {"    "}<span style={{ color: "#c5c0ff" }}>soul</span>
              <br />
              {"  "}<span style={{ color: "#e4e0f0" }}>{")"}</span>
              <br />
              <span style={{ color: "#e4e0f0" }}>{"}"}</span>
            </div>
          </div>

          <blockquote
            className="pl-4 italic text-base leading-relaxed"
            style={{
              fontFamily: "var(--font-newsreader)",
              color: "var(--on-surface-variant)",
              borderLeft: `2px solid var(--primary)`,
            }}
          >
            "The best interfaces fail those who use them wisely."
          </blockquote>
        </div>
      </div>
    </section>
  );
}
