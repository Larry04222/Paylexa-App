import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

type InsightCardProps = {
  title: string;
  description: string;
};

export const InsightCard = ({ title, description }: InsightCardProps) => (
  <View style={styles.card}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 20,
    gap: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  description: {
    color: colors.muted,
  },
});
