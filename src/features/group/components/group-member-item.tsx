import { groupApi } from "../apis";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { UserSelect } from "@/configs/type";

interface GroupMemberItemProps {
    member: UserSelect;
    isAdmin: boolean;
    groupId: string;
}

export default function GroupMemberItem({
    member,
    isAdmin,
    groupId,
}: GroupMemberItemProps) {
    const { mutate: handleRemove } = groupApi.mutation.useRemoveMember();
    const handleRemoveMember = (memberId: string) => {
        if (!isAdmin) return;
        handleRemove({ groupId, userId: memberId });
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
                <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleRemoveMember(member._id)}
                >
                    Remove
                </Button>
            )}
        </li>
    );
}
