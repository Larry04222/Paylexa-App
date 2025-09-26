import { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

interface GradientBackgroundProps {
  children: ReactNode;
}

export const GradientBackground = ({ children }: GradientBackgroundProps) => (
  <LinearGradient colors={[colors.background, colors.card]} style={styles.container}>
    {children}
  </LinearGradient>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 72,
    paddingBottom: 32,
    gap: 32,
  },
});
