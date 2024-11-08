import { z } from "zod";

export const userRequestSchema = {
    updateUser: z
        .object({
            displayName: z.string().min(6, "Tên phải có ít nhất 6 ký tự"),
            avatar: z.string(),
        })
        .partial(),
};
