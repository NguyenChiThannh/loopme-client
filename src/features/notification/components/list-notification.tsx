import { Notification } from "../apis/type";
import { useEffect, useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";

import { NotificationItem } from "./notification-item";
import { useSocket } from "@/providers/socket-provider";

interface NotificationListProps {
    notifications: Notification[];
}

export function NotificationList({ notifications }: NotificationListProps) {
    const [allNotifications, setAllNotifications] =
        useState<Notification[]>(notifications);
    const { notifications: realtimeNotification } = useSocket();

    useEffect(() => {
        if (realtimeNotification) {
            setAllNotifications((prevNotifications) => {
                // Filter out duplicates by checking notification._id
                const uniqueNotifications = realtimeNotification
                    .filter(
                        (newNotif) =>
                            !prevNotifications.some(
                                (prevNotif) => prevNotif._id === newNotif._id,
                            ),
                    )
                    .sort((a, b) => {
                        const dateA = new Date(a.createdAt);
                        const dateB = new Date(b.createdAt);
                        return dateB.getTime() - dateA.getTime();
                    });
                return [...uniqueNotifications, ...prevNotifications];
            });
        }
    }, [realtimeNotification]);
    console.log("All notifications:", allNotifications);
    return (
        <ScrollArea className="h-[300px]">
            {allNotifications.map((notification) => (
                <NotificationItem
                    key={notification._id}
                    notification={notification}
                />
            ))}
        </ScrollArea>
    );
}
