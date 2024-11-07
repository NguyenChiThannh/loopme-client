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
