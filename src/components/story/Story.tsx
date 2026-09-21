"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { relationshipData } from "@/data/story";

export function Story() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section id="story" className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-[rgb(15,23,42)] via-[rgb(2,6,23)] to-[rgb(15,23,42)]" />
      <div ref={containerRef} className="container relative z-10 mx-auto grid items-center gap-10 px-6 lg:grid-cols-2 lg:gap-14">
        <motion.div style={{ opacity }} className="space-y-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 bg-gradient-to-r from-romantic-400 to-violet-400 bg-clip-text font-serif text-4xl text-transparent md:text-6xl"
            >
              {relationshipData.story.title}
            </motion.h2>
            <p className="text-lg text-white/60 md:text-xl">{relationshipData.story.subtitle}</p>
          </div>
          <div className="space-y-5 md:space-y-6">
            {relationshipData.story.milestones.map((milestone, index) => (
              <motion.article
                key={milestone.title}
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                className="flex gap-4 md:gap-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-romantic-500 to-violet-600 text-sm font-bold text-white shadow-lg shadow-romantic-500/20 md:h-12 md:w-12">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-serif text-lg text-white md:text-xl">{milestone.title}</h3>
                  <p className="mb-1.5 text-sm text-romantic-400/80">{milestone.date}</p>
                  <p className="leading-relaxed text-white/60">{milestone.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        <div className="relative mx-auto grid w-full max-w-xl grid-cols-2 gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-sm md:gap-4 md:p-4">
          {relationshipData.story.milestones.map((milestone, index) => (
            <motion.div
              key={milestone.image}
              animate={{ y: [0, index % 2 ? -8 : 8, 0] }}
              transition={{ duration: 4.5 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.figure
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ scale: 1.03 }}
                className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/20 shadow-xl"
              >
                <img src={milestone.image} alt={milestone.title} className="h-full w-full object-cover object-center" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-3 pb-3 pt-10">
                  <p className="truncate font-serif text-xs text-white md:text-sm">{milestone.title}</p>
                </figcaption>
              </motion.figure>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
