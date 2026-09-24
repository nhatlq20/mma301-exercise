import React, { useState, useEffect, useContext } from 'react';
import {
    FlatList,
    TextInput,
    TouchableOpacity,
    Text,
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../context/ThemeContext';
import TodoItem from '../components/TodoItem';
import { saveTodos, loadTodos } from '../utils/Storage';
import { scheduleNotification } from '../utils/Notifications';

const HomeScreen = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');

    // Đọc danh sách đã lưu từ AsyncStorage khi mở app
    useEffect(() => {
        const init = async () => {
            const loaded = await loadTodos();
            setTodos(loaded);
        };
        init();
    }, []);

    // Tự động lưu mỗi khi mảng todos thay đổi
    useEffect(() => {
        saveTodos(todos);
    }, [todos]);

    const addTodo = () => {
        if (!title.trim()) {
            Alert.alert('Lỗi', 'Vui lòng nhập nội dung công việc!');
            return;
        }

        const reminderTime = new Date(Date.now() + 60000); // Lên lịch nhắc sau 1 phút
        const newTodo = {
            id: Date.now().toString(),
            title: title.trim(),
            completed: false,
            reminder: reminderTime.toISOString(),
        };

        setTodos((prev) => [newTodo, ...prev]);
        scheduleNotification(title.trim(), reminderTime);
        setTitle('');
    };

    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((item) => item.id !== id));
    };

    const toggleTodo = (id) => {
        setTodos((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, completed: !item.completed } : item
            )
        );
    };

    return (
        <SafeAreaView
            style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
            edges={['left', 'right', 'bottom']}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.container}
            >
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Nhập tên việc cần làm..."
                        placeholderTextColor="#888"
                        value={title}
                        onChangeText={setTitle}
                        onSubmitEditing={addTodo}
                        style={[
                            styles.input,
                            {
                                borderColor: theme.colors.border,
                                color: theme.colors.text,
                                backgroundColor: theme.colors.card,
                            },
                        ]}
                    />
                    <TouchableOpacity
                        style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
                        onPress={addTodo}
                    >
                        <Text style={styles.addButtonText}>Thêm</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={todos}
                    renderItem={({ item }) => (
                        <TodoItem
                            item={item}
                            onPress={() => navigation.navigate('Details', { todo: item })}
                            onDelete={() => deleteTodo(item.id)}
                            onToggle={() => toggleTodo(item.id)}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={
                        <Text style={[styles.emptyText, { color: theme.colors.text }]}>
                            Chưa có công việc nào. Hãy thêm ngay!
                        </Text>
                    }
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 16,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
    },
    addButton: {
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginLeft: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 60,
        fontSize: 16,
        opacity: 0.6,
    },
});

export default HomeScreen;