import React, { ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

import { gradients } from '../theme/colors';

type Props = {
  children: ReactNode;
};

export const PhoenixBackground = ({ children }: Props) => (
  <LinearGradient colors={gradients.phoenix} style={styles.gradient}>
    <View style={styles.container}>{children}</View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 72,
    paddingBottom: 32,
  },
});
