import React from "react";
import Ball from "./Ball";
import Bat from "./Bat";
import CollisionDetector from "./CollisionDetector";
import ContactParticles from "./ContactParticles";

export default function Scene() {
  return (
    <>
      {/* Ambient lighting - soft overall illumination */}
      <ambientLight intensity={0.3} />

      {/* Directional lighting - simulates stadium lights */}
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />

      {/* Grid helper for ground reference */}
      <gridHelper args={[20, 20, "#444444", "#222222"]} visible={false} />

      {/* Baseball - uses pitch store internally */}
      <Ball scale={2} />

      {/* Bat - uses bat store internally */}
      <Bat />

      {/* Collision detection - checks bat tip distance to ball */}
      <CollisionDetector />

      {/* Contact particles - burst effect at hit point */}
      <ContactParticles />
    </>
  );
}
