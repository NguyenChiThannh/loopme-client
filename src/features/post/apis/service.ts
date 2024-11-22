import { z } from "zod";

import { postRequestSchema } from "./type";
import { AxiosMethod } from "@/configs/axios";
import axiosRequest from "@/configs/request";
import { ApiResponse, IPost, PaginatedResponse } from "@/configs/type";

export const PostEndpoints = {
    getPosts: () => "/posts",
    getPostsByUserId: (userId: string) => `/posts/user/${userId}`,
    create: () => "/posts",
    upvote: (postId: string) => `/posts/${postId}/upvote`,
    downvote: (postId: string) => `/posts/${postId}/downvote`,
    removevote: (postId: string) => `/posts/${postId}/removevote`,
    getPostsByGroupId: (groupId: string) => `/posts/group/${groupId}`,
    getPostById: (postId: string) => `/posts/${postId}`,
    updatePostById: (postId: string) => `/posts/${postId}`,
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
    public static getPostById(postId: string): Promise<ApiResponse<IPost>> {
        return axiosRequest({
            url: PostEndpoints.getPostById(postId),
            method: AxiosMethod.GET,
        });
    }
    public static updatePostById(
        data: z.infer<typeof postRequestSchema.update>,
    ): Promise<ApiResponse<IPost>> {
        const { id, ...values } = data;
        return axiosRequest({
            url: PostEndpoints.updatePostById(id),
            method: AxiosMethod.PATCH,
            data: values,
        });
    }
}
