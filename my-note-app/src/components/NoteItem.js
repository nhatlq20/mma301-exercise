import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function NoteItem({ note, onPress }) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.title} numberOfLines={1}>
                {note.title}
            </Text>
            <Text style={styles.content} numberOfLines={2}>
                {note.content}
            </Text>
            <Text style={styles.date}>
                {new Date(note.updatedAt).toLocaleString('vi-VN')}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2d3436',
        marginBottom: 6,
    },
    content: {
        fontSize: 14,
        color: '#636e72',
        lineHeight: 20,
        marginBottom: 8,
    },
    date: {
        fontSize: 12,
        color: '#b2bec3',
        textAlign: 'right',
    },
});