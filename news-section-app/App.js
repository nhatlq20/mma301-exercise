import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { registerRootComponent } from 'expo';
import HomeScreen from './screens/HomeScreen';

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <HomeScreen />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#ffffff',
    },
});

registerRootComponent(App);

