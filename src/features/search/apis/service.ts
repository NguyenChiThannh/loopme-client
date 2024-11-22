import { z } from "zod";

import { searchParams } from "./type";
import axiosRequest from "@/configs/request";
import {
    GroupNoOwnerAndMembers,
    PaginatedResponse,
    UserSelect,
} from "@/configs/type";

const searchEndpoints = {
    search: (params: z.infer<typeof searchParams>) => {
        return {
            url: "user/search",
            params,
        };
    },
    searchGroup(params: z.infer<typeof searchParams>) {
        return {
            url: "groups/search",
            params,
        };
    },
};
export default class SearchService {
    public static search(
        params: z.infer<typeof searchParams>,
    ): Promise<PaginatedResponse<UserSelect[]>> {
        return axiosRequest({
            url: searchEndpoints.search(params).url,
            params: searchEndpoints.search(params).params,
        });
    }
    public static searchGroup(
        params: z.infer<typeof searchParams>,
    ): Promise<PaginatedResponse<GroupNoOwnerAndMembers[]>> {
        return axiosRequest({
            url: searchEndpoints.searchGroup(params).url,
            params: searchEndpoints.searchGroup(params).params,
        });
    }
}
