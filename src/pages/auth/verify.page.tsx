import { Loader2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import VerifyForm from "@/features/auth/components/verify-form";

export default function VerifyPage() {
    const [isResending, setIsResending] = useState(false);

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
                <VerifyForm />
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
