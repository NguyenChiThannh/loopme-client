export const AUTH_KEYS = {
    refreshToken: "refresh_token",
    accessToken: "access_token",
};

export const AuthEndpoints = {
    refreshToken: () => "/auth/refresh-token",
    login: () => "/auth/login",
    register: () => "/auth/register",
    verifyAccount: () => "/auth/verify-account",
};
