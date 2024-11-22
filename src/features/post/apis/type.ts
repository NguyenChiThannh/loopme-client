import { z } from "zod";

export const postRequestSchema = {
    create: z.object({
        content: z.string().min(10, {
            message: "Content must be at least 10 characters.",
        }),
        privacy: z.enum(["public", "private", "friends"]).default("public"),
        image: z.any().optional(),
    }),
    createInGroup: z.object({
        content: z.string().min(10, {
            message: "Content must be at least 10 characters.",
        }),
        privacy: z.enum(["public", "private", "friends"]).default("public"),
        image: z.any().optional(),
        group: z.string().optional(),
    }),
    update: z.object({
        id: z.string(),
        content: z.string().min(10, {
            message: "Content must be at least 10 characters.",
        }),
        image: z.any().optional(),
    }),
};
