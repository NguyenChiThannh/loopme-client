import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

import UserService from "./service";
import { userRequestSchema } from "./type";
import { GLOBAL_KEYS } from "@/configs/keys";

export const userApi = {
    query: {
        useGetUserInformation() {
            return useQuery({
                queryKey: GLOBAL_KEYS.USER.user,
                queryFn: () => UserService.getUserInformation(),
                retry: 1,
            });
        },
        useGetUserById(userId: string) {
            return useQuery({
                queryKey: GLOBAL_KEYS.USER.userById(userId),
                queryFn: () => UserService.getUserById(userId),
                retry: false,
            });
        },
    },
    mutation: {
        useUpdateUserInformation() {
            const queryClient = useQueryClient();
            return useMutation({
                mutationFn: (
                    data: z.infer<typeof userRequestSchema.updateUser>,
                ) => UserService.updateUserInformation(data),
                onSuccess() {
                    queryClient.invalidateQueries({
                        queryKey: GLOBAL_KEYS.USER.user,
                    });
                    toast.success("Cập nhật thông tin thành công");
                },
                onError() {
                    toast.error("Cập nhật thông tin thất bại");
                },
            });
        },
    },
};
