import { AxiosMethod } from "@/configs/axios";
import axiosRequest from "@/configs/request";
import { ApiResponse, BaseResponse, User } from "@/configs/type";

export const UserEndpoints = {
    getUserInformation: () => "/user",
    updateUserInformation: () => "/user",
};

export default class UserService {
    public static getUserInformation(): Promise<ApiResponse<User>> {
        return axiosRequest({
            method: AxiosMethod.GET,
            url: UserEndpoints.getUserInformation(),
        });
    }
    public static updateUserInformation(data: User): Promise<BaseResponse> {
        return axiosRequest({
            method: AxiosMethod.PATCH,
            url: UserEndpoints.updateUserInformation(),
            data,
        });
    }
}
