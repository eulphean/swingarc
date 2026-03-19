import React from "react";
import { Trail } from "@react-three/drei";
import { useBatStore } from "../stores/useBatStore";
import * as THREE from "three";

/**
 * Trail effect on bat tip during swing
 * Specs: white → blue gradient, width 0.3, length 8, decay 1
 */
interface SwingTrailProps {
  position: [number, number, number];
  visible?: boolean;
  batTipRef?: React.RefObject<THREE.Mesh>;
}

export default function SwingTrail({
  position,
  visible = false,
  batTipRef,
}: SwingTrailProps) {
  const isSwinging = useBatStore((state) => state.isSwinging);

  // Only show trail during swing
  if (!isSwinging) {
    return (
      <mesh ref={batTipRef} position={position} visible={visible}>
        <sphereGeometry args={[0.01]} />
        <meshBasicMaterial />
      </mesh>
    );
  }

  return (
    <Trail
      width={0.05}
      color={"yellow"}
      length={1.5}
      decay={0.5}
      attenuation={(width) => width}
    >
      <mesh ref={batTipRef} position={position} visible={visible}>
        <sphereGeometry args={[0.01]} />
        <meshBasicMaterial />
      </mesh>
    </Trail>
  );
}
