import { PendingFriend } from "./type";
import { AxiosMethod } from "@/configs/axios";
import axiosRequest from "@/configs/request";
import { BaseResponse, PaginatedResponse } from "@/configs/type";

export const FriendEndpoints = {
    getPendingFriendInvitations: () => "friends/all-invitations",
    acceptFriendInvitation: (userId: string) =>
        `friends/accept-invitations/${userId}`,
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
}
