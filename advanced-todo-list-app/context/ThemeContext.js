import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const loadTheme = async () => {
            const savedTheme = await AsyncStorage.getItem('theme_preference');
            if (savedTheme) {
                setIsDarkMode(savedTheme === 'dark');
            }
        };
        loadTheme();
    }, []);

    const toggleTheme = async () => {
        const nextMode = !isDarkMode;
        setIsDarkMode(nextMode);
        await AsyncStorage.setItem('theme_preference', nextMode ? 'dark' : 'light');
    };

    const theme = {
        isDarkMode,
        colors: {
            background: isDarkMode ? '#1e1e1e' : '#f5f5f5',
            card: isDarkMode ? '#2d2d2d' : '#ffffff',
            text: isDarkMode ? '#f1f2f6' : '#2f3542',
            primary: '#6200ee',
            border: isDarkMode ? '#444444' : '#e0e0e0',
        },
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};