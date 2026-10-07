import React, { createContext, useContext, useState } from 'react';

// Tạo Context (React 19)
export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

// Custom hook tiện dụng
export function useTheme() {
  return useContext(ThemeContext);
}

// Provider bao bọc toàn bộ ứng dụng (React 19 dùng trực tiếp <ThemeContext>)
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext>
  );
}

