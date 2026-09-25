import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { toggle, remove } from './store/taskSlice';
import { useTheme } from './ThemeContext';
import TaskInput from './components/TaskInput';
import TaskItem from './components/TaskItem';

export default function AppContent() {
    const tasks = useSelector((state) => state.tasks);
    const dispatch = useDispatch();
    const { theme, toggleTheme } = useTheme();

    const isDark = theme === 'dark';

    return (
        <SafeAreaView
            style={[
                styles.safeArea,
                { backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5' },
            ]}
            edges={['top', 'left', 'right', 'bottom']}
        >
            <View style={styles.container}>
                {/* Header điều khiển Theme */}
                <View style={styles.header}>
                    <Text style={[styles.headerTitle, { color: isDark ? '#ffffff' : '#222222' }]}>
                        Task Manager (SDK 57)
                    </Text>
                    <Button
                        title={isDark ? 'Chế độ Sáng' : 'Chế độ Tối'}
                        onPress={toggleTheme}
                        color={isDark ? '#f1c40f' : '#34495e'}
                    />
                </View>

                {/* Khối nhập liệu */}
                <TaskInput />

                {/* Danh sách Task bằng FlatList */}
                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TaskItem
                            item={item}
                            onToggle={(id) => dispatch(toggle(id))}
                            onDelete={(id) => dispatch(remove(id))}
                        />
                    )}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <Text style={[styles.emptyText, { color: isDark ? '#888888' : '#aaaaaa' }]}>
                            Không có công việc nào. Thêm ngay!
                        </Text>
                    }
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    listContent: {
        paddingBottom: 20,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 40,
        fontSize: 16,
    },
});