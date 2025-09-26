import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "@/theme/colors";

interface PrimaryButtonProps {
  label: string;
  onPress?: () => void;
  href?: string;
  variant?: "solid" | "outline";
}

export const PrimaryButton = ({ label, onPress, href, variant = "solid" }: PrimaryButtonProps) => {
  const content = (
    <Pressable
      style={[styles.base, variant === "outline" ? styles.outline : styles.solid]}
      onPress={onPress}
    >
      <Text style={[styles.label, variant === "outline" && styles.outlineLabel]}>{label}</Text>
    </Pressable>
  );

  if (href) {
    const { Link } = require("expo-router");
    return (
      <Link href={href} asChild>
        {content}
      </Link>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent",
  },
  solid: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 24,
  },
  outline: {
    borderColor: colors.primary,
  },
  label: {
    color: colors.background,
    fontWeight: "600",
    fontSize: 16,
  },
  outlineLabel: {
    color: colors.text,
  },
});
