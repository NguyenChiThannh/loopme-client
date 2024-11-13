export interface Message {
    id: string;
    senderId: string;
    content: string;
    timestamp: string;
}

interface MessageProps {
    message: Message;
}

export default function MessageItem({message}:MessageProps) {
    return(
        <div
                    key={message.id}
                    className={`mb-4 flex ${message.senderId === "currentUser" ? "justify-end" : "justify-start"}`}
                >
                    <div
                        className={`max-w-xs rounded-lg px-4 py-2 ${
                            message.senderId === "currentUser"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200"
                        }`}
                    >
                        <p>{message.content}</p>
                        <p
                            className={`mt-1 text-xs ${message.senderId === "currentUser" ? "text-blue-100" : "text-gray-500"}`}
                        >
                            {message.timestamp}
                        </p>
                    </div>
                </div>
    )
}