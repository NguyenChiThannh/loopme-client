import { useMutation, useQuery } from "@tanstack/react-query";
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
            return useMutation({
                mutationFn: (groupId: string) =>
                    GroupService.addPendingInvitations(groupId),
                onSuccess(data) {
                    toast.success(data.message);
                },
                onError() {
                    toast.error("Something went wrong when create group");
                },
            });
        },
    },
};
