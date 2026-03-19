import React, { useEffect } from "react";
import { useSpring, animated, config } from "@react-spring/three";
import { useBatStore } from "../stores/useBatStore";
import * as THREE from "three";
import { Float } from "react-native/types_generated/Libraries/Types/CodegenTypes";

// Keyframe rotations
const REST_ROTATION = [0.0, 0.3, 0.8];
const LOAD_ROTATION = [0.6, 0, 0.7];
const SWING_ROTATION = [-1.5, 0, 0.9];
const FOLLOW_ROTATION = [-0.3, 0, 0];

export default function Bat() {
  const isSwinging = useBatStore((state) => state.isSwinging);
  const position = useBatStore((state) => state.position);
  const completeSwing = useBatStore((state) => state.completeSwing);
  const [springs, api] = useSpring(() => ({
    rotation: REST_ROTATION,
    config: config.default,
  }));

  useEffect(() => {
    if (isSwinging) {
      // Animate through keyframes: REST -> LOAD -> SWING -> FOLLOW -> REST
      api.start({
        to: async (next) => {
          // LOAD (250ms)
          await next({
            rotation: LOAD_ROTATION,
            config: { duration: 250, easing: (t) => Math.pow(t, 4) },
          });
          // SWING (10ms, explosive)
          await next({
            rotation: SWING_ROTATION,
            config: { duration: 10, easing: (t) => Math.pow(t, 2) },
          });
          // FOLLOW (500ms, smooth deceleration)
          await next({
            rotation: FOLLOW_ROTATION,
            config: { duration: 500, easing: (t) => 1 - Math.pow(1 - t, 4) },
          });
          // Return to REST
          await next({ rotation: REST_ROTATION, config: { duration: 1000 } });

          // Notify completion
          completeSwing();
        },
      });
    } else {
      // Reset to REST immediately when not swinging
      api.start({ rotation: REST_ROTATION, config: { duration: 0 } });
    }
  }, [isSwinging, api, completeSwing]);

  return (
    <animated.group
      position={position}
      rotation={springs.rotation as any}
    >
      {/* Pivot is at Knob [0,0,0], Bat Mesh is offset up */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.06, 0.03, 1, 16]} />
        <meshStandardMaterial color="red" roughness={0.3} />
      </mesh>
      {/* Visual Knob at the Pivot Point */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </animated.group>
  );
}
