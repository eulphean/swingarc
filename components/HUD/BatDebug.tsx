import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { useBatStore, DebugRotation } from "../../stores/useBatStore";
import { colors, spacing, typography, components } from "../../constants/designTokens";

const rotations: Array<Exclude<DebugRotation, null>> = ["REST", "LOAD", "SWING", "FOLLOW"];

export default function BatDebug() {
  const [currentRotation, setCurrentRotation] = React.useState<Exclude<DebugRotation, null>>("REST");
  const setDebugRotation = useBatStore((state) => state.setDebugRotation);

  const cycleRotation = () => {
    const currentIndex = rotations.indexOf(currentRotation);
    const nextIndex = (currentIndex + 1) % rotations.length;
    const nextRotation = rotations[nextIndex];
    setCurrentRotation(nextRotation);
    setDebugRotation(nextRotation);
  };

  return (
    <TouchableOpacity style={styles.debugButton} onPress={cycleRotation}>
      <Text style={styles.debugButtonText}>
        BAT: {currentRotation}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  debugButton: {
    ...components.debugButton,
    borderColor: colors.secondary,
    borderWidth: 1,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    minWidth: 80,
  },
  debugButtonText: {
    ...typography.labelSm,
    color: colors.textPrimary,
    fontSize: 10,
  },
});
