import { Message } from "../apis/type";

import { useUser } from "@/providers/user-provider";

interface MessageProps {
    message: Message;
}

export default function MessageItem({ message }: MessageProps) {
    const { user, isLoading } = useUser();
    if (isLoading) return null;
    if (!user) return null;

    return (
        <div
            key={message._id}
            className={`mb-4 flex ${message.sender === user._id ? "justify-end" : "justify-start"}`}
        >
            <div
                className={`max-w-xs rounded-lg px-4 py-2 ${
                    message.sender === user._id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                }`}
            >
                <p>{message.message}</p>
                <p
                    className={`mt-1 text-xs ${message.sender === user._id ? "text-blue-100" : "text-gray-500"}`}
                >
                    {message.createdAt}
                </p>
            </div>
        </div>
    );
}
