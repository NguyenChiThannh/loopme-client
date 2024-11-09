import { groupApi } from "../apis";
import { Check, X } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { UserSelect } from "@/configs/type";

interface GroupWaitingItemProps {
    member: UserSelect;
    isAdmin: boolean;
    groupId: string;
}

export default function GroupWaitingItem({
    member,
    isAdmin,
    groupId,
}: GroupWaitingItemProps) {
    const { mutate: handleAcceptInvitation } =
        groupApi.mutation.useAcceptJoinInvitation();
    const { mutate: handleRejectInvitation } =
        groupApi.mutation.useRemovePendingJoinInvitation();
    const handleAcceptFriendInvitation = () => {
        if (!isAdmin) return;
        handleAcceptInvitation({ groupId, userId: member._id });
    };
    const handleRejectFriendInvitation = () => {
        if (!isAdmin) return;
        handleRejectInvitation({ groupId, userId: member._id });
    };
    return (
        <li className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center space-x-4">
                <Avatar>
                    <AvatarImage src={member.avatar} alt={member.displayName} />
                    <AvatarFallback>
                        {member.displayName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <span className="font-medium">{member.displayName}</span>
            </div>
            {isAdmin && (
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
