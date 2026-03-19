import React from "react";
import { StyleSheet, View } from "react-native";
import { Canvas } from "@react-three/fiber/native";
import Ball from "./Ball";
import Bat from "./Bat";

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

      {/* Baseball at starting position */}
      <Ball position={[0, 0, -10]} />

      {/* Bat in lower-right position */}
      <Bat
        position={[0.9, -0.2, 3]}
        rotation={[0, 0, Math.PI / 4]}
        scale={[1.75, 1.75, 1.75]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
});
