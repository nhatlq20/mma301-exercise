import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProfileCard = ({ name, job, avatar }) => {
    return (
        <View style={styles.cardContainer}>
            {/* Cột trái: Avatar bo tròn */}
            <Image source={{ uri: avatar }} style={styles.avatar} resizeMode="cover" />

            {/* Cột phải: Thông tin văn bản */}
            <View style={styles.infoContainer}>
                <Text style={styles.nameText}>{name}</Text>
                <Text style={styles.jobText}>{job}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row', // Dàn hàng ngang theo trục chính Flexbox
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 14,
        marginBottom: 16,
        alignItems: 'center', // Căn giữa theo trục dọc
        elevation: 3, // Bóng đổ trên Android / LDPlayer
        shadowColor: '#000000', // Bóng đổ trên iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30, // Bo tròn ảnh đại diện
        marginRight: 16,
    },
    infoContainer: {
        flex: 1, // Chiếm toàn bộ không gian còn lại
        justifyContent: 'center',
    },
    nameText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2d3436',
    },
    jobText: {
        fontSize: 14,
        color: '#636e72',
        marginTop: 4,
    },
});

export default ProfileCard;