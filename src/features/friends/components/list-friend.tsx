import { Friend, PendingFriend } from "../apis/type";
import { UserPlus } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { FriendItem } from "./friend-item";

type FriendListProps = {
    pendingFriends?: PendingFriend[];
    friends?: Friend[];
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
    return (
        <div className="w-full space-y-8 px-10 py-2">
            <div className="space-y-4">
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
                                <FriendItem
                                    friend={friend}
                                    key={friend._id}
                                    isPending={false}
                                />
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
