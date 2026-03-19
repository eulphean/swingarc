import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { Canvas } from "@react-three/fiber/native";
import Scene from "./Scene";
import PitchControl from "./PitchControl";

export default function GameCanvas() {
  const [isSwinging, setIsSwinging] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isPitching, setIsPitching] = useState(false);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  const batPosition: [number, number, number] = [0.55, 0.0, 3.2];

  const handleSwing = () => {
    if (isSwinging) return;
    setIsSwinging(true);
  };

  const handleSwingComplete = () => {
    setIsSwinging(false);
  };

  const handlePitch = () => {
    // Reset state
    setCountdown(3);
    setIsPitching(false);
    setIsSwinging(false);
  };

  // Countdown timer effect
  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      countdownTimerRef.current = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else {
      // Countdown finished, start pitching
      setCountdown(null);
      setIsPitching(true);
    }

    return () => {
      if (countdownTimerRef.current) {
        clearTimeout(countdownTimerRef.current);
      }
    };
  }, [countdown]);

  return (
    <View style={styles.container}>
      <Canvas
        camera={{
          position: [0, 1, 4],
          fov: 90,
        }}
        gl={{ antialias: false }}
      >
        <Scene
          isSwinging={isSwinging}
          batPosition={batPosition}
          isPitching={isPitching}
          onSwingComplete={handleSwingComplete}
        />
      </Canvas>

      {/* Tap area for swinging - covers area above pitch button */}
      <Pressable style={styles.swingArea} onPress={handleSwing} />

      {/* Pitch Control (Button + Countdown) */}
      <PitchControl
        countdown={countdown}
        isPitching={isPitching}
        onPitch={handlePitch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  swingArea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 150, // Leave space for pitch button at bottom
    zIndex: 1,
  },
});
