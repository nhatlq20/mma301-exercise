import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// Nhận props 'item' từ component cha truyền xuống
const PlaceCard = ({ item }) => {
    return (
        <View style={styles.cardContainer}>
            {/* Hình ảnh địa điểm (bắt buộc chỉ định width/height để hiển thị) */}
            <Image
                source={{ uri: item.image }}
                style={styles.cardImage}
                resizeMode="cover"
            />

            {/* Thông tin chữ bên dưới */}
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.location}>📍 {item.location}</Text>
                <Text style={styles.price}>{item.price}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 15,
        marginBottom: 20, // Khoảng cách giữa các thẻ
        overflow: 'hidden', // Bo tròn ảnh theo viền thẻ
        // Đổ bóng cho Android
        elevation: 4,
        // Đổ bóng cho iOS / Web
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    cardImage: {
        width: '100%',
        height: 200,
    },
    infoContainer: {
        padding: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333',
    },
    location: {
        fontSize: 14,
        color: '#666666',
        marginTop: 5,
    },
    price: {
        fontSize: 18,
        color: '#2ecc71', // Màu xanh lá
        fontWeight: 'bold',
        marginTop: 10,
        alignSelf: 'flex-end', // Đẩy giá sang phía bên phải
    },
});

export default PlaceCard;