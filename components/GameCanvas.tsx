import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Canvas, useFrame } from "@react-three/fiber/native";
import { Mesh } from "three";
import RotatingCube from "./RotatingCube";

export default function GameCanvas() {
  return (
    <View style={styles.container}>
      <Canvas
        camera={{
          position: [0, 2, 5],
          fov: 50,
        }}
        gl={{ antialias: false }}
      >
        <Scene />
      </Canvas>
    </View>
  );
}

function Scene() {
  return (
    <>
      {/* Ambient lighting - soft overall illumination */}
      <ambientLight intensity={0.3} />

      {/* Directional lighting - simulates stadium lights */}
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />

      {/* Grid helper for ground reference */}
      <gridHelper args={[20, 20, "#444444", "#222222"]} />

      {/* Rotating cube at origin */}
      <RotatingCube />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
});
