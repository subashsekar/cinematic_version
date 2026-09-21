"use client";

import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { ThreeCanvas } from "@/components/three/ThreeCanvas";
import { OrbitControls, Stars, Float } from "@react-three/drei";
import * as THREE from "three";
import { relationshipData } from "@/data/story";
import { motion, useScroll, useTransform } from "framer-motion";

// Create heart shape using path
function createHeartShape() {
  const shape = new THREE.Shape();
  const x = 0;
  const y = 0;
  const size = 1;
  shape.moveTo(x, y);
  shape.bezierCurveTo(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  shape.bezierCurveTo(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  return shape;
}

// 3D Scene Components
function ParticleField({ count = 500 }) {
  const points = useRef<THREE.Points>(null);
  const [position, setPosition] = useState<THREE.BufferAttribute | null>(null);

  useEffect(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 10 + 5;
      positions[i3 + 2] = (Math.random() - 0.5) * 20 - 5;
    }
    setPosition(new THREE.BufferAttribute(positions, 3));
  }, [count]);

  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.y = clock.getElapsedTime() * 0.02;
      points.current.position.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.2;
    }
  });

  if (!position) return null;

  return (
    <points ref={points}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          args={[position.array, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ec4899"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

function Heart3D({ scale = 1 }) {
  const shape = createHeartShape();
  const extrudeSettings = {
    steps: 2,
    depth: 0.2,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.1,
    bevelSegments: 4,
  };
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geometry.center();

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh scale={[scale, scale, scale]}>
        <primitive object={geometry} attach="geometry" />
        <meshStandardMaterial
          attach="material"
          color="#ec4899"
          emissive="#ec4899"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>
    </Float>
  );
}

function LakeScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock, mouse }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
      groupRef.current.position.x = mouse.x * 2;
      groupRef.current.position.y = -mouse.y * 1.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Ambient Light */}
      <ambientLight intensity={0.5} color="#4a1c6e" />
      
      {/* Point Lights */}
      <pointLight position={[10, 10, 10]} intensity={1} color="#ec4899" />
      <pointLight position={[-10, 10, 10]} intensity={0.8} color="#8b5cf6" />
      <pointLight position={[0, -5, 10]} intensity={0.5} color="#ffffff" />
      
      {/* Spot Lights */}
      <spotLight
        position={[0, 20, 10]}
        angle={0.5}
        intensity={1}
        color="#f472b6"
        penumbra={0.5}
      />

      {/* Water Surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, -5]}>
        <planeGeometry args={[100, 100]} />
        <meshPhysicalMaterial
          color="#1e3a8a"
          roughness={0.1}
          metalness={0.8}
          transmission={0.5}
          thickness={1}
          opacity={0.8}
          transparent
        />
      </mesh>

      {/* Mountains */}
      <mesh position={[0, -1, -20]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 50]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {/* Stars */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Heart Object */}
      <Heart3D scale={2} />

      {/* Particle Field */}
      <ParticleField count={300} />
      
      {/* Silhouette Trees */}
      {[...Array(5)].map((_, i) => (
        <mesh
          key={i}
          position={[(i - 2) * 8, -1, -10]}
          rotation={[0, Math.random() * Math.PI, 0]}
        >
          <coneGeometry args={[0.5, 3, 4]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      ))}
    </group>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 80]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <ThreeCanvas camera={{ position: [0, 3, 15], fov: 50 }}>
          <color attach="background" args={["#020617"]} />
          <LakeScene />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minDistance={10}
            maxDistance={20}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </ThreeCanvas>
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        style={{ opacity, scale, y }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6 bg-gradient-to-r from-romantic-400 via-violet-400 to-gold-300 bg-clip-text font-serif text-5xl text-transparent md:text-7xl lg:text-8xl"
        >
          {relationshipData.hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mx-auto mb-10 max-w-2xl text-lg text-white/70 md:text-xl lg:text-2xl"
        >
          {relationshipData.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.button
            type="button"
            className="rounded-full bg-gradient-to-r from-romantic-500 to-violet-600 px-8 py-4 font-medium text-white shadow-2xl shadow-romantic-500/30 transition-all duration-300 hover:shadow-romantic-500/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const storySection = document.getElementById("story");
              if (storySection) {
                storySection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            {relationshipData.hero.cta}
          </motion.button>
        </motion.div>

        <motion.div
          className="mt-14 flex flex-col items-center md:mt-16"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm uppercase tracking-widest text-white/50">
            {relationshipData.hero.secondaryText}
          </span>
          <svg
            className="mt-2 h-6 w-6 text-romantic-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgb(2,6,23)]/80 via-[rgb(2,6,23)]/40 to-transparent" />
    </section>
  );
}
