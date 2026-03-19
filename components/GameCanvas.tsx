import React, { useRef, useEffect } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { Canvas } from "@react-three/fiber/native";
import Scene from "./Scene";
import PitchControl from "./PitchControl";
import { useBatStore } from "../stores/useBatStore";
import { usePitchStore } from "../stores/usePitchStore";

export default function GameCanvas() {
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Bat store
  const swing = useBatStore((state) => state.swing);

  // Pitch store
  const countdown = usePitchStore((state) => state.countdown);
  const setCountdown = usePitchStore((state) => state.setCountdown);
  const setIsPitching = usePitchStore((state) => state.setIsPitching);

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
  }, [countdown, setCountdown, setIsPitching]);

  return (
    <View style={styles.container}>
      <Canvas
        camera={{
          position: [0, 1, 4],
          fov: 90,
        }}
        gl={{ antialias: false }}
      >
        <Scene />
      </Canvas>

      {/* Tap area for swinging - covers area above pitch button */}
      <Pressable style={styles.swingArea} onPress={swing} />

      {/* Pitch Control (Button + Countdown) */}
      <PitchControl />
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
