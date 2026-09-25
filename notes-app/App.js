import React, { useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from './store/store';
import { setNotes, deleteNote } from './store/notesSlice';
import { saveNotesToStorage, loadNotesFromStorage } from './utils/storage';
import NoteInput from './components/NoteInput';
import NoteItem from './components/NoteItem';

function NotesScreen() {
  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  // Đọc ghi chú từ AsyncStorage khi khởi động app
  useEffect(() => {
    const initData = async () => {
      const storedNotes = await loadNotesFromStorage();
      if (storedNotes && storedNotes.length > 0) {
        dispatch(setNotes(storedNotes));
      }
    };
    initData();
  }, [dispatch]);

  // Tự động lưu vào AsyncStorage mỗi khi state notes thay đổi
  useEffect(() => {
    saveNotesToStorage(notes);
  }, [notes]);

  const handleDelete = useCallback((id) => {
    dispatch(deleteNote(id));
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Notes App (SDK 57)</Text>
          <Text style={styles.subTitle}>Redux Toolkit + AsyncStorage</Text>
        </View>

        {/* Khối nhập ghi chú */}
        <NoteInput />

        {/* Danh sách ghi chú */}
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <NoteItem item={item} onDelete={handleDelete} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Chưa có ghi chú nào. Hãy thêm ngay!</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar style="dark" />
        <NotesScreen />
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f2f6',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2f3542',
  },
  subTitle: {
    fontSize: 13,
    color: '#747d8c',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 15,
    color: '#a4b0be',
  },
});