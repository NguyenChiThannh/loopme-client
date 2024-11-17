import { useQueryState } from "nuqs";
import { useState } from "react";

import { Channel } from "@/features/chat/apis/type";
import ChatArea from "@/features/chat/components/chat-area";
import ChannelList from "@/features/chat/components/contact-list";
import { friendApi } from "@/features/friends/apis";

export default function ChatPage() {
    const [selectedChannel, setSelectedChannel] = useState<Channel | null>(
        null,
    );
    const [channelId, setChannelId] = useQueryState("channelId");
    const [searchQuery, setSearchQuery] = useState("");

    const {
        data: friends,
        isPending,
        isError,
    } = friendApi.query.useGetAllFriend(true);

    if (isPending) return null;
    if (isError && !friends) return <p>Cannot load friends</p>;

    const handleChannelSelect = (channel: Channel) => {
        setChannelId(channel._id);
        setSelectedChannel(channel);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <ChannelList
                selectedChannel={selectedChannel}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onChannelSelect={handleChannelSelect}
            />
            {channelId && selectedChannel ? (
                <ChatArea selectedChannel={selectedChannel} />
            ) : (
                <p>Select a contact to start chatting</p>
            )}
        </div>
    );
}
