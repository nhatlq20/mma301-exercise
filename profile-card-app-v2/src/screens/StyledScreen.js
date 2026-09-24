import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { users } from '../data/users';

const StyledScreen = () => {
    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <Text style={styles.title}>Styled-Components Demo</Text>
                <Text style={styles.subtitle}>CSS-in-JS → StyleSheet (Expo SDK 57)</Text>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {users.map((user) => (
                    <View key={user.id} style={styles.card}>
                        <Image
                            source={{ uri: user.avatar }}
                            style={styles.avatar}
                            resizeMode="cover"
                        />
                        <View style={styles.infoBox}>
                            <Text style={styles.nameLabel}>{user.name}</Text>
                            <Text style={styles.jobLabel}>{user.job}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e3f2fd',
    },
    header: {
        paddingVertical: 18,
        paddingHorizontal: 20,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#bbdefb',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1565c0',
    },
    subtitle: {
        fontSize: 13,
        color: '#555555',
        marginTop: 4,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 30,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        alignItems: 'center',
        elevation: 2,
        borderWidth: 1,
        borderColor: '#bbdefb',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        marginRight: 16,
        backgroundColor: '#eeeeee',
    },
    infoBox: {
        flex: 1,
    },
    nameLabel: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#1e88e5',
    },
    jobLabel: {
        fontSize: 13,
        color: '#555555',
        marginTop: 4,
    },
});

export default StyledScreen;