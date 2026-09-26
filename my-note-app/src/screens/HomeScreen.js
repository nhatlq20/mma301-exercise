import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    RefreshControl,
    TextInput,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { loadNotes } from '../storage/note';
import NoteItem from '../components/NoteItem';
import { filterNotesBySearch, sortNotesByUpdatedAt } from '../utils/helper';

export default function HomeScreen({ navigation }) {
    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const fetchNotes = async () => {
        const data = await loadNotes();
        setNotes(sortNotesByUpdatedAt(data));
    };

    useFocusEffect(
        useCallback(() => {
            fetchNotes();
        }, [])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchNotes();
        setRefreshing(false);
    };

    const displayedNotes = filterNotesBySearch(notes, search);

    return (
        <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
            {/* Ô tìm kiếm */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm ghi chú..."
                    placeholderTextColor="#999"
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            {/* Danh sách ghi chú */}
            <FlatList
                data={displayedNotes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <NoteItem
                        note={item}
                        onPress={() => navigation.navigate('EditNote', { note: item })}
                    />
                )}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Chưa có ghi chú nào. Hãy tạo mới!</Text>
                }
            />

            {/* Nút Floating Action Button (+) */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('AddNote')}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f4f5',
    },
    searchContainer: {
        padding: 16,
        backgroundColor: '#ffffff',
    },
    searchInput: {
        backgroundColor: '#f1f2f6',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 8,
        fontSize: 15,
    },
    listContent: {
        padding: 16,
        paddingBottom: 80,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 60,
        fontSize: 16,
        color: '#a4b0be',
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 24,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#0984e3',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    fabText: {
        color: '#ffffff',
        fontSize: 32,
        lineHeight: 34,
    },
});