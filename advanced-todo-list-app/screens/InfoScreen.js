import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../context/ThemeContext';

const InfoScreen = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: theme.colors.background }]}
            edges={['left', 'right', 'bottom']}
        >
            <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
                <Text style={[styles.title, { color: theme.colors.text }]}>
                    About Advanced To-do App
                </Text>
                <Text style={[styles.content, { color: theme.colors.text }]}>
                    Ứng dụng quản lý công việc nâng cao (Expo SDK 57) hỗ trợ lưu trữ dữ liệu
                    bằng AsyncStorage, lập lịch thông báo nhắc việc với Expo Notifications và
                    quản lý Light/Dark mode bằng React Context API.
                </Text>
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
        marginBottom: 12,
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        opacity: 0.8,
    },
});

export default InfoScreen;