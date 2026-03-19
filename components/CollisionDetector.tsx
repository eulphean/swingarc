import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGameRefs } from "../stores/useGameRefs";
import { useBatStore } from "../stores/useBatStore";
import { usePitchStore } from "../stores/usePitchStore";
import * as THREE from "three";

/**
 * Collision detection using bounding volume intersection
 *
 * Uses Three.js's built-in collision detection:
 * - Ball: Bounding sphere (natural for a sphere mesh)
 * - Bat barrel: Bounding box (Box3, better for cylinder than sphere)
 *
 * Checks if ball sphere intersects bat barrel bounding box.
 * No manual threshold needed - intersection calculated from geometry.
 */
export default function CollisionDetector() {
  const ballRef = useGameRefs((state) => state.ballRef);
  const batBarrelRef = useGameRefs((state) => state.batBarrelRef);

  const isSwinging = useBatStore((state) => state.isSwinging);
  const ballState = usePitchStore((state) => state.ballState);
  const setBallState = usePitchStore((state) => state.setBallState);
  const setHitPoint = usePitchStore((state) => state.setHitPoint);

  const hasContactOccurred = useRef(false);

  // Reset contact flag when new pitch starts
  useEffect(() => {
    if (ballState === "PITCHING") {
      hasContactOccurred.current = false;
    }
  }, [ballState]);

  useFrame(() => {
    // Only check during active pitch and swing
    if (
      ballState !== "PITCHING" ||
      !isSwinging ||
      hasContactOccurred.current
    ) {
      return;
    }

    if (!ballRef || !batBarrelRef) {
      return;
    }

    // Ensure ball bounding sphere is computed
    if (!ballRef.geometry.boundingSphere) {
      ballRef.geometry.computeBoundingSphere();
    }

    // Get ball bounding sphere in world space
    const ballSphere = new THREE.Sphere();
    ballSphere.copy(ballRef.geometry.boundingSphere);
    ballSphere.applyMatrix4(ballRef.matrixWorld);

    // Get bat barrel bounding box in world space
    const batBox = new THREE.Box3().setFromObject(batBarrelRef);

    // Check for intersection between ball sphere and bat bounding box
    if (batBox.intersectsSphere(ballSphere)) {
      hasContactOccurred.current = true;

      // Store the contact point (ball's center at collision)
      const contactPoint: [number, number, number] = [
        ballSphere.center.x,
        ballSphere.center.y,
        ballSphere.center.z,
      ];
      setHitPoint(contactPoint);
      setBallState("HIT");

      // Log for debugging
      console.log("CONTACT! Ball sphere intersects bat bounding box");
      console.log("Ball position:", ballSphere.center);
      console.log("Ball radius:", ballSphere.radius.toFixed(3));
      console.log("Bat box min:", batBox.min);
      console.log("Bat box max:", batBox.max);
    }
  });

  return null; // This component doesn't render anything
}
