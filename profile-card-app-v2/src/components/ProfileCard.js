import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../styles/globalStyles';

const ProfileCard = ({ name, job, avatar }) => {
    return (
        <View style={styles.cardContainer}>
            {/* Cột 1: Ảnh đại diện bo tròn */}
            <Image source={{ uri: avatar }} style={styles.avatar} resizeMode="cover" />

            {/* Cột 2: Thông tin Tên + Nghề nghiệp */}
            <View style={styles.infoContainer}>
                <Text style={styles.nameText}>{name}</Text>
                <Text style={styles.jobText}>{job}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row', // Xếp ngang các phần tử con
        backgroundColor: colors.white,
        padding: 16,
        borderRadius: 14,
        marginBottom: 14,
        alignItems: 'center', // Căn giữa theo trục dọc
        elevation: 3, // Đổ bóng cho Android / LDPlayer
        shadowColor: '#000', // Đổ bóng cho iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30, // Bo tròn hoàn toàn
        marginRight: 16,
    },
    infoContainer: {
        flex: 1, // Chiếm hết không gian còn lại của hàng
        justifyContent: 'center',
    },
    nameText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.textPrimary,
    },
    jobText: {
        fontSize: 14,
        color: colors.textSecondary,
        marginTop: 4,
    },
});

export default ProfileCard;