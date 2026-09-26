import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'NOTES_APP_SDK57';

export const loadNotes = async () => {
    try {
        const json = await AsyncStorage.getItem(KEY);
        return json ? JSON.parse(json) : [];
    } catch (error) {
        console.error('Error loading notes from AsyncStorage', error);
        return [];
    }
};

export const saveNotes = async (notes) => {
    try {
        await AsyncStorage.setItem(KEY, JSON.stringify(notes));
    } catch (error) {
        console.error('Error saving notes to AsyncStorage', error);
    }
};