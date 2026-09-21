"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { loveParticleConfig, seededRandom } from "./loveRainConfig";

type BackgroundParticlesProps = {
  count: number;
  reducedMotion: boolean;
};

export function BackgroundParticles({ count, reducedMotion }: BackgroundParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, phases, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const speeds = new Float32Array(count);
    const { spreadX, spreadY, depthMin, depthMax } = loveParticleConfig;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const seed = i * 4.1 + 1.3;
      positions[i3] = (seededRandom(seed) - 0.5) * spreadX * 1.4;
      positions[i3 + 1] = (seededRandom(seed + 1) - 0.5) * spreadY * 1.2;
      positions[i3 + 2] = depthMin - 2 + seededRandom(seed + 2) * (depthMax - depthMin + 4);
      phases[i] = seededRandom(seed + 3) * Math.PI * 2;
      speeds[i] = 0.002 + seededRandom(seed + 4) * 0.006;
    }
    return { positions, phases, speeds };
  }, [count]);

  useFrame((state, delta) => {
    const points = pointsRef.current;
    if (!points) return;
    const attr = points.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const capped = Math.min(delta, 0.05);
    const motionScale = reducedMotion ? 0.1 : 1;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      arr[i3 + 1] -= speeds[i] * motionScale * (capped * 60);
      arr[i3] += Math.sin(t * 0.2 + phases[i]) * 0.002 * motionScale;

      if (arr[i3 + 1] < -loveParticleConfig.spreadY * 0.7) {
        arr[i3 + 1] = loveParticleConfig.spreadY * 0.7;
        arr[i3] = (Math.random() - 0.5) * loveParticleConfig.spreadX * 1.4;
      }
    }
    attr.needsUpdate = true;

    const mat = points.material as THREE.PointsMaterial;
    mat.opacity = 0.35 + Math.sin(t * 0.8) * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#f9a8d4"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  );
}
