import React from 'react';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { NotesProvider } from './src/contexts/NotesContext';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return (
    <ThemeProvider>
      <NotesProvider>
        <HomeScreen />
      </NotesProvider>
    </ThemeProvider>
  );
}
