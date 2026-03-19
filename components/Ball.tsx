import React from "react";
import { Vector3, Euler } from "three";

interface BallProps {
  position?: [number, number, number] | Vector3;
  rotation?: [number, number, number] | Euler;
  scale?: [number, number, number] | Vector3;
}

export default function Ball({
  position = [0, 1, -50],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
}: BallProps) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  );
}
