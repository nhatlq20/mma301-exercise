import React from 'react';
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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabIcon = ({ label, color }) => (
    <Text style={{ fontSize: 20, color }}>{label}</Text>
);

// 1. Stack Navigator: Home -> Details
function HomeStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#6200ee' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' },
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
                options={{ title: 'Chi tiết' }}
            />
        </Stack.Navigator>
    );
}

// 2. Tab Navigator: Tasks - Info
function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#6200ee',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { height: 60, paddingBottom: 6 },
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Tasks"
                component={HomeStack}
                options={{
                    tabBarLabel: 'Công việc',
                    tabBarIcon: ({ color }) => <TabIcon label="📋" color={color} />,
                }}
            />
            <Tab.Screen
                name="Info"
                component={InfoScreen}
                options={{
                    tabBarLabel: 'Thông tin',
                    tabBarIcon: ({ color }) => <TabIcon label="ℹ️" color={color} />,
                    headerShown: true,
                    headerStyle: { backgroundColor: '#6200ee' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' },
                    title: 'Thông tin',
                }}
            />
        </Tab.Navigator>
    );
}

// 3. Drawer Navigator: Main App + Settings
export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={{
                    headerStyle: { backgroundColor: '#6200ee' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' },
                    drawerActiveTintColor: '#6200ee',
                    drawerInactiveTintColor: '#666',
                }}
            >
                <Drawer.Screen
                    name="MainApp"
                    component={TabNavigator}
                    options={{ title: 'TODO App', drawerLabel: 'Trang chủ' }}
                />
                <Drawer.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{ title: 'Cài đặt', drawerLabel: 'Cài đặt' }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}