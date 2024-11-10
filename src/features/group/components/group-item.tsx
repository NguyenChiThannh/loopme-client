import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Group } from "@/configs/type";

type GroupItemProps = {
    group: Group;
};

export function GroupItem({ group }: GroupItemProps) {
    return (
        <li className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center space-x-4">
                <Avatar>
                    <AvatarFallback>
                        {group.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <Link to={`/group/${group._id}`}>
                    <span className="font-medium hover:underline">
                        {group.name}
                    </span>
                </Link>
            </div>
        </li>
    );
}
