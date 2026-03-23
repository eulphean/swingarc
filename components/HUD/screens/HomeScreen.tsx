import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { colors, spacing, typography, components } from "../../../constants/designTokens";

interface HomeScreenProps {
  onPlayPress: () => void;
}

export default function HomeScreen({ onPlayPress }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Title */}
      <Text style={styles.title}>SWINGARC</Text>

      {/* Play Button */}
      <TouchableOpacity style={styles.playButton} onPress={onPlayPress}>
        <Text style={styles.playButtonText}>PLAY BALL</Text>
      </TouchableOpacity>
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
    marginBottom: spacing[16],
  },
  playButton: {
    ...components.primaryButton,
    paddingHorizontal: spacing[16],
    paddingVertical: spacing[6],
  },
  playButtonText: {
    ...typography.labelLg,
    color: colors.textPrimary,
  },
});
