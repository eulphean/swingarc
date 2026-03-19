import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { useBatStore, DebugRotation } from "../stores/useBatStore";

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
    position: "absolute",
    top: 60,
    right: 20,
    backgroundColor: "rgba(255, 165, 0, 0.2)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "rgba(255, 165, 0, 0.5)",
    zIndex: 10,
  },
  debugButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
