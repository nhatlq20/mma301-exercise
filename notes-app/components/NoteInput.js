import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addNote } from '../store/notesSlice';

export default function NoteInput() {
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const handleAdd = () => {
        if (!text.trim()) {
            Alert.alert('Lỗi', 'Vui lòng nhập nội dung ghi chú!');
            return;
        }
        dispatch(addNote(text.trim()));
        setText('');
    };

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Viết ghi chú mới tại đây..."
                placeholderTextColor="#999"
                value={text}
                onChangeText={setText}
                multiline
            />
            <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
                <Text style={styles.addBtnText}>Lưu</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: '#ffffff',
        padding: 12,
        borderRadius: 12,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    input: {
        fontSize: 16,
        minHeight: 50,
        color: '#2d3436',
        textAlignVertical: 'top',
    },
    addBtn: {
        backgroundColor: '#0984e3',
        alignSelf: 'flex-end',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 8,
    },
    addBtnText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});