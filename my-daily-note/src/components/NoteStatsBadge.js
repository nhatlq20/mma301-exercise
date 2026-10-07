import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNotes } from '../contexts/NotesContext';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Component Cấp 2: NoteStatsBadge
 * Minh họa Context API: Đọc trực tiếp totalNotes và completedNotes từ NotesContext
 * mà không cần HomeScreen phải truyền qua props.
 */
export default function NoteStatsBadge() {
  const { totalNotes, completedNotes } = useNotes();
  const { theme } = useTheme();

  const isDark = theme === 'dark';
  const textColor = isDark ? '#e4e4e7' : '#3f3f46';
  const badgeBg = isDark ? '#27272a' : '#e0e7ff';
  const accentColor = isDark ? '#38bdf8' : '#4338ca';

  return (
    <View style={[styles.container, { backgroundColor: badgeBg }]}>
      <Text style={[styles.text, { color: textColor }]}>
        Tiến độ: <Text style={{ fontWeight: 'bold', color: accentColor }}>{completedNotes}/{totalNotes}</Text> ghi chú xong
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 16,
  },
  text: {
    fontSize: 13,
  },
});
