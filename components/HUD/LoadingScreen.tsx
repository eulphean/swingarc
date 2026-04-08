import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Text, Animated } from "react-native";
import { colors, typography, spacing } from "../../constants/designTokens";

interface LoadingScreenProps {
  visible: boolean;
}

export default function LoadingScreen({ visible }: LoadingScreenProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (visible) {
      // Start pulsing animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 0.4,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      // Stop animation and reset
      pulseAnim.stopAnimation();
      pulseAnim.setValue(1);
    }
  }, [visible, pulseAnim]);

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, { opacity: pulseAnim }]}>
        PREPARING SCENE
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.backgroundPrimary,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  text: {
    ...typography.headlineLg,
    color: colors.textPrimary,
    letterSpacing: 2,
    textAlign: "center",
  },
});
