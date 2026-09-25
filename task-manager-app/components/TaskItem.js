import React from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext';

export default function TaskItem({ item, onToggle, onDelete }) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <View
            style={[
                styles.item,
                {
                    backgroundColor: isDark ? '#2c2c2c' : '#ffffff',
                    borderColor: isDark ? '#444444' : '#eeeeee',
                },
            ]}
        >
            <TouchableOpacity
                style={styles.textContainer}
                onPress={() => onToggle(item.id)}
            >
                <Text
                    style={[
                        styles.text,
                        { color: isDark ? '#ffffff' : '#333333' },
                        item.done && styles.doneText,
                    ]}
                >
                    {item.done ? '✓ ' : '○ '} {item.text}
                </Text>
            </TouchableOpacity>

            <View style={styles.actions}>
                <Button
                    title={item.done ? 'Undo' : 'Done'}
                    onPress={() => onToggle(item.id)}
                    color={item.done ? '#757575' : '#2ecc71'}
                />
                <Button
                    title="Xóa"
                    onPress={() => onDelete(item.id)}
                    color="#e74c3c"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 14,
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 10,
        elevation: 2,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    textContainer: {
        flex: 1,
        paddingRight: 8,
    },
    text: {
        fontSize: 16,
    },
    doneText: {
        textDecorationLine: 'line-through',
        color: '#888888',
    },
    actions: {
        flexDirection: 'row',
        gap: 6,
    },
});