import { notificationApi } from "../apis";
import { NotificationList } from "../components/list-notification";
import { Bell, Loader2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { useNotificationStore } from "@/stores/notification-store";

export function NotificationPopover() {
    const { isOpen, handleOpenChange } = useNotificationStore();
    const [unreadCount, setUnreadCount] = useState(true);
    const { data, isPending } =
        notificationApi.query.useGetNotifications(isOpen);

    return (
        <Popover open={isOpen} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="size-8" />
                    {unreadCount && (
                        <span className="absolute right-1 top-1 size-2 rounded-full bg-red-500" />
                    )}
                    <span className="sr-only">Show notifications</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0">
                <div className="border-b p-4 text-sm font-medium">
                    Notifications {data?.data.length || 0}
                </div>
                {data?.data && <NotificationList notifications={data.data} />}
            </PopoverContent>
        </Popover>
    );
}
