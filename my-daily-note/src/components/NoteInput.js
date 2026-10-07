import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNotes } from '../contexts/NotesContext';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Component Cấp 1: NoteInput
 * Minh họa Context API: Lấy trực tiếp action `addNote` từ NotesContext.
 */
export default function NoteInput() {
  const [inputText, setInputText] = useState('');
  const { addNote } = useNotes();
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  const handleAdd = () => {
    if (!inputText.trim()) return;
    addNote(inputText);
    setInputText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? '#27272a' : '#f4f4f5',
            color: isDark ? '#ffffff' : '#18181b',
            borderColor: isDark ? '#3f3f46' : '#e4e4e7',
          },
        ]}
        placeholder="Nhập ghi chú mới..."
        placeholderTextColor={isDark ? '#71717a' : '#a1a1aa'}
        value={inputText}
        onChangeText={setInputText}
        onSubmitEditing={handleAdd}
        returnKeyType="done"
      />
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: isDark ? '#38bdf8' : '#2563eb' }]}
        onPress={handleAdd}
        activeOpacity={0.8}
      >
        <Text style={styles.addButtonText}>Thêm</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  input: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 15,
  },
  addButton: {
    height: 44,
    paddingHorizontal: 18,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
});
