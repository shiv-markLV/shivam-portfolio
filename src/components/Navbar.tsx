"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const items = ["Home", "About", "Projects", "Skills", "Journey", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.toLowerCase()));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = e.target.id;
            const name = id.charAt(0).toUpperCase() + id.slice(1);
            setActive(name);
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    el?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-bg/60 border-b border-white/5" : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between py-5">
        <button onClick={() => scrollTo("Home")} className="font-display text-lg font-bold tracking-tight">
          SHIVAM<span className="text-accent">.</span>
        </button>
        <ul className="hidden md:flex items-center gap-8">
          {items.map((it) => (
            <li key={it}>
              <button
                onClick={() => scrollTo(it)}
                className={`relative text-sm tracking-wide transition-colors ${
                  active === it ? "text-white" : "text-muted hover:text-white"
                }`}
              >
                {it}
                {active === it && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-2 left-0 right-0 h-[2px] bg-accent"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5"
          aria-label="menu"
        >
          <span className={`h-[2px] w-6 bg-white transition ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`h-[2px] w-6 bg-white transition ${open ? "opacity-0" : ""}`} />
          <span className={`h-[2px] w-6 bg-white transition ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>
      {open && (
        <div className="md:hidden glass mx-4 mb-4 rounded-2xl p-6">
          <ul className="flex flex-col gap-4">
            {items.map((it) => (
              <li key={it}>
                <button onClick={() => scrollTo(it)} className="text-lg text-muted hover:text-white">
                  {it}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
