import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { ThemeProvider, useTheme } from './src/theme/ThemeProvider';
import { SavedProvider } from './src/context/SavedContext';
import { FiltersProvider } from './src/context/FiltersContext';
import { RootNavigator } from './src/navigation/RootNavigator';

function Nav() {
  const { colors, isDark } = useTheme();
  const base = isDark ? DarkTheme : DefaultTheme;
  const navTheme = {
    ...base,
    colors: { ...base.colors, background: colors.bg, card: colors.surface, text: colors.textPrimary, border: colors.border, primary: colors.plum700 },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  const scheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <SavedProvider>
          <FiltersProvider>
            <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
            <Nav />
          </FiltersProvider>
        </SavedProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
