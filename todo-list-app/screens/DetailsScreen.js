import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DetailsScreen({ route, navigation }) {
    const { task } = route.params;

    return (
        <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
            <View style={styles.card}>
                <Text style={styles.label}>Chi tiết công việc:</Text>
                <Text style={styles.title}>{task.title}</Text>
                <Text style={styles.id}>ID: {task.id}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Button title="← Quay lại" onPress={() => navigation.goBack()} color="#6200ee" />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    id: {
        fontSize: 12,
        color: '#999',
    },
    buttonContainer: {
        marginTop: 20,
    },
});