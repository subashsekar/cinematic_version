"use client";

import { useMemo, type MutableRefObject } from "react";
import * as THREE from "three";
import { FallingName } from "./FallingName";
import { loveParticleConfig, randomBetween, seededRandom } from "./loveRainConfig";

type FallingNamesProps = {
  count: number;
  fallSpeedBoost: MutableRefObject<number>;
  mouse: MutableRefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
  interactive: boolean;
};

export function FallingNames({
  count,
  fallSpeedBoost,
  mouse,
  reducedMotion,
  interactive,
}: FallingNamesProps) {
  const items = useMemo(() => {
    const { names, fallSpeedMin, fallSpeedMax, depthMin, depthMax, spreadX, spreadY } =
      loveParticleConfig;

    return Array.from({ length: count }, (_, i) => {
      const name = names[i % names.length];
      const seed = i * 17.13 + 3.7;
      return {
        id: `name-${i}`,
        text: name.text,
        color: name.color,
        position: new THREE.Vector3(
          (seededRandom(seed) - 0.5) * spreadX,
          (seededRandom(seed + 1) - 0.5) * spreadY,
          randomBetween(depthMin, depthMax, seed + 2)
        ),
        scale: randomBetween(0.55, 1.15, seed + 3),
        speed: randomBetween(fallSpeedMin, fallSpeedMax, seed + 4),
        rotation: randomBetween(-0.25, 0.25, seed + 5),
        opacity: randomBetween(0.7, 1, seed + 6),
        horizontalDrift: randomBetween(0.2, 1.1, seed + 7),
        rotationSpeed: randomBetween(-0.15, 0.15, seed + 8),
      };
    });
  }, [count]);

  return (
    <group>
      {items.map((item) => (
        <FallingName
          key={item.id}
          text={item.text}
          color={item.color}
          position={item.position}
          scale={item.scale}
          speed={item.speed}
          rotation={item.rotation}
          opacity={item.opacity}
          horizontalDrift={item.horizontalDrift}
          rotationSpeed={item.rotationSpeed}
          depthMin={loveParticleConfig.depthMin}
          depthMax={loveParticleConfig.depthMax}
          spreadX={loveParticleConfig.spreadX}
          spreadY={loveParticleConfig.spreadY}
          fallSpeedBoost={fallSpeedBoost}
          mouse={mouse}
          reducedMotion={reducedMotion}
          interactive={interactive}
        />
      ))}
    </group>
  );
}
