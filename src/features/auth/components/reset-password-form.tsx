import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface PasswordFormProps {
    onSubmit: (password: string, confirmPassword: string) => Promise<void>;
    errorMessage: string;
    successMessage: string;
}

export default function ResetPasswordForm({
    onSubmit,
    errorMessage,
    successMessage,
}: PasswordFormProps) {
    const [newPassword, setNewPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        await onSubmit(newPassword, confirmPassword);
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
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
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                {successMessage && (
                    <p className="text-green-500">{successMessage}</p>
                )}
            </CardContent>
            <CardFooter>
                <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? "Resetting..." : "Reset Password"}
                </Button>
            </CardFooter>
        </form>
    );
}
