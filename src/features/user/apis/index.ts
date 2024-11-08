import { useQuery } from "@tanstack/react-query";

import UserService from "./service";

export const USER_KEYS = {
    user: ["user"] as string[],
};

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
