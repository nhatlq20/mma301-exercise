import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const CustomDrawerContent = (props) => {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.header}>
                <Text style={styles.headerText}>📝 TODO APP</Text>
                <Text style={styles.subHeaderText}>Quản lý công việc hiệu quả</Text>
            </View>
            <DrawerItemList {...props} />
            <View style={styles.footer}>
                <Text style={styles.footerText}>Version 1.0.0 (Expo SDK 57)</Text>
            </View>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: 20,
        backgroundColor: '#6200ee',
        marginBottom: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    subHeaderText: {
        fontSize: 14,
        color: '#ddd',
        marginTop: 5,
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        marginTop: 10,
    },
    footerText: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
    },
});

export default CustomDrawerContent;