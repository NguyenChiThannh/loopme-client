import { AxiosMethod } from "@/configs/axios";
import axiosRequest from "@/configs/request";
import { BaseResponse } from "@/configs/type";

export const CommentEndpoints = {
    addComment: (commentId: string) => `/comments/${commentId}`,
};

export default class CommentService {
    public static addComment(
        postId: string,
        content: string,
    ): Promise<BaseResponse> {
        return axiosRequest({
            url: CommentEndpoints.addComment(postId),
            method: AxiosMethod.POST,
            data: {
                content,
            },
        });
    }
    public static removeComment(commentId: string): Promise<BaseResponse> {
        return axiosRequest({
            url: CommentEndpoints.addComment(commentId),
            method: AxiosMethod.DELETE,
        });
    }
}
