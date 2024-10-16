import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import "./index.css";
import AuthLayout from "./layouts/auth.layout.tsx";
import RootLayout from "./layouts/root.layout.tsx";
import LoginPage from "./pages/auth/login.page.tsx";
import SignUpPage from "./pages/auth/signup.page.tsx";

const router = createBrowserRouter([
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
        ],
    },
    {
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <App />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
