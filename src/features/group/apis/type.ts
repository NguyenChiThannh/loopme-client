import { z } from "zod";

export const groupRequestSchema = {
    create: z.object({
        name: z.string(),
        background_cover: z.any().optional(),
        isPublic: z.boolean().default(true),
    }),
};
