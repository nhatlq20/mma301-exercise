import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../store/counterSlice';

export default function GlobalCounter() {
    const globalCount = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <View style={styles.card}>
            <Text style={styles.title}>2. Global Counter (Redux Toolkit)</Text>
            <Text style={styles.desc}>State được chia sẻ toàn ứng dụng</Text>
            <Text style={styles.counterValue}>{globalCount}</Text>

            <View style={styles.buttonGroup}>
                <TouchableOpacity
                    style={[styles.btn, styles.incBtn]}
                    onPress={() => dispatch(increment())}
                >
                    <Text style={styles.btnText}>+ Tăng</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.btn, styles.decBtn]}
                    onPress={() => dispatch(decrement())}
                >
                    <Text style={styles.btnText}>- Giảm</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.btn, styles.resetBtn]}
                    onPress={() => dispatch(reset())}
                >
                    <Text style={styles.btnText}>⟲ Reset</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 14,
        padding: 18,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2d3436',
    },
    desc: {
        fontSize: 12,
        color: '#636e72',
        marginTop: 2,
        marginBottom: 10,
    },
    counterValue: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#6c5ce7',
        textAlign: 'center',
        marginVertical: 10,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    btn: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    incBtn: { backgroundColor: '#00b894' },
    decBtn: { backgroundColor: '#d63031' },
    resetBtn: { backgroundColor: '#636e72' },
    btnText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});