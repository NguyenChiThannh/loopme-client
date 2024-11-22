import { useQueryClient } from "@tanstack/react-query";
import {
    HourglassIcon,
    PlusIcon,
    UserCheck2,
    UserIcon,
    UserRoundPlus,
    WatchIcon,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { friendApi } from "@/features/friends/apis";
import { groupApi } from "@/features/group/apis";
import { GroupCard } from "@/features/group/components/group-card";
import { searchApi } from "@/features/search/apis";

export default function SearchPage() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const q = searchParams.get("q");
    const { mutate: handleSendFriendInvitation } =
        friendApi.mutation.useAddPendingFriendInvitation();
    const { mutate: handleRemoveFriendInvitation } =
        friendApi.mutation.useRemovePendingFriendInvitation();
    const { data: user } = searchApi.query.useSearchUser({
        q: q,
    });
    const { data: group } = searchApi.query.useSearchGroup({
        q: q,
    });
    console.log(user);

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col gap-4">
                {group &&
                    group.data.data.map((group) => (
                        <GroupCard key={group._id} group={group} />
                    ))}
                {user?.data.data.map((user) => (
                    <Card key={user._id}>
                        <CardContent className="flex items-center justify-between p-4">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={user.avatar}
                                    alt={user.displayName}
                                    width={50}
                                    height={50}
                                    className="mr-4 rounded-full"
                                />
                                <div>
                                    <h2 className="font-semibold">
                                        {user.displayName}
                                    </h2>
                                </div>
                                <div>
                                    {(() => {
                                        if (user.friendStatus) {
                                            switch (user.friendStatus) {
                                                case "pending":
                                                    return (
                                                        <Badge
                                                            variant={"outline"}
                                                        >
                                                            <HourglassIcon className="mr-2 size-3" />
                                                            Pending
                                                        </Badge>
                                                    );
                                                case "accepted":
                                                    return (
                                                        <Badge
                                                            variant={"outline"}
                                                        >
                                                            <UserCheck2 className="mr-2 size-3" />
                                                            Friend
                                                        </Badge>
                                                    );
                                                default:
                                                    return (
                                                        <Badge
                                                            variant={"outline"}
                                                        >
                                                            <UserRoundPlus className="mr-2 size-3" />
                                                            Add friend
                                                        </Badge>
                                                    );
                                            }
                                        } else {
                                            return (
                                                <Badge variant={"outline"}>
                                                    <UserRoundPlus className="mr-2 size-3" />
                                                    Add friend
                                                </Badge>
                                            );
                                        }
                                    })()}
                                </div>
                            </div>

                            {(() => {
                                switch (user.friendStatus) {
                                    case "pending":
                                        return (
                                            <Button
                                                variant={"outline"}
                                                className="px-5"
                                                onClick={() =>
                                                    handleRemoveFriendInvitation(
                                                        user._id,
                                                        {
                                                            onSuccess() {
                                                                toast.success(
                                                                    "Friend invitation removed",
                                                                );
                                                                queryClient.invalidateQueries(
                                                                    {
                                                                        queryKey:
                                                                            [
                                                                                "search_user",
                                                                            ],
                                                                    },
                                                                );
                                                            },
                                                        },
                                                    )
                                                }
                                            >
                                                <HourglassIcon className="mr-2 size-3" />
                                                Remove
                                            </Button>
                                        );
                                    case "accepted":
                                        return null;

                                    default:
                                        return (
                                            <Button
                                                onClick={() => {
                                                    handleSendFriendInvitation(
                                                        user._id,
                                                    );
                                                }}
                                            >
                                                <PlusIcon className="size-5" />
                                                Add friend
                                            </Button>
                                        );
                                }
                            })()}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
