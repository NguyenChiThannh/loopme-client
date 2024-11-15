import { Friend } from "../apis/type";
import { MessageSquare } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface FriendItemProps {
    friend: Friend;
    onStartChat: (friendId: string) => void;
}

export function FriendItem({ friend, onStartChat }: FriendItemProps) {
    return (
        <li className="py-4 transition-colors hover:bg-muted/50">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Avatar>
                        <AvatarImage
                            src={friend.avatar}
                            alt={friend.displayName}
                        />
                        <AvatarFallback>
                            {friend.displayName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium">{friend.displayName}</p>
                    </div>
                </div>
                <Button
                    size="sm"
                    onClick={() => onStartChat(friend._id)}
                    aria-label={`Start chat with ${friend.displayName}`}
                >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Chat
                </Button>
            </div>
        </li>
    );
}

interface ChatFriendListProps {
    friends: Friend[];
    onStartChat: (friendId: string) => void;
}

export function ChatFriendList({ friends, onStartChat }: ChatFriendListProps) {
    return (
        <ul className="divide-y">
            {friends.map((friend) => (
                <FriendItem
                    key={friend._id}
                    friend={friend}
                    onStartChat={onStartChat}
                />
            ))}
        </ul>
    );
}
