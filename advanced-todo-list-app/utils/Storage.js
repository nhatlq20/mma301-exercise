import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'ADVANCED_TODOS_SDK57';

export const saveTodos = async (todos) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
        console.error('Lỗi khi lưu danh sách công việc:', error);
    }
};

export const loadTodos = async () => {
    try {
        const todos = await AsyncStorage.getItem(STORAGE_KEY);
        return todos ? JSON.parse(todos) : [];
    } catch (error) {
        console.error('Lỗi khi tải danh sách công việc:', error);
        return [];
    }
};