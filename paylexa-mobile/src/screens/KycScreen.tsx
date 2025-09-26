import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { PhoenixBackground } from '../components/PhoenixBackground';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../theme/ThemeProvider';

type Props = NativeStackScreenProps<RootStackParamList, 'Kyc'>;

export const KycScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();

  return (
    <PhoenixBackground>
      <Text style={[styles.title, { color: colors.white }]}>Verify your identity</Text>
      <View style={styles.steps}>
        <Text style={[styles.step, { color: colors.white }]}>1. Upload government ID</Text>
        <Text style={[styles.step, { color: colors.white }]}>2. Selfie check</Text>
        <Text style={[styles.step, { color: colors.white }]}>3. Biometric + OTP confirmation</Text>
      </View>
      <Pressable style={[styles.primaryButton, { backgroundColor: colors.emerald }]} onPress={() => navigation.navigate('Dashboard')}>
        <Text style={[styles.primaryLabel, { color: colors.white }]}>Submit for review</Text>
      </Pressable>
    </PhoenixBackground>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 20,
  },
  steps: {
    gap: 12,
    marginBottom: 24,
  },
  step: {
    fontSize: 16,
  },
  primaryButton: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
});
