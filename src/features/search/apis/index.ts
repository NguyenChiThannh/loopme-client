import { useQuery } from "@tanstack/react-query";

import SearchService from "./service";
import { GLOBAL_KEYS } from "@/configs/keys";
import { SearchParams } from "@/configs/type";

export const searchApi = {
    query: {
        useSearchUser(params: SearchParams) {
            return useQuery({
                queryKey: GLOBAL_KEYS.SEARCH.searchUser(params),
                queryFn: () => SearchService.search(params),
            });
        },
        useSearchGroup(params: SearchParams) {
            return useQuery({
                queryKey: GLOBAL_KEYS.SEARCH.searchGroup(params),
                queryFn: () => SearchService.search(params),
            });
        },
    },
    mutation: {},
};
