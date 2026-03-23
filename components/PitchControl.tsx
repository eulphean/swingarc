import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { usePitchStore } from "../stores/usePitchStore";
import { colors, spacing, typography, components, effects } from "../constants/designTokens";

export default function PitchControl() {
  const countdown = usePitchStore((state) => state.countdown);
  const isPitching = usePitchStore((state) => state.isPitching);
  const startPitch = usePitchStore((state) => state.startPitch);
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
      onPress={startPitch}
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
    ...effects.glass,
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.outlineVariant,
    zIndex: 10,
  },
  countdownText: {
    ...typography.displayLg,
    color: colors.textPrimary,
  },
  pitchButton: {
    position: "absolute",
    bottom: 60,
    alignSelf: "center",
    ...components.primaryButton,
    zIndex: 10,
  },
  pitchButtonText: {
    ...typography.labelLg,
    color: colors.textPrimary,
  },
});
