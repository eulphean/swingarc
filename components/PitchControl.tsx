import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

interface PitchControlProps {
  countdown: number | null;
  isPitching: boolean;
  onPitch: () => void;
}

export default function PitchControl({
  countdown,
  isPitching,
  onPitch,
}: PitchControlProps) {
  // Show countdown if it's active
  if (countdown !== null) {
    return (
      <View style={styles.countdownContainer}>
        <Text style={styles.countdownText}>{countdown}</Text>
      </View>
    );
  }

  // Show pitch button when not counting down or pitching
  return (
    <TouchableOpacity
      style={styles.pitchButton}
      onPress={onPitch}
      disabled={isPitching}
    >
      <Text style={styles.pitchButtonText}>PITCH</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  countdownContainer: {
    position: "absolute",
    bottom: 60,
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.3)",
    zIndex: 10,
  },
  countdownText: {
    color: "#ffffff",
    fontSize: 60,
    fontWeight: "bold",
  },
  pitchButton: {
    position: "absolute",
    bottom: 60,
    alignSelf: "center",
    backgroundColor: "rgba(100, 255, 100, 0.2)",
    paddingHorizontal: 50,
    paddingVertical: 20,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "rgba(100, 255, 100, 0.5)",
    zIndex: 10,
  },
  pitchButtonText: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 2,
  },
});
