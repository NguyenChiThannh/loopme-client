import { chatApi } from "../apis";
import { Channel, Message } from "../apis/type";
import { Send } from "lucide-react";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import MessageList from "./message-list";

interface ChatAreaProps {
    selectedChannel: Channel;
}

export default function ChatArea({ selectedChannel }: ChatAreaProps) {
    const { data, isPending, isError } = chatApi.query.useGetMessages(
        selectedChannel._id,
    );
    const [messages, setMessages] = React.useState<Message[]>(
        data?.data.data || [],
    );
    const [newMessage, setNewMessage] = React.useState("");
    if (isPending) return <p>Loading messages</p>;

    if (!data || isError) {
        return (
            <div className="flex items-center justify-center flex-1 bg-gray-50">
                <p className="text-xl text-gray-500">Failed to load message</p>
            </div>
        );
    }
    const handleSendMessage = () => {
        if (newMessage.trim() && selectedChannel) {
            // setMessages([...messages, newMsg]);
            setNewMessage("");
        }
    };

    return (
        <div className="flex flex-col flex-1">
            <div className="flex items-center justify-between p-4 bg-white border-b">
                <div className="flex items-center space-x-3">
                    <Avatar>
                        <AvatarImage
                            src={selectedChannel.participantsDetails[0].avatar}
                            alt={
                                selectedChannel.participantsDetails[0]
                                    .displayName
                            }
                        />
                        <AvatarFallback>
                            {selectedChannel.participantsDetails[0].displayName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-semibold">
                        {selectedChannel.participantsDetails[0].displayName}
                    </h2>
                </div>
            </div>
            <ScrollArea className="flex-1 p-4">
                <MessageList messages={data.data.data} />
            </ScrollArea>
            <div className="p-4 bg-white border-t">
                <div className="flex space-x-2">
                    <Input
                        value={newMessage}
                        // onChange={(e) => onNewMessageChange(e.target.value)}
                        placeholder="Type a message..."
                        // onKeyPress={(e) => e.key === "Enter" && onSendMessage()}
                    />
                    <Button>
                        <Send className="w-5 h-5" />
                        <span className="sr-only">Send message</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
