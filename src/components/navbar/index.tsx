import {
    Bell,
    ChevronDown,
    Flame,
    Home,
    MessageSquare,
    PlusCircle,
    Search,
    User,
} from "lucide-react";
import { useState } from "react";
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
import { Input } from "@/components/ui/input";

import GroupCreateButton from "@/features/group/components/group-create-button";

export function Navbar() {
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const username = "testnav";
    return (
        <nav className="border-b bg-background">
            <div className="mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <div className="hidden flex-1 px-4 md:block">
                        <div className="mx-auto w-full max-w-lg">
                            <Input
                                type="search"
                                placeholder="Search"
                                className="w-full bg-muted"
                            />
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            <GroupCreateButton />
                            <Link to={"/create-post"}>
                                <Button variant="ghost">
                                    <PlusCircle className="mr-2 h-5 w-5" />
                                    Create Post
                                </Button>
                            </Link>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="ml-2"
                            >
                                <Bell className="h-5 w-5" />
                            </Button>
                            <Link to={"/chat"}>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="ml-2"
                                >
                                    <MessageSquare className="h-5 w-5" />
                                </Button>
                            </Link>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="ml-2">
                                        <User className="mr-2 h-5 w-5" />
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                        My Account
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <Link to={`/user/${username}`}>
                                        <DropdownMenuItem>
                                            Profile
                                        </DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuItem>
                                        Settings
                                    </DropdownMenuItem>
                                    <Link to={"/login"}>
                                        <DropdownMenuItem>
                                            Sign out
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div className="flex items-center md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                setIsSearchExpanded(!isSearchExpanded)
                            }
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="ml-2"
                                >
                                    <User className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <Home className="mr-2 h-4 w-4" />
                                    Home
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Flame className="mr-2 h-4 w-4" />
                                    Popular
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Create Post
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <GroupCreateButton />
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem>Sign out</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
            {isSearchExpanded && (
                <div className="p-4 md:hidden">
                    <Input
                        type="search"
                        placeholder="Search Reddit"
                        className="w-full bg-muted"
                    />
                </div>
            )}
        </nav>
    );
}
