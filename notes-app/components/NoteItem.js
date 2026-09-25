import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const NoteItem = React.memo(({ item, onDelete }) => {
    return (
        <View style={styles.card}>
            <View style={styles.contentBox}>
                <Text style={styles.contentText}>{item.content}</Text>
                <Text style={styles.timeText}>Tạo lúc: {item.createdAt}</Text>
            </View>
            <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(item.id)}>
                <Text style={styles.deleteBtnText}>✕</Text>
            </TouchableOpacity>
        </View>
    );
});

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
    },
    contentBox: {
        flex: 1,
        paddingRight: 10,
    },
    contentText: {
        fontSize: 16,
        color: '#2d3436',
        lineHeight: 22,
    },
    timeText: {
        fontSize: 12,
        color: '#b2bec3',
        marginTop: 4,
    },
    deleteBtn: {
        backgroundColor: '#ffeaa7',
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteBtnText: {
        color: '#d63031',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default NoteItem;