import { IUser } from "@/configs/type";

export interface PendingFriend {
    __v: number;
    sender: IUser;
    sentAt: string;
}
