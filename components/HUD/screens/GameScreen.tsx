import React, { useEffect } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import GameCanvas from "../../GameCanvas";
import TitleBar from "../TitleBar";
import PitchControl from "../PitchControl";
import BatDebug from "../BatDebug";
import BallDebug from "../BallDebug";
import LoadingScreen from "../LoadingScreen";
import { useBatStore } from "../../../stores/useBatStore";
import { useGameLogic } from "../../../stores/useGameLogic";
import { useAssetStore } from "../../../stores/useAssetStore";

interface GameScreenProps {
  onGameOver: () => void;
}

export default function GameScreen({ onGameOver }: GameScreenProps) {
  const swing = useBatStore((state) => state.swing);

  // Game state from store
  const strikes = useGameLogic((state) => state.strikes);
  const runs = useGameLogic((state) => state.runs);
  const isGameOver = useGameLogic((state) => state.isGameOver);

  // Asset loading state
  const allAssetsLoaded = useAssetStore((state) => state.allAssetsLoaded);

  // Check for game over
  useEffect(() => {
    if (isGameOver) {
      onGameOver();
    }
  }, [isGameOver, onGameOver]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* 3D Game Canvas */}
      <GameCanvas />

      {/* Loading Screen - shown while GLTF models are loading */}
      <LoadingScreen visible={!allAssetsLoaded} />

      {/* Title Bar */}
      <TitleBar strikes={strikes} runs={runs} />

      {/* Tap area for swinging - covers gameplay area */}
      <Pressable style={styles.swingArea} onPress={swing} />

      {/* Debug Controls - Right Side */}
      {/*Hiding debug buttons*/}
      {/*<View style={styles.debugContainer}>
        <BatDebug />
        <BallDebug />
      </View>*/}

      {/* Pitch Control (Button + Countdown) */}
      <PitchControl />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swingArea: {
    position: "absolute",
    top: 60, // Below title bar
    left: 0,
    right: 0,
    bottom: 150, // Above pitch button
    zIndex: 1,
  },
  debugContainer: {
    position: "absolute",
    top: 140,
    right: 8,
    gap: 8,
    zIndex: 100,
  },
});
