import React, { createContext, useContext, useState } from 'react';

// 1. Tạo Context
export const NotesContext = createContext();

// 2. Custom hook để các component con dễ dàng sử dụng
export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes phải được sử dụng bên trong NotesProvider');
  }
  return context;
}

// 3. Provider quản lý toàn bộ State của ghi chú
export function NotesProvider({ children }) {
  // Khởi tạo một số ghi chú mẫu để minh họa ngay khi chạy app
  const [notes, setNotes] = useState([
    { id: '1', text: 'Học lý thuyết Context API trong React Native', completed: true },
    { id: '2', text: 'Quan sát hiện tượng Prop Drilling và cách khắc phục', completed: true },
    { id: '3', text: 'Kiểm tra re-render qua React DevTools Profiler', completed: false },
  ]);

  // Thêm ghi chú mới
  const addNote = (text) => {
    if (!text.trim()) return;
    const newNote = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  // Xóa ghi chú (Được gọi trực tiếp từ NoteActions ở cấp con sâu nhất)
  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  // Đổi trạng thái hoàn thành / chưa hoàn thành
  const toggleNote = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, completed: !note.completed } : note
      )
    );
  };

  // Tính toán số lượng ghi chú
  const totalNotes = notes.length;
  const completedNotes = notes.filter((n) => n.completed).length;

  return (
    <NotesContext
      value={{
        notes,
        addNote,
        deleteNote,
        toggleNote,
        totalNotes,
        completedNotes,
      }}
    >
      {children}
    </NotesContext>
  );
}
