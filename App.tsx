import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import GameCanvas from "./components/GameCanvas";

export default function App() {
  return (
    <View style={styles.container}>
      <GameCanvas />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
});
