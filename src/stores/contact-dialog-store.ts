import { create } from "zustand";

interface ContactDialogState {
    isOpen: boolean;
    handleOpenChange: (isOpen: boolean) => void;
}

export const useContactDialogStore = create<ContactDialogState>((set) => ({
    isOpen: false,
    handleOpenChange: (isOpen: boolean) => set({ isOpen }),
}));
