import React, { useState, useContext } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../context/ThemeContext';
import { saveTodos, loadTodos } from '../utils/Storage';
import { scheduleNotification } from '../utils/Notifications';

const DetailsScreen = ({ route, navigation }) => {
    const { theme } = useContext(ThemeContext);
    const { todo } = route.params;
    const [title, setTitle] = useState(todo.title);
    const [reminder] = useState(todo.reminder);

    const updateTodo = async () => {
        const todos = await loadTodos();
        const updatedTodos = todos.map((item) =>
            item.id === todo.id ? { ...item, title } : item
        );

        await saveTodos(updatedTodos);
        if (reminder) {
            scheduleNotification(title, new Date(reminder));
        }
        navigation.goBack();
    };

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: theme.colors.background }]}
            edges={['left', 'right', 'bottom']}
        >
            <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
                <Text style={[styles.title, { color: theme.colors.text }]}>Chi tiết công việc</Text>

                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    style={[
                        styles.input,
                        {
                            borderColor: theme.colors.border,
                            color: theme.colors.text,
                        },
                    ]}
                />

                {reminder ? (
                    <Text style={[styles.reminder, { color: theme.colors.text }]}>
                        Thời gian nhắc: {new Date(reminder).toLocaleTimeString()}
                    </Text>
                ) : null}

                <TouchableOpacity
                    style={[styles.saveBtn, { backgroundColor: theme.colors.primary }]}
                    onPress={updateTodo}
                >
                    <Text style={styles.buttonText}>Lưu cập nhật</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    card: {
        padding: 20,
        borderRadius: 12,
        elevation: 3,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        fontSize: 16,
    },
    reminder: {
        fontSize: 14,
        marginBottom: 20,
        opacity: 0.8,
    },
    saveBtn: {
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DetailsScreen;