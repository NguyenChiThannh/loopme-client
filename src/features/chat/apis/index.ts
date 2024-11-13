import { useMutation, useQuery } from "@tanstack/react-query";

import ChatService from "./service";
import { GLOBAL_KEYS } from "@/configs/keys";

export const chatApi = {
    query: {
        useGetMessages(userId: string) {
            return useQuery({
                queryKey: GLOBAL_KEYS.CHAT.messages(userId),
                queryFn: () => ChatService.getMessages(userId),
            });
        },
        useGetChannels() {
            return useQuery({
                queryKey: GLOBAL_KEYS.CHAT.channels,
                queryFn: () => ChatService.getChannels(),
            });
        },
        useGetChannel(channelId: string) {
            return useQuery({
                queryKey: GLOBAL_KEYS.CHAT.channel(channelId),
                queryFn: () => ChatService.getChannel(channelId),
            });
        },
    },
    mutation: {
        useSendMessage(userId: string) {
            return useMutation({
                mutationFn: (message: string) =>
                    ChatService.sendMessage(userId, message),
            });
        },
    },
};
