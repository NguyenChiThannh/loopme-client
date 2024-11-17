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

export interface Contact {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
}

export interface Message {
    id: string;
    senderId: string;
    content: string;
    timestamp: string;
}

const initialContacts: Contact[] = [
    {
        id: "1",
        name: "Alice Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        lastMessage: "Hey, how are you?",
        lastMessageTime: "10:30 AM",
        unreadCount: 2,
    },
    {
        id: "2",
        name: "Bob Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        lastMessage: "Can we meet tomorrow?",
        lastMessageTime: "Yesterday",
        unreadCount: 0,
    },
    {
        id: "3",
        name: "Carol Williams",
        avatar: "/placeholder.svg?height=40&width=40",
        lastMessage: "Thanks for your help!",
        lastMessageTime: "Monday",
        unreadCount: 5,
    },
];

const initialMessages: Message[] = [];

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
