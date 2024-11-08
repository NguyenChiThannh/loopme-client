import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

import PostService from "./service";
import { postRequestSchema } from "./type";

export const postApi = {
    query: {
        useGetPost: (
            page: number = 1,
            size: number = 10,
            sort: string = "asc",
        ) => {
            return useQuery({
                queryKey: ["posts", page, size, sort],
                queryFn: () => PostService.getPosts(page, size, sort),
            });
        },
        useGetPostByGroupId: (
            groupId: string,
            page: number = 1,
            size: number = 10,
            sort: string = "asc",
        ) => {
            return useQuery({
                queryKey: ["groupPosts", groupId, page, size, sort],
                queryFn: () =>
                    PostService.getPostsByGroupId(groupId, page, size, sort),
            });
        },
    },
    mutation: {
        useCreatePost() {
            return useMutation({
                mutationFn: (data: z.infer<typeof postRequestSchema.create>) =>
                    PostService.create(data),
                onSuccess(data) {
                    toast.success(data.message);
                },
                onError() {
                    toast.error("Something went wrong");
                },
            });
        },
    },
};
