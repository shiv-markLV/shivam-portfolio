"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (form.message.trim().length < 10) e.message = "Message must be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("sent");
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <p className="text-sm tracking-[0.3em] text-muted mb-6">LET&apos;S CREATE SOMETHING EXTRAORDINARY.</p>
        <h2 className="font-display text-4xl sm:text-6xl font-bold max-w-3xl">
          Have an idea? Let&apos;s turn it into reality.
        </h2>
        <div className="mt-12 grid lg:grid-cols-2 gap-12">
          <form onSubmit={onSubmit} className="space-y-5" noValidate>
            <div>
              <input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-5 py-4 rounded-xl glass bg-transparent outline-none focus:border-accent"
              />
              {errors.name && <p className="text-red-400 text-sm mt-2">{errors.name}</p>}
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-5 py-4 rounded-xl glass bg-transparent outline-none focus:border-accent"
              />
              {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
            </div>
            <div>
              <textarea
                placeholder="Your Message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-5 py-4 rounded-xl glass bg-transparent outline-none focus:border-accent resize-none"
              />
              {errors.message && <p className="text-red-400 text-sm mt-2">{errors.message}</p>}
            </div>
            <button
              type="submit"
              data-cursor="hover"
              className="px-8 py-4 rounded-full bg-white text-black font-medium hover:scale-105 transition"
            >
              Send Message
            </button>
            {status === "sent" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-muted"
              >
                Thanks! This form is a front-end demo — connect an email service (e.g. Resend/Formspree) to enable real delivery.
              </motion.p>
            )}
          </form>
          <div className="space-y-6">
            <p className="text-muted">
              Prefer direct contact? Reach out through any of these platforms.
            </p>
            <div className="flex flex-col gap-3">
              {[
                { label: "GitHub", href: "https://github.com/" },
                { label: "LinkedIn", href: "https://linkedin.com/" },
                { label: "Instagram", href: "https://instagram.com/" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="glass rounded-xl px-5 py-4 flex items-center justify-between hover:bg-white/10 transition"
                >
                  <span>{s.label}</span>
                  <span className="text-muted">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
