import { ChevronDown, LoaderIcon, User } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ROUTES } from "@/configs/route.config";
import { useUser } from "@/providers/user-provider";

export function Actions() {
    const { isLoading, user, isSignedIn } = useUser();

    if (isLoading) return <LoaderIcon className="ml-2 size-6 animate-spin" />;
    if (!isSignedIn || !user)
        return (
            <div className="items-centers flex">
                <Link to={ROUTES.LOGIN_PAGE}>
                    <Button variant="default" className="ml-2">
                        Login
                    </Button>
                </Link>
                <Link to={ROUTES.SIGNUP_PAGE}>
                    <Button variant="secondary" className="ml-2">
                        Register
                    </Button>
                </Link>
            </div>
        );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="ml-2">
                    <User className="mr-2 size-5" />
                    <ChevronDown className="size-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to={"user"}>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <Link to={"/login"}>
                    <DropdownMenuItem>Sign out</DropdownMenuItem>
                </Link>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
