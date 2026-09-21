"use client";

import { motion } from "framer-motion";
import { withBasePath } from "@/lib/basePath";

export function Intro() {
  return (
    <section className="intro-overlay fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[rgb(2,6,23)] to-[rgb(15,23,42)]">
      <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_50%_42%,rgba(236,72,153,0.22),transparent_18%),radial-gradient(circle_at_30%_30%,rgba(139,92,246,0.14),transparent_25%)]" />
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at 70% 70%, rgba(251,191,36,0.08), transparent 30%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="animate-heartbeat"
        >
          <svg
            className="mb-8 h-44 w-48 drop-shadow-[0_14px_22px_rgba(0,0,0,0.45)] md:h-56 md:w-60"
            viewBox="0 0 512 512"
            role="img"
            aria-label="A special memory"
          >
            <defs>
              <clipPath id="opening-heart-clip">
                <path d="M256 472S40 344 40 168C40 85 105 40 170 40c45 0 74 25 86 55 12-30 41-55 86-55 65 0 130 45 130 128 0 176-216 304-216 304Z" />
              </clipPath>
            </defs>
            <image
              href={withBasePath("/memories/heart-portrait.png")}
              width="512"
              height="512"
              preserveAspectRatio="xMidYMin slice"
              clipPath="url(#opening-heart-clip)"
            />
          </svg>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="mb-3 font-serif text-xl text-white/85 md:text-2xl"
        >
          Something special was made for you...
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="mb-8 font-serif text-lg text-romantic-400 md:text-xl"
        >
          Ready?
        </motion.h3>
        <motion.a
          href="#hero"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="relative rounded-full border border-romantic-500/40 bg-gradient-to-r from-romantic-500/30 to-violet-500/30 px-8 py-4 font-serif text-lg text-white shadow-lg shadow-romantic-500/20 transition hover:border-romantic-500/80"
        >
          Enter <span aria-hidden="true" className="ml-2">↓</span>
        </motion.a>
        <motion.a
          href="#hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-sm text-white/50 transition hover:text-white"
        >
          Skip introduction
        </motion.a>
      </div>
    </section>
  );
}
