import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import "./index.css";
import AuthLayout from "./layouts/auth.layout.tsx";
import LoginPage from "./pages/auth/login.page.tsx";
import SignUpPage from "./pages/auth/signup.page.tsx";

async function action() {
    const test = { name: "abc" };
    return test;
}

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
        path: "/",
        element: <App />,
        loader: action,
        children: [
            {
                path: "/:id",
                element: <div>I am here</div>,
            },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
