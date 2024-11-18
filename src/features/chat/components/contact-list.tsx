import { chatApi } from "../apis";
import { Channel } from "../apis/type";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, PlusCircle, Search, Undo2 } from "lucide-react";
import { useEffect } from "react";
import {
    Link,
    useNavigate,
    useParams,
    useSearchParams,
} from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import ChannelItem from "./contact-item";
import NewChatModal from "./new-chat-model";
import { GLOBAL_KEYS } from "@/configs/keys";
import { friendApi } from "@/features/friends/apis";
import { ChatFriendList } from "@/features/friends/components/chat-friend-list";
import { useUser } from "@/providers/user-provider";

interface ChannelListProps {
    selectedChannel: Channel | null;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onChannelSelect: (channel: Channel) => void;
}

export default function ChannelList({
    selectedChannel,
    searchQuery,
    onSearchChange,
    onChannelSelect,
}: ChannelListProps) {
    const [searchParams] = useSearchParams();
    const currentChannelId = searchParams.get("channelId");
    const { data: channels, isLoading } = chatApi.query.useGetChannels();
    const { user, isLoading: isUserLoading, isSignedIn } = useUser();
    const {
        data: friends,
        isPending,
        isError,
    } = friendApi.query.useGetAllFriend(true);
    const { mutate } = chatApi.mutation.useCreateChannel();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!channels?.data?.data || !currentChannelId) return;

        const foundChannel = channels.data.data.find(
            (channel) => channel._id === currentChannelId,
        );

        if (foundChannel) {
            onChannelSelect(foundChannel);
            queryClient.invalidateQueries({
                queryKey: GLOBAL_KEYS.CHAT.prefix,
            });
            queryClient.invalidateQueries({
                queryKey: GLOBAL_KEYS.CHAT.channels,
            });
        }
    }, [channels, currentChannelId]);

    if (isUserLoading) return null;
    if (!user || !isSignedIn) return <p>Null</p>;
    if (isLoading || !channels) return <Loader2 />;
    if (isPending) return null;
    if (isError && !friends) return <p>Cannot load friends</p>;

    const handleNewChat = (friendId: string) => {
        mutate(
            {
                friendId: friendId,
            },
            {
                onSuccess: (data) => {
                    onChannelSelect(data.data);
                },
            },
        );
    };

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
                        <NewChatModal>
                            <ChatFriendList
                                friends={friends.data.data}
                                onStartChat={handleNewChat}
                            />
                        </NewChatModal>
                    </div>
                </div>
                {channels.data.data.length && (
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
                            {channels.data.data?.map((channel) => (
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
                )}
            </CardContent>
        </Card>
    );
}
