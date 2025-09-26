import { View, Text, StyleSheet, Pressable } from "react-native";
import { GradientBackground } from "@/components/gradient-background";
import { PrimaryButton } from "@/components/primary-button";
import { colors } from "@/theme/colors";

export default function KycUploadScreen() {
  return (
    <GradientBackground>
      <View style={styles.header}>
        <Text style={styles.title}>Submit KYC</Text>
        <Text style={styles.subtitle}>
          Upload documents securely. Morphon-X scans submissions to keep fraud out while protecting legitimate users.
        </Text>
      </View>
      <View style={styles.uploadArea}>
        <Pressable style={styles.uploadButton}>
          <Text style={styles.uploadText}>Tap to add passport / CAC file</Text>
        </Pressable>
        <Text style={styles.hint}>Supported: PDF, JPG, PNG up to 10MB.</Text>
      </View>
      <PrimaryButton label="Submit for review" href="/(dashboard)" />
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
    lineHeight: 22,
  },
  uploadArea: {
    gap: 12,
  },
  uploadButton: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.outline,
    borderRadius: 20,
    padding: 28,
    alignItems: "center",
    backgroundColor: colors.surface,
  },
  uploadText: {
    color: colors.muted,
  },
  hint: {
    color: colors.muted,
    fontSize: 12,
  },
});
