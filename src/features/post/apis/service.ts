import { z } from "zod";

import { postRequestSchema } from "./type";
import { AxiosMethod } from "@/configs/axios";
import axiosRequest from "@/configs/request";
import { ApiResponse, IPost, PaginatedResponse } from "@/configs/type";

export const PostEndpoints = {
    getPosts: () => "/posts",
    create: () => "/posts",
    upvote: () => "/posts/:postId/upvote",
    downvote: () => "/posts/:postId/downvote",
    removevote: () => "/posts/:postId/removevote",
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
}
