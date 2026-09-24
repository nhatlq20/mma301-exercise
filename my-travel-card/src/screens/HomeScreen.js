import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PLACES } from '../constants/mockData';
import PlaceCard from '../components/PlaceCard';

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            {/* Tiêu đề ứng dụng */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Việt Nam Travel ✈️</Text>
            </View>

            {/* Danh sách cuộn bằng FlatList */}
            <FlatList
                data={PLACES} // Nguồn mảng dữ liệu
                keyExtractor={(item) => item.id} // Khóa duy nhất cho mỗi item
                renderItem={({ item }) => <PlaceCard item={item} />} // Hàm vẽ từng thẻ
                contentContainerStyle={styles.listContent} // Khoảng cách padding bên trong
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5', // Màu nền xám nhẹ
    },
    header: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#e67e22',
    },
    listContent: {
        padding: 20, // Khoảng cách viền xung quanh danh sách
    },
});

export default HomeScreen;