import { chatApi } from "../apis";
import { Channel } from "../apis/type";
import { Loader2, PlusCircle, Search, Undo2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import ChannelItem from "./contact-item";
import EmptyState from "./empty-state";
import NewChatModal from "./new-chat-model";
import { friendApi } from "@/features/friends/apis";
import { ChatFriendList } from "@/features/friends/components/chat-friend-list";
import { useUser } from "@/providers/user-provider";

interface ChannelListProps {
    selectedChannel: Channel | null;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onChannelSelect: (channel: Channel) => void;
    onNewChat: () => void;
}

export default function ChannelList({
    selectedChannel,
    searchQuery,
    onSearchChange,
    onChannelSelect,
    onNewChat,
}: ChannelListProps) {
    const { data, isLoading } = chatApi.query.useGetChannels();
    const { user, isLoading: isUserLoading, isSignedIn } = useUser();
    if (isUserLoading) return null;
    if (!user || !isSignedIn) return <p>Null</p>;
    if (isLoading || !data) return <Loader2 />;
    // const filteredChannels = data.data.data.filter((channel) =>
    //     channel.participantDetails..toLowerCase().includes(searchQuery.toLowerCase()),
    // );
    const {
        data: friends,
        isPending,
        isError,
    } = friendApi.query.useGetAllFriend(true);
    const { mutate } = chatApi.mutation.useCreateChannel();

    if (isPending) return null;
    if (isError && !friends) return <p>Cannot load friends</p>;

    const handleNewChat = (friendId: string) => {
        mutate({
            friendId: friendId,
        });
    };

    console.log(data);
    return (
        <Card className="w-1/3 max-w-sm border-r">
            <CardContent className="flex h-full flex-col p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Chats</h2>
                    <div className="space-x-2">
                        <Link to={"/"}>
                            <Button variant="outline" size="icon">
                                <Undo2 className="h-5 w-5" />
                                <span className="sr-only">New Chat</span>
                            </Button>
                        </Link>
                        {/* <Button
                            variant="outline"
                            size="icon"
                            onClick={onNewChat}
                        >
                            <PlusCircle className="w-5 h-5" />
                            <span className="sr-only">New Chat</span>
                        </Button> */}
                        <NewChatModal>
                            <ChatFriendList
                                friends={friends.data.data}
                                onStartChat={handleNewChat}
                            />
                        </NewChatModal>
                    </div>
                </div>
                {data.data.data.length ? (
                    <>
                        <div className="relative mb-4">
                            <Search className="absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-400" />
                            <Input
                                className="pl-8"
                                placeholder="Search channels..."
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                            />
                        </div>
                        <ScrollArea className="flex-grow">
                            {data.data.data?.map((channel) => (
                                <ChannelItem
                                    user={user}
                                    channel={channel}
                                    onChannelSelect={onChannelSelect}
                                    selectedChannel={selectedChannel}
                                    key={channel._id}
                                />
                            ))}
                        </ScrollArea>
                    </>
                ) : (
                    <EmptyState onNewChat={onNewChat} />
                )}
            </CardContent>
        </Card>
    );
}
