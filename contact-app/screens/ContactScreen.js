import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
    View,
    Text,
    TextInput,
    SectionList,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import ContactItem from '../components/ContactItem';
import { groupByAlphabet } from '../utils/groupByAlphabet';

// Dữ liệu JSON giả lập phòng trường hợp offline hoặc không gọi được API
const MOCK_CONTACTS = [
    { id: '1', name: 'An Nguyễn', phone: '0901 123 456', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
    { id: '2', name: 'Bảo Trần', phone: '0902 234 567', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
    { id: '3', name: 'Bình Lê', phone: '0903 345 678', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
    { id: '4', name: 'Cường Phạm', phone: '0904 456 789', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150' },
    { id: '5', name: 'Dương Đỗ', phone: '0905 567 890', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150' },
    { id: '6', name: 'Duy Hoàng', phone: '0906 678 901', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150' },
    { id: '7', name: 'Hải Vũ', phone: '0907 789 012', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150' },
    { id: '8', name: 'Hương Bùi', phone: '0908 890 123', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150' },
    { id: '9', name: 'Khánh Đặng', phone: '0909 901 234', avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150' },
    { id: '10', name: 'Lan Ngô', phone: '0910 012 345', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150' },
    { id: '11', name: 'Minh Trịnh', phone: '0911 123 456', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150' },
    { id: '12', name: 'Nam Đoàn', phone: '0912 234 567', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150' },
    { id: '13', name: 'Phương Lâm', phone: '0913 345 678', avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150' },
    { id: '14', name: 'Quân Đinh', phone: '0914 456 789', avatar: 'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=150' },
    { id: '15', name: 'Sơn Mai', phone: '0915 567 890', avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150' },
    { id: '16', name: 'Thảo Phan', phone: '0916 678 901', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
    { id: '17', name: 'Tuấn Lý', phone: '0917 789 012', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' },
    { id: '18', name: 'Việt Cao', phone: '0918 890 123', avatar: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=150' },
];

export default function ContactScreen() {
    const [contacts, setContacts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Bước 1: Lấy dữ liệu user từ randomuser.me API hoặc mock
    const fetchContacts = async (isRefresh = false) => {
        if (isRefresh) {
            setRefreshing(true);
        } else {
            setLoading(true);
        }

        try {
            const response = await fetch('https://randomuser.me/api/?results=30&inc=login,name,phone,email,picture');
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const formattedUsers = data.results.map((user) => ({
                    id: user.login.uuid,
                    // Kết hợp first name và last name
                    name: `${user.name.first} ${user.name.last}`,
                    phone: user.phone,
                    email: user.email,
                    avatar: user.picture.medium,
                }));
                setContacts(formattedUsers);
            } else {
                setContacts(MOCK_CONTACTS);
            }
        } catch (error) {
            console.warn('Không thể kết nối randomuser.me API, dùng dữ liệu giả lập:', error.message);
            // Dữ liệu mock làm fallback
            if (isRefresh) {
                // Tạo một bản cập nhật ngẫu nhiên khi kéo làm mới
                const updatedMock = MOCK_CONTACTS.map((item) => ({
                    ...item,
                    phone: `09${Math.floor(10000000 + Math.random() * 90000000)}`,
                }));
                setContacts(updatedMock);
            } else {
                setContacts(MOCK_CONTACTS);
            }
        } finally {
            if (isRefresh) {
                setRefreshing(false);
            } else {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    // Bước 5: Pull-to-refresh cập nhật lại danh bạ
    const handleRefresh = useCallback(() => {
        fetchContacts(true);
    }, []);

    // Bước 4: Thêm TextInput để lọc danh sách theo tên (sử dụng useMemo)
    const filteredContacts = useMemo(() => {
        if (!searchText.trim()) {
            return contacts;
        }
        const query = searchText.toLowerCase().trim();
        return contacts.filter((c) =>
            (c.name || '').toLowerCase().includes(query) ||
            (c.phone || '').includes(query)
        );
    }, [contacts, searchText]);

    // Bước 2: Phân nhóm theo ký tự đầu tiên của tên (sử dụng useMemo + groupByAlphabet)
    const sections = useMemo(() => {
        return groupByAlphabet(filteredContacts);
    }, [filteredContacts]);

    // Render Header cho từng Section (A, B, C...)
    const renderSectionHeader = ({ section: { title } }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
        </View>
    );

    // Render khi không tìm thấy kết quả
    const renderEmpty = () => {
        if (loading) return null;
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyIcon}>🔍</Text>
                <Text style={styles.emptyText}>Không tìm thấy liên hệ phù hợp</Text>
                {searchText.length > 0 && (
                    <TouchableOpacity
                        style={styles.clearSearchBtn}
                        onPress={() => setSearchText('')}
                    >
                        <Text style={styles.clearSearchText}>Xóa từ khóa tìm kiếm</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Header thanh tìm kiếm */}
            <View style={styles.searchContainer}>
                <Text style={styles.searchIcon}>🔍</Text>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm danh bạ theo tên..."
                    placeholderTextColor="#8e8e93"
                    value={searchText}
                    onChangeText={setSearchText}
                    autoCapitalize="none"
                    autoCorrect={false}
                    clearButtonMode="while-editing"
                />
                {searchText.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchText('')} style={styles.clearIconWrapper}>
                        <Text style={styles.clearIcon}>✕</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Đang tải dữ liệu ban đầu */}
            {loading && !refreshing ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text style={styles.loadingText}>Đang tải danh bạ...</Text>
                </View>
            ) : (
                /* Bước 3: Hiển thị qua SectionList */
                <SectionList
                    sections={sections}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <ContactItem item={item} />}
                    renderSectionHeader={renderSectionHeader}
                    ListEmptyComponent={renderEmpty}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    stickySectionHeadersEnabled={true}
                    contentContainerStyle={sections.length === 0 ? styles.emptyListContent : null}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f7',
        marginHorizontal: 16,
        marginVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
        height: 42,
    },
    searchIcon: {
        fontSize: 16,
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#000000',
        paddingVertical: 0,
    },
    clearIconWrapper: {
        padding: 4,
    },
    clearIcon: {
        fontSize: 14,
        color: '#8e8e93',
        fontWeight: 'bold',
    },
    sectionHeader: {
        backgroundColor: '#f6f8fa',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#e1e4e8',
    },
    sectionHeaderText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#007AFF',
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
        fontSize: 44,
        marginBottom: 10,
    },
    emptyText: {
        fontSize: 16,
        color: '#6c757d',
        fontWeight: '500',
        marginBottom: 14,
    },
    clearSearchBtn: {
        backgroundColor: '#007AFF',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
    },
    clearSearchText: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: '600',
    },
    emptyListContent: {
        flexGrow: 1,
    },
});

