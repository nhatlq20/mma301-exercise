import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function ContactItem({ item }) {
    // Lấy ký tự viết tắt nếu không có ảnh avatar
    const initial = (item.name || '?').trim()[0].toUpperCase();

    return (
        <View style={styles.container}>
            {item.avatar ? (
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
            ) : (
                <View style={styles.avatarPlaceholder}>
                    <Text style={styles.initialText}>{initial}</Text>
                </View>
            )}
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                {item.phone ? <Text style={styles.phone}>{item.phone}</Text> : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: '#ffffff',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e0e0e0',
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#e1e4e8',
        marginRight: 14,
    },
    avatarPlaceholder: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    initialText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    info: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    phone: {
        fontSize: 13,
        color: '#6c757d',
        marginTop: 2,
    },
});

