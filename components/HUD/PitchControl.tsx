import React, { useRef, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { usePitchStore } from "../../stores/usePitchStore";
import {
  colors,
  spacing,
  typography,
  components,
  effects,
} from "../../constants/designTokens";

export default function PitchControl() {
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  const countdown = usePitchStore((state) => state.countdown);
  const setCountdown = usePitchStore((state) => state.setCountdown);
  const setBallState = usePitchStore((state) => state.setBallState);
  const isPitching = usePitchStore((state) => state.isPitching);
  const startPitch = usePitchStore((state) => state.startPitch);

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
      setBallState("PITCHING");
    }

    return () => {
      if (countdownTimerRef.current) {
        clearTimeout(countdownTimerRef.current);
      }
    };
  }, [countdown, setCountdown, setBallState]);
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
    <View style={styles.pitchButtonContainer}>
      <TouchableOpacity
        style={styles.pitchButton}
        onPress={startPitch}
        disabled={isPitching}
      >
        <Text style={styles.pitchButtonText}>PITCH</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  countdownContainer: {
    position: "absolute",
    top: "35%",
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  countdownText: {
    fontSize: 120,
    fontWeight: "900",
    color: colors.textSecondary,
    opacity: 0.6,
  },
  pitchButtonContainer: {
    position: "absolute",
    bottom: spacing[6],
    left: spacing[4],
    right: spacing[4],
    alignItems: "center",
    zIndex: 10,
  },
  pitchButton: {
    width: "50%",
    maxWidth: 250,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 3,
    borderColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing[2],
  },
  pitchButtonText: {
    ...typography.labelLg,
    fontSize: 20,
    fontWeight: "700",
    color: colors.primary,
    textAlign: "center",
  },
});
