import { Friend } from "../apis/type";
import { UserPlus } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export const SuggestedFriendItem = ({
    friend,
    onAddFriend,
}: {
    friend: Friend;
    onAddFriend: (id: string) => void;
}) => (
    <div className="flex items-center justify-between border-b p-4 last:border-b-0">
        <div className="flex items-center space-x-4">
            <Avatar>
                <AvatarImage src={friend.avatar} alt={friend.displayName} />
                <AvatarFallback>
                    {friend.displayName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <div>
                <h3 className="truncate px-2 font-semibold">
                    {friend.displayName}
                </h3>
            </div>
        </div>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onAddFriend(friend._id)}
                        aria-label={`Add ${friend.displayName} as friend`}
                    >
                        <UserPlus className="h-4 w-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Add friend</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </div>
);
