import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGameRefs } from "../stores/useGameRefs";
import * as THREE from "three";

/**
 * Visual helper to show bounding boxes for collision debugging
 */
export default function BoundingBoxHelper() {
  const ballRef = useGameRefs((state) => state.ballRef);
  const batBarrelRef = useGameRefs((state) => state.batBarrelRef);

  const ballSphereHelperRef = useRef<THREE.Mesh>(null);
  const batBoxHelperRef = useRef<THREE.LineSegments>(null);

  useFrame(() => {
    if (!ballRef || !batBarrelRef) return;

    // Update ball sphere helper
    if (ballSphereHelperRef.current) {
      // Get world position and scale of the ball mesh
      const worldPosition = new THREE.Vector3();
      const worldScale = new THREE.Vector3();
      ballRef.getWorldPosition(worldPosition);
      ballRef.getWorldScale(worldScale);

      // Ensure bounding sphere is computed
      if (!ballRef.geometry.boundingSphere) {
        ballRef.geometry.computeBoundingSphere();
      }

      if (ballRef.geometry.boundingSphere) {
        // Calculate actual world-space radius
        const baseRadius = ballRef.geometry.boundingSphere.radius;
        const worldRadius = baseRadius * Math.max(worldScale.x, worldScale.y, worldScale.z);

        ballSphereHelperRef.current.position.copy(worldPosition);
        ballSphereHelperRef.current.scale.setScalar(worldRadius);
      }
    }

    // Update bat box helper
    if (batBoxHelperRef.current) {
      const batBox = new THREE.Box3().setFromObject(batBarrelRef);

      // Create box geometry from min/max
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      batBox.getSize(size);
      batBox.getCenter(center);

      // Update helper position and scale
      batBoxHelperRef.current.position.copy(center);
      batBoxHelperRef.current.scale.copy(size);
    }
  });

  return (
    <group>
      {/* Ball sphere helper - green wireframe sphere */}
      <mesh ref={ballSphereHelperRef}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#00ff00" wireframe />
      </mesh>

      {/* Bat box helper - red wireframe box */}
      <lineSegments ref={batBoxHelperRef}>
        <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
        <lineBasicMaterial color="#ff0000" />
      </lineSegments>
    </group>
  );
}
