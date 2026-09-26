import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Crypto from 'expo-crypto';
import NoteForm from '../components/NoteForm';
import { loadNotes, saveNotes } from '../storage/note';

export default function AddNoteScreen({ navigation }) {
    const handleCreate = async (values) => {
        const currentNotes = await loadNotes();
        const newNote = {
            id: Crypto.randomUUID(),
            title: values.title.trim(),
            content: values.content.trim(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        await saveNotes([newNote, ...currentNotes]);
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
            <ScrollView>
                <NoteForm onSubmit={handleCreate} submitLabel="Tạo ghi chú" />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f4f5',
    },
});