import { z } from "zod";

import { userRequestSchema } from "./type";
import { AxiosMethod } from "@/configs/axios";
import axiosRequest from "@/configs/request";
import { ApiResponse, BaseResponse, User } from "@/configs/type";

export const UserEndpoints = {
    getUserInformation: () => "/user",
    updateUserInformation: () => "/user",
    getUserById: (userId: string) => `/user/${userId}`,
};

export default class UserService {
    public static getUserInformation(): Promise<ApiResponse<User>> {
        return axiosRequest({
            method: AxiosMethod.GET,
            url: UserEndpoints.getUserInformation(),
        });
    }
    public static updateUserInformation(
        data: z.infer<typeof userRequestSchema.updateUser>,
    ): Promise<BaseResponse> {
        return axiosRequest({
            method: AxiosMethod.PATCH,
            url: UserEndpoints.updateUserInformation(),
            data,
        });
    }
    public static getUserById(userId: string): Promise<ApiResponse<User>> {
        return axiosRequest({
            method: AxiosMethod.GET,
            url: UserEndpoints.getUserById(userId),
        });
    }
}
