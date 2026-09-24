import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const TodoItem = React.memo(({ item, onPress, onDelete }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
        <Text style={styles.title}>{item.title}</Text>
        <TouchableOpacity onPress={onDelete}>
            <Text style={styles.delete}>✕</Text>
        </TouchableOpacity>
    </TouchableOpacity>
));

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    title: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    delete: {
        color: '#ff4444',
        fontWeight: 'bold',
        fontSize: 20,
        paddingLeft: 10,
    },
});

export default TodoItem;