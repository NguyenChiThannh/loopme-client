export interface BaseResponse {
    success: boolean;
    message: string;
}

export interface ApiResponse<T> extends BaseResponse {
    data: T;
}

export interface User {
    _id: string;
    email: string;
    displayName: string;
    avatar: string;
    isActive: boolean;
    createdAt: string;
    __v: number;
}

export type VoteValue = "UPVOTE" | "DOWNVOTE" | null; // Added null for voteValue

export interface UserSelect {
    _id: string;
    displayName: string;
    avatar: string;
}

export interface IVote {
    user: string; // Types.ObjectId is replaced with string
    value: VoteValue;
}

export interface IComment {
    _id: string;
    user: UserSelect; // Types.ObjectId is replaced with string
    value: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IGroup {
    _id: string;
    name: string;
}

export interface IPost {
    _id: string;
    group?: IGroup | null; // Assuming group can be empty or an object with unknown shape
    content: string;
    user: UserSelect; // user is now an IUser object, based on the provided response
    images: string[];
    privacy: "public" | "private" | "friends";
    createdAt: Date;
    updatedAt: Date;
    voteValue: VoteValue | null; // Added null type to match the response
    totalVotes: number; // The total vote count
    comments?: IComment[]; // Optional, as not all posts may have comments
    votes?: IVote[]; // Optional, as not all posts may have votes
}

export interface PaginatedResponse<T> extends BaseResponse {
    data: {
        data: T;
    };
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    nextCursor?: number;
    totalElement?: number;
}

export interface Group {
    _id: string;
    name: string;
    owner: UserSelect;
    background_cover: string;
    isPublic: boolean;
    members: Member[];
    pendingInvitations: PendingInvitation[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface PendingInvitation {
    user: string;
    joinAt: string;
}

export interface Member {
    user: UserSelect;
    joinAt: string;
}

export interface SearchParams {
    q: string | null;
}
