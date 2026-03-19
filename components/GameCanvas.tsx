import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Canvas } from "@react-three/fiber/native";
import Ball from "./Ball";
import Bat from "./Bat";

export default function GameCanvas() {
  const [isSwinging, setIsSwinging] = useState(false);

  const batPosition: [number, number, number] = [0.55, 0.0, 3.2];

  const handleSwing = () => {
    if (isSwinging) return;
    setIsSwinging(true);
  };

  const handleSwingComplete = () => {
    setIsSwinging(false);
  };

  return (
    <View style={styles.container}>
      <Canvas
        camera={{
          position: [0, 1, 4],
          fov: 90,
        }}
        gl={{ antialias: false }}
      >
        <Scene isSwinging={isSwinging} batPosition={batPosition} onSwingComplete={handleSwingComplete} />
      </Canvas>

      {/* Swing Button */}
      <TouchableOpacity
        style={styles.swingButton}
        onPress={handleSwing}
        disabled={isSwinging}
      >
        <Text style={styles.swingButtonText}>
          {isSwinging ? "SWINGING..." : "SWING"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

interface SceneProps {
  isSwinging: boolean;
  batPosition: [number, number, number];
  onSwingComplete: () => void;
}

function Scene({ isSwinging, batPosition, onSwingComplete }: SceneProps) {
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

      {/* Bat with keyframe animation */}
      <Bat isSwinging={isSwinging} position={batPosition} onSwingComplete={onSwingComplete} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  swingButton: {
    position: "absolute",
    bottom: 60,
    alignSelf: "center",
    backgroundColor: "rgba(255, 100, 100, 0.2)",
    paddingHorizontal: 50,
    paddingVertical: 20,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "rgba(255, 100, 100, 0.5)",
  },
  swingButtonText: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 2,
  },
});
