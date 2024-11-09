import { groupApi } from "../apis";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { useUser } from "@/providers/user-provider";

interface GroupInfoCardProps {
    members: number;
    createdAt: string;
    name: string;
    groupId: string;
    isJoined: boolean;
    isWaiting: boolean;
}

export function GroupInfoCard({
    members,
    createdAt,
    name,
    groupId,
    isJoined,
    isWaiting,
}: GroupInfoCardProps) {
    const { user } = useUser();
    const { mutate: handleJoinGroup } = groupApi.mutation.useSendJoinRequest();
    if (!user) {
        return <p>Loading</p>;
    }
    const onClick = () => {
        handleJoinGroup(groupId);
    };
    return (
        <Card className="sticky top-20 max-h-fit">
            <div className="flex flex-col space-y-2 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div>
                            <Link to={`/group/${groupId}`}>
                                <h4 className="mb-2 text-sm font-semibold hover:underline">
                                    r/{name}
                                </h4>
                            </Link>
                            <p className="mb-2 text-xs text-muted-foreground">
                                {members} members
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Create at{" "}
                                {new Date(createdAt).toLocaleDateString(
                                    "en-GB",
                                    {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    },
                                )}
                            </p>
                        </div>
                    </div>
                    <div className="ml-auto flex flex-col">
                        {!isJoined && !isWaiting && (
                            <Button className="mb-2 ml-auto" onClick={onClick}>
                                Join
                            </Button>
                        )}
                        {isWaiting && (
                            <Button className="mb-2 ml-auto">Pending</Button>
                        )}
                        <Link to={`/group/${groupId}/members`}>
                            <Button>Members</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </Card>
    );
}
