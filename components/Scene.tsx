import React from "react";
import Ball from "./Ball";
import Bat from "./Bat";
import CollisionDetector from "./CollisionDetector";

export default function Scene() {
  return (
    <>
      {/* Ambient lighting - soft overall illumination */}
      <ambientLight intensity={0.3} />

      {/* Directional lighting - simulates stadium lights */}
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />

      {/* Grid helper for ground reference */}
      <gridHelper args={[20, 20, "#444444", "#222222"]} />

      {/* Baseball - uses pitch store internally */}
      <Ball />

      {/* Bat - uses bat store internally */}
      <Bat />

      {/* Collision detection - checks bat tip distance to ball */}
      <CollisionDetector />
    </>
  );
}
