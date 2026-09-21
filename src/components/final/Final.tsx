"use client";

import { motion } from "framer-motion";
import { relationshipData } from "@/data/story";

export function Final() {
  return (
    <section
      id="final"
      className="relative flex min-h-[85vh] items-center justify-center overflow-hidden py-20 md:py-28"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[rgb(2,6,23)] via-[rgb(15,23,42)] to-[rgb(2,6,23)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(236,72,153,0.18), transparent 25%), radial-gradient(circle at 80% 40%, rgba(139,92,246,0.16), transparent 28%), radial-gradient(circle at 50% 80%, rgba(251,191,36,0.1), transparent 30%)",
        }}
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-romantic-400/40 bg-romantic-500/20"
          >
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="text-3xl text-romantic-300"
              aria-hidden
            >
              ♡
            </motion.span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl text-white md:text-6xl"
          >
            {relationshipData.final.title1}
          </motion.h2>

          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="font-serif text-2xl text-romantic-400 md:text-4xl"
          >
            {relationshipData.final.title2}
          </motion.h3>

          <motion.h4
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-romantic-500 via-violet-500 to-gold-300 bg-clip-text font-serif text-4xl text-transparent md:text-6xl"
          >
            {relationshipData.final.title3}
          </motion.h4>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
            className="pt-4"
          >
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="rounded-full bg-gradient-to-r from-romantic-500 to-violet-600 px-8 py-4 font-medium text-white shadow-2xl shadow-romantic-500/30 transition hover:scale-105 hover:shadow-romantic-500/50"
            >
              {relationshipData.final.cta}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
