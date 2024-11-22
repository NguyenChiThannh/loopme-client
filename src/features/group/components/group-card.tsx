import { groupApi } from "../apis";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { ROUTES } from "@/configs/route.config";
import { GroupNoOwnerAndMembers } from "@/configs/type";
import { useUser } from "@/providers/user-provider";

interface GroupCardProps {
    group: GroupNoOwnerAndMembers;
}

export function GroupCard({ group }: GroupCardProps) {
    const { user, isLoading } = useUser();
    const { mutate: handleJoinGroup, isPending } =
        groupApi.mutation.useSendJoinRequest();
    const groupMutate = groupApi.mutation.useRemovePendingJoinInvitation();
    const queryClient = useQueryClient();

    const navigate = useNavigate();

    if (isLoading || isPending) {
        return <p>Loading</p>;
    }
    if (!user) {
        navigate(ROUTES.HOME_PAGE);
        return;
    }
    const isOwner = group.owner === user._id;

    console.log('Group" ', group);
    return (
        <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-16 w-16">
                    <AvatarImage
                        src={group.background_cover}
                        alt={group.name}
                    />
                    <AvatarFallback>
                        {group.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <Link to={`/group/${group._id}`}>
                        <CardTitle className="text-xl hover:underline">
                            {group.name}
                        </CardTitle>
                    </Link>
                </div>
            </CardHeader>
            <CardContent>
                <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="secondary">
                        {group.isPublic ? "Public" : "Private"}
                    </Badge>
                </div>
            </CardContent>
            <CardFooter>
                {(() => {
                    switch (group.status) {
                        case "pending":
                            return (
                                <Button
                                    className="w-full"
                                    onClick={() => {
                                        groupMutate.mutate(
                                            {
                                                groupId: group._id,
                                                userId: user._id,
                                            },
                                            {
                                                onSuccess: () => {
                                                    queryClient.invalidateQueries(
                                                        {
                                                            queryKey: [
                                                                "search_group",
                                                            ],
                                                        },
                                                    );
                                                },
                                            },
                                        );
                                    }}
                                >
                                    Remove
                                </Button>
                            );
                        case "joined":
                            return (
                                <Button className="w-full" disabled={true}>
                                    Joined
                                </Button>
                            );
                        case "not_joined":
                            return !isOwner ? (
                                <Button
                                    className="w-full"
                                    onClick={() =>
                                        handleJoinGroup(group._id, {
                                            onSuccess() {
                                                queryClient.invalidateQueries({
                                                    queryKey: ["search_group"],
                                                });
                                            },
                                        })
                                    }
                                    disabled={isPending}
                                >
                                    Join Group
                                </Button>
                            ) : (
                                <Button className="w-full" disabled={true}>
                                    Joined
                                </Button>
                            );
                        default:
                            return (
                                <Button className="w-full" disabled={true}>
                                    Joined
                                </Button>
                            );
                    }
                })()}
            </CardFooter>
        </Card>
    );
}
