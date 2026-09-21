"use client";

import { useState, useRef } from "react";
import { relationshipData } from "@/data/story";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

export function Message() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      id="message"
      className="relative flex min-h-screen items-center justify-center overflow-hidden py-20 md:py-28"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[rgb(2,6,23)] via-[rgb(15,23,42)] to-[rgb(2,6,23)]" />
      <div className="absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-romantic-500/10 blur-3xl" aria-hidden />
      <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" aria-hidden />

      <div className="container relative z-10 mx-auto px-6">
        <div ref={containerRef}>
          <motion.div style={{ opacity }} className="mb-12 space-y-4 text-center md:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-romantic-400 to-violet-400 bg-clip-text font-serif text-4xl text-transparent md:text-6xl"
            >
              {relationshipData.letter.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mx-auto max-w-2xl text-white/60"
            >
              {relationshipData.letter.subtitle}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mx-auto mb-10 flex max-w-lg flex-col items-center"
          >
            <div className="relative flex h-56 w-full max-w-sm items-center justify-center md:h-64">
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [-1.5, 1.5, -1.5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-x-8 inset-y-4 rounded-2xl border border-white/20 bg-gradient-to-br from-romantic-500/20 via-white/10 to-violet-500/20 shadow-2xl backdrop-blur-md"
              />
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                className="relative z-10 rounded-xl border border-gold-300/30 bg-[#fef3c7]/95 px-8 py-10 text-center shadow-xl"
              >
                <p className="font-handwritten text-3xl text-romantic-700 md:text-4xl">For you ♡</p>
                <p className="mt-2 text-sm text-slate-700/70">A letter waiting to be opened</p>
              </motion.div>
            </div>

            <motion.button
              type="button"
              onClick={() => setIsLetterOpen((open) => !open)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="mt-4 rounded-full bg-gradient-to-r from-romantic-500 to-violet-600 px-8 py-4 font-medium text-white shadow-2xl shadow-romantic-500/30 transition hover:shadow-romantic-500/50"
            >
              {isLetterOpen ? "Close Letter" : relationshipData.letter.cta}
            </motion.button>
          </motion.div>

          <AnimatePresence>
            {isLetterOpen && (
              <motion.div
                initial={{ opacity: 0, y: 28, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: 16, height: 0 }}
                transition={{ duration: 0.45 }}
                className="overflow-hidden"
              >
                <div className="glass-card mx-auto max-w-3xl space-y-5 p-8 md:p-12">
                  {relationshipData.letter.paragraphs.map((paragraph, index) => {
                    if (paragraph === "") {
                      return <div key={index} className="h-3" />;
                    }
                    const isTitle = index === 0;
                    const isSignoff =
                      paragraph.includes("ஆசைக் காதலன்") || paragraph.includes("என்றும் உன் அன்பில்");
                    return (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.06 * index }}
                        className={
                          isTitle
                            ? "text-center font-serif text-2xl text-romantic-400 md:text-3xl"
                            : isSignoff
                              ? "font-serif text-lg text-romantic-400 md:text-xl"
                              : "whitespace-pre-line text-base leading-[1.9] text-white/75 md:text-lg"
                        }
                      >
                        {paragraph}
                      </motion.p>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
