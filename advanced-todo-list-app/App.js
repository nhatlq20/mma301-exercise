import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import AppNavigator from './navigation/AppNavigator';

function RootApp() {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <StatusBar style={theme.isDarkMode ? 'light' : 'dark'} />
      <AppNavigator />
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <RootApp />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}