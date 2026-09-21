"use client";

import { motion } from "framer-motion";
import { relationshipData } from "@/data/story";
import { Heart } from "lucide-react";

const accents = [
  "from-romantic-500/20 to-violet-500/10",
  "from-violet-500/20 to-gold-400/10",
  "from-gold-400/15 to-romantic-500/15",
  "from-romantic-400/20 to-romantic-600/10",
  "from-violet-400/20 to-romantic-500/10",
  "from-romantic-500/15 to-violet-400/20",
];

export function Reasons() {
  return (
    <section
      id="reasons"
      className="relative flex min-h-screen items-center justify-center overflow-hidden py-20 md:py-28"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[rgb(15,23,42)] via-[rgb(2,6,23)] to-[rgb(15,23,42)]" />
      <div className="absolute left-1/2 top-20 h-40 w-40 -translate-x-1/2 rounded-full bg-romantic-500/15 blur-3xl" aria-hidden />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-12 space-y-4 text-center md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-romantic-400 to-violet-400 bg-clip-text font-serif text-4xl text-transparent md:text-6xl"
          >
            {relationshipData.reasons.title}
          </motion.h2>
          <p className="mx-auto max-w-2xl text-white/60">
            These are just a few of the many reasons why I love you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {relationshipData.reasons.reasons.map((reason, index) => (
            <motion.article
              key={reason.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${accents[index % accents.length]} p-6 shadow-xl backdrop-blur-sm md:p-8`}
            >
              <motion.div
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 2.8 + index * 0.2, repeat: Infinity, ease: "easeInOut" }}
                className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-romantic-500 to-violet-600 text-white shadow-lg shadow-romantic-500/25"
              >
                <Heart className="h-5 w-5 fill-white" />
              </motion.div>
              <h3 className="mb-2 font-serif text-xl text-white md:text-2xl">{reason.title}</h3>
              <p className="text-sm leading-relaxed text-white/65 md:text-base">{reason.description}</p>
              <span className="absolute -bottom-3 -right-2 font-serif text-6xl text-white/[0.06]">{index + 1}</span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
