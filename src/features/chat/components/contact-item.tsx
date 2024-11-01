import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export interface Contact {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
}

interface ContactItemProps {
    contact: Contact;
    selectedContact: Contact | null;
    onContactSelect: (contact: Contact) => void;
}

export default function ContactItem({
    contact,
    onContactSelect,
    selectedContact,
}: ContactItemProps) {
    return (
        <div
            key={contact.id}
            className={`flex cursor-pointer items-center space-x-4 rounded-lg p-3 hover:bg-gray-100 ${selectedContact?.id === contact.id ? "bg-gray-100" : ""}`}
            onClick={() => onContactSelect(contact)}
        >
            <Avatar>
                <AvatarImage src={contact.avatar} alt={contact.name} />
                <AvatarFallback>
                    {contact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                </AvatarFallback>
            </Avatar>
            <div className="mr-2 min-w-0 flex-1">
                <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-medium text-gray-900">
                        {contact.name}
                    </p>
                    <span className="whitespace-nowrap text-xs text-gray-500">
                        {contact.lastMessageTime}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <p className="truncate text-sm text-gray-500">
                        {contact.lastMessage}
                    </p>
                    {contact.unreadCount > 0 && (
                        <Badge variant="destructive" className="ml-2">
                            {contact.unreadCount}
                        </Badge>
                    )}
                </div>
            </div>
        </div>
    );
}
