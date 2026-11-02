"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const projects = [
  {
    num: "01",
    slug: "nyra-ai",
    title: "NYRA AI",
    desc: "A personal AI assistant designed to provide intelligent conversations, voice interaction and desktop assistance.",
    stack: ["Python", "AI APIs", "Voice", "Desktop"],
    color: "from-purple-500/20 to-blue-500/10",
  },
  {
    num: "02",
    slug: "villagemart",
    title: "VILLAGEMART",
    desc: "A modern online shopping platform inspired by quick-commerce applications, designed to connect customers with local markets.",
    stack: ["React", "Node.js", "MongoDB", "Express"],
    color: "from-blue-500/20 to-cyan-500/10",
  },
  {
    num: "03",
    slug: "smart-tourism",
    title: "SMART TOURISM",
    desc: "An intelligent tourism experience featuring AI travel assistance, interactive maps, 3D experiences and smart exploration.",
    stack: ["Next.js", "Three.js", "AI", "Maps"],
    color: "from-pink-500/20 to-purple-500/10",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <p className="text-sm tracking-[0.3em] text-muted mb-12">SELECTED WORKS.</p>
        <div className="space-y-24">
          {projects.map((p, i) => (
            <motion.article
              key={p.num}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid lg:grid-cols-2 gap-10 items-center"
            >
              <div className={`relative aspect-[4/3] rounded-3xl overflow-hidden glass bg-gradient-to-br ${p.color} group`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-2xl text-white/40">{p.title}</span>
                </div>
                <div className="absolute top-6 left-6 font-display text-6xl font-bold text-white/10">{p.num}</div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-black/20" />
              </div>
              <div>
                <div className="text-accent font-mono text-sm">{p.num}</div>
                <h3 className="font-display text-4xl sm:text-5xl font-bold mt-2">{p.title}</h3>
                <p className="mt-6 text-muted leading-relaxed text-lg">{p.desc}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <span key={t} className="text-xs px-3 py-1 rounded-full glass text-muted">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex gap-4">
<Link
                    href={`/projects/${p.slug}`}
                    data-cursor="hover"
                    className="px-6 py-3 rounded-full bg-white text-black font-medium hover:scale-105 transition inline-block"
                  >
                    View Project
                  </Link>
                  <a
                    href="#"
                    data-cursor="hover"
                    className="px-6 py-3 rounded-full glass text-white font-medium hover:bg-white/10 transition"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
