"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const FLOORS = [
  1.7,
  5.05,
  8.4,
  11.75,
  15.1,
  18.45,
  21.8,
];

export default function Character({ floor, stairOffset }: { floor: number; stairOffset: number }) {
  const root = useRef<THREE.Group>(null);
  const keys = useRef<Record<string, boolean>>({});
  const time = useRef(0);

  useEffect(() => {
    const down = (e: KeyboardEvent) => { keys.current[e.code] = true; };
    const up = (e: KeyboardEvent) => { keys.current[e.code] = false; };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useFrame(() => {
    const node = root.current;
    if (!node) return;
    const speed = (keys.current["ShiftLeft"] || keys.current["ShiftRight"] ? 2 : 1) * 2.6;
    const forward = keys.current["KeyW"] ? 1 : keys.current["KeyS"] ? -1 : 0;
    const side = keys.current["KeyA"] ? -1 : keys.current["KeyD"] ? 1 : 0;

    node.position.x += (-forward * Math.sin(node.position.y) + side * Math.cos(node.position.y)) * speed * 0.05;
    node.position.z += (forward * Math.cos(node.position.y) + side * Math.sin(node.position.y)) * speed * 0.05;
    node.position.x = Math.max(-15, Math.min(15, node.position.x));
    node.position.z = Math.max(-20, Math.min(12, node.position.z));

    time.current += 0.05;
    const cycle = time.current * (speed * 1.2 + 0.5);
    const swing = Math.sin(cycle) * 0.5;
    const swingLegs = Math.sin(cycle) * (FLOORS[Math.min(floor, FLOORS.length - 1)] === 1.7 ? 0.15 : 0.5);

    const legL = node.children.find((c) => c.name === "thighL") as THREE.Group | undefined;
    const legR = node.children.find((c) => c.name === "thighR") as THREE.Group | undefined;
    const footL = node.children.find((c) => c.name === "shankL") as THREE.Group | undefined;
    const footR = node.children.find((c) => c.name === "shankR") as THREE.Group | undefined;
    const armL = node.children.find((c) => c.name === "upperL") as THREE.Group | undefined;
    const armR = node.children.find((c) => c.name === "upperR") as THREE.Group | undefined;

    if (legL) legL.rotation.x = swingLegs;
    if (legR) legR.rotation.x = -swingLegs;
    if (footL) footL.rotation.x = Math.sin(cycle * 1.2) * 0.5;
    if (footR) footR.rotation.x = -Math.sin(cycle * 1.2) * 0.5;
    if (armL) armL.rotation.x = -swing * 0.9;
    if (armR) armR.rotation.x = swing * 0.9;

    const targetY = FLOORS[Math.min(floor, FLOORS.length - 1)] + stairOffset;
    if (node.position.y !== targetY) {
      node.position.y += (targetY - node.position.y) * 0.09;
    } else {
      node.position.y = targetY;
    }
  });

  return (
    <group ref={root}>
      <group name="root">
        <mesh position={[0, 1.7, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#8a6f5a" roughness={0.4} metalness={0.05} />
        </mesh>
        <group name="torso" position={[0, 0.4, 0]}>
          <mesh>
            <boxGeometry args={[0.6, 0.9, 0.45]} />
            <meshStandardMaterial color="#3a2a1a" roughness={0.35} metalness={0.1} />
          </mesh>
          <group name="upperL" position={[0, 0.55, 0]}>
            <mesh>
              <cylinderGeometry args={[0.12, 0.14, 0.55]} />
              <meshStandardMaterial color="#3a2a1a" roughness={0.3} metalness={0.1} />
            </mesh>
          </group>
          <group name="upperR" position={[0, 0.55, 0]}>
            <mesh>
              <cylinderGeometry args={[0.12, 0.14, 0.55]} />
              <meshStandardMaterial color="#3a2a1a" roughness={0.3} metalness={0.1} />
            </mesh>
          </group>
        </group>
        <group name="pelvis" position={[0, -0.35, 0]}>
          <mesh>
            <cylinderGeometry args={[0.5, 0.55, 0.5, 12]} />
            <meshStandardMaterial color="#3a2a1a" roughness={0.35} metalness={0.1} />
          </mesh>
          <group name="thighL" position={[0, -0.8, 0]}>
            <mesh>
              <cylinderGeometry args={[0.16, 0.18, 0.6]} />
              <meshStandardMaterial color="#3a2a1a" roughness={0.3} metalness={0.1} />
            </mesh>
            <group name="shankL" position={[0, -0.75, 0]}>
              <mesh>
                <cylinderGeometry args={[0.11, 0.11, 0.75]} />
                <meshStandardMaterial color="#2a1a0a" roughness={0.4} metalness={0.1} />
              </mesh>
              <group name="footL" position={[0, -0.4, 0]}>
                <mesh>
                  <boxGeometry args={[0.22, 0.08, 0.3]} />
                  <meshStandardMaterial color="#1c140a" roughness={0.6} />
                </mesh>
              </group>
            </group>
          </group>
          <group name="thighR" position={[0, -0.8, 0]}>
            <mesh>
              <cylinderGeometry args={[0.16, 0.18, 0.6]} />
              <meshStandardMaterial color="#3a2a1a" roughness={0.3} metalness={0.1} />
            </mesh>
            <group name="shankR" position={[0, -0.75, 0]}>
              <mesh>
                <cylinderGeometry args={[0.11, 0.11, 0.75]} />
                <meshStandardMaterial color="#2a1a0a" roughness={0.4} metalness={0.1} />
              </mesh>
              <group name="footR" position={[0, -0.4, 0]}>
                <mesh>
                  <boxGeometry args={[0.22, 0.08, 0.3]} />
                  <meshStandardMaterial color="#1c140a" roughness={0.6} />
                </mesh>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}
