import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

import AuthService from "./service";
import { authRequestSchema } from "./type";

export const AUTH_KEYS = {
    refreshToken: "refresh_token",
    accessToken: "access_token",
};

export const authApi = {
    query: {},
    mutation: {
        useLogin() {
            return useMutation({
                mutationFn: (data: z.infer<typeof authRequestSchema.login>) =>
                    AuthService.login(data),
                onSuccess(data) {
                    toast.success(data.message);
                },
                onError() {
                    toast.error("Email or password is incorrect");
                },
            });
        },
        useRegister() {
            return useMutation({
                mutationFn: (
                    data: z.infer<typeof authRequestSchema.register>,
                ) => AuthService.register(data),
                onSuccess(data) {
                    toast.success(data.message);
                },
                onError() {
                    toast.error("Đăng ký thất bại");
                },
            });
        },
        useVerifyOtp() {
            return useMutation({
                mutationFn: (
                    data: z.infer<typeof authRequestSchema.verifyOtp>,
                ) => AuthService.verify(data),
                onSuccess(data) {
                    toast.success(data.message);
                },
                onError() {
                    toast.error("OTP không chính xác");
                },
            });
        },
    },
};
