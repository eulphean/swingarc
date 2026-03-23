import React from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import GameCanvas from "../../GameCanvas";

interface GameScreenProps {
  onGameOver: () => void;
}

export default function GameScreen({ onGameOver }: GameScreenProps) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <GameCanvas />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
