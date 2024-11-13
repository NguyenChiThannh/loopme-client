import MessageItem from "./message";

export interface Message {
    id: string;
    senderId: string;
    content: string;
    timestamp: string;
}

interface MessageListProps {
    messages: Message[];
}

export default function MessageList({messages}:MessageListProps) {
    return (
        <>
            {messages.map((message) => (
                <MessageItem message={message}/>
            ))}
        </>
    )
}