import { ReactNode, createContext, useContext } from "react";
import { useNavigate } from "react-router";

import { ROUTES } from "@/configs/route.config";
import { User } from "@/configs/type";
import { userApi } from "@/features/user/apis";

interface UserContextType {
    user?: User;
    isLoading: boolean;
    error: Error | null;
    isSignedIn: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const navigate = useNavigate();
    const { data, isLoading, isError, error } =
        userApi.query.useGetUserInformation();
    const isSignedIn = !isError;
    if (isError) {
        navigate(ROUTES.LOGIN_PAGE);
    }
    return (
        <UserContext.Provider
            value={{
                user: data?.data,
                isLoading,
                error,
                isSignedIn,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
