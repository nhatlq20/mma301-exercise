import { Platform } from 'react-native';
import { setNotificationHandler } from 'expo-notifications/build/NotificationsHandler';
import { getPermissionsAsync, requestPermissionsAsync } from 'expo-notifications/build/NotificationPermissions';
import { setNotificationChannelAsync } from 'expo-notifications/build/setNotificationChannelAsync';
import { AndroidImportance } from 'expo-notifications/build/NotificationChannelManager.types';
import { scheduleNotificationAsync } from 'expo-notifications/build/scheduleNotificationAsync';

const Notifications = {
    setNotificationHandler,
    getPermissionsAsync,
    requestPermissionsAsync,
    setNotificationChannelAsync,
    AndroidImportance,
    scheduleNotificationAsync,
};

// Thiết lập cách xử lý thông báo khi ứng dụng đang mở ở foreground
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export const scheduleNotification = async (title, date) => {
    try {
        // Yêu cầu quyền thông báo
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            return;
        }

        // Cấu hình channel cho Android
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
            });
        }

        await Notifications.scheduleNotificationAsync({
            content: {
                title: '⏰ Nhắc việc To-do App',
                body: `Đừng quên công việc: ${title}`,
            },
            trigger: { date },
        });
    } catch (error) {
        console.error('Lỗi lên lịch thông báo:', error);
    }
};