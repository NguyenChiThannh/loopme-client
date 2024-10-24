import { REGEXP_ONLY_DIGITS } from "input-otp";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";

import OtpForm from "@/features/auth/components/otp-form";
import ResetPasswordForm from "@/features/auth/components/reset-password-form";

export default function ForgetPasswordPage() {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [step, setStep] = useState("otp"); // 'otp' or 'password'

    const handleOtpSubmit = async (otp: string) => {
        setErrorMessage("");
        setSuccessMessage("");

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            if (otp.length === 6) {
                setSuccessMessage(
                    "OTP verified successfully. Please set your new password.",
                );
                setStep("password");
            } else {
                throw new Error("Invalid OTP");
            }
        } catch (error) {
            setErrorMessage("Invalid OTP. Please try again.");
        }
    };

    const handlePasswordSubmit = async (
        newPassword: string,
        confirmPassword: string,
    ) => {
        setErrorMessage("");
        setSuccessMessage("");

        try {
            if (newPassword !== confirmPassword) {
                throw new Error("fail");
            }

            if (newPassword.length < 8) {
                throw new Error("fail");
            }
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setSuccessMessage("Password reset successfully!");
            // Here you would typically update the password in your backend
        } catch (error) {
            setErrorMessage("Failed to reset password. Please try again.");
        }
    };

    return (
        <Card className="mx-auto w-full max-w-md">
            <CardHeader>
                <CardTitle>
                    {step === "otp" ? "Confirm OTP" : "Reset Password"}
                </CardTitle>
                <CardDescription>
                    {step === "otp"
                        ? "Enter the one-time password sent to your email to reset your password."
                        : "Enter your new password."}
                </CardDescription>
            </CardHeader>
            {step === "otp" ? (
                <OtpForm
                    errorMessage={errorMessage}
                    onSubmit={handleOtpSubmit}
                    successMessage={successMessage}
                />
            ) : (
                <ResetPasswordForm
                    errorMessage={errorMessage}
                    onSubmit={handlePasswordSubmit}
                    successMessage={successMessage}
                />
            )}
        </Card>
    );
}
