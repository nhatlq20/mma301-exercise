import React, { useContext } from 'react';
import { View, Button, StyleSheet, SafeAreaView, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ThemeContext } from '../contexts/ThemeContext';
import Title from '../components/Title';
import NoteStatsBadge from '../components/NoteStatsBadge';
import NoteInput from '../components/NoteInput';
import NoteList from '../components/NoteList';

export default function HomeScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const isDark = theme === 'dark';
  const bg = isDark ? '#121214' : '#f8fafc';
  const color = isDark ? '#ffffff' : '#0f172a';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: bg }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <View style={styles.container}>
        {/* Header với Title giữ nguyên để phục vụ bài Lab (React.memo & Profiler) */}
        <View style={styles.header}>
          <Title text="My Daily Notes" color={color} />
          
          <View style={styles.themeBtnWrapper}>
            <Button
              title={isDark ? '☀️ Chế độ Sáng' : '🌙 Chế độ Tối'}
              onPress={toggleTheme}
              color={isDark ? '#38bdf8' : '#4f46e5'}
            />
          </View>
        </View>

        {/* Component Cấp 2: Thống kê số lượng ghi chú từ NotesContext */}
        <NoteStatsBadge />

        {/* Component Cấp 1: Form nhập ghi chú (gọi addNote từ NotesContext) */}
        <NoteInput />

        {/* Component Cấp 1: Danh sách ghi chú */}
        <View style={styles.listWrapper}>
          <NoteList />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight || 20 : 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 8,
  },
  themeBtnWrapper: {
    marginBottom: 8,
  },
  listWrapper: {
    flex: 1,
  },
});
