"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { relationshipData } from "@/data/story";
import { useAudio } from "@/providers/AudioProvider";

export function Gallery() {
  const [activeFilter, setActiveFilter] = useState("Photos");
  const { activeTrackId, isPlaying, toggleTrack } = useAudio();

  const filteredItems = relationshipData.gallery.items.filter((item) => {
    if (activeFilter === "Photos") return item.type !== "video" && item.type !== "audio";
    if (activeFilter === "Videos") return item.type === "video";
    return item.type === "audio";
  });

  const rollingPhotos = useMemo(
    () => relationshipData.gallery.items.filter((item) => item.type !== "video" && item.type !== "audio"),
    []
  );
  const marqueeLoop = useMemo(() => [...rollingPhotos, ...rollingPhotos], [rollingPhotos]);

  return (
    <section id="gallery" className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-[rgb(2,6,23)] via-[rgb(15,23,42)] to-[rgb(2,6,23)]" />
      <div className="container relative z-10 mx-auto px-6">
        <header className="mb-10 space-y-5 text-center md:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-romantic-400 to-violet-400 bg-clip-text font-serif text-4xl text-transparent md:text-6xl"
          >
            {relationshipData.gallery.title}
          </motion.h2>
          <p className="mx-auto max-w-xl text-sm text-white/55 md:text-base">
            Photos, videos, and the songs that sound like us — only one plays at a time.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {relationshipData.gallery.filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-6 py-2 text-sm transition ${
                  activeFilter === filter
                    ? "bg-gradient-to-r from-romantic-500 to-violet-600 text-white shadow-lg shadow-romantic-500/30"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </header>

        {activeFilter === "Photos" && (
          <div className="group/marquee relative mb-12 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] py-5">
            <div className="marquee-fade-left pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-slate-950 to-transparent md:w-24" aria-hidden />
            <div className="marquee-fade-right pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-slate-950 to-transparent md:w-24" aria-hidden />
            <div className="flex w-max animate-marquee gap-4 group-hover/marquee:[animation-play-state:paused]" style={{ animationDuration: "55s" }}>
              {marqueeLoop.map((item, index) => (
                <div
                  key={`${item.image}-roll-${index}`}
                  className="relative h-44 w-32 shrink-0 overflow-hidden rounded-xl border border-white/15 shadow-lg md:h-52 md:w-36"
                >
                  <img src={item.image} alt={item.description} className="h-full w-full object-cover object-center" loading="lazy" draggable={false} />
                </div>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
          >
            {filteredItems.map((item, index) => {
              const trackId = `gallery-${item.title}`;
              const trackPlaying = isPlaying && activeTrackId === trackId;

              return (
                <motion.article
                  key={item.image + item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: Math.min(index * 0.04, 0.3) }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
                >
                <div className="relative z-20 aspect-[3/4] overflow-hidden">
                  {item.type === "video" ? (
                    <video className="relative z-20 h-full w-full object-cover object-center" controls playsInline preload="metadata" src={item.image}>
                      Your browser does not support this video.
                    </video>
                    ) : item.type === "audio" ? (
                      <>
                        <img
                          className="h-full w-full object-cover object-center transition duration-700"
                          src={item.image}
                          alt={item.description}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                        <div className="absolute inset-x-0 bottom-4 flex flex-col items-center gap-3">
                          <div className="flex items-center justify-center gap-1.5">
                            {[0.35, 0.7, 1, 0.55, 0.8, 0.4, 0.9].map((height, barIndex) => (
                              <motion.span
                                key={barIndex}
                                animate={
                                  trackPlaying
                                    ? { scaleY: [0.4, height, 0.4] }
                                    : { scaleY: 0.35 }
                                }
                                transition={
                                  trackPlaying
                                    ? { duration: 0.8 + barIndex * 0.1, repeat: Infinity, ease: "easeInOut" }
                                    : { duration: 0.25 }
                                }
                                className="h-8 w-1 origin-bottom rounded-full"
                                style={{ backgroundColor: item.accent ?? "#f9a8d4" }}
                              />
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              if (!item.src) return;
                              void toggleTrack(trackId, item.src, { loop: true });
                            }}
                            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-romantic-500 to-violet-600 px-4 py-2 text-xs font-medium text-white shadow-lg shadow-romantic-500/30 transition hover:scale-105"
                            aria-label={trackPlaying ? `Pause ${item.title}` : `Play ${item.title}`}
                          >
                            {trackPlaying ? <Pause className="h-3.5 w-3.5 fill-white" /> : <Play className="h-3.5 w-3.5 fill-white" />}
                            {trackPlaying ? "Pause" : "Play"}
                          </button>
                        </div>
                      </>
                    ) : (
                      <img className="h-full w-full object-cover object-center transition duration-700 hover:scale-105" src={item.image} alt={item.description} loading="lazy" />
                    )}
                  </div>
                  <div className="p-3.5 md:p-4">
                    <h3 className="font-serif text-sm text-white md:text-base">{item.title}</h3>
                    <p className="mt-1 text-[11px] text-romantic-400/80 md:text-xs">{item.date}</p>
                    <p className="mt-1.5 line-clamp-2 text-xs text-white/55 md:text-sm">{item.description}</p>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
