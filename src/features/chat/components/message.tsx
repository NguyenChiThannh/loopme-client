import { Message } from "../apis/type";
import { format, isToday, isYesterday } from "date-fns";

import { useUser } from "@/providers/user-provider";

interface MessageProps {
    message: Message;
}
const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString);

    if (isToday(date)) {
        return format(date, "HH:mm");
    }

    if (isYesterday(date)) {
        return "Yesterday " + format(date, "HH:mm");
    }

    return format(date, "MMM d, HH:mm");
};

export default function MessageItem({ message }: MessageProps) {
    const { user, isLoading } = useUser();
    if (isLoading) return null;
    if (!user) return null;

    return (
        <div
            key={message._id}
            className={`mb-4 flex ${message.sender._id === user._id ? "justify-end" : "justify-start"}`}
        >
            <div
                className={`max-w-xs rounded-lg px-4 py-2 ${
                    message.sender._id === user._id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                }`}
            >
                <p>{message.message}</p>
                <p
                    className={`mt-1 text-xs ${message.sender._id === user._id ? "text-blue-100" : "text-gray-500"}`}
                >
                    {formatMessageTime(message.createdAt)}
                </p>
            </div>
        </div>
    );
}
