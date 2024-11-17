import { SearchParams } from "./type";

const AUTH = {
    refreshToken: "refresh_token",
    accessToken: "access_token",
};

const USER = {
    user: ["user"] as string[],
};

const FRIEND = {
    pendingFriend: ["pending_friend"] as string[],
    friends: ["friends"] as string[],
    suggestedFriend: ["suggested_friend"] as string[],
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
    userPosts: (userId: string, page: number, size: number, sort: string) => [
        "user_posts",
        userId,
        page,
        size,
        sort,
    ],
    postById: (postId: string) => ["postById", postId],
    prefixPostById: ["postById"] as string[],
};

const GROUP = {
    groupPrefix: ["groupById"],
    groupById: (groupId: string) => ["groupById", groupId],
    members: ["members"] as string[],
    waitings: ["waitings"] as string[],
};

const NOTIFICATION = {
    prefix: ["notification"] as string[],
    notification: ["notification"] as string[],
};

const SEARCH = {
    search: ["search"] as string[],
    searchUser: (params: SearchParams) => ["search_user", params] as string[],
};

const CHAT = {
    prefix: ["messages"] as string[],
    messages: (channelId?: string) => ["messages", channelId] as string[],
    channels: ["channels"] as string[],
    channel: (channelId: string) => ["channel", channelId] as string[],
};

export const GLOBAL_KEYS = {
    AUTH,
    USER,
    FRIEND,
    POST,
    GROUP,
    NOTIFICATION,
    SEARCH,
    CHAT,
};
