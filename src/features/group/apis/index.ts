import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

import GroupService from "./service";
import { groupRequestSchema } from "./type";
import { GLOBAL_KEYS } from "@/configs/keys";

export const groupApi = {
    query: {
        useGetGroupById: (groupId: string) => {
            return useQuery({
                queryKey: GLOBAL_KEYS.GROUP.groupById(groupId),
                queryFn: () => GroupService.getGroupById(groupId),
            });
        },
        useGetAllMembers: (groupId: string) => {
            return useQuery({
                queryKey: GLOBAL_KEYS.GROUP.members,
                queryFn: () => GroupService.getAllMembers(groupId),
            });
        },
        useGetAllWaitings: (groupId: string, isEnabled: boolean) => {
            return useQuery({
                queryKey: GLOBAL_KEYS.GROUP.waitings,
                queryFn: () => GroupService.getAllWaitings(groupId),
                enabled: isEnabled,
            });
        },
        useGetJoinedGroup: (isEnabled: boolean) => {
            return useQuery({
                queryKey: GLOBAL_KEYS.GROUP.groupPrefix,
                queryFn: () => GroupService.getJoinedGroup(),
                enabled: isEnabled,
            });
        },
    },
    mutation: {
        useCreateGroup() {
            return useMutation({
                mutationFn: (data: z.infer<typeof groupRequestSchema.create>) =>
                    GroupService.create(data),
                onSuccess(data) {
                    toast.success(data.message);
                },
                onError() {
                    toast.error("Something went wrong when create group");
                },
            });
        },
        useSendJoinRequest() {
            const queryClient = useQueryClient();
            return useMutation({
                mutationFn: (groupId: string) =>
                    GroupService.addPendingInvitations(groupId),
                onSuccess(data) {
                    toast.success(data.message);
                    queryClient.invalidateQueries({
                        queryKey: GLOBAL_KEYS.GROUP.groupPrefix,
                    });
                },
                onError() {
                    toast.error("Something went wrong when create group");
                },
            });
        },
        useAcceptJoinInvitation() {
            const queryClient = useQueryClient();
            return useMutation({
                mutationFn: ({
                    groupId,
                    userId,
                }: {
                    groupId: string;
                    userId: string;
                }) => GroupService.accpetJoinRequest(groupId, userId),
                onSuccess(data) {
                    toast.success(data.message);
                    queryClient.invalidateQueries({
                        queryKey: GLOBAL_KEYS.GROUP.waitings,
                    });
                    queryClient.invalidateQueries({
                        queryKey: GLOBAL_KEYS.GROUP.members,
                    });
                },
                onError() {
                    toast.error(
                        "Something went wrong when accepting join request",
                    );
                },
            });
        },
        useRemovePendingJoinInvitation() {
            const queryClient = useQueryClient();
            return useMutation({
                mutationFn: ({
                    groupId,
                    userId,
                }: {
                    groupId: string;
                    userId: string;
                }) => GroupService.declineJoinRequest(groupId, userId),
                onSuccess(data) {
                    toast.success(data.message);
                    queryClient.invalidateQueries({
                        queryKey: GLOBAL_KEYS.GROUP.waitings,
                    });
                },
                onError() {
                    toast.error(
                        "Something went wrong when accepting join request",
                    );
                },
            });
        },
        useRemoveMember() {
            const queryClient = useQueryClient();
            return useMutation({
                mutationFn: ({
                    groupId,
                    userId,
                }: {
                    groupId: string;
                    userId: string;
                }) => GroupService.removeMember(groupId, userId),
                onSuccess(data) {
                    toast.success(data.message);
                    queryClient.invalidateQueries({
                        queryKey: GLOBAL_KEYS.GROUP.members,
                    });
                },
                onError() {
                    toast.error(
                        "Something went wrong when accepting join request",
                    );
                },
            });
        },
    },
};
