import { friendApi } from "../apis";
import { Check, X } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { IUser } from "@/configs/type";

type FriendItemProps = {
    friend: IUser;
    isPending?: boolean;
};

export function FriendItem({ friend, isPending = false }: FriendItemProps) {
    const { mutate } = friendApi.mutation.useAcceptFriendInvitation();

    const handleAcceptFriendInvitation = () => {
        if (!isPending) return;
        mutate(friend._id);
    };
    const handleRejectFriendInvitation = () => {
        console.log("Reject friend invitation");
    };
    return (
        <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
                <Avatar>
                    <AvatarImage src={friend.avatar} alt={friend.displayName} />
                    <AvatarFallback>
                        {friend.displayName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <span className="font-medium">{friend.displayName}</span>
            </div>
            {isPending && (
                <div className="space-x-2">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={handleAcceptFriendInvitation}
                    >
                        <Check className="size-4" />
                        Accept
                    </Button>
                    <Button size="sm" variant="destructive">
                        <X className="size-4" />
                        Decline
                    </Button>
                </div>
            )}
        </div>
    );
}
