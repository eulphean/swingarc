import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  colors,
  spacing,
  typography,
  components,
} from "../../../constants/designTokens";

interface HomeScreenProps {
  onPlayPress: () => void;
}

export default function HomeScreen({ onPlayPress }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>SWINGARC</Text>
          <View style={styles.titleUnderline} />
        </View>

        {/* Game Rules Card */}
        <View style={styles.rulesCard}>
          <View style={styles.cardBorderAccent} />
          <View style={styles.cardContent}>
            {/* Game Start Header */}
            <View style={styles.gameStartHeader}>
              <View style={styles.diamondContainer}>
                <View style={styles.diamond} />
                <View style={styles.diamond} />
                <View style={styles.diamond} />
              </View>
              <Text style={styles.gameStartText}>GAME START</Text>
            </View>

            {/* Tap to Swing Instruction */}
            <View style={styles.instructionCard}>
              <Text style={styles.tapIcon}>👆</Text>
              <Text style={styles.instructionText}>TAP ANYWHERE TO SWING</Text>
            </View>

            {/* Hit and Miss Cards */}
            <View style={styles.outcomeContainer}>
              {/* Hit Card */}
              <View style={[styles.outcomeCard, styles.hitCard]}>
                <View style={styles.outcomeHeader}>
                  <View style={styles.hitIcon}>
                    <Text style={styles.hitIconText}>+</Text>
                  </View>
                  <Text style={styles.hitText}>HIT</Text>
                </View>
                <Text style={styles.outcomeValue}>+1RUN</Text>
              </View>

              {/* Miss Card */}
              <View style={[styles.outcomeCard, styles.missCard]}>
                <View style={styles.outcomeHeader}>
                  <View style={styles.missIcon}>
                    <Text style={styles.missIconText}>x</Text>
                  </View>
                  <Text style={styles.missText}>MISS</Text>
                </View>
                <Text style={styles.outcomeValue}>+1STRIKE</Text>
              </View>
            </View>

            {/* Streak Bonus */}
            <View style={styles.streakBonusContainer}>
              <Text style={styles.boltIcon}>⚡</Text>
              <View style={styles.streakTextContainer}>
                <Text style={styles.streakBonusTitle}>STREAK BONUS</Text>
                <View style={styles.streakBonusDescContainer}>
                  <Text style={styles.streakBonusDesc}>
                    2 consecutive hits ={" "}
                  </Text>
                  <View style={[styles.diamond, { marginLeft: spacing[1] }]} />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Play Button */}
        <TouchableOpacity style={styles.playButton} onPress={onPlayPress}>
          <Text style={styles.ballIcon}>⚾</Text>
          <Text style={styles.playButtonText}>PLAY BALL</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footer}>SWINGARC v1.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: spacing[6],
    alignItems: "center",
    justifyContent: "center",
  },

  // Title Section
  titleSection: {
    alignItems: "center",
    width: "100%",
    maxWidth: 480,
    marginBottom: spacing[4],
  },
  title: {
    fontSize: 60,
    fontWeight: "900",
    color: colors.textPrimary,
    letterSpacing: -1,
    fontStyle: "italic",
    // marginBottom: spacing[3],
  },
  titleUnderline: {
    width: "100%",
    height: 3,
    backgroundColor: colors.primary,
    marginTop: spacing[2],
  },

  // Rules Card
  rulesCard: {
    width: "100%",
    maxWidth: 480,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 12,
    marginTop: spacing[3],
    marginBottom: spacing[4],
    flexDirection: "row",
    overflow: "hidden",
  },
  cardBorderAccent: {
    width: 4,
    backgroundColor: colors.primary,
  },
  cardContent: {
    flex: 1,
    padding: spacing[6],
  },

  // Game Start Header
  gameStartHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing[6],
  },
  diamondContainer: {
    flexDirection: "row",
    gap: spacing[2],
    marginRight: spacing[3],
  },
  diamond: {
    width: 12,
    height: 12,
    backgroundColor: colors.primary,
    transform: [{ rotate: "45deg" }],
  },
  gameStartText: {
    ...typography.labelMd,
    color: colors.textSecondary,
  },

  // Instruction Card
  instructionCard: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: 8,
    padding: spacing[4],
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing[6],
  },
  tapIcon: {
    fontSize: 24,
    marginRight: spacing[3],
  },
  instructionText: {
    ...typography.labelMd,
    color: colors.textPrimary,
    flex: 1,
  },

  // Outcome Cards
  outcomeContainer: {
    flexDirection: "row",
    gap: spacing[4],
    marginBottom: spacing[6],
  },
  outcomeCard: {
    flex: 1,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 8,
    padding: spacing[4],
    borderWidth: 1,
  },
  hitCard: {
    borderColor: colors.primary,
  },
  missCard: {
    borderColor: colors.tertiary,
  },
  outcomeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing[2],
  },
  hitIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing[2],
  },
  missIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.tertiary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing[2],
  },
  hitIconText: {
    color: colors.backgroundPrimary,
    fontSize: 14,
    fontWeight: "bold",
  },
  missIconText: {
    color: colors.backgroundPrimary,
    fontSize: 14,
    fontWeight: "bold",
  },
  hitText: {
    ...typography.labelSm,
    color: colors.primary,
  },
  missText: {
    ...typography.labelSm,
    color: colors.tertiary,
  },
  outcomeValue: {
    ...typography.bodyMd,
    color: colors.textPrimary,
    fontWeight: "600",
  },

  // Streak Bonus
  streakBonusContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing[3],
  },
  boltIcon: {
    fontSize: 24,
  },
  streakTextContainer: {
    flex: 1,
  },
  streakBonusTitle: {
    ...typography.labelSm,
    color: colors.secondary,
    marginBottom: spacing[1],
  },
  streakBonusDescContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  streakBonusDesc: {
    ...typography.bodyMd,
    color: colors.textSecondary,
    fontSize: 13,
  },

  // Play Button
  playButton: {
    width: "100%",
    maxWidth: 480,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 3,
    borderColor: colors.primary,
    borderRadius: 16,
    paddingVertical: spacing[6],
    paddingHorizontal: spacing[8],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // marginTop: spacing[4],
    // marginBottom: spacing[8],
    ...(components.primaryButton.shadowColor && {
      shadowColor: components.primaryButton.shadowColor,
      shadowOffset: components.primaryButton.shadowOffset,
      shadowOpacity: components.primaryButton.shadowOpacity,
      shadowRadius: components.primaryButton.shadowRadius,
    }),
  },
  ballIcon: {
    fontSize: 28,
    marginRight: spacing[3],
  },
  playButtonText: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.primary,
    letterSpacing: 2,
  },

  // Footer
  footer: {
    ...typography.labelSm,
    color: colors.textTertiary,
    marginTop: spacing[4],
    // marginBottom: spacing[6],
  },
});
