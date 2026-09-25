import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './store/store';
import LocalCounter from './components/LocalCounter';
import GlobalCounter from './components/GlobalCounter';

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar style="dark" />
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
          <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Counter App (SDK 57)</Text>
              <Text style={styles.subTitle}>Thực hành State: useReducer & Redux Toolkit</Text>
            </View>

            {/* Component 1: Bộ đếm cục bộ dùng useReducer */}
            <LocalCounter />

            {/* Component 2: Bộ đếm toàn cục dùng Redux */}
            <GlobalCounter />
          </ScrollView>
        </SafeAreaView>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    padding: 16,
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  subTitle: {
    fontSize: 13,
    color: '#636e72',
    marginTop: 4,
  },
});