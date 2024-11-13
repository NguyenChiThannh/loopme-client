import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import NotificationService from "./service";
import { GLOBAL_KEYS } from "@/configs/keys";

export const notificationApi = {
    query: {
        useGetNotifications(isEnabled: boolean) {
            return useQuery({
                queryKey: GLOBAL_KEYS.NOTIFICATION.notification,
                queryFn: () => NotificationService.getNotifications(),
                enabled: isEnabled,
            });
        },
    },
    mutation: {
        useMarkAsReadAll() {
            const queryClient = useQueryClient();

            return useMutation({
                mutationFn: () => NotificationService.markAsReadAll(),
                onSuccess() {
                    queryClient.invalidateQueries({
                        queryKey: GLOBAL_KEYS.NOTIFICATION.notification,
                    });
                },
            });
        },
    },
};
