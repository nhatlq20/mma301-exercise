import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    SectionList,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import SectionHeader from '../components/SectionHeader';
import NewsItem from '../components/NewsItem';
import { fetchNews, groupNewsByCategory } from '../services/newsService';

export default function HomeScreen() {
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Lấy dữ liệu và phân theo category
    const loadNews = async (isRefresh = false) => {
        if (isRefresh) {
            setRefreshing(true);
        } else {
            setLoading(true);
        }

        try {
            // Bước 2: Lấy dữ liệu từ service và phân loại theo category
            const rawNews = await fetchNews(isRefresh);
            const categorized = groupNewsByCategory(rawNews);
            setSections(categorized);
        } catch (error) {
            console.error('Lỗi khi tải tin tức:', error);
            setSections([]);
        } finally {
            if (isRefresh) {
                setRefreshing(false);
            } else {
                setLoading(false);
            }
        }
    };

    // Tải dữ liệu ban đầu
    useEffect(() => {
        loadNews();
    }, []);

    // Xử lý kéo xuống để làm mới (Pull-to-Refresh)
    const handleRefresh = useCallback(() => {
        loadNews(true);
    }, []);

    // Hiển thị khi không có dữ liệu (Empty view)
    const renderEmpty = () => {
        if (loading) return null;
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyIcon}>📭</Text>
                <Text style={styles.emptyText}>Không có tin tức</Text>
                <TouchableOpacity style={styles.reloadButton} onPress={() => loadNews(false)}>
                    <Text style={styles.reloadButtonText}>Tải lại dữ liệu</Text>
                </TouchableOpacity>
            </View>
        );
    };

    // Header của ứng dụng
    const renderAppHeader = () => (
        <View style={styles.appHeader}>
            <View>
                <Text style={styles.appTitle}>Tin Tức Tổng Hợp</Text>
                <Text style={styles.appSubtitle}>Cập nhật theo từng chuyên mục</Text>
            </View>
            {sections.length > 0 && (
                <TouchableOpacity
                    style={styles.testEmptyBtn}
                    onPress={() => setSections([])}
                >
                    <Text style={styles.testEmptyText}>Test rỗng</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            {loading && !refreshing ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text style={styles.loadingText}>Đang tải tin tức...</Text>
                </View>
            ) : (
                <SectionList
                    sections={sections}
                    keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                    renderItem={({ item }) => <NewsItem item={item} />}
                    renderSectionHeader={({ section: { title } }) => (
                        <SectionHeader title={title} />
                    )}
                    ListHeaderComponent={renderAppHeader}
                    ListEmptyComponent={renderEmpty}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    stickySectionHeadersEnabled={true}
                    contentContainerStyle={sections.length === 0 ? styles.emptyListContent : styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fa',
    },
    appHeader: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    appTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    appSubtitle: {
        fontSize: 13,
        color: '#6c757d',
        marginTop: 2,
    },
    testEmptyBtn: {
        backgroundColor: '#f1f3f5',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#dee2e6',
    },
    testEmptyText: {
        fontSize: 12,
        color: '#495057',
        fontWeight: '500',
    },
    listContent: {
        paddingBottom: 24,
    },
    emptyListContent: {
        flexGrow: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 14,
        color: '#6c757d',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 80,
        paddingHorizontal: 20,
    },
    emptyIcon: {
        fontSize: 48,
        marginBottom: 12,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#6c757d',
        marginBottom: 16,
    },
    reloadButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    reloadButtonText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
    },
});

