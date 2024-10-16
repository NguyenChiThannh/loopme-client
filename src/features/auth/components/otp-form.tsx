import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";

interface OTPFormProps {
    onSubmit: (otp: string) => Promise<void>;
    errorMessage: string;
    successMessage: string;
}

export default function OtpForm({
    onSubmit,
    errorMessage,
    successMessage,
}: OTPFormProps) {
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await onSubmit(otp);
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
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
                    <p className="mt-2 text-green-500">{successMessage}</p>
                )}
            </CardContent>
            <CardFooter>
                <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? "Verifying..." : "Verify OTP"}
                </Button>
            </CardFooter>
        </form>
    );
}
