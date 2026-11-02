"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-bg"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="h-[2px] w-40 origin-left bg-gradient-to-r from-accent to-accent2"
            />
<motion.span
              initial={{ opacity: 0, y: 20, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.4em" }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-display text-2xl tracking-[0.4em] text-white"
            >
              SHIVAM
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
