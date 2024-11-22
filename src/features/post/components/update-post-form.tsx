import { postApi } from "../apis";
import { postRequestSchema } from "../apis/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

import { useUpdatePostDialogStore } from "@/stores/update-post-dialog-store";

interface UpdatePostFormProps {
    initialValues: z.infer<typeof postRequestSchema.update>;
}

export function UpdatePostForm({ initialValues }: UpdatePostFormProps) {
    const postMutation = postApi.mutation.useUpdatePost();
    const { handleOpenChange } = useUpdatePostDialogStore();
    const form = useForm<z.infer<typeof postRequestSchema.update>>({
        resolver: zodResolver(postRequestSchema.create),
        defaultValues: initialValues,
    });

    const handleSubmit = form.handleSubmit((values) => {
        postMutation.mutate(
            {
                ...values,
                id: initialValues.id,
            },
            {
                onSuccess() {
                    handleOpenChange(false);
                },
            },
        );
    });

    return (
        <Card className="mx-auto w-full max-w-2xl py-2">
            <CardContent>
                <Form {...form}>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg">
                                        Content
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Write your post content here"
                                            className="min-h-[200px] py-3 text-lg"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="privacy"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel className="text-lg">
                                        Privacy
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="public" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Public
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="friends" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Friends
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" size="lg" className="text-lg">
                            Update Post
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
                {form.formState.errors.root && (
                    <CardFooter>
                        <Alert variant="destructive" className="w-full">
                            <AlertCircle className="h-5 w-5" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                {form.formState.errors.root.message}
                            </AlertDescription>
                        </Alert>
                    </CardFooter>
                )}
            </CardFooter>
        </Card>
    );
}
