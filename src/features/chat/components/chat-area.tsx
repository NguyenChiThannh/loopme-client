import { chatApi } from "../apis";
import { Channel, Message } from "../apis/type";
import { Send } from "lucide-react";
import React, { useEffect, useRef } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import MessageList from "./message-list";
import { useSocket } from "@/providers/socket-provider";
import { useUser } from "@/providers/user-provider";

interface ChatAreaProps {
    selectedChannel: Channel;
}

export default function ChatArea({ selectedChannel }: ChatAreaProps) {
    const { user, isLoading } = useUser();
    const { data, isPending } = chatApi.query.useGetMessages(
        selectedChannel._id,
    );
    const { mutate } = chatApi.mutation.useSendMessage();
    const [messages, setMessages] = React.useState<Message[]>(
        data?.data.data || [],
    );
    const { socket } = useSocket();
    const [newMessage, setNewMessage] = React.useState("");

    const receiver = selectedChannel.participants.find(
        (participant) => participant._id !== user?._id,
    );
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isPending) return;
        if (data && data.data.data) {
            setMessages(data.data.data);
        }
    }, [data, isPending]);

    useEffect(() => {
        if (!socket) return;

        socket.on("message", (newMessage: Message) => {
            // Only update messages if the message belongs to current channel
            if (
                newMessage.sender._id === receiver?._id ||
                newMessage.receiver._id === user?._id
            ) {
                setMessages((prev) => [...prev, newMessage]);
            }
        });

        return () => {
            socket.off("message");
        };
    }, [socket, selectedChannel._id]);

    if (isPending || isLoading) return <p>Loading messages</p>;
    if (!user || !receiver) return null;

    const handleSendMessage = () => {
        if (selectedChannel && receiver && newMessage.trim().length !== 0) {
            mutate(
                {
                    message: newMessage,
                    receiverId: receiver._id,
                    senderId: user._id,
                },
                {
                    onSuccess() {
                        setNewMessage("");
                    },
                },
            );
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
                {data ? (
                    <>
                        <MessageList messages={messages} />
                        <div ref={messagesEndRef} />
                    </>
                ) : (
                    <p>No message</p>
                )}
            </ScrollArea>
            <div className="border-t bg-white p-4">
                <div className="flex space-x-2">
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        onKeyDown={(e) =>
                            e.key === "Enter" && handleSendMessage()
                        }
                    />
                    <Button onClick={handleSendMessage}>
                        <Send className="h-5 w-5" />
                        <span className="sr-only">Send message</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
