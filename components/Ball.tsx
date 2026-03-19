import React, { useEffect } from "react";
import { useSpring, animated, config } from "@react-spring/three";
import { usePitchStore } from "../stores/usePitchStore";

const START_POSITION: [number, number, number] = [0, 1, -10];
const END_POSITION: [number, number, number] = [
  0, 0.04397094968421644, 2.5799471730269072,
];

const PITCH_DURATION = 2000; // 1.5 seconds

const POSITION_MAP = {
  START: START_POSITION,
  END: END_POSITION,
};

export default function Ball() {
  const isPitching = usePitchStore((state) => state.isPitching);
  const resetPitch = usePitchStore((state) => state.resetPitch);
  const debugPosition = usePitchStore((state) => state.debugPosition);

  const [springs, api] = useSpring(() => ({
    position: START_POSITION,
    config: config.default,
  }));

  useEffect(() => {
    // Debug mode - manually set position
    if (debugPosition) {
      const targetPosition = POSITION_MAP[debugPosition];
      api.start({ position: targetPosition, config: { duration: 300 } });
      return;
    }

    // Normal pitch animation
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
  }, [isPitching, debugPosition, api, resetPitch]);

  return (
    <animated.mesh position={springs.position}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial color="#ffffff" />
    </animated.mesh>
  );
}
