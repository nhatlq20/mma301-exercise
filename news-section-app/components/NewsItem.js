import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function NewsItem({ item }) {
    return (
        <View style={styles.card}>
            {item.imageUrl ? (
                <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.thumbnail}
                    resizeMode="cover"
                />
            ) : null}
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>
                    {item.title}
                </Text>
                {item.description ? (
                    <Text style={styles.description} numberOfLines={2}>
                        {item.description}
                    </Text>
                ) : null}
                <View style={styles.meta}>
                    {item.source ? <Text style={styles.source}>{item.source}</Text> : null}
                    {item.publishedAt ? (
                        <Text style={styles.time}>{item.publishedAt}</Text>
                    ) : null}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        marginHorizontal: 16,
        marginVertical: 6,
        borderRadius: 10,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    thumbnail: {
        width: 90,
        height: 80,
        borderRadius: 8,
        backgroundColor: '#e0e0e0',
        marginRight: 12,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#212529',
        lineHeight: 18,
    },
    description: {
        fontSize: 12,
        color: '#6c757d',
        marginVertical: 4,
        lineHeight: 16,
    },
    meta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    source: {
        fontSize: 11,
        fontWeight: '600',
        color: '#007AFF',
    },
    time: {
        fontSize: 11,
        color: '#adb5bd',
    },
});

