import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { add } from '../store/taskSlice';
import { useTheme } from '../ThemeContext';

export default function TaskInput() {
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const { theme } = useTheme();

    const handleAdd = () => {
        if (!text.trim()) {
            Alert.alert('Thông báo', 'Vui lòng nhập nội dung công việc!');
            return;
        }
        dispatch(add(text.trim()));
        setText('');
    };

    const isDark = theme === 'dark';

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: isDark ? '#333333' : '#ffffff',
                        borderColor: isDark ? '#555555' : '#dddddd',
                        color: isDark ? '#ffffff' : '#000000',
                    },
                ]}
                placeholder="Nhập công việc cần làm..."
                placeholderTextColor={isDark ? '#888888' : '#999999'}
                value={text}
                onChangeText={setText}
                onSubmitEditing={handleAdd}
            />
            <Button title="Thêm" onPress={handleAdd} color="#6200ee" />
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        gap: 8,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 16,
    },
});