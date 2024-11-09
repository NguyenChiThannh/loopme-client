import { Notification } from "./type";
import { AxiosMethod } from "@/configs/axios";
import axiosRequest from "@/configs/request";
import { ApiResponse } from "@/configs/type";

const notificationEndpoints = {
    getNotifications: () => "/notifications",
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
}
