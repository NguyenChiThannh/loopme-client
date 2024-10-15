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

export default function ForgetPasswordPage() {
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [step, setStep] = useState("otp"); // 'otp' or 'password'
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // const handleOtpChange = (element: number, value: string) => {
    //     if (isNaN(Number(value))) return;
    //     const newOtp = [...otp];
    //     newOtp[element] = value;
    //     setOtp(newOtp);

    //     // Move to next input
    //     if (value !== "" && element < 5) {
    //         inputRefs.current[element + 1]?.focus();
    //     }
    // };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
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
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        if (newPassword !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            setIsLoading(false);
            return;
        }

        if (newPassword.length < 8) {
            setErrorMessage("Password must be at least 8 characters long.");
            setIsLoading(false);
            return;
        }

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setSuccessMessage("Password reset successfully!");
            // Here you would typically update the password in your backend
        } catch (error) {
            setErrorMessage("Failed to reset password. Please try again.");
        } finally {
            setIsLoading(false);
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
                <form onSubmit={handleOtpSubmit}>
                    <CardContent className="flex flex-col items-center">
                        <InputOTP
                            maxLength={6}
                            pattern={REGEXP_ONLY_DIGITS}
                            onChange={setOtp}
                        >
                            <InputOTPGroup>
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <InputOTPSlot
                                        index={i}
                                        key={i}
                                        className="h-16 w-14 text-center text-2xl"
                                    />
                                ))}
                            </InputOTPGroup>
                        </InputOTP>
                        {errorMessage && (
                            <p className="mt-2 text-red-500">{errorMessage}</p>
                        )}
                        {successMessage && (
                            <p className="mt-2 text-green-500">
                                {successMessage}
                            </p>
                        )}
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? "Verifying..." : "Verify OTP"}
                        </Button>
                    </CardFooter>
                </form>
            ) : (
                <form onSubmit={handlePasswordSubmit}>
                    <CardContent className="space-y-4">
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="pr-10"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOffIcon className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <EyeIcon className="h-5 w-5 text-gray-400" />
                                )}
                            </button>
                        </div>
                        <Input
                            type="password"
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {errorMessage && (
                            <p className="text-red-500">{errorMessage}</p>
                        )}
                        {successMessage && (
                            <p className="text-green-500">{successMessage}</p>
                        )}
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? "Resetting..." : "Reset Password"}
                        </Button>
                    </CardFooter>
                </form>
            )}
        </Card>
    );
}
