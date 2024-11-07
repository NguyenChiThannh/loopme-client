import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet } from "react-router";

import { Toaster } from "@/components/ui/sonner";

import ReactQueryProvider from "@/providers/react-query-provider";
import { UserProvider } from "@/providers/user-provider";

export default function RootLayout() {
    return (
        <ReactQueryProvider>
            <UserProvider>
                <Outlet />
            </UserProvider>
            <Toaster />
            <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryProvider>
    );
}
