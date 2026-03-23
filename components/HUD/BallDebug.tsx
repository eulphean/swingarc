import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { usePitchStore, DebugPosition } from "../../stores/usePitchStore";
import { colors, spacing, typography, components } from "../../constants/designTokens";

const positions: Array<Exclude<DebugPosition, null>> = ["START", "END"];

export default function BallDebug() {
  const [currentPosition, setCurrentPosition] = React.useState<Exclude<DebugPosition, null>>("START");
  const setDebugPosition = usePitchStore((state) => state.setDebugPosition);

  const cyclePosition = () => {
    const currentIndex = positions.indexOf(currentPosition);
    const nextIndex = (currentIndex + 1) % positions.length;
    const nextPosition = positions[nextIndex];
    setCurrentPosition(nextPosition);
    setDebugPosition(nextPosition);
  };

  return (
    <TouchableOpacity style={styles.debugButton} onPress={cyclePosition}>
      <Text style={styles.debugButtonText}>
        BALL: {currentPosition}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  debugButton: {
    position: "absolute",
    top: spacing[20],
    right: spacing[4],
    ...components.debugButton,
    borderColor: colors.primary,
    borderWidth: 2,
    zIndex: 10,
  },
  debugButtonText: {
    ...typography.labelSm,
    color: colors.textPrimary,
  },
});
