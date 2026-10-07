import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import NoteActions from './NoteActions';

/**
 * Component Cấp 2: NoteItem
 * Nhận `note` từ NoteList.
 * Chú ý: NoteItem KHÔNG hề nhận bất kỳ props hàm callback nào (onDelete, onToggle)
 * vì NoteActions bên trong sẽ lấy trực tiếp từ Context!
 */
export default function NoteItem({ note }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDark ? '#27272a' : '#ffffff',
          borderColor: isDark ? '#3f3f46' : '#e5e7eb',
        },
      ]}
    >
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.text,
            { color: isDark ? '#f4f4f5' : '#1f2937' },
            note.completed && styles.completedText,
          ]}
        >
          {note.text}
        </Text>
      </View>

      {/* Component Cấp 3: Tự tương tác với Context */}
      <NoteActions noteId={note.id} isCompleted={note.completed} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  text: {
    fontSize: 15,
    lineHeight: 20,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
});
