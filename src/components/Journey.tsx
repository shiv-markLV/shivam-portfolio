"use client";

import { motion } from "framer-motion";

const milestones = [
  { date: "2022", title: "Beginning of Programming Journey", desc: "Started learning programming fundamentals and exploring software development." },
  { date: "2023", title: "Engineering Education", desc: "Began B.Tech studies, deepening computer science foundations." },
  { date: "2024", title: "First Development Projects", desc: "Built initial web applications and explored full-stack development." },
  { date: "2025", title: "AI Assistant Development", desc: "Developed NYRA AI — personal AI assistant with voice and desktop features." },
  { date: "Future", title: "Software Engineering Ambitions", desc: "Aiming to build impactful products at the intersection of AI and software." },
];

export default function Journey() {
  return (
    <section id="journey" className="section">
      <div className="container">
        <p className="text-sm tracking-[0.3em] text-muted mb-12">THE JOURNEY SO FAR.</p>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10" />
          <div className="space-y-12">
            {milestones.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className="md:w-1/2 pl-12 md:pl-0">
                  <div className="glass rounded-2xl p-6">
                    <span className="text-accent text-sm font-mono">{m.date}</span>
                    <h3 className="font-display text-xl font-semibold mt-2">{m.title}</h3>
                    <p className="mt-2 text-muted text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>
                <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 w-3 h-3 rounded-full bg-accent ring-4 ring-bg" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
