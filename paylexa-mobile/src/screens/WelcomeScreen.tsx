import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { PhoenixBackground } from '../components/PhoenixBackground';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../theme/ThemeProvider';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export const WelcomeScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();

  return (
    <PhoenixBackground>
      <Text style={[styles.title, { color: colors.darkGold }]}>Paylexa</Text>
      <Text style={[styles.subtitle, { color: colors.white }]}>Cross-border luxury finance for global citizens.</Text>

      <Pressable style={[styles.primaryButton, { backgroundColor: colors.emerald }]} onPress={() => navigation.navigate('Register')}>
        <Text style={[styles.primaryLabel, { color: colors.white }]}>Create Account</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate('Login')}>
        <Text style={[styles.secondaryLabel, { color: colors.darkGold }]}>I already have an account</Text>
      </Pressable>
    </PhoenixBackground>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 48,
    fontWeight: '700',
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 48,
    maxWidth: 280,
  },
  primaryButton: {
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 12,
  },
  secondaryLabel: {
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});
