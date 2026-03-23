import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import PitchControl from "./PitchControl";
import BatDebug from "./BatDebug";
import BallDebug from "./BallDebug";
import { useBatStore } from "../../stores/useBatStore";

export default function HUD() {
  const swing = useBatStore((state) => state.swing);

  return (
    <View style={styles.container}>
      {/* Tap area for swinging - covers area above pitch button */}
      <Pressable style={styles.swingArea} onPress={swing} />

      {/* Pitch Control (Button + Countdown) */}
      <PitchControl />

      {/* Bat Debug Control */}
      <BatDebug />

      {/* Ball Debug Control */}
      <BallDebug />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: "box-none", // Allow touches to pass through to Canvas where not covered
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
