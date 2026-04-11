"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Field, { useInputFocus, inputStyle } from "@/components/form/Field";
import CustomSelect from "@/components/form/CustomSelect";

// ── Types ──────────────────────────────────────────────────────────────────────

type FormState = "idle" | "sending" | "sent" | "error";

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const SUBJECTS = [
  "Project Inquiry",
  "Open Source Collaboration",
  "Freelance Mission",
  "Just saying hello",
];

// ── Page ───────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    subject: SUBJECTS[0],
    message: "",
  });
  const [formState, setFormState] = useState<FormState>("idle");

  const nameFocus  = useInputFocus();
  const emailFocus = useInputFocus();
  const msgFocus   = useInputFocus();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    /* Simulated async send — replace with your actual API call */
    await new Promise((res) => setTimeout(res, 1200));
    setFormState("sent");
  };

  return (
    <>
      <Navbar />

      <main
        className="relative min-h-screen overflow-hidden"
        style={{ background: "var(--surface)" }}
      >
        {/* ── Ambient halos ── */}
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(108,102,196,0.14) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-0 -left-40 w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(255,185,90,0.06) 0%, transparent 65%)",
          }}
        />

        <div className="max-w-6xl mx-auto px-6 pt-36 pb-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-start">

            {/* Left — editorial text */}
            <div className="md:sticky md:top-32">
              <p
                className="text-xs tracking-widest uppercase mb-5"
                style={{ color: "var(--tertiary)" }}
              >
                Get in touch
              </p>

              <h1
                className="leading-none mb-6"
                style={{
                  fontFamily: "var(--font-newsreader)",
                  fontStyle: "italic",
                  fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
                  letterSpacing: "-0.02em",
                  color: "var(--on-surface)",
                }}
              >
                Let&apos;s write
                <br />
                the next{" "}
                <span style={{ color: "var(--primary)" }}>chapter</span>
                <br />
                together.
              </h1>

              <p
                className="text-base max-w-xs"
                style={{ color: "var(--on-surface-variant)", lineHeight: 1.65 }}
              >
                Whether it&apos;s a new project, a collaboration, or simply a
                conversation — the atelier is open. Fill in the form and I will
                get back to you.
              </p>

              <div
                className="mt-10 h-px w-24"
                style={{
                  background: "linear-gradient(to right, var(--tertiary), transparent)",
                }}
              />
            </div>

            {/* Right — form card */}
            <div
              className="p-8 md:p-10"
              style={{ background: "var(--surface-high)", borderRadius: "2rem" }}
            >
              {formState === "sent" ? (
                /* ── Success state ── */
                <div className="flex flex-col items-center justify-center text-center py-12 gap-6">
                  <motion.div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.05 }}
                    style={{
                      background: "rgba(197,192,255,0.1)",
                      boxShadow: "0 0 32px rgba(197,192,255,0.2)",
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <motion.path
                        d="M5 13l4 4L19 7"
                        stroke="var(--primary)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.45, delay: 0.3, ease: "easeOut" }}
                      />
                    </svg>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.45, ease: "easeOut" }}
                  >
                    <h2
                      className="text-2xl mb-3"
                      style={{
                        fontFamily: "var(--font-newsreader)",
                        fontStyle: "italic",
                        color: "var(--on-surface)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Message received.
                    </h2>
                    <p
                      className="text-sm"
                      style={{ color: "var(--on-surface-variant)", lineHeight: 1.6 }}
                    >
                      I&apos;ll be back in touch soon. In the meantime, feel free
                      to explore the{" "}
                      <a href="/gallery" style={{ color: "var(--primary)" }}>
                        gallery
                      </a>
                      .
                    </p>
                  </motion.div>
                  <button
                    onClick={() => {
                      setFormState("idle");
                      setValues({ name: "", email: "", subject: SUBJECTS[0], message: "" });
                    }}
                    className="text-xs tracking-widest uppercase transition-colors"
                    style={{ color: "var(--on-surface-muted)", cursor: "pointer" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--tertiary)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--on-surface-muted)")}
                  >
                    Send another
                  </button>
                </div>
              ) : (
                /* ── Form ── */
                <form onSubmit={handleSubmit} className="flex flex-col gap-7" noValidate>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Name" id="name" required>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        required
                        value={values.name}
                        onChange={handleChange}
                        onFocus={nameFocus.onFocus}
                        onBlur={nameFocus.onBlur}
                        style={inputStyle(nameFocus.focused)}
                      />
                    </Field>

                    <Field label="Email" id="email" required>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        required
                        value={values.email}
                        onChange={handleChange}
                        onFocus={emailFocus.onFocus}
                        onBlur={emailFocus.onBlur}
                        style={inputStyle(emailFocus.focused)}
                      />
                    </Field>
                  </div>

                  <Field label="Subject" id="subject">
                    <CustomSelect
                      id="subject"
                      options={SUBJECTS}
                      value={values.subject}
                      onChange={(val) => setValues((prev) => ({ ...prev, subject: val }))}
                    />
                  </Field>

                  <Field label="Message" id="message" required>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="Tell me about your project, your vision, or whatever's on your mind…"
                      required
                      value={values.message}
                      onChange={handleChange}
                      onFocus={msgFocus.onFocus}
                      onBlur={msgFocus.onBlur}
                      style={{
                        ...inputStyle(msgFocus.focused),
                        resize: "vertical",
                        minHeight: "9rem",
                      }}
                    />
                  </Field>

                  <div className="flex items-center justify-between gap-4 pt-1">
                    <p
                      className="text-xs"
                      style={{ color: "var(--on-surface-muted)", lineHeight: 1.5 }}
                    >
                      Fields marked{" "}
                      <span style={{ color: "var(--tertiary)" }}>*</span>{" "}
                      are required.
                    </p>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={formState === "sending"}
                    >
                      {formState === "sending" ? (
                        <>
                          <span
                            className="w-4 h-4 rounded-full border-2 animate-spin"
                            style={{
                              borderColor: "rgba(250,246,255,0.4)",
                              borderTopColor: "transparent",
                            }}
                          />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send message
                          <svg
                            className="transition-transform duration-200 group-hover:translate-x-1"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M2 7h10M8 4l3 3-3 3"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
