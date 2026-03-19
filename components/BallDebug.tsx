import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { usePitchStore, DebugPosition } from "../stores/usePitchStore";

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
    top: 110,
    right: 20,
    backgroundColor: "rgba(0, 165, 255, 0.2)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "rgba(0, 165, 255, 0.5)",
    zIndex: 10,
  },
  debugButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
