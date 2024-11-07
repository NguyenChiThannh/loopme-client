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
            <CardFooter className="flex justify-between"></CardFooter>
        </Card>
    );
}
