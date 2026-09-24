import React, { useContext } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import InfoScreen from '../screens/InfoScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { ThemeContext } from '../context/ThemeContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function HomeStack() {
    const { theme } = useContext(ThemeContext);
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: theme.colors.card },
                headerTintColor: theme.colors.text,
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Danh sách công việc' }}
            />
            <Stack.Screen
                name="Details"
                component={DetailsScreen}
                options={{ title: 'Chi tiết công việc' }}
            />
        </Stack.Navigator>
    );
}

function TabNavigator() {
    const { theme } = useContext(ThemeContext);
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.isDarkMode ? '#888' : '#666',
                tabBarStyle: {
                    backgroundColor: theme.colors.card,
                    borderTopColor: theme.colors.border,
                    height: 60,
                    paddingBottom: 6,
                },
            }}
        >
            <Tab.Screen
                name="Tasks"
                component={HomeStack}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Công việc',
                    tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>📋</Text>,
                }}
            />
            <Tab.Screen
                name="Info"
                component={InfoScreen}
                options={{
                    title: 'Thông tin',
                    headerStyle: { backgroundColor: theme.colors.card },
                    headerTintColor: theme.colors.text,
                    tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>ℹ️</Text>,
                }}
            />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    const { theme } = useContext(ThemeContext);
    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={{
                    drawerStyle: { backgroundColor: theme.colors.background },
                    drawerLabelStyle: { color: theme.colors.text },
                    headerStyle: { backgroundColor: theme.colors.card },
                    headerTintColor: theme.colors.text,
                }}
            >
                <Drawer.Screen
                    name="Main"
                    component={TabNavigator}
                    options={{ title: 'Trang chủ' }}
                />
                <Drawer.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{ title: 'Cài đặt' }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}