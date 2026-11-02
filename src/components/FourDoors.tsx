"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Html } from "@react-three/drei";
import * as THREE from "three";
import { worlds } from "@/lib/worlds";
import Link from "next/link";

const positions = [-6, -2, 2, 6];

function Hallway() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#0b0f1a" metalness={0.2} roughness={0.15} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 5, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#0a0d18" />
      </mesh>
      <mesh position={[0, 2.5, -8]}>
        <planeGeometry args={[40, 5]} />
        <meshStandardMaterial color="#0d1120" />
      </mesh>
      <mesh position={[-12, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[40, 5]} />
        <meshStandardMaterial color="#0d1120" />
      </mesh>
      <mesh position={[12, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[40, 5]} />
        <meshStandardMaterial color="#0d1120" />
      </mesh>
      {[...Array(8)].map((_, i) => (
        <pointLight key={i} position={[-14 + i * 4, 0.1, 0]} intensity={0.3} color="#7c5cff" distance={6} />
      ))}
    </group>
  );
}

function Interior({ index }: { index: number }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) group.current.rotation.y = state.clock.getElapsedTime() * 0.15;
  });

  const objects = useMemo(() => {
    if (index === 0) {
      return [...Array(6)].map((_, i) => (
        <mesh key={i} position={[Math.cos(i) * 1.5, 1 + Math.sin(i * 2) * 0.6, Math.sin(i) * 1.5]}>
          <boxGeometry args={[0.6, 1.1, 0.08]} />
          <meshStandardMaterial color="#4f8cff" emissive="#4f8cff" emissiveIntensity={0.2} metalness={0.5} roughness={0.3} />
        </mesh>
      ));
    }
    if (index === 1) {
      return [...Array(5)].map((_, i) => (
        <mesh key={i} position={[Math.cos(i * 1.3) * 1.8, 1 + i * 0.2, Math.sin(i * 1.3) * 1.8]}>
          <planeGeometry args={[1.2, 0.7]} />
          <meshStandardMaterial color="#b8a9ff" emissive="#b8a9ff" emissiveIntensity={0.15} side={THREE.DoubleSide} />
        </mesh>
      ));
    }
    if (index === 2) {
      return [...Array(12)].map((_, i) => (
        <mesh key={i} position={[Math.cos(i * 0.8) * 2, 1 + Math.sin(i) * 0.8, Math.sin(i * 0.8) * 2]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#7c5cff" emissive="#7c5cff" emissiveIntensity={0.6} />
        </mesh>
      ));
    }
    return [...Array(4)].map((_, i) => (
      <mesh key={i} position={[Math.cos(i * 1.5) * 1.6, 1.2 + i * 0.3, Math.sin(i * 1.5) * 1.6]}>
        <torusKnotGeometry args={[0.4, 0.12, 64, 16]} />
        <meshStandardMaterial color="#8a7cff" emissive="#8a7cff" emissiveIntensity={0.25} metalness={0.8} roughness={0.2} />
      </mesh>
    ));
  }, [index]);

  return (
    <group ref={group} position={[0, 0, 0]}>
      <pointLight position={[0, 2.5, 0]} intensity={1.2} color="#7c5cff" distance={8} />
      {objects}
    </group>
  );
}

function Scene({ active, setActive }: { active: number | null; setActive: (n: number | null) => void }) {
  const doorRefs = useRef<THREE.Group[]>([]);
  const progress = useRef(0);
  const { camera } = useThree();

  useFrame((state, delta) => {
    const target = active === null ? 0 : 1;
    progress.current += (target - progress.current) * Math.min(1, delta * 2.5);
    const p = progress.current;

    doorRefs.current.forEach((g, i) => {
      if (!g) return;
      if (i === active) g.rotation.y = -p * (Math.PI / 2.1);
      else g.rotation.y = 0;
    });

    if (active === null) {
      camera.position.lerp(new THREE.Vector3(0, 1.7, 11), 0.06);
      camera.lookAt(0, 1.7, 0);
    } else {
      const x = positions[active];
      camera.position.lerp(new THREE.Vector3(x, 1.7, 11 - p * 13), 0.06);
      camera.lookAt(x, 1.7, -4);
    }
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 10, 6]} intensity={1.4} castShadow />
      <Environment preset="city" />

      <Hallway />

      {worlds.map((w, i) => {
        const x = positions[i];
        return (
          <group key={w.slug} position={[x, 0, 0]}>
            <mesh position={[0, 1.8, 0]}>
              <boxGeometry args={[2.3, 3.8, 0.2]} />
              <meshStandardMaterial color="#111827" metalness={0.5} roughness={0.5} />
            </mesh>
            <group ref={(el) => { if (el) doorRefs.current[i] = el; }} position={[-1.05, 0, 0.12]}>
              <mesh position={[1, 1.8, 0]}>
                <boxGeometry args={[2, 3.6, 0.12]} />
                <meshStandardMaterial color={i === 0 ? "#7c5cff" : i === 1 ? "#4f8cff" : i === 2 ? "#b8a9ff" : "#8a7cff"} metalness={0.75} roughness={0.2} />
              </mesh>
              <mesh position={[1.8, 1.8, 0.1]}>
                <cylinderGeometry args={[0.06, 0.06, 0.14, 16]} />
                <meshStandardMaterial color="#f1f5f9" metalness={1} roughness={0.15} />
              </mesh>
              <mesh position={[1, 1.8, 0.08]} onClick={() => setActive(i)}>
                <boxGeometry args={[2, 3.6, 0.2]} />
                <meshBasicMaterial transparent opacity={0} />
              </mesh>
            </group>
            <group position={[0, 0, -4]}>
              <mesh position={[0, 1.8, 0]}>
                <boxGeometry args={[5, 3.6, 5]} />
                <meshStandardMaterial color="#0a0d18" side={THREE.BackSide} />
              </mesh>
              <Interior index={i} />
            </group>
          </group>
        );
      })}

      {active !== null && (
        <Html center position={[positions[active], 1.8, -3]}>
          <div className="glass rounded-2xl p-6 w-72 text-white">
            <p className="text-accent font-mono text-xs">{worlds[active].num}</p>
            <h3 className="font-display text-2xl font-bold mt-1">{worlds[active].title}</h3>
            <p className="mt-2 text-sm text-muted">{worlds[active].subtitle}</p>
            <p className="mt-3 text-sm text-white/80">{worlds[active].theme}</p>
            <div className="mt-4 flex gap-2">
              <Link href={`/worlds/${worlds[active].slug}`} className="px-4 py-2 rounded-full bg-white text-black text-sm font-medium">
                Enter
              </Link>
              <button onClick={() => setActive(null)} className="px-4 py-2 rounded-full glass text-sm">
                Close
              </button>
            </div>
          </div>
        </Html>
      )}
    </>
  );
}

export default function FourDoors() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section id="worlds" className="section">
      <div className="container">
        <p className="text-sm tracking-[0.3em] text-muted mb-8">FOUR DOORS. FOUR WORLDS.</p>
        <div className="h-[72vh] md:h-[80vh] rounded-3xl overflow-hidden glass">
          <Canvas camera={{ position: [0, 1.7, 11], fov: 50 }} shadows dpr={[1, 1.5]}>
            <Scene active={active} setActive={setActive} />
          </Canvas>
        </div>
        <p className="mt-4 text-sm text-muted">Click a door to open it.</p>
      </div>
    </section>
  );
}
