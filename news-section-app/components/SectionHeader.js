import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CATEGORY_ICONS = {
    technology: '💻',
    health: '🩺',
    sports: '⚽',
};

export default function SectionHeader({ title }) {
    const key = title ? title.toLowerCase() : '';
    const icon = CATEGORY_ICONS[key] || '📰';

    return (
        <View style={styles.headerContainer}>
            <View style={styles.titleWrapper}>
                <Text style={styles.icon}>{icon}</Text>
                <Text style={styles.headerTitle}>{title.toUpperCase()}</Text>
            </View>
            <View style={styles.line} />
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#f8f9fa',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    titleWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        fontSize: 18,
        marginRight: 8,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1a1a1a',
        letterSpacing: 0.8,
    },
    line: {
        height: 2,
        backgroundColor: '#007AFF',
        width: 40,
        marginTop: 4,
        borderRadius: 2,
    },
});

