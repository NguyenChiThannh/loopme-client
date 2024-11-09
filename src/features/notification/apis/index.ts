import { useQuery } from "@tanstack/react-query";

import NotificationService from "./service";
import { GLOBAL_KEYS } from "@/configs/keys";

export const notificationApi = {
    query: {
        useGetNotifications() {
            return useQuery({
                queryKey: GLOBAL_KEYS.NOTIFICATION.notification,
                queryFn: () => NotificationService.getNotifications(),
            });
        },
    },
    mutation: {},
};
