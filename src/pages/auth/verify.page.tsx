import { AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { Label } from "@/components/ui/label";

export default function VerifyPage() {
    const [verificationCode, setVerificationCode] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // For demonstration, we'll consider codes not equal to "123456" as invalid
        if (verificationCode !== "123456") {
            setError("Invalid verification code. Please try again.");
            setIsLoading(false);
            return;
        }

        // Handle successful verification here
        console.log("Verification successful");
        setIsLoading(false);
    };

    const handleResendCode = async () => {
        setIsResending(true);
        // Simulate API call to resend code
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsResending(false);
        // You would typically show a success message here
    };

    return (
        <Card className="mx-auto w-full max-w-md">
            <CardHeader>
                <CardTitle>Verify Your Account</CardTitle>
                <CardDescription>
                    Enter the verification code sent to your email
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="verificationCode">
                                Verification Code
                            </Label>
                            <Input
                                id="verificationCode"
                                placeholder="Enter your 6-digit code"
                                value={verificationCode}
                                onChange={(e) =>
                                    setVerificationCode(e.target.value)
                                }
                                maxLength={6}
                                required
                            />
                        </div>
                    </div>
                    {error && (
                        <Alert variant="destructive" className="mt-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <Button
                        className="mt-4 w-full"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Verifying...
                            </>
                        ) : (
                            "Verify Account"
                        )}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button
                    variant="link"
                    onClick={handleResendCode}
                    disabled={isResending}
                >
                    {isResending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Resending...
                        </>
                    ) : (
                        "Resend Code"
                    )}
                </Button>
                <Button variant="ghost" onClick={() => window.history.back()}>
                    Go Back
                </Button>
            </CardFooter>
        </Card>
    );
}
