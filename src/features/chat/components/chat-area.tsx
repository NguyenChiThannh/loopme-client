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
            <div className="flex flex-1 items-center justify-center bg-gray-50">
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
        <div className="flex flex-1 flex-col">
            <div className="flex items-center justify-between border-b bg-white p-4">
                <div className="flex items-center space-x-3">
                    <Avatar>
                        <AvatarImage
                            src={selectedChannel.participants[0].avatar}
                            alt={selectedChannel.participants[0].displayName}
                        />
                        <AvatarFallback>
                            {selectedChannel.participants[0].displayName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-semibold">
                        {selectedChannel.participants[0].displayName}
                    </h2>
                </div>
            </div>
            <ScrollArea className="flex-1 p-4">
                <MessageList messages={data.data.data} />
            </ScrollArea>
            <div className="border-t bg-white p-4">
                <div className="flex space-x-2">
                    <Input
                        value={newMessage}
                        // onChange={(e) => onNewMessageChange(e.target.value)}
                        placeholder="Type a message..."
                        // onKeyPress={(e) => e.key === "Enter" && onSendMessage()}
                    />
                    <Button>
                        <Send className="h-5 w-5" />
                        <span className="sr-only">Send message</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
