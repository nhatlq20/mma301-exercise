// screens/CounterScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { add, subtract } from '../utils/mathUtils';

export default function CounterScreen() {
    const [count, setCount] = useState(0);

    // 1. Tăng số đếm
    const handleIncrement = () => {
        try {
            const nextValue = add(count, 1);
            console.log('Tăng count lên:', nextValue);
            setCount(nextValue);
        } catch (error) {
            console.error('Lỗi khi tăng:', error.message);
            Alert.alert('Lỗi', 'Không thể thực hiện phép tính tăng!');
        }
    };

    // 2. Giảm số đếm
    const handleDecrement = () => {
        try {
            const nextValue = subtract(count, 1);
            console.log('Giảm count xuống:', nextValue);
            setCount(nextValue);
        } catch (error) {
            console.error('Lỗi khi giảm:', error.message);
            Alert.alert('Lỗi', 'Không thể thực hiện phép tính giảm!');
        }
    };

    // 3. Đặt lại số đếm về 0
    const handleReset = () => {
        console.log('Reset count về 0');
        setCount(0);
    };

    // 4. Mục kiểm thử: Cố tình truy cập biến undefined/null để kích hoạt lỗi Runtime
    const handleTriggerError = () => {
        try {
            console.log('Thử nghiệm truy cập biến null...');
            let dummyObject = null;
            // Hành vi gây TypeError kinh điển: Cannot read property 'test' of null
            console.log(dummyObject.test);
        } catch (error) {
            // Xử lý lỗi an toàn: In log và thông báo ra UI thay vì làm văng ứng dụng
            console.warn('Đã bắt được lỗi JavaScript Runtime:', error.message);
            Alert.alert(
                'Đã bắt được lỗi (Try...Catch)!',
                `Chi tiết lỗi: ${error.message}\nỨng dụng vẫn hoạt động bình thường mà không bị crash.`
            );
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
            <Text style={styles.headerTitle}>Ứng Dụng Đếm Số Đơn Giản</Text>
            <Text style={styles.subTitle}>(Expo SDK 57 - Handling Errors)</Text>

            {/* Vùng hiển thị số đếm */}
            <View style={styles.counterBox}>
                <Text style={styles.counterText}>{count}</Text>
            </View>

            {/* Vùng các nút chức năng */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.btn, styles.incrementBtn]} onPress={handleIncrement}>
                    <Text style={styles.btnText}>+ Tăng</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.btn, styles.decrementBtn]} onPress={handleDecrement}>
                    <Text style={styles.btnText}>- Giảm</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.btn, styles.resetBtn]} onPress={handleReset}>
                    <Text style={styles.btnText}>⟲ Reset</Text>
                </TouchableOpacity>
            </View>

            {/* Nút kiểm thử kỹ năng bắt lỗi */}
            <TouchableOpacity style={styles.errorBtn} onPress={handleTriggerError}>
                <Text style={styles.errorBtnText}>⚠ Cố tình gây lỗi (Test Error Handling)</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2d3436',
    },
    subTitle: {
        fontSize: 14,
        color: '#636e72',
        marginTop: 4,
        marginBottom: 30,
    },
    counterBox: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
    },
    counterText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#0984e3',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 30,
    },
    btn: {
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 8,
        elevation: 2,
    },
    incrementBtn: {
        backgroundColor: '#00b894',
    },
    decrementBtn: {
        backgroundColor: '#d63031',
    },
    resetBtn: {
        backgroundColor: '#636e72',
    },
    btnText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorBtn: {
        marginTop: 20,
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: '#fdcb6e',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e17055',
    },
    errorBtnText: {
        color: '#d63031',
        fontWeight: '600',
        fontSize: 14,
    },
});