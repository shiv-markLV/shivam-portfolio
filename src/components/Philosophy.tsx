"use client";

import { motion } from "framer-motion";

export default function Philosophy() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg2 to-bg" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-accent/20 blur-3xl" />
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="relative container text-center"
      >
        <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold leading-[1] tracking-tight">
          <span className="text-gradient">THE FUTURE</span>
          <br />
          BELONGS TO THOSE
          <br />
          WHO DARE TO BUILD IT.
        </h2>
      </motion.div>
    </section>
  );
}
