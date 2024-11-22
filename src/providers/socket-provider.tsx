import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { useLocation } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import { toast } from "sonner";

import { useUser } from "./user-provider";
import { Message } from "@/features/chat/apis/type";
import { Notification } from "@/features/notification/apis/type";

interface SocketContextType {
    socket: Socket | null;
    messages: Message[];
    notifications: Notification[];
}

const WatchListContext = createContext<SocketContextType>({
    socket: null,
    messages: [],
    notifications: [],
});

export const useSocket = () => useContext(WatchListContext);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const { user } = useUser();
    const location = useLocation();
    const pathname = location.pathname;

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
            if (!pathname.includes("chat")) {
                toast.info("You have new message");
            }
            setMessages((prev) => [...prev, data]);
        });

        newSocket.on("notifications", (data) => {
            console.log("Notification received:", data);
            toast.info("You have new notification");
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
