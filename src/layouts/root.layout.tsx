import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet } from "react-router";

import { Toaster } from "@/components/ui/sonner";

import ReactQueryProvider from "@/providers/react-query-provider";

export default function RootLayout() {
    return (
        <ReactQueryProvider>
            <Outlet />
            <Toaster />
            <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryProvider>
    );
}
