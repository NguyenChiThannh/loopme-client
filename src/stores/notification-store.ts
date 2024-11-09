import { create } from "zustand";

interface NotificationState {
    isOpen: boolean;
    handleOpenChange: (isOpen: boolean) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
    isOpen: false,
    handleOpenChange: (isOpen: boolean) => set({ isOpen }),
}));
