import React from "react";
import { StyleSheet, View } from "react-native";
import { Canvas } from "@react-three/fiber/native";
import { Environment } from "@react-three/drei/native";
import Scene from "./Scene";
import { colors } from "../constants/designTokens";

export default function GameCanvas() {
  return (
    <View style={styles.container}>
      <Canvas
        camera={{
          position: [0, 1, 4],
          fov: 90,
        }}
        gl={{ antialias: false }}
      >
        <Environment preset="park" background blur={0.2} />
        <Scene />
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
});
