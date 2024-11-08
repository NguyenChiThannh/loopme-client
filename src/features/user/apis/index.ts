import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

import UserService from "./service";
import { userRequestSchema } from "./type";

export const USER_KEYS = {
    user: ["user"] as string[],
};

export const userApi = {
    query: {
        useGetUserInformation() {
            return useQuery({
                queryKey: USER_KEYS.user,
                queryFn: () => UserService.getUserInformation(),
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
                        queryKey: USER_KEYS.user,
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
