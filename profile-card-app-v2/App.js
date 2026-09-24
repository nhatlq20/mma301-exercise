import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import StyledScreen from './src/screens/StyledScreen';
import { colors } from './src/styles/globalStyles';

export default function App() {
  const [showStyled, setShowStyled] = useState(false);

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* Render màn hình theo trạng thái */}
        <View style={styles.content}>
          {showStyled ? <StyledScreen /> : <HomeScreen />}
        </View>

        {/* Nút bấm chuyển đổi nhanh 2 màn hình */}
        <View style={styles.footer}>
          <Button
            title={
              showStyled
                ? 'Xem bản StyleSheet (Cơ bản)'
                : 'Xem bản Styled-Components'
            }
            onPress={() => setShowStyled(!showStyled)}
            color={colors.primary}
          />
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
  },
  footer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
});