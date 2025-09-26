import { View, Text, StyleSheet } from "react-native";
import { GradientBackground } from "@/components/gradient-background";
import { PrimaryButton } from "@/components/primary-button";
import { colors } from "@/theme/colors";

export default function WelcomeScreen() {
  return (
    <GradientBackground>
      <View style={styles.hero}>
        <View style={styles.phoenixOrb} />
        <Text style={styles.headline}>Borderless finance, curated.</Text>
        <Text style={styles.subheadline}>
          Paylexa blends luxury-grade security with effortless multi-currency wallets, escrow, and P2P experiences.
        </Text>
      </View>
      <View style={styles.actions}>
        <PrimaryButton label="Login" href="/(auth)/login" />
        <PrimaryButton label="Create Personal Account" href="/(auth)/register-personal" variant="outline" />
        <PrimaryButton label="Create Business Account" href="/(auth)/register-business" variant="outline" />
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  hero: {
    gap: 18,
  },
  phoenixOrb: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "flex-start",
    backgroundColor: colors.accent,
    shadowColor: colors.primary,
    shadowOpacity: 0.5,
    shadowRadius: 30,
  },
  headline: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.text,
  },
  subheadline: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
  },
  actions: {
    gap: 12,
  },
});
