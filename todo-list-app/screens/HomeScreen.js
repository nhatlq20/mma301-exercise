import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TodoItem from '../components/TodoItem';

export default function HomeScreen({ navigation }) {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([
        { id: '1', title: 'Học React Native' },
        { id: '2', title: 'Làm bài tập Expo SDK 57' },
        { id: '3', title: 'Thực hành Navigation' },
    ]);

    const addTask = useCallback(() => {
        if (task.trim() === '') {
            Alert.alert('Lỗi', 'Vui lòng nhập tên công việc!');
            return;
        }
        const newTask = {
            id: Date.now().toString(),
            title: task,
        };
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setTask('');
    }, [task]);

    const deleteTask = useCallback((id) => {
        Alert.alert(
            'Xác nhận',
            'Bạn có chắc muốn xóa công việc này?',
            [
                { text: 'Hủy', style: 'cancel' },
                {
                    text: 'Xóa',
                    style: 'destructive',
                    onPress: () => setTasks((prevTasks) => prevTasks.filter((item) => item.id !== id)),
                },
            ]
        );
    }, []);

    const renderItem = useCallback(
        ({ item }) => (
            <TodoItem
                item={item}
                onPress={() => navigation.navigate('Details', { task: item })}
                onDelete={() => deleteTask(item.id)}
            />
        ),
        [navigation, deleteTask]
    );

    return (
        <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập công việc mới..."
                        value={task}
                        onChangeText={setTask}
                        onSubmitEditing={addTask}
                    />
                    <Button title="Thêm" onPress={addTask} color="#6200ee" />
                </View>

                <FlatList
                    data={tasks}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>Chưa có công việc nào. Thêm ngay!</Text>
                    }
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
        flex: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#fff',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginRight: 10,
        fontSize: 16,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#999',
    },
});