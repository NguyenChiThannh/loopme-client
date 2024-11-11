import { Cake, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";

import { ROUTES } from "@/configs/route.config";
import { UserSelect } from "@/configs/type";

export default function HoverUsername({
    displayName,
    avatar,
    _id,
}: UserSelect) {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Link
                    to={ROUTES.USER_PAGE(_id)}
                    className="h-auto p-0 text-sm font-semibold hover:underline"
                >
                    u/{displayName}
                </Link>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-4">
                        <Avatar>
                            <AvatarImage
                                src={avatar}
                                alt={`${displayName}'s avatar`}
                            />
                            <AvatarFallback>
                                {displayName[0].toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h4 className="text-sm font-semibold">
                                u/{displayName}
                            </h4>
                            {/* <p className="text-xs text-muted-foreground">
                                {karma.toLocaleString()} karma
                            </p> */}
                        </div>
                    </div>
                    {/* <p className="text-sm">{description}</p>
                    <Separator />
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <div className="flex items-center">
                            <CalendarDays className="w-3 h-3 mr-1" />
                            Joined {joinDate}
                        </div>
                        <div className="flex items-center">
                            <Cake className="w-3 h-3 mr-1" />
                            Cake day {cakeDay}
                        </div>
                    </div> */}
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}
