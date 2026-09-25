import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ThemeProvider, useTheme } from './ThemeContext';
import AppContent from './AppContent';

function AppRoot() {
  const { theme } = useTheme();
  return (
    <>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <AppContent />
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ThemeProvider>
          <AppRoot />
        </ThemeProvider>
      </Provider>
    </SafeAreaProvider>
  );
}