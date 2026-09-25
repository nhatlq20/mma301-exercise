import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'NOTES_APP_SDK57';

export const saveNotesToStorage = async (notes) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (error) {
        console.error('Lỗi khi lưu notes:', error);
    }
};

export const loadNotesFromStorage = async () => {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Lỗi khi đọc notes:', error);
        return [];
    }
};