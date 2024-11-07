import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

import AuthService from "./service";
import { authRequestSchema } from "./type";

export const authApi = {
    query: {},
    mutation: {
        useLogin() {
            return useMutation({
                mutationFn: (data: z.infer<typeof authRequestSchema.login>) =>
                    AuthService.login(data),
                onSuccess(data, variables, context) {
                    toast.success(data.message);
                },
                onError(error, variables, context) {},
            });
        },
    },
};
