import { UserSelect } from "@/configs/type";

export const NotificationType = {
    dislike: "dislike",
    like: "like",
    comment: "comment",
    request_to_join_group: "request_to_join_group",
    friend_request: "friend_request",
    accept_join_group: "accept_join_group",
    accept_friend: "accept_friend",
} as const;

export interface Notification {
    _id: string;
    actor: UserSelect;
    type: keyof typeof NotificationType;
    read: boolean;
    createdAt: string;
    targetName?: string;
}
