import axiosRequest from "@/configs/request";
import { PostEndpoints } from "./config";
import { AxiosMethod } from "@/configs/axios";

export default class PostService {
    public static getPosts(page: number, size: number, sort: string) {
        return axiosRequest({
            url: PostEndpoints.getPosts(),
            method: AxiosMethod.GET,
            params: {
                page,
                size,
                sort,
            }
        })
    }
    public static getPostsByGroupId(groupdId: string, page: number, size: number, sort: string) {
        return axiosRequest({
            url: PostEndpoints.getPostsByGroupId(groupdId),
            method: AxiosMethod.GET,
            params: {
                page,
                size,
                sort,
            },
        })
    }
}