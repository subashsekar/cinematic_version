"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { relationshipData } from "@/data/story";

export function Memories() {
  const [activeCategory, setActiveCategory] = useState("All");
  const memories =
    activeCategory === "All"
      ? relationshipData.memories.items
      : relationshipData.memories.items.filter((item) => item.category === activeCategory);

  const loop = useMemo(() => {
    const base = memories.length > 0 ? memories : relationshipData.memories.items;
    const padded = base.length < 6 ? [...base, ...base, ...base] : [...base, ...base];
    return padded;
  }, [memories]);

  return (
    <section id="memories" className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute left-1/2 top-24 h-64 w-64 -translate-x-1/2 rounded-full bg-romantic-500/10 blur-3xl" aria-hidden />

      <div className="relative z-10">
        <header className="container mx-auto mb-10 space-y-5 px-6 text-center md:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.35em] text-romantic-300/80"
          >
            Scroll of us
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-romantic-400 to-violet-400 bg-clip-text font-serif text-4xl text-transparent md:text-6xl"
          >
            {relationshipData.memories.title}
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-3">
            {relationshipData.memories.categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-5 py-2 text-sm transition ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-romantic-500 to-violet-600 text-white shadow-lg shadow-romantic-500/30"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </header>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="group/row relative overflow-hidden py-2"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-950 to-transparent md:w-28" aria-hidden />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-950 to-transparent md:w-28" aria-hidden />
          <div
            className="flex w-max animate-marquee gap-4 group-hover/row:[animation-play-state:paused] md:gap-5"
            style={{ animationDuration: "40s" }}
          >
            {loop.map((memory, index) => (
              <motion.figure
                key={`${memory.image}-${index}`}
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="group relative h-[260px] w-[180px] shrink-0 overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.45)] md:h-[300px] md:w-[210px]"
              >
                <img
                  src={memory.image}
                  alt={memory.caption}
                  className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-110"
                  loading="lazy"
                  draggable={false}
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-3.5 pb-3.5 pt-14 text-white">
                  <p className="font-serif text-sm md:text-base">{memory.title}</p>
                  <p className="mt-0.5 line-clamp-2 text-[11px] text-white/70 md:text-xs">{memory.caption}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
