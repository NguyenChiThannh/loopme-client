import { Notification } from "../apis/type";
import {
    MessageSquare,
    ThumbsDown,
    ThumbsUp,
    UserPlus,
    Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NotificationItemProps {
    notification: Notification;
}

export function NotificationItem({ notification }: NotificationItemProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
    };

    const getNotificationContent = (
        notification: NotificationItemProps["notification"],
    ) => {
        switch (notification.type) {
            case "like":
                return (
                    <>
                        <ThumbsUp className="mr-2 h-4 w-4 text-blue-500" />
                        <span>liked your post</span>
                    </>
                );
            case "dislike":
                return (
                    <>
                        <ThumbsDown className="mr-2 h-4 w-4 text-red-500" />
                        <span>disliked your post</span>
                    </>
                );
            case "comment":
                return (
                    <>
                        <MessageSquare className="mr-2 h-4 w-4 text-green-500" />
                        <span>commented on your post</span>
                    </>
                );
            case "friend_request":
                return (
                    <>
                        <UserPlus className="mr-2 h-4 w-4 text-purple-500" />
                        <span>sent you a friend request</span>
                    </>
                );
            case "accept_friend":
                return (
                    <>
                        <UserPlus className="mr-2 h-4 w-4 text-purple-500" />
                        <span>accepted your friend request</span>
                    </>
                );
            case "request_to_join_group":
                return (
                    <>
                        <Users className="mr-2 h-4 w-4 text-orange-500" />
                        <span>requested to join {notification.targetName}</span>
                    </>
                );
            case "accept_join_group":
                return (
                    <>
                        <Users className="mr-2 h-4 w-4 text-orange-500" />
                        <span>
                            accepted your request to join{" "}
                            {notification.targetName}
                        </span>
                    </>
                );
            default:
                return <span>New notification</span>;
        }
    };

    return (
        <div className="flex items-start gap-4 border-b p-4 last:border-b-0">
            <Avatar className="h-10 w-10">
                <AvatarImage
                    src={notification.actor.avatar}
                    alt={notification.actor.displayName}
                />
                <AvatarFallback>
                    {notification.actor.displayName[0]}
                </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
                <p className="truncate text-sm font-medium leading-none">
                    {notification.actor.displayName}
                </p>
                <p className="flex items-start truncate text-sm text-muted-foreground">
                    {getNotificationContent(notification)}
                </p>
                <p className="text-xs text-muted-foreground">
                    {formatDate(notification.createdAt)}
                </p>
            </div>
            {!notification.read && (
                <span className="h-2 w-2 rounded-full bg-blue-500" />
            )}
        </div>
    );
}
