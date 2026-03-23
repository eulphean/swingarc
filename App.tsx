import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import HomeScreen from "./components/HUD/screens/HomeScreen";
import GameScreen from "./components/HUD/screens/GameScreen";
import GameOverScreen from "./components/HUD/screens/GameOverScreen";

type Screen = "home" | "game" | "gameOver";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");

  const navigateToGame = () => {
    setCurrentScreen("game");
  };

  const navigateToGameOver = () => {
    setCurrentScreen("gameOver");
  };

  const navigateToHome = () => {
    setCurrentScreen("home");
  };

  // Render current screen
  switch (currentScreen) {
    case "home":
      return <HomeScreen onPlayPress={navigateToGame} />;
    case "game":
      return <GameScreen onGameOver={navigateToGameOver} />;
    case "gameOver":
      return <GameOverScreen onPlayAgain={navigateToGame} onBackToHome={navigateToHome} />;
    default:
      return <HomeScreen onPlayPress={navigateToGame} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
