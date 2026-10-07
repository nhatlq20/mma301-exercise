import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import ProductItem from '../components/ProductItem';
import { fetchProducts } from '../services/productApi';

export default function ProductScreen() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

    // Gọi API mỗi khi biến page thay đổi
    useEffect(() => {
        loadData();
    }, [page]);

    const loadData = async () => {
        if (loadingMore) return;
        setLoadingMore(true);

        const newProducts = await fetchProducts(page);
        // Nối dữ liệu mới vào cuối mảng dữ liệu cũ
        setProducts(prev => [...prev, ...newProducts]);

        setLoadingMore(false);
    };

    // Kích hoạt khi cuộn đến cuối danh sách
    const handleLoadMore = () => {
        if (!loadingMore) {
            setPage(prevPage => prevPage + 1);
        }
    };

    // Spinner hiển thị ở chân danh sách khi đang tải
    const renderFooter = () => {
        if (!loadingMore) return null;
        return <ActivityIndicator style={{ marginVertical: 20 }} size="large" color="#0000ff" />;
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item, index) => item.id.toString() + index.toString()}
                renderItem={({ item }) => <ProductItem item={item} />}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5} // Kích hoạt khi còn 50% khoảng cách đến cuối
                ListFooterComponent={renderFooter}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f2f5', paddingHorizontal: 16 }
});