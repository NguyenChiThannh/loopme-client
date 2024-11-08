import { groupApi } from "../apis";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface GroupInfoCardProps {
    members: number;
    createdAt: string;
    name: string;
    groupId: string;
    isJoined: boolean;
}

export function GroupInfoCard({
    members,
    createdAt,
    name,
    groupId,
    isJoined,
}: GroupInfoCardProps) {
    const { mutate: handleJoinGroup } = groupApi.mutation.useSendJoinRequest();
    const onClick = () => {
        handleJoinGroup(groupId);
    };
    return (
        <Card className="sticky top-20 max-h-fit">
            <div className="flex flex-col space-y-2 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div>
                            <h4 className="mb-2 text-sm font-semibold">
                                r/{name}
                            </h4>
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
                    {!isJoined && (
                        <Button className="ml-auto" onClick={onClick}>
                            Join
                        </Button>
                    )}
                </div>
            </div>
        </Card>
    );
}
