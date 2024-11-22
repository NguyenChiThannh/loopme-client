import { AxiosMethod } from "@/configs/axios";
import axiosRequest from "@/configs/request";
import { BaseResponse } from "@/configs/type";

export const VoteEndpoints = {
    upvote: (postId: string) => `/votes/upvote/${postId}`,
    downvote: (postId: string) => `/votes/downvote/${postId}`,
    removevote: (postId: string) => `/votes/${postId}`,
};

export default class VoteService {
    public static upvote(postId: string): Promise<BaseResponse> {
        return axiosRequest({
            url: VoteEndpoints.upvote(postId),
            method: AxiosMethod.POST,
        });
    }
    public static downvote(postId: string): Promise<BaseResponse> {
        return axiosRequest({
            url: VoteEndpoints.downvote(postId),
            method: AxiosMethod.POST,
        });
    }
    public static removevote(postId: string): Promise<BaseResponse> {
        return axiosRequest({
            url: VoteEndpoints.removevote(postId),
            method: AxiosMethod.DELETE,
        });
    }
}
