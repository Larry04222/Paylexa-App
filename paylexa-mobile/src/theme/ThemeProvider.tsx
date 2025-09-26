import React, { ReactNode, createContext, useContext } from 'react';
import { DarkTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';

import { palette } from './colors';

type ThemeContextValue = {
  colors: typeof palette;
};

const ThemeContext = createContext<ThemeContextValue>({ colors: palette });

export const useTheme = () => useContext(ThemeContext);

type Props = {
  children: ReactNode;
};

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: palette.black,
    card: palette.royalBlue,
    text: palette.white,
    border: palette.darkGold,
    primary: palette.emerald,
    notification: palette.darkGold,
  },
};

export const ThemeProvider = ({ children }: Props) => (
  <ThemeContext.Provider value={{ colors: palette }}>
    <NavigationThemeProvider value={navigationTheme}>
      {children}
    </NavigationThemeProvider>
  </ThemeContext.Provider>
);
