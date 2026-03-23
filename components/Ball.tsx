import React, { useEffect, useRef } from "react";
import { useSpring, animated, config } from "@react-spring/three";
import { usePitchStore } from "../stores/usePitchStore";
import { useGameRefs } from "../stores/useGameRefs";
import { useGameLogic } from "../stores/useGameLogic";
import * as THREE from "three";

const START_POSITION: [number, number, number] = [0, 1, -8];
const BASE_END_POSITION: [number, number, number] = [
  0, -0.5, 5.7799471730269072,
];

const PITCH_DURATION = 800;
const HIT_DURATION = 1500;
const MISS_RESET_DURATION = 0;

/**
 * Generate a random end position with x variation between -0.1 and 0.1
 */
function generateRandomEndPosition(): [number, number, number] {
  const xVariation = (Math.random() - 0.5) * 0.5; // Range: -0.1 to 0.1
  return [
    BASE_END_POSITION[0] + xVariation,
    BASE_END_POSITION[1] + xVariation,
    BASE_END_POSITION[2],
  ];
}

/**
 * Calculate the ball's destination after being hit
 * Direction: towards stadium (-z), right (+x for right-handed batter), upward (+y)
 * Adds variation to x and y for more dynamic trajectories
 */
function calculateHitDestination(
  contactPoint: [number, number, number],
): [number, number, number] {
  const [cx, cy, cz] = contactPoint;

  // Add random variation to x and y
  const xVariation = (Math.random() - 0.5) * 4; // ±2 variation in x
  const yVariation = (Math.random() - 0.5) * 3; // ±1.5 variation in y

  // Direction vector: rightward, upward, towards stadium
  const direction = {
    x: 8 + xVariation, // Strong rightward (right-handed batter) with variation
    y: 5 + yVariation, // Upward arc with variation
    z: -40, // Deep into stadium (negative z)
  };

  return [cx + direction.x, cy + direction.y, cz + direction.z];
}

const POSITION_MAP = {
  START: START_POSITION,
  END: BASE_END_POSITION,
};

interface BallProps {
  scale?: number;
}

export default function Ball({ scale = 1 }: BallProps) {
  const ballState = usePitchStore((state) => state.ballState);
  const setBallState = usePitchStore((state) => state.setBallState);
  const debugPosition = usePitchStore((state) => state.debugPosition);
  const hitPoint = usePitchStore((state) => state.hitPoint);
  const setBallRef = useGameRefs((state) => state.setBallRef);

  const addStrike = useGameLogic((state) => state.addStrike);

  const ballRef = useRef<THREE.Mesh>(null);
  const currentEndPositionRef =
    useRef<[number, number, number]>(BASE_END_POSITION);

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
      // Generate a new random end position for this pitch
      currentEndPositionRef.current = generateRandomEndPosition();

      // Pitch the ball from start to end position
      api.start({
        position: currentEndPositionRef.current,
        config: { duration: PITCH_DURATION },
        onRest: () => {
          // Only add a strike if the ball is still in PITCHING state
          // (not interrupted by a HIT)
          if (usePitchStore.getState().ballState === "PITCHING") {
            addStrike();
            setBallState("MISS");
          }
        },
      });
    } else if (ballState === "HIT") {
      // Ball was hit - calculate destination based on contact point
      if (hitPoint) {
        const destination = calculateHitDestination(hitPoint);
        api.start({
          position: destination,
          config: { duration: HIT_DURATION },
          onRest: () => {
            setBallState("IDLE");
          },
        });
      } else {
        // Fallback if hitPoint is somehow not set
        console.warn("HIT state but no hitPoint available");
        setBallState("IDLE");
      }
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
  }, [ballState, debugPosition, hitPoint, api, setBallState]);

  return (
    <animated.mesh ref={ballRef} position={springs.position} scale={scale}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial color="#ffffff" />
    </animated.mesh>
  );
}
