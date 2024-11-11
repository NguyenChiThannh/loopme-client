import { z } from "zod";

export const searchParams = z.object({
    q: z.string().nullable(),
});
