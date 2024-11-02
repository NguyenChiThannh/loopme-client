import axios, {
    AxiosError,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";

export const client = (() => {
    return axios.create({
        baseURL: process.env.BACKEND_BASE_URL, //TODO: Sửa port thành 5000 or 8000
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
        // const accessToken = localStorage.getItem("STORAGE_TOKEN.ACCESS_TOKEN");
        // if (accessToken) {
        //     config.headers.Authorization = `Bearer ${accessToken}`;
        // }
        config.headers["Content-Type"] = "application/json";
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);

// client.interceptors.response.use(
//     (res: AxiosResponse) => {
//         return res; // Simply return the response
//     },
//     async (err) => {
//         const status = err.response ? err.response.status : null;

//         if (status === 401) {
//             try {
//                 const refreshTokenFromStorage = localStorage.getItem(
//                     STORAGE_TOKEN.REFRESH_TOKEN,
//                 );
//                 const { accessToken, refreshToken } = await AuthService.refresh(
//                     refreshTokenFromStorage,
//                 );

//                 LocalStorageService.setTokens(accessToken, refreshToken);
//                 client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

//                 return await client(originalConfig);
//             } catch (error: AxiosError) {
//                 return Promise.reject(error);
//             }
//         }

//         if (status === 403 && err.response.data) {
//             return Promise.reject(err.response.data);
//         }

//         return Promise.reject(err);
//     },
// );

export const AxiosMethod = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
    OPTIONS: "OPTIONS",
};
