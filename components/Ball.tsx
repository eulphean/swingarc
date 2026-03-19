import React, { useEffect } from "react";
import { useSpring, animated, config } from "@react-spring/three";
import { usePitchStore } from "../stores/usePitchStore";

const START_POSITION: [number, number, number] = [0, 1, -10];
const END_POSITION: [number, number, number] = [0, 1, 3];
const PITCH_DURATION = 1500; // 1.5 seconds

export default function Ball() {
  const isPitching = usePitchStore((state) => state.isPitching);
  const resetPitch = usePitchStore((state) => state.resetPitch);

  const [springs, api] = useSpring(() => ({
    position: START_POSITION,
    config: config.default,
  }));

  useEffect(() => {
    if (isPitching) {
      // Pitch the ball from start to end position
      api.start({
        position: END_POSITION,
        config: { duration: PITCH_DURATION },
        onRest: () => {
          // When pitch animation completes, reset pitch state
          resetPitch();
        },
      });
    } else {
      // Reset to start position
      api.start({
        position: START_POSITION,
        config: { duration: 0 },
      });
    }
  }, [isPitching, api, resetPitch]);

  return (
    <animated.mesh position={springs.position}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial color="#ffffff" />
    </animated.mesh>
  );
}
