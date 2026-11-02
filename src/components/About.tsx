"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: "Projects Built", value: "10+" },
  { label: "Technologies", value: "20+" },
  { label: "Curiosity", value: "∞" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;
    gsap.fromTo(
      headingRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section id="about" className="section">
      <div className="container">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm tracking-[0.3em] text-muted mb-6"
        >
          BEYOND THE CODE.
        </motion.p>
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.h2
            ref={headingRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl sm:text-6xl font-bold leading-tight"
          >
            I build things that
            <span className="text-gradient"> matter.</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-6 text-muted leading-relaxed text-lg"
          >
            <p>
              I&apos;m Shivam Yadav, a B.Tech student passionate about software engineering, artificial
              intelligence and building innovative digital products.
            </p>
            <p>
              I enjoy exploring new technologies, solving problems and transforming ambitious ideas into
              real-world applications.
            </p>
          </motion.div>
        </div>
        <div ref={ref} className="mt-20 grid sm:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-8"
            >
              <div className="font-display text-4xl font-bold text-gradient">{s.value}</div>
              <div className="mt-2 text-sm text-muted tracking-wide">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
