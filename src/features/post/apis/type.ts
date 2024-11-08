import { z } from "zod";

export const postRequestSchema = {
    create: z.object({
        content: z.string().min(10, {
            message: "Content must be at least 10 characters.",
        }),
        image: z.any().optional(),
    }),
};
