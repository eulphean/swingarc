import React, { useEffect, useState } from "react";
import { Sparkles } from "@react-three/drei";
import { usePitchStore } from "../stores/usePitchStore";

/**
 * Particle effect spawned at contact point when ball is hit
 * Uses Drei Sparkles for burst effect
 */
export default function ContactParticles() {
  const hitPoint = usePitchStore((state) => state.hitPoint);
  const ballState = usePitchStore((state) => state.ballState);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    // Show particles when hit occurs
    if (ballState === "HIT" && hitPoint) {
      setShowParticles(true);

      // Hide particles after brief duration
      const timer = setTimeout(() => {
        setShowParticles(false);
      }, 500); // 500ms particle lifetime

      return () => clearTimeout(timer);
    }
  }, [ballState, hitPoint]);

  // Don't render if no hit point or particles shouldn't be shown
  if (!showParticles || !hitPoint) {
    return null;
  }

  return (
    <Sparkles
      count={30}
      scale={0.5}
      size={3}
      speed={1.5}
      opacity={1}
      color="yellow"
      position={hitPoint}
    />
  );
}
