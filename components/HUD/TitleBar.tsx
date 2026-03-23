import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors, spacing, typography } from "../../constants/designTokens";

interface TitleBarProps {
  strikes: number;
  runs: number;
}

export default function TitleBar({ strikes, runs }: TitleBarProps) {
  return (
    <View style={styles.container}>
      {/* Left side - Strikes */}
      <View style={styles.leftSection}>
        <View style={styles.strikesContainer}>
          {[0, 1, 2].map((index) => (
            <View
              key={index}
              style={[
                styles.strikeDiamond,
                index >= strikes && styles.strikeDiamondActive,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Right side - Runs */}
      <View style={styles.rightSection}>
        <Text style={styles.runsLabel}>RUNS</Text>
        <Text style={styles.runsValue}>{runs}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing[4],
    paddingTop: 50, // Status bar height
    paddingBottom: spacing[4],
    backgroundColor: colors.surfaceContainerLow,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
    zIndex: 10,
  },

  // Left Section
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
  },
  streakIcon: {
    padding: spacing[2],
    backgroundColor: colors.primaryContainer,
    borderRadius: 6,
  },
  streakDiamond: {
    width: 14,
    height: 14,
    backgroundColor: colors.primary,
    transform: [{ rotate: "45deg" }],
  },
  strikesContainer: {
    flexDirection: "row",
    gap: spacing[2],
  },
  strikeDiamond: {
    width: 16,
    height: 16,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.primary,
    transform: [{ rotate: "45deg" }],
  },
  strikeDiamondActive: {
    backgroundColor: colors.primary,
  },

  // Right Section
  rightSection: {
    alignItems: "flex-end",
  },
  runsLabel: {
    ...typography.labelSm,
    color: colors.textSecondary,
    fontSize: 10,
    marginBottom: 2,
  },
  runsValue: {
    ...typography.displayMd,
    color: colors.secondary,
    fontSize: 32,
    fontWeight: "900",
    lineHeight: 32,
  },
});
