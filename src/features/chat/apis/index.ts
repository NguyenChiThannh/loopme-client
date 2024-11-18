import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import ChatService from "./service";
import { Message, chatRequestSchema } from "./type";
import { GLOBAL_KEYS } from "@/configs/keys";
import { PaginatedResponse } from "@/configs/type";

export const chatApi = {
    query: {
        useGetMessages(channelId?: string) {
            return useQuery({
                queryKey: GLOBAL_KEYS.CHAT.messages(channelId),
                queryFn: () => ChatService.getMessages(channelId),
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
        useSendMessage() {
            const queryClient = useQueryClient();
            return useMutation({
                mutationFn: ({
                    message,
                    receiverId,
                }: z.infer<typeof chatRequestSchema.sendMessage>) =>
                    ChatService.sendMessage(receiverId, message),
                onMutate: async ({ message, senderId, receiverId }) => {
                    await queryClient.cancelQueries({
                        queryKey: GLOBAL_KEYS.CHAT.prefix,
                    });
                    const previousMessages = queryClient.getQueryData(
                        GLOBAL_KEYS.CHAT.prefix,
                    );
                    queryClient.setQueryData(
                        GLOBAL_KEYS.CHAT.prefix,
                        (old: PaginatedResponse<Message[]> | undefined) => {
                            if (!old?.data?.data) {
                                return {
                                    data: {
                                        data: [
                                            {
                                                _id: "temp-id",
                                                sender: senderId,
                                                receiver: receiverId,
                                                message,
                                                createdAt:
                                                    new Date().toISOString(),
                                            },
                                        ],
                                    },
                                };
                            }
                            return {
                                ...old,
                                data: {
                                    ...old.data,
                                    data: [
                                        ...old.data.data,
                                        {
                                            _id: "temp-id",
                                            sender: senderId,
                                            receiver: receiverId,
                                            message,
                                            createdAt: new Date().toISOString(),
                                        },
                                    ],
                                },
                            };
                        },
                    );
                    return { previousMessages };
                },
                onError: (err, newMessage, context) => {
                    console.log(err);
                    queryClient.setQueryData(
                        GLOBAL_KEYS.CHAT.prefix,
                        context?.previousMessages,
                    );
                },
                onSuccess: (data, variables, context) => {
                    console.log(data);
                    queryClient.invalidateQueries({
                        queryKey: GLOBAL_KEYS.CHAT.prefix,
                    });
                },
            });
        },
        useCreateChannel() {
            return useMutation({
                mutationFn: (
                    channel: z.infer<typeof chatRequestSchema.createChannel>,
                ) => ChatService.createChannel(channel),
            });
        },
    },
};
