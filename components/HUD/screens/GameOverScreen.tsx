import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { colors, spacing, typography } from "../../../constants/designTokens";

interface GameOverScreenProps {
  onPlayAgain: () => void;
  onBackToHome: () => void;
}

export default function GameOverScreen({ onPlayAgain, onBackToHome }: GameOverScreenProps) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>GAME OVER</Text>
      <Text style={styles.subtitle}>(Coming Soon)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing[4],
  },
  title: {
    ...typography.displayLg,
    color: colors.textPrimary,
    marginBottom: spacing[4],
  },
  subtitle: {
    ...typography.bodyLg,
    color: colors.textSecondary,
  },
});
