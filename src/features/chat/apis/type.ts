import { z } from "zod";

import { UserSelect } from "@/configs/type";

export const chatRequestSchema = {
    createChannel: z.object({
        friendId: z.string().min(1, "Friend ID is required"),
    }),
    sendMessage: z.object({
        receiverId: z.string().min(1, "Receiver ID is required"),
        senderId: z.string().min(1, "Sender ID is required"),
        message: z.string().min(1, "Message is required"),
    }),
};

export interface Message {
    _id: string;
    sender: string;
    receiver: string;
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
    participants: UserSelect[];
    readAt: string;
    updatedAt: string;
    lastMessage: Message;
}
