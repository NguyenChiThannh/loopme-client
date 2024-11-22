import { Notification } from "../apis/type";
import {
    MessageSquare,
    ThumbsDown,
    ThumbsUp,
    UserPlus,
    Users,
} from "lucide-react";
import { Link } from "react-router-dom";

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
                    <Link
                        to={`/post/${notification.postId}`}
                        className="flex items-center"
                    >
                        <ThumbsUp className="mr-2 h-4 w-4 text-blue-500" />
                        <span className="line-clamp-2">
                            {notification.actor.displayName} liked your post
                        </span>
                    </Link>
                );
            case "dislike":
                return (
                    <Link
                        to={`/post/${notification.postId}`}
                        className="flex items-center"
                    >
                        <ThumbsDown className="mr-2 h-4 w-4 text-red-500" />
                        <span className="line-clamp-2">
                            {notification.actor.displayName} disliked your post
                        </span>
                    </Link>
                );
            case "comment":
                return (
                    <Link
                        to={`/post/${notification.postId}`}
                        className="flex items-center"
                    >
                        <MessageSquare className="mr-2 h-4 w-4 text-green-500" />
                        <span className="line-clamp-2">
                            {notification.actor.displayName} commented on your
                            post
                        </span>
                    </Link>
                );
            case "friend_request":
                return (
                    <Link
                        to={`/user/${notification.receiver}/?tab=friend`}
                        className="flex items-center"
                    >
                        <UserPlus className="mr-2 h-4 w-4 text-purple-500" />
                        <span className="line-clamp-2">
                            {notification.actor.displayName} sent you a friend
                            request
                        </span>
                    </Link>
                );
            case "accept_friend":
                return (
                    <>
                        <UserPlus className="mr-2 h-4 w-4 text-purple-500" />
                        <span className="line-clamp-2">
                            {notification.actor.displayName} accepted your
                            friend request
                        </span>
                    </>
                );
            case "request_to_join_group":
                return (
                    <Link
                        to={`/group/${notification.groupId}/members?tab=waitings`}
                        className="line-clamp-2 flex w-full items-center"
                    >
                        <Users className="mr-2 h-4 w-4 text-orange-500" />
                        <span className="truncate">
                            {notification.actor.displayName} requested to join
                            group
                        </span>
                    </Link>
                );
            case "accept_join_group":
                return (
                    <Link
                        to={`/group/${notification.groupId}`}
                        className="line-clamp-2 flex items-center"
                    >
                        <Users className="mr-2 h-4 w-4 text-orange-500" />
                        <span className="line-clamp-2">
                            {notification.actor.displayName} accepted your
                            request to join group
                        </span>
                    </Link>
                );
            default:
                return <span className="line-clamp-2">New notification</span>;
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
