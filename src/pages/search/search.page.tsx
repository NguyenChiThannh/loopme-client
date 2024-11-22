import { PlusIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { friendApi } from "@/features/friends/apis";
import { GroupCard } from "@/features/group/components/group-card";
import { searchApi } from "@/features/search/apis";

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const q = searchParams.get("q");
    const { mutate: handleSendFriendInvitation } =
        friendApi.mutation.useAddPendingFriendInvitation();
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
                            <div className="flex items-center">
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
                            </div>
                            {user?.friendStatus !== "accepted" && (
                                <Button
                                    onClick={() => {
                                        handleSendFriendInvitation(user._id);
                                    }}
                                >
                                    <PlusIcon className="size-5" />
                                    Add friend
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* <div className="flex items-center justify-center mt-4">
                <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="mr-2"
                    aria-label="Previous page"
                >
                    <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                </Button>
                <span className="mx-2">
                    Page {currentPage} of {totalPages}
                </span>
                <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="ml-2"
                    aria-label="Next page"
                >
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </Button>
            </div> */}
        </div>
    );
}
