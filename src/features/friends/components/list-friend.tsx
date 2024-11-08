import { friendApi } from "../apis";
import { PendingFriend } from "../apis/type";
import { Check, UserPlus, X } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { FriendItem } from "./friend-item";

type Friend = {
    id: string;
    name: string;
    avatar: string;
};

type FriendListProps = {
    pendingFriends?: PendingFriend[];
    friends: Friend[];
    isLoading?: boolean;
};

export function ListFriend({
    pendingFriends = [],
    friends = [],
    isLoading = false,
}: FriendListProps) {
    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (!friendApi) {
        return <p>No friend</p>;
    }
    return (
        <div className="w-full max-w-4xl p-4 space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Friend List</h1>
                <Button>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add New Friend
                </Button>
            </div>

            <div className="space-y-6">
                <div>
                    <h2 className="mb-4 text-2xl font-semibold">
                        Pending Friends
                    </h2>
                    {pendingFriends.length === 0 ? (
                        <p className="text-muted-foreground">
                            No pending friend requests.
                        </p>
                    ) : (
                        <ul className="space-y-4">
                            {pendingFriends.map((friend) => (
                                <FriendItem
                                    friend={friend.sender}
                                    key={friend.sender._id}
                                    isPending={true}
                                />
                            ))}
                        </ul>
                    )}
                </div>

                <Separator className="my-6" />

                <div>
                    <h2 className="mb-4 text-2xl font-semibold">Friends</h2>
                    {friends.length === 0 ? (
                        <p className="text-muted-foreground">
                            You haven't added any friends yet.
                        </p>
                    ) : (
                        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {friends.map((friend) => (
                                <li key={friend.id}>
                                    <div className="flex items-center p-4 space-x-4 rounded-lg bg-secondary">
                                        <Avatar>
                                            <AvatarImage
                                                src={friend.avatar}
                                                alt={friend.name}
                                            />
                                            <AvatarFallback>
                                                {friend.name
                                                    .slice(0, 2)
                                                    .toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium leading-none">
                                                {friend.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Friend
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
