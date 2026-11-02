"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import BackgroundRemover from "@/components/BackgroundRemover";
import ThreeBackground from "./ThreeBackground";

export default function Hero() {
  const ref = useRef<HTMLCanvasElement>(null);

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      <ThreeBackground />
      <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center pt-24">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm tracking-[0.3em] text-muted mb-6"
          >
            HELLO, I&apos;M
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9 }}
            className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight"
          >
            SHIVAM
            <br />
            YADAV<span className="text-accent">.</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6 space-y-1"
          >
            <p className="text-xl sm:text-2xl text-white/90 font-display">Creative Developer.</p>
            <p className="text-xl sm:text-2xl text-muted font-display">Software Engineer in Progress.</p>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-8 max-w-md text-muted leading-relaxed"
          >
            &ldquo;I transform ideas into meaningful digital experiences through code, creativity and technology.&rdquo;
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              data-cursor="hover"
              className="magnetic inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-black font-medium hover:scale-105 transition"
            >
              EXPLORE MY WORK →
            </a>
            <a
              href="#contact"
              data-cursor="hover"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full glass text-white font-medium hover:bg-white/10 transition"
            >
              LET&apos;S CONNECT
            </a>
          </motion.div>
        </div>
        <BackgroundRemover src="/images/profile.png" />
      </div>
    </section>
  );
}