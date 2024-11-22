import { authApi } from "../apis";
import { authRequestSchema } from "../apis/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircleIcon, VerifiedIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as z from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function SignUpForm() {
    const { mutate, isPending, isSuccess, data } =
        authApi.mutation.useRegister();
    const form = useForm<z.infer<typeof authRequestSchema.register>>({
        resolver: zodResolver(authRequestSchema.register),
        defaultValues: {
            email: "",
            password: "",
            displayName: "",
            repeatPassword: "",
        },
    });

    function onSubmit(values: z.infer<typeof authRequestSchema.register>) {
        mutate({
            displayName: values.displayName,
            repeatPassword: values.repeatPassword,
            password: values.password,
            email: values.email,
        });
    }

    return (
        <>
            {/* {isSuccess && (
                <Alert variant="default" className="border-green-400">
                    <VerifiedIcon className="size-6" />
                    <AlertTitle>
                        <Link to={"/verify"} className="underline">
                            Go to Verify OTP Page
                        </Link>
                    </AlertTitle>
                    <AlertDescription>
                        This is your OTP Code: {data.data.otp}
                    </AlertDescription>
                </Alert>
            )} */}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="m@example.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="displayName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Display Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Thomas JR" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="repeatPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Repeat Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="mt-8 w-full"
                        disabled={isPending}
                    >
                        {isPending && (
                            <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Sign Up
                    </Button>
                </form>
            </Form>
        </>
    );
}
