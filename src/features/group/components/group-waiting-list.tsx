import { groupApi } from "../apis";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    const [userId, setUserId] = useState("");
    const { mutate: forceMemberToJoin } =
        groupApi.mutation.useAddMemberToGroup();
    if (isLoading) {
        return <p>Loading...</p>;
    }

    const handleSubmit = () => {
        forceMemberToJoin({ groupId, userId });
    };
    return (
        <div className="w-full space-y-8 px-10 py-2">
            <div className="space-y-4">
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input
                        type="text"
                        placeholder="User ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                    <Button onClick={handleSubmit}>Add</Button>
                </div>
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
                            {member?.map((member) => {
                                if (member.user) {
                                    return (
                                        <GroupWaitingItem
                                            member={member.user}
                                            key={member.user._id}
                                            isAdmin={isAdmin}
                                            groupId={groupId}
                                        />
                                    );
                                }
                            })}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
