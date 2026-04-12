"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SendHorizonal, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
  "Job opportunity",
  "Freelance mission",
  "Dev idea or collaboration",
  "Open source",
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
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      setFormState("sent");
    } catch {
      setFormState("error");
    }
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
            <motion.div
              className="md:sticky md:top-32"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
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
                Let&apos;s{" "}
                <span style={{ color: "var(--primary)" }}>talk.</span>
              </h1>

              <p
                className="text-base max-w-xs"
                style={{ color: "var(--on-surface-variant)", lineHeight: 1.65 }}
              >
                Whether you have a job opportunity, a dev idea, a project to
                build together, or just want to say hi — feel free to reach out.
                I read everything.
              </p>

              <div
                className="mt-10 h-px w-24"
                style={{
                  background: "linear-gradient(to right, var(--tertiary), transparent)",
                }}
              />
            </motion.div>

            {/* Right — form card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="p-8 md:p-10"
              style={{ background: "var(--surface-high)", borderRadius: "2rem" }}
            >
              {formState === "error" ? (
                /* ── Error state ── */
                <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
                  <p className="text-sm" style={{ color: "var(--on-surface-variant)" }}>
                    Something went wrong. Please try again or reach out directly at{" "}
                    <a href="mailto:poudree.clement@gmail.com" style={{ color: "var(--primary)" }}>
                      poudree.clement@gmail.com
                    </a>
                    .
                  </p>
                  <button
                    onClick={() => setFormState("idle")}
                    className="text-xs underline cursor-pointer"
                    style={{ color: "var(--on-surface-muted)" }}
                  >
                    Try again
                  </button>
                </div>
              ) : formState === "sent" ? (
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

                    <motion.button
                      type="submit"
                      disabled={formState === "sending"}
                      whileHover={formState !== "sending" ? { scale: 1.02 } : {}}
                      whileTap={{ scale: 0.97 }}
                      className="relative overflow-hidden inline-flex items-center gap-2.5 px-6 py-3 font-semibold text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: "var(--primary-container)",
                        color: "var(--on-primary)",
                        borderRadius: "1rem",
                        fontFamily: "var(--font-manrope)",
                      }}
                    >
                      {/* Hover shimmer layer */}
                      <motion.span
                        aria-hidden
                        className="pointer-events-none absolute inset-0"
                        initial={{ x: "-100%", opacity: 0 }}
                        whileHover={{ x: "100%", opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        style={{
                          background:
                            "linear-gradient(90deg, transparent 0%, rgba(250,246,255,0.12) 50%, transparent 100%)",
                        }}
                      />

                      {/* Label + icon — crossfade on state change */}
                      <AnimatePresence mode="wait" initial={false}>
                        {formState === "sending" ? (
                          <motion.span
                            key="sending"
                            className="inline-flex items-center gap-2.5"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.15 }}
                          >
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                              className="inline-flex"
                            >
                              <Loader2 size={15} strokeWidth={2} />
                            </motion.span>
                            Sending…
                          </motion.span>
                        ) : (
                          <motion.span
                            key="idle"
                            className="inline-flex items-center gap-2.5"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.15 }}
                          >
                            Send message
                            <motion.span
                              className="inline-flex"
                              initial={{ x: 0 }}
                              whileHover={{ x: 3 }}
                              transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            >
                              <SendHorizonal size={15} strokeWidth={2} />
                            </motion.span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
