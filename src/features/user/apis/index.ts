import { useQuery } from "@tanstack/react-query";

import { USER_KEYS } from "./config";
import UserService from "./service";

export const userApi = {
    query: {
        useGetUserInformation() {
            return useQuery({
                queryKey: USER_KEYS.user,
                queryFn: () => UserService.getUserInformation(),
                retry: false,
            });
        },
    },
    mutation: {},
};
