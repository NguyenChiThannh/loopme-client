export interface BaseResponse {
    success: boolean;
    message: string;
}

export interface ApiResponse<T> extends BaseResponse {
    data: T;
}
