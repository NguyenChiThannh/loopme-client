import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import FriendService from "./service";
import { GLOBAL_KEYS } from "@/configs/keys";

export const friendApi = {
    query: {
        useGetPendingFriend: (isEnabled: boolean) => {
            return useQuery({
                queryKey: GLOBAL_KEYS.FRIEND.pendingFriend,
                queryFn: () => FriendService.getPendingFriend(),
                enabled: isEnabled,
            });
        },
        useGetAllFriend: (isEnabled: boolean) => {
            return useQuery({
                queryKey: GLOBAL_KEYS.FRIEND.friends,
                queryFn: () => FriendService.getAllFriends(),
                enabled: isEnabled,
            });
        },
        useGetSuggestedFriend: () => {
            return useQuery({
                queryKey: GLOBAL_KEYS.FRIEND.suggestedFriend,
                queryFn: () => FriendService.getSuggestedFriends(),
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
                    queryClient.invalidateQueries({
                        queryKey: GLOBAL_KEYS.FRIEND.friends,
                    });
                },
            });
        },
        useRemovePendingFriendInvitation: () => {
            const queryClient = useQueryClient();
            return useMutation({
                mutationFn: (friendId: string) =>
                    FriendService.removePendingFriendInvitation(friendId),
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: GLOBAL_KEYS.FRIEND.pendingFriend,
                    });
                    queryClient.invalidateQueries({
                        queryKey: GLOBAL_KEYS.FRIEND.friends,
                    });
                },
            });
        },
        useAddPendingFriendInvitation: () => {
            const queryClient = useQueryClient();
            return useMutation({
                mutationFn: (userId: string) =>
                    FriendService.addPendingFriendInvitation(userId),
                onSuccess: () => {
                    toast.success("Send requested invitation successfully");
                    queryClient.invalidateQueries({
                        queryKey: GLOBAL_KEYS.FRIEND.suggestedFriend,
                    });
                },
                onError: () => {
                    toast.error("Send requested invitation failed");
                },
            });
        },
        useRemoveFriend: () => {
            const queryClient = useQueryClient();
            return useMutation({
                mutationFn: (friendId: string) =>
                    FriendService.removeFriend(friendId),
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: GLOBAL_KEYS.FRIEND.friends,
                    });
                    toast.success("Remove friend successfully");
                },
            });
        },
    },
};
