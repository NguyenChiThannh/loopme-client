import { authApi } from "../apis";
import { authRequestSchema } from "../apis/type";
import { AlertCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function VerifyForm() {
    const navigate = useNavigate();
    const { mutate, isPending, error } = authApi.mutation.useVerifyOtp();
    const form = useForm<z.infer<typeof authRequestSchema.verifyOtp>>({
        defaultValues: {
            otp: "",
        },
    });

    const handleSubmit = form.handleSubmit((data) => {
        mutate(data, {
            onSuccess() {
                navigate("/");
            },
        });
    });

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="verificationCode">Verification Code</Label>
                    <Input {...form.register("otp")} />
                </div>
            </div>
            {error && (
                <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>MÃ OTP không chính xác</AlertDescription>
                </Alert>
            )}
            <Button className="mt-4 w-full" type="submit" disabled={isPending}>
                {isPending ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                    </>
                ) : (
                    "Verify Account"
                )}
            </Button>
        </form>
    );
}
