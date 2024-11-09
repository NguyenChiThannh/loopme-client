import GroupMemberItem from "./group-member-item";
import GroupWaitingItem from "./group-waiting-item";
import { Member } from "@/configs/type";

interface GroupWaitingList {
    member?: Member[];
    isLoading?: boolean;
    isAdmin: boolean;
    groupId: string;
}

export default function GroupWaitingList({
    member,
    isLoading,
    isAdmin,
    groupId,
}: GroupWaitingList) {
    if (isLoading) {
        return <p>Loading...</p>;
    }
    return (
        <div className="w-full space-y-8 px-10 py-2">
            <div className="space-y-4">
                <div>
                    <h2 className="mb-4 text-2xl font-semibold">
                        Group waitings
                    </h2>
                    {member?.length === 0 ? (
                        <p className="text-muted-foreground">
                            Group havent had any join requests yet.
                        </p>
                    ) : (
                        <ul className="space-y-4">
                            {member?.map((member) => (
                                <GroupWaitingItem
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
