const AUTH = {
    refreshToken: "refresh_token",
    accessToken: "access_token",
};

const USER = {
    user: ["user"] as string[],
};

const FRIEND = {
    pendingFriend: ["pending_friend"] as string[],
};

const POST = {
    prefixPost: ["posts"],
    posts: (page: number, size: number, sort: string) => [
        "posts",
        page,
        size,
        sort,
    ],
    prefixGroupPost: ["groupPosts"],
    groupPosts: (groupId: string, page: number, size: number, sort: string) => [
        "groupPosts",
        groupId,
        page,
        size,
        sort,
    ],
};

const GROUP = {
    groupById: (groupId: string) => ["groupById", groupId],
};

export const GLOBAL_KEYS = {
    AUTH,
    USER,
    FRIEND,
    POST,
    GROUP,
};
