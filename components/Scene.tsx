import React from "react";
import Ball from "./Ball";
import Bat from "./Bat";

interface SceneProps {
  isSwinging: boolean;
  batPosition: [number, number, number];
  isPitching: boolean;
  onSwingComplete: () => void;
}

export default function Scene({
  isSwinging,
  batPosition,
  isPitching,
  onSwingComplete,
}: SceneProps) {
  return (
    <>
      {/* Ambient lighting - soft overall illumination */}
      <ambientLight intensity={0.3} />

      {/* Directional lighting - simulates stadium lights */}
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />

      {/* Grid helper for ground reference */}
      <gridHelper args={[20, 20, "#444444", "#222222"]} />

      {/* Baseball - pitch when isPitching is true */}
      <Ball isPitching={isPitching} />

      {/* Bat with keyframe animation */}
      <Bat
        isSwinging={isSwinging}
        position={batPosition}
        onSwingComplete={onSwingComplete}
      />
    </>
  );
}
