import { create } from "zustand";

interface UpdatePostDialogState {
    isOpen: boolean;
    handleOpenChange: (isOpen: boolean) => void;
}

export const useUpdatePostDialogStore = create<UpdatePostDialogState>(
    (set) => ({
        isOpen: false,
        handleOpenChange: (isOpen: boolean) => set({ isOpen }),
    }),
);
