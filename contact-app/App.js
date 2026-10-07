import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { registerRootComponent } from 'expo';
import ContactScreen from './screens/ContactScreen';

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <ContactScreen />
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

