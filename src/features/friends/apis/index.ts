import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import FriendService from "./service";
import { GLOBAL_KEYS } from "@/configs/keys";

export const friendApi = {
    query: {
        useGetPendingFriend: (isEnabled: boolean) => {
            console.log(isEnabled);
            return useQuery({
                queryKey: GLOBAL_KEYS.FRIEND.pendingFriend,
                queryFn: () => FriendService.getPendingFriend(),
                enabled: isEnabled,
            });
        },
    },
    mutation: {
        useAcceptFriendInvitation: () => {
            const queryClient = useQueryClient();

            return useMutation({
                mutationFn: (userId: string) =>
                    FriendService.acceptFriendInvitation(userId),
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: GLOBAL_KEYS.FRIEND.pendingFriend,
                    });
                },
            });
        },
    },
};
