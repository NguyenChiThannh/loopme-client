import { Cake, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";

interface UserHoverInfoProps {
    name: string;
    avatarSrc: string;
    karma: number;
    joinDate: string;
    cakeDay: string;
    description: string;
}

export default function HoverUsername({
    name,
    avatarSrc,
    karma,
    joinDate,
    cakeDay,
    description,
}: UserHoverInfoProps) {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Link
                    to={"/"}
                    className="h-auto p-0 text-sm font-semibold hover:underline"
                >
                    u/{name}
                </Link>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-4">
                        <Avatar>
                            <AvatarImage
                                src={avatarSrc}
                                alt={`${name}'s avatar`}
                            />
                            <AvatarFallback>
                                {name[0].toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h4 className="text-sm font-semibold">u/{name}</h4>
                            <p className="text-xs text-muted-foreground">
                                {karma.toLocaleString()} karma
                            </p>
                        </div>
                    </div>
                    <p className="text-sm">{description}</p>
                    <Separator />
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <div className="flex items-center">
                            <CalendarDays className="mr-1 h-3 w-3" />
                            Joined {joinDate}
                        </div>
                        <div className="flex items-center">
                            <Cake className="mr-1 h-3 w-3" />
                            Cake day {cakeDay}
                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}
