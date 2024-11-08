import { useQuery } from "@tanstack/react-query";

import GroupService from "./service";

const keys = {
    groupById: (groupId: string) => ["groupById", groupId],
};

export const groupApi = {
    query: {
        useGetGroupById: (groupId: string) => {
            return useQuery({
                queryKey: keys.groupById(groupId),
                queryFn: () => GroupService.getGroupById(groupId),
            });
        },
    },
};
