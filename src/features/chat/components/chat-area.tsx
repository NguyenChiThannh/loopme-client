import { Phone, Send, Video } from "lucide-react";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageList from "./message-list";

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

interface ChatAreaProps {
    selectedContact: Contact | null;
    messages: Message[];
    newMessage: string;
    onNewMessageChange: (message: string) => void;
    onSendMessage: () => void;
}

export default function ChatArea({
    selectedContact,
    messages,
    newMessage,
    onNewMessageChange,
    onSendMessage,
}: ChatAreaProps) {
    if (!selectedContact) {
        return (
            <div className="flex flex-1 items-center justify-center bg-gray-50">
                <p className="text-xl text-gray-500">
                    Select a contact to start chatting
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-1 flex-col">
            <div className="flex items-center justify-between border-b bg-white p-4">
                <div className="flex items-center space-x-3">
                    <Avatar>
                        <AvatarImage
                            src={selectedContact.avatar}
                            alt={selectedContact.name}
                        />
                        <AvatarFallback>
                            {selectedContact.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-semibold">
                        {selectedContact.name}
                    </h2>
                </div>
            </div>
            <ScrollArea className="flex-1 p-4">
                <MessageList messages={messages}/>
            </ScrollArea>
            <div className="border-t bg-white p-4">
                <div className="flex space-x-2">
                    <Input
                        value={newMessage}
                        onChange={(e) => onNewMessageChange(e.target.value)}
                        placeholder="Type a message..."
                        onKeyPress={(e) => e.key === "Enter" && onSendMessage()}
                    />
                    <Button onClick={onSendMessage}>
                        <Send className="h-5 w-5" />
                        <span className="sr-only">Send message</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
