import {
    Bell,
    Flame,
    Home,
    MessageSquare,
    PlusCircle,
    Search,
    User,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import { Actions } from "./actions";
import GroupCreateButton from "@/features/group/components/group-create-button";
import { postApi } from "@/features/post/apis";
import { postRequestSchema } from "@/features/post/apis/type";
import PostCreateForm from "@/features/post/components/post-create-form";
import { CreatePostDialog } from "@/features/post/layouts/create-post-dialog";
import { useUser } from "@/providers/user-provider";

export function Navbar() {
    const { user } = useUser();
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const { mutate: handleCreatePost } = postApi.mutation.useCreatePost();
    const createPost = (values: z.infer<typeof postRequestSchema.create>) => {
        handleCreatePost(values);
    };
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

                            <CreatePostDialog>
                                <PostCreateForm
                                    onSubmit={createPost}
                                />
                            </CreatePostDialog>
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
                            <Actions />
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
