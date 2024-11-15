import { Message } from "../apis/type";

interface MessageProps {
    message: Message;
}

export default function MessageItem({ message }: MessageProps) {
    return (
        <div
            key={message._id}
            className={`mb-4 flex ${message.sender._id === "currentUser" ? "justify-end" : "justify-start"}`}
        >
            <div
                className={`max-w-xs rounded-lg px-4 py-2 ${
                    message.sender._id === "currentUser"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                }`}
            >
                <p>{message.message}</p>
                <p
                    className={`mt-1 text-xs ${message.sender._id === "currentUser" ? "text-blue-100" : "text-gray-500"}`}
                >
                    {message.createdAt}
                </p>
            </div>
        </div>
    );
}
