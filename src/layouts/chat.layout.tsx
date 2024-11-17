import { SocketProvider } from "@/providers/socket-provider";
import { UserProvider } from "@/providers/user-provider";

export default function ChatLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <UserProvider>
            <SocketProvider>{children}</SocketProvider>
        </UserProvider>
    );
}
