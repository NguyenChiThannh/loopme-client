import { useQuery } from "@tanstack/react-query"
import PostService from "./service"

export const postApi = {
    query: {
        useGetPost: (page: number = 1, size: number = 10, sort: string = "asc") => {
            return useQuery({
                queryKey: ["posts", page, size, sort],
                queryFn: () => PostService.getPosts(page, size, sort),
            })
        },
        useGetPostByGroupId: (groupId: string, page: number = 1, size: number = 10, sort: string = "asc") => {
            return useQuery({
                queryKey: ["groupPosts", groupId, page, size, sort],
                queryFn: () => PostService.getPostsByGroupId(groupId, page, size, sort),
            })
        }
    }
}