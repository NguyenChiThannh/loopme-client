import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";
import AuthLayout from "./layouts/auth.layout.tsx";
import GroupLayout from "./layouts/group.layout.tsx";
import HomeLayout from "./layouts/home.layout.tsx";
import RootLayout from "./layouts/root.layout.tsx";
import ForgetPasswordPage from "./pages/auth/forget-password.page.tsx";
import LoginPage from "./pages/auth/login.page.tsx";
import SignUpPage from "./pages/auth/signup.page.tsx";
import VerifyPage from "./pages/auth/verify.page.tsx";
import ChatPage from "./pages/chat/page.tsx";
import GroupHomePage from "./pages/group/group.page.tsx";
import HomePage from "./pages/home/home.page.tsx";
import CreatePostPage from "./pages/post/create-post.page.tsx";
import PostPage from "./pages/post/post.page.tsx";
import ProfilePage from "./pages/user/profile.page.tsx";

const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                element: <AuthLayout />,
                children: [
                    {
                        path: "/login",
                        element: <LoginPage />,
                    },
                    {
                        path: "/sign-up",
                        element: <SignUpPage />,
                    },
                    {
                        path: "/verify",
                        element: <VerifyPage />,
                    },
                    {
                        path: "/forget-password",
                        element: <ForgetPasswordPage />,
                    },
                ],
            },
            {
                element: <HomeLayout />,
                children: [
                    {
                        path: "/",
                        element: <HomePage />,
                    },
                    {
                        path: "/create-post",
                        element: <CreatePostPage />,
                    },
                    {
                        path: "/user/:username",
                        element: <ProfilePage />,
                    },
                    {
                        element: <GroupLayout />,
                        children: [
                            {
                                path: "/group",
                                element: <GroupHomePage />,
                            },
                            {
                                path: "/post",
                                element: <PostPage />,
                            },
                        ],
                    },
                ],
            },
            {
                path: "/chat",
                element: <ChatPage />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
