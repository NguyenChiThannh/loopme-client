import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { Socket, io } from "socket.io-client";

import { useUser } from "./user-provider";

interface SocketContextType {
    socket: Socket | null;
    messages: unknown[];
    notifications: unknown[];
}

const WatchListContext = createContext<SocketContextType>({
    socket: null,
    messages: [],
    notifications: [],
});

export const useSocket = () => useContext(WatchListContext);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<unknown[]>([]);
    const [notifications, setNotifications] = useState<unknown[]>([]);
    const { user } = useUser();

    useEffect(() => {
        if (!user) return;

        const newSocket = io(import.meta.env.VITE_BACKEND_BASE_URL, {
            transports: ["websocket", "polling"],
            query: {
                userId: user._id,
            },
        });

        newSocket.on("connect", () => {
            console.log("Connected with ID:", newSocket.id);
        });

        newSocket.on("message", (data) => {
            console.log("Message received:", data);
            setMessages((prev) => [...prev, data]);
        });

        newSocket.on("notifications", (data) => {
            console.log("Notification received:", data);
            setNotifications((prev) => [...prev, data]);
        });

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, [user]);

    return (
        <WatchListContext.Provider value={{ socket, messages, notifications }}>
            {children}
        </WatchListContext.Provider>
    );
};
