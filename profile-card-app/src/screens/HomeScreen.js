import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileCard from '../components/ProfileCard';
import { users } from '../data/user';

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Hồ Sơ Nhân Sự</Text>
                <Text style={styles.subTitle}>Phiên bản StyleSheet & Flexbox (SDK 57)</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {users.map((user) => (
                    <ProfileCard
                        key={user.id}
                        name={user.name}
                        job={user.job}
                        avatar={user.avatar}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f6fa',
    },
    header: {
        paddingVertical: 18,
        paddingHorizontal: 20,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#edf2f7',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2f3542',
    },
    subTitle: {
        fontSize: 13,
        color: '#747d8c',
        marginTop: 4,
    },
    scrollContainer: {
        padding: 16,
        paddingBottom: 30,
    },
});

export default HomeScreen;