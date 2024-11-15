import { Message } from "../apis/type";

import MessageItem from "./message";

interface MessageListProps {
    messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
    return (
        <>
            {messages.map((message) => (
                <MessageItem message={message} />
            ))}
        </>
    );
}
