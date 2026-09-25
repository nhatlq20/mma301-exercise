import React, { useReducer } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const initialState = { count: 0 };

function counterReducer(state, action) {
    switch (action.type) {
        case 'INCREMENT':
            return { count: state.count + 1 };
        case 'DECREMENT':
            return { count: state.count - 1 };
        case 'RESET':
            return { count: 0 };
        default:
            return state;
    }
}

export default function LocalCounter() {
    const [state, dispatch] = useReducer(counterReducer, initialState);

    return (
        <View style={styles.card}>
            <Text style={styles.title}>1. Local Counter (useReducer)</Text>
            <Text style={styles.desc}>State chỉ tồn tại bên trong component này</Text>
            <Text style={styles.counterValue}>{state.count}</Text>

            <View style={styles.buttonGroup}>
                <TouchableOpacity
                    style={[styles.btn, styles.incBtn]}
                    onPress={() => dispatch({ type: 'INCREMENT' })}
                >
                    <Text style={styles.btnText}>+ Tăng</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.btn, styles.decBtn]}
                    onPress={() => dispatch({ type: 'DECREMENT' })}
                >
                    <Text style={styles.btnText}>- Giảm</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.btn, styles.resetBtn]}
                    onPress={() => dispatch({ type: 'RESET' })}
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
        color: '#0984e3',
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