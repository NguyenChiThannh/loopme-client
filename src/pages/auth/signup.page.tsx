import { LockIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import SignUpForm from "@/features/auth/components/sign-up-form";

export default function SignUpPage() {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Please sign up!</CardDescription>
            </CardHeader>
            <CardContent>
                <SignUpForm />
                <Separator className="my-4" />
                <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                        <LockIcon className="mr-2 h-4 w-4" />
                        Login with Google
                    </Button>
                    <Button variant="outline" className="w-full">
                        <LockIcon className="mr-2 h-4 w-4" />
                        Login with GitHub
                    </Button>
                </div>
            </CardContent>
            <CardFooter>
                <Button variant="link" className="w-full">
                    Forgot password?
                </Button>
            </CardFooter>
        </Card>
    );
}
