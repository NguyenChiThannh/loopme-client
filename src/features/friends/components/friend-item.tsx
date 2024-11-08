import { friendApi } from "../apis";
import { Check, X } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { IUser } from "@/configs/type";

type FriendItemProps = {
    friend: IUser;
    isPendingInvitation?: boolean;
};

export function FriendItem({
    friend,
    isPendingInvitation = false,
}: FriendItemProps) {
    const { mutate: handleAcceptInvitation } =
        friendApi.mutation.useAcceptFriendInvitation();
    const { mutate: handleRejectInvitation } =
        friendApi.mutation.useRemovePendingFriendInvitation();

    const handleAcceptFriendInvitation = () => {
        if (!isPendingInvitation) return;
        handleAcceptInvitation(friend._id);
    };
    const handleRejectFriendInvitation = () => {
        if (!isPendingInvitation) return;
        handleRejectInvitation(friend._id);
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
            {isPendingInvitation && (
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
        </li>
    );
}
