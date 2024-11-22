import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

import PostService from "./service";
import { postRequestSchema } from "./type";
import { GLOBAL_KEYS } from "@/configs/keys";

export const postApi = {
    query: {
        useGetPost: (
            page: number = 1,
            size: number = 10,
            sort: string = "desc",
        ) => {
            return useQuery({
                queryKey: GLOBAL_KEYS.POST.posts(page, size, sort),
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
                queryKey: GLOBAL_KEYS.POST.groupPosts(
                    groupId,
                    page,
                    size,
                    sort,
                ),
                queryFn: () =>
                    PostService.getPostsByGroupId(groupId, page, size, sort),
            });
        },
        useGetPostByUserId: (
            userId: string,
            page: number = 1,
            size: number = 10,
            sort: string = "asc",
        ) => {
            return useQuery({
                queryKey: GLOBAL_KEYS.POST.userPosts(userId, page, size, sort),
                queryFn: () =>
                    PostService.getPostsByUserId(userId, page, size, sort),
            });
        },
        useGetPostById: (postId: string) => {
            return useQuery({
                queryKey: GLOBAL_KEYS.POST.postById(postId),
                queryFn: () => PostService.getPostById(postId),
            });
        },
    },
    mutation: {
        useCreatePost() {
            const queryClient = useQueryClient();
            return useMutation({
                mutationFn: (data: z.infer<typeof postRequestSchema.create>) =>
                    PostService.create(data),
                onSuccess(data) {
                    toast.success(data.message);
                    queryClient.invalidateQueries({
                        queryKey: GLOBAL_KEYS.POST.prefixPost,
                    });
                    queryClient.invalidateQueries({
                        queryKey: GLOBAL_KEYS.POST.prefixUserPosts,
                    });
                },
                onError() {
                    toast.error("Something went wrong");
                },
            });
        },
        useCreatePostInGroup() {
            const queryClient = useQueryClient();
            return useMutation({
                mutationFn: (
                    data: z.infer<typeof postRequestSchema.createInGroup>,
                ) => PostService.createInGroup(data),
                onSuccess(data) {
                    toast.success(data.message);
                    queryClient.invalidateQueries({
                        queryKey: GLOBAL_KEYS.POST.prefixGroupPost,
                    });
                },
                onError() {
                    toast.error("Something went wrong");
                },
            });
        },
        useDeletePostById() {
            const queryClient = useQueryClient();
            return useMutation({
                mutationFn: (postId: string) =>
                    PostService.deletePostById(postId),
                onSuccess(data) {
                    toast.message(data.message);
                    queryClient.invalidateQueries({
                        queryKey: GLOBAL_KEYS.POST.prefixPost,
                    });
                },
                onError() {
                    toast.error("Cannot delete post");
                },
            });
        },
        useUpdatePost() {
            const queryClient = useQueryClient();
            return useMutation({
                mutationFn: (data: z.infer<typeof postRequestSchema.update>) =>
                    PostService.updatePostById(data),
                onSuccess(data) {
                    toast.success(data.message);
                    queryClient.invalidateQueries({
                        queryKey: GLOBAL_KEYS.POST.prefixPost,
                    });
                },
                onError() {
                    toast.error("Failed to update post");
                },
            });
        },
    },
};
