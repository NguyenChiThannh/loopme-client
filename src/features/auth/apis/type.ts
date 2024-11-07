import { z } from "zod";

export const authRequestSchema = {
    login: z.object({
        email: z.string().email(),
        password: z
            .string()
            .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                "Mật khẩu phải chứa ít nhất một chữ thường, một chữ hoa và một chữ số.",
            ),
    }),
};

export interface User {
    _id: string;
    email: string;
    displayName: string;
    avatar: string;
    isActive: boolean;
    createdAt: string;
    __v: number;
}
