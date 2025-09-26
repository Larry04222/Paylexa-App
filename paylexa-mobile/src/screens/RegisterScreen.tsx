import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { PhoenixBackground } from '../components/PhoenixBackground';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../theme/ThemeProvider';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export const RegisterScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();

  return (
    <PhoenixBackground>
      <Text style={[styles.title, { color: colors.white }]}>Create your Phoenix wallet</Text>
      <View style={styles.form}>
        <TextInput placeholder="Email" placeholderTextColor={colors.royalBlue} style={[styles.input, { borderColor: colors.darkGold, color: colors.white }]} />
        <TextInput placeholder="Password" placeholderTextColor={colors.royalBlue} secureTextEntry style={[styles.input, { borderColor: colors.darkGold, color: colors.white }]} />
      </View>
      <Pressable style={[styles.primaryButton, { backgroundColor: colors.emerald }]} onPress={() => navigation.navigate('Kyc')}>
        <Text style={[styles.primaryLabel, { color: colors.white }]}>Continue to KYC</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text style={[styles.link, { color: colors.darkGold }]}>Already verified? Log in</Text>
      </Pressable>
    </PhoenixBackground>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
  },
  form: {
    gap: 16,
    marginBottom: 24,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    backgroundColor: 'rgba(12, 13, 28, 0.65)',
  },
  primaryButton: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    fontSize: 14,
    textAlign: 'center',
  },
});
