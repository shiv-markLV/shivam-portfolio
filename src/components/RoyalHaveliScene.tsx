"use client";

import { useRef, useEffect, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function HeadquartersScene() {
  const { camera } = useThree();

  useFrame(() => {
    // Keep camera positioned to view the scene
    camera.position.set(0, 8, 18);
    camera.lookAt(0, 2, -5);
  });

  return (
    <>,
      {/* Ground plane - large and visible */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} />
      </mesh>

      {/* Main building - simple box representing the haveli */}
      <mesh position={[0, 4, -5]} castShadow receiveShadow>
        <boxGeometry args={[20, 8, 15]} />
        <meshStandardMaterial color="#c4a678" roughness={0.3} metalness={0.3} />
      </mesh>

      {/* Simple entrance gate */}
      <mesh position={[0, 2, -2]} castShadow receiveShadow>
        <boxGeometry args={[8, 4, 0.5]} />
        <meshStandardMaterial color="#8b5a2b" roughness={0.5} metalness={0.1} />
      </mesh>

      {/* Pillars */}
      <group position={[-5, 1.5, -3]}>
        <mesh>
          <cylinderGeometry args={[1, 4, 1, 16]} />
          <meshStandardMaterial color="#8b5a2b" roughness={0.6} metalness={0.1} />
        </mesh>
      </group>
      <group position={[5, 1.5, -3]}>
        <mesh>
          <cylinderGeometry args={[1, 4, 1, 16]} />
          <meshStandardMaterial color="#8b5a2b" roughness={0.6} metalness={0.1} />
        </mesh>
      </group>

      {/* Debug red cube at origin to verify rendering */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#ff0000" />
      </mesh>
    </>
  );
}