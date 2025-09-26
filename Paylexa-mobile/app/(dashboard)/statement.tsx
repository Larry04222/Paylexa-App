import { View, Text, StyleSheet, FlatList } from "react-native";
import { colors } from "@/theme/colors";

const statements = [
  { id: "1", title: "Wallet top up", amount: "+$2,000.00", timestamp: "Today 09:24", currency: "USD" },
  { id: "2", title: "Marketplace release", amount: "+₦480,000.00", timestamp: "Yesterday", currency: "NGN" },
  { id: "3", title: "P2P escrow hold", amount: "-$500.00", timestamp: "Yesterday", currency: "USD" },
];

export default function StatementScreen() {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={statements}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.timestamp}</Text>
          </View>
          <Text style={[styles.amount, item.amount.startsWith("-") && styles.debit]}>{item.amount}</Text>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.outline,
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "600",
  },
  subtitle: {
    color: colors.muted,
    marginTop: 4,
  },
  amount: {
    color: colors.accent,
    fontWeight: "700",
  },
  debit: {
    color: "#EF4444",
  },
});
