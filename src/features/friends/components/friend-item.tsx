import { friendApi } from "../apis";
import { Check, X } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { IUser } from "@/configs/type";

type FriendItemProps = {
    friend: IUser;
    isPendingInvitation?: boolean;
    isFriend?: boolean;
};

export function FriendItem({
    friend,
    isPendingInvitation = false,
    isFriend = false,
}: FriendItemProps) {
    const { mutate: handleAcceptInvitation } =
        friendApi.mutation.useAcceptFriendInvitation();
    const { mutate: handleRejectInvitation } =
        friendApi.mutation.useRemovePendingFriendInvitation();
    const { mutate: handleRemove } = friendApi.mutation.useRemoveFriend();

    const handleAcceptFriendInvitation = () => {
        if (!isPendingInvitation && !isFriend) return;
        handleAcceptInvitation(friend._id);
    };
    const handleRejectFriendInvitation = () => {
        if (!isPendingInvitation && !isFriend) return;
        handleRejectInvitation(friend._id);
    };
    const handleRemoveFriend = (friendId: string) => {
        if (!isFriend) return;
        handleRemove(friendId);
    };

    return (
        <li className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center space-x-4">
                <Avatar>
                    <AvatarImage src={friend.avatar} alt={friend.displayName} />
                    <AvatarFallback>
                        {friend.displayName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <span className="font-medium">{friend.displayName}</span>
            </div>
            {isPendingInvitation && !isFriend && (
                <div className="space-x-2">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={handleAcceptFriendInvitation}
                    >
                        <Check className="size-4" />
                        Accept
                    </Button>
                    <Button
                        size="sm"
                        variant="destructive"
                        onClick={handleRejectFriendInvitation}
                    >
                        <X className="size-4" />
                        Decline
                    </Button>
                </div>
            )}
            {isFriend && (
                <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleRemoveFriend(friend._id)}
                >
                    Remove
                </Button>
            )}
        </li>
    );
}
