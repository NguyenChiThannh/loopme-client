import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import PostService from "./service";
import { GLOBAL_KEYS } from "@/configs/keys";

export const voteApi = {
    query: {
    },
    mutation: {
        useUpvote() {
            const queryClient = useQueryClient();
            return useMutation({
                mutationFn: (postId: string) => PostService.upvote(postId),
                onSuccess(data) {
                    toast.success(data.message);
                    queryClient.invalidateQueries({
                        queryKey: GLOBAL_KEYS.POST.prefixPostById,
                    });
                },
                onError() {
                    toast.error("Something went wrong when upvote");
                },
            });
        },
        useDownvote() {
            const queryClient = useQueryClient();
            return useMutation({
                mutationFn: (postId: string) => PostService.downvote(postId),
                onSuccess(data) {
                    toast.success(data.message);
                    queryClient.invalidateQueries({
                        queryKey: GLOBAL_KEYS.POST.prefixPostById,
                    });
                },
                onError() {
                    toast.error("Something went wrong when downvote");
                },
            });
        },
        useRemovevote() {
            const queryClient = useQueryClient();
            return useMutation({
                mutationFn: (postId: string) => PostService.removevote(postId),
                onSuccess(data) {
                    toast.success(data.message);
                    queryClient.invalidateQueries({
                        queryKey: GLOBAL_KEYS.POST.prefixPostById,
                    });
                },
                onError() {
                    toast.error("Something went wrong when removevote");
                },
            });
        },
    },
};
