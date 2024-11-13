import { Channel, Message } from "./type";
import { AxiosMethod } from "@/configs/axios";
import axiosRequest from "@/configs/request";
import { ApiResponse, PaginatedResponse } from "@/configs/type";

const chatEndpoints = {
    getMessages: (userId: string) => `/messages/${userId}`,
    sendMessage: (userId: string) => `/messages/${userId}`,
    getChannels: () => `/channels`,
    getChannel: (channelId: string) => `/channels/${channelId}`,
};
export default class ChatService {
    static async getMessages(
        userId: string,
    ): Promise<PaginatedResponse<Message[]>> {
        return axiosRequest({
            method: AxiosMethod.GET,
            url: chatEndpoints.getMessages(userId),
        });
    }
    static async getChannels(): Promise<PaginatedResponse<Channel[]>> {
        return axiosRequest({
            method: AxiosMethod.GET,
            url: chatEndpoints.getChannels(),
        });
    }
    static async getChannel(
        channelId: string,
    ): Promise<PaginatedResponse<Channel[]>> {
        return axiosRequest({
            method: AxiosMethod.GET,
            url: chatEndpoints.getChannel(channelId),
        });
    }
    static async sendMessage(
        userId: string,
        message: string,
    ): Promise<ApiResponse<Message>> {
        return axiosRequest({
            method: AxiosMethod.POST,
            url: chatEndpoints.sendMessage(userId),
            data: {
                message,
            },
        });
    }
}
