import { Channel } from "../apis/type";
import { useNavigate } from "react-router";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { User } from "@/configs/type";

interface ChannelItemProps {
    channel: Channel;
    selectedChannel: Channel | null;
    onChannelSelect: (channel: Channel) => void;
    user: User;
}

export default function ChannelItem({
    user,
    channel,
    onChannelSelect,
    selectedChannel,
}: ChannelItemProps) {
    const receiver = channel.participants.filter((u) => u._id !== user._id);
    return (
        <div
            key={channel._id}
            className={`flex cursor-pointer items-center space-x-4 rounded-lg p-3 hover:bg-gray-100 ${selectedChannel?._id === channel._id ? "bg-gray-100" : ""}`}
            onClick={() => {
                onChannelSelect(channel);
            }}
        >
            <Avatar>
                <AvatarImage
                    src={receiver[0].avatar}
                    alt={receiver[0].displayName}
                />
                <AvatarFallback>
                    {receiver[0].displayName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                </AvatarFallback>
            </Avatar>
            <div className="mr-2 min-w-0 flex-1">
                <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-medium text-gray-900">
                        {receiver[0].displayName}
                    </p>
                    {!channel.isRead && (
                        <div className="size-3 rounded-full bg-red-600" />
                    )}
                </div>
                <div className="flex items-start justify-between">
                    <p className="truncate text-sm text-gray-500">
                        {channel?.lastMessage?.message}
                    </p>
                </div>
            </div>
        </div>
    );
}
