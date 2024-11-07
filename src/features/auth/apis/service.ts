import { z } from "zod";

import { AuthEndpoints } from "./config";
import { OTP, User, authRequestSchema } from "./type";
import { AxiosMethod } from "@/configs/axios";
import axiosRequest from "@/configs/request";
import { ApiResponse, BaseResponse } from "@/configs/type";

export default class AuthService {
    public static login(
        data: z.infer<typeof authRequestSchema.login>,
    ): Promise<ApiResponse<User>> {
        return axiosRequest({
            url: AuthEndpoints.login(),
            method: AxiosMethod.POST,
            data: data,
        });
    }
    public static refresh(): Promise<BaseResponse> {
        return axiosRequest({
            url: AuthEndpoints.refreshToken(),
            method: AxiosMethod.POST,
        });
    }
    public static register(
        data: z.infer<typeof authRequestSchema.register>,
    ): Promise<ApiResponse<OTP>> {
        const { repeatPassword, ...values } = data;
        return axiosRequest({
            url: AuthEndpoints.register(),
            method: AxiosMethod.POST,
            data: values,
        });
    }
    public static verify(
        data: z.infer<typeof authRequestSchema.verifyOtp>,
    ): Promise<BaseResponse> {
        return axiosRequest({
            url: AuthEndpoints.verifyAccount(),
            method: AxiosMethod.POST,
            data: data,
        });
    }
}
