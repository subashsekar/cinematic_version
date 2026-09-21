"use client";

import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { FallingNames } from "./FallingNames";
import { FloatingHearts } from "./FloatingHearts";
import { BackgroundParticles } from "./BackgroundParticles";
import { LoveRainCamera } from "./LoveRainCamera";
import {
  isMobileViewport,
  loveParticleConfig,
  prefersReducedMotion,
} from "./loveRainConfig";
import { disposeTextTextures } from "./textTextures";

type LoveRainSceneProps = {
  scrollProgress: MutableRefObject<number>;
  mouse: MutableRefObject<{ x: number; y: number }>;
  overlay?: boolean;
};

export function LoveRainScene({ scrollProgress, mouse, overlay = false }: LoveRainSceneProps) {
  const fallSpeedBoost = useRef(0);
  const mobile = useMemo(() => isMobileViewport(), []);
  const reducedMotion = useMemo(() => prefersReducedMotion(), []);
  const interactive = !overlay && !mobile && !reducedMotion;

  const nameCount = mobile ? loveParticleConfig.mobileCount : loveParticleConfig.desktopCount;
  const heartCount = mobile
    ? loveParticleConfig.heartCountMobile
    : loveParticleConfig.heartCountDesktop;
  const particleCount = mobile
    ? loveParticleConfig.particleCountMobile
    : loveParticleConfig.particleCountDesktop;

  useEffect(() => {
    return () => disposeTextTextures();
  }, []);

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      fallSpeedBoost.current = overlay ? 0.15 : scrollProgress.current * 0.85;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [scrollProgress, overlay]);

  return (
    <Canvas
      className="pointer-events-none h-full w-full"
      dpr={[1, mobile ? 1.15 : 1.5]}
      camera={{ position: [0, 0, 10], fov: 50, near: 0.1, far: 80 }}
      gl={{
        antialias: !mobile,
        alpha: overlay,
        premultipliedAlpha: false,
        powerPreference: "high-performance",
      }}
      style={{
        pointerEvents: "none",
        background: overlay ? "transparent" : undefined,
      }}
      eventSource={undefined}
      eventPrefix="client"
    >
      {!overlay && <color attach="background" args={["#050510"]} />}
      {!overlay && <fog attach="fog" args={["#050510", 12, 28]} />}

      <ambientLight intensity={overlay ? 0.55 : 0.35} />
      <pointLight position={[4, 6, 6]} intensity={overlay ? 0.35 : 0.55} color="#f9a8d4" />
      <pointLight position={[-5, 2, 4]} intensity={overlay ? 0.25 : 0.4} color="#93c5fd" />
      <pointLight position={[0, -3, 5]} intensity={0.2} color="#c4b5fd" />

      <LoveRainCamera mouse={mouse} scrollProgress={scrollProgress} reducedMotion={reducedMotion || overlay} />
      {!overlay && <BackgroundParticles count={particleCount} reducedMotion={reducedMotion} />}
      <FloatingHearts count={heartCount} fallSpeedBoost={fallSpeedBoost} reducedMotion={reducedMotion} />
      <FallingNames
        count={nameCount}
        fallSpeedBoost={fallSpeedBoost}
        mouse={mouse}
        reducedMotion={reducedMotion}
        interactive={interactive}
      />
    </Canvas>
  );
}
