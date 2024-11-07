import { UserEndpoints } from "./config";
import { AxiosMethod } from "@/configs/axios";
import axiosRequest from "@/configs/request";
import { ApiResponse, User } from "@/configs/type";

export default class UserService {
    public static getUserInformation(): Promise<ApiResponse<User>> {
        return axiosRequest({
            method: AxiosMethod.GET,
            url: UserEndpoints.getUserInformation(),
        });
    }
}
