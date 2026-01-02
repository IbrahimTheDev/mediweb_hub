
"use client";

import { create } from 'zustand';

export type Notification = {
    id: string;
    userId: string;
    message: string;
    type: 'status_change' | 'new_request' | 'message';
    is_read: boolean;
    created_at: string;
};

type NotificationState = {
    notifications: Notification[];
    addNotification: (notification: Omit<Notification, 'id' | 'created_at' | 'is_read'>) => void;
    markAsRead: (userId: string) => void;
};

export const useNotificationStore = create<NotificationState>((set, get) => ({
    notifications: [],
    addNotification: (notification) => {
        const newNotification: Notification = {
            ...notification,
            id: `notif-${Date.now()}`,
            created_at: new Date().toISOString(),
            is_read: false,
        };
        set((state) => ({
            notifications: [newNotification, ...state.notifications],
        }));
    },
    markAsRead: (userId: string) => {
        set((state) => ({
            notifications: state.notifications.map(n => 
                n.userId === userId ? { ...n, is_read: true } : n
            ),
        }));
    },
}));
