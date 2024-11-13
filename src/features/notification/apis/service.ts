import { Notification } from "./type";
import { AxiosMethod } from "@/configs/axios";
import axiosRequest from "@/configs/request";
import { ApiResponse, BaseResponse } from "@/configs/type";

const notificationEndpoints = {
    getNotifications: () => "/notifications",
    markAsReadAll: () => "/notifications/read",
};

export default class NotificationService {
    public static async getNotifications(): Promise<
        ApiResponse<Notification[]>
    > {
        return axiosRequest({
            url: notificationEndpoints.getNotifications(),
            method: AxiosMethod.GET,
        });
    }
    public static async markAsReadAll(): Promise<BaseResponse> {
        return axiosRequest({
            url: notificationEndpoints.markAsReadAll(),
            method: AxiosMethod.PATCH,
        });
    }
}
