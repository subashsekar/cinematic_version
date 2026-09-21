"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getOrCreateTextTexture } from "./textTextures";

export type FallingNameProps = {
  text: string;
  color: string;
  position: THREE.Vector3;
  scale: number;
  speed: number;
  rotation: number;
  opacity: number;
  horizontalDrift: number;
  rotationSpeed: number;
  depthMin: number;
  depthMax: number;
  spreadX: number;
  spreadY: number;
  fallSpeedBoost: MutableRefObject<number>;
  mouse: MutableRefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
  interactive: boolean;
};

export function FallingName({
  text,
  color,
  position,
  scale,
  speed,
  rotation,
  opacity,
  horizontalDrift,
  rotationSpeed,
  depthMin,
  depthMax,
  spreadX,
  spreadY,
  fallSpeedBoost,
  mouse,
  reducedMotion,
  interactive,
}: FallingNameProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const state = useRef({
    x: position.x,
    y: position.y,
    z: position.z,
    rot: rotation,
    speed,
    opacity,
    scale,
    drift: horizontalDrift,
    rotSpeed: rotationSpeed,
    phase: Math.random() * Math.PI * 2,
  });

  const texture = useMemo(() => getOrCreateTextTexture(text, color), [text, color]);
  const material = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      toneMapped: false,
    });
  }, [texture]);

  useFrame((frameState, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const s = state.current;
    const capped = Math.min(delta, 0.05);
    const boost = fallSpeedBoost.current;
    const motionScale = reducedMotion ? 0.15 : 1;

    s.y -= s.speed * (1 + boost) * motionScale * (capped * 60);
    s.x += Math.sin(frameState.clock.elapsedTime * 0.35 + s.phase) * s.drift * 0.008 * motionScale;
    s.rot += s.rotSpeed * capped * motionScale;

    if (s.y < -spreadY * 0.55) {
      s.y = spreadY * 0.55 + Math.random() * 2;
      s.x = (Math.random() - 0.5) * spreadX;
      s.z = depthMin + Math.random() * (depthMax - depthMin);
      s.speed = speed * (0.85 + Math.random() * 0.35);
    }

    // Depth-based brightness / scale
    const depthT = THREE.MathUtils.clamp((s.z - depthMin) / (depthMax - depthMin || 1), 0, 1);
    const depthScale = 0.55 + depthT * 0.7;
    let targetOpacity = (0.35 + depthT * 0.55) * s.opacity;
    let targetScale = s.scale * depthScale;

    if (interactive && !reducedMotion) {
      const dx = s.x - mouse.current.x * 6;
      const dy = s.y - mouse.current.y * 4;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 2.8) {
        const influence = 1 - dist / 2.8;
        targetScale *= 1 + influence * 0.28;
        targetOpacity = Math.min(1, targetOpacity + influence * 0.35);
        s.z = THREE.MathUtils.lerp(s.z, Math.min(depthMax, s.z + influence * 0.8), 0.08);
      }
    }

    mesh.position.set(s.x, s.y, s.z);
    mesh.rotation.z = s.rot;
    mesh.scale.setScalar(THREE.MathUtils.lerp(mesh.scale.x || targetScale, targetScale, 0.12));
    material.opacity = THREE.MathUtils.lerp(material.opacity, Math.min(0.72, targetOpacity), 0.12);
  });

  return (
    <mesh ref={meshRef} position={[position.x, position.y, position.z]} scale={scale} material={material}>
      <planeGeometry args={[2.4, 0.75]} />
    </mesh>
  );
}
