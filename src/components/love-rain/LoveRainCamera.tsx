"use client";

import { useRef, type MutableRefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type LoveRainCameraProps = {
  mouse: MutableRefObject<{ x: number; y: number }>;
  scrollProgress: MutableRefObject<number>;
  reducedMotion: boolean;
};

export function LoveRainCamera({ mouse, scrollProgress, reducedMotion }: LoveRainCameraProps) {
  const { camera } = useThree();
  const current = useRef({ x: 0, y: 0, z: 10 });

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const progress = scrollProgress.current;
    const targetX = mouse.current.x * 0.9;
    const targetY = mouse.current.y * 0.45;
    const breath = reducedMotion ? 0 : Math.sin(t * 0.35) * 0.25;
    const targetZ = 10 - progress * 2.8 + breath;

    current.current.x = THREE.MathUtils.lerp(current.current.x, targetX, 0.04);
    current.current.y = THREE.MathUtils.lerp(current.current.y, targetY, 0.04);
    current.current.z = THREE.MathUtils.lerp(current.current.z, targetZ, 0.035);

    camera.position.x = current.current.x;
    camera.position.y = current.current.y;
    camera.position.z = current.current.z;
    camera.lookAt(current.current.x * 0.15, current.current.y * 0.1, -2);
  });

  return null;
}
