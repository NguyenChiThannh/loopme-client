import { z } from "zod";

import { UserSelect } from "@/configs/type";

export const chatRequestSchema = {
    createChannel: z.object({
        friendId: z.string().min(1, "Friend ID is required"),
    }),
};

export interface Message {
    _id: string;
    sender: UserSelect;
    receiver: UserSelect;
    message: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface Channel {
    _id: string;
    __v: number;
    createdAt: string;
    isRead: boolean;
    name: string;
    participants: UserSelect[];
    readAt: string;
    updatedAt: string;
}
