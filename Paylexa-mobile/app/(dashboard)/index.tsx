import { View, Text, StyleSheet, ScrollView } from "react-native";
import { colors } from "@/theme/colors";
import { PrimaryButton } from "@/components/primary-button";
import { InsightCard } from "@/components/insight-card";

const walletBalances = [
  { currency: "USD", balance: "12,400.00" },
  { currency: "CAD", balance: "8,215.00" },
  { currency: "NGN", balance: "5,200,000.00" },
];

export default function DashboardScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Multi-currency wallets</Text>
      <View style={styles.walletRow}>
        {walletBalances.map((wallet) => (
          <View key={wallet.currency} style={styles.walletCard}>
            <Text style={styles.walletCurrency}>{wallet.currency}</Text>
            <Text style={styles.walletBalance}>{wallet.balance}</Text>
          </View>
        ))}
      </View>
      <View style={styles.actions}>
        <PrimaryButton label="Top up" variant="outline" />
        <PrimaryButton label="View statements" href="/(dashboard)/statement" />
      </View>
      <View style={styles.insights}>
        <Text style={styles.sectionTitle}>Insights</Text>
        <InsightCard title="Morphon-X" description="No anomalies detected in the last 24h." />
        <InsightCard title="Marketplace" description="2 escrow orders awaiting release." />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 24,
    backgroundColor: colors.background,
  },
  heading: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "700",
  },
  walletRow: {
    flexDirection: "row",
    gap: 16,
    flexWrap: "wrap",
  },
  walletCard: {
    backgroundColor: colors.card,
    padding: 18,
    borderRadius: 24,
    minWidth: "48%",
    shadowColor: colors.accent,
    shadowOpacity: 0.35,
    shadowRadius: 18,
  },
  walletCurrency: {
    color: colors.muted,
    marginBottom: 4,
  },
  walletBalance: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "700",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  insights: {
    gap: 12,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "600",
  },
});
