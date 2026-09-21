"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ThreeCanvas } from "@/components/three/ThreeCanvas";
import { OrbitControls, Float, Text } from "@react-three/drei";
import * as THREE from "three";
import { relationshipData } from "@/data/story";
import { motion, useScroll, useTransform } from "framer-motion";

function TimelinePath() {
  const curveRef = useRef<THREE.CatmullRomCurve3>(null);
  const points = [];

  // Create a glowing curve
  for (let i = 0; i <= 100; i++) {
    const t = i / 100;
    points.push(
      new THREE.Vector3(
        (t - 0.5) * 20,
        Math.sin(t * Math.PI) * 3,
        (t - 0.5) * 5
      )
    );
  }

  const curve = new THREE.CatmullRomCurve3(points);

  useFrame(({ clock }) => {
    // Curve doesn't need rotation, but we can use this for other animations
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      {/* Glowing Path */}
      <mesh>
        <tubeGeometry
          args={[curve, 200, 0.1, 8, false]}
          attach="geometry"
        />
        <meshStandardMaterial
          attach="material"
          color="#ec4899"
          emissive="#ec4899"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Milestones */}
      {relationshipData.timeline.milestones.map((milestone, index) => {
        const position = curve.getPointAt(index / (relationshipData.timeline.milestones.length - 1));
        return (
          <group key={index} position={[position.x, position.y, position.z]}>
            <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
              <mesh>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshStandardMaterial
                  color="#fcd34d"
                  emissive="#fcd34d"
                  emissiveIntensity={0.8}
                />
              </mesh>
              
              <Text
                position={[0, 0.8, 0]}
                fontSize={0.5}
                color="#ffffff"
                textAlign="center"
                anchorX="center"
                anchorY="middle"
              >
                {milestone.date}
              </Text>
            </Float>
          </group>
        );
      })}
    </Float>
  );
}

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <section
      id="timeline"
      className="relative min-h-screen flex items-center justify-center py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgb(15,23,42)] via-[rgb(2,6,23)] to-[rgb(15,23,42)]" />

      <div className="container mx-auto px-6 relative z-10">
        <div ref={containerRef}>
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-romantic-400 to-violet-400"
            >
              {relationshipData.timeline.title}
            </motion.h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              A glowing path through time, marking our journey together.
            </p>
          </div>

          {/* 3D Timeline */}
          <div className="h-[600px] rounded-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-romantic-500/5 to-violet-500/5 rounded-2xl" />
            <ThreeCanvas camera={{ position: [0, 2, 15], fov: 45 }}>
              <color attach="background" args={["#0f172a"]} />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} color="#ec4899" />
              <pointLight position={[-10, 10, 10]} intensity={0.8} color="#8b5cf6" />
              <TimelinePath />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </ThreeCanvas>
          </div>

          {/* Timeline Milestones List */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relationshipData.timeline.milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card hover:border-romantic-500/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-romantic-500 to-violet-600 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-serif text-white mb-2">{milestone.title}</h3>
                    <p className="text-romantic-400/70 text-sm mb-3">{milestone.date}</p>
                    <p className="text-white/60">{milestone.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
