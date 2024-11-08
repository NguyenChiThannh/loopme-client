import { userApi } from "../apis";
import { userRequestSchema } from "../apis/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { User } from "@/configs/type";

interface UserUpdateFormProps {
    initialValues: Partial<User>;
}

export default function UserUpdateForm({ initialValues }: UserUpdateFormProps) {
    const { mutate, isPending } = userApi.mutation.useUpdateUserInformation();
    const form = useForm<z.infer<typeof userRequestSchema.updateUser>>({
        resolver: zodResolver(userRequestSchema.updateUser),
        defaultValues: initialValues,
    });

    const handleSubmit = form.handleSubmit((values) => {
        mutate(values);
    });

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-6">
                <FormField
                    control={form.control}
                    name="avatar"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Profile Picture</FormLabel>
                            <FormControl>
                                <div className="flex items-center space-x-4">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage
                                            src={field.value}
                                            alt="Profile picture"
                                        />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <Input
                                        {...field}
                                        type="url"
                                        placeholder="Enter image URL"
                                        className="flex-1"
                                    />
                                </div>
                            </FormControl>
                            <FormDescription>
                                Enter a URL for your profile picture.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" disabled value={initialValues.email} />
                </div>
                <FormField
                    control={form.control}
                    name="displayName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isPending}>
                    Save changes
                </Button>
            </form>
        </Form>
    );
}
