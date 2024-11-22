import { groupApi } from "../apis";
import { useNavigate } from "react-router";

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
                    <CardTitle className="text-xl">{group.name}</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    Join us for workout tips, nutrition advice, and motivation
                    to reach your fitness goals.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="secondary">
                        {group.isPublic ? "Public" : "Private"}
                    </Badge>
                </div>
            </CardContent>
            <CardFooter>
                {isOwner || group.status === "joined" ? (
                    <Button className="w-full" disabled>
                        Joined
                    </Button>
                ) : (
                    <Button
                        className="w-full"
                        onClick={() => handleJoinGroup(group._id)}
                        disabled={isPending}
                    >
                        Join Group
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
