import React, { useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NoteForm from '../components/NoteForm';
import { loadNotes, saveNotes } from '../storage/note';

export default function EditNoteScreen({ route, navigation }) {
    const { note } = route.params;

    const handleDelete = () => {
        Alert.alert('Xác nhận', 'Bạn có chắc chắn muốn xóa ghi chú này?', [
            { text: 'Hủy', style: 'cancel' },
            {
                text: 'Xóa',
                style: 'destructive',
                onPress: async () => {
                    const notes = await loadNotes();
                    const filtered = notes.filter((n) => n.id !== note.id);
                    await saveNotes(filtered);
                    navigation.goBack();
                },
            },
        ]);
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chỉnh sửa ghi chú',
            headerRight: () => (
                <TouchableOpacity onPress={handleDelete} style={{ marginRight: 8 }}>
                    <Text style={{ color: '#d63031', fontWeight: 'bold', fontSize: 16 }}>Xóa</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation, note.id]);

    const handleUpdate = async (values) => {
        const notes = await loadNotes();
        const updated = notes.map((n) =>
            n.id === note.id
                ? {
                    ...n,
                    title: values.title.trim(),
                    content: values.content.trim(),
                    updatedAt: new Date().toISOString(),
                }
                : n
        );

        await saveNotes(updated);
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
            <ScrollView>
                <NoteForm
                    initialValues={{ title: note.title, content: note.content }}
                    onSubmit={handleUpdate}
                    submitLabel="Cập nhật ghi chú"
                />
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