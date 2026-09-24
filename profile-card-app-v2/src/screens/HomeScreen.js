import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileCard from '../components/ProfileCard';
import { users } from '../data/users';
import { colors } from '../styles/globalStyles';

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Danh Sách Nhân Sự</Text>
                <Text style={styles.subTitle}>Sử dụng StyleSheet & Flexbox (SDK 57)</Text>
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
        backgroundColor: colors.background,
    },
    header: {
        paddingVertical: 18,
        paddingHorizontal: 20,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: '#edf2f7',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.textPrimary,
    },
    subTitle: {
        fontSize: 13,
        color: colors.textSecondary,
        marginTop: 4,
    },
    scrollContainer: {
        padding: 16,
        paddingBottom: 30,
    },
});

export default HomeScreen;