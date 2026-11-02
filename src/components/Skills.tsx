"use client";

import { motion } from "framer-motion";

const groups = [
  { title: "Programming", items: ["Python", "JavaScript"] },
  { title: "Frontend", items: ["HTML", "CSS", "React", "Next.js", "Tailwind CSS"] },
  { title: "Backend", items: ["Node.js", "Express.js"] },
  { title: "Database", items: ["Supabase", "MongoDB"] },
  { title: "Creative", items: ["Three.js", "GSAP", "Framer Motion"] },
  { title: "AI", items: ["Artificial Intelligence", "AI API Integration", "Voice Assistant Development"] },
];

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <p className="text-sm tracking-[0.3em] text-muted mb-12">TOOLS OF MY CREATION.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((g, gi) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.08 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="font-display text-lg font-semibold mb-4 text-accent">{g.title.toUpperCase()}</h3>
              <div className="flex flex-wrap gap-2">
                {g.items.map((it, i) => (
                  <motion.span
                    key={it}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: gi * 0.08 + i * 0.05 }}
                    className="px-3 py-1.5 rounded-lg bg-white/5 text-sm text-white/90 hover:bg-accent/20 hover:text-white transition"
                  >
                    {it}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
