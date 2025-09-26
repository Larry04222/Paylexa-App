import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { PhoenixBackground } from '../components/PhoenixBackground';
import { useTheme } from '../theme/ThemeProvider';

const currencies = [
  { code: 'USD', balance: '12,540.00', change: '+2.1%' },
  { code: 'CAD', balance: '8,120.50', change: '+0.8%' },
  { code: 'NGN', balance: '4,820,000.00', change: '+5.4%' },
];

const statements = [
  { id: '1', title: 'Swap USD → CAD', amount: '-1,000.00 CAD' },
  { id: '2', title: 'P2P Escrow Release', amount: '+600.00 USD' },
  { id: '3', title: 'Marketplace Sale', amount: '+120,000.00 NGN' },
];

export const DashboardScreen = () => {
  const { colors } = useTheme();

  return (
    <PhoenixBackground>
      <Text style={[styles.heading, { color: colors.white }]}>Your multi-currency vault</Text>
      <FlatList
        data={currencies}
        keyExtractor={(item) => item.code}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.walletRow}
        renderItem={({ item }) => (
          <View style={[styles.walletCard, { backgroundColor: 'rgba(27, 59, 147, 0.35)', borderColor: colors.darkGold }]}
          >
            <Text style={[styles.walletCode, { color: colors.darkGold }]}>{item.code}</Text>
            <Text style={[styles.walletBalance, { color: colors.white }]}>${item.balance}</Text>
            <Text style={[styles.walletChange, { color: colors.emerald }]}>{item.change}</Text>
          </View>
        )}
      />

      <Text style={[styles.subheading, { color: colors.white }]}>Latest statements</Text>
      <View style={styles.statementList}>
        {statements.map((statement) => (
          <View key={statement.id} style={[styles.statementCard, { borderColor: colors.royalBlue }]}
          >
            <Text style={[styles.statementTitle, { color: colors.white }]}>{statement.title}</Text>
            <Text style={[styles.statementAmount, { color: colors.darkGold }]}>{statement.amount}</Text>
          </View>
        ))}
      </View>
    </PhoenixBackground>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
  },
  walletRow: {
    marginBottom: 32,
  },
  walletCard: {
    width: 220,
    borderRadius: 24,
    borderWidth: 1.5,
    padding: 20,
    marginRight: 16,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  walletCode: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  walletBalance: {
    fontSize: 22,
    fontWeight: '700',
  },
  walletChange: {
    fontSize: 14,
    marginTop: 8,
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  statementList: {
    gap: 16,
  },
  statementCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    backgroundColor: 'rgba(12, 13, 28, 0.65)',
  },
  statementTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  statementAmount: {
    fontSize: 14,
  },
});
