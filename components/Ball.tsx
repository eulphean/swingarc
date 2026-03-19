import React, { useEffect, useRef } from "react";
import { useSpring, animated, config } from "@react-spring/three";
import { usePitchStore } from "../stores/usePitchStore";
import { useGameRefs } from "../stores/useGameRefs";
import * as THREE from "three";

const START_POSITION: [number, number, number] = [0, 1, -10];
const END_POSITION: [number, number, number] = [
  0, 0.04397094968421644, 5.7799471730269072,
];
const HIT_POSITION: [number, number, number] = [5, 3, -5]; // Flies away up and to the right

const PITCH_DURATION = 2000;
const HIT_DURATION = 1000;
const MISS_RESET_DURATION = 0;

const POSITION_MAP = {
  START: START_POSITION,
  END: END_POSITION,
};

export default function Ball() {
  const ballState = usePitchStore((state) => state.ballState);
  const setBallState = usePitchStore((state) => state.setBallState);
  const debugPosition = usePitchStore((state) => state.debugPosition);
  const setBallRef = useGameRefs((state) => state.setBallRef);

  const ballRef = useRef<THREE.Mesh>(null);

  const [springs, api] = useSpring(() => ({
    position: START_POSITION,
    config: config.default,
  }));

  // Store ref in global store for collision detection
  useEffect(() => {
    if (ballRef.current) {
      setBallRef(ballRef.current);
    }
    return () => setBallRef(null);
  }, [setBallRef]);

  useEffect(() => {
    // Debug mode - manually set position
    if (debugPosition) {
      const targetPosition = POSITION_MAP[debugPosition];
      api.start({ position: targetPosition, config: { duration: 300 } });
      return;
    }

    // State machine animations
    if (ballState === "PITCHING") {
      // Pitch the ball from start to end position
      api.start({
        position: END_POSITION,
        config: { duration: PITCH_DURATION },
        onRest: () => {
          // Ball passed without hit
          setBallState("MISS");
        },
      });
    } else if (ballState === "HIT") {
      // Ball was hit - animate to fly-away position
      api.start({
        position: HIT_POSITION,
        config: { duration: HIT_DURATION },
        onRest: () => {
          setBallState("IDLE");
        },
      });
    } else if (ballState === "MISS") {
      // Ball missed - reset to start
      api.start({
        position: START_POSITION,
        config: { duration: MISS_RESET_DURATION },
        onRest: () => {
          setBallState("IDLE");
        },
      });
    } else if (ballState === "IDLE") {
      // Idle - stay at start position
      api.start({
        position: START_POSITION,
        config: { duration: 0 },
      });
    }
  }, [ballState, debugPosition, api, setBallState]);

  return (
    <animated.mesh ref={ballRef} position={springs.position}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial color="#ffffff" />
    </animated.mesh>
  );
}
