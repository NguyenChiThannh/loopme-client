import { z } from "zod";

export const AUTH_KEYS = {
    refreshToken: "refresh_token",
    accessToken: "access_token",
    user: "user",
};

export const AuthEndpoints = {
    refreshToken: () => "/auth/refresh-token",
    login: () => `/auth/login`,
    signup: (orderToken: string) =>
        `/product/order-products?token=${orderToken}`,
};
