import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function InfoScreen() {
    return (
        <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
            <ScrollView style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.title}>Thông tin ứng dụng</Text>

                    <View style={styles.section}>
                        <Text style={styles.label}>Tên ứng dụng:</Text>
                        <Text style={styles.value}>TODO List App</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.label}>Phiên bản:</Text>
                        <Text style={styles.value}>1.0.0 (Expo SDK 57)</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.label}>Công nghệ:</Text>
                        <Text style={styles.value}>React Native + Expo SDK 57</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.label}>Navigation:</Text>
                        <Text style={styles.value}>Stack, Tab, Drawer</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.label}>Mô tả:</Text>
                        <Text style={styles.description}>
                            Ứng dụng quản lý công việc cá nhân được xây dựng với mục đích thực hành
                            React Native cơ bản, bao gồm: Component, State, Navigation, và FlatList.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
        flex: 1,
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
    section: {
        marginBottom: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666',
        marginBottom: 5,
    },
    value: {
        fontSize: 16,
        color: '#333',
    },
    description: {
        fontSize: 14,
        color: '#666',
        lineHeight: 22,
    },
});