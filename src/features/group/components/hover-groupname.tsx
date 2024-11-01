import { Award, Users } from "lucide-react";
import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";

import { GroupInfoCard } from "./group-info-card";

interface GroupHoverInfoProps {
    name: string;
    avatarSrc: string;
    members: number;
    online: number;
    description: string;
}

export function GroupHoverInfo({
    name,
    avatarSrc,
    members,
    online,
    description,
}: GroupHoverInfoProps) {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Link to={`/group`} className="font-medium hover:underline">
                    r/{name}
                </Link>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                <GroupInfoCard />
            </HoverCardContent>
        </HoverCard>
    );
}
