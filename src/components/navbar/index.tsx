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

export function Navbar() {
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);

    return (
        <nav className="border-b bg-background">
            <div className="px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 xl:max-w-full">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img
                                className="w-8 h-8"
                                src="/placeholder.svg?height=32&width=32"
                                alt="Reddit"
                            />
                        </div>
                        <div className="hidden md:block">
                            <div className="flex items-baseline ml-10 space-x-4">
                                <Button
                                    variant="ghost"
                                    className="text-muted-foreground"
                                >
                                    <Home className="w-5 h-5 mr-2" />
                                    Home
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="text-muted-foreground"
                                >
                                    <Flame className="w-5 h-5 mr-2" />
                                    Popular
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 hidden px-4 md:block">
                        <div className="w-full max-w-lg mx-auto">
                            <Input
                                type="search"
                                placeholder="Search Reddit"
                                className="w-full bg-muted"
                            />
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="flex items-center ml-4 md:ml-6">
                            <Button variant="ghost">
                                <PlusCircle className="w-5 h-5 mr-2" />
                                Create Post
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="ml-2"
                            >
                                <Bell className="w-5 h-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="ml-2"
                            >
                                <MessageSquare className="w-5 h-5" />
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="ml-2">
                                        <User className="w-5 h-5 mr-2" />
                                        <ChevronDown className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                        My Account
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Sign out
                                    </DropdownMenuItem>
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
                            <Search className="w-5 h-5" />
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="ml-2"
                                >
                                    <User className="w-5 h-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <Home className="w-4 h-4 mr-2" />
                                    Home
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Flame className="w-4 h-4 mr-2" />
                                    Popular
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <PlusCircle className="w-4 h-4 mr-2" />
                                    Create Post
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
