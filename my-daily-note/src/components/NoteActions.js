import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNotes } from '../contexts/NotesContext';

/**
 * Component Cấp 3: NoteActions
 * MINH HỌA GIẢI PHÁP CHO BÀI TOÁN PROP DRILLING:
 * Thay vì HomeScreen phải truyền hàm onDelete và onToggle qua NoteList (Cấp 1) -> NoteItem (Cấp 2) -> NoteActions (Cấp 3),
 * NoteActions ở tận Cấp 3 có thể lấy trực tiếp hàm deleteNote và toggleNote từ NotesContext!
 */
export default function NoteActions({ noteId, isCompleted }) {
  const { toggleNote, deleteNote } = useNotes();

  return (
    <View style={styles.container}>
      {/* Nút Đổi trạng thái hoàn thành */}
      <TouchableOpacity
        style={[styles.btn, isCompleted ? styles.undoBtn : styles.doneBtn]}
        onPress={() => toggleNote(noteId)}
        activeOpacity={0.7}
      >
        <Text style={styles.btnText}>{isCompleted ? '↺ Hoàn tác' : '✓ Xong'}</Text>
      </TouchableOpacity>

      {/* Nút Xóa ghi chú */}
      <TouchableOpacity
        style={[styles.btn, styles.deleteBtn]}
        onPress={() => deleteNote(noteId)}
        activeOpacity={0.7}
      >
        <Text style={[styles.btnText, styles.deleteText]}>✕ Xóa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneBtn: {
    backgroundColor: '#10b981',
  },
  undoBtn: {
    backgroundColor: '#6b7280',
  },
  deleteBtn: {
    backgroundColor: '#fee2e2',
  },
  btnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  deleteText: {
    color: '#ef4444',
  },
});
