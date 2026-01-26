"use client";

import { motion, useTransform, AnimatePresence } from "motion/react";
import { useSpring } from "motion/react";
import { useState, useRef } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import Footer from "../Footer";

interface ContactSectionProps {
  scrollProgress: ReturnType<typeof useSpring>;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

const WEB3FORMS_ACCESS_KEY = "a2a22454-4562-4e75-a468-134804a16e97";
const HCAPTCHA_SITEKEY = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";

export default function ContactSection({ scrollProgress }: ContactSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [hCaptchaToken, setHCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const y = useTransform(scrollProgress, [0.75, 1], [100, -50]);
  const opacity = useTransform(scrollProgress, [0.75, 0.85], [0, 1]);
  const scale = useTransform(scrollProgress, [0.75, 1], [0.9, 1]);

  const handleHCaptchaVerify = (token: string) => {
    setHCaptchaToken(token);
  };

  const handleHCaptchaExpire = () => {
    setHCaptchaToken(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if hCaptcha is verified
    if (!hCaptchaToken) {
      alert("Please complete the captcha verification");
      return;
    }
    
    // Disable button and set loading state
    setSubmitStatus("loading");
    
    try {
      // Prepare form data for Web3Forms
      const formPayload = new FormData();
      formPayload.append("access_key", WEB3FORMS_ACCESS_KEY);
      formPayload.append("name", formData.name);
      formPayload.append("email", formData.email);
      formPayload.append("message", formData.message);
      formPayload.append("h-captcha-response", hCaptchaToken);
      formPayload.append("subject", "New Contact Form Submission");
      
      // Submit to Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload,
      });

      const result = await response.json();

      if (result.success) {
        // Set success state
        setSubmitStatus("success");
        
        // Reset form and captcha
        setFormData({ name: "", email: "", message: "" });
        setHCaptchaToken(null);
        captchaRef.current?.resetCaptcha();
        
        // Reset after 3 seconds
        setTimeout(() => {
          setShowForm(false);
          setSubmitStatus("idle");
        }, 3000);
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      // On error, reset
      setSubmitStatus("error");
      console.error("Error sending:", error);
      
      // Reset after showing error
      setTimeout(() => {
        setSubmitStatus("idle");
        setHCaptchaToken(null);
        captchaRef.current?.resetCaptcha();
      }, 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="min-h-screen snap-start snap-always flex items-center justify-center bg-black relative overflow-y-auto z-40 py-8 md:py-0">
      <motion.div
        className="max-w-2xl mx-auto px-4 md:px-8 text-center z-10 w-full h-full flex flex-col justify-center overflow-y-auto"
        style={{ 
          y, 
          opacity, 
          scale,
          willChange: "transform, opacity",
          transform: "translateZ(0)",
        }}
      >
        <AnimatePresence mode="wait">
          {!showForm ? (
            <>
              <motion.h2
                key="title"
                className="text-4xl md:text-6xl font-bold text-white mb-6 md:mb-8"
                style={{ 
                  transform: "translateZ(0)",
                  fontFamily: 'var(--font-special-gothic-expanded-one)',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                Contact
              </motion.h2>
              <motion.p
                key="description"
                className="text-base md:text-xl text-zinc-400 mb-6 md:mb-8"
                style={{ transform: "translateZ(0)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                Feel free to contact me to discuss your projects.
              </motion.p>
            </>
          ) : null}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {!showForm ? (
            <motion.div
              key="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-4 md:gap-6"
            >
              <motion.button
                onClick={() => setShowForm(true)}
                className="inline-block px-6 py-3 md:px-8 md:py-4 bg-white hover:bg-zinc-200 text-black rounded-full font-semibold text-base md:text-lg transition-colors"
                style={{ transform: "translateZ(0)" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.button>
              <motion.a
                href="https://www.linkedin.com/in/clementpdr/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                style={{ transform: "translateZ(0)" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="text-sm font-medium">LinkedIn</span>
              </motion.a>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="bg-zinc-900 rounded-2xl p-4 md:p-8 shadow-xl border border-zinc-800 text-left max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h3 className="text-xl md:text-3xl font-bold text-white">
                  Let's talk
                </h3>
                <motion.button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </div>

              <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-zinc-300 mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-zinc-700 bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-white transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="flex-1">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-zinc-300 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-zinc-700 bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-white transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-zinc-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-zinc-700 bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-white transition-all resize-none"
                    placeholder="Your message..."
                  />
                </div>
              </div>

              {/* hCaptcha */}
              <div className="mb-4 md:mb-6 flex justify-center">
                <HCaptcha
                  sitekey={HCAPTCHA_SITEKEY}
                  onVerify={handleHCaptchaVerify}
                  onExpire={handleHCaptchaExpire}
                  ref={captchaRef}
                  reCaptchaCompat={false}
                />
              </div>

              <motion.button
                type="submit"
                disabled={submitStatus !== "idle" || !hCaptchaToken}
                className={`w-full px-6 py-3 rounded-full font-semibold transition-colors relative overflow-hidden min-h-[48px] flex items-center justify-center ${
                  submitStatus === "success"
                    ? "bg-green-500 text-white"
                    : submitStatus === "error"
                    ? "bg-red-500 text-white"
                    : submitStatus === "loading"
                    ? "bg-white hover:bg-zinc-200 text-black"
                    : !hCaptchaToken
                    ? "bg-zinc-600 text-white cursor-not-allowed opacity-60"
                    : "bg-white hover:bg-zinc-200 text-black"
                } ${submitStatus !== "idle" || !hCaptchaToken ? "cursor-not-allowed opacity-90" : ""}`}
                whileHover={submitStatus === "idle" && hCaptchaToken ? { scale: 1.02 } : {}}
                whileTap={submitStatus === "idle" && hCaptchaToken ? { scale: 0.98 } : {}}
              >
                <AnimatePresence mode="wait">
                  {submitStatus === "idle" && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="block"
                    >
                      Send
                    </motion.span>
                  )}
                  
                  {submitStatus === "loading" && (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative block w-full h-full flex items-center justify-center"
                    >
                      <span className="absolute z-10">Sending...</span>
                      <motion.div
                        className="absolute z-20"
                        initial={{ left: "-20px" }}
                        animate={{ 
                          left: "calc(100% + 20px)",
                        }}
                        transition={{
                          duration: 1.5,
                          ease: "easeInOut",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-black"
                        >
                          <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"/>
                          <path d="M6 12h16"/>
                        </svg>
                      </motion.div>
                    </motion.span>
                  )}
                  
                  {submitStatus === "success" && (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="block"
                    >
                      Sent
                    </motion.span>
                  )}
                  
                  {submitStatus === "error" && (
                    <motion.span
                      key="error"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="block"
                    >
                      Error
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 w-full">
        <Footer />
      </div>
    </section>
  );
}
