import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import GroupMemberItem from "./group-member-item";
import { Member, UserSelect } from "@/configs/type";

interface GroupMemberListProps {
    member?: Member[];
    isLoading?: boolean;
    isAdmin: boolean;
    groupId: string;
    owner: UserSelect;
}

export default function GroupMemberList({
    member,
    isLoading,
    isAdmin,
    groupId,
    owner,
}: GroupMemberListProps) {
    if (isLoading) {
        return <p>Loading...</p>;
    }
    return (
        <div className="w-full space-y-8 px-10 py-2">
            <div className="space-y-4">
                <div>
                    <h2 className="mb-4 text-2xl font-semibold">Group admin</h2>
                    <ul className="space-y-4">
                        <li className="flex items-center justify-between rounded-lg border p-4">
                            <div className="flex items-center space-x-4">
                                <Avatar>
                                    <AvatarImage
                                        src={owner.avatar}
                                        alt={owner.displayName}
                                    />
                                    <AvatarFallback>
                                        {owner.displayName
                                            .slice(0, 2)
                                            .toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">
                                    {owner.displayName}
                                </span>
                            </div>
                        </li>
                    </ul>

                    <Separator className="my-6" />

                    <h2 className="mb-4 text-2xl font-semibold">
                        Group members
                    </h2>
                    {member?.length === 0 ? (
                        <p className="text-muted-foreground">
                            Group havent had any member yet.
                        </p>
                    ) : (
                        <ul className="space-y-4">
                            {member?.map((member) => (
                                <GroupMemberItem
                                    member={member.user}
                                    key={member.user._id}
                                    isAdmin={isAdmin}
                                    groupId={groupId}
                                />
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
