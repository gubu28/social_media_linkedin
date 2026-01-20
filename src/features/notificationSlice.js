import { createSlice } from '@reduxjs/toolkit';

const savedNotifications = JSON.parse(localStorage.getItem('gubu_notifications')) || [];
const savedUnread = parseInt(localStorage.getItem('gubu_unread')) || 0;

export const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notifications: savedNotifications,
        unreadCount: savedUnread,
        toast: {
            message: '',
            visible: false,
            type: 'default'
        }
    },
    reducers: {
        addNotification: (state, action) => {
            state.notifications = [action.payload, ...state.notifications];
            state.unreadCount += 1;

            // Persist
            localStorage.setItem('gubu_notifications', JSON.stringify(state.notifications));
            localStorage.setItem('gubu_unread', state.unreadCount.toString());
        },
        clearUnread: (state) => {
            state.unreadCount = 0;
            localStorage.setItem('gubu_unread', '0');
        },
        clearNotifications: (state) => {
            state.notifications = [];
            state.unreadCount = 0;
            localStorage.removeItem('gubu_notifications');
            localStorage.setItem('gubu_unread', '0');
        },
        showToast: (state, action) => {
            state.toast = {
                message: action.payload.message,
                type: action.payload.type || 'default',
                visible: true
            };
        },
        hideToast: (state) => {
            state.toast.visible = false;
        }
    },
});

export const { addNotification, clearUnread, clearNotifications, showToast, hideToast } = notificationSlice.actions;

export const selectNotifications = (state) => state.notification.notifications;
export const selectUnreadCount = (state) => state.notification.unreadCount;
export const selectToast = (state) => state.notification.toast;

export default notificationSlice.reducer;
