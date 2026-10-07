import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function ProductItem({ item }) {
    return (
        <View style={styles.card}>
            <Image source={{ uri: item.thumbnail }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.price}>${item.price}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 12,
        marginVertical: 6,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        elevation: 2
    },
    image: { width: 80, height: 80, borderRadius: 8, marginRight: 12, backgroundColor: '#eee' },
    info: { flex: 1, justifyContent: 'center' },
    title: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    price: { fontSize: 16, color: '#27ae60', marginTop: 4, fontWeight: '600' }
});