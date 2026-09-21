"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getOrCreateTextTexture } from "./textTextures";
import { loveParticleConfig, randomBetween, seededRandom } from "./loveRainConfig";

type FloatingHeartsProps = {
  count: number;
  fallSpeedBoost: MutableRefObject<number>;
  reducedMotion: boolean;
};

export function FloatingHearts({ count, fallSpeedBoost, reducedMotion }: FloatingHeartsProps) {
  const groupRef = useRef<THREE.Group>(null);

  const hearts = useMemo(() => {
    const { hearts: glyphs, depthMin, depthMax, spreadX, spreadY } = loveParticleConfig;
    return Array.from({ length: count }, (_, i) => {
      const seed = i * 23.7 + 9.1;
      const glyph = glyphs[i % glyphs.length];
      return {
        id: `heart-${i}`,
        glyph,
        texture: getOrCreateTextTexture(glyph, "#ff9ec4"),
        x: (seededRandom(seed) - 0.5) * spreadX,
        y: (seededRandom(seed + 1) - 0.5) * spreadY,
        z: randomBetween(depthMin, depthMax, seed + 2),
        speed: randomBetween(0.004, 0.012, seed + 3),
        drift: randomBetween(0.3, 1.2, seed + 4),
        rotSpeed: randomBetween(-0.4, 0.4, seed + 5),
        scale: randomBetween(0.32, 0.62, seed + 6),
        phase: seededRandom(seed + 7) * Math.PI * 2,
        towardCamera: seededRandom(seed + 8) > 0.72,
      };
    });
  }, [count]);

  const materials = useMemo(
    () =>
      hearts.map(
        (heart) =>
          new THREE.MeshBasicMaterial({
            map: heart.texture,
            transparent: true,
            depthWrite: false,
            toneMapped: false,
            opacity: 0.88,
          })
      ),
    [hearts]
  );

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const capped = Math.min(delta, 0.05);
    const boost = fallSpeedBoost.current;
    const motionScale = reducedMotion ? 0.12 : 1;

    group.children.forEach((child, i) => {
      const heart = hearts[i];
      if (!heart || !(child instanceof THREE.Mesh)) return;

      heart.y -= heart.speed * (1 + boost * 0.6) * motionScale * (capped * 60);
      heart.x += Math.sin(state.clock.elapsedTime * 0.4 + heart.phase) * heart.drift * 0.01 * motionScale;
      if (heart.towardCamera) {
        heart.z = THREE.MathUtils.lerp(heart.z, loveParticleConfig.depthMax - 0.5, 0.002 * motionScale);
      }
      child.rotation.z += heart.rotSpeed * capped * motionScale;

      if (heart.y < -loveParticleConfig.spreadY * 0.55) {
        heart.y = loveParticleConfig.spreadY * 0.55;
        heart.x = (Math.random() - 0.5) * loveParticleConfig.spreadX;
        heart.z =
          loveParticleConfig.depthMin +
          Math.random() * (loveParticleConfig.depthMax - loveParticleConfig.depthMin);
      }

      const depthT = THREE.MathUtils.clamp(
        (heart.z - loveParticleConfig.depthMin) /
          (loveParticleConfig.depthMax - loveParticleConfig.depthMin || 1),
        0,
        1
      );
      child.position.set(heart.x, heart.y, heart.z);
      child.scale.setScalar(heart.scale * (0.75 + depthT * 0.55));
      const mat = materials[i];
      if (mat) mat.opacity = 0.55 + depthT * 0.4;
    });
  });

  return (
    <group ref={groupRef}>
      {hearts.map((heart, i) => (
        <mesh key={heart.id} position={[heart.x, heart.y, heart.z]} material={materials[i]}>
          <planeGeometry args={[1.05, 1.05]} />
        </mesh>
      ))}
    </group>
  );
}
