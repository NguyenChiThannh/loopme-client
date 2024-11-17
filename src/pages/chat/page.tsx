import { useQueryState } from "nuqs";
import React, { useState } from "react";

import { chatApi } from "@/features/chat/apis";
import { Channel } from "@/features/chat/apis/type";
import ChatArea from "@/features/chat/components/chat-area";
import ContactList from "@/features/chat/components/contact-list";
import ChannelList from "@/features/chat/components/contact-list";
import NewChatModal from "@/features/chat/components/new-chat-model";
import { friendApi } from "@/features/friends/apis";
import { ChatFriendList } from "@/features/friends/components/chat-friend-list";

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
