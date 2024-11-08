import { friendApi } from "../apis";
import { Users2Icon } from "lucide-react";

import { SuggestedFriendItem } from "./suggested-friend-item";

export default function ListSuggestedFriend() {
    const { mutate } = friendApi.mutation.useAddPendingFriendInvitation();
    const { data: suggestedFriends } = friendApi.query.useGetSuggestedFriend();

    const handleAddFriend = (userId: string) => {
        mutate(userId);
    };

    return (
        <div className="w-full max-w-md overflow-hidden rounded-lg bg-background shadow-lg">
            <div className="flex items-center justify-between bg-primary p-4 text-primary-foreground">
                <Users2Icon className="mr-2 size-5" aria-hidden="true" />
                <h2 className="text-xl font-bold">Suggested Friends</h2>
            </div>
            <div className="divide-y divide-border">
                {suggestedFriends?.data.map((friend) => (
                    <SuggestedFriendItem
                        key={friend._id}
                        friend={friend}
                        onAddFriend={handleAddFriend}
                    />
                ))}
            </div>
        </div>
    );
}
