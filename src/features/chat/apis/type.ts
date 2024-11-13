import { UserSelect } from "@/configs/type";

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
