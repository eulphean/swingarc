import React, { useRef } from "react";
import { Group, Vector3, Euler } from "three";

interface BatProps {
  position?: [number, number, number] | Vector3;
  rotation?: [number, number, number] | Euler;
  scale?: [number, number, number] | Vector3;
}

export default function Bat({
  position = [0, 0, 0],
  rotation = [0, 0, -Math.PI / 4],
  scale = [1, 1, 1],
}: BatProps) {
  const batRef = useRef<Group>(null);

  return (
    <group ref={batRef} scale={scale} position={position} rotation={rotation}>
      {/* Handle - positioned from the pivot point (knob) */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.02, 0.025, 0.6, 8]} />
        <meshStandardMaterial color="#FF4513" />
      </mesh>

      {/* Barrel - positioned above the handle */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.035, 0.03, 0.25, 8]} />
        <meshStandardMaterial color="#FF4513" />
      </mesh>

      {/* Knob - small sphere at the pivot point */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
    </group>
  );
}
