import { View, Text, StyleSheet, TextInput } from "react-native";
import { GradientBackground } from "@/components/gradient-background";
import { PrimaryButton } from "@/components/primary-button";
import { colors } from "@/theme/colors";

export default function RegisterPersonalScreen() {
  return (
    <GradientBackground>
      <View style={styles.header}>
        <Text style={styles.title}>Personal account</Text>
        <Text style={styles.subtitle}>Luxury onboarding in under 3 minutes.</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Full name</Text>
        <TextInput placeholder="Ada Lovelace" placeholderTextColor={colors.muted} style={styles.input} />
        <Text style={styles.label}>Email</Text>
        <TextInput placeholder="ada@paylexa.app" placeholderTextColor={colors.muted} style={styles.input} />
        <Text style={styles.label}>Country</Text>
        <TextInput placeholder="Canada" placeholderTextColor={colors.muted} style={styles.input} />
        <PrimaryButton label="Continue" href="/(kyc)/upload" />
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 12,
  },
  title: {
    color: colors.text,
    fontSize: 28,
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
    padding: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.outline,
  },
});
