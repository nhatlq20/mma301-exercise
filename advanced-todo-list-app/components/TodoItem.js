import React, { useContext } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const TodoItem = React.memo(({ item, onPress, onDelete, onToggle }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <TouchableOpacity
            style={[
                styles.item,
                {
                    backgroundColor: theme.colors.card,
                    borderColor: theme.colors.border,
                },
            ]}
            onPress={onPress}
        >
            <Text
                style={[
                    styles.title,
                    {
                        color: theme.colors.text,
                        textDecorationLine: item.completed ? 'line-through' : 'none',
                        opacity: item.completed ? 0.6 : 1,
                    },
                ]}
            >
                {item.title}
            </Text>
            <View style={styles.actions}>
                <TouchableOpacity onPress={onToggle} style={styles.actionBtn}>
                    <Text
                        style={[
                            styles.actionText,
                            { color: item.completed ? '#2ed573' : theme.colors.primary },
                        ]}
                    >
                        {item.completed ? 'Undo' : 'Done'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={styles.actionBtn}>
                    <Text style={[styles.actionText, { color: '#ff4757' }]}>✕</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        marginVertical: 6,
        marginHorizontal: 16,
        borderRadius: 10,
        borderWidth: 1,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    title: {
        fontSize: 16,
        flex: 1,
        paddingRight: 10,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    actionBtn: {
        padding: 4,
    },
    actionText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default TodoItem;