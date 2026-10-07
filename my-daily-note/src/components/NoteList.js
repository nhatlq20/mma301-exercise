import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useNotes } from '../contexts/NotesContext';
import { useTheme } from '../contexts/ThemeContext';
import NoteItem from './NoteItem';

/**
 * Component Cấp 1: NoteList
 * Lấy trực tiếp danh sách `notes` từ NotesContext.
 * Duyệt qua mảng và render từng NoteItem (Cấp 2).
 */
export default function NoteList() {
  const { notes } = useNotes();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (notes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyText, { color: isDark ? '#71717a' : '#9ca3af' }]}>
          Chưa có ghi chú nào. Hãy thêm ghi chú mới ở trên! ✍️
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={notes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <NoteItem note={item} />}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 15,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
