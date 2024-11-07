import {
    Mutation,
    MutationCache,
    Query,
    QueryCache,
    QueryClient,
    QueryClientProvider,
    QueryKey,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
import { Outlet } from "react-router";
import { toast } from "sonner";

import { Toaster } from "@/components/ui/sonner";

import ReactQueryProvider from "@/providers/react-query-provider";
import { UserProvider } from "@/providers/user-provider";

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onSuccess: (
            _data: unknown,
            query: Query<unknown, unknown, unknown, QueryKey>,
        ): void => {
            if (query.meta?.SUCCESS_MESSAGE) {
                toast.success(`${query.meta.SUCCESS_MESSAGE}:`);
            }
        },
        onError: (
            error: unknown,
            query: Query<unknown, unknown, unknown, QueryKey>,
        ): void => {
            if (axios.isAxiosError(error) && query.meta?.ERROR_SOURCE) {
                toast.error(
                    `${query.meta.ERROR_SOURCE}: ${error.response?.data?.message}`,
                );
            }
            if (error instanceof Error && query.meta?.ERROR_SOURCE) {
                toast.error(`${query.meta.ERROR_SOURCE}: ${error.message}`);
            }
        },
    }),
    mutationCache: new MutationCache({
        onError: (
            error: unknown,
            _variables: unknown,
            _context: unknown,
            mutation: Mutation<unknown, unknown, unknown, unknown>,
        ): void => {
            if (axios.isAxiosError(error) && mutation.meta?.ERROR_SOURCE) {
                toast.error(
                    `${mutation.meta.ERROR_SOURCE}: ${error.response?.data?.message}`,
                );
            }
            if (error instanceof Error && mutation.meta?.ERROR_SOURCE) {
                toast.error(`${mutation.meta.ERROR_SOURCE}: ${error.message}`);
            }
        },
        onSuccess: (
            _data: unknown,
            _variables: unknown,
            _context: unknown,
            mutation: Mutation<unknown, unknown, unknown, unknown>,
        ): void => {
            if (mutation.meta?.SUCCESS_MESSAGE) {
                toast.success(`${mutation.meta.SUCCESS_MESSAGE}:`);
            }
        },
    }),
});

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
