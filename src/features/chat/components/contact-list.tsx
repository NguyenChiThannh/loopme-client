import { chatApi } from "../apis";
import { Loader2, PlusCircle, Search, Undo2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import ContactItem from "./contact-item";
import EmptyState from "./empty-state";

export interface Contact {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
}

interface ContactListProps {
    selectedContact: Contact | null;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onContactSelect: (contact: Contact) => void;
    onNewChat: () => void;
}

export default function ContactList({
    selectedContact,
    searchQuery,
    onSearchChange,
    onContactSelect,
    onNewChat,
}: ContactListProps) {
    const { data, isLoading } = chatApi.query.useGetChannels();
    const [contacts, setContacts] = useState(data?.data.data);
    if (isLoading || !data) return <Loader2 />;
    const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
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
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={onNewChat}
                        >
                            <PlusCircle className="h-5 w-5" />
                            <span className="sr-only">New Chat</span>
                        </Button>
                    </div>
                </div>
                {contacts.length > 0 ? (
                    <>
                        <div className="relative mb-4">
                            <Search className="absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-400" />
                            <Input
                                className="pl-8"
                                placeholder="Search contacts..."
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                            />
                        </div>
                        <ScrollArea className="flex-grow">
                            {filteredContacts.map((contact) => (
                                <ContactItem
                                    contact={contact}
                                    onContactSelect={onContactSelect}
                                    selectedContact={selectedContact}
                                    key={contact.id}
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
