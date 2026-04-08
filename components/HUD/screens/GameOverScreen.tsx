import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { colors, spacing, typography } from "../../../constants/designTokens";
import { useGameLogic } from "../../../stores/useGameLogic";

interface GameOverScreenProps {
  onPlayAgain: () => void;
  onBackToHome: () => void;
}

export default function GameOverScreen({
  onPlayAgain,
  onBackToHome,
}: GameOverScreenProps) {
  const resetGame = useGameLogic((state) => state.resetGame);
  const runs = useGameLogic((state) => state.runs);
  const pitches = useGameLogic((state) => state.pitches);
  const bestStreak = useGameLogic((state) => state.bestStreak);

  // Calculate accuracy: (hits / pitches) * 100
  const accuracy = pitches > 0 ? Math.round((runs / pitches) * 100) : 0;

  const handlePlayAgain = () => {
    resetGame();
    onPlayAgain();
  };

  const handleBackToHome = () => {
    resetGame();
    onBackToHome();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>GAME OVER</Text>
      </View>

      {/* Final Score */}
      <View style={styles.scoreSection}>
        <Text style={styles.scoreLabel}>FINAL SCORE</Text>
        <Text style={styles.scoreValue}>{runs}</Text>
      </View>

      {/* Stats Card */}
      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>ACCURACY</Text>
          <Text style={styles.statValue}>
            {accuracy}
            <Text style={styles.statPercent}>%</Text>
          </Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>BEST STREAK</Text>
          <Text style={[styles.statValue, styles.statValueHighlight]}>
            {bestStreak}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.tryAgainButton}
          onPress={handlePlayAgain}
        >
          <Text style={styles.tryAgainIcon}>↻</Text>
          <Text style={styles.tryAgainText}>TRY AGAIN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.homeButton} onPress={handleBackToHome}>
          <Text style={styles.homeIcon}>⌂</Text>
          <Text style={styles.homeText}>HOME</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>SWINGARC V1.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing[6],
  },

  // Header
  header: {
    alignItems: "center",
    marginBottom: spacing[8],
    width: "100%",
  },
  title: {
    fontSize: 52,
    fontWeight: "900",
    fontStyle: "italic",
    color: colors.textPrimary,
    letterSpacing: 2,
    marginBottom: spacing[2],
    textAlign: "center",
  },
  subtitle: {
    ...typography.labelSm,
    color: colors.textTertiary,
    letterSpacing: 3,
    fontSize: 11,
    textAlign: "center",
  },

  // Score Section
  scoreSection: {
    alignItems: "center",
    marginBottom: spacing[8],
  },
  scoreLabel: {
    ...typography.labelSm,
    color: colors.textSecondary,
    letterSpacing: 3,
    fontSize: 11,
    marginBottom: spacing[4],
  },
  scoreValue: {
    fontSize: 140,
    fontWeight: "900",
    color: colors.secondary,
    textShadowColor: colors.secondary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 40,
    lineHeight: 140,
  },

  // Stats Card
  statsCard: {
    flexDirection: "row",
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 12,
    paddingVertical: spacing[6],
    paddingHorizontal: spacing[6],
    marginBottom: spacing[8],
    width: "100%",
    maxWidth: 450,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.outlineVariant,
    marginHorizontal: spacing[4],
  },
  statLabel: {
    ...typography.labelSm,
    color: colors.textSecondary,
    fontSize: 10,
    letterSpacing: 2,
    marginBottom: spacing[2],
  },
  statValue: {
    fontSize: 48,
    fontWeight: "900",
    color: colors.textPrimary,
  },
  statPercent: {
    fontSize: 24,
    fontWeight: "700",
  },
  statValueHighlight: {
    color: colors.secondary,
  },

  // Buttons
  buttonContainer: {
    width: "100%",
    maxWidth: 450,
    gap: spacing[3],
  },
  tryAgainButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[6],
    borderRadius: 12,
    gap: spacing[3],
  },
  tryAgainIcon: {
    fontSize: 24,
    color: colors.backgroundPrimary,
    fontWeight: "700",
  },
  tryAgainText: {
    ...typography.labelLg,
    fontSize: 18,
    fontWeight: "700",
    color: colors.backgroundPrimary,
    letterSpacing: 2,
  },
  homeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 2,
    borderColor: colors.outlineVariant,
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[6],
    borderRadius: 12,
    gap: spacing[3],
  },
  homeIcon: {
    fontSize: 24,
    color: colors.textSecondary,
    fontWeight: "700",
  },
  homeText: {
    ...typography.labelLg,
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
    letterSpacing: 2,
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: spacing[6],
    ...typography.labelSm,
    color: colors.textTertiary,
    fontSize: 10,
    letterSpacing: 2,
  },
});
