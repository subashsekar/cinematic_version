import { loveParticleConfig } from "@/data/loveParticles";

export { loveParticleConfig };

export function isMobileViewport() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 768px)").matches;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Deterministic pseudo-random in [0, 1) */
export function seededRandom(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function randomBetween(min: number, max: number, seed: number) {
  return min + seededRandom(seed) * (max - min);
}
