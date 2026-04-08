import React, { useEffect, useRef } from "react";
import { useSpring, animated, config } from "@react-spring/three";
import { useBatStore } from "../stores/useBatStore";
import { useGameRefs } from "../stores/useGameRefs";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SwingTrail from "./SwingTrail";
import { useGLTF } from "@react-three/drei/native";
import { useAssetStore } from "../stores/useAssetStore";

// Keyframe rotations
const REST_ROTATION = [0.0, 0.3, 0.8];
const LOAD_ROTATION = [0.6, 0, 0.7];
const SWING_ROTATION = [-1.5, 0, 0.9];
const FOLLOW_ROTATION = [-0.3, 0, 0];

const ROTATION_MAP = {
  REST: REST_ROTATION,
  LOAD: LOAD_ROTATION,
  SWING: SWING_ROTATION,
  FOLLOW: FOLLOW_ROTATION,
};

export default function Bat() {
  const isSwinging = useBatStore((state) => state.isSwinging);
  const position = useBatStore((state) => state.position);
  const completeSwing = useBatStore((state) => state.completeSwing);
  const debugRotation = useBatStore((state) => state.debugRotation);
  const setBatTipRef = useGameRefs((state) => state.setBatTipRef);
  const setBatBarrelRef = useGameRefs((state) => state.setBatBarrelRef);
  const setBatLoaded = useAssetStore((state) => state.setBatLoaded);
  const batTipRef = useRef<THREE.Mesh>(null);
  const batBarrelRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Load GLTF model
  const gltf = useGLTF(require("../assets/3D/bat_new.glb")) as any;
  const batModel = gltf.scene.clone();

  const [springs, api] = useSpring(() => ({
    rotation: REST_ROTATION,
    config: config.default,
  }));

  // Store bat tip ref in global store for position tracking
  useEffect(() => {
    if (batTipRef.current) {
      setBatTipRef(batTipRef.current);
    }
    return () => setBatTipRef(null);
  }, [setBatTipRef]);

  // Store bat barrel ref in global store for collision detection
  useEffect(() => {
    if (batBarrelRef.current) {
      setBatBarrelRef(batBarrelRef.current);
    }
    return () => setBatBarrelRef(null);
  }, [setBatBarrelRef]);

  // Report bat model loaded
  useEffect(() => {
    setBatLoaded(true);
    return () => setBatLoaded(false);
  }, [setBatLoaded]);

  useFrame(() => {
    // Does the bat exist?
    if (batTipRef.current) {
      // console.log(batTipRef.current.getWorldPosition(new THREE.Vector3()));
    }
  });

  useEffect(() => {
    // Debug mode - manually set rotation
    if (debugRotation) {
      const targetRotation = ROTATION_MAP[debugRotation];
      api.start({ rotation: targetRotation, config: { duration: 300 } });
      return;
    }

    // Normal swing animation
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
      // REST state - add subtle wobble to show readiness
      api.start({
        from: { rotation: REST_ROTATION },
        to: {
          rotation: [
            REST_ROTATION[0] + 0.05,
            REST_ROTATION[1] + 0.02,
            REST_ROTATION[2] + 0.02,
          ],
        },
        loop: { reverse: true },
        config: {
          duration: 1500,
          easing: (t) => {
            // Smooth ease-in-out for seamless reversing
            return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
          },
        },
      });
    }
  }, [isSwinging, debugRotation, api, completeSwing]);

  return (
    <animated.group position={position} rotation={springs.rotation as any}>
      {/* GLTF Bat Model - pivot is at handle/knob */}
      <primitive object={batModel} scale={0.35} />

      {/* Invisible marker mesh at barrel for collision detection */}
      <mesh ref={batBarrelRef} position={[0, 1.1, 0]} visible={true}>
        <sphereGeometry args={[0.064, 8, 8]} />
      </mesh>

      {/* Barrel tip — tracking point for tip position with trail effect */}
      <SwingTrail
        position={[0, 1.3, 0]}
        visible={false}
        batTipRef={batTipRef}
      />
    </animated.group>
  );
}
