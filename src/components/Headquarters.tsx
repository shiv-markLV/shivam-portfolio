"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Character from "./Character";
import HeadquartersScene from "./RoyalHaveliScene";

const FLOORS = [
  { y: 1.7, rooms: "Ground Floor — Lobby, Courtyard, Reception" },
  { y: 5.05, rooms: "1st Floor — App Desk, Coding Lab, Library" },
  { y: 8.4, rooms: "2nd Floor — UI/UX Studio, Photography" },
  { y: 11.75, rooms: "3rd Floor — AI Lab, NYRA Lab" },
  { y: 15.1, rooms: "4th Floor — Executive Suite, Conference" },
  { y: 18.45, rooms: "5th Floor — 3D Studio, VR Lab" },
  { y: 21.8, rooms: "Roof — Terrace Garden, Pool" },
];

export default function Headquarters() {
  const [floor, setFloor] = useState(0);
  const [elevator, setElevator] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cameraYaw, setCameraYaw] = useState(-Math.PI / 4);
  const [stair, setStair] = useState(0);

  useEffect(() => {
    const onLockChange = () => setPaused(document.pointerLockElement === null);
    document.addEventListener("pointerlockchange", onLockChange);
    return () => document.removeEventListener("pointerlockchange", onLockChange);
  }, []);

  return (
    <section id="headquarters" className="section">
      <div className="container">
        <p className="text-sm tracking-[0.3em] text-muted mb-8">SHIVAM HEADQUARTERS.</p>
        <div className="h-[75vh] md:h-[82vh] rounded-3xl overflow-hidden glass relative">
          <Canvas
            camera={{ position: [0, 8, 18], fov: 55 }}
            shadows
            dpr={[1, 1.5]}
          >
            <HeadquartersScene />
          </Canvas>
          {paused && (
            <div className="absolute inset-0 z-20 bg-black/70 backdrop-blur flex items-center justify-center">
              <div className="glass rounded-2xl p-6 text-white">
                <button
                  onClick={() => document.querySelector("canvas")?.requestPointerLock()}
                  className="w-full px-4 py-2 rounded bg-white/10 hover:bg-white/20"
                >
                  Resume
                </button>
                <p className="mt-2 text-sm text-muted">Click and drag to look around. WASD to move. ESC for pause.</p>
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted">
          <span className="px-3 py-1.5 rounded-full glass">W A S D move</span>
          <span className="px-3 py-1.5 rounded-full glass">Shift run</span>
          <span className="px-3 py-1.5 rounded-full glass">Mouse look</span>
          <span className="px-3 py-1.5 rounded-full glass">E interact</span>
          <span className="px-3 py-1.5 rounded-full glass">F fullscreen</span>
          <span className="px-3 py-1.5 rounded-full glass">Floor: {FLOORS[Math.min(floor, FLOORS.length - 1)].rooms}</span>
          <span className="px-3 py-1.5 rounded-full glass">ELEV: {elevator + 1}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {FLOORS.map((f, i) => (
            <button
              key={i}
              onClick={() => { setFloor(i); setElevator(i); }}
              className="px-3 py-1.5 rounded-full glass text-xs"
            >
              {(i + 1).toString().padStart(2, "0")}
            </button>
          ))}
          <button
            onClick={() => { setElevator(Math.max(0, elevator - 1)); setFloor(Math.max(0, elevator - 1)); }}
            className="px-3 py-1.5 rounded-full glass bg-white/10"
          >
            ↑
          </button>
          <button
            onClick={() => { setElevator(Math.min(FLOORS.length - 1, elevator + 1)); setFloor(Math.min(FLOORS.length - 1, elevator + 1)); }}
            className="px-3 py-1.5 rounded-full glass bg-white/10"
          >
            ↓
          </button>
        </div>
      </div>
    </section>
  );
}