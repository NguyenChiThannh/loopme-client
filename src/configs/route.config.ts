export const ROUTES = {
    HOME_PAGE: "/",
    LOGIN_PAGE: "/login",
    SIGNUP_PAGE: "/signup",
    CREATE_POST_PAGE: "/create-post",
    USER_PAGE: (username: string) => `/user/${username}`,
    GROUP_PAGE: "/group/:groupName",
};
