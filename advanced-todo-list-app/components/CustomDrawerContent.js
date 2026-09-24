import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { ThemeContext } from '../context/ThemeContext';

const CustomDrawerContent = (props) => {
    const { theme } = useContext(ThemeContext);

    return (
        <DrawerContentScrollView
            {...props}
            style={{ backgroundColor: theme.colors.background }}
        >
            <View
                style={[
                    styles.header,
                    {
                        backgroundColor: theme.colors.card,
                        borderBottomColor: theme.colors.border,
                    },
                ]}
            >
                <Text style={[styles.headerText, { color: theme.colors.primary }]}>
                    ⚡ Advanced TODO (SDK 57)
                </Text>
            </View>
            <DrawerItem
                label="Home"
                onPress={() => props.navigation.navigate('Main')}
                labelStyle={{ color: theme.colors.text }}
            />
            <DrawerItem
                label="Settings"
                onPress={() => props.navigation.navigate('Settings')}
                labelStyle={{ color: theme.colors.text }}
            />
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: 24,
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default CustomDrawerContent;