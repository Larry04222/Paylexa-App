import { View, Text, StyleSheet, TextInput } from "react-native";
import { GradientBackground } from "@/components/gradient-background";
import { PrimaryButton } from "@/components/primary-button";
import { colors } from "@/theme/colors";

export default function LoginScreen() {
  return (
    <GradientBackground>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Secure access with Morphon-X risk protection.</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput placeholder="you@paylexa.app" placeholderTextColor={colors.muted} style={styles.input} />
        <Text style={styles.label}>Password</Text>
        <TextInput placeholder="••••••••" placeholderTextColor={colors.muted} secureTextEntry style={styles.input} />
        <PrimaryButton label="Continue" href="/(auth)/two-fa" />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>New to Paylexa?</Text>
        <PrimaryButton label="Create account" href="/(auth)/register-personal" variant="outline" />
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
    fontSize: 15,
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
  footer: {
    gap: 12,
  },
  footerText: {
    color: colors.muted,
    fontSize: 14,
  },
});
