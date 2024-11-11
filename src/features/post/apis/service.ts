import { z } from "zod";

import { postRequestSchema } from "./type";
import { AxiosMethod } from "@/configs/axios";
import axiosRequest from "@/configs/request";
import {
    ApiResponse,
    BaseResponse,
    IPost,
    PaginatedResponse,
} from "@/configs/type";

export const PostEndpoints = {
    getPosts: () => "/posts",
    getPostsByUserId: (userId: string) => `/posts/user/${userId}`,
    create: () => "/posts",
    upvote: (postId: string) => `/posts/${postId}/upvote`,
    downvote: (postId: string) => `/posts/${postId}/downvote`,
    removevote: (postId: string) => `/posts/${postId}/removevote`,
    getPostsByGroupId: (groupId: string) => `/posts/group/${groupId}`,
};

export default class PostService {
    public static getPosts(
        page: number,
        size: number,
        sort: string,
    ): Promise<PaginatedResponse<IPost[]>> {
        return axiosRequest({
            url: PostEndpoints.getPosts(),
            method: AxiosMethod.GET,
            params: {
                page,
                size,
                sort,
            },
        });
    }
    public static getPostsByUserId(
        userId: string,
        page: number,
        size: number,
        sort: string,
    ): Promise<PaginatedResponse<IPost[]>> {
        return axiosRequest({
            url: PostEndpoints.getPostsByUserId(userId),
            method: AxiosMethod.GET,
            params: {
                page,
                size,
                sort,
            },
        });
    }
    public static getPostsByGroupId(
        groupdId: string,
        page: number,
        size: number,
        sort: string,
    ): Promise<PaginatedResponse<IPost[]>> {
        return axiosRequest({
            url: PostEndpoints.getPostsByGroupId(groupdId),
            method: AxiosMethod.GET,
            params: {
                page,
                size,
                sort,
            },
        });
    }
    public static create(
        data: z.infer<typeof postRequestSchema.create>,
    ): Promise<ApiResponse<IPost>> {
        return axiosRequest({
            url: PostEndpoints.create(),
            method: AxiosMethod.POST,
            data: data,
        });
    }
    public static createInGroup(
        data: z.infer<typeof postRequestSchema.create>,
    ): Promise<ApiResponse<IPost>> {
        return axiosRequest({
            url: PostEndpoints.create(),
            method: AxiosMethod.POST,
            data: data,
        });
    }
    public static upvote(postId: string): Promise<BaseResponse> {
        return axiosRequest({
            url: PostEndpoints.upvote(postId),
            method: AxiosMethod.POST,
        });
    }
    public static downvote(postId: string): Promise<BaseResponse> {
        return axiosRequest({
            url: PostEndpoints.downvote(postId),
            method: AxiosMethod.POST,
        });
    }
    public static removevote(postId: string): Promise<BaseResponse> {
        return axiosRequest({
            url: PostEndpoints.removevote(postId),
            method: AxiosMethod.DELETE,
        });
    }
}
