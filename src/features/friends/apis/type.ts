import { UserSelect } from "@/configs/type";

export interface PendingFriend {
    __v: number;
    sender: UserSelect;
    sentAt: string;
}

export interface Friend extends UserSelect {}
