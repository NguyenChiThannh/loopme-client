import { Notification } from "../apis/type";

import { ScrollArea } from "@/components/ui/scroll-area";

import { NotificationItem } from "./notification-item";

interface NotificationListProps {
    notifications: Notification[];
}

export function NotificationList({ notifications }: NotificationListProps) {
    return (
        <ScrollArea className="h-[300px]">
            {notifications.map((notification) => (
                <NotificationItem
                    key={notification._id}
                    notification={notification}
                />
            ))}
        </ScrollArea>
    );
}
