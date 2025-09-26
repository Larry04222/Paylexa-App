import { View, Text, StyleSheet, TextInput } from "react-native";
import { GradientBackground } from "@/components/gradient-background";
import { PrimaryButton } from "@/components/primary-button";
import { colors } from "@/theme/colors";

export default function RegisterBusinessScreen() {
  return (
    <GradientBackground>
      <View style={styles.header}>
        <Text style={styles.title}>Business onboarding</Text>
        <Text style={styles.subtitle}>Unlock Paylexa merchant FX, invoicing, and API keys.</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Business name</Text>
        <TextInput placeholder="Morphon Labs" placeholderTextColor={colors.muted} style={styles.input} />
        <Text style={styles.label}>Contact email</Text>
        <TextInput placeholder="compliance@morphonlabs.ai" placeholderTextColor={colors.muted} style={styles.input} />
        <Text style={styles.label}>Registration country</Text>
        <TextInput placeholder="Nigeria" placeholderTextColor={colors.muted} style={styles.input} />
        <PrimaryButton label="Continue to KYC" href="/(kyc)/upload" />
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
