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
    register: z
        .object({
            email: z.string().email(),
            password: z
                .string()
                .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
                .regex(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                    "Mật khẩu phải chứa ít nhất một chữ thường, một chữ hoa và một chữ số.",
                ),
            displayName: z.string().min(6, "Tên phải có ít nhất 6 ký tự"),
            repeatPassword: z
                .string()
                .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
                .regex(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                    "Mật khẩu phải chứa ít nhất một chữ thường, một chữ hoa và một chữ số.",
                ),
        })
        .refine((data) => data.password === data.repeatPassword, {
            message: "Password không trùng khớp",
            path: ["repeatPassword"],
        }),
    verifyOtp: z.object({
        otp: z.string().min(6, "Mã OTP phải có ít nhất 6 ký tự"),
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

export interface OTP {
    otp: string;
}
