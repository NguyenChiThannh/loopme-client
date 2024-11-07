import axios, {
    AxiosError,
    AxiosResponse,
    HttpStatusCode,
    InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

import AuthService from "@/features/auth/apis/service";

const COOKIES_STORAGE = {
    ACCESS_TOKEN: "accessToken",
    REFRESH_TOKEN: "refreshToken",
} as const;

export const client = (() => {
    return axios.create({
        baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}/v1`, //TODO: Sửa port thành 5000 or 8000
        headers: {
            Accept: "application/json",
            toJSON: true,
        },
        timeout: 10000,
        withCredentials: true,
    });
})();

client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        config.headers["Content-Type"] = "application/json";
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);

client.interceptors.response.use(
    (res: AxiosResponse) => {
        return res; // Simply return the response
    },
    async (err) => {
        const originalConfig = err.config;
        const status = err.response ? err.response.status : null;

        if (status === HttpStatusCode.Unauthorized && !originalConfig._retry) {
            originalConfig._retry = true;
            try {
                await AuthService.refresh();
                const accessTokenFromCookie = Cookies.get(
                    COOKIES_STORAGE.ACCESS_TOKEN,
                );
                client.defaults.headers.common.Authorization = `Bearer ${accessTokenFromCookie}`;
                return await client(originalConfig);
            } catch (error) {
                return Promise.reject(error);
            }
        }

        if (status === 403 && err.response.data) {
            return Promise.reject(err.response.data);
        }

        return Promise.reject(err);
    },
);

export const AxiosMethod = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
    OPTIONS: "OPTIONS",
};
