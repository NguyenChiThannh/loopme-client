import { Friend, PendingFriend } from "./type";
import { AxiosMethod } from "@/configs/axios";
import axiosRequest from "@/configs/request";
import { ApiResponse, BaseResponse, PaginatedResponse } from "@/configs/type";

export const FriendEndpoints = {
    getPendingFriendInvitations: () => "/friends/all-invitations",
    acceptFriendInvitation: (userId: string) =>
        `/friends/accept-invitations/${userId}`,
    getAllFriends: () => "/friends",
    removePendingFriendInvitation: (friendId: string) =>
        `/friends/pending-invitations/${friendId}`,
    getSuggestedFriends: () => "/friends/suggest-mutual-friends",
    addPendingFriendInvitation: (userId: string) =>
        `friends/pending-invitations/${userId}`,
    removeFriend: (friendId: string) => `/friends/${friendId}`,
};

export default class FriendService {
    static async getPendingFriend(): Promise<
        PaginatedResponse<PendingFriend[]>
    > {
        return axiosRequest({
            url: FriendEndpoints.getPendingFriendInvitations(),
            method: AxiosMethod.GET,
        });
    }
    static async acceptFriendInvitation(userId: string): Promise<BaseResponse> {
        return axiosRequest({
            url: FriendEndpoints.acceptFriendInvitation(userId),
            method: AxiosMethod.POST,
        });
    }
    static async getAllFriends(): Promise<PaginatedResponse<Friend[]>> {
        return axiosRequest({
            url: FriendEndpoints.getAllFriends(),
            method: AxiosMethod.GET,
        });
    }
    static async removePendingFriendInvitation(
        userId: string,
    ): Promise<BaseResponse> {
        return axiosRequest({
            url: FriendEndpoints.removePendingFriendInvitation(userId),
            method: AxiosMethod.DELETE,
        });
    }
    static async getSuggestedFriends(): Promise<ApiResponse<Friend[]>> {
        return axiosRequest({
            url: FriendEndpoints.getSuggestedFriends(),
            method: AxiosMethod.GET,
        });
    }
    static async addPendingFriendInvitation(
        userId: string,
    ): Promise<BaseResponse> {
        return axiosRequest({
            url: FriendEndpoints.addPendingFriendInvitation(userId),
            method: AxiosMethod.POST,
        });
    }
    static async removeFriend(friendId: string): Promise<BaseResponse> {
        return axiosRequest({
            url: FriendEndpoints.removeFriend(friendId),
            method: AxiosMethod.DELETE,
        });
    }
}
