import { authApi } from "../apis";
import { authRequestSchema } from "../apis/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircleIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

export function LoginForm() {
    const { mutate } = authApi.mutation.useLogin();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof authRequestSchema.login>>({
        resolver: zodResolver(authRequestSchema.login),
        defaultValues: {
            email: "anacelol1234@gmail.com",
            password: "An.123456",
        },
    });

    function onSubmit(values: z.infer<typeof authRequestSchema.login>) {
        mutate(values);
    }

    return (
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
                                <Input placeholder="m@example.com" {...field} />
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
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && (
                        <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Sign In
                </Button>
            </form>
        </Form>
    );
}
