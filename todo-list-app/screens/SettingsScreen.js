import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);

    const handleClearData = () => {
        Alert.alert(
            'Xác nhận',
            'Bạn có chắc muốn xóa toàn bộ dữ liệu?',
            [
                { text: 'Hủy', style: 'cancel' },
                {
                    text: 'Xóa',
                    style: 'destructive',
                    onPress: () => Alert.alert('Thành công', 'Đã xóa toàn bộ dữ liệu!'),
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
            <View style={styles.card}>
                <Text style={styles.title}>Cài đặt</Text>

                <View style={styles.settingItem}>
                    <Text style={styles.settingLabel}>Thông báo</Text>
                    <Switch
                        value={notificationsEnabled}
                        onValueChange={setNotificationsEnabled}
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={notificationsEnabled ? '#6200ee' : '#f4f3f4'}
                    />
                </View>

                <View style={styles.settingItem}>
                    <Text style={styles.settingLabel}>Chế độ tối</Text>
                    <Switch
                        value={darkModeEnabled}
                        onValueChange={setDarkModeEnabled}
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={darkModeEnabled ? '#6200ee' : '#f4f3f4'}
                    />
                </View>

                <View style={styles.settingItem}>
                    <Text style={styles.settingLabel}>Âm thanh</Text>
                    <Switch
                        value={soundEnabled}
                        onValueChange={setSoundEnabled}
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={soundEnabled ? '#6200ee' : '#f4f3f4'}
                    />
                </View>

                <TouchableOpacity style={styles.dangerButton} onPress={handleClearData}>
                    <Text style={styles.dangerButtonText}>Xóa toàn bộ dữ liệu</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    card: {
        backgroundColor: '#fff',
        margin: 16,
        padding: 20,
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6200ee',
        marginBottom: 20,
        textAlign: 'center',
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    settingLabel: {
        fontSize: 16,
        color: '#333',
    },
    dangerButton: {
        backgroundColor: '#ff4444',
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
    },
    dangerButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});