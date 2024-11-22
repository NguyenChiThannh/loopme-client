import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import PostService from "./service";
import { GLOBAL_KEYS } from "@/configs/keys";

export const commentApi = {
    query: {},
    mutation: {
        useAddComment() {
            const queryClient = useQueryClient();
            return useMutation({
                mutationFn: ({
                    postId,
                    content,
                }: {
                    postId: string;
                    content: string;
                }) => PostService.addComment(postId, content),
                onSuccess(data) {
                    toast.success(data.message);
                    queryClient.invalidateQueries({
                        queryKey: GLOBAL_KEYS.POST.prefixPostById,
                    });
                },
                onError() {
                    toast.error("Something went wrong when sumbit comment");
                },
            });
        },
        useRemoveComment() {
            const queryClient = useQueryClient();
            return useMutation({
                mutationFn: ({ commentId }: { commentId: string }) =>
                    PostService.removeComment(commentId),
                onSuccess(data) {
                    toast.success(data.message);
                    queryClient.invalidateQueries({
                        queryKey: GLOBAL_KEYS.POST.prefixPostById,
                    });
                },
                onError() {
                    toast.error("Something went wrong when sumbit comment");
                },
            });
        },
    },
};
