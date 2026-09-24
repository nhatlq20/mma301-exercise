import React, { useContext } from 'react';
import { Text, View, Switch, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../context/ThemeContext';

const SettingsScreen = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: theme.colors.background }]}
            edges={['left', 'right', 'bottom']}
        >
            <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
                <Text style={[styles.title, { color: theme.colors.text }]}>Cài đặt</Text>
                <View style={styles.setting}>
                    <Text style={[styles.label, { color: theme.colors.text }]}>
                        Chế độ tối (Dark Mode)
                    </Text>
                    <Switch
                        value={theme.isDarkMode}
                        onValueChange={toggleTheme}
                        thumbColor={theme.isDarkMode ? theme.colors.primary : '#fff'}
                        trackColor={{ false: '#767577', true: theme.colors.primary }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    card: {
        padding: 20,
        borderRadius: 12,
        elevation: 3,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    setting: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
    },
});

export default SettingsScreen;