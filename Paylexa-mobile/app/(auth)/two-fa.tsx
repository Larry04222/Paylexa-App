import { View, Text, StyleSheet, TextInput } from "react-native";
import { GradientBackground } from "@/components/gradient-background";
import { PrimaryButton } from "@/components/primary-button";
import { colors } from "@/theme/colors";

export default function TwoFactorScreen() {
  return (
    <GradientBackground>
      <View style={styles.header}>
        <Text style={styles.title}>Verify 2FA code</Text>
        <Text style={styles.subtitle}>We sent a 6-digit passcode to your secure channel.</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>One-time passcode</Text>
        <TextInput
          placeholder="000000"
          placeholderTextColor={colors.muted}
          keyboardType="number-pad"
          maxLength={6}
          style={styles.input}
        />
        <PrimaryButton label="Verify" href="/(dashboard)" />
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 10,
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "700",
  },
  subtitle: {
    color: colors.muted,
  },
  form: {
    gap: 12,
  },
  label: {
    color: colors.muted,
    fontSize: 14,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 18,
    color: colors.text,
    textAlign: "center",
    fontSize: 20,
    letterSpacing: 8,
    borderWidth: 1,
    borderColor: colors.outline,
  },
});
