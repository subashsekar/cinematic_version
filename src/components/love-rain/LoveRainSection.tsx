"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { loveParticleConfig } from "@/data/loveParticles";

const LoveRainScene = dynamic(
  () => import("./LoveRainScene").then((mod) => mod.LoveRainScene),
  { ssr: false }
);

/**
 * Soft falling names/hearts overlay across the whole site,
 * so real page content stays visible underneath.
 */
export function LoveRainSection() {
  const scrollProgress = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollProgress.current = window.scrollY / max;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      mouse.current.x = Math.min(1, Math.max(-1, (event.clientX / window.innerWidth) * 2 - 1));
      mouse.current.y = Math.min(1, Math.max(-1, -((event.clientY / window.innerHeight) * 2 - 1)));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!loveParticleConfig.enabled || !mounted) return null;

  return (
    <div
      id="love-rain"
      className="pointer-events-none fixed inset-0 z-[15] overflow-hidden [&_*]:pointer-events-none"
      aria-hidden
    >
      <LoveRainScene scrollProgress={scrollProgress} mouse={mouse} overlay />
    </div>
  );
}
