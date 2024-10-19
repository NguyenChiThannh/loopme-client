import { Award, Users } from "lucide-react";
import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";

interface GroupHoverInfoProps {
    name: string;
    avatarSrc: string;
    members: number;
    online: number;
    description: string;
}

export default function HoverGroupname({
    name,
    avatarSrc,
    members,
    online,
    description,
}: GroupHoverInfoProps) {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Link to={"/"} className="font-medium hover:underline">
                    r/{name}
                </Link>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-4">
                        <Avatar>
                            <AvatarImage
                                src={avatarSrc}
                                alt={`${name} subreddit avatar`}
                            />
                            <AvatarFallback>
                                {name[0].toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h4 className="text-sm font-semibold">r/{name}</h4>
                            <p className="text-xs text-muted-foreground">
                                {members.toLocaleString()} members
                            </p>
                        </div>
                    </div>
                    <p className="text-sm">{description}</p>
                    <Separator />
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <div className="flex items-center">
                            <Users className="mr-1 h-3 w-3" />
                            {online.toLocaleString()} online
                        </div>
                        <div className="flex items-center">
                            <Award className="mr-1 h-3 w-3" />
                            Top 1% of all communities
                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}
